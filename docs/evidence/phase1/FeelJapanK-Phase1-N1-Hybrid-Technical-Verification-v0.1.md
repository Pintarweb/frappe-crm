# FeelJapanK Phase 1 — N1 Hybrid Technical Verification — v0.1

**Document status:** TECHNICAL / AUTOMATED / BROWSER-RENDER VERIFICATION — N1
**Nature:** additive technical verification evidence. **NOT human acceptance.** Genuine human acceptance remains a separate subsequent gate.
**Dataset:** `docs/evidence/phase1/FeelJapanK-Phase1-N1-Controlled-Test-Dataset-v0.1.md` (Deals `CRM-DEAL-2026-00011`…`00021`, baseline `00010` preserved).

---

## 1. Layer 1 — Automated / API / data-driven verification

Read-only harness (`bench/n1_verify.py`, gitignored) exercised every test Deal through the app's own read-only APIs (`get_deal_summary`, `get_readiness`).

**Result: 120 / 120 checks passed, 0 failures.**

Coverage included, per Deal: existence/company; component count; requirement-line count; guide/activity counts; `info_complete`; `ready_for_quotation`; derived scope; total pax. Negative/sparse checks: minimal Deal has no pax/duration; N1-C has no Accommodation lines; N1-B has no guide/activity rows. State checks: N1-E outstanding missing + to-confirm; N1-F two CUSTOMER-CONFIRMED; N1-H ≥3 distinct states. Cross-Deal isolation: N1-J same-company Deals return distinct destinations and distinct deal names. Baseline `00010` still ABC Travel, `info_complete=0`, `ready_for_quotation=0`.

Derived-scope results (matches DG-5 implementation):

| Deal | Components requested | Rendered scope |
|---|---|---|
| N1-A `00011` | 6 of 6 | Full package |
| N1-B `00012` | Transportation + Accommodation | Transportation + Accommodation |
| N1-C `00013` | Transportation | Transportation |
| N1-D `00014` | Activities & Tickets + Tour Guide | Activities & Tickets + Tour Guide |
| N1-E `00015` | Transportation + Accommodation | Transportation + Accommodation |
| N1-F `00016` | Transportation + Accommodation | Transportation + Accommodation |
| N1-G `00017` | Transportation + Accommodation | Transportation + Accommodation |
| N1-H `00018` | Transportation + Accommodation + Meals (Flights queried, not requested) | Transportation + Accommodation + Meals |
| N1-I `00019` | Transportation | Transportation |
| N1-J1 `00020` | Transportation | Transportation |
| N1-J2 `00021` | Accommodation | Accommodation |

## 2. Layer 2 — Browser / UI render verification

**Constraint:** the workspace is login-gated and no authenticated browser session was available; credential handling is prohibited by task governance. Full authenticated end-to-end browser verification was therefore **not performed**.

**Performed instead (strongest available):** a real-browser render test of the actual built N1 bundle (`feeljapank.js` + `feeljapank.css`) against **real captured API payloads** for every test Deal, with mocked transport (`bench/n1_harness/`, gitignored). This exercises the real Vue template/computed presentation layer; only the network transport is mocked.

Results (all 12 rendered, 0 JavaScript errors, tabs `Summary | Full Details | Supplier Quotation` present):

| Deal | Title | Scope | Supplier tab | Info |
|---|---|---|---|---|
| `00010` baseline | ABC Travel · 2026 · #00010 | Transportation + Accommodation | inactive | NO |
| `00011` N1-A | N1 TEST - Rich Package … #00011 | Full package | inactive | NO |
| `00012` N1-B | … #00012 | Transportation + Accommodation | inactive | NO |
| `00013` N1-C | … #00013 | Transportation | inactive | NO |
| `00014` N1-D | … #00014 | Activities & Tickets + Tour Guide | inactive | NO |
| `00015` N1-E | … #00015 | Transportation + Accommodation | inactive | NO |
| `00016` N1-F | … #00016 | Transportation + Accommodation | inactive | NO |
| `00017` N1-G | … #00017 | Transportation + Accommodation | **active (prototype placeholder)** | YES |
| `00018` N1-H | … #00018 | Transportation + Accommodation + Meals | inactive | NO |
| `00019` N1-I | … #00019 | Transportation | inactive | NO |
| `00020` N1-J1 | … #00020 | Transportation | inactive | NO |
| `00021` N1-J2 | … #00021 | Accommodation | inactive | NO |

Confirmed in render:
- Derived prominent title from existing data; native ID shown only as `Deal ID` in Full Details.
- Summary renders company, destination, dates/duration, passenger composition, scope, status/next action, business categories, and consolidated Information Status; no `Collected lines` / raw `Shared fields` dump; Commercial Intent not surfaced in Summary.
- Full Details renders by business category (Deal/Customer Context, Requested Components, Transportation, Accommodation, Meals, Special / Other Requirements, Activities / Tickets, Guide, Information Status / Readiness, Source evidence); no raw shared-field dump.
- N1-I (minimal) renders cleanly with `—` placeholders and "None recorded." for empty categories; no fabricated values.
- Supplier Quotation inactive before Info Complete; active placeholder at `fjk_info_complete=1` (N1-G); no Supplier Quotation capability present.

## 3. Findings

### 3.1 Implementation defect (N1 presentation) — NOT fixed in this task

**Full Details renders integer shared fields incorrectly when the value is `0` or `1`.**
- Observed: `Total Pax 0` → `No` (N1-I `00019`); `Children 1` → `Yes` (N1-D `00014`); `Infants 1` → `Yes` (N1-A `00011`); `Infants 0` / `Children 0` → `No` across records (e.g. baseline `00010` Infants → `No`).
- Cause (implementation): the Full Details boolean formatter maps `0 → "No"` and `1 → "Yes"`, but is applied to numeric fields (`fjk_total_pax`, `fjk_adults`, `fjk_children`, `fjk_infants`).
- Impact: misleading granular values in Full Details; Summary passenger composition is unaffected (numeric).
- Action: documented only; **do not fix during this task** (per task §13).

### 3.2 Data / model limitations
- Unset `Int` fields read as `0` (not NULL), so "not captured" and "zero" are indistinguishable at the data layer.
- Unset `Select` fields (`fjk_request_nature`, `fjk_commercial_intent`) surface their first option as a default, so Full Details can show `New request` / `Quotation wanted` even when not explicitly captured (seen on N1-I).

### 3.3 UX observations
- Summary pluralization: "1 children", "1 infants" (e.g. N1-A/D). Cosmetic.
- Scope rule (`Full package` only when all components requested and ≥3) behaved as persisted in DG-5; no ambiguity exposed by the dataset.

### 3.4 Unresolved questions
- Full authenticated browser verification (real login) is pending; the render test above is not a substitute for it.
- DG-8 remains an undefined citation (roadmap line 25).

## 4. Evidence distinction

- Layer 1 = automated/API read-only verification.
- Layer 2 = browser render of the real bundle with mocked transport (technical/browser verification, not human acceptance, not authenticated end-to-end).
- Layer 3 = genuine human acceptance (separate; not performed; not claimed).

## 5. Governance

- No code modified: `App.vue`/backend/APIs/DocTypes/schema/permissions/integrations/CRM frontend unchanged by this task.
- Additive records created: 10 `N1 TEST` Organizations, 11 test Deals, 1 test Contact.
- Baseline and pre-existing Deals unchanged.
- No commit; no push.

*Recorded via OpenCode session on 2026-10-02.*
