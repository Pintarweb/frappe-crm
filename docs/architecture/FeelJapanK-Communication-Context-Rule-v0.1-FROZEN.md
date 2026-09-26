# FeelJapanK — Communication Context Rule

**Project:** FeelJapanK
**Subject:** Communication Context Rule
**Version:** v0.1
**Status:** FROZEN — approved business/architecture guidance
**Authority:** Business/architecture rule only. **Implementation is NOT authorized by this document.**

---

## 1. Context

FeelJapanK is a Malaysia-based B2B Japan land operator whose customers are Malaysian travel-agent companies.

- A single customer company may have **multiple contacts** (owner, sales, finance, operations, other representatives).
- A single customer may have **multiple simultaneous commercial opportunities / trips**.
- A person or phone number therefore **cannot inherently identify a commercial opportunity**.

In the CRM layer, a **CRM Organization** identifies the customer company, a **Contact** identifies a person, and a **Deal** represents **one commercial enquiry/opportunity**. The **Trip** is the later operational/commercial unit owned outside CRM.

---

## 2. Frozen Communication Context Principle

> **A Contact identifies a person. Explicit commercial context identifies the Deal.**

The following norms are FROZEN:

- Phone/email **may identify a Contact**.
- A **CRM Organization** identifies the customer company.
- A **Deal** identifies **one commercial opportunity/enquiry**.
- A Deal **must be identified by explicit commercial context**.
- **Explicit context takes precedence over phone matching whenever context exists.**
- **Phone matching is fallback only.**
- Phone matching may suggest a Deal only where the opportunity is **genuinely unambiguous**.
- When no reliable Deal context exists, a **human chooses or creates** the appropriate Deal.
- **CRM must not silently guess the Deal.**

---

## 3. Communication Examples

Example: **ABC Travel**, contact **Ahmad**, with two opportunities:

- **Deal A — Osaka / October**
- **Deal B — Tokyo / December**

- "Can you quote Tokyo for 12 pax?" **must be associated with Deal B by explicit commercial context**, not inferred from Ahmad's phone number.
- "Any update on the Osaka quotation?" **must be associated with Deal A** when that is the explicit commercial context.

---

## 4. Evidence / History Principle

- Under the business requirements, **written WhatsApp or email confirmation can constitute sufficient business evidence**.
- Important commitments **must remain traceable to evidence/history**.
- Therefore **incorrect Deal attribution is not merely a UI inconvenience**; it can compromise commercial history and the later Trip/ERPNext handoff.

---

## 5. Current Frappe CRM Limitation

Verified facts only:

- Current WhatsApp validation **resolves by phone/contact**.
- It **can select a primary Deal**.
- The current implementation **can overwrite an explicitly supplied Deal reference**.
- If a Contact is primary on **multiple Deals, selection can be arbitrary**.
- **Unknown WhatsApp messages have no native CRM triage inbox.**
- **Email threading can preserve the correct Deal context.**
- **Fresh inbound email has different limitations.**

No implementation is proposed here.

---

## 6. Deferred High-Risk Decision

Enforcing explicit WhatsApp Deal context is a **separate HIGH-RISK decision**. Examples may include:

- changing/overriding native WhatsApp validation;
- changing CRM communication routing;
- modifying frappe_whatsapp integration behaviour.

How to implement any of these is **not designed here**.

> **This governance freeze does not authorize implementation.**

---

## 7. Temporary Operating Convention

Until explicit WhatsApp context enforcement is separately approved and implemented:

> **WhatsApp may be used for communication, but a WhatsApp message must not be treated as authoritative Deal-level confirmation unless its Deal context has been manually verified.**

- **Email threading may be used** where it preserves the correct Deal context.
- **Manual verification is a temporary workaround.**
- **"One opportunity per contact" must NOT be adopted as a permanent business rule.**
- The workaround must not distort the business requirement that a customer/contact may have **multiple simultaneous opportunities**.

---

## 8. Relationship to Other Architecture

- **P01 remains canonical for identity.**
- **Contact and CRM Organization are the CRM identity anchors.**
- **Lead and Deal carry no direct P01 references.**
- **Deal is the CRM commercial context.**
- **Trip remains outside CRM's enduring operational ownership.**
- **ERPNext remains the future financial authority.**

No new integration design is introduced.

---

## 9. Non-Goals

This document does **NOT** decide:

- WhatsApp implementation;
- WhatsApp triage UI;
- Lead vs Deal;
- the "genuine commercial enquiry" threshold;
- Contact↔Organization schema;
- Deal→Trip handoff;
- Trip identity;
- ERPNext integration;
- P01 integration.

Those remain separate decisions.

---

## 10. Governance

- This rule is **FROZEN**.
- Changes require a **new reviewed version**.
- **Implementation requires a separate high-risk approval.**
- **Do not silently reinterpret this rule during implementation.**

---

*Source authority: FeelJapanK Business Requirements Consolidation v0.2; FeelJapanK Implementation Master Plan v0.1; Field Japan K Business Workflow & Requirements v0.1; Frappe CRM — ArkAlliance Reference Conventions v0.1.*
