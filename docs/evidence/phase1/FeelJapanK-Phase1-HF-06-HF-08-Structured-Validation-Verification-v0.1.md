# FeelJapanK Phase 1 — HF-06 / HF-08 Structured Validation — Verification — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-06-HF-08-Structured-Validation-Verification-v0.1 |
| Verification status | **TECHNICAL VERIFICATION: PASS** (Layer 1 + Layer 2). **HUMAN ACCEPTANCE: PENDING (not claimed).** |
| Date | 2026-10-04 |
| Plan | `…HF-06-HF-08-FK-D12-Implementation-Plan-v0.1.md` |
| BUILD evidence | `…HF-06-HF-08-Structured-Validation-Implementation-Verification-v0.1.md` |
| Repository | `/home/yusmarin/frappe-crm` |

---

## 1. Verification status

`TECHNICAL VERIFICATION PASS`. All planned scenarios (31/31 assertions) passed; browser presentation verified; regressions intact; protected baselines unchanged. Test data disposed.

## 2. Scope and governance

Read-only against production/baseline records. The only writes were to **disposable test records** created under a dedicated test Organization (`FJK VERIFY - Allocation Test`) and a disposable Deal (`CRM-DEAL-2026-00065`), all deleted after verification. No source/schema changed during verification; no remediation; no commit/push.

## 3. Test records created (all disposed)

- Layer 1: 20 disposable `CRM Deal` records under `FJK VERIFY - Allocation Test` (created and deleted in one run; uncommitted on a mid-run abort were rolled back — none persisted).
- Layer 2: `CRM-DEAL-2026-00065` (disposable; 3 transport + 2 accommodation allocation rows) — deleted after verification.
- Final DB check: allocation rows `0/0`, Deals `21`, verify orgs `0`, `FJK-QUO-2026-00001` present.

## 4. Implemented field names verified (source)

- **FJK Transportation Allocation:** `date_from, date_to, item, location, demand, demand_status, vehicle_type, capacity, quantity, allocated_pax, is_special, status, notes`.
- **FJK Accommodation Allocation:** `date_from, date_to, hotel, location, demand, demand_status, room_type, occupancy, quantity, allocated_pax, is_special, status, notes`.
- API: `feeljapank_crm.api.get_allocation_validation(deal)`.

## 5. Test scenarios — expected vs actual

### Transportation
| ID | Scenario | Expected | Actual | Result |
|---|---|---|---|---|
| T01 | Exact (cap20, alloc20, demand20) | PASS + totals (20,20,0,0) | PASS | PASS |
| T02 | Partial (alloc15) | WARNING, remaining 5 | WARNING, 5 | PASS |
| T03 | Excess allocated (alloc25>demand20) | WARNING | WARNING | PASS |
| T04 | Excess capacity (cap40, alloc20) | WARNING, excess 20 | WARNING, 20 | PASS |
| T05 | Mixed vehicles (2×8 + 1×4) | PASS, 2 rows, (20,20) | PASS | PASS |
| T06 | VIP/special override | WARNING | WARNING | PASS |
| T07 | Unknown capacity | NOT DETERMINABLE | NOT DETERMINABLE | PASS |
| T08 | Unknown demand (TO CONFIRM) | NOT DETERMINABLE | NOT DETERMINABLE | PASS |
| T09 | Invalid (alloc>cap) | blocked at save | blocked | PASS |
| T09b | Contradictory demand | ERROR | ERROR | PASS |
| T10 | Recalculation (PASS→WARNING) | PASS→WARNING | PASS→WARNING | PASS |
| T11 | Per-leg isolation | leg B unaffected | unaffected | PASS |

### Accommodation
| ID | Scenario | Expected | Actual | Result |
|---|---|---|---|---|
| A01 | Exact | PASS | PASS | PASS |
| A02 | Partial rooming | WARNING | WARNING | PASS |
| A03 | Excess capacity | WARNING | WARNING | PASS |
| A04 | Mixed room types (2 single + 9 twin) | PASS, 2 rows, (20,20) | PASS | PASS |
| A05 | VIP/single room | WARNING | WARNING | PASS |
| A06 | Unknown occupancy | NOT DETERMINABLE | NOT DETERMINABLE | PASS |
| A07 | Unknown demand (MISSING) | NOT DETERMINABLE | NOT DETERMINABLE | PASS |
| A08 | Invalid (alloc>cap) | blocked at save | blocked | PASS |
| A09 | Recalculation (PASS→WARNING) | PASS→WARNING | PASS→WARNING | PASS |
| A10 | Per-stay isolation | stay B unaffected | unaffected | PASS |

**Total: 31/31 passed, failures: `[]`.**

## 6. API/backend evidence

- Real `get_allocation_validation` used (not mocked). Derived totals (total_capacity, total_allocated, remaining, excess) matched expected across all cases.
- Invariant enforced by the DocType validators (`d1.py`): allocated ≤ capacity×quantity, capacity/occupancy > 0 when quantity > 0, non-negative values, valid statuses → invalid numeric rows are **blocked at save**; contradictory demand is surfaced by the API as **ERROR**.
- Read-only: the API performs no mutation; permission-checked via `_require_deal_access(deal, "read")`.

## 7. Browser evidence (authenticated Sales User)

- **Native CRM form** `…/crm/deals/CRM-DEAL-2026-00065#data`: "FeelJapanK Allocations" section present with **Transportation Allocations** and **Accommodation Allocations** grids and **Add Row** controls (editable inputs) → editing surface confirmed.
- **Workspace** `/app/fjk-workspace?deal=CRM-DEAL-2026-00065` (Full Details): allocation contexts rendered with date-first headers, rows (Vehicle/Room Type, Capacity, Qty, Capacity Total, Allocated Pax, Special, Status), derived `Demand / Total capacity / Allocated / Remaining / Excess`, and state badges: **Airport → Hotel ✓PASS**; **Tokyo → Hakone !WARNING** (VIP row `Special = yes`); **Tokyo hotel !WARNING** (Single `Special = yes` + Twin).
- Advisory wording present ("not prescriptive … non-blocking and does not change readiness").
- **Workspace read-only:** `inputsInAlloc = 0` (no editor controls in the workspace allocation section).
- Summary remains high-level (no allocation detail on Summary).

## 8. Regression evidence

- `bench/n1_verify.py` → **120/120 passed**, `failures: []`.
- `get_readiness("CRM-DEAL-2026-00011")` unchanged (same missing/to_confirm; allocation validation independent).
- Day-by-Day domain detail intact; date-first; HF-01 sticky (108, no overlap); HF-04 status badges (all five); HF-03 readiness; DG-1/3/4/5/6/7 intact.
- No JS/Vue application errors; **no unexpected non-2xx** (only the known telemetry `boot_config` 417, unrelated).

## 9. Protected baseline verification

- `CRM-DEAL-2026-00010` — unchanged (`fjk_info_complete=0`).
- `CRM-DEAL-2026-00022` — unchanged (0 allocation rows; info_complete 0).
- `FJK-QUO-2026-00001` — present, unchanged.
- Final counts: allocation rows `0/0`; Deals `21`; verify orgs `0`.

## 10. Cross-domain / data-integrity checks

- Requirement Lines remain intact and are **not** replaced by allocations (test Deal had allocations with 0 requirement lines; existing deals keep their lines).
- Requirement statuses unchanged.
- No passenger identity/roster introduced (aggregate only).
- Transportation and Accommodation remain distinct structures.
- No Trip/Invoice/customer-quotation semantics introduced.

## 11. Defects / limitations

- **No defects found.** One harness design defect (an invalid recalculation value that the validator correctly blocked) was corrected in the test harness, not the implementation.
- **ERROR via invalid numeric** is enforced at **save-time** (blocked), not as a stored state; the API surfaces **ERROR** for **contradictory demand**. This matches the operator decision ("ERROR only for contradictions / invalid data").
- Browser UI data entry was verified as editable (grids + Add Row); exhaustive UI data-entry automation was not performed — save/validation/recalc were exercised through the real backend API + validators.

## 12. Validation states exercised

**All four states exercised:** PASS (T01/T05, A01/A04), WARNING (T02/T03/T04/T06, A02/A03/A05), ERROR (T09b contradiction), NOT DETERMINABLE (T07/T08, A06/A07). Invalid-numeric ERROR path exercised as save-blocking (T09/A08).

## 13. Operator editing / recalculation exercised

- **Recalculation:** exercised (T10, A09 — state changed after an operator-style edit, with derived values updated).
- **Editing:** exercised programmatically via the real model/API; native CRM grids confirmed present and editable in the browser.
- **Non-blocking:** no state prevented the Deal from saving / readiness interaction.

## 14. Technical vs human acceptance

This document records **technical/browser-agent verification** only. It is **not** human acceptance.

## 15. Final statement

```
BUILD:                PASS
TECHNICAL VERIFICATION: PASS
HUMAN ACCEPTANCE:     PENDING
PHASE 1 HF-06/HF-08:  NOT CLOSED until human acceptance completes
```

---

*Verification via OpenCode session on 2026-10-04. Test data disposed. No source/schema change during verification; no commit; no push.*
