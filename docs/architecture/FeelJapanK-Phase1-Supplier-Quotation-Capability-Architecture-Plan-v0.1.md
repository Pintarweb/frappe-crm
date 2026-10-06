# FeelJapanK Phase 1 — Supplier Quotation Capability / Architecture Plan — v0.1

**Document status:** PROPOSED / PLAN — **implementation NOT authorized**
**Repository:** `/home/yusmarin/frappe-crm`
**Provenance:** persisted from PLAN-mode material produced in the current project session. Not previously stored as a repository artifact.
**Companion:** `FeelJapanK-Phase1-Supplier-Quotation-Workflow-Decisions-v0.1.md` (business decisions).

> All dispositions and recommendations below are **PROPOSED** unless the companion decision record marks them APPROVED. Native-first per `FK-D12`; customizations are candidates only and require the high-risk gate.

## 1. Executive architecture assessment
Native-first is viable for the **request → email → reply capture → evidence** chain (native Print Format/Builder, native Email Account inbound, native Communication threading, native File) and for the Deal-side gathering/gate (existing D1 fields). Genuine gaps require **minimal custom** DocTypes for Supplier Quotation / Version / Request, **template versioning**, and **extraction review/confirm**. Extraction/OCR/LLM is a **future integration**. Final Quotation representation is **OPEN**.

## 2. Capability inventory
CAP-01 Deal Information Gathering Template · CAP-02 reversible Info Complete gate · CAP-03 Supplier Quotation Request · CAP-04 Request Template Builder · CAP-05 Template versioning · CAP-06 native email send · CAP-07 automated reply intake · CAP-08 original email/attachment preservation · CAP-09 document extraction · CAP-10 OCR/image extraction · CAP-11 review/confirm · CAP-12 structured Supplier Quotation · CAP-13 Supplier Quotation version/history · CAP-14 validity/expiry/reconfirm · CAP-15 negotiation/requote history · CAP-16 customer quotation / Final Quotation relationship · CAP-17 Deal operational context.

## 3. Current native / FJK capability map (verified read-only)
- **FJK app:** 9 DocTypes (FJK Quotation[+Version(submittable), Version Item, Confirmation, Negotiation Entry]; FJK Deal Component/Requirement Line/Guide Requirement/Activity Item); APIs; D1 custom fields on `CRM Deal`; Workspace; Desk Page `fjk-workspace`; Vite bundle.
- **Native Frappe:** `Print Format` + **Print Format Builder**; `Email Template`; `Email Account` (incoming IMAP, `append_to`, `email_sync_option`); inbound parser `frappe/email/receive.py` (Message-ID / In-Reply-To, attachments, `Communication.reference_doctype/reference_name`); `Communication`; `File`.
- **Absent:** no OCR/LLM/parsing app; no supplier-quotation model; no template versioning; no extraction.

## 4. Gap analysis (native · FJK · gap · disposition)
| CAP | Disposition |
|---|---|
| CAP-01 | Native/existing (D1) |
| CAP-02 | Minimal custom field + audit on `CRM Deal` |
| CAP-03 | Custom DocType (justified) |
| CAP-04 | Native Print Format Builder + custom template record |
| CAP-05 | Custom (native Print Formats are mutable) |
| CAP-06 | Native (`sendmail` + reference) |
| CAP-07 | Native-first; integration only if native proves insufficient |
| CAP-08 | Native (Communication/File) + minor link fields |
| CAP-09/CAP-10 | Future integration (PLAN only) |
| CAP-11 | Custom status + review UI |
| CAP-12/13/15 | Custom DocTypes/versions (mirror existing customer-quotation pattern) |
| CAP-14 | Custom validity fields; computed + stored |
| CAP-16 | OPEN (see companion and the Customer Quotation plan) |
| CAP-17 | Extend D1 (evidence-backed fields only) |

## 5. Candidate data model (PROPOSED)
```
CRM Deal (native) + D1 fields + fjk_info_complete (reversible, audited)
 ├─ FJK Supplier Quotation Request  (custom) ─ template/version ─ generated file ─ sent Communication
 │     └─ FJK Supplier Quotation     (custom: deal + request)
 │            ├─ FJK Supplier Quotation Version (submittable: validity, pricing, items, source doc)
 │            │     └─ FJK SQ Version Item (child)
 │            └─ FJK Supplier Quotation Negotiation Entry (child)
 ├─ (existing customer side) FJK Quotation → Version → CONFIRMED → Final Quotation (TBD)
 Files (native) ↔ originals + extraction artifacts ; Communication (native) ↔ email thread
```
Supplier Quotation and Customer Quotation are **deliberately separate** DocTypes.

## 6–13. Architecture notes (PROPOSED)
- **Request (CAP-03):** Deal link; template link; status; generated file; send log; only relevant sections.
- **Template Builder (CAP-04/05):** native Print Format Builder for layout; custom versioned template record; generated requests retain template+version+output (later changes never alter historical requests).
- **Email (CAP-06):** native `Email Account` + `Communication` + `Email Template`; Message-ID/In-Reply-To native.
- **Reply intake (CAP-07):** native inbound IMAP + threading; **risk**: matching to a custom Request DocType; edge cases (unmatched/duplicate/spoofed, off-thread replies). Integration only if native insufficient.
- **Evidence (CAP-08):** original email → `Communication`; original attachment → `File` (immutable source); structured extraction → custom fields on the version (status/reviewer/corrections/confirmed).
- **Extraction/OCR (CAP-09/10):** deterministic parsers (openpyxl/python-docx/pdf) and OCR not installed; external service/model = future integration.
- **Versioning (CAP-13):** parent Supplier Quotation + submittable immutable versions; `requote_of`/`previous_version`; negotiation child.
- **Validity (CAP-14):** `validity_from/to` + computed state; expiry → no Deal-Expired; reconfirm → new version; original preserved.

## 14. Info Complete state model (PROPOSED)
State field on `CRM Deal` + audit (who/when). Gating enforced in creation APIs; reopen gates again; reopening does not delete quotation history or auto-invalidate supplier quotations; permissions: Sales User/Manager/System Manager.

## 15. Final Quotation architecture comparison (OPEN — decision pending)
Models considered: (A) separate immutable snapshot; (B) derived document from CONFIRMED; (C) state/marker on confirmed version; (D) other. Trade-offs across historical integrity, auditability, invoice reference, later amendment, duplicate risk, analytics, operator clarity. **Candidate (PROPOSED, not decided):** B — derive/render from the agreed CONFIRMED customer version, preserving the source. No model frozen.

## 16. Deal operational-context model (PROPOSED)
Capability (evidence-backed): scope/category; detailed pax; relevant requirements; status; next action; Contact↔Deal context; correct-Deal identification; supplier quotation state; waiting-for-supplier; validity/reconfirmation state. Visual treatments (flags/dashboards/list styling) remain **design decisions**.

## 17. Permissions / audit (PROPOSED)
Reuse CRM Sales User/Manager + System Manager; FJK records mirror Deal access. Audit: Info Complete/reopen; version creation; confirmation; supplier quotation receipt; extraction review/correction/confirm; template change; request send; reply association.

## 18. Migration / data impact
**No migration/backfill** (default). New DocTypes start empty; existing `CRM Deal` links only; existing test records untouched; a new controlled test record may be needed later (separately approved).

## 19. FK-D12 high-risk gate
For each custom item: why native insufficient; gap; minimal customization; upgrade risk; data/security risk; alternative considered. Alternatives (Print Format-only, `Communication`-only, Deal notes) judged insufficient for structured, immutable, versioned history (FJK-SQ-D04/D09/D11).

## 20. Dependencies
Deal D1; Info Complete state; Print Format Builder; Email Account config; Communication/File; existing customer quotation model; permission model.

## 21. Risks
Email threading dependability; unmatched/duplicate replies; extraction accuracy/operator dependency; template-versioning correctness; scope creep into Trip; FK-D17 alignment; FK-D12 gate; upgrade impact of new DocTypes.

## 22. Implementation sequencing (post-approval)
1) Decisions (Final Quotation; Info Complete representation; template versioning). 2) Capability PLAN split: Request+template+email (native) → Supplier Quotation+Version+validity/history → evidence → extraction (later). 3) Each via BUILD → VERIFY → EVIDENCE → FREEZE. Extraction/OCR as a separate later authorization.

## 23. Test / evidence strategy (eventual BUILD)
Automated: version immutability; validity computation; gate enforcement incl. reopen; template-version retention; evidence linkage. Manual UX (operator): Deal→Info Complete→Request→email→reply capture→extract/review/confirm→history. Evidence additive; baseline preserved.

## 24. Not authorized
No code/DocType/schema/migration/frontend/route/permission change; no email account change or send; no extraction/OCR/LLM; no Template Builder; no supplier quotation data; no test data; no commit/push. Trip/invoice remain Phase 2/3; WhatsApp stays manual.

## 25. Reconciliation items (do not silently edit frozen docs)
Record FJK-SQ decisions in Operating Convention / Reconciliation; reconcile FJK-SQ-D08 with automation-deferral statements; map Final Quotation ↔ FK-D17 CONFIRMED.
