# FeelJapanK — End-to-End Architecture Reconciliation — v0.1

| Field | Value |
|---|---|
| Document | `FeelJapanK-End-to-End-Architecture-Reconciliation-v0.1` |
| Project | FeelJapanK |
| Version | v0.1 |
| Status | **PLAN / READ-ONLY — ARCHITECTURAL RECONCILIATION — NOT FROZEN — NO BUILD AUTHORIZATION** |
| Nature | Formal, evidence-based reconciliation of the new operator-approved end-to-end direction against the frozen architecture and roadmap. Reports conflicts; resolves none silently. |
| Repository | `/home/yusmarin/frappe-crm` |
| Date | 2026-10-06 |
| Basis | `docs/architecture/FeelJapanK-End-to-End-Data-to-Quotation-Architecture-Decision-v0.1.md` (the direction record; **not modified by this document**) |
| Mutates frozen artifacts | **No.** |
| Change rule | Substantive later changes create a **v0.2**; this v0.1 is not silently edited. |

> **Reading rule.** This document **analyses**; it does not decide. Supersession recommendations are `PROPOSED` and require the operator/governance path in §21. No recommendation here freezes, implements, or authorizes anything.

---

## 1. Purpose

To perform, read-only, the formal architectural reconciliation triggered by the operator-approved end-to-end direction in `FeelJapanK-End-to-End-Data-to-Quotation-Architecture-Decision-v0.1.md`, specifically:

- **Issue A — `FK-D11` / AI-Phase-1 conflict.** The direction intends AI-assisted interpretation/extraction of customer communication (proposal-only, human-approved, provenance-mandatory) to be part of Phase 1. The frozen architecture defers automation and explicitly prohibits automated extraction/AI in Phase 1.
- **Issue B — Phase 1 / Phase 2 boundary.** The end-to-end flow (HANDLE → DISPLAY → SUPPLIER → SEND → OPERATE) appears to cross the phase boundary. Determine whether phases must merge, and where Customer Quotation actually belongs.

Deliverables: conflict matrices, minimum supersession set, AI architectural boundary, phase mapping, gate formalisation, traceability requirement, decision register classification, and a recommended governance sequence. **No implementation.**

---

## 2. Source documents

Inspected read-only; terminology preserved:

**Governance**
- `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` (`FK-D01…D17`; lifecycle `PROPOSED → DECIDED → FROZEN → SUPERSEDED`; §1 frozen-decision rule; §3 Change Control; §6/§7 FK-D15/D16/D17 checkpoints).
- `docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md` (FROZEN; mandatory PLAN/BUILD Decision Check).
- Root `AGENTS.md`; `docs/AGENTS.md`.

**Frozen roadmap / architecture**
- `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` (FROZEN).
- `docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md` (APPROVED DIRECTION / PHASE 1).
- `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`; `…Opportunity-Start-Lead-Usage-Rule-v0.1-FROZEN.md`.
- `docs/architecture/FeelJapanK-Phase1-N1-Presentation-Operator-Decisions-v0.1.md` (DG-1…DG-7; DG-2/D-C; DG-8 undefined citation).
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Workflow-Decisions-v0.1.md` (`FJK-SQ-D01…D12`).
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Capability-Architecture-Plan-v0.1.md`.
- `docs/architecture/FeelJapanK-Phase1-Customer-Quotation-Itinerary-Generation-Capability-Plan-v0.1.md`.
- `docs/architecture/FeelJapanK-Phase1-Deal-Information-Gathering-and-Supplier-Quotation-Request-Reconciliation-v0.2.md`.
- `docs/architecture/FeelJapanK-Phase1-Quotation-Itinerary-Continuity-Addendum-v0.2.md`.
- `docs/architecture/FeelJapanK-Phase1-Business-Requirements-Capability-Architecture-Reconciliation-v0.1.md`.

**Business**
- `docs/business/FeelJapanK-Implementation-Master-Plan-v0.1.md` (note: currently modified in the working tree; treated read-only).
- `docs/business/FeelJapanK-Business-Requirements-Consolidation-v0.2.md`.
- `docs/business/Field-Japan-K-Business-Workflow-Requirements-v0.1.md`.

**HF-06 / HF-08 structured validation**
- `docs/evidence/phase1/FeelJapanK-Phase1-HF-06-HF-08-Operator-Validation-Decisions-v0.1.md`.
- `docs/evidence/phase1/FeelJapanK-Phase1-HF-06-HF-08-FK-D12-Implementation-Plan-v0.1.md`.
- `docs/evidence/phase1/FeelJapanK-Phase1-HF-06-HF-08-Structured-Validation-Plan-v0.1.md`; `…Evidence-Assessment-v0.1.md`; `…Verification-v0.1.md`.

**Direction under reconciliation**
- `docs/architecture/FeelJapanK-End-to-End-Data-to-Quotation-Architecture-Decision-v0.1.md`.

---

## 3. Existing frozen architecture

### 3.1 `FK-D11` — the relevant frozen decision

From the Decision Register (`FROZEN`):

> **`FK-D11` — Phase 1 manual human-in-the-loop intake.** *"Human determines contact/org/deal/evidence; WhatsApp automation deferred."*
> Authority / source: **Phase 1 Manual Communication Intake Direction**.

The authority document (`FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md`, status *APPROVED DIRECTION / PHASE 1*) fixes:
- Communication intake is **manual and human-in-the-loop**.
- The human agent determines: Contact/person; Organization; existing-vs-new Deal; known requirements; evidence/artifacts; additional context.
- The CRM is **not required** to automatically infer/assign Deal context.
- Automation is deferred and is to be designed **around** a proven workflow.
- Purpose rationale includes: automated routing is not reliable enough to be authoritative; multiple simultaneous opportunities/contacts; evidence must be preserved before automation.

### 3.2 Master Plan Phase 1 prohibition

From `FeelJapanK-Implementation-Master-Plan-v0.1.md`:
- **§Phase 1, item 6:** *"Human-in-the-loop intake: **manual** WhatsApp/email handling with original enquiry evidence preserved (FK-D11); **no** automated WhatsApp intelligence, routing, extraction, or classification in Phase 1."*
- **§Phase 1 shape:** *"Phase 1 is **manual / human-in-the-loop**… (FK-D11)."*
- **§7 Explicitly NOT NOW:** includes *"premature AI automation"*.

### 3.3 LLM principles already frozen in principle

- `FeelJapanK-Business-Requirements-Consolidation-v0.2.md`: *"LLM-derived intelligence must distinguish **Evidence → Observation → Suggestion** and must not invent subjective labels."*
- Master Plan (Morning Brief): *"LLM output must not invent facts or silently convert observations into authoritative records."*

These principles are **compatible with** the new direction (and act as constraints on it), not in conflict.

### 3.4 Deal / Trip / quotation ownership (unaffected)

- `FK-D01` Deal = opportunity container; `FK-D02`/`FK-D05`/`FK-D15`/`FK-D16`/`FK-D17` define the Trip boundary and pre-invoice commercial ownership.
- Master Plan Phase 2 explicitly: *"Customer quotation, quotation revisions, the confirmed version and negotiation are **pre-invoice commercial work owned by the CRM Deal** (FK-D17)… **not** moved into Trip/Operations."*

---

## 4. New operator-approved direction

From `FeelJapanK-End-to-End-Data-to-Quotation-Architecture-Decision-v0.1.md` (operator decisions already made; treated as given):

- AI **may** interpret/extract customer communication (WhatsApp, email, attachments, audio, documents, manual input).
- AI output is **proposal only**.
- **Human approval is mandatory**; the human may **accept, edit, or reject**.
- Every AI-derived item must have **directly accessible source provenance**.
- **AI confidence ≠ approval.**
- AI does **not** autonomously decide final transportation/accommodation **allocation**.
- **CRM remains authoritative after approval.**
- Info Complete gates the Supplier Quotation Request; supplier pricing precedes Customer Quotation.

---

## 5. FK-D11 conflict

### 5.1 Precise conflict statement

`FK-D11` and Master Plan Phase 1 item 6 together freeze:
1. Phase 1 intake is **manual**; and
2. **No** automated extraction/classification/AI in Phase 1.

The new direction requires, within Phase 1/end-to-end:
- AI-assisted **interpretation/extraction** of customer communication.
- A **proposal → human approval** lifecycle feeding authoritative CRM data.

**Determination: DIRECT CONTRADICTION.** The new direction cannot be honestly described as compliant with *"no automated… extraction… in Phase 1"* or with *"automation deferred."* It is not an interpretation gap; it is a deliberate business-direction change by the operator.

### 5.2 Nature of the conflict

- It is a **scope/authority conflict**, not a technical ambiguity.
- `FK-D11` is **FROZEN**. Under Decision Register §1, a later conversation statement does **not** silently supersede a FROZEN decision.
- Therefore the only lawful path is: `STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE`.

### 5.3 What the new direction does NOT conflict with

- It **preserves** human responsibility for Contact/Organization/Deal determination (the *purpose* of `FK-D11`), now with AI *proposal assistance* under human control.
- It **preserves** `FK-D10` (no silent Deal guessing; explicit context wins) — in fact it reinforces "AI must not assign Deal context authoritatively."
- It **preserves** `FK-D13`, `FK-D14`, `FK-D15`, `FK-D16`, `FK-D17`, `FJK-SQ-D01…D12`, DG-2/D-C, HF-06/HF-08.

---

## 6. FK-D11 supersession analysis

### 6.1 Exact clauses / documents that must change if AI enters Phase 1

| Location | Current frozen text | Effect of new direction |
|---|---|---|
| Register `FK-D11` | "Phase 1 manual human-in-the-loop intake… WhatsApp automation deferred" | The "automation deferred" clause is superseded/narrowed |
| Master Plan §Phase 1 item 6 | "**no** automated WhatsApp intelligence, routing, extraction, or classification in Phase 1" | Must be amended (extraction now permitted as proposal-only) |
| Master Plan §7 Explicitly NOT NOW | "premature AI automation" | Must be narrowed/qualified (AI intake proposal layer is now intended) |
| Phase 1 Manual Communication Intake Direction §3 | Manual operating model; automation deferred | Must record the AI-proposal layer as an intended addition |
| Roadmap §1 "Not implemented: … extraction" | Extraction listed as not implemented | Remains true now; eventually becomes planned scope (roadmap amendment later) |

### 6.2 Can it be an exception, or does it require supersession?

**It requires formal controlled revision / supersession.** It cannot be treated as a local exception because:
- `FK-D11` is FROZEN and indexed;
- the Master Plan prohibition is explicit and phase-wide;
- an "exception" would leave two contradictory authoritative statements in force — prohibited by the Decision Check Standard (§2: STOP, report, do not invent).

### 6.3 Options for `FK-D11` disposition

| Option | Description | Assessment |
|---|---|---|
| A — **Partial supersession (RECOMMENDED)** | Retain `FK-D11`'s human-determination requirements; supersede only the "automation deferred / no extraction" clause. Register a new decision (candidate **`FK-D18`**) authorizing AI interpretation as proposal-only with mandatory human approval + provenance. | Preserves the original human-control intent; minimal, precise; matches the direction |
| B — Full replacement | Supersede `FK-D11` entirely and replace with a broad intake decision. | Over-broad; risks losing the still-valid human-determination guarantees |
| C — Amend in place | Edit `FK-D11` text to inject the AI exception. | Discouraged: editing a FROZEN register entry hides history; violates "historical decisions preserved" |
| D — No change / exception | Treat AI as an undocumented exception. | **Rejected** — violates Decision Register §1 and Decision Check Standard |

**Recommendation:** Option A — a **new decision record** (`FK-D18` candidate) plus explicit `SUPERSEDED`/narrowing of the `FK-D11` automation clause.

### 6.4 Dependent frozen decisions affected

| Decision | Effect |
|---|---|
| `FK-D10` (communication context) | **Not superseded**; constrains AI (no silent Deal assignment) |
| `FK-D12` (native-first / high-risk gate) | **Not superseded**; AI integration must pass the gate |
| `FK-D14` (written confirmation evidence) | **Not superseded**; supplier/customer flows must not conflate |
| `FK-D03` (revision vs new Trip) | **Not superseded** |
| `FK-D09` (Lead optional) | **Not superseded** |
| `FK-D15`/`FK-D16`/`FK-D17` | **Not superseded** |

### 6.5 Additional decisions that must be frozen before BUILD

The AI direction creates new architecture surfaces that must be decided (not just `FK-D11` handling):
1. **AI architectural boundary** decision (§7).
2. **Provenance** decision (§8).
3. **Human approval lifecycle** decision (§9).
4. **AI platform / integration** decision (subject to `FK-D12`).
5. **Supplier request traceability** decision (§14).
6. **Phase reconciliation** outcome (§15).

---

## 7. AI architectural boundary

Conceptual boundary (no prompt/model/API/schema/queue design):

```
CUSTOMER SOURCE
  → AI INTERPRETATION        (non-authoritative proposal)
  → PROPOSED DATA            (+ provenance + confidence, separate from authoritative)
  → HUMAN APPROVAL           (accept / edit / reject; mandatory)
  → AUTHORITATIVE CRM        (operator truth; system of record)
```

| Layer | Determined by | Authority |
|---|---|---|
| Customer source | Customer | Customer truth |
| AI interpretation | AI | Proposal only |
| Proposed data | AI (+ provenance) | Non-authoritative |
| Human approval | Operator | Gate |
| Authoritative CRM | Operator/CMS after approval | Operator truth (system of record) |
| Allocation (intended fulfilment) | **Operator** | Operator decision |
| Validation outcome | **System** | Calculated (advisory) |

**What AI may do:** interpret/extract/normalise/classify from source; surface candidates; link to source evidence.

**What AI may propose:** structured candidate values for requirements and Deal fields; extracted items; suggestions with confidence.

**What AI may NEVER make authoritative without human approval:** any CRM field value; any requirement; any allocation; any supplier/customer commercial figure; any Deal context/identity (`FK-D10`).

**What requires operator decision:** final allocation (transport/accommodation); sufficiency (Info Complete); supplier selection; commercial parameters; acceptance of any AI proposal.

**What remains system-calculated:** validation outcomes (`PASS/WARNING/ERROR/NOT DETERMINABLE`), readiness rollups, aggregates — advisory/non-blocking.

**What requires source provenance:** every AI-derived value and every human disposition on it (§8).

---

## 8. Provenance requirement

Architectural requirement (model OPEN): every AI-derived data item retains a directly accessible source reference enabling the operator to navigate **from the authoritative CRM value back to the original customer source**.

Required attributes (conceptual): source type; source location/reference; original content/evidence reference; timestamp/context where available; AI interpretation; human action/status (accept/edit/reject) with attribution.

Invariant: **original evidence is preserved and additive**; structured data is derived and never replaces it (consistent with `FJK-SQ-D09/D10`).

**Non-decision:** exact data model is not designed here (§19, §23 of the direction record).

---

## 9. Human approval requirement

- Human review is **mandatory** for AI-derived data.
- Dispositions: **accept / edit / reject** (defer allowed).
- Only an explicit human disposition promotes a proposal to authoritative CRM data.
- AI **confidence ≠ approval**.
- Proposal and disposition are both retained (rejected/corrected proposals are evidence, not discarded silently).
- Approval must be **attributable** (who/when), consistent with `FJK-SQ-D02` audit expectations.

---

## 10. HANDLE / DISPLAY / SEND model

| Layer | Surface | Role | Authority |
|---|---|---|---|
| **HANDLE** | Frappe CRM | Authoritative system of record for approved Deal data | Operator truth after approval (`FK-D17`) |
| **DISPLAY** | FeelJapanK Workspace | Presentation, review, decision, workflow-gate surface | Consumes CRM data; **not** a second database |
| **SEND** | Quotation workflow | Two distinct stages: Supplier Quotation Request; Customer Quotation | CRM-owned pre-invoice (`FK-D17`) |

This model is consistent with the existing implemented Workspace (`fjk-workspace`; `Summary | Full Details | Supplier Quotation`) and with `FK-D17`.

---

## 11. Info Complete gate

**Info Complete** (unchanged semantics; DG-2/D-C; `FJK-SQ-D02`; roadmap line 25):
- operator-controlled; **reversible**; auditable; **workspace-authoritative**;
- means customer-side travel requirements are **sufficiently collected, interpreted, reviewed, approved, and structured** to request supplier pricing;
- **triggers** the Supplier Quotation Request using approved Deal data.

**Info Complete does NOT mean:** supplier quotation received; customer quotation ready; customer acceptance; Deal Won; Trip started; final commercial completion.

New direction addition (proposal-only): AI-derived requirements must have passed human approval before they can count toward Info Complete. **Unapproved AI proposals cannot satisfy Info Complete.**

---

## 12. Supplier quotation gate

Formalised sequence:

```
Authoritative CRM Deal
 → Workspace review
 → Info Complete
 → Supplier Quotation Request
 → Supplier Response / Pricing
 → Completed Deal commercial data
 → Customer Quotation
```

Three **distinct** states that must never be conflated:

| State | Meaning |
|---|---|
| **Info Complete** | Approved Deal data sufficient to **request** supplier pricing |
| **Supplier Quotation Received** | A supplier response/pricing has been captured, reviewed, confirmed, and incorporated into the Deal |
| **Customer Quotation Ready** | Completed Deal (approved requirements + incorporated supplier pricing) is commercially sufficient to **prepare** a customer quotation |

Info Complete enables the **request** only. It does **not** enable Customer Quotation.

---

## 13. Customer quotation gate

**Rule (architectural):** Customer Quotation preparation **begins only after supplier pricing has been received and incorporated**. It must **not** be generated from raw AI output, unapproved CRM data, or incomplete supplier information.

This is consistent with the existing capability rule (customer quotation requires Deal requirements + supplier quotation(s) + internal commercial processing) and with `FK-D17` (pre-invoice CRM-owned). No frozen decision conflicts with this gate.

---

## 14. Supplier request traceability

**Architectural requirement to investigate (not implementation).** The architecture needs a traceable relationship:

```
Approved Deal data
  → exact supplier request (snapshot/version)
  → supplier response
  → supplier pricing
  → customer quotation
```

Requirements identified:
- It must be determinable **exactly which approved Deal data was sent** to a given supplier.
- The generated request must be linked to the Info Complete state and to the email sent (`FJK-SQ-D06/D07`).
- The supplier response must be linked back to the request that produced it (`FJK-SQ-Q03`).
- Template version used must be retained and must not be altered retroactively (`FJK-SQ-D06`).

**Non-decisions:** schema, versioning representation, storage mechanism are OPEN (`FJK-SQ-Q03/Q09/Q10`; direction record §14).

---

## 15. Phase 1 / Phase 2 reconciliation

### 15.1 Existing phase definitions

- **Phase 1 — FeelJapanK CRM.** Exit: *"take a realistic FeelJapanK customer interaction from initial enquiry through CRM follow-up and **pre-invoice commercial work** to the point where the **Trip initiation boundary** (customer invoice creation, FK-D15) is reached. No ERPNext implementation is required."*
- **Phase 2 — Trip & Operations.** Post-invoice enduring Trip. Explicitly: customer quotation/revisions/confirmation/negotiation are **pre-invoice commercial work owned by the CRM Deal** (`FK-D17`), **not** Trip-owned.
- **Phase 3 — ERPNext Commercial & Finance** (ERPNext Customer at first invoice, `FK-D16`).

### 15.2 Key finding

The new end-to-end flow does **NOT** require merging Phase 1 and Phase 2.

- HANDLE, DISPLAY, SUPPLIER, SEND are **pre-invoice**, and the Master Plan already assigns pre-invoice commercial work to Phase 1 / CRM Deal ownership.
- OPERATE (Invoice → Trip) is **Phase 2/3**, and the Trip boundary at invoice is unchanged.
- **Customer Quotation belongs to the pre-invoice phase (Phase 1), not Phase 2** — already the Master Plan position via `FK-D17`.

What the new direction changes is **Phase 1 scope content** (AI intake + explicit supplier/customer quotation chain), not the phase boundary. **Formal roadmap change is required** to record the AI scope amendment, but **phase merge is not required**.

### 15.3 Phase mapping

| Capability | Current phase | Proposed architectural position | Conflict? | Action |
|---|---|---|---|---|
| Customer communication intake | Phase 1 (manual, `FK-D11`) | Phase 1 (AI-proposal + human approval) | **Yes (`FK-D11`)** | Supersession §6 |
| AI interpretation / extraction | Excluded from Phase 1 | Phase 1 (proposal-only) | **Yes** | New decision + roadmap amendment |
| Human approval → CRM | Phase 1 | Phase 1 | No | Reinforced |
| Requirements / allocation / validation | Phase 1 (HF-06/HF-08 planned) | Phase 1 | No | Unchanged; `FK-D12` plan |
| Workspace / Info Complete gate | Phase 1 | Phase 1 | No | Unchanged (DG-2/D-C) |
| Supplier Quotation Request + response/pricing | Phase 1 (planned) | Phase 1 | No | Unchanged (`FJK-SQ-D05…D12`) |
| Customer Quotation | Pre-invoice CRM (`FK-D17`); Phase 1 boundary | Phase 1 (pre-invoice) | No | Formalise gate §13 |
| Customer confirmation | Pre-invoice commercial | Pre-invoice | No | Unchanged (`FK-D14`) |
| Invoice | Phase 3 boundary | Trip-initiation boundary | No | Unchanged (`FK-D15/D16`) |
| Trip / Operations | Phase 2 | Phase 2 | No | Unchanged; deferred |

---

## 16. Deal vs Trip boundary

**Verified — no collapse.**

- Deal remains the **pre-invoice commercial container** (`FK-D01`, `FK-D04`, `FK-D17`).
- Trip remains the **enduring operational/commercial unit beginning at the approved invoice boundary** (`FK-D15`; Master Plan Phase 2 "Key rule").
- The new direction operates entirely pre-invoice; it does not move operational ownership into the Deal or the Deal into Trip.
- No source document was found that contradicts `Deal != Trip`. If one exists, it must be reported, not silently corrected.

**Conclusion:** the new direction **honours** `Deal != Trip`. Any future change would require a **separate explicit architecture decision**.

---

## 17. Decision matrix

| Existing decision | Current frozen meaning | New direction | Conflict? | Required action |
|---|---|---|---|---|
| **FK-D11** | Phase 1 manual human-in-the-loop; WhatsApp automation deferred | AI interpretation/extraction with mandatory human approval in Phase 1 | **YES** | Controlled revision: supersede automation-deferral clause; new `FK-D18` candidate |
| **FK-D01** | Deal = opportunity container | Unchanged | No | None |
| **FK-D04** | CRM owns relationship/enquiry | CRM authoritative after approval | No | None |
| **FK-D05** | Trip owns operational requirements from Trip initiation | Unchanged (pre-invoice stays CRM) | No | None |
| **FK-D06** | ERPNext owns financial records | Unchanged | No | None |
| **FK-D10** | Communication context; no silent Deal guessing | Constrains AI (no authoritative Deal assignment) | No | Reinforce in AI decision |
| **FK-D12** | Native-first; high-risk gate | AI integration must pass the gate | No | Apply gate; future PLAN |
| **FK-D13** | Frozen env/security baseline | Unchanged | No | None |
| **FK-D14** | Written confirmation is evidence | Unchanged; no conflation | No | None |
| **FK-D15** | Trip at invoice creation | Unchanged | No | None |
| **FK-D16** | ERPNext Customer at first invoice | Unchanged | No | None |
| **FK-D17** | Pre-invoice commercial state CRM-owned | Consistent; quotation chain pre-invoice | No | Formalise gate |
| **FJK-SQ-D01…D12** | Supplier quotation workflow decisions | Extended to customer-side intake | No | None (extend) |
| **DG-2 / D-C** | Info Complete workspace-controlled, reversible | Reinforced; unapproved AI ≠ Info Complete | No | None |
| **HF-06 / HF-08** | Aggregate allocation; advisory PASS/WARNING/ERROR/NOT DETERMINABLE | AI proposes requirements, not allocations | No | None |
| **Deal != Trip** | Pre-invoice vs operational boundary | Honoured | No | None |
| **Info Complete semantics** | Sufficient to request supplier pricing | Distinguish from "supplier received"/"quotation ready" | No | Formalise 3-state distinction |
| **Master Plan §Phase 1 item 6** | No automated extraction/classification in Phase 1 | AI extraction permitted (proposal-only) | **YES** | Amend under controlled revision |
| **Master Plan §7 NOT NOW** | "premature AI automation" | AI intake intended now | **YES (partial)** | Narrow the entry |
| **Phase 1 Manual Intake Direction** | Manual; automation deferred | AI-proposal layer added | **YES** | Amend (direction doc) |
| **Roadmap §1 not-implemented list** | Extraction not implemented | Still true today; becomes planned | No (for now) | Update when scope changes |

---

## 18. Required supersessions / amendments

### 18.1 MINIMUM required supersession (to accept AI into Phase 1)

1. **Register a new FROZEN-eligible decision** (candidate **`FK-D18`**): *AI-assisted interpretation/extraction of customer communication is permitted in Phase 1 as proposal-only, with mandatory human approval (accept/edit/reject), mandatory source provenance, and no autonomous allocation or Deal-context assignment; CRM remains authoritative only after human approval.*
2. **Supersede/narrow the `FK-D11` "automation deferred / no extraction" clause** via explicit controlled revision (Decision Register lifecycle: `FK-D11` → `SUPERSEDED` in part, or narrow scope with the change recorded).
3. **Amend Master Plan §Phase 1 item 6** to permit proposal-only AI extraction under human approval.
4. **Narrow Master Plan §7 "premature AI automation"** so it no longer contradicts the now-intended AI intake proposal layer.

### 18.2 OPTIONAL related amendments

- Amend the **Phase 1 Manual Communication Intake Direction** §3 to record the AI-proposal addition (retaining manual determination of Contact/Organization/Deal).
- Update the **Frozen Roadmap §1 not-implemented list** and phase plan when (and only when) AI scope is formally approved — a new roadmap version, not a silent edit.
- Align wording with **`FJK-SQ-D08`** (automated supplier reply intake is already an approved *direction*) to avoid asymmetrical treatment of supplier vs customer intake.

### 18.3 DECISIONS THAT MUST REMAIN UNCHANGED

- **Human responsibility** for Contact/Organization/Deal determination (intent of `FK-D11` retained).
- **`FK-D10`** (explicit communication context wins; no silent Deal guessing).
- **`FK-D12`** (native-first; high-risk gate).
- **`FK-D13`** (frozen environment/security baseline).
- **`FK-D14`** (written confirmation evidence).
- **`FK-D01`, `FK-D04`, `FK-D05`, `FK-D06`, `FK-D15`, `FK-D16`, `FK-D17`**.
- **`FJK-SQ-D01…D12`** (supplier quotation workflow decisions).
- **DG-2 / D-C** (Info Complete control).
- **HF-06 / HF-08** decisions (aggregate allocation; advisory validation).
- **`Deal != Trip`**.
- **LLM principles** (Evidence → Observation → Suggestion; output must not invent facts or become authoritative silently).

---

## 19. Decisions remaining frozen

These remain FROZEN/in force and compatible; no action:

`FK-D01`, `FK-D02`, `FK-D03`, `FK-D04`, `FK-D05`, `FK-D06`, `FK-D07`, `FK-D08`, `FK-D09`, `FK-D10`, `FK-D12`, `FK-D13`, `FK-D14`, `FK-D15`, `FK-D16`, `FK-D17`; `FJK-SQ-D01…D12`; DG-2/D-C; HF-06/HF-08 operator decisions; `Deal != Trip`; Info Complete semantics (as clarified in §11/§12).

Only `FK-D11` (automation clause) and the two Master Plan clauses (§18.1) are in conflict and require controlled revision.

---

## 20. Future PLAN requirements

Each requires its own `PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFY → EVIDENCE → FREEZE` cycle (`FK-D12`):

1. **AI + provenance implementation PLAN** — AI boundary, proposal lifecycle, provenance data model, approval workflow, source storage/access.
2. **Supplier Quotation end-to-end PLAN** — request generation, versioned template, send, reply intake, extraction/review, pricing incorporation, traceability.
3. **Customer Quotation PLAN** — data model, versions `V1…Vn`, Final Quotation representation, gating enforcement.
4. **Structured allocation BUILD PLAN** (HF-06/HF-08) — already planned (`FK-D12` Implementation Plan); still not authorized.
5. **Roadmap amendment PLAN** — Phase 1 scope update recording AI intake and the quotation chain.

All are **future**; none is authorized by this document.

---

## 21. Governance sequence

The repository **already has formal mechanisms**; none is invented here:

- **Decision Register §1** lifecycle: `PROPOSED → DECIDED → FROZEN → SUPERSEDED`; frozen-decision rule (`STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE`).
- **Decision Register §3 / Master Plan §9 Change Control** (record what changed, why, affected phase, consequences, whether prior work needs reconsideration).
- **Decision Check Standard §2/§3** (mandatory PLAN/BUILD Decision Check).

Recommended sequence:

```
ARCHITECTURE RECONCILIATION            (this document)
        ↓
OPERATOR REVIEW of this reconciliation
        ↓
EXPLICIT FK-D11 SUPERSESSION DECISION  (controlled revision, Decision Register §1)
        ↓
NEW DECISION RECORD: candidate FK-D18  (FROZEN after review) +
   mark FK-D11 automation clause SUPERSEDED
        ↓
ROADMAP / ARCHITECTURE UPDATE          (new roadmap version; Master Plan amendments;
                                        Phase 1 Manual Intake Direction amendment)
        ↓
AI + PROVENANCE IMPLEMENTATION PLAN    (FK-D12 high-risk gate)
        ↓
SUPPLIER QUOTATION END-TO-END PLAN
        ↓
CUSTOMER QUOTATION PLAN
        ↓
EXPLICIT BUILD AUTHORIZATION (per workstream, separately)
```

Each arrow is a separate, explicit governance event. No arrow may be skipped or combined silently.

---

## 22. Explicit non-authorization

- **No** source code changes.
- **No** DocType/schema/custom-field changes.
- **No** CRM/database changes.
- **No** AI implementation.
- **No** supplier or customer quotation implementation.
- **No** build; **no** migration.
- **No** configuration/integration changes.
- **No** freeze.
- **No** modification of any FROZEN document (including `FK-D11`, the Decision Register, the Forward Implementation Roadmap, and the End-to-End Data-to-Quotation Architecture Decision v0.1).
- **No** commit; **no** push.

This document is additive and analysis-only.

---

## 23. Decision Check

Per `docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md`:

| Decision ID | Relevant? | Compliance | Notes |
|---|---|---|---|
| FK-D11 | Yes | **CONFLICT** | AI extraction in Phase 1 vs "manual/no automation" — reported §5/§6; requires controlled revision |
| FK-D01 | Yes | PASS | Deal remains opportunity container |
| FK-D04 | Yes | PASS | CRM authoritative after approval |
| FK-D05 | Yes | PASS | Pre-invoice stays CRM-owned |
| FK-D06 | Yes | PASS | No ERPNext/financial change |
| FK-D10 | Yes | PASS | AI cannot silently assign Deal context |
| FK-D12 | Yes | PASS | Future AI work must pass the high-risk gate |
| FK-D13 | Yes | PASS | Frozen baseline untouched |
| FK-D14 | Yes | PASS | Written confirmation preserved |
| FK-D15 | Yes | PASS | Trip at invoice; unchanged |
| FK-D16 | Yes | PASS | ERPNext Customer timing; unchanged |
| FK-D17 | Yes | PASS | Pre-invoice commercial ownership; consistent |
| FJK-SQ-D01…D12 | Yes | PASS | Extended, not contradicted |
| DG-2 / D-C | Yes | PASS | Info Complete control preserved |
| HF-06 / HF-08 | Yes | PASS | Allocation/validation decisions preserved |
| Deal != Trip | Yes | PASS | Honoured |
| Master Plan §Phase 1 item 6 | Yes | **CONFLICT** | "no automated… extraction… in Phase 1" — requires amendment |
| Master Plan §7 "premature AI automation" | Yes | **CONFLICT (partial)** | Requires narrowing |

**Outcome:** reconciliation completed; two conflict clusters reported (`FK-D11`, Master Plan Phase 1 clauses); **no** conflict resolved; **no** BUILD authorized. Resolution requires the §21 governance sequence.

---

## 24. Report summary (for the operator)

- **Document path:** `docs/architecture/FeelJapanK-End-to-End-Architecture-Reconciliation-v0.1.md`.
- **Reconciliation status:** complete (read-only); conflicts reported, none resolved.
- **`FK-D11` conclusion:** direct contradiction; requires explicit controlled supersession (recommended: partial — retain human-determination intent, supersede automation-deferral clause; new candidate `FK-D18`).
- **Frozen decisions affected:** `FK-D11` (automation clause), Master Plan §Phase 1 item 6 and §7 (not register entries, but frozen-authority planning text); all others compatible.
- **Phase-boundary conclusion:** phase merge **not required**; Phase 1 scope must be formally amended; Customer Quotation stays pre-invoice (Phase 1).
- **Supplier-gate conclusion:** Info Complete enables **request only**; Customer Quotation requires incorporated supplier pricing.
- **New decisions requiring explicit approval:** AI boundary; provenance; approval lifecycle; AI platform (`FK-D12`); supplier request traceability; roadmap amendment; candidate `FK-D18`.
- **Unresolved questions:** provenance data model; AI proposal lifecycle; source storage/access; supplier request snapshot; supplier response ingestion; supplier pricing model; customer quotation data model; exact Info Complete rules; post-Info-Complete changes; re-quotation triggers; formal roadmap amendment scope.

**Change rule:** substantive later changes create a v0.2.
