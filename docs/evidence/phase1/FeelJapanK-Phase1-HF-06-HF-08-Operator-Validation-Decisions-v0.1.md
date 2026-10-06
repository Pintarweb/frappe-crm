# FeelJapanK Phase 1 — HF-06 / HF-08 Operator Validation Decisions — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-06-HF-08-Operator-Validation-Decisions-v0.1 |
| STATUS | **DECISIONS RECORDED / READ-ONLY / NO BUILD AUTHORIZATION** |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Scope | Operator decisions closing the five FK-D12 questions for HF-06 (Transportation) and HF-08 (Accommodation) structured validation |

> This document records operator decisions. It authorizes no implementation and does not specify technical schema.

---

## 1. Status

`DECISIONS RECORDED / READ-ONLY / NO BUILD AUTHORIZATION`

## 2. Purpose & Context

- **HF-06** — Transportation structured validation (capacity/quantity).
- **HF-08** — Accommodation structured validation (rooming/allocation).
- **FK-D12 Architecture Review conclusion: C — STRUCTURED MODEL REQUIRED — FK-D12 PLAN REQUIRED BEFORE BUILD.**
- A structured model is required; **implementation is still not authorized**.
- This document closes the five unresolved operator/model questions identified in the FK-D12 review, by recording the operator's decisions.

## 3. Source Material Reviewed

- `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` (FROZEN).
- `docs/architecture/FeelJapanK-Phase1-N1-Presentation-Operator-Decisions-v0.1.md` (DG-1…DG-7; DG-2/DG-8 Info Complete).
- `docs/evidence/phase1/FeelJapanK-Phase1-HF-06-HF-08-Structured-Validation-Evidence-Assessment-v0.1.md`.
- `docs/evidence/phase1/FeelJapanK-Phase1-HF-06-HF-08-Structured-Validation-Plan-v0.1.md`.
- The completed FK-D12 Structured Validation Architecture Review (HF-06/HF-08), v0.1.
- `docs/operations/FeelJapanK-Phase1-Deal-Information-Gathering-Template-v0.2.md`.
- Current implementation (read-only): `FJK Deal Requirement Line`, Deal passenger fields, `get_deal_context` / `get_deal_summary` / `get_readiness`.

## 4. The Five Operator Questions and Answers

### Q1 — Passenger allocation granularity
**Decision: A — aggregate passenger quantities only.** Allocations record counts per unit (e.g. Vehicle 1: 8 pax, Vehicle 2: 8 pax, Vehicle 3: 4 pax). **No passenger identities.**

### Q2 — Transport passenger demand
**Decision: B — explicit demand per transport leg/day.** Each leg is validated against its own demand (a leg may legitimately be 18 while the Deal is 20).

### Q3 — Accommodation passenger demand
**Decision: B — explicit demand per hotel/stay/date range.** Stays may differ in demand.

### Q4 — Validation semantics
**Operator decision:** advisory; **non-blocking**; **ERROR only for contradictions / invalid data.**

Established state model: **PASS / WARNING / ERROR / NOT DETERMINABLE.**

Established semantics (no additional semantics invented):
- partial allocation → **WARNING**
- excess capacity → **WARNING**
- intentional operator override → **WARNING**
- unknown capacity → **NOT DETERMINABLE**
- contradiction / invalid data → **ERROR**

### Q5 — Structure split
**Decision: A — two distinct structures:**
- **Transportation allocation**
- **Accommodation allocation**

They share validation principles but remain **distinct business structures**.

## 5. Directly Stated Decisions vs Supported Conclusions vs Remaining Items

**Directly stated decisions:**
- aggregate allocation only
- no passenger identities
- per-leg/day transport demand
- per-stay/date-range accommodation demand
- advisory calculation
- operator-editable actual allocation
- recalculation after changes
- non-blocking validation
- two distinct allocation structures

**Conclusions supported by those decisions:**
- the Deal owns the allocation structures
- they remain pre-invoice
- they do not introduce Trip-like operational roster data
- **Deal ≠ Trip** remains intact

**Remaining implementation-plan details (NOT unresolved operator evidence):**
- precise definition of "contradiction / invalid data"
- whether demand is prefilled from Deal pax with operator override
- exact handling/wording when demand is MISSING or TO CONFIRM

## 6. Contradiction Check

Consistent with:
- the frozen roadmap;
- **Deal ≠ Trip**;
- pre-invoice Deal ownership;
- DG-1 through DG-7;
- existing HF-06 / HF-08 evidence;
- HF-09 exclusion (meals accepted under the current convention).

**No architectural conflict was identified.**

## 7. Frozen Principles Carried Forward

- calculation is **advisory, not prescriptive**
- the **operator controls** the actual allocation
- allocation changes **trigger recalculation/validation**
- **aggregate allocation only**
- **no passenger identities**
- **mixed vehicle types** supported
- **VIP/special vehicle allocation** supported
- **mixed accommodation configurations** supported
- **VIP/special room allocation** supported
- validation remains **non-blocking**
- **Deal-owned / pre-invoice**
- **no Trip or operational roster**

## 8. Validation Semantics

State model: **PASS / WARNING / ERROR / NOT DETERMINABLE**, per the approved principles in §4 (Q4). No new business rules are added.

## 9. Demand Granularity

- **Transportation:** per transport leg/day.
- **Accommodation:** per hotel/stay/date range.

## 10. Structure Decision

Two distinct **Deal-owned** structures:
- **Transportation Allocation**
- **Accommodation Allocation**

Shared validation principles are permitted, but they are separate business concepts. Technical DocType/field names are intentionally **not** specified in this document.

## 11. Sufficiency Statement

**EVIDENCE CLOSED → FK-D12 IMPLEMENTATION PLAN MAY PROCEED.**

This means the next PLAN stage may begin. It does **NOT** authorize BUILD.

## 12. Explicit Non-Authorization Statement

This document authorizes **no** implementation, schema change, custom field, child table, API, validation code, migration, CRM hook, frontend change, or other system modification.

## 13. Governance Safety Check

| Check | State |
|---|---|
| source code | unchanged |
| `App.vue` | unchanged |
| bundles | unchanged |
| schema | unchanged |
| DocTypes | unchanged |
| custom fields | unchanged |
| database | unchanged |
| CRM records | unchanged |
| configuration | unchanged |
| permissions | unchanged |
| integrations | unchanged |
| routes | unchanged |
| migrations | none |
| build | none |
| commit | none |
| push | none |

Actual `git status --short`: unchanged baseline — 3 pre-existing tracked documentation modifications dated 2026-09-29 (`Master-Plan`, `Deal-Information-Gathering-Template-v0.2`, `Manual-Enquiry-Deal-SOP-v0.2`) plus the pre-existing untracked `docs/` set. This document is added under the untracked `docs/evidence/phase1/` directory. Nothing staged.

---

*Created via OpenCode session on 2026-10-04. Documentation only. No source, schema, database, CRM, configuration, permission, route, or integration change; no build; no migration; no commit; no push. BUILD remains unauthorized.*
