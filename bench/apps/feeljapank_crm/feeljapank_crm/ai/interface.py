"""Provider-neutral AI provider interface (FK-D12-A).

The interface returns interpretation results only. It has no authority to write
CRM data, resolve Deals, set Information Status, or mark confirmation. Transport,
validation and persistence are later phases.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import TYPE_CHECKING

if TYPE_CHECKING:  # pragma: no cover - typing only
    from .types import AIRequest, AIResult


class AIProvider(ABC):
    """Abstract provider adapter. Implementations are synchronous at D12-A.

    ``interpret`` MUST be server-side only and MUST NOT be exposed as a
    frontend-callable method.
    """

    name: str = ""

    @abstractmethod
    def interpret(self, request: "AIRequest") -> "AIResult":
        """Interpret a normalized request and return a normalized result."""
        raise NotImplementedError
