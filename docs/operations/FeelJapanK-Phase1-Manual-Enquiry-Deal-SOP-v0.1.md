# FeelJapanK — Phase 1 Manual Enquiry → Deal SOP

**Project:** FeelJapanK
**Subject:** Phase 1 Manual Enquiry → Deal Standard Operating Procedure
**Version:** v0.1
**Status:** PROPOSED / PHASE 1 OPERATING SOP
**Audience:** FeelJapanK agent using the current native Frappe CRM
**Authority:** Operational procedure only. This SOP is **not** implementation authorization for any deferred item.

---

## 1. Purpose

This SOP governs how a FeelJapanK agent handles a new commercial enquiry manually in Frappe CRM during Phase 1.

- **CRM** is the relationship and enquiry-context layer.
- A **Deal** represents one commercial enquiry/opportunity.
- A **Trip** is a separate, enduring operational unit.
- This SOP does **not** define the final Trip implementation.

Phase 1 is deliberately **human-in-the-loop**. The agent determines Contact, Organization, existing-vs-new Deal, requirements, and evidence. The CRM is not required to infer Deal context automatically.

---

## 2. Core Concepts

- **Contact** — a person. Identifies a person.
- **Organization** — the customer company.
- **Deal** — one commercial enquiry/opportunity in CRM.
- **Trip** — the later enduring commercial/operational unit (outside CRM in Phase 1).

> **A Contact identifies a person. Explicit commercial context identifies the Deal.**

Operational facts:

- One Organization can have multiple Contacts.
- One Organization can have multiple simultaneous Deals.
- A Contact can participate in multiple Deals.
- A customer relationship is not itself a Trip.
- A Deal is not automatically equivalent to a Trip.

---

## 3. Genuine Commercial Enquiry Test

A genuine commercial enquiry requires **all three**:

1. An identifiable counterparty.
2. Commercial intent to obtain Japan travel services/arrangements from FeelJapanK.
3. A discernible particular Japan trip/service request.

> **Incomplete does not mean not an opportunity.**

Example: "Need Japan December. Advise." — may still create a Deal if the counterparty is identifiable. Missing requirements are gathered progressively on the Deal.

Contrast: "Any good Japan packages?" — generic/undirected; clarify first before creating a Deal.

Do not apply classification rules beyond the approved authority documents.

---

## 4. Intake Procedure

### Step 1 — Identify the person
Determine whether the requester is:
- an existing Contact;
- a known person requiring clarification;
- or genuinely unidentified.

Do **not** silently create duplicate Contacts.

### Step 2 — Identify the Organization
Determine the customer company represented by the Contact/requester.

### Step 3 — Determine existing vs new Deal
Search the Organization's existing Deals and use explicit commercial context.

**Continue an existing Deal** when the communication:
- references the same opportunity;
- modifies or clarifies the same request;
- negotiates the same request;
- revises requirements;
- changes destination/route/price within the same underlying request;
- concerns the same group/departure/opportunity.

**Create a new Deal** when it is genuinely distinct, such as:
- a different group/party;
- a different departure;
- an explicitly additional/separate request;
- another genuinely distinct commercial opportunity.

If unclear, **human judgment is required**. Do not invent a rigid automatic Trip/Deal rule for ambiguous cases.

---

## 5. Minimum Deal Data

Capture at minimum:
- **Organization**
- **Contact(s)**
- **Discernible request**
- **Owner**
- **Source**

Also capture whatever is already known about the request without waiting for complete requirements. Incomplete requirements may be gathered progressively.

Do not introduce new mandatory database fields; use the available CRM fields and note/activity mechanisms.

---

## 6. Evidence Preservation

### Email
Where CRM supports email threading, preserve the communication within the appropriate Deal context.

### WhatsApp (Phase 1)
- WhatsApp remains an input channel.
- Automated Deal routing is deferred.
- The **human agent** determines the appropriate Deal.
- Relevant WhatsApp material should be **manually preserved** as CRM evidence.

Evidence may include: text; screenshots; images; PDFs/documents; spreadsheets; audio/voice; video; combinations of these.

Preserve original artifacts where practical. Do **not** propose AI extraction, transcription, automated classification, or automated routing.

---

## 7. Existing Deal vs New Deal — Decision Procedure

1. Is there identifiable commercial intent?
2. Is there a discernible Japan request?
3. Which Organization does this belong to?
4. Does an existing Deal clearly represent the same opportunity?
5. If yes → continue that Deal.
6. If no → create a new Deal.
7. If unclear → human judgment; do not silently guess.

---

## 8. Handling Requirement Changes

Changes to destination, route, dates, pricing, group details, requirements, negotiation, or quotation request do **not automatically create a new Deal** when they remain part of the same underlying opportunity.

Record important changes through the available CRM activity/evidence mechanisms. Do **not** create a new structured requirement-history system in this SOP — that belongs to the future Trip/Operations design where appropriate.

---

## 9. Lead Usage

- **Known customer + genuine enquiry** → create/continue the Deal directly.
- **Identifiable but incomplete enquiry** → a Deal can still be created.
- **Unknown party + genuine commercial enquiry** → determine whether the counterparty can be identified sufficiently; if genuinely unidentified, Lead/intake may be used temporarily.
- **Generic/non-commercial enquiry** → clarify first; do not automatically create a Deal.

Lead is an optional intake/acquisition mechanism, **not the business object**. Do not make Lead mandatory.

---

## 10. WhatsApp Phase 1 Handling

- WhatsApp can be used.
- The human agent determines Contact, Organization, and Deal context.
- WhatsApp must **not** be treated as automatically authoritative Deal-level confirmation.
- The existing `ark_whatsapp_guard` security control remains untouched.
- Automated WhatsApp → Deal routing is deferred.
- Automatic Contact/Deal matching is deferred.
- Replay/dedup beyond the existing security control is deferred.

No implementation changes are proposed in this SOP.

---

## 11. Deal → Trip Boundary

**CRM / Deal owns (pre-invoice):** customer relationship context; enquiry/opportunity context; Contacts; Organization; pre-invoice commercial state — enquiry, pre-Trip requirements, supplier quotations and re-quotes, customer quotation versions (V1..Vn), negotiation history, written confirmation evidence, CONFIRMED snapshot, and associated commercial evidence/communications; Deal activity; and the historical commercial record retained after Trip creation. (FK-D17 FROZEN)

**Trip / Operations will own (from Trip initiation onward):** Trip; operational requirements and operational history from initiation; supplier components; supplier commitment; fulfilment; during-trip operations; post-trip; client feedback; operational closure; profitability/operational outcomes as later defined. Trip does **not** own pre-invoice commercial state (FK-D15 / FK-D17).

**ERPNext later owns (from the financial boundary):** accounting; Customer/Supplier financial masters; financial/commercial documents from the first customer invoice; procurement; invoices; payments; authoritative financial records. ERPNext Customer creation timing is **FK-D16** (FROZEN). Business quotations are not required to be native ERPNext Quotation documents (FK-D17).

No implementation details for the future Trip layer are defined here.

---

## 12. Trip Initiation Boundary — FK-D15 (FROZEN)

**Trip initiation boundary: customer invoice creation.**

- The customer's written confirmation (WhatsApp/email) is commercial evidence preceding invoice creation; it does **not** itself initiate the Trip.
- Quotation confirmation alone does not initiate a Trip.
- **Creation of the customer invoice is the authoritative trigger for initiating the Trip.**
- "Deal Won" and payment do **not** initiate the Trip.

Canonical sequence: `Deal/Enquiry → Quotation V1/V2/… → Customer accepts/confirms → Written confirmation (WhatsApp/email, retained) → Customer invoice created → Trip initiated → Payment → Supplier commitment → Fulfilment → …`

Historical note: this was previously recorded as UNRESOLVED (SOP v0.1 as drafted). It is now governed by **FK-D15**; see `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`.

---

## 13. Confirmation

Customer confirmation may be provided through **WhatsApp** or **email**.

For Phase 1:
- the human agent determines that confirmation has occurred;
- confirmation evidence should be preserved;
- automatic confirmation detection is deferred.

No confirmation automation is designed here.

---

## 14. Daily Agent Checklist

For each incoming enquiry:

- [ ] Identify Contact.
- [ ] Identify Organization.
- [ ] Determine whether the enquiry is genuinely commercial.
- [ ] Search existing Deals.
- [ ] Decide existing Deal vs new Deal.
- [ ] Capture minimum Deal context.
- [ ] Preserve original communication/evidence.
- [ ] Record important requirement changes.
- [ ] Continue communication in the correct Deal context.
- [ ] Preserve confirmation evidence when confirmation occurs.
- [ ] Do not silently guess when context is ambiguous.

---

## 15. Known Phase 1 Limitations

- WhatsApp lacks reliable native Deal triage.
- WhatsApp may be orphaned before a Deal exists.
- Fresh inbound email may not automatically link to an existing Contact/Deal.
- Contact ↔ Organization relationship is fragile because `Contact.company_name` is text.
- CRM has no structured requirement-history model.
- CRM has no native quotation-version object.
- There is no Trip object.
- Some actions require leaving the communication context and navigating CRM manually.
- Duplicate Deal creation remains a human-process risk.

These limitations are documented, not solved, in this SOP.

---

## 16. Deferred / Not Authorized

This SOP does **not** authorize implementation of:

- automated WhatsApp → Deal routing;
- automatic Contact/Deal matching;
- automatic Deal creation;
- AI enquiry classification;
- AI extraction;
- transcription;
- screenshot/image/document interpretation;
- automated triage;
- Trip DocTypes;
- quotation versioning;
- supplier models;
- ERPNext;
- P01 integration;
- new authentication;
- new generic integration infrastructure.

---

## Governance

- This SOP is **PROPOSED / PHASE 1 OPERATING SOP** at v0.1.
- It changes only via a new reviewed version.
- It authorizes **no implementation**.
- Implementation decisions must separately respect the risk-based governance model.
- Do not silently reinterpret this SOP during implementation.

---

*Related authority: `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Opportunity-Start-Lead-Usage-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md`; `docs/architecture/Frappe-CRM-ArkAlliance-Reference-Conventions-v0.1.md`; `docs/business/FeelJapanK-Business-Requirements-Consolidation-v0.2.md`; `docs/business/FeelJapanK-Implementation-Master-Plan-v0.1.md`.*
