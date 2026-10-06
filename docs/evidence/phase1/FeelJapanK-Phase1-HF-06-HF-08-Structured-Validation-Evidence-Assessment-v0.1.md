# FeelJapanK Phase 1 — HF-06 / HF-08 Structured Validation — Evidence Assessment — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-06-HF-08-Structured-Validation-Evidence-Assessment-v0.1 |
| STATUS | **PLAN / READ-ONLY — NOT IMPLEMENTED — NO BUILD AUTHORIZATION** |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Scope | Reclassification of HF-06 (Transportation capacity/quantity) and HF-08 (Accommodation rooming/allocation) based on new operator evidence; record HF-09 as accepted |

> This document records evidence and classification only. It designs no schema and authorizes no implementation.

---

## 1. Purpose

Record the new genuine human evidence that **HF-06** and **HF-08** require **machine validation with operator override**, reclassify them, and record that **HF-09** is accepted under the current convention (no structured-model escalation).

## 2. Evidence reviewed

- Frozen roadmap: `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md`.
- Operator decisions: `docs/architecture/FeelJapanK-Phase1-N1-Presentation-Operator-Decisions-v0.1.md` (DG-1…DG-7; DG-2/DG-8 Info Complete).
- `docs/evidence/phase1/FeelJapanK-Phase1-Human-Acceptance-Finding-Assessment-v0.1.md`.
- `docs/evidence/phase1/FeelJapanK-Phase1-Remaining-Findings-Post-Day-Detail-Acceptance-v0.1.md`.
- Latest Full Details implementation verification + human-acceptance closure documents.
- Prior `…HF-06-HF-08-HF-09-Structured-Capture-Evidence-Assessment-Plan` (earlier C+D classification).
- `FJK Deal Requirement Line` DocType definition; `d1.py` statuses; `api.py` `get_readiness`.
- `docs/operations/FeelJapanK-Phase1-Deal-Information-Gathering-Template-v0.2.md` (Transportation §6, Accommodation §5).
- Controlled test Deal `CRM-DEAL-2026-00022` requirement-line examples.

## 3. Operator evidence (new)

1. **Transportation = CALCULATE.** The operator does not merely want visibility. The system must **validate** Transportation capacity/quantity calculations while allowing the operator to **change** the allocation. Example: 20 passengers may mathematically suggest 3 × 8-seat vehicles, but a VIP passenger may require a separate car; the operator must be able to change/add allocations even when the mathematical default is otherwise sufficient. The system should validate the resulting allocation rather than force the calculated default.
2. **Accommodation = CALCULATE.** The system must **validate** rooming/allocation while allowing different configurations. Example: 20 passengers do not necessarily mean 10 twin rooms; the customer may require 2 single rooms for bosses, the remainder in twins, possibly triples. The operator constructs the actual rooming and the system validates whether the allocation covers the required passengers.
3. **Meals = ACCEPT CURRENT CONVENTION.** The operator accepts the current distinction (existing status convention + explicit "(not provided)" wording). HF-09 does **not** escalate to a structured field.
4. **Capture convention is not enough.** The operator wants **structured inputs** that the operator can change and then have the system **validate/calculate**.

**FROZEN principle (carried into the FK-D12 PLAN):** *calculation is advisory/validating, not prescriptive; the operator must be able to construct and modify the actual allocation — including exceptions such as VIP vehicles and mixed accommodation — while the system recalculates and validates the resulting allocation.*

## 4. Why free text + `pax_or_qty` is insufficient (HF-06)

- `pax_or_qty` is a single Int meaning "pax **or** qty" — ambiguous; it cannot hold demand **and** vehicle quantity/reference.
- `detail` / `notes` prose cannot be **machine-validated**: no discrete `vehicle type`, `capacity`, or `quantity`.
- No linkage between a vehicle allocation and the passengers assigned; mixed vehicle types and multiple allocations are not representable as discrete data.
- No basis to compute **remaining/unallocated** passengers or **excess capacity**, and operator overrides cannot be re-validated after editing.

## 5. Why free text is insufficient (HF-08)

- `item` / `detail` prose can hold hotel/rooming text but is not machine-validatable: no discrete `room type`, `occupancy`, or `room quantity`, and no per-room passenger allocation.
- Mixed configurations (single/twin/triple/other) and special allocations (boss/VIP single rooms) cannot be represented or validated.
- No basis to compute **covered / remaining / unallocated** passengers or **excess** for the resulting arrangement.

## 6. Required conceptual distinctions (both domains)

- **Calculated / suggested requirement** — derived from passenger demand; advisory.
- **Operator-selected actual allocation** — editable structured rows; supports special/VIP exceptions.
- **Validation result** — PASS / WARNING / ERROR comparing actual allocation coverage against demand.

## 7. Classifications (updated)

| Finding | Previous | New classification |
|---|---|---|
| HF-06 | C + D | **E — genuine Phase 1 data-model gap requiring a separate FK-D12 PLAN** |
| HF-08 | C + D | **E — genuine Phase 1 data-model gap requiring a separate FK-D12 PLAN** |
| HF-09 | C + D | **A/C — accepted under current convention; no structured-model escalation** |

## 8. Cross-finding conclusion

HF-06 and HF-08 now share a **structured validation** requirement (discrete, editable, machine-validated allocations) and therefore both require an **FK-D12 planning gate**. HF-09 is explicitly **excluded** from the structured-model work.

## 9. Explicit exclusions

- No schema, fields, or child tables designed here.
- HF-09 is **not** escalated.
- HF-11, DG-7, itinerary, Trip, Phase 2 are out of scope.
- The frozen **Deal ≠ Trip** boundary is preserved.
- Historical evidence is not rewritten.

## 10. Next governance gate

`Evidence (this document) → PLAN (companion plan) → FK-D12 review → explicit approval → BUILD → VERIFY → HUMAN ACCEPTANCE`.

**No BUILD is authorized by this document.**

---

*Created via OpenCode session on 2026-10-04. Documentation only. No source, schema, database, CRM, configuration, permission, or integration change; no build; no commit; no push.*
