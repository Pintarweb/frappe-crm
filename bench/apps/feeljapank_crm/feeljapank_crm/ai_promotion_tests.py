"""FK-D12-F authoritative promotion tests (frappe-aware).

Run inside a bench site (transaction rolled back; synthetic data only; no network,
no live provider):

    bench --site <site> execute feeljapank_crm.ai_promotion_tests.run_ai_promotion_tests

No production CRM data is modified: a synthetic CRM Deal is created in the
rolled-back transaction. ``frappe.db.commit`` is no-op'd and rolled back at end.
"""

from __future__ import annotations

import uuid

import frappe
from frappe.utils import now

from feeljapank_crm import ai_promotion, api

RUN_DOCTYPE = "FJK AI Interpretation Run"
PROPOSAL_DOCTYPE = "FJK AI Proposal"
PROMOTION_DOCTYPE = "FJK AI Proposal Promotion"

RESULTS: list[tuple[str, bool, str]] = []


def _check(name: str, condition: bool, detail: object = "", raise_on_fail: bool = True) -> bool:
    detail = "" if detail is None else str(detail)
    ok = bool(condition)
    RESULTS.append((name, ok, detail))
    print("{0:58} {1} {2}".format(name, "PASS" if ok else "FAIL", detail))
    if not ok and raise_on_fail:
        raise AssertionError("{0}: {1}".format(name, detail))
    return ok


def _make_deal() -> str:
    # CRM Deal.validate_status() auto-sets an Open status for new deals; do not
    # force a status (which could be a "Lost" type requiring lost_reason).
    deal = frappe.new_doc("CRM Deal")
    deal.insert(ignore_permissions=True)
    return deal.name


def _make_run() -> str:
    run = frappe.new_doc(RUN_DOCTYPE)
    run.source_doctype = "DocType"
    run.source_name = "File"
    run.source_state_ref = "promo-test:" + uuid.uuid4().hex
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
    run: str, proposed_value: str = "3 nights", logical_key: str = "accommodation.kyoto.nights"
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


def _promote(proposal, deal, target_row=None, override=False):
    return ai_promotion.promote_proposal(
        proposal=proposal, target_deal=deal, target_row=target_row, override=override
    )


def _child_row(deal, row_name):
    doc = frappe.get_doc("CRM Deal", deal)
    for row in doc.get("fjk_requirement_lines") or []:
        if row.name == row_name:
            return row
    return None


def _expect_throw(name, fn):
    raised = False
    detail = ""
    try:
        fn()
    except Exception as exc:  # noqa: BLE001
        raised = True
        detail = type(exc).__name__
    _check(name, raised, detail)


def run_ai_promotion_tests() -> list[tuple[str, bool, str]]:
    del RESULTS[:]
    frappe.set_user("Administrator")
    real_commit = frappe.db.commit
    frappe.db.commit = lambda *args, **kwargs: None
    try:
        deal = _make_deal()

        # accepted -> authoritative
        p = _make_proposal(_make_run(), "3 nights")
        _dispose(p, "ACCEPTED")
        res = _promote(p, deal)
        row = _child_row(deal, res["target_row"])
        _check(
            "accepted_to_authoritative",
            bool(row) and row.detail == "3 nights",
            row.detail if row else "no row",
        )
        _check(
            "promotion_recorded_promoted",
            frappe.db.get_value(PROMOTION_DOCTYPE, res["promotion"], "outcome") == "PROMOTED",
        )

        # edited-accepted -> edited authoritative value (original preserved)
        pe = _make_proposal(_make_run(), "3 nights")
        _dispose(pe, "EDITED_ACCEPTED", edited_value="4 nights")
        resc = _promote(pe, deal)
        rowe = _child_row(deal, resc["target_row"])
        _check(
            "edited_accepted_authoritative",
            bool(rowe) and rowe.detail == "4 nights",
            rowe.detail if rowe else "no row",
        )
        _check(
            "edited_original_preserved",
            frappe.db.get_value(PROPOSAL_DOCTYPE, pe, "proposed_value") == "3 nights",
        )

        # rejected / deferred / superseded cannot promote
        pr = _make_proposal(_make_run())
        _dispose(pr, "REJECTED")
        _expect_throw("rejected_cannot_promote", lambda: _promote(pr, deal))

        pd = _make_proposal(_make_run())
        _dispose(pd, "DEFERRED")
        _expect_throw("deferred_cannot_promote", lambda: _promote(pd, deal))

        ps = _make_proposal(_make_run())
        succ = _make_proposal(_make_run())
        _dispose(ps, "SUPERSEDED", superseded_by=succ)
        _expect_throw("superseded_cannot_promote", lambda: _promote(ps, deal))

        # duplicate promotion idempotent
        pid = _make_proposal(_make_run(), "6 nights")
        _dispose(pid, "ACCEPTED")
        first = _promote(pid, deal)
        second = _promote(pid, deal)
        _check(
            "duplicate_idempotent",
            second.get("idempotent") is True and second["promotion"] == first["promotion"],
        )
        _check(
            "duplicate_single_record",
            frappe.db.count(PROMOTION_DOCTYPE, {"proposal": pid, "outcome": "PROMOTED"}) == 1,
        )

        # stale value blocked without override; explicit override succeeds
        pst = _make_proposal(_make_run(), "3 nights")
        _dispose(pst, "ACCEPTED")
        row_r = _promote(pst, deal)["target_row"]
        pnew = _make_proposal(_make_run(), "5 nights")
        _dispose(pnew, "ACCEPTED")
        _expect_throw("stale_blocked_without_override", lambda: _promote(pnew, deal, target_row=row_r))
        _check("stale_blocked_target_unchanged", _child_row(deal, row_r).detail == "3 nights")
        _promote(pnew, deal, target_row=row_r, override=True)
        _check("override_updates_target", _child_row(deal, row_r).detail == "5 nights")

        # permission denial
        pp = _make_proposal(_make_run(), "7 nights")
        _dispose(pp, "ACCEPTED")
        frappe.set_user("Guest")
        try:
            _expect_throw("guest_promotion_denied", lambda: _promote(pp, deal))
        finally:
            frappe.set_user("Administrator")

        # audit reconstruction + reverse traversal
        pa = _make_proposal(_make_run(), "8 nights")
        _dispose(pa, "ACCEPTED")
        rr = _promote(pa, deal)
        promos = frappe.get_all(
            PROMOTION_DOCTYPE,
            filters={"proposal": pa},
            fields=["name", "target_deal", "target_row", "effective_value", "outcome"],
        )
        _check(
            "audit_reconstruction",
            len(promos) == 1 and promos[0].target_deal == deal and promos[0].effective_value == "8 nights",
        )
        reverse = frappe.get_all(
            PROMOTION_DOCTYPE, filters={"target_deal": deal, "target_row": rr["target_row"]}, pluck="proposal"
        )
        _check("reverse_traversal", pa in reverse)

        # reprocessing creates a new Run (persistence layer; synthetic service)
        from feeljapank_crm import ai_persistence
        from feeljapank_crm.ai.types import AIRequest, AIResult, ProviderMeta

        class _FakeService:
            def interpret(self, request):
                return AIResult(
                    provider_meta=ProviderMeta(provider="fake", model="fake-1"),
                    proposals=[],
                    finish_reason="stop",
                )

        req = AIRequest(
            instruction_ref="i1",
            instruction="x",
            source_kind="DocType",
            source_id="File",
            source_text="synthetic",
            output_contract_ref="c1",
        )
        common = dict(
            source_doctype="DocType",
            source_name="File",
            instruction_ref="i1",
            output_contract_ref="c1",
            provider="deepseek",
            model="deepseek-flash",
        )
        r1 = ai_persistence.interpret_and_persist(_FakeService(), req, **common)
        r2 = ai_persistence.interpret_and_persist(_FakeService(), req, reprocess=True, **common)
        _check("reprocess_new_run", r1["run"] != r2["run"] and r2.get("reused") is False, r2["run"])
    finally:
        frappe.db.commit = real_commit
        frappe.db.rollback()

    failed = len([r for r in RESULTS if not r[1]])
    print("-" * 78)
    print("FK-D12-F promotion tests: {0} passed, {1} failed".format(len(RESULTS) - failed, failed))
    return list(RESULTS)


if __name__ == "__main__":  # pragma: no cover
    run_ai_promotion_tests()
