"""AIService facade (FK-D12).

Applies the minimum-necessary egress filter, delegates interpretation, then runs
D12-C validation over the transient untrusted payload and clears it. Never writes
CRM data and never persists anything.
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from . import providers as _providers
from .egress import EgressFilter
from .interface import AIProvider
from .validation import ProposalValidator

if TYPE_CHECKING:  # pragma: no cover - typing only
    from .types import AIRequest, AIResult

_DEFAULT_VALIDATOR = object()


class AIService:
    """Provider-neutral facade over an :class:`AIProvider`."""

    def __init__(
        self,
        provider: AIProvider | None = None,
        provider_name: str | None = None,
        egress: EgressFilter | None = None,
        validator: ProposalValidator | None | object = _DEFAULT_VALIDATOR,
    ) -> None:
        if provider is not None:
            self.provider = provider
        elif provider_name is not None:
            self.provider = _providers.get_provider(provider_name)
        else:
            raise ValueError("AIService requires 'provider' or 'provider_name'")
        self.egress = egress
        # Default: validate. Pass validator=None to disable (payload still cleared).
        self.validator: ProposalValidator | None
        if validator is _DEFAULT_VALIDATOR:
            self.validator = ProposalValidator()
        else:
            self.validator = validator  # type: ignore[assignment]

    def interpret(self, request: "AIRequest") -> "AIResult":
        if self.egress is not None:
            request = self.egress.filter(request)

        result = self.provider.interpret(request)
        try:
            if self.validator is not None and result.raw_payload is not None:
                result.proposals = self.validator.validate(
                    raw_payload=result.raw_payload,
                    request=request,
                    provider_meta=result.provider_meta,
                    finish_reason=result.finish_reason,
                )
            else:
                # Fail closed: no validator or no payload => no proposals.
                result.proposals = []
        finally:
            # Non-persistence boundary: never let the raw payload leave the service.
            result.raw_payload = None
        return result
