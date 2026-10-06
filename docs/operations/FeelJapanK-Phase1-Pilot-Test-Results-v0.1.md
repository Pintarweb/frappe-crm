# FeelJapanK Phase 1 — Pilot Test Results

**Project:** FeelJapanK
**Subject:** Recorded test scenarios, results, and evidence for the Phase 1 native Frappe CRM pilot
**Version:** v0.1
**Status:** PROPOSED / PILOT — **NOT FROZEN**
**Date:** 2026-09-26
**Related authority:**
- `docs/operations/FeelJapanK-Phase1-Testing-and-Completion-Sequence-v0.1.md` (defines Phase 1A–1G; this document records the **Phase 1A** automated/API results and the **Phase 1C** manual UI results)
- `docs/operations/FeelJapanK-Phase1-Native-CRM-Pilot-Operating-Convention-v0.1.md` (PROPOSED / PILOT)
- `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` (FK-D01…FK-D17)

**Nature:** Evidence record. It authorizes no implementation and changes no frozen decision.

---

## 0. Decision Check (AGENTS.md)

| Decision ID | Relevant? | Compliance | Notes |
|---|---|---|---|
| FK-D01 Deal = opportunity container | Yes | PASS | Each distinct request is one Deal. |
| FK-D03 revisions ≠ new Trip; new request → new Deal | Yes | PASS | G (amendment) vs H/UI-01 (new Deal). |
| FK-D04/D05 CRM vs Trip ownership | Yes | PASS | No Trip object; CRM pre-invoice only. |
| FK-D07 P01 canonical identity | Yes | PASS | No P01 reference/integration. |
| FK-D09 Lead optional | Yes | PASS | Deals created directly. |
| FK-D10 explicit context; no silent guessing | Yes | PASS | Scenario I human resolution. |
| FK-D11 manual intake | Yes | PASS | No AI/routing. |
| FK-D12 native, no customization without gap | Yes | PASS | No customization introduced. |
| FK-D14 written confirmation = manual evidence | Yes | PASS | J records confirmation manually. |
| FK-D15 Trip at invoice | Yes | PASS | No Trip/invoice created. |
| FK-D16 ERPNext Customer at first invoice | Yes | PASS | ERPNext absent. |
| FK-D17 CRM owns pre-invoice state | Yes | PASS | Quotation/negotiation represented Deal-side. |

No conflict; `STOP` condition not triggered.

---

## 1. Purpose and Method

Record the executed Phase 1 pilot tests and their results as durable evidence for the Phase 1B Completion Assessment, Phase 1C manual UI testing, Phase 1D assessment, and Phase 1F closure.

**Method**
- **Phase 1A (automated/API):** Scenarios A–L executed against `crm.localhost` as Sales User `pilot.operator@example.com`, using native Frappe CRM objects only (no custom fields/DocTypes/workflows/scripts/automation/AI/integration). Results verified by live DB reads.
- **Phase 1C (manual UI):** UI-01…UI-10 executed through the actual Frappe CRM browser UI; results verified through the UI and, after each UI action, by DB reads.

**Environment**

| Item | Value |
|---|---|
| Repo | `/home/yusmarin/frappe-crm` |
| HEAD at capture | `7664bf23349053b18da3d328c48d58355c1112ef` (branch `main`) |
| Apps | frappe 15.121.1, crm 1.84.0, frappe_whatsapp 1.0.12, ark_whatsapp_guard 0.0.1 (**no ERPNext**) |
| Site | `crm.localhost` (UI at `http://localhost:8000/crm`) |
| Operator | `pilot.operator@example.com` (Sales User) |

---

## 2. Phase 1A — Automated/API Test Results (A–L)

Legend: **G1** native · **G2** workable-but-awkward · **G3** workable-with-convention · **G4** genuine gap.

| Scenario | Purpose / synthetic enquiry | Live evidence | Result | Class |
|---|---|---|---|---|
| **A** | Transport-only: private coach, Tokyo, 30 pax, 3 days | Deal `CRM-DEAL-2026-00001`; Note `o490jl926c`; Task `1` | **PASS** | G3 |
| **B** | Accommodation-only | — | **Skipped (redundant)** — covered by E/F | — |
| **C** | Tour-guide-only (single) | — | **Skipped (redundant)** — covered by D | — |
| **D** | Multiple guides/languages (English/Malay/Japanese) | Deal `CRM-DEAL-2026-00002`; Note `0k01c47fpu`; Task `2` | **PASS** | G3 |
| **E** | Transport + accommodation (4-day Tokyo, 6 pax) | Deal `CRM-DEAL-2026-00003`; Note `3of8i0k6ot`; Task `3` | **PASS** | G3 |
| **F** | Full package (7-day Japan, 20 pax) | Deal `CRM-DEAL-2026-00005`; Note `fuqe4sp94i`; Task `4` | **PASS** (naming-series gap, see §3) | G3 |
| **G** | Existing Deal amendment (20 → 24 pax) | Deal `00005` edit; Comment `muho5gpfj4`; Note Version | **PASS** | G3 |
| **H** | Distinct new Deal (Osaka, 10 pax, 5 nights) | Deal `CRM-DEAL-2026-00006`; Note `qeq551rhl5`; Task `5` | **PASS** | G3 |
| **I** | Ambiguous communication → human resolution | **No record created (correct)** | **PASS** | G1/G2 |
| **J** | Customer confirmation / Ready for Quotation | Deal `00005`; Comment `37581ia5mp`; Note Version; RFQ=YES | **PASS** | G3 |
| **K** | Quotation preparation / negotiation / revision | Deal `00005`; Comments `6f347o7v88`, `6f3euofkco`; Note Version | **PASS** | G3 |
| **L** | Repeat customer / multiple Contacts / distinct Deal | Contact `Siti`; Deal `CRM-DEAL-2026-00007`; Note `9srt9g4b0d`; Task `6` | **PASS** (+2 native Assigned comments) | G3 |

**Coverage rationale**
- **B/C skipped** as redundant: single-service-only requests are subsumed by A (transport-only), D (guide), and E (multi-component); no distinct Phase 1 requirement.
- **I produced no record** by design — ambiguity requires human clarification (FK-D10/FK-D11).

---

## 3. Deviations and Native Artifacts

| Item | Detail | Disposition |
|---|---|---|
| **F naming-series gap** | The blocked Scenario F insert consumed number `CRM-DEAL-2026-00004`; the successful retry is `CRM-DEAL-2026-00005`. `00004` has no record. | **Accepted** by authority; benign. |
| **Deal.next_step capacity** | Native `Deal.next_step` is `varchar(140)`; the original F action (171 chars) failed import. Resolved by a convention clarification (short authoritative `next_step` + full action in Request Summary/Task). | Accepted; convention amended. |
| **L native comments** | Creating Deal `00007` + Task produced 2 native `Assigned` Comments (and 2 ToDos) beyond the manual records. | Accepted native lifecycle. |
| **UI-01 native comment** | Creating Deal `00008` via UI produced 1 native `Assigned` Comment. | Accepted native lifecycle. |

No manual/unapproved business record was created.

---

## 4. Phase 1C — Manual UI Test Results (UI-01…UI-10)

| Test ID | Workflow | Result | Notes / where found | Evidence |
|---|---|---|---|---|
| **UI-01** | New enquiry / new Deal | **PASS (usability note)** | Created `CRM-DEAL-2026-00008` (org `ABC Travel`, contact `Ahmad`, owner self, status `Qualification`). `next_step` not in create modal → set post-create via side panel (56 chars). | `docs/evidence/phase1/manual-ui/ui01-new-deal.png` |
| **UI-02** | Repeat customer / multiple Deals | **PASS WITH USABILITY NOTE** | Organization page shows **Deals 7 / Contacts 2**; Deal rows show only `ABC Travel · $0 · Qualification · owner · time` (no Deal ID/summary) → identical rows; no global search. | `ui02-deals-list.png`, `ui02-org-deals.png` |
| **UI-03** | Multiple Contacts | **PASS (usability note)** | Deal `00007` shows `Ahmad (Primary)` + `Siti`; Sales/Finance roles only in Request Summary prose (no native role field). | `ui03-contacts-expanded.png`, `ui03-request-summary.png` |
| **UI-04** | Ambiguous inbound communication | **PASS** | Human resolution; no authoritative Deal identifiable; **no mutation**; clarification prepared. | (Deals list evidence) |
| **UI-05** | Existing Deal amendment | **PASS** | Deal `00005` UI shows `20 → 24 → 20`, confirmation, quotation basis, next action. | `ui05-deal00005-activity.png` |
| **UI-06** | Distinct new request | **PASS** | `00007` (Osaka) distinguishable from `00005` (Japan) via Request Summary. | — |
| **UI-07** | Request Summary / Comment / Task hierarchy | **PASS** | Notes=current; Comments=dated history; Tasks=follow-up; side-panel `next_step`; Activity=Version/change entries. | `ui07-comments.png`, `ui07-tasks.png` |
| **UI-08** | Customer confirmation / Ready for Quotation | **PASS** | RFQ=YES with non-conflation lines; status `Qualification` (not `Ready to Close`). | `ui08-ui09-rfq-negotiation.png` |
| **UI-09** | Quotation negotiation / revision | **PASS** | Option A/B, lunch/dinner exclusion, revised Option B, booking NOT confirmed; Comments+Version show progression. | `ui08-ui09-rfq-negotiation.png` |
| **UI-10** | Fresh-operator comprehension | **PASS** | Cold inspection of `00005` answered all 10 comprehension questions from Notes/Comments/Tasks/side-panel. | (covered by `ui05`/`ui07`/`ui08`) |

**Additions vs the planned matrix**
- **UI-02** and **UI-10** were emphasised because API tests never exercised **discoverability** (no global search) or **fresh-operator comprehension** — both core to Phase 1 usability.
- No test required unauthorized mutation; existing Deals were reused for inspection.

### Manual UI usability findings (recorded, not fixed)
1. Deal lists are ambiguous for repeat customers — rows show the Organization as title, no Deal ID/summary.
2. No global search / command palette.
3. "Create Deal" modal omits `next_step`.
4. Contact roles are not native (prose only in Request Summary).
5. First-use overlays (onboarding/Help) require dismissal.

---

## 5. Record Mutation Summary

| Entity | Before A–L | After A–L | After UI-01 | Notes |
|---|---|---|---|---|
| CRM Deal | 0 | 6 | **7** | `00001/2/3/5/6/7` + UI-01 `00008` |
| CRM Organization | 0 | 1 | 1 | `ABC Travel` reused |
| Contact | 0 | 3 | 3 | `Ahmad`, `Siti`, auto `Pilot Operator` |
| FCRM Note | 0 | 6 | 6 | one per L/A–H Deal (not for `00008`) |
| CRM Task | 0 | 6 | 6 | one per Deal (not for `00008`) |
| Comment (manual) | 0 | 4 | 4 | all on `00005` (G/J/K) |
| Comment (native Assigned) | 0 | ~14 | ~15 | lifecycle artifacts |
| Deal Files | 0 | 0 | 0 | none |
| Lead / Product | 0 / 0 | 0 / 0 | 0 / 0 | none |

Live snapshot: `docs/evidence/phase1/runtime-state-2026-09-26.txt`.

---

## 6. Phase 1 Coverage Disposition

Per the Testing-and-Completion-Sequence dispositions:
- **A — PASS / Validated:** enquiry→Deal, particularity, amendment vs new Deal, multiple Deals per customer, multiple Contacts, Request Summary/Comment/Task/File/Version/`next_step`, Ready-for-Quotation manual marker, confirmation-vs-acceptance, quotation negotiation/revision, human-in-the-loop intake, operator comprehension.
- **B — Accepted Native Limitation:** no global search; repeated-organization list rows; no native Contact-role field; no native quotation object; `next_step` `varchar(140)`; Sales-User owner/assignment visibility; `CRM Task` unversioned.
- **C — Explicitly Deferred:** automated WhatsApp routing; AI extraction/transcription/classification; automatic Deal creation/assignment; structured quotation versioning; structured trip fields; P01 integration; ERPNext integration; Trip/Operations implementation.
- **D — Genuine Phase 1 Gap:** **none demonstrated.**

---

## 7. Conclusion

Automated/API (A–L) and manual UI (UI-01…UI-10) testing both pass without a demonstrated Phase 1 defect. Usability findings are non-blocking and are candidates for the Phase 1D assessment. Phase 1 is **not** complete: the next formal stage is **Phase 1D — Manual Testing Assessment**, then closure, then the real operational pilot (15–25 enquiries / 4–6 weeks). Manual UI testing must not be skipped, and no Scenario M is predefined.

---

## 8. Evidence Index

- Phase 1A runtime evidence: live `crm.localhost` DB (Deals/Notes/Tasks/Comments/Versions as tabled above).
- Phase 1C screenshots: `docs/evidence/phase1/manual-ui/` (10 PNGs).
- Runtime snapshot: `docs/evidence/phase1/runtime-state-2026-09-26.txt`.
- Source docs: operating convention; testing-and-completion sequence; SOP v0.2; template v0.2; checklist v0.1; Decision Register.

## 9. Governance / Safety Statement

This record was produced without modifying application code, schema, DocTypes, custom fields, workflows, scripts, configuration, or automation. No Trip, ERPNext, P01, or quotation object was created. Only the explicitly authorized synthetic pilot records exist. No commit/push was performed as part of producing this document.
