# FeelJapanK Phase 1 — Remaining Findings: Next Governance Recommendation — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Remaining-Findings-Next-Governance-Recommendation-v0.1 |
| Document status | READ-ONLY RECOMMENDATION (no plan started, no implementation authorized) |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Basis | `…Human-Acceptance-Finding-Assessment-v0.1.md` (HF classification); FROZEN roadmap/decisions |

> This is a recommendation only. It does **not** invent requirements, prescribe schema/fields/APIs, or modify the frozen architecture/roadmap. Any implementation must pass `PLAN → REVIEW → APPROVAL → BUILD`, with native-CRM work under **FK-D12**.

---

## 1. Remaining findings (from the assessment)

**Phase 1 gaps requiring separate planning**
- **HF-05** — transportation coverage completeness
- **HF-07** — accommodation coverage clarity
- **HF-11** — actionable Information Status → confirmation → context-preserving CRM handoff

**Needs further evidence before design/implementation**
- **HF-02** — passenger ages
- **HF-06** — transport capacity/quantity
- **HF-08** — accommodation rooming
- **HF-09** — meals day-by-day / "not provided" semantics

**Later phase**
- **HF-10** — itinerary-level day-by-day view

## 2. Recommended planning order

1. **First — HF-05 + HF-07 together** (one planning exercise: Information-Gathering coverage & completeness across Transportation and Accommodation, using the existing requirement-line model).
2. **Second — HF-11** (actionable Information Status → CRM handoff), as a **separate** planning exercise.

## 3. Can HF-05 and HF-07 share one planning exercise?

**Recommended: yes — one exercise.** Both are the same class of problem (coverage completeness/clarity for a domain using the existing `FJK Deal Requirement Line` model with `NOT APPLICABLE` already available). They share the core operational question of "missing vs not-required vs not-captured," so planning them together avoids divergent conventions.

**HF-11 must remain separate:** it is a cross-system workflow/native-CRM-integration concern (workspace proposes → CRM edits), in the same family as the deferred **DG-7** return/focus hook, and is subject to **FK-D12**. It depends on a stable Information-Status model, so it should follow the coverage planning.

## 4. Evidence / operational questions before each plan

**HF-05 (transport coverage)** — planning considerations to answer first:
- What defines "complete" transport coverage for Stage 1: per-leg, per-day, or a full movement plan?
- Is coverage completeness a *gate* or operator-adjudicated advisory (Info Complete is already operator-controlled)?
- How to distinguish intentionally-not-required from missing/not-yet-confirmed (leverage the existing `NOT APPLICABLE` status vs a gap)?
- Does the existing requirement-line model suffice, or is a coverage *view* (presentation) needed? (No new fields assumed.)

**HF-07 (accommodation coverage)** — planning considerations:
- Same "missing vs not-required vs not-captured" convention as HF-05.
- Per-night coverage expectation; rooming per night vs per stay.
- Confirm whether `NOT APPLICABLE` is the agreed convention for "not required".

**HF-11 (actionable Information Status → CRM handoff)** — planning considerations:
- Confirm the boundary: workspace proposes only; **CRM remains the editing surface** (no second editor in the workspace).
- Which native CRM editing context should be targeted, and whether a context-preserving deep-link is feasible in native CRM (FK-D12).
- Confirmation-prompt semantics (single item vs batch).
- Align with the **deferred DG-7** hook so both use one native-CRM integration design.

## 5. Clarification needed before the coverage plan (HF-02/06/08/09)

- **HF-06 (transport capacity/quantity)** — clarify **before** the HF-05 coverage plan (transport structure: passenger qty vs vehicle type/capacity/count).
- **HF-08 (rooming detail + hotel identity)** — clarify **before** the HF-07 coverage plan (rooming composition and whether it must be structured).
- **HF-09 (meals day-by-day / "not provided")** — clarify as part of defining completeness (day coverage and explicit "not provided" semantics).
- **HF-02 (passenger ages)** — clarify when relevant to completeness/quotation inputs; lower coupling to HF-05/07.

## 6. Dependencies

- **HF-05 ↔ HF-06**, **HF-07 ↔ HF-08** (coverage clarity depends on the capacity/rooming questions).
- **HF-11 depends on** the Information-Status model being well-defined (benefits from HF-05/07/09 clarity) and shares native-CRM integration with **DG-7**.
- HF-05 and HF-07 must share a single "missing vs not-required vs not-captured" convention.

## 7. HF-10

**Confirmed out of Phase 1.** HF-10 (itinerary-level day-by-day view) is a later-phase capability (Stage 3 Customer Quotation / Itinerary Generation; Trip in Phase 2). Do not pull it into Phase 1.

## 8. No authorization

This document recommends a sequence only. It does not authorize any PLAN content, schema, field, API, or implementation. The next authorized artifact would be a **coverage/completeness PLAN** (HF-05 + HF-07) after the clarifications above, subject to owner approval.

---

*Created via OpenCode session on 2026-10-04. Read-only recommendation. No source, bundle, database, CRM, configuration, schema, permission, route, or integration change; no commit; no push.*
