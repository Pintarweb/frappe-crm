# FeelJapanK — Implementation Master Plan v0.1

**Status:** WORKING MASTER PLAN — REFERENCE  
**Purpose:** Keep the FeelJapanK implementation aligned with the agreed business workflow, architecture boundaries, and practical delivery pace.

---

## 1. Purpose

This document is the project-level reference for implementing the FeelJapanK operating system across CRM, Trip/Operations, ERPNext, integrations, and intelligence.

It exists primarily to prevent **scope drift, premature implementation, unnecessary complexity, and architectural shortcuts**.

It is not intended to become a detailed technical specification. Detailed designs belong to the relevant phase when the phase is reached.

---

## 2. Core Principle

Build the system in the order the business actually needs it.

Current direction:

**Business Requirements → CRM → Trip/Operations → ERPNext Commercial & Finance → Integration → Intelligence → Production Hardening**

ERPNext is deliberately **not the current implementation target**.

The CRM must first be designed and configured around the actual FeelJapanK workflow.

---

## 3. Delivery Governance — Risk-Based, Not Ceremony-Based

The project uses a lightweight default process:

> **THINK → BUILD → CHECK**

### THINK

Understand the problem, inspect what exists, define the intended change, and identify scope.

For significant work, THINK includes a written plan/design.

For small, obvious, low-risk work, THINK may be brief.

### BUILD

Implement the agreed change.

When using OpenCode, always explicitly state:

- **MODE: PLAN** for inspection, analysis, design, architecture, and verification-only work.
- **MODE: BUILD** for implementation of an already understood/bounded change.

### CHECK

Verify that:

- the intended behaviour works;
- relevant tests/checks pass;
- existing behaviour has not been unnecessarily broken;
- scope has not silently expanded;
- important decisions or evidence are recorded where appropriate.

---

## 4. High-Risk Gate

The heavier process is reserved for decisions that can materially affect architecture, data ownership, security, finance, or future compatibility.

For high-risk work:

> **PLAN → REVIEW → APPROVE/FREEZE → BUILD → VERIFY → EVIDENCE**

Use this gate for matters such as:

- changing data ownership;
- changing P01/CRM/ERPNext boundaries;
- introducing new integration infrastructure;
- major schema/data-model changes;
- financial/accounting architecture;
- authentication/security architecture;
- production deployment architecture;
- irreversible or difficult-to-reverse decisions.

Do **not** apply the full ceremony automatically to every small implementation task.

### Governance rule

Use the **lightest process appropriate to the risk**.

The purpose of governance is to protect the project, not to create paperwork.

---

## 5. Existing Frozen Foundations

The following are treated as established reference points unless deliberately revisited:

### Business

**FeelJapanK — Business Requirements Consolidation v0.2**

This is the current consolidated business baseline covering:

- Trip identity and lifecycle
- requirements
- suppliers and components
- quotations and revisions
- confirmed versions
- customer acceptance
- pricing/markup
- additional arrangements
- payments
- exceptions
- supplier commitment
- currency/FX
- CRM/ERPNext boundary
- cancellation
- during-trip operations
- post-trip closure
- expenses/profitability
- Morning Brief
- historical intelligence

### Architecture

P01 / ArkAlliance remains a separate LEGO block.

- P01 is authoritative for its own identity/relationship domain.
- Frappe CRM owns local CRM operational records.
- ERPNext owns financial/accounting records.
- No shared database.
- No direct D1 coupling.
- No premature universal integration layer.
- Cross-Lego references use the established opaque reference convention.
- Integration is introduced only when a concrete business requirement exists.

### Frappe CRM

The current environment is an actual installed Frappe CRM instance and should be treated as the implementation baseline.

The CRM is not assumed to perfectly fit FeelJapanK. We will first determine the smallest changes needed.

---

# 6. Implementation Phases

## Phase 0 — Foundation & Governance

**Objective:** Establish the project reference point.

Already substantially established:

- business workflow baseline;
- P01/CRM architectural boundary;
- Frappe CRM environment;
- Frappe/CRM versions;
- WhatsApp security baseline;
- repository/governance baseline.

Remaining work is documentation only where useful.

**Exit:** We have a stable reference and know what we are building toward.

---

# Phase 1 — FeelJapanK CRM

**CURRENT PHASE**

### Objective

Make Frappe CRM useful for the real FeelJapanK customer relationship workflow before introducing Trip or ERPNext implementation.

### Scope

Design and validate:

1. Customer company / CRM Organization
2. Contacts and contact roles
3. Enquiries — **Request → Intake → Information Gathering → Deal**
4. Lead as an **optional** intake/acquisition concept only (never mandatory; FK-D09)
5. Multiple simultaneous Deals per customer
6. Human-in-the-loop intake: **manual** WhatsApp/email handling with original enquiry evidence preserved (FK-D11); **no** automated WhatsApp intelligence, routing, extraction, or classification in Phase 1
7. Follow-ups
8. Email/WhatsApp communication as manual channels
9. Calls, notes, tasks and activities
10. Customer relationship history
11. The Deal as the **pre-invoice commercial working state** (pre-Trip requirements, supplier quotations/re-quotes, negotiation, written confirmation, CONFIRMED snapshot) — FK-D17
12. CRM-to-Trip handoff concept at the **invoice-triggered** boundary (FK-D15)
13. P01 identity boundary
14. Native Frappe CRM capabilities versus required customization

### Important principle

Do not start by creating fields or custom DocTypes.

First understand how the real workflow maps to the installed CRM.

Prefer native CRM behaviour where it adequately represents the business.

Add customization only where there is a demonstrated business gap.

### Phase 1 shape

Enquiries are frequently **incomplete**; information gathering before downstream operational execution is normal and expected. Phase 1 is **manual / human-in-the-loop**: the human operator determines the Contact, Organization, existing-vs-new Deal, requirements, context and evidence (FK-D11). Original enquiry evidence is preserved.

The exact Deal information-gathering template and detailed mechanics are **not** specified in this roadmap — they belong to the workflow-design task to be performed after the roadmap is reconciled.

### Phase 1 process

Use:

**THINK → BUILD → CHECK**

Use the High-Risk Gate if a CRM design decision changes ownership, architecture, security, or future integration.

### Phase 1 exit

A user should be able to take a realistic FeelJapanK customer interaction from initial enquiry through CRM follow-up and pre-invoice commercial work to the point where the **Trip initiation boundary** (customer invoice creation, FK-D15) is reached.

No ERPNext implementation is required for this exit.

---

# Phase 2 — Trip & Operations

**NEXT AFTER CRM**

### Objective

Represent the actual commercial/operational unit of work: the enduring Trip.

### Scope — Trip/Operations (post-invoice operational unit)

Design and implement as required:

- Trip identity/reference
- operational requirements (from Trip initiation)
- responsible person
- components
- supplier options
- supplier selection
- supplier procurement
- supplier re-quotes (operational)
- amendments
- additional arrangements
- operational status
- during-trip issues/events
- final itinerary
- post-trip report
- client feedback
- completion
- cancellation
- internal expenses
- rough profitability

### Pre-invoice commercial work (not Trip-owned)

Customer quotation, quotation revisions, the confirmed version and negotiation are **pre-invoice commercial work owned by the CRM Deal** (FK-D17). They are designed later as CRM commercial work, **not** moved into Trip/Operations ownership. Whether a future ERPNext-native quotation document is ever introduced is a separate, still-open future decision (see Phase 3).

### Key rule

A Trip is enduring, and is initiated only at customer invoice creation (FK-D15).

Material amendments do not create a new Trip (FK-D03).

Pre-invoice commercial state (quotation/revisions/confirmation) remains with the CRM Deal (FK-D17). When a Trip is initiated, its operational requirements and operational history are Trip-owned from initiation onward (FK-D05); operational revisions/amendments preserve their history against the same Trip.

---

# Phase 3 — ERPNext Commercial & Finance

**DELIBERATELY LATER**

### Objective

Introduce ERPNext when the Trip workflow reaches the point where real commercial and financial transactions need to be controlled.

### Scope

Determine the appropriate native ERPNext model for:

- Customer
- Sales Quotation
- Sales Invoice
- Customer Payment
- Supplier
- Purchase transactions
- Supplier Payment
- expenses
- cancellation/refund consequences
- MYR customer accounting
- JPY operational/commercial values
- historical FX
- profitability

### Business boundaries already established

- CRM Organization is separate from ERPNext Customer.
- ERPNext Customer is created at the customer's first actual ERPNext financial transaction (the first customer invoice), once per accounting/legal party and reused thereafter (FK-D16). It is not created at enquiry, Deal, quotation, written-confirmation, or Trip stage.
- Supplier is created on first actual financial transaction.
- Customer accounting is MYR.
- Operational/commercial pricing uses JPY.
- Historical FX is retained.
- Payment exceptions require Management handling.
- ERPNext should not become the CRM.
- Business quotations are not required to be native ERPNext Quotation documents; whether an ERPNext-native quotation document is ever introduced is a separate, open future decision (FK-D17).

### Important rule

Do not force ERPNext into the workflow before the CRM and Trip models are sufficiently understood.

---

# Phase 4 — CRM / Trip / ERPNext Integration

### Objective

Connect the independently useful systems only where concrete workflow requires it.

Potential flow:

**Request / Enquiry → CRM Deal → Information Gathering → Pre-invoice commercial work → Customer written confirmation → Customer invoice → Trip initiated → ERPNext financial boundary → Operations / fulfilment**

The invoice → Trip transition mechanism is a future design decision and is not specified here. P01 references remain identity references, not a shared operational database.

### Integration principles

- No direct database coupling.
- No shared D1/ERP database.
- No speculative event bus.
- No universal entity registry.
- No generic adapter framework unless a real requirement later justifies one.
- Integration failure must not unnecessarily destroy the ability to operate locally.
- Stable opaque references are preferred over copied identity data.

Integration design is performed only after the underlying systems are independently understood.

---

# Phase 5 — Intelligence & Morning Brief

### Objective

Turn accumulated operational history into useful owner intelligence.

Potential outputs:

- customer trip frequency
- customer value
- quotation revision patterns
- negotiation history
- margin history
- payment timing
- additional-arrangement behaviour
- supplier response/pricing history
- supplier reliability evidence
- cancellations and reasons
- destination/group patterns
- special/VIP requirements
- recurring operational issues
- upcoming exceptions/actions

### Morning Brief

The Morning Brief is a **derived reporting/control layer**, not a master record.

It should be exception-first and understandable in approximately five minutes.

Distinguish:

- facts;
- calculated metrics;
- LLM observations;
- suggestions/recommendations.

LLM output must not invent facts or silently convert observations into authoritative records.

---

# Phase 6 — Production Hardening

Only after the operational workflow is working.

Possible scope:

- production credentials
- authentication
- backups
- restore testing
- deployment
- HTTPS/public endpoints
- WhatsApp production configuration
- monitoring
- failure recovery
- security review
- operational procedures

---

# 7. Explicitly NOT NOW

To prevent drift, the following should not be implemented merely because they may eventually be useful:

- ERPNext configuration before CRM/Trip design reaches the appropriate stage
- Trip DocTypes before the Trip design phase
- P01 integration before a concrete requirement
- generic integration infrastructure
- event bus / broker / queue
- universal entity registry
- universal workflow engine
- speculative synchronization
- duplicated identity fields merely for convenience
- broad CRM customization without a demonstrated workflow gap
- premature AI automation
- mobile operational control
- generalized messaging abstraction

Future requirements can reopen these decisions through the appropriate governance level.

---

# 8. Definition of Done

The project is not considered successful merely because software is installed.

A phase is useful when:

1. the real business workflow can be performed;
2. important history is preserved;
3. ownership boundaries remain clear;
4. the implementation does not create unnecessary coupling;
5. users can understand what to do next;
6. exceptions can be handled;
7. the result is sufficiently verified for its risk level.

---

# 9. Change Control

This document is a project-level reference, not an immutable specification.

Changes should be made when:

- a business decision changes;
- a discovered system constraint invalidates an assumption;
- implementation reveals a genuine design gap;
- a new concrete requirement justifies revisiting a deferred decision.

When changing an important decision, record:

- what changed;
- why;
- affected phase;
- consequences;
- whether previously implemented work needs reconsideration.

Do not silently rewrite historical decisions.

---

# 10. Current Position

**Business requirements:** Consolidated baseline established.

**Architecture:** P01 / CRM / ERPNext boundaries established.

**Frappe CRM environment:** Installed and available.

**CRM implementation:** Not yet designed for FeelJapanK.

**Trip implementation:** Not started.

**ERPNext implementation:** Not started.

**Integration:** Not started.

**Current next action:**

> **Phase 1 — THINK: inspect and design the FeelJapanK CRM workflow against the actual installed Frappe CRM.**

No ERPNext implementation should begin merely because ERPNext is available.

---

## 11. Working Rule

When in doubt, ask:

> **What is the smallest next step that moves the real FeelJapanK workflow forward without prematurely locking us into architecture?**

If the answer is clear, do it.

If the answer could materially affect architecture, stop and use the High-Risk Gate.

---

**End of FeelJapanK Implementation Master Plan v0.1**
