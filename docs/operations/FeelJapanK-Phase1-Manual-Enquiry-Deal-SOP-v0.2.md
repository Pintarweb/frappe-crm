# FeelJapanK — Phase 1 Manual Enquiry → Deal SOP (v0.2)

**Project:** FeelJapanK
**Subject:** Phase 1 Manual Enquiry → Deal Standard Operating Procedure
**Version:** v0.2
**Status:** PROPOSED / PHASE 1 OPERATING SOP — **PILOT**
**Supersedes for the Phase 1 pilot:** `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.1.md` (preserved as historical).
**Companion tool:** `docs/operations/FeelJapanK-Phase1-Information-Gathering-Checklist-v0.1.md` (PILOT — NOT FROZEN)
**Authority:** Operational procedure only. The `Request Summary` convention is **PILOT / NOT FROZEN**. This SOP authorizes no implementation.

---

## 1. Purpose

Govern how a FeelJapanK operator handles a new commercial enquiry manually in Frappe CRM during Phase 1: from incoming communication, through intake and information gathering, to a Deal and pre-invoice commercial work.

Phase 1 is **manual / human-in-the-loop**. The operator — not the software — determines Contact, Organization, existing-vs-new Deal, requirements and evidence.

---

## 2. Scope

`Request → Intake → Information Gathering → Deal → pre-invoice commercial work.`

Excluded (later boundaries): quotation representation/versioning, supplier procurement, Trip/Operations, ERPNext, P01, automation/AI.

---

## 3. Operator Workflow

1. **Receive communication** (email, WhatsApp, phone, attachment).
2. **Preserve original evidence** — attach/record the original; never replace it with a rewritten summary.
3. **Identify Contact** — search first; avoid duplicates; create only if genuinely absent.
4. **Identify Organization** — search/reuse; the Contact `company_name` should match the Organization name so it appears in the Org Contacts tab.
5. **Genuine Commercial Enquiry test** (§4).
6. **Determine new vs existing Deal** (§5) using explicit context — never phone number.
7. **Start/continue information gathering** (§7) using the companion checklist.
8. **Maintain the Request Summary** (§6) on the Deal.
9. **Create a follow-up Task** when required (owner + due date).
10. **Continue pre-invoice commercial work** within the Deal (quotation work is a later design).

---

## 4. Genuine Commercial Enquiry Test

> **Particularity, not completeness, starts the Deal.**

A genuine commercial enquiry requires **all three**:
1. An identifiable counterparty (Contact and/or Organization).
2. Commercial intent to obtain Japan travel services/arrangements from FeelJapanK.
3. A **discernible particular Japan trip/service request**.

The request does **not** need to be complete. Particularity may be established by **one or more** identifiable elements, such as:

- destination/route;
- timeframe/date;
- group/party;
- named service/component;
- duration;
- or another clearly identifiable element of the requested Japan arrangement.

**No single signal is individually mandatory.** These are example signals, **not** a mandatory checklist; do **not** require destination + dates + pax + itinerary + budget before creating a Deal.

> **Incomplete does not mean not an opportunity.** A Deal may be created and remain incomplete.

**General interest, inspiration-seeking, or an insufficiently particular request remain pre-Deal** and should be clarified **before** creating a Deal.

Contrast: "Any good Japan packages?" (generic/undirected) → clarify first, no Deal yet.

### Boundary examples (illustrative, not mandatory criteria)

- "Need Japan for 8 pax." → **Deal**
- "Need Japan December for 8 pax." → **Deal**
- "Need Tokyo for 5 days." → **Deal**
- "We need a 5-day company trip for 30 people in November. Can you arrange something?" → **Deal**, even without a destination
- "Any Japan packages?" → **No Deal**
- "Boss, can you arrange Japan for our client?" → **No Deal**
- "We want to bring our staff to Japan." → **No Deal** until sufficiently particular

### Incomplete request handling

Example: "Boss, can you arrange Japan trip for our client?"

- Preserve the original communication.
- Identify Contact/Organization.
- Clarify enough to determine whether a **particular** commercial request exists.
- Use native mechanisms — a communication/activity note and a **Task**, or the **optional** Lead mechanism (FK-D09) — while clarifying. "Clarify before creating a Deal" does **not** imply clarification can only happen outside CRM; the optional Lead remains available (FK-D09).
- Create the Deal **once the test holds**; allow it to remain incomplete.
- **Never** invent a new persistent "Request" / "Holding Enquiry" object.

**[OPEN / REQUIRES BUSINESS DECISION]** the exact persistent intake convention for a **known** Contact with a vague request (beyond optional Lead and a Task/Note) is not settled. Do not invent a final answer.

---

## 5. New vs Existing Deal

Apply the Communication Context Rule (FK-D10): the Deal is identified by **explicit commercial context**, never by phone/email alone.

- **A. Existing request continues** (references the same opportunity) → keep using the existing Deal.
- **B. Existing request changed/amended but remains the same commercial context** (e.g., Tokyo hotel changed Shinjuku → Shibuya) → keep the existing Deal and record the change/history (Request Summary CHANGES).
- **C. Genuinely distinct request** (different group/party/departure, or explicitly "another/separate" request) → **create a new Deal**. Do not merge the new request into the old Deal merely because the Contact/Organization is the same.
- The old Deal remains a **historical record**. If the old request is genuinely no longer proceeding, record that outcome using the **existing/native** Deal outcome/status where appropriate — do **not** invent a custom "superseded"/"cancelled" status.
- Multiple simultaneous Deals for one Organization are valid.
- **Never** infer the Deal solely from phone number or email; **never** silently assign ambiguous communication.
- When the distinction is unclear → **ask/clarify** (FK-D10).

---

## 6. Request Summary Convention (PILOT — NOT FROZEN)

One maintained native **FCRM Note** on the Deal, titled `Request Summary`. Changes are appended as dated comments; evidence stays attached as files.

```text
REQUEST SUMMARY — <Deal / Organization / Contact>          Updated: <date>

KNOWN (customer's words / confirmed facts)
- Destination / route:
- Timeframe:
- Group / pax / adults / children / infants:
- Purpose / special status:
- Other stated needs:

MISSING (required but not yet supplied)
-

TO CONFIRM (questions sent — with date)
-

CUSTOMER-CONFIRMED FACTS (facts the customer confirmed — with date)
-

CHANGES (dated, latest first: before → after)
-

EVIDENCE (references; originals attached to the Deal)
-

NEXT ACTION (owner / action / due)
-
```

Rules:
- Keep it short; maintain **one** current summary.
- Never overwrite or destroy original evidence.
- Changes are dated and additive.
- **Do not** put supplier costing, quotation mechanics, Trip mechanics, ERPNext mechanics, or financial accounting into the Request Summary.
- **"CUSTOMER-CONFIRMED FACTS" ≠ commercial confirmation.** That section records **facts the customer confirmed** (e.g., dates, pax, destination, preferences). It does **not** mean the Deal is commercially confirmed and does **not** initiate a Trip. Commercial confirmation is the separate business event governed by FK-D14/FK-D15 (see §13).

---

## 7. Information Gathering

Use the companion checklist: `docs/operations/FeelJapanK-Phase1-Information-Gathering-Checklist-v0.1.md`.

Statuses are **KNOWN / MISSING / TO CONFIRM / CUSTOMER-CONFIRMED (facts) / NOT APPLICABLE** — never pretend unknown information is known. Information gathering is progressive; do not block Deal creation on completeness.

---

## 8. Communication Scenarios

| Channel | Operator handling | Evidence | Deal context |
|---|---|---|---|
| New email enquiry | Identify Contact/Org; create/continue Deal | On the Deal | Explicit (operator or thread) |
| Email reply to existing Deal | Continue the threaded Deal | Threads automatically | Automatic (thread) |
| New WhatsApp enquiry | Create/continue Deal; **manually** download + attach artifacts | Manual `File` attachments | Explicit (operator) |
| WhatsApp follow-up | Confirm the Deal from content; attach there | Manual attachments | Explicit (operator) |
| WhatsApp with multiple Deals | Identify the actual request; if unclear, ask | Manual attachments on chosen Deal | Explicit — **never phone→Deal** |
| Phone enquiry | Log a CRM Call Log; update summary | Call log + note | Explicit (operator) |
| Attachments (PDF/sheet/image/itinerary) | Upload to the correct Deal; reference in summary | `File` on Deal | Explicit |
| Later written confirmation | Preserve it (FK-D14); note it in summary | On the Deal | Explicit |

---

## 9. Evidence Preservation

Original artifacts to preserve: email; WhatsApp message/export/screenshot; PDF; spreadsheet; image; audio; video; itinerary; customer-written confirmation.

- **Do not replace evidence with a rewritten summary.**
- Attach originals to the correct Deal.
- **Attachments are handled manually in Phase 1:** the operator opens/reads/interprets customer-provided attachments (PDF, spreadsheet, image, voice, itinerary, etc.), records the relevant facts in the Request Summary / checklist, and determines what the attachment means and which Deal it belongs to. The operator remains responsible for this. **No AI** extraction, transcription, classification, summarization, or automatic routing is authorized in Phase 1.

---

## 10. Lead Usage

- Known customer + genuine enquiry → Deal directly.
- Identifiable but incomplete enquiry → Deal can still be created.
- Unknown party / vague inbound → clarify; Lead is **optional** (FK-D09), never mandatory.
- Lead is not the business object.

---

## 11. WhatsApp Phase 1 Handling

- WhatsApp is an input channel; Deal routing is manual.
- WhatsApp must **not** be treated as automatically authoritative Deal-level confirmation.
- `ark_whatsapp_guard` remains untouched.
- Automated WhatsApp → Deal routing, automatic Contact/Deal matching, and replay/dedup improvements beyond the existing security control are **deferred**.

---

## 12. Deal → Trip Boundary

- **CRM / Deal owns (pre-invoice):** relationship/enquiry context; pre-invoice commercial state — requirements, supplier quotations/re-quotes, customer quotation versions, negotiation, written confirmation evidence, CONFIRMED snapshot; historical commercial record retained after Trip creation. (FK-D17)
- **Trip / Operations owns (from Trip initiation onward):** Trip; operational requirements and operational history from initiation; components; supplier commitment; fulfilment; during-trip; post-trip; closure. (FK-D05)
- **ERPNext owns (from the financial boundary):** financial masters and financial/commercial documents from the first customer invoice. (FK-D06, FK-D16)

**Trip initiation boundary (FK-D15, FROZEN):** the Trip is initiated when the **customer invoice is created**. Written confirmation precedes invoice creation as evidence; quotation confirmation alone, "Deal Won", and payment do **not** initiate the Trip.

---

## 13. Confirmation

- Written WhatsApp/email confirmation may be sufficient evidence; the operator manually marks it (FK-D14).
- Preserve the confirmation and its source.
- Automatic confirmation detection is deferred.

---

## 14. Pilot Discipline

For the pilot:
- **No** custom fields; **no** new DocTypes.
- **No** automation; **no** AI extraction/classification.
- **No** automatic WhatsApp Deal routing.
- **No** ERPNext integration changes; **no** Trip implementation changes.
- **No** new persistent Request object.

The purpose of the pilot is to discover whether native CRM plus human operating conventions are sufficient. The Request Summary and the checklist are **PILOT / NOT FROZEN**.

**Pilot target:** 15–25 real enquiries over ~4–6 weeks, mixing complete/incomplete requests, new/existing customers, ambiguous requests, email, WhatsApp, attachment-heavy enquiries, and multiple simultaneous Deals.

**Customization gate — consider change only if the pilot repeatedly demonstrates:** (1) inability to identify/reuse the correct Deal due to missing structured request identity; (2) repeated re-keying of destination/dates/pax; (3) evidence repeatedly landing on the wrong simultaneous Deal; (4) recurring need to filter/list Deals by structured request attributes. Otherwise, add nothing.

---

## 15. Daily Agent Checklist

- [ ] Identify Contact.
- [ ] Identify Organization.
- [ ] Preserve original communication/evidence.
- [ ] Determine whether the enquiry is genuinely commercial.
- [ ] Search existing Deals.
- [ ] Decide existing Deal vs new Deal (explicit context).
- [ ] Capture/update the Request Summary.
- [ ] Record important changes.
- [ ] Create a follow-up Task where required.
- [ ] Continue communication in the correct Deal context.
- [ ] Preserve confirmation evidence when confirmation occurs.
- [ ] Do not silently guess when context is ambiguous.

---

## 16. Known Phase 1 Limitations

- WhatsApp lacks reliable native Deal triage; unknown numbers may be orphaned.
- WhatsApp phone-based resolution can overwrite/choose a Deal (known; handled manually).
- Fresh inbound email may not auto-link to an existing Contact/Deal.
- `Contact.company_name` is text, not a link — rename/mismatch breaks the Org Contacts tab.
- No structured requirement-history or quotation-version object in CRM.
- No Trip object; deal-to-trip transition mechanism not yet designed.

> **Reconciliation note (2026-09).** The two lines above are **native platform observations**, not business-scope decisions. Customer quotation versions V1..Vn and negotiation history are a **CRM-owned business requirement** (`FK-D17`, `BR §4–§5`); the absence of a native object is a capability gap to be assessed, not a reason the requirement does not exist. The Trip object is a **core Phase 2 business requirement** (`Workflow §3`; `Master Plan Phase 2`), not merely a "not yet designed" convenience. See `…Capability-Architecture-Reconciliation-v0.1.md`.

---

## 17. Deferred / Not Authorized

Not authorized by this SOP: automated WhatsApp→Deal routing; automatic Contact/Deal matching; automatic Deal creation; AI classification/extraction/transcription; screenshot/document/audio interpretation; automated triage; Trip DocTypes; quotation versioning; supplier models; ERPNext; P01 integration; new auth; generic integration infrastructure.

> **Reconciliation note (2026-09, see `docs/architecture/FeelJapanK-Phase1-Business-Requirements-Capability-Architecture-Reconciliation-v0.1.md`).**
> Prior wording preserved above. This deferral list mixes two different things and must not be read as a business-scope decision:
> - **Genuine deliberate deferrals (retained):** automated WhatsApp routing, automatic Contact/Deal matching, automatic Deal creation, AI classification/extraction/transcription, automated triage, ERPNext, P01 integration, new auth, generic integration infrastructure.
> - **Reopened for assessment (not business deferrals):** **quotation versioning** is required by `FK-D17`/`BR §4–§5`; "Trip DocTypes" is a **Phase 2 implementation** matter (`Workflow §3`, `Master Plan Phase 2`), not a dropped requirement; supplier models relate to later phases.
> The status of these items is governed by the reconciliation document, not by this list.

---

## 18. Pre-Invoice Cancellation / Withdrawal (PILOT)

**Cancellation is not an alternative to creating a Deal.** If a genuine commercial enquiry already crossed the Genuine Commercial Enquiry threshold, the Deal exists as the historical commercial record even if the customer later withdraws before invoice.

- **Enquiry never became a Deal** (threshold never met) → close the intake; no Deal is created.
- **Genuine enquiry became a Deal, then the customer withdrew (pre-invoice)** → keep the Deal; preserve communications and evidence; record the withdrawal context using existing **native** CRM mechanisms; use an **existing/native** Deal outcome/status (do **not** invent a custom "Cancelled"/"Superseded" status); do **not** delete the Deal; do **not** convert it into a Trip.
- **Customer merely postpones** → do **not** automatically treat as cancellation; preserve the Deal unless the customer has withdrawn.
- **Customer pivots to a genuinely distinct request** → apply §5 Case C (new Deal for the new request) and record an appropriate historical outcome on the previous Deal; this is not a cancellation of the new requirement.
- Do **not** invent exact status names — use the native Frappe CRM Deal outcome vocabulary as installed.
- **Reopening a previously cancelled/withdrawn Deal is not defined here.** If a customer later resumes a withdrawn request, treat it as a future/native-workflow question — do **not** invent a reopening rule.
- This does not change FK-D15.

## 19. Post-Invoice Cancellation — Boundary Only

- Once the customer invoice is created, the Deal crosses the FROZEN Trip Initiation Boundary (FK-D15); a **Trip exists**.
- A cancellation after that point is **no longer merely a pre-invoice CRM Deal outcome**; it belongs to the **Trip / Operations + ERPNext financial workflow**.
- For now: do **not** define the detailed cancellation workflow, do **not** invent Trip cancellation statuses, and do **not** modify FK-D15. Record this as a future workflow/detail decision if needed.
- Architectural principle: **a cancellation does not erase the business object that already existed** — a cancelled pre-invoice Deal remains historical Deal history; a cancelled post-invoice Trip remains historical Trip history.

---

## Governance

- This SOP is **PROPOSED / PHASE 1 OPERATING SOP — PILOT** at v0.2; v0.1 is preserved as historical.
- Changes require a new reviewed version.
- It authorizes **no implementation**.
- Do not silently reinterpret it during implementation.

---

*Related authority: `docs/architecture/FeelJapanK-Communication-Context-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Opportunity-Start-Lead-Usage-Rule-v0.1-FROZEN.md`; `docs/architecture/FeelJapanK-Phase1-Manual-Communication-Intake-Direction-v0.1.md`; `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`; `docs/business/FeelJapanK-Business-Requirements-Consolidation-v0.2.md`; `docs/business/Field-Japan-K-Business-Workflow-Requirements-v0.1.md`; `docs/business/FeelJapanK-Implementation-Master-Plan-v0.1.md`. Companion: `docs/operations/FeelJapanK-Phase1-Information-Gathering-Checklist-v0.1.md`.*
