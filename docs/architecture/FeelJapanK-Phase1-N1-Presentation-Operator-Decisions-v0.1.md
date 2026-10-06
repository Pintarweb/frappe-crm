# FeelJapanK Phase 1 — N1 Presentation — Operator Decisions (DG-1…DG-7, Candidates #2 & #4) — v0.1

**Document status:** OPERATOR DECISIONS — N1 PRESENTATION (recorded / approved)
**Nature:** additive operator-decision record. Records the operator decisions that resolve the nine parked N1 refinement candidates, plus the Info Complete decision. It does **not** itself authorize BUILD; implementation requires a separate BUILD authorization. It creates **no new data model** (no fields, DocTypes, migration, or naming-series change).
**Scope:** the FeelJapanK Deal workspace presentation for N1 (Summary / Full Details / Information Status / Supplier Quotation activation).

> Decision texts are recorded to preserve the operator's intent. Wording supplied by the operator is preserved; no meaning is inferred beyond it. This document is additive and does not modify any frozen document. The Decision Register (`FK-D01…FK-D17`) remains the frozen cross-project index; this record sits alongside it for the N1 presentation scope.

---

## 1. Provenance

- DG-1, DG-3, DG-4, DG-5, DG-6, DG-7: operator decisions supplied from a prior planning exchange (previously unpersisted).
- DG-2 / D-C: Info Complete gate — already recorded in `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` line 25 (workspace-authoritative; D-C retained; DG-2/DG-8).
- Candidate #2 and Candidate #4: operator decisions supplied 2026-10-02 (with a clarifying amendment to Candidate #4), resolving the two candidates left open by the N1 reconciliation.
- Nine parked refinement candidates originate from `docs/evidence/phase1/FeelJapanK-Phase1-Post-Implementation-Human-UX-Acceptance-Consolidated-Findings-v0.1.md` §2.16.

---

## 2. Decision index (N1)

| ID | Title | Status | Resolves candidate |
|---|---|---|---|
| DG-1 | Deal numbering / identity — Option (a) | Decided | #1 |
| DG-2 / D-C | Info Complete control (workspace-controlled) | Decided (roadmap line 25) | — |
| DG-3 | Persistent tabs | Decided | #9 (with DG-7) |
| DG-4 | Summary content model | Decided | #3 |
| DG-5 | Scope/category — Option (a) | Decided | #5 |
| DG-6 | Requirement vs Readiness — Option (a) | Decided | #6 |
| DG-7 | Supplier Quotation activation + navigation | Decided | #7, #8 |
| Candidate #2 | Deal count | Decided | #2 |
| Candidate #4 | Full Details layout (with amendment) | Decided (presentation/model level) | #4 |

---

## 3. DG-1 — Deal numbering / identity

**DECISION: Option (a).**
- Keep the native CRM Deal identity/naming series unchanged.
- Do not add a new identifier field.
- Do not change the naming series.
- Add only a prominent derived presentation title using existing data, e.g.:
  "ABC Travel · 2026 · #0010"
- Keep the actual CRM Deal ID available in Full Details/evidence.

> Note: the `#0010` string is introduced as an example ("e.g."); the exact token format is not fixed by this decision. The mandatory element is the prominent derived title from existing data, with the native identity unchanged.

---

## 4. DG-2 / D-C — Info Complete control

**DECISION: DG-2 / D-C retained as-is.**
- Info Complete remains **workspace-controlled**.
- The FeelJapanK workspace remains the place where the operator marks/reopens Info Complete.
- No relocation to CRM is required.

Consistent with roadmap line 25: "operator-controlled, reversible, audited via native Frappe Version; workspace-authoritative (D-C retained; DG-2/DG-8)."

---

## 5. DG-3 — Persistent tabs

**DECISION:** Keep the existing tabs and add Supplier Quotation:
`Summary | Full Details | Supplier Quotation`

- Summary remains the default tab.
- Full Details remains a persistent tab.
- Do not remove, merge, move, or convert Full Details into an internal view.
- Remove redundant "See Full Details" and "Back to Summary" buttons.
- Supplier Quotation is visible but conditional/inactive before Info Complete.
- No separate routes or DocTypes for these views.

Future workflow:
`Summary | Full Details | Supplier Quotation | Customer Quotation | Trip`

Customer Quotation and Trip are NOT part of this increment.

---

## 6. DG-4 — Summary content model

**DECISION:** Implement business-category presentation using only existing data.

Summary should prioritize:
- Deal identity
- Customer/company
- Passenger composition
- Scope/requested components
- Transportation
- Accommodation
- Meals
- Activities/Tickets
- Guide
- Special requirements
- Current Deal status
- Next action
- Outstanding information

Remove/de-emphasize:
- "Shared fields captured: X"
- technical field counts
- low-value/obvious fields such as Commercial Intent where it adds little operational value.

Do not invent values that do not exist in the data model.
Do not add new fields in this increment.

---

## 7. DG-5 — Scope/category

**DECISION: Option (a).**
- Derive displayed scope from existing `fjk_components`.
- Example: "Transportation + Accommodation + Activities".
- Where safely derivable, a full-package interpretation may be displayed.
- Do not add an explicit scope field yet.
- If later requirements cannot be represented reliably from components, treat that as a separate data-model decision.

---

## 8. DG-6 — Requirement vs Readiness

**DECISION: Option (a).**
- Present them as one consolidated "Information Status" area.
- Make clear:
  - what is collected,
  - what is still to confirm,
  - what information is needed,
  - what the client needs to provide where represented,
  - whether the Deal is ready to proceed.
- Keep the existing underlying requirement states and `get_readiness` logic unchanged.
- Optional vs required remains deferred.

---

## 9. DG-7 — Supplier Quotation

**ACTIVATION DECISION:**
- Supplier Quotation becomes operationally active when `fjk_info_complete = 1`.
- Before that, the tab may remain visible but must clearly indicate that Information Gathering must be completed first.
- Do not implement the actual Supplier Quotation capability in this increment.

**NAVIGATION:**
- FeelJapanK workspace remains the primary workspace.
- When CRM is opened for native CRM work, return/focus the existing FeelJapanK workspace rather than creating a duplicate workspace tab.
- On return, re-fetch the Deal state so the workspace reflects current CRM state.
- Info Complete remains workspace-controlled per DG-2/D-C; CRM navigation is not required for the Info Complete action itself.

---

## 10. Candidate #2 — Deal count

**DECISION:**
Remove/de-emphasize the total Deal count from the FeelJapanK workspace Summary/presentation.

Rationale:
- The operator does not consider the total number of Deals useful or operationally important when working on a specific Deal.
- The workspace should prioritize the identity, business meaning, current state, outstanding information, and next action of the selected Deal.

This is a presentation decision only.

Do not:
- delete or alter Deals
- change the native CRM Deal list
- change native CRM functionality
- change the Deal naming series
- add/remove database fields
- change Deal numbering
- modify Deal data

Applies to the FeelJapanK workspace presentation only.

---

## 11. Candidate #4 — Full Details layout (with amendment)

**DECISION:** Full Details remains a persistent tab and provides the complete granular specification for the selected Deal.

**Conceptual distinction:**
- **Summary:** "What is this Deal about, what are we arranging, and what is its current state?"
- **Full Details:** "What exactly have we collected/specified for this Deal?"

Full Details should organize existing information by business category rather than present a technical database field dump.

### Category structure (the organizing framework)

1. **Deal / Customer Context** — Company; Deal identity; destination; travel dates; duration; passenger composition; trip purpose / commercial context where captured.
2. **Transportation** — transportation requirement; routes/transfers; vehicle type/capacity; relevant transportation requirements; information state.
3. **Accommodation** — destination/location; hotel requirements; number of nights; room type; occupancy/sharing; breakfast/meals where captured; other accommodation requirements; information state.
4. **Meals** — meal requirements; included/required arrangements where represented; special meal requirements; information state.
5. **Activities / Tickets** — requested activities; requested tickets; relevant details; requirements; information state.
6. **Guide** — guide requirement; relevant guide details; information state.
7. **Special / Other Requirements** — requirements that do not naturally belong to the categories above, using existing requirement/evidence data.
8. **Information Status / Readiness** — the consolidated Information Status defined by DG-6; do not create a second competing readiness model.

Do not invent values that are not present in the existing data model.

### Amendment — flexibility of fields within categories

The fields shown within each category are **not considered permanently fixed by this decision**. The **category structure is the organizing framework**, while the specific fields/details within each category may be expanded or refined when additional operational requirements are identified (e.g. additional Transportation, Accommodation, Meals, Activities/Tickets, Guide, or Special Requirements fields).

Such additions must go through the normal **PLAN → REVIEW → APPROVAL → BUILD → VERIFICATION** lifecycle. Do not create speculative fields now merely to anticipate possible future requirements.

### Principles

1. Full Details remains a persistent tab.
2. Information is grouped by business category.
3. Summary and Full Details remain distinct.
4. Summary provides concise business interpretation.
5. Full Details provides the detailed collected specification.
6. Existing information is used; missing information is not invented.
7. The category structure is established; individual fields within categories remain extensible.
8. New fields may be added later when a genuine operational requirement is demonstrated.
9. Any future new field must go through the normal controlled decision and implementation process.
10. This decision does not itself authorize creation of new fields or DocTypes.
11. Existing requirement states and `get_readiness` semantics remain unchanged.

Status: Candidate #4 is **RESOLVED at the presentation/model level**, allowing controlled future expansion of the fields within each category.

---

## 12. DG-8 and DG-9 — citation record (no meaning inferred)

- **DG-8:** referenced only in `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` line 25: `(D-C retained; DG-2/DG-8)`, in the context of the Info Complete gate. **No title, definition, or decision text exists in the repository.** No meaning is inferred or created here. It is recorded as an **undefined citation**; it is non-blocking for N1 (Info Complete is already decided by DG-2/D-C) and may be clarified or formally dropped in a later controlled step.
- **DG-9:** **does not exist** in any repository file, commit, or stash. No decision is created.

---

## 13. Scope boundary

- **In N1 (workspace presentation-only):** DG-1 derived title; DG-3 tabs; DG-4 Summary content; Candidate #2 Deal-count de-emphasis; DG-5 scope derivation; DG-6 consolidated Information Status; Candidate #4 Full Details category model; DG-7 Supplier Quotation activation.
- **Out of N1:** DG-7 CRM → workspace return/focus — a decided requirement whose implementation needs a native CRM-side hook (custom Deal-form affordance / link and tab re-fetch), i.e. a separate controlled increment; all Supplier Quotation, Customer Quotation, and Trip capability work.
- **Explicitly forbidden in N1:** new fields/DocTypes, migration, naming-series change, native CRM list/functionality change, CRM frontend fork, unrelated remediation.

---

## 14. Governance / evidence metadata

- Additive record only. No code, schema, permission, integration, CRM record, or git-state change is made by this document.
- Does not modify any frozen document. The frozen roadmap already states the Info Complete behaviour and cites DG-2/DG-8; this record supplies the decision texts for DG-1/3/4/5/6/7 and Candidates #2/#4.
- Recording this decision set satisfies the governance precondition (decisions authoritative in the repository before BUILD).
- Recorded via OpenCode session on 2026-10-02.
