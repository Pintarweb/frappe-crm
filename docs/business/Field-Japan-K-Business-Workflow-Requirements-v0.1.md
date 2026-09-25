# Field Japan K — Business Workflow & Requirements v0.1

**Status:** APPROVED — BUSINESS REQUIREMENTS BASELINE  
**Version:** v0.1  
**Scope:** Field Japan K business operations  
**Purpose:** Business authority for subsequent Frappe/ERPNext fit assessment

> This document defines the approved Field Japan K business workflow independently of software implementation. Subsequent software and design decisions must be assessed against this business baseline rather than changing the business workflow merely to fit software.

---

## 1. Purpose

Field Japan K is a Malaysia-based B2B Japan land operator / Japan package supplier.

The system must support the company's real operating workflow from:

**Customer enquiry → requirements → supplier procurement → quotation → customer confirmation → payment → supplier fulfilment → pre-departure → trip → additional arrangements → post-trip → financial closure → ongoing customer relationship**

The system should preserve the evidence and history generated throughout that lifecycle so that the business can later use it for operational control, financial management and intelligence.

## 2. Core Business Model

Field Japan K's customers are primarily Malaysian travel agents.

Field Japan K does not directly manage individual travellers as customers.

A customer company may have multiple contacts, for example:
- Owner
- Sales person
- Finance person
- Operations person
- Other representatives

The same travel-agent company can have multiple simultaneous trips.

Therefore:

**Customer relationship ≠ Trip**

A customer remains an ongoing business relationship while individual trips are separate operational/commercial engagements.

## 3. Trip as the Central Operational Unit

The **Trip** is the central operational and commercial unit.

A Trip represents a particular customer request/group/departure and contains the requirements, commercial negotiations, supplier fulfilment, payments, documents and operational history associated with that trip.

A single customer may have multiple simultaneous trips. Each trip maintains its own:
- requirements
- quotation history
- customer confirmation
- payment status
- supplier fulfilment
- itinerary
- additional arrangements
- cancellation history
- post-trip history

## 4. Traveller / Group Information

Field Japan K does not need individual traveller/customer records for normal tour operations.

The system needs operational group attributes such as:
- Number of adults
- Number of children
- Number of infants
- Gender where relevant
- VIP status
- Minister/director/important-person status
- Disability/accessibility requirements
- Special requirements

The purpose is operational planning and service delivery, rather than maintaining a passenger CRM database.

## 5. Customer Enquiry

### 5.1 Sources

A new trip enquiry may arrive through:
- Email
- WhatsApp
- Other future communication channels

The initial communication may contain incomplete information.

### 5.2 Requirement gathering

Field Japan K clarifies the customer's requirements until there is enough information to prepare a supplier request and/or customer quotation.

The system should eventually preserve:
- Original enquiry
- Requirements
- Subsequent clarifications
- Changes to requirements
- Relevant communications
- Supporting documents/evidence

## 6. Supplier Model

Field Japan K is a Japan land operator and works with Japanese suppliers.

### 6.1 Yida

Yida is:
- A Japan-based supplier/partner
- A long-standing trusted relationship
- Normally the primary/preferred supplier
- Normally contacted through a single Yida representative

Yida commonly coordinates:
- Hotels
- Transportation
- Guides
- Meals
- Other arrangements

However:

**Yida is not an exclusive supplier.**

If Yida cannot provide something, Field Japan K may work directly with another Japanese provider.

## 7. Supplier Relationships

Secondary suppliers are not merely one-off emergency vendors.

Field Japan K wants to:
- Maintain good relationships
- Reuse successful providers
- Develop backup capacity
- Build supplier knowledge over time

Therefore the system should preserve supplier history rather than treating every supplier interaction as disposable.

## 8. Supplier Fulfilment Model

A Trip may contain multiple fulfilment components.

Examples:
- Accommodation
- Transportation
- Guide
- Meals
- Entrance fees
- Attraction tickets
- Equipment rental
- Baggage arrangements
- Other/special arrangements

The supplier for each component may differ.

For example:

```text
Trip
 ├── Hotel → Yida
 ├── Transport → Yida
 ├── Guide → Yida
 ├── Bicycle rental → Direct provider
 └── Special meal → Direct provider
```

Therefore:

**Supplier fulfilment is component-level, not necessarily trip-level.**

Each component may eventually require its own:
- Supplier
- Cost
- Status
- Confirmation
- Payment/commitment
- Evidence
- Notes

## 9. Supplier Procurement Workflow

After requirements are sufficiently understood:

1. Field Japan K prepares an official supplier request.
2. Request is sent to Yida or the relevant direct supplier.
3. Supplier provides quotation/cost.
4. Field Japan K reviews supplier pricing and availability.
5. Changes/add-ons may require another supplier request.
6. Supplier response becomes part of the trip's evidence/history.

## 10. Customer Quotation Workflow

After obtaining supplier pricing:

1. Field Japan K adds its markup.
2. Field Japan K prepares a formal customer quotation.
3. Customer reviews quotation.
4. Customer may request:
   - Clarification
   - Additions
   - Removals
   - Changes
   - Price negotiation
   - Terms clarification

The quotation may therefore go through multiple versions:

**V1 → V2 → V3 → V4 → Final**

Each version should preserve its historical state rather than simply overwriting the previous quotation.

## 11. Supplier Re-quotation During Negotiation

If customer-requested changes affect supplier arrangements:

1. Field Japan K requests updated pricing/availability from Yida or the relevant supplier.
2. Supplier responds.
3. Field Japan K adjusts the customer quotation.
4. Customer reviews the revised quotation.
5. Process may repeat.

Therefore the commercial history can contain:

**Customer request → Supplier re-quote → Customer quotation revision → Customer response**

## 12. Customer Confirmation

The customer's written confirmation is the trigger for moving the trip into confirmed business.

Confirmation may arrive through:
- WhatsApp
- Email

Written confirmation is important evidence.

The system should preserve the confirmation and its source.

## 13. Payment Rules

Payment requirements depend on departure timing.

### Departure less than 3 months away

**100% payment required before proceeding.**

### Departure more than 3 months away

**30% deposit required.**

The remaining **70% balance** is invoiced approximately 2 months before departure.

The expectation is that the full balance is received approximately 30 days before departure.

If the final 70% is not paid:

**Trip is cancelled and the 30% deposit is forfeited.**

These rules are business rules and should eventually be represented explicitly rather than relying only on staff memory.

## 14. Customer Payment → Supplier Commitment

A critical business control is:

**Field Japan K should not commit/instruct Yida until the required customer payment has been received.**

After required customer payment:

1. Record payment.
2. Issue customer receipt.
3. Commit/instruct Yida.
4. Make the corresponding supplier deposit/payment where applicable.

This creates an important relationship between:

**Customer payment → Supplier commitment**

## 15. Supplier Payment

Supplier payment generally follows the same commercial structure.

Yida may require deposits and later balances depending on the arrangement.

Supplier financial obligations therefore need to be tracked independently from customer receivables.

The system should eventually allow Field Japan K to understand:
- What the customer owes Field Japan K
- What Field Japan K owes suppliers
- What has already been paid
- What remains committed/outstanding
- Which trips have financial exposure

## 16. Booking / Fulfilment

Once the supplier is instructed and the necessary supplier payment/commitment is made:

Yida begins arranging:
- Hotels
- Transport
- Guides
- Meals
- Attractions
- Other components

Supplier confirmations should be retained as evidence.

The trip should eventually provide an operational view of:

**What is confirmed vs what is still outstanding.**

## 17. Pre-Departure

Before departure, Field Japan K prepares/provides:
- Final itinerary
- Necessary contact details
- Trip information
- Other required operational information

The system should eventually identify incomplete pre-departure requirements.

## 18. During-Trip Additional Arrangements

Customers may request something that was not included in the original quotation, itinerary or invoice.

Examples:
- Additional lunch
- Additional dinner
- Other services
- Additional activities
- Other special arrangements

Workflow:

1. Customer requests additional item via WhatsApp/email.
2. Field Japan K checks feasibility with Yida/direct supplier.
3. Supplier provides live/current cost.
4. Field Japan K quotes customer.
5. Customer provides written confirmation that they agree to pay.
6. Field Japan K instructs supplier to proceed.
7. Supplier may provide the service on trust without immediate payment from Field Japan K.
8. Additional amount is subsequently invoiced.
9. Field Japan K collects payment.

## 19. Additional Arrangement Evidence

Customer written approval is particularly important.

It provides evidence if the customer later disputes an additional charge.

Therefore the system should preserve the chain:

**Customer request → Supplier cost → Customer quotation → Customer written approval → Supplier instruction → Additional invoice → Payment**

This is an important business-control requirement.

## 20. Post-Trip

After the trip:
- Outstanding additional invoices are collected.
- Payments are followed up.
- Post-trip report is retained.
- Trip records remain available as historical evidence.
- Customer relationship remains active.

The trip should become part of the customer's historical business record.

## 21. Cancellation

Cancellation is not simply:

**Status = Cancelled**

It is a business process.

When cancellation occurs, Field Japan K currently:

1. Sends cancellation letter to customer.
2. Notifies Yida.
3. Archives the trip.
4. Communicates/chases customer repeatedly during the final 30 days where appropriate.
5. Records the reason for cancellation.
6. Determines financial consequences.

The system should preserve the cancellation history and evidence.

## 22. Cancellation Scenarios

### Customer cancels after 30% payment

Deposit is forfeited.

### Customer cancels after Field Japan K has paid Yida

Current practice:

Yida retains what Field Japan K has already paid, according to the applicable arrangement.

### Customer changes departure date

Field Japan K attempts to rearrange with Yida.

Additional costs are borne by the customer.

### Customer reduces traveller count

Group pricing may change, potentially increasing the per-person price.

### Hotel unavailable

Yida finds a similar or upgraded alternative.

Field Japan K discusses the replacement with the customer and obtains acceptance where required.

### Customer fails to pay final 70%

Trip is cancelled and deposit retained.

### Refund request

Refund treatment is governed by the terms stated in the applicable quotation/invoice.

## 23. Cancellation Intelligence

The reason for cancellation should be captured.

The objective is not merely administrative.

Over time, Field Japan K should be able to identify patterns such as:
- Pricing-related cancellations
- Customer-side issues
- Timing issues
- Supplier issues
- Requirement misunderstandings
- Payment problems
- Other recurring causes

However, the system should record evidence and actual reasons, rather than automatically assigning subjective labels.

## 24. Current Document / Evidence Trail

The current business process can generate the following evidence:

1. Customer enquiry email/WhatsApp
2. Requirement sheet
3. Request to Yida
4. Yida quotation
5. Field Japan K quotation V1
6. Quotation V2/V3/etc.
7. Final accepted quotation
8. Invoice
9. Payment receipt
10. Yida booking confirmation
11. Yida invoice
12. Final itinerary
13. Post-trip report

Additional-arrangement documentation has not always been consistently maintained.

This is a process gap to address later.

## 25. Evidence Principle

Important business decisions and commitments should be traceable to evidence.

Particularly:
- Customer confirmation
- Customer approval of extras
- Supplier quotation
- Supplier confirmation
- Customer payment
- Supplier payment
- Cancellation
- Cancellation reason
- Financial consequences

The system should preserve the history rather than relying on a current status alone.

## 26. Customer Relationship Intelligence

The customer relationship continues after an individual trip ends.

Over time, Field Japan K wants to understand customers based on actual historical dealings.

Potential intelligence includes:
- Number of trips
- Trip frequency
- Typical trip value
- Typical group size
- Destinations
- Typical margin
- Quotation revision frequency
- Negotiation patterns
- Payment timing
- Late-payment behaviour
- Additional-invoice payment behaviour
- Cancellation history
- Cancellation reasons
- Special/VIP requirements
- Frequently requested services
- Supplier usage
- Other recurring patterns

The system should distinguish:

**Recorded fact → Derived observation → Suggested action**

rather than presenting an LLM's opinion as fact.

## 27. Supplier Intelligence

The same principle applies to suppliers.

Potential supplier intelligence includes:
- Historical pricing
- Responsiveness
- Reliability
- Types of requests handled
- Hotels/guides/providers commonly used
- Problems encountered
- Lead times
- Past supplier utilisation
- Cost history
- Successful fulfilment history
- Backup suitability

Yida may remain the primary supplier while other suppliers are developed as useful alternatives.

## 28. LLM Intelligence

The LLM should not become the system of record.

Structured business records remain authoritative.

The LLM's role is to analyse those records and produce useful:

### Observations

Example:

> Customer has increased Japan trip frequency over the past 12 months.

### Patterns

> Customer frequently requests quotation revisions before confirmation.

### Potential actions

> Consider confirming meal requirements earlier during requirement gathering.

The LLM should not invent facts or silently convert subjective interpretations into permanent customer/supplier attributes.

## 29. Morning Owner Control

The owner should be able to understand the company's operational position within approximately five minutes each morning.

The morning briefing should be exception-first, rather than a large KPI dashboard.

### 29.1 ATTENTION

Things that require action or could cause financial/operational problems.

Examples:
- Payment overdue
- Supplier confirmation missing
- Customer approval outstanding
- Quotation awaiting response
- Trip component not confirmed
- Additional invoice not collected
- Departure approaching with incomplete preparation

### 29.2 ACTION QUEUE / TTD

Actions required.

**Today:** What should be done today?

**Next 7 days:** What is approaching?

This should focus on actual actionable work rather than simply displaying records.

### 29.3 MONEY

Owner visibility into:
- Customer payments due
- Overdue customer payments
- Upcoming receipts
- Supplier payments due
- Supplier commitments
- Outstanding additional invoices
- Financial exposure by active trip

### 29.4 TRIP CONTROL

Quick operational picture:
- Active trips
- Upcoming departures
- Trips requiring attention
- Supplier confirmations outstanding
- Customer approvals outstanding
- Pre-departure tasks outstanding

### 29.5 BUSINESS INTELLIGENCE

Evidence-based observations about:
- Customers
- Suppliers
- Sales patterns
- Payment behaviour
- Margins
- Cancellations
- Operational patterns

### 29.6 OWNER OPPORTUNITIES

A small number of evidence-based suggestions that could help the business.

Examples:
- Customer follow-up
- Supplier relationship opportunity
- Recurring service opportunity
- Margin review
- Backup supplier opportunity
- Customer reactivation opportunity

Suggestions must remain distinguishable from factual records.

## 30. Key Business Principles

### 1. Trip-first operational thinking

The Trip is the central commercial/operational unit.

### 2. Customer relationship continues beyond a Trip

A completed trip does not mean the customer relationship ends.

### 3. Supplier fulfilment is component-based

Different components can have different suppliers.

### 4. Yida is preferred, not mandatory

The actual fulfiller should be recorded.

### 5. Evidence matters

Important commitments should be traceable.

### 6. Financial state matters

Customer receivables and supplier commitments must be visible.

### 7. Historical intelligence matters

Past trips should improve future decisions.

### 8. LLM assists; it does not become the authority

Structured records remain authoritative.

### 9. Exception-first operations

The owner should not have to search through screens to discover problems.

### 10. Avoid unnecessary complexity

The system should model actual business needs rather than building generic enterprise machinery.

## 31. Major Business Objects — Conceptual Only

Without deciding any software implementation yet, the business appears to revolve around:
- Customer Company
- Customer Contact
- Trip
- Trip Requirements
- Traveller/Group Profile
- Supplier
- Supplier Contact
- Supplier Fulfilment Component
- Supplier Request
- Supplier Quotation
- Customer Quotation
- Quotation Version
- Customer Confirmation
- Customer Invoice
- Customer Payment
- Supplier Invoice
- Supplier Payment
- Itinerary
- Additional Arrangement
- Cancellation
- Post-Trip Report
- Evidence / Communication
- Tasks / Actions
- Customer Intelligence
- Supplier Intelligence

These are business concepts, not yet proposed Frappe DocTypes.

## 32. Explicitly Deferred Decisions

The following should not be decided yet:
- Exact Frappe DocTypes
- ERPNext installation
- Whether Trip should extend a standard CRM object
- Accounting architecture
- Exact quotation implementation
- Exact supplier implementation
- WhatsApp UI integration
- Telegram operational functionality
- P01 integration implementation
- LLM implementation
- Dashboard implementation
- Automation implementation
- Custom application structure

Those belong to later technical assessment.

## 33. Open Questions

The approved requirements leave the following questions for later clarification/design:
1. Trip identity: What exactly defines a separate Trip when a customer sends several enquiries around the same period?
2. Quotation validity: What happens when a quotation expires before customer confirmation?
3. Markup: Is markup normally percentage-based, fixed, component-specific, or manually determined?
4. Supplier quotation validity: How is supplier quotation expiry handled?
5. Payment timing: Are the 30%/100% rules absolute or are exceptions sometimes approved?
6. Supplier payment timing: Does Field Japan K normally mirror customer payment milestones, or can supplier terms differ?
7. Additional arrangements: How should an extra be handled if the customer approves but later doesn't pay?
8. Cancellation: Are there different refund/forfeiture rules depending on supplier terms?
9. Trip completion: What officially marks a Trip as completed?
10. Post-trip report: Who creates it and what information must it contain?
11. Owner actions: Who is responsible for each type of action when there are multiple staff members?
12. Morning briefing: Should the owner see only unresolved issues, or also a short “everything is on track” summary?
13. TTD terminology: The current draft uses **Action Queue / TTD** because the exact intended meaning of TTD was not established.
14. Customer intelligence: Which derived metrics are genuinely useful enough to become permanent business indicators?
15. Supplier intelligence: Which supplier characteristics should be tracked as measurable facts rather than inferred observations?

## 34. Central Business Requirement

**Field Japan K needs a system that manages each Japan trip from enquiry through post-trip completion while preserving the commercial, operational, financial and evidential history of the trip, maintaining the long-term customer and supplier relationships around those trips, and turning accumulated history into useful operational and business intelligence.**

The owner-facing requirement is:

**Every morning, the owner should be able to see what requires attention, what actions are due, where money is exposed, which trips are operationally at risk, and what meaningful opportunities or patterns have emerged from the company's history.**

---

## Document Status

**APPROVED — BUSINESS REQUIREMENTS BASELINE**

This document is the business baseline for the subsequent Frappe/ERPNext fit assessment. It does not authorize implementation and does not prescribe technical architecture.
