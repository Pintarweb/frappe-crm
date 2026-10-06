# FeelJapanK Phase 1 — Full Details: Day-by-Day Domain Detail Plan — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Full-Details-Day-by-Day-Domain-Detail-Plan-v0.1 |
| STATUS | **PLAN — READ-ONLY / NOT APPROVED / NOT IMPLEMENTED** |
| Scope | Full Details presentation only: separate day-by-day sections for Transportation, Accommodation, Meals |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Nature | Planning exercise only. Does **not** authorize implementation, schema change, or BUILD. |

> This document authorizes planning only. It does not authorize implementation.

---

## 1. Status

`PLAN — READ-ONLY / NOT APPROVED / NOT IMPLEMENTED`

## 2. Operator requirement

Keep the **Summary** tab high-level. Make **Full Details** the complete quotation-preparation surface with **three separate domain sections — Transportation, Accommodation, Meals** — each presented **day-by-day** (Day 1 … Day N derived from the Deal's actual trip duration/dates). A combined per-day matrix (Day 1 → Transportation + Accommodation + Meals together) is **explicitly rejected**.

## 3. UX principle

Scan **one domain at a time**:

```
TRANSPORTATION
  Day 1 → details
  Day 2 → details
  …
  Day N → details

ACCOMMODATION
  Day 1 / stay → details
  Day 2 / stay → details
  …
  Day N → details

MEALS
  Day 1 → breakfast / lunch / dinner
  Day 2 → breakfast / lunch / dinner
  …
  Day N → breakfast / lunch / dinner
```

Domain-separated, day-ordered. **Summary remains unchanged and must not be expanded** with these Full Details fields.

## 4. Scope

Full Details presentation only, for Transportation / Accommodation / Meals. No schema/API/CRM change proposed as authorized work; no Trip/Phase-2/itinerary object.

## 5. Evidence reviewed (source-confirmed)

- `FJK Deal Requirement Line` DocType JSON — fields: `domain` (Select: Accommodation / Transportation / Meals / Flights / Special Requirements / Other), `item` (Data), `detail` (Small Text), `date_from` (Date), `date_to` (Date), `pax_or_qty` (Int), `location` (Data), `status` (Select), `notes` (Small Text).
- `FJK Deal Component` (component / requested / status / notes); `FJK Deal Activity Item` (item / quantity / date_time / pax_or_coverage / status / notes); `FJK Deal Guide Requirement` (languages / date_from / date_to / duration / location / pax / coverage_scope / other / status).
- `d1.py:6` states `{KNOWN, MISSING, TO CONFIRM, CUSTOMER-CONFIRMED, NOT APPLICABLE}`; `d1.py:7` reserved domains (Tour Guide / Activities & Tickets use dedicated tables).
- `api.py` `get_deal_summary` (`:320-369`) returns requirement lines (dates/location/status) and shared fields; `get_readiness` (`:243-253`) outstanding = MISSING / TO CONFIRM only.
- `setup.py:15-30`: trip-window fields `fjk_destination_route`, `fjk_timeframe`, `fjk_exact_dates`, `fjk_duration` are **`Data` (free text)**; only `fjk_total_pax` / `fjk_adults` / `fjk_children` / `fjk_infants` are Int; readiness fields are Check.
- `App.vue` Full Details (domain tables + advisory Coverage section).
- `docs/operations/FeelJapanK-Phase1-Deal-Information-Gathering-Template-v0.2.md` (Accommodation §5, Transportation §6, Meals §9); `…Manual-Enquiry-Deal-SOP-v0.2.md:155`.
- `docs/evidence/phase1/FeelJapanK-Phase1-HF-05-HF-07-Coverage-Completeness-Plan-v0.1.md` and `…Implementation-Verification-v0.1.md`; frozen roadmap `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md`.

## 6. Current Full Details implementation

Renders **domain tables** per domain (columns Domain / Item / Detail / Dates / Pax-Qty / Location / Status) via `detailReqGroups`, then Activities, Guide, Information Status, and the recently added **Coverage & Completeness (advisory)** block for Transportation / Accommodation. It is **not** day-by-day and has **no Meals day grouping**.

## 7. Transportation capability assessment

- date/day — **B** (`date_from` / `date_to` → day grouping).
- route — **C** (free text in `item` / `detail` / `location`).
- transportation type — **C** (free text).
- passenger count — **A** (`pax_or_qty`) but semantics ambiguous (`Pax / Qty`).
- vehicle type — **C** (free text only).
- vehicle capacity — **C** (free text only).
- vehicle quantity — **E** (no dedicated field; `pax_or_qty` is pax-or-qty, not clearly vehicle count).
- status — **A**.
- notes/details — **A**.

## 8. Accommodation capability assessment

- date/stay — **B** (`date_from` / `date_to` → stay/day).
- location — **A** (`location`).
- hotel identity — **C** (free text `item` / `detail`).
- room type — **C** (free text).
- room size — **D** (not represented).
- occupancy/sharing — **C** (free text).
- room quantity — **E** (no dedicated field).
- pax allocation — **C/E** (free text and/or `pax_or_qty`).
- status — **A**.
- notes/details — **A**.

## 9. Meals capability assessment

- day/date — **B** (`date_from` / `date_to`).
- breakfast / lunch / dinner — **C** (representable only as separate `item` rows; no structured meal slots).
- provided / not provided — **D/E**: "not provided" has **no first-class state**; only `KNOWN / MISSING / TO CONFIRM / CUSTOMER-CONFIRMED / NOT APPLICABLE` exist.
- status — **A**.
- notes/details — **A**.

## 10. Day-range / date semantics

- Trip start/end, timeframe and duration are **free text** (`fjk_exact_dates`, `fjk_timeframe`, `fjk_duration`); there are **no structured trip Date fields** on the Deal.
- Derivation: parse ISO dates from `fjk_exact_dates` / `fjk_timeframe` → min…max = inclusive day list. Otherwise fall back to the union of requirement-line `date_from` / `date_to`; otherwise **no day range**.
- **Accommodation nights:** no explicit "nights" field; nights derive from stay `date_from` / `date_to` (check-in/out are not structured).
- Behaviour:
  - **1-day trip** → single day.
  - **multi-day trip** → N days.
  - **sparse/incomplete** → days with no lines show "no requirement lines captured for this day" (advisory, **not** MISSING).
  - **missing trip dates / duration** → flat domain lists + "trip window not established".
  - **unusual/inconsistent dates** (`date_to < date_from`, lines outside window) → handled defensively and shown/flagged.
- **Never invent** a trip window or data.

## 11. Capability matrix (A–E)

Classification legend: **A** already structured & directly usable · **B** structured but needs presentation transformation · **C** free text only · **D** not represented · **E** ambiguous / needs further operator evidence.

| Domain | Facet | Class |
|---|---|---|
| Transportation | day/date | B |
| Transportation | route | C |
| Transportation | transportation type | C |
| Transportation | passenger count | A |
| Transportation | vehicle type | C |
| Transportation | vehicle capacity | C |
| Transportation | vehicle quantity | E |
| Transportation | status | A |
| Transportation | notes/details | A |
| Accommodation | date/stay | B |
| Accommodation | location | A |
| Accommodation | hotel identity | C |
| Accommodation | room type | C |
| Accommodation | room size | D |
| Accommodation | occupancy/sharing | C |
| Accommodation | room quantity | E |
| Accommodation | pax allocation | C/E |
| Accommodation | status | A |
| Accommodation | notes/details | A |
| Meals | day/date | B |
| Meals | breakfast/lunch/dinner | C |
| Meals | provided / not provided | D/E |
| Meals | status | A |
| Meals | notes/details | A |

## 12. Current-model limitations

Only `date_from` / `date_to`, `location`, `item`, `detail`, `pax_or_qty`, `status`, `notes` exist on requirement lines. There is **no structured day index, vehicle class/capacity/quantity, room type/size/occupancy/count, hotel field, or meal-slot / provided semantics**. Day grouping is therefore a **presentation transformation** over dates + free text.

**Documentation vs implementation discrepancy:** the Information-Gathering Template lists structured-looking items (vehicle class/capacity; room configuration/size/quantity; meal type), but these exist in the model **only as free text or not at all**. Reported, not silently reconciled.

## 13. Schema-change assessment

The **day-by-day domain presentation itself requires no schema change** — it groups existing dated requirement lines. Structured capture of the **C/D/E** facets (vehicle class/capacity/quantity, room type/size/occupancy/count, meal "not provided") would require schema and is **not proposed** here; classify as evidence-gated.

## 14. FK-D12 assessment

An FK-D12 normal-first/customization review is justified **only** if the operator requires **structured capture** of vehicle capacity/class, rooming detail, or meal "not provided". **No such change is justified by current evidence**, and no new fields are proposed.

## 15. Phase 1 vs later-phase boundary

Grouping Deal requirement lines by day for **information-gathering completeness** remains **Phase 1 pre-invoice Deal** presentation. It must **not** become an operational **Trip itinerary** (no execution sequencing, bookings, or Trip entity). Guard explicitly against turning Full Details into a Trip object. Operational itinerary synthesis remains Stage 3 / Phase 2 (**HF-10**).

## 16. Relationship to current HF-05/HF-07 implementation

The operator's new requirement **supersedes/reframes** the advisory coverage direction. Specifically:

- The current **"Coverage not established for X days"** concept is a **candidate for retirement/replacement in a future increment** — it is **not modified now**.
- Existing **requirement-line data can feed** the proposed day-by-day domain sections.
- **HF-05, HF-07 and HF-09** plausibly become **one bounded Full Details presentation refinement**, subject to operator evidence on structured sub-fields and separate approval. (No decision is made here.)
- Existing HF-05/HF-07 evidence is preserved; no existing evidence is rewritten.

## 17. Recommended bounded future increment (candidate only)

**"Full Details — Separate Day-by-Day Domain Detail"**:

```
TRANSPORTATION   Day 1 … Day N → captured transport requirement(s) + status
ACCOMMODATION    Day 1 … Day N → captured stay(s) + status
MEALS            Day 1 … Day N → breakfast / lunch / dinner + status
```

Built from existing dated requirement lines; Summary unchanged; neutral/advisory framing when the trip window cannot be established. **Not approved.**

## 18. Verification strategy

Authenticated browser verification on controlled Deals `CRM-DEAL-2026-00011` (rich, multi-day), `00015` (incomplete), `00017` (complete), `00019` (sparse), `00010` (protected baseline): day-range derivation, domain separation (no combined matrix), sparse/missing-date behaviour, status badges/cues, no fabricated data; backend harness `n1_verify.py`; regression on DG-1/3/4/5/6/7 and HF-01/03/04/12.

## 19. Human acceptance strategy

Operator recheck in normal Chrome: can each domain be scanned day-by-day; are missing vs not-applicable vs not-captured distinguished; is Summary still high-level? Recorded separately; agent/technical verification does not substitute for human acceptance.

## 20. Explicit out-of-scope

Schema/fields; structured vehicle capacity/quantity; structured rooming/room-size/room-count; meal "not provided" semantics; HF-11 (actionable Information Status → CRM handoff); HF-10 (operational itinerary / Trip); Phase 2; API semantics changes; Summary detail expansion; modifications to the current HF-05/HF-07 implementation or existing evidence.

## 21. Approval gate

`PLAN → REVIEW → EXPLICIT APPROVAL → BUILD → VERIFY → HUMAN ACCEPTANCE`.

**This document authorizes planning only. It does not authorize implementation.**

---

*Created via OpenCode session on 2026-10-04. Planning/documentation only. No source, schema, database, CRM, configuration, permission, route, or integration change; no build; no commit; no push.*
