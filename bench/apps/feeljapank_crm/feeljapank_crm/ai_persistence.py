"""FK-D12-D persistence boundary (frappe-aware; lives outside ``feeljapank_crm.ai``).

Persists the AI interpretation event and validated, NON-authoritative proposals:

    AIRequest -> D12-B transport -> D12-C validation -> AIResult -> Run + Proposals

Hard boundaries:
- persists ONLY ``AIResult.proposals`` and selected run metadata;
- NEVER persists ``AIResult.raw_payload`` / raw response / prompts / credentials;
- writes NO authoritative CRM data (no Deal/Company/Contact/Info-Status changes).

This module does not implement D12-F transaction/retry/reprocessing mechanics;
it establishes persisted identity (``run_key`` unique) and correctness invariants
only.
"""

from __future__ import annotations

import hashlib
import time
import uuid

import frappe
from frappe.utils import now

from feeljapank_crm.ai.errors import (
    AIProviderError,
    IncompleteResponseError,
    MalformedResponseError,
    PolicyViolationError,
    ValidationError,
)

RUN_DOCTYPE = "FJK AI Interpretation Run"
PROPOSAL_DOCTYPE = "FJK AI Proposal"
STATUS_PROCESSING = "PROCESSING"

# Proposal candidate fields persisted from the frozen D12-C output contract.
_CANDIDATE_FIELDS = (
    "domain",
    "logical_key",
    "proposed_value",
    "proposed_value_type",
    "provenance_status",
    "status_hint",
    "confidence",
    "uncertainty",
    "evidence_span",
    "target_hint",
)


def compute_source_state_ref(
    source_doctype: str, source_name: str, source_content_hash: str | None = None
) -> str:
    """Canonical source-state discriminator (D12.D.8), defined even without a hash."""
    if source_doctype == "File" and source_content_hash:
        return "file:{0}:{1}".format(source_name, source_content_hash)

    modified = frappe.db.get_value(source_doctype, source_name, "modified")
    if source_doctype == "Communication":
        ref = "communication:{0}:{1}".format(source_name, modified)
        if source_content_hash:
            ref += "|file:{0}".format(source_content_hash)
        return ref
    if source_content_hash:
        return "file:{0}:{1}".format(source_name, source_content_hash)
    return "doc:{0}:{1}:{2}".format(source_doctype, source_name, modified)


def compute_run_key(
    source_doctype: str,
    source_name: str,
    source_state_ref: str,
    instruction_ref: str,
    provider: str | None,
    model: str | None,
    reprocess_nonce: str | None = None,
) -> str:
    """Deterministic idempotency identity (D12.D.8); DS5 adds a reprocess nonce."""
    parts = [source_doctype, source_name, source_state_ref, instruction_ref, provider or "", model or ""]
    if reprocess_nonce:
        parts.append("reprocess:" + reprocess_nonce)
    return hashlib.sha256("|".join(parts).encode("utf-8")).hexdigest()


def _terminal_status(exc: AIProviderError) -> str:
    if isinstance(exc, PolicyViolationError):
        return "POLICY_REJECTED"
    if isinstance(exc, IncompleteResponseError):
        return "INCOMPLETE"
    if isinstance(exc, MalformedResponseError):
        return "MALFORMED"
    if isinstance(exc, ValidationError):
        return "VALIDATION_FAILED"
    return "FAILED"


def _redacted_error(exc: AIProviderError) -> str:
    # Class + category only; never the message/detail (avoids content leakage).
    category = getattr(exc, "category", None)
    return "{0}:{1}".format(type(exc).__name__, getattr(category, "value", ""))


def _create_or_get_run(
    *,
    source_doctype: str,
    source_name: str,
    source_content_hash: str | None,
    source_timestamp: str | None,
    instruction_ref: str,
    output_contract_ref: str,
    provider: str,
    model: str,
    reprocess_nonce: str | None = None,
) -> tuple[frappe.model.document.Document, bool]:
    source_state_ref = compute_source_state_ref(source_doctype, source_name, source_content_hash)
    run_key = compute_run_key(
        source_doctype, source_name, source_state_ref, instruction_ref, provider, model, reprocess_nonce
    )

    existing = frappe.db.get_value(RUN_DOCTYPE, {"run_key": run_key}, "name")
    if existing:
        return frappe.get_doc(RUN_DOCTYPE, existing), True

    run = frappe.new_doc(RUN_DOCTYPE)
    run.status = STATUS_PROCESSING
    run.source_doctype = source_doctype
    run.source_name = source_name
    run.source_state_ref = source_state_ref
    run.source_content_hash = source_content_hash
    run.source_timestamp = source_timestamp
    run.instruction_ref = instruction_ref
    run.output_contract_ref = output_contract_ref
    run.provider = provider
    run.model = model
    run.run_key = run_key
    run.started_at = now()
    run.proposal_count = 0
    run.insert(ignore_permissions=True)
    return run, False


def _finalize_failure(run, exc: AIProviderError) -> None:
    run.reload()
    run.status = _terminal_status(exc)
    run.error_category = getattr(getattr(exc, "category", None), "value", None)
    run.error_message_redacted = _redacted_error(exc)
    run.completed_at = now()
    run.proposal_count = 0
    run.save(ignore_permissions=True)
    frappe.db.commit()


def _finalize_success(run, result, elapsed_seconds: float) -> list[str]:
    run.reload()
    meta = result.provider_meta
    if not run.model_fingerprint:
        run.model_fingerprint = meta.model_fingerprint
    if not run.provider_request_id:
        run.provider_request_id = meta.request_id
    if not run.provider_response_id:
        run.provider_response_id = meta.response_id
    run.finish_reason = result.finish_reason

    usage = result.usage
    run.usage_input_tokens = usage.input_tokens
    run.usage_output_tokens = usage.output_tokens
    run.usage_total_tokens = usage.total_tokens
    run.usage_cache_hit_tokens = usage.cached_tokens
    run.usage_cache_miss_tokens = 0
    run.elapsed_seconds = elapsed_seconds

    proposal_names: list[str] = []
    for candidate in result.proposals:
        proposal = frappe.new_doc(PROPOSAL_DOCTYPE)
        proposal.run = run.name
        proposal.source_doctype = run.source_doctype
        proposal.source_name = run.source_name
        for field in _CANDIDATE_FIELDS:
            value = candidate.get(field)
            if field == "proposed_value" and value is not None:
                value = str(value)
            setattr(proposal, field, value)
        proposal.lifecycle_state = "PROPOSED"
        proposal.insert(ignore_permissions=True)
        proposal_names.append(proposal.name)

    run.proposal_count = len(proposal_names)
    run.status = "SUCCEEDED"
    run.completed_at = now()
    run.save(ignore_permissions=True)
    frappe.db.commit()
    return proposal_names


def interpret_and_persist(
    service,
    request,
    *,
    source_doctype: str,
    source_name: str,
    instruction_ref: str,
    output_contract_ref: str,
    provider: str,
    model: str,
    source_content_hash: str | None = None,
    source_timestamp: str | None = None,
    reprocess: bool = False,
) -> dict:
    """Run D12-B/C through ``service`` and persist Run (+ Proposals on success).

    Never persists ``AIResult.raw_payload``. A failed run is persisted with a
    terminal status and zero proposals; the exception is re-raised.

    DS5: ``reprocess=True`` is an explicit human-triggered NEW interpretation —
    it adds a nonce to the run identity so a new Run is created and prior
    Run/Proposals are retained (never auto-triggered).
    """
    run, reused = _create_or_get_run(
        source_doctype=source_doctype,
        source_name=source_name,
        source_content_hash=source_content_hash,
        source_timestamp=source_timestamp,
        instruction_ref=instruction_ref,
        output_contract_ref=output_contract_ref,
        provider=provider,
        model=model,
        reprocess_nonce=(uuid.uuid4().hex if reprocess else None),
    )
    if reused:
        return {"run": run.name, "run_key": run.run_key, "proposals": [], "reused": True}

    # Persist PROCESSING before the external call so a crash remains auditable.
    frappe.db.commit()

    started = time.monotonic()
    try:
        result = service.interpret(request)
    except AIProviderError as exc:
        _finalize_failure(run, exc)
        raise
    except Exception as exc:  # noqa: BLE001 - any failure is recorded, never SUCCEEDED
        _finalize_failure(
            run,
            AIProviderError("Unhandled persistence-path failure: {0}".format(type(exc).__name__)),
        )
        raise

    proposal_names = _finalize_success(run, result, time.monotonic() - started)
    return {
        "run": run.name,
        "run_key": run.run_key,
        "proposals": proposal_names,
        "reused": False,
    }
