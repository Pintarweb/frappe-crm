"""Deterministic fake provider for FK-D12-A interface/contract tests.

No network, no ``frappe``, no credentials. Modes reproduce the behaviours the
interface must normalize: success, empty, malformed, error, incomplete.
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from ..errors import (
    IncompleteResponseError,
    MalformedResponseError,
    ProviderUnavailableError,
)
from ..interface import AIProvider
from ..types import AIResult, CompletionStatus, ProviderMeta, Usage

if TYPE_CHECKING:  # pragma: no cover - typing only
    from ..types import AIRequest

MODES = ("success", "empty", "malformed", "error", "incomplete")

_SAMPLE_PROPOSAL = {
    "domain": "Accommodation",
    "logical_key": "accommodation.kyoto.nights",
    "proposed_value": "3 nights",
    "provenance_status": "explicit",
    "status_hint": "KNOWN",
    "target_hint": "CRM Deal.fjk_accommodation_allocations",
}


class FakeProvider(AIProvider):
    """Deterministic provider used only in tests (never in production)."""

    name = "fake"

    def __init__(self, mode: str = "success", model: str = "fake-1") -> None:
        if mode not in MODES:
            raise ValueError("Unknown FakeProvider mode: {0}".format(mode))
        self.mode = mode
        self.model = model

    def interpret(self, request: "AIRequest") -> AIResult:
        if self.mode == "error":
            raise ProviderUnavailableError("fake provider unavailable")
        if self.mode == "malformed":
            raise MalformedResponseError("fake provider returned malformed output")
        if self.mode == "incomplete":
            raise IncompleteResponseError("fake provider returned incomplete output (finish_reason=length)")

        proposals = [] if self.mode == "empty" else [dict(_SAMPLE_PROPOSAL)]
        return AIResult(
            provider_meta=ProviderMeta(
                provider=self.name,
                model=self.model,
                model_fingerprint="fake-fingerprint",
                request_id="fake-request-id",
                response_id="fake-response-id",
            ),
            status=CompletionStatus.OK,
            proposals=proposals,
            usage=Usage(input_tokens=1, output_tokens=2, total_tokens=3),
            finish_reason="stop",
        )
