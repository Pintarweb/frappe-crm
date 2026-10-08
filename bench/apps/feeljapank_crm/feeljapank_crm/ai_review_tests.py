"""FK-D12-E human-review/disposition tests (frappe-aware).

Run inside a bench site (transaction rolled back; synthetic data only; no
network, no live provider):

    bench --site <site> execute feeljapank_crm.ai_review_tests.run_ai_review_tests

No authoritative CRM data is created or modified. Because some helper inserts
commit-free, the harness no-ops ``frappe.db.commit`` and rolls back at the end.
"""

from __future__ import annotations

import uuid

import frappe
from frappe.utils import now

from feeljapank_crm import api

RUN_DOCTYPE = "FJK AI Interpretation Run"
PROPOSAL_DOCTYPE = "FJK AI Proposal"

RESULTS: list[tuple[str, bool, str]] = []


def _check(name: str, condition: bool, detail: object = "", raise_on_fail: bool = True) -> bool:
    detail = "" if detail is None else str(detail)
    ok = bool(condition)
    RESULTS.append((name, ok, detail))
    print("{0:60} {1} {2}".format(name, "PASS" if ok else "FAIL", detail))
    if not ok and raise_on_fail:
        raise AssertionError("{0}: {1}".format(name, detail))
    return ok


def _make_run() -> str:
    run = frappe.new_doc(RUN_DOCTYPE)
    run.source_doctype = "DocType"
    run.source_name = "File"  # an existing DocType (Dynamic Link target)
    run.source_state_ref = "test:{0}".format(uuid.uuid4().hex)
    run.instruction_ref = "stage0-instruction-v1"
    run.output_contract_ref = "stage0.proposal.v1"
    run.provider = "deepseek"
    run.model = "deepseek-flash"
    run.run_key = uuid.uuid4().hex
    run.status = "SUCCEEDED"
    run.started_at = now()
    run.proposal_count = 0
    run.insert(ignore_permissions=True)
    return run.name


def _make_proposal(
    run: str,
    logical_key: str = "accommodation.kyoto.nights",
    proposed_value: str = "3 nights",
) -> str:
    proposal = frappe.new_doc(PROPOSAL_DOCTYPE)
    proposal.run = run
    proposal.source_doctype = "DocType"
    proposal.source_name = "File"
    proposal.domain = "Accommodation"
    proposal.logical_key = logical_key
    proposal.proposed_value = proposed_value
    proposal.provenance_status = "explicit"
    proposal.insert(ignore_permissions=True)
    return proposal.name


def _dispose(proposal, disposition, **kwargs):
    return api.record_proposal_disposition(proposal, disposition, **kwargs)


def _expect_throw(name, fn):
    raised = False
    detail = ""
    try:
        fn()
    except Exception as exc:  # noqa: BLE001
        raised = True
        detail = type(exc).__name__
    _check(name, raised, detail)


def run_ai_review_tests() -> list[tuple[str, bool, str]]:
    del RESULTS[:]
    frappe.set_user("Administrator")
    real_commit = frappe.db.commit
    frappe.db.commit = lambda *args, **kwargs: None
    try:
        # --- Lifecycle: allowed transitions ---
        for disposition in ("ACCEPTED", "REJECTED", "DEFERRED"):
            p = _make_proposal(_make_run())
            res = _dispose(p, disposition)
            _check("allow_PROPOSED_to_{0}".format(disposition), res["lifecycle_state"] == disposition)

        p = _make_proposal(_make_run())
        res = _dispose(p, "EDITED_ACCEPTED", edited_value="4 nights")
        _check("allow_PROPOSED_to_EDITED_ACCEPTED", res["lifecycle_state"] == "EDITED_ACCEPTED")

        # PROPOSED -> SUPERSEDED (with successor)
        successor = _make_proposal(_make_run(), logical_key="accommodation.osaka.nights")
        p = _make_proposal(_make_run())
        res = _dispose(p, "SUPERSEDED", superseded_by=successor)
        _check("allow_PROPOSED_to_SUPERSEDED", res["lifecycle_state"] == "SUPERSEDED")

        # DEFERRED -> each terminal
        for disposition, kwargs in (
            ("ACCEPTED", {}),
            ("EDITED_ACCEPTED", {"edited_value": "5 nights"}),
            ("REJECTED", {}),
            ("SUPERSEDED", {"superseded_by": None}),  # successor filled below
        ):
            p = _make_proposal(_make_run())
            _dispose(p, "DEFERRED")
            if disposition == "SUPERSEDED":
                succ = _make_proposal(_make_run())
                kwargs = {"superseded_by": succ}
            res = _dispose(p, disposition, **kwargs)
            _check("allow_DEFERRED_to_{0}".format(disposition), res["lifecycle_state"] == disposition)

        # ACCEPTED -> SUPERSEDED ; EDITED_ACCEPTED -> SUPERSEDED
        p = _make_proposal(_make_run())
        _dispose(p, "ACCEPTED")
        res = _dispose(p, "SUPERSEDED", superseded_by=_make_proposal(_make_run()))
        _check("allow_ACCEPTED_to_SUPERSEDED", res["lifecycle_state"] == "SUPERSEDED")

        p = _make_proposal(_make_run())
        _dispose(p, "EDITED_ACCEPTED", edited_value="6 nights")
        res = _dispose(p, "SUPERSEDED", superseded_by=_make_proposal(_make_run()))
        _check("allow_EDITED_ACCEPTED_to_SUPERSEDED", res["lifecycle_state"] == "SUPERSEDED")

        # --- Invalid transitions ---
        p = _make_proposal(_make_run())
        _dispose(p, "REJECTED")
        _expect_throw("block_REJECTED_to_ACCEPTED", lambda: _dispose(p, "ACCEPTED"))
        _expect_throw("block_REJECTED_to_DEFERRED", lambda: _dispose(p, "DEFERRED"))

        p = _make_proposal(_make_run())
        _dispose(p, "SUPERSEDED", superseded_by=_make_proposal(_make_run()))
        _expect_throw("block_SUPERSEDED_to_ACCEPTED", lambda: _dispose(p, "ACCEPTED"))
        _expect_throw("block_SUPERSEDED_to_DEFERRED", lambda: _dispose(p, "DEFERRED"))

        p = _make_proposal(_make_run())
        _dispose(p, "ACCEPTED")
        _expect_throw("block_ACCEPTED_to_ACCEPTED", lambda: _dispose(p, "ACCEPTED"))

        p = _make_proposal(_make_run())
        _expect_throw("block_SUPERSEDED_without_successor", lambda: _dispose(p, "SUPERSEDED"))
        _expect_throw("block_self_supersession", lambda: _dispose(p, "SUPERSEDED", superseded_by=p))

        # circular supersession
        a = _make_proposal(_make_run())
        b = _make_proposal(_make_run())
        _dispose(a, "SUPERSEDED", superseded_by=b)
        _expect_throw("block_circular_supersession", lambda: _dispose(b, "SUPERSEDED", superseded_by=a))

        # --- Append-only ---
        p = _make_proposal(_make_run())
        _dispose(p, "ACCEPTED")
        doc = frappe.get_doc(PROPOSAL_DOCTYPE, p)
        _check("decision_recorded", len(doc.decisions) == 1)
        _check("attribution_reviewer", doc.decisions[0].reviewer == frappe.session.user)
        _check("attribution_timestamp", bool(doc.decisions[0].decided_at))

        # edit existing decision disposition -> rejected
        doc2 = frappe.get_doc(PROPOSAL_DOCTYPE, p)
        doc2.decisions[0].disposition = "REJECTED"
        _expect_throw("block_edit_existing_decision", lambda: doc2.save(ignore_permissions=True))

        doc3 = frappe.get_doc(PROPOSAL_DOCTYPE, p)
        doc3.decisions[0].reviewer = "guest@example.com"
        _expect_throw("block_reassign_reviewer", lambda: doc3.save(ignore_permissions=True))

        doc4 = frappe.get_doc(PROPOSAL_DOCTYPE, p)
        doc4.decisions[0].decided_at = now()
        _expect_throw("block_retimestamp", lambda: doc4.save(ignore_permissions=True))

        doc5 = frappe.get_doc(PROPOSAL_DOCTYPE, p)
        doc5.decisions = []
        _expect_throw("block_delete_decision", lambda: doc5.save(ignore_permissions=True))

        # --- Edited acceptance ---
        p = _make_proposal(_make_run())
        _expect_throw("block_edited_without_value", lambda: _dispose(p, "EDITED_ACCEPTED"))
        _dispose(p, "EDITED_ACCEPTED", edited_value="7 nights")
        e = frappe.get_doc(PROPOSAL_DOCTYPE, p)
        _check("edited_value_preserved", e.decisions[0].edited_value == "7 nights")
        _check("original_value_unchanged", e.proposed_value == "3 nights")

        # --- Promotion eligibility flags ---
        p = _make_proposal(_make_run())
        _check("deferred_not_eligible", _dispose(p, "DEFERRED")["promotion_eligible"] is False)
        p = _make_proposal(_make_run())
        _check("rejected_not_eligible", _dispose(p, "REJECTED")["promotion_eligible"] is False)
        p = _make_proposal(_make_run())
        _check("accepted_eligible", _dispose(p, "ACCEPTED")["promotion_eligible"] is True)
        p = _make_proposal(_make_run())
        _check(
            "edited_accepted_eligible",
            _dispose(p, "EDITED_ACCEPTED", edited_value="x")["promotion_eligible"] is True,
        )

        # --- Competing proposals: independent histories ---
        run = _make_run()
        p1 = _make_proposal(run, logical_key="accommodation.kyoto.nights")
        p2 = _make_proposal(run, logical_key="accommodation.kyoto.nights")
        _dispose(p1, "ACCEPTED")
        _dispose(p2, "REJECTED")
        _check(
            "competing_independent",
            len(frappe.get_doc(PROPOSAL_DOCTYPE, p1).decisions) == 1
            and len(frappe.get_doc(PROPOSAL_DOCTYPE, p2).decisions) == 1,
        )

        # --- Authority: no CRM mutation ---
        deal_before = frappe.db.count("CRM Deal")
        p = _make_proposal(_make_run())
        _dispose(p, "ACCEPTED")
        _check("no_crm_deal_mutation", frappe.db.count("CRM Deal") == deal_before)

        # --- Security: hostile value stays data (never executed) ---
        hostile = "frappe.db.set_value('CRM Deal','X','status','Won')"
        hp = _make_proposal(_make_run(), proposed_value=hostile)
        _check(
            "hostile_value_stored_as_data",
            frappe.db.get_value(PROPOSAL_DOCTYPE, hp, "proposed_value") == hostile,
        )
        deal_count_before = frappe.db.count("CRM Deal")
        hostile_result = _dispose(hp, "ACCEPTED")
        _check(
            "hostile_value_not_executed",
            hostile_result["lifecycle_state"] == "ACCEPTED"
            and frappe.db.count("CRM Deal") == deal_count_before,
        )

        # --- Permissions: unauthorized denied ---
        p = _make_proposal(_make_run())
        frappe.set_user("Guest")
        try:
            _expect_throw("block_guest_disposition", lambda: _dispose(p, "ACCEPTED"))
        finally:
            frappe.set_user("Administrator")

        # --- Audit reconstruction ---
        p = _make_proposal(_make_run())
        _dispose(p, "DEFERRED")
        _dispose(p, "ACCEPTED")
        doc = frappe.get_doc(PROPOSAL_DOCTYPE, p)
        run_doc = frappe.get_doc(RUN_DOCTYPE, doc.run)
        _check("audit_chain", run_doc.source_name == "File" and len(doc.decisions) == 2)
        _check(
            "audit_two_decisions",
            doc.decisions[0].to_state == "DEFERRED" and doc.decisions[1].to_state == "ACCEPTED",
        )
    finally:
        frappe.db.commit = real_commit
        frappe.db.rollback()

    failed = len([r for r in RESULTS if not r[1]])
    print("-" * 80)
    print("FK-D12-E review tests: {0} passed, {1} failed".format(len(RESULTS) - failed, failed))
    return list(RESULTS)


if __name__ == "__main__":  # pragma: no cover
    run_ai_review_tests()
