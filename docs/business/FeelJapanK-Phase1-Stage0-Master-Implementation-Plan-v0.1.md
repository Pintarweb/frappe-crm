# FeelJapanK Phase 1 — Stage 0 Master Implementation Plan — v0.1

| Field | Value |
|---|---|
| Status | **LOCKED (2026-10-08)** — operator-locked working Stage 0 sequence |
| Revision | 2026-10-08 — **Task 0A status reconciliation** (existing vs remaining work; execution dashboard added) |
| Scope | Phase 1 → **Stage 0** — Data Acquisition/Entry → AI Interpretation → Human Review → Authoritative CRM → Information Gathering → **Info Complete** |
| Out of scope | Supplier Quotation, Customer Quotation, Trip/ERPNext downstream |
| Authority | Subordinate to FROZEN decisions (FK-D10/D12/D18, STG0-R01, O01–O09) and the Decision Register |
| Created | 2026-10-08 |

> **Framing note:** this master plan uses **"Stage 0" = Source → … → Info Complete**. Roadmap v0.2 §3/§4 previously split this into *Stage 0 — Data Acquisition* (AI intake) and *Stage 1 — Information Gathering* (Summary/Full Details/Info Complete). The two are the **same scope under different labels**; this document adopts the operator's single "Stage 0" framing. No frozen decision is changed by this naming reconciliation.

---

## 0. Stage 0 objective

Build the complete workflow:

```
Customer / Operator Source
  → Data Entry
  → AI Interpretation
  → Human Review
  → Authoritative CRM Data
  → Information Gathering
  → Info Complete
```

Stage 0 **ends at Info Complete**. Supplier Quotation, Customer Quotation and Trip remain **outside** Stage 0.

## 0.1 Governance invariants (unchanged)

- **AI = INTERPRET → EXTRACT → PROPOSE** (FK-D18). AI confidence ≠ approval.
- **Human = REVIEW → DECIDE → AUTHORIZE** (O05; D12-E).
- **CRM = AUTHORITATIVE DATA** — only human-authorized promotion writes it (O04).
- **Deal resolution is separately human-controlled** (STG0-R01): native communication context (email/WhatsApp/phone/Telegram) is **never** human-confirmed Deal authority.
- **Telegram is internal-only** transport; notifications **never** approve anything (STG0-D18).
- Source evidence is preserved; derived data never replaces originals (O01/O03).

## 0.2 Current frozen / implemented state (FACT, 2026-10-08)

| Item | State |
|---|---|
| D12-A/B/C (adapter, transport, validation) | **PASS / FROZEN**, committed `4242178` |
| D12-D (AI Interpretation Run + AI Proposal) | **PASS / FROZEN**, runtime-verified (working tree, not yet committed) |
| D12-E (human proposal review/disposition) | **PASS / FROZEN**, runtime-verified (working tree, not yet committed) |
| STG0-D18 (Telegram implementation authorized) | **AUTHORIZED** (how = open) |
| O06 channels | strategy aligned; inbound-email enablement pending; WhatsApp live inbound deferred; Telegram authorized |
| D12-F (hardening + promotion) | **FROZEN — CONDITIONAL PASS** (committed 2026-10-08) |
| O07/O08 | DeepSeek `deepseek-flash` selected; O08 accepted with deferred provider assurance |

### 0.3 Stage 0 execution dashboard — existing vs remaining (Task 0A)

> **Purpose:** the master sequence is a roadmap over a **partially completed** system. This dashboard prevents rebuilding existing capabilities. Status key: ✅ DONE · 🟡 PARTIAL / FOUNDATION-ONLY · 🟢 EXISTING (reuse) · 🔴 NOT DONE.

| # | Master task | Status | What is done / what remains |
|---|---|---|---|
| 0 | Master Stage 0 reconciliation | ✅ DONE / LOCKED | Master sequence created, reconciled, Telegram (STG0-D18) incorporated. |
| 1 | D12-F — AI hardening + promotion | 🟢 FROZEN — CONDITIONAL PASS | Promotion boundary + DS6 retry built and runtime-verified (`ai_promotion_tests` 16/16; `ai_persistence_tests` 31/31; `ai_review_tests` 40/40; offline 130/130). Committed 2026-10-08. Residual: richer per-domain mapping (later Stage 0); parallel-race/crash-kill not stress-tested. |
| 2 | Source/channel intake planning | 🟡 PARTIALLY DONE | O06 channel strategy + Telegram authorization exist; the **common intake architecture** still needs planning as an implementation workstream. |
| 3 | Common Source Intake Bridge | 🔴 NOT DONE | The missing front-half bridge: the full `source → D12` intake path does not exist yet. |
| 4 | Manual Source Entry | 🟡 BASE CAPABILITY — INTEGRATION REQUIRED | Manual preservation exists conceptually/operationally; the integrated `source → D12 → review` workflow is **not** complete. |
| 5 | Telegram | 🟡 AUTHORIZED / NOT BUILT | STG0-D18 authorizes implementation; approach + BUILD scope still to plan. |
| 6 | Email | 🟡 NATIVE CAPABILITY — NOT OPERATIONALIZED | Gmail/IMAP configured, native inbound machinery exists, but **inbound is disabled**; needs operational authorization + Stage 0 integration. |
| 7 | WhatsApp | 🟡 CAPABILITY EXISTS — LIVE INBOUND DEFERRED | `frappe_whatsapp` + HMAC guard exist; native phone-derived association governed by STG0-R01; live inbound operationally deferred. |
| 8 | Company / Contact / Deal resolution | 🟡 EXISTING HUMAN PROCESS — AI PATH NOT DONE | Native CRM + human Deal resolution exist; D12 cannot yet feed the complete controlled resolution/promotion workflow. |
| 9 | Requirements / Allocations promotion | 🟡 DOWNSTREAM MODEL DONE — AI PROMOTION NOT DONE | Requirements, components, guide/activity items, transportation + accommodation allocations are implemented; missing piece = approved AI proposal → existing authoritative model. |
| 10 | Information Status / Info Complete | 🟢 EXISTING / IMPLEMENTED | Status vocabulary, readiness, validation and operator-controlled Info Complete exist; AI must feed them **only** via approved promotion. |
| 11 | Operator UX reconciliation | 🟡 PARTIALLY DONE | N1 presentation implementation done; genuine human acceptance open; Stage 0 AI/source-review UX not complete. |
| 12 | Full technical verification | 🔴 NOT DONE | D12 component tests strong; the complete channel→AI→review→promotion chain not yet verified. |
| 13 | Genuine human acceptance | 🔴 NOT DONE | Must be the operator's own testing (not OpenCode/browser-agent). |
| 14 | Stage 0 completion / freeze | 🔴 NOT DONE | Blocked until the preceding gaps close. |

### 0.4 Three kinds of "done" (do not conflate)

**A. Already implemented and reusable — DO NOT REBUILD:** native `Company`/`Contact`/`Deal`; `Communication`; `File`; `Comment`; `Version`; `Activity Log`; `FJK Deal Component`; `FJK Requirement Line`; `FJK Guide Requirement`; `FJK Activity Item`; `Transportation Allocation`; `Accommodation Allocation`; validation; Information Status; Info Complete; N1 presentation; **D12-A/B/C/D/E**.

**B. Implemented foundation, not yet connected into Stage 0** (capability ≠ finished workflow): email infrastructure; WhatsApp infrastructure; manual source handling; human Deal resolution; requirements/allocation machinery; Info Complete machinery; N1 UX.

**C. Missing:** (1) richer per-domain promotion mapping (D12-F **mechanism** is built/verified; per-domain mapping is later Stage 0 work); (2) Common Source Intake; (3) Telegram implementation; (4) email operational enablement/integration; (5) the complete `source → D12 → human review → promotion` path; (6) AI-assisted, human-controlled Deal-resolution integration; (7) AI proposal → existing FJK requirements/allocations promotion; (8) end-to-end verification; (9) human acceptance; (10) Stage 0 freeze.

> **Architecture confirmation (`FACT`):** the Stage 0 architecture already identified the missing bridge as *"`Communication → structured requirement` as an automated/proposal flow"* and stated the downstream requirement/allocation/validation/Info-Complete chain is **implemented and to be reused** (Stage 0 AI Provenance Implementation Plan §, "Missing" note). This dashboard makes that reuse explicit.

### 0.5 Revised execution order (from this reconciliation)

```
D12-A/B/C/D/E                     → DONE
   ↓
D12-F                             → DONE (conditional: built/verified)
   ↓
Common Source Intake              → missing bridge
   ↓
Manual / Telegram / Email / WhatsApp integrations
   ↓
Promotion into already-existing Requirements / Allocations / Information Status
   ↓
UX
   ↓
E2E verification
   ↓
Human acceptance
   ↓
Stage 0 freeze
```

---

## 1. Phase 0 — Governance / baseline reconciliation

- Reconcile existing Stage 0 decisions; confirm D12-A…E state; incorporate **STG0-D18**; establish the definitive remaining-task order.
- **Task 0A — Stage 0 Master Plan completion reconciliation** (2026-10-08): added the existing-vs-remaining execution dashboard (§0.3), the three "kinds of done" (§0.4), and the revised execution order (§0.5).
- **No implementation.**
- **Status: COMPLETE (2026-10-08).** The sequence (Phases 1–11, Tasks 1–14) has been **LOCKED by the operator**; this document is the definitive working Stage 0 sequence.

**Exit gate:** SATISFIED — sequence locked 2026-10-08. **Next action: Task 1 — D12-F PLAN (dedicated read-only PLAN session).**

## 2. Phase 1 — AI/provenance core: **D12-F**

**Task 1 — D12-F: AI pipeline hardening + authoritative promotion boundary.** Complete the remaining D12 core:

- reprocessing; retry boundaries; concurrency/idempotency hardening; failure recovery;
- **promotion mechanics**; proposal → authoritative CRM relationship; partial promotion;
- stale/conflicting authoritative values; auditability; native Version/history; safe repeated promotion;
- final authority boundary.

Enforced: `AI = interpret/extract/propose` · `Human = review/decide/authorize` · `CRM = authoritative`.
**Deal resolution remains separately human-controlled.**
**Gate:** PLAN → APPROVAL → BUILD → VERIFY.

> **Reconciliation:** D12-E §14 already handed off "accepted/edited-accepted proposals → future promotion write", and earlier plans named **D12-F** as the hardening/idempotency/reprocessing owner. Assigning *promotion mechanics* to **D12-F** is consistent with that trajectory (not a reopening of any frozen decision).

## 3. Phase 2 — Stage 0 source/channel planning (**includes Telegram**)

**Task 2 — Channel / Source Intake Plan.** Define the common source-entry architecture:

| Source | Stage 0 role |
|---|---|
| Manual | Core immediate source entry |
| Email | Core inbound customer source |
| Telegram | Core Stage 0 input + internal communication (authorized, STG0-D18) |
| WhatsApp | Intended core channel, subject to operational prerequisites (live inbound currently deferred) |

Common architecture:
```
Source Channel → Source Preservation → Common Intake → D12 AI → Human Review → Promotion
```

**Telegram planning block** (authorized by STG0-D18; only *how* is open) determines: (1) integration approach; (2) Bot API feasibility; (3) webhook vs long-polling; (4) source-preservation mapping; (5) Telegram metadata; (6) file/photo/document handling; (7) security/data-handling controls; (8) bot-token handling; (9) internal notification events; (10) Frappe/FJK integration boundary; (11) testing requirements; (12) exact BUILD scope.

Both Telegram roles preserved:
- **Inbound:** `Telegram → Frappe/FJK → Source → D12`
- **Internal communication:** `Frappe/FJK → Telegram → Operator`

Telegram **never** becomes an authority mechanism; notifications cannot approve.

> **Reconciliation:** O06 recorded WhatsApp live inbound as **DEFERRED**; this plan treats WhatsApp as an *intended core channel whose live inbound is operationally deferred* — the two are consistent; the master doc records the "intended but currently deferred" nuance explicitly.

## 4. Phase 3 — Common Source Intake

**Task 3 — Common Source Intake Bridge.** Build the shared boundary so channels do not each invent their own AI/provenance implementation:

```
Manual / Email / Telegram / WhatsApp
  → Common Source Intake
  → Native Source Preservation
  → D12 AI Interpretation
  → FJK AI Interpretation Run
  → FJK AI Proposal
  → D12-E Human Review
  → Authoritative Promotion
```
The source itself remains preserved.

## 5. Phase 4 — Individual Stage 0 input channels

**Task 4 — Manual Source Entry (baseline first):** upload/preserve source; identify source; attach to intake; run D12; review proposals; preserve provenance. Provides a functioning Stage 0 path before external channels are operational.

**Task 5 — Telegram** (implement per the approved Telegram BUILD PLAN):
- Inbound: `Telegram message → Source preservation → Common intake → D12 → Human review`; source types: text, captions, images, documents, attachments, operator context; preserve Telegram metadata.
- Internal communication: `FJK event → Telegram notification → Operator` (new source received, AI proposal ready, review required, ambiguity, processing failure, operational notification). **No Telegram notification may approve anything.**

**Task 6 — Email:** enable/integrate the existing native Frappe path `Inbound email → Communication → File/attachment → Common Source Intake → D12`; preserve original email + attachments as evidence. (Existing Gmail/IMAP work is currently disabled; enablement needs operational authorization.)

**Task 7 — WhatsApp:** use existing `frappe_whatsapp` + HMAC guard; native phone-derived reference remains **provisional communication context only** (STG0-R01) — never human-confirmed Deal ownership. Integrate into the common intake **without** changing frozen native CRM association behaviour absent a separately approved remediation.

## 6. Phase 5 — Human-controlled CRM resolution

**Task 8 — Company / Contact / Deal resolution.** Human determines Company, Contact, existing vs new Deal, amendment vs new request. **AI may propose candidates; AI cannot silently decide.** Rule preserved: *native communication context ≠ human-confirmed Deal relationship.*

## 7. Phase 6 — Authoritative information promotion

**Task 9 — Requirements / Components / Allocations.** Map human-approved proposals into the existing FJK model: Deal Component, Requirement Line, Guide Requirement, Activity Item, Transportation Allocation, Accommodation Allocation, Request Summary, relevant native CRM data. **No duplicate master structures.**

> **Note:** "Request Summary" is currently a **conceptual** element — no such DocType exists (FACT). Mapping to it is pending/OPEN unless/until created by an approved decision.

## 8. Phase 7 — Information status / completion

**Task 10 — Information Status + Info Complete.** Handle: KNOWN, MISSING, TO CONFIRM, CUSTOMER-CONFIRMED, NOT APPLICABLE, blank/not assessed. Preserve `SELECTED ≠ COMPLETE ≠ READY FOR QUOTATION`. Only the human-controlled workflow can reach **Info Complete**; **AI cannot set it.**

## 9. Phase 8 — Presentation / operator UX

**Task 11 — Stage 0 operator experience.** Reconcile the workflow against recorded human findings: Deal Summary; Company terminology/selection; Contact filtering; Deal search; pipeline-order status; attention flags; timestamps; activity history; clear amendment history; comments vs notes distinction; clear creation flow; source/provenance visibility; AI proposal review experience. **Driven by operational findings, not speculative UI design.**

## 10. Phase 9 — Full technical verification

**Task 12 — End-to-end verification** across Manual/Email/Telegram/WhatsApp → source preservation → AI → proposal → human decision → authoritative CRM → requirements → allocations → Information Status → Info Complete. Must include: success; malformed AI output; provider failure; incomplete response; duplicate/retry; reprocessing; competing proposals; rejection; deferral; edited acceptance; supersession; stale authoritative values; permissions; provenance; source preservation; channel failures; Telegram notification failures; **no unauthorized CRM writes.**

## 11. Phase 10 — Genuine human acceptance

**Task 13 — Human operator acceptance.** After technical verification, the operator personally operates the CRM as the intended FeelJapanK operator. Separate from automated/API testing, browser-agent testing, and technical verification. The operator's actual usability and judgement become the human-acceptance evidence.

## 12. Phase 11 — Stage 0 completion

**Task 14 — Stage 0 Completion Assessment.** Declare **STAGE 0 COMPLETE / FROZEN** only when all input channels work; source preservation works; D12 works; human approval works; authoritative promotion works; Deal resolution works; requirements/allocations work; Information Status works; Info Complete works; technical verification passes; genuine human acceptance passes. **Then** move to Supplier Quotation.

---

## 13. The working order

```
0. Master Stage 0 reconciliation            ← DONE / LOCKED
0A. Master Plan completion reconciliation   ← DONE (Task 0A; dashboard §0.3–§0.5)
1. D12-F core hardening + promotion          ← DONE (conditional — built/verified)
2. Source/channel intake plan — INCLUDING TELEGRAM
3. Common Source Intake
4. Manual Source Entry
5. Telegram implementation
6. Email implementation
7. WhatsApp implementation
8. Company / Contact / Deal resolution
9. Requirements / Allocations promotion
10. Information Status / Info Complete
11. Operator UX reconciliation
12. Full technical verification
13. Genuine human acceptance
14. Stage 0 Completion / Freeze
    → Supplier Quotation PLAN
```

## 14. Governance correction (Telegram)

Telegram is **no longer an open decision**. **STG0-D18 has authorized it.** What remains open is **how** to implement it. At Task 2, the implementer investigates and selects the technical approach; **Telegram authorization is not reopened.**

## 15. Dependencies / open items carried into this plan

- **D12-F** scope + promotion boundary (Task 1) — **built/verified (conditional)**; richer per-domain promotion mapping remains OPEN (later Stage 0).
- **Inbound email enablement** — operational authorization still pending (O06 open item).
- **Telegram approach + O08-class security/data-handling determination** — Task 2.
- **Request Summary** — conceptual only; no DocType (Task 9) — OPEN.
- **Operator UX findings** — N1 presentation operator-decisions doc to be applied (Task 11).
- **Uncommitted D12-D/E** — built/frozen in the working tree; a commit/push authorization is a separate step.

## 16. Change control

Any change to FROZEN decisions follows `STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE`. This master plan is a working plan and does not itself authorize BUILD; each numbered task keeps its own **PLAN → APPROVAL → BUILD → VERIFY** gate (D12-F and channel work in particular fall under the FK-D12 high-risk gate).
