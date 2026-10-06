# FeelJapanK Phase 1 — HF-06 / HF-08 Structured Validation — Implementation & Verification — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-06-HF-08-Structured-Validation-Implementation-Verification-v0.1 |
| Document status | IMPLEMENTED + TECHNICALLY VERIFIED. **Human acceptance NOT claimed (PENDING).** |
| Date | 2026-10-04 |
| Authoritative plan | `docs/evidence/phase1/FeelJapanK-Phase1-HF-06-HF-08-FK-D12-Implementation-Plan-v0.1.md` |
| Operator decisions | `…HF-06-HF-08-Operator-Validation-Decisions-v0.1.md` |
| Repository | `/home/yusmarin/frappe-crm` |

> Technical verification only. **Human acceptance has not been claimed.** Editing occurs in native CRM; the workspace is read-only presentation.

---

## 1. Implementation scope

Implemented the approved FK-D12 plan: two Deal-owned pre-invoice child structures for **Transportation Allocation** and **Accommodation Allocation**; aggregate-only allocation; explicit per-leg/per-stay demand; advisory calculation; non-blocking validation (PASS / WARNING / ERROR / NOT DETERMINABLE); Requirement Lines unchanged (allocations complement); read-only workspace presentation in Full Details. **No** change to Info Complete / Ready for Quotation / `get_readiness` semantics.

## 2. Files changed

**App (backend, `feeljapank_crm`):**
- `feeljapank_crm/feeljapank_crm/d1.py` — added allocation-row validation (status/demand_status, non-negative ints, capacity rule, allocated ≤ total capacity) within `validate_deal_requirements`.
- `feeljapank_crm/feeljapank_crm/api.py` — added read-only `get_allocation_validation(deal)` (permission-checked; no mutation).
- `feeljapank_crm/feeljapank_crm/setup.py` — added the two grids to `TABLE_FIELDS` and the "FeelJapanK Allocations" layout section (idempotent).
- **New DocTypes:** `feeljapank_crm/feeljapank_crm/feeljapank_crm/doctype/fjk_transportation_allocation/{fjk_transportation_allocation.json, .py, __init__.py}` and `…/doctype/fjk_accommodation_allocation/{fjk_accommodation_allocation.json, .py, __init__.py}`.
- `feeljapank_crm/fixtures/custom_field.json`, `feeljapank_crm/fixtures/crm_fields_layout.json` — re-exported to include the new fields/section.

**Frontend:**
- `feeljapank_crm/frontend/src/App.vue` — fetch `get_allocation_validation`; added read-only "Allocation & Validation (advisory)" sections (Transportation + Accommodation) with state badges; reuses `fmtDateHuman`/status styling.

**Bundle:**
- `feeljapank_crm/public/dist/feeljapank.js` (392.86 kB), `feeljapank.css` (5,029.93 kB), `feeljapank.js.map`.

**One-off (gitignored `bench/`):**
- `bench/fjk_apply_allocations.py` (reloads the two DocTypes + applies custom fields/layout).

**Evidence:**
- This document.

**Schema applied:** 2 child DocTypes (`tabFJK Transportation Allocation`, `tabFJK Accommodation Allocation`) + 2 Table custom fields on `CRM Deal` (`fjk_transport_allocations`, `fjk_accommodation_allocations`) + layout section. Applied via `frappe.reload_doc` + `create_custom_fields` (no full `bench migrate`).

## 3. Build / serving

`npm run build` OK (643 modules); `feeljapank.js` **HTTP 200**, `feeljapank.css` **HTTP 200**.

## 4. Backend verification

- `bench/n1_verify.py` → **120/120 passed**, `failures: []`.
- `get_allocation_validation("CRM-DEAL-2026-00022")` → `{"deal": "...", "transportation": [], "accommodation": []}` (no allocations recorded; correct empty shape; permission-checked).
- Custom fields confirmed via DB: `fjk_transport_allocations` → `FJK Transportation Allocation`; `fjk_accommodation_allocations` → `FJK Accommodation Allocation`.

## 5. Browser verification (authenticated `yus.claimflow@gmail.com`; fresh bundle JS 392,863)

`CRM-DEAL-2026-00022`, Full Details:
- "Allocation & Validation" section present; "Transportation Allocation" and "Accommodation Allocation" sub-sections present.
- Empty-state text correct: "No transportation allocation recorded." / "No accommodation allocation recorded."
- Advisory wording present: "non-blocking and does not change readiness".
- **No JS/Vue errors (0); no unexpected non-2xx (0).**

## 6. Regression results

| Requirement | Result |
|---|---|
| Day-by-Day Domain Detail (HF-05/HF-07/date-first) | PASS (`Primary Domain Detail — Day-by-Day`) |
| Summary high-level | PASS (no allocation/day detail in Summary) |
| HF-01 sticky hierarchy | PASS (stickyTop 108; no overlap) |
| HF-04 status hierarchy | PASS (all five classes present) |
| HF-03 human-readable readiness | PASS (`Not yet`) |
| DG-1/3/4/5/6/7 | PASS (title/ID, tabs, scope, info status, supplier) |
| Numeric passengers / pluralisation | PASS |
| `CRM-DEAL-2026-00010` | PASS (unchanged) |
| `FJK-QUO-2026-00001` | PASS (present) |

## 7. Integrity / boundary

- **`CRM-DEAL-2026-00022` untouched** — 0 rows in both allocation tables.
- Deal count 21 (unchanged); N1 dataset intact.
- No change to `fjk_info_complete` / `fjk_ready_for_quotation` / `get_readiness` semantics (DG-2/D-C preserved).
- Deal-owned / pre-invoice; **Deal ≠ Trip** preserved; no passenger identities introduced.
- Out of scope untouched: Customer Quotation, itinerary, Trip, Invoice, supplier execution, HF-09, HF-11, DG-7.

## 8. Limitations / remaining findings

- **No allocation data was created** (bounded to protect `CRM-DEAL-2026-00022` / avoid test-data changes). Therefore the validation **states** (PASS/WARNING/ERROR/NOT DETERMINABLE) are implemented but **not exercised end-to-end**; the plan's automated scenarios remain the future test strategy.
- Allocation **editing** is in native CRM (child grids on the Deal form); the workspace is read-only presentation, per the frozen boundary.
- Exact fixture naming/field names are as implemented; any refinement is a follow-up review, not a scope change.

## 9. Human acceptance

**NOT claimed (PENDING).** Operator should verify in normal Chrome: allocation sections present; advisory wording clear; CRM grids editable; Requirement Lines intact; day/stay organization preserved; nothing blocks quotation readiness.

---

*Technical verification via OpenCode session on 2026-10-04. Human acceptance PENDING. No commit; no push.*
