# FeelJapanK Phase 1 — Deal Information-Gathering Template v0.1

**Project:** FeelJapanK
**Subject:** Deal Information-Gathering Template (operator-facing, candidate)
**Version:** v0.1
**Status:** PILOT / **NOT FROZEN**
**Companion SOP:** `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.2.md`
**Companion checklist:** `docs/operations/FeelJapanK-Phase1-Information-Gathering-Checklist-v0.1.md`
**Nature:** Operator-facing pilot template used **inside a Deal's information-gathering workflow**. It is **not** a database schema and **not** a final quotation-readiness specification. It authorizes no implementation.

> This is an exploratory candidate information model. Field importance, conditionality, and any quotation-readiness gate are **to be derived later from scenario testing** — not asserted here.

---

## Header

| Field | Value |
|---|---|
| Deal | |
| Organization | |
| Contact(s) | |
| Request Summary | (link / note reference) |
| Updated | (date) |

---

## Status semantics

Use only these existing states (from the SOP/checklist):

- **KNOWN** — information supplied or established from the enquiry/evidence.
- **MISSING** — information not available.
- **TO CONFIRM** — a specific point requiring confirmation from the customer or another appropriate source.
- **CUSTOMER-CONFIRMED (facts)** — facts explicitly confirmed by the customer. This does **not** mean commercial confirmation, quotation acceptance, Trip initiation, payment, or supplier commitment.
- **NOT APPLICABLE** — the information genuinely does not apply to this Deal.

> **Blank = not yet assessed.** Do not invent another status for that state.

Each candidate item below may be left blank. Nothing here is mandatory unless an existing authority explicitly requires it.

---

## 1. Relationship & Context

| Item | Status | Notes |
|---|---|---|
| Contact(s) | | |
| Role (if known) | | |
| Organization | | |
| Channel / source | | |
| Explicit Deal context | | |
| Participants / decision-maker (if relevant) | | |

## 2. Request Identity

A Deal may begin with **incomplete** information; this is not a rigid Deal-start checklist. The FROZEN Opportunity-Start Rule remains authoritative for when a Deal begins.

| Item | Status | Notes |
|---|---|---|
| Nature of request | | |
| Trip purpose / type (e.g., corporate, FIT, family, incentive) | | |
| Destination / route | | |
| Timeframe | | |
| Exact dates | | |
| Duration | | |

## 3. Party

| Item | Status | Notes |
|---|---|---|
| Total pax | | |
| Adults | | |
| Children | | |
| Infants | | |
| Other participant details | | |
| Relevant gender | | |

## 4. Accommodation

Do not assume accommodation applies to every Deal.

| Item | Status | Notes |
|---|---|---|
| Accommodation required? | | |
| Preferred category | | |
| Room requirements | | |
| Location / preferences | | |
| Other stated needs | | |

## 5. Transportation

Do not assume every transportation item applies.

| Item | Status | Notes |
|---|---|---|
| Flights / arrival–departure (if relevant) | | |
| Local transportation | | |
| Private / shared transport | | |
| Rail / other transport | | |
| Other stated transport needs | | |

## 6. Activities / Services

| Item | Status | Notes |
|---|---|---|
| Attractions | | |
| Activities | | |
| Guide | | |
| Meals | | |
| Tickets | | |
| Equipment / rentals | | |
| Other requested components | | |

## 7. Special Requirements

| Item | Status | Notes |
|---|---|---|
| Accessibility | | |
| Dietary requirements | | |
| VIP requirements | | |
| Baggage | | |
| Mobility | | |
| Other special circumstances | | |

## 8. Commercial Context

Do **not** label budget as required. Do **not** create a quotation-readiness rule here.

| Item | Status | Notes |
|---|---|---|
| Budget (if stated) | | |
| Quotation intent | | |
| Customer expectations | | |
| Constraints | | |
| Deadlines | | |
| Approval context (if known) | | |

## 9. Evidence

Preserve and reference evidence; **do not** process it automatically. Phase 1 evidence handling remains **manual** (FK-D11). No AI extraction, transcription, classification, summarization, automatic routing, or automatic creation.

| Evidence | Present? | Reference / location |
|---|---|---|
| Original enquiry | | |
| Attachments | | |
| Itinerary | | |
| Images | | |
| PDFs | | |
| Spreadsheets | | |
| Audio / video | | |
| Later written confirmations | | |

## 10. Information State & Action

### Missing

| Missing item | Why it matters | Who provides it |
|---|---|---|
| | | |

### To Confirm

| Question | Date asked | Channel | Response / status |
|---|---|---|---|
| | | | |

### Changes (dated, latest first)

| Date | Before → After | Evidence |
|---|---|---|
| | | |

### Next Action

| Action | Owner | Due date |
|---|---|---|
| | | |

---

## Quotation Readiness — To Be Derived

This section is **provisional**. It is deliberately left empty.

- **No readiness gate is frozen.**
- **No field is declared quotation-blocking** by this template.
- Field importance will be established through **scenario testing**.
- Required / optional / conditional distinctions will be **derived later**.
- The eventual gate must be based on **actual business scenarios**, not assumption.

Quotation readiness is **not** the same as, and must not be conflated with:

- customer written confirmation (FK-D14);
- payment;
- supplier commitment;
- Trip initiation (FK-D15).

No score, percentage, or readiness checklist is defined here.

---

## Operator Usage Guidance (progressive)

```
Particular enquiry identified
→ Deal created
→ Record what is KNOWN
→ Identify MISSING information
→ Ask / clarify (mark TO CONFIRM)
→ Record customer response (CUSTOMER-CONFIRMED (facts) where applicable)
→ Attach / reference EVIDENCE
→ Record CHANGES (dated before → after)
→ Set NEXT ACTION
→ Continue until sufficient information exists for the eventual quotation process
```

> **Incomplete information does not invalidate the Deal.** The Deal is the working commercial context during pre-invoice information gathering.

---

## Example (illustrative only)

**Initial**

- KNOWN: Japan; 8 pax; December; corporate trip
- MISSING: destination; exact dates; duration; accommodation; transportation
- NEXT ACTION: obtain preferred destination and dates

**Later**

- KNOWN: Tokyo + Osaka; 5 days; 8 pax; 12–16 December; corporate incentive trip
- TO CONFIRM: hotel category; transportation preference

This example is illustrative only and does **not** establish mandatory quotation requirements.

---

## Governance

- **PILOT / NOT FROZEN.**
- Candidate information model only.
- No new DocType; no new Frappe fields; no schema change; no automation.
- No quotation-readiness gate is frozen.
- **Scenario testing is the next validation activity.**
- Changes require a new reviewed version; do not silently reinterpret this template during implementation.

---

*Related authority: `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.2.md`; `docs/operations/FeelJapanK-Phase1-Information-Gathering-Checklist-v0.1.md`; `docs/architecture/FeelJapanK-Opportunity-Start-Lead-Usage-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`; `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`.*
