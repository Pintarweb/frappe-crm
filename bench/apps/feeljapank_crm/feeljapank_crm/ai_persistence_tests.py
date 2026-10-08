"""FK-D12-D persistence smoke tests (frappe-aware).

Run inside a bench site (transaction rolled back; no network, no live provider
call, synthetic data only):

    bench --site <site> execute feeljapank_crm.ai_persistence_tests.run_ai_persistence_tests

Because ``interpret_and_persist`` commits internally (to leave an auditable
PROCESSING Run before the external call), this harness temporarily no-ops
``frappe.db.commit`` and rolls back at the end so no test data persists.
"""

from __future__ import annotations

import json

import frappe

from feeljapank_crm import ai_persistence as persistence
from feeljapank_crm.ai.config import ProviderConfig
from feeljapank_crm.ai.errors import ProviderUnavailableError
from feeljapank_crm.ai.providers.deepseek import DeepSeekProvider
from feeljapank_crm.ai.service import AIService
from feeljapank_crm.ai.transport import TransportResponse
from feeljapank_crm.ai.types import AIRequest

RESULTS: list[tuple[str, bool, str]] = []


def _check(name: str, condition: bool, detail: object = "", raise_on_fail: bool = True) -> bool:
    detail = "" if detail is None else str(detail)
    ok = bool(condition)
    RESULTS.append((name, ok, detail))
    print("{0:58} {1} {2}".format(name, "PASS" if ok else "FAIL", detail))
    if not ok and raise_on_fail:
        raise AssertionError("{0}: {1}".format(name, detail))
    return ok


class _FakeTransport:
    def __init__(self, response=None, error=None):
        self._response = response
        self._error = error
        self.requests: list[dict] = []

    def request(self, *, url: str, headers: dict, body: bytes) -> TransportResponse:
        self.requests.append({"url": url, "headers": dict(headers), "body": body})
        if self._error is not None:
            raise self._error
        return self._response


def _config() -> ProviderConfig:
    return ProviderConfig(
        provider="deepseek",
        model="deepseek-flash",
        endpoint="https://api.deepseek.com/chat/completions",
        allowed_hosts=("api.deepseek.com",),
    )


def _request() -> AIRequest:
    return AIRequest(
        instruction_ref="stage0-instruction-v1",
        instruction="Extract travel requirements as JSON.",
        source_kind="DocType",
        source_id="CRM Deal",
        source_text="synthetic",
        output_contract_ref="stage0.proposal.v1",
        context={},
        request_meta={},
    )


def _ok_body() -> bytes:
    inner = {
        "proposals": [
            {
                "domain": "Accommodation",
                "logical_key": "accommodation.kyoto.nights",
                "proposed_value": "3 nights",
                "provenance_status": "explicit",
            },
            {
                "domain": "Transportation",
                "logical_key": "transport.arrival",
                "proposed_value": "Shinkansen",
                "provenance_status": "explicit",
            },
        ]
    }
    return json.dumps(
        {
            "choices": [{"finish_reason": "stop", "message": {"content": json.dumps(inner)}}],
            "model": "deepseek-flash",
            "system_fingerprint": "fp-test",
            "id": "resp-test",
            "usage": {"prompt_tokens": 5, "completion_tokens": 7, "total_tokens": 12},
        }
    ).encode()


def _service(transport) -> AIService:
    provider = DeepSeekProvider(config=_config(), transport=transport, api_key="test-key")
    return AIService(provider=provider)


def run_ai_persistence_tests() -> list[tuple[str, bool, str]]:
    del RESULTS[:]
    frappe.set_user("Administrator")
    real_commit = frappe.db.commit
    frappe.db.commit = lambda *args, **kwargs: None  # keep test data rolled back
    try:
        # Success path.
        result = persistence.interpret_and_persist(
            _service(_FakeTransport(response=TransportResponse(status=200, body=_ok_body()))),
            _request(),
            source_doctype="DocType",
            source_name="CRM Deal",
            instruction_ref="stage0-instruction-v1",
            output_contract_ref="stage0.proposal.v1",
            provider="deepseek",
            model="deepseek-flash",
        )
        run = frappe.get_doc(persistence.RUN_DOCTYPE, result["run"])
        _check("run_succeeded", run.status == "SUCCEEDED", run.status)
        _check("run_proposal_count_matches", run.proposal_count == len(result["proposals"]) == 2)
        _check("run_key_present", bool(run.run_key))
        _check("run_provider_metadata", run.provider == "deepseek" and run.model == "deepseek-flash")
        _check("run_fingerprint_persisted", run.model_fingerprint == "fp-test")
        _check(
            "run_no_raw_payload_field",
            not hasattr(run, "raw_payload") and not run.meta.has_field("raw_payload"),
        )
        proposals = [frappe.get_doc(persistence.PROPOSAL_DOCTYPE, n) for n in result["proposals"]]
        _check("proposals_link_to_run", all(p.run == run.name for p in proposals))
        _check("proposals_lifecycle_proposed", all(p.lifecycle_state == "PROPOSED" for p in proposals))
        _check("proposal_original_value_preserved", proposals[0].proposed_value == "3 nights")

        # Failure path: run persisted by run_key, so use a different source to avoid reuse.
        failed = False
        try:
            persistence.interpret_and_persist(
                _service(_FakeTransport(error=ProviderUnavailableError("down"))),
                _request(),
                source_doctype="DocType",
                source_name="FJK AI Proposal",
                instruction_ref="stage0-instruction-v1",
                output_contract_ref="stage0.proposal.v1",
                provider="deepseek",
                model="deepseek-flash",
            )
        except ProviderUnavailableError:
            failed = True
        _check("failed_call_raises", failed)
        failed_run = frappe.get_doc(
            persistence.RUN_DOCTYPE,
            frappe.db.get_value(persistence.RUN_DOCTYPE, {"source_name": "FJK AI Proposal"}, "name"),
        )
        _check("failed_run_terminal_not_succeeded", failed_run.status == "FAILED", failed_run.status)
        _check("failed_run_zero_proposals", failed_run.proposal_count == 0)

        # D. run_key idempotency (same source-state/instruction/provider/model).
        def _run_once():
            return persistence.interpret_and_persist(
                _service(_FakeTransport(response=TransportResponse(status=200, body=_ok_body()))),
                _request(),
                source_doctype="DocType",
                source_name="CRM Organization",
                instruction_ref="stage0-instruction-v1",
                output_contract_ref="stage0.proposal.v1",
                provider="deepseek",
                model="deepseek-flash",
            )

        first = _run_once()
        second = _run_once()
        _check("idempotent_reuses_run", second["reused"] is True and second["run"] == first["run"])
        _check(
            "idempotent_single_run_row",
            frappe.db.count(persistence.RUN_DOCTYPE, {"run_key": first["run_key"]}) == 1,
        )

        # F. terminal-state invariant: a terminal Run cannot transition again.
        terminal_run = frappe.get_doc(persistence.RUN_DOCTYPE, first["run"])
        terminal_run.status = "FAILED"
        blocked = False
        try:
            terminal_run.save(ignore_permissions=True)
        except Exception:  # noqa: BLE001 - controller throws on illegal transition
            blocked = True
        _check("terminal_state_cannot_revert", blocked)

        # Security: no raw-payload-like column exists in the persisted tables.
        run_cols = [row[0] for row in frappe.db.sql("SHOW COLUMNS FROM `tabFJK AI Interpretation Run`")]
        prop_cols = [row[0] for row in frappe.db.sql("SHOW COLUMNS FROM `tabFJK AI Proposal`")]
        _check("no_raw_column_in_tables", not any("raw" in c.lower() for c in run_cols + prop_cols))

        # Permissions: source-permission boundary; no new role.
        from feeljapank_crm import permissions as fjk_permissions

        probe = frappe._dict({"source_doctype": "DocType", "source_name": "CRM Deal"})
        _check(
            "admin_source_permission_allowed",
            fjk_permissions.has_source_permission(probe, ptype="read"),
        )
        frappe.set_user("Guest")
        try:
            guest_allowed = fjk_permissions.has_source_permission(probe, ptype="read")
        finally:
            frappe.set_user("Administrator")
        _check("guest_source_permission_denied", guest_allowed is False)
        _check("no_new_ai_role", not frappe.db.exists("Role", "FJK AI User"))

        # E. controlled failure paths -> correct terminal states, zero proposals.
        def _body(finish_reason="stop", content=None):
            inner = content if content is not None else {"proposals": []}
            return json.dumps(
                {"choices": [{"finish_reason": finish_reason, "message": {"content": json.dumps(inner)}}]}
            ).encode()

        def _failure_case(source_name, response_body, expected):
            raised = False
            try:
                persistence.interpret_and_persist(
                    _service(_FakeTransport(response=TransportResponse(status=200, body=response_body))),
                    _request(),
                    source_doctype="DocType",
                    source_name=source_name,
                    instruction_ref="stage0-instruction-v1",
                    output_contract_ref="stage0.proposal.v1",
                    provider="deepseek",
                    model="deepseek-flash",
                )
            except Exception:  # noqa: BLE001
                raised = True
            name = frappe.db.get_value(persistence.RUN_DOCTYPE, {"source_name": source_name}, "name")
            run = frappe.get_doc(persistence.RUN_DOCTYPE, name) if name else None
            _check("fail_{0}_raises".format(expected.lower()), raised)
            _check(
                "fail_{0}_status".format(expected.lower()),
                run is not None and run.status == expected,
                run.status if run else "no run",
            )
            _check(
                "fail_{0}_zero_proposals".format(expected.lower()),
                run is not None and run.proposal_count == 0,
            )

        _failure_case("CRM Lead", _body(finish_reason="length"), "INCOMPLETE")
        _failure_case("CRM Task", b"not-json", "MALFORMED")
        _failure_case("CRM Call Log", _body(content={"foo": 1}), "VALIDATION_FAILED")
        _failure_case(
            "File",
            _body(
                content={
                    "proposals": [
                        {
                            "domain": "Accommodation",
                            "logical_key": "k",
                            "proposed_value": "v",
                            "provenance_status": "explicit",
                            "deal": "DEAL-1",
                        }
                    ]
                }
            ),
            "POLICY_REJECTED",
        )
    finally:
        frappe.db.commit = real_commit
        frappe.db.rollback()

    failed_count = len([r for r in RESULTS if not r[1]])
    print("-" * 78)
    print(
        "FK-D12-D persistence tests: {0} passed, {1} failed".format(len(RESULTS) - failed_count, failed_count)
    )
    return list(RESULTS)


if __name__ == "__main__":  # pragma: no cover
    run_ai_persistence_tests()
