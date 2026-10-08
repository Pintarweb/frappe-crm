# FeelJapanK Phase 1 — Stage 0 Decision Register

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Stage0-Decision-Register-v0.1 |
| Version | v0.1 |
| Status | **CANONICAL GOVERNANCE CONTINUITY RECORD — DOCUMENTATION** |
| Date | 2026-10-07 |
| Repository | `/home/yusmarin/frappe-crm` |
| Scope | Stage 0 — Data Acquisition / Data Entry — AI + Provenance (boundary: **Info Complete**) |

> This Decision Register is the **canonical Stage 0 governance continuity record**. Detailed technical evidence remains in the Architecture, Verification Plan, Implementation Plan, Decisions, and Implementation Log documents. This register summarizes governance state and prevents loss of decision continuity across sessions.
>
> **Future significant Stage 0 investigations and governance decisions must update this register before the project proceeds to the next decision block.**
>
> This register is documentation only. It authorizes **no** implementation. `BUILD remains UNAUTHORIZED`.

---

## 1. Purpose

Provide one durable, canonical record of the nine Stage 0 decision areas (O01–O09), the frozen Stage 0 governance decisions, their current status, dependencies, and evidence references — so a future session can understand the current governance state without reconstructing it from conversation history.

---

## 2. How to Use This Register

- This register is the **primary continuity/handoff record** for Stage 0 governance.
- Detailed evidence lives in the referenced architecture/evidence documents; this register **summarizes and points** to that evidence.
- When a decision area is investigated, record it here before moving onward.
- When a decision is approved, record the approval here.
- When a decision is superseded, preserve the historical decision and mark the superseding state. **Do not delete historical decisions.**
- Do not convert a technical finding or a proposal into an approval.
- Do not silently reconcile contradictions; preserve the history and state the current status.

---

## 3. Status Definitions

| Status | Meaning |
|---|---|
| **OPEN** | Decision/investigation not yet resolved. |
| **INVESTIGATION COMPLETE** | Technical investigation completed; governance approval may still be pending. |
| **STRATEGY ALIGNED** | Operator/governance direction agreed; operational authorization and/or implementation approval remains. |
| **APPROVED** | Explicit governance approval exists. |
| **DEFERRED** | Deliberately postponed. |
| **SUPERSEDED** | Historical decision replaced by a later decision. |

A technical finding of feasibility is **not** an approval.

---

## 4. Stage 0 Governance Summary

| Decision | Subject | Current Status |
|---|---|---|
| O01 | Provenance Model | APPROVED (datum/proposal-level; evidence-linked) |
| O02 | Proposal Lifecycle | APPROVED |
| O03 | Source Storage / Access | INVESTIGATION COMPLETE (READY FOR GOVERNANCE RESOLUTION) |
| O04 | Proposed ↔ Authoritative | APPROVED |
| O05 | Human Approval | INVESTIGATION COMPLETE (READY FOR GOVERNANCE RESOLUTION) |
| O06 | Channel Scope | STRATEGY ALIGNED |
| O07 | AI Provider | CONDITIONALLY APPROVED / SELECTED — `deepseek-flash` (DeepSeek-V4.1-Flash) selected for Stage 0; synthetic bake-off PASS; residual provider-policy risk accepted (see O08) |
| O08 | AI Security / Data Handling | ACCEPTED WITH DEFERRED PROVIDER ASSURANCE (2026-10-07) — provider-independent controls approved; DeepSeek provider-policy items accepted as residual risk; reopen triggers defined |
| O09 | Vague-Request Convention | OPEN |

Stage 0 boundary: **stops at Info Complete**. Supplier Quotation / Customer Quotation / Trip / Phase 2–3 are OUT OF SCOPE.

---

## 5. O01 — Provenance Model

### Status
**APPROVED** (2026-10-07). Approved baseline: Stage 0 provenance must be **datum/proposal-level and evidence-linked**, preserving the four layers **Source Evidence → AI Interpretation/Proposal → Human Decision → Authoritative CRM Value**, and must answer: why the value exists, which source supported it, what AI proposed, what human decision was made (by whom/when), and what authoritative value resulted. Schema/design remains OPEN; a dedicated representation is technical direction subject to later design approval. Investigation history preserved below.

### Purpose
Define what Stage 0 must be able to **prove** about information flowing `Customer Source → Source Preservation → AI Interpretation/Extraction → AI Proposal → Human Review → Human Decision → Authoritative CRM Data`, so a human can later answer: *"Where did this authoritative CRM value come from, what did AI propose, what source evidence supported it, and what human decision made it authoritative?"*

### Current Findings — native provenance capability (`FACT`)

| Mechanism | What it can already preserve | Evidence |
|---|---|---|
| `Communication` | Body/medium, `reference_doctype`/`reference_name`, `timeline_links` (child `Communication Link`); own change history | `communication.json` (`track_changes=1`) |
| `Communication Link` | `link_doctype`/`link_name`/`link_title` — link a source to multiple records | `communication_link.json` |
| `WhatsApp Message` | `reference_doctype`/`reference_name`, `content_type`, `attach`, `message_id`, `conversation_id`, `reply_to_message_id` | `whatsapp_message.json`; `frappe_whatsapp/.../utils/webhook.py` |
| `File` | `attached_to_doctype`/`name`/`field`, `file_url`, `is_private`, **`content_hash`** (artifact identity/integrity) | `file.json` |
| `Comment` | `reference_doctype`/`reference_name`, `content`, `comment_by`, `published`; change history | `comment.json` (`track_changes=1`) |
| `Version` | `ref_doctype`/`docname`, `data` JSON = `changed`/`added`/`removed`/`row_changed` (field-level **old→new**, incl. child rows) | `version.py:102` (`get_diff`); `crm_deal.json` (`track_changes=1`) |
| `Activity Log` | `reference_doctype`/`name`, `timeline_doctype`/`name`, `user`, `full_name`, `ip_address`, `operation`, `status` | `activity_log.json` |
| `CRM Deal` | `track_changes=1`; `organization`/`contact`/`contacts`/`lead`; `communication_status` | `crm_deal.json` |
| `FCRM Note` | `reference_doctype`/`reference_docname`, `title`, `content`; change history | `fcrm_note.json` (`track_changes=1`) |
| FJK child tables | `istable=1` — changes surface on the parent Deal `Version` (no independent history) | FJK doctype JSONs |
| Timeline aggregator | merges versions, comments, communications, files, calls, notes, tasks | `crm/api/activities.py:23` |

Note: `CRM Organization` does not set `track_changes` (no `Version` history by default).

### Current Findings — provenance gaps (`FACT` + reasoning)

**Native audit/history capability ≠ AI proposal provenance.** Native mechanisms can show *who/when/what changed*, but cannot express:
1. a **non-authoritative AI proposal** (typed target datum + proposed value + confidence) distinct from authoritative truth;
2. a **per-datum disposition** (accept / edit+accept / reject / defer) with attribution, bound to a target datum;
3. a **link from a proposal to the resulting authoritative value** (`Version` records the effect but has no proposal/AI/source reference);
4. **per-datum source location/span** (which message/attachment/page/section);
5. **layer classification** (source evidence / AI interpretation / human decision / authoritative data);
6. an **isolation boundary** preventing direct AI writes to authoritative fields;
7. valid **Deal-authority provenance** — native `reference_*` is phone-derived and non-authoritative (STG0-R01 Conditional A).

### Current Governance Position — what provenance must achieve
Provenance is **mandatory** for every AI-derived value (FK-D18 §6). The model must preserve, distinctly and queryably: (A) **source** identity; (B) **source location**; (C) **extracted/proposed datum**; (D) the **AI interpretation event**; (E) the **human review decision**; (F) the **authoritative promotion** link. It must keep `source evidence ≠ AI interpretation ≠ human decision ≠ authoritative data`, and must never let native phone/similarity/`reference_*` establish human-confirmed Deal authority.

### Field-level vs record-level conclusion
Provenance **must exist at the datum/proposal level**, with each datum linked to its source and to the human decision that promoted it, and (on promotion) to the resulting authoritative value. **Record-level (per-Deal) provenance alone is insufficient**: different fields/child rows of one Deal may originate from different sources, different AI runs, and different human decisions. Native `Version` already provides field-level *old→new* but lacks the proposal/source/disposition link; this is the precise gap.

### Decisions / Constraints (already-approved only)
- Provenance mandatory per AI-derived value (FK-D18 §6).
- Human approval mandatory; AI confidence ≠ approval (FK-D18 §5).
- Reuse native sources; do **not** create a duplicate source store (native-first, FK-D12).
- AI interpretation is derived; it must **not** replace the original source evidence.
- AI cannot mark Info Complete; native `reference_*` is not Deal-authority evidence (FK-D18 §4.2/§7; STG0-R01).
- Original AI proposal and human-approved value must both be preserved (no silent replacement).
- Proposal/run history is append-only; the latest AI result is not the only result.

### Dependencies
O02 (proposal lifecycle), O03 (source storage/access), O04 (proposed↔authoritative), O05 (human approval), O07 (provider identity), O08 (security/retention), O09 (vague-request).

### Evidence References
- Technical Design §13 (provenance), §13.2 (native shortfall), §20 (native-vs-new), §21 (required structures), §26A/§26B (STG0-R01)
- Implementation Plan M1, §H
- Decisions STG0-O01, STG0-P01
- Verification Plan V03, V21–V23, V25, V43 (plus new V63–V72, §3A)
- Repository: `communication.json`, `communication_link.json`, `whatsapp_message.json`, `file.json`, `comment.json`, `version.py:102`, `activity_log.json`, `crm_deal.json`, `fcrm_note.json`, `crm/api/activities.py:23`, `crm/utils/__init__.py:256/260`

### Open Items
Final provenance representation (dedicated DocType vs child table); whether candidate-resolution and value proposals share one structure; exact field names/schema (later design); source-span precision per channel; retention interplay with O08. **No schema decided.**

### Last Updated
2026-10-07

---

## 6. O02 — Proposal Lifecycle

### Status
**APPROVED** (2026-10-07). Approved lifecycle: 5 proposal states + explicit `SUPERSEDED`; separate run/processing states; `ACCEPTED ≠ authoritative` with explicit promotion; append-only history; explicit supersession; per-datum dispositions; no auto-overwrite; separate Deal-resolution disposition; immutable historical facts. Schema/state-machine implementation remains OPEN, not designed. Investigation history preserved below.

### Purpose
Define the states, transitions, history, and boundaries so an AI proposal can move from generation through human review to either authoritative promotion or non-authoritative closure **without losing provenance and without AI output ever becoming authoritative by itself**.

### Current Findings

**Required proposal states (datum/proposal level):** `PROPOSED` (generated, non-authoritative, pending review) → `ACCEPTED` | `EDITED_ACCEPTED` | `REJECTED` | `DEFERRED`. `REJECTED` is terminal (retained; no promotion). `DEFERRED` is non-terminal/pending. `ACCEPTED`/`EDITED_ACCEPTED` are promotion-eligible but **not** themselves authoritative. `SUPERSEDED` is a required **closure reason/link** (a later proposal/source replaced this one) distinct from `REJECTED`.

**Separate concepts (not proposal states):** processing/run states (`SUCCEEDED`/`FAILED`/`TIMEOUT`/`INVALID_OUTPUT`/`UNSUPPORTED_SOURCE`/`SOURCE_UNAVAILABLE`/`DUPLICATE`) belong to the AI run, not the proposal; FJK Information Status (`KNOWN`/`MISSING`/`TO CONFIRM`/`CUSTOMER-CONFIRMED`/`NOT APPLICABLE`) is separate and must not be conflated with proposal lifecycle.

**Transitions (`FACT` + governance):**
- `PROPOSED → ACCEPTED | EDITED_ACCEPTED | REJECTED | DEFERRED`
- `DEFERRED → ACCEPTED | EDITED_ACCEPTED | REJECTED | SUPERSEDED`
- `REJECTED` terminal for that proposal; **reprocessing creates a NEW proposal** (never revives the rejected one)
- `ACCEPTED`/`EDITED_ACCEPTED → (promotion)` — promotion is a distinct event (below)
- historical facts (original value, source, run, model, timestamp) are **immutable**; human actions are appended as **events**, not rewrites (append-only), consistent with approved O01.

**Accepted vs authoritative (critical):** `ACCEPTED` **≠** authoritative. Human acceptance makes a proposal **eligible** for promotion; **promotion** is a separate, recorded event performed after acceptance (and after any Deal-confirmation/conflict gating). AI never promotes. Acceptance and promotion may be **one user gesture** but must remain **two recorded steps** for provenance.

**Edited proposals:** `EDITED_ACCEPTED` must preserve the **original AI proposal value**, the **human-edited value**, reviewer, timestamp, final disposition, and the resulting authoritative value. Distinguishable from plain `ACCEPTED`; whether modeled as a state or as a disposition with metadata is a later design choice — governance requires both values retained and the outcome distinguishable.

**Rejection:** terminates that proposal; retained permanently; creates no authoritative value; a rejected proposal can never later become authoritative. Reasons (wrong / unsupported by source / customer not confirmed / deliberately unused) are **useful-optional**; a reason is recommended but not strictly required.

**Deferral:** non-terminal/pending (insufficient info, ambiguity, needs customer confirmation, needs investigation, postponed). Remains visible, does not count toward Info Complete, and can later be accepted/edited/rejected/superseded.

**Reprocessing:** append-only — `S1 → R1 → P1 (REJECTED)` then `S1 → R2 → P2`; P1 remains permanently visible; P2 is a new proposal/run. Supersession of P1 by P2 must be **explicit**, never implied by recency. A new run may use human corrections from earlier runs as input, but must not rewrite earlier proposals. Lifecycle must distinguish **reprocessing** (new proposal) from **editing** (same proposal, human-edited value).

**Multiple proposals / same datum:** multiple competing proposals (e.g. `Kyoto` vs `Osaka`) may coexist, each with independent provenance and independent review. The human selects one; the others must be closed by an **explicit** recorded action (reject or supersede) — not silently. Only **one promotable accepted value per target datum** may exist at a time.

**Partial acceptance:** lifecycle operates at **both** run/proposal level and **datum level**; a run yields multiple datum proposals, each with its own disposition; run-level status is derived. Consistent with approved O01 datum/proposal-level requirement.

**Authoritative conflict/overwrite:** an existing authoritative value plus a new proposal for the same datum ⇒ proposal becomes **pending review**; **no automatic overwrite**; explicit human decision required; promotion records the prior value (native `Version` already does).

**Customer-confirmation interaction:** `human accepted` and `customer-confirmed` are **distinct**. Proposal lifecycle governs the human disposition; `CUSTOMER-CONFIRMED` remains an Information Status value. A human-accepted value may still await customer confirmation.

**Deal-resolution interaction:** AI may propose existing Deal / new Deal / amendment, but Deal resolution requires its **own separate human disposition** and gates promotion of Deal context; it differs from ordinary field proposals because it establishes the container (FK-D10; STG0-R01). Until confirmed, a Deal candidate is non-authoritative and cannot serve as authority/provenance; AI cannot confirm.

**Failure states:** provider failure, malformed response, invalid structured output, source unavailable, unsupported source, incomplete extraction, duplicate processing, timeout, security-validation failure are **run/processing states**, separate from proposal states. A failed run may produce no proposal or a flagged one; duplicates are handled by dedupe/append-only; these must not be collapsed into proposal states.

**Supersession/cancellation:** distinguish `REJECTED` (human declined this proposal), `SUPERSEDED` (replaced by newer proposal/source), `CANCELLED` (withdrawn before/without disposition — optional), `DEFERRED` (pending), and "obsolete due to newer customer information" (a form of supersession). Old information must not be treated as current.

**Immutability/auditability:** immutable after creation: original proposed value + target, source identity, run/processing identity, provider/model identity, initial timestamp. Minimum history to reconstruct both the single-accept and reject→reprocess→accept scenarios: source ref + run id + proposal id + ordered disposition events (reviewer/timestamp/original/edited/reason) + promotion events (authoritative target/value/actor/timestamp) + supersession links.

**Native lifecycle capability (`FACT`):**
- `Version` — field-level old→new on `track_changes` doctypes (authoritative change history); no proposal/AI/source/disposition semantics.
- `Comment` — free-text with author/time; no typed state.
- `Activity Log` / `CRM Status Change Log` (child; `from`/`to`/dates/`log_owner`) — append-only transition-log **patterns**, but tied to CRM Deal/Lead status, not per-datum proposal lifecycle.
- Frappe `Workflow` — native **single-document** state machine (`workflow_state_field`); could model one record's status but not per-datum proposals with source/run linkage and disposition provenance.
- FJK Information Status vocabulary — separate concept.
- **Technical direction (PROPOSAL):** native mechanisms are insufficient to represent the full per-datum proposal lifecycle with append-only history and provenance links; a dedicated representation appears necessary — **subject to later design approval.** No schema decided.

### Current Governance Position
Human approval mandatory; acceptance required before any authoritative write; AI never promotes; proposals are non-authoritative; disposition is attributable + timestamped; edits preserve the original; reprocessing preserves prior proposals; native `reference_*` cannot establish human-confirmed Deal authority.

### Required / Optional / Not Required

**REQUIRED:** five proposal states (`PROPOSED`/`ACCEPTED`/`EDITED_ACCEPTED`/`REJECTED`/`DEFERRED`); separate run/processing states; attributable+timestamped disposition events; original + edited value preserved; `ACCEPTED ≠ authoritative` with an explicit promotion event (AI never promotes); append-only history with rejected/deferred retained; reprocessing = new proposal; explicit supersession; per-datum dispositions within a run; no automatic overwrite (explicit human decision); separate Deal-resolution disposition; immutable original AI proposal/source/run/model/timestamp; `human-accepted` vs `customer-confirmed` distinction.

**USEFUL / OPTIONAL:** rejection/deferral reason and review comments; a distinct `SELECTED` state (vs accept-one/close-others); `CANCELLED` state; explicit conflict-state marker; derived run-level "partially reviewed" status; explicit proposal-dependency handling (only if later evidenced).

**NOT REQUIRED:** full prompt text / token-level retention; multi-level approval chains beyond the disposition; proposal dependency graph; time-boxed automatic expiry of deferred proposals; a separate `OBSOLETE` state (subsumed by `SUPERSEDED`).

### Decisions / Constraints
Frozen only: FK-D18 (AI propose-only; human approval; AI cannot mark Info Complete); FK-D10/STG0-R01 (Deal authority human-confirmed); approved O01 (datum/proposal-level, evidence-linked, append-only, four layers).

### Dependencies
O01 (approved), O04 (proposed↔authoritative), O05 (approval), O07 (provider/run identity), O08 (security/failure), O09 (vague requests), O06 (channels).

### Evidence References
- Technical Design §9 (proposal model), §23 (state transitions), §16 (failure/ambiguity), §13.3 (O01)
- Implementation Plan M2
- Decisions STG0-O02, STG0-P02; §3F
- Verification Plan V04–V06, V25, and new V74–V89
- Repository: `version.py:102`, `comment.json`, `activity_log.json`, `crm_status_change_log.json`, `frappe/workflow/doctype/workflow`, FJK doctype status options

### Open Items
Exact state-machine/fields; `EDITED_ACCEPTED` as state vs disposition+metadata; `SELECTED`/`CANCELLED`/conflict-marker inclusion; acceptance-vs-promotion gesture; dependency handling; run-state vocabulary. **No schema decided.**

### Last Updated
2026-10-07

---

## 7. O03 — Source Storage / Access

### Status
**INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION.** Native source storage confirmed reusable; immutability/retention and reviewer-access caveats recorded. Not APPROVED.

### Purpose
Define where and how original customer source evidence is stored and accessed so the approved O01 provenance chain (`authoritative value → human decision → AI proposal → source reference → original evidence`) remains reliable.

### Current Findings — native source storage (`FACT`)

| Mechanism | What it preserves | Evidence |
|---|---|---|
| `Communication` | `communication_medium`, `content` (Text Editor), `reference_doctype`/`reference_name`, `message_id`, `uid`, `sent_or_received`, `communication_date`, `timeline_links` (child `Communication Link`); `track_changes=1`; not submittable; permission-checked | `communication.json`; `communication.py:525` |
| `Communication Link` | `link_doctype`/`link_name`/`link_title`/`communication_date` — link a source to multiple records | `communication_link.json` |
| `File` | `file_name`, `is_private`, `file_size`, `file_url`, **`content_hash`**, `attached_to_doctype`/`name`/`field`, `file_type`; `track_changes=1` | `file.json` |
| `WhatsApp Message` | `reference_doctype`/`reference_name`, `content_type`, `attach`, `message_id`, `conversation_id`, `reply_to_message_id` | `whatsapp_message.json` |
| `FCRM Note` | `reference_doctype`/`reference_docname`, `title`, `content`; `track_changes=1` | `fcrm_note.json` |
| `CRM Deal`/`Organization`/`Contact` | CRM context masters | `crm_deal.json` etc. |

`File` behavior (`FACT`): `content_hash` computed on save; dedup by `(content_hash, is_private)` (`file_manager.save_file`); `create_attachment_copy` reuses `file_url`; `on_trash` → `_delete_file_on_disk` deletes the binary unless another `File` shares the `content_hash`.

### Source identity
Required: native doctype + record name; `content_hash` when file-backed. Useful: timestamp, origin identity, attachment identity, message identity.

### Source immutability findings
`File` binaries are not replaced in place by ordinary editing, but `File` records can be **renamed** (`after_rename`) and **deleted** (`on_trash`), and binaries may be **deduped/shared**; `Communication.content` is editable; `Version` tracks metadata, not guaranteed binary content. Therefore provenance must capture the **exact source identity (`name` + `content_hash`) at AI-processing time** and treat it as immutable (O01 immutable historical facts). This is the key immutability requirement.

### Content-hash / evidence identity
`File.content_hash` exists, is stable, identifies binary content (dedup key), and is usable as evidence identity for file-backed sources. Non-file sources (`Communication` body) have no binary hash → use the native record identity (+ `Version` for edits).

### Source-location / span
Native provides **whole-artifact** only (whole body / file / message). Sentence/page/section/image-region is **not** native and must be captured by interpretation if needed (useful/optional, channel-dependent).

### Original-evidence access
`File` and `Communication` are permission-checked (`file.py:927`, `communication.py:525`). A reviewer may lack read access to a source record; provenance must point to a source the reviewer can open. **Reviewer-access gap → OPEN** (no permissions changed here).

### Deal / Company / Contact relationship
Sources exist independently; `reference_*` is optional, so preservation does **not** depend on an inferred CRM relationship. `reference_*` is **communication context**, not human-confirmed Deal authority (STG0-R01); human resolution is recorded separately.

### Duplicate sources
Same binary may be one deduped `File` or a shared-`file_url` copy; the same email may be referenced in multiple contexts. Source identity (`name` + `content_hash`) distinguishes reprocessing from duplicate upload.

### Deletion / retention
Deleting/renaming a referenced source can break the chain. Retention policy is **OPEN** (no legal-retention assumption). Requirement: source deletion must be **controlled** or at least **detectable** via the captured `content_hash`.

### Compound sources
A parent `Communication` may hold multiple `File` attachments. Conceptual hierarchy: parent communication → specific attachment `File` → extracted datum. Provenance must be able to reference the specific attachment; native supports this (multiple `File`s with `attached_to_doctype`/`name`). No schema decided.

### Source versioning
Record the exact evidence version used by AI (`name` + `content_hash` at processing time); a re-upload/replacement is a new identity; consistent with O01 immutable facts.

### Cross-channel
Common contract across email / manual capture / future Telegram / deferred WhatsApp, with channel-specific metadata: email (`message_id`, threading); manual (`File` filename/uploader/`content_hash`); Telegram (future: chat/sender/message ids); WhatsApp (`message_id`/`conversation_id`).

### Minimum common source contract (conceptual)
**Required:** source channel; native source reference (doctype + name); evidence identity (`content_hash` when file-backed); original timestamp; origin identity where available. **Useful/optional:** attachment identity; message identity; source location/span; thread/context. **Not required:** a unified source store; raw MIME/full-header retention; OCR/image-region structures.

### Native sufficiency conclusion
Native mechanisms are **sufficient** for source storage, identity, preservation, access (with permission caveat), and cross-channel representation. Gaps: guaranteed immutability/retention; native location/span; reviewer access under permissions. **No new source store is required** (the O01 gap is the proposal/provenance representation, not source storage).

### Required / Optional / Not Required
- **REQUIRED:** native source reference; `content_hash` for file-backed; original timestamp; channel; origin; capture-at-proposal-time identity (immutable); reviewer-accessible source.
- **USEFUL/OPTIONAL:** attachment-level reference in compound sources; message identity; source span; thread/context.
- **NOT REQUIRED:** unified source store; raw MIME/full-header retention; OCR/image-region structures; per-source multi-version retention.

### Current Governance Position
Native source preservation preferred; do not create a second source store; originals are authoritative evidence and are never replaced by derived text.

### Decisions / Constraints
Frozen only: FK-D12 (native-first); FK-D18 (provenance); O01 (approved immutable evidence-linked provenance); O02 (append-only, immutable facts); STG0-R01.

### Dependencies
O01 (approved), O02 (approved), O06 (channels), O08 (security/retention), O09.

### Evidence References
- Technical Design §5, §7, §7.1, §18.1
- Implementation Plan M3
- Decisions STG0-O03, STG0-P03; §3G
- Verification Plan V01, V49, V54, and new V91–V105
- Repository: `file.json`; `file.py:195,557,927`; `file_manager.py:148,192`; `communication.json`; `communication_link.json`; `whatsapp_message.json`; `fcrm_note.json`

### Open Items
Immutability/retention control (delete/rename protection) — OPEN; reviewer access-to-source under permissions — OPEN; source-span capture per channel — later design; whether compound-source attachment references are required. **No schema decided.**

### Last Updated
2026-10-07

---

## 8. O04 — Proposed ↔ Authoritative Relationship

### Status
**APPROVED** (2026-10-07). Approved: relationship semantics + 15 invariants (explicit/attributable/non-destructive/bidirectional/idempotent promotion; accept ≠ promotion; Deal resolution separate; confirmation/Information Status separate; correction additive). Schema/promotion implementation remains OPEN, not designed. Investigation history preserved below.

### Purpose
Define how an AI proposal relates to the authoritative CRM value so promotion is **explicit, traceable, non-destructive, attributable, understandable, and never automatic** — preserving `AI proposal → human disposition → explicit promotion → authoritative CRM value`.

### Authoritative targets (`FACT`)
- Deal-level shared context fields on `CRM Deal`: `fjk_request_nature`, `fjk_commercial_intent`, `fjk_destination_route`, `fjk_timeframe`, `fjk_exact_dates`, `fjk_duration`, `fjk_total_pax`, `fjk_adults`, `fjk_children`, `fjk_infants`, `fjk_trip_purpose`, `fjk_other_shared_context`, `fjk_ready_for_quotation`, `fjk_info_complete`.
- Child tables on `CRM Deal`: `fjk_components`, `fjk_requirement_lines`, `fjk_guide_requirements`, `fjk_activity_items`, `fjk_transport_allocations`, `fjk_accommodation_allocations`.
- Native masters: `CRM Deal`, `CRM Organization`, `Contact`.
- The FJK app exposes **no write API** for requirement/allocation rows (only quotation APIs + `set_info_complete`); those structures are edited via Desk/native CRM form. There is no existing programmatic promotion path.

### Current Findings — native capability (`FACT`)
- **Target identification (existing):** a reference can be expressed as doctype + record name + fieldname string; child rows receive a framework-generated hash `name` (`naming.set_new_name` → `make_autoname("hash")`), so existing child rows are identifiable by `name`. No native field type models "a field of a record" (Dynamic Link points to a record only).
- **New target (not-yet-created):** Company/Contact/Deal/requirement row/allocation row have no identity before creation; native cannot express a proposal → non-existent-value relationship.
- **Existing authoritative value / history:** `CRM Deal` `track_changes=1`; `Version.data` records `changed` (field old→new) and `row_changed` (`table_fieldname`, `row_name`, `row_index`, child old→new). Prior authoritative values are reconstructable.
- **Accept/edit/reject/defer/supersede:** no native per-datum human-disposition event bound to a target datum. `Comment` can carry free text with `comment_by`/`published`; `Version` records the effect; neither produces a typed disposition.
- **Accept ≠ promotion:** native can prove "authoritative value changed" (`Version`) and record free-text comments, but cannot bind "this acceptance" to "this promotion" at datum level or distinguish approver vs editor.
- **Deal resolution:** native `reference_*`/phone heuristic exists but is explicitly **non-authoritative** (STG0-R01); no native field records the human Deal-resolution decision distinctly from the technical link.
- **Customer confirmation separation:** preserved by design — FJK Information Status vocabulary + `fjk_ready_for_quotation`/`fjk_info_complete` are separate native fields from any proposal state.
- **Duplicate/partial promotion:** no native idempotency; appending child rows twice would duplicate; partial promotion has no native audit boundary.

### Required relationship semantics
1. A proposal must identify its **target** as: target doctype + target record (or explicit "new") + target field/child table + a **logical datum identity** (stable within the proposal for not-yet-created rows).
2. Promotion must be **explicit and separately recorded** from acceptance, **attributable** (who/when), **non-destructive** (prior value retained), and **bidirectional** (proposal → resulting authoritative value; authoritative value → originating proposal/decision).
3. Promotion must be **idempotent** (no duplicate rows/masters) and have defined **partial-failure** semantics (what promoted, what didn't survives audit).
4. **Correction** is additive: a later change is a new event; history is never deleted or rewritten.
5. **Deal resolution** is a separate human decision object, independent of `reference_*`/similarity/recency.
6. Proposal state, customer confirmation, and Information Status remain distinct.

### Native capability matrix

| Requirement | Native capability | Sufficient? | Evidence | Gap |
|---|---|---|---|---|
| Target identification (existing) | doctype+name+fieldname strings; child row `name` | Partial | `naming.py:136`; FJK child doctypes | No first-class "field target" model |
| New target | none | No | — | no identity before creation |
| Existing authoritative value | `Version` old→new | Yes (history) | `version.py:102` | no proposal linkage |
| Accept | free-text `Comment` | Partial | `comment.json` | no typed disposition bound to datum |
| Edit + accept | `Version` (effect) + `Comment` | Partial | `version.py` | original AI value not represented natively |
| Reject | none | No | — | no proposal/rejection record |
| Defer | none | No | — | no proposal record |
| Supersede | none | No | — | no proposal record |
| Competing proposals | none | No | — | no proposal record |
| Reprocessing | none | No | — | no run/proposal history |
| Stale proposal | `Version` + timestamps (reconstructable) | Partial | `version.py` | no proposal-time authoritative snapshot link |
| Child rows | framework `name`; `row_changed` history | Partial | `version.py; naming.py` | new-row identity |
| Deal resolution | `reference_*` (non-authoritative) | No | STG0-R01 | no human-resolution record |
| Promotion attribution | `Version.owner`/`modified_by` | Partial | `version.json` | editor ≠ approver; not proposal-bound |
| Promotion history | `Version` old→new | Yes (effect) | `version.py` | no cause/proposal link |
| Correction/reversal | `Version` new change | Partial | `version.py` | no rationale/proposal link |
| Duplicate promotion | none | No | — | no idempotency |
| Customer-confirmation separation | FJK Information Status fields | Yes | FJK doctypes | — |

### Required invariants
1. AI proposal is never authoritative by itself.
2. Human acceptance is attributable.
3. Authoritative promotion is attributable (who/when).
4. Original AI proposal remains immutable.
5. Human edits do not erase original AI output.
6. Previous authoritative value remains reconstructable.
7. Rejected proposals cannot silently become authoritative.
8. Reprocessing does not overwrite historical proposals.
9. Competing proposals remain independently traceable.
10. Deal resolution remains a separate human decision.
11. Customer confirmation remains separate from AI acceptance.
12. Information Status remains separate from proposal state.
13. Native communication context is not treated as human Deal authority (STG0-R01).
14. Promotion is idempotent; partial promotion is auditable.
15. Correction is additive; history is never deleted.

### Edge-case findings
- **Value changed before review (stale):** `Version` allows detecting that the authoritative value changed, but nothing links the proposal to the pre-review value; stale-conflict handling is a required semantic, unresolved mechanism.
- **Multiple proposals:** no native representation; all must remain independently traceable; no recency-based winner.
- **Reprocessing:** append-only required (O02); native has no proposal/run history.
- **Child-row creation:** existing rows identifiable by hash `name`; new rows not pre-identifiable → logical datum key required.
- **Deal ambiguity:** human resolution must be recorded; native `reference_*` must not serve as authority.
- **Failed/partial promotion:** audit must record which targets promoted and which did not.
- **Duplicate promotion:** idempotency invariant required.
- **Later correction:** additive new event; history retained.

### Gap classification
- **Native sufficient:** Information-Status separation; prior-authoritative-value reconstruction; authoritative change history.
- **Native partially sufficient:** target identification (existing rows); stale detection; promotion attribution.
- **Native insufficient:** proposal entity (target datum/value/confidence); typed per-datum human disposition (accept/edit/reject/defer); accept-vs-promotion distinct at datum level; reject/defer/supersede records; competing proposals; reprocessing history; proposal→authoritative link; Deal-resolution decision record; idempotent promotion; new-target identity.
- **Governance decision required:** promotion atomicity/partial-failure semantics; idempotency rule; stale/conflict policy; Deal-resolution recording; confirmation separation enforcement.
- **Implementation design required later:** the dedicated representation, promotion action, and review UI.

### Current Governance Position
AI has no authoritative write authority; promotion requires a recorded human disposition; acceptance and promotion are logically distinct; no parallel "AI data model"; promotion reuses the existing authoritative structures.

### Decisions / Constraints
Frozen only: FK-D18 (AI propose-only; human decision; AI cannot set Info Complete); FK-D10/STG0-R01 (Deal authority human-confirmed); approved O01 (datum/proposal-level evidence-linked provenance); approved O02 (lifecycle).

### Dependencies
O01 (approved), O02 (approved), O03 (source), O05 (approval), O07 (provider), O08 (security), O09 (vague requests).

### Evidence References
- Technical Design §14, §22, §23.1, §24
- Implementation Plan M4
- Decisions STG0-O04, STG0-P04; §3H
- Verification Plan V02, V11, V12, V19, V23, V26, and new V106–V120
- Repository: `version.py:102`; `naming.py:136`; FJK child doctype JSONs (istable, hash names); `feeljapank_crm/api.py` (no requirement/allocation write API); `crm_deal.json`; `fixtures/custom_field.json`

### Open Items
Promotion atomicity/partial-failure semantics; idempotency mechanism; stale/conflict policy; Deal-resolution recording; exact proposal→value link representation; logical datum key for new rows. **No schema decided.**

### Last Updated
2026-10-07

---

## 9. O05 — Human Approval

### Status
**INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION.** Approval semantics/requirements established; UX and schema remain OPEN. Not APPROVED.

### Purpose
Define what the human approval mechanism must **mean and guarantee** so an AI proposal can safely become eligible for authoritative CRM promotion — distinguishing `AI Proposal → Human Review → Human Disposition → Promotion Eligibility → Authoritative CRM Value` without collapsing the stages.

### Current Findings — actor / authority (`FACT`)
- Roles in use: `System Manager`, `Sales Manager`, `Sales User`, `CRM Manager`.
- `CRM Deal` authorization via org-hierarchy `has_permission`/`permission_query_conditions` (`crm/hooks.py:135–146`).
- FJK mirrors Deal permission (`feeljapank_crm/permissions.py`; `_require_deal_access(deal, ptype)`); no second permission model. Child tables inherit parent Deal access.
- Existing attributable human-action patterns: `set_info_complete` (requires Deal `write`; audit via `Version`) and quotation `confirm_version` (requires write; append-only; records `confirmed_on`/`source`/`evidence`; sets `status="Confirmed"`).
- No `Workflow` configured. Actor identity available: `Version.owner/modified_by`, `Comment.comment_by/published`, timestamps.

### Semantic model
`AI Proposal → Human Review (read-only until explicit action) → Human Disposition (attributable) → Promotion Eligibility → Explicit Promotion (attributable) → Authoritative CRM Value`. **Review ≠ disposition; disposition ≠ promotion.** Viewing/opening/navigating implies nothing. Authentication uses the existing Frappe user identity (sufficient to establish the approving actor).

### Granularity
**Datum-level** (O01/O02). Run-level status is derived only; it cannot override datum dispositions. Partial approval permitted.

### Dispositions
`ACCEPT`, `EDITED_ACCEPTED` (original AI value + edited value retained), `REJECTED` (terminal; cannot later promote), `DEFERRED` (non-terminal; not promotion-eligible), `SUPERSEDED` (explicit). Reasons: rejection/deferral/Deal-resolution/conflict = USEFUL; edit reason/approval comment = OPTIONAL.

### Accept vs promotion
Acceptance makes a proposal **promotion-eligible**; promotion is a **separate attributable event**; one gesture may perform both but must record both facts. Acceptance survives promotion failure; partial promotion is auditable; stale accepted proposals must not silently overwrite newer authoritative values.

### Existing vs new target
Existing CRM datum: human approves a change from the current value (prior value retained via `Version`). New target (new Company/Contact/Deal/requirement line/component/guide/activity/allocation row): human approves creation; no authoritative row exists yet, so approval targets a logical datum identity (O04 implementation concern).

### Deal resolution / confirmation separation
Deal resolution is a separate human decision (existing Deal / amendment / new Deal / unresolved); phone/email/AI similarity/`reference_*` never counts as approval (STG0-R01). Operator acceptance ≠ customer confirmation ≠ `Info Complete` ≠ Ready for Quotation (FJK Information Status preserved; `fjk_ready_for_quotation`/`fjk_info_complete` unchanged).

### Native capability
- **Sufficient:** authorized-operator identification (roles + Deal org-hierarchy + FJK mirroring); actor+timestamp for a document-level human action (Version/Comment; `set_info_complete`/`confirm_version` patterns).
- **Insufficient:** datum-level proposal/disposition entity; accept-vs-promotion at datum level; partial-approval rollup; reject/defer/supersede records; competing proposals; stale/conflict binding; human Deal-resolution record; idempotent/partial-safe promotion.
- Native `Workflow` is a **single-document** state machine; it cannot represent datum-level AI proposals with source/run linkage and dispositions.

### Required invariants (O05)
No approval by viewing/opening/navigating; AI cannot approve or promote itself; confidence ≠ approval; acceptance attributable (user+timestamp); promotion attributable and distinct; rejected cannot later promote; deferred cannot be treated as approved; stale accepted proposals cannot silently overwrite newer values; duplicate approval/promotion idempotent; partial promotion auditable; native `reference_*` never counts as Deal approval; acceptance ≠ customer confirmation ≠ Info Complete ≠ Ready for Quotation.

### Current Governance Position
Human approval mandatory (FK-D18 §5); every disposition attributable; AI confidence/context is not approval; approval and promotion are logically distinct (O04).

### Decisions / Constraints
Frozen only: FK-D18; FK-D10/STG0-R01; approved O01/O02/O04.

### Dependencies
O01, O02, O03, O04, O06 (channels/Telegram notification boundary — notifications cannot replace approval), O07, O08, O09.

### Evidence References
- Technical Design §12, §12.1, §24
- Implementation Plan M5
- Decisions STG0-O05, STG0-P05; §3I
- Verification Plan V04–V07, V38, V39, V45, and new V121–V140
- Repository: `feeljapank_crm/permissions.py`; `feeljapank_crm/hooks.py`; `feeljapank_crm/api.py` (`_require_deal_access`, `set_info_complete`, `confirm_version`); `crm/hooks.py:135–146`; `crm.permissions.org_hierarchy`

### Open Items
Authorized-approver role set/capability; whether one gesture may accept+promote (recording both); partial-approval promotion policy; stale/conflict handling (block/warn/re-review); Deal-resolution recording + gate; reason requirements; concurrency/single-promotable-value enforcement; UX and schema. **No schema decided.**

### Last Updated
2026-10-07

---

## 10. O06 — Channel Scope

### Status
**STRATEGY ALIGNED + TELEGRAM IMPLEMENTATION AUTHORIZED** — operator/governance direction agreed; **Telegram implementation is AUTHORIZED** by explicit operator instruction (2026-10-08), revoking the prior "not authorized / pending" state; **operational authorization** for inbound-email enablement remains pending. The internal-only designation, transport-only role, the "notifications ≠ approval" rule, and the Telegram-metadata authority boundary are unchanged. The O08-class security/data-handling determination and approach selection remain required for the Telegram build.

### Purpose
Define which communication channels Stage 0 ingests, how sources are preserved, and which channels are deferred or internal-only.

### Current Findings
Read-only repository/runtime investigation (live `crm-frappe-1` container; counts/booleans only; no secrets printed) established:

- Installed apps: `frappe, crm, frappe_whatsapp, ark_whatsapp_guard, feeljapank_crm`.
- **Inbound email capability is native:** Frappe `Communication`; `Email Account` inbound fields (`enable_incoming`, `use_imap`, `email_server`, `use_ssl`, `default_incoming`, `auth_method`); native scheduler `frappe.email.doctype.email_account.email_account.pull` (`apps/frappe/frappe/hooks.py:230`) → `EmailAccount.receive()` (`email_account.py:554`) → creates `Communication`; attachments stored as native `File`; CRM hooks present (`crm/hooks.py`; `crm/utils/__init__.py:256/260`).
- **Runtime email state:** one Gmail `Email Account` "FeelJapanK CRM", `use_imap=1`, `use_ssl=1`, `email_server=imap.gmail.com`, `auth_method=Basic`, `enable_outgoing=1`, `default_outgoing=1`, **`enable_incoming=0`**, `default_incoming=0`. `enable_scheduler=1`; Procfile runs `bench schedule` + `worker`. `Communication` count = 0. No code change is required for basic inbound `Communication` creation.
- **WhatsApp runtime:** 0 `WhatsApp Account`, defaults null, 0 `WhatsApp Message` (live inbound unconfigured).
- **Telephony runtime:** 0 `CRM Telephony Agent`, 0 `CRM Call Log` (unconfigured).
- **Telegram runtime:** none installed/configured (no app, DocType, hook, job, credential, or bot).
- `CRM Deal` count = 21; `File` count = 2 (both unattached).

Important interpretation:

> **Email infrastructure is operational. Inbound customer-email reception is currently disabled/configuration-pending. This is NOT an architectural deferral of email.**

Known prerequisites for future inbound-email enablement (investigated but **NOT executed**): enable inbound on the existing Email Account; configure appropriate Gmail authentication/credentials; retain existing IMAP/SSL/server settings; keep scheduler/worker operational; then verify (a) inbound email creates `Communication`, (b) attachments become `File`, (c) sender/subject/body/threading, (d) CRM association and permissions, (e) duplicate handling.

### Current Governance Position

**CORE STAGE 0 INPUTS**

1. **Inbound email** — a **first-class intended customer-data input**; native capability; current inbound runtime configuration disabled; enablement requires separate operational authorization. **Not** a "deferred" channel.
2. **Manual source capture** — the **immediate Stage 0 baseline**: operator upload/preservation of screenshots, images, PDFs, documents, and other supported artifacts; especially for WhatsApp-originated communication while live WhatsApp inbound is deferred. The preserved source remains independent of AI interpretation.

**DEFERRED**

3. **Live WhatsApp inbound** — explicitly deferred (native capability exists; runtime unconfigured; setup effort intentionally postponed; manual capture provides the immediate baseline). WhatsApp capability is **not** rejected permanently. STG0-R01 remains unchanged: native phone-derived WhatsApp/telephony references are provisional communication context only and never constitute human-confirmed Deal authority.

**INTERNAL-ONLY CANDIDATE**

4. **Telegram** — internal-only operator/system communication and intake; **NOT** a customer communication channel; **IMPLEMENTATION AUTHORIZED (2026-10-08, operator instruction)**. Planned roles: `Operator → CRM/System` (screenshots/images/PDFs/documents/attachments/operator context) and `CRM/System → Operator` (new source received, AI proposal ready, review/approval request, ambiguity, processing failure, operational notification). Telegram metadata must **NOT** establish authoritative Company/Contact/Deal, amendment/new-request, requirements, customer confirmation, or Info Complete — Telegram is an internal transport/control surface, not the authoritative CRM record. Data-handling/security remains an O08-class dependency and must be satisfied by the Telegram build; the implementation approach is selected in the Telegram build PLAN (**none selected yet**).

### Telegram Implementation Authorization (2026-10-08)
- **Decision:** the operator **revokes the prior "Telegram build pending / not authorized" state** and **authorizes the Telegram implementation**.
- **Scope preserved (unchanged):** internal-only (not a customer channel); transport/control surface only; notifications **cannot** replace D12-E human approval; Telegram metadata never establishes authoritative CRM values (FK-D10/FK-D12/FK-D18/STG0-R01).
- **Still required before/within the build:** (a) implementation approach selection (community Frappe Telegram app vs Bot-API integration [webhook/long-polling] vs generic webhook); (b) **O08-class** security/data-handling determination (third-party processor, bot-token secrecy, chat/sender identifiers, retention); (c) source-preservation mapping to native `File`/`Communication` with channel metadata; (d) a scoped BUILD PLAN under the FK-D12 high-risk gate.
- **Not authorized by this decision:** any Telegram code/config/credentials/webhook as part of *this* documentation step; customer-data processing via Telegram before the O08-class determination; using Telegram metadata for Deal/Company/Contact/confirmation/Information-Status authority.

### Decisions / Constraints
- Only explicitly authorized channels may be ingested; unconfigured channels must not be silently active.
- Native source preservation preferred.
- Telegram is transport only; authority stays in the Stage 0 human-review architecture.
- Telegram implementation is **AUTHORIZED** (2026-10-08, operator); notifications cannot replace D12-E approval; Telegram metadata never establishes authoritative CRM values.

### Dependencies
O01, O03, O05, O08 (see §14).

### Evidence References
- Technical Design §18.2 (channel-strategy alignment), §18.3 (Telegram internal-only), §18.1 (runtime channel evidence)
- Implementation Plan §3.2 (channel strategy), M6
- Decisions STG0-O06; §3C (O06/O08 findings); §3D (channel alignment + Telegram)
- Verification Plan V55–V62 (plus V49)
- Implementation Log 2026-10-07 O06/channel entries

### Open Items
Operational authorization to enable inbound email; Telegram implementation approach selection; O08-class security/data-handling determination for Telegram; per-channel access/retention details; the Telegram build PLAN (scope/approach/security).

### Last Updated
2026-10-08

---

## 11. O07 — AI Provider

### Status
**CONDITIONALLY APPROVED (2026-10-07)** — external hosted LLM API category suitable behind a provider-agnostic adapter; **no vendor selected or authorized**; customer-data processing conditional on O08.

### Purpose
Define the provider-agnostic requirements for the AI interpretation/extraction capability and assess provider categories against them.

### Current Findings
- **FACT:** No AI provider, credential, key, egress, code, or dependency exists anywhere in the repository/runtime. `feeljapank_crm` has no scheduler/queue/outbound HTTP.
- **FACT (vendor docs, 2026-10-07, time-sensitive):** OpenAI, Anthropic, and Google all document schema-constrained structured output; OpenAI and Anthropic document that API inputs/outputs are not used for training by default, with retention / zero-retention controls (OpenAI 30-day abuse logs + ZDR / Modified Abuse Monitoring on approval; Anthropic ZDR-eligible excluding covered models).
- **FACT (candidate, 2026-10-07):** intended candidate provider = DeepSeek **`deepseek-flash`** (product DeepSeek-V4.1-Flash; base `https://api.deepseek.com`). Provider-policy gate = **CONDITIONAL** (API-input training/retention/deletion/subprocessors/secondary-use not clearly established by first-party evidence). Synthetic bake-off = **EXECUTED (synthetic-only)** — 9/9 executed behavioral tests PASS (malformed-output boundary PARTIAL); injection ignored, Deal selection and Info-Status boundaries held. Overall classification: **B — CONDITIONAL PASS**; recommendation **Option 1 — select DeepSeek-Flash conditionally**; **no customer-data authorization** until provider-policy blockers resolved. Evidence: `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-DeepSeek-Flash-Provider-Verification-v0.1.md`.
- **GOVERNANCE DECISION (2026-10-07):** **DeepSeek-Flash SELECTED** for Stage 0 implementation. Residual provider-policy items accepted as **deferred assurance** (see §12.2); data-minimisation egress rule and AI authority boundary unchanged. Implementation still requires **FK-D12 PLAN → REVIEW → APPROVAL → BUILD → VERIFY**.
- **PROPOSAL (requirement set R1–R9):** typed extraction (destination, dates, pax count/composition, transport, accommodation, meals, activities/guide, special requirements, ambiguity, missing information); schema-constrained JSON output validated app-side; explicit-vs-inferred distinction and uncertainty; Japanese/English/mixed-language handling; distinguishable error taxonomy mapped to O02 run states; timeouts/retries/backoff with failure never yielding an authoritative write; provider/model/version/response metadata; provider-agnostic adapter with no vendor SDK in core logic and no silent fallback; HTTPS + key/token auth with redaction/minimisation hooks.

### Provider Category Assessment
- **A. External hosted LLM API (PROPOSAL — preferred category):** mature structured output, strong multilingual reach, no new infrastructure; requires O08 data-egress authorization; residual vendor lock-in mitigated by the adapter.
- **B. Self-hosted / local (PROPOSAL — viable alternative):** no egress; but adds infrastructure beyond the FK-D13 frozen baseline and requires its own FK-D12 review.
- **C. Hybrid / provider-routing:** adapter is required regardless; routing is optional and multiplies O08 evaluations.
- **INFERENCE:** no Stage-0-specific Japanese/mixed-language extraction test has been run; treat extraction quality as an OPEN empirical question.

### Current Governance Position
The hosted LLM API **category** is conditionally approved as technically/operationally suitable at Stage 0. No provider/model is selected, connected, or authorized for customer data. Vendor-dependent items are inputs to **O08**, not security approval. AI remains interpret/extract/propose only (FK-D18).

### Decisions / Constraints
- Do not couple Stage 0 to a specific provider; a provider-agnostic adapter is mandatory.
- No silent fallback that writes authoritative data.
- Provider selection and customer-data authorization remain conditional on O08.
- O07 produces inputs to O08 (residency, retention, training-use, zero-retention controls, subprocessors); it grants no security approval.

### Dependencies
O08 (security/data handling), O01 (provenance), O02 (run/reprocessing and error states).

### Evidence References
- Technical Design §19 (provider abstraction) and §19 O07 investigation findings
- Decisions STG0-O07, STG0-D16, STG0-P07
- Verification Plan V18, V27, V28, V51, V52, V141, V142

### Open Items
Vendor/model selection; Japanese/mixed-language extraction quality (synthetic bake-off); provider model-snapshot immutability; Stage 0 volume/cost sizing; self-hosted vs FK-D13 baseline (FK-D12 review); whether documents/OCR/transcription are in O07 scope; provider-dependent O08 items.

### Last Updated
2026-10-07

---

## 12. O08 — AI Security / Data Handling

### Status
**OPEN — INVESTIGATION COMPLETE (READY FOR GOVERNANCE RESOLUTION).** Provider-independent controls fully defined; provider-dependent requirements now definable as *requirements* after O07 (category conditional). Recommended outcome: **approve O08 conditionally** (see §12.1). Not approved; not a security authorization.

### Purpose
Define the security/data-handling conditions under which FeelJapanK may eventually send customer-originated information to an external AI provider for Stage 0 interpretation. O08 is not provider/model selection and not implementation.

### Current Findings
- **FACT:** No AI credentials exist; secrets (`db_password`, `encryption_key`, `whatsapp_app_secret`) live in gitignored `bench/sites/crm.localhost/site_config.json`; `.env` is untracked; no adapter/egress/code/SDK. FJK app has no HTTP/logging/AI references.
- **FACT (config, security-relevant):** local site config has `server_script_enabled=1` and `developer_mode=1`. These enable DB-authored server-side scripts and developer behaviour; they are a hardening consideration for any customer-data instance and are recorded here as a SHOULD-level review item (**no config change made**).
- **FACT:** WhatsApp webhook HMAC-SHA256 guard present (`ark_whatsapp_guard`, external app); FJK access mirrors the linked Deal (`permissions.py`), with Administrator / System Manager bypass; infra images pinned by digest (`versions.lock`, FK-D13).
- **FACT (channels, O06):** email inbound disabled (`enable_incoming=0`); WhatsApp live inbound deferred; `Communication` count = 0; manual source capture is the baseline. No live inbound channel is authorized.
- **Provider-independent controls (MUST):** HTTPS/TLS only; credentials server-side only and never in source/frontend/browser; AI input payloads must never intentionally contain application credentials/secrets; minimum-necessary egress with payload construction inside the FJK boundary; pre-egress validation/redaction; no authoritative AI write; provenance preserved by reference; failure isolation; timeouts/retries/backoff; structured-output validation; log redaction.
- **Provider-policy requirements (MUST, vendor-agnostic):** no training/improvement on submitted customer data; defined retention and deletion; transient-vs-persistent processing understood; abuse/safety-review handling understood; no undisclosed secondary use; subprocessor transparency; processing location known. **SHOULD:** zero-retention option where available.
- **FACT (candidate-specific, 2026-10-07):** for DeepSeek `deepseek-flash`, provider-policy items for *API inputs* (training, retention, deletion, subprocessors, secondary use, logging) are **not clearly established** by first-party evidence ⇒ gate OPEN; jurisdiction likely mainland PRC (controller/governing law) but residency OPEN. HTTPS, server-side API-key auth, and model/request-response identity ARE established. Evidence: `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-DeepSeek-Flash-Provider-Verification-v0.1.md`.
- **FACT (O08-P resolution, 2026-10-07):** first-party review found DeepSeek **Terms of Use §4.3** grants a limited, de-identified, opt-out right to use Inputs/Outputs to develop/improve services; **context caching persists input prefixes to disk by default**; and **no** API retention period, deletion mechanism, subprocessor list, or logging policy is disclosed. Governing law = **mainland PRC** (Open Platform ToS §10.1). P1–P6 = **OPEN**; P7 = **PARTIALLY ESTABLISHED** + internal business decision. Provider gate = **B — CONDITIONAL CLOSE**; **real customer data NOT authorized**. Detail + draft provider evidence request: evidence doc §11.
- **Outbound vs inbound:** AI output is untrusted external input — schema-validated, malformed/unexpected output rejected, never directly executes CRM actions; source content is untrusted data, not system authority (prompt-injection containment).
- **Failure boundary:** provider unavailable / timeout / malformed / invalid structured output / low confidence / unsupported attachment ⇒ no authoritative write; failure recorded and surfaced; CRM usable without AI.
- **Retention/logging:** retain provenance identity + run metadata (provider, model id/version, request/response id, timestamp, run state, usage, error class); do **not** place full prompts/responses or source content in ordinary logs; full prompt/token retention is not required (per O01).
- **Telegram** (if ever adopted) is a distinct third-party processor requiring its own O08-class review; not authorized.

### 12.1 Recommended Governance Outcome
**Approve O08 conditionally:** approve the provider-independent controls and the vendor-agnostic provider-policy requirements as the O08 gate; keep provider-specific authorization, processing jurisdiction, and retention periods **OPEN** pending vendor-policy evidence and an appropriate business/legal/security determination. Customer-data egress remains unauthorized until O08 is explicitly resolved and a vendor satisfies the checklist.
**O08-P (DeepSeek provider gate): B — CONDITIONAL CLOSE** — subject to written provider confirmation of P1–P6 (training, retention, deletion, subprocessors, secondary use, logging) and an explicit jurisdiction/residency decision for P7. Detail: evidence doc §11.

### 12.2 Governance Decision (2026-10-07) — ACCEPTED WITH DEFERRED PROVIDER ASSURANCE

> **FeelJapanK accepts the documented DeepSeek-Flash data-handling arrangement for the Phase 1 pilot and defers further provider-policy clarification until operational need, compliance review, increased data exposure, or another governance trigger requires it.**

This is an intentional **risk-acceptance** decision. It is **not** a claim that the previously unresolved provider-policy questions are technically or contractually proven closed.

**Known / Accepted Residual Risks — Deferred Assurance (NOT resolved; NOT to be recorded as PASS):**
- P1 API-input training/improvement
- P2 retention
- P3 deletion
- P4 subprocessors
- P5 secondary use
- P6 logging
- P7 detailed processing/storage residency

**Jurisdiction decision:** FeelJapanK does **not** reject DeepSeek solely because its provider entity / governing-law position is mainland PRC; this is accepted for the pilot. No claim is made that Malaysian legal compliance is established, that cross-border transfer is legally cleared, or that residency requirements are irrelevant — these remain accepted residual governance risk.

**Unchanged controls:** the O08 provider-independent controls (HTTPS, server-side credentials, minimum-necessary egress, pre-egress redaction, no authoritative AI write, provenance-by-reference, failure isolation, structured-output validation, log redaction) remain approved and in force. The AI authority boundary (FK-D18; INTERPRET → EXTRACT → PROPOSE) and the O05 human-approval model remain unchanged. The data-minimisation egress rule remains **mandatory**.

**Technical requirements carried into FK-D12 (`FACT` from bake-off):** inspect `finish_reason` and reject incomplete/invalid output (`finish_reason=length` can produce unusable JSON); validate against the application schema; never promote unvalidated output; never write model output directly to authoritative CRM fields; size token limits / control thinking mode (do not assume `max_tokens=8000` is a production default); preserve O01/O02/O04/O05 provenance; Deal resolution must keep `selected=null` / human-required; Info-Status boundary (no CUSTOMER-CONFIRMED / Info Complete / Ready for Quotation) mandatory.

**Reopen triggers (governance):** revisit the deferred provider-policy questions if any of the following occurs — move from pilot toward production; materially more customer data sent; sensitive data categories introduced; provider terms materially change; DeepSeek changes API/data-handling policies; a compliance/customer contractual requirement arises; a formal security/privacy review is initiated; provider processing/residency becomes a material business requirement; retention/deletion becomes operationally important; the project begins relying on provider-side stored context/files; the provider is used for a materially broader workload. No automated monitoring mechanism is created.

**Overall Stage 0 provider gate:** provider selected for implementation, with explicitly accepted residual provider-policy risk.

### Current Governance Position
Provider-independent controls are defined and provider-policy requirements are now expressible. No security approval is claimed; no vendor is authorized. O07's conditional approval remains conditional until the O08 gate is satisfied.

### Decisions / Constraints
- Customer data egress requires the security gate (FK-D12; FK-D18 §10–§11).
- AI input payloads must never intentionally contain application credentials or secrets.
- Security controls may never weaken the O05 human-approval model.
- No new roles, permissions, config, credentials, or integrations are created here.

### Dependencies
O07 (provider category, conditional), O06 (channels), O01 (provenance), O03 (source retention), O02 (run states).

### Evidence References
- Technical Design §17 (security), §17.1 (runtime evidence), §17.2 (O08 findings)
- Decisions STG0-O08, STG0-P08; §3C; §3K
- Verification Plan V18, V27, V28, V50–V52, V62, V143–V150

### Open Items
Provider-specific policy evidence; processing jurisdiction / legal determination (**OPEN — requires business/legal/security determination**); retention period for sources/derived data; masking/pseudonymisation policy; deletion guarantees; `server_script_enabled`/`developer_mode` hardening review; Telegram security/data-handling.

### Last Updated
2026-10-07

---

## 13. O09 — Vague-Request Convention

### Status
**OPEN** (options offered as PROPOSAL; business decision pending).

### Purpose
Define how communications lacking enough information to form a complete commercial request are preserved without inventing requirements or prematurely creating authoritative Deal data.

### Current Findings
- Preserve the source as native `Communication`/`WhatsApp Message`/(future email/Telegram) with optional linkage to Contact/Organization only (not Deal); optional Lead (`FK-D09`) and/or `ToDo`.
- Option: also create a pre-Deal intake reference in the proposed structure.
- Must not manufacture certainty; record `MISSING`/`TO CONFIRM`; must not reach Info Complete; must not create authoritative Deal/requirements.

### Current Governance Position
SOP v0.2 §4 records the persistent-intake convention as [OPEN]. Option A (source preserved, link Contact/Organization only, no Deal/requirements/status change) is the minimal PROPOSAL; it avoids inventing a persistent "holding" object.

### Decisions / Constraints
- AI cannot manufacture certainty or reach Info Complete.
- Ambiguity requires human resolution (FK-D10; STG0-R01).

### Dependencies
O03 (source storage), O06 (channels), O05 (human resolution), O01 (provenance).

### Evidence References
- Technical Design §16 (failure/ambiguity), §26 (O-09 options)
- Decisions STG0-O09, STG0-P10
- Verification Plan V17, V29, V33

### Open Items
Final vague-request convention (business decision); whether a pre-Deal intake reference is used.

### Last Updated
2026-10-07

---

## 14. Cross-Decision Dependencies

```text
O06 Channel Scope
   ├── affects O01 Provenance
   ├── affects O03 Source Storage
   ├── affects O05 Human Approval
   └── affects O08 Security/Data Handling

O07 AI Provider (CONDITIONALLY APPROVED — category-level)
   └── gates provider-dependent O08 decisions; customer-data use conditional on O08

O01 / O02 / O03 / O04 / O05
   └── define the core AI-assisted proposal/review architecture

O09
   └── defines handling of vague customer requests
```

Additional recorded impacts:
- **O01:** provenance must work consistently across email, manual source capture, and future Telegram intake. No schema decided.
- **O03:** native source preservation remains preferred.
- **O05:** Telegram notifications cannot replace the authoritative human approval mechanism.
- **O07:** hosted LLM API category conditionally approved; no provider selected; customer-data use conditional on O08.
- **O08:** investigation complete (provider-independent controls + provider-policy requirements); Telegram introduces a separate external-data-handling consideration; O07 conditional approval remains conditional until the O08 gate is satisfied.
- **O09:** email/manual/future Telegram intake must preserve vague requests without forcing artificial Deal/requirement interpretation.

---

## 15. Frozen Governance Decisions

| ID | Decision | Status | Notes |
|---|---|---|---|
| FK-D01 | Deal = one commercial opportunity/enquiry container | FROZEN | No new container. |
| FK-D03 | New request → new Deal; revisions stay | FROZEN | Human-controlled. |
| FK-D04 | CRM owns relationship + enquiry context | FROZEN | Native Org/Contact/Deal. |
| FK-D10 | Explicit commercial context identifies Deal; no silent guessing | FROZEN | AI may only suggest. |
| FK-D11 | Phase 1 human-in-the-loop | FROZEN (partial supersession) | Automation-deferral clause partially superseded by FK-D18. |
| FK-D12 | Native-first; high-risk gate | FROZEN | Governs any future BUILD. |
| FK-D13 | Frozen environment/security baseline | FROZEN | `docs/versions.lock` unchanged. |
| FK-D14 | Written confirmation = evidence; manual marking | FROZEN | AI cannot mark confirmation/Info Complete. |
| FK-D17 | Pre-invoice commercial state CRM-owned | FROZEN | Stage 0 is pre-invoice. |
| FK-D18 | AI = Interpret/Extract/Propose; mandatory human approval; mandatory provenance; no implementation authorized | FROZEN | Core authority for Stage 0. |
| STG0-R01 | Existing native phone-derived WhatsApp/telephony association accepted **only as provisional communication context** | **APPROVED — CONDITIONAL A** | See below. |

### STG0-R01 — Conditional A

**Status: APPROVED — CONDITIONAL A.**

Core rule:

> **Native communication context is not equivalent to a human-confirmed Deal relationship.**
> `WhatsApp Message → native phone match → Deal` must never be interpreted as `Human approval → Deal`.

Approved boundaries: native association remains **unchanged**; it is **not** authoritative Deal resolution, **not** human confirmation, **not** valid provenance; Stage 0 must require explicit human Deal confirmation; AI may propose but not confirm a Deal; the same applies to telephony `CRM Call Log`; R-B/R-C/R-D/R-E are not selected; no native remediation authorized; BUILD not authorized.

References: Decisions §3B; Technical Design §26A/§26B; Verification Plan V30–V48.

---

## 16. Documentation / Evidence References

| Purpose | Document |
|---|---|
| Implementation plan | `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` (§3.2, M6) |
| Technical design | `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§13, §17, §17.1, §18.1–§18.3, §20–§26B) |
| Governance decisions (workstream) | `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (§3A–§3D) |
| Verification plan | `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V01–V62) |
| Implementation log | `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-Implementation-Log-v0.1.md` |
| Cross-project decision index | `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` |
| Decision-check standard | `docs/governance/FeelJapanK-Decision-Check-Standard-v0.1.md` |

Frozen rule references: FK-D01, FK-D03, FK-D04, FK-D10, FK-D11, FK-D12, FK-D13, FK-D14, FK-D17, FK-D18.

No duplicate evidence documents are created.

---

## 17. Change History

```
2026-10-07 — v0.1
Created canonical Stage 0 Decision Register.
Recorded O06 channel-strategy investigation and current governance alignment
(core inbound email + manual capture; live WhatsApp deferred; Telegram internal-only candidate).
Preserved STG0-R01 Conditional A and all frozen decisions.
Summarized O01–O05, O07–O09 current state without resolving them.
No implementation or configuration changes.

2026-10-07 — O01 investigation recorded
O01 provenance model: investigation complete; requirements established
(four distinct layers; datum-level minimum set; append-only proposal history;
human Deal-resolution provenance; common cross-channel contract).
Status: INVESTIGATION COMPLETE (READY FOR GOVERNANCE RESOLUTION). Not approved.
Evidence: Design §13.3; Decisions §3E; Verification V63–V73.
No implementation or configuration changes.

2026-10-07 — O01 approved; O02 investigation recorded
O01 provenance model: APPROVED — datum/proposal-level, evidence-linked, four layers.
O02 proposal lifecycle: investigation complete; requirements established
(proposal states + separate run states; ACCEPTED ≠ authoritative with explicit promotion;
edited-proposal preservation; rejection/deferral; append-only reprocessing; multiple proposals;
partial acceptance; conflict handling; customer-confirmation and Deal-resolution distinctions;
supersession; immutable historical facts).
Status: INVESTIGATION COMPLETE (READY FOR GOVERNANCE RESOLUTION). Not approved.
Evidence: Design §23.1; Decisions §3F; Verification V74–V89.
No implementation or configuration changes.

2026-10-07 — O02 approved; O03 investigation recorded
O02 proposal lifecycle: APPROVED.
O03 source storage/access: investigation complete; native source storage confirmed reusable
(source identity + content_hash; immutability/retention and reviewer-access caveats OPEN;
no new source store required; location/span not native).
Status: INVESTIGATION COMPLETE (READY FOR GOVERNANCE RESOLUTION). Not approved.
Evidence: Design §7.1; Decisions §3G; Verification V91–V105.
No implementation or configuration changes.

2026-10-07 — O04 investigation recorded
O04 proposed ↔ authoritative relationship: investigation complete; native insufficient for
proposal entity / typed per-datum disposition / accept-vs-promotion distinction /
proposal→authoritative link / Deal-resolution decision / idempotent promotion.
Relationship semantics + 15 invariants recorded. Schema OPEN.
Status: INVESTIGATION COMPLETE (READY FOR GOVERNANCE RESOLUTION). Not approved.
Evidence: Design §14.1; Decisions §3H; Verification V106–V120.
No implementation or configuration changes.

2026-10-07 — O04 approved; O05 investigation recorded
O04 proposed ↔ authoritative relationship: APPROVED (semantics + 15 invariants); schema OPEN.
O05 human approval: investigation complete; actor/authority model verified (roles + Deal
org-hierarchy + FJK mirroring; set_info_complete/confirm_version patterns); native insufficient
for datum-level disposition, accept-vs-promotion at datum level, partial approval,
reject/defer/supersede records, stale/conflict binding, Deal-resolution record, idempotency.
Status: INVESTIGATION COMPLETE (READY FOR GOVERNANCE RESOLUTION). Not approved.
Evidence: Design §12.1; Decisions §3I; Verification V121–V140.
No implementation or configuration changes.

2026-10-07 — O07 AI provider investigation recorded (CONDITIONALLY APPROVED)
O07 AI provider: investigation complete; hosted external LLM API category conditionally
approved as technically/operationally suitable behind a provider-agnostic adapter.
No vendor/model selected, connected, or authorized for customer data; provider selection
and customer-data processing remain conditional on O08. Self-hosted is a viable alternative
category (requires FK-D12 review). Japanese/mixed-language extraction quality remains OPEN
(synthetic bake-off). Provider categories, requirements R1–R9, structured-output evidence,
failure/error-taxonomy, provenance-metadata and reprocessing findings recorded.
Status: CONDITIONALLY APPROVED (category-level). Not a vendor decision; not a security approval.
Evidence: Design §19; Decisions STG0-O07/STG0-D16; Verification V18/V27/V28/V51/V52/V141/V142.
No implementation or configuration changes.

2026-10-07 — O08 AI security / data-handling investigation recorded (READY FOR GOVERNANCE RESOLUTION)
O08: investigation complete; provider-independent controls (HTTPS, server-side-only credentials,
no secret in payload, minimum-necessary egress, pre-egress redaction/validation, no authoritative
AI write, provenance-by-reference, failure isolation, structured-output validation, log redaction)
and vendor-agnostic provider-policy requirements (no training on customer data, defined retention/
deletion, subprocessor transparency, processing location known, abuse-review handling) recorded as
MUST/SHOULD/OPEN. AI output treated as untrusted input; source content is untrusted data, not system
authority (prompt-injection containment). Access-control and adapter security requirements recorded.
Provider-specific authorization, jurisdiction/legal determination, and retention periods remain OPEN.
Recommended outcome: APPROVE O08 CONDITIONALLY.
Evidence: Design §17/§17.1/§17.2; Decisions §3C/§3K; Verification V18/V27/V28/V50–V52/V62/V143–V150.
No implementation or configuration changes.

2026-10-07 — DeepSeek-Flash provider verification (INCONCLUSIVE — keep under evaluation)
Candidate provider identified: DeepSeek deepseek-flash (DeepSeek-V4.1-Flash; base https://api.deepseek.com).
Provider-policy gate CONDITIONAL: HTTPS, server-side API-key auth, model/system_fingerprint + request/
response ids established; API-input training/retention/deletion/subprocessors/secondary-use/logging not
clearly established by first-party evidence; jurisdiction likely mainland PRC, residency OPEN.
Synthetic bake-off (8 tests + Deal-resolution + info-status scenarios) designed but NOT EXECUTED —
no authorized DeepSeek credential available; no customer data sent. Classification: D — INCONCLUSIVE.
Recommendation: Option 2 — keep DeepSeek-Flash under evaluation; no customer-data authorization.
Evidence: docs/evidence/phase1/FeelJapanK-Phase1-Stage0-DeepSeek-Flash-Provider-Verification-v0.1.md;
provider docs (api-docs.deepseek.com, cdn.deepseek.com/policies) fetched 2026-10-07.
No implementation or configuration changes.

2026-10-07 — DeepSeek-Flash synthetic bake-off executed; reclassified B — CONDITIONAL PASS
Synthetic-only live run executed against deepseek-flash (OpenAI-compatible /chat/completions, JSON output,
temperature 0); no customer data; API key kept out of the repo and deleted after the run.
Results: 9/9 executed behavioral tests PASS (JP; mixed JP/EN; missing-info; ambiguity; explicit-vs-inferred;
prompt-injection ignored; long/compound with correction; Deal-resolution held; info-status held); malformed-
output boundary PARTIAL (json_object valid only on completion; must check finish_reason + app-side schema
validation). Operational: thinking mode default with large reasoning_tokens (size max_tokens or disable
thinking); prompt caching effective; model/system_fingerprint/id/created/usage metadata available.
Provider-policy gate remains CONDITIONAL (API-input training/retention/deletion/subprocessors OPEN).
Classification revised D (INCONCLUSIVE) → B — CONDITIONAL PASS. Recommendation: Option 1 — select
DeepSeek-Flash conditionally; no customer-data authorization until provider-policy blockers resolved.
Evidence: docs/evidence/phase1/FeelJapanK-Phase1-Stage0-DeepSeek-Flash-Provider-Verification-v0.1.md §6.
No application/config/provider/CRM changes; no commit/push.

2026-10-07 — O08-P DeepSeek provider data-handling resolution (B — CONDITIONAL CLOSE)
First-party review of DeepSeek Open Platform ToS, Terms of Use, Privacy Policy, Context Caching, Files API,
rate-limit and Chat Completions docs. Findings: ToU §4.3 grants a limited de-identified opt-out right to use
Inputs/Outputs to improve services; context caching persists input prefixes to disk by default; no API
retention period, deletion mechanism, subprocessor list, or logging policy disclosed; governing law = mainland
PRC (Open Platform ToS §10.1). P1 training/improvement, P2 retention, P3 deletion, P4 subprocessors, P5
secondary use, P6 logging = OPEN; P7 jurisdiction = PARTIALLY ESTABLISHED + internal decision. Closed/PASS:
HTTPS, server-side API-key auth, model/response identity. Provider gate = B — CONDITIONAL CLOSE. Real
customer-data processing remains NOT AUTHORIZED. Draft provider evidence request recorded (do not send).
Evidence: DeepSeek-Flash verification evidence doc §11.
No application/config/provider/CRM changes; no customer data; no commit/push.

2026-10-07 — O08 governance decision: ACCEPTED WITH DEFERRED PROVIDER ASSURANCE (risk acceptance)
Human governance decision: FeelJapanK accepts the documented DeepSeek-Flash data-handling arrangement for
the Phase 1 pilot and defers further provider-policy clarification until a defined trigger requires it.
This is an intentional risk-acceptance, NOT a claim that the unresolved provider-policy questions are closed.
O07: CONDITIONALLY APPROVED / SELECTED (deepseek-flash selected for Stage 0). O08: ACCEPTED WITH DEFERRED
PROVIDER ASSURANCE. Known/Accepted Residual Risks (NOT PASS): P1 training/improvement, P2 retention,
P3 deletion, P4 subprocessors, P5 secondary use, P6 logging, P7 detailed processing/storage residency.
Jurisdiction: mainland-PRC provider positioning accepted for the pilot; no legal-compliance claim made.
Unchanged: provider-independent O08 controls; FK-D18 AI authority; O05 human approval; minimum-necessary
egress. Reopen triggers defined (Register §12.2). Next: FK-D12 PLAN → REVIEW → APPROVAL → BUILD → VERIFY.
No implementation/config/credential/provider/CRM change; no customer data; no commit/push.

2026-10-08 — O06 Telegram implementation authorized (operator)
Operator revokes the prior "Telegram build pending / not authorized" state and AUTHORIZES the Telegram
implementation. Preserved unchanged: internal-only (not a customer channel); transport/control surface
only; notifications cannot replace D12-E approval; Telegram metadata never establishes authoritative
Company/Contact/Deal/requirements/confirmation/Info Complete (FK-D10/FK-D12/FK-D18/STG0-R01). Still
required for the build: implementation approach selection; O08-class security/data-handling determination;
source-preservation mapping; a scoped Telegram BUILD PLAN. No code/config/credential created by this decision.

2026-10-08 — Stage 0 master sequence LOCKED (operator)
Operator locked the definitive Stage 0 working order (Phases 1–11, Tasks 1–14; ends at Info Complete;
Supplier Quotation / Customer Quotation / Trip out of scope). Canonical doc:
docs/business/FeelJapanK-Phase1-Stage0-Master-Implementation-Plan-v0.1.md (status LOCKED). Phase 0
reconciliation COMPLETE. Next: Task 1 — D12-F PLAN (read-only). No FROZEN decision changed; each task
retains PLAN → APPROVAL → BUILD → VERIFY.

2026-10-08 — Task 0A: master plan status reconciliation (existing vs remaining)
Added to the locked master plan: §0.3 execution dashboard, §0.4 three kinds of "done" (already-implemented
and reusable vs foundation-not-connected vs missing), §0.5 revised execution order. Reuse confirmed: native
CRM (Company/Contact/Deal), Communication/File/Comment/Version/Activity Log, FJK Component/Requirement
Line/Guide/Activity/Transportation/Accommodation, validation, Information Status, Info Complete, N1, and
D12-A/B/C/D/E. Missing: D12-F; Common Source Intake; Telegram build; email enablement/integration; complete
source→D12→review→promotion path; AI-assisted human-controlled Deal resolution; AI→FJK promotion; E2E
verification; human acceptance; freeze. No FROZEN decision changed.

2026-10-08 — D12-F BUILD VERIFIED: CONDITIONAL PASS / READY FOR FREEZE
D12-F (AI pipeline hardening + authoritative promotion boundary; design DS1–DS9) built and runtime-verified
(containerized bench frappe/bench@7cf2354c, bench 5.31.0, site crm.localhost; migrate applied FJK AI Proposal
Promotion). Evidence: ai_promotion_tests 16/16; ai_persistence_tests 31/31; ai_review_tests 40/40; offline AI
suite 130/130. Residual/open (NOT defects): richer per-domain promotion mapping (later Stage 0); concurrency
implementation/design-verified (parallel-race stress test not executed); mid-transaction kill not simulated;
reprocessing human trigger belongs to the future intake workflow. Idempotency key applies to successful
PROMOTED records; BLOCKED/FAILED rows are keyless append-only audit events. DS1–DS9 not reopened. No
implementation change in the closure session.

2026-10-08 — D12-D/E/F FROZEN + RELEASED
FK-D12-F FROZEN (BUILD VERIFIED: CONDITIONAL PASS). D12-D/E/F committed and pushed to origin/main as one
release commit. Stage 0 remains IN PROGRESS. Residual limitations preserved (narrow initial promotion
mapping; parallel-race/crash-kill not stress-tested; reprocess human trigger deferred to intake). No
unexecuted scenario claimed runtime-proven.
```
