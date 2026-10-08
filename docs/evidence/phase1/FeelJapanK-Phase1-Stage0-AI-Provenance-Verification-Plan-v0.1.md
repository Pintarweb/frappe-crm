# FeelJapanK Phase 1 — Stage 0 — AI + Provenance — Verification Plan — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1 |
| Subject | Verification plan for Stage 0 — Data Acquisition / Data Entry — AI + Provenance |
| Version | v0.1 |
| Status | **FUTURE VERIFICATION SCOPE — NOT EXECUTED — NOT IMPLEMENTED** |
| Date | 2026-10-07 |
| Repository | `/home/yusmarin/frappe-crm` |
| Companion plan | `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` |
| Companion decisions | `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` |

> This document defines **how Stage 0 will eventually be verified**. It executes nothing. There is no Stage 0 implementation to verify. `BUILD remains UNAUTHORIZED`.

---

## 1. Purpose

Provide an implementation-independent verification specification so that when Stage 0 is (separately) authorized and built, its technical verification and human acceptance have predefined, testable criteria. It preserves the FK-D18 invariants as verifiable properties.

---

## 2. Verification Principles

- Verification is **implementation-independent** and derived from FK-D18 + FK-D12.
- No AI-derived value may reach authoritative CRM without a recorded human disposition.
- Every AI-derived value must be source-traceable.
- AI failure must degrade safely (no authoritative writes on failure).
- Browser/agent testing is **technical verification only** — it is **not** human acceptance.
- Human acceptance is a separate, explicit operator act.

---

## 3. Verification Matrix (FUTURE)

| # | Area | Verification objective | Expected result |
|---|---|---|---|
| V01 | Source preservation | Original communication/evidence retained unaltered | Originals retrievable; not replaced by AI summaries |
| V02 | AI proposal isolation | AI output stored as non-authoritative proposal | No authoritative CRM write from AI alone |
| V03 | Proposal-to-source traceability | Navigate CRM datum → proposal → interpretation → source → original | Full chain resolvable |
| V04 | Accept | Operator accepts a proposal | Value promoted to authoritative CRM; disposition recorded |
| V05 | Edit + Accept | Operator edits then accepts | Edited value promoted; original proposal retained |
| V06 | Reject | Operator rejects a proposal | No authoritative write; proposal + rejection retained |
| V07 | Human attribution | Each disposition attributable | who/when captured on every disposition |
| V08 | Existing Deal resolution | Continue an existing Deal | Communication linked to correct existing Deal; no new Deal |
| V09 | New Deal resolution | Distinct request creates a new Deal | Human-confirmed new Deal; no silent creation |
| V10 | Amendment handling | Amendment of existing request | Existing Deal kept; change recorded; no new Deal |
| V11 | Requirement promotion | Approved requirement written to existing FJK model | `FJK Deal Requirement Line`/related updated; no duplicate model |
| V12 | Allocation promotion | Approved allocation written to existing allocation DocTypes | `FJK Transportation/Accommodation Allocation` updated |
| V13 | Information Status | Statuses reflect approved data | KNOWN/MISSING/TO CONFIRM/CUSTOMER-CONFIRMED/NOT APPLICABLE correct |
| V14 | Info Complete | Operator controls the gate | AI cannot set Info Complete; unapproved proposals do not count |
| V15 | AI failure | Provider/model failure | No authoritative writes; failure surfaced; safe state |
| V16 | Ambiguous input | Ambiguous communication | No silent Deal assignment; routed to human |
| V17 | Missing information | Incomplete extraction | Recorded as MISSING/TO CONFIRM; not fabricated |
| V18 | Security / data-egress controls | Egress limited to approved provider/scope | Only permitted data leaves; controls verified |
| V19 | Prevention of AI autonomous authority | AI attempts authoritative action | Blocked; requires human approval |
| V20 | Native-first / no duplicate masters | No duplicated Org/Contact/Deal | Native masters reused |

All rows are **FUTURE verification scope**.

---

## 3A. Design-Derived Verification Additions (2026-10-07)

Derived from `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md`. These refine — they do not replace — V01–V20. **FUTURE scope; not executed.**

| New | Additive requirement | Maps to |
|---|---|---|
| V21 | Proposal structure is the **only** AI write target; AI has no authoritative write path | V02, V19 |
| V22 | Every proposal carries a native source reference (Communication / WhatsApp Message / File) | V03 |
| V23 | Proposal → accepted → resulting authoritative value is navigable both directions | V03, V11, V12 |
| V24 | Candidate Company/Contact/Deal is presented but never written to authoritative link fields pre-approval | V08, V09, V10, V16 |
| V25 | Rejected/deferred proposals are retained and do not count toward Info Complete | V06, V14 |
| V26 | Promotion reuses existing `d1.validate_deal_requirements`; no parallel model | V11, V12, V20 |
| V27 | Provider failure/timeout produces no authoritative write and a recorded failed state | V15 |
| V28 | Provider-agnostic adapter: core logic contains no provider-specific coupling | V18 |
| V29 | Pre-Deal intake preserves source with **no** Deal/requirement/status side effects | V01, V13, V17 |
| V30 | Existing phone→Deal technical association is **not** treated as authoritative Deal resolution | V08, V19 (FK-D10) |
| V31 | STG0-R01 phone→Deal path: single Deal — association does not bypass human confirmation | V08, V24 |
| V32 | STG0-R01: multiple Deals per Contact — no arbitrary/old Deal is treated as authoritative | V08, V16 |
| V33 | STG0-R01: no Deal — message preserved without a fabricated Deal association | V01, V17 |
| V34 | STG0-R01: ambiguous Contact / multiple people on one number — no silent resolution | V16 |
| V35 | STG0-R01: ambiguous Deal — routed to human, not auto-resolved | V16 |
| V36 | STG0-R01: human-reviewed Deal selection overrides any auto-association | V08, V09, V24 |
| V37 | STG0-R01: prevention of unintended automatic authoritative association (no Deal field mutated by ingestion) | V02, V19 |
| V38 | STG0-R01 (UI): inferred Deal context is visually distinguishable from human-confirmed context | V08, V24 |
| V39 | STG0-R01 (UI): operator can confirm / correct / remove / re-attach the Deal association | V08, V09, V24 |
| V40 | STG0-R01: an explicit outgoing association (send from Deal) is not silently overwritten by phone inference | V08, V19 |
| V41 | STG0-R01 (telephony): Call Log phone association is non-authoritative / confirmable (same decision scope) | V08, V16 |

**Review scope clarification (2026-10-07, formal design review):** V38 and V39 apply to the **Stage 0 review surface** (O05), **not** to native CRM — Conditional A authorizes no native remediation. V40 is an **authority** requirement (Stage 0 must not treat an explicit outgoing association as Deal confirmation); it does **not** require changing native overwrite behavior, which is an accepted `FACT` under Conditional A. This clarification preserves — and does not weaken — V38–V40.

**STG0-R01 — APPROVED CONDITIONAL A boundary (testable requirements, 2026-10-07):**

| New | Requirement | Maps to |
|---|---|---|
| V42 | Native phone-derived `reference_*` does **not** count as human Deal confirmation | V08, V24, V07 |
| V43 | Native `reference_*` never becomes authoritative Stage 0 provenance | V03, V24 |
| V44 | Ambiguous / multiple-Deal phone matches never silently become authoritative | V16, V08 |
| V45 | Human Deal confirmation must be **explicit** (attributed disposition), not inferred | V07, V24 |
| V46 | AI candidate Deal proposals remain non-authoritative until a human disposition | V02, V19, V24 |
| V47 | Telephony `CRM Call Log` references follow the same boundary (provisional only) | V08, V16 |
| V48 | Existing native WhatsApp/telephony behavior remains **unchanged** unless separately authorized (FK-D12) | — |

**O06 / O08 additions (2026-10-07 investigation):**

| New | Requirement | Maps to |
|---|---|---|
| V49 | Only explicitly authorized channels are ingested; unconfigured channels are not silently active | V01, V18 |
| V50 | AI egress payload is limited to approved data classes (minimization); no secret/credential present | V18, V28 |
| V51 | Provider-independent controls present: HTTPS, auth, timeout/retry, structured-output validation | V18, V27 |
| V52 | Provider unavailable / timeout / malformed / low-confidence ⇒ **no authoritative write**; CRM remains usable | V15, V02 |
| V53 | Unsupported/uninterpretable attachment ⇒ recorded as such, not fabricated; original source preserved | V01, V17 |
| V54 | Baseline manual intake preserves content, sender/recipient, timestamp, attachments, source identity, and review access | V01 |

**O06 channel strategy / email / Telegram additions (2026-10-07):**

| New | Requirement | Maps to |
|---|---|---|
| V55 | Inbound email capability/configuration present and verifiable (Email Account inbound fields; native `pull`→`Communication`) | V01, V18 |
| V56 | Inbound email enablement prerequisites verified **before** enablement (valid credential, IMAP/SSL, scheduler/worker running) | V18, V49 |
| V57 | Inbound email → `Communication` + `File` attachment preservation + CRM association; no duplicates; permissions correct | V01, V08 |
| V58 | Telegram capability discovery: no unauthorized Telegram channel is silently active | V49 |
| V59 | Telegram internal intake attachment feasibility (image/PDF/document/file + caption) — future, evidence-dependent | V01 |
| V60 | Telegram metadata preservation (message id, timestamp, sender/chat id) — future, evidence-dependent | V01, V03 |
| V61 | Telegram internal-only authority boundary: metadata never establishes authoritative Company/Contact/Deal/requirements/confirmation/Info Complete | V08, V19, V24, V42 |
| V62 | Telegram security/data-handling: third-party processor, token secrecy, retention dependency, private bot/chat restriction | V18, V50 |

> **Telegram authorization update (2026-10-08, STG0-D18):** the Telegram implementation is **authorized** (internal-only). V59–V62 transition from "future / evidence-dependent" to **required verification items for the Telegram build PLAN**; V58 remains an always-on guard (no unauthorized channel silently active). Still required before customer data: the O08-class security/data-handling determination.

**O01 provenance-model additions (2026-10-07):**

| New | Requirement | Maps to |
|---|---|---|
| V63 | Source identity preserved (channel + native source record + `content_hash` where a `File` exists) | V01 |
| V64 | Source preserved immutably; AI-derived text never replaces the original source artifact | V01 |
| V65 | Source location recorded (artifact-level required; intra-artifact span where available) | V03 |
| V66 | Proposal-to-source traceability: every proposal resolves to its source | V03, V22 |
| V67 | Field/datum-level provenance: per-datum target + value + source (not record-level only) | V03, V23 |
| V68 | Human-decision provenance: disposition + reviewer + timestamp + original proposed value | V07, V24, V45 |
| V69 | Edited-proposal preservation: original AI value **and** human-approved value both retained | V05, V25 |
| V70 | Authoritative-promotion traceability: authoritative value → human decision → AI proposal → source | V11, V12, V23 |
| V71 | Reprocessing/history: proposals append-only; a later run does not replace earlier ones | V03 |
| V72 | Deal-resolution authority boundary: human confirmation recorded; native `reference_*` not evidence | V08, V42, V45 |
| V73 | Native audit vs provenance gap: `Version` old→new captured, but proposal/source/disposition link required | V03 |

**O02 proposal-lifecycle additions (2026-10-07):**

| New | Requirement | Maps to |
|---|---|---|
| V74 | Every AI output exists as a **non-authoritative proposal** (no direct authoritative write) | V02, V21 |
| V75 | Proposal states (`PROPOSED/ACCEPTED/EDITED_ACCEPTED/REJECTED/DEFERRED`) are unambiguous and not conflated with run states or Information Status | V02 |
| V76 | Only valid transitions occur (incl. `DEFERRED → …`; `REJECTED` terminal) | V04–V06 |
| V77 | Human disposition is attributable and timestamped | V07, V45 |
| V78 | Edited proposal preserves **original AI value** and **human value** | V05, V69 |
| V79 | Rejection terminates that proposal, creates no authoritative value, and is retained | V06, V25 |
| V80 | Deferral is non-terminal, not counted toward Info Complete, and later reviewable | V25, V14 |
| V81 | Reprocessing creates a **new** proposal; the prior proposal is retained | V71 |
| V82 | Multiple competing proposals are independently reviewed; only one promotable accepted value per datum | V03, V24 |
| V83 | Partial acceptance: per-datum dispositions within a single run | V04–V06 |
| V84 | Authoritative conflict: no auto-overwrite; explicit human decision; prior value recorded | V11, V26 |
| V85 | `human-accepted` vs `customer-confirmed` distinction preserved | V13 |
| V86 | Deal-resolution proposal requires a separate human disposition; AI cannot confirm | V08, V24, V42 |
| V87 | Processing/run failure states are distinct from proposal states; no authoritative write on failure | V15, V27 |
| V88 | Supersession is explicit (not implicit by recency); old information not treated as current | V71 |
| V89 | Historical facts immutable (original value/target/source/run/model/timestamp); later actions are appended events | V03, V63 |
| V90 | Lifecycle reconstruction works for both single-accept and reject→reprocess→accept scenarios | V03, V70 |

**O03 source storage/access additions (2026-10-07):**

| New | Requirement | Maps to |
|---|---|---|
| V91 | Source identity captured at proposal time (native doctype + record name) | V01, V63 |
| V92 | Original source artifact remains accessible and unaltered for the life of the provenance | V01, V64 |
| V93 | `content_hash` present and stable for file-backed evidence | V63 |
| V94 | `Communication` record referenced as a distinct source | V63 |
| V95 | Specific attachment `File` within a compound source is referencable | V63 |
| V96 | Source hierarchy distinguished (parent communication → attachment → extracted datum) | V03 |
| V97 | Source location recorded where available (whole-artifact minimum) | V65 |
| V98 | Reviewer can open the exact original source used by AI | V63 |
| V99 | Source accessibility honors native permissions; no unauthorized access | V18 |
| V100 | Source-to-Deal `reference_*` treated as context, not authority | V42, V30 |
| V101 | Source preservation independent of inferred Company/Contact/Deal relationship | V63 |
| V102 | Reprocessing vs duplicate upload distinguishable via source identity | V71 |
| V103 | Deleting/renaming a referenced source is prevented or detectable | V64 |
| V104 | Exact evidence version used by AI recorded (name + `content_hash`) | V63, V89 |
| V105 | Common source contract + channel-specific metadata preserved across channels | V63 |

**O04 proposed↔authoritative additions (2026-10-07):**

| New | Requirement | Maps to |
|---|---|---|
| V106 | Proposal target traceability: target identified as doctype + record + field/child table + logical datum key | V03, V23 |
| V107 | Accepted proposal → resulting authoritative value traceable (bidirectional link) | V23, V70 |
| V108 | Edited-proposal preservation: original AI value, edited value, and final value distinguishable | V69 |
| V109 | Rejected proposal isolation: no authoritative change; retained; cannot later become authoritative | V25, V79 |
| V110 | Competing proposals independently traceable; no recency-based winner | V82 |
| V111 | Reprocessing: prior proposal retained; new proposal distinct | V71, V81 |
| V112 | Stale proposal: authoritative change before review detectable/reconstructable | V84 |
| V113 | Child-row target traceability: existing row by `name`; new row by logical datum key | V67, V83 |
| V114 | Deal-resolution provenance: separate human decision recorded; `reference_*` not authority | V42, V86 |
| V115 | Failed/partial promotion safety: promoted vs not-promoted survives audit | V15, V87 |
| V116 | Duplicate-promotion protection: idempotent; no duplicate rows/masters | V26 |
| V117 | Later-correction traceability: additive; history retained | V89 |
| V118 | Promotion attribution (who/when) distinct from document editor | V07, V68 |
| V119 | Prior authoritative value reconstructable via `Version` | V26, V70 |
| V120 | Customer-confirmation vs acceptance vs Information Status separation preserved | V13, V85 |

**O05 human-approval additions (2026-10-07):**

| New | Requirement | Maps to |
|---|---|---|
| V121 | Human actor attribution: approving user recorded on each disposition | V07 |
| V122 | Timestamp attribution on each disposition | V07 |
| V123 | Datum-level disposition (not run-level); run status derived only | V67, V83 |
| V124 | Accept permits promotion **eligibility** only, not authority | V04 |
| V125 | Edit+accept preserves original AI value and edited value | V05, V108 |
| V126 | Reject is terminal and never promotes | V06, V109 |
| V127 | Defer is non-terminal and not promotion-eligible | V80 |
| V128 | Supersession is explicit | V88 |
| V129 | Acceptance vs authoritative promotion are distinct recorded events | V107, V118 |
| V130 | Partial approval: approved data promotes independently; deferred/rejected do not block | V83 |
| V131 | Existing-target approval: change from prior value; prior value retained | V119 |
| V132 | New-target approval: creation approved without pre-existing row identity | V106, V113 |
| V133 | Deal-resolution separation: explicit human decision; `reference_*` never approval | V114, V42 |
| V134 | Customer-confirmation separation from acceptance preserved | V85, V120 |
| V135 | Stale/conflict: no silent overwrite of a newer authoritative value | V112, V84 |
| V136 | Competing proposals: independent human dispositions | V110 |
| V137 | Reprocessing/rejection preservation (prior proposal traceable) | V111, V109 |
| V138 | Promotion failure/partial success auditable (approved-but-failed survives) | V115 |
| V139 | Duplicate approval/promotion idempotent | V116 |
| V140 | Audit reconstruction: actor + timestamp + disposition + resulting value chain | V03, V70, V118 |
| V141 | Provider + model identity/version/snapshot captured per run (provenance metadata) | V22, V28 |
| V142 | Provider error taxonomy mapped to O02 run states; provider failure yields no authoritative write | V27, V52 |
| V143 | Egress payload limited to approved data classes; credentials/secrets categorically absent | V18, V50 |
| V144 | Pre-egress redaction/validation applied and re-applied on retry; payload does not broaden | V50, V27 |
| V145 | AI input payload contains no secret/credential; logs/errors contain no secret | V50, V18 |
| V146 | Provider-policy evidence captured (no-training, retention/deletion, subprocessor, location) before authorization | V18 |
| V147 | Provenance stores references, not duplicated source content; full prompts/responses absent from ordinary logs | V22, V141 |
| V148 | AI output treated as untrusted: schema-validated; malformed/unexpected rejected; no direct CRM action | V19, V21 |
| V149 | Prompt-injection: instruction-like source content cannot trigger CRM action or approval bypass | V19, V24 |
| V150 | Adapter server-side only; no frontend/provider direct access; provider swap preserves provenance semantics | V28, V18 |
| V151 | DeepSeek `deepseek-flash` provider-policy evidence (no-training/retention/deletion/subprocessors) obtained before any customer-data authorization | V146 |
| V152 | Candidate uses JSON-output mode with mandatory app-side schema validation (no strict json_schema); malformed/unexpected output rejected | V148, V143 |
| V153 | Provider identity captured per run (`model`, `system_fingerprint`) + request/response ids + usage (provenance) | V141, V147 |
| V154 | DeepSeek error taxonomy (400/401/402/422/429/500/503) mapped to O02 run states; no authoritative write on failure | V142 |
| V155 | Prompt-injection + Deal-resolution + info-status synthetic scenarios pass (no CRM action; no authoritative Deal/status) | V149, V16, V19 |
| V156 | DeepSeek provider written confirmation obtained for P1–P6 (no training/improvement, retention, deletion, subprocessors, secondary use, logging) before any customer-data authorization | V146, V151 |
| V157 | Explicit jurisdiction/residency decision recorded for mainland-PRC processing; provider processing/storage locations disclosed | V151 |
| V158 | DeepSeek provider gate O08-P conditions closed before any real customer data reaches the provider | V151, V156, V157 |
| V159 | AI adapter performs no authoritative CRM write (adapter → proposal only) | V24, V52 |
| V160 | `finish_reason=length` / malformed response rejected before any proposal is created | V142, V148 |
| V161 | Provider model identity (`model`, `system_fingerprint`) + request/response ids captured per run; source → run → proposal reconstructable | V141, V153 |
| V162 | Idempotency: same source/run key creates no duplicate; deliberate reprocess creates a new run with history preserved | V141 |
| V163 | Provider API key never appears in logs/frontend/repo; minimum-necessary egress only | V143, V145 |
| V164 | `finish_reason=length`/missing rejected before any proposal is produced (incomplete output never becomes a proposal) | V160 |
| V165 | Provider response JSON parsed; malformed/empty/null/array/scalar top-level rejected | V148 |
| V166 | Application-side schema validation (required fields, types, enums, size) applied; unknown fields stripped | V148 |
| V167 | Semantic validation rejects invalid domain / `status_hint` / `provenance_status` / `confidence` / empty values | V148 |
| V168 | Security/policy validation rejects authoritative Deal selection, CUSTOMER-CONFIRMED, Info Complete, Ready for Quotation, credentials and instructions | V16, V19, V149 |
| V169 | Unknown/forbidden fields neutralized; validator never executes tool/CRM instructions | V148 |
| V170 | Normalized candidates remain non-authoritative and carry source/provider/response provenance refs | V141, V161 |
| V171 | AI Run persists source identity/hash, instruction/contract refs, provider/model/fingerprint, request/response ids, timestamps, status, usage | V141, V153 |
| V172 | AI Proposal persists validated candidate fields and links to its Run (source → run → proposal reconstructable) | V161, V170 |
| V173 | Original AI proposal fields immutable after creation; append-only history (no destructive edit) | V22 |
| V174 | All six O02 lifecycle states representable; original + edited values preserved | V60 |
| V175 | Competing proposals and multiple runs per source remain independently traceable; supersession explicit | V60, V61 |
| V176 | `raw_payload` / `TransportResponse.body` / Authorization header / credentials never persisted | V147, V163 |
| V177 | Run/Proposal access mirrors source-record permission; viewing a proposal grants no authoritative CRM write | V24, V42 |
| V178 | Failed/partial runs auditable (terminal status + error_category); incomplete operation never recorded as SUCCEEDED; no Deal/Company/Contact/Information-Status authority | V27, V52 |

> **O08 provider assurance deferral (2026-10-07, STG0-D17):** V156–V158 are **deferred** for the Phase 1 pilot under the accepted-residual-risk decision; they become **reopen triggers** (Register §12.2) rather than pilot blockers. They must be satisfied before any move to production, any material increase in data exposure, or a broader provider workload.

FUTURE scope. **Do not execute.** Verification must assert the critical rule **native communication context ≠ human-confirmed Deal relationship**. The governance decision for STG0-R01 is **APPROVED — CONDITIONAL A** (Design §26A.13, §26B; Decisions §3B); remediation options R-B/R-C/R-D/R-E remain unselected and are not verification targets.

---

## 4. Evidence Requirements (FUTURE)

When executed, verification must produce:

- the deployment/build identifier under test;
- the authoritative source(s) of each test's expectation;
- raw outputs (API responses, records created in a disposable/test scope, or read-only evidence);
- proof that no production/pilot CRM records were mutated by verification;
- a clear statement distinguishing **technical verification** from **human acceptance**.

---

## 5. Explicit Non-Goals

- No feature implementation is performed or implied.
- No provider, key, schema, or integration is created.
- Supplier Quotation / Customer Quotation / Trip verification is **out of scope** (later stages).

---

## 6. Status

**FUTURE / NOT EXECUTED.** This plan becomes actionable only after Stage 0 is separately authorized under `FK-D12` and built. `BUILD remains UNAUTHORIZED`.
