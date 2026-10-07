"""Provider-neutral transport configuration for the FK-D12 AI adapter.

Frappe-free. Contains NO credentials and performs NO I/O. Secrets are injected
by the frappe-aware wiring module (``feeljapank_crm.ai_wiring``) outside ``ai/``.

Proxy clarification (frozen): the transport MUST NOT implicitly honour arbitrary
proxy environment variables. ``use_proxy_env`` defaults to ``False``; enabling
proxy support is an explicit configuration decision requiring a governance change.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Protocol, runtime_checkable


@dataclass(frozen=True)
class ProviderConfig:
    """Bounded, fixed transport configuration for one provider endpoint."""

    provider: str
    model: str
    endpoint: str
    allowed_hosts: tuple[str, ...]
    allowed_scheme: str = "https"
    allowed_port: int = 443
    allow_redirects: bool = False
    verify_tls: bool = True

    # Timeouts are bounded and never None (separate conceptual limits).
    connect_timeout: float = 10.0
    read_timeout: float = 60.0

    # Size controls.
    max_response_bytes: int = 1_048_576  # 1 MiB
    max_source_chars: int = 20_000

    # Proxy: explicit opt-in only; default forbids env-proxy inheritance.
    use_proxy_env: bool = False

    # Bounded retry boundary (exact counts/backoff OPEN; mechanism owned by D12-B).
    max_attempts: int = 1
    backoff_seconds: float = 1.0

    # Additional context keys permitted to leave the environment.
    allowed_context_keys: tuple[str, ...] = field(default=("language", "target_domains"))


@runtime_checkable
class SecretProvider(Protocol):
    """Injected server-side secret lookup (no I/O inside ``ai/``)."""

    def get_secret(self, name: str) -> str | None: ...
