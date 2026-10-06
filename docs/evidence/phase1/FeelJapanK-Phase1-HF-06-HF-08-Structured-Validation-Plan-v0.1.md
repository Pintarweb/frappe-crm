# FeelJapanK Phase 1 — HF-06 / HF-08 Structured Validation — Plan — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-06-HF-08-Structured-Validation-Plan-v0.1 |
| STATUS | **PLAN / READ-ONLY — NOT IMPLEMENTED — NO BUILD AUTHORIZATION** |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Basis | `…HF-06-HF-08-Structured-Validation-Evidence-Assessment-v0.1.md` |

> Bounded plan defining the **requirements for a future structured validation model**. It investigates boundaries only and does **not** decide final schema. No implementation is authorized.

---

## 1. Purpose

Define the investigation requirements for a future structured validation model covering **HF-06** (Transportation capacity/quantity) and **HF-08** (Accommodation rooming/allocation), under the frozen principle:

> **Calculation is advisory/validating, not prescriptive.** The operator constructs and modifies the actual allocation — including exceptions such as VIP vehicles and mixed accommodation — while the system recalculates and validates the resulting allocation.

## 2. Evidence reviewed

Frozen roadmap; Operator Decisions DG-1…DG-7 (DG-2/DG-8 Info Complete); Human-Acceptance Finding Assessment; Remaining Findings after Day-Detail Acceptance; latest Full Details verification + acceptance closure; `FJK Deal Requirement Line` definition; `api.py` readiness/status; Deal Information Gathering Template v0.2 (Transportation §6, Accommodation §5); test Deal `CRM-DEAL-2026-00022`.

## 3. Investigative scope

### Transportation
passenger demand; vehicle type; vehicle capacity; vehicle quantity; actual passenger allocation where necessary; special vehicles / special passenger allocation; calculated capacity; remaining/unallocated passengers; excess capacity; validation states; operator override/change behaviour; whether allocations need to be **per transport leg/day**.

### Accommodation
passenger demand; room type; occupancy/capacity; room quantity; actual passenger allocation; mixed room configurations; special allocations such as VIP/boss single rooms; calculated capacity; remaining/unallocated passengers; excess capacity; validation states; operator override/change behaviour; whether rooming needs to be **per hotel/stay/date range**.

## 4. Investigation questions (must be answered/confirmed before BUILD)

1. **Minimum structured data** required per domain (discrete capacity/quantity + allocation rows).
2. **Derived vs explicit:** calculate suggested demand from passenger composition; validation compares an **operator-editable actual allocation** against it (never a forced default).
3. **Special/VIP** representation: special allocation rows (dedicated vehicle / single room) that override the math without producing an error.
4. **Mixed transportation types:** multiple allocation rows, each with type/capacity/quantity.
5. **Mixed room types:** multiple room-allocation rows (single/twin/triple/other), each with occupancy/quantity.
6. **Operator overrides:** operator edits allocation rows; validation recomputes remaining/excess and permits overrides.
7. **PASS / WARNING / ERROR:** PASS = all passengers allocated within bounds; WARNING = overrides / excess / partial; ERROR = unallocated passengers or inconsistent data.
8. **Advisory vs blocking:** recommend **advisory** (WARNING), consistent with Deal pre-invoice state and operator-controlled Info Complete; ERROR reserved for clear inconsistency.
9. **Partially known information:** when demand or statuses are unknown, validation is marked **"not determinable"** (no false ERROR).
10. **Status interaction:** `CUSTOMER-CONFIRMED` treated as firm; `TO CONFIRM` / `MISSING` produce advisory warnings; `NOT APPLICABLE` excluded.
11. **Deal-owned structures** only (pre-invoice); must **not** violate the frozen Deal/Trip boundary (no Trip / itinerary).
12. **Extend existing DocTypes?** None currently suitable (`FJK Deal Requirement Line` is generic/free-text). Investigate optional discrete fields on the requirement line vs a new structure.
13. **New child structure justified?** Likely (a Transport allocation child + an Accommodation rooming child) — **to be decided in the FK-D12 PLAN**, not here.
14. **Native CRM / Frappe customization gate:** Deal-owned custom fields/child tables or validation logic on CRM Deal fall under **FK-D12** high-risk review.
15. **Evidence still needed before BUILD:** operator confirmation of exact validation semantics (PASS/WARN/ERROR; advisory vs blocking), mandatory facets, and per-leg / per-stay granularity.

## 5. FK-D12 implications

Any new Deal-owned custom fields, child tables, or validation logic touching the native `CRM Deal` is a **native-first/high-risk** change requiring an **FK-D12 review** before BUILD. This plan does not perform that review.

## 6. Phase 1 boundary

Deal information gathering and quotation-preparation readiness only. **No** Customer Quotation generation, itinerary, Trip, Phase 2, or operational fulfillment. The frozen **Deal ≠ Trip** boundary is preserved.

## 7. Explicit exclusions

- HF-09 (accepted under the current convention; excluded from this structured-model work).
- HF-11 and the deferred DG-7 CRM return/focus hook.
- Itinerary / Trip / Phase 2.
- Final schema decisions and any implementation.

## 8. Next governance gate

`PLAN → FK-D12 review of the structured validation model → explicit approval → BUILD → VERIFY → HUMAN ACCEPTANCE`.

**No BUILD is authorized. Phase 1 is not complete.**

---

*Created via OpenCode session on 2026-10-04. Documentation only. No source, schema, database, CRM, configuration, permission, or integration change; no build; no commit; no push.*
