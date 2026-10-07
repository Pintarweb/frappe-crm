"""Provider-neutral AI adapter boundary for FeelJapanK Stage 0 (FK-D12-A skeleton).

This package deliberately contains:
- NO ``frappe`` imports (provider-neutral, site-independent, unit-testable);
- NO network implementation (transport belongs to D12-B);
- NO credentials and NO configuration reads;
- NO persistence and NO CRM writes.

Later phases (D12-B transport/egress, D12-C validation, D12-D run/provenance,
D12-E proposal/review) build on this interface boundary.
"""

__all__ = ["errors", "interface", "providers", "service", "types"]
