# FeelJapanK Phase 1 — Business Requirements, Capability & Architecture Reconciliation

**Project:** FeelJapanK
**Subject:** Platform-neutral reconciliation of Phase 1 business requirements, capabilities, and architecture
**Version:** v0.1
**Status:** PROPOSED / PLAN — **NOT FROZEN**
**Nature:** Reconciliation and capability-assessment authority only. It authorizes **no** implementation, schema, configuration, CRM data change, remediation, or scope freeze.
**Repository:** `/home/yusmarin/frappe-crm`
**Session HEAD:** `7664bf23349053b18da3d328c48d58355c1112ef` (branch `main`)

---

## 1. Purpose

Establish what FeelJapanK **requires**, and how that requirement maps to Frappe and other platforms, **before** deciding what to accept, defer, customise, build, or integrate.

This document exists because earlier Phase 1 material sometimes reasoned in the form *"native Frappe CRM lacks X, therefore X is deferred/not required."* That reasoning conflates four materially different things:

- **A.** the **business requirement** is not needed;
- **B.** the **implementation sequence** is deferred;
- **C.** a particular **platform implementation** is deferred;
- **D.** only the **full operational system** is assigned to a later phase.

This document separates them and never converts B/C/D into A.

## 2. Relationship to existing Phase 1 authority

- Extends, does not replace, the authority hierarchy in `AGENTS.md`.
- Preserves all FROZEN decisions in `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` unchanged.
- Does **not** modify Business Requirements v0.2, the Workflow Requirements v0.1, the human UI evidence, or any historical assessment — those remain authoritative/historical as-is.
- Findings that touch a FROZEN decision are recorded as **proposals requiring controlled revision**, never enacted here.

## 3. Platform-neutral requirement principle

The mandatory order is:

```
FeelJapanK business requirement
→ required operator workflow
→ required information/data model
→ capability assessment
→ native Frappe capability
→ Frappe configuration/customisation
→ other Frappe components
→ other appropriate tools/integrations/custom application components
→ implementation architecture
→ scope decision
```

Frappe CRM is **one implementation platform**, not the boundary of the solution. A requirement is not reduced, deferred, or redesigned merely because the current native CRM does not provide it.

## 4. Source authorities and traceability

| Authority | Status | Role here |
|---|---|---|
| `docs/business/Field-Japan-K-Business-Workflow-Requirements-v0.1.md` | APPROVED — BUSINESS BASELINE | Primary business requirement source |
| `docs/business/FeelJapanK-Business-Requirements-Consolidation-v0.2.md` | WORKSHOP CONSOLIDATED — BASELINE | Consolidated business decisions |
| `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` | FROZEN | Settled decisions incl. FK-D01..FK-D17 |
| `docs/architecture/…Communication-Context-Rule…FROZEN.md` | FROZEN | Contact/Deal context rule |
| `docs/architecture/…Opportunity-Start-Lead-Usage-Rule…FROZEN.md` | FROZEN | Deal creation / new-vs-existing |
| `docs/architecture/…Phase1-Manual-Communication-Intake-Direction…v0.1.md` | APPROVED DIRECTION | Manual Phase 1 intake |
| `docs/business/…Implementation-Master-Plan-v0.1.md` | Project reference | Phase sequencing |
| `docs/operations/…SOP-v0.2.md`, `…Template-v0.2.md`, `…Checklist-v0.1.md`, `…Operating-Convention-v0.1.md` | PROPOSED / PILOT | Operator conventions (not frozen) |
| `docs/operations/…Pilot-Test-Results-v0.1.md`; `…Completion-Assessment-v0.1-RECOVERED.md` | RECOVERED / PILOT | Assessment evidence |
| `docs/evidence/phase1/FeelJapanK-Phase1-Human-UI-Test-Evidence-v0.1.md` | EVIDENCE — IMMUTABLE | Genuine human UI-01…UI-10 observations (91) |

## 5. Recovered business architecture

End-to-end lifecycle (`Workflow §1`): **Customer enquiry → requirements → supplier procurement → quotation → customer confirmation → payment → supplier fulfilment → pre-departure → trip → additional arrangements → post-trip → financial closure → ongoing customer relationship.**

Two-layer model with an invoice boundary:

```
Organization → Contact(s) → Deal (enquiry / commercial opportunity)
   → supplier sourcing / RFQ + supplier quotation        (pre-invoice; CRM Deal-owned, FK-D17)
   → customer quotation V1 → negotiation/amendments → V2/V3… → CONFIRMED   (CRM Deal)
   → written customer confirmation                        (FK-D14)
   → customer invoice created   ← TRIP INITIATION (FK-D15)
   → Trip (enduring operational/commercial unit)          (FK-D02, FK-D05)
   → payment → supplier fulfilment → during-trip → additional arrangements
   → post-trip → financial/operational closure
```

- **Deal** = one commercial opportunity/enquiry container (`FK-D01`); CRM owns relationship + enquiry context (`FK-D04`) and the whole **pre-invoice commercial state** — pre-Trip requirements, supplier quotations/re-quotes, customer quotation versions V1..Vn, negotiation history, written confirmation evidence, CONFIRMED snapshot (`FK-D17`, FROZEN).
- **Trip** = the **central operational and commercial unit** (`Workflow §3`; `BR §1`), a real business object — **not** a "Trip summary" and **not** reducible to Deal fields. It is **initiated only at customer invoice creation** (`FK-D15`).
- A customer may have multiple simultaneous Deals and multiple Trips (`Workflow §2`, `§3`).

## 6. Requirement reconciliation register

Statuses: RETAINED · CLARIFIED · EXPANDED · SUPERSEDED · REOPENED · OPEN · DEFERRED · REJECTED. Original wording is preserved by reference; nothing is deleted.

| ID | Requirement (source) | Status | Basis / note |
|---|---|---|---|
| RC-R01 | Enquiry → Deal; genuine-commercial-enquiry threshold (`Opportunity-Start §2`) | RETAINED | Frozen rule. |
| RC-R02 | Incomplete ≠ not an opportunity (`Opportunity-Start §3`) | RETAINED | Frozen rule. |
| RC-R03 | Explicit commercial context identifies the Deal; phone fallback only (`FK-D10`) | RETAINED | Frozen. |
| RC-R04 | Multiple simultaneous Deals per Organization (`FK-D03`) | RETAINED/CLARIFIED | Capability exists; **operational distinguishability** is OPEN. |
| RC-R05 | New vs existing (amendment stays; new request → new Deal) (`FK-D03`, `SOP §5`) | RETAINED | Frozen rule. |
| RC-R06 | Deal owns pre-invoice requirements context (`FK-D17`, `BR §2`, `Workflow §5.2`) | **EXPANDED** | Required; current pilot represents it as prose only. |
| RC-R07 | Operator can see current request/state without reconstruction (`Template §15`, DoD-5) | **REOPENED** | Human evidence shows not achieved. |
| RC-R08 | Quotation lifecycle V1→V2→…→CONFIRMED; versions are authoritative history (`BR §4–§5`) | **EXPANDED** | Business requirement; representation OPEN. |
| RC-R09 | Negotiation history captured (`BR §4`) | **EXPANDED** | Business requirement; representation OPEN. |
| RC-R10 | Written customer confirmation = sufficient evidence; manual marking (`FK-D14`, `BR §6`) | CLARIFIED | "What is confirmed" context must be visible. |
| RC-R11 | Quotation readiness model (`Template §16`) | **OPEN** | Was "to be derived"; human evidence now exists. |
| RC-R12 | Supplier sourcing / RFQ + supplier quotation (pre-invoice) (`Workflow §9/§10`) | **REOPENED** | Business requirement; compilation mechanism OPEN. |
| RC-R13 | Supplier commitment / fulfilment (post-invoice) (`BR §11`, `Workflow §14`) | RETAINED | Phase 2/Trip-owned. |
| RC-R14 | Contact roles (owner/sales/finance/ops) (`Workflow §2`) | **OPEN** | No Deal-level native role field. |
| RC-R15 | Contact ↔ Organization ↔ Deal relationship/context (`Communication Context Rule`) | **EXPANDED** | Human evidence: context/role not visible. |
| RC-R16 | Amendment/revision history preserved (`BR §4`, `SOP §6`) | **REOPENED** | Representation weak (date-only comments, no revision action). |
| RC-R17 | Trip = central enduring operational/commercial unit (`Workflow §3`, `BR §1`) | **RETAINED (core)** | Must not be flattened into Deal. |
| RC-R18 | Trip identity/lifecycle/components/operational requirements (`Master Plan Phase 2`) | RETAINED | Phase 2 implementation. |
| RC-R19 | Additional arrangements as structured records (`BR §8`) | RETAINED | Phase 1 commercial / Trip operational. |
| RC-R20 | Group/traveller attributes (`Workflow §4`) | RETAINED | Operational planning data. |
| RC-R21 | During-trip / post-trip / completion / expenses (`BR §17–§20`) | RETAINED | Phase 2/Trip-owned. |
| RC-R22 | Trip initiated at invoice; confirmation does not initiate (`FK-D15`) | RETAINED | Frozen boundary. |
| RC-R23 | Phase 1 manual, human-in-the-loop intake (`FK-D11`) | RETAINED | Frozen/approved. |
| RC-R24 | WhatsApp automation / AI extraction / auto-routing | **DEFERRED** | Genuine deliberate business decision. |
| RC-R25 | ERPNext commercial/finance | DEFERRED | Phase 3 sequencing. |
| RC-R26 | P01 integration | DEFERRED | FK-D07; no concrete requirement now. |
| RC-R27 | Operational next action (owner/action/due) (`Operating Convention §5`) | CLARIFIED | Native `next_step` + Task; capacity limit noted. |
| RC-R28 | Fresh-operator comprehension (`Master Plan §8` DoD-5) | **REOPENED** | Not achieved per UI-10. |
| RC-R29 | Completed/closed Deal & Trip history retained (`BR §19`, `FK-D17`) | CLARIFIED | Archive/visibility expectation OPEN. |

## 7. Business capability catalogue

| Capability | ID | Primary requirement(s) | Phase relevance |
|---|---|---|---|
| A. Request/Trip context on the Deal | RC-CAP-A | RC-R06, RC-R07 | Phase 1 (pre-invoice) |
| B. Current request & state visibility | RC-CAP-B | RC-R07 | Phase 1 |
| C. Multiple-Deal distinguishability | RC-CAP-C | RC-R04 | Phase 1 |
| D. Contact/Org/Deal context & roles | RC-CAP-D | RC-R14, RC-R15 | Phase 1 |
| E. Amendment/revision history | RC-CAP-E | RC-R16 | Phase 1 |
| F. Quotation lifecycle (versions/negotiation/CONFIRMED) | RC-CAP-F | RC-R08, RC-R09 | Phase 1 (CRM Deal-owned) |
| G. Confirmation context | RC-CAP-G | RC-R10 | Phase 1 |
| H. RFQ readiness | RC-CAP-H | RC-R11 | Phase 1 |
| I. Supplier RFQ compilation | RC-CAP-I | RC-R12 | Phase 1 (pre-invoice) |
| J. Operational next action | RC-CAP-J | RC-R27 | Phase 1 |
| K. Fresh-operator comprehension | RC-CAP-K | RC-R28 | Phase 1 |
| L. Trip object & operations | RC-CAP-L | RC-R17..RC-R22 | Phase 2 |
| M. Additional arrangements | RC-CAP-M | RC-R19 | Phase 1 commercial / Phase 2 operational |
| N. ERPNext financial | RC-CAP-N | RC-R25 | Phase 3 |

## 8. Trip capability register (prevents flattening; Phase 2 design deferred)

Trip is a **core business object**. This register records its requirements and phase classification only; it does **not** design the Phase 2 implementation.

| Trip capability | Source | Classification |
|---|---|---|
| Trip identity/reference | `Master Plan Phase 2` | Business requirement; **Phase 2 implementation** |
| Trip lifecycle & operational status | `Workflow §3`, `Master Plan Phase 2` | Business requirement; Phase 2 |
| Operational requirements (from initiation) | `FK-D05`, `Master Plan Phase 2` | Business requirement; Phase 2 |
| Responsible person | `Master Plan Phase 2` | Business requirement; Phase 2 |
| Components / services | `Master Plan Phase 2`, `Workflow §6` | Business requirement; Phase 2 |
| Supplier options/selection/procurement/re-quotes | `Master Plan Phase 2`, `Workflow §9` | Business requirement; Phase 2 (operational) |
| Group/traveller attributes | `Workflow §4` | Business requirement; Phase 1 collection, Phase 2 operational |
| Amendments (material, same Trip) | `FK-D03`, `Master Plan Phase 2` | Business requirement; Phase 2 |
| Additional arrangements | `BR §8` | Business requirement; Phase 1 commercial / Phase 2 operational |
| During-trip events | `BR §17` | Business requirement; Phase 2 |
| Final itinerary | `Master Plan Phase 2` | Business requirement; Phase 2 |
| Post-trip report + client feedback | `BR §18` | Business requirement; Phase 2 |
| Completion criteria | `BR §19` | Business requirement; Phase 2 |
| Cancellation | `BR §16`, `Master Plan Phase 2` | Business requirement; Phase 2 |
| Internal expenses / rough profitability | `BR §20` | Business requirement; Phase 2 |

**Boundary reminder:** pre-invoice request/quotation/confirmation context is CRM-Deal-owned (`FK-D17`); Trip is initiated only at invoice (`FK-D15`). Full Trip design is a separate future Phase 2 PLAN.

## 9. Operator workflow expectations (Phase 1)

- Understand **what a Deal is about** at first view (request/trip context), without reconstructing from history.
- Distinguish multiple Deals for one customer.
- Understand **who** each Contact is and their role/context for the request.
- See the **current request/state**, and the **current quotation/version** and what is confirmed.
- Record amendments with preserved, dated history.
- Determine **RFQ/quotation readiness**, compile supplier RFQ inputs, and know the **next action** (owner/action/due).
- A fresh operator can understand what to do without undocumented tribal knowledge.

## 10. Capability-to-platform assessment (12 axes per capability)

For each of RC-CAP-A…N the following are assessed: (1) business requirement; (2) desired operator workflow; (3) required data/information model; (4) current native Frappe CRM capability; (5) possible native configuration; (6) possible Frappe customisation; (7) possible custom DocTypes/child tables; (8) possible custom UI/workspace/form actions; (9) possible automation/integration; (10) other appropriate tools/systems; (11) architectural implications; (12) what remains unknown.

Summary directions (assessment only; no selection made):

| Capability | Native today | Candidate options (not selected) | Unknown (RC-Q) |
|---|---|---|---|
| A | Deal + prose Note | config/layout · custom child table for requested components · structured fields | RC-Q01 |
| B | no native summary | pinned Note · custom summary fields · custom UI | RC-Q02 |
| C | list/global search limited | list column config · custom summary field · search approach | RC-Q03 |
| D | no Deal-level role | native `Contact.designation`/`department` · custom child field · convention | RC-Q04 |
| E | Note versioning + date comments | Comments convention · structured revision model (convention currently forbids change-log DocType) | RC-Q05 |
| F | **no quotation object** | files+Note+Comments · custom Quotation/Version DocTypes · later ERPNext-native (post-boundary only) | RC-Q06 |
| G | Note/Comment/File | convention · structured confirmation record | RC-Q07 |
| H | none | checklist (doc) · readiness fields · custom object | RC-Q08 |
| I | none | generate from structured request data · template export · operator-compiled | RC-Q09 |
| J | `next_step` (140) + Task | retain convention · link to Task | RC-Q10 |
| K | workspace/dashboard | documentation · workspace/form layout · onboarding | RC-Q11 |
| L | none | Phase 2 custom layer (`BR §23` names a "custom Trip/Operations layer") | RC-Q12 |
| M | none native structured | Phase 1 commercial representation + Phase 2 Trip record | RC-Q13 |
| N | absent | ERPNext (Phase 3) | RC-Q14 |

## 11. Native Frappe capability assessment

Platform facts (verified from source/runtime; not scope decisions): no native global search in the tested workflow; limited Deal list context (no Deal ID/summary columns); `CRM Contacts` without Deal-level role/designation (Frappe `Contact.designation` exists but is not surfaced on the Deal); `FCRM Note` as a global note with version history and repeatable titles; Activity/Comments date-only with no amendment action; **no native quotation-version object; no native Trip object; no native RFQ compilation**; `Deal.next_step` = Data (native capacity 140); CRM Task has no version history; 0 custom DocTypes/fields/scripts/workflows in use.

## 12. Customisation possibilities

Custom fields; child tables; custom DocTypes (e.g., structured pre-invoice request/requirements, quotation + quotation version, confirmation, additional arrangement, readiness); form/list/workspace customisation; server/client scripting; a custom Frappe application; existing Frappe apps/modules. Any of these that changes the frozen Phase 1 boundary must pass the FK-D12 high-risk gate (see §17). None is selected here.

## 13. Other-tool / integration possibilities

N8n or other automation; external service/API; another platform component. ERPNext remains post-financial-boundary only (`FK-D06`, `FK-D16`). P01 remains canonical for identity with no integration now (`FK-D07`). No new tool is assumed required; the assessment must show Frappe cannot appropriately support a requirement before introducing another component.

## 14. Unresolved architecture questions

| ID | Question |
|---|---|
| RC-Q01 | Minimal structured pre-invoice request/trip context model on the Deal? |
| RC-Q02 | How is current request/state summary represented and surfaced? |
| RC-Q03 | Deal identification/search architecture for multiple Deals? |
| RC-Q04 | Contact role/context model on the Deal? |
| RC-Q05 | Amendment/revision history representation? |
| RC-Q06 | Quotation + version model and authority (FK-D17)? |
| RC-Q07 | Confirmation record/context representation? |
| RC-Q08 | RFQ/quotation readiness model? |
| RC-Q09 | Supplier RFQ compilation mechanism and data source? |
| RC-Q10 | Next-action representation (retain convention vs link Task)? |
| RC-Q11 | Fresh-operator comprehension approach (documentation vs UI)? |
| RC-Q12 | Where the Trip layer lives (custom Frappe app vs other) — Phase 2? |
| RC-Q13 | Additional-arrangement representation across the invoice boundary? |
| RC-Q14 | ERPNext quotation document introduction (Phase 3)? |

## 15. Traceability — human UI observations ↔ capabilities

| Human evidence (UI IDs) | Capability |
|---|---|
| UI-01-O01–O08, UI-06, UI-10-O01–O03 | RC-CAP-K, RC-CAP-A |
| UI-02-O10–O17, UI-05-O01, UI-07-O01/O02, UI-08-O01, UI-09-O01–O03, UI-10-O06 | RC-CAP-A, RC-CAP-B, RC-CAP-C |
| UI-03-O03–O07, UI-10-O07/O08, UI-04-O01–O03 | RC-CAP-D |
| UI-05-O02–O05, UI-07-O04/O06/O07, UI-10-O11–O13 | RC-CAP-E, RC-CAP-G |
| UI-08-O01–O07, UI-09-O01–O05 | RC-CAP-F, RC-CAP-H, RC-CAP-I |
| UI-07-O10, UI-10-O14/O15 | RC-CAP-J |
| UI-10-O10 | RC-R29, RC-CAP-L |
| UI-04-O05, UI-05-O06, UI-06, UI-08-O07, UI-09-O05 | RC-R23 (correct human-in-the-loop stop) |

## 16. Proposed documentation amendments

Handled by minimal amendments (separate BUILD) to the **pilot** docs, with original wording preserved in history notes; historical evidence docs remain untouched; `Master Plan §10` amended with a history trail:

- `…SOP-v0.2.md` §16/§17 — reclassify quotation-versioning deferral as REOPENED-pending-reconciliation.
- `…Operating-Convention-v0.1.md` §6/§8/§12 — flag implementation constraints as pilot assumptions.
- `…Template-v0.2.md` §16.2 — mark readiness "to be derived" as OPEN.
- `…Implementation-Master-Plan-v0.1.md` §10 — update stale position with "Superseded position (historical)" block.
- Untouched: FROZEN docs, Business Requirements, Workflow, human evidence, Pilot Test Results, 1B RECOVERED, evidence reconstruction, runtime snapshot, PNGs, `versions.lock`.

## 17. Proposed next-stage decisions & controlled-revision path

1. Resolve `RC-Q01…RC-Q14` as explicit decisions (this document supports, does not decide).
2. For any decision that changes the frozen Phase 1 boundary, run: `STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE` (FK-D12 high-risk gate).
3. Then — and only then — a **separately authorized** remediation/implementation PLAN.
4. No Scenario M; no operational pilot until closure criteria are satisfied.

## 18. Governance / safety

This reconciliation performed no implementation, configuration, schema, or CRM-data change; did not modify the human evidence or any FROZEN decision; created no test scenario; and made no commit or push. It is a PROPOSED / PLAN document.
