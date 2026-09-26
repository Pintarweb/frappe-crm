# FeelJapanK — Phase 1 Information Gathering Checklist

**Project:** FeelJapanK
**Subject:** Operator information-gathering checklist for Phase 1 enquiries
**Version:** v0.1
**Status:** PILOT TOOL — **NOT FROZEN**
**Companion SOP:** `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.2.md`
**Nature:** Human-use checklist. It is **not** a mandatory form and authorizes no implementation.

---

## Purpose

A practical checklist an operator uses while handling a real enquiry. It complements the Deal `Request Summary` (see SOP v0.2 §6) and does not replace original evidence.

## Status semantics

Use one of: **KNOWN · MISSING · TO CONFIRM · CUSTOMER-CONFIRMED (facts) · NOT APPLICABLE**

An item may be left blank or marked NOT APPLICABLE. Never mark an item KNOWN unless the customer actually supplied it.

---

## Quick Decision — Can this be a Deal?

> **Particularity, not completeness, starts the Deal.**

□ Contact/Organization identifiable
□ Commercial intent exists
□ One or more identifiable elements of a particular Japan trip/service exist (e.g., destination, timeframe/date, group/party, named service, duration, or another clearly identifiable element) — **no single signal is mandatory**
□ Original evidence retained

- **YES** → create or continue the appropriate Deal (it may remain incomplete).
- **NO** — general interest, inspiration-seeking, or insufficiently particular → **no Deal**; clarify before creating a Deal. Retain the communication; use a native Task, or the optional Lead mechanism (FK-D09) where appropriate.
- **AMBIGUOUS** → ask the customer or relevant person. **Never guess.**

*These are example signals, not a mandatory checklist.*

---

## Classify the Request

Decide (operator judgement) and mark one:

- □ New enquiry
- □ Existing Deal — continuation
- □ Existing Deal — amendment/change (record in CHANGES)
- □ Genuinely distinct new request → create a new Deal
- □ Existing request withdrawn / cancelled before invoice → keep the Deal; record using the native Deal outcome/status (see SOP §18)
- □ Existing request postponed → keep the Deal; do **not** mark cancelled
- □ Customer-confirmed facts obtained (this is **not** commercial confirmation)
- □ Commercial confirmation received (separate event, FK-D14)

If unclear → ask; never guess.

---

## ⚠️ Multiple-Deal Safety

> **Do not assign communication to a Deal based only on phone number, email address, or familiarity with the customer.**

When a customer has multiple active Deals:
- identify the actual request;
- match by explicit content/context;
- if unclear, **ask**;
- do not silently attach information to the wrong Deal — especially for WhatsApp.

---

## 8.1 Customer / Identity
| Item | Status | Note |
|---|---|---|
| Contact identified | | |
| Organization identified | | |
| Correct person/customer context confirmed | | |
| Source/channel recorded | | |
| Original communication preserved | | |

## 8.2 Trip Request Basics
| Item | Status | Note |
|---|---|---|
| Destination / route | | |
| Approximate timeframe | | |
| Exact travel dates | | |
| Number of travellers | | |
| Adults | | |
| Children | | |
| Infants | | |
| Purpose of trip | | |
| Special status / VIP / accessibility / relevant context | | |

## 8.3 Travel / Service Requirements
| Item | Status | Note |
|---|---|---|
| Accommodation | | |
| Transport | | |
| Guide | | |
| Meals | | |
| Attractions / tickets | | |
| Equipment / rentals | | |
| Baggage | | |
| Special requests | | |
| Accessibility requirements | | |
| Other named services | | |

*Not every category applies to every enquiry — use NOT APPLICABLE freely.*

## 8.4 Commercial Intent
| Item | Status | Note |
|---|---|---|
| What does the customer want us to arrange? | | |
| Does the customer want a quotation? | | |
| New request, an amendment to an existing request, or a genuinely distinct new request? | | |
| Existing request withdrawn or postponed? | | |
| Known budget or commercial constraint? | | |
| Stated priorities / trade-offs? | | |

## 8.5 Missing Information
| Missing item | Why it matters | Who provides it |
|---|---|---|
| | | |

## 8.6 To Confirm
| Question | Date asked | Channel | Response / status |
|---|---|---|---|
| | | | |

## 8.7 Customer-Confirmed Facts (≠ commercial confirmation)

Facts the customer has confirmed (dates, pax, destination, preferences):
| Fact confirmed | Date | Channel | Evidence reference |
|---|---|---|---|
| | | | |

- These are **facts**, not commercial confirmation. They do **not** mean the Deal is commercially confirmed and do **not** initiate a Trip.
- **Commercial confirmation** — the customer's written confirmation of the commercial proposal — is a separate event governed by FK-D14/FK-D15; written confirmation may be sufficient evidence and is manually marked. The Trip is initiated only when the customer **invoice is created** (FK-D15).

## 8.8 Evidence
Reminder — preserve originals (attach to the correct Deal; do not substitute a summary):
□ Original message  □ Attachments □ Screenshots □ PDFs □ Spreadsheets □ Images □ Audio/video (where relevant) □ Later written confirmation

Attachments are opened, read and interpreted **manually** by the operator (no AI extraction, transcription, classification, summarization, or automatic routing).

## 8.9 Next Action
| Next action | Owner | Due date | Waiting on |
|---|---|---|---|
| | | | customer / internal / supplier |

*(Supplier coordination here is only a note — not a supplier-management workflow.)*

---

## Pilot Feedback

Capture observations after each pilot enquiry; these are **pilot evidence**, not automatic customization:
- What information was repeatedly difficult to record?
- What information was repeatedly re-entered?
- What information was repeatedly unavailable in native CRM?
- Were there cases where the correct Deal could not be identified?
- Were attachments difficult to preserve correctly?
- Were there repeated cases where structured fields would have saved significant work?
- Did the `Request Summary` remain usable?

---

## Customization Gate (evidence thresholds — not assumptions)

Consider change **only if the pilot repeatedly demonstrates**:
1. Inability to identify/reuse the correct Deal because of missing **structured request identity**.
2. Repeated re-keying of destination/dates/pax to answer routine questions.
3. Repeated evidence landing on the **wrong simultaneous Deal** because explicit context cannot be recorded.
4. A recurring need to **filter/list Deals by structured request attributes** that native CRM cannot support.

No custom field or DocType is created merely because it appears theoretically useful.

---

## Pilot Scope

- 15–25 real enquiries; ~4–6 weeks; **no customization**.
- Mix: complete requests; incomplete requests; new customers; existing customers; ambiguous requests; email; WhatsApp; attachment-heavy enquiries; multiple simultaneous Deals.
- Objective: test the workflow, not to prove the structure permanently correct.

---

## Governance

- This checklist is a **PILOT TOOL — NOT FROZEN**.
- It introduces no fields, DocTypes, automation, or integration.
- Do not silently reinterpret it; changes require a new reviewed version.

---

*Related authority: `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.2.md`; `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Opportunity-Start-Lead-Usage-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md`; `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`.*
