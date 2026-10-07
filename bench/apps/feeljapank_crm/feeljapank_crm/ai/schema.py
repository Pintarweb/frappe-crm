"""Application-side schema contract for FK-D12-C (frappe-free).

Constants and small pure helpers only — no I/O, no ``frappe``, no dependencies.
The validator (``ai/validation.py``) is the security boundary: the system prompt
is NOT trusted to enforce the contract.
"""

from __future__ import annotations

import re

# FJK requirement domains (FACT: ai/../doctype FJK Deal Requirement Line / Component).
ALLOWED_DOMAINS = frozenset(
    {
        "Accommodation",
        "Transportation",
        "Meals",
        "Flights",
        "Special Requirements",
        "Other",
        "Tour Guide",
        "Activities & Tickets",
    }
)

PROVENANCE_STATUSES = frozenset({"explicit", "inferred", "ambiguous"})

# AI may only hint these; CUSTOMER-CONFIRMED is forbidden (Open item: NOT APPLICABLE).
STATUS_HINTS = frozenset({"KNOWN", "MISSING", "TO CONFIRM"})

ENVELOPE_REQUIRED = ("proposals",)
ENVELOPE_OPTIONAL = ("deal_resolution", "missing_information", "ambiguities")
DEAL_RESOLUTION_ALLOWED = ("candidates", "ambiguity")

CANDIDATE_REQUIRED = ("domain", "logical_key", "proposed_value", "provenance_status")
CANDIDATE_OPTIONAL = (
    "proposed_value_type",
    "status_hint",
    "confidence",
    "uncertainty",
    "evidence_span",
    "target_hint",
)
CANDIDATE_ALLOWED = frozenset(CANDIDATE_REQUIRED) | frozenset(CANDIDATE_OPTIONAL)

# Keys/values attempting to cross an authority/security boundary => hard reject.
FORBIDDEN_KEYS = frozenset(
    {
        "deal",
        "selected",
        "selected_deal",
        "organization",
        "company",
        "contact",
        "customer_confirmed",
        "customer-confirmed",
        "confirmed",
        "info_complete",
        "ready_for_quotation",
        "approved",
        "approval",
        "promote",
        "promotion",
        "actions",
        "tool_calls",
        "function_call",
        "supplier_quotation",
        "customer_quotation",
        "crm_write",
        "authoritative",
        "sql",
        "code",
        "update_doc",
        "set_value",
    }
)

MAX_CANDIDATES = 200
MAX_STRING_LEN = 4000
MAX_ARRAY_LEN = 100

SECRET_PATTERNS: tuple[re.Pattern[str], ...] = (
    re.compile(r"(?i)bearer\s+[A-Za-z0-9._\-]{16,}"),
    re.compile(r"\bsk-[A-Za-z0-9]{16,}\b"),
    re.compile(r"(?i)api[_-]?key\b"),
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    re.compile(r"\bgh[pousr]_[A-Za-z0-9]{20,}\b"),
)

# Hostile output signatures (instruction override / code / CRM mutation).
HOSTILE_PATTERNS: tuple[re.Pattern[str], ...] = (
    re.compile(r"(?i)ignore (all |your |the )?(previous |prior |above )?instructions"),
    re.compile(r"(?i)disregard (the |all |your )?(system|previous|above)"),
    re.compile(r"(?i)\b(system|developer|assistant)\s*:"),
    re.compile(r"(?i)\bdelete\s+from\b|\binsert\s+into\b|\bupdate\s+\w+\s+set\b"),
    re.compile(r"(?i)\bfrappe\."),
    re.compile(r"(?i)\b(db\.set_value|update_doc|new_doc|get_doc)\b"),
    re.compile(r"(?i)\.(insert|save|submit)\s*\("),
    re.compile(r"(?i)\b(tool_calls|function_call)\b"),
    re.compile(r"(?i)<script\b"),
    re.compile(r"(?i)\b(eval|exec)\s*\("),
)


def contains_secret(value: str) -> bool:
    return any(p.search(value) for p in SECRET_PATTERNS)


def contains_hostile(value: str) -> bool:
    return any(p.search(value) for p in HOSTILE_PATTERNS)
