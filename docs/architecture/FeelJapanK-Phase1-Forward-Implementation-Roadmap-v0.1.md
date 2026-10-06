# FeelJapanK Phase 1 — Forward Implementation Roadmap — v0.1

**Status:** FROZEN — forward implementation roadmap / handoff reference
**Lifecycle:** `PROPOSED → persisted → read-only verification (passed) → FROZEN`. Substantive later changes create a **v0.2**; the frozen v0.1 is not silently edited.
**Scope:** forward implementation strategy and handoff reference for OpenCode sessions.
**Nature:** planning/roadmap only — **authorizes no implementation**. Extends, never overrides, frozen decisions and existing authorities. Substantive later changes create a v0.2; the frozen v0.1 is not silently edited.

**Provenance / authorities reconciled:**
- `docs/architecture/FeelJapanK-Phase1-Business-Requirements-Capability-Architecture-Reconciliation-v0.1.md`
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Workflow-Decisions-v0.1.md`
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Capability-Architecture-Plan-v0.1.md`
- `docs/architecture/FeelJapanK-Phase1-Customer-Quotation-Itinerary-Generation-Capability-Plan-v0.1.md`
- `docs/architecture/FeelJapanK-Phase1-Quotation-Itinerary-Continuity-Addendum-v0.2.md`
- `docs/architecture/FeelJapanK-Phase1-Deal-Information-Gathering-and-Supplier-Quotation-Request-Reconciliation-v0.2.md`
- `docs/operations/FeelJapanK-Phase1-Native-CRM-Pilot-Operating-Convention-v0.1.md`, `…Deal-Information-Gathering-Template-v0.2.md`, `…Manual-Enquiry-Deal-SOP-v0.2.md`
- Human evidence: `docs/evidence/phase1/FeelJapanK-Phase1-Human-UI-Test-Evidence-v0.1.md` (UI-01…UI-10), `…Post-Implementation-Human-UX-Verification-v0.1.md` (UX-V1…UX-V8), `…Post-Implementation-Human-UX-Finding-Assessment-v0.1.md`
- Decision Register (`FK-D01…D17`); `FK-D12` (native-first/high-risk gate), `FK-D15` (Trip at invoice), `FK-D16` (ERPNext), `FK-D17` (pre-invoice commercial state).

---

## 1. Current state
- **Implemented and technically verified (Increments 1/2 + N1):**
  - Custom app `feeljapank_crm`; **9 DocTypes** — `FJK Quotation` (+ submittable `FJK Quotation Version`, `FJK Quotation Version Item`, `FJK Quotation Confirmation`, `FJK Quotation Negotiation Entry`) and `FJK Deal Component` / `FJK Deal Requirement Line` / `FJK Deal Guide Requirement` / `FJK Deal Activity Item`.
  - **D1** custom fields + layout on native `CRM Deal` (18 `fjk_*` fields, incl. `fjk_ready_for_quotation`, `fjk_info_complete`).
  - **Info Complete gate** — per-Deal, operator-controlled, reversible, audited via native Frappe Version; **workspace-authoritative** (D-C retained; DG-2/DG-8).
  - Read-only `get_deal_summary` (shared fields, four child grids, advisory outstanding rollup, evidence).
  - Desk Page `fjk-workspace` with persistent tabs **Summary | Full Details | Supplier Quotation**; Workspace `FeelJapanK`; Vite/frappe-ui bundle.
  - Backend smoke tests **54/54**.
- **N1 presentation** (derived prominent title; business-category Summary; Full Details tab; consolidated Information Status; tab navigation; conditional Supplier Quotation tab) — **built and technically verified** (not yet human-accepted).
- **Controlled test Deal:** `CRM-DEAL-2026-00010` (ABC Travel; Qualification; 2 components; 2 requirement lines). Existing FJK `FJK-QUO-2026-00001` (Version/Confirmation 0/0).
- **Evidence:** human UI-01…UI-10; post-implementation UX-V1…UX-V8; Finding Assessment v0.1; evidence reconstruction v0.1.
- **Not implemented:** Supplier Quotation / Supplier Quotation Request / Template Builder / email + reply intake / extraction; Customer Quotation generation / Final Quotation; Trip.

## 2. Development principle (staged, freeze-gated)
- Implement **one stage at a time** via `PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFY → HUMAN ACCEPTANCE → FREEZE`.
- Each stage is **built → technically verified → human-accepted → frozen** before the next begins.
- **Downstream stages consume frozen upstream outputs only.** No premature downstream implementation; no silent scope expansion (`FK-D12`).
- Native-first; customization only through the high-risk gate; each stage has its own PLAN/BUILD authorization.

## 3. Stage 1 — Information Gathering
- **Scope:** Summary (business-category view); Full Details (granular existing D1 fields + four child grids + per-item states + source evidence); Info Complete (operator-controlled, reversible, workspace-authoritative); consolidated **Information Status**; persistent tabs (Summary | Full Details | Supplier Quotation[inactive until Info Complete]).
- **Human acceptance criteria (minimum):** operator can tell what the Deal is; see what information has been collected; identify MISSING and TO CONFIRM; see current status/next action and source evidence; decide sufficiency and set/reopen Info Complete; navigate Summary ↔ Full Details naturally.
- **Current status:** N1 technical verification is complete. **Targeted human acceptance of the refined Stage 1 presentation remains the required closure gate. Stage 1 is frozen only after that human acceptance and the resulting assessment are completed.**

## 4. Stage 2 — Supplier Quotation (depends on frozen Stage 1)
- **Dependency:** frozen Information Gathering + Info Complete gate.
- **Scope (per `FJK-SQ-D01…D12`):** Supplier Quotation Request (generated from completed Deal information); native Frappe email send; supplier reply intake (mechanism to be planned); preservation of original email + attachment; extraction → review → confirm; structured Supplier Quotation + versions/history (no overwrite); validity/expiry + reconfirm/requote; structured data **and** commercial/free-text conditions; operator review and confirmation.
- **Gate:** separate PLAN/BUILD authorization under `FK-D12`. Does **not** include Customer Quotation or Trip.

## 5. Stage 3 — Customer Quotation (depends on frozen Supplier Quotation)
- **Dependency:** frozen Supplier Quotation (internal commercial processing consumes it).
- **Scope:** Customer Quotation V1…Vn; **Final Quotation** (business intent per `FJK-SQ-D03`; technical representation OPEN and mapped to `FK-D17` CONFIRMED); quotation-generation capability; **itinerary continuity** (source → structured → supplier-facing → customer-facing).
- **Explicitly OPEN (no architecture assumed):** generation mechanism/provider; any LLM/OCR; exact itinerary data model; per-row provenance.
- **Gate:** separate PLAN/BUILD authorization.

## 6. Stage 4 — Trip (Phase 2)
- Trip begins at customer invoice creation (`FK-D15`; `FK-D16` ERPNext from first invoice).
- In-trip additional arrangements, additional invoicing, supplier payment, completion, customer feedback, archival — Phase 2/3. **Explicitly deferred.**

## 7. Cross-stage architecture boundaries
- **Native CRM owns** `Organization` / `Contact` / `CRM Deal`; **no duplicated** entities.
- **FeelJapanK workspace owns** the operator Deal-centred workflow views/navigation.
- **Deal = pre-invoice commercial state** (`FK-D17`); **Trip = enduring operational/commercial unit from invoice** (`FK-D15`); not collapsed.
- **Info Complete** = operator-controlled, reversible, auditable, per-Deal; distinct from customer/supplier acceptance, quotation confirmation, Deal Won, Trip.
- **Evidence preservation:** original supplier documents/emails and source itinerary retained; structured data is derived and never replaces originals (`FJK-SQ-D09/D10`).
- **View vs stage distinction:** Summary/Full Details are Deal-information views; Supplier Quotation / Customer Quotation are workflow stages; Trip is Phase 2.

## 8. Governance / authorization rules
- Per-stage lifecycle `PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFY → HUMAN ACCEPTANCE → FREEZE`.
- **No silent scope expansion**; **no premature downstream implementation**; native-first per `FK-D12`.
- Downstream work depends only on **frozen** upstream artifacts.
- Protected areas (app code, DocTypes, schema, permissions, integrations, frozen controls) require explicit authorization.
- Evidence is additive; baseline human evidence preserved unchanged.

## 9. Known open decisions
- **Retained quotation prototype:** the existing FJK Quotation/Version/Negotiation/Confirmation prototype is **not** the implemented Supplier Quotation workflow. Its visible workspace presentation should be **hidden** from the Supplier Quotation stage (do not relocate it to Customer Quotation yet). Its underlying DocTypes/code/data remain **preserved and unchanged**, pending the Stage 3 Customer Quotation architecture decision. (Roadmap decision only; does not authorize the hiding implementation now.)
- **Supplier Quotation architecture questions (`FJK-SQ-Q01…Q14`):** Supplier Quotation DocType/version model; Supplier Quotation Request ↔ Supplier Quotation relationship; email threading/reply matching; original email/attachment preservation; extraction/OCR architecture; human review/confirmation UI for extracted data; Supplier Request Template Builder data model + versioning; generated request storage; Final Quotation technical representation; permissions/audit; future analytics access.
- **Deal numbering/identity:** derived presentation title now; business-identifier field vs naming-series change remains OPEN/deferred.
- **Scope/category representation:** derived from components now; explicit scope field deferred (data-model decision).
- **Requirement vs Readiness presentation:** consolidated display now; **optional vs required** remains deferred.
- **CRM ↔ workspace** return/focus/re-fetch behavior details.

## 10. Reconciliation notes / conflicts
- Aligns with `RC-R07` / `RC-CAP-B` (Deal request/state visibility) and `RC-CAP-C` (Deal list/search — separate, not Stage 1).
- `FJK-SQ-D08` (supplier email reply intake) extends prior automation-deferral scope → reconcile during the Stage 2 PLAN.
- `Final Quotation` maps to `FK-D17` CONFIRMED (representation OPEN; Stage 3).
- No conflict with frozen decisions; this document does not modify them.

## 11. Recommended next steps
1. Persist this roadmap (done on authorization) and perform a **read-only reconciliation/verification pass**.
2. If verified, mark v0.1 explicitly **FROZEN** as the forward implementation roadmap / handoff reference (no v0.2 for freezing).
3. New session: read/reconstruct from the repository and use this roadmap as the forward plan.
4. **Stage 1 targeted human acceptance** (Summary + Full Details) on the controlled Deal.
5. Then proceed to the **Stage 2 (Supplier Quotation) PLAN/BUILD** under separate authorization.
