# FeelJapanK Phase 1 — HF-05 + HF-07 Information-Gathering Coverage & Completeness Plan — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-05-HF-07-Coverage-Completeness-Plan-v0.1 |
| STATUS | **PLAN — READ-ONLY / NOT APPROVED / NOT IMPLEMENTED** |
| Scope | Information-Gathering coverage & completeness for Transportation (HF-05) and Accommodation (HF-07), with prerequisite assessments for HF-06 / HF-08 / HF-09 |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Nature | Planning/evidence exercise. **Does not authorize implementation.** |

> This document authorizes planning only. It does not authorize implementation, schema change, or BUILD.

---

## 1. Status

`PLAN — READ-ONLY / NOT APPROVED / NOT IMPLEMENTED`

## 2. Scope

Coverage and completeness of Information Gathering for **Transportation (HF-05)** and **Accommodation (HF-07)**, using the existing Deal requirement model, with prerequisite assessments for **HF-06** (transport capacity/quantity), **HF-08** (accommodation rooming/hotel identity), and **HF-09** (meals day-by-day / provided vs not provided). No schema/API/frontend change is authorized as work by this plan.

## 3. Evidence reviewed (source-confirmed)

- Frozen roadmap `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` (Deal = pre-invoice commercial state; Deal ≠ Trip; native-first / FK-D12 customization gate).
- `FJK Deal Requirement Line` DocType JSON — fields: `domain` (Select: Accommodation / Transportation / Meals / Flights / Special Requirements / Other), `item` (Data), `detail` (Small Text), `date_from` (Date), `date_to` (Date), `pax_or_qty` (Int), `location` (Data), `status` (Select), `notes` (Small Text); `istable=1`.
- `FJK Deal Component` (component / requested / status / notes); `FJK Deal Activity Item` (item / quantity / date_time / pax_or_coverage / status / notes); `FJK Deal Guide Requirement` (languages / date_from / date_to / duration / location / pax / coverage_scope / other / status).
- `d1.py:6` statuses `{KNOWN, MISSING, TO CONFIRM, CUSTOMER-CONFIRMED, NOT APPLICABLE}`; `d1.py:7` reserved domains (Tour Guide / Activities & Tickets use dedicated tables).
- `api.py` `get_readiness` (`:243-253`): `missing = status MISSING`, `to_confirm = status TO CONFIRM` (NOT APPLICABLE excluded); `get_deal_summary` (`:320-369`): returns requirement lines with dates/location/status and shared fields; `outstanding` collects only MISSING / TO CONFIRM across components / requirements / guides / activities.
- `App.vue` Full Details grouped presentation and Information Status.
- `docs/operations/FeelJapanK-Phase1-Deal-Information-Gathering-Template-v0.2.md` (Accommodation §5, Transportation §6, Meals §9; NOT APPLICABLE conventions at `:26,:73,:85,:198,:316,:324`); `…Manual-Enquiry-Deal-SOP-v0.2.md:155`.
- Presentation Refinement closure/recommendation docs; human acceptance findings HF-05 / HF-07.

## 4. HF-05 finding

The operator could not determine whether transportation for the **whole trip** (7 day / 6 night, Tokyo → Hakone → Osaka) had been captured; only some dated legs were visible (e.g., Day 1 Narita → hotel, Day 2 Tokyo → Hakone). This is a **coverage/completeness** problem, not proof of schema absence.

## 5. HF-07 finding

Tokyo and Osaka accommodation were visible; Hakone accommodation was not represented. The operator could not distinguish **missing vs not-required vs not-captured**. Same class of problem as HF-05.

## 6. HF-06 prerequisite assessment (transport capacity/quantity)

- **Quantity:** `pax_or_qty` (Int) exists.
- **Vehicle class / capacity:** NOT structured — only free text (`detail` / `notes`). The template (`:130`, `:317`) expects "vehicle class / capacity".
- **Facts:** quantity supported; capacity/vehicle free-text-only. No schema conclusion is drawn. Whether structured capacity is *required* is unproven → **NEEDS EVIDENCE**.

## 7. HF-08 prerequisite assessment (accommodation hotel/rooming)

- **Location / stay + dates:** supported (`location`, `date_from` / `date_to`).
- **Hotel identity:** expressible via `item` / `detail` (free text).
- **Rooming composition:** free text only (`detail`); `pax_or_qty` exists. Template §5 (`:104-115`) expects room configuration / quantity.
- **Facts:** location/dates supported; hotel and rooming are free-text-only. → **NEEDS EVIDENCE** (structured rooming not proven required).

## 8. HF-09 prerequisite assessment (meals)

- Meals are requirement lines (`domain=Meals`) with dates + status.
- **"Not provided" is not a first-class state**; it would be conflated with MISSING/unknown. Provided / unknown / to-confirm are representable via `KNOWN` / `MISSING` / `TO CONFIRM`; "not provided" is a distinct semantic.
- **Facts:** day-by-day representable via dated lines; "not provided" semantics absent. → **NEEDS EVIDENCE** (remains separately planned).

## 9. Current-model capability matrix

| Need | Supported today? | Mechanism |
|---|---|---|
| Multiple dated transport legs | **Yes** | requirement lines (`domain=Transportation`, `date_from/to`, `location`, `item`, `detail`) |
| Multiple accommodation stays | **Yes** | requirement lines (`domain=Accommodation`, `location`, `date_from/to`) |
| Day/night coverage representation | **Yes** (per line) | `date_from` / `date_to`; trip window in `fjk_exact_dates` / `fjk_duration` |
| "Not required" marker | **Yes** | `NOT APPLICABLE` (excluded from outstanding; `get_readiness` `:251-252`) |
| "Missing" vs "to confirm" | **Yes** | `MISSING` / `TO CONFIRM` |
| Trip route text | **Partial** | `fjk_destination_route` (free text) |
| Vehicle class / capacity (structured) | **No** | free text only |
| Rooming composition (structured) | **No** | free text only |
| Meal "not provided" (first-class) | **No** | not a status |
| Coverage *view* across all days/nights | **No (not built)** | no coverage assessment exists |

## 10. Coverage / completeness convention (proposed, no schema change)

Using existing states only:

- **KNOWN** — captured/confirmed requirement for that leg/night.
- **TO CONFIRM** — requirement identified, awaiting customer/supplier confirmation.
- **MISSING** — required but not yet captured.
- **NOT APPLICABLE** — the domain/leg/night genuinely does not apply (e.g., no Hakone stay if not required).
- **Coverage rule:** every **relevant transport leg/day** and **every relevant stay/night** for the trip should have a requirement line; gaps are signalled by MISSING / TO CONFIRM, and intentional absence by NOT APPLICABLE.

This convention resolves the HF-05 / HF-07 ambiguity ("missing vs not-required vs not-captured") using the existing states — distinguishing **required-but-not-captured** (MISSING / TO CONFIRM) from **intentionally-not-required** (NOT APPLICABLE).

## 11. What can be solved without schema change

- **HF-05 + HF-07 themselves:** yes — via the convention above **plus an advisory Coverage & Completeness view** computed from data `get_deal_summary` already returns (`requirement_lines` with `date_from/to/location/status`, plus `shared.fjk_exact_dates`, `fjk_duration`, `fjk_destination_route`). This is **presentation/logic only** (the frontend can compute it); no schema change, no CRM record change.
- Caveat: automatic day/night gap detection depends on the operator entering dated lines and on the free-text route; the view is **advisory**, consistent with Info Complete remaining operator-adjudicated.

## 12. What would require separate FK-D12 review

Only if evidence proves the free-text approach insufficient: structured **vehicle class/capacity** (HF-06), structured **rooming** (HF-08), a first-class **meal "not provided"** semantic (HF-09), or a structured route/itinerary (HF-10). **None is planned here; no schema change is justified at this stage.**

## 13. Proposed bounded implementation increment (candidate direction only)

A single **presentation-only** increment: an advisory "Coverage & Completeness" surface in the workspace (Summary / Full Details) that, per domain, lists dated lines and highlights days/nights of the trip window with no relevant line, plus a short completeness note. It uses existing `get_deal_summary` data; no schema, no CRM records, no API semantics change. Any enhancement beyond presentation (e.g., new fields) is out of scope and requires FK-D12.

## 14. Explicit out-of-scope

- **HF-02** (passenger ages) — NEEDS EVIDENCE.
- **HF-06** (transport capacity) — NEEDS EVIDENCE; any structured field = FK-D12.
- **HF-08** (rooming/hotel identity) — NEEDS EVIDENCE; any structured field = FK-D12.
- **HF-09** (meals "not provided") — NEEDS EVIDENCE; separately planned.
- **HF-10** (itinerary-level view) — later phase / Stage 3 / Phase 2.
- **HF-11** (actionable Information Status → CRM handoff) — separate planning exercise.
- No Deal/Trip collapse; no duplicate CRM entities; no frozen roadmap / architecture change.

## 15. Verification strategy

Authenticated browser verification on controlled Deals (notably `CRM-DEAL-2026-00011` rich, `00015` incomplete, `00017` complete, `00010` protected baseline) to confirm the coverage view reflects existing data and does not alter DG-1 / DG-3 / DG-4 / DG-5 / DG-6 / DG-7, numeric formatting, or status semantics; backend harness `n1_verify.py` unchanged; no raw or incorrect coverage claims.

## 16. Human acceptance strategy

Operator re-check of HF-05 / HF-07 coverage clarity on `CRM-DEAL-2026-00011` (Tokyo → Hakone → Osaka): can the operator now tell whether transport and accommodation coverage is complete and distinguish missing vs not-required? Recorded separately; agent/technical verification does not substitute for human acceptance.

## 17. Approval gate

`PLAN → REVIEW → EXPLICIT APPROVAL → BUILD → VERIFY → HUMAN ACCEPTANCE`.

**This document authorizes planning only. It does not authorize implementation.**

## 18. A–L summary

- **A.** Gap = unverifiable coverage/completeness across the full trip, not schema absence.
- **B.** The existing requirement-line model already supports dated per-domain lines plus `NOT APPLICABLE`.
- **C.** The coverage **view** is a presentation concern.
- **D.** Coverage **capture** is a workflow/convention concern.
- **E.** Schema change is needed only if HF-06 / HF-08 / HF-09 evidence proves free text insufficient (FK-D12).
- **F.** Yes — existing lines + the five states suffice for HF-05 / HF-07.
- **G.** Proposed convention in §10 (distinguishes captured / to-confirm / missing / not-applicable).
- **H.** Transportation coverage assessed per dated line (dates, location, item, status); quantity via `pax_or_qty`; capacity not structured.
- **I.** Accommodation coverage assessed per stay (location, dates/nights, hotel via item/detail, rooming free text, status).
- **J.** Meals (HF-09) remains separately planned, but the completeness convention should be designed to extend to Meals.
- **K.** Dependencies: HF-05 ↔ HF-06, HF-07 ↔ HF-08; HF-09 shares the completeness convention later; HF-11 depends on a stable Information-Status model.
- **L.** Smallest safe increment = presentation-only advisory Coverage & Completeness view + documented operator convention.

---

*Created via OpenCode session on 2026-10-04. Planning/documentation only. No source, schema, database, CRM, configuration, permission, route, or integration change; no build; no commit; no push.*
