# FeelJapanK — End-to-End Data-to-Quotation Architecture Decision — v0.1

| Field | Value |
|---|---|
| Document | `FeelJapanK-End-to-End-Data-to-Quotation-Architecture-Decision-v0.1` |
| Project | FeelJapanK |
| Version | v0.1 |
| Status | **PLAN / READ-ONLY — ARCHITECTURAL DECISION RECORD — NO BUILD AUTHORIZATION** |
| Nature | Architecture reconciliation record. Records an operator-directed end-to-end architectural direction, reconciles it against existing authorities, and identifies conflicts and open questions. **Authorizes no implementation.** |
| Repository | `/home/yusmarin/frappe-crm` |
| Date | 2026-10-06 |
| Supersedes | Nothing. This document does not modify, reopen, or reinterpret any FROZEN decision. |
| Relationship | Extends the analysis in `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` and the Phase 1 supplier/customer quotation planning artifacts. Where this direction conflicts with a FROZEN decision, the conflict is **reported, not silently resolved** (see §26). |

> **Reading rule.** This document records an *intended architecture direction*. Statements marked as direction are **operator-approved direction**, not FROZEN architecture, until they pass the governance path in §20/§24. Statements about existing decisions cite their authority. Where the two disagree, §26 governs.

---

## 1. Status

- **MODE:** PLAN / READ-ONLY.
- **Document class:** ARCHITECTURAL DECISION RECORD (direction + reconciliation + gap register).
- **BUILD authorization:** **NONE.** This document does not authorize code, DocTypes, schema, custom fields, migrations, integrations, AI, supplier automation, customer quotation automation, or roadmap modification.
- **Freeze status:** **NOT FROZEN.** This is a `PROPOSED` / operator-approved *direction* record. Formal FROZEN status requires controlled review, explicit approval, and reconciliation with the frozen roadmap (`FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md`).
- **Scope of change made by this document:** documentation only. No source, schema, database, CRM, configuration, build, commit, or push (§25).

---

## 2. Origin of the change

### 2.1 The override

The operator has **explicitly overridden** the previous Phase 1 constraint that AI automation was deferred. Under the new direction:

- **AI-assisted interpretation/extraction with mandatory human approval is now part of the intended Phase 1 / end-to-end workflow.**

This is a deliberate operator decision. It is recorded here as the origin of the change so that the historical position is preserved rather than silently rewritten.

### 2.2 The previous constraint being overridden

The prior constraint is recorded in the authority chain:

- **`FK-D11` (FROZEN)** — *"Phase 1 manual human-in-the-loop intake… WhatsApp automation deferred."* (`docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`).
- **Implementation Master Plan** — *"Human-in-the-loop intake: **manual** WhatsApp/email handling with original enquiry evidence preserved (FK-D11); **no** automated WhatsApp intelligence, routing, extraction, or classification in Phase 1"* (`docs/business/FeelJapanK-Implementation-Master-Plan-v0.1.md` §Phase 1 design requirements, item 6).
- **Implementation Master Plan §7 (Explicitly NOT NOW)** — *"premature AI automation"*.
- **`docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md`** — Phase 1 operating model is manual; automation is deferred and designed *around* a proven workflow.
- **`docs/architecture/FeelJapanK-Phase1-Deal-Information-Gathering-and-Supplier-Quotation-Request-Reconciliation-v0.2.md` §5** — explicit non-decision: do not assume any LLM/AI/automation platform; the operator's use of Claude is *operational context only*, not an approved architecture component.

### 2.3 Reconciliation obligation (do not silently rewrite)

The frozen roadmap and `FK-D11` **must not be silently rewritten**. Per the Decision Register §1 frozen-decision rule:

> A later conversation statement does **not** silently supersede a FROZEN decision. If future work conflicts with a FROZEN decision: `STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE`.

Therefore this document:

1. records the operator override as the **origin of the change**;
2. documents the conflict with `FK-D11` and the Master Plan Phase 1 constraint;
3. marks the conflict as **requiring explicit roadmap/architecture approval before any BUILD** (§20, §26);
4. does **not** edit or reopen `FK-D11` or any FROZEN artifact.

---

## 3. AI interpretation model

### 3.1 Sources of customer communication

Customer communication may originate from any of:

- WhatsApp;
- email;
- attachments;
- audio / voice notes;
- documents (itineraries, PDFs, images, spreadsheets);
- manual operator input.

### 3.2 AI role

- AI **interprets / extracts** a **proposed** structured representation of the communication.
- AI output is a **proposal**, not authoritative data.
- AI **does not** silently create, update, or overwrite authoritative CRM data.
- AI **confidence is not equivalent to human approval**. A high-confidence extraction is still only a proposal until a human approves it.

### 3.3 Mandatory human control

For every AI-derived item:

- **human review is mandatory;**
- the operator may **approve, correct, reject, or defer**;
- only after explicit human approval does the value become authoritative CRM data;
- rejection/correction is itself part of the record (the AI proposal and the human disposition are both retained).

This preserves the established principle already present in the authority chain:

> *"LLM-derived intelligence must distinguish **Evidence → Observation → Suggestion** and must not invent subjective labels."* (`FeelJapanK-Business-Requirements-Consolidation-v0.2.md` §LLM).
> *"LLM output must not invent facts or silently convert observations into authoritative records."* (Master Plan, Morning Brief principle.)

The new direction **extends** this principle from reporting to **intake and extraction**, gated by human approval.

---

## 4. Mandatory provenance

Every AI-derived data item **must** retain an easily accessible **source reference**. The operator must be able to navigate from an authoritative CRM value **back to the original customer source**.

Architectural requirements (conceptual; data model OPEN):

| Requirement | Description |
|---|---|
| Source type | WhatsApp / email / attachment / audio / document / manual input |
| Source location / reference | which message, thread, file, attachment, or conversation |
| Original content or evidence reference | the preserved original artifact (never replaced by the structured value) |
| Timestamp / context | when received; conversation/thread context where available |
| AI interpretation | what the AI proposed / extracted |
| Human action / status | approved / corrected / rejected / deferred; by whom; when |

### 4.1 Truth classes to distinguish (see also §15)

- **Source truth** — what the customer actually sent.
- **AI interpretation** — what the system inferred (a proposal).
- **Approved operator truth** — what a human accepted into the CRM.
- **Calculated system truth** — what the system computes (e.g. validation outcomes).
- **Supplier truth** — what the supplier actually quoted/confirmed.

These must never be conflated, and the provenance chain must make the distinction recoverable.

**Invariant:** original evidence is **additive and preserved**; structured data is **derived** and never replaces the original (consistent with `FJK-SQ-D09/D10`).

---

## 5. End-to-end information lifecycle

The intended end-to-end flow:

```
Customer communication
 → AI interpretation
 → proposed structured data + provenance
 → human review / approval / correction
 → authoritative CRM data
 → requirement completeness
 → operator allocation
 → calculation / validation
 → Workspace review
 → Info Complete gate
 → Supplier Quotation Request
 → Supplier Response / Pricing
 → completed Deal commercial data
 → Customer Quotation
```

Notes on the flow:

- The **AI step** is a proposal generator with mandatory human gate (§3).
- The **CRM** step is where approved data becomes authoritative (§6).
- The **Workspace** step is the operator review / decision / gate surface (§7).
- **Info Complete** is the boundary that enables the Supplier Quotation Request (§10).
- **Supplier Pricing** must exist **before** Customer Quotation preparation (§13).
- **Trip** is a downstream Phase 2 layer triggered by invoice (`FK-D15`); it is not part of this pre-invoice flow (§17).

---

## 6. HANDLE — CRM

**Frappe CRM is the authoritative system of record for approved Deal information.**

CRM owns (within `FK-D17` pre-invoice commercial state):

- customer / company / contact context (`FK-D04`, `FK-D10`);
- approved travel **requirements** (Requirement Lines and related structures);
- operator **allocation** of intended fulfilment;
- **validation** inputs and outcomes (system-calculated, advisory);
- **provenance** for AI-derived / human-approved values;
- **supplier quotation / pricing** data incorporated into the Deal;
- **quotation preparation** data (customer quotation versions V1..Vn, Final Quotation reference, CONFIRMED snapshot).

CRM remains **native-first** (`FK-D12`). CRM is not a presentation surface and does not become a second database for the Workspace.

---

## 7. DISPLAY — FeelJapanK Workspace

**The FeelJapanK Workspace is the presentation, review, decision, and workflow-gate surface.**

- It **consumes** authoritative CRM data.
- It **must not become a second database** unless a later explicit decision says otherwise.
- It is where the operator reviews and decides; it does not itself define authoritative truth.

Workspace responsibilities include:

- **Summary** (business-category view);
- **Full Details** (granular Deal information, child grids, per-item states, source evidence);
- consolidated **information status** (e.g. `KNOWN · MISSING · TO CONFIRM · CUSTOMER-CONFIRMED · NOT APPLICABLE`);
- **allocation / validation** review;
- **provenance access** (navigate from value to source);
- **supplier quotation status / actions** (conditional on Info Complete);
- the **Info Complete gate** control (workspace-authoritative, `DG-2 / D-C`).

This is consistent with the existing implemented Workspace (`fjk-workspace` Desk Page; tabs `Summary | Full Details | Supplier Quotation`) and its established boundaries.

---

## 8. SEND — quotation workflow

Two **separate commercial stages** must be distinguished (both within `FK-D17`):

| Stage | Direction | Meaning |
|---|---|---|
| **Supplier Quotation Request** | FeelJapanK → supplier | A request prepared from approved Deal data, sent to obtain pricing/terms. Sending ≠ quotation received (`FJK-SQ-D07`). |
| **Customer Quotation** | FeelJapanK → customer | The client-facing commercial quotation (versions `V1…Vn`; agreed reference labelled **Final Quotation**, `FJK-SQ-D03`). |

They are **not the same document**, **not the same stage**, and **not interchangeable**. A supplier quotation is an input to the customer quotation, never the customer quotation itself.

---

## 9. REQUIREMENT → ALLOCATION → VALIDATION

Preserve the distinction:

| Concept | Meaning |
|---|---|
| **Requirement** | What the **customer needs** (demand). |
| **Allocation** | The **operator's intended fulfilment** of that requirement. |
| **Validation** | The **system's calculation/evaluation** of allocation against demand. |

- AI **may propose requirements** (as proposals requiring approval, §3).
- AI **must not autonomously decide final allocation** — allocation is the operator's intent.
- Validation is **system truth**, advisory and non-blocking (§16).
- Requirement Lines remain **complementary** to the structured allocation structures.

---

## 10. Info Complete gate

This is critical. The **Workspace is the operator-facing gate**.

**Info Complete means:** customer-side travel requirements have been **sufficiently collected, interpreted, reviewed, approved, and structured** to request supplier pricing.

**Info Complete triggers the Supplier Quotation Request**, using the approved Deal data.

**Info Complete does NOT mean:**

- supplier quotation received;
- supplier pricing known;
- customer quotation ready;
- customer acceptance;
- final commercial completion;
- Deal Won;
- Trip started.

Established properties (unchanged): operator-controlled; **reversible**; auditable (who/when, where the architecture supports it); workspace-authoritative (`DG-2 / D-C`; roadmap line 25). Reopening after Info Complete re-gates the flow and does not delete quotation history or auto-invalidate supplier quotations (`FJK-SQ-D02`).

---

## 11. Supplier quotation stage

```
Approved Deal data
 → Supplier Quotation Request
 → supplier response
 → supplier pricing
 → supplier data incorporated into Deal
```

- The request is generated from **approved** Deal information only.
- The supplier's reply is **captured and preserved** (original email/attachment retained; `FJK-SQ-D08/D09`).
- Extracted/entered supplier quotation data is **reviewed and confirmed by the operator** before becoming structured supplier truth (`FJK-SQ-D11`; CAP-09/10/11).
- Supplier quotation **history is never overwritten**; validity, reconfirm/requote events are preserved (`FJK-SQ-D01/D04`).
- Supplier data is incorporated into the Deal as the authoritative supplier-side input for customer quotation preparation.

---

## 12. Completed Deal commercial data

After supplier pricing is received, the Deal contains:

- **approved travel requirements** (customer-side truth);
- **supplier pricing / terms / availability** as applicable (supplier-side truth).

This combined set becomes the **completed input set for Customer Quotation preparation**.

"Completed" here means *commercially sufficient to prepare a customer quotation*, not "final" and not "Trip-ready". The Deal is not Won and no Trip exists at this point.

---

## 13. Customer quotation gate

**Explicit architectural rule:**

> **Customer Quotation preparation starts only after supplier pricing has been received and incorporated.**

It must **not** be generated directly from:

- raw AI output;
- unapproved CRM data;
- incomplete supplier information.

Rationale: the customer quotation is a commercial document whose pricing depends on supplier truth; generating it before supplier pricing exists would present unsupported commercial data. This preserves the existing capability rule that customer quotation requires (a) Deal requirements, (b) one or more **supplier quotations**, and (c) internal commercial processing (`FeelJapanK-Phase1-Customer-Quotation-Itinerary-Generation-Capability-Plan-v0.1.md` §1–§2).

---

## 14. Supplier request snapshot / versioning

**Identified as an architectural requirement to investigate** (not designed here):

- Exactly **which approved Deal data was sent** to a given supplier must be **traceable**.
- Consider a **supplier request version / snapshot** and its relationship to the resulting supplier response.
- This must connect the Info Complete state, the generated request, the email sent, and the supplier reply.

**Explicit non-decisions:** do **not** design the final schema; do **not** choose a versioning representation; do **not** implement. Recorded as an open requirement (`FJK-SQ-Q03`, `FJK-SQ-Q09`, `FJK-SQ-Q10`) extended by §19 and §23.

---

## 15. Truth hierarchy

| Layer | Definition | Owner |
|---|---|---|
| **Customer truth** | What the customer actually communicated / requires | Customer (source) |
| **AI interpretation** | What the AI proposed/extracted from that communication | AI proposal (non-authoritative) |
| **Operator truth** | What a human approved/corrected into the CRM | Operator (authoritative) |
| **System truth** | What the system calculates (validation outcomes, aggregates) | System (calculated) |
| **Supplier truth** | What the supplier actually quoted/confirmed | Supplier (external) |
| **Customer quotation** | The commercial document issued to the customer, derived from approved CRM data + supplier pricing | FeelJapanK (derived) |

These layers **must not be conflated**. Each is separately attributable and source-traceable (§4).

---

## 16. Existing HF-06 / HF-08 decisions

Reconcile the new architecture with the already-approved **structured allocation** work. The following remain in force and are preserved unchanged:

- **aggregate passenger allocation** — counts per unit, e.g. Vehicle 1: 8 pax; **no passenger identities**;
- **transport demand per leg/day** — each leg validated against its own demand;
- **accommodation demand per stay/date range** — stays may differ in demand;
- **editable stored demand** — operator-editable actual allocation; recalculation after changes;
- **operator-controlled allocations**;
- **advisory validation** — non-blocking;
- **state model** `PASS / WARNING / ERROR / NOT DETERMINABLE`;
  - partial allocation → WARNING
  - excess capacity → WARNING
  - intentional operator override → WARNING
  - unknown capacity → NOT DETERMINABLE
  - contradiction / invalid data → ERROR
- **Requirement Lines remain complementary** to the structured allocation structures;
- **no passenger identities** required.

**Two distinct business structures** (HF-06 Transportation; HF-08 Accommodation) share validation principles but remain separate. The Deal owns the allocation structures; they remain pre-invoice and do not introduce Trip-linkage.

This new end-to-end direction does not change any of the above. Allocation is the operator's intended fulfilment (§9); AI may propose requirements but not allocations.

---

## 17. Phase 1 / Phase 2 reconciliation

**This document does NOT declare the phases merged.**

The real end-to-end business flow **crosses the previous phase boundary** (customer quotation into post-quotation operations and Trip), and therefore requires **formal architectural reconciliation** before it can be treated as one authorized roadmap.

Preserve **`Deal != Trip`** unless an explicit future decision changes it (`FK-D01`/`FK-D15`/`FK-D17`).

The full business flow, spanning the boundary:

```
HANDLE → DISPLAY/DECIDE → SUPPLIER PRICING → CUSTOMER QUOTATION → CONFIRMATION → INVOICE → TRIP/OPERATIONS
```

- `HANDLE` / `DISPLAY/DECIDE` / `SUPPLIER PRICING` / `CUSTOMER QUOTATION` / `CONFIRMATION` / `INVOICE` are **pre-Trip, CRM-owned** (`FK-D17`).
- **Trip initiation** occurs at customer **invoice creation** (`FK-D15`), with ERPNext Customer creation at/just-before invoice (`FK-D16`).
- `TRIP/OPERATIONS` is **Phase 2** and remains **deferred**.

Whether the end-to-end flow should be re-phased is an **open governance question** (§23), to be resolved by explicit roadmap/architecture approval — not by this document.

---

## 18. Existing implementation inventory

Classification of existing items (read-only; no build):

| Item | Classification | Notes / authority |
|---|---|---|
| Native CRM `CRM Deal` | **implemented** | Authoritative Deal container (`FK-D01`, `FK-D04`) |
| D1 custom fields on `CRM Deal` (incl. `fjk_ready_for_quotation`, `fjk_info_complete`) | **implemented** | 18 `fjk_*` fields + layout |
| `FJK Deal Requirement Line` | **implemented** | Requirement Lines (complementary) |
| `FJK Deal Component` / `FJK Deal Guide Requirement` / `FJK Deal Activity Item` | **implemented** | Child structures |
| Structured allocation (aggregate pax, transport per leg/day, accommodation per stay/date) | **architectural decision (OPERATOR DECISIONS RECORDED)** | HF-06/HF-08; **implementation not authorized** |
| Transport / accommodation allocation DocTypes | **planned (FK-D12 PLAN required before BUILD)** | Structured model required; not built |
| `get_deal_summary` / `get_deal_context` / `get_readiness` | **implemented (read-only)** | Advisory rollup |
| `fjk-workspace` Desk Page (`Summary | Full Details | Supplier Quotation`) | **implemented** | Workspace; N1 technically verified, human acceptance pending |
| **Info Complete gate** | **implemented / decision** | Workspace-authoritative, reversible, audited (DG-2/D-C) |
| Supplier Quotation Request | **prototype / direction — not implemented** | `FJK-SQ-D05/D06/D07`; structure OPEN |
| `FJK Quotation` + `Version`/`Version Item`/`Confirmation`/`Negotiation Entry` | **prototype (retained, not the implemented workflow)** | Roadmap §9; presentation to be hidden from Supplier Quotation stage |
| Customer Quotation / Final Quotation generation | **prototype / planned — not implemented** | Capability plan only |
| Supplier Quotation (structured, versioned, history) | **planned — not authorized** | `FJK-SQ-D01/D04`; model OPEN |
| Supplier email reply intake / extraction / OCR | **planned / direction — not authorized** | `FJK-SQ-D08`; CAP-07/09/10 |
| AI interpretation / extraction of customer communication | **new direction — not authorized** | This document §3; conflicts with `FK-D11` (§26) |
| Provenance model | **new architectural requirement — not designed** | This document §4; §23 |
| Trip boundary | **architectural decision (FROZEN)** | `FK-D15`; Trip implementation **DEFERRED** |

---

## 19. Architectural gaps introduced / identified

The new end-to-end direction introduces or exposes the following gaps (all **PLAN-level**, none authorized):

1. **AI integration** — platform, boundaries, and where in the flow AI may act (proposal-only).
2. **Source / provenance model** — how sources, evidence, and interpretation are stored, referenced, and navigated.
3. **Human approval lifecycle** — proposal → review → approve/correct/reject/defer, with attribution and audit.
4. **CRM data acquisition workflow** — how approved AI/structured data enters the Deal authoritatively.
5. **Relationship between proposed data and authoritative data** — separation, state transitions, no silent promotion.
6. **Supplier request trigger** — exact mechanism from Info Complete to request generation.
7. **Supplier response ingestion** — capture, threading, attachment preservation, extraction (`FJK-SQ-D08`).
8. **Supplier request version / snapshot** — traceability of what was sent (§14).
9. **Supplier pricing incorporation** — how supplier truth becomes Deal commercial data.
10. **Customer quotation construction** — data model, inputs, versioning, Final Quotation representation (`FJK-SQ-Q11/Q12`).
11. **Quotation gating** — enforcement that customer quotation is blocked until supplier pricing exists (§13).
12. **Possible Phase 1 / Phase 2 reconciliation** — the end-to-end flow crossing the phase boundary (§17).

---

## 20. Governance impact

The following areas will require **future PLAN / FK-D12 review before any BUILD**:

- **AI integration** (customer communication interpretation/extraction) — new capability; conflicts with `FK-D11` and the Master Plan Phase 1 constraint; requires controlled revision.
- **Provenance / evidence model** — new data-model surface; must pass the native-first / high-risk gate (`FK-D12`).
- **Human approval lifecycle** — new workflow/state surface.
- **CRM data acquisition / proposal→authoritative transitions** — touches authoritative data handling.
- **Supplier quotation stage** (request generation, versioning, response ingestion, pricing incorporation) — already gated; extended here.
- **Customer quotation construction & gating** — already gated; the new gate rule (§13) must be formally adopted.
- **Phase 1 / Phase 2 roadmap reconciliation** — `FK-D11` override and phase-boundary crossing require explicit roadmap revision, not silent edit.

**No implementation is authorized by this document.** Each area requires its own `PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFY → EVIDENCE → FREEZE` cycle (Master Plan §3–§4; `FK-D12`).

---

## 21. Recommended implementation sequence

> This is a **recommended sequence**, **not BUILD authorization**. Each foundation is separately freeze-gated.

**FOUNDATION 1 — DATA ACQUISITION**
`Customer communication → AI → provenance → human approval → CRM`
- AI proposal + provenance + mandatory human approval; approved data enters CRM authoritatively.

**FOUNDATION 2 — STRUCTURED DEAL DATA**
`Requirements → allocation → calculation → validation`
- Extends the approved HF-06/HF-08 structured allocation work; advisory validation.

**FOUNDATION 3 — WORKSPACE**
`CRM → Summary / Full Details / readiness / provenance / decision surface`
- Operator review surface; Info Complete gate; provenance navigation.

**FOUNDATION 4 — SUPPLIER QUOTATION**
`Info Complete → approved-data supplier request → supplier response/pricing`
- Request generation, send, reply capture, extraction, confirm, history/version.

**FOUNDATION 5 — CUSTOMER QUOTATION**
`Completed Deal + supplier pricing → Customer Quotation`
- Customer quotation construction, versions V1..Vn, Final Quotation.

**FOUNDATION 6 — POST-QUOTATION OPERATIONS**
`Confirmation → Invoice → Trip`
- Phase 2; Trip begins at invoice (`FK-D15`); ERPNext Customer at/just-before invoice (`FK-D16`).

**Dependency rule (unchanged):** downstream foundations consume **frozen** upstream outputs only; no premature downstream implementation (`FK-D12`; roadmap §2).

---

## 22. Architectural invariants

1. **AI never silently becomes authoritative.**
2. **Every AI-derived value is source-traceable** (provenance mandatory, §4).
3. **Human approval is mandatory** for AI-derived data.
4. **Workspace is the decision / gate surface** (§7).
5. **CRM is the authoritative system of record** for approved Deal data (§6).
6. **Info Complete gates the Supplier Quotation Request** (§10).
7. **Supplier pricing must exist before Customer Quotation preparation** (§13).
8. **Customer Quotation consumes approved CRM data + supplier pricing** (§13, §8).
9. **`Deal != Trip`** (`FK-D01`/`FK-D15`/`FK-D17`).
10. **No passenger identities required for allocation** (HF-06/HF-08).
11. **System validation remains advisory / non-blocking** unless separately authorized (HF-06/HF-08).
12. **No silent schema changes** (`FK-D12`).
13. **Original evidence is preserved; structured data is derived and never replaces originals** (`FJK-SQ-D09/D10`).
14. **FROZEN decisions are not silently reopened or contradicted** (Decision Register §1).

---

## 23. Open architectural questions

Unresolved items, listed without inventing answers:

1. **Exact provenance data model** — structure, linkage, storage.
2. **AI proposal lifecycle** — states, transitions, retention of rejected/corrected proposals.
3. **Source storage / access mechanism** — how originals (email, WhatsApp, audio, documents) are stored and navigated.
4. **Supplier request version / snapshot** — representation and relationship to supplier response.
5. **Supplier response ingestion** — inbound mechanism, threading, OCR/extraction review.
6. **Supplier pricing model** — structured representation of cost/validity/terms.
7. **Customer quotation data model** — inputs, versioning, Final Quotation representation (`FJK-SQ-Q11/Q12`).
8. **Exact Info Complete validation rules** — what "sufficiently collected" means operationally (operator decides; precise rules open).
9. **How post-Info-Complete changes are handled** — reopen vs new request vs amendment.
10. **Whether supplier re-quotation is required after material Deal changes** — and what counts as material.
11. **Phase 1 / Phase 2 formal roadmap reconciliation** — including the `FK-D11` AI override and phase-boundary crossing (§17, §26).

Plus pre-existing open questions `FJK-SQ-Q01…Q14` remain open.

---

## 24. Decision status

| Category | Items |
|---|---|
| **Operator-approved direction (this document, PROPOSED)** | AI-assisted interpretation/extraction with mandatory human approval in Phase 1; mandatory provenance; end-to-end lifecycle (§5); HANDLE/DISPLAY/SEND split; Info Complete → Supplier Quotation Request; supplier pricing before customer quotation; customer quotation gate; truth hierarchy; recommended foundations sequence |
| **Existing FROZEN decisions still in force** | `FK-D01`–`FK-D17` (notably `FK-D11`, `FK-D12`, `FK-D15`, `FK-D16`, `FK-D17`); `FJK-SQ-D01…D12` (approved business rules/directions); N1 `DG-2 / D-C` Info Complete control; frozen environment/security baseline `FK-D13` |
| **Decisions requiring formal roadmap reconciliation** | The `FK-D11` "automation deferred" override; the Phase 1/Phase 2 boundary crossing by the end-to-end flow (§17) |
| **Future PLAN items** | AI integration; provenance model; approval lifecycle; structured allocation build; supplier quotation stage; customer quotation stage; gating enforcement |
| **Implementation NOT yet authorized** | Everything in §18/§19/§21; all AI, supplier, and customer quotation work; any schema/code |

---

## 25. Evidence / governance safety

Confirmed for this documentation task:

- **no** source code changes;
- **no** schema changes;
- **no** CRM / database changes;
- **no** AI integration;
- **no** supplier quotation automation;
- **no** customer quotation implementation;
- **no** build;
- **no** migration;
- **no** configuration changes;
- **no** commit;
- **no** push.

This document is additive and does not modify any FROZEN artifact.

---

## 26. Conflicts with FROZEN decisions (reported, not resolved)

> **STOP condition.** The following conflict is **reported**. It is **not** silently reconciled. Resolving it requires `STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE`.

### 26.1 `FK-D11` and the Master Plan Phase 1 constraint

| Aspect | Existing authority | New direction | Status |
|---|---|---|---|
| Phase 1 intake | Manual / human-in-the-loop; **no** automated WhatsApp intelligence, routing, extraction, or classification | AI-assisted interpretation/extraction of customer communication with mandatory human approval | **CONFLICT — requires explicit roadmap/architecture approval** |
| Automation | Deferred (`FK-D11`); "premature AI automation" NOT NOW (Master Plan §7) | AI interpretation introduced into Phase 1 | **CONFLICT — requires explicit approval** |

**Required path:** an explicit controlled revision to the roadmap and the affected authorities (and only then a candidate `FK-D11` supersession via the Decision Register lifecycle `PROPOSED → DECIDED → FROZEN → SUPERSEDED`). Until then, `FK-D11` remains FROZEN and authoritative; the AI direction is **operator-approved intent** but **not yet authoritative architecture**.

### 26.2 Phase-boundary crossing

The end-to-end flow (§17) crosses the Phase 1 / Phase 2 boundary (customer quotation → confirmation → invoice → Trip). This is a **scope/roadmap reconciliation** item, not a source-code change, and **does not** merge the phases. Reported as requiring formal roadmap reconciliation.

### 26.3 Already-consistent items (no conflict)

- `FK-D01`, `FK-D04`, `FK-D05`, `FK-D06`, `FK-D15`, `FK-D16`, `FK-D17` — consistent and preserved.
- `FJK-SQ-D01…D12` — consistent; this document extends the same direction to the customer-side intake.
- N1 `DG-2 / D-C` Info Complete control — consistent and preserved.
- HF-06/HF-08 structured allocation decisions — consistent and preserved.

---

## 27. Decision Check (AGENTS.md / Decision-Check-Standard)

| Decision ID | Relevant? | Compliance | Notes |
|---|---|---|---|
| FK-D01 (Deal = opportunity container) | Yes | Compliant | CRM Deal remains authoritative |
| FK-D04 (CRM owns relationship/enquiry) | Yes | Compliant | CRM system of record |
| FK-D05 (Trip owns operational requirements from Trip initiation) | Yes | Compliant | Pre-invoice stays CRM-owned |
| FK-D06 (ERPNext financial ownership) | Yes | Compliant | No second ledger; no ERPNext change |
| FK-D11 (Phase 1 manual; automation deferred) | Yes | **CONFLICT** | AI interpretation in Phase 1 — reported §26.1; requires approval |
| FK-D12 (native-first; high-risk gate) | Yes | Compliant | New surfaces gated; no build authorized |
| FK-D13 (frozen env/security baseline) | Yes | Compliant | Untouched |
| FK-D14 (written confirmation evidence) | Yes | Compliant | Preserved; no conflation |
| FK-D15 (Trip at invoice) | Yes | Compliant | Preserved; Trip deferred |
| FK-D16 (ERPNext Customer at first invoice) | Yes | Compliant | Preserved |
| FK-D17 (pre-invoice commercial ownership) | Yes | Compliant | Supplier/customer quotation data CRM-owned |
| FJK-SQ-D01…D12 | Yes | Compliant | Extended, not contradicted |
| N1 DG-2 / D-C (Info Complete control) | Yes | Compliant | Preserved |
| HF-06 / HF-08 structured allocation | Yes | Compliant | Preserved |

**Outcome:** documented, no BUILD authorization, one reported conflict (`FK-D11`) requiring controlled roadmap/architecture approval.

---

## 28. Provenance / authorities reconciled (read-only)

- `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` (`FK-D01…D17`).
- `docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md`.
- `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` (FROZEN).
- `docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md`.
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Workflow-Decisions-v0.1.md` (`FJK-SQ-D01…D12`).
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Capability-Architecture-Plan-v0.1.md`.
- `docs/architecture/FeelJapanK-Phase1-Customer-Quotation-Itinerary-Generation-Capability-Plan-v0.1.md`.
- `docs/architecture/FeelJapanK-Phase1-Deal-Information-Gathering-and-Supplier-Quotation-Request-Reconciliation-v0.2.md`.
- `docs/architecture/FeelJapanK-Phase1-N1-Presentation-Operator-Decisions-v0.1.md` (`DG-2 / D-C`).
- `docs/architecture/FeelJapanK-Phase1-Quotation-Itinerary-Continuity-Addendum-v0.2.md`.
- `docs/evidence/phase1/FeelJapanK-Phase1-HF-06-HF-08-Operator-Validation-Decisions-v0.1.md`.
- `docs/business/FeelJapanK-Implementation-Master-Plan-v0.1.md`.
- `docs/business/FeelJapanK-Business-Requirements-Consolidation-v0.2.md`.

**Change rule:** substantive later changes create a **v0.2**; this v0.1 is not silently edited.
