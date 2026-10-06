# FeelJapanK Phase 1 — N1 Controlled Test Dataset — v0.1

**Document status:** CONTROLLED TEST-DATA EVIDENCE — N1 (Phase 1 Stage 1)
**Nature:** additive test-data record. No application, schema, DocType, permission, integration, or native CRM change. Created for N1 presentation verification and human acceptance.
**Baseline preserved:** `CRM-DEAL-2026-00010` is unchanged and is excluded from the test set.

---

## 1. Method

- Controlled CRM Organizations named with the marker prefix `N1 TEST - ...`; all Deals owned by `pilot.operator@example.com`, status `Qualification`.
- Created via a throwaway seeder (`bench/n1_seed.py`, gitignored) using only existing native/FJK fields and child tables. No fields or DocTypes were added.
- Idempotent at the organization level (re-run skips orgs that already have Deals).
- Source-of-truth model: `CRM Deal` shared `fjk_*` fields; child tables `FJK Deal Component`, `FJK Deal Requirement Line`, `FJK Deal Guide Requirement`, `FJK Deal Activity Item`.

## 2. Test Organizations created

| Org | Used by |
|---|---|
| N1 TEST - Rich Package | N1-A |
| N1 TEST - TransAcc | N1-B |
| N1 TEST - Transport Only | N1-C |
| N1 TEST - Activities Guide | N1-D |
| N1 TEST - Incomplete | N1-E |
| N1 TEST - Confirmed | N1-F |
| N1 TEST - Ready | N1-G |
| N1 TEST - Rich Requirements | N1-H |
| N1 TEST - Minimal | N1-I |
| N1 TEST - Multi Deal | N1-J (2 Deals) |

One CRM Contact was created (`N1 Test Contact`) and linked to both N1-J Deals. Contacts are not surfaced by the N1 workspace, so they add no N1 presentation coverage (recorded for completeness).

## 3. Test Deals

| Scenario | Deal ID | Purpose | Components (requested) | Key state |
|---|---|---|---|---|
| N1-A | `CRM-DEAL-2026-00011` | Rich / Full Package | Transportation, Accommodation, Meals, Activities & Tickets, Tour Guide, Special Requirements (all requested; 6) | info_complete=0; 7 req lines; 1 guide; 2 activities; 20 pax (17/2/1) |
| N1-B | `CRM-DEAL-2026-00012` | Multi-component scope | Transportation, Accommodation | info_complete=0; 2 req lines |
| N1-C | `CRM-DEAL-2026-00013` | Single-component / sparse categories | Transportation | info_complete=0; 1 req line |
| N1-D | `CRM-DEAL-2026-00014` | Activities/Tickets + Guide | Activities & Tickets, Tour Guide | info_complete=0; 0 req lines; 1 guide; 2 activities |
| N1-E | `CRM-DEAL-2026-00015` | Information incomplete | Transportation, Accommodation | info_complete=0; KNOWN/TO CONFIRM/MISSING mixture |
| N1-F | `CRM-DEAL-2026-00016` | Customer-confirmed | Transportation, Accommodation | info_complete=0; 2 CUSTOMER-CONFIRMED lines |
| N1-G | `CRM-DEAL-2026-00017` | Information complete / ready | Transportation, Accommodation | `fjk_info_complete=1`, `fjk_ready_for_quotation=1` |
| N1-H | `CRM-DEAL-2026-00018` | Rich requirements | Transportation, Accommodation, Meals (requested); Flights (queried, not requested) | info_complete=0; 12 req lines; ≥3 states |
| N1-I | `CRM-DEAL-2026-00019` | Minimal / sparse | Transportation | info_complete=0; only destination set; 1 req line |
| N1-J (1) | `CRM-DEAL-2026-00020` | Multiple Deals / company context | Transportation (Osaka) | info_complete=0 |
| N1-J (2) | `CRM-DEAL-2026-00021` | Multiple Deals / company context | Accommodation (Hokkaido) | info_complete=0 |

## 4. Data-model notes / limitations

- `fjk_total_pax`, `fjk_adults`, `fjk_children`, `fjk_infants` are native `Int` fields: unset values read as **0**, not NULL. The Summary treats `0` as absent (omits), which is acceptable; Full Details rendering of these values is a separate finding (see verification evidence).
- `fjk_request_nature` and `fjk_commercial_intent` are `Select` fields with a first-option default; unset records surface the default option (`New request` / `Quotation wanted`) even when not explicitly captured. Recorded as a data/model observation.
- Requirement domains are constrained: `Transportation, Accommodation, Meals, Flights, Special Requirements, Other`. `Tour Guide` / `Activities & Tickets` are represented only via the dedicated Guide/Activity child tables (per D1 validation). All scenarios were represented within the existing model — no schema change was required.

## 5. Lifecycle / cleanup

- **Retained for N1 human acceptance.** Do not delete until N1 human acceptance and the resulting assessment are complete.
- Baseline `CRM-DEAL-2026-00010` untouched; pre-existing Deals `00001…00009` untouched.
- Later cleanup is a separate controlled action.
- Throwaway tooling (gitignored, not application code): `bench/n1_seed.py`, `bench/n1_verify.py`, `bench/n1_dump_payloads.py`, `bench/n1_harness/`.

*Recorded via OpenCode session on 2026-10-02.*
