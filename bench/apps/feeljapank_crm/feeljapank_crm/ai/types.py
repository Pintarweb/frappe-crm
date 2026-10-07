"""Normalized, provider-neutral request/result types for the FK-D12 AI boundary.

These types intentionally carry NO credentials and produce NO authoritative CRM
data. ``AIResult.proposals`` are candidate payloads only — the proposal lifecycle
and authoritative promotion are later phases (D12-D/D12-E).

No ``frappe`` import; no network.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any

from .errors import AIProviderError


class CompletionStatus(str, Enum):
    """Normalized completion status of a provider call."""

    OK = "ok"
    ERROR = "error"


@dataclass
class ProviderMeta:
    """Provider/model identity and provider request/response identifiers."""

    provider: str
    model: str
    model_fingerprint: str | None = None
    request_id: str | None = None
    response_id: str | None = None


@dataclass
class Usage:
    """Token usage metadata reported by the provider (zeros when unknown)."""

    input_tokens: int = 0
    output_tokens: int = 0
    total_tokens: int = 0
    reasoning_tokens: int = 0
    cached_tokens: int = 0


@dataclass
class AIRequest:
    """Normalized interpretation request.

    ``source_text`` is UNTRUSTED customer-originated content and must be treated
    as data, never as instructions. ``instruction`` is FeelJapanK-controlled.
    ``context`` is the minimal structured context required for interpretation.
    """

    instruction_ref: str
    instruction: str
    source_kind: str
    source_id: str
    source_text: str
    output_contract_ref: str
    context: dict[str, Any] = field(default_factory=dict)
    request_meta: dict[str, Any] = field(default_factory=dict)


@dataclass
class AIResult:
    """Normalized interpretation result. Never authoritative CRM data."""

    provider_meta: ProviderMeta
    status: CompletionStatus = CompletionStatus.OK
    proposals: list[dict[str, Any]] = field(default_factory=list)
    usage: Usage = field(default_factory=Usage)
    finish_reason: str | None = None
    error: AIProviderError | None = None
    # Transient, UNTRUSTED provider payload (D12-B -> D12-C). Never persisted,
    # never logged; suppressed from repr; cleared by AIService on every path.
    raw_payload: dict[str, Any] | None = field(default=None, repr=False)
