# FeelJapanK — Phase 1 Communication Intake Direction — v0.2

**Project:** FeelJapanK
**Subject:** Phase 1 Communication Intake Direction
**Version:** v0.2
**Status:** APPROVED DIRECTION / PHASE 1 (v0.2 — controlled revision of v0.1)
**Supersedes:** `docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md` (preserved as historical record; not edited).
**Scope:** Communication intake (manual intake + AI-assisted proposal layer)
**Authority:** Approved direction only. Recording a direction does **not** authorize implementation.

> **Change note (v0.2).** This v0.2 records `FK-D18` (FROZEN): AI-assisted interpretation/extraction of customer communication is architecturally permitted as **proposal-only**, under **mandatory human approval** and **mandatory source provenance**. This **partially supersedes `FK-D11`** — the automation-deferral / blanket Phase-1-"manual" clause only. All human-determination principles of v0.1/`FK-D11` are **retained**. The v0.1 wording that "does not authorize AI extraction" (§4) and the deferred-item list (§5) are revised accordingly. No implementation is authorized.

---

## 1. Purpose

Record the approved Phase 1 direction for communication intake. This document fixes the operating direction; it does not authorize implementation, configuration, or automation.

---

## 2. Why This Direction Was Chosen

- Automated WhatsApp CRM routing is not reliable enough to be treated as authoritative (see the FROZEN Communication Context Rule, `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`).
- FeelJapanK's commercial reality is multiple simultaneous opportunities and multiple contacts per customer; automated inference risks mis-attributing commercial context.
- The business must establish a correct, simple, usable human workflow. Automation is **assisted**, designed around the proven workflow.
- Communication evidence — including attachments, images, documents and voice — must be preserved correctly before automation is layered on top. This remains true under `FK-D18`: structured/AI-derived data is derived and never replaces originals.

---

## 3. Phase 1 Operating Model

The **human agent** remains responsible for determining:

1. The **Contact/person** involved.
2. The customer/**Organization** involved.
3. Whether the communication belongs to an **existing Deal** or requires a **new Deal**.
4. The **known requirements**.
5. Relevant **evidence and communication artifacts**.
6. Any additional context necessary to continue the commercial workflow.

**Retained (`FK-D11` / v0.1):** human determination remains authoritative. The CRM is **not required** to automatically infer or assign the commercial Deal context.

**Added (v0.2, per `FK-D18`):** the system **may** assist by interpreting/extracting **proposed** data from communication supplied through approved channels. AI output is **proposal-only**; the human **accepts, edits, or rejects**; only accepted data becomes authoritative CRM data. AI confidence is never equivalent to approval.

---

## 4. Communication Package / Evidence Principle

A WhatsApp communication must be understood as potentially containing **more than text**. A communication package may contain: text messages; screenshots/images; PDFs or other documents; spreadsheets; audio/voice messages; video; combinations of the above.

Where relevant, **original communication artifacts are preserved as evidence**, rather than relying only on a manually written summary.

**Revised (v0.2):** assisted interpretation/extraction of these artifacts (including images/documents/audio) is **architecturally permitted as proposal-only** under `FK-D18`, subject to mandatory human approval and mandatory source provenance. Structured data is **derived** and never replaces the preserved originals. **Implementation is not authorized** until a separate PLAN/BUILD under `FK-D12`.

---

## 5. Explicitly Deferred (implementation) vs Permitted (architecture)

**Architectural status (v0.2):** the following are **no longer prohibited**; they are permitted as **proposal-only** assistance under `FK-D18`, with mandatory human approval and provenance:

- AI extraction/interpretation of requirements;
- screenshot/image interpretation;
- document extraction;
- audio transcription;
- AI-assisted commercial-context suggestion.

**Still prohibited as authoritative / deferred as implementation** (not part of Phase 1 implementation; and never authoritative without human confirmation):

- automatic WhatsApp → Deal routing (authoritative);
- automatic Contact/Deal matching from phone number (authoritative);
- automatic Deal creation from WhatsApp (authoritative);
- automatic enquiry classification (authoritative);
- automated WhatsApp triage/inbox behaviour (authoritative);
- sophisticated WhatsApp context selection (authoritative);
- automated attachment interpretation (authoritative);
- replay/dedup improvements beyond the existing approved security control.

**Implementation status:** none of the above is implemented. Each requires a separate `PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFY` cycle under `FK-D12`.

**Confirmation boundary (cross-reference `FK-D14`):** AI may surface/extract possible confirmation information, but **confirmation detection/marking remains governed by `FK-D14`** and is not automatically authorized.

---

## 6. Relationship to the Existing Communication Context Rule

This direction does **not** alter or supersede:

`docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`

The existing principle remains:

> **A Contact identifies a person. Explicit commercial context identifies the Deal.**

**v0.2 addition:** AI **must not** authoritatively assign the Deal context; explicit context wins (`FK-D10`). AI may only propose.

---

## 7. Relationship to `ark_whatsapp_guard`

`ark_whatsapp_guard` is **not modified**. Its existing **HMAC security purpose remains intact**.

---

## 8. Future Automation Direction

AI-assisted intake is now intended as **assisted automation with human confirmation**, consistent with `FK-D18`. It must:

- remain **assisted automation with human confirmation**;
- treat automated inference as **suggestive, not authoritative**;
- preserve the explicit-context principle (`FK-D10`);
- never silently override human-confirmed commercial context;
- never mark Info Complete, decide allocation, trigger a Supplier Quotation Request, or generate a Customer Quotation;
- retain a source reference for every AI-derived value (provenance).

---

## 9. Next Planning Priority

The core **human workflow** remains the priority and must be correct, simple, and usable:

**Communication Intake → CRM Contact/Organization → Deal → pre-invoice commercial work (requirements → allocation → validation → Info Complete → supplier → customer quotation)**

In addition, a separate **Data Acquisition (AI + provenance) PLAN** under `FK-D12` is the next governance item for the AI-assisted proposal layer. Neither is authorized here.

---

## 10. Governance

- This direction is **APPROVED at v0.2** for Phase 1.
- v0.1 is preserved as the historical record; changes require a **new reviewed version**.
- This document **authorizes no implementation**.
- Implementation decisions must separately respect the **risk-based governance model** and the **`FK-D12`** gate.
- Do not silently reinterpret this direction during implementation.

---

*Related frozen architecture: `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Opportunity-Start-Lead-Usage-Rule-v0.1-FROZEN.md`; `docs/architecture/Frappe-CRM-ArkAlliance-Reference-Conventions-v0.1.md`.*
*Related decisions: `FK-D11` (partially superseded), `FK-D18` (FROZEN), `FK-D10`, `FK-D12`, `FK-D14`.*
