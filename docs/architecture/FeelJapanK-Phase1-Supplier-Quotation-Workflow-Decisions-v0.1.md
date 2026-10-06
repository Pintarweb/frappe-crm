# FeelJapanK Phase 1 — Supplier Quotation Workflow Decisions — v0.1

**Document status:** DECISION RECORD / PLAN — **implementation NOT authorized**
**Repository:** `/home/yusmarin/frappe-crm`
**Provenance:** persisted from PLAN-mode material produced in the current project session (operator decisions `FJK-SQ-D01…D12`). It was not previously stored as a repository artifact.
**Relationship:** extends (does not replace) the Decision Register, Business Requirements v0.2, Workflow v0.1, Master Plan, and the Business Requirements/Capability/Architecture Reconciliation v0.1. It does not modify any FROZEN document.

> **Terminology (two distinct quotation streams, both within `FK-D17`):**
> - **Supplier Quotation** — received from a supplier (pricing/terms offered by that supplier).
> - **Customer Quotation** — the FeelJapanK quotation issued to the customer (versions V1…Vn; the agreed reference labelled **Final Quotation**).

---

## 1. Decision IDs (index)

| ID | Type | Summary |
|---|---|---|
| FJK-SQ-D01 | APPROVED BUSINESS RULE | Supplier quotation validity + reconfirm/requote on expiry |
| FJK-SQ-D02 | APPROVED BUSINESS RULE | Deal Information Gathering Template + reversible **Info Complete** gate |
| FJK-SQ-D03 | OPERATOR BUSINESS INTENT | **Final Quotation** = reproduced reference-of-truth copy (not a V-number); representation OPEN |
| FJK-SQ-D04 | APPROVED BUSINESS REQUIREMENT | Supplier quotation history preservation (no overwrite) |
| FJK-SQ-D05 | OPERATOR-DIRECTED REQUIREMENT | Generate a **Supplier Quotation Request** from Deal information |
| FJK-SQ-D06 | APPROVED DIRECTION | Configurable, versioned **Supplier Request Template Builder** |
| FJK-SQ-D07 | APPROVED DIRECTION | Email the request via **native Frappe email** |
| FJK-SQ-D08 | OPERATOR-DIRECTED ARCHITECTURE DIRECTION | Automated supplier email **reply intake** (mechanism to be planned) |
| FJK-SQ-D09 | MANDATORY EVIDENCE REQUIREMENT | Preserve original supplier email + attachment + structured extraction |
| FJK-SQ-D10 | APPROVED DIRECTION | Extraction = **EXTRACT → REVIEW → CONFIRM** (never auto-trust) |
| FJK-SQ-D11 | APPROVED BUSINESS REQUIREMENT | Support structured data **and** commercial conditions/free-text |
| FJK-SQ-D12 | GOVERNING PRINCIPLE | Flow-critical human findings are Phase 1 flow requirements |

Open implementation questions: `FJK-SQ-Q01…Q14` (§6).

## 2. Approved business rules

### FJK-SQ-D01 — Supplier quotation validity
- Each supplier quotation has **its own validity period**, stated within that quotation; validity applies to that supplier's pricing/terms.
- If the client does not close the Deal before expiry: the **Deal does NOT expire or auto-close**; pricing is **no longer guaranteed**; the operator asks for **reconfirmation/requote**; the **original quotation and its original validity remain preserved**; the reconfirmed quotation becomes the current reference; **history is never overwritten**.
- **Do NOT introduce a generic "Deal Expired" state.**

### FJK-SQ-D02 — Deal Information Gathering Template + reversible Info Complete
- A **Deal Information Gathering Template** guides collection for the particular Deal; it is **not a universal mandatory checklist**; the **operator decides** completeness.
- Flow: Create Deal → Template → operator records information → operator decides complete → clicks **"Info Complete"** → ready-for-quotation → **Create Quotation / Create Supplier Quotation Request enabled**.
- **Before Info Complete, quotation creation is gated.**
- **Info Complete does NOT mean**: customer acceptance; supplier acceptance; quotation confirmation. It means the operator considers the information sufficiently collected to proceed.
- **Info Complete is REVERSIBLE**: reopen → update information → gated again → may re-mark Info Complete. System retains **who/when**. Reopening does not delete quotation history or auto-invalidate supplier quotations.

### FJK-SQ-D04 — Supplier quotation history (approved business requirement)
- **All supplier quotation information retained as history; no overwrite.** Structured retention ultimately includes: supplier; quotation/version; date received; validity; pricing; currency; items/services; requested changes; negotiation events; supplier responses; revised pricing; status; original document; Deal link; Supplier Request link.
- Previous supplier quotations remain historical even after a new one becomes current. **No analytics build now.**

## 3. Operator business intent (representation to be planned)

### FJK-SQ-D03 — Final Quotation
- Business intent: the **Final Quotation** is the latest agreed customer quotation **reproduced/copied and named "Final Quotation"**, not another V-number (e.g., V1→V2→V3→Final Quotation, or a copy of the agreed latest); V3 remains V3; a later agreed version may be reproduced as the new Final Quotation.
- Purpose: recognisable **reference of truth**; commercial reference for invoice.
- **Technical representation is OPEN** (`FJK-SQ-Q11/Q12`). Business distinction preserved: Final Quotation is **not** a V-number.

## 4. Operator-directed requirements

### FJK-SQ-D05 — Supplier Quotation Request
- Generate a **standardized Supplier Quotation Request** from completed Deal information: Deal info → Info Complete → Generate Request → organise/tabulate relevant information → operator reviews → send.
- Relevant sections only (Deal/customer ref; destination/route; dates; duration; pax breakdown; accommodation; transportation; guide; activities/tickets; meals; special/other requirements; information/questions for supplier).

### FJK-SQ-D06 — Supplier Request Template Builder
- The Request uses a **configurable Template Builder**. Deal Information Gathering Template and Supplier Request Template are **different concepts**.
- Configurable: sections; order; headings; Deal fields; tables; explanatory text; optional sections; supplier-specific requirements; layout.
- Template is **versioned**; generated requests retain the template version used; later template changes must not alter already generated/sent requests.

### FJK-SQ-D07 — Native email send
- Email the Request to the supplier using **native Frappe email** unless planning demonstrates a technical reason otherwise. Retain sent-request history (supplier; recipient; date/time; Deal; Request ref; template version; generated document; communication history). Sending ≠ quotation received.

### FJK-SQ-D08 — Automated supplier email reply intake (architecture direction)
- Desired: request sent → supplier replies → system identifies related request/Deal → reply captured → original email preserved → attachments preserved → associated with Deal/Request → extraction begins → operator reviews → operator confirms → supplier quotation enters history. **Mechanism must be planned**; do not assume integration architecture.

### FJK-SQ-D11 — Structured data AND commercial conditions
- Support both **structured data and commercial conditions/free-text** (e.g., pax; dates; accommodation/rooms; transport; driver/guide; entrance fees; meals; expenses; water; tipping; totals; per-person; formulas; conditions/limits). **Do not reduce to a single total price.**

## 5. Evidence-preservation rules

### FJK-SQ-D09 — Original supplier response always saved (mandatory)
- **A. Original email (where available):** sender; recipients; subject; date/time; body; thread/reference.
- **B. Original quotation attachment:** Excel/DOCX/PDF/image/other — available **exactly as received**.
- **C. Structured extracted data.**
- Structured data is **not a replacement**; the original remains the **source evidence**.

### FJK-SQ-D10 — EXTRACT → REVIEW → CONFIRM
- Extract → operator review → correct/confirm → store. OCR may be required for images. **Never UPLOAD → AUTO-TRUST.** Operator remains responsible for confirming commercial data; original preserved after extraction.

## 6. Open implementation questions (PLANNING ONLY)

| ID | Question |
|---|---|
| FJK-SQ-Q01 | Exact structured DocType/model for Supplier Quotation |
| FJK-SQ-Q02 | Supplier Quotation Version model |
| FJK-SQ-Q03 | Relationship between Supplier Quotation Request and Supplier Quotation |
| FJK-SQ-Q04 | Supplier email threading / reply matching in Frappe |
| FJK-SQ-Q05 | How original emails and attachments are preserved |
| FJK-SQ-Q06 | Document extraction / OCR architecture |
| FJK-SQ-Q07 | Human review/confirmation UI for extracted supplier data |
| FJK-SQ-Q08 | Supplier Request Template Builder data model |
| FJK-SQ-Q09 | Template versioning model |
| FJK-SQ-Q10 | Generated request document storage |
| FJK-SQ-Q11 | Exact Final Quotation technical representation |
| FJK-SQ-Q12 | Relationship between Final Quotation and the existing customer quotation/Version/CONFIRMED model |
| FJK-SQ-Q13 | Permissions and audit history |
| FJK-SQ-Q14 | How future analytics will access historical structured supplier quotation data |

## 7. Relationship to existing decisions and boundaries

- **FK-D17** — pre-invoice commercial state (supplier quotations/re-quotes; customer quotation versions V1…Vn; negotiation; written confirmation; CONFIRMED snapshot) is CRM-owned: D01/D04 fit within it; Final Quotation (D03) maps to the customer-side CONFIRMED reference.
- **FK-D12** — any new model must pass the high-risk gate (`STOP → PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFY → EVIDENCE → FREEZE`).
- **FK-D14** — written customer confirmation unchanged; supplier email intake (D07/D08) is a supplier-side flow and must not be conflated with customer confirmation.
- **FK-D15/FK-D16** — Trip begins at invoice; ERPNext from first invoice; unchanged.
- **Phase 2/3 boundary** — in-trip additions; additional invoicing; supplier payment; trip completion; feedback; archival; post-invoice amendments; invoice versioning/transition remain Phase 2/3.
- **WhatsApp boundary** — Phase 1 remains manual/human-in-the-loop; operator uploads supplier material; OCR/extraction may process it; original preserved; operator confirms. No WhatsApp automation.

## 8. No implementation authorization

No application, DocType, schema, migration, email, data, or frontend change is authorized. All capabilities require a subsequent, explicitly authorized Capability/Architecture PLAN passing the FK-D12 gate.
