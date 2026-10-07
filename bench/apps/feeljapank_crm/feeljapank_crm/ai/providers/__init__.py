"""Provider registry for the FK-D12 AI adapter boundary.

Adding a future provider requires only a new module and a registry entry; the
proposal/provenance model and CRM remain untouched (provider neutrality).
"""

from __future__ import annotations

from ..interface import AIProvider
from .deepseek import DeepSeekProvider
from .fake import FakeProvider

PROVIDERS: dict[str, type[AIProvider]] = {
    "deepseek": DeepSeekProvider,
    "fake": FakeProvider,
}


def register(name: str, provider_cls: type[AIProvider]) -> None:
    """Register (or replace) a provider class under ``name``."""
    PROVIDERS[name] = provider_cls


def get_provider(name: str, **kwargs) -> AIProvider:
    """Instantiate a registered provider by name."""
    if name not in PROVIDERS:
        raise KeyError("Unknown AI provider: {0}".format(name))
    return PROVIDERS[name](**kwargs)
