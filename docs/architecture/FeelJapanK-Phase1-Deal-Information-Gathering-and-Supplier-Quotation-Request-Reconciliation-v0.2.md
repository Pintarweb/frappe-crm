# FeelJapanK Phase 1 — Deal Information Gathering & Supplier Quotation Request — Reconciliation — v0.2

**Document status:** CURRENT / RECONCILIATION PLAN — **implementation NOT authorized**
**Workstream:** `CRM Deal → Deal Information Gathering → Info Complete → Supplier Quotation Request → Email → Supplier Reply → Supplier Quotation Intake`
**Repository:** `/home/yusmarin/frappe-crm`
**Nature:** controlled v0.2 reconciliation. Adds the current understanding and the **itinerary-in-Deal-Info-Gathering** clarification. Does **not** modify any historical v0.1 artifact.

---

## 1. Provenance / source documents

**Historical (unchanged):**
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Workflow-Decisions-v0.1.md`
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Capability-Architecture-Plan-v0.1.md`
- `docs/architecture/FeelJapanK-Phase1-Customer-Quotation-Itinerary-Generation-Capability-Plan-v0.1.md`
- `docs/architecture/FeelJapanK-Phase1-Quotation-Itinerary-Continuity-Addendum-v0.2.md`
- Raw captured chat/source artifacts: `docs/reference/source-artifacts/Pasted text(20260930-143952).txt`, `docs/reference/source-artifacts/Pasted markdown (2).md` (see `docs/reference/source-artifacts/README.md`).
- Skill/source: `docs/reference/feel-japan-quotation/SKILL.md`; samples `docs/reference/revised_Tokyo-Osaka_Quotation_Sep2026.docx`, `docs/reference/9.24-10.1 Itin.docx`, `docs/reference/Feel_Japan_K_letterhead.docx`.

**Authorities:** Decision Register (`FK-D12/D14/D15/D16/D17`); `docs/operations/FeelJapanK-Phase1-Deal-Information-Gathering-Template-v0.2.md`; `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.2.md`; `docs/operations/FeelJapanK-Phase1-Native-CRM-Pilot-Operating-Convention-v0.1.md`.

> The raw chat artifacts are **historical evidence**, not implementation specifications, and do not override frozen decisions. Where later clarification changed an earlier working assumption, both are preserved.

## 2. Purpose and scope

Define the **Deal Information Gathering capability** sufficiently to eventually support: creating a **Supplier Quotation Request** from collected Deal information; reviewing it; emailing it; receiving the supplier reply; preserving the original response as evidence; extracting/entering the supplier quotation for **operator review and confirmation**; and retaining **supplier quotation history/version/validity**.

**Out of scope here:** Customer Quotation generation, Final Quotation, Trip/invoice integration, email-inbound implementation, OCR/LLM, Template Builder implementation. Those remain later/other workstreams.

## 3. Current workflow (workstream)

```
CRM Deal
 → Deal Information Gathering
 → Operator determines information is sufficiently complete
 → Info Complete
 → Create Supplier Quotation Request
 → Operator reviews request
 → Send Supplier Quotation Request by email
 → Supplier replies
 → Capture/preserve supplier reply
 → Preserve original email and attachments
 → Extract/enter supplier quotation information
 → Operator reviews extracted/entered information
 → Confirm Supplier Quotation
 → Supplier Quotation history / version / validity
```

Explicitly **not** the immediate target: Customer Quotation / Final Quotation / Trip.

## 4. Deal Information Gathering (capability) — ESTABLISHED

Guides the operator to collect enough information for the **specific** Deal. Requirement domains (where applicable): Deal/request context; shared trip context; requested scope/components; accommodation; transportation; tour guide; activities/tickets; meals; flights; special requirements; other requirements; evidence/source information; changes; information status; next action; readiness for quotation.

Requirement states preserved: **KNOWN · MISSING · TO CONFIRM · CUSTOMER-CONFIRMED · NOT APPLICABLE**.

Rule: **no universal mandatory checklist**; the **operator determines** sufficiency for the particular request (see `FJK-SQ-D02`).

## 5. Itinerary is part of Deal Information Gathering — NEW RECONCILIATION [ESTABLISHED intent]

**Reconciliation:** itinerary/travel-plan information **belongs within Deal Information Gathering** and must be available as part of the information used to prepare the Supplier Quotation Request. It is **not** treated as a completely separate later capability.

The Deal may receive: an itinerary from the customer; itinerary information from an agent; raw travel information; partial itinerary information; dates/routes/destinations; day-by-day travel information; requested activities/services; other travel-plan information.

Deal Information Gathering must therefore provide an appropriate place/process to **capture and structure itinerary/travel-plan information** as part of the Deal's requirements.

**Conceptual continuity:**
```
Original customer/agent itinerary or raw travel information
 → Deal Information Gathering
 → Structured/working Deal information including itinerary/travel plan
 → Supplier Quotation Request
 → Supplier-facing request containing the relevant itinerary/travel-plan information
 → Operator review
 → Supplier email
 → Supplier reply
```

The supplier-facing itinerary/request is therefore **derived from** the information collected during Deal Information Gathering.

**Provenance layers (conceptual; model OPEN):**
1. Original customer/agent/raw itinerary information.
2. Structured/working itinerary information within the Deal.
3. Supplier-facing itinerary/request information prepared from the Deal information.

**Explicit non-decisions:** do **not** decide how the transformation happens; do **not** assume Claude/OpenAI/DeepSeek/any LLM/AI/automation platform/document-generation service/prompt workflow. The operator's use of Claude is **operational context only**, **not** an approved FeelJapanK architecture component. The mechanism and the final itinerary data model remain **OPEN**.

## 6. Info Complete — ESTABLISHED

**Definition:** the operator considers the Deal information **sufficiently complete for the specific request** to proceed to a Supplier Quotation Request.

**Does NOT mean:** customer accepted the quotation; supplier accepted the request; supplier quotation confirmed; customer quotation confirmed; Deal Won; Trip started.

**Properties:** operator-controlled; **reversible**; auditable (who/when where the architecture supports it). The presence of an itinerary is considered **where relevant** to the Deal — **no universal itinerary requirement**.

## 7. Supplier Quotation Request — direction preserved; structure OPEN

Created from collected Deal information; may include: customer/company context; request scope; group composition; dates/timeframe; itinerary/travel-plan information; requested services/components; accommodation; transportation; activities; meals; guide requirements; special requirements; questions/clarifications; supplier-specific requirements.

A configurable/template-driven presentation and a **versioned Supplier Quotation Request Template Builder** direction are **preserved** (see `FJK-SQ-D05/D06`). **Do not implement or finalize the builder or the document structure in this task**; the final structure is **OPEN**.

## 8. Supplier email workflow — direction preserved

```
Supplier Quotation Request → Operator review → Native Frappe email → Supplier receives
 → Supplier replies → reply associated with the correct request/Deal
 → Original email preserved where available → Original attachment preserved
 → Supplier quotation information extracted/entered → Operator reviews → Supplier Quotation confirmed
```
Rule preserved: **EXTRACT → REVIEW → CONFIRM** (never auto-trust). The original supplier document remains **evidence** and must not be replaced by structured extracted data (`FJK-SQ-D09/D10`).

## 9. Supplier quotation history / validity — ESTABLISHED direction

Supplier quotations have their own **validity periods**; history retained; versions never overwrite; expiry does **not** create a generic "Expired Deal"; operator may request **reconfirmation/requote**; original quotation remains historical evidence; the new quotation becomes the current reference once received/confirmed. Preserve **structured information plus commercial/free-text conditions** (`FJK-SQ-D01/D04/D11`).

## 10. Customer Quotation / Final Quotation boundary — preserved (not implemented)

For planning continuity only: `Supplier Quotation → internal commercial processing → Customer Quotation V1…Vn → Final Quotation → invoice/Trip boundary`. The **exact technical representation of Final Quotation remains OPEN** (`FJK-SQ-D03`, `FJK-SQ-Q11/Q12`). Not implemented or frozen here.

## 11. Classifications

**Established decisions (preserved):** `FJK-SQ-D01…D12` as recorded in the v0.1 decision record; Deal Info Gathering domains/states and operator-determined sufficiency; itinerary-in-Deal-Info-Gathering business requirement; Info Complete definition/reversibility; supplier quotation history/validity; EXTRACT→REVIEW→CONFIRM; evidence preservation.

**Current working assumptions:** itinerary provenance layers (conceptual); supplier quotation request derived from Deal info; native Frappe email as the sending direction.

**PROVISIONAL / CHAT-ONLY (NOT promoted):** adjustable quotation markup; tipping default JPY 500/person/day; optional meal/add-on pricing treatment; any other skill-rule amendments.

**OPEN (unresolved, do not silently resolve):** currency/FX; exact markup basis/override; Final Quotation technical representation; exact itinerary technical data model; exact mechanism for producing the supplier-facing itinerary/request; generation service/provider; any AI/LLM involvement; supplier email threading/reply-matching details; template builder data model and versioning; generated request storage; permissions/audit specifics.

## 12. Reconciliation items (PLAN; do not silently edit frozen/authority docs)

- Note the **itinerary-in-Deal-Info-Gathering** reconciliation in the Operating Convention and the Deal Information Gathering Template authority at the next governed review.
- Reconcile `FJK-SQ-D08` (supplier email reply intake) with prior automation-deferral statements.
- Record the `Final Quotation ↔ FK-D17 CONFIRMED` mapping as pending.
- Keep the raw source artifacts unchanged; reference only.

## 13. No implementation authorization

No application code, DocType, schema, database, CRM record, runtime config, email config, migration, or inbound/AI processing is authorized. This is documentation/reconciliation only.
