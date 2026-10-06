# FeelJapanK Phase 1 — Quotation-Workflow UX Validation (M-1 Low-Fidelity)

**Document status:** VALIDATION RECORD — COMPLETED / INTENTIONALLY STOPPED WITH LIMITATION (operator-directed fork preference)
**Method:** M-1 (low-fidelity, no build)
**Scope:** Compare Concept A′ (Fork-A′: SPA Deal + Desk quotation) vs Concept B (Fork-B: integrated SPA quotation)
**Acceptance basis:** `Master Plan §8` DoD-5 ("users can understand what to do next") + genuine human evidence `UI-01…UI-10`
**Nature:** Concepts only. Neither fork is implemented. No DocTypes, schema, configuration, frontend, or CRM data are created or changed by this validation.
**Separate from Scenario M.** Not an implementation plan.

> **Evidence limitation (preserved).** Concept A′ was walked by the genuine operator for UX-V1…UX-V8. Concept B was **not** independently walked: the operator confirmed the business workflow is identical and stopped, deeming materially identical repetitions time-wasting. Recorded outcome is therefore an **operator-directed fork preference**, not a full independent Concept B behavioural validation. This validation does not alter `docs/evidence/phase1/FeelJapanK-Phase1-Human-UI-Test-Evidence-v0.1.md` (UI-01…UI-10) or any assessment.

---

## 1. Purpose

Determine whether a **Desk-based quotation workflow properly bridged to the Deal (A′)** satisfies the operator-comprehension requirement, or whether it genuinely requires an **integrated CRM SPA experience (B)** — before committing to either architecture.

## 2. Concepts under test

- **Concept A′ (Fork-A′):** CRM Deal (SPA) shows quotation status / current version / CONFIRMED state / next action → deep link to a **Desk** quotation → quotation/revision/negotiation/confirmation performed in Desk → return to Deal.
- **Concept B (Fork-B):** CRM Deal (SPA) → **integrated** quotation experience in the SPA → quotation/revision/negotiation/CONFIRMED/evidence → remain in SPA.

## 3. Stimuli — Concept A′ (wireframes)

### A′-1 — Deal view in CRM SPA (with quotation panel)

```
┌ Deal: ABC Travel — Tokyo coach, 30 pax, 3 days            [Status: Qualification] ┐
│                                                                                   │
│  Requirements (structured)                       ┌ Quotation ───────────────────┐ │
│  Destination: Tokyo        Dates: 2026-11-10     │ Current version: V2          │ │
│  Pax: 30 (adults 28, children 2)                 │ Status: Active (not confirmed)│ │
│  Components: [x]Transport [ ]Accom [ ]Guide ...  │ Confirmed: —                 │ │
│                                                  │ Next action: await supplier  │ │
│                                                  │              re-quote        │ │
│                                                  │ [ Open quotation in Desk → ] │ │
│                                                  └──────────────────────────────┘ │
│  Comments / History …                                                             │
└───────────────────────────────────────────────────────────────────────────────┘
```
Notes for facilitator: the panel is **read-only on the Deal**; editing happens in Desk via the link.

### A′-2 — Desk quotation list (Fork-A′)

```
Desk ▸ FJK Quotation                         [+ New Quotation]
┌───────────────────────────────────────────────────────────────────────────────┐
│ Name            Deal                Current Ver  Status       Confirmed       │
│ FJK-QUO-0001    CRM-DEAL-...00005   V2           Active       —               │
│ FJK-QUO-0002    CRM-DEAL-...00007   V1           Confirmed    V1  (evidence)  │
└───────────────────────────────────────────────────────────────────────────────┘
```

### A′-3 — Desk quotation version form (Fork-A′)

```
FJK Quotation Version  FJK-QV-2026-0002            [Draft ▸ Submit ▸ Confirmed]
Deal:            CRM-DEAL-2026-00005
Version No:      V2  (previous: V1)
Change type:     Price / Add / Remove / Requirement change / Terms
Version total:   …      Discount: …      Final total: …
Negotiation:     "customer asked for 24 pax; supplier re-quote received"
Supplier re-quote ref: …
Items:           [ grid: description | component | qty | unit price | amount ]
Confirmed on:    —        Source: —        Evidence: [Attach]
```
Notes: after **Submit**, fields lock (immutability). CONFIRMED requires evidence + source.

### A′-4 — Return to Deal

```
Operator navigates back to the CRM SPA Deal (A′-1).
Expected: panel shows V2 / Active / next action; CONFIRMED shows after confirmation.
```

## 4. Stimuli — Concept B (wireframes)

### B-1 — Deal view in CRM SPA with integrated quotation section

```
┌ Deal: ABC Travel — Tokyo coach, 30 pax, 3 days            [Status: Qualification] ┐
│  Requirements (structured)                                                        │
│  Destination: Tokyo   Dates: 2026-11-10   Pax: 30   Components: [x]Transport …   │
│                                                                                   │
│  Quotation (in-CRM)                                                [ + New V ]    │
│  ┌ Tabs: Current | History | Negotiation | Confirmed ───────────────────────────┐ │
│  │ Current: V2   Active   Next action: await supplier re-quote                  │ │
│  │ History: V1 → V2  (change: 20→24 pax)          [view]                        │ │
│  │ Negotiation: "customer asked 24 pax; supplier re-quote"                      │ │
│  │ Confirmed: — (after confirmation: version + evidence shown here)             │ │
│  └──────────────────────────────────────────────────────────────────────────────┘ │
│  Comments / History …                                                             │
└───────────────────────────────────────────────────────────────────────────────┘
```
Notes: all quotation work happens in-SPA; no navigation to Desk.

### B-2 — In-SPA quotation editor (Fork-B)

```
┌ Quotation V2 — edit                                  [Save Draft] [Submit]       │
│ Change type / negotiation note / supplier re-quote ref                           │
│ Items grid …                                                                     │
│ Confirm: [ Mark CONFIRMED ]  requires source + evidence [Attach]                 │
└───────────────────────────────────────────────────────────────────────────────┘
```

## 5. Execution protocol

1. Give the operator the wireframes with **no** coaching on where things are.
2. For each of UX-V1…UX-V8 (below), the operator narrates where they would go and what they would do ("think-aloud").
3. Facilitator records, additively, only what is observed; quotes where useful.
4. Walk both concepts; balance order to reduce bias.
5. No CRM records, DocTypes, schema, config, or frontend are touched.

## 6. Scenarios (smallest controlled set)

| ID | Question | Task | Concept |
|---|---|---|---|
| UX-V1 | Identify the correct Deal? | From a repeat-customer list, open the intended Deal | Shared |
| UX-V2 | Understand current requirements/state? | Read shared context + components + statuses | Shared |
| UX-V3 | Create V1? | Produce first quotation version | A′ vs B |
| UX-V4 | Create V2 after a material amendment? | Apply a material change → V2, confirm history | A′ vs B |
| UX-V5 | Understand negotiation/history? | Locate V1→V2 changes and negotiation context | A′ vs B |
| UX-V6 | Identify CONFIRMED version + evidence? | Find the CONFIRMED version and its evidence | A′ vs B |
| UX-V7 | Return to Deal → understand status + next action? | Leave quotation work, return to Deal, state status/next action | A′ (bridge) vs B |
| UX-V8 | Fresh operator understands what to do next? | Cold walkthrough with no prior instruction | Shared |

## 7. Pass / gap rule

A concept **passes** only if, for UX-V3…UX-V7, the operator:
- completes each task **unaided** (no external instruction on where to go), and
- can state the **current version**, **CONFIRMED state**, and **next action**, and
- does **not lose Deal context** during the transition.

- **A′ genuine gap:** cannot discover the quotation entry point from the Deal; or cannot see current version/CONFIRMED/next action on the Deal; or requires prompting to move between Deal and Desk; or loses context at UX-V7.
- **B genuine gap:** still cannot complete UX-V3…UX-V6 within the SPA.
- **Outcome:** A′ passes → choose **Fork-A′**. A′ fails → **Fork-B required**. Inconclusive → escalate to M-2/M-3.

No numeric score.

## 8. Genuine operator walkthrough record

### 8.1 Concept A′ — UX-V1…UX-V8 (genuine operator responses)

The genuine operator completed the think-aloud walkthrough for Concept A′. Preserved substance of the operator's responses:

- **UX-V1 — Identify the Deal.** The operator's stated requirement: identify the Deal first — determine whether the request is new or an existing Deal, then search primarily by **Company**.
- **UX-V2 — Understand current requirements/state.** Deal overview is essential — the operator needs the full current Deal context before deciding whether incoming information is an amendment, an addition, or sufficient for completion.
- **UX-V3 — Create V1.** The operator expects a **structured quotation template** — the quotation should organize all required details formally and consistently.
- **UX-V4 — Revision V2 after material amendment.** V2 should focus on **changes**; the previous version remains the baseline/history, and changed items should be clearly identified.
- **UX-V5 — Negotiation/history.** Negotiation history must be **traceable** — history, timing, response time, supplier/customer issues and previous exchanges should remain accessible.
- **UX-V6 — CONFIRMED version + evidence.** Confirmation needs a **definitive final quotation** — the operator described a distinct confirmed quotation that becomes the basis for invoicing and Trip creation, with previous versions retained in history.
- **UX-V7 — Return to Deal → status/next action.** Post-confirmation transitions to **Trip** — the Deal becomes Won/archived and is linked to the Trip, with historical Deal information remaining accessible.
- **UX-V8 — Fresh operator comprehension.** Fresh-operator context should **move with the Trip** — the operator described the Trip as the new operational "basket" containing the summary and relevant information.

### 8.2 Concept B — not independently walked

- No separate full operator walkthrough of Concept B (UX-V1…UX-V8) was completed.
- The operator confirmed the business workflow being evaluated is **identical to Concept A′**.
- The operator identified the **only material distinction** as the location/context of the quotation workflow:
  - **A′** = outside the CRM Deal context, in Frappe Desk — requires a context switch.
  - **B** = the same quotation/version/negotiation/confirmation workflow integrated inside the CRM SPA — the operator remains within CRM.
- The operator explicitly stated a preference for Concept B. Preserved wording:
  - **"go with concept b"**
  - earlier clarification: **"stay inside the crm"**

### 8.3 Validation interpretation

- The M-1 comparative walkthrough was **intentionally stopped** because the operator considered repeating materially identical business-workflow scenarios time-wasting.
- Concept B did **not** independently complete UX-V1…UX-V8; no such pass is claimed.
- No Concept B observations were invented or manufactured.
- The genuine evidence is sufficient to record an **operator-directed fork preference**, but **not** a full independent Concept B behavioural validation.

### 8.4 Fork outcome

**PROCEED WITH CONCEPT B — INTEGRATED CRM SPA QUOTATION WORKFLOW.**

- **Rationale:** the operator wants the quotation workflow to remain **inside CRM**, rather than requiring a context switch to an external Desk quotation page.
- **Nature:** an operator preference/decision — **not** a claim that Concept B has completed a full UX pass. Concept B implementation remains subject to the governed implementation PLAN and its own verification.

---

## Governance / safety

This validation record was produced additively. It creates no DocTypes, schema, configuration, frontend, or CRM data; does not alter the human evidence (UI-01…UI-10), the human UI evidence file, Scenario M, or any frozen decision; implements no fork; and performs no remediation, commit, or push.
