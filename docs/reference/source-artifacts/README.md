# Source Artifacts — Captured Chat / Planning Inputs

**Location:** `docs/reference/source-artifacts/`
**Nature:** RAW / HISTORICAL SOURCE. These are captured chat/planning artifacts preserved for planning-history and decision-context recovery. **They are NOT implementation specifications by themselves and do NOT authorize implementation.** They do not override any frozen project decision.

## Contents

| File | Captured as | Notes |
|---|---|---|
| `Pasted text(20260930-143952).txt` | Supplier Quotation **Capability / Architecture Plan** v0.1 (PROPOSED) | Raw capture. Byte-for-byte from the session paste. |
| `Pasted markdown (2).md` | Supplier Quotation **Workflow Decisions** v0.1 (PROPOSED / DECISION RECORD) | Raw capture. **Truncated in the session paste** (ends mid-sentence at "Record the operator-approve…"); preserved exactly as captured — not repaired. |

## Provenance

- Captured from the OpenCode session store (`prompt-history`) for this session.
- These are conversations/planning artifacts, not authoritative decisions.
- Do not discard or treat as disposable; do not silently rewrite.

## Two-level retention

- **A. RAW / HISTORICAL SOURCE** — this folder (original wording preserved).
- **B. CURRENT RECONCILED PLAN** — the current PLAN documents (see below), which summarise and clearly distinguish established decisions / proposed decisions / provisional chat-only clarifications / unresolved questions.

## Relationship to current PLAN documents

- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Workflow-Decisions-v0.1.md` (persisted decision record; supersedes the truncated raw `.md` as the readable record, while the raw `.md` remains the historical capture).
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Capability-Architecture-Plan-v0.1.md` (persisted plan; supersedes the raw `.txt` as the readable record).
- `docs/architecture/FeelJapanK-Phase1-Customer-Quotation-Itinerary-Generation-Capability-Plan-v0.1.md`.
- `docs/architecture/FeelJapanK-Phase1-Quotation-Itinerary-Continuity-Addendum-v0.2.md` (references these raw artifacts).

## Deliberately NOT promoted to decisions (still provisional)

Content in these raw artifacts that remains **provisional/chat-only** and is therefore not treated as a frozen decision: markup default 20% adjustable per quotation/deal; tipping default JPY 500/person/day (skill documents 400); optional meals/add-ons may show prices; other amendments to the skill's rules. Also **OPEN**: currency/FX; markup basis/override mechanics; Final Quotation technical representation; itinerary data model; generation-service architecture; rule-encoding boundary.

## Integrity

- Original captured content preserved unchanged (no rewriting).
- No implementation, runtime, database, email, or CRM-record change is associated with these artifacts.
