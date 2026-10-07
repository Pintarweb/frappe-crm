"""Normalized provider error taxonomy for the FK-D12 AI adapter boundary.

This module classifies provider failures only. It deliberately does NOT define
retry behaviour, timeouts or transport — that belongs to the later transport
phase (D12-B). No ``frappe`` import; no network; no credentials.
"""

from __future__ import annotations

from enum import Enum


class ErrorCategory(str, Enum):
    """Provider-neutral failure categories."""

    AUTHENTICATION = "authentication"
    AUTHORIZATION_BILLING = "authorization_billing"
    INVALID_REQUEST = "invalid_request"
    RATE_LIMIT = "rate_limit"
    PROVIDER_UNAVAILABLE = "provider_unavailable"
    TIMEOUT = "timeout"
    MALFORMED_RESPONSE = "malformed_response"
    INCOMPLETE_RESPONSE = "incomplete_response"
    VALIDATION = "validation"


class AIProviderError(Exception):
    """Base class for all normalized provider errors.

    ``provider_detail`` is intended for redacted provider context only and must
    never contain credentials, secrets or raw customer data.
    """

    category: ErrorCategory = ErrorCategory.PROVIDER_UNAVAILABLE

    def __init__(
        self,
        message: str,
        *,
        provider_detail: str | None = None,
        category: ErrorCategory | None = None,
    ) -> None:
        self.message = message
        self.provider_detail = provider_detail
        if category is not None:
            self.category = category
        super().__init__(message)

    def __repr__(self) -> str:
        return "{0}(category={1!r}, message={2!r})".format(
            type(self).__name__, self.category.value, self.message
        )


class AuthenticationError(AIProviderError):
    category = ErrorCategory.AUTHENTICATION


class AuthorizationBillingError(AIProviderError):
    category = ErrorCategory.AUTHORIZATION_BILLING


class InvalidRequestError(AIProviderError):
    category = ErrorCategory.INVALID_REQUEST


class RateLimitError(AIProviderError):
    category = ErrorCategory.RATE_LIMIT


class ProviderUnavailableError(AIProviderError):
    category = ErrorCategory.PROVIDER_UNAVAILABLE


class ProviderTimeoutError(AIProviderError):
    category = ErrorCategory.TIMEOUT


class MalformedResponseError(AIProviderError):
    category = ErrorCategory.MALFORMED_RESPONSE


class IncompleteResponseError(AIProviderError):
    category = ErrorCategory.INCOMPLETE_RESPONSE


class ValidationError(AIProviderError):
    category = ErrorCategory.VALIDATION


class PolicyViolationError(ValidationError):
    """Output attempting to cross an authority/security boundary (D12-C).

    Distinct from ordinary schema/semantic ``ValidationError`` so callers can
    treat authority/credential/instruction attempts as hostile output.
    """
