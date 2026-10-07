"""Minimum-necessary egress filter for the FK-D12 AI adapter (frappe-free).

Enforces, at the normalized ``AIRequest`` layer:
- source size limits (no oversized customer payloads);
- allowed context keys only (no full-record dumps);
- rejection of secret-like content (credentials must never leave the system).

The filter rejects rather than silently redacts, so a caller can never believe a
secret was scrubbed when it was not. It performs no I/O and no DB access.
"""

from __future__ import annotations

import re

from .config import ProviderConfig
from .types import AIRequest

# Secret-like signatures that must never appear in an outbound payload.
_SECRET_PATTERNS: tuple[re.Pattern[str], ...] = (
    re.compile(r"(?i)bearer\s+[A-Za-z0-9._\-]{16,}"),
    re.compile(r"\bsk-[A-Za-z0-9]{16,}\b"),
    re.compile(r"(?i)api[_-]?key\b"),
    re.compile(r"(?i)\bsecret\b\s*[:=]"),
    re.compile(r"(?i)\bpassword\b\s*[:=]"),
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    re.compile(r"\bgh[pousr]_[A-Za-z0-9]{20,}\b"),
)


class EgressRejectedError(ValueError):
    """Raised when an outbound request violates the minimum-egress policy."""

    def __init__(self, reason: str) -> None:
        self.reason = reason
        super().__init__(reason)


class EgressFilter:
    """Validate/normalize an outbound ``AIRequest`` before transmission."""

    def __init__(self, config: ProviderConfig) -> None:
        self.config = config

    def _check_secrets(self, field_name: str, text: str) -> None:
        for pattern in _SECRET_PATTERNS:
            if pattern.search(text):
                raise EgressRejectedError(
                    "Egress blocked: secret-like content detected in {0}".format(field_name)
                )

    def filter(self, request: AIRequest) -> AIRequest:
        """Return a validated request or raise :class:`EgressRejectedError`."""
        source = request.source_text or ""
        if len(source) > self.config.max_source_chars:
            raise EgressRejectedError(
                "Egress blocked: source exceeds {0} characters".format(self.config.max_source_chars)
            )

        disallowed_context = set(request.context or {}) - set(self.config.allowed_context_keys)
        if disallowed_context:
            raise EgressRejectedError(
                "Egress blocked: disallowed context keys {0}".format(sorted(disallowed_context))
            )

        self._check_secrets("instruction", request.instruction or "")
        self._check_secrets("source", source)
        for key, value in (request.context or {}).items():
            self._check_secrets("context.{0}".format(key), str(value))

        return request
