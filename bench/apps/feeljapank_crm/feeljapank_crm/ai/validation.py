"""FK-D12-C response validation (frappe-free, no I/O).

Consumes the transient, UNTRUSTED ``AIResult.raw_payload`` and returns normalized,
NON-authoritative proposal candidates — or raises a normalized error.

The validator is the security boundary; the model/system prompt is not trusted.
It performs no I/O, no database access, no CRM mutation, and never executes
anything present in the provider output.
"""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from . import schema as S
from .errors import (
    IncompleteResponseError,
    MalformedResponseError,
    PolicyViolationError,
    ValidationError,
)

if TYPE_CHECKING:  # pragma: no cover - typing only
    from .types import AIRequest, ProviderMeta

_COMPLETE_FINISH_REASONS = frozenset({"stop"})
_OPTIONAL_STRINGS = ("proposed_value_type", "uncertainty", "evidence_span", "target_hint")


class ProposalValidator:
    """Validate an untrusted provider payload into normalized candidates."""

    def validate(
        self,
        *,
        raw_payload: object,
        request: "AIRequest | None" = None,
        provider_meta: "ProviderMeta | None" = None,
        finish_reason: str | None = None,
    ) -> list[dict[str, Any]]:
        # Gate BEFORE consuming the payload (D12-C.4 / D12.C.21).
        if finish_reason not in _COMPLETE_FINISH_REASONS:
            raise IncompleteResponseError(
                "Provider response incomplete (finish_reason={0!r})".format(finish_reason)
            )
        if not isinstance(raw_payload, dict):
            raise MalformedResponseError("Provider payload is not a JSON object")

        self._reject_forbidden_keys(raw_payload, "envelope")
        if "proposals" not in raw_payload:
            raise ValidationError("Missing required envelope field: proposals")

        proposals = raw_payload["proposals"]
        if not isinstance(proposals, list):
            raise ValidationError("Envelope 'proposals' must be a list")
        if len(proposals) > S.MAX_CANDIDATES:
            raise ValidationError("Too many proposals (>{0})".format(S.MAX_CANDIDATES))

        self._validate_deal_resolution(raw_payload.get("deal_resolution"))
        self._validate_string_list(raw_payload.get("missing_information"), "missing_information")
        self._validate_string_list(raw_payload.get("ambiguities"), "ambiguities")

        return [self._validate_candidate(cand, i) for i, cand in enumerate(proposals)]

    # -- helpers ---------------------------------------------------------

    def _reject_forbidden_keys(self, obj: object, where: str) -> None:
        if not isinstance(obj, dict):
            return
        for key in obj:
            if str(key).strip().lower() in S.FORBIDDEN_KEYS:
                raise PolicyViolationError("Forbidden authority key {0!r} in {1}".format(key, where))

    def _reject_hostile_value(self, value: object, where: str) -> None:
        if isinstance(value, str):
            if S.contains_secret(value):
                raise PolicyViolationError("Secret-like content in {0}".format(where))
            if S.contains_hostile(value):
                raise PolicyViolationError("Hostile instruction/code in {0}".format(where))

    def _validate_string_list(self, value: object, where: str) -> None:
        if value is None:
            return
        if not isinstance(value, list) or len(value) > S.MAX_ARRAY_LEN:
            raise ValidationError("{0} must be a list".format(where))
        for item in value:
            if not isinstance(item, str):
                raise ValidationError("{0} items must be strings".format(where))
            self._reject_hostile_value(item, where)

    def _validate_deal_resolution(self, value: object) -> None:
        if value is None:
            return
        if not isinstance(value, dict):
            raise ValidationError("deal_resolution must be an object")
        self._reject_forbidden_keys(value, "deal_resolution")
        for key in value:
            if key not in S.DEAL_RESOLUTION_ALLOWED:
                raise PolicyViolationError(
                    "Unsupported deal_resolution key {0!r} (no authoritative selection)".format(key)
                )
        candidates = value.get("candidates")
        if candidates is not None:
            if not isinstance(candidates, list) or len(candidates) > S.MAX_ARRAY_LEN:
                raise ValidationError("deal_resolution.candidates must be a list")
            for entry in candidates:
                self._reject_hostile_value(str(entry), "deal_resolution.candidates")
        self._reject_hostile_value(str(value.get("ambiguity", "")), "deal_resolution.ambiguity")

    def _validate_candidate(self, candidate: object, index: int) -> dict[str, Any]:
        where = "proposals[{0}]".format(index)
        if not isinstance(candidate, dict):
            raise ValidationError("{0} must be an object".format(where))
        self._reject_forbidden_keys(candidate, where)

        for field in S.CANDIDATE_REQUIRED:
            if field not in candidate:
                raise ValidationError("{0} missing required field {1!r}".format(where, field))

        domain = candidate["domain"]
        if not isinstance(domain, str) or domain not in S.ALLOWED_DOMAINS:
            raise ValidationError("{0}.domain invalid: {1!r}".format(where, domain))

        logical_key = candidate["logical_key"]
        if not isinstance(logical_key, str) or not logical_key.strip() or len(logical_key) > S.MAX_STRING_LEN:
            raise ValidationError("{0}.logical_key invalid".format(where))
        self._reject_hostile_value(logical_key, where + ".logical_key")

        value = candidate["proposed_value"]
        if value is None or isinstance(value, (dict, list)):
            raise ValidationError("{0}.proposed_value invalid".format(where))
        if isinstance(value, str):
            if not value.strip() or len(value) > S.MAX_STRING_LEN:
                raise ValidationError("{0}.proposed_value invalid".format(where))
            self._reject_hostile_value(value, where + ".proposed_value")

        provenance = candidate["provenance_status"]
        if provenance not in S.PROVENANCE_STATUSES:
            raise ValidationError("{0}.provenance_status invalid: {1!r}".format(where, provenance))

        if "status_hint" in candidate and candidate["status_hint"] is not None:
            if candidate["status_hint"] not in S.STATUS_HINTS:
                raise PolicyViolationError(
                    "{0}.status_hint not permitted: {1!r}".format(where, candidate["status_hint"])
                )

        confidence = candidate.get("confidence")
        if confidence is not None:
            if isinstance(confidence, bool) or not isinstance(confidence, (int, float)):
                raise ValidationError("{0}.confidence must be a number".format(where))
            if not 0.0 <= float(confidence) <= 1.0:
                raise ValidationError("{0}.confidence out of range".format(where))

        for field in _OPTIONAL_STRINGS:
            optional = candidate.get(field)
            if optional is None:
                continue
            if not isinstance(optional, str) or len(optional) > S.MAX_STRING_LEN:
                raise ValidationError("{0}.{1} must be a bounded string".format(where, field))
            self._reject_hostile_value(optional, where + "." + field)

        # Deterministic normalization: allowed keys only; strip string whitespace.
        normalized: dict[str, Any] = {}
        for field in S.CANDIDATE_ALLOWED:
            if field in candidate and candidate[field] is not None:
                item = candidate[field]
                normalized[field] = item.strip() if isinstance(item, str) else item
        return normalized
