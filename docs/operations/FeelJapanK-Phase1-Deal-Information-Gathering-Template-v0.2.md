# FeelJapanK Phase 1 — Deal Information-Gathering Template v0.2

**Project:** FeelJapanK
**Subject:** Deal Information-Gathering Template (operator-facing, modular request-component model)
**Version:** v0.2
**Status:** PILOT / **NOT FROZEN**
**Supersedes for the pilot:** `docs/operations/FeelJapanK-Phase1-Deal-Information-Gathering-Template-v0.1.md` (preserved as the prior pilot baseline).
**Companion SOP:** `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.2.md`
**Companion checklist:** `docs/operations/FeelJapanK-Phase1-Information-Gathering-Checklist-v0.1.md`
**Nature:** Operator-facing pilot template and working convention used **inside a Deal's information-gathering workflow**. It is **not** a database schema and **not** a quotation-readiness specification. It authorizes no implementation.

> **Model:** `Deal → Shared Trip Context → Requested Scope / Components → Component-specific Information → Evidence / Changes / Next Action → Manual Ready-for-Quotation decision`.
>
> **Critical distinction:** **SELECTED ≠ COMPLETE ≠ READY FOR QUOTATION.** Selecting a component means only that the customer requested that scope. It does **not** mean the component is complete, supplier-ready, or customer-quotation-ready.

---

## Status semantics

Use only these existing states:

- **KNOWN** — information supplied or established from the enquiry/evidence.
- **MISSING** — information not available.
- **TO CONFIRM** — a specific point requiring confirmation from the customer or another appropriate source.
- **CUSTOMER-CONFIRMED (facts)** — facts explicitly confirmed by the customer. This does **not** mean commercial confirmation, quotation acceptance, Trip initiation, payment, or supplier commitment.
- **NOT APPLICABLE** — the information genuinely does not apply to this Deal/component.

> **Blank = not yet assessed.** Do not invent new status values. Nothing here is mandatory unless an existing authority explicitly requires it.

---

## 1. Deal / Request Context

The Deal may be **incomplete** when first created. "Particularity, not completeness, starts the Deal."

| Item | Value / Status |
|---|---|
| Deal | |
| Customer / Contact(s) | |
| Organization (where relevant) | |
| Request type / nature of request | |
| Commercial intent | |
| Request summary (link to Request Summary note) | |
| Updated | (date) |

---

## 2. Shared Trip Context

Shared context that can support **any** requested component. Not every field is universally mandatory; gather enough to understand the selected request.

| Item | Status | Notes |
|---|---|---|
| Destination / route | | |
| Timeframe | | |
| Exact dates | | |
| Duration | | |
| Total pax | | |
| Pax breakdown (where relevant) | | |
| Trip purpose / type | | |
| Other shared context | | |

**Examples of minimum shared context by request:**
- Transport-only → destination + dates/timeframe + pax + transport details
- Accommodation-only → destination + dates/timeframe + pax + accommodation details
- Guide-only → destination + dates/timeframe + pax + guide details
- Full package → typically much more

---

## 3. Requested Scope / Components

Mark each component as **requested** (selected) or **NOT APPLICABLE** (not requested).

- [ ] Trip / Destination Scope  *(scope/context anchor — not a purchasable service)*
- [ ] Accommodation
- [ ] Transportation
- [ ] Tour Guide
- [ ] Activities / Tickets
- [ ] Meals
- [ ] Flights
- [ ] Special Requirements
- [ ] Other

> A selected component means **requested**. An unselected component is **NOT APPLICABLE**.
> **Do not** introduce supplier quotation line-item semantics here.

---

## 4. Component Sections — how to use

Organise the template around selected components. Each component tracks:

- **Requested?** (scope)
- **Information status** (using the existing vocabulary)
- **Known / Missing / To Confirm / Customer-Confirmed (facts)**
- **Evidence**
- **Next action**

Do not require every component to be completed.

---

## 5. Accommodation

| Item | Status | Notes |
|---|---|---|
| Destination / location | | |
| Dates / nights | | |
| Pax | | |
| Hotel category / preference | | |
| Room configuration | | |
| Quantity | | |
| Location preference | | |
| Special accommodation requirements | | |

*Not every field is universally blocking.*

---

## 6. Transportation

| Item | Status | Notes |
|---|---|---|
| Transport mode | | |
| Destination / location | | |
| Dates | | |
| Duration | | |
| Pax | | |
| Vehicle class / capacity | | |
| Pickup | | |
| Drop-off | | |
| Daily operating hours (where relevant) | | |
| Route | | |
| Other transport requirements | | |

*Different transport modes may require different details. **Flights remain conditional**, not universally required (see §10).*

---

## 7. Tour Guide

Support **multiple guide entries** (a demonstrated representation gap in v0.1).

For each guide entry:

| Item | Status | Notes |
|---|---|---|
| Language(s) | | |
| Dates | | |
| Duration | | |
| Location | | |
| Pax | | |
| Coverage / activity scope | | |
| Other requirements | | |

- Languages may include English, Malay, Indonesian, Japanese, combinations.
- Must be able to represent: one English-speaking guide; one Malay-speaking guide; one bilingual guide; **two guides with different languages**; multiple guides across dates/locations.
- If it is unclear whether a bilingual guide or two separate guides are wanted → **TO CONFIRM**.
- Do not invent a supplier structure.

---

## 8. Activities / Tickets

Retain **Activities / Tickets as one component** for now. Provide an **itemized** structure (candidate improvement identified through scenario testing).

| Item | Quantity | Date/time | Pax / coverage | Status | Notes |
|---|---|---|---|---|---|
| | | | | | |

Examples: attraction/ticket, activity, service/component. *Do not split Activities and Tickets into separate components yet.*

---

## 9. Meals

Available as a component; not over-specified.

| Item | Status | Notes |
|---|---|---|
| Meal requested? | | |
| Date / time | | |
| Quantity / pax | | |
| Meal type | | |
| Dietary requirements | | |
| Location | | |
| Other requirements | | |

*No new policy deciding whether Meals must always be separate from Activities.*

---

## 10. Flights

Available as a component. Flights may be:
- **selected** when requested; or
- **NOT APPLICABLE** when not part of the request.

**Do not** make flights universally required for a Deal.

| Item | Status | Notes |
|---|---|---|
| Origin / destination | | |
| Dates / times | | |
| Pax | | |
| Airline / class preference | | |
| Other flight requirements | | |

---

## 11. Special Requirements

Cross-cutting component; conditional relevance. Do not force onto every Deal.

| Item | Status | Notes |
|---|---|---|
| Accessibility / mobility | | |
| Dietary | | |
| VIP | | |
| Other customer-specific requirements | | |

---

## 12. Other

Lightweight free component for requirements that do not fit the predefined components.

| Item | Status | Notes |
|---|---|---|
| | | |

---

## 13. Evidence

Phase 1 evidence handling is **manual**. Evidence may include WhatsApp messages, email, PDFs, spreadsheets, images, documents, audio, video. The **operator manually interprets** evidence and records the relevant facts.

**No** AI extraction. **No** automatic transcription. **No** automatic classification. **No** automatic routing. **No** automatic creation.

| Evidence | Present? | Reference / location |
|---|---|---|
| Original enquiry | | |
| Attachments | | |
| Itinerary | | |
| Images / PDFs / spreadsheets | | |
| Audio / video | | |
| Later written confirmations | | |

---

## 14. Changes

When requirements change **within the same Deal**: record previous state, record new state, identify whether customer-confirmed, preserve evidence, record next action. Do **not** create a new Deal merely because a requirement changed. A genuinely distinct request becomes a **new Deal**.

| Date | Component | Before → After | Customer-confirmed? | Evidence |
|---|---|---|---|---|
| | | | | |

---

## 15. Information Status

The operator should be able to answer:

1. What did the customer request?
2. What do we know?
3. What don't we know?
4. What needs clarification?
5. What has the customer confirmed?
6. What changed?
7. What evidence supports it?
8. What is the next action?
9. What unresolved information remains relevant to quotation?

Each answer uses only **KNOWN / MISSING / TO CONFIRM / CUSTOMER-CONFIRMED (facts) / NOT APPLICABLE**.

### Next Action

| Action | Owner | Due date |
|---|---|---|
| | | |

---

## 16. Ready for Quotation

**Ready for Quotation: YES / NO** — a **MANUAL Deal-level PILOT MARKER**.

It is **NOT**: an automatic rule, a score, a formula, a system gate, or a frozen quotation-readiness algorithm.

- Do **not** define universal mandatory fields.
- Do **not** say that one missing field always blocks quotation.
- Do **not** create a readiness score.

### Quotation Readiness — To Be Derived

This remains **unresolved and deferred**. Further pilot evidence is required before a formal readiness model is defined. Note the distinction between:
1. Rough customer estimate;
2. Supplier quotation request;
3. Detailed customer quotation.

The same missing information may not have the same effect at each stage.

> **Reconciliation note (2026-09, see `docs/architecture/FeelJapanK-Phase1-Business-Requirements-Capability-Architecture-Reconciliation-v0.1.md`).** Genuine human UI evidence now exists (UI-08), so the readiness model is reclassified from *deferred* to **OPEN** (`RC-R11` / `RC-Q08`). The readiness model is a business capability to be defined, not a capability that native CRM absence removes. Original wording retained for history.

---

## 17. Conceptual Examples (illustrative only)

### Transport-only
> "We only need a private coach in Tokyo for 30 people for 3 days."

- **Deal exists.** Requested component: **Transportation**.
- Shared context: Tokyo; 30 pax; 3 days. Exact dates may still be **MISSING / TO CONFIRM**.
- Unrequested components: Accommodation, Tour Guide, Activities/Tickets, Meals, Flights → **NOT APPLICABLE**.
- Transportation details: vehicle capacity; pickup/drop-off; operating hours; exact dates; other relevant transport details.
- **Key point:** even a transport-only request needs the relevant trip context to understand and quote the transport request.

### Accommodation-only
> "Need 10 twin rooms in Tokyo for 20 pax, 3 nights."

- Requested component: **Accommodation**. Shared context: Tokyo; 20 pax; 3 nights. Hotel category/exact dates → **MISSING / TO CONFIRM**.
- Transport, Guide, Activities, Flights → **NOT APPLICABLE**.

### Tour-guide language
> "Need an English-speaking guide in Tokyo for 3 days." / "Need a Malay-speaking guide." / "English + Malay." / "Two guides: English and Japanese."

- Requested component: **Tour Guide**; each case is a guide entry (single, bilingual **TO CONFIRM**, or multiple guides). Shared context: Tokyo; 3 days; pax.

These examples are illustrative only and do **not** establish mandatory quotation requirements.

---

## Operator Usage Guidance (progressive)

```
Particular enquiry identified
→ Deal created
→ Record Deal / Request Context
→ Record Shared Trip Context
→ Mark Requested Scope / Components
→ For each selected component, record KNOWN / MISSING / TO CONFIRM
→ Attach / reference EVIDENCE (manual interpretation)
→ Record CHANGES (dated before → after)
→ Set NEXT ACTION
→ Continue until the operator (manually) considers the Deal ready for quotation
```

> **Incomplete information does not invalidate the Deal.** The Deal is the working commercial context during pre-invoice information gathering.

---

## Governance

- **PILOT / NOT FROZEN.** Operator convention, not a schema.
- No new DocType, custom field, database table, migration, API, script, automation, AI workflow, quotation gate, or supplier integration.
- No quotation-readiness gate is frozen; it remains **To Be Derived** from pilot evidence.
- v0.1 remains the prior pilot baseline; this v0.2 supersedes it **for the pilot only**.
- Do not silently reinterpret this template during implementation; changes require a new reviewed version.

---

*Related authority: `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.2.md`; `docs/operations/FeelJapanK-Phase1-Information-Gathering-Checklist-v0.1.md`; `docs/architecture/FeelJapanK-Opportunity-Start-Lead-Usage-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`; `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`.*
