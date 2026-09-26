# FeelJapanK — Phase 1 Manual Communication Intake Direction

**Project:** FeelJapanK
**Subject:** Phase 1 Manual Communication Intake Direction
**Version:** v0.1
**Status:** APPROVED DIRECTION / PHASE 1
**Scope:** Manual communication intake
**Authority:** Approved direction only. Recording a direction does **not** authorize implementation.

---

## 1. Purpose

Record the approved Phase 1 direction that communication intake is **manual and human-in-the-loop**. This document fixes the operating direction; it does not authorize implementation, configuration, or automation.

---

## 2. Why This Direction Was Chosen

- Automated WhatsApp CRM routing is not reliable enough to be treated as authoritative (see the FROZEN Communication Context Rule, `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`).
- FeelJapanK's commercial reality is multiple simultaneous opportunities and multiple contacts per customer; automated inference risks mis-attributing commercial context.
- The business must first establish a correct, simple, usable human workflow. Automation should later be designed **around** a proven workflow, not force the workflow to accommodate automation prematurely.
- Communication evidence — including attachments, images, documents and voice — must be preserved correctly before automation is layered on top.

---

## 3. Phase 1 Operating Model

For Phase 1, the **human agent** is responsible for determining:

1. The **Contact/person** involved.
2. The customer/**Organization** involved.
3. Whether the communication belongs to an **existing Deal** or requires a **new Deal**.
4. The **known requirements**.
5. Relevant **evidence and communication artifacts**.
6. Any additional context necessary to continue the commercial workflow.

The CRM is **not required** to automatically infer or assign the commercial Deal context from a WhatsApp message.

---

## 4. Communication Package / Evidence Principle

A WhatsApp communication must be understood as potentially containing **more than text**. A communication package may contain:

- text messages;
- screenshots/images;
- PDFs or other documents;
- spreadsheets;
- audio/voice messages;
- video;
- combinations of the above.

An attachment or audio message may itself contain important commercial information. Where relevant to the business process, **original communication artifacts should be preserved as evidence**, rather than relying only on a manually written summary.

This direction does **not** authorize AI extraction, transcription, classification, or interpretation. Those are future capabilities.

---

## 5. Explicitly Deferred

The following are **future planning items** and are **NOT part of Phase 1 implementation**:

- automatic WhatsApp → Deal routing;
- automatic Contact/Deal matching from phone number;
- automatic Deal creation from WhatsApp;
- automatic enquiry classification;
- AI extraction of requirements;
- screenshot/image interpretation;
- document extraction;
- audio transcription;
- AI-assisted commercial-context determination;
- automated WhatsApp triage/inbox behaviour;
- sophisticated WhatsApp context selection;
- automated attachment interpretation;
- replay/dedup improvements beyond the existing approved security control.

Future automation should eventually be designed as **assisted automation with human confirmation**, rather than assuming that automated inference is authoritative.

---

## 6. Relationship to the Existing Communication Context Rule

This direction does **not** alter or supersede:

`docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`

The existing principle remains:

> **A Contact identifies a person. Explicit commercial context identifies the Deal.**

The new Phase 1 direction only determines **who supplies that commercial context initially**: the **human agent**. It does not change the underlying architectural rule.

---

## 7. Relationship to `ark_whatsapp_guard`

`ark_whatsapp_guard` is **not modified**. Its existing **HMAC security purpose remains intact**.

---

## 8. Future Automation Direction

Automation (including automated WhatsApp intake) is deferred. When designed, it must:

- be **assisted automation with human confirmation**;
- treat automated inference as **suggestive, not authoritative**;
- preserve the explicit-context principle;
- not silently override human-confirmed commercial context.

---

## 9. Next Planning Priority

With automated WhatsApp intake deferred, the next planning priority is the core human workflow:

**Manual Communication Intake → CRM Contact/Organization → Deal → Trip/Operations**

The objective is to make this workflow **correct, simple, and usable** before introducing automation.

---

## 10. Governance

- This direction is **APPROVED at v0.1** for Phase 1.
- Changes require a **new reviewed version**.
- This document **authorizes no implementation**.
- Implementation decisions must separately respect the **risk-based governance model**.
- Do not silently reinterpret this direction during implementation.

---

*Related frozen architecture: `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Opportunity-Start-Lead-Usage-Rule-v0.1-FROZEN.md`; `docs/architecture/Frappe-CRM-ArkAlliance-Reference-Conventions-v0.1.md`.*
