# AGENTS.md — FeelJapanK OpenCode Governance

This file governs all OpenCode work in this repository. It extends (does not replace) the project's existing governance.

---

## 1. Mandatory Decision Check (PLAN and BUILD)

**Every PLAN and every BUILD must perform the Decision Check** defined in:

`docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md`

It is indexed by:

`docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`

In short:

- Read the Decision Register and the relevant authority documents.
- Identify decisions relevant to the task and treat **FROZEN** decisions as authoritative constraints.
- Verify the proposed work does not contradict them.
- **If a conflict is found: STOP. Report the conflict. Do not plan the conflicting implementation and do not silently choose a rule.**
- Include a Decision Check table in PLAN output:

  | Decision ID | Relevant? | Compliance | Notes |
  | ----------- | --------- | ---------- | ----- |

- Before BUILD: confirm applicable FROZEN decisions, that the approved PLAN respects them, that no decision is silently changed, that there is no scope expansion, and that no unresolved authority conflict exists. If a conflict appears during BUILD: **STOP — return to PLAN/REVIEW.**

Never silently reopen, reinterpret, or contradict a FROZEN decision. The only path is:

`STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE`

---

## 2. MODE rules

- **MODE: PLAN** — read-only inspection, analysis, and proposal. No file modification unless the task explicitly authorizes a controlled BUILD. Must include the Decision Check.
- **MODE: BUILD** — only implement an already approved/frozen boundary. No silent scope expansion. Must include the BUILD Decision Check.
- **CHECK / VERIFY** — run the required verification and produce evidence.

---

## 3. Authority Hierarchy

1. Explicitly FROZEN authority (architecture freezes and approved directions).
2. Business Requirements (`docs/business/FeelJapanK-Business-Requirements-Consolidation-v0.2.md`, `docs/business/Field-Japan-K-Business-Workflow-Requirements-v0.1.md`).
3. Detailed architecture/reference documents (`docs/architecture/*`).
4. Operations / SOP documents (`docs/operations/*`).
5. Implementation Master Plan (`docs/business/FeelJapanK-Implementation-Master-Plan-v0.1.md`).
6. Decision Register (`docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`) — index over items 1–5.
7. Working notes / assessments / conversation context.

Authority conflicts are reported and resolved through controlled governance, never silently guessed.

---

## 4. Process

- Default process: **THINK → BUILD → CHECK**.
- Higher-risk work (data ownership, CRM/Trip/ERPNext/P01 boundaries, integration infrastructure, schema/data-model, financial/accounting, security, irreversible decisions): **PLAN → REVIEW → APPROVE/FREEZE → BUILD → VERIFY → EVIDENCE**.
- Use the lightest process appropriate to the risk (Master Plan §3–§4).

---

## 5. Protected Areas (no change without explicit approval)

Application code; Frappe configuration; DocTypes; custom fields; database/schema; WhatsApp behaviour; `ark_whatsapp_guard`; email behaviour; Trip/ERPNext/P01 implementations; integrations; frozen security controls; `docs/versions.lock` and dependency versions.

Do not commit or push unless explicitly instructed.

---

## 6. Key Governance Documents

| Purpose | Location |
|---|---|
| Decision index | `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` |
| Decision Check standard | `docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md` |
| Communication context rule | `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md` |
| Opportunity start / Lead usage | `docs/architecture/FeelJapanK-Opportunity-Start-Lead-Usage-Rule-v0.1-FROZEN.md` |
| Phase 1 manual intake direction | `docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md` |
| Phase 1 manual Enquiry → Deal SOP | `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.1.md` |
| Business requirements | `docs/business/FeelJapanK-Business-Requirements-Consolidation-v0.2.md` |
| Workflow requirements | `docs/business/Field-Japan-K-Business-Workflow-Requirements-v0.1.md` |
| Master plan | `docs/business/FeelJapanK-Implementation-Master-Plan-v0.1.md` |
