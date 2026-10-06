# FeelJapanK Phase 1 — Presentation Refinement Plan (HF-01 / HF-03 / HF-04 / HF-12) — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Presentation-Refinement-Plan-v0.1 |
| Document status | **PLAN — READ-ONLY. Not approved for implementation. Not implemented.** |
| Scope | Bounded presentation refinements: HF-01, HF-03, HF-04, HF-12 / HF-02-plural |
| Nature | Implementation **plan**. Does **not** authorize implementation. |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Governance state | `PLAN DOCUMENTED → OWNER REVIEW → EXPLICIT BUILD APPROVAL` |

> **This document authorizes planning only. It does not authorize implementation.**

---

## 1. Plan status

`PLAN — READ-ONLY. Not approved. Not implemented.`

## 2. Purpose

Produce a bounded, presentation-only implementation plan resolving the four human-acceptance findings classified as **presentation refinements** in `docs/evidence/phase1/FeelJapanK-Phase1-Human-Acceptance-Finding-Assessment-v0.1.md`:

- **HF-01** — Sticky Deal identity/tabs while scrolling Full Details.
- **HF-03** — Replace raw readiness values with meaningful human-readable presentation.
- **HF-04** — Visual status treatment for Information Status.
- **HF-12 / HF-02-plural** — Passenger pluralisation correction.

Also resolves the closely related HF-03 observation: Summary presents human-readable readiness (`Yes`/`Not yet`), while Full Details exposes raw `0/1`. The plan resolves this inconsistency **without changing the underlying readiness fields or logic**.

## 3. Governance boundary

This is planning only. It does **not** authorize code, schema/DocType/field, database, CRM-record, configuration, permission, integration, or migration changes, and does **not** authorize a commit or push. The plan is limited to items A–D below.

## 4. Authoritative source documents

- `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` (FROZEN)
- `docs/architecture/FeelJapanK-Phase1-N1-Presentation-Operator-Decisions-v0.1.md` (DG-1…DG-7, Candidates #2/#4)
- `docs/evidence/phase1/FeelJapanK-Phase1-Human-Acceptance-Finding-Assessment-v0.1.md`
- N1 technical verification evidence (`…N1-Presentation-Implementation-Verification-v0.1.md`, `…N1-Hybrid-Technical-Verification-v0.1.md`, `…N1-Numeric-Formatting-Remediation-v0.1.md`, `…N1-Authenticated-Browser-Verification-v0.1.md`)

**Relevant decisions honoured:** DG-1 (native CRM Deal identity unchanged; presentation title derived); DG-3 (persistent Summary / Full Details / Supplier Quotation tabs); DG-6 (consolidated Information Status; underlying states / `get_readiness` unchanged); DG-7 (Supplier Quotation remains conditional; no capability expansion here); Candidate #4 (Full Details remains persistent and business-category structured).

## 5. Human acceptance findings in scope

| ID | Finding | Target behaviour |
|---|---|---|
| HF-01 | Sticky Deal identity/tabs | title + tabs remain available while scrolling Full Details |
| HF-03 | Raw `0/1` readiness in Full Details | human-readable, consistent with Summary |
| HF-04 | Information Status lacks visual hierarchy | status-specific, accessible presentation |
| HF-12 / HF-02-plural | `"1 infants"` | correct singular/plural grammar |

## 6. Explicit out-of-scope findings

- **HF-02 passenger ages** — classified NEEDS FURTHER EVIDENCE; no age fields, no data-model change. Only the pluralisation aspect is in scope.
- **HF-05, HF-06, HF-07, HF-08, HF-09** — workflow / information-model findings; not in this increment.
- **HF-11** — actionable Information Status / native-CRM handoff; not in this increment and subject to FK-D12.
- **HF-10 itinerary view** — deferred to Stage 3 / Phase 2.
- No schema/field/API/readiness-logic change; no expansion of Supplier Quotation capability; no new routes; no DG-7 change.

## 7. Current implementation inspection

Inspected `bench/apps/feeljapank_crm/frontend/src/App.vue` (705 lines). Bundle is produced by `vite build` → `feeljapank_crm/public/dist/feeljapank.{js,css,js.map}`.

- **HF-01** — root wrapper `:2`; header block `:10–22`; tab bar `:27–35`. `grep -n "sticky|position:"` returns none (plain flow layout).
- **HF-03** — Full Details shared table `:130–139` is fed by `sharedRows` (`:559–561`) → `fmtShared(v)` (`:553–557`; type-based boolean handling only) over the raw `shared` object, which includes `fjk_ready_for_quotation` and `fjk_info_complete` serialized as integers `0/1` (labels at `:549–550`). Summary already renders `Yes`/`Not yet` (`:68`) and `YES`/`NO` (`:107`) from `get_deal_summary`'s boolean top-level keys.
- **HF-04** — status text is rendered in Summary categories (`:58`), the Information Status sections (`:64–104`), and Full Details status cells (`:184`, plus the activity/guide tables `:190–273`). There is no status colouring.
- **Pluralisation** — `paxComposition` (`:450–460`) hardcodes `" adults"`, `" children"`, `" infants"`.

## 8. Proposed changes A–D

### A. HF-01 — Sticky context

1. **Current location:** `App.vue` template — root `:2`, header `:10–22`, tab bar `:27–35`; no `position: sticky` anywhere.
2. **Today:** title, subtitle, `Open in CRM`, and tabs scroll away with the long Full Details content.
3. **Proposed:** wrap the existing header (`:10–22`) and tab bar (`:27–35`) in a single wrapper and apply `position: sticky; top: 0; z-index` (small class change only). No new routes, no duplicated navigation.
4. **Minimal surface:** `App.vue` template + wrapper CSS only.
5. **Backend/API/schema:** none.
6. **Regression risk:** the Desk scroll parent may have `overflow` that defeats `sticky`; sticky bar may overlap the Desk navbar. Mitigate with the correct scroll ancestor and top offset.
7. **Verification:** scroll Full Details on `CRM-DEAL-2026-00011`; title + tabs remain visible; no layout shift or overlap.
8. **Human re-acceptance:** required (HF-01).
9. **Out of scope:** any change to tab behaviour, routing, or content.

### B. HF-03 — Human-readable readiness

1. **Current location:** `sharedRows` (`App.vue:559–561`) and `fmtShared` (`:553–557`); raw values originate from the `shared` block of `get_deal_summary`.
2. **Today:** Full Details shows `Ready for Quotation: 0`, `Info Complete: 0` (raw ints).
3. **Proposed:** make the presentation **field-key-aware** for the two readiness keys (`fjk_ready_for_quotation` → `Yes`/`Not yet`; `fjk_info_complete` → `Yes`/`No`), consistent with the Summary presentation. Field-key mapping is required because Frappe serializes these Check fields as integers, so a type-based formatter cannot distinguish them.
4. **Minimal surface:** `App.vue` presentation/computed only.
5. **Backend/API/schema:** none. Do **not** change the Frappe Check fields, readiness logic, `get_readiness`, or the Info Complete gate.
6. **Regression risk:** must not alter numeric passenger rendering (zeros must stay numeric, e.g. `Children 0`).
7. **Verification:** `CRM-DEAL-2026-00017` shows readiness `Yes`; `CRM-DEAL-2026-00010`/`00011` show `Not yet` / `No`; passenger values remain numeric including zeros.
8. **Human re-acceptance:** required (HF-03).
9. **Out of scope:** business-meaning reinterpretation, field/type changes, API changes.

### C. HF-04 — Information Status visual hierarchy

1. **Current location:** Information Status sections (`App.vue:64–104`), Summary categories (`:58`), Full Details status cells (`:184` and activity/guide tables `:190–273`).
2. **Today:** statuses are plain grey text with no visual prioritisation.
3. **Proposed:** add a **status → class map** (`MISSING` = red/attention, `TO CONFIRM` = amber/yellow, `CUSTOMER-CONFIRMED` = green, `KNOWN` = neutral, `NOT APPLICABLE` = muted/neutral) and apply it to the status labels/badges. Guidelines: colour must not be the only indicator (retain the **textual** status and add a non-colour cue such as a leading symbol), ensure sufficient contrast, and avoid visual noise.
4. **Minimal surface:** `App.vue` presentation only.
5. **Backend/API/schema:** none. No new state values; no change to requirement states or readiness calculations.
6. **Regression risk:** do not disturb DG-6 wording/consolidation; not colour-only; keep readability.
7. **Verification:** `CRM-DEAL-2026-00011` (mixed states), `CRM-DEAL-2026-00015` (TO CONFIRM / MISSING), `CRM-DEAL-2026-00017` (CUSTOMER-CONFIRMED).
8. **Human re-acceptance:** required (HF-04).
9. **Out of scope:** any change to status semantics, counts, or readiness.

### D. Passenger pluralisation

1. **Current location:** `paxComposition` (`App.vue:450–460`).
2. **Today:** hardcoded `" adults"`, `" children"`, `" infants"` → renders `"1 infants"`.
3. **Proposed:** singular/plural helper (`1 child`, `1 infant`; `2 children`, etc.; `pax` label unchanged).
4. **Minimal surface:** `paxComposition` only (presentation formatter).
5. **Backend/API/schema:** none. No change to passenger data, schema, APIs, or business logic.
6. **Regression risk:** display-only; must not alter numeric values.
7. **Verification:** `CRM-DEAL-2026-00011` shows `1 infant`, `2 children`; `CRM-DEAL-2026-00012` / `00019` unaffected.
8. **Human re-acceptance:** required (HF-12).
9. **Out of scope:** any data or logic change.

## 9. Files/components expected to change

- `bench/apps/feeljapank_crm/frontend/src/App.vue` (only).
- Rebuilt bundle: `bench/apps/feeljapank_crm/feeljapank_crm/public/dist/feeljapank.{js,css,js.map}`.

Note: `bench/` is gitignored in the outer repository.

## 10. Data / schema / API impact assessment

**None.** No DocType, custom field, migration, `get_deal_summary`/`get_readiness`/`get_quotation`, or Info Complete change. All four items are frontend presentation only.

## 11. Regression protection

The build must preserve and be verified against:

- DG-1 derived title and native Deal ID.
- DG-3 three-tab structure and Summary default.
- DG-4 business-oriented Summary.
- DG-5 derived scope.
- DG-6 consolidated Information Status and underlying states.
- DG-7 Supplier Quotation activation behaviour.
- Numeric passenger values remain numeric, including zeros.
- Boolean presentation remains correct.
- No change to native CRM Deal identity / naming series.
- No change to Deal data.
- No change to the quotation prototype.
- No change to schema or permissions.

## 12. Verification plan

1. Rebuild the frontend (`npm run build` in `frontend/`); confirm bundle regenerates.
2. Confirm bundle served `HTTP 200`.
3. Authenticated browser re-run of the N1 checks across the controlled dataset, focusing on:
   - `CRM-DEAL-2026-00011` (rich: sticky scroll, many statuses, `1 infant`),
   - `CRM-DEAL-2026-00017` (readiness `Yes`, Supplier active),
   - `CRM-DEAL-2026-00015` (TO CONFIRM / MISSING colours),
   - `CRM-DEAL-2026-00013` (single scope),
   - `CRM-DEAL-2026-00019` (minimal / zeros),
   - `CRM-DEAL-2026-00010` (protected original baseline; must remain `info_complete=0`, numeric/boolean unchanged).
4. Compare against N1 expected evidence; capture console/network errors.

## 13. Human re-acceptance plan

Targeted human re-acceptance by the operator for HF-01 / HF-03 / HF-04 / HF-12 on `CRM-DEAL-2026-00011` (and `CRM-DEAL-2026-00017` for readiness `Yes`), recorded verbatim in a separate additive human-acceptance evidence document. This is genuine operator acceptance, distinct from agent/technical verification.

## 14. Rollback considerations

Keep a pre-build copy of `App.vue` and `public/dist/*`. Rollback = restore the prior `App.vue` and rebuild the bundle (or restore the prior bundle).

## 15. Approval gate

`PLAN → REVIEW → EXPLICIT APPROVAL → BUILD → VERIFY → HUMAN ACCEPTANCE`.

No build begins without explicit approval. **This document authorizes planning only.**

## 16. Authorization statement

**This document authorizes planning only. It does not authorize implementation.**

---

*Created via OpenCode session on 2026-10-04. Planning/documentation only. No code, schema, database, CRM record, configuration, permission, integration, or frontend-bundle change; no build; no commit; no push.*
