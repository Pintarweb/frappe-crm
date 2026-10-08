# FeelJapanK Phase 1 — Stage 0 — AI + Provenance — Decisions — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1 |
| Subject | Workstream decision register for Stage 0 — Data Acquisition / Data Entry — AI + Provenance |
| Version | v0.1 |
| Status | **GOVERNANCE / DOCUMENTATION — NOT A BUILD AUTHORIZATION** |
| Date | 2026-10-07 |
| Repository | `/home/yusmarin/frappe-crm` |
| Companion plan | `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` |
| Decision index | `docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md` |

> This workstream register records the State of Stage 0 decisions. It does not reopen, reinterpret, or contradict any FROZEN cross-project decision. `FK-D18` is FROZEN and is **not** modified here.

---

## 1. Classification Legend

| Class | Meaning |
|---|---|
| **FACT** | Established repository or authority state; verifiable. |
| **FROZEN** | Authoritative decision, not open to silent change. |
| **PROPOSAL** | Candidate/planning artifact; not authoritative. |
| **OPEN** | Genuinely unresolved; requires an explicit decision. |
| **APPROVED** | Explicitly accepted for the stated (possibly limited) purpose. |
| **REJECTED** | Considered and not permitted. |

Do **not** promote an `OPEN` item to `FROZEN`/`APPROVED` without a controlled decision and, where applicable, an FK-D12 review.

---

## 2. Inherited FROZEN Decisions (referenced; not reopened)

| ID | Decision | Status | Stage 0 relevance |
|---|---|---|---|
| FK-D01 | Deal = one commercial opportunity/enquiry container | FROZEN | Deal modeled natively; no new container. |
| FK-D03 | New request → new Deal; revisions stay on the same opportunity | FROZEN | Deal resolution rule (Plan §I). |
| FK-D04 | CRM owns relationship + enquiry context | FROZEN | Native Org/Contact/Deal retained. |
| FK-D10 | Explicit commercial context identifies Deal; no silent guessing | FROZEN | AI may only suggest. |
| FK-D11 | Phase 1 human-in-the-loop (automation-deferral clause partially superseded by FK-D18) | FROZEN (partial supersession) | Human determination retained. |
| FK-D12 | Native-first; high-risk gate | FROZEN | Governs any future Stage 0 BUILD. |
| FK-D13 | Frozen environment/security baseline | FROZEN | `docs/versions.lock` unchanged. |
| FK-D14 | Written confirmation is evidence; manual marking | FROZEN | AI cannot mark confirmation/Info Complete. |
| FK-D17 | Pre-invoice commercial state owned by CRM Deal | FROZEN | Stage 0 is pre-invoice. |
| FK-D18 | AI-assisted interpretation/extraction = proposal-only, mandatory human approval, mandatory provenance; no implementation authorized | FROZEN | Core authority for Stage 0. |

These are **not** modified by this document.

---

## 3. Stage 0 Workstream Register

| ID | Decision / item | Class | Authority / evidence | Notes |
|---|---|---|---|---|
| STG0-D01 | Stage 0 = Data Acquisition; boundary stops at Info Complete | FROZEN | Roadmap v0.2 §3–§4 (FROZEN); FK-D18 §7 | Exit gate = Info Complete. |
| STG0-D02 | AI = Interpret/Extract/Propose; never authoritative | FROZEN | FK-D18 §3–§4 | Inherited. |
| STG0-D03 | Human approval mandatory; accept / edit+accept / reject | FROZEN | FK-D18 §5 | Attributable disposition. |
| STG0-D04 | AI confidence ≠ approval | FROZEN | FK-D18 §5 | — |
| STG0-D05 | Provenance mandatory for every AI-derived value | FROZEN | FK-D18 §6 | Model OPEN (STG0-O01). |
| STG0-D06 | AI cannot mark Info Complete | FROZEN | FK-D18 §4.2/§7 | — |
| STG0-D07 | Existing/new Deal and amendment decisions are human-controlled | FROZEN | FK-D10; FK-D03; SOP v0.2 §5 | AI may only suggest. |
| STG0-D08 | Reuse native + existing FJK downstream model; do not rebuild | FROZEN | FK-D12; Plan §C–§D | Native-first. |
| STG0-D09 | Stage 0 does not include Supplier Quotation / Customer Quotation / Trip | FROZEN | Roadmap v0.2 §3, §5–§7; FK-D15/FK-D17 | Boundary. |
| STG0-D10 | Current repository inventory: 11 FJK DocTypes; 20 custom fields on `CRM Deal`; allocations implemented | FACT | `bench/apps/feeljapank_crm/feeljapank_crm/fixtures/custom_field.json`; `.../doctype/` | Documentation reconciliation (Plan §N). |
| STG0-D11 | No AI / proposal / provenance implementation currently exists | FACT | Repo-wide search (Stage 0 Reconciliation §5) | Grey: only a CSS false positive. |
| STG0-D12 | AI autonomous authoritative CRM decisions | REJECTED | FK-D18 §4.2 | Never permitted. |
| STG0-D13 | Rebuilding native Company/Contact/Deal masters for AI | REJECTED | FK-D12; FK-D04 | No duplicate masters. |
| STG0-D14 | Stage 0 Implementation Plan v0.1 | PROPOSAL | `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` | Awaiting PLAN REVIEW. |
| STG0-D15 | This documentation task (create Stage 0 plan/decisions/verification/log) | APPROVED | Operator instruction 2026-10-07 | Documentation only; authorizes no BUILD. |
| STG0-D16 | O07 conditional provider decision — external hosted LLM API category technically/operationally suitable behind a provider-agnostic adapter; AI remains proposal-only | APPROVED (conditional, 2026-10-07) | Operator authorization 2026-10-07; Register §11; Design §19 | No vendor selected; customer-data processing conditional on O08 |
| STG0-D17 | O08 governance resolution — accept the DeepSeek-Flash (`deepseek-flash`) data-handling arrangement for the Phase 1 pilot; defer provider-policy clarification (P1–P7) as accepted residual risk, not closure; mainland-PRC positioning accepted for the pilot | APPROVED (risk acceptance, 2026-10-07) | Operator authorization 2026-10-07; Register §12.2; Decisions §3K.2 | Reopen per defined triggers |
| STG0-D18 | O06 Telegram implementation authorized — operator revokes the prior "pending / not authorized" state and authorizes the Telegram build; internal-only transport preserved | APPROVED (operator authorization, 2026-10-08) | Operator instruction 2026-10-08; Register §10; Decisions §3D | Approach selection + O08-class security + build PLAN still required |
| STG0-O01 | Provenance model: native-sufficient vs dedicated structure | APPROVED (2026-10-07): datum/proposal-level, evidence-linked, four layers. Schema OPEN. | Requirements approved; dedicated representation is technical direction. See §3E; Register §5. | FK-D18 §6; Design §13.3 | Schema/design later |
| STG0-O02 | Proposal lifecycle / states | APPROVED (2026-10-07): 5 states + explicit SUPERSEDED; ACCEPTED ≠ authoritative + explicit promotion; append-only; immutable facts. Schema OPEN. | Requirements approved. See §3F; Register §6. | Data-to-Quotation §23; Design §23.1 | Schema later |
| STG0-O03 | Source storage / access mechanism | OPEN | Roadmap v0.2 §10 | — |
| STG0-O04 | Proposed ↔ authoritative relationship | APPROVED (2026-10-07): semantics + 15 invariants (explicit/attributable/non-destructive/idempotent promotion; accept ≠ promotion; Deal resolution separate; correction additive). Schema OPEN. | Requirements approved. See §3H; Register §8. | Design §14.1 | Schema later |
| STG0-O05 | Human approval mechanism (UI/workflow) | OPEN | FK-D18 §5 | — |
| STG0-O06 | Initial channel scope | OPEN — STRATEGY ALIGNED; Telegram IMPLEMENTATION AUTHORIZED (2026-10-08) | CORE: inbound email (native; runtime inbound disabled) + manual capture baseline. DEFERRED: live WhatsApp inbound. INTERNAL-ONLY: Telegram — implementation authorized. See §3C/§3D; Design §18.2–§18.3. | Governance direction 2026-10-07; operator authorization 2026-10-08 | Email enablement pending; Telegram approach + O08-class security + build PLAN required |
| STG0-O07 | AI provider | **CONDITIONALLY APPROVED / SELECTED** (2026-10-07): `deepseek-flash` (DeepSeek-V4.1-Flash) selected for Stage 0; synthetic bake-off PASS; residual provider-policy risk accepted (see O08). See §3J; Register §11. | FK-D18 §10; Roadmap v0.2 §10; Design §19; DeepSeek-Flash evidence | FK-D12 implementation PLAN next |
| STG0-O08 | AI security / data handling (egress, retention, logging, credentials) | **ACCEPTED WITH DEFERRED PROVIDER ASSURANCE** (2026-10-07): provider-independent controls approved; DeepSeek provider-policy items (P1–P7) accepted as Known/Accepted Residual Risk — Deferred Assurance; reopen triggers defined. See §3K, §3K.1, §3K.2; Register §12. | No AI keys exist; secrets in gitignored `site_config.json`/untracked `.env`; `server_script_enabled=1`/`developer_mode=1` noted. | Design §17.2 | Reopen per triggers |
| STG0-O09 | Vague-request persistent-intake convention | OPEN | SOP v0.2 §4 [OPEN] | Business decision. |

---

## 3A. Technical Design Findings (2026-10-07) — PROPOSAL / OPEN

Recorded from `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md`. These are **technical recommendations requiring human governance approval**. They do **not** change the `OPEN` status of STG0-O01…O09.

| ID | Finding | Class | Recommendation | Evidence | Unresolved |
|---|---|---|---|---|---|
| STG0-P01 | Provenance representation | PROPOSAL | Native sources suffice for evidence/history/notes; add a dedicated FJK proposal/provenance structure for typed proposals + per-datum source + disposition + value link. O01 remains OPEN pending approval. | Design §13, §20, §21 | O01 approval |
| STG0-P02 | Proposal lifecycle | PROPOSAL | `proposed → accepted | edited+accepted | rejected | deferred`; terminal states retained. | Design §23 | O02 approval |
| STG0-P03 | Source storage/access | PROPOSAL | Reuse native `Communication`/`WhatsApp Message`/`File`; intake reference points to native source; no new source store. | Design §7, §18 | O03 retention/access |
| STG0-P04 | Proposed↔authoritative relationship | PROPOSAL | Promotion only via approval endpoint; proposal stores back-reference; `Version` records the change. | Design §14, §22 | O04 approval |
| STG0-P05 | Human approval mechanism | PROPOSAL | Extend `fjk-workspace` with a review view + approval APIs; disposition-attributed; no direct AI write path. | Design §12, §24 | O05 approved UX |
| STG0-P06 | Channel scope | PROPOSAL | Initial: operator manual + one text-centric channel (WhatsApp/email); media preserved, extraction limited. | Design §18 | O06 governance |
| STG0-P07 | Provider abstraction | PROPOSAL | HTTPS + key auth + structured output + timeouts + provider-agnostic adapter + auditable, no vendor coupling. | Design §19 | O07 selection |
| STG0-P08 | Security knowns | FACT | HMAC guard present; secrets in gitignored `site_config.json`; no provider/keys exist. | Design §17 | O08 provider specifics |
| STG0-P09 | Candidate resolution | PROPOSAL | Candidates stored as proposals; authoritative links (`organization`/`contact`/`contacts`/`Communication.reference_*`) written only on human accept. | Design §10 | approval |
| STG0-P11 | DeepSeek-Flash provider verification | FACT + B (CONDITIONAL PASS) | Provider `deepseek-flash` (DeepSeek-V4.1-Flash); provider-policy gate CONDITIONAL (API-input training/retention/deletion/subprocessors unresolved); synthetic bake-off EXECUTED 2026-10-07 — 9/9 PASS (malformed-output PARTIAL); injection/Deal/Info-status boundaries held. | `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-DeepSeek-Flash-Provider-Verification-v0.1.md` | Option 1 — select conditionally |
| STG0-P12 | O08-P DeepSeek provider data-handling resolution | FACT + B (CONDITIONAL CLOSE) | First-party review: P1 training/improvement (ToU §4.3 de-identified opt-out right), P2 retention (disk cache default-on; no period), P3 deletion, P4 subprocessors, P5 secondary use, P6 logging = OPEN; P7 jurisdiction = PARTIALLY ESTABLISHED (mainland PRC) + internal decision; HTTPS/server-side auth/identity PASS. | `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-DeepSeek-Flash-Provider-Verification-v0.1.md` §11 | Written provider confirmation (P1–P6) + jurisdiction decision; real customer data NOT authorized |
| STG0-P10 | Vague-request convention | PROPOSAL | Preserve native source; link to Contact/Organization only; optional Lead/Task; no Deal/requirements/status change. | Design §16, §26 | O09 business decision |
| STG0-R01 | Phone→Deal silent association (existing native CRM behavior) vs FK-D10 | APPROVED — CONDITIONAL A | Accepted as provisional context only; native unchanged; explicit human Deal confirmation mandatory; no authoritative/provenance status; telephony included; no remediation selected. See §3B. | Design §26A/§26B; `apps/crm/crm/api/whatsapp.py:37` | Frozen 2026-10-07 |

**Formal design review (2026-10-07):** verdict **PASS WITH CORRECTIONS**; O01–O09 remain OPEN and are classified as ready/needs-investigation in the Implementation Log. Review corrections were documentation-only (Technical Design §6/§22/§25/§26A.12; Verification Plan scope clarification). No OPEN item was resolved. No FROZEN decision changed.

---

## 3B. STG0-R01 — Existing Phone→Deal Association (2026-10-07)

Full analysis: `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` §26A.

### FACT findings

- The behavior is **native `crm` app v1.84.0** (`crm/crm/hooks.py:180` → `crm/api/whatsapp.py:37` → `crm/integrations/api.py:141`), not `frappe_whatsapp`, `ark_whatsapp_guard`, or FJK.
- Trigger: `WhatsApp Message` **validate/insert** (inbound webhook or outbound send), when `from`/`to` is present.
- Condition for Deal association: matched `Contact` has a `CRM Contacts` row with `is_primary = 1` whose parent is a `CRM Deal`.
- **Record modified:** `WhatsApp Message.reference_doctype` / `reference_name` only. **No** Deal field, **no** Communication, **no** Contact/Lead mutation. Notifications are created via `notify_agent`.
- A Contact may be primary on multiple Deals (`is_primary` uniqueness enforced only within a Deal, `crm_deal.py:140`); resolution returns one Deal non-deterministically ⇒ can silently associate with an **old/incorrect** Deal.
- Path runs at **ingestion**, **before** any Stage 0 AI/human review.
- Dependents: `notify_agent`, `get_whatsapp_messages` + CRM Activities UI (`crm/frontend/src/components/Activities/Activities.vue:551`), related telephony `crm/integrations/twilio/api.py:127`, and CRM tests (`crm/tests/test_integrations.py`).

### Governance classification

**C — conflicts with FK-D10 / Communication Context Rule §2 as written** (phone-only, no explicit-context check, no unambiguity check, silent, non-conversational ordering), **qualified** by the fact that no authoritative Deal field is mutated (the reference is at the communication level). FK-D10 `FROZEN`: "Phone matching is fallback only"; "may suggest … only where the opportunity is genuinely unambiguous"; "CRM must not silently guess the Deal."

### PROPOSAL

- Short-term (no code): treat the message-level reference as **provisional/non-authoritative**; require explicit human Deal confirmation in Stage 0; AI/provenance must not consume it as approved identity (option R-A).
- Technical remediation to be decided at `FK-D12`: option **R-B** (intercept/defer the WhatsApp `validate` hook) or **R-C** (provisional tag), with telephony linkage scope considered. Options R-D/R-E documented in Design §26A.11.

### Status

**APPROVED — CONDITIONAL A** (2026-10-07). *(History preserved: this item was previously OPEN / classified C; the OPEN rationale is retained above in the FACT/PROPOSAL sections and is not erased.)*

Approved boundaries:

1. Native phone-derived `reference_doctype/reference_name` **remains unchanged** (no remediation).
2. The native reference is **NOT authoritative Deal resolution**.
3. The native reference is **NOT evidence of human Deal confirmation**.
4. The native reference is **NOT valid provenance** for an authoritative Deal relationship.
5. Stage 0 **must require explicit human Deal confirmation** before treating a communication as belonging to a Deal.
6. AI **may propose** a candidate Deal but **may not confirm or promote** it.
7. The same boundary applies to the analogous **telephony Call Log** association.
8. R-B, R-C, R-D, R-E are **not selected or authorized**.
9. **No native CRM remediation** is authorized at this stage.
10. This decision **does not authorize BUILD**.

Critical rule: **Native communication context ≠ human-confirmed Deal relationship.** `WhatsApp Message → native phone match → Deal` must never be interpreted as `Human approval → Deal`.

### UI investigation findings (2026-10-07, read-only) — Design §26B

- **FACT:** the Deal/Lead WhatsApp tab (`crm/frontend/src/pages/Deal.vue:568–620`; `components/Activities/Activities.vue:550–556`) shows messages whose `reference_*` equals the current document, with **no** inferred/confirmed indicator and **no** correction/removal action (only "Reply"; Forward/Delete commented out).
- **FACT:** an explicit outgoing association can be **overwritten** by the phone-inference `validate` hook (`crm/api/whatsapp.py:37–44`).
- **FACT:** the Desk `WhatsApp Message` form exposes editable `reference_doctype`/`reference_name` (Sales roles have write via `add_roles`), but this is not a surfaced CRM-UI confirmation flow.
- **FACT (telephony):** the same phone inference exists for `CRM Call Log` (`twilio/api.py:113–123` → `get_contact_by_phone_number` → `links`), surfaced in the Deal Calls tab with no inferred/confirmed indicator. **Telephony must be included in the same STG0-R01 decision.**
- **Evidence-based implication (historical):** unconditional A was not supported; the evidence supported a conditional position (A + mandatory Stage 0-side human Deal confirmation and exclusion of `reference_*` from authority/provenance), with B required if that cannot be guaranteed.
- **Decision:** the conditional position is now **APPROVED (CONDITIONAL A)**; native behavior is unchanged and no remediation is selected.

---

## 3C. O06 / O08 Investigation Findings (2026-10-07, read-only)

Full evidence: Design §17.1 (O08) and §18.1 (O06). Not an approval; classification only.

### O06 — Initial channel scope

- **FACT (runtime, read-only):** no inbound customer-communication channel is operational. WhatsApp: 0 accounts, defaults null, 0 messages. Email: 1 account (Gmail), `enable_outgoing=1`, `default_outgoing=1`, **`enable_incoming=0`**. Telephony: 0 agents, 0 call logs. `Communication` count = 0. Operator-manual intake is available.
- **Classification: READY FOR GOVERNANCE RESOLUTION.** Availability is now known; the remaining choice (which channel(s) to enable for Stage 0) is a governance/ops decision. Enabling any live inbound channel is **not authorized** here.
- **PROPOSAL:** baseline initial scope = operator-manual intake (native source preservation via `File`/`Communication`); live WhatsApp/email inbound as a later increment gated by explicit channel-configuration authorization.

### O08 — AI security / data handling

- **FACT:** no AI provider credentials exist; secrets (`db_password`, `encryption_key`, `whatsapp_app_secret`) live in gitignored `site_config.json`; `.env` is untracked; no adapter/egress exists.
- **Provider-independent requirements (decidable now):** HTTPS; no secret in source; minimum-necessary payload; no authoritative AI write; provenance preserved; failure isolation; timeouts/retries; structured-output validation; redacted logging.
- **Provider-dependent requirements (deferred to O07):** retention; training/use of submitted data; regional processing; subprocessors; deletion guarantees; enterprise/privacy controls; contractual restrictions.
- **Classification: READY FOR GOVERNANCE RESOLUTION** for both provider-independent controls and provider-policy requirements (now expressible after O07). See §3K.

### Cross-decision impact (not resolved)

- **O01 (provenance model):** O08 confirms no AI egress exists and provenance must be preserved independent of provider; source references remain native. No schema decided.
- **O03 (source storage/access):** O06 shows the initial baseline is manual intake with native source preservation; live-channel retention/access remains tied to O06 enablement and O08.
- **O07 (provider):** O08 provider-dependent items cannot be finalized before O07; O07 remains the gate for those.
- **O09 (vague-request convention):** O06's manual baseline accommodates vague requests via native preservation only; O09 remains OPEN.

---

## 3D. O06 Channel Strategy Alignment + Telegram Investigation (2026-10-07)

Not an approval of any implementation; records governance direction and read-only findings.

### Email — CORE Stage 0 input (`FACT`)

- Capability: Frappe `Communication`; `Email Account` supports inbound (`enable_incoming`, `use_imap`, `email_server`, `use_ssl`, `default_incoming`, `auth_method` Basic/OAuth); native scheduler `frappe.email.doctype.email_account.email_account.pull` (`apps/frappe/frappe/hooks.py:230`) → `EmailAccount.receive()` (`email_account.py:554`) → creates `Communication`; attachments as `File`; CRM hooks `on_communication_insert/update` (`crm/hooks.py`; `crm/utils/__init__.py:256/260`).
- Runtime: 1 `Email Account` "FeelJapanK CRM" (Gmail) with `use_imap=1`, `use_ssl=1`, `email_server=imap.gmail.com`, `auth_method=Basic`, `enable_outgoing=1`, `default_outgoing=1`, **`enable_incoming=0`**, `default_incoming=0`. `enable_scheduler=1`; Procfile runs `bench schedule` + `worker`. `Communication` count = 0.
- **Enablement prerequisites (not performed):** set `enable_incoming` (and `default_incoming`) on the existing account; ensure a valid credential (Basic ⇒ Gmail App Password with IMAP enabled, or switch to `auth_method=OAuth` using Google Settings); IMAP/SSL settings already present; scheduler/worker running. **No app/code changes required** — inbound Communication creation is native. **Verification after enablement:** test inbound email → `Communication` (sender/subject/body/threading) + attachments as `File` + CRM association; permissions; no duplicates.
- **Conclusion:** email inbound is a **CORE Stage 0 input**; runtime enablement is pending **operational authorization**, not architectural feasibility. It is **not** described as deferred in the WhatsApp sense.

### WhatsApp — DEFERRED (`FROZEN` direction)

- Live WhatsApp inbound is deferred for Stage 0 (setup effort disproportionate; manual capture sufficient). Baseline: operator captures screenshot/attachment → preserve as source → AI → review. STG0-R01 Conditional A unchanged.

### Manual source capture — IMMEDIATE BASELINE

- Upload/preserve screenshots, images, PDFs, documents as source artifacts, independent of AI interpretation.

### Telegram — INTERNAL-ONLY; IMPLEMENTATION AUTHORIZED (2026-10-08)

- **No existing capability:** installed apps contain no Telegram app; no Telegram DocType/hook/config; `crm/README.md` links only to a community group; `frappe_whatsapp.js` "Send To Telegram" is a mislabeled comment for Send-To-WhatsApp. BR §32 lists "Telegram operational functionality" under **Explicitly Deferred Decisions**; `Frappe-CRM-Environment-Foundation-Freeze.md:158` leaves "Telegram operational controls" unfrozen.
- **Designation:** internal-only operator/system communication and intake; **not** a customer channel; **IMPLEMENTATION AUTHORIZED (2026-10-08, operator instruction — revokes prior "not authorized / pending")**.
- **Authority boundary:** Telegram metadata MUST NOT establish authoritative Company/Contact/Deal, amendment/new-request, authoritative requirements, customer confirmation, or Info Complete (FK-D10, FK-D12, FK-D18, STG0-R01).
- **Security (`OPEN`, O08-class):** Telegram introduces a third-party data processor carrying customer artifacts; bot token is a secret; chat/sender identifiers exposed; retention is provider-dependent. **Not** equivalent to local/manual intake. Provider/legal confirmation is an **evidence dependency**.

### O06 classification (updated)

- **CORE STAGE 0 INPUTS:** inbound email; manual source capture.
- **DEFERRED:** live WhatsApp inbound.
- **INTERNAL-ONLY CANDIDATE:** Telegram.
- **Status: OPEN** — strategy aligned; inbound email enablement and Telegram authorization remain pending explicit governance/ops authorization.

### Cross-decision impact (not resolved)

- **O01 (provenance model):** provenance must work consistently whether a source arrives via email, manual upload, or future Telegram intake; no schema decided.
- **O03 (source storage/access):** native source preservation remains preferred; email/Telegram sources must materialize as native `Communication`/`File`/source records.
- **O05 (human approval):** Telegram notifications must not replace the authoritative human-review/approval mechanism.
- **O07 (provider):** no AI provider selected.
- **O08 (security/data handling):** Telegram is a distinct external-data-handling consideration requiring an O08-class review; not silently equivalent to local intake.
- **O09 (vague-request convention):** email/manual/Telegram intake must preserve vague requests without forcing an artificial Deal/requirement interpretation.

### Telegram implementation authorization (2026-10-08, STG0-D18)
- **Decision:** operator **revokes the prior "Telegram build pending / not authorized" state** and **AUTHORIZES the Telegram implementation**.
- **Preserved (unchanged):** internal-only (not a customer channel); transport/control surface only; notifications cannot replace D12-E approval; Telegram metadata never establishes authoritative Company/Contact/Deal/requirements/confirmation/Info Complete (FK-D10/FK-D12/FK-D18/STG0-R01).
- **Required for the build:** implementation **approach selection** (community Frappe Telegram app vs Bot-API integration [webhook/long-polling] vs generic webhook); **O08-class security/data-handling** determination; **source-preservation mapping** to native `File`/`Communication` with channel metadata; a scoped **Telegram BUILD PLAN** under the FK-D12 high-risk gate.
- **Not authorized by this decision:** any Telegram code/config/credential/webhook created during this documentation step; customer-data processing via Telegram before the O08-class determination.

---

## 3E. O01 Provenance Model Investigation (2026-10-07, read-only)

Canonical summary: Decision Register §5. Technical detail: Design §13.3.

### Status
**APPROVED** (2026-10-07): Stage 0 provenance is datum/proposal-level, evidence-linked, preserving the four layers (Source Evidence → AI Interpretation/Proposal → Human Decision → Authoritative CRM Value). Schema/design remains later; a dedicated representation is technical direction (not yet designed).

### FACT findings — native capability
- `Communication` (`reference_*`, `timeline_links`, `track_changes=1`), `Communication Link`, `WhatsApp Message` (`reference_*`, `content_type`, `attach`, `message_id`, `conversation_id`), `File` (`attached_to_*`, `content_hash`), `Comment` (`comment_by`, `published`, `track_changes=1`), `Version` (`data` old→new via `get_diff`, `version.py:102`), `Activity Log` (`user`, `full_name`, `ip_address`, reference/timeline), `CRM Deal` (`track_changes=1`), `FCRM Note` (`reference_doctype`/`reference_docname`, `track_changes=1`), FJK child tables (`istable=1` → history on parent Deal), timeline aggregator (`crm/api/activities.py:23`).
- `CRM Organization` has no `track_changes`.

### FACT findings — provenance gaps (native audit ≠ AI proposal provenance)
No native object for a non-authoritative AI proposal; no typed per-datum disposition with attribution; `Version` lacks proposal/AI/source reference; no per-datum source span; no layer classification; no isolation boundary; native `reference_*` is non-authoritative (STG0-R01).

### Governance position (what provenance must achieve)
Mandatory (FK-D18 §6). Must keep `source evidence ≠ AI interpretation ≠ human decision ≠ authoritative data` and support the chain `authoritative value → human decision → AI proposal → source → original evidence`.

### Required minimum (per datum)
source reference (+ `content_hash` when a `File` exists); target datum; proposed value; AI interpretation-event identity (run id, provider/model identity, timestamp, status); human disposition (accept/edit+accept/reject/defer) with reviewer + timestamp + original proposed value; on promotion, link to the resulting authoritative value. Useful-optional: confidence, source span, prompt version, comments, channel metadata. Not required: full prompt text, token logs.

### Field-level vs record-level
Datum/proposal-level required; record-level alone insufficient.

### Classification
**APPROVED** (2026-10-07) — datum/proposal-level, evidence-linked; schema remains later.

---

## 3F. O02 Proposal Lifecycle Investigation (2026-10-07, read-only)

Canonical summary: Decision Register §6. Technical detail: Design §23.1.

### Status
**APPROVED** (2026-10-07): 5 proposal states + explicit `SUPERSEDED`; `ACCEPTED ≠ authoritative` with explicit promotion; append-only; immutable historical facts. Schema remains OPEN.

### Findings
- **States:** `PROPOSED` → `ACCEPTED` | `EDITED_ACCEPTED` | `REJECTED` | `DEFERRED`; `SUPERSEDED` as explicit closure/link. `REJECTED` terminal; `DEFERRED` pending. Run/processing states (`SUCCEEDED/FAILED/TIMEOUT/INVALID_OUTPUT/UNSUPPORTED_SOURCE/SOURCE_UNAVAILABLE/DUPLICATE`) are a **separate** concept; FJK Information Status is separate again.
- **Transitions:** append-only disposition events; `REJECTED` never revives (reprocessing = new proposal); historical facts immutable.
- **Accepted ≠ authoritative:** acceptance makes a proposal promotion-eligible; **promotion is a separate recorded event**; AI never promotes (one gesture possible, two recorded steps).
- **Edited:** preserve original AI value + human value + reviewer + timestamp; distinct from plain accepted.
- **Rejection/deferral:** retained; deferral non-terminal; rejected can never become authoritative; reason optional-useful.
- **Reprocessing/multiple/partial:** append-only; new run → new proposal; explicit supersession; competing proposals independently reviewed, one promotable accepted value per datum; per-datum dispositions within a run.
- **Conflict:** existing authoritative value vs new proposal → pending review, no auto-overwrite, explicit human decision.
- **Customer-confirmation vs human-accepted:** distinct (Information Status unaffected).
- **Deal resolution:** separate human disposition; AI cannot confirm (FK-D10/STG0-R01).
- **Native capability:** `Version`/`Comment`/`Activity Log`/`CRM Status Change Log`/Frappe `Workflow` provide history/pattern but cannot express per-datum proposal lifecycle + provenance links → dedicated representation appears necessary (technical direction; no schema).

### Classification
**APPROVED** (2026-10-07); schema remains later.

---

## 3G. O03 Source Storage / Access Investigation (2026-10-07, read-only)

Canonical summary: Decision Register §7. Technical detail: Design §7.1.

### Status
**INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION.** Not APPROVED.

### FACT findings — native source storage
- `Communication` (`communication_medium`, `content` Text Editor, `reference_doctype`/`reference_name`, `message_id`, `uid`, `sent_or_received`, `communication_date`, `timeline_links`, `track_changes=1`, not submittable, permission-checked).
- `Communication Link` (`link_doctype`/`link_name`/`link_title`/`communication_date`) — link a source to multiple records.
- `File` (`file_name`, `is_private`, `file_size`, `file_url`, `content_hash`, `attached_to_doctype`/`name`/`field`, `file_type`, `track_changes=1`); `content_hash` computed on save; dedup by `(content_hash, is_private)`; `create_attachment_copy` reuses `file_url`; `on_trash` deletes binary unless another `File` shares the `content_hash`.
- `WhatsApp Message` (`reference_doctype`/`reference_name`, `content_type`, `attach`, `message_id`, `conversation_id`, `reply_to_message_id`) — source identity/metadata.
- `FCRM Note` (`reference_doctype`/`reference_docname`); `CRM Deal`/`Organization`/`Contact` masters.

### Key findings
- **Source identity:** native doctype + record name (required); `content_hash` for file-backed evidence (required); timestamp/origin where available.
- **Immutability:** `File` binaries are not replaced in place by normal edit, but `File` may be renamed (`after_rename`), deleted (`on_trash` → `_delete_file_on_disk`), and deduped/shared; `Communication.content` is editable; `Version` tracks metadata, not guaranteed binary content. ⇒ provenance must capture the exact source identity (`name` + `content_hash`) at AI-processing time and treat it as immutable (O01).
- **Location/span:** native provides whole-artifact only (whole body / whole file / whole message); sentence/page/section/image-region is **not** native and must be captured by interpretation if needed.
- **Access:** `File` and `Communication` have permission checks; a reviewer may lack read access to a source record (permission gap → OPEN, no change here).
- **Deal/Company/Contact:** sources exist independently; `reference_*` is optional, so source preservation does not depend on an inferred CRM relationship (STG0-R01: `reference_*` is context, not human-confirmed authority).
- **Duplicates/versioning:** same binary may be one deduped `File` or a shared-`file_url` copy; source identity (`name`+`content_hash`) distinguishes reprocessing vs duplicate upload.
- **Deletion/retention:** deleting/renaming a referenced source can break the chain; retention policy is **OPEN**; source deletion must be controlled or made detectable.
- **Compound sources:** a parent `Communication` may hold multiple `File` attachments; provenance must be able to reference the specific attachment (conceptual hierarchy; no schema).

### Minimum common source contract (conceptual)
Required: source channel; native source reference (doctype + name); evidence identity (`content_hash` when file-backed); original timestamp; origin identity where available. Optional: attachment identity; message identity; source location/span; thread/context. Not required: a unified source store; raw MIME/full-header retention; OCR/image-region structures.

### Native sufficiency
Sufficient for **storage, identity, preservation, access (with permission caveat), and cross-channel representation** of source evidence. Gaps: guaranteed immutability/retention; native location/span; reviewer access under permissions. The source store is reused, not replaced.

### Classification
**READY FOR GOVERNANCE RESOLUTION** (not implementation approval).

---

## 3H. O04 Proposed ↔ Authoritative Relationship Investigation (2026-10-07, read-only)

Canonical summary: Decision Register §8. Technical detail: Design §14.1.

### Status
**APPROVED** (2026-10-07): relationship semantics + 15 invariants; schema/promotion implementation remains OPEN.

### Findings
- **Targets (`FACT`):** 14 `fjk_*` shared context fields + 6 FJK child tables on `CRM Deal`; native `CRM Deal`/`Organization`/`Contact`. FJK app exposes **no write API** for requirement/allocation rows.
- **Native capability:** `Version` (field/child old→new; `row_changed` with row name) proves prior authoritative values and change history; child rows get hash `name`s. Native is **insufficient** for a proposal entity, typed per-datum dispositions, accept-vs-promotion at datum level, reject/defer/supersede records, competing proposals, reprocessing history, proposal→authoritative link, human Deal-resolution record, and idempotent promotion. New-but-unequal targets (not-yet-created rows/Deal) have no native identity.
- **Deal resolution:** `reference_*` non-authoritative (STG0-R01); a separate human decision record is required.
- **Separation preserved:** FJK Information Status / confirmation fields are distinct from proposal state.

### Required semantics
Target identification = doctype + record (or "new") + field/child table + logical datum key; promotion = explicit + separately recorded from acceptance + attributable + non-destructive + bidirectional + idempotent + partial-failure-auditable; correction additive; Deal resolution separate.

### Required invariants
AI never authoritative alone; acceptance attributable; promotion attributable; original proposal immutable; edits preserve original; prior value reconstructable; reject cannot silently promote; reprocessing append-only; competing proposals independently traceable; Deal resolution separate; confirmation separate from acceptance; Information Status separate; native context ≠ Deal authority; promotion idempotent/partial-auditable; correction additive.

### Classification
**APPROVED** (2026-10-07); schema/promotion implementation remains later.

---

## 3I. O05 Human Approval Mechanism Investigation (2026-10-07, read-only)

Canonical summary: Decision Register §9. Technical detail: Design §12.1.

### Status
**INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION.** Not APPROVED.

### FACT findings — native actor/authority
- Roles in use: `System Manager`, `Sales Manager`, `Sales User`, `CRM Manager`.
- CRM `CRM Deal` uses org-hierarchy `has_permission`/`permission_query_conditions` (`crm/hooks.py:135–146`).
- FJK mirrors Deal permission: `feeljapank_crm/permissions.py` (`has_permission`), `_require_deal_access(deal, ptype)`; no second permission model.
- Existing attributable human-action patterns: `set_info_complete` (requires Deal *write*; audit via native `Version`) and quotation `confirm_version` (requires write; **append-only**; records `confirmed_on`/`source`/`confirmation_evidence`/`notes`; sets `status="Confirmed"`).
- No `Workflow` definitions are configured in the FJK/CRM apps.
- Attributable identity available: `Version.owner`/`modified_by`, `Comment.comment_by`/`published`, document timestamps.

### Semantic model (required)
`AI Proposal` → `Human Review` (read-only until explicit action) → `Human Disposition` (attributable) → `Promotion Eligibility` → `Explicit Promotion` (attributable) → `Authoritative CRM Value`. **Review ≠ disposition; disposition ≠ promotion.** Viewing/opening/navigating implies nothing.

### Granularity
**Datum-level** (per approved O01/O02). Run-level status is **derived only** and cannot override datum dispositions. Partial approval is permitted.

### Dispositions
`ACCEPT`, `EDITED_ACCEPTED` (original AI value + edited value both retained), `REJECTED` (terminal; cannot later promote), `DEFERRED` (non-terminal; not promotion-eligible), `SUPERSEDED` (explicit; not a new state). Reason fields: rejection reason, deferral reason, Deal-resolution explanation, conflict explanation = USEFUL; edit reason/approval comment = OPTIONAL. No new mandatory fields without governance.

### Accept vs promotion
Acceptance makes a proposal **promotion-eligible**; promotion is a **separate attributable event**. One gesture may perform both, but both facts must be recorded. Acceptance surviving promotion failure; partial promotion auditable; stale accepted proposals must not silently overwrite newer values.

### Deal resolution / customer confirmation separation
Deal resolution is a **separate human decision**; phone/email/AI similarity/`reference_*` never counts as approval (STG0-R01). Operator acceptance ≠ customer confirmation ≠ `Info Complete` ≠ Ready for Quotation (FJK Information Status preserved).

### Native capability
Sufficient: identifying an authorized operator (roles + Deal org-hierarchy + FJK mirroring) and capturing actor+timestamp for a document-level human action (Version/Comment; `set_info_complete`/`confirm_version` patterns). Insufficient: any datum-level proposal/disposition entity, accept-vs-promotion at datum level, partial-approval rollup, reject/defer/supersede records, competing proposals, stale/conflict binding, Deal-resolution decision record, and idempotent/partial-safe promotion. Native `Workflow` is a **single-document** state machine and cannot represent datum-level AI proposals with source/run linkage and dispositions.

### Gaps
No datum-level approval object; no accept→promotion binding; no partial-approval model; no reject/defer/supersede records; no competing/stale/conflict approval handling; no human Deal-resolution record; no idempotency.

### Governance decisions required
(1) authorized approver role set / capability; (2) whether one gesture may accept+promote while recording both; (3) partial-approval promotion policy; (4) stale/conflict handling (block/warn/re-review); (5) Deal-resolution recording + gate; (6) reason requirements; (7) concurrency/single-promotable-value enforcement.

### Classification
**READY FOR GOVERNANCE RESOLUTION** (not implementation approval).

---

## 3J. O07 AI Provider Investigation (2026-10-07, read-only)

Canonical summary: Decision Register §11. Technical detail: Design §19.

### Status
**CONDITIONALLY APPROVED (category-level, 2026-10-07).** No vendor selected; customer-data use conditional on O08.

### FACT findings
- No AI provider, credential, key, egress, code, or dependency exists in the repository/runtime; `feeljapank_crm` has no scheduler/queue/outbound HTTP.
- Vendor documentation (2026-10-07, time-sensitive): OpenAI, Anthropic, and Google document schema-constrained structured output; OpenAI and Anthropic document API data not used for training by default, with retention / zero-retention controls.

### PROPOSAL — requirement set (R1–R9)
Typed extraction (destination, dates, pax, transport, accommodation, meals, activities, special requirements, ambiguity, missing info); schema-constrained JSON validated app-side; explicit-vs-inferred + uncertainty; Japanese/English/mixed; error taxonomy → O02 run states; timeout/retry/backoff with no authoritative write on failure; provider/model/version/response metadata; provider-agnostic adapter, no vendor SDK in core, no silent fallback; HTTPS + key/token auth + redaction/minimisation hooks.

### Provider categories
- A. External hosted LLM API — preferred category (conditional).
- B. Self-hosted / local — viable alternative; requires FK-D12 review.
- C. Hybrid / routing — adapter required regardless; multiplies O08 evaluations.

### Governance position
Category conditionally approved; O07 produces inputs to O08, not security approval. **INFERENCE:** Japanese/mixed-language extraction quality untested (**OPEN**).

### Classification
**CONDITIONALLY APPROVED (category-level)** — vendor selection and customer-data authorization remain OPEN, gated by O08.

---

## 3K. O08 AI Security / Data Handling Investigation (2026-10-07, read-only)

Canonical summary: Decision Register §12. Technical detail: Design §17.2.

### Status
**INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION.** Recommended: conditional approval. Not approved; no security authorization.

### FACT
- No AI credential/key/egress/code/SDK; `feeljapank_crm` has no HTTP/logging/AI references.
- Secrets: `db_password`, `encryption_key`, `whatsapp_app_secret` in gitignored `bench/sites/crm.localhost/site_config.json`; `.env` untracked; `server_script_enabled=1`, `developer_mode=1` (hardening review item; **unchanged**).
- WhatsApp webhook HMAC-SHA256 guard; FJK permissions mirror the linked Deal (Administrator / System Manager bypass).
- Channels (O06): email inbound disabled; WhatsApp live deferred; `Communication`=0; manual baseline.

### MUST
- HTTPS/TLS only; credentials server-side only (never source/frontend/browser); **AI input payloads must never intentionally contain application credentials/secrets**; minimum-necessary egress with payload built inside the FJK boundary; pre-egress validation/redaction; no authoritative AI write; provenance preserved by reference; failure isolation; timeout/retry/backoff; structured-output validation; log redaction.
- Provider policy: no training/improvement on submitted customer data; defined retention + deletion; transient-vs-persistent understood; abuse/safety-review handling understood; no undisclosed secondary use; subprocessor transparency; processing location known.
- AI output is untrusted external input: schema-validated; malformed/unexpected rejected; never directly executes CRM actions.

### SHOULD
- Zero-retention option where available; pseudonymisation of names/phone/email where interpretation permits; `server_script_enabled`/`developer_mode` disabled outside local development.

### OPEN
- Processing jurisdiction / residency / cross-border transfer — **requires business/legal/security determination**; retention period; masking policy; deletion SLA; provider-specific (vendor) evidence; Telegram review.

### NOT REQUIRED
- Full prompt/response retention in ordinary logs (per O01); provider/model selection (separate decision); O09 convention.

### Human-approval boundary
O05 preserved absolutely: AI cannot approve, promote, establish Deal/Company/Contact authority, declare confirmation, mark Info Complete, or initiate Supplier Quotation. External processing changes none of these.

### Classification
**READY FOR GOVERNANCE RESOLUTION — recommended: APPROVE O08 CONDITIONALLY.**

---

## 3K.1 O08-P DeepSeek Provider Data-Handling Resolution (2026-10-07, evidence only)

Canonical summary: Register §12; evidence doc §11.

### Status
**B — CONDITIONAL CLOSE** (provider gate). Real customer-data processing **NOT AUTHORIZED**.

### FACT (first-party)
- ToU §4.3: DeepSeek may, under encryption + strict de-identification + irreversibility, use Inputs/Outputs "to a minimal extent … to develop or improve the Services … or the underlying technologies", with an opt-out ("Improve the model for everyone").
- Context caching is default-on and persists input prefixes to disk.
- No API retention period, deletion mechanism/SLA, subprocessor list, or logging policy disclosed.
- Provider entity in China; governing law = mainland PRC (Open Platform ToS §10.1).
- PASS: HTTPS, server-side API-key auth, model/response identity.

### P1–P7
P1 training/improvement = OPEN; P2 retention = OPEN; P3 deletion = OPEN; P4 subprocessors = OPEN; P5 secondary use = OPEN; P6 logging = OPEN; P7 jurisdiction = PARTIALLY ESTABLISHED + internal decision.

### Minimum acceptance gate
Mandatory: no training/improvement, defined retention/deletion, locations known, subprocessors known, no unacceptable secondary use, server-side auth (PASS), controlled logging, minimum-necessary egress. Only server-side auth / HTTPS / identity are closed.

### Provider confirmation
Draft evidence request recorded (evidence doc §11.6) — do **NOT** send without authorization.

### Classification
**B — CONDITIONAL CLOSE** — conditionally closed subject to written provider confirmation (P1–P6) and an explicit jurisdiction/residency decision (P7). Real customer data remains blocked.

---

## 3K.2 O08 Governance Resolution (2026-10-07) — ACCEPTED WITH DEFERRED PROVIDER ASSURANCE

> **FeelJapanK accepts the documented DeepSeek-Flash data-handling arrangement for the Phase 1 pilot and defers further provider-policy clarification until operational need, compliance review, increased data exposure, or another governance trigger requires it.**

- **Nature:** intentional **risk acceptance** — NOT a claim that P1–P7 are technically/contractually closed.
- **Accepted residual risks (deferred assurance, NOT PASS):** P1 training/improvement; P2 retention; P3 deletion; P4 subprocessors; P5 secondary use; P6 logging; P7 detailed processing/storage residency.
- **Jurisdiction:** mainland-PRC provider/governing-law positioning accepted for the pilot; no Malaysian legal-compliance clearance, cross-border clearance, or residency conclusion asserted.
- **Unchanged:** provider-independent O08 controls; FK-D18 AI authority (INTERPRET → EXTRACT → PROPOSE); O05 human approval; minimum-necessary egress rule.
- **Carried to FK-D12:** `finish_reason` check + schema validation + never-promote-unvalidated + never-write-directly; size tokens / control thinking mode; preserve O01/O02/O04/O05 provenance; Deal resolution `selected=null`; Info-Status boundary.
- **Reopen triggers:** see Register §12.2.
- **Decision:** STG0-D17.

---

## 4. Rules

- No `OPEN` item is a decision. It requires an explicit, recorded decision before it becomes an input to BUILD.
- No FROZEN cross-project decision (`FK-D01…FK-D18`) is reopened here.
- Changes to this register are additive; superseded entries retain their history.
- Any future BUILD must pass the `FK-D12` gate and include a BUILD Decision Check.

---

## 5. Change Control

- New entries are added with an explicit class and a named authority/evidence source.
- Unresolved items are recorded as `OPEN`; do not invent decisions to complete the register.
- The Decision Register (`FK-D01…D18`) remains the cross-project index and is not modified by this workstream register.
