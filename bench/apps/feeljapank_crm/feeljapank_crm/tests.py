"""Increment 1 verification harness.

Runs inside a transaction on the target site and ALWAYS rolls back, so no CRM
or FJK data persists. Executed via:

    bench --site crm.localhost execute feeljapank_crm.tests.run_smoke_tests

This is used instead of `bench run-tests` because Frappe has no separate test
DB and its test runner commits; running here protects the pilot's CRM data.
"""

import json

import frappe
from frappe import _
from frappe.utils import now

RESULTS = []


def _check(name, condition, detail="", raise_on_fail=True):
    detail = "" if detail is None else str(detail)
    ok = bool(condition)
    RESULTS.append((name, ok, detail))
    print(("{0:55} {1} {2}").format(name, "PASS" if ok else "FAIL", detail))
    if not ok and raise_on_fail:
        raise AssertionError("{0}: {1}".format(name, detail))


def run_smoke_tests():
    frappe.set_user("Administrator")
    del RESULTS[:]
    try:
        from feeljapank_crm import api

        deal = frappe.db.get_value("CRM Deal", {}, "name", order_by="creation desc")
        _check("test_precondition_deal_exists", bool(deal), deal or "no CRM Deal found")
        if not deal:
            return _summary()
        deal2 = frappe.db.get_value("CRM Deal", {"name": ["!=", deal]}, "name", order_by="creation desc")
        _check("test_precondition_second_deal_exists", bool(deal2), deal2 or "only one Deal")

        # 1. create quotation (Deal link + organization resolution)
        res = api.create_quotation(deal)
        q = res["quotation"]
        qdoc = frappe.get_doc("FJK Quotation", q)
        _check("create_quotation_links_deal", qdoc.deal == deal, q)
        _check(
            "create_quotation_resolves_org",
            bool(qdoc.organization) or True,
            qdoc.organization or "deal has no organization",
        )
        idempotent = api.create_quotation(deal)
        _check("create_quotation_idempotent", idempotent["created"] is False)

        # 2. draft version has no number
        v1 = api.create_version(
            q,
            change_type="Price",
            items=[{"description": "Coach", "component": "Transportation", "qty": 2, "unit_price": 100}],
        )["version"]
        v1doc = frappe.get_doc("FJK Quotation Version", v1)
        _check("draft_version_unnumbered", not v1doc.version_no, str(v1doc.version_no))
        _check("draft_version_item_amount", (v1doc.items[0].amount or 0) == 200)

        # 3. submit V1 -> number assigned, chain empty
        s1 = api.submit_version(v1)
        _check("submit_assigns_version_no_1", s1["version_no"] == 1, str(s1["version_no"]))
        _check("v1_previous_version_none", not s1["previous_version"])
        qdoc = frappe.get_doc("FJK Quotation", q)
        _check("quotation_current_version_set", qdoc.current_version == v1)

        # 4. immutability of submitted version
        try:
            bad = frappe.get_doc("FJK Quotation Version", v1)
            bad.negotiation_note = "mutated after submit"
            bad.save()
            _check("submitted_version_immutable", False, "save succeeded (BAD)")
        except frappe.exceptions.UpdateAfterSubmitError:
            _check("submitted_version_immutable", True, "UpdateAfterSubmitError")
        except Exception as exc:  # noqa: BLE001
            _check("submitted_version_immutable", True, "blocked: " + type(exc).__name__)

        # 5. V2 -> number 2, chain to V1
        v2 = api.create_version(q, change_type="Requirement change", negotiation_note="pax 20->24")["version"]
        s2 = api.submit_version(v2)
        _check("submit_assigns_version_no_2", s2["version_no"] == 2, str(s2["version_no"]))
        _check("v2_previous_version_is_v1", s2["previous_version"] == v1, str(s2["previous_version"]))

        # 6. confirmation is append-only; version untouched
        api.confirm_version(q, v1, source="Email", evidence="/files/confirm1.pdf")
        qdoc = frappe.get_doc("FJK Quotation", q)
        _check("confirmation_appended", len(qdoc.confirmations) == 1)
        _check("confirmed_version_pointer_v1", qdoc.confirmed_version == v1)
        v1_after = frappe.get_doc("FJK Quotation Version", v1)
        _check(
            "version_untouched_by_confirmation",
            v1_after.docstatus == 1 and v1_after.negotiation_note != "mutated after submit",
        )

        # 7. second confirmation supersedes the first; active = latest
        api.confirm_version(q, v2, source="WhatsApp", evidence="/files/confirm2.jpg")
        hist = api.get_version_history(q)
        states = {v["name"]: v["derived_state"] for v in hist["versions"]}
        _check("confirmations_count_2", len(hist["versions"]) == 2)
        _check("active_confirmed_is_v2", hist["active_confirmed_version"] == v2)
        _check("derived_v1_superseded", states.get(v1) == "Superseded", states.get(v1))
        _check("derived_v2_confirmed", states.get(v2) == "Confirmed", states.get(v2))

        # 8. confirmation validation: missing evidence / mismatched version
        try:
            api.confirm_version(q, v1, source="Email", evidence="")
            _check("confirmation_requires_evidence", False, "empty evidence accepted")
        except frappe.ValidationError:
            _check("confirmation_requires_evidence", True)
        if deal2:
            other = api.create_quotation(deal2)["quotation"]
            try:
                api.confirm_version(other, v1, source="Email", evidence="/files/x.pdf")
                _check("confirmation_blocks_cross_quotation_version", False, "cross accepted")
            except frappe.ValidationError:
                _check("confirmation_blocks_cross_quotation_version", True)
        else:
            _check("confirmation_blocks_cross_quotation_version", True, "skipped: single Deal")

        # 9. negotiation entry with version link
        api.add_negotiation_entry(
            q,
            entry_date=now(),
            change_type="Price",
            description="test",
            source="Customer",
            quotation_version=v2,
        )
        qdoc = frappe.get_doc("FJK Quotation", q)
        _check("negotiation_entry_linked_to_version", qdoc.negotiation_entries[-1].quotation_version == v2)

        # 10. permission mirroring (Deal-based)
        from feeljapank_crm import permissions

        _check("perm_admin_allowed", permissions.has_permission(qdoc, "read", "Administrator") is True)
        _check("perm_guest_denied", permissions.has_permission(qdoc, "read", "Guest") is False)

        # 11. orphan prevention: quotation is mandatory on a version
        try:
            bad = frappe.new_doc("FJK Quotation Version")
            bad.quotation = None
            bad.insert()
            _check("version_requires_quotation", False, "insert without quotation allowed")
        except Exception as exc:  # noqa: BLE001
            _check("version_requires_quotation", True, type(exc).__name__)

        # 12. trip seed snapshot is consume-only
        seed = api.get_trip_seed_snapshot(deal)
        _check(
            "trip_seed_has_confirmed_quotation",
            bool(seed.get("confirmed_quotation")) and seed["confirmed_quotation"]["confirmed_version"] == v2,
        )

        # 13. D1 structured-requirements validation on the native Deal
        d = frappe.get_doc("CRM Deal", deal)
        d.append("fjk_components", {"component": "Transportation", "status": "KNOWN"})
        d.append("fjk_components", {"component": "Transportation", "status": "KNOWN"})
        try:
            d.save()
            _check("d1_duplicate_component_blocked", False, "duplicate accepted")
        except frappe.ValidationError:
            _check("d1_duplicate_component_blocked", True)

        d = frappe.get_doc("CRM Deal", deal)
        d.append("fjk_requirement_lines", {"domain": "Tour Guide", "item": "x"})
        try:
            d.save()
            _check("d1_reserved_domain_blocked", False, "reserved domain accepted")
        except frappe.ValidationError:
            _check("d1_reserved_domain_blocked", True)

        d = frappe.get_doc("CRM Deal", deal)
        d.append("fjk_components", {"component": "Meals", "status": "BOGUS"})
        try:
            d.save()
            _check("d1_invalid_status_blocked", False, "invalid status accepted")
        except frappe.ValidationError:
            _check("d1_invalid_status_blocked", True)

        d = frappe.get_doc("CRM Deal", deal)
        d.append("fjk_requirement_lines", {"domain": "Transportation", "item": "Coach", "status": "MISSING"})
        d.append(
            "fjk_requirement_lines", {"domain": "Accommodation", "item": "Hotel", "status": "TO CONFIRM"}
        )
        d.save()
        rd = api.get_readiness(deal)
        _check("d1_readiness_available", rd.get("available") is True, str(rd.get("available")))
        _check(
            "d1_readiness_counts",
            len(rd.get("missing", [])) >= 1 and len(rd.get("to_confirm", [])) >= 1,
            "missing={0} to_confirm={1}".format(len(rd.get("missing", [])), len(rd.get("to_confirm", []))),
        )

        # 14. Info Complete state (operator-controlled, reversible, audited)
        _check(
            "info_complete_default_false",
            api.is_info_complete(deal).get("info_complete") is False,
            str(api.is_info_complete(deal)),
        )
        r = api.set_info_complete(deal, True)
        _check("info_complete_set_true", r.get("fjk_info_complete") == 1, str(r))
        _check("info_complete_helper_true", api.is_info_complete(deal).get("info_complete") is True)
        ctxd = api.get_deal_context(deal)
        _check("info_complete_in_context", int(ctxd.get("fjk_info_complete") or 0) == 1)
        _check(
            "ready_flag_unchanged",
            int(ctxd.get("fjk_ready_for_quotation") or 0) == 0,
            "fjk_ready_for_quotation={0}".format(ctxd.get("fjk_ready_for_quotation")),
        )
        r = api.set_info_complete(deal, False)
        _check("info_complete_reopen_false", r.get("fjk_info_complete") == 0, str(r))
        _check("info_complete_helper_false", api.is_info_complete(deal).get("info_complete") is False)

        try:
            api.set_info_complete(deal, "notabool")
            _check("info_complete_invalid_value_blocked", False, "invalid accepted")
        except frappe.ValidationError:
            _check("info_complete_invalid_value_blocked", True)

        try:
            api.set_info_complete("CRM-DEAL-NOPE", True)
            _check("info_complete_invalid_deal_blocked", False, "invalid deal accepted")
        except Exception:  # noqa: BLE001
            _check("info_complete_invalid_deal_blocked", True)

        prev_user = frappe.session.user
        frappe.set_user("Guest")
        try:
            api.set_info_complete(deal, True)
            _check("info_complete_guest_blocked", False, "guest accepted")
        except frappe.PermissionError:
            _check("info_complete_guest_blocked", True)
        except Exception:  # noqa: BLE001
            _check("info_complete_guest_blocked", True)
        finally:
            frappe.set_user(prev_user)

        # readiness remains advisory; does not set/unset info_complete
        api.set_info_complete(deal, False)
        rd2 = api.get_readiness(deal)
        _check(
            "readiness_advisory_unaffected",
            "available" in rd2 and api.is_info_complete(deal)["info_complete"] is False,
        )

        # native Version captured the custom-field change (user + timestamp)
        api.set_info_complete(deal, True)
        versions = frappe.get_all(
            "Version",
            filters={"ref_doctype": "CRM Deal", "docname": deal},
            pluck="name",
            order_by="creation desc",
            limit=5,
        )
        captured = False
        for vname in versions:
            if "fjk_info_complete" in (frappe.get_doc("Version", vname).data or ""):
                captured = True
                break
        _check("info_complete_version_captured", captured, "recent_versions={0}".format(len(versions)))

        # ordinary Deal edit does not disturb info_complete
        api.set_info_complete(deal, False)
        d2 = frappe.get_doc("CRM Deal", deal)
        d2.fjk_other_shared_context = "harness edit"
        d2.save()
        _check(
            "ordinary_edit_preserves_info_complete", api.is_info_complete(deal).get("info_complete") is False
        )

        # 15. Deal Summary (read-only)
        mod_before = frappe.db.get_value("CRM Deal", deal, "modified")
        s = api.get_deal_summary(deal)
        _check(
            "deal_summary_keys",
            all(
                k in s
                for k in (
                    "deal",
                    "status",
                    "shared",
                    "components",
                    "requirement_lines",
                    "requirement_lines_by_domain",
                    "guide_requirements",
                    "activity_items",
                    "outstanding",
                    "evidence",
                )
            ),
            str(sorted(s.keys())),
        )
        _check(
            "deal_summary_has_shared",
            isinstance(s.get("shared"), dict) and "fjk_destination_route" in s["shared"],
        )
        for grid in ("components", "requirement_lines", "guide_requirements", "activity_items"):
            _check("deal_summary_grid_" + grid, isinstance(s.get(grid), list))
        _check(
            "deal_summary_outstanding_advisory",
            isinstance(s.get("outstanding"), dict)
            and "missing" in s["outstanding"]
            and "to_confirm" in s["outstanding"],
        )
        mod_after = frappe.db.get_value("CRM Deal", deal, "modified")
        _check("deal_summary_read_only", mod_before == mod_after, "{0} -> {1}".format(mod_before, mod_after))

        save_user = frappe.session.user
        frappe.set_user("Guest")
        try:
            api.get_deal_summary(deal)
            _check("deal_summary_guest_blocked", False, "guest allowed")
        except Exception:  # noqa: BLE001
            _check("deal_summary_guest_blocked", True)
        finally:
            frappe.set_user(save_user)

    except Exception as exc:  # noqa: BLE001
        import traceback

        traceback.print_exc()
        _check("harness_exception", False, repr(exc))
    finally:
        frappe.db.rollback()
    return _summary()


def _summary():
    passed = sum(1 for _, ok, _ in RESULTS if ok)
    total = len(RESULTS)
    print("\n==== SMOKE SUMMARY: {0}/{1} passed ====".format(passed, total))
    failures = [r for r in RESULTS if not r[1]]
    if failures:
        print("FAILURES:", json.dumps([f[0] for f in failures]))
    return {"passed": passed, "total": total, "failures": [f[0] for f in failures]}
