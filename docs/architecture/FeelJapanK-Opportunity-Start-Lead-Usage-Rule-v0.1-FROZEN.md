# FeelJapanK — Opportunity Start & Lead Usage Rule

**Project:** FeelJapanK
**Subject:** Opportunity Start & Lead Usage Rule
**Version:** v0.1
**Status:** FROZEN — approved business/architecture guidance
**Authority:** Business/architecture rule only. **Implementation is NOT authorized by this document.**

---

## 1. Purpose

Define when an inbound enquiry becomes a CRM **Deal**, and the limited role of **Lead**. This rule governs opportunity creation; it does not govern communication routing (see §6).

---

## 2. Genuine Commercial Enquiry

A CRM Deal **should be created when all three conditions hold**:

1. An **identifiable counterparty** exists.
2. There is **commercial intent** to obtain Japan travel services/arrangements from FeelJapanK.
3. There is a **discernible particular Japan trip or service request**.

The request does **not** need to be complete. A particular request can be established by **one or more** concrete elements, such as:

- destination;
- timeframe;
- group/party;
- named service/component;
- or another clearly identifiable element of the requested Japan arrangement.

This is **not** a rigid checklist. Do **not** require destination + dates + pax + itinerary + budget before creating a Deal.

---

## 3. Incomplete ≠ Not an Opportunity

> **Incomplete does not mean "not an opportunity."**

Example:

> "Need Japan December. Advise."

If the counterparty is identifiable and commercial intent is clear:

→ **create the Deal**
→ gather missing requirements on the Deal.

### Contrasting examples

> "Any good Japan packages?"

Not sufficiently particular to establish a commercial opportunity.

→ **no Deal yet**
→ human clarification / intake.

> "Morning Ahmad, how are things?"

No commercial intent.

→ **no Deal.**

---

## 4. Existing vs New Opportunity

A message **remains on the existing Deal** when it:

- references the existing opportunity/quotation;
- changes, clarifies, negotiates, revises, or follows up on that opportunity;
- concerns the **same underlying customer request/group/departure**.

A **new Deal** is appropriate when:

- a **different group/party/departure** is introduced;
- the customer explicitly describes an **additional/separate** request;
- a **genuinely distinct** commercial request is made.

Do **not** create a new Deal merely because requirements, destination, route, dates, pricing, or quotation details change **within the same underlying request**.

Where the same-group/different-group question is **genuinely unclear**, **human judgment is required**. Do **not** invent a rigid Trip identity rule; the business requirements leave some Trip-identity edge cases unresolved.

---

## 5. Lead Rule

- **Lead is an implementation-level CRM intake/acquisition mechanism.**
- **Lead is NOT a FeelJapanK business object.**
- **Lead is optional, not mandatory.**
- **Lead must NOT be the mandatory stage before Deal.**
- **Lead must NOT be used because an enquiry is incomplete.**
- **Known customer/contact + genuine commercial enquiry → Deal directly.**
- **Unidentified or insufficiently particular inbound may remain intake/Lead until clarified.**
- Once the genuine-commercial-enquiry threshold is met, **promote/create the Deal.**
- **Preserve relevant intake history** when a Lead is converted.

This document does not prescribe implementation mechanics for Lead conversion.

---

## 6. Relationship to Communication Context

This rule references and does **not** modify or reinterpret the FROZEN rule:

`docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`

> **Deal creation does not by itself determine communication routing. Once a Deal exists, communications must still follow the explicit-context rule.**

---

## 7. Case Table

| Case | Inbound (gist) | Decision |
|---|---|---|
| **A** | "quote Osaka for 12 pax, 5–9 October." | **Deal.** |
| **B** | New ABC Travel: "We have a group going to Tokyo in December. Can you arrange land services?" | **Deal** — even though incomplete. |
| **C** | Existing customer: "Any good Japan packages for December?" | **No Deal yet**; clarify. |
| **D** | Existing customer: "Can you quote Tokyo for our December corporate group?" (Osaka already open) | **New Deal.** |
| **E** | "Change the hotel from Shinjuku to Ueno on the Osaka quotation." | **Existing Deal**; not a new Deal. |
| **F** | "Morning Ahmad, how are things?" | **No Deal.** |
| **G** | Supplier-side coach availability request | **Not a new customer Deal**; belongs to the relevant opportunity/Trip if one exists. If source/context is unclear, human verification. |
| **H** | "Need Japan December. Advise." (identifiable counterparty) | **Deal**; incomplete requirements gathered afterwards. |
| **I** | "Any update on the Tokyo quotation?" | **Existing Deal**; no new Deal. |
| **J** | "We also have another group for Hokkaido in January. Quote." | **New Deal.** |

---

## 8. Architectural Boundaries

- **P01 remains canonical for identity.**
- **Contact identifies a person.**
- **CRM Organization identifies the company.**
- **Deal represents the CRM commercial opportunity/enquiry.**
- **Trip remains the enduring downstream operational/commercial unit.**
- **ERPNext remains the future financial authority.**
- **Lead is not a business object.**
- This document introduces **no direct P01 references** into Lead or Deal.

---

## 9. Non-Goals

This freeze does **NOT** decide:

- WhatsApp implementation/routing;
- WhatsApp triage UI;
- Contact↔Organization schema;
- Deal→Trip handoff contract;
- Trip identity implementation;
- ERPNext integration;
- P01 integration;
- automatic qualification;
- automatic Lead conversion;
- exact CRM UI workflow.

Those remain separate decisions.

---

## 10. Governance

- This rule is **FROZEN at v0.1**.
- Changes require a **new reviewed version**.
- This document **authorizes no implementation**.
- Implementation decisions must separately respect the **risk-based governance model**.
- **Do not silently reinterpret this rule during implementation.**

---

*Source authority: FeelJapanK Business Requirements Consolidation v0.2; FeelJapanK Implementation Master Plan v0.1; Field Japan K Business Workflow & Requirements v0.1; Frappe CRM — ArkAlliance Reference Conventions v0.1; FeelJapanK Communication Context Rule v0.1 (FROZEN).*
