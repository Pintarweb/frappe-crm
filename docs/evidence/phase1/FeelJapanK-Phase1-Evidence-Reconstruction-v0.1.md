# FeelJapanK Phase 1 — Evidence Reconstruction / Human UAT Readiness Assessment — PLAN (Reconciled)

**Document status:** RECONCILED — read-only analysis preserved
**Mode:** PLAN (analysis only; no runtime/config/DB change)
**Repository:** `/home/yusmarin/frappe-crm`
**Session HEAD:** `7664bf23349053b18da3d328c48d58355c1112ef` (branch `main`)
**Basis:** repository/runtime inspection at HEAD `7664bf2` plus the recovered Phase 1B assessment subsequently supplied via `docs/operations/FeelJapanK-Phase1-Completion-Assessment-v0.1-RECOVERED.md`.

**Purpose:** Establish what is known from available evidence, what supports each conclusion, what has been tested, what remains uncertain, and what still requires genuine human-operator testing. This document does **not** design Human UAT and does **not** declare Phase 1 complete.

---

## Evidence-status convention

- **[E]** Established evidence — repo source, runtime, DB, git.
- **[D]** Documented claim — a document/report asserts it (including the recovered Phase 1B); not independently proven.
- **[A]** Agent observation — produced by agent-executed UI testing.
- **[I]** Inference.
- **[U]** Unknown / not established.

---

## Decision Check (PLAN)

| Decision ID | Relevant? | Compliance | Notes |
|---|---|---|---|
| FK-D01/D03/D04/D05 | Yes | PASS | Reconstructed only; no change. |
| FK-D06/D08/D16 | Yes | PASS | ERPNext absent; boundaries cited. |
| FK-D07/D09/D10 | Yes | PASS | No integration; explicit-context rule cited. |
| FK-D11/D12 | Yes | PASS | Manual intake; 0 customization verified. |
| FK-D13 | Yes | PASS | Runtime matches frozen baseline; read-only checks. |
| FK-D14/D15/D17 | Yes | PASS | Confirmation/invoice boundaries restated only. |

No conflict; no FROZEN decision opened, reinterpreted, or revised.

---

## 1. Executive Evidence Summary

- Repo `main` @ `7664bf2`, **dirty** (untracked Phase 1 docs + evidence) [E].
- Runtime live: Frappe 15.121.1 / CRM 1.84.0 / frappe_whatsapp 1.0.12 / ark_whatsapp_guard 0.0.1; no ERPNext [E, matches [D]].
- No CRM customization: 0 custom DocTypes/fields on CRM objects/scripts/workflows [E].
- FK-D01…FK-D17 FROZEN and internally consistent with business/architecture docs [E].
- Automated/API A–L and UI-01…UI-10 recorded PASS/notes [D]; both ops docs PROPOSED/PILOT and untracked [E].
- The Phase 1B assessment artifact was absent at reconstruction [E]; it is now preserved as **RECOVERED / RECONSTRUCTED** [D]. Its provenance note forbids treating it as newly generated evidence.
- **Genuine human-operator testing has not occurred** — independently documented by recovered 1B §10 [D], corroborating the earlier [I].

---

## 2. Repository / Runtime State

- Branch `main`; HEAD `7664bf23349053b18da3d328c48d58355c1112ef`; ahead of `origin/main` by 5 commits [E].
- Dirty, untracked-only: `docs/evidence/` (10 PNGs + `runtime-state-2026-09-26.txt`) and three ops docs (Operating Convention, Pilot Test Results, Testing & Completion Sequence) [E].
- Tracked authority docs unchanged [E].
- Runtime containers up; site `crm.localhost`; `developer_mode=1`, `server_script_enabled=1` [E].
- Read-only DB counts (this session): Deals=7, Orgs=1, Contacts=3, Leads=0; prohibited DocTypes (`Trip`, `Quotation`, `Sales Order`, `Sales Invoice`, `Customer`, `Item`) absent [E].
- Discrepancy: `bench/sites/apps.json` records ark_whatsapp_guard resolution commit `2ed6a48b…` versus actual/`versions.lock`/G12 freeze `b128d7f3…` [E].

---

## 3. Authority Documents Discovered (classified)

| Class | Documents |
|---|---|
| 1 Authority/FROZEN | Decision Register; Communication Context Rule; Opportunity-Start & Lead Usage Rule; Environment Foundation Freeze; G12 HMAC Guard Freeze; Decision Check Standard |
| 2 Approved/frozen convention | FK-D14/D15/D16/D17 boundaries (Register) |
| 3 Proposed/pilot convention | Manual Communication Intake Direction (APPROVED DIRECTION); SOP v0.2 (PILOT); Template v0.2; Checklist v0.1; Operating Convention v0.1; Testing & Completion Sequence v0.1; Pilot Test Results v0.1 |
| 4 Architecture/design | Business Requirements v0.2; Workflow Requirements v0.1; Implementation Master Plan v0.1; ArkAlliance Reference Conventions v0.1 |
| 5 Completed assessment/verification evidence | Recovered Phase 1B Completion Assessment; Pilot Test Results; runtime snapshot; 10 PNGs |
| 6 Source/implementation | `bench/apps/crm`, `bench/apps/frappe`, `bench/apps/frappe_whatsapp`, `bench/apps/ark_whatsapp_guard` |
| 7 Current runtime/DB | Live containers + read-only SELECTs |
| 10 Unknown/not established | Human-operator testing; P01↔CRM mapping mechanics |

---

## 4. FeelJapanK CRM Purpose and System Boundaries

- FeelJapanK = Malaysia-based B2B Japan land operator; customers = Malaysian travel agents ([D] Communication-Context-Rule:13). Multiple contacts and multiple simultaneous opportunities per customer are the norm.
- CRM owns relationship + enquiry context **and** the pre-invoice commercial state (requirements, supplier quotes/re-quotes, customer quotation versions V1..Vn, negotiation, written confirmation, CONFIRMED snapshot) — FK-D04, FK-D17 ([E] Business-Requirements-v0.2:187-189).
- Trip = downstream operational unit owned outside CRM from Trip initiation onward — FK-D02, FK-D05, FK-D15 ([E] Business-Requirements-v0.2:192).
- ERPNext owns finance from the first invoice; ERPNext Customer created at first invoice — FK-D06, FK-D16 ([E] :194-195).
- P01 canonical for Contact/Company identity; no integration now — FK-D07 ([E] :197-198).
- Trip initiation trigger = customer invoice creation (not Deal Won / payment / quotation confirmation) — FK-D15 ([E] v0.2:8-20).
- Trip/Quotation/Sales Order/Invoice/Customer DocTypes absent at runtime [E].
- P01↔CRM canonical-record mapping mechanics: **NOT ESTABLISHED BY AVAILABLE EVIDENCE** [U].

---

## 5. Established Operating Conventions

| Convention | Evidence | Status |
|---|---|---|
| Genuine-enquiry threshold → Deal; incomplete ≠ not opportunity | Opportunity-Start Rule §2–§3; SOP v0.2 §4 | FROZEN / PILOT |
| New vs existing Deal; multiple Deals per customer | Opportunity-Start Rule §4; SOP v0.2 §5 | FROZEN / PILOT |
| Deal particularity | Opportunity-Start Rule §2 | FROZEN |
| Request Summary = one native FCRM Note per Deal | SOP v0.2 §6; Operating Convention §5 | PILOT / NOT FROZEN |
| Status vocabulary KNOWN/MISSING/TO CONFIRM/CUSTOMER-CONFIRMED/NOT APPLICABLE | Operating Convention §5, §11 | PILOT |
| Components requested or N/A; SELECTED ≠ COMPLETE ≠ RFQ | Operating Convention §6 | PILOT |
| Manual `next_step` (short) + full NEXT ACTION | Operating Convention §5; Test Results §3 | PILOT |
| Ready for Quotation = manual marker; do not repurpose `Ready to Close` | Operating Convention §12 | PILOT |
| Customer confirmation = manual evidence (FK-D14) | SOP v0.2 §13 | FROZEN |
| Pre-invoice cancellation: keep Deal; no custom status | SOP v0.2 §18 | PILOT |
| Manual intake; automation/AI deferred | Intake Direction §3, §5 | APPROVED DIRECTION |
| Pilot discipline: no custom fields/DocTypes/automation | SOP v0.2 §14 | PILOT |

---

## 6. Actual Native Frappe CRM Capabilities

Verified by source + read-only DB:

- Native DocTypes present: `CRM Deal`, `CRM Organization`, `CRM Contacts` (child), `CRM Lead`, `CRM Task`, `FCRM Note`, `CRM Product`, `CRM Deal Status`, plus supporting (territory, industry, lead source, SLA, etc.) — `bench/apps/crm/crm/fcrm/doctype/`.
- `CRM Deal` fields include `organization`, `status` (Link → CRM Deal Status, reqd), `next_step` (Data), `deal_owner`, `contacts` (Table → CRM Contacts), `source`, `territory`, `lead`, email/phone. `next_step` is a plain Data field (native capacity 140).
- `CRM Deal Status` records: Demo/Making, Lost, Negotiation, Proposal/Quotation, Qualification, Open, Ready to Close, Won.
- `CRM Contacts` child fields: contact, full_name, email, mobile_no, phone, gender, is_primary — no role/designation field.
- `FCRM Note`: title, content, reference_doctype, reference_docname; `track_changes=1` → native version history.
- `CRM Task`: title, priority, start_date, assigned_to, status, due_date, description, reference_doctype/reference_docname.
- `CRM Organization`: name, website, logo, employees, revenue, industry, territory, currency, address, exchange_rate.
- Customization state: 0 custom DocTypes; 0 custom fields on CRM objects; 0 Server Scripts; 0 Client Scripts; 0 Workflows. The 8 custom fields belong to non-CRM standard DocTypes.

Distinctions: NATIVE = Deal/Org/Contact/Note/Task/Status/version-history; CUSTOM = none in CRM; CONFIGURATION = app installs + freeze baseline; DOCUMENTED CONVENTION = Request Summary / RFQ marker (not a system feature); NOT ESTABLISHED = quotation/Trip/ERPNext function (absent).

---

## 7. Automated/API Evidence — A–L

Source: `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md` (PROPOSED/PILOT) and recovered 1B §4. Statuses are documented claims [D]; evidence located in the live DB as recorded.

| ID | Purpose | Evidence record | Status | Class |
|---|---|---|---|---|
| A | Transport-only | `CRM-DEAL-2026-00001`, Note `o490jl926c`, Task 1 | PASS | 3 |
| B | Accommodation-only | — | Skipped (redundant) | — |
| C | Tour-guide-only | — | Skipped (redundant) | — |
| D | Multiple guides/languages | `…00002`, Note `0k01c47fpu`, Task 2 | PASS | 3 |
| E | Transport+accommodation | `…00003`, Note `3of8i0k6ot`, Task 3 | PASS | 3 |
| F | Full package | `…00005`, Note `fuqe4sp94i`, Task 4 | PASS (naming-series gap) | 3 |
| G | Amendment 20→24 pax | `…00005`; Comment `muho5gpfj4`; Note version | PASS | 3 |
| H | Distinct new Deal | `…00006`, Note `qeq551rhl5`, Task 5 | PASS | 3 |
| I | Ambiguous comms → human resolution | no record created (correct) | PASS | 1/2 |
| J | Customer confirmation / RFQ | `…00005`; Comment `37581ia5mp`; RFQ=YES | PASS | 3 |
| K | Quotation negotiation/revision | Comments `6f347o7v88`, `6f3euofkco` | PASS | 3 |
| L | Repeat customer / multiple contacts | Contact `Siti`; `…00007`; Note `9srt9g4b0d`; Task 6 | PASS (+2 native Assigned comments) | 3 |

Deviation: blocked Scenario F insert consumed `CRM-DEAL-2026-00004` (no record); `next_step` 171-char failure → convention amended to short `next_step` + full NEXT ACTION in Request Summary/Task. API-level findings only; no human-usability inference.

---

## 8. Previous Phase 1 Completion Assessment (Phase 1B) — RECOVERED

**Provenance [D]:** not present in the repo at reconstruction [E]; supplied subsequently; preserved with original conclusions/terminology; must not be rewritten as newly generated evidence; distinguish the documented assessment from its underlying evidence.

**Reconciled content of the recovered 1B [D]:**

- Decision: **STATE A — READY FOR MANUAL UI TESTING**; **Phase 1 NOT COMPLETE**; Phase 1C/1D required; real pilot must not begin.
- A–L judged sufficient for the CRM-side model; **no genuine Phase 1 gap**; **no Scenario M required**.
- Coverage dispositions mostly PASS; `Contact role distinction` = PARTIAL; `Global Deal search` = LIMITATION; `Structured trip context fields` = LIMITATION.
- Accepted native limitations: no global search; `company_name` text link; Comment edit/delete limits; `next_step` capacity; no quotation object; no Task versioning; no structured trip fields; no message→Deal identification; Sales-User visibility limited to own/assigned Deals.
- Deferred: WhatsApp routing, AI extraction/transcription/classification, auto Deal creation/assignment, structured quotation versioning, custom trip fields, P01/ERPNext/Trip implementation.
- No customization justified; future customization gated by `STOP → PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFY → EVIDENCE → FREEZE`.
- Closure criteria (§12): 9 gates; **gate 8 (Operating Convention reviewed/frozen) unmet** — Convention is still PROPOSED/PILOT [E].
- §10 qualification: UI-01…UI-10 execution was **agent-executed**, not human; the matrix = Phase 1C scope.

**Taxonomy flag [E]:** the matrix states four dispositions (A/B/C/D) but uses `PARTIAL`/`LIMITATION` values not among them. Reported, not silently normalized.

**Reconciliation with repo runtime:** 1B records Deals 6 / Comments 17 (pre-UI-01 A–L state) [D]; runtime snapshot records Deals 7 / Comments 18 (post-UI-01, `CRM-DEAL-2026-00008` + 1 native Assigned comment) [E]. Consistent.

---

## 9. Previous Agent-Executed UI Testing

Source: `Pilot-Test-Results…` UI section; artifacts in `docs/evidence/phase1/manual-ui/` (untracked) + `runtime-state-2026-09-26.txt`.

- UI-01 new Deal via UI → `…00008`; `next_step` absent from create modal → set post-create.
- UI-02 repeat customer → Org page "Deals 7 / Contacts 2"; Deal rows show Organization only → ambiguous; no global search.
- UI-03 multiple contacts → primary + secondary; roles only as Request-Summary prose.
- UI-04 ambiguous inbound → no mutation; clarification prepared.
- UI-05 amendment history on `…00005` (20→24→20).
- UI-06 distinct request distinguishable via Request Summary.
- UI-07 Note/Comment/Task/`next_step`/Version hierarchy.
- UI-08 RFQ=YES with status still Qualification.
- UI-09 quotation negotiation/revision.
- UI-10 cold comprehension of `…00005` → PASS.

Actor stated as agent by recovered 1B §10 [D]. Findings are agent observations [A], not human requirements; no independent human verification.

---

## 10. Agent Testing vs Human Testing — Explicit Distinction

- Automated/API A–L: occurred [D].
- Agent-executed UI (UI-01…UI-10): occurred [A]/[D].
- Genuine human-operator testing: **NOT occurred** [D, recovered 1B §10].
- Therefore none of the above establishes human usability, operator acceptance, operator confidence, real-world workflow suitability, or that the intended operator finds the workflow intuitive. UI-10 "fresh-operator comprehension" was agent-performed — **not** human comprehension evidence.

Prior conflict (UI actor identity) is now **resolved** by recovered 1B §10 [D].

---

## 11. Known Limitations

As documented [D] (SOP v0.2 §16; 1B §6; Communication Context Rule §5): WhatsApp triage/orphan risk; phone-based Deal overwrite; fresh email non-linking; `company_name` text link; no requirement-history/quotation object; no Trip object; no global search; Contact roles non-native; Sales-User visibility scope; first-use overlays [A].

---

## 12. Conflicts / Ambiguities in Evidence

1. UI actor identity → **resolved** by recovered 1B §10 (agent-executed) [D].
2. Phase 1B artifact absent at reconstruction, now RECOVERED [E]/[D] — provenance preserved.
3. Master Plan §10 "CRM not yet designed" vs later execution evidence [E] — **unresolved**.
4. Environment Freeze baseline apps `frappe, crm` vs current +whatsapp+guard [E] — **unresolved**.
5. Guard commit mismatch (`apps.json` vs actual) [E] — **unresolved**.
6. Pilot Test Results status PROPOSED/PILOT yet contains PASS claims [E].
7. 1B taxonomy: declared dispositions vs `PARTIAL`/`LIMITATION` values [E].

---

## 13. Knowledge Boundary

### 13.1 Established
Git/docs/runtime/DB state; native DocType/field structure and Deal statuses; zero CRM customization; FK-D01…D17 FROZEN; business/architectural boundaries; A–L and UI-01…UI-10 as recorded results; freeze docs (Environment, G12).

### 13.2 Observed but Not Formally Established
Agent-recorded UI usability findings (Deal-row ambiguity, no global search, `next_step` absent in create modal, non-native contact roles, first-use overlays); `next_step` effective 140 capacity; naming-series gap at `00004`.

### 13.3 Documented Assumption / Pilot Convention
Request Summary convention; status vocabulary; component marking; manual RFQ marker; `next_step`/NEXT ACTION pairing; SOP/template/checklist/operating convention; Testing & Completion Sequence; Pilot Test Results; recovered Phase 1B. All PROPOSED/PILOT/NOT FROZEN except FROZEN intake direction. Do not elevate to requirements.

### 13.4 Unknown
Real operator behaviour; undocumented business exceptions; real enquiry distribution; mental-model fit; convention adherence in practice; P01↔CRM mapping mechanics; live quotation representation.

### 13.5 Not Yet Human-Tested
All Phase 1C-intended evaluations: finding a customer; identifying the correct Deal among repeat-customer rows; clarity of Deal creation; operator comprehension of terminology; naturally recording an enquiry; knowing where to place information; naturalness of the workflow; whether the CRM matches the operator's mental model; confusion invisible to an agent.

---

## 14. Human UAT Questions Still Open (questions, not test cases)

- Can the operator reliably select the correct existing customer/organization?
- Can the operator distinguish simultaneous Deals for one customer in the current list UI?
- Is Deal creation clear without `next_step` in the modal?
- Does the operator understand the Note/Comment/Task/`next_step`/Version hierarchy without coaching?
- Do the Status vocabulary and "Ready for Quotation" marker make sense and get used correctly?
- Can the operator recognize and stop on an ambiguous communication per FK-D10?
- Does the operator naturally preserve original evidence?
- Does the manual workflow feel practical under real enquiry load?
- Which real exceptions appear that no synthetic scenario anticipated?

---

## 15. Human UAT Readiness Assessment

The evidence base reconstructs the system, boundaries, native capabilities, executed tests, actor identity (agent), the recovered Phase 1B decision, and remaining gaps. It is sufficient to inform a **separate** Human UAT Design stage. It is **not** human-usability or acceptance evidence, and Phase 1 is **not complete** per the project's own closure criteria.

---

## 16. Evidence Gaps / Items Requiring Clarification

1. Phase 1B artifact: absent in repo at reconstruction; now preserved as RECOVERED — retain provenance/status.
2. Persist evidence: test reports, sequence doc, 10 PNGs, runtime snapshot, recovered 1B, and this report (all currently untracked / new).
3. Record actor/method explicitly in the preserved test record.
4. Reconcile Master Plan §10 staleness.
5. Resolve guard-commit mismatch; refresh Environment Freeze baseline.
6. Decide retention of synthetic dataset `ABC Travel` / `…00001–00008` before real pilot.
7. Confirm adoption status of pilot conventions for the human stage (closure criterion 8).
8. Normalize or explicitly accept the 1B `PARTIAL`/`LIMITATION` taxonomy.

---

## Final Assessment

**Is the evidence base sufficiently reconstructed and internally understood to allow a SEPARATE future Human UAT Design stage?**

**Yes — conditionally, with the Phase 1B decision recovered.** Remaining unresolved items to carry forward: (a) persistence/status of the recovered 1B and all untracked evidence, (b) Master Plan §10 staleness, (c) guard-commit and Environment-Freeze baseline drift, (d) closure-criterion 8 (Operating Convention not frozen), (e) the taxonomy flag, and (f) items 13.4/13.5, which only the intended human operator can answer. No Human UAT was designed here.

---

## Governance / Safety Statement

This reconstruction performed no implementation, configuration change, schema change, DB mutation, CRM record creation/deletion/edit, commit, or push. Documentation artifacts were added under `docs/` only.
