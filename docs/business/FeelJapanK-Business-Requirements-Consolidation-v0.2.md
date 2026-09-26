# FeelJapanK — Business Requirements Consolidation v0.2

**Status:** WORKSHOP CONSOLIDATED — BUSINESS BASELINE  
**Purpose:** Reference document for future OpenCode planning/design work.  
**Scope:** Consolidates the business decisions made during the FeelJapanK workflow workshop (Decisions 1–74).  
**Authority:** Business requirements baseline. This document does not authorize implementation.

## 1. Core Trip Model
Trip is the enduring business unit.
- An initiating customer request creates one CRM Deal (commercial opportunity).
- A Trip is initiated when the customer invoice is created (FK-D15 — Trip Initiation Boundary).
- Requirement changes, negotiations and quotation revisions do not create a new Trip.
- A genuinely new business request creates a new Deal, whose Trip is initiated when its invoice is created.
- Each Trip has a designated responsible person; ownership can change.
- Management is the authority for major exceptions and final completion.

Lifecycle (Deal/commercial phase): **Enquiry → Requirements → Supplier sourcing → Quotation/Negotiation → Customer confirmation (written) → Customer invoice created → Trip initiated**.
Lifecycle (Trip): **Payment → Supplier commitment → Fulfilment → During-trip operations → Post-trip → Financial/operational closure → Completed**.

The Trip is initiated by **customer invoice creation** (FK-D15) — not by payment, and not by customer confirmation alone.

## 2. Requirements
Each Trip uses one standard, template-driven requirements structure covering dates, destination/route, duration, adults/children/infants, relevant gender, VIP/special status, accessibility, accommodation, transportation, guide, meals, attractions/tickets, equipment/rentals, baggage, special arrangements and other notes.

Current requirements represent the latest state. Meaningful changes are retained historically, especially dates, group size, destination/route, accommodation, transportation, guide, major activities, significant special requirements, or pricing. Minor/noise edits do not require history entries.

## 3. Supplier / Component Model
A Trip consists of fulfilment components.

Progression: **Required → Supplier TBD → Supplier options/quotes → Supplier selected → Supplier committed → Fulfilled**

Yida is preferred but not mandatory. Multiple supplier options should eventually be supported. Supplier selection can record reasons such as price, availability, capability, service quality, preferred/trusted supplier, customer request, location, existing relationship, or other explanation.

Supplier performance is captured through the progressive Post-Trip Report, not an arbitrary permanent rating.

## 4. Quotation and Negotiation
Quotation revisions are sequential: **V1 → V2 → V3 → ...**

Every meaningful quotation revision receives the next version number. Negotiation may include price changes, discounts, adding/removing components, requirement changes and supplier re-quotes. Where technically practical, meaningful negotiation events should be captured. Quotation versions remain the authoritative commercial history.

Before confirmation: **Customer change → supplier re-quote → quotation revision → negotiation → confirmation**

After confirmation: **Customer change → supplier re-quote → new quotation revision → customer written confirmation → new Confirmed version**

## 5. Confirmed Quotation
When the customer confirms: **Vx → CONFIRMED**. The Confirmed version is the definitive commercial snapshot. Previous versions remain historical.

If a material change occurs afterwards: **CONFIRMED → Vx+1 → written customer confirmation → new CONFIRMED**. The previous Confirmed version is preserved and not overwritten.

Material-change rule: if a change could affect what the customer agreed to pay, receive, or the conditions of the Trip, it requires a new quotation version and written customer confirmation. Purely administrative corrections do not.

## 6. Customer Acceptance
Written WhatsApp or email confirmation is sufficient commercial evidence. No signed quotation is required. The user manually records the customer's written confirmation and retains the confirmation evidence. This written confirmation is commercial confirmation/evidence preceding invoice creation and does **not** itself initiate a Trip: the Trip is initiated when the customer invoice is created (FK-D15). Automatic confirmation detection is deferred.

## 7. Pricing
### Main Trip components
Normal pricing is **Supplier cost + component-specific percentage markup**. Markup can differ by component. Where technically practical, retain markup percentage for historical intelligence/audit.

Calculated selling price may be manually overridden. Where practical retain supplier cost, markup %, calculated price, actual selling price, override, reason and Management involvement where applicable.

### Trip-level negotiation discount
An overall Trip discount can be applied during negotiation without changing every individual component price. Retain component prices, original Trip total, negotiated discount, final total and quotation version.

## 8. Additional Arrangements
Every additional arrangement receives its own structured record, including small items. Capture request/date/description, supplier, supplier cost, customer price, customer approval/evidence, supplier instruction/confirmation, status, related invoice, payment status and supporting communications/documents.

Normal flow: **Request → supplier cost → customer quotation → written approval → supplier proceeds → actual cost confirmed → post-trip invoice → customer payment → supplier payment**

Additional invoices are normally issued after the Trip. Standard customer follow-up is approximately 7 days after invoicing. Supplier payment normally waits for customer payment, but timing is case-by-case.

Pricing patterns:
1. Percentage markup for most extras.
2. Fixed item price + service charge, especially tickets and entrance fees.

Service charge is normally around 5–10%, selected case-by-case. Selling price may be manually overridden. Where practical retain pricing method, percentage/service charge, calculated price, actual price and override reason.

## 9. Customer Payment
### Departure < 3 months
100% invoice immediately after confirmation. No standard split.

### Departure > 3 months
30% invoice immediately after confirmation to secure/lock supplier arrangements. 70% balance invoice approximately 2 months before departure. 70% due date is 30 days before departure. A soft reminder may be sent between invoices.

**Invoice creation is the authoritative trigger that initiates the Trip (FK-D15).** Written customer confirmation precedes invoice creation as commercial evidence.

### Unpaid 70%
Overdue does not automatically mean cancelled. Process: **Due → follow-up → escalation → continue trying to realize Trip**. Trip handler and Management may both be involved. Actual cancellation depends partly on Yida cancellation deadline/rules.

## 10. Payment-Term Exceptions
Standard payment terms remain the default. Alternative arrangements are special cases. Distinguish standard arrangement from approved exception. Retain reason/evidence and approver. Management is the approval authority.

## 11. Supplier Commitment
Normal rule: **Do not commit/instruct supplier until required customer payment is received.**

Early commitment is allowed case-by-case, especially where scarce hotel/transport/etc. makes it necessary. Management is the authority. Eventually record reason, exposure, component/supplier and evidence.

## 12. Currency
Operational/commercial currency is JPY for supplier costs, component prices, markup, customer quotation and Trip commercial total. Accounting currency is MYR. Customer invoice uses MYR.

Customer FX: JPY→MYR invoicing rate revised every 3 months, incorporating current rate plus transfer/bank charges. Retain the applicable historical rate.

Supplier FX: Yida/supplier payment uses live/actual rate at the time of dealing/payment. The two FX mechanisms are deliberately different.

## 13. Legal / Accounting Entity
**Ark Alliance Sdn Bhd (1664559-V)** is the legal/accounting entity. FeelJapanK is the business/trading operation/brand.

**ERPNext Company = Ark Alliance Sdn Bhd**. Base/accounting currency: MYR.

## 14. CRM Organization vs ERPNext Customer
Keep separate:
- **Frappe CRM Organization** = relationship/CRM identity
- **ERPNext Customer** = accounting/commercial party

Use controlled mapping; do not synchronize every field. Reuse the ERPNext Customer for later Trips. **ERPNext Customer creation timing is governed by FK-D16 (FROZEN):** an ERPNext Customer is created when the customer first needs to participate in an actual ERPNext financial transaction — at the creation of the customer's first invoice — once per accounting/legal party, and reused thereafter. It is not created at enquiry, Deal, quotation, or written-confirmation stage; creation coincides with or immediately precedes invoice creation, never after. Mapping mechanics remain open (FK-D08).

## 15. Supplier Master
Supplier relationship can exist before an ERPNext Supplier exists. ERPNext Supplier is created when that supplier first needs to participate in an actual financial transaction, then reused.

## 16. Cancellation
Known rules:
- cancellation after 30% → deposit forfeiture
- retained deposit first covers actual cancellation costs/losses
- departure change → attempt rearrangement; extra costs borne by customer
- reduced traveller count → per-person price may increase
- unavailable hotel → supplier finds similar/upgraded replacement; customer acceptance required
- unpaid final 70% → follow-up/chase rather than immediate auto-cancellation
- cancellation includes cancellation letter, supplier notification, archive, continued communication/chasing where appropriate
- preserve cancellation reason, evidence, communication history and financial consequences

**Open external dependency:** Yida's exact cancellation deadline and associated financial consequences remain to be confirmed. Do not invent or hard-code this rule.

## 17. During-Trip Operations
Trip is a living operational record. Record issues, deviations, expenses, client feedback, additional arrangements, supplier issues and operational observations as they happen. These feed the progressive Post-Trip Report.

## 18. Post-Trip
Two separate records.

### Internal Post-Trip Report
Progressive/living record covering outcome, operational performance, deviations, issues, suppliers, guide/driver, extras, financial/operational closeout and lessons learned. It begins during the Trip and evolves through closure.

### Client Feedback
Requested after every completed Trip:
1. quick initial feedback shortly after return
2. more complete formal feedback during Trip closing

Client Feedback remains separate from the Internal Post-Trip Report.

## 19. Trip Completion
Management manually marks Trip Completed after:
1. operationally settled
2. client satisfied
3. all customer payments received, including post-trip/additional amounts
4. supplier payments settled
5. marketing/hospitality/land-personnel expenses paid
6. post-trip report completed
7. outstanding issues resolved

## 20. Trip Expenses and Profitability
Capture relevant FeelJapanK internal Trip expenses, including hospitality/treating guides, drivers, land personnel and other relevant operational expenses.

Management profitability should reflect **Customer revenue − supplier costs − relevant internal Trip expenses**.

A rough estimate is sufficient for management; every minor cost does not need perfect allocation.

ERPNext remains the authoritative accounting system. Do not build a second accounting/ledger engine inside the custom Trip application.

## 21. Morning Owner Brief
The Morning Brief is a reporting/control layer, not a separate business record. It derives from underlying Trip, CRM, operational and financial data.

Preferred structure:
1. **ATTENTION** — exceptions/problem items
2. **ACTION QUEUE / TTD** — what needs action today and soon
3. **MONEY** — receivables, overdue amounts, supplier exposure/commitments
4. **TRIP CONTROL** — upcoming Trips, missing confirmations, operational risks
5. **BUSINESS INTELLIGENCE** — evidence-based observations
6. **OWNER OPPORTUNITIES** — evidence-based suggestions

Goal: owner understands business health and required action within roughly five minutes.

## 22. Historical Intelligence
Customer intelligence may include trip frequency, typical trip value, quote revision frequency, negotiation patterns, margin, payment timing/behaviour, destinations, group sizes, special/VIP requirements, amendments, cancellations/reasons and additional-arrangement behaviour.

Supplier intelligence may include responsiveness, pricing history, reliability, request types, preferred hotels/guides/services, problems, lead times, cost history, supplier-selection reasons and Post-Trip observations.

LLM-derived intelligence must distinguish **Evidence → Observation → Suggestion** and must not invent subjective labels.

## 23. Architecture Boundary
### Frappe CRM
Owns relationship/CRM context, customer/company relationship and enquiry context. Also owns the **pre-invoice commercial state of a Deal** — enquiry, pre-Trip requirements, supplier quotations/re-quotes, customer quotation versions (V1..Vn), negotiation history, written confirmation evidence, CONFIRMED snapshot, and associated commercial evidence — and retains the historical commercial record after Trip creation (FK-D17 FROZEN).

### FeelJapanK custom Trip/Operations layer
Owns Trip, operational requirements and operational history **from Trip initiation onward**, Trip Components, operational events, Additional Arrangements, progressive Post-Trip Report, client feedback and Trip operational state. It does **not** own pre-invoice commercial state (FK-D15 / FK-D17).

### ERPNext
Owns accounting, Customer/Supplier financial masters, financial/commercial documents **from the financial boundary (first customer invoice)**, procurement, invoices, payments and authoritative financial records. ERPNext Customer creation timing is FK-D16 (FROZEN). Business quotations are not required to be native ERPNext Quotation documents (FK-D17); no ERPNext Customer is required merely to support a pre-invoice business quotation.

### P01
Remains canonical for Contact/Company identity and relationship intelligence.

### Morning Brief / Intelligence
Derived analytical/control layer across appropriate underlying sources.

Do not duplicate ERPNext accounting or create a universal cross-Lego database.

## 24. Remaining Open Items
### Business dependency
- Confirm Yida cancellation deadline and associated financial consequences.

### Design/implementation questions
These belong in the next design phase, not further business interrogation:
- exact Trip DocType structure
- Trip Component structure
- ERPNext quotation/procurement/invoice linkage
- Payment Terms implementation
- Accounting Dimension propagation
- JPY/MYR FX implementation
- Confirmed quotation/version UX
- Additional Arrangement implementation
- internal expense capture
- Trip profitability calculation
- CRM ↔ ERPNext Customer mapping
- reporting/Morning Brief architecture
- supplier option/selection implementation
- progressive Post-Trip Report implementation

## 25. Governance
This document records business decisions only. It does not authorize implementation.

Future work must continue under:

**PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFICATION → EVIDENCE → FREEZE**

OpenCode must not implement from this document merely because it exists; implementation boundaries must be explicitly planned and approved.
