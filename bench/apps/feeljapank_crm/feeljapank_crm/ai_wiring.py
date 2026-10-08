"""Frappe-aware wiring for the FK-D12 AI adapter (server-side only).

This module is the ONLY place that reads the provider credential. It lives
outside ``feeljapank_crm.ai`` so the ``ai`` package stays frappe-free.

- The credential is read from the Frappe site secret store (``frappe.conf`` /
  gitignored ``site_config.json``) and injected into the provider.
- It is never logged, never returned, never placed in a request/result, and
  never exposed to the frontend.
- NOT decorated with ``@frappe.whitelist`` (not RPC-callable).

No credential is created here; provisioning is a separate controlled operation.
"""

from __future__ import annotations

import frappe

from feeljapank_crm.ai.config import ProviderConfig, SecretProvider
from feeljapank_crm.ai.egress import EgressFilter
from feeljapank_crm.ai.providers.deepseek import DeepSeekProvider
from feeljapank_crm.ai.service import AIService
from feeljapank_crm.ai.transport import HTTPTransport, RetryingTransport

DEEPSEEK_SECRET_NAME = "deepseek_api_key"


def _deepseek_config() -> ProviderConfig:
    return ProviderConfig(
        provider="deepseek",
        model="deepseek-flash",
        endpoint="https://api.deepseek.com/chat/completions",
        allowed_hosts=("api.deepseek.com",),
    )


class FrappeConfSecretProvider(SecretProvider):
    """Read secrets from the Frappe site configuration (server-side only)."""

    def get_secret(self, name: str) -> str | None:
        return frappe.conf.get(name)


def build_deepseek_service(secret_provider: SecretProvider | None = None) -> AIService:
    """Construct an :class:`AIService` for DeepSeek with a controlled transport.

    Missing credential does not fail here; the provider fails closed on
    ``interpret`` (``AuthenticationError``) so no egress occurs without a key.
    """
    secrets = secret_provider or FrappeConfSecretProvider()
    api_key = secrets.get_secret(DEEPSEEK_SECRET_NAME)
    config = _deepseek_config()
    transport = RetryingTransport(
        HTTPTransport(config),
        max_attempts=config.max_attempts,
        backoff_seconds=config.backoff_seconds,
        backoff_cap=config.backoff_cap,
        jitter=config.retry_jitter,
    )
    provider = DeepSeekProvider(config=config, transport=transport, api_key=api_key)
    return AIService(provider=provider, egress=EgressFilter(config))
