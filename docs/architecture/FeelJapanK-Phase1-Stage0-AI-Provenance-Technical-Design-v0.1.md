# FeelJapanK Phase 1 — Stage 0 — AI + Provenance — Technical Design — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1 |
| Subject | Technical design for Stage 0 — Data Acquisition / Data Entry — AI-assisted interpretation + provenance |
| Version | v0.1 |
| Status | **PLAN / TECHNICAL DESIGN — PROPOSAL — NOT APPROVED — BUILD NOT AUTHORIZED** |
| Date | 2026-10-07 |
| Repository | `/home/yusmarin/frappe-crm` |
| Author role | OpenCode — technical investigation + design (ChatGPT = governance/review) |
| Companion plan | `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` |
| Companion decisions | `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` |
| Companion verification | `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` |

> **Classification rule used throughout:** `FACT` = directly observed in the repository; `FROZEN` = established governance decision; `PROPOSAL` = OpenCode recommendation requiring later human approval; `OPEN` = insufficient evidence or governance decision not yet made. No design recommendation is labelled `FACT`. No `PROPOSAL` is an implementation authorization.

---

## 1. Executive Summary

- Stage 0 (customer communication → proposed structured CRM data → human approval → authoritative CRM → Info Complete) is directionally FROZEN by `FK-D18` and Roadmap v0.2 §3, but **no AI, proposal, or provenance implementation exists** (`FACT`; repo-wide search).
- The repository already contains a strong **native source + history layer**: `Communication`, `Communication Link`, `WhatsApp Message`, `File`, `Comment`, `Version`, `Activity Log`, `ToDo`, `CRM Task`, `FCRM Note`, and the CRM Deal activity aggregator (`crm/api/activities.py`). It also contains the full **downstream FJK model** (components, requirement lines, guide requirements, activity items, transport/accommodation allocations, readiness, Info Complete).
- The investigation finds that native structures are **sufficient for source preservation, linking, history, and human notes**, but **insufficient to represent a structured, non-authoritative AI proposal with per-datum source span, confidence, disposition state, and a navigable link to the resulting authoritative value** (see §20–§21). A **dedicated FJK proposal/provenance structure is therefore recommended as a PROPOSAL**, gated by `FK-D12`.
- Candidate Company/Contact/Deal resolution is investigated (§10). The design keeps candidates **outside authoritative link fields** until human approval; it reuses native `Contact.links`, `CRM Contacts`, and `CRM Organization`.
- All unresolved areas (provider, security specifics, channel scope, schema approval) remain **OPEN**. Nothing is promoted to decided.

---

## 2. Scope / Boundary

Intended Stage 0 flow:

```
Customer Communication
  → Source Preservation
  → AI Interpretation / Extraction
  → Proposed Structured Data + Provenance
  → Human Review / Approval (Accept / Edit+Accept / Reject)
  → Authoritative CRM Data
  → Deal Information Gathering → Requirements → Allocations → Validation → Information Status
  → Info Complete
```

Boundary stops at **Info Complete** (`FROZEN`; FK-D18 §7).

**OUT OF SCOPE (explicit):** Supplier Quotation Request, supplier email/reply intake, supplier quotation, supplier pricing, Customer Quotation, Final Quotation, Trip/ERPNext, Phase 2, Phase 3. This design does not touch them.

---

## 3. Governance Constraints (`FROZEN`)

| Constraint | Source |
|---|---|
| AI = Interpret → Extract → Propose; never authoritative | FK-D18 §3–§4 |
| Human approval mandatory: Accept / Edit+Accept / Reject | FK-D18 §5 |
| AI confidence ≠ approval | FK-D18 §5 |
| Provenance mandatory per AI-derived value | FK-D18 §6 |
| AI cannot mark Info Complete / allocation / SQR / CQ | FK-D18 §4.2, §7 |
| Existing/new Deal, amendment/new request = human | FK-D10; FK-D03; SOP v0.2 §5 |
| Native-first; FK-D12 gate before BUILD | FK-D12; FK-D18 §11 |
| No duplicate Org/Contact/Deal masters | FK-D04; Roadmap v0.2 §8 |
| Frozen env/security baseline; HMAC guard unchanged | FK-D13; `docs/versions.lock` |
| Written confirmation = evidence, manual (FK-D14) | FK-D14 |

These are constraints, not design subjects. They are not reopened.

---

## 4. Current Repository Architecture (`FACT`)

Installed apps (`bench/sites/apps.txt`): `frappe`, `crm`, `frappe_whatsapp`, `ark_whatsapp_guard`, `feeljapank_crm`.

- **Frappe 15.121.1 / CRM 1.84.0** (`docs/versions.lock`).
- Native Frappe provides `Communication`, `Communication Link`, `Comment`, `Version`, `File`, `Activity Log`, `ToDo`, and `Workflow`.
- FCRM provides `CRM Deal`, `CRM Organization`, `CRM Contacts`, `CRM Lead`, `CRM Task`, `FCRM Note`, `CRM Call Log`, `WhatsApp` integration hooks.
- `frappe_whatsapp` provides `WhatsApp Message`, `WhatsApp Account`, webhook ingestion; `ark_whatsapp_guard` wraps the webhook with HMAC-SHA256 (`override_whitelisted_methods` in `apps/ark_whatsapp_guard/ark_whatsapp_guard/hooks.py:257`).
- `feeljapank_crm` provides 11 DocTypes, 20 custom fields on `CRM Deal`, the `fjk-workspace` Desk Page, and the FeelJapanK Vue workspace.

No AI/provider/proposal/provenance code exists (`FACT`).

---

## 5. Existing Native/FJK Capabilities (`FACT`)

### 5.1 Source + evidence layer

| Structure | Relevant fields | Evidence |
|---|---|---|
| `Communication` | `communication_medium`, `content`, `reference_doctype`/`reference_name`, `timeline_links` (child `Communication Link`), `communication_type`, `comment_type`, `sent_or_received`, `communication_date`, `message_id`, `has_attachment`, `track_changes=1` | `apps/frappe/frappe/core/doctype/communication/communication.json` |
| `Communication Link` | `link_doctype`, `link_name`, `link_title`, `communication_date` | `.../communication_link/communication_link.json` |
| `WhatsApp Message` | `type` (Incoming/Outgoing), `from`/`to`, `message`, `content_type` (text/document/image/video/audio/flow), `attach` (Attach), `message_id`, `conversation_id`, `reply_to_message_id`, `reference_doctype`/`reference_name` (Dynamic Link), `whatsapp_account` | `apps/frappe_whatsapp/.../whatsapp_message/whatsapp_message.json` |
| `File` | `attached_to_doctype`/`attached_to_name`/`attached_to_field`, `file_url`, `is_private`, `content_hash` | `apps/frappe/frappe/core/doctype/file/file.json` |

- Incoming WhatsApp creates a `WhatsApp Message`; media attachments are stored as `File` attached to the message (`apps/frappe_whatsapp/.../utils/webhook.py:82,233`).
- The CRM app reacts to `Communication` (`apps/crm/crm/hooks.py:172`) and `WhatsApp Message` (`:180`) via `crm/utils/__init__.py:256` and `crm/api/whatsapp.py:37`.

### 5.2 History / audit layer

| Structure | Relevant fields | Evidence |
|---|---|---|
| `Version` | `ref_doctype`, `docname`, `data` (JSON diff), `hash` autoname | `apps/frappe/frappe/core/doctype/version/version.json` |
| `Comment` | `comment_type`, `content` (HTML), `reference_doctype`/`reference_name`, `comment_by`, `published`, `track_changes=1` | `.../comment/comment.json` |
| `Activity Log` | `reference_doctype`/`reference_name`, `timeline_doctype`/`timeline_name`, `subject`, `content`, `status`, `communication_date` | `.../activity_log/activity_log.json` |
| `ToDo` | `allocated_to`, `reference_type`/`reference_name`, `status`, `priority`, `date` (used for assignment) | crm hooks `apps/crm/crm/hooks.py:165`; `crm/api/doc.py:615` |
| `CRM Task` | `title`, `priority`, `assigned_to`, `status`, `due_date`, `reference_doctype`/`reference_docname` | `apps/crm/crm/fcrm/doctype/crm_task/crm_task.json` |
| `FCRM Note` | `title`, `content`, `reference_doctype`/`reference_docname` | `.../fcrm_note/fcrm_note.json` |

- The CRM Deal timeline aggregates versions (field changes), communications, comments, files, calls, notes, tasks: `crm/api/activities.py:23` (`get_deal_activities`).
- `Version` captures field-level changes because `CRM Deal` and its child tables are loaded in the doc; child-table edits surface as `Version` entries (evidence: `crm/api/activities.py:71–118` parsing version diffs).

### 5.3 Downstream FJK model (`FACT`)

- `FJK Deal Component`, `FJK Deal Requirement Line`, `FJK Deal Guide Requirement`, `FJK Deal Activity Item` (child tables on `CRM Deal`).
- `FJK Transportation Allocation`, `FJK Accommodation Allocation` (child tables) + advisory validation (`d1.py`) + `get_allocation_validation` (`api.py:381`).
- Shared context fields (`fjk_request_nature`, `fjk_destination_route`, pax fields, `fjk_ready_for_quotation`, `fjk_info_complete`, …) — `setup.py`.
- Information Status vocabulary `KNOWN/MISSING/TO CONFIRM/CUSTOMER-CONFIRMED/NOT APPLICABLE` (doctype Select options); readiness `get_readiness` (`api.py:231`); Info Complete `set_info_complete`/`is_info_complete` (`api.py:191,219`).
- Read-only Deal summary incl. evidence list: `get_deal_summary` (`api.py:257`).

### 5.4 UI (`FACT`)

- Desk Page `fjk-workspace` mounts the Vue bundle `feeljapank.js` (`page/fjk_workspace/fjk_workspace.js`).
- `frontend/src/App.vue` tabs: **Summary | Full Details | Supplier Quotation**; Source evidence list (`App.vue:442–449`); Info Complete toggle (`App.vue:100–120`); all data via `/api/method/feeljapank_crm.api.*` (`App.vue:560,924–928`).

---

## 6. Stage 0 Target Architecture (PROPOSAL)

```
┌────────────────────┐     ┌───────────────────────────┐     ┌──────────────────────┐
│ Channel intake     │     │ AI interpretation layer    │     │ Proposal store (FJK) │
│ (WhatsApp/Email/   │────▶│ (provider-abstracted)      │────▶│ non-authoritative    │
│  Operator input)   │     │ Interpret → Extract        │     │ + provenance refs    │
└─────────┬──────────┘     └───────────────────────────┘     └───────────┬──────────┘
          │ source preserved natively                                     │
          ▼                                                              ▼
   Native sources                                     Human Review + Deal Confirmation (FJK workspace)
   Communication / WhatsApp Message / File            Deal confirm · Accept / Edit+Accept / Reject
   (originals, immutable)                                                  │
                                                                           ▼
                                                          Authoritative CRM (native Deal + FJK model)
                                                          via existing fields/child tables/APIs
                                                                           │
                                                                           ▼
                                                          Information Status → Info Complete (human)
```

Key properties (`PROPOSAL`):
- Source preserved in native structures; **structured data is derived, never replaces originals**.
- AI output lives **only** in the proposal store until a human disposes it.
- Promotion writes to the **existing** authoritative model; no parallel AI model.
- Every proposal carries provenance references back to the native source.
- **Deal confirmation is an explicit human step** and is separate from value-proposal disposition. Native phone-derived `reference_*` (WhatsApp/telephony) is **provisional context only** and never counts as confirmation (STG0-R01 — Conditional A, §26A.13).

---

## 7. Source Intake Architecture (PROPOSAL, reusing natives)

- **Reuse (`FACT`):** channel → native source object (`Communication` / `WhatsApp Message` + `File`).
- **New (`PROPOSAL`):** an *intake reference* that points to the native source and holds AI-processing state (e.g., `source_doctype`/`source_name`, optional checksum). This is part of the proposed proposal/provenance structure (§21), not a second source store.
- **Principle:** originals remain the authoritative evidence; intake never copies-and-replaces them.

**Alternatives considered:**
- A) Store no intake reference; derive proposals directly from native sources. — Simpler but weak processing/audit state.
- B) Intake reference inside the proposed structure. — Recommended.

### 7.1 O03 Source Storage / Access Findings (2026-10-07)

Canonical summary: Decision Register §7.

- **Native source storage is reusable (`FACT`):** `Communication` (+`Communication Link`), `File` (`content_hash`, dedup by `(content_hash, is_private)`, `create_attachment_copy` reuses `file_url`, `on_trash` deletes unless shared), `WhatsApp Message`, `FCRM Note`. **No new source store is required.**
- **Source identity (required):** native doctype + record name; `content_hash` when file-backed. Capture this at AI-processing time as an immutable fact (O01).
- **Immutability caveat:** `File` can be renamed/deleted and shared; `Communication.content` is editable; `Version` tracks metadata, not guaranteed binary content. Provenance must record `name`+`content_hash` so replacement/deletion is detectable.
- **Location/span:** native = whole-artifact only; sentence/page/section/image-region must be captured by interpretation if needed (optional, channel-dependent).
- **Access:** `File`/`Communication` are permission-checked; a reviewer may lack read access to a source (OPEN; no permissions changed).
- **Deal/Company/Contact:** sources are independent; `reference_*` is optional and is communication context only (STG0-R01).
- **Compound sources:** parent communication → specific attachment `File` → datum must be referencable (native supports multiple `File`s).
- **Common contract (conceptual):** required = channel, native source ref, evidence identity (`content_hash` if file-backed), timestamp, origin; optional = attachment identity, message identity, span, thread; not required = unified store, raw MIME, OCR structures.

No schema, DocType, field, or API is decided here.

---

## 8. AI Interpretation / Extraction Architecture (PROPOSAL)

- **Reuse:** none for AI (no code exists).
- **Design intent (`PROPOSAL`):** a provider-abstracted, server-side interpretation step that consumes a native source and emits a **proposal set** (typed proposed values) — never a CRM write.
- **Inputs:** source text/media already stored natively.
- **Outputs:** proposed values with target domain, confidence, and source locator (message id / attachment name / text span where available).
- **Isolation:** the interpretation step has **no authoritative write path**; it may only create/update proposal records.
- **Failure:** must not write authoritative data; must record failure state and surface it.
- **Schema and provider remain OPEN** (§19, §23).

---

## 9. Proposal Architecture (PROPOSAL — schema OPEN)

Conceptual contract (from FK-D18 §5–§6; Plan §F). Not a schema.

| Property | Purpose |
|---|---|
| proposed value | the AI-extracted candidate |
| target CRM datum / domain | e.g., shared field, component, requirement line domain, allocation |
| target scope | Deal-level or pre-Deal (candidate resolution) |
| source reference | native source object (Communication / WhatsApp Message) |
| source location / span | message id, attachment, segment |
| confidence | AI uncertainty indicator (never authority) |
| proposal state | proposed / accepted / edited+accepted / rejected / deferred |
| reviewer | human who disposed |
| disposition | accept / edit+accept / reject |
| edited value | human-corrected value (when edited) |
| approval attribution | who/when |
| resulting authoritative reference | pointer to the value created on the Deal/FJK model |

**Explicitly OPEN:** the final representation (DocType vs child table), field names, and whether candidate resolution and value proposals share one structure.

---

## 10. Company / Contact / Deal Candidate Resolution (PROPOSAL)

Governance rule (`FROZEN` per review resolution): AI may **propose candidate** Company/Contact/Deal matches; AI may **never resolve or promote** them.

### 10.1 Native relationships (`FACT`)

- `CRM Organization` master (`crm_organization.json`); `Contact` master with `company_name` and a `links` Dynamic Link child table (Contact→Organization/Deal) (`frappe/contacts/doctype/contact/contact.json`).
- `CRM Deal` has `organization` (Link), `contact` (Link), and `contacts` (child `CRM Contacts` with `contact`, `is_primary`) (`crm_deal.json`, `crm_contacts.json`).
- The CRM WhatsApp validator resolves phone → Contact → (primary `CRM Contacts`) → Deal and sets `WhatsApp Message.reference_*` (`crm/api/whatsapp.py:37`; `crm/integrations/api.py:141`). **This is a silent technical association and is directly relevant to FK-D10.**

### 10.2 Design (`PROPOSAL`)

- Candidates are stored as **proposal records** (candidate type = Company | Contact | Deal | New-Deal | Amendment), each with candidate reference + confidence + source. They are **not** written to authoritative link fields (`organization`, `contact`, `contacts`, `Communication.reference_*`).
- Human dispositions:
  - **Accept existing** → operator (or a controlled action after explicit approval) sets the authoritative link.
  - **Edit** → operator picks a different existing master.
  - **Reject** → candidate retained; no authoritative write.
  - **New Deal / new Company / new Contact** → operator creates via native flows (SOP §3–§5); never automatically.
- **Ambiguity** → resolve to human; no silent assignment.
- **Contact scoping** to avoid unrelated contacts: candidate Contact proposals must be scoped by candidate/proposed Organization and present the Organization context to the reviewer.

**Reported observation / risk (not resolved here):** the existing phone→Deal heuristic (`crm/api/whatsapp.py:37`) is a silent technical association that the FK-D10 rule restricts for *authoritative* Deal determination. This design treats that link as non-authoritative and requires human confirmation for Deal resolution; the discrepancy should be reviewed by governance (see §26, O-06).

---

## 11. Requirement / Allocation Proposal Flow (PROPOSAL)

- AI may propose: shared context values, components, requirement lines (per domain), guide requirements, activity items, transport/accommodation allocation candidates (`FROZEN` permitted set: FK-D18 §4.1; Plan §E).
- Proposal targets map to the **existing** FJK structures (§5.3); on approval, promotion writes to those structures.
- Allocation remains **operator-decided** (FK-D18 §4.2; HF-06/HF-08 advisory validation). AI proposals for allocations are candidates only.

---

## 12. Human Review / Approval Architecture (PROPOSAL)

Technical design (distinct from approved UX):

- **Surface:** extend the existing `fjk-workspace` Vue app with a review view (e.g., a "Review" tab) calling new FJK APIs. No native-DocType form is required for review, though candidates could also be inspected in Desk.
- **Operator sees:** the proposal value(s), target, confidence, and the **source evidence** (existing evidence pattern at `App.vue:442–449`).
- **Actions:** Accept / Edit+Accept / Reject per proposal (or in batch, per governance), with attribution.
- **Candidate decisions:** accept existing master / create new / reject (§10).
- **Promotion gating:** promotion occurs only through an approval endpoint that verifies a recorded human disposition; there is no direct AI write path.
- **Auditability:** dispositions recorded on the proposal; optionally a native `Comment` mirrored to the Deal timeline for human-readable trace.

This is a **design**, not approved UX.

### 12.1 O05 Human Approval Findings (2026-10-07)

Canonical summary: Decision Register §9.

- **Semantic model:** `AI Proposal → Human Review (read-only until explicit action) → Human Disposition (attributable) → Promotion Eligibility → Explicit Promotion (attributable) → Authoritative CRM Value`. Review ≠ disposition; disposition ≠ promotion; viewing/navigating implies nothing.
- **Granularity:** datum-level (O01/O02); run-level status is derived only and cannot override datum dispositions; partial approval permitted.
- **Actor/authority (`FACT`):** existing roles (`System Manager`/`Sales Manager`/`Sales User`/`CRM Manager`) + CRM Deal org-hierarchy `has_permission` + FJK mirror (`feeljapank_crm/permissions.py`, `_require_deal_access`); actor+timestamp via `Version`/`Comment`; existing patterns `set_info_complete` and quotation `confirm_version` (append-only, `confirmed_on`/`source`/`evidence`). No `Workflow` configured; native `Workflow` is a single-document state machine and cannot represent datum-level proposals.
- **Accept ≠ promotion:** acceptance = promotion-eligible; promotion = separate attributable event; one gesture may perform both but must record both; acceptance survives promotion failure; partial promotion auditable; stale accepted proposals must not silently overwrite newer values.
- **Separations preserved:** Deal resolution is a separate human decision (`reference_*` never counts); operator acceptance ≠ customer confirmation ≠ `Info Complete` ≠ Ready for Quotation.
- **Native insufficient for:** datum-level proposal/disposition entity; accept-vs-promotion at datum level; partial-approval rollup; reject/defer/supersede records; competing proposals; stale/conflict binding; human Deal-resolution record; idempotent/partial-safe promotion.
- **Governance decisions required:** authorized-approver role set/capability; single-gesture accept+promote policy; partial-approval promotion policy; stale/conflict handling; Deal-resolution recording/gate; reason requirements; concurrency/single-promotable-value enforcement.

No schema, DocType, field, API, or UI is decided here.

---

## 13. Provenance Architecture (PROPOSAL; O01 OPEN)

Required chain: `CRM datum → approved proposal/disposition → AI interpretation → source reference → original evidence`.

### 13.1 Native capability assessment (`FACT`)

| Link | Native mechanism | Sufficient? |
|---|---|---|
| Original evidence retained | `Communication`/`WhatsApp Message` + `File` | Yes |
| Source ↔ Deal linkage | `Communication.reference_*`, `Communication Link`, `WhatsApp Message.reference_*` | Partially (link exists; not per-datum) |
| Authoritative change history | `Version` (track_changes) + timeline aggregator | Yes (field-level) |
| Human notes/actions | `Comment` (`comment_by`, `published`), `ToDo`, `CRM Task` | Yes (free text / task) |

### 13.2 Native shortfall (evidence of insufficiency) (`FACT` + argument)

| Missing capability | Why native cannot express it | Evidence |
|---|---|---|
| Structured **per-datum** proposal | `Comment`/`Communication` store **free text**, not typed target/value/confidence | `comment.json`, `communication.json` |
| AI interpretation object distinct from authoritative truth | No native "proposal" entity; `Communication.comment_type` has no proposal semantics | `communication.json` |
| Per-datum **disposition** with attribution | `Comment` has `comment_by` but no target-datum binding or state machine | `comment.json` |
| **Link proposal → resulting authoritative value** | `Version.data` records old/new values but **no proposal reference** | `version.json`; `crm/api/activities.py:71–118` |
| Source **span** (which message/segment) per datum | `Communication Link` links docs, not datum-to-source spans | `communication_link.json` |
| **Prevent silent promotion** | Native fields are directly writable; no isolation boundary | `CRM Deal` link fields |

**Conclusion (`PROPOSAL`):** native structures are sufficient for evidence + history + notes, but **not** for a structured, enforceable provenance chain. A dedicated structure is recommended, with sources remaining native (see §21).

### 13.3 O01 Investigation Findings (2026-10-07)

Canonical summary: Decision Register §5. Requirements (not schema):

**Four layers that must stay distinct:** (1) source evidence (original, immutable); (2) AI interpretation/proposal (derived, non-authoritative); (3) human decision (attributed disposition); (4) authoritative CRM data.

**Required per proposed datum (minimum):** source reference (native source record + `content_hash` where a `File` exists); target domain/datum; proposed value; AI interpretation-event identity (proposal/run id, provider/model identity, timestamp, status); human disposition (accept / edit+accept / reject / defer) with reviewer + timestamp and original proposed value; on promotion, the link to the resulting authoritative value/field. **Useful but optional:** confidence; intra-artifact source span (page/section/message text); prompt/instruction version; review comments; channel-specific metadata. **Not required:** full prompt text retention, token-level logs, or audit depth beyond the disposition.

**Field-level vs record-level:** provenance must exist at the **datum/proposal level** linked to its source and human decision; a single per-Deal record is insufficient. Native `Version` already supplies field-level *old→new* (`version.py:102` `get_diff`) but carries no proposal/source/disposition reference — the precise gap.

**Edits/amendments:** preserve the **original AI proposal** and the **human-approved value** both; rejection retains the original. Native `Version` captures the final value change but not the AI original or the reason.

**Reprocessing:** proposals/runs are **append-only history**; a later AI result does not replace earlier ones.

**Deal-resolution provenance:** a human-resolved Deal link must be recorded with who/when/decision; native `reference_*`/phone/similarity/Telegram identity must **never** be recorded as human-confirmed Deal authority (STG0-R01).

**Cross-channel common contract:** one provenance contract across email / manual capture / future Telegram / deferred WhatsApp, plus channel-specific source metadata (e.g. email thread/message-id vs Telegram chat/sender id vs manual upload filename).

No schema, DocType, field, or API is decided here.

---

## 14. Authoritative CRM Promotion (PROPOSAL)

- Promotion writes **only** to the existing authoritative model: `CRM Deal` shared fields, FJK child tables, allocation tables (§5.3).
- Promotion is performed by an approval action that requires a recorded disposition; the AI layer has no authoritative write path.
- Promotion reuses existing validation (`d1.validate_deal_requirements`) so the authoritative model stays consistent.
- `Version` continues to record the resulting field changes; the proposal records the back-reference.

### 14.1 O04 Proposed ↔ Authoritative Findings (2026-10-07)

Canonical summary: Decision Register §8.

- **Targets (`FACT`):** 14 `fjk_*` shared fields + 6 FJK child tables on `CRM Deal` (components, requirement lines, guide requirements, activity items, transport/accommodation allocations); native `CRM Deal`/`Organization`/`Contact`. There is **no FJK write API** for requirement/allocation rows.
- **Native sufficient:** Information-Status separation; prior-authoritative-value reconstruction and change history (Version `changed`/`row_changed`).
- **Native partial:** existing-target identification (strings + child hash `name`); stale-proposal detection (Version + timestamps); promotion attribution (`Version.owner`/`modified_by`).
- **Native insufficient:** proposal entity; typed per-datum disposition; **accept ≠ promotion at datum level**; reject/defer/supersede records; competing proposals; reprocessing history; **proposal → authoritative value link**; human Deal-resolution record; idempotent/partial-safe promotion; identity for not-yet-created targets.
- **Required semantics:** target = doctype + record (or "new") + field/child table + logical datum key; promotion = explicit, recorded separately from acceptance, attributable, non-destructive, bidirectional, idempotent, partial-failure auditable; correction additive; Deal resolution a separate human decision.
- **Invariants (15):** AI never authoritative alone · acceptance attributable · promotion attributable · original proposal immutable · edits preserve original · prior value reconstructable · reject cannot silently promote · reprocessing append-only · competing proposals independently traceable · Deal resolution separate · confirmation ≠ acceptance · Information Status ≠ proposal state · native context ≠ Deal authority · promotion idempotent/partial-safe · correction additive.

No schema, DocType, field, API, or UI is decided here.

---

## 15. Information Status / Info Complete Interaction (PROPOSAL)

- Information Status vocabulary (`FROZEN`/existing): `KNOWN / MISSING / TO CONFIRM / CUSTOMER-CONFIRMED / NOT APPLICABLE`.
- `SELECTED ≠ COMPLETE ≠ READY FOR QUOTATION` (governance distinction).
- **Info Complete** remains operator-controlled, reversible, audited (`api.py:191`), and is the Stage 0 exit gate.
- **AI cannot mark Info Complete** (`FROZEN`). Unapproved proposals do not count toward readiness or Info Complete.
- Designed interaction (`PROPOSAL`): approvals update the same status vocabulary; the readiness/summary APIs reflect only approved data.

---

## 16. Failure / Ambiguity Handling (PROPOSAL)

| Case | Design |
|---|---|
| AI/provider failure | No authoritative write; proposal marked failed; surfaced to operator |
| Ambiguous Deal context | No silent assignment; escalated to human (candidate resolution) |
| Missing information | Recorded as `MISSING`/`TO CONFIRM`; never fabricated |
| Low confidence | Still proposal-only; confidence shown, not authority |
| Rejected proposal | Retained as evidence; no authoritative write |
| Deferred proposal | Remains open; does not count toward Info Complete |

---

## 17. Security / Data Handling (OPEN — evidence-bounded)

**Known (`FACT`):**
- WhatsApp webhook HMAC-SHA256 guard present (`ark_whatsapp_guard`, `hooks.py:257`).
- Secrets (`db_password`, `whatsapp_app_secret`, `encryption_key`) live in `bench/sites/crm.localhost/site_config.json`, which is excluded by `.gitignore` (`/bench/*`).
- No AI provider, key, or egress exists.
- FJK record access mirrors the linked Deal (`permissions.py`).

**OPEN (must be decided at the security gate):**
- Provider selection and provider-side data handling (requires provider confirmation).
- What data may leave the system and under what minimization.
- Retention/deletion of sources and derived data.
- Logging and log redaction.
- Credential storage mechanism for any provider key.

No security claim is made beyond observed configuration.

### 17.1 O08 Runtime Security/Data-Handling Evidence (2026-10-07, read-only)

Runtime inspected via the live `crm-frappe-1` container with read-only queries (no secrets printed).

| Item | Finding | Class |
|---|---|---|
| AI provider credentials | **None present** (no AI keys in `site_config.json`; `.env` has only DB/ADMIN passwords and is untracked) | FACT |
| `site_config.json` key names | `allow_tests, db_name, db_password, db_type, developer_mode, encryption_key, mute_emails, server_script_enabled, whatsapp_app_secret` | FACT |
| Secrets tracked in git | No — `site_config.json` and `.env` are gitignored/untracked | FACT |
| WhatsApp webhook guard | HMAC-SHA256 (`ark_whatsapp_guard`) | FACT |
| AI egress | None exists; no adapter, no calls | FACT |

**Provider-independent requirements** (decidable now): HTTPS only; no secret in source; minimum-necessary payload; no authoritative AI write; provenance preserved; failure isolation; timeouts/retries; structured-output validation; logging without secrets/source over-exposure.
**Provider-dependent requirements** (now expressible after O07): retention period; model training/use of submitted data; regional processing; subprocessors; deletion guarantees; enterprise/privacy controls; contractual restrictions.

### 17.2 O08 Investigation Findings (2026-10-07, read-only)

Canonical summary: Decision Register §12; Decisions §3K.

- **Status:** O08 **investigation complete — READY FOR GOVERNANCE RESOLUTION**; recommended **conditional approval**. Egress unauthorized; O07 conditional approval remains conditional until the O08 gate is satisfied.
- **Data-minimisation (`MUST`):** payload built inside the FJK boundary; send only the source content required for interpretation; categorically exclude credentials/secrets/tokens, DB/infra details, internal URLs, other customers' data, unrelated correspondence, and internal CRM metadata; masking/pseudonymisation of names/phone/email where interpretation permits (`SHOULD`).
- **Secrets (`MUST`):** AI input payloads must never intentionally contain application credentials/secrets; pre-egress validation/redaction mandatory; credentials server-side only; logs/errors never echo secrets.
- **Provider policy (`MUST`, vendor-agnostic):** no training/improvement on submitted data; defined retention + deletion; transient-vs-persistent understood; abuse/safety-review handling understood; no secondary use; subprocessor transparency; processing location known. Zero-retention is `SHOULD`.
- **Logging vs provenance (`MUST`):** retain provenance identity + run metadata (provider, model id/version, request/response id, timestamp, run state, usage, error class); provenance stores **references**, not duplicated source content; full prompts/responses are not ordinary-log material (per O01).
- **Retry/failure (`MUST`):** retries re-apply redaction, do not broaden payload, do not bypass approval, bound repeated external processing (dedupe); failure ⇒ no authoritative write (O02 run states).
- **Untrusted content (`MUST`):** source material is untrusted data, not system authority; AI output is untrusted external input — schema-validated, malformed/unexpected rejected, never directly executes CRM actions (prompt-injection containment).
- **Access control (`PROPOSAL`):** reuse Frappe/FJK roles + Deal-mirror permissions for trigger/view/approve/reprocess/metadata; no new roles created.
- **Adapter (`MUST`):** server-side only; no frontend/provider direct access; centralised redaction/logging/timeout/retry; provider metadata captured without provider-specific authority; provider failure isolated; provider swap preserves provenance semantics.
- **Jurisdiction (`OPEN`):** processing location / residency / cross-border transfer requires a business/legal/security determination; no legal conclusion asserted.
- **Config note (`FACT`/`SHOULD`):** local site has `server_script_enabled=1` and `developer_mode=1`; hardening review recommended for any customer-data instance (no change made).
- **Provider data-handling (O08-P, 2026-10-07, `FACT`):** deepseek `deepseek-flash` provider gate = **B — CONDITIONAL CLOSE**. First-party evidence: ToU §4.3 limited de-identified opt-out improvement right; context caching persists input prefixes to disk by default; no API retention period / deletion mechanism / subprocessor list / logging policy disclosed; governing law = mainland PRC. **P1–P6 OPEN; P7 PARTIALLY ESTABLISHED** + internal decision. **PASS:** HTTPS, server-side API-key auth, model/response identity. Detail: DeepSeek evidence doc §11.
- **Governance decision (2026-10-07 — SELECTED, risk acceptance):** DeepSeek-Flash **selected** for Stage 0 implementation; provider-policy items **P1–P7 accepted as Known/Accepted Residual Risk — Deferred Assurance** (risk acceptance, **not** closure). This does **not** weaken the provider-independent O08 controls, FK-D18 AI authority (INTERPRET → EXTRACT → PROPOSE), O05 human approval, or the minimum-necessary egress rule. Reopen triggers: Register §12.2 (STG0-D17). FK-D12 implementation must implement the carried-forward requirements: `finish_reason` check + app-side schema validation + never-promote-unvalidated + never write model output directly to authoritative CRM; size token limits / control thinking mode (not hardcoded 8000); preserve O01/O02/O04/O05 provenance; Deal resolution `selected=null`; Info-Status boundary (no CUSTOMER-CONFIRMED / Info Complete / Ready for Quotation).

---

## 18. Channel Scope (PROPOSAL / OPEN)

| Channel | Available (`FACT`) | Preservation mechanism | AI-input feasibility | Security implication |
|---|---|---|---|---|
| WhatsApp | Yes (frappe_whatsapp + HMAC guard) | `WhatsApp Message` + `File` | Text; media types (image/document/audio) via content_type | HMAC guard; app secret |
| Email | Mechanism exists (Frappe `Communication` + CRM hooks); account config OPEN | `Communication` + `File` | Text + attachments | Email account credentials |
| Operator manual | Yes (native CRM + FJK workspace) | Native (typed by operator) | N/A (already structured) | Lowest |
| Phone/call | `CRM Call Log` + Exotel/Twilio settings exist | Call log; recording handling (guarded URL fetch) | Audio transcription (deferred/prohibited authoritative) | Telephony provider |

- **Recommended initial scope (`PROPOSAL`):** manual operator input + one text-centric channel (WhatsApp text and/or email), with attachments preserved but extraction limited. **Final scope is OPEN** for governance (O06).
- **Excluded initially:** authoritative auto-routing, authoritative classification, and audio/video processing (Intake Direction v0.2 §5).

### 18.1 O06 Runtime Channel Evidence (2026-10-07, read-only)

Runtime inspected via the live `crm-frappe-1` container (counts/booleans only; no secrets printed).

| Channel | Repository capability | Runtime configured? | Source preservation | Suitable for initial Stage 0? |
|---|---|---|---|---|
| WhatsApp | Yes (`frappe_whatsapp` + `ark_whatsapp_guard`) | **NO** — 0 `WhatsApp Account`, defaults null, 0 `WhatsApp Message` | `WhatsApp Message` + `File` | Not currently operational (needs account configuration) |
| Email | Yes (Frappe `Communication` + CRM hooks) | **PARTIAL** — 1 `Email Account` ("FeelJapanK CRM", Gmail), `enable_outgoing=1`, `default_outgoing=1`, **`enable_incoming=0`** | `Communication` + `File` | Outbound only; **inbound disabled** |
| Operator manual | Yes (native CRM + FJK workspace) | **YES** (always available) | Native (operator-entered) | **Yes — currently the only operational inbound path** |
| Phone/call (telephony) | Yes (`CRM Call Log` + Exotel/Twilio doctypes) | **NO** — 0 `CRM Telephony Agent`, 0 `CRM Call Log` | Call log + guarded recording fetch | Not configured |

Other runtime facts (`FACT`): installed apps `frappe, crm, frappe_whatsapp, ark_whatsapp_guard, feeljapank_crm`; `Communication` count = 0; `File` count = 2 (both unattached); `CRM Deal` count = 21.

**Material finding:** **no inbound customer-communication channel is currently operational.** WhatsApp is unconfigured; email inbound is disabled; telephony is unconfigured. Enabling any live inbound channel is a configuration/ops action **not authorized** here.

- **Recommended initial scope (`PROPOSAL`):** begin with **operator-manual intake** (already operational, native source preservation) as the baseline; treat live inbound WhatsApp/email as a later increment gated by explicit channel-configuration authorization. **Final scope remains OPEN** (O06).
- Source-preservation assessment (for the manual baseline): original content, sender/recipient, timestamp, attachments, source identity, and access path are all supported by native `File`/`Communication`/`WhatsApp Message`; an **access path for human review** for manual intake is via the FJK workspace. No native gap found for the manual baseline; thread/reference preservation depends on the channel (only relevant once a live channel is enabled).

### 18.2 O06 Channel Strategy Alignment (2026-10-07)

Operator-aligned Stage 0 channel strategy (recorded; enablement of any live channel is a separate operational authorization, not authorized here):

**CORE STAGE 0 INPUTS**

1. **Inbound email** — a **first-class intended customer-data input channel**. Frappe email infrastructure is operational and already used for notification/outbound/CRM email; inbound reception is **not currently enabled/configured**. This is **not a "deferred" channel**: it is architecturally supported and pending enablement.
2. **Manual source capture** — the **immediate operational baseline**: operator upload/preservation of screenshots, images, PDFs, documents, and other artifacts as source, kept independent of AI interpretation. This is the baseline path for WhatsApp-originated communication while live WhatsApp inbound is deferred.

**DEFERRED**

3. **Live WhatsApp inbound** — explicitly deferred (setup effort disproportionate to the immediate Stage 0 objective; manual capture sufficient). WhatsApp-originated flow: `Customer WhatsApp → operator captures screenshot/attachment → upload/preserve source in CRM → AI interpretation → proposed data → human review`. STG0-R01 **Conditional A** remains unchanged (native phone-derived references are provisional context only; never human-confirmed Deal authority).

**INTERNAL-ONLY CANDIDATE**

4. **Telegram** — internal-only operator/system communication and intake; **not** a customer communication channel; **implementation AUTHORIZED (2026-10-08, operator)** (see §18.3).

### 18.3 Telegram Internal-Only Feasibility (2026-10-07, read-only) — implementation AUTHORIZED 2026-10-08

> **Authorization (2026-10-08, STG0-D18):** the operator revoked the prior "Telegram build pending / not authorized" state and **authorized the Telegram implementation** (internal-only). Preserved: transport-only role; notifications ≠ D12-E approval; no authoritative CRM authority via Telegram metadata. Still required for the build: approach selection; O08-class security/data-handling; source-preservation mapping; a scoped Telegram BUILD PLAN.

**Existing capability (`FACT`): none.**
- Installed apps: `frappe, crm, frappe_whatsapp, ark_whatsapp_guard, feeljapank_crm` — no Telegram app.
- No Telegram DocType, hook, scheduler job, integration, or config reference; no `telegram` keys in `site_config.json`/`.env`.
- `apps/crm/README.md` only links to a community Telegram group (not an integration). `frappe_whatsapp/public/js/frappe_whatsapp.js` contains a mislabeled comment ("Send To Telegram") but implements **Send To WhatsApp** (not Telegram).
- `docs/Frappe-CRM-Environment-Foundation-Freeze.md:158` lists "Telegram operational controls" as **not frozen**.
- `docs/business/Field-Japan-K-Business-Workflow-Requirements-v0.1.md` §32 "Explicitly Deferred Decisions" includes "Telegram operational functionality".

**Candidate approaches (conceptual only; none selected):** community Frappe Telegram app; a future small Bot-API integration (webhook or long-polling); a generic webhook intake. **Not selected, not installed.**

**Internal intake feasibility (`EVIDENCE DEPENDENCY`):** the Telegram Bot API conceptually supports documents/photos/generic files with captions and metadata (message id, date, chat id, sender id), which could be preserved as native `File` + a source record. Feasibility is plausible but **unverified** without a bot/app and official Bot-API documentation — recorded as an evidence dependency, not a decision.

**Internal communication feasibility (conceptual):** the same mechanism could later push `CRM/System → Telegram → Operator` notifications (e.g., new source, proposal ready, ambiguity, failure). The **authoritative approval must remain in the Stage 0 human-review architecture**; Telegram is transport only.

**Authority boundary (`FROZEN`-aligned):** Telegram metadata MUST NOT automatically establish authoritative Company/Contact/Deal, amendment/new-request, authoritative requirements, customer confirmation, or Info Complete. Consistent with FK-D10, FK-D12, FK-D18, and STG0-R01 Conditional A.

**Security / data handling (`OPEN`; O08-class review required):** Telegram would introduce an additional **third-party data processor** carrying customer screenshots/attachments; a bot token is a secret; chat/sender identifiers are exposed; Telegram-side retention is a provider-dependent question. Telegram intake must **not** be treated as equivalent to local/manual intake. No security approval is made; provider/legal confirmation is an **evidence dependency**.

---

## 19. Provider Abstraction (PROPOSAL — provider OPEN)

Requirements (`PROPOSAL`, provider selection `OPEN`):
- Request/response over HTTPS; API key/token auth.
- **Structured output** capability (JSON schema / function calling) for typed proposals.
- Timeouts, retries with backoff, and explicit failure states.
- **Provider-agnostic adapter interface** inside `feeljapank_crm` so the provider is swappable and no vendor SDK couples core logic.
- Full auditability of requests/responses (without leaking secrets); no silent fallback that writes authoritative data.
- Redaction/minimisation hooks for customer data before egress.

No provider is selected or connected.

### 19.1 O07 Investigation Findings (2026-10-07, read-only)

Canonical summary: Stage 0 Decision Register §11; Decisions §3J.

- **Status:** O07 **CONDITIONALLY APPROVED (category-level)**; no provider selected or connected.
- **Category conclusion (`PROPOSAL`):** external hosted LLM API is the preferred category behind the adapter above; self-hosted/local is a viable alternative (requires FK-D12 review); hybrid routing is optional and multiplies O08 evaluations.
- **Metadata (`FACT` / input to O01):** capture provider identity, returned model string + version/snapshot where available, response id, timestamp, usage, finish/refusal reason, plus the app-generated run/proposal id. The app owns the authoritative provenance record. **OPEN risk:** model alias/snapshot drift.
- **Failure (`PROPOSAL`, V27/V52):** map provider error taxonomy (auth / rate-limit / timeout / 5xx / malformed / refusal / oversized) to O02 run states; provider failure must never produce an authoritative write.
- **Reprocessing (`PROPOSAL`, O02):** model change → new run; history immutable; no recency winner; LLM output is nondeterministic (no reproducibility assumption).
- **O08 boundary:** provider data-handling (residency, retention, training-use, zero-retention controls, subprocessors) recorded as inputs to O08, not security approval.
- **OPEN:** Japanese/mixed-language extraction quality (synthetic bake-off); Stage 0 volume/cost sizing; document/OCR/transcription scope.
- **Candidate verification (2026-10-07, FACT/INCONCLUSIVE):** candidate `deepseek-flash` (DeepSeek-V4.1-Flash) verified from first-party docs — HTTPS, server-side API-key auth, `model` + `system_fingerprint` + request/response `id`s, JSON output (`response_format={"type":"json_object"}`, valid-JSON only) + tool calls (no strict `json_schema` ⇒ **app-side schema validation mandatory**), distinguishable error codes (400/401/402/422/429/500/503). Provider-policy gate **CONDITIONAL** (API-input training/retention/deletion/subprocessors not clearly established); synthetic bake-off **EXECUTED** 2026-10-07, synthetic-only — 9/9 behavioral tests PASS (malformed-output boundary PARTIAL; injection/Deal/Info-status boundaries held). Operational notes: thinking mode default with large `reasoning_tokens` (size `max_tokens` or disable thinking); prompt caching effective; `model`/`system_fingerprint`/`id`/`created`/`usage` metadata available. Classification: **B — CONDITIONAL PASS**; recommend Option 1 (select conditionally). Evidence: `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-DeepSeek-Flash-Provider-Verification-v0.1.md`.

---

### 19.2 FK-D12 AI Adapter Architecture (PLAN — 2026-10-07)

Full plan: Implementation Plan §FK-D12. Design summary:

- **Boundary:** a module inside the existing FJK app (`feeljapank_crm/ai/`), server-side only; provider-agnostic `AIProvider` interface; `DeepSeekProvider` is the only current implementation (`deepseek-flash`). No new app/layer; no vendor SDK.
- **Provider independence:** provider-specific detail confined to the adapter; normalized `AIRequest`/`AIResult`; the proposal/provenance model is provider-independent (provider swap preserves provenance semantics).
- **Request contract:** versioned FJK instruction + untrusted source (delimited) + minimal context + output-contract ref; excludes credentials/secrets/infra/other-customer/unrelated data (minimum-necessary egress).
- **Security boundary:** untrusted source cannot override instructions; fixed provider-host allowlist; input/output size guards; rate limiting; bounded retries; response validated, never executed as a CRM action.
- **Validation pipeline:** transport → `finish_reason` → JSON → schema → semantic → provenance binding → proposal. `finish_reason=length` is rejected as incomplete even if JSON parses.
- **Hard authority boundary:** `adapter → proposal → human disposition → promotion mechanism → authoritative CRM`; the adapter writes nothing authoritative and holds no Deal/Company/Contact/confirmation/Information-Status authority. Promotion is out of the first slice.
- **Minimum new representation (PROPOSED):** `FJK AI Interpretation Run` + `FJK AI Proposal` (native Comments/Version/Activity Log insufficient per O01/O02/O04/O05).

---

## 20. Native-vs-New-Structure Analysis (PROPOSAL)

| Capability | Reuse native (`FACT`) | New structure needed? | Evidence / reasoning |
|---|---|---|---|
| Org/Contact/Deal masters | Yes | No | `crm_organization`, `Contact`, `CRM Deal` |
| Source preservation | Yes | No | `Communication`, `WhatsApp Message`, `File` |
| Source↔Deal link | Yes (doc-level) | Partially | `Communication.reference_*`, `Communication Link` |
| History/audit | Yes | No | `Version`, `Activity Log`, timeline |
| Human notes/actions | Yes | No | `Comment`, `ToDo`, `CRM Task` |
| Downstream requirements/allocations/info status | Yes | No | FJK DocTypes + `api.py` |
| Structured AI proposal + disposition | No | **Yes** | §13.2 |
| Per-datum provenance → authoritative link | No | **Yes** | §13.2 |
| Candidate resolution storage | No | **Yes** (can share the proposal structure) | §10 |

---

## 21. Required New Structures, if any (PROPOSAL — evidence-based)

**Why existing native/FJK structures are insufficient:** see §13.2 — native free-text notes lack typed target/value/confidence, disposition state, source span, and a link to the resulting authoritative value; `Version` records the *effect* but not the *proposal/AI interpretation/source* that caused it; native link fields are directly writable and provide no isolation boundary to prevent silent promotion.

**Proposed minimum additional structure (`PROPOSAL`, subject to FK-D12 approval):**
1. A **Stage 0 proposal/provenance structure** (representation OPEN): either a standalone FJK DocType with an optional `deal` link, or a child table on `CRM Deal` plus a pre-Deal variant. It holds the conceptual properties in §9, including source references to native `Communication`/`WhatsApp Message`/`File`.
2. **Access control** mirroring Deal permission (`has_permission` hook) for the new structure.

**Evidence against over-building:** no new source store, no new Company/Contact/Deal master, no new requirement/allocation model — all of those are reused. The only *proven* gap is the proposal/provenance representation.

Whether the final representation is one structure or two, its fields, and its naming remain **OPEN** pending governance.

---

## 22. Data Flow (PROPOSAL)

```
Channel → native source object (Communication / WhatsApp Message + File)
        → intake reference (proposed structure, source_doctype/source_name)
        → AI interpreter (provider adapter) → proposal records (non-authoritative)
        → human review
             · Deal confirmation (explicit human step; native reference_* is provisional only)
             · value disposition (accept / edit+accept / reject)
        → on accept: promotion to existing authoritative model (Deal fields / FJK child tables)
        → Version records the change; proposal stores back-reference
        → Information Status updates → operator sets Info Complete (human only)
```

Confirmed Deal resolution is a required human step and is independent of the native phone-derived association (STG0-R01 — Conditional A).

---

## 23. State Transitions (PROPOSAL)

**Proposal states:** `proposed → accepted | edited+accepted | rejected | deferred`; re-open allowed to `proposed` (reason recorded). Terminal: `accepted`, `edited+accepted`, `rejected` (retained).

**Intake/Deal states:** `unresolved → candidate-suggested → human-resolved (existing Deal | new Deal | no-Deal/intake-holding)`.

**Deal info state:** unchanged native `status` vocabulary; Info Complete is a separate operator boolean (reversible).

No transition auto-promotes to authoritative without a recorded human disposition.

### 23.1 O02 Lifecycle Investigation Findings (2026-10-07)

Canonical summary: Decision Register §6.

Refinements to §23 (no schema decided):

- **Proposal states:** `PROPOSED → ACCEPTED | EDITED_ACCEPTED | REJECTED | DEFERRED`; plus explicit `SUPERSEDED` closure/link. `REJECTED` is terminal for the proposal; `DEFERRED` is non-terminal. `ACCEPTED`/`EDITED_ACCEPTED` are **promotion-eligible**, not the end of the lifecycle — **promotion is a separate recorded event** (refining the earlier "terminal" wording).
- **Run/processing states are separate:** `SUCCEEDED/FAILED/TIMEOUT/INVALID_OUTPUT/UNSUPPORTED_SOURCE/SOURCE_UNAVAILABLE/DUPLICATE` are AI-run states, not proposal states; FJK Information Status (`KNOWN/MISSING/TO CONFIRM/CUSTOMER-CONFIRMED/NOT APPLICABLE`) is separate again.
- **Append-only:** dispositions are new events; immutable facts = original proposed value/target, source identity, run identity, provider/model identity, initial timestamp. Reprocessing creates a **new** proposal; supersession must be **explicit**.
- **Accepted ≠ authoritative:** human acceptance enables promotion; AI never promotes; acceptance+promotion may be one gesture but two recorded steps.
- **Edits:** preserve original AI value + human-edited value + reviewer + timestamp; distinct from plain accepted.
- **Multiple/partial:** competing proposals for one datum may coexist and are independently reviewed; only one promotable accepted value per datum at a time; per-datum dispositions within a run.
- **Conflict:** existing authoritative value + new proposal ⇒ pending review; no auto-overwrite; explicit human decision.
- **Distinctions preserved:** human-accepted vs customer-confirmed; ordinary field proposal vs Deal-resolution proposal (separate human disposition; AI cannot confirm).

Technical direction (PROPOSAL): a dedicated representation appears necessary for the per-datum proposal lifecycle with append-only history and provenance links; **no schema, DocType, field, API, UI, or state machine is decided here.**

---

## 24. Permission / Authority Boundaries (PROPOSAL)

- New proposal structure access mirrors the linked Deal (`feeljapank_crm/permissions.py` pattern); pre-Deal proposals require a restricted intake role bundle (OPEN).
- AI interpreter is a **server-side component with no user session and no authoritative write permission**.
- Only the approval endpoint (called by an authorized human) may promote.
- No AI component may set `fjk_info_complete`, allocations' authoritative values, or create a Supplier Quotation.

---

## 25. Verification Mapping to V01–V48 (PROPOSAL)

| Design element | Verification rows |
|---|---|
| Source preservation | V01 |
| AI proposal isolation / no authoritative write | V02, V19, V21, V46 |
| Provenance chain (proposal ↔ source ↔ authoritative) | V03, V22, V23, V43 |
| Dispositions | V04, V05, V06, V07, V25 |
| Candidate resolution (existing/new/amendment/ambiguous) | V08, V09, V10, V16, V24, V29 |
| Requirement/allocation promotion (reuse existing model) | V11, V12, V26 |
| Information Status / Info Complete | V13, V14, V25, V29 |
| Failure / missing info | V15, V17, V27 |
| Security / egress / no provider coupling | V18, V28 |
| Native-first / no duplicate masters | V20, V26 |
| STG0-R01 phone→Deal (native + Stage 0 review surface) | V30–V48 |

Notes: V38/V39 apply to the **Stage 0 review surface**, not to native CRM (Conditional A authorizes no native remediation). V40 is an **authority** requirement (Stage 0 does not treat an explicit outgoing association as confirmation), not a requirement to change native overwrite behavior. The canonical matrix is the Verification Plan (`docs/evidence/phase1/…-Verification-Plan-v0.1.md`).

No verification is executed; no PASS is claimed.

---

## 26. Risks / Open Questions

- **O-01 Provenance model** — OPEN (native-sufficient vs new structure). This design recommends a new structure (`PROPOSAL`).
- **O-02 Proposal lifecycle** — PROPOSAL offered (§23); approval OPEN.
- **O-03 Source storage/access** — reuse native; OPEN for exact access/retention.
- **O-04 Proposed↔authoritative** — PROPOSAL offered (§14); approval OPEN.
- **O-05 Human approval mechanism** — PROPOSAL offered (§12); approved UX OPEN.
- **O-06 Channel scope** — PROPOSAL offered (§18); governance OPEN.
- **O-07 Provider** — requirements PROPOSAL; selection OPEN.
- **O-08 Security** — knowns documented; specifics OPEN.
- **O-09 Vague-request convention** — OPEN (SOP v0.2 §4 [OPEN]); alternatives in §10 and below.
- **Risk R-1** — existing phone→Deal silent association (`crm/api/whatsapp.py:37`) vs FK-D10; requires governance review (**§26A — STG0-R01**).
- **Risk R-2** — adding fields/structures touches FK-D13 protected areas; requires FK-D12.

**O-09 technical convention options (`PROPOSAL`; final OPEN):**
- A) Preserve source as native `Communication`/`WhatsApp Message`, optionally linked to Contact/Organization only (not Deal); use optional Lead (FK-D09) and/or a `ToDo`; no Deal, no requirements, no status changes. *Recommended minimal.*
- B) Also create a pre-Deal intake reference in the proposed structure.
- Option A avoids inventing a persistent holding object (SOP §4 forbids inventing a "Request/Holding Enquiry" object).

---

## 26A. STG0-R01 — Existing Phone→Deal Association

**Status:** investigation complete. Governance decision **APPROVED — CONDITIONAL A** (2026-10-07); see §26A.13. Historical investigation findings (26A.1–26A.12, 26B) are preserved unchanged.

### 26A.1 Component ownership (`FACT`)

The behavior is **native `crm` app (Frappe Technologies, v1.84.0)** — **not** `frappe_whatsapp`, **not** `ark_whatsapp_guard`, **not** FeelJapanK customization.

- Hook registration: `apps/crm/crm/hooks.py:180` — `"WhatsApp Message": { "validate": ["crm.api.whatsapp.validate"], "on_update": ["crm.api.whatsapp.on_update"] }`.
- Handler: `apps/crm/crm/api/whatsapp.py:37` (`validate`).
- Resolver: `apps/crm/crm/integrations/api.py:141` (`get_contact_lead_or_deal_from_number`) → `:158` (`get_contact_by_phone_number`) → `:302` (`get_contact`).
- Phone helpers: `apps/crm/crm/utils/__init__.py:14` (`parse_phone_number`), `:40` (`are_same_phone_number`).
- `ark_whatsapp_guard` only wraps the inbound webhook (`apps/ark_whatsapp_guard/.../hooks.py:257`); it does not touch Deal resolution.

### 26A.2 Execution path (`FACT`)

```
WhatsApp inbound webhook (frappe_whatsapp) → insert "WhatsApp Message" (ignore_permissions=True)
   (apps/frappe_whatsapp/.../utils/webhook.py:82 etc.)
        │  doc_event: WhatsApp Message.validate
        ▼
crm.api.whatsapp.validate(doc)                       [crm/api/whatsapp.py:37]
   phone_number = doc.from (Incoming) | doc.to (Outgoing)   [:38]
        ▼
crm.integrations.api.get_contact_lead_or_deal_from_number(phone)   [:141]
   → get_contact_by_phone_number(phone)               [:158]
        → parse_phone_number / normalize             [crm/utils/__init__.py:14]
        → get_contact(phone, ...)                    [crm/integrations/api.py:302]
             · search Contact Phone child (all numbers), join Contact, LIKE match  [:320–337]
             · for each matching Contact: if eraCRM Contacts {contact, is_primary:1} exists
                 → resolve parent Deal (first match) and return contact["deal"]   [:340–352]
             · else search non-converted CRM Lead by phone → "lead"               [:354–375]
             · else return Contact; else {"mobile_no": phone}                     [:377–384]
   → returns (docname, doctype) where doctype ∈ {CRM Deal, CRM Lead, Contact}
        ▼
validate sets:  doc.reference_doctype = doctype ; doc.reference_name = name   [crm/api/whatsapp.py:43–44]
   (silently overwrites any caller-provided reference when a match is found)
        ▼
WhatsApp Message.on_update → publish_realtime + notify_agent (notifications)  [:49–90]
```

### 26A.3 Exact conditions required for auto-association (`FACT`)

All of the following must hold:
1. A `WhatsApp Message` is inserted/validated (inbound webhook, or outbound from the CRM).
2. `doc.from` (Incoming) or `doc.to` (Outgoing) is present (`:38`).
3. A `Contact` (or non-converted `CRM Lead`) matches the number by the LIKE/validated-phone rules in `get_contact` (`:302–375`).
4. For Deal association specifically: the matched Contact has a `CRM Contacts` row with `is_primary = 1` whose parent is a `CRM Deal` (`:340–352`).

If (3)/(4) fail, the reference may be set to `Contact` or `CRM Lead`, or left unchanged. No exception propagates: failures are swallowed and logged (`:45–46`).

### 26A.4 Records/fields modified (`FACT`)

| Record | Modified? | Detail |
|---|---|---|
| `WhatsApp Message` | **Yes** | `reference_doctype`, `reference_name` set on the message being validated. |
| `Communication` | **No** | The WhatsApp path does not create/update `Communication` (only `crm/demo/utils.py` creates Communications, for demo data). |
| `CRM Deal` | **No** | No Deal field is written on ingestion. (Deal `communication_status` is only set by the separate `Communication` on_update path, `crm/utils/__init__.py:260` — not WhatsApp.) |
| `Contact` | **No** | Read-only lookup. |
| `CRM Lead` | **No** | Read-only lookup (non-converted leads only). |
| Other | `CRM Notification` | `notify_agent` creates notifications for assignees of the referenced record (`:61–90`); `publish_realtime` emits a socket event. |

### 26A.5 Single Deal / multiple Deals / no Deal / ambiguous (`FACT` + reasoning)

- **One Deal:** if the matched Contact is primary on that Deal → message references that Deal.
- **Multiple Deals:** a Contact may be primary on more than one Deal (`is_primary` uniqueness is enforced only **within** a Deal — `crm/fcrm/doctype/crm_deal/crm_deal.py:140`). `get_value("CRM Contacts", {"contact", "is_primary":1}, "parent")` returns **one** parent (order not deterministically tied to the current conversation) → the path can silently associate a message with an **old/incorrect** Deal.
- **No Deal:** message references the Contact (or Lead), or is left unresolved.
- **Ambiguous Contact:** multiple Contacts can share a number via `Contact Phone`; the query orders by `Contact.modified desc` and returns the first with a primary Deal → ambiguous inputs resolve silently, not to a human.
- **Multiple people on one number:** same as ambiguous Contact — first match wins.
- **Old/incorrect Deal:** yes, possible (see Multiple Deals), because the basis is phone + static `is_primary`, not the conversation's explicit commercial context.

### 26A.6 Timing relative to Stage 0 (`FACT`)

The association executes at `WhatsApp Message` **validate/insert** — i.e., at **ingestion time**, **before** any Stage 0 AI interpretation, proposal, or human review. It therefore predates and could pre-empt the intended human-controlled Deal resolution.

### 26A.7 Authority implications

- **No authoritative Deal field is mutated** (`FACT`): the Deal's identity/links are untouched.
- **But the message is silently associated** to a Deal/Lead/Contact, and that association **drives display and notifications** (`get_whatsapp_messages` used by `apps/crm/frontend/src/components/Activities/Activities.vue:551`; `notify_agent` `crm/api/whatsapp.py:61`).
- Therefore the mechanism is **non-authoritative at the record level** but **authoritative-in-effect at the communication-context level** (it decides which Deal the communication is shown under and who is notified), derived from phone only.

### 26A.8 FK-D10 assessment (`FACT` vs `FROZEN`)

FK-D10 / Communication Context Rule §2 (`FROZEN`):
> "A Deal must be identified by explicit commercial context." · "Explicit context takes precedence over phone matching whenever context exists." · "Phone matching is fallback only." · "Phone matching may suggest a Deal only where the opportunity is genuinely unambiguous." · "CRM must not silently guess the Deal."

The observed behavior:
- uses **phone only** (no explicit-context check);
- performs **no unambiguity check**;
- **silently** sets the association (does not ask a human);
- can choose among multiple Deals/Contacts by non-conversational ordering.

**Classification: C — conflicts with the frozen principle as written**, at the communication-context level, with the qualification that no authoritative Deal record field is mutated (so the conflict is not a data-model mutation). Governance may downgrade this to **B (non-authoritative, therefore acceptable)** only by explicitly designating the message-level reference as *non-authoritative* and requiring human confirmation before it is used for Deal resolution/provenance — or remediate per §26A.9.

**This remains OPEN.** Not resolved here.

### 26A.9 Stage 0 impact

| Stage 0 area | Interaction |
|---|---|
| Source preservation | None (source still preserved). |
| Proposal isolation | Indirect: an unconfirmed Deal context exists before proposals; AI must not inherit it. |
| Human approval | Interference: the message can appear under a Deal the operator did not approve (confirmation bias). |
| Existing/new Deal resolution | **Direct interference:** auto-link may present an old/wrong Deal as "existing". |
| Amendment vs new request | Could mislead operators toward treating a message as an amendment. |
| Provenance | The message→Deal link is phone-derived, not human-approved → provenance would misrepresent a human decision. |
| Ambiguous communication | Not escalated; first match wins. |
| Multiple Deals per Contact | Arbitrary selection. |
| Proposed human review workflow | Must treat any auto-reference as provisional and require explicit human Deal confirmation before it counts. |

### 26A.10 Dependency analysis (`FACT`)

Callers/dependents of the auto-association:
- `crm.api.whatsapp.validate` — sole caller of `get_contact_lead_or_deal_from_number` (`grep`: only `crm/api/whatsapp.py:41`).
- `notify_agent` / `publish_realtime` (`crm/api/whatsapp.py:49,61`) — depend on `reference_*`.
- `get_whatsapp_messages` (`crm/api/whatsapp.py:114`) and the CRM frontend Activities view (`apps/crm/frontend/src/components/Activities/Activities.vue:551`) — display by `reference_*`.
- Telephony (related, separate path): `crm/integrations/twilio/api.py:127` uses `get_contact_by_phone_number` to link `CRM Call Log` → Contact/Lead/Deal via `link_with_reference_doc` (`crm/fcrm/doctype/crm_call_log/crm_call_log.py`). Same phone heuristic, different surface.
- Tests encode the behavior: `crm/tests/test_integrations.py` (`test_get_contact_by_phone_number_prioritizes_contact_with_deal`, etc.).

**Changing/removing the behavior affects existing non-Stage-0 CRM behavior:** the WhatsApp tab on Deal/Lead/Contact, WhatsApp notifications, and (relatedly) telephony call-log linkage, plus the CRM integration tests. Any change is a modification to a **native app hook/behavior**, so it falls under `FK-D12` and the protected-areas rule, and must not be done without explicit authorization.

### 26A.11 Remediation options (`PROPOSAL` — no implementation)

| ID | Option | Type | Pros | Cons / impact |
|---|---|---|---|---|
| R-A | Accept the reference as **provisional/non-authoritative**; require explicit human Deal confirmation in Stage 0; AI/provenance must not treat `reference_*` as approved identity | Documentation/governance (no code) | Zero code change; satisfies "human-controlled" if enforced in Stage 0 flow | Existing auto-association remains for native CRM display/notifications |
| R-B | **Intercept/defer**: override the WhatsApp `validate` hook to **not** set `reference_*` for Stage 0 intake until human review | Code (hook override) | Strongest alignment with FK-D10 | Modifies native hook; affects WhatsApp tab/notifications; needs FK-D12 |
| R-C | **Mark provisional**: keep auto-reference but tag it as auto/unconfirmed; exclude from authoritative/provenance until human confirms | Code + schema | Preserves native UX; explicit state | New field/state (FK-D12); touches protected areas |
| R-D | **Remove** auto-association entirely | Code | Clean FK-D10 alignment | Breaks native WhatsApp display/notifications + tests + telephony expectation; FK-D12 |
| R-E | **Prefer explicit context** (thread/reply matching, operator-selected Deal) over phone-only | Code/design | Best long-term correctness | Larger change; FK-D12; still needs fallback policy |

**Recommended minimum (PROPOSAL):** adopt **R-A** immediately as the Stage 0 governance posture (no code change), and select **R-B** or **R-C** as the technical remediation at the `FK-D12` gate. Justification: R-A is the only option that requires no change to protected native behavior, and the conflict arises only if Stage 0 treats the auto-reference as authoritative — which the design forbids. R-B/R-C are the minimal technical fixes that remove the silent-authority risk if governance requires code-level enforcement.

### 26A.12 Unresolved governance questions (historical — superseded by §26A.13)

1. Is the message-level phone→Deal reference to be treated as **non-authoritative** (downgrade to B) or as a **conflict requiring remediation** (C)?
2. If remediation: R-B (intercept) or R-C (provisional tag) — and does it apply to WhatsApp only, or also telephony call-log linkage?
3. Is disabling/overriding native CRM behavior permitted under FK-D12/FK-D13, and with what blast-radius acceptance?
4. What is the required human-confirmation UX for Deal resolution in Stage 0?

### 26A.13 Approved Governance Decision — CONDITIONAL A (2026-10-07)

**Status: APPROVED — CONDITIONAL A.** This supersedes the OPEN status of §26A.12.

The existing native phone-derived WhatsApp/telephony association is accepted **only as provisional communication context**. Approved boundaries:

1. Native phone-derived `reference_doctype`/`reference_name` **remains unchanged** (no remediation).
2. The native reference is **NOT authoritative Deal resolution**.
3. The native reference is **NOT evidence of human Deal confirmation**.
4. The native reference is **NOT valid provenance** for an authoritative Deal relationship.
5. Stage 0 **must require explicit human Deal confirmation** before treating a communication as belonging to a Deal.
6. AI **may propose** a candidate Deal, but **may not confirm or promote** it.
7. The same boundary applies to the analogous **telephony Call Log** association.
8. R-B, R-C, R-D, R-E are **not selected or authorized**.
9. **No native CRM remediation** is authorized at this stage.
10. This decision **does not authorize BUILD**.

**Critical rule (must be explicit throughout Stage 0):**

> **Native communication context ≠ human-confirmed Deal relationship.**
> `WhatsApp Message → native phone match → Deal` must **never** be interpreted as `Human approval → Deal`. Only an explicit Stage 0 human disposition can establish the authoritative Deal relationship.

Consequences for this design:
- Any Step 0 use of `reference_*` is **provisional context only**; it cannot set Deal identity, cannot be consumed as approved context, and cannot appear in provenance.
- The proposal/provenance mechanism (§9, §13) must treat Deal resolution as a human-disposition item independent of `reference_*`.
- Telephony `CRM Call Log` links are subject to the same rule.

Remediation options (R-B/R-C/R-D/R-E, §26A.11, §26B.8) remain **documented but unselected**.

---

## 26B. STG0-R01 — WhatsApp Phone→Deal Context UI Investigation (Read-Only)

**Status:** investigation complete. Covered by the approved **CONDITIONAL A** decision (§26A.13); no remediation selected. Findings preserved unchanged below.

### 26B.1 UI surface (`FACT`)

- The Deal/Lead page is a tabbed panel: `Activity | Emails | Comments | Data | Calls | Tasks | Notes | Attachments | WhatsApp` (`apps/crm/frontend/src/pages/Deal.vue:568–620`). The **WhatsApp tab is conditional** on `whatsappEnabled` (`crm/api/whatsapp.is_whatsapp_enabled`, `composables/whatsapp.js`).
- The WhatsApp tab loads messages by **`reference_doctype`/`reference_name`** equal to the current document: `crm.api.whatsapp.get_whatsapp_messages(reference_doctype, reference_name)` (`components/Activities/Activities.vue:550–556`).
- Messages render via `WhatsAppArea.vue`; the input box (`WhatsAppBox.vue`) sends via `crm.api.whatsapp.create_whatsapp_message` passing the **current document** as `reference_doctype`/`reference_name` (`WhatsAppBox.vue` send handler).
- Real-time refresh is scoped to matching `reference_*` (`Activities.vue:579–585`).

### 26B.2 What the operator sees (`FACT`)

- A WhatsApp message with a phone-derived `reference_*` is displayed **inside that Deal's (or Lead's/Contact's) WhatsApp tab**, alongside human-sent messages, with **no visual distinction**.
- There is **no indicator** that the association was automatically inferred from phone (no "inferred"/"provisional"/"unconfirmed" string exists in the frontend — repo-wide search). No banner or badge identifies auto vs human-assigned context.
- The Organization/Contact are shown by the **Deal side panel** (`Deal.vue`), not as a property of the WhatsApp association; the WhatsApp tab itself does not state which Deal context it represents.
- Outgoing messages: `create_whatsapp_message` sets `reference_*` to the current Deal, but the subsequent `WhatsApp Message.validate` hook (`crm/api/whatsapp.py:37–44`) **overwrites** `reference_*` when the recipient phone matches another Contact/Deal/Lead. An operator explicitly sending from Deal X can therefore have the message re-associated to a different Deal Y.

### 26B.3 Case results

| Case | Current behavior | UI indication | Human correction possible? | Risk |
|---|---|---|---|---|
| One Deal | `reference_*` = that Deal; message shows in that Deal's WhatsApp tab | None (looks identical to a confirmed/context message) | No in CRM SPA | Low-moderate (correct here, but indistinguishable from inference) |
| Multiple Deals | `get_value("CRM Contacts", {contact, is_primary:1}, "parent")` returns **one** parent; ordering not deterministic | None | No in CRM SPA | **High** — message may appear under an arbitrary Deal; operator may treat it as the current request |
| No Deal | `reference_*` = Contact or Lead (or unresolved) | None; message appears under Contact/Lead, **not** the Deal | No in CRM SPA | Moderate — message invisible on the Deal; no prompt to resolve to a Deal |
| Old/Wrong/Ambiguous Deal | Older Deal (where Contact is primary) can become the context; explicit outgoing send can be overwritten | None | No in CRM SPA (Desk edit possible, see 26B.4) | **High** (confirmation-bias risk) — operator may treat an old Deal as the current request |

### 26B.4 Correction/removal capability (`FACT`)

- **CRM SPA:** none. `WhatsAppArea.vue` exposes only **Reply** (`messageOptions`, `:256–277`); `Forward`/`Delete` are commented out. There is no re-assign, unassign, or "confirm Deal" action.
- **Desk:** `WhatsApp Message` exposes `reference_doctype` (Link) / `reference_name` (Dynamic Link) as editable fields; `crm.api.whatsapp.add_roles` grants Sales Manager/User write on `WhatsApp Message`, so the reference **can** be edited in Desk. However this is not a CRM-UI flow, is not surfaced to the operator, and has **no confirmation/attribution semantics**.

### 26B.5 Human-confirmation boundary assessment

The data-level `reference_*` is non-authoritative (`FACT`), but the current UI provides **no** distinction between inferred and confirmed context and **no** correction path. Therefore, on its own, the native WhatsApp UI does **not** preserve a *clear* human-controlled Deal-resolution boundary: an operator viewing a Deal's WhatsApp tab has no signal that the association may be phone-inferred, and no in-context way to correct it.

**Assessment:** R-A (treat as provisional/non-authoritative) can function safely **only if** Stage 0 adds its own explicit human Deal-resolution/confirmation step and **excludes** the native `reference_*` from authoritative context and provenance. The native UI alone is insufficient for the boundary.

### 26B.6 Telephony assessment (`FACT`)

- The same phone inference exists for calls: `crm.integrations.twilio.api.create_call_log` → `link(contact_number, call_log)` (`twilio/api.py:113–123`) → `get_contact_by_phone_number` → sets `CRM Call Log` `links` (Dynamic Link) to Contact/Lead/Deal (`crm/fcrm/doctype/crm_call_log/crm_call_log.py`, `link_with_reference_doc`).
- Linked calls surface in the Deal's **Calls** tab via `get_linked_calls` (`crm/api/activities.py:379`) and `CallArea.vue`, with **no** inferred/confirmed indicator.
- **Conclusion:** telephony shares the same governance issue and **must be included in the same STG0-R01 decision**. (No telephony redesign is proposed.)

### 26B.7 Governance implication (evidence only — decision deferred)

The evidence supports:
- **A** is viable **only conditionally** — as a *data-level* provisional posture **plus** mandatory Stage 0-side human Deal confirmation and exclusion of `reference_*` from authority/provenance.
- **Unconditional A** is **not** supported: the UI gives no inferred/confirmed distinction and no correction path.
- **B** (remediation required) becomes necessary if Stage 0-side confirmation cannot guarantee the boundary, or if governance requires the UI itself to distinguish/allow correction.

Net: the evidence points to **C — a conditional/evidence-based position** (A + Stage 0-side enforcement), with **B** as the fallback. Final governance decision is not made here.

### 26B.8 Remediation capability implications (PROPOSAL — no selection, no design)

If remediation is required, the capability needed is one or more of:
- a UI distinction between inferred vs human-confirmed association;
- an operator action to confirm / correct / remove / re-attach the Deal association;
- prevention of silent overwrite of an explicit outgoing association;
- exclusion of unconfirmed associations from authoritative context and provenance (ties to O-01).

These restate R-B/R-C/R-E from §26A.11; **no option is selected**. Any implementation would require FK-D12 authorization and is out of scope here.

---

## 27. Implementation Dependencies

- Frozen FK-D18 + FK-D12 approval.
- Decision on O-01 provenance model (gates the structure).
- Decision on O-05 approval surface (UI).
- Decision on O-06 channel scope.
- Decision on O-07/O-08 provider + security.
- Existing FJK APIs/model (already present) and native sources (already present).

---

## 28. BUILD Prerequisites

1. Governance approves this design (PLAN REVIEW) and freezes the provenance/proposal model decision.
2. `FK-D12` high-risk gate passed for the new structure and any provider integration.
3. Security gate (O-08) closed with provider-specific confirmation.
4. Verification plan accepted; human acceptance criteria defined.
5. Explicit BUILD authorization per workstream.

Until then, **BUILD remains unauthorized.**

---

## 29. Explicit Non-Goals

- No implementation, schema, DocType, field, fixture, hook, API, frontend, permission, DB, config, integration, provider, key, migration, asset build, commit, or push in this task.
- No Supplier Quotation / Customer Quotation / Trip design.
- No provider selection or connection.
- No reopening of FROZEN decisions.

---

## Appendix A — Alternatives Considered (O01/O04)

| Option | Description | Pros | Cons | Verdict |
|---|---|---|---|---|
| A. Native-only | Use `Communication`+`Comment`+`Version`+`Activity Log` | native-first, no new structure | no typed proposal, no per-datum disposition, no proposal↔value link, no isolation | Insufficient (`FACT` reasoning §13.2) |
| B. Dedicated FJK proposal structure + native sources | New structure stores proposals; sources stay native | enforceable isolation, structured provenance, auditable | new structure; needs FK-D12 | **Recommended (`PROPOSAL`)** |
| C. Child table on `CRM Deal` only | Deal-scoped proposal grid | uses Deal permissions; no standalone DocType | cannot hold pre-Deal candidates; heavier Deal doc | Partial; may complement B for post-Deal |

---

## Appendix B — Evidence Index

- Apps/versions: `bench/sites/apps.txt`, `docs/versions.lock`.
- Native: `apps/frappe/frappe/core/doctype/{communication,communication_link,comment,version,file,activity_log}/*.json`.
- WhatsApp: `apps/frappe_whatsapp/.../utils/webhook.py`, `.../doctype/whatsapp_message/*.json`; `apps/ark_whatsapp_guard/ark_whatsapp_guard/hooks.py`.
- CRM: `apps/crm/crm/hooks.py`, `crm/utils/__init__.py`, `crm/api/whatsapp.py`, `crm/api/activities.py`, `crm/api/doc.py`, `crm/integrations/api.py`, `crm/fcrm/doctype/{crm_deal,crm_organization,crm_contacts,crm_task,fcrm_note}/*`.
- FJK: `apps/feeljapank_crm/feeljapank_crm/{api.py,d1.py,permissions.py,hooks.py,setup.py}`, `.../doctype/*`, `.../page/fjk_workspace/*`, `frontend/src/App.vue`, `fixtures/custom_field.json`.
