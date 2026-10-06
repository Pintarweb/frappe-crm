# FeelJapanK Phase 1 — Post-Implementation Human UX Acceptance — Consolidated Findings — v0.1

**Document status:** HUMAN ACCEPTANCE EVIDENCE — PHASE 1 STAGE 1 (consolidated post-implementation operator findings)
**Scope:** the operator's consolidated post-implementation human UX acceptance findings for the FeelJapanK Stage 1 workspace (Summary / Full Details / Information Status / Info Complete), following UI-01…UI-10 and UX-V1…UX-V8.
**Nature:** additive human evidence. Refinement candidates only. **NOT implementation authorization. NOT a freeze.** No code, schema, permission, integration, or CRM record change is authorized by this document.

> The operator's findings are preserved as given and are not reinterpreted, relabelled, or downgraded. One finding (§11) carries a controlled decision note in §4 that retains the frozen Info Complete behaviour.

---

## 1. Provenance and distinction

- Source: genuine operator observations captured post-implementation (human). These are the previously-unpersisted consolidated findings referenced as the "known gap" in the Phase 1 reconstruction baseline; recording here closes that gap.
- These observations are **human acceptance evidence**. They are explicitly distinguished from OpenCode testing, browser-agent testing, automated/API testing, and technical verification.
- Prior human evidence remains unchanged and additive:
  - `docs/evidence/phase1/FeelJapanK-Phase1-Human-UI-Test-Evidence-v0.1.md` (UI-01…UI-10)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Post-Implementation-Human-UX-Verification-v0.1.md` (incl. §8 retest UX-V1…UX-V8)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Post-Implementation-Human-UX-Finding-Assessment-v0.1.md`

---

## 2. Consolidated findings (verbatim)

### 2.1 Deal identification and prominence

Observation
- The Deal title, displayed as something like CRM Deal 2026 0010, is not prominent enough.
- The Deal title should be much larger/more obvious because it immediately tells the operator what Deal they are looking at.
- The current generic Deal numbering is not particularly meaningful to the operator.

Business identifier observation
- Operator prefers a more client-reflective identifier such as:
  - 2026 ABC 001
- This is a business identifier/data-model decision, not yet an approved implementation change.

Additional observation
- Showing the total number of Deals in the system is not useful to the operator and does not need to be prominent.

### 2.2 Workspace navigation / tab structure

The corrected requirement is:
Keep the existing two tabs:
Summary | Full Details

Do not remove, merge, or move either of them.
Add a new workflow tab after them:
Summary | Full Details | Supplier Quotation

Later, when the capability exists:
Summary | Full Details | Supplier Quotation | Customer Quotation

And eventually, in Phase 2:
Summary | Full Details | Supplier Quotation | Customer Quotation | Trip

Meaning of the tabs
- Summary — concise business-level understanding of the Deal.
- Full Details — granular information collected for the Deal.
- Supplier Quotation — supplier quotation/request workflow.
- Customer Quotation — customer-facing quotation workflow.
- Trip — future operational Trip capability; Phase 2.

This preserves the distinction that Summary and Full Details are Deal information views, while the later tabs represent workflow stages/capabilities.

### 2.3 Remove redundant Summary ↔ Full Details buttons

Because Summary and Full Details are persistent tabs:
- See Full Details button becomes redundant.
- Back to Summary button becomes redundant.
Navigation should happen through the tabs.

### 2.4 Summary is too compact

The operator wants the Summary to answer:
What is this Deal about, what are we arranging, and what is its current state?

Instead of mainly displaying individual fields, the Summary should present meaningful business-category summaries.
Examples given:

Transportation
8-seater, 4 days

Accommodation
Tokyo hotel, 1 night with breakfast

Meals
Relevant meal arrangement / requirement

The principle is:
Summary = business meaning and operational context.
Not a dump of database fields.

### 2.5 Full Details should contain the granular specifications

The Full Details tab should contain the detailed information behind the Summary.
For example:

Transportation
- routes
- transfers
- vehicle requirements
- detailed transport specifications

Accommodation
- hotel/location
- room type
- twin sharing
- room requirements
- square metres where relevant
- other accommodation specifications

Meals
- meal-by-meal details
- requirements
- optional items
- special meal requirements

The distinction is therefore:
Summary = concise business interpretation
Full Details = complete collected specification

### 2.6 "Shared fields captured" count is not useful

The current display of something like:
Shared fields captured: X

Does not provide useful operational information to the operator.
The operator wants to know what the information is, rather than how many fields happen to contain values.
This should therefore not be treated as an important Summary element.

### 2.7 Deal context needs to be more business-specific

The current Deal context contains things such as:
- destination
- date/timeframe
- total pax
- commercial intent
- duration
- trip purpose
- Info Complete

The operator's observation is that some of these are either vague or obvious.
For example:
Commercial intent = quotation wanted
Does not add much useful information when the operator is already working on a quotation request.
The Summary should prioritize information that helps the operator understand the Deal.

### 2.8 Passenger breakdown needs to be visible

The operator specifically wants the passenger composition rather than only total pax.
For example:
18 pax
14 adults
3 children
1 infant
This should be understandable from the Summary without having to reconstruct it from individual fields.

### 2.9 Scope/category needs to be clearer

The operator wants to immediately know what the customer is asking for.
Examples:
- Full package
- Transportation only
- Accommodation only
- Activities/tickets
- Combination of components

This is related to the existing component information, but the desired UX is a clear business-level representation.
This does not yet authorize creation of a new scope-category field. It is a finding/UX requirement to be assessed.

### 2.10 Requirements need clearer business meaning

The operator wants to understand:
- What information has already been collected?
- What information still needs to be obtained?
- What does the client need to provide?
- Which requirements are optional?
- Which are necessary/required?

The current Requirement/Readiness presentation was questioned because they appear overlapping from the operator's perspective.
The conceptual distinction remains:
- Requirement = what information/requirement needs to be known or fulfilled.
- Readiness = whether the Deal has enough information to proceed.

However, the presentation may need to be simplified or combined so the operator does not have to interpret two technical concepts separately.

### 2.11 Info Complete must be controlled from CRM

The operator's preferred workflow is:
1. Work on information gathering in the FeelJapanK workspace.
2. Workspace indicates whether the Deal appears ready.
3. When the operator believes information gathering is complete, workspace provides an action such as:
   Ready to mark Info Complete
4. Clicking it takes the operator to the native CRM Deal.
5. The operator performs the actual Info Complete state change in CRM.
6. CRM then provides the continuation toward Supplier Quotation.

Therefore:
Workspace = understand/review/navigate
CRM = formal editing/state change

The workspace should not independently modify Info Complete.

> **Controlled decision note:** this recommendation is **NOT accepted**; see §4. The frozen behaviour (workspace-authoritative Info Complete) is retained.

### 2.12 Supplier Quotation should not dominate before Info Complete

The operator does not want the quotation workflow displayed prominently while information gathering is still incomplete.
Preferred flow:
Information Gathering
↓ complete collection
Ready to mark Info Complete
↓ go to CRM
Mark Info Complete in CRM
↓
Supplier Quotation becomes the next relevant workflow

Therefore the Supplier Quotation tab can exist as part of the overall Deal workflow, but its content/action area should be conditional on the Deal reaching the appropriate state.
The operator specifically said the lower quotation/version area should not be displayed as though it is already relevant while information gathering is incomplete.

### 2.13 CRM → Workspace continuation

The operator raised concern about opening CRM and then losing the FeelJapanK workspace context.
Agreed conceptual workflow:
1. FeelJapanK workspace remains the primary workspace.
2. Operator opens CRM as a temporary/new tab when formal CRM editing is required.
3. Operator marks Info Complete in CRM.
4. CRM provides a Continue to Supplier Quotation path.
5. The existing FeelJapanK workspace tab is brought back/focused.
6. Workspace re-fetches the Deal state.
7. Supplier Quotation becomes the active/relevant workflow area.

The goal is:
Do not create duplicate FeelJapanK workspace tabs unnecessarily.
The existing workspace should remain the operator's working context.

### 2.14 Workflow progression

The emerging workflow is:
Summary | Full Details | Supplier Quotation | Customer Quotation | Trip

With the understanding that:
- Summary and Full Details are available from the beginning.
- Supplier Quotation becomes relevant after Info Complete.
- Customer Quotation follows the supplier quotation/commercial workflow.
- Trip is a future Phase 2 capability.

This is the latest corrected interpretation.

### 2.15 Consolidated operator UX model

The operator's desired experience can be summarized as:

Summary — "What is this Deal?"
Show:
- prominent Deal identity
- customer/company
- destination/travel context
- dates/timeframe
- passenger composition
- requested scope/categories
- concise component summaries
- current Deal status
- next action
- important outstanding information
- relevant attention indicators where appropriate

Full Details — "What exactly have we collected?"
Show:
- detailed transportation requirements
- accommodation specifications
- meal details
- activities/tickets
- guide requirements
- special requirements
- individual requirement states
- supporting evidence
- detailed itinerary/travel information already captured

Supplier Quotation — "What are we asking suppliers, and what have they quoted?"
Only becomes operationally relevant after information gathering is complete.

Customer Quotation — "What are we offering the customer?"
Later workflow stage.

Trip — "What are we operating?"
Phase 2.

### 2.16 Status of these findings

These observations should remain human acceptance evidence / refinement candidates.
They should not yet be converted directly into implementation changes.
In particular, these require separate assessment/decision before coding:
1. New Deal numbering convention.
2. Removing the Deal count from the UI.
3. Exact Summary category layout.
4. Exact Full Details layout.
5. How scope/categories are represented.
6. How Requirement vs Readiness should be presented.
7. Conditional Supplier Quotation visibility/activation.
8. CRM → existing workspace return/focus mechanism.
9. Exact tab behavior and state transitions.

The tab structure itself is now clear:
Summary | Full Details | Supplier Quotation

With later:
Summary | Full Details | Supplier Quotation | Customer Quotation

And eventually:
Summary | Full Details | Supplier Quotation | Customer Quotation | Trip

Most importantly, Full Details remains a tab. It is not being removed or converted into an internal view.

---

## 3. Controlled decision — Finding §11 (Info Complete control)

- The operator's §11 recommendation proposed relocating Info Complete control to CRM and having the workspace not modify it.
- **Decision (2026-10-02): DG-2 / D-C retained as-is.**
  - Info Complete remains **workspace-controlled**.
  - The FeelJapanK workspace remains the place where the operator marks/reopens Info Complete.
  - **No relocation to CRM is required.**
- Rationale: Info Complete is already implemented and technically verified in the workspace; retaining the frozen behaviour avoids an unnecessary reversal.
- Consistency: the frozen roadmap already states Info Complete is workspace-authoritative (`docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md`, line 25: "operator-controlled, reversible, audited via native Frappe Version; workspace-authoritative (D-C retained; DG-2/DG-8)"). **No frozen-document change is required.**
- Consequence: §11 is recorded as **closed / not accepted**. Current implemented behaviour (workspace `set_info_complete`) stands.
- Note: §12 and §13 reference CRM-side state change; their state-transition mechanics are **not authorized** by this decision and remain open (see §5).

---

## 4. Reconciliation against current implementation (read-only, 2026-10-02)

| Finding | Description | Current state | Classification |
|---|---|---|---|
| §1 | Deal title prominence | Rendered at `font-size:24px`; operator wants larger | Refinement candidate |
| §1 | Client-reflective ID (`2026 ABC 001`) | Title derived from org + native numbering | OPEN data-model decision — not authorized |
| §1 | Deal count not useful | No deal count found in the FJK workspace | Likely satisfied / confirm |
| §2 | Tabs `Summary \| Full Details \| Supplier Quotation`; Full Details stays a tab | Exactly these three tabs; Full Details persistent | MATCHES current implementation |
| §3 | Remove redundant buttons | No `See Full Details` / `Back to Summary` buttons | MATCHES |
| §4 | Summary too compact → business categories | Category sections + scope present; not "8-seater, 4 days" style | Partial / open refinement |
| §5 | Full Details granular specs | Tables present; granularity depends on captured data | Partial / open refinement |
| §6 | "Shared fields captured: X" not useful | Analog present: `Collected lines: N` + `Shared fields` section | Open refinement |
| §7 | Deal context too vague/obvious | `commercial intent` shown only in Full Details shared table | Open refinement |
| §8 | Passenger breakdown visible | `paxComposition` shows total + adults/children/infants | MATCHES |
| §9 | Scope/category clearer (`Full package`, etc.) | `scopeLabel` = requested components only | Partial; no new field authorized |
| §10 | Requirement vs Readiness clearer | `get_readiness` + Information Status overlap | Open presentation decision |
| §11 | Info Complete control | Workspace `set_info_complete` + "Mark Info Complete" | **CONFLICT resolved by §3: behaviour retained** |
| §12 | Supplier Quotation conditional before Info Complete | Inactive before; placeholder + prototype after | MATCHES in behaviour |
| §13 | CRM → workspace return/focus | Not implemented | Future (roadmap §9 open) |
| §14 | Workflow progression | Consistent with roadmap | MATCHES |

---

## 5. Not authorized by this document

This document does **not** authorize, and the next stage must not silently introduce:
- Deal numbering/identity change;
- removal of Deal count;
- Summary/Full Details layout changes;
- scope/category field creation;
- Requirement vs Readiness presentation change;
- Supplier Quotation visibility/activation change;
- CRM → workspace return/focus mechanism;
- tab behaviour/state-transition change;
- any Customer Quotation or Trip work.

Each remains subject to its own assessment and, where applicable, its own PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFICATION → HUMAN ACCEPTANCE → FREEZE cycle.

---

## 6. Evidence metadata / update

- Evidence persistence only. No code change, no CRM data change, no schema/permission/integration change.
- Prior human evidence (`Human-UI-Test-Evidence-v0.1`, `Post-Implementation-Human-UX-Verification-v0.1`, `Post-Implementation-Human-UX-Finding-Assessment-v0.1`) remains preserved and is not replaced by these findings.
- Continuity: closes the "known gap" recorded in the Phase 1 reconstruction baseline memory for the previously-unpersisted targeted acceptance observations.
- Recorded via OpenCode session on 2026-10-02.
