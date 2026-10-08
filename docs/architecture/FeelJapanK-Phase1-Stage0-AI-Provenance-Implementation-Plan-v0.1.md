# FeelJapanK Phase 1 — Stage 0 — AI + Provenance Implementation Plan — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1 |
| Subject | Stage 0 — Data Acquisition / Data Entry — AI-assisted interpretation + provenance |
| Version | v0.1 |
| Status | **PLAN / DOCUMENTATION — NOT IMPLEMENTED — BUILD AUTHORIZATION: NOT GRANTED** |
| Date | 2026-10-07 |
| Repository | `/home/yusmarin/frappe-crm` |
| Mode | PLAN / DOCUMENTATION ONLY |
| Basis | FK-D18 (FROZEN); Roadmap v0.2 §3 (FROZEN); Communication Intake Direction v0.2; End-to-End Architecture Reconciliation v0.1; End-to-End Data-to-Quotation Architecture Decision v0.1; Stage 0 Repository Reconciliation (2026-10-07) |

> This is a **decision-quality implementation plan**. It authorizes **no** implementation, schema, field, child table, API, hook, migration, frontend, integration, provider, or credential change. `BUILD remains UNAUTHORIZED`.

---

## 1. Status / Authorization

- **Status:** `PLAN / DOCUMENTATION / NOT IMPLEMENTED`.
- **BUILD authorization:** **NOT GRANTED.**
- **Nature:** Defines *what* a future Stage 0 BUILD would implement and *which decisions remain open*. It does not implement and does not select a mechanism.
- **Governance:** Any future implementation requires `PLAN → REVIEW → APPROVAL/FREEZE → BUILD → VERIFY → HUMAN ACCEPTANCE → FREEZE` under `FK-D12` (Roadmap v0.2 §9).

---

## 2. Decision Check (AGENTS.md / Decision-Check-Standard v0.1)

| Decision ID | Relevant? | Compliance | Notes |
|---|---|---|---|
| FK-D01 Deal = one opportunity container | Yes | PASS | No new Deal/opportunity container is introduced. |
| FK-D03 new request → new Deal; revisions stay | Yes | PASS | Deal resolution remains human-controlled (§10). |
| FK-D04 CRM owns relationship + enquiry context | Yes | PASS | Native CRM Organization/Contact/Deal retained. |
| FK-D10 explicit context identifies Deal; no silent guessing | Yes | PASS | AI may only suggest; never authoritatively assign (§10). |
| FK-D11 Phase 1 human-in-the-loop | Yes | PASS | Human determination retained; automation-deferral clause partially superseded by FK-D18. |
| FK-D12 native-first / high-risk gate | Yes | PASS | Reuses native model; no new structure is created here; future BUILD gated. |
| FK-D13 frozen environment/security baseline | Yes | PASS | `docs/versions.lock` untouched; no provider/credentials. |
| FK-D14 written confirmation is evidence; manual marking | Yes | PASS | AI cannot mark confirmation or Info Complete (§12). |
| FK-D17 pre-invoice commercial state CRM-owned | Yes | PASS | Stage 0 is pre-invoice and CRM-Deal-owned. |
| FK-D18 AI proposal-only + mandatory human approval + mandatory provenance | Yes | PASS | Plan mirrors FK-D18 §4–§7 exactly; no implementation inferred. |

**Result:** No conflict with any FROZEN decision. No FROZEN decision is reopened or reinterpreted. No STOP condition.

---

## 3. Authoritative Stage 0 Boundary

Intended Stage 0 flow:

```
Customer Communication
  → Source Preservation
  → AI Interpretation / Extraction
  → Proposed Structured Data
  → Human Review / Approval
  → Authoritative CRM Data
  → Deal Information Gathering
  → Requirements
  → Allocations
  → Validation
  → Information Status
  → Info Complete
```

The Stage 0 boundary **STOPS at Info Complete** (FK-D18 §7; Roadmap v0.2 §3–§4; Data-to-Quotation §10).

### 3.1 OUT OF SCOPE (explicit)

- Supplier Quotation Request
- supplier email / reply intake
- supplier quotation
- supplier pricing
- Customer Quotation
- Final Quotation
- Trip / ERPNext / P01
- Phase 2 / Phase 3 work

Stage 0 documentation must not drift into Supplier Quotation implementation. Any content beyond Info Complete is a later stage (Roadmap v0.2 §5–§7) and is not authorized here.

### 3.2 Channel Strategy (aligned 2026-10-07)

- **CORE Stage 0 inputs:** **inbound email** (first-class intended customer-data input; native Frappe capability; runtime inbound reception currently disabled — enablement is a separate operational authorization, **not** a "deferred" channel) and **manual source capture** (immediate baseline: operator uploads screenshots/images/PDFs/documents as preserved source; used for WhatsApp-originated communication while live WhatsApp inbound is deferred).
- **Deferred:** live WhatsApp inbound.
- **Internal-only (implementation AUTHORIZED 2026-10-08, STG0-D18):** Telegram — internal operator/system communication and intake, **not** a customer channel.
- Detail/evidence: Technical Design §18.2–§18.3; governance: Decisions §3D.

---

## A. Objective

Customer communication becomes **proposed** structured CRM information through AI-assisted interpretation, with **mandatory human approval** and **mandatory provenance**, before any promotion into **authoritative CRM data**.

AI is an assistant to a human operator. It never becomes the authority for CRM truth (FK-D18 §3–§4).

---

## B. Frozen Principles

- AI = **Interpret → Extract → Propose**.
- AI has **no authoritative CRM authority**.
- Human approval is **mandatory**.
- AI confidence is **not** approval.
- Existing/new Deal is **human-controlled**.
- Amendment/new request is **human-controlled**.
- Requirements may be proposed but **require approval**.
- Allocations may be proposed but **require approval**.
- AI **cannot mark Info Complete**.
- Provenance is **mandatory**.
- **Native-first**; customization only through the FK-D12 gate.
- **No duplicate** Company/Contact/Deal masters (native `CRM Organization` / `Contact` / `CRM Deal` remain the masters).

Source: FK-D18 §4–§7; Communication Intake Direction v0.2 §3–§5; Data-to-Quotation §3–§4, §22.

---

## C. Existing Downstream Model (already implemented — FACT)

The repository already contains the following. Stage 0 must **reuse** these and must not rebuild them merely to support AI.

| Capability | Native / FJK | Location |
|---|---|---|
| Organization / Company | Native | `CRM Organization` (crm app) |
| Contact | Native | `Contact` + `CRM Contacts` child |
| Deal | Native | `CRM Deal` |
| Communication | Native + CRM hooks | `Communication` (`reference_doctype`/`reference_name`); `crm/utils/__init__.py` |
| WhatsApp Message references | Native integration | `WhatsApp Message.reference_doctype/reference_name` (frappe_whatsapp) |
| File | Native | `File` (`attached_to_doctype/name`) |
| Activity Log | Native | `Activity Log` |
| Version | Native | `Version` (`track_changes`) |
| Comment | Native | `Comment` |
| FJK Deal Requirement Line | FJK | `doctype/fjk_deal_requirement_line` |
| FJK Deal Component | FJK | `doctype/fjk_deal_component` |
| FJK Deal Guide Requirement | FJK | `doctype/fjk_deal_guide_requirement` |
| FJK Deal Activity Item | FJK | `doctype/fjk_deal_activity_item` |
| FJK Transportation Allocation | FJK | `doctype/fjk_transportation_allocation` |
| FJK Accommodation Allocation | FJK | `doctype/fjk_accommodation_allocation` |
| Information Status / readiness | FJK | `get_readiness` / `get_deal_summary` (`api.py`) |
| Info Complete | FJK | `fjk_info_complete` + `set_info_complete` / `is_info_complete` (`api.py`) |
| Allocation validation | FJK | `d1.py` validation + `get_allocation_validation` (`api.py`) |

Editing/authoritative entry occurs in native CRM; the FeelJapanK workspace presents read-only views. **No Stage 0 rebuild of the above is proposed.**

---

## D. Missing Stage 0 Bridge

- **Missing:** `Communication → structured requirement` as an **automated/proposal flow**. Today this is entirely manual.
- **Reuse:** all downstream transitions (`Deal Component` → `Requirement Line` → `Guide Requirement` / `Activity Item` → `Transportation` / `Accommodation` Allocation → Validation → Information Status → Info Complete) are **already implemented** and must be reused, not re-created.
- Stage 0 therefore adds only the **front half**: intake → interpretation → proposal → human approval → promotion into the existing model.

---

## E. AI Boundary

### E.1 AI MAY propose (non-authoritative)

- requirements
- dates
- pax (passenger quantities/composition)
- destinations / routes
- transport
- accommodation
- meals
- activities
- guides
- special requirements
- source association
- confidence

### E.2 AI MUST NEVER decide authoritatively

- Company
- Contact
- existing/new Deal
- amendment/new request
- authoritative requirement
- authoritative allocation
- customer confirmation
- Info Complete
- supplier quotation request
- customer quotation

Source: FK-D18 §4.1–§4.3; Data-to-Quotation §3; Intake Direction v0.2 §5. Anything listed in E.2 requires an explicit human decision before it becomes CRM truth.

---

## F. Proposal Model (conceptual only — schema OPEN)

Stage 0 requires a **non-authoritative proposal object/contract** that keeps AI output separate from authoritative CRM data. **The final schema is OPEN** pending the provenance/native-sufficiency decision (§H) and a future FK-D12 PLAN.

Conceptual properties (not a schema):

- proposed value
- target CRM datum / domain
- source reference
- source location / span (where available)
- confidence
- proposal state
- reviewer
- disposition
- edited value (where applicable)
- approval attribution
- approval timestamp
- relationship to the resulting authoritative value

Constraints carried from FK-D18:
- proposals and human dispositions are **both retained** (rejected/corrected proposals are evidence, not discarded) (FK-D18 §5);
- the distinction `Customer truth / AI interpretation / Operator-approved truth / System-calculated truth` must be preserved (FK-D18 §5);
- FK-D18 §10 **does not authorize** a provenance schema or proposal DocTypes — this section records the requirement, not the design.

---

## G. Human Approval

Required dispositions (FK-D18 §5; E2E Reconciliation §9):

1. **Accept**
2. **Edit + Accept**
3. **Reject**

Rules:

- Every disposition must be **attributable to a human** (who / when).
- Only accepted (or edited-and-accepted) information becomes authoritative CRM data.
- AI confidence is never equivalent to approval.
- Deferral is permitted; rejection/correction is retained as part of the record.

---

## H. Provenance Decision Gate (first architectural question)

Before any BUILD, the first question is:

> Can native `Communication` + `File` + `Communication Link` + `Comment` + `Version` + `Activity Log` satisfy:

```
CRM datum
  → approved proposal
  → AI interpretation
  → source
  → original evidence
```

- **If YES:** document *how* native structures express each link (source reference, interpretation record, disposition, resulting value), and reuse them (native-first).
- **If NO:** document *exactly* which native/FJK structures cannot express which link and *why* a dedicated structure is necessary.

Status: **OPEN / NEEDS VERIFICATION.** This is the gating decision for §F. No dedicated structure is created in this task (FK-D18 §10). Evidence basis: FK-D18 §6; E2E Reconciliation §8; Data-to-Quotation §4, §23; Stage 0 Repository Reconciliation §7.

---

## I. Deal Resolution

Frozen rule (FK-D10; Opportunity-Start/Lead Usage Rule; SOP v0.2 §5):

- **Explicit commercial context** identifies the Deal.
- Phone/email similarity must **never silently determine** the Deal.
- An existing request/revision **continues the existing Deal** where appropriate.
- A genuinely **distinct request becomes a new Deal**.
- **Ambiguity requires human resolution.**
- AI may **only suggest**, never authoritatively assign.

No new Deal-resolution mechanism is proposed; the existing native Deal + human rule is sufficient.

---

## J. Promotion

Approved information must feed the **existing authoritative FJK model** rather than creating an AI-specific duplicate model. Promotion targets:

- native `CRM Deal` fields (shared context),
- `FJK Deal Component` / `FJK Deal Requirement Line` / `FJK Deal Guide Requirement` / `FJK Deal Activity Item`,
- `FJK Transportation Allocation` / `FJK Accommodation Allocation`.

No parallel "AI data model" is created. Promotion must be explicit and attributable (no silent promotion).

---

## K. Information Status / Info Complete

Existing vocabulary (FACT; `d1.py`, doctype Select options):

- **KNOWN**
- **MISSING**
- **TO CONFIRM**
- **CUSTOMER-CONFIRMED**
- **NOT APPLICABLE**

Distinctions to document and preserve:

- **SELECTED ≠ COMPLETE ≠ READY FOR QUOTATION.**
- **Info Complete is the Stage 0 exit gate** (operator-controlled, reversible, auditable; `api.py:set_info_complete`).
- **AI cannot mark Info Complete.** Unapproved AI proposals cannot count toward Info Complete (FK-D18 §7; Roadmap v0.2 §4).

---

## L. Security

The following remain **OPEN** and require the appropriate security gate (`FK-D12`; FK-D18 §10–§11) before any BUILD:

- AI provider selection
- customer data egress (what leaves the system, to whom)
- source retention / deletion policy
- logging
- credentials / API keys management
- external AI processing locations

No provider, key, or integration is selected or created in this task.

---

## M. Required Decisions

Each item below is **OPEN** unless an existing authoritative document already resolves it. Do not silently convert OPEN → decided.

| # | Decision | Status | Notes |
|---|---|---|---|
| M1 | Provenance model (native-sufficient vs new structure) | OPEN | §H; FK-D18 §6; E2E Recon §8 |
| M2 | Proposal lifecycle / states | OPEN — investigation complete (READY FOR GOVERNANCE RESOLUTION) | 5 proposal states + separate run states; ACCEPTED ≠ authoritative with explicit promotion; append-only; edits/rejection/deferral/reprocessing/multiple/partial/conflict/supersession/immutability. See Design §23.1; Register §6. |
| M3 | Source storage / access | OPEN — investigation complete (READY FOR GOVERNANCE RESOLUTION) | Reuse native sources; source identity = doctype+name (+`content_hash`); immutability/retention and reviewer-access OPEN; location/span not native. See Design §7.1; Register §7. |
| M4 | Proposed ↔ authoritative relationship | OPEN — investigation complete (READY FOR GOVERNANCE RESOLUTION) | Semantics + 15 invariants (explicit/attributable/non-destructive/idempotent promotion; accept ≠ promotion; Deal resolution separate; correction additive). Native insufficient. See Design §14.1; Register §8. |
| M5 | Human approval mechanism (UI/workflow) | OPEN — investigation complete (READY FOR GOVERNANCE RESOLUTION) | Datum-level attributable dispositions; accept ≠ promotion; partial approval; Deal resolution separate; confirmation separate. Native insufficient for proposal/disposition model. See Design §12.1; Register §9. |
| M6 | Initial channel scope | OPEN — strategy aligned; Telegram implementation AUTHORIZED (2026-10-08) | Inbound email = core input; manual source capture = baseline; live WhatsApp inbound deferred; Telegram internal-only + implementation authorized (approach + O08-class security + build PLAN pending). See §3.2; Design §18.2–§18.3. |
| M7 | AI provider | **SELECTED** — `deepseek-flash` for Stage 0; residual provider-policy risk accepted (deferred assurance); FK-D12 implementation PLAN next | FK-D18 §10; Roadmap v0.2 §10; Design §19.1; Register §11/§12.2; DeepSeek-Flash evidence |
| M8 | AI security / data handling | **ACCEPTED WITH DEFERRED PROVIDER ASSURANCE** — provider-independent controls approved; P1–P7 accepted residual risk; reopen triggers defined | §L; Design §17.2; Register §12.2; DeepSeek evidence §11 |
| M9 | Vague-request persistent-intake convention | OPEN | SOP v0.2 §4 [OPEN] |

---

## N. Documentation Reconciliation (Errata)

The Stage 0 Repository Reconciliation (2026-10-07) found authoritative inventories that under-report the current repository. **No application code is changed to correct documentation.**

**Repository ground truth (FACT):**

- **11 FJK DocTypes:** `FJK Deal Component`, `FJK Deal Requirement Line`, `FJK Deal Guide Requirement`, `FJK Deal Activity Item`, `FJK Transportation Allocation`, `FJK Accommodation Allocation`, `FJK Quotation`, `FJK Quotation Version`, `FJK Quotation Version Item`, `FJK Quotation Confirmation`, `FJK Quotation Negotiation Entry`.
- **20 custom fields** on native `CRM Deal` (14 shared + 6 child-table fields), per `fixtures/custom_field.json`.
- **Allocations are implemented** (Transportation + Accommodation) and technically verified; human acceptance of the allocation increment is **pending**.

**Stale statements identified (not edited in this task):**

| Document | Statement | Status of document | Handling |
|---|---|---|---|
| `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.2.md` §1 | "9 DocTypes"; "18 `fjk_*` fields" | **FROZEN** | **NOT edited** — correcting a FROZEN document requires a controlled revision (roadmap v0.3) or an errata, which is out of scope here. Reported. |
| `docs/architecture/FeelJapanK-End-to-End-Data-to-Quotation-Architecture-Decision-v0.1.md` §18 | allocations "planned … not built" | PROPOSED (not frozen) | Recorded here; not edited (avoid altering a referenced authority casually). |

The corrected counts above are authoritative for the purposes of this Stage 0 plan.

---

## 4. What This Plan Does NOT Authorize

- No AI/provider integration, no API keys, no background workers/webhooks, no OCR/transcription.
- No provenance schema, no proposal DocTypes, no CRM schema/field changes.
- No source-storage changes.
- No application code, DocType, fixture, hook, API, frontend, permission, database, config, or integration change.
- No Supplier Quotation / Customer Quotation / Trip work.

---

## 5. Next Governance Gate

```
This PLAN (documentation)  →  PLAN REVIEW  →  (approve/correct)  →  FK-D12 high-risk gate
   →  controlled BUILD authorization per workstream  →  VERIFY  →  HUMAN ACCEPTANCE  →  FREEZE
```

**Next gate: PLAN REVIEW.** BUILD remains unauthorized until review completes and a separate FK-D12 BUILD authorization is granted.

---

# FK-D12 — AI Provider / Adapter Implementation PLAN

**Status: PLAN ONLY (BUILD not authorized).** Provider: DeepSeek `deepseek-flash` (DeepSeek-V4.1-Flash). Governance: O07 SELECTED; O08 ACCEPTED WITH DEFERRED PROVIDER ASSURANCE; FK-D18 AI authority unchanged.

## FK-D12.1 Executive architecture

```text
Native source evidence (Communication / File / ...)
   → egress filter (minimum-necessary, redaction)
   → AIService (FJK server-side)
        → ProviderAdapter interface → DeepSeekAdapter → POST https://api.deepseek.com/chat/completions
   → transport/error validation → finish_reason check → JSON parse
   → schema validation → semantic validation → provenance binding
   → FJK AI Interpretation Run + FJK AI Proposal  (NON-authoritative)
   → human review → datum-level disposition
   → [future, separate decision] promotion mechanism → authoritative CRM Deal / FJK tables
```

Promotion is **OUT** of the D12 first slice. The adapter never writes authoritative CRM data.

## FK-D12.2 Existing repository capabilities reused (FACT)

| Capability | Location | Reuse |
|---|---|---|
| FJK app/module layout | `feeljapank_crm/` | host adapter module `feeljapank_crm/ai/` |
| Deal-mirror permissions | `permissions.py` | permission checks for run/proposal (`has_permission("CRM Deal", …)`) |
| Whitelisted server APIs | `api.py` | pattern for permission-gated server endpoints |
| Deal validate hook | `hooks.py` `doc_events.validate`; `d1.py` | validation pattern; **not** an AI write path |
| Requirement child tables on CRM Deal | `fixtures/custom_field.json`: `fjk_components`, `fjk_requirement_lines`, `fjk_guide_requirements`, `fjk_activity_items`, `fjk_transport_allocations`, `fjk_accommodation_allocations` | authoritative promotion targets |
| Per-line status model | child `status` Select (KNOWN / MISSING / TO CONFIRM / CUSTOMER-CONFIRMED / NOT APPLICABLE) + `demand_status` | existing Information-Status mechanism; AI may propose hints only |
| FJK Quotation read model | `fjk_quotation*` (links `deal`, `organization`) | downstream consumers; unchanged |
| Native source objects | Frappe `Communication`, `File`, CRM `CRM Deal`/`Contact`/`Organization` | source identity referenced, not duplicated |

## FK-D12.3 Adapter boundary

Native-first: a **module inside the existing FJK app** (`feeljapank_crm/ai/`), **not** a new app or architectural layer. Public surface is server-side only: `interpret_source(kind, name, options)` → `{run, proposals}` (enqueue-able), plus permission-gated read APIs. The adapter **owns** egress filtering, the provider call, validation, and run/proposal creation. It **does not own** human disposition, promotion, Deal resolution, customer confirmation, Information Status, Info Complete, or Ready for Quotation (FK-D18; O05).

## FK-D12.4 Provider abstraction

`AIProvider.interpret(AIRequest) → AIResult`. `DeepSeekProvider` (only implementation now) calls `POST https://api.deepseek.com/chat/completions` with `model="deepseek-flash"`. Normalized internal representation: `AIRequest` (system_instruction_ref, untrusted_source, minimal_context, output_contract_ref) and `AIResult` (normalized_proposal, provider_meta, usage, finish_reason, error_class). Provider-specific detail is confined to the adapter boundary; the proposal/provenance model is provider-independent, so provider swap preserves provenance semantics (V150). No vendor SDK; fixed host allowlist.

## FK-D12.5 Request contract

**Include:** (a) FJK-controlled **versioned** system/developer instruction; (b) the **untrusted source** content required for interpretation, clearly delimited; (c) **minimal** structured context (e.g., language hint, target domains); (d) output-contract reference.
**Exclude:** credentials/secrets/keys, DB/infra detail, internal URLs/config, other customers' data, unrelated correspondence/Deal history, internal CRM comments, unnecessary attachments/metadata. Payload is constructed inside the FJK boundary (minimum-necessary egress).

## FK-D12.6 Prompt / instruction boundary

Four separated layers: system/developer instructions (FJK-controlled, hashed/versioned) · source evidence (untrusted) · minimal application context · output contract. The instruction states source content is **untrusted data** and cannot override system instructions (covers the passed injection test). No interpolation of source into instruction positions.

## FK-D12.7 Output contract (normalized, non-authoritative)

Validated JSON proposal items, each with: `domain`, `logical_key`, `proposed_value` (+`value_type`), `status_hint` (KNOWN / MISSING / TO CONFIRM / INFERRED; never CUSTOMER-CONFIRMED), `provenance_status` (explicit|inferred|ambiguous), optional `confidence`, `uncertainty`, `evidence_span`, and `target` hint where determinable. Deal resolution is handled **separately** (candidates + ambiguity; never a selection). Proposed values are stored independently from authoritative CRM values. Exact schema = **OPEN**.

## FK-D12.8 Validation pipeline

Source Selection → Minimum-Data Egress Filtering → AI Request → Provider Response → Transport/Error Validation → `finish_reason` Validation → JSON Parsing → Schema Validation → Semantic Validation → Provenance Binding → Proposal Creation → Human Review. A failure before Proposal Creation **must not** create authoritative CRM data. Routing: transport/provider → retry/fail; invalid JSON/schema/semantic → no proposal (FAILED), or DEFERRED for user fix; low confidence → proposal with uncertainty (not a failure).

## FK-D12.9 `finish_reason` handling

`stop` → proceed. `length` → **reject as incomplete even if JSON parses** (no proposal; retry once with larger budget up to a cap, else FAILED). tool/other → FAILED. `finish_reason` is validated **before** accepting parsed content.

## FK-D12.10 Thinking / token strategy

`max_tokens` = f(source_length, expected_output, reasoning_headroom) with a configured ceiling; optionally disable thinking for pure extraction (OPEN); on `finish_reason=length`, retry once with increased budget within the cap, else FAILED; reject oversized source before egress (context guard). Do **not** hardcode `max_tokens=8000` (bake-off value only).

## FK-D12.11 Error / retry

| Class | Retryable | Action |
|---|---|---|
| 401 auth | No | FAILED; alert; fail-closed |
| 402 balance/quota | No | FAILED; alert |
| 400 / 422 | No | FAILED (bug); no retry |
| 429 rate limit | Yes | backoff + jitter, bounded |
| 500 / 503 | Yes | backoff + jitter, bounded |
| timeout / network | Yes | bounded retry |
| malformed/incomplete JSON | limited | reject; bounded re-ask; else FAILED |
| invalid schema/semantic | No | FAILED (no proposal) |

Backoff is exponential with jitter and bounded (e.g., max 3 attempts — OPEN); idempotent via run key; never amplifies into duplicate proposals or authoritative writes. No provider guarantees are assumed beyond documented error codes.

## FK-D12.12 Idempotency / reprocessing

Run key = source(doctype+name) + content_hash + instruction_version + provider + model. Same key → **no duplicate** run/proposal. Deliberate reprocess → new run (force flag). Model/instruction/source change → new run. Historical proposals immutable; supersession explicit; **no recency winner**; competing proposals independently traceable (O02).

## FK-D12.13 Provenance design (O01)

Run record captures: source doctype/name, content_hash, source_timestamp, attachment identity, run_id, proposal_id(s), provider, exact `model` id, `system_fingerprint`, request_id, response_id, processing timestamps, state, error_class, usage. Proposals link back to the run and forward to disposition/promotion. Bidirectional, reconstructable; source referenced by identity (no duplicate evidence store).

## FK-D12.14 Source-evidence binding (O03)

Reference native source identity (`Communication`/`File`/…) + content hash for file-backed evidence; never create a parallel source repository; respect existing permissions.

## FK-D12.15 Logging / redaction

**Safe:** run ID, proposal ID, provider, model, request/response IDs, timestamps, status, error class, usage metrics. **Never ordinarily logged:** API keys/secrets, full customer prompts/responses, raw attachments, unrelated CRM data. Operational debugging uses hashed/redacted markers, not raw customer content; full prompt/response retention is not default.

## FK-D12.16 Credential strategy

API key stored **server-side only** — Frappe site secret store (`site_config.json`, gitignored) or env var; retrieved via `frappe.conf`/env in the adapter; never in source/frontend/logs/commits. Missing/invalid → fail-closed (no call; FAILED state). Rotation = replace secret + restart (documented). **Not created in this plan.**

## FK-D12.17 Security controls

Server-side execution; fixed provider-host allowlist (no source-controlled URLs → SSRF-safe); outbound only to provider; input/output size guards; rate limiting; bounded retries (no amplification); response treated as untrusted (schema+semantic validate; never executed as a CRM action); permission checks mirror the Deal (`permissions.py` pattern); no cross-Deal/customer data in a request; optional per-user `user_id` isolation.

## FK-D12.18 Human-review boundary (O05)

Reviewable unit = proposal (datum-level). Reviewer sees the source-evidence reference + original AI value + status/confidence. Edits preserved (EDITED_ACCEPTED stores original **and** edited). Disposition (ACCEPTED / EDITED_ACCEPTED / REJECTED / DEFERRED) recorded with actor + timestamp. Acceptance ≠ customer confirmation ≠ Information Status ≠ Info Complete ≠ Ready for Quotation. Review UI = later BUILD unless an existing UI can be safely extended.

## FK-D12.19 Promotion boundary (O04)

Hard boundary: `AI Adapter → Proposal → Human Disposition → Promotion Mechanism → Authoritative CRM`. The adapter never writes Company/Contact/Deal/FJK requirement/allocation/status. Promotion (separate future mechanism/decision) is explicit, attributable, timestamped, non-destructive, idempotent, auditable on partial failure; target identity supports doctype/record/field/child-table/logical-key/new-target; existing values are not silently overwritten. **Promotion is OUT of the D12 first slice.**

## FK-D12.20 Deal-resolution boundary (STG0-R01)

AI may propose zero/one/more Deal candidates + ambiguity + evidence; **never** selects the authoritative Deal. Native `reference_*` (Communication context) ≠ human-confirmed Deal relationship. Human decides.

## FK-D12.21 Information-Status boundary

AI may propose extracted/missing/uncertain/inferred/needs-confirmation hints; must not set CUSTOMER-CONFIRMED / Info Complete / Ready for Quotation. Final Information Status remains governed by the existing FJK status fields and human/business rules (`d1.py` STATUSES).

## FK-D12.22 Native-first assessment & minimum new structures

Reuse: CRM Deal + FJK child tables (authoritative targets), permissions, status enums, whitelisted-API pattern. Native Comments/Version/Activity Log are **insufficient** for the O01/O02/O04/O05 proposal lifecycle. Minimum dedicated representation (PROPOSED — **not created here**):
- **FJK AI Interpretation Run** (parent): source identity/hash, run id, provider, model, fingerprints, request/response IDs, timestamps, state, error_class, usage, instruction_version.
- **FJK AI Proposal** (parent): run link, target doctype/record/field/child-table/logical_key, proposed value (JSON)+type, status (PROPOSED/ACCEPTED/EDITED_ACCEPTED/REJECTED/DEFERRED/SUPERSEDED), provenance_status, confidence/uncertainty, evidence_span, original vs edited value, disposition (actor/ts), promotion_state, supersession links.
(Deal candidates may be a child table.) Exact schema = **OPEN**.

## FK-D12.23 Phased BUILD plan

| Phase | Scope | Acceptance | Rollback / containment |
|---|---|---|---|
| D12-A | Adapter skeleton + `AIProvider` interface + `AIRequest`/`AIResult` | interface compiles; no network | remove module |
| D12-B | Credential + secure server-side transport + egress filter | key server-side; egress filtered; no CRM write | feature flag off |
| D12-C | Response validation (transport/`finish_reason`/JSON/schema/semantic) | malformed/length rejected | no proposal on failure |
| D12-D | Run/provenance representation | source→run→proposal reconstructable | records non-authoritative |
| D12-E | Proposal representation + human-review handoff (no UI) | datum-level proposals; disposition recorded | proposals non-authoritative |
| D12-F | Reprocessing/idempotency + hardening | no duplicates; bounded retries | disable reprocess |

**Smallest first slice** = D12-A/B/C + partial D: synthetic source → DeepSeek → validated **non-authoritative** run/proposal stored; **no CRM promotion, no customer data.**

## FK-D12.24 Verification plan

Provider connectivity (synthetic); auth failure (no leakage); malformed JSON rejected; `finish_reason=length` rejected; schema-invalid rejected; semantic-invalid rejected; prompt injection cannot control CRM; missing info no fabrication; ambiguity not silently resolved; Deal resolution human-required; Information Status not autonomous; provenance reconstructable; reprocessing new run + old preserved; duplicate idempotent; provider failure no authoritative write; retry bounded/auditable; secret never in logs/frontend/repo; minimum egress only. Extends V151–V158; adapter-specific V159–V163.

## FK-D12.25 Acceptance criteria

Adapter performs **no** authoritative CRM write (adapter→proposal only); all outputs schema/semantic-validated with `finish_reason` enforced; every proposal traceable source→run→provider/model→proposal; reprocessing idempotent with history preserved; secrets server-side only and absent from logs/frontend/repo; minimum-necessary egress enforced and testable; AI boundaries (Deal/Company/Contact/confirmation/Information Status) hold.

## FK-D12.26 Unresolved design decisions

Exact Run/Proposal DocType schema; JSON schema definition; thinking disable vs token budget; attachment/OCR/transcription scope; retry counts/timeouts; `user_id` isolation; promotion mechanism (separate decision); review UI; rate-limit/concurrency policy.

## FK-D12.27 Risks

Thinking-token unpredictability; `json_object` non-strict schema; accepted provider data-handling residual risk (O08); egress leakage; retry amplification; secret handling; DocType design diverging from native; scope creep into promotion.

## FK-D12.28 Approval required before BUILD

Explicit human approval of this FK-D12 PLAN, then a **separate FK-D12 BUILD authorization per phase** (D12-A onward) under the FK-D12 high-risk gate. **No code, credentials, provider config, DocType, or CRM writes until then.**

---

# FK-D12-A — Provider/Adapter Interface Skeleton (PLAN ONLY)

**Status: PLAN ONLY (BUILD not authorized).** Scope: establish the provider-neutral interface boundary only. No HTTP calls, credentials, egress filtering, validation, persistence, DocTypes, or CRM writes.

## D12.A.1 Architectural recommendation

Create a **new Python subpackage `feeljapank_crm.ai`** inside the existing FJK app (import path `feeljapank_crm.ai`), **kept free of `frappe` imports** so the interface is provider-neutral, unit-testable without a site, and usable by later phases. Layers:

```text
feeljapank_crm.ai.service.AIService   (facade; provider selection)
        → feeljapank_crm.ai.interface.AIProvider   (ABC)
        → feeljapank_crm.ai.providers.deepseek.DeepSeekProvider   (skeleton)
        → feeljapank_crm.ai.providers.fake.FakeProvider           (tests)
```

Providers receive/return normalized `AIRequest`/`AIResult`; DeepSeek-specific detail is confined to `providers/deepseek.py`. No new app, no new architectural layer, no vendor SDK.

## D12.A.2 Repository evidence supporting the location

- Package root `bench/apps/feeljapank_crm/feeljapank_crm/` holds `api.py`, `d1.py`, `permissions.py`, `hooks.py`, `setup.py`, `tests.py`, `__init__.py` → `ai/` belongs as a sibling (`feeljapank_crm/feeljapank_crm/ai/`), import `feeljapank_crm.ai`.
- Existing modules are plain Frappe-coupled Python; `ai/` deliberately avoids `frappe` at D12-A.
- `pyproject.toml`: `dependencies = []` (app declares none), `requires-python >=3.10`, `ruff` line-length 110 → **no new dependency**; stdlib only for D12-A.
- `tests.py`: repo convention is a self-contained `_check()`/`run_smoke_tests()` harness executed via `bench --site … execute feeljapank_crm.tests.run_smoke_tests` (transaction rollback). D12-A tests follow the same `_check` style but require **no site/DB** (pure Python).
- `setup.py`: confirms authoritative flags `fjk_ready_for_quotation` and `fjk_info_complete` (Check) on CRM Deal — AI must never set these; the interface exposes no such authority.

## D12.A.3 Provider interface

```python
class AIProvider(ABC):
    name: str
    @abstractmethod
    def interpret(self, request: "AIRequest") -> "AIResult": ...
```

- **Synchronous** at D12-A; asynchronous/queueing is a transport-phase concern (D12-B), so `interpret` is not async.
- Provider identity exposed via `name` (e.g., `"deepseek"`); no DeepSeek types in the signature.
- No `@frappe.whitelist`; not frontend-callable.

## D12.A.4 AI request (normalized)

`AIRequest` (dataclass, no secrets): `instruction_ref: str` (version/hash), `instruction: str` (FJK-controlled), `source_kind: str`, `source_id: str`, `source_text: str` (untrusted), `context: dict` (minimal), `output_contract_ref: str`, `request_meta: dict`. Provider-neutral; DeepSeek serialization happens inside `DeepSeekProvider`, not here. **No credentials, no full CRM record dumps.**

## D12.A.5 AI result (normalized)

`AIResult` (dataclass): `proposals: list[dict]` (raw candidate payloads; **not** authoritative), `provider_meta: ProviderMeta`, `usage: Usage`, `status: CompletionStatus`, `finish_reason: str | None`, `error: AIProviderError | None`. Supporting dataclasses: `ProviderMeta(provider, model, model_fingerprint, request_id, response_id)`, `Usage(input_tokens, output_tokens, total_tokens, reasoning_tokens, cached_tokens)`, `CompletionStatus{OK, ERROR}`. Distinguishes **provider result** from **authoritative CRM data**.

## D12.A.6 Normalized error boundary

`AIProviderError(Exception)` base with `category: ErrorCategory`, `message: str`, `provider_detail: str | None` (redacted). Subclasses/categories: `AuthenticationError`, `AuthorizationBillingError`, `InvalidRequestError`, `RateLimitError`, `ProviderUnavailableError`, `TimeoutError`, `MalformedResponseError`, `IncompleteResponseError`, `ValidationError`. **Retry policy is NOT decided here** (D12-B); the taxonomy only classifies.

## D12.A.7 DeepSeek isolation boundary

`DeepSeekProvider(AIProvider)`: `name="deepseek"`, constants `MODEL_ID="deepseek-flash"`, `ENDPOINT="https://api.deepseek.com/chat/completions"`; DeepSeek-only methods `_serialize(request) -> dict` and `_parse(response) -> AIResult`. `interpret()` **raises `NotImplementedError`** in D12-A (no HTTP). No `requests`/SDK import. All DeepSeek knowledge stays in this module.

## D12.A.8 Configuration boundary (design only)

Define a `ProviderConfig` dataclass and a documented resolver contract; **D12-A implements no secret retrieval and changes no configuration**. Future (D12-B): read via `frappe.conf.get("<provider>_api_key")` or environment, server-side only, `site_config.json` (gitignored) — never frontend, never Git, never logged. Keep `ai/` frappe-free by importing `frappe` lazily inside the resolver at D12-B.

## D12.A.9 Dependency assessment

**No new Python dependency for D12-A** (stdlib `abc`/`dataclasses`/`typing`). Later transport (D12-B) should prefer stdlib `urllib.request` or the already-present Frappe-transitive `requests` (to be **verified** at D12-B; adding to `pyproject.toml` is a separate controlled change). No installs now.

## D12.A.10 Fake-provider testing strategy

`FakeProvider(AIProvider)` deterministic, mode-selected: `success`, `malformed`, `error`, `incomplete`, `empty`. Returns normalized `AIResult` or raises the corresponding normalized error. **Interface contract test**: the same `AIRequest`→`AIResult` assertions run against `FakeProvider` and (structurally) `DeepSeekProvider`, proving provider-neutrality. No external API calls; no `frappe` import required.

## D12.A.11 Future-provider replacement

`AIService` selects a provider from a registry (`name -> class`). Adding `FutureProvider` requires only a new `providers/<name>.py` + registry entry; provenance, proposal lifecycle, human review, promotion, and CRM model are untouched (they consume normalized `AIResult`, not provider specifics).

## D12.A.12 Governance boundary

The provider interface can only return interpretation results; it has **no** method or authority to modify Deal/Company/Contact/requirements/allocations, set Information Status, resolve Deal ownership, or mark confirmation / Info Complete / Ready for Quotation. Enforced structurally: `ai/` has no `frappe` import and no DB access; it returns `AIResult` only. `AI Provider → CRM Deal write` is impossible at the interface level.

## D12.A.13 No premature schema

No `FJK AI Interpretation Run`, no `FJK AI Proposal`, no fields, no DocTypes, no persistence at D12-A. Those are D12-D/D12-E with their own design/approval.

## D12.A.14 Security considerations (interface level)

Server-side only; no credentials in `AIRequest`/`AIResult`; no secret logging; no frontend-callable provider method; `source_text` treated as untrusted (never executed, never used as instruction); response treated as untrusted (validated in D12-C, not trusted here). Egress-security implementation is deferred to D12-B.

## D12.A.15 Acceptance criteria

Clear provider-neutral interface; clear request boundary; clear result boundary; normalized error boundary; DeepSeek detail isolated; no authoritative CRM authority; no credential leakage; no premature schema; deterministic test strategy; future-provider replacement preserved.

## D12.A.16 Proposed files (to be created only on D12-A BUILD)

| File (under `bench/apps/feeljapank_crm/feeljapank_crm/`) | Purpose | New/Existing | Deps | Test coverage |
|---|---|---|---|---|
| `ai/__init__.py` | package marker | new | — | import |
| `ai/interface.py` | `AIProvider` ABC | new | `abc`, `types` | contract test |
| `ai/types.py` | `AIRequest`/`AIResult`/`ProviderMeta`/`Usage`/`CompletionStatus` | new | `dataclasses` | result/request tests |
| `ai/errors.py` | normalized error taxonomy | new | — | error tests |
| `ai/providers/__init__.py` | provider registry | new | — | selection test |
| `ai/providers/deepseek.py` | `DeepSeekProvider` skeleton | new | `interface`,`types`,`errors` | isolation test (no HTTP) |
| `ai/providers/fake.py` | `FakeProvider` | new | `interface`,`types`,`errors` | success/malformed/error/incomplete |
| `ai/service.py` | `AIService` facade | new | `interface`,`providers` | neutral-contract test |
| `ai/tests.py` | interface tests (`run_ai_interface_tests`) | new | stdlib only | self |

No modifications to `hooks.py`, `api.py`, `d1.py`, `permissions.py`, `setup.py`, `pyproject.toml`, `fixtures/`, or any DocType.

## D12.A.17 Verification plan (post-BUILD)

Import/interface test; `FakeProvider` success; `FakeProvider` failure (each error category); incomplete/malformed result; normalized result shape; normalized error shape; **no CRM write** (no `frappe`/DB import in `ai/`); **no credential exposure** (assert secrets absent from `repr`); **no external network** (no `requests`/socket/HTTP import in `ai/`); provider-neutral contract (same test over fake and deepseek-skeleton); DeepSeek-specific isolation (constants present only in `providers/deepseek.py`). No external API call required.

## D12.A.18 Risks

Interface churn in later phases (D12-B…E may require additions); sync-vs-async boundary; accidentally importing `frappe` into `ai/`; over-engineering the skeleton; config boundary touching secrets too early.

## D12.A.19 Unresolved decisions

Async/queue boundary; store instruction text vs reference-only; exact `output_contract` representation; registry mechanism; whether `ai/` stays frappe-free (recommended yes); test runner placement (`ai/tests.py` vs extend `tests.py`).

## D12.A.20 Approval required before D12-A BUILD

Explicit human approval of this D12-A plan, then a **D12-A BUILD authorization**. BUILD limited to the new `feeljapank_crm/ai/**` files above — no HTTP, no credentials, no config, no DocTypes, no CRM writes.

---

# FK-D12-B — Transport + Credentials + Minimum-Necessary Egress (PLAN ONLY)

**Status: PLAN ONLY (BUILD not authorized).** Builds on frozen D12-A. No live DeepSeek call, no key, no config change, no dependency install.

## D12.B.1 Transport architecture

```text
AIService → AIProvider → DeepSeekProvider
                              ├─ EgressFilter (ai/egress.py)      # minimum-necessary, size caps, redaction
                              ├─ Transport protocol (ai/transport.py) → HTTPTransport (stdlib urllib, TLS, timeouts, no redirects)
                              └─ credentials injected from frappe-aware wiring (outside ai/)
AIService is constructed by a frappe-aware wiring module (`feeljapank_crm/ai_wiring.py`) that reads `frappe.conf`.
```

`ai/` stays **frappe-free**; credential retrieval lives outside the `ai/` package and is injected, preserving the D12-A invariant.

## D12.B.2 Repository evidence

- `bench/env/lib/python3.14/site-packages/requests` exists; host `requests 2.33.1` — but the FJK app declares `dependencies = []` (`pyproject.toml`), so `requests` is a **transitive Frappe dependency only**.
- Frappe provides `frappe.utils.get_request_session(max_retries=5)` (uses `requests`; mounts `Retry(total=5, status_forcelist=[500])`; **no timeout set**; followers default redirects) and `frappe.integrations.utils.make_request(...)` (calls `response.raise_for_status()`; on error calls `frappe.log_error()`; **no timeout parameter**; only 500 auto-retried; redirects followed).
- No `frappe.conf`/`requests`/HTTP usage exists in the FJK app today.
- `site_config.json` (gitignored) already stores secrets: `db_password`, `encryption_key`, `whatsapp_app_secret` — the established precedent.
- No proxy env vars set; bench runs in the `frappe/bench` container on default Docker networking (images pinned by digest, FK-D13).

## D12.B.3 HTTP mechanism recommendation

**Prefer stdlib `urllib.request`** with `ssl.create_default_context()`, an explicit `timeout`, and a custom opener with `HTTPRedirectHandler` that **refuses redirects**. Rationale: zero new/undeclared dependency (FK-D13-safe), keeps `ai/` frappe-free, full control of TLS/timeouts/redirects. **Do not** use `frappe.integrations.utils.make_request` (no timeout, follows redirects, broad `log_error`). `requests`/`get_request_session` is an acceptable **alternative only if** a declared dependency is approved later. Recommendation is `urllib` for the first slice.

## D12.B.4 Host allowlist

The outbound URL is assembled **only** from constants: scheme `https`, host `api.deepseek.com`, port `443`, path `/chat/completions`. Provide a single `_assert_approved_url(url)` guard that rejects any other scheme/host/port/path. **No** URL may be derived from source content, AI output, user text, or request payload. Redirects disabled (D12.B.15) so an approved endpoint cannot bounce traffic elsewhere.

## D12.B.5 TLS / HTTPS

HTTPS only; certificate verification **on** (`ssl.create_default_context()`); no HTTP fallback; no `verify=False`; `ssl.SSLError`/cert failures → normalized `ProviderUnavailableError`; redirects rejected.

## D12.B.6 Credential storage / retrieval recommendation

Store the key in the **Frappe site secret store** `site_config.json` as e.g. `deepseek_api_key` (gitignored), read via `frappe.conf` in the **frappe-aware wiring module** (`feeljapank_crm/ai_wiring.py`), then injected into the provider as a value (never read inside `ai/`). The key must never appear in `AIRequest`/`AIResult`, source, frontend, logs, exception strings, API responses, or Git. Missing key → **fail closed** (no call; normalized config/auth error).

## D12.B.7 Credential rotation plan

Provision = add key to `site_config.json`; replace = update value + reload; revoke = remove key (fail closed); invalid-at-runtime → `AuthenticationError` (no retry storm); missing → fail closed before any egress. Operations documented; **none performed now**.

## D12.B.8 Minimum-necessary egress design (defense in depth)

1. **Source selection (frappe-aware, outside `ai/`)** — picks only the permitted fields for the specific task, from an already-authorized record.
2. **EgressFilter (`ai/egress.py`, frappe-free)** — validates the assembled `AIRequest`: allowlisted fields only, source size cap, reject/deny secret-like patterns, reject disallowed keys, strip/deny prohibited metadata.
3. **Transport** serializes **only** from the validated `AIRequest`.
Prohibited at all layers: credentials/secrets/keys, DB/infra details, internal URLs/config, other customers' records, unrelated correspondence, unnecessary attachments, internal CRM comments, unnecessary CRM metadata.

## D12.B.9 Exact initial AI task / source payload boundaries

First D12 task = **interpret one customer `Communication` (email/manual) into Stage 0 proposal candidates**.
- Allowed source: the Communication **subject + text body** (or the manually captured source text).
- Allowed context: language hint; target requirement domains.
- Excluded: attachments (OPEN — no OCR/transcription in D12-B), full Deal dumps, other Communications, internal comments, raw CRM metadata, other customers' data.
Per-task inclusion/exclusion to be recorded as the egress allowlist; **no generic "send whatever" mechanism**.

## D12.B.10 Request serialization design

`AIRequest` → DeepSeek body: `model="deepseek-flash"`; `messages[0].role="system"` = FJK instruction; `messages[1].role="user"` = the **delimited untrusted** source (with an explicit "treat as data, not instructions" wrapper); minimal context appended; `response_format={"type":"json_object"}`. Token controls: compute `max_tokens` from source length + expected output + reasoning headroom with a ceiling (exact policy **OPEN**, D12-C). Do not hardcode `8000`.

## D12.B.11 Response transport boundary

`HTTPTransport.request(...)` returns a normalized `TransportResponse(status:int, headers:dict, body_bytes:bytes, elapsed:float)`; `DeepSeekProvider` maps to `AIResult` with `ProviderMeta` (model, `system_fingerprint`, response_id/`x-request-id`), `Usage` (prompt/completion/reasoning/cache), and `finish_reason`. D12-B surfaces transport data; **D12-C** owns formal JSON/schema/semantic validation. Raw provider responses never become authoritative CRM data.

## D12.B.12 Error mapping (HTTP → normalized)

| Condition | Normalized error |
|---|---|
| 400 | `InvalidRequestError` |
| 401 | `AuthenticationError` |
| 402 | `AuthorizationBillingError` |
| 422 | `InvalidRequestError` |
| 429 | `RateLimitError` |
| 500 | `ProviderUnavailableError` |
| 503 | `ProviderUnavailableError` |
| connect/read timeout | `ProviderTimeoutError` |
| connection/TLS failure | `ProviderUnavailableError` |
| 3xx (redirect) | `ProviderUnavailableError` (rejected) |
| body not parseable | `MalformedResponseError` |

Preliminary retry stance only: treat 401/402/400/422 as non-retryable, 429/500/503/timeout as transient; **final counts/backoff are D12-C/F**.

## D12.B.13 Timeout design

Separate conceptual limits: **connect timeout**, **read timeout** (and optional total). Values **OPEN** (e.g., connect 10 s, read 60 s) but must be **bounded and never `None`**. Basis: synthetic bake-off latency + DeepSeek reasoning latency; to be confirmed.

## D12.B.14 Request/response size controls

Max **response** bytes (e.g., 1 MiB — OPEN) → reject as `MalformedResponseError`/oversized; **no streaming** in the first slice. Max **source** size enforced by the egress filter before any egress; reject oversized input (no partial sends). Attachment/OCR/transcription scope remains **OPEN**.

## D12.B.15 Redirect policy

Redirects **disabled**; any 3xx is rejected (no follow). Prevents an approved endpoint from redirecting traffic to arbitrary hosts.

## D12.B.16 Proxy / environment findings

No proxy env vars set in the shell/docker-compose; direct network. Do not change network config. If standard proxy vars (`HTTPS_PROXY`/`NO_PROXY`) are present at runtime, honor them via the stdlib default handlers (documented), without adding infrastructure.

## D12.B.17 Logging / redaction

Safe: run/request id, provider, model, HTTP status, timing, error category, usage. Never: API key, `Authorization` header, full customer request, full provider response, raw attachment, unrelated CRM data. **Explicitly avoid `frappe.integrations.utils.make_request`** because its `frappe.log_error()` path and `frappe.flags.integration_request` could capture response context. Prefer metadata-only logging; no body logging.

## D12.B.18 API exposure boundary

`AIService`, provider methods and transport functions must **not** be decorated with `@frappe.whitelist` and must not be reachable via Frappe RPC. Server-side invocation only; any future controlled endpoint is a separate design decision.

## D12.B.19 Permission boundary

The egress layer receives data **already authorized** by the calling application path; it performs no broad DB reads (no `frappe.db.get_all("*")`). No bypass of existing Frappe/FJK Deal-mirror permissions.

## D12.B.20 Fake-transport testing strategy

Define a `Transport` protocol; inject it into `DeepSeekProvider`. `FakeTransport` returns deterministic `TransportResponse`s: success, 400/401/402/422/429/500/503, timeout, TLS failure, malformed body, oversized body, blocked-host/redirect, missing credential. **No real API call** in unit tests.

## D12.B.21 Security verification plan

Credential isolation (key absent from `AIRequest`/`AIResult`/exceptions/logs/frontend), host restriction (arbitrary URL rejected), egress restriction (disallowed content cannot enter payload — incl. secret-like patterns), source-injection cannot change transport behavior, response containment (provider response cannot cause CRM mutation), redirect rejected, TLS verified, timeouts bounded.

## D12.B.22 Exact implementation files (proposed; not created)

| File | Responsibility | Frappe dep | Security implication | Tests |
|---|---|---|---|---|
| `feeljapank_crm/ai/transport.py` (new) | `Transport` protocol + `HTTPTransport` (urllib, TLS, timeouts, no redirects, size cap, host allowlist) | none | SSRF/redirect/TLS/size controls | success/error/timeout/TLS/oversized/redirect/blocked-host |
| `feeljapank_crm/ai/egress.py` (new) | `EgressFilter`: allowlist, size caps, secret redaction/deny | none | prevents prohibited egress | allow/deny/oversize/secret-pattern |
| `feeljapank_crm/ai/config.py` (new) | `ProviderConfig` + `SecretProvider` protocol (no I/O) | none | keeps secrets out of `ai/` | config shape/missing-key |
| `feeljapank_crm/ai/providers/deepseek.py` (modify) | implement `interpret` via injected transport+key; `_serialize`; error mapping | none | egress boundary | mapping + serialization |
| `feeljapank_crm/ai/service.py` (modify) | accept injected provider/config | none | no authority | construction |
| `feeljapank_crm/ai/tests.py` (extend) | transport/egress/security tests | none | redaction assertions | self |
| `feeljapank_crm/ai_wiring.py` (new, **outside** `ai/`) | frappe-aware: read `frappe.conf["deepseek_api_key"]`, build provider | frappe | secret retrieval server-side | config/missing-key |

No changes to hooks/api/d1/permissions/setup/pyproject/fixtures/DocTypes. **No new dependency** (stdlib).

## D12.B.23 Unresolved decisions

Timeout values; response/source size caps; exact source-field allowlist; attachment/OCR/transcription scope; final token policy; retry counts/backoff (D12-C/F); proxy handling confirmation.

## D12.B.24 Risks

SSRF/redirect; secret leakage via logs/exceptions; oversized payloads; undeclared `requests` dependency if chosen over stdlib; TLS misconfiguration; scope creep into validation (D12-C) or OCR.

## D12.B.25 Approval required before BUILD

Explicit human approval of this D12-B plan, then a **separate D12-B BUILD authorization** limited to the files in D12.B.22 — **no live call, no key creation, no config change, no dependency install, no CRM/DocType changes**.

---

# FK-D12-C — Response / JSON / Schema / Semantic Validation (PLAN ONLY)

**Status: PLAN ONLY (BUILD NOT AUTHORIZED).** D12-A/B are frozen; D12-B returned `73/73` tests. D12-C turns an untrusted provider response into a validated, non-authoritative normalized proposal candidate.

## D12.C.1 Executive assessment

D12-B already delivers a bounded transport response and surfaces `model`/`system_fingerprint`/`response_id`/`usage`/`finish_reason`. **D12-B deliberately returns `proposals=[]`** (raw extraction deferred); the raw parsed payload is currently discarded inside `DeepSeekProvider._parse`. D12-C is therefore the layer that (a) obtains the raw parsed payload, (b) validates it, (c) emits normalized non-authoritative candidates. Hand-rolled validation (no `jsonschema` dependency) keeps the zero-dependency, frappe-free invariant.

## D12.C.2 Current D12-A/B contract (as actually implemented — FACT)

- `AIRequest(instruction_ref, instruction, source_kind, source_id, source_text, output_contract_ref, context, request_meta)`.
- `AIResult(provider_meta, status, proposals: list[dict], usage, finish_reason, error)`.
- `ProviderMeta(provider, model, model_fingerprint, request_id, response_id)`; `Usage(input/output/total/reasoning/cached)`; `CompletionStatus{OK,ERROR}`.
- Errors: `AIProviderError` + categories `AUTHENTICATION, AUTHORIZATION_BILLING, INVALID_REQUEST, RATE_LIMIT, PROVIDER_UNAVAILABLE, TIMEOUT, MALFORMED_RESPONSE, INCOMPLETE_RESPONSE, VALIDATION`.
- `TransportResponse(status, headers, body, elapsed)` with `.json()` raising `MalformedResponseError`.
- `DeepSeekProvider.interpret` fails closed without a key, calls the injected transport, parses JSON, returns metadata **and `proposals=[]`** (raw payload discarded).
- `AIService` applies optional `EgressFilter` then delegates to the provider.

## D12.C.3 Responsibility boundary

D12-C owns: transport-completeness gating (`finish_reason`), JSON parsing/validation, application-side schema validation, semantic validation, security/policy validation, and normalization into non-authoritative candidates. D12-C does **not** own: transport errors/retry (D12-B), human review, promotion, persistence/DocTypes, Deal resolution authority, or Information Status.

## D12.C.4 Exact validation pipeline

```text
TransportResponse (D12-B)
  → finish_reason gate        (stop=continue; length/other=reject; missing=reject)
  → JSON parse                (MalformedResponseError)
  → top-level shape check     (object with "proposals": list)
  → schema validation         (required/type/enum/size; strip unknown fields)
  → semantic validation       (value plausibility vs FJK-supported constraints)
  → security/policy validation(deny authority/credential/instruction attempts)
  → normalization             (deterministic; non-authoritative)
  → normalized candidate(s)   (proposals=…)
  → [later] provenance/run + proposal persistence (D12-D/E)
```

## D12.C.5 JSON contract

- Parse point: after the `finish_reason` gate, operating on `TransportResponse.body`/`.json()`.
- Accepted top-level type: **object** containing `"proposals": [ … ]`. Malformed JSON, empty body, `null`, arrays, or scalars at top level → `MalformedResponseError`/`ValidationError`.
- Unknown top-level keys: **ignored** (stripped).
- Duplicate JSON keys: **OPEN** (stdlib `json` keeps the last; explicit rejection deferred).
- Max response size: enforced by D12-B (`max_response_bytes`); D12-C does not re-implement it but may set per-field caps.
- `json_object` is **not** treated as schema assurance (FACT from O07 evidence).

## D12.C.6 Proposed schema (normalized proposal candidate)

Envelope object:
```json
{
  "proposals": [ candidate, ... ],
  "deal_resolution": { "candidates": [ ... ], "ambiguity": "..." },
  "missing_information": [ "..." ],
  "ambiguities": [ "..." ]
}
```
Candidate:
```json
{
  "domain": "<enum>",
  "logical_key": "<string>",
  "proposed_value": "<scalar|string>",
  "provenance_status": "explicit|inferred|ambiguous",
  "proposed_value_type": "<optional string>",
  "status_hint": "KNOWN|MISSING|TO CONFIRM",
  "confidence": 0.0,
  "uncertainty": "<optional string>",
  "evidence_span": "<optional string>",
  "target_hint": "<optional string>"
}
```

## D12.C.7 Required / optional / forbidden

- **Required:** `proposals` (list, may be empty); per candidate `domain`, `logical_key`, `proposed_value`, `provenance_status`.
- **Optional:** `proposed_value_type`, `status_hint`, `confidence`, `uncertainty`, `evidence_span`, `target_hint`; envelope `deal_resolution`, `missing_information`, `ambiguities`.
- **Forbidden / neutralized (never authoritative):** any field/value asserting authority or side effects — e.g. `deal`/`selected_deal`/`organization`/`contact`; `customer_confirmed`; `info_complete`; `ready_for_quotation`; `approved`; `promotion`; `actions`/`tool_calls`; `supplier_quotation`/`customer_quotation`; `crm_write`/`sql`/`code`. **Known-forbidden keys → security/policy rejection**; unknown keys → stripped.

## D12.C.8 Semantic validation rules

`domain` ∈ FJK domains {Accommodation, Transportation, Meals, Flights, Special Requirements, Other, Tour Guide, Activities & Tickets} (FACT from doctypes); `provenance_status` ∈ {explicit, inferred, ambiguous}; `status_hint` ∈ {KNOWN, MISSING, TO CONFIRM} (**CUSTOMER-CONFIRMED forbidden**; `NOT APPLICABLE` OPEN); `confidence` ∈ [0,1]; string/array size caps; `proposed_value` non-empty; secret-pattern scan reuses the D12-B patterns. **OPEN:** strict date/`impossible-date` rules, contradiction detection scope, `evidence_span` format (no repository rule yet — do not invent).

## D12.C.9 Provenance binding

Attach, without creating DocTypes: source identity (`source_kind`/`source_id`/hash where available), `instruction_ref`/`output_contract_ref`, provider identity (`provider`/`model`/`model_fingerprint`), provider `response_id`, timestamp, and each candidate's `evidence_span`. Run/Proposal persistence remains **D12-D/E**; D12-C returns candidates + a non-persisted run context.

## D12.C.10 Deal-resolution boundary

`deal_resolution` may carry `candidates` and `ambiguity` only. `selected` is **not** part of the schema; if present (or any authoritative-selection field) → security/policy rejection. Frozen rule `selected=null` / `human_required=true` is enforced by construction (validator emits candidates only). Native `reference_*` is untouched.

## D12.C.11 Information-Status boundary

`status_hint` is a **hint only**; `CUSTOMER-CONFIRMED` is rejected; `Info Complete`/`Ready for Quotation` are forbidden keys. Validation never produces an authoritative Information Status.

## D12.C.12 Prompt-injection / output-security

Provider output is untrusted. Denylisted authority/instruction attempts → `PolicyViolationError`. Tool/SQL/Python/Frappe-API/CRM-mutation instructions are never executed (the validator returns data only; no `eval`, no dispatch). Secret-like values → policy rejection (reuse D12-B egress patterns). Non-authority extra text is retained only as proposal string values.

## D12.C.13 Error taxonomy

Reuse existing classes: `IncompleteResponseError` (finish_reason=length/other), `MalformedResponseError` (JSON/shape), `ValidationError` (schema/semantic). **PROPOSAL:** add additive `PolicyViolationError` (a `ValidationError` subclass) for authority/credential/instruction attempts. No new categories invented merely for terminology.

## D12.C.14 Retry ownership

D12-C does **not** retry. Frozen: D12-B = transport retry; D12-C = validation; D12-F = hardening/idempotency/reprocessing. D12-C may *recommend* a bounded re-ask but does not implement it; no validation-failure retry loops.

## D12.C.15 Offline test matrix

Valid (valid JSON, 1 candidate, multiple, optional fields, partial set, empty `proposals`); transport gate (`stop`, `length`, missing, provider error already mapped); JSON (malformed, empty, `null`, array, scalar); schema (missing required, wrong type, invalid enum, unknown field stripped, null when forbidden, oversize); semantic (empty value, bad confidence, invalid domain, invalid `status_hint`, invalid `provenance_status`, secret-like value); security (CRM instruction, credentials, internal URL, authoritative Deal selection, Info Complete, customer confirmation, arbitrary DocType/field mutation); provenance (metadata preserved, response id preserved, non-authoritative). All offline via `FakeTransport`/direct payloads; **no live call**.

## D12.C.16 Exact proposed files (not created)

| File | Change | Notes |
|---|---|---|
| `ai/schema.py` | new | frappe-free schema constants (domains/enums/limits/denylist) |
| `ai/validation.py` | new | `ProposalValidator.validate(payload, request, provider_meta) -> list[dict]` |
| `ai/types.py` | modify (additive) | add `AIResult.raw_payload: dict | None = field(default=None, repr=False)` (transient, untrusted, non-persisted — see D12.C.21) |
| `ai/errors.py` | modify (additive) | add `PolicyViolationError` (PROPOSAL) |
| `ai/providers/deepseek.py` | modify | set `raw_payload` from parsed response (no validation here) |
| `ai/service.py` | modify | run validator after provider when configured |
| `ai/tests.py` | modify | D12-C offline test matrix |

No new dependency (hand-rolled validation). No DocTypes/DB/CRM/config/credentials.

## D12.C.17 Open questions

Exact top-level contract wording (instruction must request it); duplicate-key handling; strict date/contradiction rules; `NOT APPLICABLE`; `evidence_span` format; confidence scale; D12-C vs D12-D boundary for run identity. *(Raw provider-payload handoff is now RESOLVED — see D12.C.21.)*

## D12.C.18 Risks

Overly strict schema rejecting valid output; validator drift from FJK enums; silent normalization changing meaning; authority attempts slipping through unknown keys; adding complexity ahead of D12-D/E.

## D12.C.19 Documentation change

Update this Implementation Plan (§FK-D12-C) and the Implementation Log. No new D12-C decision file.

## D12.C.20 Approval required

Explicit human PLAN review, then a **separate D12-C BUILD authorization** for the D12.C.16 files — **no live call, no credentials, no DocTypes/DB/CRM, no dependency install**.

## D12.C.21 Raw provider-payload handoff contract (RESOLVED)

This resolves the D12-C.17 OPEN item "raw-payload handoff". It defines the exact contract, lifecycle, trust classification and non-persistence boundary between D12-B (transport) and D12-C (validation). It changes no other D12-C decision.

### D12.C.21.1 Contract

- **Carrier:** a single additive field `AIResult.raw_payload: dict | None` (`field(default=None, repr=False)`), provider-neutral. No new return type, no second channel, no global/side channel.
- **Writer:** only a provider implementation (`DeepSeekProvider`) sets it — and only to the JSON **object** parsed from the D12-B `TransportResponse` body. If the parsed body is not a JSON object, the provider raises `MalformedResponseError` and sets nothing (raw is never an array/scalar).
- **Reader:** only `ProposalValidator.validate(...)` (D12-C), invoked by `AIService`.
- **Cleared by:** `AIService` — `raw_payload` is set to `None` before the `AIResult` is returned, in every path (success, validation failure, or no-validator configured).
- **`repr=False` is mandatory:** the field must never appear in `repr()`/log output (it carries untrusted, customer-derived content).

### D12.C.21.2 Lifecycle (synchronous, in-process only)

```text
D12-B: transport body → json parse (object) → AIResult.raw_payload = <parsed dict>, proposals=[]
D12-C: AIService → ProposalValidator.validate(raw_payload, request, provider_meta, finish_reason)
         → validated normalized candidates  (or raises IncompleteResponseError / MalformedResponseError / ValidationError / PolicyViolationError)
AIService: result.proposals = candidates ; result.raw_payload = None
```

- The handoff is **in-memory and synchronous**; there is no storage between D12-B and D12-C.
- The `finish_reason` gate runs **before** the raw payload is consumed: `length`/other/missing ⇒ `IncompleteResponseError`, raw discarded.
- **Fail-closed rule:** if no validator is configured, `proposals` stays `[]` **and** `raw_payload` is cleared — unvalidated provider output never becomes a proposal and never leaves the service.
- On any validation error, the exception message/`provider_detail` **must not embed raw payload content**; the `AIResult` is discarded.

### D12.C.21.3 Trust classification

| Object | Trust | Authority | Persistence |
|---|---|---|---|
| `TransportResponse.body` (D12-B) | UNTRUSTED provider data | none | never persisted |
| `AIResult.raw_payload` (D12-B→D12-C) | UNTRUSTED provider data, **transient** | none | **never persisted / never logged / repr-suppressed** |
| `AIResult.proposals` (validated candidates, D12-C) | derived, still NON-authoritative (proposals only) | none | persistence is D12-D/E; never authoritative CRM |
| Authoritative CRM value | — | human promotion only (O04/O05) | D12-E+ |

`raw_payload` is treated as hostile data: never interpreted as instructions, never executed (no `eval`/dispatch), never mapped directly to a DocType/field, never used to set Deal/Company/Contact/confirmation/Information-Status authority.

### D12.C.21.4 Non-persistence / non-authoritative boundary

- `raw_payload` **must not** be written to any DocType, database row, cache, file, log, or API response. Enforced by construction: cleared in `AIService` before return + `repr=False` + logging policy (D12-B §17).
- Retention of the raw provider response is **not required** and is **not authorized**; provenance uses `response_id`/`model_fingerprint` (O01/O08).
- Validated `proposals` remain **non-authoritative**; no path in D12-C yields an authoritative CRM value or an Information-Status transition.
- The validator returns data only; it performs no I/O and no DocType access.

### D12.C.21.5 Boundary with D12-B and D12-D

- **D12-B unchanged in behaviour:** it still owns transport/parse/error-mapping and (per its own frozen clarification) does not retry semantics beyond its bounded mechanism; the only D12-B change is *exposing* the already-parsed object via `raw_payload` instead of discarding it.
- **D12-D/E:** may persist run metadata (provider identity, `response_id`, `model_fingerprint`, timestamps, state, usage) and validated proposals. They must **not** persist `raw_payload`.

---

# FK-D12-D — Persistence / Provenance Run & Proposal PLAN (PLAN ONLY)

**Status: PLAN ONLY (BUILD NOT AUTHORIZED).** Baseline frozen at commit `4242178` (D12-A/B/C, `116/116`). D12-D designs the durable representation of the AI interpretation event and validated non-authoritative proposals; it does not implement review, promotion, or authoritative writes.

**Reviewer corrections resolved (2026-10-07):** (1) Run immutability split into **Immutable Run facts** vs **Terminal outcome fields** with an exactly-once invariant (D12.D.5); (2) `run_key` canonicalized with a mandatory **`source_state_ref`** discriminator covering the no-hash case (D12.D.8); (3) **Deal-candidate persistence is DEFERRED/BLOCKED** — `FJK AI Deal Candidate` is removed from the D12-D BUILD scope and `deal_candidates` is removed from the Run model, because frozen D12-C does not expose `deal_resolution` (D12.D.5.1). D12-D BUILD scope = `FJK AI Interpretation Run` + `FJK AI Proposal` only. D12-C is **not** reopened or modified; no placeholder DocType is created. **BUILD NOT AUTHORIZED.**

## D12.D.1 Executive assessment

The AI pipeline currently has **no durable record**. `AIService` returns validated `AIResult.proposals` in memory only; `raw_payload` is transient. O01 requires that a future authoritative value be reconstructable to *source evidence → AI proposal*; O02/O04/O05 require datum-level, append-only proposal history with lifecycle and future disposition/promotion anchors. D12-D must therefore design the minimum **append-only** persistent structures that hold the validated proposals and the run metadata, keeping the source as a *reference* (no duplicate source store) and never persisting the raw provider payload.

## D12.D.2 Existing repository evidence (FACT)

- FJK app has **11 DocTypes** (all requirements/allocations are **child tables** on `CRM Deal` via custom fields; FJK Quotation* are standalone). **No** "Request Summary" DocType exists ("Request Summary" is an operational concept only).
- No AI/run/proposal/provenance structure exists in the FJK app.
- Native `File` has `content_hash`, `file_url`, `attached_to_doctype`, `attached_to_name`, `file_name`, `is_private`, `file_size` → file-backed evidence identity supported.
- Native `Communication` has `subject`, `content`, `communication_medium`, `communication_type`, `sender`, `sent_or_received`, `communication_date`, `reference_doctype`, `reference_name` → native source identity supported.
- Native tracking mechanisms exist (`Version`, `Comment`, `Activity Log`); `CRM Deal` is the sole commercial container. FJK permissions mirror the linked Deal (`permissions.py`); `hooks.py` registers `has_permission` + a Deal `validate` hook.
- Frozen `ai/` output contract (FACT): `AIResult.proposals` items have allowed keys `domain, logical_key, proposed_value, proposed_value_type, status_hint, confidence, uncertainty, evidence_span, target_hint, provenance_status`; `ProviderMeta = {provider, model, model_fingerprint, request_id, response_id}`; `Usage = {input/output/total/reasoning/cached}`; plus `finish_reason` and error `category`.

## D12.D.3 Native-first comparison

| Criterion | A: native only | B: FJK tables + native history | C: dedicated Run + Proposal | D: single Proposal (no Run) |
|---|---|---|---|---|
| O01 provenance completeness | Fails (no structured AI layer) | Fails (conflates proposed vs authoritative) | **Pass** | Partial (run metadata lost) |
| O02 lifecycle at datum level | Fails | Fails | **Pass** | Partial |
| Competing proposals / supersession | Fails | Fails | **Pass** | Partial |
| Append-only immutable original | Weak (Comment text) | Fails (child rows rewritten) | **Pass** | **Pass** |
| Source linkage by reference | Partial | Partial | **Pass** | Pass |
| Provider/run metadata | Fails | Fails | **Pass** | Fails |
| Maintainability / native-first | High (but insufficient) | Mixed | Acceptable | Acceptable |
| Complexity | Low | Low | Medium | Low |

**Conclusion (evidence-based): Option C.** Native `Comment`/`Version`/`Activity Log` cannot express datum-level, independently-lifecycle-able, append-only proposal records with provider metadata (consistent with O01/O02/O04/O05, already established). The existing FJK requirement tables are the **authoritative targets**, so reusing them for proposals would violate O04. A dedicated **Run** parent plus a dedicated **Proposal** doctype (rather than a child table, which is rewritten with its parent and lacks independent addressability) is required.

## D12.D.4 Proposed persistence model

- **`FJK AI Interpretation Run`** — parent DocType; one AI execution; append-only/immutable after completion.
- **`FJK AI Proposal`** — parent DocType; one validated datum candidate; links to a Run; original fields immutable.

No other new structures in D12-D. The source (`Communication`/`File`/…) is referenced, never duplicated. Future Human Decision/Promotion link to `FJK AI Proposal` by reference.

**Deferred (NOT in D12-D BUILD scope):** `FJK AI Deal Candidate` — noted only so a future, separately-authorized decision can address it (see D12.D.5.1). No placeholder DocType is created.

## D12.D.5 Field-level design

### `FJK AI Interpretation Run`

**Run immutability model (two explicit categories):**

- **Immutable Run facts** — set at creation and **never edited thereafter**. `provider_request_id`/`provider_response_id` are only known after the provider call, so they are **write-once during the outcome update** and immutable once set.
- **Terminal outcome fields** — created in the initial `PROCESSING` state and may transition **exactly once** to a terminal outcome.

> **Invariant:** Historical Run identity/provenance facts cannot be edited after creation; processing outcome may be completed **exactly once** according to the approved state model. `status` starts at `PROCESSING` and ends in exactly one terminal value (`SUCCEEDED`, `FAILED`, `INCOMPLETE`, `MALFORMED`, `VALIDATION_FAILED`, `POLICY_REJECTED`); no other Run states exist. (`PROCESSING` is the initial non-terminal state required by the exactly-once invariant, not an added outcome state.)

#### Immutable Run facts

| Field | Type | Purpose | Req | Mut | Source | Governance |
|---|---|---|---|---|---|---|
| `naming_series` | Select `FJK-AIRUN-.YYYY.-` | identity | Y | Immutable | app | O01 |
| `run_key` | Data (unique) | idempotency identity (D12.D.8) | Y | Immutable | derived | O02/D12-F |
| `source_doctype` | Link `DocType` | source identity | Y | Immutable | request | O01/O03 |
| `source_name` | Dynamic Link (`source_doctype`) | source record | Y | Immutable | request | O01/O03 |
| `source_state_ref` | Data | canonical source-state identity (D12.D.8) | Y | Immutable | derived | O01/O03 |
| `source_content_hash` | Data | file-backed evidence identity | Opt | Immutable | `File.content_hash` | O03 |
| `source_timestamp` | Datetime | source time | Opt | Immutable | `Communication.communication_date`/File | O01 |
| `instruction_ref` | Data | FJK instruction version | Y | Immutable | `AIRequest.instruction_ref` | O01 |
| `output_contract_ref` | Data | contract version | Y | Immutable | `AIRequest.output_contract_ref` | O01 |
| `provider` | Data | provider | Y | Immutable | `ProviderMeta.provider` | O01 |
| `model` | Data | model id | Y | Immutable | `ProviderMeta.model` | O01 |
| `model_fingerprint` | Data | model snapshot id | Opt | Immutable | `ProviderMeta.model_fingerprint` | O01 |
| `provider_request_id` | Data | provider request id (write-once at outcome) | Opt | Immutable | `ProviderMeta.request_id` | O01 |
| `provider_response_id` | Data | provider response id (write-once at outcome) | Opt | Immutable | `ProviderMeta.response_id` | O01 |
| `started_at` | Datetime | creation/start timestamp | Y | Immutable | service | O01 |

#### Terminal outcome fields (`PROCESSING` → exactly one terminal)

| Field | Type | Purpose | Req | Mut | Source | Governance |
|---|---|---|---|---|---|---|
| `status` | Select `PROCESSING/SUCCEEDED/FAILED/INCOMPLETE/MALFORMED/VALIDATION_FAILED/POLICY_REJECTED` | processing→terminal outcome | Y | Once | mapped from D12-B/C error taxonomy | O01 |
| `completed_at` | Datetime | end | Opt | Once | service | O01 |
| `finish_reason` | Data | completion reason | Opt | Once | `AIResult.finish_reason` | O07 |
| `error_category` | Data | normalized error category | Opt | Once | `AIProviderError.category` | O01 |
| `error_message_redacted` | Small Text | redacted failure detail | Opt | Once | service | O08 |
| `usage_input_tokens` | Int | usage | Opt | Once | `Usage.input_tokens` | — |
| `usage_output_tokens` | Int | usage | Opt | Once | `Usage.output_tokens` | — |
| `usage_total_tokens` | Int | usage | Opt | Once | `Usage.total_tokens` | — |
| `usage_reasoning_tokens` | Int | usage | Opt | Once | `Usage.reasoning_tokens` | — |
| `usage_cached_tokens` | Int | usage | Opt | Once | `Usage.cached_tokens` | — |
| `elapsed_seconds` | Float | timing | Opt | Once | transport `elapsed` | — |
| `proposal_count` | Int | integrity/audit | Y | Once | service | O01 |

### `FJK AI Proposal` (original fields immutable)

| Field | Type | Purpose | Req | Mut | Source | Governance |
|---|---|---|---|---|---|---|
| `naming_series` | Select `FJK-AIPROP-.YYYY.-` | identity | Y | No | app | O01 |
| `run` | Link `FJK AI Interpretation Run` | parent run | Y | No | service | O01 |
| `source_doctype` | Link `DocType` | denormalized source ref | Opt | No | run | O01 |
| `source_name` | Dynamic Link (`source_doctype`) | denormalized source | Opt | No | run | O01 |
| `domain` | Select (FJK domains) | datum domain | Y | No | proposal | O01 |
| `logical_key` | Data | datum identity | Y | No | proposal | O04 |
| `proposed_value` | Small Text | proposed value | Y | No | proposal | O01 |
| `proposed_value_type` | Data | value type | Opt | No | proposal | — |
| `provenance_status` | Select `explicit/inferred/ambiguous` | explicit vs inferred | Y | No | proposal | FK-D18 |
| `status_hint` | Select `KNOWN/MISSING/TO CONFIRM` | information hint | Opt | No | proposal | Information Status |
| `confidence` | Float (0–1) | model confidence | Opt | No | proposal | O05 |
| `uncertainty` | Small Text | uncertainty note | Opt | No | proposal | FK-D18 |
| `evidence_span` | Small Text | source span | Opt | No | proposal | O01 |
| `target_hint` | Data | proposed target (informational) | Opt | No | proposal | O04 |
| `lifecycle_state` | Select `PROPOSED/ACCEPTED/EDITED_ACCEPTED/REJECTED/DEFERRED/SUPERSEDED` (default `PROPOSED`) | O02 state anchor | Y | Yes (D12-E) | service | O02 |
| `created_at` | Datetime | creation (immutable anchor) | Y | No | framework | O01 |

**Reserved for D12-E (design recorded, NOT created/populated in D12-D):** `disposition` (or reuse `lifecycle_state`), `reviewed_by` (Link User), `reviewed_at` (Datetime), `edited_value` (Small Text), `review_reason` (Small Text), `superseded_by`/`supersedes` (Link `FJK AI Proposal`), `promotion_ref` (anchor). These preserve O05/O04 provenance later; their behaviour is D12-E/F.

### `FJK AI Deal Candidate` — D12.D.5.1 (DEFERRED / NOT IN D12-D BUILD SCOPE)

**Decision:** Deal-candidate persistence is **DEFERRED / BLOCKED**. `FJK AI Deal Candidate` is **removed from the D12-D BUILD scope** and **will not be created** in D12-D (no placeholder DocType). `deal_candidates` is removed from the `FJK AI Interpretation Run` model.

**Reason (FACT):** frozen D12-C validates `deal_resolution` but does **not** expose it — `AIResult.proposals` contains datum candidates only (`validation.py` validates `deal_resolution`, then returns only the proposal list). D12-D must not reopen or modify D12-C (frozen at `4242178`) merely to create a persistence target for data D12-C does not emit.

**Governance boundary preserved:** Deal resolution remains **separate** from ordinary proposals. D12-D persists **no** authoritative Deal selection, confirmed Deal, human resolution, promotion, Company authority, or Contact authority, and introduces **no** second Deal-resolution representation.

**Future (separately authorized):** a distinct decision must first determine whether D12-C should surface `deal_resolution.candidates` (and its exact contract) before any Deal-candidate persistence is designed or built. Until then this item remains DEFERRED / BLOCKED.

## D12.D.6 Relationships

- `FJK AI Interpretation Run.source_doctype/source_name` → native source (reference only).
- `FJK AI Proposal.run` → Run; denormalized `source_*` for direct traversal.
- Deal-candidate relationships are **not modeled in D12-D** (Deal Candidate deferred — D12.D.5.1).
- **Future (D12-E/promotion):** `FJK AI Proposal` ← Human Decision (link) → Promotion (link to authoritative `CRM Deal`/FJK child row). D12-D only reserves the anchor (`promotion_ref`), created later.

Reverse traversal (future): authoritative value → promotion → decision → proposal → run → source.

## D12.D.7 Lifecycle compatibility (O02)

- Every proposal is created with `lifecycle_state = PROPOSED`; original fields are immutable.
- All six O02 states are **representable** by the Select. D12-D does not implement transitions.
- Competing proposals coexist as separate immutable records; `superseded_by`/`supersedes` (D12-E) provide explicit supersession.
- "One promotable value per datum" is a **promotion-time** constraint (D12-E/D12-F), not a persistence constraint; persistence stays append-only so both competing proposals remain traceable.
- `REJECTED` terminal / `DEFERRED` non-terminal semantics are enforced by D12-E; D12-D only stores the state value.

## D12.D.8 Idempotency / reprocessing identity

**Canonical identity input (source-state discriminator required — resolves the no-hash case):**

```
run_key = sha256("|".join([source_doctype, source_name, source_state_ref, instruction_ref, provider, model]))
```

`source_state_ref` is the canonical **source-state discriminator**, defined even when no file `content_hash` exists, so two distinct source states cannot silently collapse into one run identity:

| Source | `source_state_ref` (canonical) | Basis |
|---|---|---|
| `File` | `"file:" + name + ":" + content_hash` | `File.content_hash` (FACT) |
| `Communication` (no file hash) | `"communication:" + name + ":" + modified` | `Communication.modified` (Frappe write timestamp discriminates edits) |
| Communication with attachment hash | `"communication:" + name + ":" + modified + "|file:" + content_hash` (per attachment, ordered) | attachment `File.content_hash` |
| Generic native doc (no hash) | `"doc:" + doctype + ":" + name + ":" + modified` | Frappe `modified` |
| Compound source | ordered concatenation of the constituents' `source_state_ref`s (deterministic order) — **OPEN** for the exact ordering rule | constituents |

- Stored on Run (`source_state_ref`, immutable) with `run_key` under a **unique index**. No duplicate source store is created — only the discriminator (a hash/timestamp reference) is persisted.
- Same `run_key` ⇒ the same interpretation run (idempotent) — the mechanism is **D12-F**; D12-D defines only the identity + invariant.
- Deliberate reprocessing (force) creates a **new Run** with a distinct key — D12-F defines the trigger; D12-D guarantees append-only (old Run/Proposals remain).
- Source **state** change (Communication edit → new `modified`, or file `content_hash` change) ⇒ new `source_state_ref` ⇒ new `run_key` ⇒ new Run. This holds even when `source_content_hash` is absent.

## D12.D.9 Source version / content hash

Reference the native source (`Communication`/`File`) by identity; for file-backed evidence persist `source_content_hash` (from `File.content_hash`) and `source_timestamp`. **No parallel source store.** Compound sources (e.g., Communication + attachments) are represented by multiple runs referencing each source, or `OPEN` for a compound-source identity in a single run (not invented here).

## D12.D.10 Provider metadata (durable vs forbidden)

- **Durable:** provider, model, model fingerprint, request id, response id, timestamps, finish reason, usage, status, error class.
- **Never durable:** API key, `Authorization` header, raw request, raw response, raw payload, prompt text (unless later governance establishes a need), unrelated source material.

## D12.D.11 Permissions / access (design)

- Mirror the **source** record's read permission (not the Deal) via `Dynamic Link` — because a source may not yet be linked to a Deal (STG0-R01). Add `has_permission` for Run/Proposal that resolves `source_doctype`/`source_name` and defers to `frappe.has_permission(source_doctype, doc=source_name, ptype)`, plus System Manager allowance — extending the existing `permissions.py` pattern.
- Proposal visibility must not grant authoritative CRM write; viewing a proposal is read-only.
- `OPEN`: whether default Sales User access suffices; whether Deal-based fallback is needed when a source is later linked; no new role assumed.
- Not implemented in D12-D.

## D12.D.12 Data retention

- **OPEN:** Frappe-side provenance retention period (no project governance specifies one). No period invented.
- **Boundary:** raw provider payload is **not retained** (D12.D.13); provider-side retention is O08 (accepted residual risk); these are separate concerns.

## D12.D.13 Raw-payload protection (explicit invariant)

D12-D persists **only** `AIResult.proposals` and selected Run metadata. It must never persist `TransportResponse.body`, `AIResult.raw_payload`, any raw JSON envelope, raw prompt, or raw response body. The service already clears `raw_payload` on every path (D12-C); the persistence layer accepts a projection object containing only the allowed fields, so raw content cannot reach a DocType/DB/cache/File/log/API. This is verified (D12.D.15).

## D12.D.14 Failure / partial persistence (audit behaviour)

- Persist the Run with an initial state, then update to a terminal state after the provider/validation call; a failed provider/validation still leaves an auditable Run (`FAILED/INCOMPLETE/MALFORMED/VALIDATION_FAILED/POLICY_REJECTED`) with `error_category` and zero proposals.
- On success, create Run + Proposals in one transaction; `proposal_count` must equal persisted Proposal rows (integrity check).
- Partial proposal write failure must not report success: the Run records the failure and only fully-written proposals remain; no "pretend succeeded". Exact transaction/retry mechanics are **D12-F**; D12-D requires only the invariant that an incomplete operation is never recorded as `SUCCEEDED`.

## D12.D.15 Verification plan (offline / controlled, no live provider, no customer data)

- **Persistence:** Run creation; Proposal creation; source linkage; provider metadata; immutable original (`proposed_*` unchanged after creation); `proposal_count` integrity. **No Deal-candidate persistence** (deferred — D12.D.5.1).
- **Provenance:** source → run → proposal and reverse; multiple proposals per run; multiple runs per source; competing proposals coexist.
- **Lifecycle readiness:** all six states representable; original preserved; edited value preserved (D12-E stub); supersession representable; rejected cannot silently promote.
- **Security:** no `raw_payload`/`TransportResponse.body`/Authorization header/credential persisted; no unrelated source data; permissions respected (source-permission mirror).
- **Authority:** no CRM authoritative write; no Deal `selected`; no Company/Contact authority; no customer confirmation; no Information-Status transition; no Ready for Quotation.
- **Failure:** partial persistence auditability; failed run; validation failure; duplicate `run_key`; reprocessing creates a new run.

Executed via the existing rollback smoke-test pattern (`feeljapank_crm/tests.py`) or `bench --site <site>` against **synthetic** data only; no live DeepSeek call.

## D12.D.16 Documentation change

Update this Implementation Plan (§FK-D12-D), the Verification Plan (V171–V178), and the Implementation Log. No new D12-D decision file; update the canonical Decision Register **only** if a governance decision is actually produced (D12-D is PLAN; none recorded).

## D12.D.17 Open questions

- **Deal-candidate persistence — DEFERRED / BLOCKED (decided):** removed from the D12-D BUILD scope; `FJK AI Deal Candidate` will not be created and `deal_candidates` is removed from the Run. Revisit only via a separate decision on whether/when D12-C surfaces `deal_resolution` (D12.D.5.1).
- **Compound-source identity:** exact deterministic ordering rule for `source_state_ref` across constituents.
- Frappe-side retention period; Sales User access sufficiency; Deal-based permission fallback post-linkage; exact reserved disposition/promotion field shapes (D12-E); transaction boundary mechanics (D12-F).

## D12.D.18 Risks

Over-modeling persistence before D12-E; permission mismatch for unlinked sources; accidental raw-payload persistence via denormalization; idempotency key collisions; scope creep into promotion.

## D12.D.19 Approval required

Explicit human PLAN review, then a **separate D12-D BUILD authorization** limited to creating the **two** DocTypes (`FJK AI Interpretation Run`, `FJK AI Proposal`) + permission hook + service persistence boundary — **no Deal Candidate, no review UI, no promotion, no CRM writes, no live call, no credentials**.

## D12.D.20 BUILD record (2026-10-07) — status COMPLETE (runtime verified 2026-10-07)

**Authorized files created/modified:**
- NEW `feeljapank_crm/feeljapank_crm/doctype/fjk_ai_interpretation_run/{__init__.py,fjk_ai_interpretation_run.json,fjk_ai_interpretation_run.py}`
- NEW `feeljapank_crm/feeljapank_crm/doctype/fjk_ai_proposal/{__init__.py,fjk_ai_proposal.json,fjk_ai_proposal.py}`
- NEW `feeljapank_crm/ai_persistence.py` (persistence boundary; `compute_source_state_ref`, `compute_run_key`, `interpret_and_persist`)
- NEW `feeljapank_crm/ai_persistence_tests.py` (bench/rollback smoke harness; no network)
- MODIFIED `feeljapank_crm/permissions.py` (adds `has_source_permission`), `feeljapank_crm/hooks.py` (registers `has_permission` for the two DocTypes)
- D12-A/B/C under `feeljapank_crm/ai/` **untouched**.

**Verification performed (PASS):** offline AI suite `116 passed, 0 failed`; both DocType JSONs structurally valid with exactly the approved fields; `run_key` unique; `status` initial `PROCESSING` + exactly 6 terminal states; `lifecycle_state` default `PROPOSED`; `status_hint` excludes `CUSTOMER-CONFIRMED`; **no** forbidden fields (`raw_payload`/`deal_candidates`/`selected`/disposition/promotion/Company-Contact authority); exactly two AI DocTypes and no Deal-Candidate dir; static scan shows **no** `raw_payload` persistence and **no** authoritative CRM writes in D12-D code; all new Python files pass `ast.parse`.

**Runtime verification (PASS, 2026-10-07):** executed via the project's containerized bench — `docker compose run --rm frappe` (image `frappe/bench@7cf2354c`, `bench` 5.31.0) against site `crm.localhost`; `bench --site crm.localhost migrate` applied the two DocTypes; then `bench --site crm.localhost execute feeljapank_crm.ai_persistence_tests.run_ai_persistence_tests` → **31 passed, 0 failed** (transaction rolled back; synthetic data only; no network). Evidence: Run created `PROCESSING` → `SUCCEEDED` with `proposal_count` = persisted Proposals (2); provider/model/fingerprint/usage persisted; Proposals link to the Run and start `lifecycle_state=PROPOSED` with the original AI value preserved; `run_key` idempotency (repeat call `reused=True`, exactly one Run row); terminal state cannot revert; **no `raw`-like DB column** on either table; source-permission boundary (Administrator allowed / Guest denied; no new role); failure paths persisted terminal states with 0 proposals — `FAILED` (provider failure), `INCOMPLETE` (`finish_reason=length`), `MALFORMED` (non-JSON), `VALIDATION_FAILED` (missing `proposals`), `POLICY_REJECTED` (forbidden `deal` key). Offline AI suite unchanged at `116 passed, 0 failed`.

**Deviations from PLAN (recorded):**
- Usage fields follow the BUILD authorization (`usage_cache_hit_tokens`/`usage_cache_miss_tokens`); D12-C `Usage.cached_tokens` maps to cache-hit and cache-miss is stored `0`; D12-C `reasoning_tokens` is not persisted (not in the authorized field list).
- `interpret_and_persist` persists the Run with `ignore_permissions=True` (system-generated provenance records) and commits after the PROCESSING insert for crash auditability; **full transaction/retry/reprocessing semantics remain D12-F**.
- Persistence validates/uses only `AIResult.proposals`; it does not reference `raw_payload`.

**Deal Candidate remains DEFERRED / BLOCKED** (D12.D.5.1); not created.

---

# FK-D12-E — Proposal / Human Review Handoff PLAN (PLAN ONLY)

**Status: PLAN ONLY (BUILD NOT AUTHORIZED).** Baseline: D12-A/B/C frozen at `4242178`; D12-D PASS/FROZEN (runtime-verified). D12-E designs the human review/disposition handoff and ends at **promotion eligibility** — it does **not** implement authoritative promotion.

**Reviewer corrections resolved (2026-10-07):** (1) exact lifecycle transitions (DEFERRED explicitly non-terminal; no other transitions); (2) decision history explicitly append-only, enforced by controller guards (not child-table convention); (3) `SUPERSEDED` requires `superseded_by` with a traceable successor (no "latest wins", no automatic supersession on change of mind); (4) reviewer permission is evidence-based (no hard-coded role; investigate role mapping before BUILD; no new role); (5) `EDITED_ACCEPTED` requires `edited_value`, original immutable, no CRM write; (6) target validation uses the actual D12-C contract (no invented target set; `logical_key`/`target_hint` are hints, never addressable); (7) the API choice stays OPEN pending BUILD inspection. No other D12-E decision changed.

## D12.E.1 Current-state findings (FACT)

- `FJK AI Interpretation Run` (immutable facts + single PROCESSING→terminal outcome) and `FJK AI Proposal` (immutable original AI fields + `lifecycle_state` default `PROPOSED`) exist; Proposals link to their Run.
- `ai_persistence.py` writes only validated `AIResult.proposals`; **no `raw_payload`**, no CRM writes.
- Permission pattern: `permissions.py:has_source_permission` mirrors the **source** record; `hooks.py` registers it for both AI DocTypes.
- Established repo patterns: **append-only child tables** for review-like history (`FJK Quotation.confirmations`, `.negotiation_entries`) with `actor`/`date`/`source`/`evidence`/`notes`, written by **whitelisted APIs** (`api.py:confirm_version`, `add_negotiation_entry`) that call `doc.check_permission("write")` and use `frappe.session.user`.
- `api.py:set_info_complete` mutates the Deal's authoritative `fjk_info_complete` — this is the **authority pattern D12-E must NOT follow** for AI proposals.
- UI: a Frappe **Page** (`fjk_workspace`) + **Workspace** (`feeljapank`) + built bundle; native DocType forms/list views are available. No generic AI dashboard exists.
- D12-C does **not** expose `deal_resolution` (validated but dropped) → Deal-resolution persistence remains **DEFERRED/BLOCKED** (D12.D.5.1).

## D12.E.2 Native-first evaluation (representation)

| Criterion | A: Proposal `lifecycle_state` only | B: Proposal + `FJK AI Proposal Decision` child | C: separate Human Decision DocType |
|---|---|---|---|
| O02 lifecycle current state | Partial (no history) | **Pass** | Pass |
| Append-only decision history | Fails | **Pass** (child rows + guard) | Pass |
| Multiple dispositions over time | Fails | **Pass** | Pass |
| Supersession / edited acceptance | Fails | **Pass** | Pass |
| Reviewer + timestamp + edited value | Fails | **Pass** | Pass |
| Matches existing repo pattern | — | **Pass** (like `confirmations`) | New top-level doc + perms |
| Complexity / native-first | Low but insufficient | **Low/medium** | Higher |

**Recommendation: Option B** — keep `FJK AI Proposal.lifecycle_state` as the **current** state, and add an append-only child table `FJK AI Proposal Decision` recording each disposition. This mirrors the repo's existing append-only child-table convention, avoids a new top-level DocType/permission surface, and preserves per-proposal history. Option C is not justified by repository evidence.

## D12.E.3 Recommended representation & fields

**New child DocType `FJK AI Proposal Decision` (`istable: 1`)** on `FJK AI Proposal` (field `decisions`, Table):

| Field | Type | Purpose | Req | Mut |
|---|---|---|---|---|
| `disposition` | Select `ACCEPTED/EDITED_ACCEPTED/REJECTED/DEFERRED/SUPERSEDED` | the human decision | Y | Immutable (append-only) |
| `from_state` | Select (6 states) | state before decision | Y | Immutable |
| `to_state` | Select (6 states) | state after decision | Y | Immutable |
| `reviewer` | Link `User` | attribution | Y | Immutable |
| `decided_at` | Datetime | timestamp | Y | Immutable |
| `edited_value` | Small Text | human-edited value (EDITED_ACCEPTED) | Opt | Immutable |
| `reason` | Small Text | reason/notes (optional except where a rule requires it) | Opt | Immutable |
| `superseded_by` | Link `FJK AI Proposal` | explicit supersession target (SUPERSEDED) | Opt | Immutable |

**`FJK AI Proposal`** gains only `decisions` (Table) + controller guard. `lifecycle_state` remains the derived current state (updated only by the disposition action). No new states beyond O02.

> **Append-only invariant (NOT reliant on ordinary child-table behaviour):** existing `FJK AI Proposal Decision` rows are **immutable historical records**. A decision row cannot be **edited, deleted, reassigned to another reviewer, re-timestamped, re-dispositioned, or have its `edited_value` changed**. Every subsequent human decision creates a **new** row. This MUST be enforced by controller guards that raise on any attempted modification/deletion of an existing row — not by convention.

## D12.E.4 Lifecycle transition model

```
PROPOSED
 ├─ ACCEPTED
 ├─ EDITED_ACCEPTED
 ├─ REJECTED
 ├─ DEFERRED
 └─ SUPERSEDED

DEFERRED
 ├─ ACCEPTED
 ├─ EDITED_ACCEPTED
 ├─ REJECTED
 └─ SUPERSEDED          (DEFERRED is explicitly non-terminal)

ACCEPTED
 └─ SUPERSEDED

EDITED_ACCEPTED
 └─ SUPERSEDED

REJECTED
 └─ terminal

SUPERSEDED
 └─ terminal
```

No other transitions.

- Promotion-eligible ⇔ `lifecycle_state ∈ {ACCEPTED, EDITED_ACCEPTED}`.
- `REJECTED`/`SUPERSEDED` can never become promotion-eligible without a **new** (reprocessed) proposal.
- Supersession is **explicit**: a `SUPERSEDED` decision **must** name the successor (`superseded_by` required) and the successor Proposal must be traceable. "Latest record wins" is **not** supersession, and a human change of mind is **not** automatic supersession.
- Every transition appends exactly one new immutable decision row (`from_state`/`to_state`).

## D12.E.5 Human disposition semantics

- **ACCEPTED** — value unchanged; original AI value preserved; sets eligible.
- **EDITED_ACCEPTED** — `edited_value` is **required**; stored in the decision row; the Proposal's immutable `proposed_value` is untouched (original reconstructable); sets eligible; the effective promotable value is `edited_value`; editing never modifies the original Proposal value and never writes the authoritative CRM target.
- **REJECTED** — terminal; never silently eligible.
- **DEFERRED** — explicitly **non-terminal**; not eligible; may be re-reviewed.
- **SUPERSEDED** — explicit; terminal; **`superseded_by` is required** and the successor Proposal must be traceable; never automatic on a change of mind.

## D12.E.6 Datum-level requirement

Review operates at **Proposal (datum) level**. One Run → many Proposals, each independently disposed (A ACCEPTED, B EDITED_ACCEPTED, C REJECTED, D DEFERRED). No Run-level "approved" flag; Run-level rollups are derived only and never replace datum decisions.

## D12.E.7 Review UX / API boundary

- **UX:** reuse native `FJK AI Proposal` form (shows immutable AI fields + `decisions` child grid) and `FJK AI Interpretation Run` form for context; surface source via `run.source_doctype/source_name`. Optionally extend the existing `fjk_workspace` page — **no generic AI dashboard**.
- Reviewer must see: source reference/evidence, AI proposed value, target datum (`domain`/`logical_key`/`target_hint`), `provenance_status`, `evidence_span`, `confidence`/`uncertainty`, current lifecycle, prior decision history, reviewer/timestamp, edited value. A clear "AI proposal awaiting human decision" banner.
- **API decision (OPEN):** keep the choice open until BUILD inspection determines whether native Frappe document operations are sufficient. **If** a whitelisted disposition method is required, it must: authenticate the caller; enforce reviewer permission; validate the Proposal and the transition; append an immutable decision row; update the current `lifecycle_state`; record reviewer + timestamp; **never modify authoritative CRM data; never perform promotion**. Do not add an API merely for architectural symmetry.

## D12.E.8 Source evidence presentation

Navigate `Proposal → Run → Source` via the Run's `source_doctype/source_name` (native `Communication`/`File`/etc.); no source duplication. **Limitation (FACT):** D12-C persists `evidence_span` only as a bounded **string** — no sentence/character offsets; record this limitation rather than invent storage.

## D12.E.9 Editing semantics

- Only `proposed_value` may be edited (→ `edited_value` in the decision row); **`edited_value` is required for EDITED_ACCEPTED**; **target identity is not editable** in D12-E.
- The Proposal's immutable `proposed_value` is never overwritten; the original AI value remains reconstructable.
- Edit is attributed to `reviewer` + `decided_at` in the decision row; `reason` optional (recommend required for `REJECTED`/`EDITED_ACCEPTED` → OPEN).
- Editing **never** writes the authoritative CRM target; it is **not** an authoritative CRM update.

## D12.E.10 Competing proposals

Multiple Proposals may exist for the same datum (same `run.source` + `domain` + `logical_key`); each retains independent provenance/decisions. A human may make one promotion-eligible. **Governance requirement:** accepting a Proposal while another **promotable** Proposal exists for the same datum requires the operator to **explicitly supersede** the prior one in the same action (recorded as a `SUPERSEDED` decision) — no silent overwrite/delete. Actual promotion is out of scope.

## D12.E.11 Existing authoritative value

The reviewer must see the distinction between an existing authoritative CRM value (read-only presentation) and the AI Proposal. Acceptance **never** overwrites, implies overwrite, or bypasses the future promotion boundary. Minimum read-only comparison is optional and, if included, must be read-only.

## D12.E.12 Deal resolution boundary

Frozen rule preserved: AI may propose Deal candidates/ambiguity but never selects the authoritative Deal. D12-C does not expose `deal_resolution` → **no Deal Candidate persistence, no second representation, do not reopen D12-C**; ordinary proposals are **not** treated as Deal resolution. A Deal-resolution review surface is a **separate future decision**.

## D12.E.13 Information-Status boundary

Human review of an AI Proposal must **not** set `CUSTOMER-CONFIRMED`, Info Complete, or Ready for Quotation, and must not convert an inferred value into customer confirmation. Accepted AI proposal ≠ customer confirmation ≠ Information Status ≠ Info Complete ≠ Ready for Quotation.

## D12.E.14 Authority & promotion boundary

D12-E ends at **Human disposition → Promotion eligibility**. No Deal/Company/Contact/Requirement/Allocation mutation. **Promotion handoff contract (read-only):** a future promotion operation consumes Proposals where `lifecycle_state ∈ {ACCEPTED, EDITED_ACCEPTED}`, together with: target (`domain`/`logical_key`/`target_hint`), effective value (`proposed_value` or the accepted `edited_value`), provenance (`run → source`), and decision attribution (reviewer/timestamp/decision row). D12-E exposes this contract but implements no promotion; D12-F/future promotion owns the write.

## D12.E.15 Attribution & audit

Minimum durable history to answer the 8 audit questions: the immutable Proposal (original AI value, target, run) + append-only `decisions` (reviewer, timestamp, from/to state, edited value, reason, supersession). Native `Version`/`Comment`/`Activity Log` may supplement but are **not** assumed sufficient (O02 remains authoritative).

## D12.E.16 Permission model

- **View** Runs/Proposals: source-mirroring read (`has_source_permission`, existing).
- **Review (write)**: the requirement is an **authenticated reviewer authorized by the existing Frappe/FJK permission mechanisms**, with **source-read access** and the **explicit ability to record a proposal disposition**. Review must **not** be governed by source-**write** (a reviewer may not have write on a `Communication`) and must **not** grant authoritative CRM write. Do **not** hard-code a specific role (e.g., "Sales Manager") as an architectural requirement: the actual role→permission mapping (which existing roles may review) must be **investigated against the repository before BUILD**; **no new role** unless repository evidence demonstrates necessity. Refining `has_source_permission` so write/create on Run/Proposal maps to (existing permission to record a disposition) + (source read) is a **BUILD detail (OPEN)**.
- Review permission never implies authoritative CRM write.

## D12.E.17 Concurrency / idempotency boundary

Governance requirement: a disposition validates the Proposal's current `lifecycle_state` and rejects invalid/duplicate transitions (e.g., accept an already-`REJECTED`/`SUPERSEDED` proposal; terminal→terminal). Concurrent reviews: last-writer detection via state check; recommend a minimal optimistic guard; **no complex locking** in D12-E — final idempotency/hardening is **D12-F**. Same operator submitting the same disposition may be treated as a no-op or rejected (OPEN).

## D12.E.18 Security

AI-provided values remain untrusted data; the disposition action must not execute/interpret AI output, write arbitrary fields/DocTypes, run SQL, or touch CRM/credentials. `edited_value` is bounded text. **Target validation uses the actual validated D12-C target contract** (the frozen D12-C output contract; domains from `ai/schema.py` `ALLOWED_DOMAINS`). **No new enumerated "fixed domain/logical-key set" is invented.** `target_hint`/`logical_key` are treated as **informational hints, never as an addressable target** — a disposition/acceptance never addresses an arbitrary DocType/field. If an authoritative enumerated target set does not exist, this boundary stays explicitly documented rather than creating a new governance rule.

## D12.E.19 Verification matrix (offline/structural + bench rollback; synthetic; no live provider)

- Lifecycle transitions exactly as D12.E.4 — `PROPOSED→{ACCEPTED, EDITED_ACCEPTED, REJECTED, DEFERRED, SUPERSEDED}`; `DEFERRED→{ACCEPTED, EDITED_ACCEPTED, REJECTED, SUPERSEDED}` (non-terminal); `ACCEPTED`/`EDITED_ACCEPTED→SUPERSEDED`; `REJECTED`/`SUPERSEDED` terminal; **no other transitions**.
- Attribution: reviewer identity, timestamp, original value preserved, edited value preserved.
- Immutability: original proposal reconstructable; existing decision rows not editable/deletable.
- Competing: multiple proposals per datum; independent dispositions; explicit supersession.
- Invalid transitions: rejected→accepted (blocked); already-superseded modification (blocked); terminal→terminal (blocked); unauthorized reviewer (blocked).
- Authority: no CRM value write; no Deal selection; no confirmation/Information-Status/Info-Complete/Ready-for-Quotation/quotations.
- Security: hostile AI text stays data; no arbitrary field/DocType write; no credential exposure.
- Audit: source→run→proposal→decision→promotion-eligibility reconstructable.

## D12.E.20 Exact implementation scope (future BUILD; not created)

- NEW child DocType `FJK AI Proposal Decision` (`istable:1`) + `decisions` Table field on `FJK AI Proposal`.
- MODIFY `fjk_ai_proposal.py` (append-only decisions guard; transition validation helper).
- NEW decision controller `fjk_ai_proposal_decision.py` (immutable rows guard).
- POSSIBLY MODIFY `api.py` (disposition method + read helper for promotion candidates) — **only if** native Frappe document operations are insufficient (OPEN; do not add for symmetry).
- POSSIBLY MODIFY `permissions.py`/`hooks.py` for review-write semantics (OPEN; role mapping to be investigated from repository evidence before BUILD).
- TEST: extend the bench rollback harness pattern (new `ai_review_tests.py` or extend existing) — offline/structural + site-runtime.
- No CRM/DocType-authority changes; no promotion; no Deal Candidate.

## D12.E.21 Open questions

Review role for Sales User; whether `reason` is required for REJECTED/EDITED_ACCEPTED; exact write-permission refinement; same-disposition idempotency; exact supersession ergonomics for same-datum acceptance; whether read-only authoritative-value comparison is shown; Deal-resolution review surface (separate decision).

## D12.E.22 Risks

Permission mapping (source-read vs review-write); child-row immutability enforcement; concurrency without locking; scope creep into promotion; treating acceptance as confirmation.

## D12.E.23 Approval required

Explicit human PLAN review, then a **separate D12-E BUILD authorization** limited to D12.E.20 — **no promotion, no CRM writes, no Deal Candidate, no D12-C change, no live call, no credentials**.

## D12.E.24 BUILD record (2026-10-07) — PASS / FROZEN

**Authorized files created/modified:**
- NEW `feeljapank_crm/feeljapank_crm/doctype/fjk_ai_proposal_decision/{__init__.py,fjk_ai_proposal_decision.json,fjk_ai_proposal_decision.py}` (child, `istable:1`, `editable_grid:0`).
- MODIFIED `feeljapank_crm/feeljapank_crm/doctype/fjk_ai_proposal/fjk_ai_proposal.json` (adds `section_break_review` + `decisions` Table) and `fjk_ai_proposal.py` (append-only decision guard + exact lifecycle-transition guard).
- MODIFIED `feeljapank_crm/api.py` (adds whitelisted `record_proposal_disposition`).
- NEW `feeljapank_crm/ai_review_tests.py` (bench/rollback harness).
- D12-A/B/C under `ai/` **untouched**; D12-D DocTypes unchanged in behaviour.

**Implementation:** child `FJK AI Proposal Decision` fields `disposition`, `from_state`, `to_state`, `reviewer` (Link User), `decided_at`, `edited_value`, `reason`, `superseded_by` (Link FJK AI Proposal). Exact transitions per D12.E.4 (no others). `lifecycle_state` is the current state; every transition appends exactly one immutable decision row; row-level + parent-level guards reject edits/deletes/reassignment/re-timestamp/re-disposition/re-edited-value of existing rows. `EDITED_ACCEPTED` requires `edited_value`; `SUPERSEDED` requires `superseded_by` (successor must exist; self- and circular-supersession rejected). The disposition API authenticates, enforces reviewer permission (`check_permission("write")`, source-mirrored), validates the transition, appends the decision, updates `lifecycle_state`, records reviewer+timestamp, and **never writes CRM/promotes**.

**Runtime verification (PASS, 2026-10-07):** containerized bench (`frappe/bench@7cf2354c`, bench 5.31.0), site `crm.localhost`; `bench --site crm.localhost migrate` applied the child DocType + Proposal field; `bench --site crm.localhost execute feeljapank_crm.ai_review_tests.run_ai_review_tests` → **40 passed, 0 failed** (rollback; synthetic; no network). Covers all allowed transitions (PROPOSED→ACCEPTED/EDITED_ACCEPTED/REJECTED/DEFERRED/SUPERSEDED; DEFERRED→ACCEPTED/EDITED_ACCEPTED/REJECTED/SUPERSEDED; ACCEPTED/EDITED_ACCEPTED→SUPERSEDED), invalid transitions (REJECTED/SUPERSEDED→*, ACCEPTED→ACCEPTED, arbitrary, SUPERSEDED without successor, self/circular supersession), append-only (edit/reassign/re-timestamp/delete blocked), attribution (reviewer+timestamp), edited acceptance (value required, original unchanged), competing independence, no CRM mutation, hostile value stored as data not executed, unauthorized (Guest) denied, and audit reconstruction. D12-D persistence harness re-run → **31 passed, 0 failed**. Offline AI suite unchanged → **116 passed, 0 failed**.

**Review permission mapping (evidence-based, OPEN to broaden):** `has_source_permission` short-circuits for System Manager/Administrator; other roles currently cannot record dispositions. No new role was added. Broadening review eligibility is an OPEN permission-model decision.

**UI:** the native `FJK AI Proposal` form (immutable AI fields + read-only append-only `decisions` grid) and `FJK AI Interpretation Run` form, plus source link, are the review surface; no custom AI dashboard and no workspace redesign (documented handoff).

**Deal Candidate remains DEFERRED / BLOCKED** (D12.D.5.1); not created. **No promotion/CRM write implemented.**

---

# FK-D12-F — AI Pipeline Hardening + Authoritative Promotion Boundary — DESIGN (APPROVED; BUILD NOT AUTHORIZED)

**Status:** DS1–DS9 **APPROVED** by operator (2026-10-08); **BUILD NOT AUTHORIZED**. Baseline: D12-A/B/C committed `4242178`; D12-D/E PASS/FROZEN (working tree). D12-F completes the remaining D12 core: reprocessing, retry boundaries, concurrency/idempotency hardening, failure recovery, **promotion mechanics**, proposal→authoritative relationship, partial promotion, stale/conflicting values, auditability, native Version/history, safe repeated promotion, final authority boundary.

## D12.F.1 Approved design decisions (DS1–DS9)

| # | Decision | Approved design |
|---|---|---|
| DS1 | Promotion representation | **Dedicated append-only promotion record** (parent or append-only child of `FJK AI Proposal`; exact form fixed at BUILD). Holds proposal/run/source links, target identity, effective value, outcome, idempotency key, promoter, timestamp, authoritative before/after, override flag, error/reason. Native `track_changes` supplies CRM-side Version; the record supplies reverse traversal (authoritative→proposal). |
| DS2 | Idempotency key | `sha256(proposal.name │ target_doctype │ target_record │ target_child_table │ target_field │ target_logical_key │ effective_value)`. Same key ⇒ idempotent no-op returning the prior result; changed target/effective-value/superseding proposal ⇒ distinct identity. |
| DS3 | Stale/conflicting values | **No silent overwrite.** At promotion, read the current authoritative target: empty ⇒ write; non-empty and different ⇒ require explicit human `override=true` (recorded), else **block**. Baseline-at-acceptance staleness detection left **OPEN** (would require a D12-E change; not proposed). |
| DS4 | Partial promotion | **Model A — atomic per-datum.** Each proposal commits fully or not at all (single transaction + one promotion record). Multi-datum = repeated independent per-datum promotions; no staged/resumable batch. |
| DS5 | Reprocessing | **Explicit, human-initiated, new Run** (`run_key` gains a reprocess-nonce dimension for forced reprocess); old Run/Proposals retained; supersession explicit (D12-E `SUPERSEDED`); never automatic. |
| DS6 | Retry policy | See D12.F.2. |
| DS7 | Concurrency | Unique idempotency key + proposal-state re-check inside the transaction + `for_update` row lock on the proposal. |
| DS8 | Who may promote | Authenticated user **and** `frappe.has_permission("CRM Deal", doc=<resolved target Deal>, ptype="write")` **and** proposal/source read. Reviewer and promoter may be the same or different. **No new role.** |
| DS9 | Promotion targets | **FJK child-table rows/fields only** initially, via an explicit allow-list `domain → (child table, field)`. **No arbitrary `doctype+field+value` addressing.** Deal scalar targets deferred. Deal resolution excluded (human supplies the resolved Deal). |

## D12.F.2 DS6 — final retry policy (APPROVED)

- **Transport:** maximum **total attempts = 3** (1 initial + 2 retries). Reuses the **same Run** (`PROCESSING`); at most one terminal outcome; no duplicate proposals.
- **Backoff:** exponential + full jitter — `delay_n = min(cap, base × 2^(n-1))`, `base = 1.0s`, `cap = 8.0s`, sleep `uniform(0.5, 1.0) × delay_n`.
- **Retryable:** connection failure, timeout, 429, 500/502/503/504.
- **Non-retryable (terminal):** **3xx redirect** (corrected from retryable), malformed/oversized body, 400/422, 401, 402/403, incomplete (`finish_reason=length`), schema/semantic/policy validation.
- **`Retry-After` explicitly deferred** (not honored).
- **Promotion:** no automatic retry; idempotent re-submission only (DS2/DS7).
- **No new Run states**; structural failures remain terminal.

Current-code note (`FACT`): `RetryingTransport` today has `max_attempts=1` (retries effectively disabled) and **linear** backoff with no jitter; 3xx currently maps to a retryable error. The D12-F BUILD **finalizes the retry counts/backoff that D12-B explicitly left OPEN** and corrects the 3xx classification — a bounded finalization, not a D12-B redesign.

## D12.F.3 Promotion authority model

```
Source (AI reads)         → AI-controlled
Run / Proposal            → AI-controlled (propose); immutable facts
Human Decision (D12-E)    → human-controlled
Promotion                 → human-authorized; system-enforced integrity
Authoritative CRM value   → authoritative (written ONLY here)
```
AI-controlled: source→Run→Proposal. Human-controlled: disposition + promotion authorization. System-enforced: idempotency, `for_update`, transaction, target allow-list, no-silent-overwrite. Authoritative: the target CRM write (+ native Version).

## D12.F.4 Transaction / failure model

- **Transaction:** one promotion = one DB transaction (per datum).
- **Rollback:** target write + promotion-record insert commit together.
- **Audit:** one immutable promotion record per attempt-outcome (incl. blocked/failed).
- **Retry:** transport-only auto-retry (DS6); promotion auto-retry none; structural never.
- **Concurrency:** unique key + `for_update` + state re-check.
- **Idempotency:** same key ⇒ no-op returning prior result.

## D12.F.5 Security / authority review

D12-F must NOT permit: AI self-promotion; automatic Deal selection; automatic Company/Contact authority; automatic Information Status / Info Complete / Ready for Quotation; automatic quotation creation; arbitrary CRM field writes. AI output remains untrusted data; promotion addresses only allow-listed targets.

## D12.F.6 Native reuse

Native `Version` (`track_changes=1` on AI DocTypes and `CRM Deal`) for history; `CRM Deal` child tables as targets; `frappe.db` transactions/savepoints; unique constraint; `for_update`; existing permission checks. A dedicated append-only promotion record is required only because native Version cannot provide authoritative→proposal reverse traversal or promotion idempotency/partial audit.

## D12.F.7 Future BUILD scope (NOT AUTHORIZED here)

- **IN:** promotion operation + API; append-only promotion representation + unique idempotency key; allow-listed `domain → child table/field` mapping; transaction/`for_update`/unique handling; DS6 retry finalization in `transport.py`/`config.py` (incl. 3xx non-retryable, exponential+jitter, `max_attempts=3`); reprocessing trigger (new Run + nonce); stuck-`PROCESSING` reconciliation; tests.
- **OUT:** Telegram/Email/WhatsApp/Common Source Intake; manual UX; Deal/Company/Contact resolution; Information Status/Info Complete; Supplier/Customer Quotation/Trip; D12-A–E redesign; live provider/credentials; `Retry-After`; Deal scalar targets.

## D12.F.8 Verification requirements (future BUILD)

1 first-attempt success; 2 transient-then-success; 3 exhaustion→terminal `FAILED`; 4 401 no retry; 5 400/422 no retry; 6 429 retried; 7 timeout/network retried; 8 backoff bounded/jittered (deterministic via injected sleep); 9 structural failure → no transport retry + correct terminal status; 10 promotion concurrency conflict → no endless retry; 11 repeated promotion → idempotent single write; 12 accepted→authoritative; 13 edited-accepted→authoritative; 14 rejected/deferred/superseded cannot promote; 15 stale non-empty target blocked without override; 16 permission denial; 17 transaction rollback leaves no partial state; 18 audit reconstruction (authoritative→promotion→proposal→run→source); 19 reprocessing new Run preserves old; 20 regression: D12-A/B/C 116 + D12-D 31 + D12-E 40. Offline + containerized-bench rollback; synthetic; no live provider; no customer data.

## D12.F.9 Open items (deferred)

`Retry-After`; Deal scalar targets; exact promotion-record form (parent vs append-only child); baseline-at-acceptance staleness; separate promotion-permission refinement; exact reference to which `FJK` child row/field per domain (BUILD allow-list).

## D12.F.10 Approval required

Explicit **D12-F BUILD authorization** (separate) before any code; DS1–DS9 approved but **BUILD NOT AUTHORIZED**.

## D12.F.11 BUILD record (2026-10-08) — BUILT / VERIFIED: **CONDITIONAL PASS → FROZEN** (frozen 2026-10-08)

**Files created/modified (D12-F scope):**
- NEW `feeljapank_crm/ai_promotion.py` (promotion boundary: `effective_value`, `idempotency_key`, `promote_proposal`) and `feeljapank_crm/ai_promotion_tests.py` (bench/rollback harness).
- NEW child `doctype/fjk_ai_proposal_promotion/` (append-only promotion record; `istable`=0; `track_changes`; unique `idempotency_key`).
- MODIFIED `api.py` (`promote_ai_proposal`), `hooks.py` (register `has_source_permission` for promotion).
- MODIFIED `ai/config.py`, `ai/transport.py`, `ai/errors.py`, `ai_wiring.py`, `ai/tests.py` — **DS6 finalization** (max total attempts 3; exponential + full jitter base 1s cap 8s; **3xx non-retryable** via new `RedirectRefusedError`).
- MODIFIED `ai_persistence.py` — **DS5** reprocess nonce (`compute_run_key(..., reprocess_nonce)`, `interpret_and_persist(..., reprocess=True)`).
- D12-A/B/C/D/E behavioural design unchanged (DS6 finalizes the previously-OPEN retry parameter + corrects 3xx classification).

**Runtime verification (PASS, 2026-10-08):** containerized bench `frappe/bench@7cf2354c` (5.31.0), site `crm.localhost`; `bench --site crm.localhost migrate` applied `FJK AI Proposal Promotion`.
- `ai_promotion_tests` → **16 passed, 0 failed**: accepted→authoritative; edited-accepted→edited value (original preserved); rejected/deferred/superseded cannot promote; duplicate idempotent (single record); stale blocked without override and target unchanged; explicit override updates; Guest denied; audit reconstruction + reverse traversal; reprocessing creates a new Run.
- `ai_persistence_tests` → **31 passed, 0 failed**; `ai_review_tests` → **40 passed, 0 failed**.
- Offline AI suite (`python3 -m feeljapank_crm.ai.tests`) → **130 passed, 0 failed** (116 + 14 D12-F retry checks).

**Deviations from the approved D12-F design (recorded):**
1. **Initial allow-list** maps every requirement-line-eligible domain to the general `FJK Deal Requirement Line.detail` (Information Status `status` is not a target); `Tour Guide`/`Activities & Tickets` are excluded (dedicated tables). Richer per-domain target mapping remains OPEN (D12.F.9).
2. Appended requirement lines also set `item` from the proposal `logical_key` (the FJK requirement line requires `item`).
3. **True DB-level concurrency** is enforced by the unique idempotency key + `for_update` lock + state re-check; the runtime test exercises idempotent duplicate re-entry rather than parallel threads.
4. **True transaction rollback** is represented by blocked/idempotent paths proving no partial authoritative change; a forced mid-transaction failure is not simulated.
5. **Reprocessing** capability is implemented at the persistence layer (`reprocess=True`); the human-facing reprocess trigger belongs to the future intake layer (Phase 3), not D12-F.
6. Promotion writes the target with the caller's Deal-write permission (checked); no new role.

**Deal resolution remains outside D12-F** (human supplies the resolved Deal). No Information Status / Info Complete / quotation write. No commit/push.

## D12.F.12 Residual limitations recorded (NOT defects) + final status

These are bounded limitations / open follow-on work. They do **not** reopen DS1–DS9 and do **not** require another D12-F implementation cycle before freeze.

- **A. Promotion mapping scope (OPEN follow-on):** the initial allow-list implements requirement-line `detail` for eligible domains; `Tour Guide`/`Activities & Tickets` are excluded (they have dedicated downstream structures). Complete **per-domain** requirement/allocation mapping belongs to the later Stage 0 promotion work — this does not mean D12-F failed; D12-F delivers the controlled promotion **mechanism**.
- **B. Concurrency evidence:** **implementation/design-verified** via the approved safeguards (unique idempotency key, `for_update`, state re-check); a **true parallel-thread/process race stress test was NOT executed** in this verification cycle (the test exercised idempotent re-entry). Parallel concurrency is **not** claimed as runtime-proven.
- **C. Mid-transaction process kill:** a real process kill mid-transaction was **NOT** simulated. Verification demonstrated transaction-safe blocked/idempotent paths and **no observed partial authoritative mutation**; crash-kill recovery is **not** claimed as experimentally proven.
- **D. Reprocessing trigger:** the reprocessing **capability** exists at the persistence layer; the human-facing **trigger** belongs to the future Source Intake/operator workflow and is not added here.
- **Promotion audit-record semantics (as implemented; not to be changed):** the idempotency key applies to **successful** `PROMOTED` records; `BLOCKED`/`FAILED` audit rows do not carry the successful-promotion key and remain append-only audit events recording their own block/fail reason.

**Final status: FK-D12-F — FROZEN (BUILD VERIFIED: CONDITIONAL PASS).** "Conditional" means: implementation passes the approved D12-F scope; verification passes; remaining items are bounded limitations/open follow-on work; richer domain mapping belongs to later Stage 0 promotion work; D12-F itself does not require another implementation cycle before freeze. **Frozen 2026-10-08** (commit/push per release gate).
