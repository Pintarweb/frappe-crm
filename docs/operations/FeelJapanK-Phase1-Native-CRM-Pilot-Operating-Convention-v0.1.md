# FeelJapanK Phase 1 — Native CRM Pilot Operating Convention

**Project:** FeelJapanK
**Subject:** Operator convention for running the Phase 1 information-gathering workflow inside native Frappe CRM
**Version:** v0.1
**Status:** PROPOSED / PILOT — **NOT FROZEN**
**Related authority:**
- `docs/operations/FeelJapanK-Phase1-Manual-Enquiry-Deal-SOP-v0.2.md` (operator procedure; its §6 `Request Summary` convention is authoritative for the note structure)
- `docs/operations/FeelJapanK-Phase1-Deal-Information-Gathering-Template-v0.2.md` (component list + status vocabulary)
- `docs/operations/FeelJapanK-Phase1-Information-Gathering-Checklist-v0.1.md` (daily checklist)
- `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` (FK-D01…FK-D17)
**Nature:** Human operating convention only. It authorizes no implementation, no customization, no automation, and no AI.
**Evidence base:** "FeelJapanK Phase 1 — Native Frappe CRM Workflow Validation" PLAN (HEAD `7664bf2`), Frappe 15.121.1 / Frappe CRM 1.84.0.

> This convention does not replace the SOP or template; it maps them onto the **actual native CRM objects**. Where this document and the SOP §6 conflict, the SOP §6 `Request Summary` structure prevails.

---

## 1. Purpose and Scope

Turn the validated native mapping into a repeatable manual workflow so any operator can run a Phase 1 Deal cleanly in the CRM UI, and so a second operator can understand a Deal without the original operator reconstructing the conversation.

**In scope:** Contact/Organization identification, Deal creation/selection, shared trip context, requested components, information status, evidence, changes, follow-up, manual quotation-readiness marker.
**Out of scope (deferred/other boundary):** quotation representation/versioning, supplier procurement, Trip/Operations, ERPNext, P01, automation, AI. See SOP v0.2 §2.

---

## 2. Native Object Mapping (the core)

| Operator concept | Native CRM object | Location / behaviour |
|---|---|---|
| Commercial opportunity | **CRM Deal** | One Deal = one distinct request. |
| Customer company | **CRM Organization** | Deal `organization` Link. |
| Person | **Contact** | Deal `contacts` child table (`CRM Contacts`); one row can be `is_primary`. |
| Maintained current-state gathering record | **FCRM Note** titled `Request Summary` | Deal → Notes tab; appears in Deal timeline. |
| Dated additive changes / clarifications | **Comment** | Deal → Comments tab; timestamped, attributed. |
| Original enquiry artifacts | **File** attachment (`attached_to = CRM Deal`) | Deal → Attachments tab; `attachment_log` in timeline. |
| Immediate next action (**authoritative**) | **Deal `next_step`** (short free text — must fit the native Frappe CRM field capacity, currently 140 characters) | Deal field (Side Panel / Data tab); full-text elaboration in Request Summary NEXT ACTION. |
| Assigned follow-up with owner + due date | **CRM Task** | Deal → Tasks tab; `assigned_to`, `due_date`, `status`, `priority`, references the Deal. |
| Responsibility | **Assignment** (AssignTo) | Deal assignees. |
| Automatic change history | **Version** | Deal/Note `track_changes = 1` → field-level changes in timeline. |
| Call record | **CRM Call Log** | Deal → Calls tab / timeline. |
| Email/communication | **Communication** | Deal → Email tab. |

**Constraint (native):** the form field layout (`CRM Fields Layout`) can re-arrange existing fields but **cannot add new fields**. This convention therefore places free-form gathering content in the `Request Summary` note, not in new fields.

---

## 3. Deal Creation Convention

**Frozen rule:** **PARTICULARITY, NOT COMPLETENESS, STARTS THE DEAL.**

Create/continue a Deal when the operator can identify **a particular** trip/service request. Examples:

- "Need Japan for 8 pax." → Deal
- "Need Japan December for 8 pax." → Deal
- "Need Tokyo for 5 days." → Deal
- "Need a private coach in Tokyo for 30 people for 3 days." → Deal

**No single signal is mandatory** — do not require destination + dates + pax as a combination. General interest ("Any Japan packages?") requires clarification first; no Deal yet (retain the communication; optional native Task or the optional Lead mechanism, FK-D09).

The Deal may remain **incomplete** indefinitely.

---

## 4. Existing vs New Deal Convention (human resolution)

Before creating a Deal:

1. Identify the **Contact** (search first; avoid duplicates; create only if genuinely absent).
2. Identify the **Organization** where applicable (search/reuse; keep Contact `company_name` consistent with the Organization name).
3. **Search/filter existing Deals** (Deals list; filter by Organization).
4. Determine whether the enquiry belongs to an existing commercial context.
5. **Amendment/continuation → use the existing Deal.**
6. **Genuinely distinct commercial request → create a new Deal.**
7. **Ambiguous → human resolution; ask; never silently guess.**

**Rule:** phone/email may identify the **Contact**; they do **not** authoritatively identify the **Deal**. Explicit commercial context takes precedence (FK-D10). Never assign communication to a Deal by phone number/email/familiarity alone, especially WhatsApp.

---

## 5. Request Summary Note Convention

Use **one** native `FCRM Note` on the Deal, titled exactly:

```text
Request Summary
```

Structure (per SOP v0.2 §6; keep short, maintain one current summary):

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

READY FOR QUOTATION (manual pilot marker): YES / NO
```

Rules:

- Use only the status vocabulary **KNOWN · MISSING · TO CONFIRM · CUSTOMER-CONFIRMED (facts) · NOT APPLICABLE**. Blank = not yet assessed. Do not invent status values.
- Keep it short; **one** current summary per Deal.
- **Never overwrite or destroy original evidence.**
- Changes are **dated and additive**.
- Do not put supplier costing, quotation mechanics, Trip mechanics, ERPNext mechanics, or financial accounting into the summary.
- The note's **Version history** (`track_changes = 1`) preserves prior summary states automatically.
- NEXT ACTION is the **full-text elaboration of the same immediate action** recorded in the authoritative short Deal `next_step`. They are one action, not independent authorities.

---

## 6. Component Convention

Mark every component from the v0.2 template as either **requested (selected)** or **NOT APPLICABLE**:

- Trip / Destination Scope *(scope anchor — not a purchasable service)*
- Accommodation
- Transportation
- Tour Guide
- Activities / Tickets
- Meals
- Flights
- Special Requirements
- Other

> **SELECTED ≠ COMPLETE ≠ READY FOR QUOTATION.** A selected component means the customer **requested** that scope. It does not mean the component is complete, supplier-ready, or quotation-ready.

Record component detail in the `Request Summary` note (component subsections), using the template's per-component items (Accommodation §5, Transportation §6, Tour Guide §7, Activities/Tickets §8, Meals §9, Flights §10, Special Requirements §11, Other §12). Do **not** require every component to be completed.

> Components are **not** recorded as `CRM Products` rows — those are commercial line items, not scope markers.

---

## 7. Service-Only Request Convention

A service-only request does **not** mean only service-specific information is gathered.

Example: *"Need a private coach in Tokyo for 30 people for 3 days."*

- Deal: **YES**
- Requested component: **Transportation**
- Shared Trip Context (still captured as available): destination (Tokyo); timeframe/dates; pax (30); duration (3 days); other relevant context.
- Unrequested components (Accommodation, Tour Guide, Activities/Tickets, Meals, Flights) → **NOT APPLICABLE**.
- Transportation details: vehicle class/capacity; pickup/drop-off; operating hours; exact dates; other transport requirements.

Do **not** force irrelevant component questions merely to fill a template. Shared context is gathered because every request needs trip context to be understood and quoted.

---

## 8. Comment Convention

Use **Comments** for dated, additive changes and clarifications. Do not silently overwrite historical information in the `Request Summary` when the **change itself** matters.

Lightweight format for each comment:

```text
YYYY-MM-DD — <what changed> — why: <reason> — source: <customer/operator> — action: <operator action taken>
```

- Use Comments for: requirement changes, clarifications received, questions sent, operator decisions.
- Use the `Request Summary` for the **current** state.
- Native **Version** history is the automatic backstop for field edits; Comments carry the human narrative.
- Do **not** create a custom change-log DocType.

> **Reconciliation note (2026-09, see `docs/architecture/FeelJapanK-Phase1-Business-Requirements-Capability-Architecture-Reconciliation-v0.1.md`).** This is a **pilot implementation assumption**, not a frozen business decision. Whether a structured amendment/revision-history representation is required is **OPEN** (`RC-Q05`) and will be decided through the normal governed process. Original wording retained for history.

---

## 9. Evidence Convention

Attach original enquiry artifacts as native **File** attachments on the Deal:

- WhatsApp screenshots; email exports; customer documents; customer confirmation; supplier quotations; relevant images/PDFs/spreadsheets; audio/video; itineraries.

Rules:

- **Preserve the original; never replace it with a rewritten summary.**
- Attach to the **correct Deal** — verify the Deal before uploading, especially with multiple simultaneous Deals.
- The `Request Summary` may **reference** evidence; the File remains the source artifact.
- Phase 1 evidence handling is **manual**; the operator interprets the artifact and records the facts. **No AI extraction/transcription/classification/routing.**
- Written WhatsApp/email customer confirmation is evidence under **FK-D14** and is **manually marked** (see §11). No auto-detection.

---

## 10. Follow-Up Convention

Use:

- **Deal `next_step`** — the **authoritative immediate next action**, kept **concise enough to fit the native Frappe CRM field capacity (currently 140 characters)**. Where the complete action requires more detail, the Request Summary NEXT ACTION holds the **full-text elaboration** of the same action and the **CRM Task description** may carry the same execution detail. The short Deal `next_step` remains authoritative for the immediate action.
- **CRM Task** — when a real follow-up needs an **owner and/or due date** (`assigned_to`, `due_date`, `status`, `priority`, referencing the Deal).
- **Deal assignment (AssignTo)** — when responsibility for the Deal must be explicit.

**When to use which (simple rule):**

| Situation | Use |
|---|---|
| Simple, immediate, likely done in the same session; no need to track | `next_step` only |
| Work another person must do, or needs a deadline, or spans days | **CRM Task** (+ `next_step` points to it) |
| Whole Deal ownership must be explicit | **Assign** the Deal |

Keep `next_step` truthful: when the action changes or completes, update it; when a Task exists, `next_step` may name it.

---

## 11. Customer-Confirmed Convention

Within the `Request Summary`, maintain the strict distinction:

- **KNOWN** — supplied or established from the enquiry/evidence.
- **MISSING** — not available.
- **TO CONFIRM** — a specific point requiring confirmation from the customer/source.
- **CUSTOMER-CONFIRMED (facts)** — facts explicitly confirmed by the customer, dated.
- **NOT APPLICABLE** — genuinely does not apply to this Deal/component.

> **`CUSTOMER-CONFIRMED` is NOT** quotation acceptance, commercial confirmation, Trip initiation, invoice, payment, or supplier commitment.
> It records **facts** the customer confirmed (e.g. dates, pax, destination, preferences) and nothing more.

Commercial confirmation is a separate event (FK-D14); Trip initiation is triggered by the **customer invoice** (FK-D15). Preserve both semantics; do not conflate them.

---

## 12. Ready for Quotation Convention (manual pilot marker)

**Do not modify native Deal statuses. Do not repurpose `Ready to Close` to mean `Ready for Quotation` — they have different meanings.**

For the pilot, quotation readiness is a **manual operating marker** recorded as a line inside the `Request Summary` note:

```text
READY FOR QUOTATION (manual pilot marker): YES / NO
```

Rules:

- It is **NOT** an automatic rule, score, formula, system gate, or frozen readiness algorithm.
- Do **not** define universal mandatory fields, and do **not** say one missing field always blocks quotation.
- **Quotation readiness remains `TO BE DERIVED`.**
- Native Deal `status` continues to represent the pipeline stage only; changing it is a separate operator action and is **not** the same as this marker.

> **Reconciliation note (2026-09).** "Do not modify native Deal statuses" and the manual RFQ marker are **pilot implementation assumptions**, not frozen business decisions. The required quotation-readiness model and Deal-state representation are **OPEN** (`RC-Q02`, `RC-Q08`) in the reconciliation document. Original wording retained for history.

---

## 13. Amendment Convention

When the customer changes dates, pax, destination, hotel, transport, guide, activities, or other requirements:

**Default: same Deal** — it is an amendment to the same commercial request. Do **not** create a new Deal merely because requirements changed (FK-D03).

Preserve the change through:

1. Update the `Request Summary` to the new current state.
2. Add a dated **Comment** when the historical change matters (before → after, why, source).
3. Attach new **File** evidence where applicable.
4. Rely on native **Version** history for field-level edits.

A **genuinely distinct** request becomes a **new Deal** (§4).

---

## 14. Identity and Ambiguity Handling

- **Contact = person; explicit commercial context = Deal** (FK-D10).
- When a customer has multiple active Deals and a message is ambiguous:
  1. Identify the actual request from explicit content.
  2. Match to the Deal by that context.
  3. If unclear, **ask**.
  4. **Never** silently attach information to the wrong Deal.
- No automatic matching, routing, or resolution is designed or authorized.

---

## 15. Pilot Scenario Matrix (A–L)

| # | Starting enquiry | Operator action | Expected native objects | Request Summary content | Evidence | Expected next action | Expected result |
|---|---|---|---|---|---|---|---|
| A | "Need a private coach in Tokyo for 30 people for 3 days." | Create Deal; capture context; select Transportation | Deal; FCRM Note `Request Summary`; Files | Shared context (Tokyo, 30 pax, 3 days, dates MISSING/TO CONFIRM); Transportation selected; others NOT APPLICABLE | Attach original message | `next_step` (get exact dates/vehicle class) | Deal with clear transport scope |
| B | "Need hotels in Tokyo for 8 pax, 4 nights." | Create Deal; select Accommodation | Deal; Note; Files | Tokyo, 8 pax, 4 nights; Accommodation selected; others N/A; category/dates TO CONFIRM | Attach original | `next_step` (hotel preference/dates) | Deal with lodging scope |
| C | "Need an English-speaking guide in Tokyo for 3 days." | Create Deal; select Tour Guide | Deal; Note; Files | Tokyo, 3 days, pax; Guide entry (language English); others N/A | Attach original | `next_step` (pax/coverage) | Deal with guide requirement |
| D | "Guide 1 Japanese, Guide 2 English, Guide 3 Malay." | Create Deal; add multiple guide entries | Deal; Note (multiple guide entries); Files | Three guide entries, each with language; dates/pax TO CONFIRM; bilingual-vs-separate ambiguity → TO CONFIRM | Attach original | `next_step` (confirm dates/pax per guide) | Multi-guide requirement represented |
| E | "Need coach + hotels in Tokyo, 5 days, 20 pax." | Create Deal; select Transportation + Accommodation | Deal; Note; Files | Shared context; two components selected; others N/A; per-component statuses | Attach original | `next_step` (per-component missing info) | One Deal, two components, no ambiguity |
| F | Full package request | Create Deal; select all relevant components | Deal; Note; Files | Shared context + each component section with KNOWN/MISSING/TO CONFIRM | Attach original | Tasks for outstanding owners/dates as needed | Complete package enquiry represented |
| G | Customer changes date/pax/hotel on existing Deal | Update same Deal; append dated Comment | Deal; Note (updated); Comment; Version; Files | CHANGES (before → after, dated); current state updated | Attach new message/confirmation | `next_step` update / Task if owner+due date | Amendment preserved; no new Deal |
| H | Same Contact makes an unrelated new Japan enquiry | Confirm distinct request; create new Deal | Second Deal; separate Note/Files | New context for the new request | Attach original | `next_step` per Deal | Two separate Deals; prior untouched |
| I | Comment could refer to multiple Deals | Identify by explicit context; if unclear, ask | n/a (human action) | Clarification recorded in TO CONFIRM | Attach clarification | `next_step` (await answer) | No mis-assignment; no guessing |
| J | Customer confirms dates and pax | Record facts as confirmed | Deal; Note; Comment (dated) | CUSTOMER-CONFIRMED (facts) with date | Attach confirmation | `next_step` (remaining TO CONFIRM) | Facts recorded; ≠ commercial confirmation |
| K | Enquiry arrives as WhatsApp screenshot + PDF | Attach originals | Deal; Files; attachment_log in timeline | EVIDENCE references | Files as source artifacts | `next_step` | Evidence preserved on correct Deal |
| L | Operator needs a follow-up with an owner/due date | Create CRM Task; assign Deal | Deal; CRM Task; AssignTo; Note | NEXT ACTION (owner/action/due) | as applicable | Task due date; status tracked | Follow-up clearly owned and dated |

---

## 16. Operator Checklist (daily use)

### Before creating a Deal
- [ ] Is this a **particular** request? (Particularity, not completeness.)
- [ ] Is there an **existing Deal**? (Search/filter by Organization.)
- [ ] Is the **Contact** known? (Search first.)
- [ ] Is the **Organization** known?

### After creating/opening the Deal
- [ ] Capture **Shared Trip Context**.
- [ ] Identify **Requested Components**.
- [ ] Mark irrelevant components **NOT APPLICABLE** where appropriate.
- [ ] Record **MISSING** information.
- [ ] Record **TO CONFIRM** questions (with date).
- [ ] Record **CUSTOMER-CONFIRMED (facts)** (with date).
- [ ] Preserve **evidence** (Files; do not replace originals).
- [ ] Record **next action** (`next_step`).
- [ ] Create a **CRM Task** where a follow-up needs an owner/due date.
- [ ] Record important **CHANGES** (dated before → after).

### Before quotation
- [ ] Review the **Request Summary**.
- [ ] Check outstanding **MISSING / TO CONFIRM** items.
- [ ] Confirm **requested components**.
- [ ] Confirm **evidence**.
- [ ] Mark **Ready for Quotation: YES/NO** manually, per §12.

> This checklist is a human aid, **not** an automated gate.

---

## 17. Pilot Success Criteria (operational, not software metrics)

- Operator can identify the correct Deal.
- Operator can distinguish a new Deal from an amendment.
- Shared trip context is consistently captured.
- Requested components are clear.
- Unrequested components are not accidentally treated as requested.
- Customer-confirmed facts are distinguishable from other information.
- Original evidence is preserved and attached to the correct Deal.
- Follow-up has a clear owner/action when required.
- A second operator can understand the Deal without asking the original operator to reconstruct the conversation.

No scoring is introduced.

---

## 18. Pilot Feedback / Gap Capture

Record every pilot observation and classify it:

- **G1 — No gap:** native CRM already supports it.
- **G2 — Operator/process gap:** workflow/convention needs improvement (no code).
- **G3 — Presentation/usability gap:** representable but awkward (prefer training/convention first).
- **G4 — Genuine product/customization gap:** native CRM cannot adequately support the workflow.

**Only G4 may trigger consideration of a future BUILD.** A custom field being *more convenient* does **not** make something G4.

Suggested capture format:

```text
Date | Deal ref | Scenario | Observation | Classification (G1–G4) | Suggested convention change (if G2/G3)
```

**Customization gate (per SOP v0.2 §14):** consider change only if the pilot repeatedly demonstrates inability to identify/reuse the correct Deal, repeated re-keying of destination/dates/pax, evidence repeatedly landing on the wrong simultaneous Deal, or recurring need to filter/list Deals by structured request attributes. Otherwise add nothing.

---

## 19. Pilot Discipline and Out of Scope

During the pilot:

- **No** custom fields; **no** new DocTypes; **no** custom workflows; **no** modified Deal statuses; **no** scripts.
- **No** automation; **no** AI extraction/classification/summarization/routing.
- **No** automatic WhatsApp → Deal routing.
- **No** P01 integration; **no** ERPNext integration; **no** Trip implementation.
- **No** new persistent Request object.

The Request Summary and checklist are **PILOT / NOT FROZEN**. Purpose: discover whether native CRM plus human conventions are sufficient.

**Pilot target (SOP v0.2 §14):** 15–25 real enquiries over ~4–6 weeks, mixing complete/incomplete requests, new/existing customers, ambiguous requests, email, WhatsApp, attachment-heavy enquiries, and multiple simultaneous Deals.

---

## 20. Governance

- This convention is **PILOT / NOT FROZEN** and authorizes no implementation.
- It does not modify or reinterpret any FROZEN decision (FK-D01…FK-D17).
- Where it and the SOP/template differ, the SOP/template prevails.
- Any future customization requires the controlled path: `STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE`.

---

## Appendix — Quick Object Reference

| Need | Native object | Where in UI |
|---|---|---|
| Opportunity container | CRM Deal | Deals list / Deal page |
| Current gathering state | FCRM Note `Request Summary` | Deal → Notes |
| Dated change/clarification | Comment | Deal → Comments |
| Original evidence | File (attached to Deal) | Deal → Attachments |
| Immediate next action | Deal `next_step` | Deal Side Panel / Data tab |
| Follow-up with owner/date | CRM Task | Deal → Tasks |
| Responsibility | Assignment (AssignTo) | Deal header |
| Automatic change audit | Version | Deal timeline |
| Calls / emails | CRM Call Log / Communication | Deal → Calls / Email tabs |
