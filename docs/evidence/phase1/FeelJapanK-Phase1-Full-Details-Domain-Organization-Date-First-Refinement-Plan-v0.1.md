# FeelJapanK Phase 1 — Full Details: Domain Organization & Date-First Refinement Plan — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Full-Details-Domain-Organization-Date-First-Refinement-Plan-v0.1 |
| STATUS | **PLAN — READ-ONLY / NOT APPROVED / NOT IMPLEMENTED** |
| Scope | Presentation-only restructuring of Full Details: date-first day headers + one authoritative section per domain (Transportation / Accommodation / Meals) |
| Human fixture | `CRM-DEAL-2026-00022` — "FJK HUMAN ACCEPTANCE - Day Detail Test" |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |

> This document authorizes planning only. It does **not** authorize implementation. BUILD approval has **not** been requested or assumed.

---

## 1. Purpose

Plan a bounded UX restructuring of **Full Details** based on genuine human testing of `CRM-DEAL-2026-00022`. The implementation technically passes but the operator identified a presentation/organization problem: the date/day is not the first organizing reference, and the three domains appear fragmented/duplicated. Keep **Summary** high-level. Presentation-only; no data/API/schema change.

## 2. Human findings (HF-DD)

- **HF-DD-01** — Date is not the primary reference; entries appear as a repeating sequence without an immediately visible day/date association. Operator wants **date/day first**.
- **HF-DD-02** — Full Details domain organization is **fragmented**; the same domain information appears in more than one place. Wants exactly **one authoritative section per domain**.
- **HF-DD-03** — Summary must remain high-level; do not duplicate day-by-day detail into Summary.
- **HF-DD-04** — Each Full Details domain organized by **Date + Day N → entries** (separately per domain; **not** a combined daily matrix).
- **HF-DD-05** — Multiple entries on the same day must remain visible (Transportation Day 2: T2+T3; Accommodation Day 3: A1+A2; Day 4: A2+A3).
- **HF-DD-06** — Existing domain detail must remain intact (Item, Detail, Location, Notes, Pax/Qty, Status, Date From/To).
- **HF-DD-07** — Preserve status presentation + cues (MISSING / TO CONFIRM / CUSTOMER-CONFIRMED / KNOWN / NOT APPLICABLE).
- **HF-DD-08** — Undated lines must remain identifiable under a labelled fallback (e.g. "Undated lines"). Do not assign artificial dates.
- **HF-DD-09** — Existing Full Details sections (Activities / Tickets, Guide, Special Requirements, Information Status) must retain an explicit, sensible placement; not removed.

## 3. Authoritative references

- `…Full-Details-Day-by-Day-Domain-Detail-Plan-v0.1.md`
- `…Full-Details-Day-by-Day-Domain-Detail-Implementation-Verification-v0.1.md`
- Current implementation: `bench/apps/feeljapank_crm/frontend/src/App.vue`
- Frozen roadmap `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md`

## 4. Current implementation findings (code-verified)

Full Details (`App.vue` `tab === 'details'`, from `:129`) currently renders, in order:

1. `:131` Full Details header + `:133` Deal ID.
2. `:136` **Deal / Customer Context** — `sharedRows` table.
3. `:147` **Requested Components** table.
4. `:165-166` **Requirements by business category** — `v-for grp in detailReqGroups` → flat tables for **Transportation, Accommodation, Meals + Special/Other**, columns `Domain / Item / Detail / Dates / Pax-Qty / Location / Status` (date is an incidental column, not a group header).
5. `:195` **Activities / Tickets** table.
6. `:212+` **Guide Requirements** table.
7. `:245` **Day-by-Day Domain Detail** — `v-for blk in dayDomainBlocks` → **Transportation / Accommodation / Meals**, each `Day N · YYYY-MM-DD` with per-day entries; undated/out-of-window fallbacks.
8. `:339` **Information Status / Readiness**.
9. `:358` **Source evidence**.

**Finding:** the duplication HF-DD-02 observed is **real**. Transportation, Accommodation and Meals are rendered **twice** — once as flat category tables (`detailReqGroups`, block 4) and again in the day-by-day block (7). `detailReqGroups` (`App.vue:601-611`) sets `primary = ["Transportation","Accommodation","Meals"]` and pushes everything else into "Special / Other Requirements". The flat tables also lack day grouping and use an ISO `Dates` column positioned after `Item` (HF-DD-01). Summary (`tab === 'summary'`, `:40-128`) does **not** contain day-by-day detail — it is already high-level (HF-DD-03 satisfied today).

Reusable helpers (frontend-local): `parseTripWindow`, `tripWindow`, `daysBetween`, `dayList`, `dayRangeAvailable`, `lineDays`, `buildDomainBlock`, `dayDomainBlocks`, `mealSlots`, `statusClass`, `statusCue`.

## 5. Proposed target structure (Full Details)

```
Full Details · Information Gathering (read-only)
  Deal ID
  Deal / Customer Context
  Requested Components

  TRANSPORTATION            ← one authoritative section (day-by-day)
    10 Dec 2026 · Day 1
      <entries>
    11 Dec 2026 · Day 2
      <entries (multiple visible)>
    …
    16 Dec 2026 · Day 7
      <entries>
    Undated lines (if any)

  ACCOMMODATION             ← one authoritative section (day-by-day)
    10 Dec 2026 · Day 1 … 16 Dec 2026 · Day 7 ; overlaps shown same day
    Undated lines (if any)

  MEALS                     ← one authoritative section (day-by-day)
    10 Dec 2026 · Day 1 → Breakfast / Lunch / Dinner / Other
    …
    Undated lines (if any)

  Special / Other Requirements   ← flat table (non-primary domains only)
  Activities / Tickets
  Guide Requirements
  Information Status / Readiness
  Source evidence
```

- The **flat category tables for Transportation/Accommodation/Meals are removed** (they are superseded by the day-by-day sections). Non-primary domains (Special Requirements, Other, Flights if present) remain as the flat "Special / Other Requirements" table.
- The day-by-day block is **moved above** the Special/Other table so the three primary domains lead.
- No combined `Day | Transportation | Accommodation | Meals` matrix.

## 6. Date-first behaviour

- Day header changes from `Day N · YYYY-MM-DD` to **`10 Dec 2026 · Day 1`** (human-readable date **first**, day second).
- Implement a small local formatter, e.g. `fmtDateHuman("2026-12-10") → "10 Dec 2026"` (month-name array). No dependency/library.
- Day range continues to use the approved semantics: derive Day 1…Day N from the trip window (`fjk_exact_dates`/`fjk_timeframe` ISO dates); **never hard-code seven days**; preserve the neutral fallback when no window is established; never invent dates; preserve the undated fallback.
- Entries keep their own `date_from`/`date_to`; the group header is the primary date reference.

## 7. Domain consolidation

- Exactly **one** section each for Transportation, Accommodation, Meals (day-by-day).
- Achieve by changing `detailReqGroups` (or its template consumer at `:165-166`) so the three primary domains are **not** rendered as flat tables; keep only the non-primary "Special / Other Requirements" group in that flat block.
- Reuse `dayDomainBlocks`/`mealSlots` unchanged.

## 8. Summary boundary

- Summary remains **unchanged and high-level**: Company, Destination/route, Dates/duration, Passenger composition, Scope, Status/Next action, high-level Information Status, business categories (DG-4).
- Do **not** add day-by-day domain detail to Summary.
- Do not remove legitimate high-level Summary information.

## 9. Multiple entries on the same day

- Each requirement line remains its **own row**; same-day multiples render as multiple rows under that day's header (no collapsing).
- `CRM-DEAL-2026-00022` must show Transportation Day 2 = 2 rows; Accommodation Day 3 = 2 rows (Tokyo+Hakone); Day 4 = 2 rows (Hakone+Osaka).

## 10. Undated entries

- Lines without `date_from` remain under a clearly labelled **"Undated lines"** sub-block **within their domain section** (per-domain), never assigned an artificial day.
- `CRM-DEAL-2026-00022`'s undated meal ("Welcome dinner (optional, date TBD)", MISSING) must remain under Meals → Undated lines.

## 11. Secondary Full Details sections

| Section | Decision |
|---|---|
| Deal / Customer Context | Keep (top). |
| Requested Components | Keep (high-level; not domain detail). |
| Special / Other Requirements | Keep as the flat non-primary table (after the three day-by-day domains). |
| Activities / Tickets | Keep (after Special/Other). |
| Guide Requirements | Keep. |
| Information Status / Readiness | Keep (last before Source evidence). |
| Source evidence | Keep. |

No secondary section removed; no new data structures introduced.

## 12. Data / API / schema impact

**None.** Presentation-only. Uses existing `get_deal_summary` data. No DocType, field, schema, API, DB, CRM-record, permission, integration, route, or naming-series change. No Trip/Phase-2/itinerary/HF-11/structured-fields work.

## 13. Regression requirements (must hold)

DG-1 (derived title + native Deal ID), DG-3 (tabs + Summary default), DG-4 (business Summary), DG-5 (derived scope), DG-6 (Information Status + states), DG-7 (Supplier activation), HF-01 (sticky identity/context/tabs), HF-03 (readable readiness), HF-04 (status hierarchy + cues), HF-12 (pluralisation), numeric passengers incl. zero, cross-Deal isolation, protected baseline `CRM-DEAL-2026-00010`, `CRM-DEAL-2026-00011…00021`, `FJK-QUO-2026-00001`, and the `CRM-DEAL-2026-00022` fixture.

## 14. Verification plan

- Rebuild bundle (`npm run build`); confirm bundle HTTP 200; backend harness `n1_verify.py` (expect 120/120).
- Authenticated browser verification on `CRM-DEAL-2026-00022` (primary), plus `00011`, `00017`, `00019`, `00010`:
  - exactly one Transportation / Accommodation / Meals section each (no duplicate flat tables);
  - date-first headers (`10 Dec 2026 · Day 1`), Day 1…Day 7;
  - Day 2 two transport rows; Day 3 two accommodation rows; Day 4 two accommodation rows;
  - every day's Breakfast/Lunch/Dinner distinguishable;
  - undated meal under "Undated lines";
  - no combined daily matrix;
  - long `detail` text readable; statuses/cues visible; no data lost;
  - Summary remains high-level (no day-by-day);
  - no JS/Vue errors; no unexpected non-2xx.

## 15. Human acceptance plan (post-BUILD, operator, normal Chrome)

Operator answers: (1) identifiable date/day per entry; (2) Transportation independently scannable; (3) Accommodation independently scannable; (4) Meals independently scannable; (5) exactly one place per domain; (6) same-day multiples understandable; (7) undated distinguishable; (8) Summary feels like a summary; (9) Full Details suitable as a quotation-preparation surface. No acceptance claimed here.

## 16. Rollback considerations

Keep a pre-build copy of `App.vue` + `public/dist/*`. Rollback = restore `App.vue` and rebuild (or restore prior bundle).

## 17. Out-of-scope

New DocTypes/fields/schema; API/semantics; CRM records/hooks; permissions/integrations; Trip/Phase 2/itinerary; Supplier Quotation implementation; HF-11 CRM handoff; structured vehicle capacity / rooming / meal-provided fields; modifying existing evidence; changes to Summary beyond leaving it as-is.

## 18. Approval gate

`PLAN → REVIEW → EXPLICIT APPROVAL → BUILD → VERIFY → HUMAN ACCEPTANCE`.

**This document authorizes planning only. It does not authorize implementation.** BUILD approval has not been requested or assumed.

---

*Created via OpenCode session on 2026-10-04. Planning/documentation only. No source, schema, database, CRM, configuration, permission, route, or integration change; no build; no commit; no push.*
