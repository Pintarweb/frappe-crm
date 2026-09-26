# FeelJapanK — Decision Register

**Project:** FeelJapanK
**Subject:** Cross-project Decision Register (index)
**Version:** v0.1
**Status:** FROZEN (register). Individual entries carry their own status.
**Nature:** Index of settled decisions. **Not** a replacement for the detailed authority documents; each entry points to its authority source.

---

## 1. Decision Lifecycle

`PROPOSED → DECIDED → FROZEN → SUPERSEDED`

- **PROPOSED** — candidate decision under discussion. Not authoritative.
- **DECIDED** — the business/architecture decision has been explicitly accepted, but authority reconciliation/freeze is not yet complete.
- **FROZEN** — reconciled with the authority chain and now authoritative.
- **SUPERSEDED** — a previously FROZEN decision deliberately replaced by a later FROZEN decision; the historical record is preserved.

### Frozen-decision rule

> A **FROZEN** decision is authoritative and must not be silently reopened, reinterpreted, or contradicted.

A later conversation statement does **not** silently supersede a FROZEN decision. If future work conflicts with a FROZEN decision:

`STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE`

Do not silently choose between conflicting business rules.

---

## 2. Authority Hierarchy

1. Explicitly FROZEN authority (architecture freezes and approved directions).
2. Business Requirements (`FeelJapanK-Business-Requirements-Consolidation-v0.2.md`, `Field-Japan-K-Business-Workflow-Requirements-v0.1.md`).
3. Detailed architecture/reference documents (`docs/architecture/*`).
4. Operations / SOP documents (`docs/operations/*`).
5. Implementation Master Plan (`FeelJapanK-Implementation-Master-Plan-v0.1.md`).
6. This Decision Register — index over items 1–5.
7. Working notes / assessments / conversation context.

If authority documents conflict, the conflict is **reported and resolved through controlled governance**, never silently guessed.

---

## 3. Change Control

Changes to a FROZEN decision are recorded per Master Plan §9 Change Control (what changed, why, affected phase, consequences, reconsideration of prior work). Historical decisions are never silently rewritten.

---

## 4. Register

| ID | Decision | Status | Authority / source | Scope & implementation implication |
|---|---|---|---|---|
| FK-D01 | Deal = one commercial opportunity/enquiry container | FROZEN | Opportunity-Start & Lead Usage Rule (FROZEN); v0.2 §23 | CRM opportunity is the Deal; one Deal per enquiry/opportunity. |
| FK-D02 | Trip = enduring commercial/operational unit, owned outside CRM | FROZEN | v0.2 §1, §23; Workflow §3 | Trip is a downstream layer; not implemented in CRM. |
| FK-D03 | Requirement changes/negotiations/quotation revisions do not create a new Trip; a genuinely new request does | FROZEN | v0.2 §1–§2 | New request → new Deal; revisions stay on the same opportunity. |
| FK-D04 | CRM owns relationship + enquiry context | FROZEN | v0.2 §23 | CRM holds contacts, organization, enquiry/opportunity context. |
| FK-D05 | Trip/Operations owns Trip requirements + operational history | FROZEN | v0.2 §23; Workflow | Operational requirements/history belong to the future Trip layer **from Trip initiation onward** (FK-D17: pre-invoice requirements are CRM Deal-owned). |
| FK-D06 | ERPNext later owns authoritative financial/accounting records | FROZEN | v0.2 §23 | No second ledger in CRM/Trip. |
| FK-D07 | P01 canonical for Contact/Company identity; CRM downstream | FROZEN | ArkAlliance Reference Conventions; v0.2 §23 | No P01 integration now; no direct P01 refs in Lead/Deal. |
| FK-D08 | CRM Organization ≠ ERPNext Customer; controlled mapping | FROZEN | v0.2 §14 | Keep entities separate; do not sync all fields. ERPNext Customer creation timing is now governed by **FK-D16** (FROZEN); mapping mechanics remain open. |
| FK-D09 | Lead = optional CRM intake/acquisition, not a business object | FROZEN | Opportunity-Start & Lead Usage Rule | Lead never mandatory; known customer bypasses Lead; incomplete ≠ not an opportunity. |
| FK-D10 | Communication context: Contact = person; explicit context = Deal; phone not authoritative for Deal | FROZEN | Communication Context Rule (FROZEN) | Explicit context wins; phone is fallback only; no silent Deal guessing. |
| FK-D11 | Phase 1 manual human-in-the-loop intake | FROZEN | Phase 1 Manual Communication Intake Direction | Human determines contact/org/deal/evidence; WhatsApp automation deferred. |
| FK-D12 | Prefer native CRM; no broad customization without demonstrated gap | FROZEN | Master Plan §7 | No custom fields/DocTypes without a demonstrated business gap. |
| FK-D13 | Frozen environment/security baseline | FROZEN | `docs/versions.lock`; Environment Foundation Freeze; G12 HMAC Guard Freeze | frappe 15.121.1 / crm 1.84.0 / frappe_whatsapp 1.0.12 / ark_whatsapp_guard 0.0.1; HMAC guard is the security control. |
| FK-D14 | Written WhatsApp/email confirmation is sufficient commercial evidence; manual marking; auto-detection deferred | FROZEN | v0.2 §6; Workflow §12 | Preserve the written confirmation as evidence. |
| **FK-D15** | **Trip Initiation Boundary — a Deal becomes a Trip when the customer invoice is created**; written confirmation precedes invoice creation as evidence; quotation confirmation alone does not initiate a Trip | **FROZEN** | Owner decision reconciled into v0.2 §1/§6/§9, Workflow §3/§12, SOP §12 | Invoice creation is the authoritative Trip trigger. Not Deal Won, not payment, not quotation confirmation. |
| **FK-D16** | **ERPNext Customer Creation Timing** — an ERPNext Customer is created when the customer first needs to participate in an actual ERPNext financial transaction (the customer's first invoice), once per accounting/legal party, and reused for all later Deals and Trips; not at enquiry, Deal, quotation, or written-confirmation stage; creation coincides with or immediately precedes invoice creation, never after | **FROZEN** | v0.2 §14, §15 (supplier-master precedent); FK-D06, FK-D08, FK-D15; FK-D16 assessment | Implementation deferred. Existing Customer reused; a new Deal, a new Trip, an abandoned enquiry, or a quotation does not create a new Customer. |
| **FK-D17** | **Pre-Invoice Commercial Ownership** — the pre-invoice commercial state of a Deal (enquiry, pre-Trip requirements, supplier quotations/re-quotes, customer quotation versions V1..Vn, negotiation history, written confirmation evidence, CONFIRMED snapshot) is owned by Frappe CRM (the Deal); not by Trip/Operations (no Trip before invoice, FK-D15) and not by ERPNext; when a Trip is initiated, operational requirements/history become Trip-owned (FK-D05), while CRM retains the pre-invoice commercial history and CONFIRMED snapshot as historical commercial record | **FROZEN** | FK-D01, FK-D04, FK-D05, FK-D06, FK-D15; v0.2 §4–§6; Workflow §10–§12, §31 | Implementation/data model deferred. Business quotations are not required to be native ERPNext Quotation documents. A future decision to require ERPNext-native quotations would need controlled revision. |

---

## 5. Maintenance

- New decisions are added with an explicit status and a named authority source.
- No entry is added without an establishable status and source.
- Do not invent decisions to make the register look complete; unresolved items are recorded as `PROPOSED`.

---

## 6. Governance Checkpoint — FK-D15 (FROZEN)

**Status:** FROZEN governance checkpoint.
**Verified:** CHECK / VERIFY PASS at repository HEAD `3fa81cebfc57e723172d894a1791a1de2020403e` (governance-only; no application/config/schema/integration change).

**Canonical rule:** A Deal becomes a Trip when the customer invoice is created. Customer written confirmation via WhatsApp/email precedes invoice creation and is retained as commercial evidence. Quotation confirmation alone does not initiate a Trip. Creation of the customer invoice is the authoritative trigger for initiating the Trip.

**Supporting boundaries:**
- Customer written confirmation via WhatsApp/email precedes invoice creation.
- Written confirmation is retained as commercial evidence.
- Quotation confirmation alone does not initiate a Trip.
- Customer confirmation of a quotation does not itself create the Trip.
- Payment does not initiate the Trip.
- Customer invoice creation is the authoritative Trip initiation trigger.

**Canonical sequence:**
`Deal / Enquiry → Quotation / Negotiation → Customer written confirmation → Customer invoice created → Trip initiated → Payment → Supplier commitment → Fulfilment → During-trip → Post-trip → Closure → Completed`

**Related decisions:**
- FK-D16 (ERPNext Customer creation timing) — **FROZEN**.
- FK-D17 (pre-invoice quotation versions / CONFIRMED snapshot / pre-Trip requirements ownership) — **FROZEN**.

**Trip implementation:** DEFERRED. This checkpoint authorizes no implementation.

**Enforcement:** `docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md` and root `AGENTS.md` require the Decision Check before every PLAN and BUILD.

---

## 7. Governance Checkpoint — FK-D16 & FK-D17 (FROZEN)

**Status:** FROZEN governance checkpoint.
**Verified:** BUILD reconciliation at repository HEAD `3fa81cebfc57e723172d894a1791a1de2020403e` (governance-only; no application/config/schema/integration change).

### FK-D16 — ERPNext Customer Creation Timing (FROZEN)

> An ERPNext Customer is created when the customer first needs to participate in an actual ERPNext financial transaction — concretely, at the creation of the customer's first invoice — and is created once per accounting/legal party and reused for all later Deals and Trips. It is not created at enquiry, Deal, quotation, or written-confirmation stage. Customer creation coincides with or immediately precedes invoice creation; it is never after it.

- **Rationale / authority:** v0.2 §14 (CRM Org ≠ ERPNext Customer; reuse) and v0.2 §15 (party master created at first actual financial transaction); FK-D06 (ERPNext financial ownership); FK-D08 (controlled mapping).
- **Relationship to FK-D15:** the first invoice is the FK-D15 Trip-initiation event; the ERPNext Customer exists at that boundary.
- **Relationship to FK-D17:** because pre-invoice quotations are CRM owned (FK-D17), no ERPNext Customer is required before invoice.
- **Implementation:** DEFERRED (no integration designed).

### FK-D17 — Pre-Invoice Commercial Ownership (FROZEN)

> The pre-invoice commercial state of a Deal — enquiry, pre-Trip requirements, supplier quotations and re-quotes, customer quotation versions (V1..Vn), negotiation history, written customer confirmation evidence, and the CONFIRMED snapshot — is owned by Frappe CRM (the Deal) as CRM commercial/enquiry context. It is not owned by the Trip/Operations layer (which does not exist before invoice creation, FK-D15) and not owned by ERPNext. ERPNext owns financial masters and financial/commercial documents only from the financial boundary (first customer invoice; FK-D16). When a Trip is initiated, operational requirements and operational history become Trip/Operations-owned (FK-D05), while CRM retains the pre-invoice commercial history and the CONFIRMED snapshot as the historical commercial record. Business quotations are not required to be native ERPNext Quotation documents.

- **Rationale / authority:** FK-D01/FK-D04 (Deal owns opportunity/enquiry context); FK-D15 (no Trip pre-invoice); FK-D05 (Trip owns operational state from initiation); FK-D06 (ERPNext financial only); v0.2 §4–§6, §23; Workflow §10–§12, §31.
- **Relationship to FK-D15:** compatible; pre-invoice state has a home (CRM Deal) precisely because the Trip does not yet exist.
- **Relationship to FK-D16:** confirms no pre-invoice ERPNext Customer/quotation document is required.
- **Implementation / data model:** DEFERRED. Does not prescribe Frappe DocTypes; does not prohibit a future explicit decision to introduce ERPNext-native quotation documents (which would require controlled revision).

---

## 8. Open / Deferred Decisions (not frozen)

The following remain explicitly OPEN / PROPOSED / DEFERRED and must not be treated as decided:

- quotation representation / mechanics in CRM;
- whether any future ERPNext-native quotation document is introduced;
- invoice ownership (which layer creates the customer invoice);
- Customer mapping mechanics;
- P01 Company ↔ CRM Organization ↔ ERPNext Customer mapping implementation;
- CRM → ERPNext integration mechanics;
- invoice → Trip creation mechanism;
- exact transition of requirements from CRM Deal to Trip;
- Trip/Operations data model;
- ERPNext implementation;
- supplier integration.

**Identity rule (preserved):** `P01 Company ≠ CRM Organization ≠ ERPNext Customer`, with distinct ownership — P01 canonical identity, CRM relationship context, ERPNext financial/accounting master. One accounting/legal party may have one P01 Company, one CRM Organization, one ERPNext Customer, and many Deals, Trips, and Contacts. No universal identity registry; no mapping implemented.
