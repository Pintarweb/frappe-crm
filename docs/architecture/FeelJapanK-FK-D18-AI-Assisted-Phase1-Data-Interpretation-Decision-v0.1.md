# FeelJapanK — FK-D18 — AI-Assisted Phase 1 Data Interpretation Decision — v0.1

| Field | Value |
|---|---|
| Document | `FeelJapanK-FK-D18-AI-Assisted-Phase1-Data-Interpretation-Decision-v0.1` |
| Project | FeelJapanK |
| Version | v0.1 |
| Decision ID | **FK-D18** — registered in the Decision Register as **FROZEN** (2026-10-06) |
| Status | **FROZEN DECISION (architecture/scope) — NO BUILD AUTHORIZATION** |
| Nature | Proposed controlled **partial supersession** of `FK-D11`. Analysis/permission record only; authorizes no implementation. |
| Repository | `/home/yusmarin/frappe-crm` |
| Date | 2026-10-06 |
| Modifies `FK-D11` in place | **No.** |
| Modifies the frozen Decision Register in place | **No.** |
| Modifies any frozen document | **No.** |
| Change rule | Substantive later changes create a **v0.2**; this v0.1 is not silently edited. |

> **Status meaning.** The operator explicitly approved this partial supersession on 2026-10-06. `FK-D18` is now **FROZEN** in the Decision Register, following the repository lifecycle (`PROPOSED → DECIDED → FROZEN`). `FK-D11` is recorded **FROZEN (PARTIALLY SUPERSEDED by FK-D18)**. This is an **architecture/scope permission only**; it authorizes no implementation (see §10, §11, §14).

---

## 1. Purpose

Record a controlled **partial supersession** of `FK-D11`, triggered by the operator's explicit decision that **AI-assisted interpretation/extraction with mandatory human approval and mandatory source provenance is now intended to be part of the FeelJapanK Phase 1 workflow**.

This decision:

- **Preserves** the human-determination principle of `FK-D11`.
- **Supersedes only** the part of `FK-D11` (and the corresponding Master Plan Phase 1 clauses) that prohibits/deferred automated extraction/AI-assisted interpretation in Phase 1.
- Keeps AI output as **PROPOSAL**, never authoritative CRM truth.

It does **not** alter `FK-D11` itself, the frozen Decision Register, or any frozen document.

---

## 2. Source material

Read and preserved (read-only):

1. `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` — `FK-D11` entry and lifecycle; §1 frozen-decision rule; §3 Change Control.
2. `docs/business/FeelJapanK-Implementation-Master-Plan-v0.1.md` — Phase 1 item 6 ("…**no** automated WhatsApp intelligence, routing, extraction, or classification in Phase 1"); Phase 1 shape; §7 "Explicitly NOT NOW — premature AI automation"; §9 Change Control.
3. `docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md` — §2 rationale; §3 Phase 1 operating model (human determines Contact/Organization/Deal/requirements/evidence/context); automation deferred.
4. `docs/architecture/FeelJapanK-End-to-End-Data-to-Quotation-Architecture-Decision-v0.1.md` — the operator-approved direction.
5. `docs/architecture/FeelJapanK-End-to-End-Architecture-Reconciliation-v0.1.md` — reconciliation analysis (conflict, supersession options, phase mapping).
6. `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` (FROZEN).
7. `docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md` (FROZEN).
8. `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Workflow-Decisions-v0.1.md` (`FJK-SQ-D01…D12`).
9. `docs/evidence/phase1/FeelJapanK-Phase1-HF-06-HF-08-Operator-Validation-Decisions-v0.1.md`; `…FK-D12-Implementation-Plan-v0.1.md`.
10. `docs/architecture/FeelJapanK-Phase1-N1-Presentation-Operator-Decisions-v0.1.md` (DG-2 / D-C).
11. `docs/business/FeelJapanK-Business-Requirements-Consolidation-v0.2.md` (Evidence → Observation → Suggestion principle).

Terminology and intent are preserved. No frozen decision is silently corrected or reinterpreted.

---

## 3. Core decision (candidate FK-D18)

> **FK-D18 (candidate):** AI-assisted Phase 1 data interpretation/extraction is architecturally permitted **under mandatory human approval and mandatory source provenance**.

Precisely stated:

- **Retained from `FK-D11`:** *human determination remains authoritative.*
- **Superseded from `FK-D11`:** *the blanket Phase 1 prohibition/deferment of automated extraction / AI-assisted interpretation.*
- **Unchanged:** AI output remains a **PROPOSAL**, **not** authoritative CRM truth.

This is a **partial** supersession. No other part of `FK-D11` is superseded.

---

## 4. Mandatory AI boundary

### 4.1 AI MAY

- inspect customer communication supplied through approved channels;
- interpret/extract candidate requirements;
- propose structured CRM values;
- identify dates;
- identify passenger quantities/composition;
- identify destinations/routes;
- identify transportation requirements;
- identify accommodation requirements;
- identify meal requirements;
- identify activities/guide requirements;
- identify special requirements;
- associate proposed information with its source;
- provide confidence/uncertainty indicators.

### 4.2 AI MUST NOT

- silently create authoritative CRM information;
- silently approve its own output;
- silently mark Info Complete;
- autonomously decide final transportation allocation;
- autonomously decide final accommodation allocation;
- autonomously request supplier quotation;
- autonomously generate customer quotation;
- bypass human review;
- remove or obscure source provenance.

### 4.3 Authority table

| Layer | Determined by | Authority |
|---|---|---|
| Customer source | Customer | Customer truth |
| AI interpretation | AI | Proposal only |
| Proposed data | AI (+ provenance) | Non-authoritative |
| Human approval | Operator | Mandatory gate |
| Authoritative CRM | Human approval | Operator truth |
| Allocation (intended fulfilment) | Operator | Operator decision |
| Validation outcome | System | Calculated (advisory) |

---

## 5. Human approval requirement

- Human review is **mandatory**.
- The operator may **ACCEPT**, **EDIT/CORRECT and ACCEPT**, or **REJECT** (defer permitted).
- **Only accepted information becomes authoritative CRM data.**
- **AI confidence is never equivalent to human approval.**
- Proposal and human disposition are both retained (rejected/corrected proposals are not silently discarded).
- Approval must be attributable (who/when), consistent with `FJK-SQ-D02` audit expectations.

The architecture must preserve the distinction between:

```
Customer truth
AI interpretation
Operator-approved truth
System-calculated truth
Supplier truth
```

These must never be conflated.

---

## 6. Provenance requirement

Every AI-derived data item must retain an accessible **source reference**. The operator must be able to trace a proposed/approved CRM value **back to the original customer evidence**.

At architectural level, provenance must support, as applicable:

- source type;
- source reference/location;
- original content/evidence;
- timestamp/context;
- AI interpretation;
- human action;
- approval state.

**Non-decision:** the final database schema is **not** designed here. Implementation mechanics are not decided here unless already frozen elsewhere.

---

## 7. Info Complete boundary

Preserve the established commercial gate (DG-2 / D-C; `FJK-SQ-D02`):

- **AI proposals cannot satisfy Info Complete by themselves.**
- Info Complete remains a **human/operator-controlled** gate.
- **Info Complete means:** customer-side travel requirements have been sufficiently collected, interpreted, reviewed, approved, and structured to request supplier pricing.
- Info Complete **enables** the Supplier Quotation Request.
- Info Complete does **NOT** mean:
  - supplier quotation received;
  - supplier pricing received;
  - customer quotation ready;
  - final commercial completion.

---

## 8. Supplier / customer quotation sequence

Preserved unchanged:

```
Authoritative CRM Deal
 → Workspace review
 → Info Complete
 → Supplier Quotation Request
 → Supplier Response / Pricing
 → Completed Deal commercial data
 → Customer Quotation preparation
```

- Customer quotation must begin **only after** supplier pricing has been received/incorporated.
- **AI cannot bypass this sequence.**

---

## 9. Phase boundary

This decision **does NOT merge Phase 1 and Phase 2.** Recorded reconciliation conclusion:

- **Phase 1 is the pre-invoice commercial workflow**, including:
  - customer communication / data acquisition;
  - AI interpretation;
  - human approval;
  - CRM information gathering;
  - requirement / allocation / validation;
  - Workspace;
  - Info Complete;
  - Supplier Quotation;
  - Supplier Pricing;
  - Customer Quotation;
  - quotation confirmation/negotiation where already architecturally assigned.
- **Trip remains bounded at the invoice/operational boundary** (`FK-D15`).
- **`Deal != Trip` remains unchanged** (`FK-D01`/`FK-D17`).
- Any roadmap amendment required to reflect Customer Quotation as part of pre-invoice Phase 1 scope must be handled **separately** (this document does not amend the roadmap).

---

## 10. What this decision does NOT authorize

**FK-D18 is an architectural permission/decision only.** It does **NOT** authorize:

- AI platform selection;
- AI provider integration;
- AI APIs;
- background workers;
- webhooks;
- WhatsApp AI extraction;
- email AI extraction;
- document OCR;
- transcription;
- provenance schema;
- proposal DocTypes;
- CRM schema changes;
- source-document storage changes;
- automatic supplier request;
- supplier response ingestion;
- supplier pricing implementation;
- customer quotation implementation.

Each requires subsequent `PLAN → REVIEW → APPROVAL → BUILD` governance.

---

## 11. FK-D12 relationship

Any implementation touching Deal-owned data, CRM integration, AI integration, provenance structures, or related custom architecture **must undergo the appropriate `FK-D12` review/gate before BUILD**.

**Approval of FK-D18 does not constitute `FK-D12` approval for any future implementation.** `FK-D18` is a scope/permission decision; `FK-D12` remains the native-first / high-risk gate applied per implementation.

---

## 12. Supersession scope — before / after matrix

| Existing `FK-D11` principle / clause | Treatment under FK-D18 | Reason |
|---|---|---|
| Human agent determines the Contact/person | **RETAINED** | Core human-control intent; AI may propose, human decides |
| Human agent determines the Organization | **RETAINED** | `FK-D04`, `FK-D10`; no silent assignment |
| Human agent determines existing vs new Deal | **RETAINED** | `FK-D10`; AI must not assign Deal context authoritatively |
| Human determines known requirements | **RETAINED** | AI may propose requirements; approval mandatory |
| Human determines evidence/artifacts | **RETAINED** | Provenance/evidence preservation reinforced |
| Human determines additional context | **RETAINED** | Human authority preserved |
| CRM not required to automatically infer/assign Deal context | **PARTIALLY SUPERSEDED** | AI may *propose* context (non-authoritative); never auto-assign. Human inference requirement relaxed only for proposal generation |
| Intake is manual and human-in-the-loop | **PARTIALLY SUPERSEDED** | "Manual" relaxed to "human-approved"; human remains in the loop |
| Automation deferred | **PARTIALLY SUPERSEDED** | Operator now intends AI proposal assistance in Phase 1 |
| "No automated WhatsApp intelligence, routing, extraction, or classification in Phase 1" (Master Plan item 6) | **PARTIALLY SUPERSEDED** | Extraction/interpretation now permitted as proposal-only; routing/classification remain non-authoritative and human-approved |
| "Explicitly NOT NOW — premature AI automation" (Master Plan §7) | **PARTIALLY SUPERSEDED** | The AI intake proposal layer is now intended; other premature-automation exclusions unaffected |
| Human authority / human-in-the-loop principle | **RETAINED** | Unchanged and reinforced |
| No autonomous authoritative decision-making | **RETAINED** | AI never authoritative without human approval |
| Supplier-side automated reply intake direction (`FJK-SQ-D08`, separate) | **UNAFFECTED** | Supplier-side; already an approved direction; not governed by FK-D11 |
| LLM principles: Evidence → Observation → Suggestion; output must not invent facts or become authoritative silently | **RETAINED / REINFORCED** | Consistent with FK-D18; now binding on the intake layer |
| Roadmap "Not implemented: … extraction" | **UNAFFECTED (today)** | Still factually true now; becomes planned scope via separate roadmap amendment |
| Exact AI platform / model / integration | **REQUIRES FUTURE DECISION** | Subject to `FK-D12` and separate PLAN |
| Provenance data model | **REQUIRES FUTURE DECISION** | Separate PLAN |
| Human approval lifecycle / UI | **REQUIRES FUTURE DECISION** | Separate PLAN |
| Roadmap/Phase-1 scope amendment | **REQUIRES FUTURE DECISION** | Separate controlled roadmap change |

**Minimum supersession (as intended):**

- **RETAIN:** human determination; human authority; no autonomous authoritative decision-making.
- **SUPERSEDE:** the blanket prohibition/deferment of AI-assisted extraction/automation in Phase 1.
- Nothing else is superseded unless source documents demonstrate it necessary.

---

## 13. Dependency impact

Starting from the reconciliation conclusion (compatible unless repository evidence shows otherwise), FK-D18 is assessed as follows:

| Decision | Impact | Assessment |
|---|---|---|
| `FK-D01` (Deal container) | None | Compatible |
| `FK-D04` (CRM owns relationship/enquiry) | None | Compatible; CRM authoritative after approval |
| `FK-D05` (Trip owns operational requirements from Trip initiation) | None | Compatible; pre-invoice stays CRM |
| `FK-D06` (ERPNext financial ownership) | None | Compatible |
| `FK-D10` (communication context; no silent Deal guessing) | Reinforced | AI must not assign Deal context authoritatively |
| `FK-D12` (native-first / high-risk gate) | Reinforced | Applies per future implementation |
| `FK-D13` (frozen env/security baseline) | None | Compatible |
| `FK-D14` (written confirmation evidence) | None | Compatible; no conflation |
| `FK-D15` (Trip at invoice) | None | Compatible; unchanged |
| `FK-D16` (ERPNext Customer at first invoice) | None | Compatible |
| `FK-D17` (pre-invoice commercial ownership) | None | Compatible; AI-derived approved data CRM-owned |
| `FJK-SQ-D01…D12` | None | Compatible; supplier flow unchanged |
| DG-2 / D-C (Info Complete control) | Reinforced | AI cannot mark Info Complete |
| HF-06 / HF-08 (aggregate allocation; advisory validation) | None | Compatible; AI proposes requirements, not allocations |
| `Deal != Trip` | None | Compatible; unchanged |

No new conflicts are introduced or invented.

---

## 14. Governance status

- **STATUS: FROZEN DECISION (architecture/scope).**
- **FROZEN** in the Decision Register on 2026-10-06 (via `PROPOSED → DECIDED → FROZEN`), following explicit operator approval and controlled reconciliation.
- `FK-D11` is recorded **FROZEN (PARTIALLY SUPERSEDED by FK-D18)**; the `FK-D11` decision document itself was **not** altered.
- This document **is** additive; it does not itself edit the frozen register or `FK-D11`.
- `FK-D18` is a **permission/scope decision only** and authorizes **no implementation**.

---

## 15. Next governance gate

Governance sequence (items 1–4 **completed** 2026-10-06; items 5–8 **pending**):

1. **Operator review** of `FK-D18`. — **DONE (2026-10-06).**
2. **Explicit approval** of the `FK-D18` partial supersession. — **DONE (2026-10-06).**
3. **Controlled update/supersession** of the Decision Register per the repository's established mechanism (Decision Register §1/§3; Master Plan §9). — **DONE** (`FK-D18` FROZEN; `FK-D11` partially superseded).
4. **Controlled amendment** of the Master Plan / roadmap Phase 1 scope. — **DONE** (Master Plan amended; Roadmap v0.2 created; Intake Direction v0.2 created).
5. Separate **AI + provenance implementation PLAN**. — **Pending.**
6. Separate **supplier quotation end-to-end PLAN**. — **Pending.**
7. Separate **customer quotation PLAN**. — **Pending.**
8. **Explicit BUILD approvals** (per workstream, separately). — **Pending.**

---

## 16. Decision Check

Per `docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md`:

| Check | Answer | Notes |
|---|---|---|
| Does FK-D18 contradict any retained principle of `FK-D11`? | **NO** | Human determination/authority retained |
| Does it supersede only the automation-deferral portion? | **YES** | Partial supersession only |
| Is human approval mandatory? | **YES** | Accept/edit/reject required |
| Is provenance mandatory? | **YES** | Source reference per AI-derived item |
| Can AI become authoritative without human approval? | **NO** | Explicitly prohibited |
| Can AI mark Info Complete? | **NO** | Operator-only gate |
| Can AI autonomously trigger supplier quotation? | **NO** | Sequencing preserved |
| Can AI autonomously generate customer quotation? | **NO** | Requires incorporated supplier pricing |
| Does Deal remain distinct from Trip? | **YES** | `Deal != Trip` unchanged |
| Does this decision merge Phase 1 and Phase 2? | **NO** | Boundary preserved |
| Does this decision itself authorize implementation? | **NO** | Permission only |

| Decision ID | Relevant? | Compliance | Notes |
|---|---|---|---|
| FK-D11 | Yes | **RESOLVED by partial supersession** | `FK-D11` recorded FROZEN (PARTIALLY SUPERSEDED by FK-D18); decision doc unmodified |
| FK-D10 | Yes | PASS | No silent Deal assignment |
| FK-D12 | Yes | PASS | Gate applies to future implementation |
| FK-D13 | Yes | PASS | Baseline untouched |
| FK-D17 | Yes | PASS | Pre-invoice CRM ownership |
| FJK-SQ-D01…D12 | Yes | PASS | Compatible |
| DG-2 / D-C | Yes | PASS | Info Complete preserved |
| HF-06 / HF-08 | Yes | PASS | Allocation/validation preserved |
| Deal != Trip | Yes | PASS | Preserved |

**Outcome:** candidate permission record prepared; no conflict resolved; no implementation authorized.

---

## 17. Provenance / change control

- Authorities reconciled: `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`; `docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md`; `docs/business/FeelJapanK-Implementation-Master-Plan-v0.1.md`; `docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md`; `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md`; `docs/architecture/FeelJapanK-End-to-End-Data-to-Quotation-Architecture-Decision-v0.1.md`; `docs/architecture/FeelJapanK-End-to-End-Architecture-Reconciliation-v0.1.md`.
- `FK-D11` itself is **not** modified in place.
- The frozen Decision Register is **not** modified in place.
- Substantive later changes create a v0.2.

---

## 18. Evidence / governance safety (this task)

Confirmed:

- no source code changes;
- no DocType/schema changes;
- no CRM/database changes;
- no AI implementation;
- no provenance implementation;
- no supplier quotation automation;
- no customer quotation implementation;
- no `FK-D11` in-place modification;
- no Decision Register modification;
- no Forward Implementation Roadmap modification;
- no build; no migration;
- no configuration/integration changes;
- no freeze;
- no commit; no push.

This document is additive and analysis/permission-only.
