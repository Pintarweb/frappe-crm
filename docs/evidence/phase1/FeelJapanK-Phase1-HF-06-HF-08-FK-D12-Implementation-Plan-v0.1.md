# FeelJapanK Phase 1 — HF-06 / HF-08 — FK-D12 Implementation Plan — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-06-HF-08-FK-D12-Implementation-Plan-v0.1 |
| STATUS | **PLAN / READ-ONLY — NOT IMPLEMENTED — BUILD AUTHORIZATION: NOT GRANTED** |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Basis | Operator Validation Decisions v0.1 (frozen); FK-D12 Architecture Review (conclusion C) |

> This is a decision-quality implementation **plan**. It authorizes **no** implementation, schema, field, child table, API, migration, hook, or frontend change.

---

## 1. Status / Authorization

`PLAN / READ-ONLY / NOT IMPLEMENTED / BUILD NOT AUTHORIZED`. This document defines *what* a future BUILD must implement; it does not implement it.

## 2. Executive Decision

Introduce **two distinct Deal-owned pre-invoice child structures — Transportation Allocation and Accommodation Allocation** — with **aggregate-only** passenger allocation, **explicit per-leg / per-stay demand**, **derived advisory calculation**, and a **non-blocking** validation state (PASS/WARNING/ERROR/NOT DETERMINABLE). Requirement Lines remain the requirement statement; allocations **complement** them. Editing occurs in native CRM (system of record); the workspace presents allocations + validation read-only. **Decision: structured model required (FK-D12).**

## 3. Evidence and Source Material

Frozen roadmap `…Forward-Implementation-Roadmap-v0.1.md`; `…N1-Presentation-Operator-Decisions-v0.1.md` (DG-1…DG-7; DG-2/DG-8 Info Complete); `…HF-06-HF-08-Structured-Validation-Evidence-Assessment-v0.1.md`; `…HF-06-HF-08-Structured-Validation-Plan-v0.1.md`; `…HF-06-HF-08-Operator-Validation-Decisions-v0.1.md`; `…Human-Acceptance-Finding-Assessment-v0.1.md`; `…Remaining-Findings-Post-Day-Detail-Acceptance-v0.1.md`; Full Details plan + verification; `…Deal-Information-Gathering-Template-v0.2.md`.

## 4. Frozen Operator Decisions (authoritative)

1. Aggregate allocation only; **no passenger identities/rosters**.
2. Transportation demand — **explicit per transport leg/day**.
3. Accommodation demand — **explicit per hotel/stay/date range**.
4. Calculation **advisory**, not prescriptive.
5. Operator controls the **actual allocation** (editable).
6. Changing the actual allocation **triggers recalculation/revalidation**.
7. States: **PASS / WARNING / ERROR / NOT DETERMINABLE**.
8. Validation **non-blocking**.
9. Partial allocation → **WARNING**.
10. Excess capacity → **WARNING**.
11. Intentional operator override → **WARNING**.
12. Unknown capacity → **NOT DETERMINABLE**.
13. **ERROR only for contradictions / invalid data**.
14. Transportation and Accommodation are **two distinct business structures**.
15. They may **share validation principles**.
16. All structures **Deal-owned / pre-invoice**. 17. **Deal ≠ Trip**.
18. **HF-09 Meals** accepted under current convention — **out of scope**.
19. No passenger identity/roster capability.

## 5. Current Model (verified, read-only)

App DocTypes: `FJK Deal Component`, `FJK Deal Requirement Line`, `FJK Deal Guide Requirement`, `FJK Deal Activity Item` (+ quotation DocTypes). `FJK Deal Requirement Line` fields: `domain, item, detail, date_from, date_to, pax_or_qty (Int), location, status, notes`; statuses `{KNOWN, MISSING, TO CONFIRM, CUSTOMER-CONFIRMED, NOT APPLICABLE}`. CRM Deal shared `fjk_*` fields (setup.py) incl. `fjk_total_pax/adults/children/infants`, `fjk_info_complete`, `fjk_ready_for_quotation`. APIs: `get_deal_context`, `get_deal_summary`, `get_readiness`, `set_info_complete`, `is_info_complete`, `get_quotation`, quotation methods, `get_trip_seed_snapshot`. Child grids attached via `TABLE_FIELDS` custom fields. **No existing allocation structure.** `get_readiness` counts only MISSING/TO CONFIRM; NOT APPLICABLE excluded.

## 6. Alternatives Considered

| Option | Assessment |
|---|---|
| **A. Extend Requirement Line** with allocation fields | Rejected: conflates a requirement statement with an allocation; pollutes a generic line with domain-specific nullable fields; weak per-leg/per-stay granularity; validation awkward; risks verified line semantics. |
| **B. Dedicated Deal-owned Transportation + Accommodation Allocation child structures** | **Recommended**: matches Q5=A (two distinct structures), clean per-leg/per-stay granularity, mixed types, VIP override, discrete machine-validatable fields, complements Requirement Lines. |
| **C. Shared generic allocation + domain discriminator** | Possible but less clear: a single table mixes vehicle vs room semantics (capacity meaning differs), complicates validation and presentation. Rejected in favor of B (still shares *principles*). |
| **D. Reuse another FJK structure** | None suitable (Component/Guide/Activity are different semantics). Rejected. |

Option B best matches the operator decisions (two distinct business structures; aggregate; per-context demand; advisory validation; override).

## 7. Recommended Architecture

- **Two new Deal-owned child structures** (app-owned custom DocTypes, `istable=1`) exposed on `CRM Deal` via new custom child-grid fields — *conceptually* "Transportation Allocation" and "Accommodation Allocation".
- Deployed via the app's existing `setup.py` pattern (`create_custom_fields` + layout), i.e., a Deal customization → **FK-D12**.
- **Validation** computed by a read-only app API; **editing** performed in the **native CRM Deal form** (system of record). Workspace = read-only presentation.
- **Requirement Lines unchanged**; allocations complement them.

## 8. Transportation Allocation Model (conceptual)

Per **transport leg/day** allocation context; each context holds one or more **allocation rows** (mixed vehicle types):
- **Operator-editable (authoritative input):** demand (explicit), vehicle type/class (free/select), capacity per unit, quantity (units), allocated pax (aggregate), special/VIP flag, status, notes; optional leg reference (date/route/location).
- **Derived:** capacity per row = capacity × quantity; total capacity (sum); total allocated (sum of allocated pax); remaining = demand − allocated; excess = max(0, total capacity − allocated); validation state.
- Supports: `20 pax → suggested 3×8-seat → operator sets 2×8-seat + 1×4-seat VIP`. Multiple vehicle types = multiple rows. VIP = a row flagged special (does not force single type).

## 9. Accommodation Allocation Model (conceptual)

Per **hotel/stay/date range** allocation context; one or more **room allocation rows** (mixed room types):
- **Operator-editable:** demand (explicit), hotel/stay (location/item), stay dates, room type (single/twin/triple/other), occupancy/capacity per room, room quantity, allocated pax (aggregate), special/VIP flag, status, notes.
- **Derived:** room capacity total = occupancy × quantity; total capacity; total allocated; remaining; excess; validation state.
- Supports mixed configurations (`2 single + 9 twin`, triples, etc.) without passenger identities.

## 10. Demand Model

- **Business requirement:** demand is **explicit per context** (leg/day; stay/date range).
- **Authoritative stored value:** an operator-editable **demand value on each allocation context** (stored).
- **Default UX behavior:** the demand value is **pre-filled from Deal pax** (e.g. `fjk_total_pax`) on creation, but is **overrideable**.
- **Derived value:** capacity/allocated/remaining/excess depend on demand; nothing else is authoritative.
Recommendation: **derived default, overrideable, stored** (distinguishing the business rule from the UX convenience). Demand also carries a **status** (see §11) so MISSING/TO CONFIRM does not become a false ERROR.

## 11. Calculation Model

- Row capacity = capacity × quantity (transport) / occupancy × quantity (accommodation).
- Context total capacity = Σ row capacity; total allocated = Σ allocated pax.
- remaining = demand − allocated; excess = max(0, total capacity − allocated).
- Suggested allocation (e.g. `ceil(demand / unit capacity)`) is **derived advisory only** and never written back automatically.

## 12. Validation Model

**INPUTS:** demand (+ demand status), allocation rows (capacity, quantity, allocated pax, special flag, status). **DERIVED:** total capacity, total allocated, remaining, excess. **OUTPUT:** validation state.

| Case | State |
|---|---|
| allocated == demand, valid data | **PASS** |
| allocated < demand (partial) | **WARNING** |
| allocated > demand | **WARNING** |
| excess capacity (total capacity > demand) | **WARNING** |
| intentional override (special flag / operator override marker) | **WARNING** |
| demand unknown / demand status MISSING or TO CONFIRM | **NOT DETERMINABLE** |
| capacity unknown / not provided (no valid capacity data) | **NOT DETERMINABLE** |
| zero/empty allocation with known demand | **WARNING** (partial) |
| **contradiction / invalid data** (see below) | **ERROR** |

**ERROR definition (contradiction / invalid data), resolved conservatively:** negative demand/capacity/quantity/allocated; capacity ≤ 0 with quantity > 0; allocated pax > row capacity; a row with quantity ≤ 0; conflicting/duplicate context rows marked contradictory. **Normal commercial choices are never ERROR.** Validation is **non-blocking** and does not alter readiness.

## 13. Requirement Line Relationship

**Option B — complement.** After implementation:
- **Requirement Line** = the requirement statement (what is needed; domain/item/detail/date/location/status). Unchanged.
- **Allocation** = how it is provided (structured, validated); carries allocation-specific fields.
- **No duplication:** requirement retains descriptive/status content; allocation retains capacity/quantity/allocation content. Both share domain + date context (optional link by context; explicit foreign-key link is a design choice left open).
- **Authoritative for:** requirement/status → Requirement Line; allocation/validation → Allocation.
- **Full Details** shows requirement lines (existing day/stay presentation) **plus** allocation rows + validation per context.
- Requirement statuses are **not** redefined by allocations.

## 14. Information Status / Readiness Interaction

Allocation validation is **informational** and **separate** from readiness. It does **not** modify `fjk_info_complete`, `fjk_ready_for_quotation`, or `get_readiness` (DG-2/D-C preserved). MISSING/TO CONFIRM drive NOT DETERMINABLE/WARNING in allocation validation only. **If** readiness should later incorporate allocation validation, that is an **explicit separate planned change requiring approval** — not silently introduced here.

## 15. Frontend / Full Details Integration

- Summary: **unchanged** (high-level).
- Full Details: extend the day-first Transportation and stay-first Accommodation sections with an **allocation + validation block** per context (read-only): allocation rows, derived capacity/allocated/remaining/excess, validation badge (text + cue, reusing the existing status styling pattern).
- Transport presented day/date-first; accommodation stay/date-first. No combined matrix.
- **Editing is in native CRM** (Deal child grids); workspace does not become an editor (preserves the frozen boundary). No Summary expansion.

## 16. Permissions / Ownership

- Child structures inherit **CRM Deal** access (Frappe child tables have no independent permissions); Sales User/Manager/System Manager access follows the Deal.
- The validation API applies the existing `_require_deal_access(deal, "read")` check (same as `get_deal_summary`). No permission changes are proposed.

## 17. Migration / Existing Data

- **No migration required.** Allocation structures start **empty** for existing Deals; Requirement Lines remain valid and unchanged.
- Validation for Deals without allocations = **NOT DETERMINABLE** (or blank) — no backfill.
- **`CRM-DEAL-2026-00022` remains untouched** during BUILD; no test-data change is part of this plan.

## 18. API / Backend Changes (planned, not implemented)

- Add **validator** for allocation rows (mirroring `d1.py` patterns) enforcing valid domains/statuses and invalid-data rules.
- Add a **read-only validation API** (e.g. `get_allocation_validation(deal)`) returning contexts + rows + derived values + validation state; **no mutation**; permission-checked.
- Optionally extend `get_deal_summary` to include allocations — recommend a **separate API** to avoid changing existing semantics.
- **No change** to `get_readiness` / `set_info_complete` semantics.

## 19. Schema / DocType Changes (planned, not implemented)

- Two new app-owned child DocTypes (`istable=1`): *Transportation Allocation* and *Accommodation Allocation* (conceptual names).
- Two new child-grid custom fields on `CRM Deal` (via `setup.py` pattern) + layout placement.
- This is a **Deal customization** → **FK-D12** high-risk review required before BUILD. Exact fieldnames are left open (not decided here).

## 20. Verification Strategy (future; do not execute now)

Automated/API scenarios — **Transport:** exact allocation; partial; excess; mixed vehicles; VIP vehicle; unknown capacity; missing demand; contradictory data; operator override. **Accommodation:** exact; partial rooming; excess; mixed room types; VIP/single rooms; unknown occupancy; missing demand; contradictory data. Include cross-Deal isolation, Requirement-Line integrity, `00022` baseline protection, N1 presentation regression, and Info Complete/readiness regression.

## 21. Human Acceptance Strategy (future)

Operator checks in normal Chrome: allocations are clear and editable in CRM; workspace presents accurate allocation + validation; VIP/mixed allocations behave; validation is advisory and never blocks; Requirement Lines remain intact; day/stay organization preserved.

## 22. Scope / Non-Scope

**In scope:** structured Transportation/Accommodation allocation; advisory calculation; non-blocking validation; operator-editable allocation (in CRM); Full Details presentation; read-only validation API; Deal-owned child structures; validators.
**Out of scope:** passenger names/rosters; bookings/supplier execution; customer quotation; itinerary generation; Trip; Invoice; Phase 2; HF-09 Meals; HF-11 CRM handoff; DG-7 CRM return/focus hook (unless later justified explicitly).

## 23. Risks and Open Questions

- **Contradiction/ERROR definition** — resolved conservatively (§12); may need operator confirmation of wording only.
- **Demand prefill** — resolved as derived-default/overrideable/stored (§10).
- **MISSING/TO CONFIRM demand handling** — resolved as NOT DETERMINABLE/WARNING (§12).
- Exact fieldnames/link-to-Requirement-Line — **open design detail** for BUILD (not a business-rule conflict).
- Whether workspace ever needs inline editing — **deferred** (CRM-only now).
- Migration complexity: low (empty new structures).
- **OPEN — OPERATOR DECISION REQUIRED:** none blocking; the above are implementation-plan/design details.

## 24. Implementation Sequence (future BUILD, illustrative only)

1. FK-D12 review approval → 2. Create child DocTypes + custom fields (setup.py) → 3. Validators → 4. Read-only validation API → 5. Full Details presentation → 6. Verify (harness + browser) → 7. Human acceptance. No step authorizes the next without approval.

## 25. FK-D12 Governance Gate

New Deal-owned custom fields/child tables + validators touching `CRM Deal` = **FK-D12 high-risk**. This plan is the input to that review; approval must precede BUILD.

## 26. Explicit Build Non-Authorization

This document authorizes **no** implementation, schema, custom field, child table, API, validation code, migration, CRM hook, frontend change, or other system modification.

## 27. Git / Repository Safety Check

`git status --short`: unchanged baseline (3 pre-existing tracked doc modifications dated 2026-09-29; pre-existing untracked `docs/`). This document is added under untracked `docs/evidence/phase1/`. Nothing staged. `App.vue` and bundles unchanged; no schema/DocType/custom-field/DB/CRM/config/permission/route/integration change; no migration; no build; no commit; no push.

---

**FK-D12 IMPLEMENTATION PLAN COMPLETE**
**BUILD AUTHORIZATION: NOT GRANTED**

*Created via OpenCode session on 2026-10-04. Planning/documentation only.*
