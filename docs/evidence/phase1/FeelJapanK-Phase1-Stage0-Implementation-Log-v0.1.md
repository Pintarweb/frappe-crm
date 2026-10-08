# FeelJapanK Phase 1 — Stage 0 — Implementation Log — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-Stage0-Implementation-Log-v0.1 |
| Subject | Controlled implementation log for Stage 0 — Data Acquisition / Data Entry — AI + Provenance |
| Version | v0.1 |
| Status | **PLACEHOLDER — NO IMPLEMENTATION PERFORMED — BUILD NOT AUTHORIZED** |
| Date opened | 2026-10-07 |
| Repository | `/home/yusmarin/frappe-crm` |
| Companion plan | `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` |

> This is a **controlled placeholder**. It records state and will record real implementation and verification evidence only when BUILD is separately authorized. `BUILD remains UNAUTHORIZED`.

---

## 1. Repository Baseline (FACT)

| Field | Value |
|---|---|
| Repository | `/home/yusmarin/frappe-crm` |
| Git HEAD at log opening | `c549fcb` (docs: quotation reference materials) |
| Frozen roadmap baseline | `7664bf2` (Roadmap v0.2 freeze) |
| FJK app DocTypes | 11 |
| Custom fields on `CRM Deal` | 20 (14 shared + 6 child tables) |
| Allocations | Implemented (Transportation + Accommodation); technically verified; human acceptance pending |
| AI / proposal / provenance implementation | None |
| Environment | frappe 15.121.1 / crm 1.84.0 / frappe_whatsapp 1.0.12 / ark_whatsapp_guard 0.0.1 (`docs/versions.lock`) |

---

## 2. Log Entries

### 2026-10-07 — Documentation task (this entry)

- **Task:** Document the approved Stage 0 planning state (PLAN / DOCUMENTATION ONLY).
- **Artifacts created:**
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md`
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md`
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md`
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-Implementation-Log-v0.1.md`
- **BUILD:** **NOT authorized.**
- **Application/schema/database/config changes:** **NONE.**
- **CRM records changed:** **NONE.**
- **Migrations / asset builds / package installs / integrations / API keys:** **NONE.**
- **Git state:** no commit, no push.
- **Documentation reconciliation:** recorded true inventory (11 DocTypes; 20 fields; allocations implemented). FROZEN Roadmap v0.2 §1 was **not** edited (requires controlled revision).
- **Next gate:** **PLAN REVIEW.**

### 2026-10-07 — Technical investigation & design (this entry)

- **Task:** OpenCode technical investigation + technical design for Stage 0 (PLAN / DOCUMENTATION ONLY). Governance/review direction provided by ChatGPT.
- **Artifacts created:**
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md`
- **Artifacts updated (documentation only):**
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (§3A technical findings, STG0-P01…P10, STG0-R01)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (§3A design-derived rows V21–V30)
- **Repository investigation performed:** native `Communication`/`Communication Link`/`Comment`/`Version`/`File`/`Activity Log`/`ToDo`/Workflow; FCRM `CRM Deal`/`Organization`/`Contacts`/`Task`/`Note`/`Call Log` + hooks/utils/whatsapp api; `frappe_whatsapp` webhook + `WhatsApp Message`; `ark_whatsapp_guard`; FJK app + `fjk-workspace` + `App.vue`.
- **Key finding:** native source + history sufficient; structured non-authoritative proposal + per-datum provenance recommended as PROPOSAL; O01–O09 remain OPEN.
- **BUILD:** **NOT authorized.**
- **Application/schema/database/config changes:** **NONE.**
- **CRM records changed:** **NONE.**
- **AI provider connected / API keys created:** **NONE.**
- **Migrations / asset builds / package installs:** **NONE.**
- **Git state:** no commit, no push.
- **Next gate:** **PLAN REVIEW.**

### 2026-10-07 — STG0-R01 investigation (this entry)

- **Task:** Follow-up PLAN investigation — existing phone→Deal silent association vs FK-D10 (PLAN/DOCUMENTATION ONLY).
- **Investigation performed:** traced `WhatsApp Message.validate` → `crm.api.whatsapp.validate` (`:37`) → `crm.integrations.api.get_contact_lead_or_deal_from_number` (`:141`) → `get_contact` (`:302`); identified modified records, conditions, multi-Deal/ambiguous/no-Deal behavior, dependents, and timing.
- **Finding:** native `crm` app v1.84.0 behavior; modifies only `WhatsApp Message.reference_doctype/name` (+ notifications); no Deal/Communication/Contact mutation; runs at ingestion before Stage 0 review; conflict classification **C** with FK-D10 as written; governance decision **OPEN**.
- **Documents updated (documentation only):**
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§26A — STG0-R01; §26 R-1 pointer)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (§3B — STG0-R01 FACT/classification/PROPOSAL/OPEN)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (§3A — V31–V37)
- **BUILD:** **NOT authorized.**
- **No implementation; no code/schema/database/config changes; no migration/build; no commit/push.**
- **Next gate:** **PLAN REVIEW** / governance decision on STG0-R01.

### 2026-10-07 — STG0-R01 WhatsApp context UI investigation (this entry)

- **Task:** read-only investigation of the CRM WhatsApp UI behavior for phone-derived `reference_*`, the four Deal cases, correction/removal capability, human-confirmation boundary, and telephony parity (PLAN/INVESTIGATION ONLY).
- **Investigation performed:** `crm/frontend/src/pages/Deal.vue` (tabs), `components/Activities/{Activities,WhatsAppArea,WhatsAppBox}.vue`, `components/Activities/CallArea.vue`, `composables/whatsapp.js`; backend `crm/api/whatsapp.py`, `crm/api/activities.py`, `crm/integrations/twilio/api.py`, `crm/fcrm/doctype/crm_call_log/crm_call_log.py`.
- **Findings:** WhatsApp tab is scoped by `reference_*`; no inferred/confirmed indicator; no correction/removal in the SPA (Reply only); explicit outgoing association can be overwritten; telephony Call Log shares the same phone inference and must be in the same decision. Evidence supports a **conditional** A (+ Stage 0-side confirmation), not unconditional A; B if enforcement absent. R-A remains in force.
- **Documents updated (documentation only):**
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§26B)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (§3B UI findings)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V38–V41)
- **BUILD:** **NOT authorized.**
- **No implementation; no code/schema/database/config changes; no migration/build; no commit/push.**
- **Next gate:** **PLAN REVIEW** / governance decision on STG0-R01.

### 2026-10-07 — STG0-R01 governance decision recorded (CONDITIONAL A)

- **Task:** record and freeze the approved STG0-R01 governance decision (PLAN/DOCUMENTATION ONLY).
- **History:** STG0-R01 UI investigation (native WhatsApp/telephony phone-derived association) was completed earlier today; findings preserved.
- **Decision recorded:** **STG0-R01 = APPROVED — CONDITIONAL A.**
  - Native phone-derived WhatsApp/telephony association remains **unchanged**; no remediation (R-B/R-C/R-D/R-E not selected/authorized).
  - Association is **provisional/non-authoritative** context only; it is not authoritative Deal resolution, not human confirmation, and not valid provenance.
  - Stage 0 must require **explicit human Deal confirmation**; AI may propose a candidate Deal but not confirm/promote it.
  - Critical rule: **native communication context ≠ human-confirmed Deal relationship.**
  - BUILD remains **unauthorized**.
- **Documents updated (documentation only):**
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§26A status + new §26A.13; §26B status)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (STG0-R01 row → APPROVED — CONDITIONAL A; §3B Status)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V42–V48; note)
- **No implementation; no code/schema/database/config changes; no integration/hook change; no migration/build; no credentials; no commit/push.**
- **Next gate:** complete Stage 0 technical-design review and resolve remaining OPEN design decisions before FK-D12 BUILD authorization.

### 2026-10-07 — Formal Stage 0 technical-design review (this entry)

- **Task:** formal review of the complete Stage 0 technical design against frozen governance and repository facts (PLAN/REVIEW ONLY; documentation-only corrections).
- **Verdict:** **PASS WITH CORRECTIONS** (design coherent and repository-grounded; corrections documented below).
- **Corrections applied (documentation only):**
  - Technical Design §6 + §22: added the **explicit human Deal-confirmation step** and the Conditional A rule to the target architecture and data flow.
  - Technical Design §25: extended the verification mapping to **V01–V48** and scoped V38/V39 to the Stage 0 review surface, V40 to the authority dimension.
  - Technical Design §26A.12: marked **historical (superseded by §26A.13)**.
  - Verification Plan: added a **review scope clarification** for V38–V40 (no weakening).
- **O01–O09 review classification (not resolved):** O01 READY FOR RESOLUTION · O02 READY · O03 READY · O04 READY · O05 READY · O06 NEEDS MORE TECHNICAL INVESTIGATION (channel account configuration not verified) · O07 READY (dependency: O08) · O08 NEEDS MORE TECHNICAL INVESTIGATION (provider-specific security) · O09 READY.
- **Repository re-verification:** 11 FJK DocTypes, 20 custom fields, no AI/proposal/provenance code; native source/history structures present; Conditional A intact.
- **No implementation; no code/schema/database/config changes; no integration/hook change; no migration/build; no credentials; no commit/push.**
- **Next gate:** explicit governance resolution of O01–O09 (starting with O06 channel-config verification and O08 security), then FK-D12 BUILD authorization.

### 2026-10-07 — O06 channel scope + O08 security investigation (this entry)

- **Task:** read-only investigation of O06 (initial channel scope) and O08 (AI security/data handling); documentation-only.
- **Runtime method:** read-only queries against the live `crm-frappe-1` container (`bench … execute`); counts/booleans only; no secrets printed; no DB/config change.
- **O06 findings (`FACT`):** no inbound channel operational — WhatsApp 0 accounts / defaults null / 0 messages; email inbound **disabled** (`enable_incoming=0`), outbound enabled; telephony 0 agents / 0 call logs; `Communication`=0. Operator-manual intake available. **Classification: READY FOR GOVERNANCE RESOLUTION** (PROPOSAL: manual baseline; live inbound as later gated increment).
- **O08 findings (`FACT`):** no AI credentials exist; secrets in gitignored `site_config.json` / untracked `.env`; no adapter/egress. Provider-independent boundary defined; provider-dependent items deferred to O07. **Classification: READY FOR GOVERNANCE RESOLUTION** (provider-independent; provider-dependent via O07).
- **Cross-decision impact recorded** for O01, O03, O07, O09 (none resolved).
- **Documents updated (documentation only):**
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§17.1, §18.1)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (O06/O08 rows; §3C)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V49–V54)
- **No implementation; no code/schema/database/config changes; no external AI calls; no credentials created; no migration/build; no commit/push.**
- **Next gate:** governance resolution of O06 (and O07 for O08 provider-dependent items); then remaining OPEN decisions; then FK-D12.

### 2026-10-07 — O06 channel strategy alignment + Telegram investigation (this entry)

- **Task:** document the operator-aligned Stage 0 channel strategy and perform a read-only feasibility investigation of Telegram as an internal-only intake/control channel; verify email findings. Documentation only.
- **Governance alignment recorded:** inbound **email = CORE Stage 0 input** (not deferred; runtime inbound reception currently disabled, enablement pending operational authorization); **manual source capture = immediate baseline** (screenshots/images/PDFs/documents preserved as source, incl. WhatsApp-originated artifacts); **live WhatsApp inbound = DEFERRED**; **Telegram = INTERNAL-ONLY candidate, not customer-facing, not authorized**. STG0-R01 Conditional A unchanged.
- **Email findings (`FACT`):** existing Gmail `Email Account` "FeelJapanK CRM" is IMAP-ready (`use_imap=1`, `use_ssl=1`, `email_server=imap.gmail.com`, `auth_method=Basic`), `enable_outgoing=1`/`default_outgoing=1`, **`enable_incoming=0`**/`default_incoming=0`; `enable_scheduler=1`; Procfile runs `bench schedule` + worker. Native path `frappe…email_account.pull` → `receive()` → `Communication`; CRM hooks present. **Enablement needs no code change** (toggle inbound + valid credential, e.g. Gmail App Password with IMAP or OAuth via Google Settings).
- **Telegram findings (`FACT`):** no existing capability (no app/DocType/hook/config); BR §32 lists Telegram as explicitly deferred; env freeze leaves Telegram controls unfrozen. Feasibility/security recorded as evidence dependencies; not designed, not installed, not authorized.
- **Documents updated (documentation only):**
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§18.2, §18.3)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` (§3.2; M6)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (O06 row; §3D)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V55–V62)
- **No implementation; no code/schema/database/config changes; no credentials; no Telegram bot/package; inbound email NOT enabled; no external AI calls; no customer data sent; no migration/build; no commit/push.**
- **Next gate:** explicit governance authorization for inbound email enablement (and separately for any Telegram work); remaining OPEN decisions; then FK-D12.

### 2026-10-07 — O01 provenance-model investigation (this entry)

- **Task:** read-only investigation of O01 (provenance model); documentation only.
- **Native capability confirmed (`FACT`):** `Communication`/`Communication Link`/`WhatsApp Message`/`File` (`content_hash`)/`Comment`/`Version` (`get_diff`, `version.py:102`)/`Activity Log`/`CRM Deal` (`track_changes=1`)/`FCRM Note`/FJK child tables (`istable=1` → parent version)/timeline aggregator (`crm/api/activities.py:23`).
- **Provenance gaps confirmed (`FACT`):** no native non-authoritative AI proposal; no typed per-datum disposition; `Version` lacks proposal/AI/source reference; no per-datum source span; no layer classification; no isolation boundary; native `reference_*` non-authoritative (STG0-R01).
- **Requirements established:** four distinct layers; per-datum minimum set (source ref + `content_hash`, target datum, proposed value, interpretation-event identity, human disposition + reviewer + timestamp + original value, promotion link); datum-level (not record-level) required; edits preserve original + final; proposals append-only; human Deal-resolution provenance; common cross-channel contract.
- **Classification:** **INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION** (schema/design remains later; not approved).
- **Documents updated (documentation only):**
  - `docs/governance/FeelJapanK-Phase1-Stage0-Decision-Register-v0.1.md` (§5 O01 populated; §4 summary row)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (STG0-O01 row; §3E)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§13.3)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V63–V73)
- **No implementation; no code/schema/database changes; no CRM changes; no configuration changes; no AI provider calls; no migration/build; no commit/push.**
- **Next gate:** O01 governance resolution (requirements accepted) then O02; remaining OPEN decisions; then FK-D12.

### 2026-10-07 — O01 approved; O02 proposal-lifecycle investigation (this entry)

- **Task:** record O01 governance approval; read-only investigation of O02 (proposal lifecycle); documentation only.
- **O01:** now **APPROVED** (datum/proposal-level, evidence-linked, four layers); schema remains OPEN. Register §5, Decisions §3E updated.
- **O02 findings:** required proposal states (`PROPOSED/ACCEPTED/EDITED_ACCEPTED/REJECTED/DEFERRED`, plus explicit `SUPERSEDED`); run/processing states are a separate concept; append-only disposition events with immutable historical facts; **ACCEPTED ≠ authoritative** (explicit promotion; AI never promotes); edited proposals preserve original + edited value; rejection terminal/retained; deferral non-terminal; reprocessing = new proposal; multiple competing proposals independently reviewed; per-datum partial acceptance; conflict = pending review/no auto-overwrite; human-accepted vs customer-confirmed distinct; Deal resolution = separate human disposition; failure states belong to runs; supersession explicit; lifecycle reconstructable.
- **Native capability:** `Version`/`Comment`/`Activity Log`/`CRM Status Change Log`/Frappe `Workflow` provide history/transition patterns but cannot express the per-datum proposal lifecycle + provenance links → dedicated representation appears necessary (technical direction; no schema).
- **Classification:** **INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION** (not approved).
- **Documents updated (documentation only):**
  - `docs/governance/FeelJapanK-Phase1-Stage0-Decision-Register-v0.1.md` (§5 O01→APPROVED; §6 O02 populated; §4 rows; §17 history)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (STG0-O01→APPROVED; STG0-O02 row; §3E status; §3F)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§23.1)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` (M2)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V74–V90)
- **No implementation; no code/schema/database changes; no CRM changes; no configuration changes; no provider selection; no AI calls; no migration/build; no commit/push.**
- **Next gate:** O02 governance resolution, then O03; remaining OPEN decisions; then FK-D12.

### 2026-10-07 — O02 approved; O03 source storage/access investigation (this entry)

- **Task:** record O02 governance approval; read-only investigation of O03 (source storage/access); documentation only.
- **O02:** now **APPROVED** (5 proposal states + explicit SUPERSEDED; ACCEPTED ≠ authoritative with explicit promotion; append-only; immutable facts); schema remains OPEN. Register §6, Decisions §3F updated.
- **O03 findings (`FACT`):** native source storage reusable — `Communication` (+`Communication Link`), `File` (`content_hash`; dedup by `(content_hash, is_private)`; `create_attachment_copy` reuses `file_url`; `on_trash` deletes unless shared), `WhatsApp Message`, `FCRM Note`; `track_changes=1` on File/Communication. Source identity = doctype+name (+`content_hash` file-backed). Immutability caveat: File can be renamed/deleted/shared, Communication content editable, Version tracks metadata not binary → capture identity at processing time as immutable (O01). Location/span not native. Permission-checked access (reviewer-access gap OPEN). Sources independent of Deal/Company/Contact (`reference_*` context only, STG0-R01). Compound source hierarchy supported. Retention/deletion policy OPEN.
- **Conclusion:** native sufficient for source storage/identity/preservation/access; **no new source store required**; gaps = immutability/retention, span, reviewer access.
- **Classification:** **INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION** (not approved).
- **Documents updated (documentation only):**
  - `docs/governance/FeelJapanK-Phase1-Stage0-Decision-Register-v0.1.md` (§6 O02→APPROVED; §7 O03 populated; §4 rows; §17 history)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (STG0-O02→APPROVED; STG0-O03 row; §3F classification; §3G)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§7.1)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` (M3)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V91–V105)
- **No implementation; no code/schema/database changes; no CRM changes; no configuration changes; no credentials; no integrations; no provider calls; no migration/build; no commit/push.**
- **Next gate:** O03 governance resolution, then O04; remaining OPEN decisions; then FK-D12.

### 2026-10-07 — O04 proposed↔authoritative relationship investigation (this entry)

- **Task:** read-only investigation of O04; documentation only.
- **Repository baseline:** 11 FJK DocTypes, 20 custom fields; 14 `fjk_*` shared fields + 6 FJK child tables on `CRM Deal`; FJK app has no write API for requirement/allocation rows; child rows get framework hash `name`s (`naming.set_new_name`); `CRM Deal` `track_changes=1`; `Version` records `changed`/`row_changed`.
- **Findings:** native **sufficient** for Information-Status separation and prior-value/history reconstruction; **partial** for existing-target identification, stale detection, promotion attribution; **insufficient** for a proposal entity, typed per-datum disposition, accept-vs-promotion at datum level, reject/defer/supersede records, competing proposals, reprocessing history, proposal→authoritative link, human Deal-resolution record, idempotent/partial-safe promotion, and not-yet-created target identity.
- **Semantics + 15 invariants** recorded (explicit/attributable/non-destructive/bidirectional/idempotent promotion; accept ≠ promotion; Deal resolution separate; confirmation/Information Status separate; correction additive). Schema OPEN.
- **Classification:** **INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION** (not approved).
- **Documents updated (documentation only):**
  - `docs/governance/FeelJapanK-Phase1-Stage0-Decision-Register-v0.1.md` (§8 O04 populated; §4 row; §17 history)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (STG0-O04 row; §3H)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§14.1)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` (M4)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V106–V120)
- **No application implementation; no code/schema/DocType/database/config changes; no CRM record changes; no provider/integration changes; no credentials; no migration/build; no commit/push.**
- **Next gate:** O04 governance resolution, then O05; remaining OPEN decisions; then FK-D12. **BUILD remains UNAUTHORIZED.**

### 2026-10-07 — O04 approved; O05 human approval investigation (this entry)

- **Task:** record O04 governance approval; read-only investigation of O05 (human approval mechanism); documentation only.
- **O04:** now **APPROVED** (semantics + 15 invariants); schema/promotion implementation remains OPEN. Register §8, Decisions §3H updated.
- **O05 findings (`FACT`):** actor/authority = roles (`System Manager`/`Sales Manager`/`Sales User`/`CRM Manager`) + `CRM Deal` org-hierarchy `has_permission` + FJK mirror (`feeljapank_crm/permissions.py`, `_require_deal_access`); attributable human-action patterns `set_info_complete` and quotation `confirm_version` (append-only, `confirmed_on`/`source`/`evidence`); actor+timestamp via `Version`/`Comment`; no `Workflow` configured.
- **Semantics:** datum-level, attributable dispositions; `ACCEPT`/`EDITED_ACCEPTED`/`REJECTED`/`DEFERRED`/`SUPERSEDED`; accept ≠ promotion (separate events); partial approval allowed; Deal resolution separate (`reference_*` never approval); acceptance ≠ customer confirmation ≠ `Info Complete` ≠ Ready for Quotation; stale accepted proposals must not silently overwrite.
- **Native:** sufficient for authorized-operator identification and document-level actor+timestamp; **insufficient** for a datum-level proposal/disposition entity, accept-vs-promotion at datum level, partial-approval rollup, reject/defer/supersede records, competing/stale/conflict handling, human Deal-resolution record, and idempotent/partial-safe promotion. Native `Workflow` is single-document only.
- **Classification:** **INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION** (not approved).
- **Documents updated (documentation only):**
  - `docs/governance/FeelJapanK-Phase1-Stage0-Decision-Register-v0.1.md` (§8 O04→APPROVED; §9 O05 populated; §4 rows; §17 history)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (STG0-O04→APPROVED; STG0-O05 row; §3H status; §3I)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§12.1)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` (M5)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V121–V140)
- **No application implementation; no code/schema/DocType/database/config changes; no CRM record changes; no provider/integration changes; no credentials; no migration/build; no commit/push.**
- **Next gate:** O05 governance resolution, then O06; remaining OPEN decisions; then FK-D12. **BUILD remains UNAUTHORIZED.**

---

### 2026-10-07 — O07 AI provider investigation; conditional approval (this entry)

- **Task:** read-only investigation of O07 (AI provider) per the O07 investigation brief; documentation only (existing Stage 0 docs). No provider contacted; no customer data transmitted; no credentials.
- **FACT baseline:** no AI provider, credential, key, egress, code, or dependency exists anywhere in repo/runtime; `feeljapank_crm` has no scheduler/queue/outbound HTTP.
- **Vendor evidence (`FACT`, 2026-10-07, time-sensitive):** OpenAI, Anthropic, and Google document schema-constrained structured output; OpenAI and Anthropic document API data not used for training by default, with retention / zero-retention controls (OpenAI 30-day abuse logs + ZDR / Modified Abuse Monitoring on approval; Anthropic ZDR-eligible excluding covered models).
- **Requirement set (`PROPOSAL`, R1–R9):** typed extraction (destination, dates, pax, transport, accommodation, meals, activities, special requirements, ambiguity, missing info); schema-constrained JSON validated app-side; explicit-vs-inferred + uncertainty; Japanese/English/mixed; error taxonomy → O02 run states; timeout/retry/backoff with no authoritative write on failure; provider/model/version/response metadata; provider-agnostic adapter, no vendor SDK in core, no silent fallback; HTTPS + key/token auth + redaction/minimisation hooks.
- **Category conclusion (`PROPOSAL`):** external hosted LLM API = preferred category (conditional); self-hosted/local = viable alternative (requires FK-D12 review); hybrid routing = optional, multiplies O08 evaluations.
- **Boundary:** O07 = technical/operational suitability; O08 = security/data-handling conditions. O07 produces inputs to O08; grants no security approval. **INFERENCE:** Japanese/mixed-language extraction quality untested (OPEN).
- **Classification / decision:** **CONDITIONALLY APPROVED (category-level, 2026-10-07, STG0-D16)** — no vendor selected/authorized; customer-data processing conditional on O08.
- **Documents updated (documentation only):**
  - `docs/governance/FeelJapanK-Phase1-Stage0-Decision-Register-v0.1.md` (§4 row; §11 O07; §14; §17 history)
  - `docs/governance/FeelJapanK-Phase1-Stage0-AI-Provenance-Decisions-v0.1.md` (STG0-O07; new STG0-D16; §3J)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Technical-Design-v0.1.md` (§19.1)
  - `docs/architecture/FeelJapanK-Phase1-Stage0-AI-Provenance-Implementation-Plan-v0.1.md` (M7)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-AI-Provenance-Verification-Plan-v0.1.md` (V141–V142)
  - `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-Implementation-Log-v0.1.md` (this entry)
- **No application implementation; no code/schema/DocType/database/config changes; no CRM record changes; no provider/integration changes; no credentials; no migration/build; no commit/push.**
- **Next gate:** O08 governance resolution (security/data handling), then remaining OPEN decisions; then FK-D12. **BUILD remains UNAUTHORIZED.**

---

### 2026-10-07 — O08 AI security / data-handling investigation (this entry)

- **Task:** read-only O08 investigation (security/data-handling conditions for external AI processing); documentation only. No provider contacted; no external API calls; no customer data transmitted; no credentials.
- **FACT baseline:** no AI credential/key/egress/code/SDK; `feeljapank_crm` has no HTTP/logging/AI references. Secrets (`db_password`, `encryption_key`, `whatsapp_app_secret`) in gitignored `site_config.json`; `.env` untracked. Config note: `server_script_enabled=1`, `developer_mode=1` (hardening review item; unchanged). WhatsApp HMAC guard present; FJK permissions mirror the linked Deal.
- **MUST:** HTTPS only; credentials server-side only; AI input payloads never contain app secrets; minimum-necessary egress built inside the FJK boundary; pre-egress redaction/validation; no authoritative AI write; provenance-by-reference; failure isolation; timeout/retry/backoff; structured-output validation; log redaction. Provider policy: no training on customer data, defined retention/deletion, subprocessor transparency, processing location known. AI output untrusted (schema-validated; never directly executes CRM actions).
- **SHOULD:** zero-retention where available; pseudonymisation where interpretation permits; disable `server_script_enabled`/`developer_mode` outside local dev.
- **OPEN:** processing jurisdiction/residency (requires business/legal/security determination); retention period; masking policy; deletion SLA; provider-specific (vendor) evidence; Telegram review.
- **NOT REQUIRED:** full prompt/response retention in ordinary logs (per O01); provider/model selection (separate).
- **Human-approval boundary:** O05 preserved absolutely; external processing weakens no AI boundary.
- **Classification / recommendation:** **INVESTIGATION COMPLETE — READY FOR GOVERNANCE RESOLUTION; recommended APPROVE O08 CONDITIONALLY.** O08 remains OPEN until governance resolution; no security authorization.
- **Documents updated (documentation only):** Register §4/§12/§14/§17; Decisions STG0-O08/§3C/§3K; Technical Design §17.2; Implementation Plan M8; Verification Plan V143–V150; Implementation Log (this entry).
- **No application implementation; no code/schema/DocType/database/config changes; no CRM record changes; no provider/integration changes; no credentials; no migration/build; no commit/push.**
- **Next gate:** explicit O08 governance resolution; then remaining OPEN decisions; then FK-D12. **BUILD remains UNAUTHORIZED.**

---

### 2026-10-07 — DeepSeek-Flash provider verification + synthetic bake-off design (this entry)

- **Task:** controlled verification of the intended Stage 0 provider candidate DeepSeek-Flash against O07/O08 requirements; documentation only. No provider API call; no credential; no customer data; no implementation.
- **Identity (`FACT`, 2026-10-07):** "DeepSeek-Flash" = API model id `deepseek-flash` (product DeepSeek-V4.1-Flash; released 2026-09-10); base URL `https://api.deepseek.com` (OpenAI format) / `/anthropic`; 1M context, 384K max output; native vision.
- **Capability (`FACT`):** OpenAI-compatible; JSON output (`response_format={"type":"json_object"}`, valid-JSON only) + tool calls + Responses/Anthropic APIs; **no strict `json_schema`** ⇒ app-side schema validation mandatory; response has `id`, `model`, `created`, `system_fingerprint`, `finish_reason`, `usage` (prompt/completion/cache hit+miss tokens), `reasoning_content`; error codes 400/401/402/422/429/500/503; `user_id` KVCache/content-safety isolation; concurrency 2500; context caching.
- **O08 provider-policy gate (`CONDITIONAL`):** PASS — HTTPS, server-side API-key auth, model/response identity. OPEN/BLOCKER — API-input training/improvement use, retention, deletion, subprocessors, secondary use, logging (not clearly established by first-party evidence); jurisdiction likely mainland PRC (controller/governing law), residency OPEN.
- **Synthetic bake-off:** designed (Tests A–H + Deal-resolution + info-status scenarios; all synthetic, no customer data) but **NOT EXECUTED** — no authorized DeepSeek credential available. All behavioral tests = **NOT TESTABLE**.
- **Classification:** **D — INCONCLUSIVE.** **Recommendation:** **Option 2 — keep DeepSeek-Flash under evaluation**; no customer-data authorization.
- **Documents updated (documentation only):** Register §4/§11/§12/§17; Decisions STG0-O07/STG0-P11; Technical Design §19.1; Implementation Plan M7; Verification Plan V151–V155; new evidence `docs/evidence/phase1/FeelJapanK-Phase1-Stage0-DeepSeek-Flash-Provider-Verification-v0.1.md`; Implementation Log (this entry).
- **No application implementation; no code/schema/DocType/database/config changes; no CRM record changes; no provider/integration changes; no credentials; no migration/build; no commit/push.**
- **Next gate:** resolve DeepSeek provider-policy blockers (DPA/evidence) + jurisdiction determination, then execute the synthetic bake-off with an authorized credential (no customer data); then O08 resolution; then FK-D12. **BUILD remains UNAUTHORIZED.**

---

### 2026-10-07 — DeepSeek-Flash synthetic bake-off executed (B — CONDITIONAL PASS) (this entry)

- **Task:** execute the synthetic-only bake-off against DeepSeek `deepseek-flash` using an operator-supplied test key (kept out of the repo; deleted after the run); documentation only. No customer data; no adapter; no Frappe integration.
- **Run (`FACT`):** `POST https://api.deepseek.com/chat/completions`, `model=deepseek-flash`, `response_format={"type":"json_object"}`, `temperature=0`; HTTP 200; `system_fingerprint=aeb56401ca74e127821c4f9126dcb669`. 10 synthetic scenarios (A–H + Deal-resolution + info-status).
- **Results:** 9/9 executed behavioral tests **PASS** (JP; mixed JP/EN; missing-info; ambiguity; explicit-vs-inferred; prompt-injection ignored with no CRM action/secret leak; long/compound with in-message correction; Deal-resolution `selected=null`/`human_required`; info-status `not_assessed`). Malformed-output boundary **PARTIAL** — `json_object` yields valid JSON only on completion; `finish_reason=length` produces unusable JSON ⇒ must check `finish_reason` + app-side schema validation.
- **Operational (`FACT`):** thinking mode default with large `reasoning_tokens` (max 5202) — size `max_tokens`/disable thinking; prompt caching effective (cache-hit 384–512 tokens); per-run metadata (`model`/`system_fingerprint`/`id`/`created`/`usage`) available.
- **Classification:** revised **D (INCONCLUSIVE) → B — CONDITIONAL PASS**. Provider-policy gate still CONDITIONAL (API-input training/retention/deletion/subprocessors OPEN).
- **Recommendation:** **Option 1 — select DeepSeek-Flash conditionally**; **no customer-data authorization** until provider-policy blockers + jurisdiction are resolved.
- **Documents updated (documentation only):** Register §4/§11/§17; Decisions STG0-O07/STG0-P11; Technical Design §19.1; Implementation Plan M7; evidence doc §6/§7 (results + classification); Implementation Log (this entry).
- **No application/config/provider/CRM changes; no credential stored; no commit/push.**
- **Next gate:** provider-policy evidence (DPA) + jurisdiction determination; then O08 resolution; then FK-D12. **BUILD remains UNAUTHORIZED.**

---

### 2026-10-07 — O08-P DeepSeek provider data-handling resolution (B — CONDITIONAL CLOSE) (this entry)

- **Task:** resolve O08 provider-policy questions for DeepSeek `deepseek-flash` from first-party public evidence; documentation only. No provider contact; no customer data; no credentials.
- **Sources:** DeepSeek Open Platform ToS, Terms of Use, Privacy Policy, Context Caching guide, Files API guide, Rate Limit, Chat Completions (all first-party, accessed 2026-10-07).
- **Findings:** ToU §4.3 grants a limited, de-identified, opt-out right to use Inputs/Outputs to develop/improve services; context caching persists input prefixes to disk by default; no API retention period, deletion mechanism/SLA, subprocessor list, or logging policy disclosed; governing law = mainland PRC (Open Platform ToS §10.1). P1 training/improvement, P2 retention, P3 deletion, P4 subprocessors, P5 secondary use, P6 logging = **OPEN**; P7 jurisdiction = **PARTIALLY ESTABLISHED** + internal business decision. **PASS:** HTTPS, server-side API-key auth, model/response identity.
- **Classification:** provider gate **B — CONDITIONAL CLOSE** — subject to written provider confirmation (P1–P6) and a jurisdiction/residency decision (P7). **Real customer-data processing NOT AUTHORIZED.**
- **Provider evidence request:** drafted (evidence doc §11.6); **not sent**.
- **Documents updated (documentation only):** evidence doc §11; Register §4/§12/§17; Decisions STG0-O08/§3K.1 + new STG0-P12; Technical Design §17.2; Implementation Plan M8; Verification Plan V156–V158; Implementation Log (this entry).
- **No application/config/provider/CRM changes; no customer data; no commit/push.**
- **Next gate:** written provider confirmation (P1–P6) + jurisdiction decision; then explicit O08 resolution; then FK-D12. **BUILD remains UNAUTHORIZED.**

---

### 2026-10-07 — O08 governance resolution: ACCEPTED WITH DEFERRED PROVIDER ASSURANCE (risk acceptance) (this entry)

- **Task:** record the human governance decision accepting the documented DeepSeek-Flash arrangement for the Phase 1 pilot; documentation only. No implementation; no provider contact; no customer data.
- **Decision (`STG0-D17`):** *FeelJapanK accepts the documented DeepSeek-Flash data-handling arrangement for the Phase 1 pilot and defers further provider-policy clarification until operational need, compliance review, increased data exposure, or another governance trigger requires it.*
- **Nature:** intentional **risk acceptance** — NOT a claim that P1–P7 are closed. Residual items recorded as **Known/Accepted Residual Risk — Deferred Assurance**: P1 training/improvement; P2 retention; P3 deletion; P4 subprocessors; P5 secondary use; P6 logging; P7 detailed processing/storage residency.
- **Jurisdiction:** mainland-PRC provider/governing-law positioning accepted for the pilot; no Malaysian legal-compliance, cross-border, or residency conclusion asserted.
- **O07 status:** CONDITIONALLY APPROVED / **SELECTED** (`deepseek-flash`). **O08 status:** ACCEPTED WITH DEFERRED PROVIDER ASSURANCE. **Overall Stage 0 provider gate:** provider selected for implementation, residual provider-policy risk accepted.
- **Unchanged:** provider-independent O08 controls; FK-D18 AI authority (INTERPRET → EXTRACT → PROPOSE); O05 human approval; minimum-necessary egress (mandatory).
- **Carried to FK-D12:** finish_reason check + app-side schema validation + never-promote-unvalidated + never write model output directly to authoritative CRM; size tokens / control thinking mode (not hardcoded 8000); preserve O01/O02/O04/O05 provenance; Deal resolution `selected=null`; Info-Status boundary.
- **Reopen triggers:** Register §12.2 (11 triggers). No automated monitoring created.
- **Documents updated (documentation only):** Register §4/§11/§12.2/§17; Decisions STG0-O07/STG0-O08/STG0-D17/§3K.2; Technical Design §17.2; Implementation Plan M7/M8; Verification Plan (V156–V158 deferral note); Implementation Log (this entry).
- **No application/config/credential/provider/CRM changes; no customer data; no commit/push.**
- **Next stage:** **FK-D12 — AI Provider / Adapter Implementation PLAN** (PLAN → REVIEW → APPROVAL → BUILD → VERIFY). **BUILD remains UNAUTHORIZED.**

---

### 2026-10-07 — FK-D12 AI Provider/Adapter Implementation PLAN produced (this entry)

- **Task:** produce the FK-D12 implementation PLAN (PLAN ONLY); documentation only. No code; no DeepSeek call/config; no credentials; no CRM writes; no DocTypes created.
- **Repository mapping (FACT):** FJK app `feeljapank_crm` (api.py, d1.py, permissions.py, hooks.py); 11 doctypes — requirement/allocation child tables attach to CRM Deal via custom fields (`fjk_components`, `fjk_requirement_lines`, `fjk_guide_requirements`, `fjk_activity_items`, `fjk_transport_allocations`, `fjk_accommodation_allocations`); per-line `status` Select (KNOWN/MISSING/TO CONFIRM/CUSTOMER-CONFIRMED/NOT APPLICABLE) + `demand_status`; FJK Quotation read model; permissions mirror Deal; **no existing AI/proposal/provenance structures**.
- **Plan produced:** adapter boundary (`feeljapank_crm/ai/`, provider-agnostic interface, `DeepSeekProvider`); request/output contracts; validation pipeline; `finish_reason`/thinking/error-retry; idempotency/reprocessing; provenance; logging/redaction; credential strategy; security controls; human-review/promotion/Deal/Information-Status boundaries; native-first assessment; minimum new structures (PROPOSED: `FJK AI Interpretation Run`, `FJK AI Proposal`); phased BUILD (D12-A…F); verification; acceptance; unresolved decisions; risks.
- **Smallest first slice:** synthetic source → DeepSeek → validated **non-authoritative** run/proposal; no CRM promotion.
- **Governance:** preserves O01/O02/O04/O05, FK-D18 AI authority, O03 source identity, O07 selected model `deepseek-flash`, O08 accepted residual risk + minimum-necessary egress.
- **Documents updated (documentation only):** Implementation Plan §FK-D12; Technical Design §19.2; Verification Plan V159–V163; Implementation Log (this entry).
- **No application/config/credential/provider/CRM changes; no customer data; no commit/push.**
- **Next gate:** human review of the FK-D12 PLAN; then a separate FK-D12 BUILD authorization per phase. **BUILD remains UNAUTHORIZED.**

---

### 2026-10-07 — FK-D12-A Provider/Adapter Interface Skeleton PLAN produced (this entry)

- **Task:** produce the D12-A implementation sub-plan (PLAN ONLY); documentation only. No code; no DeepSeek call/config; no credentials; no DocTypes; no CRM writes.
- **Repository evidence (`FACT`):** package root `bench/apps/feeljapank_crm/feeljapank_crm/` (api.py, d1.py, permissions.py, hooks.py, setup.py, tests.py); module dir `.../feeljapank_crm/feeljapank_crm/` (doctype/page/workspace); `pyproject.toml` `dependencies = []`, `requires-python >=3.10`, ruff line-length 110; `tests.py` custom `_check()`/`run_smoke_tests()` harness (bench execute, rollback); `setup.py` authoritative flags `fjk_ready_for_quotation`/`fjk_info_complete`.
- **Recommendation:** new subpackage `feeljapank_crm.ai` (sibling of api.py), kept frappe-free; `AIProvider.interpret(AIRequest)->AIResult` (sync); normalized `AIRequest`/`AIResult`/`ProviderMeta`/`Usage`/`CompletionStatus`; normalized error taxonomy; `DeepSeekProvider` skeleton (constants only, `interpret()` raises NotImplementedError, no HTTP/SDK); `FakeProvider` for deterministic tests; `AIService` registry facade. No new dependency; no DocTypes/fields; interface has no CRM authority.
- **Files proposed (not created):** `ai/{__init__,interface,types,errors,service,tests}.py`, `ai/providers/{__init__,deepseek,fake}.py`.
- **Governance:** preserves FK-D18 authority and O01/O02/O04/O05 boundaries; no schema (D12-D/E); config/credentials deferred to D12-B; egress/validation/persistence deferred.
- **Documents updated (documentation only):** Implementation Plan §FK-D12-A; Implementation Log (this entry).
- **No application/config/credential/provider/CRM changes; no customer data; no commit/push.**
- **Next gate:** human review of the D12-A PLAN; then explicit D12-A BUILD authorization. **BUILD remains UNAUTHORIZED.**

---

### 2026-10-07 — FK-D12-A Provider/Adapter Interface Skeleton BUILT (this entry)

- **Authorization:** D12-A only, limited to `bench/apps/feeljapank_crm/feeljapank_crm/ai/**`.
- **Files created (9, all new):** `ai/__init__.py`, `ai/interface.py`, `ai/types.py`, `ai/errors.py`, `ai/service.py`, `ai/tests.py`, `ai/providers/__init__.py`, `ai/providers/deepseek.py`, `ai/providers/fake.py`. No existing files modified; no hooks/api/d1/permissions/setup/pyproject/fixtures/DocType changes.
- **Implementation (`FACT`):** `AIProvider` ABC (`interpret(AIRequest)->AIResult`, sync); normalized `AIRequest`/`AIResult`/`ProviderMeta`/`Usage`/`CompletionStatus`; 9-category normalized error taxonomy (`AIProviderError` base); `DeepSeekProvider` skeleton (constants `MODEL_ID=deepseek-flash`, `ENDPOINT=https://api.deepseek.com/chat/completions`; `_serialize`/`_parse`; `interpret()` raises `NotImplementedError` — **no HTTP/network/SDK**); `FakeProvider` modes success/empty/malformed/error/incomplete; `AIService` facade + provider registry. `ai/` is **frappe-free** and stdlib-only.
- **Verification (all PASS):** `python3 -m feeljapank_crm.ai.tests` → **33 passed, 0 failed**. FakeProvider success/empty/error/malformed/incomplete paths normalized; interface contract across fake + DeepSeek skeleton; DeepSeek has no HTTP/network impl; no `frappe` import in `ai/`; no credential/config/token-auth fields; no CRM/DB access. Host `ruff` unavailable (pyproject ruff config applies in bench env).
- **Runtime/Git safety:** `git status --porcelain bench/` shows only the new `?? .../ai/` dir (no modification to existing files); no configuration; no credentials; no customer data; no network; no commit/push.
- **Governance:** interface has no CRM authority (frappe-free → structurally impossible); preserves FK-D18 and O01/O02/O04/O05 boundaries; no schema/persistence (deferred to D12-D/E); transport/credentials/egress deferred to D12-B.
- **STOP:** do not proceed to D12-B without explicit authorization.

---

### 2026-10-07 — FK-D12-B Transport + Credentials + Minimum-Necessary Egress PLAN produced (this entry)

- **Task:** produce the D12-B sub-plan (PLAN ONLY); documentation only. No live call; no key; no config change; no dependency install; no egress build; no CRM changes.
- **Repository/environment evidence (`FACT`):** `requests` present in bench env (`bench/env/lib/python3.14/site-packages/requests`; host 2.33.1) but app `pyproject.toml` `dependencies = []` ⇒ transitive only; Frappe `frappe.utils.get_request_session(max_retries=5)` (no timeout; follows redirects; retries only 500) and `frappe.integrations.utils.make_request` (no timeout; `raise_for_status`; broad `frappe.log_error`); no `frappe.conf`/HTTP usage in FJK today; `site_config.json` (gitignored) already holds secrets (`db_password`, `encryption_key`, `whatsapp_app_secret`); no proxy env; bench on default Docker networking (images digest-pinned).
- **Recommendation:** stdlib `urllib.request` + `ssl.create_default_context()` + explicit bounded timeouts + custom opener refusing redirects (zero new dependency; `ai/` stays frappe-free); **avoid** `make_request`. Host allowlist = https / api.deepseek.com / 443 / `/chat/completions` from constants only. Credentials via `frappe.conf["deepseek_api_key"]` read in a frappe-aware wiring module **outside** `ai/`, injected into the provider; fail closed when missing. Egress defense in depth: (1) frappe-aware source selection, (2) frappe-free `EgressFilter`, (3) transport serializes only the validated `AIRequest`. Initial task = interpret one Communication (subject+body). Errors mapped per table; timeouts/size caps OPEN but bounded; redirects rejected; metadata-only logging; no `@frappe.whitelist`.
- **Proposed files (not created):** `ai/transport.py`, `ai/egress.py`, `ai/config.py` (new); `ai/providers/deepseek.py`, `ai/service.py`, `ai/tests.py` (modify); `feeljapank_crm/ai_wiring.py` (new, outside `ai/`). No new dependency; no DocType/DB/config/CRM change.
- **Documents updated (documentation only):** Implementation Plan §FK-D12-B; Implementation Log (this entry).
- **Runtime/Git safety:** `git status --porcelain bench/` shows only the D12-A `?? .../ai/` dir (unchanged); no config/credentials/customer data/network; no commit/push.
- **STOP:** do not implement D12-B without explicit authorization.

---

### 2026-10-07 — FK-D12-B Transport + Credentials + Minimum-Necessary Egress BUILT (this entry)

- **Authorization:** D12-B only, files: `ai/transport.py`, `ai/egress.py`, `ai/config.py`, `ai_wiring.py` (new); `ai/providers/deepseek.py`, `ai/service.py`, `ai/tests.py` (modified). Clarifications frozen: (1) transport does **not** honour proxy env vars (explicit `ProxyHandler({})`; `use_proxy_env=False` default); (2) D12-B owns transport errors + bounded retry mechanism.
- **Implementation (`FACT`):** `ProviderConfig` (bounded timeouts, size caps, host allowlist, TLS on, redirects off, proxy env off, retry bounds) + `SecretProvider` protocol; `EgressFilter` (source size cap, allowed-context-key allowlist, secret-pattern rejection → `EgressRejectedError`); `Transport` protocol + `TransportResponse` + `HTTPTransport` (stdlib `urllib` + `ssl.create_default_context`, fixed-host `_assert_approved_url`, `_NoRedirectHandler`, `_check_size`, HTTP→normalized error mapping) + `RetryingTransport` (bounded, injectable sleep); `DeepSeekProvider` now takes injected `config`/`transport`/`api_key`, serializes with delimiting of untrusted source, maps response metadata (model/`system_fingerprint`/ids/usage/`finish_reason`), fails closed without a key, redacts key in `repr`; `AIService` applies optional `EgressFilter`; `ai_wiring.py` (frappe-aware, outside `ai/`) reads `frappe.conf["deepseek_api_key"]` and builds the service. No new dependency (stdlib; `requests` not used). No DocTypes/DB/CRM/config/credentials.
- **Test change:** D12-A static test `no_http_import_in_ai` superseded by `network_imports_confined_to_transport` (+ `deepseek_has_no_direct_http`) to reflect the authorized D12-B transport; `no_frappe_import_in_ai` retained. D12-A behavioral tests unchanged.
- **Verification (all PASS):** `python3 -m feeljapank_crm.ai.tests` → **73 passed, 0 failed** (33 D12-A + 40 D12-B), fully offline via `FakeTransport`. Verified: HTTPS/fixed-host enforcement; redirect rejection; TLS mandatory; proxy env not honoured (incl. with env set); bounded timeouts; oversized response/source rejected; secret-like content rejected; missing credential fails closed with no egress; key absent from provider/result/error repr; malformed/non-object JSON rejected; bounded retry (success within bound; bounded then raises; auth not retried); no frappe import in `ai/`; no network libs beyond `transport.py`; no CRM/DB writes; no credential configured.
- **Runtime/Git safety:** `git status --porcelain bench/` shows only `?? .../ai/` and `?? .../ai_wiring.py` (no changes to hooks/api/d1/permissions/setup/pyproject/fixtures); `site_config.json` has no `deepseek_api_key`; no environment secret; no commit/push.
- **STOP:** do not proceed to D12-C without explicit authorization.

---

### 2026-10-07 — FK-D12-C Response/JSON/Schema/Semantic Validation PLAN produced (this entry)

- **Task:** produce the D12-C sub-plan (PLAN ONLY); documentation only. No code; no live call; no credentials; no DocTypes/DB/CRM changes.
- **Implementation inspected (`FACT`):** D12-A/B contract (`AIRequest`/`AIResult`/`ProviderMeta`/`Usage`/`CompletionStatus`; error taxonomy; `TransportResponse.json()`; `DeepSeekProvider` returns metadata with `proposals=[]` and discards raw payload; `AIService` applies `EgressFilter`).
- **Plan:** pipeline = finish_reason gate → JSON parse → top-level shape → schema → semantic → security/policy → normalization → non-authoritative candidates. JSON contract = object with `proposals` array (+ optional `deal_resolution`/`missing_information`/`ambiguities`); unknown keys stripped; `json_object` not trusted as schema. Schema: required (`domain`/`logical_key`/`proposed_value`/`provenance_status`), optional (`proposed_value_type`/`status_hint`/`confidence`/`uncertainty`/`evidence_span`/`target_hint`), forbidden/neutralized authority fields (Deal/Company/Contact selection, CUSTOMER-CONFIRMED, Info Complete, Ready for Quotation, tool calls, CRM mutation, credentials). Domains/enums from FJK doctypes; `status_hint` ∈ {KNOWN, MISSING, TO CONFIRM}; CUSTOMER-CONFIRMED forbidden. Deal resolution = candidates + ambiguity only (no `selected`). Errors reuse `IncompleteResponseError`/`MalformedResponseError`/`ValidationError` (+ proposed additive `PolicyViolationError`). Retry ownership unchanged (D12-B transport; D12-C no retry). Offline test matrix defined. Proposed files: `ai/schema.py`, `ai/validation.py` (new); additive `ai/types.py` (`raw_payload`), `ai/errors.py` (`PolicyViolationError`); modify `ai/providers/deepseek.py`, `ai/service.py`, `ai/tests.py`. No new dependency (hand-rolled validation).
- **Documents updated (documentation only):** Implementation Plan §FK-D12-C; Verification Plan V164–V170; Implementation Log (this entry).
- **Runtime/Git safety:** no code/config/credential/CRM changes; `git status --porcelain bench/` unchanged (only the frozen D12-A/B additions); no commit/push.
- **STOP:** D12-C BUILD NOT AUTHORIZED; do not proceed to D12-D.

---

### 2026-10-07 — FK-D12-C raw provider-payload handoff resolved (this entry)

- **Task:** resolve the raw untrusted provider-payload handoff between D12-B and D12-C; documentation only. No code; no BUILD.
- **Decision (RESOLVED, D12.C.21):** carrier = additive `AIResult.raw_payload: dict | None` (`field(default=None, repr=False)`), provider-neutral. Writer = `DeepSeekProvider` (parsed JSON object only; non-object → `MalformedResponseError`, nothing set). Reader = `ProposalValidator.validate(...)`. `AIService` clears `raw_payload` to `None` before returning, in every path.
- **Lifecycle:** synchronous in-process handoff; `finish_reason` gate before consumption; fail-closed — no validator ⇒ `proposals=[]` and `raw_payload` cleared; validation errors must not embed raw content; result discarded on error.
- **Trust classification:** `raw_payload` = UNTRUSTED / transient / non-authoritative, never persisted/logged/repr'd; validated proposals = non-authoritative; authoritative CRM only via human promotion.
- **Non-persistence / non-authoritative boundary:** `raw_payload` must never be written to DocType/DB/cache/file/log/API; retention not required/authorized (provenance uses `response_id`/`model_fingerprint`); validator does no I/O.
- **No other D12-C decision changed.** D12.C.17 OPEN item retired; D12.C.16 types.py row updated to `repr=False`.
- **Documents updated (documentation only):** Implementation Plan §FK-D12-C (D12.C.16 note, D12.C.17, new D12.C.21); Implementation Log (this entry).
- **Runtime/Git safety:** no code/config/credential/CRM changes; `git status --porcelain bench/` unchanged; tests unchanged (73/73); no commit/push.
- **STOP:** D12-C BUILD NOT AUTHORIZED; do not proceed to D12-D.

---

### 2026-10-07 — FK-D12-C Response/JSON/Schema/Semantic Validation BUILT (this entry)

- **Authorization:** D12-C only, files: `ai/schema.py`, `ai/validation.py` (new); `ai/types.py` (additive `raw_payload` `repr=False`), `ai/errors.py` (additive `PolicyViolationError`), `ai/providers/deepseek.py`, `ai/service.py`, `ai/tests.py` (modified).
- **Implementation (`FACT`):** `ai/schema.py` = FJK domains + enums (`provenance_status`, `status_hint`), required/optional/forbidden key sets, size caps, secret/hostile patterns, pure helpers. `ai/validation.py` = `ProposalValidator.validate(raw_payload, request, provider_meta, finish_reason)`: finish_reason gate (must be `stop`) → JSON-object check → envelope `proposals` list → deal-resolution candidates-only (no selection) → per-candidate schema/semantic/security checks → deterministic normalization (allowed keys only, stripped). Authority/secret/hostile → `PolicyViolationError`; schema/enum/type → `ValidationError`; parse/shape → `MalformedResponseError`; incomplete → `IncompleteResponseError`. `AIResult.raw_payload` (`repr=False`) is the sole transient carrier; `DeepSeekProvider._extract_payload` returns the parsed `choices[0].message.content` object; `AIService` runs the validator and clears `raw_payload` in a `finally` on every path (fail-closed when no validator/raw). No new dependency.
- **Verification (all PASS):** `python3 -m feeljapank_crm.ai.tests` → **116 passed, 0 failed** (33 D12-A + 40 D12-B + 43 D12-C), fully offline. finish_reason gate; malformed/non-object/missing-content rejected; raw cleared on every return path; repr suppresses raw; unknown fields stripped while authority/secret/hostile rejected; Deal resolution cannot select; CUSTOMER-CONFIRMED/Info Complete/Ready/approval/promotion/CRM-mutation cannot pass; validator/schema frappe- and network-free; no credentials/config; no CRM/DB writes.
- **Integration nuance resolved (`FACT`):** DeepSeek carries the structured proposal as `choices[0].message.content` (a JSON string); `raw_payload` is the inner parsed object, not the outer OpenAI envelope.
- **Runtime/Git safety:** `git status --porcelain bench/` shows only authorized `?? .../ai/` and `?? .../ai_wiring.py`; no config/credentials/customer data; no commit/push. `ai_wiring.py` was **not** modified (validation is defaulted inside `AIService`).
- **STOP:** do not proceed to D12-D without explicit authorization.

---

### 2026-10-07 — FK-D12-D Persistence/Provenance Run & Proposal PLAN produced (this entry)

- **Task:** produce the D12-D sub-plan (PLAN ONLY); documentation only. No DocTypes; no schema/DB; no credentials; no CRM changes; no live call.
- **Repository evidence (`FACT`):** FJK app has 11 DocTypes (requirements/allocations are child tables on CRM Deal; FJK Quotation* standalone); **no** "Request Summary" DocType; no AI/run/proposal structures; native `File.content_hash` and `Communication` source fields exist; native `Version`/`Comment`/`Activity Log` exist; FJK permissions mirror the linked Deal.
- **Native-first comparison:** Options A (native-only) and B (reuse FJK tables) fail O01/O02/O04 (no structured AI layer; conflates proposed vs authoritative; child rows are rewritten). **Option C selected:** dedicated `FJK AI Interpretation Run` + `FJK AI Proposal` (separate doctype, not a child, for independent lifecycle/immutability) + `FJK AI Deal Candidate` child table (no `selected`).
- **Design:** Run = immutable metadata (source ref/hash, instruction/contract refs, provider/model/fingerprint, request/response ids, timestamps, `status ∈ SUCCEEDED/FAILED/INCOMPLETE/MALFORMED/VALIDATION_FAILED/POLICY_REJECTED`, `error_category`, usage, elapsed, `run_key`, `proposal_count`); Proposal = immutable validated candidate fields + `lifecycle_state` default `PROPOSED`; reserved D12-E fields listed but not created. Source referenced (no duplicate store). Permissions mirror the **source** record (not Deal) since sources may be unlinked (STG0-R01). Retention **OPEN**. Raw-payload never persisted (explicit invariant). Idempotency `run_key` invariant (mechanism D12-F). Failure/partial persistence must be auditable and never recorded `SUCCEEDED`.
- **Documents updated (documentation only):** Implementation Plan §FK-D12-D; Verification Plan V171–V178; Implementation Log (this entry). Decision Register unchanged (no governance decision produced).
- **Runtime/Git safety:** documentation-only; `git status --short` shows only pre-existing untracked docs; no code/schema/DB/config/credential/CRM changes; no commit/push.
- **STOP:** FK-D12-D PLAN READY FOR REVIEW; BUILD NOT AUTHORIZED; do not start D12-E.

---

### 2026-10-07 — FK-D12-D PLAN corrections (this entry)

- **Task:** resolve the three reviewer-required D12-D PLAN corrections; documentation only. No BUILD.
- **(1) Run immutability:** split `FJK AI Interpretation Run` into **Immutable Run facts** (incl. new `source_state_ref`; request/response ids write-once) and **Terminal outcome fields**; invariant added — historical identity/provenance facts immutable, outcome completes exactly once; `status` initial `PROCESSING` → exactly one terminal of {SUCCEEDED, FAILED, INCOMPLETE, MALFORMED, VALIDATION_FAILED, POLICY_REJECTED}; no other states.
- **(2) run_key no-hash case:** canonical identity = sha256(source_doctype|source_name|`source_state_ref`|instruction_ref|provider|model); `source_state_ref` defined per source type (File → `content_hash`; Communication → `modified`; attachment → ordered hash; generic → `modified`; compound → ordered concatenation, ordering **OPEN**) so distinct source states cannot collapse.
- **(3) FJK AI Deal Candidate:** confirmed as the single persistent representation of D12-C `deal_resolution.candidates`, separate from `FJK AI Proposal`; minimum fields `candidate_reference` + `ambiguity_note` (+`confidence` OPEN); no selected/confirmed/authoritative/human-resolution/promotion/Company/Contact authority. **Handoff gap (FACT):** D12-C validates but does not return `deal_resolution`, so Deal-candidate persistence is OPEN/blocked pending a separately-authorized D12-C change or deferral; D12-C not redesigned.
- **No other D12-D decision changed.** D12-A/B/C, O01/O02/O04/O05, provider/O08, D12-E/F, promotion, Information Status, Supplier Quotation untouched.
- **Documents updated (documentation only):** Implementation Plan §FK-D12-D (D12.D.5, D12.D.5.1, D12.D.8, D12.D.17, header note); Implementation Log (this entry).
- **Runtime/Git safety:** documentation-only; HEAD still `4242178`; no code/DocType/schema/DB/config/credential/CRM changes; no commit/push.
- **STOP:** FK-D12-D PLAN — CORRECTIONS RESOLVED / BUILD NOT AUTHORIZED; do not start D12-E.

---

### 2026-10-07 — FK-D12-D final correction: Deal-candidate persistence deferred (this entry)

- **Decision:** `FJK AI Deal Candidate` is **removed from the D12-D BUILD scope** and will **not** be created; `deal_candidates` is removed from the `FJK AI Interpretation Run` model. D12-D BUILD scope = `FJK AI Interpretation Run` + `FJK AI Proposal` only.
- **Reason (FACT):** frozen D12-C validates but does not expose `deal_resolution` (`AIResult.proposals` only); D12-D must not reopen/modify D12-C (frozen at `4242178`) to create a persistence target for data it does not emit.
- **Governance preserved:** Deal resolution remains separate from ordinary proposals; no authoritative Deal selection/confirmation/human-resolution/promotion/Company/Contact authority is represented; no second Deal-resolution representation is introduced.
- **Future:** a separate decision must first determine whether (and how) D12-C surfaces `deal_resolution.candidates`; the item stays DEFERRED / BLOCKED.
- **No D12-C change; commit `4242178` untouched.**
- **Documents updated (documentation only):** Implementation Plan §FK-D12-D (header note, D12.D.4, D12.D.5 Run table, D12.D.5.1, D12.D.6, D12.D.15, D12.D.17, D12.D.19); Implementation Log (this entry).
- **Runtime/Git safety:** documentation-only; HEAD still `4242178`; no code/DocType/schema/DB/config/credential/CRM changes; no commit/push.
- **Status:** FK-D12-D PLAN — APPROVED FOR BUILD AFTER DEAL-CANDIDATE DEFERMENT; BUILD NOT AUTHORIZED; await explicit authorization; do not start D12-E.

---

### 2026-10-07 — FK-D12-D BUILD: AI Interpretation Run + AI Proposal (NOT COMPLETE — runtime verification pending)

- **Authorization:** D12-D only; two DocTypes + permission hook + persistence boundary. No Deal Candidate; no review/promotion; no D12-C change; no commit.
- **Created:** `doctype/fjk_ai_interpretation_run/{__init__.py,*.json,*.py}`; `doctype/fjk_ai_proposal/{__init__.py,*.json,*.py}`; `ai_persistence.py` (`compute_source_state_ref`, `compute_run_key`, `interpret_and_persist`); `ai_persistence_tests.py` (bench/rollback smoke harness).
- **Modified:** `permissions.py` (+`has_source_permission`), `hooks.py` (register `has_permission` for both DocTypes). D12-A/B/C under `ai/` **untouched**.
- **Run:** immutable facts (source ref/state/hash, instruction/contract refs, provider/model/fingerprint, request/response ids, `run_key` unique, `started_at`) + terminal outcome (`status` initial `PROCESSING` → exactly one of SUCCEEDED/FAILED/INCOMPLETE/MALFORMED/VALIDATION_FAILED/POLICY_REJECTED; `completed_at`, `finish_reason`, `error_category`, `error_message_redacted`, usage, `elapsed_seconds`, `proposal_count`). Immutability + exactly-once outcome enforced in the controller.
- **Proposal:** `run` link, domain, logical_key, original `proposed_value` (+type), provenance_status, status_hint, confidence, uncertainty, evidence_span, target_hint, `lifecycle_state` default `PROPOSED`, `created_at`; original fields immutable; no review/disposition/promotion fields.
- **Verification (PASS):** offline AI suite **116 passed, 0 failed**; structural checks on both DocType JSONs (all approved fields; `run_key` unique; 7 statuses; `lifecycle_state` PROPOSED; `status_hint` excludes CUSTOMER-CONFIRMED; no forbidden fields; exactly two AI DocTypes; no Deal Candidate dir); static scan shows no `raw_payload` persistence and no authoritative CRM writes; all new Python files pass `ast.parse`.
- **Verification NOT performed (boundary):** `bench` CLI unavailable here → `bench migrate` and the `ai_persistence_tests` runtime suite (Run/Proposal creation, idempotency, failure persistence) were **not** executed; must run in the bench environment.
- **Deviations:** usage fields per authorization (cached→cache_hit; cache_miss=0; `reasoning_tokens` not persisted); persistence uses `ignore_permissions=True` for system-generated records and commits after the PROCESSING insert; full tx/retry = D12-F.
- **Security/authority:** no raw payload/response/prompt/credentials persisted; no Deal/Company/Contact/Info-Status write; no live DeepSeek call; no customer data; no commit/push.
- **Deal Candidate remains DEFERRED / BLOCKED.**
- **Status:** **FK-D12-D BUILD — NOT COMPLETE (structural PASS; runtime DB verification pending bench).** Do not claim complete until runtime evidence exists. Do not start D12-E.

---

### 2026-10-07 — FK-D12-D runtime verification (COMPLETE / PASS)

- **Environment:** project containerized bench — `docker compose up -d mariadb redis`; `docker compose run --rm frappe` (image `frappe/bench@7cf2354c`, `bench` 5.31.0); site `crm.localhost`.
- **Migration:** `bench --site crm.localhost migrate` applied `FJK AI Interpretation Run` + `FJK AI Proposal`.
- **Persistence harness:** `bench --site crm.localhost execute feeljapank_crm.ai_persistence_tests.run_ai_persistence_tests` → **31 passed, 0 failed** (transaction rolled back; synthetic data only; no network).
- **Evidence:** Run `PROCESSING`→`SUCCEEDED`; `proposal_count` = persisted Proposals (2); provider/model/fingerprint/usage persisted; Proposals link to the Run, `lifecycle_state=PROPOSED`, original AI value preserved; `run_key` idempotency (`reused=True`, single Run row); terminal state cannot revert; no `raw`-like DB column on either table; source-permission boundary (Administrator allowed / Guest denied; no new role); failure terminal states with 0 proposals — `FAILED`, `INCOMPLETE`, `MALFORMED`, `VALIDATION_FAILED`, `POLICY_REJECTED`.
- **`ignore_permissions=True` observation:** used only to create system-generated Run/Proposal records; persistence does not read source data (caller supplies the request); grants no user-facing write; Run/Proposal carry no CRM authority; read access via `has_source_permission` remains enforced (Guest denied).
- **PROCESSING-commit observation:** the Run is committed after the `PROCESSING` insert so a crash remains auditable; failure paths persist a terminal state and never `SUCCEEDED`; persistence writes no CRM data (no orphan authoritative changes). Full tx/retry/reprocessing remains D12-F. Crash-mid-call not runtime-simulated (would require killing the worker).
- **Regression:** offline AI suite `116 passed, 0 failed`.
- **Security/authority:** no raw payload/response/prompt/credentials persisted; no Deal/Company/Contact/Information-Status write; no live DeepSeek call; no customer data; no commit/push.
- **Deal Candidate remains DEFERRED / BLOCKED.**
- **Status:** **FK-D12-D — PASS / FROZEN.** Do not start D12-E.

---

### 2026-10-07 — FK-D12-E Proposal/Human Review Handoff PLAN produced (PLAN ONLY)

- **Task:** design the human review/disposition handoff (PLAN ONLY); documentation only. No code/DocType/DB/UI/permission/CRM changes.
- **Current-state findings (FACT):** `FJK AI Interpretation Run` + `FJK AI Proposal` exist (D12-D); `has_source_permission` mirrors the source record; repo has an append-only child-table pattern (`FJK Quotation.confirmations`/`negotiation_entries`) written by whitelisted APIs (`api.py:confirm_version`, `add_negotiation_entry`) using `doc.check_permission("write")` + `frappe.session.user`; `api.py:set_info_complete` mutates the Deal's authoritative field (the authority pattern D12-E must NOT follow); UI = Frappe Page `fjk_workspace` + Workspace + bundle.
- **Representation:** **Option B** — keep `FJK AI Proposal.lifecycle_state` as current state; add append-only child table **`FJK AI Proposal Decision`** (disposition, from/to_state, reviewer, decided_at, edited_value, reason, superseded_by). Option C (separate DocType) not justified.
- **Lifecycle:** PROPOSED→{ACCEPTED,EDITED_ACCEPTED,REJECTED,DEFERRED,SUPERSEDED}; DEFERRED→terminal; ACCEPTED/EDITED_ACCEPTED→SUPERSEDED; REJECTED/SUPERSEDED terminal. Promotion-eligible ⇔ {ACCEPTED, EDITED_ACCEPTED}. Supersession explicit; no "latest wins".
- **UX/API:** native Proposal/Run forms + optional workspace extension; single whitelisted `record_proposal_disposition` (validate transition, append immutable decision, set reviewer/timestamp, update lifecycle); never writes CRM. Source via Run→source ref; `evidence_span` is string-only (limitation recorded).
- **Edit semantics:** only `proposed_value`→`edited_value` in the decision row; original immutable; target identity not editable.
- **Competing:** same-datum acceptance requires explicit supersession of the prior promotable proposal; no silent overwrite.
- **Boundaries:** no Deal resolution (D12-C does not expose `deal_resolution`; DEFERRED/BLOCKED); no CUSTOMER-CONFIRMED/Info Complete/Ready for Quotation; D12-E ends at promotion eligibility (read-only handoff contract); no promotion.
- **Permissions:** view = source-read; review requires an existing reviewer role (Sales Manager/System Manager) + source read; refixing `has_source_permission` for write is OPEN; no new role.
- **Concurrency:** state-check guard; final hardening = D12-F.
- **Future BUILD scope (not created):** `FJK AI Proposal Decision` child DocType; `decisions` Table on Proposal; proposal + decision controller guards; `api.py` disposition API; possible permissions refinement; review tests.
- **Decision Register:** unchanged (no new governance decision; O02 lifecycle already frozen).
- **Runtime/Git safety:** documentation-only; no code/DocType/DB/UI/permission/CRM change; no provider call; no credentials; no commit/push.
- **STOP:** FK-D12-E PLAN READY FOR REVIEW; BUILD NOT AUTHORIZED; do not start D12-F.

---

### 2026-10-07 — FK-D12-E PLAN corrections (this entry)

- **Task:** apply the reviewer's seven D12-E PLAN corrections; documentation only. No BUILD.
- **(1) Lifecycle:** exact transitions — `PROPOSED→{ACCEPTED,EDITED_ACCEPTED,REJECTED,DEFERRED,SUPERSEDED}`; `DEFERRED→{ACCEPTED,EDITED_ACCEPTED,REJECTED,SUPERSEDED}` (DEFERRED explicitly non-terminal); `ACCEPTED`/`EDITED_ACCEPTED→SUPERSEDED`; `REJECTED`/`SUPERSEDED` terminal; no other transitions.
- **(2) Append-only:** explicit invariant — existing `FJK AI Proposal Decision` rows cannot be edited/deleted/reassigned/re-timestamped/re-dispositioned or have `edited_value` changed; enforced by controller guards, **not** child-table convention.
- **(3) SUPERSEDED:** `superseded_by` **required**; successor traceable; no "latest wins"; no automatic supersession on change of mind.
- **(4) Permissions:** evidence-based — authenticated reviewer via existing permission mechanisms + source-read + ability to record disposition; **no hard-coded role**; role mapping investigated before BUILD; no new role.
- **(5) EDITED_ACCEPTED:** `edited_value` required; original `proposed_value` immutable; editing never writes the authoritative CRM target.
- **(6) Target validation:** use the actual D12-C contract (`ai/schema.py` `ALLOWED_DOMAINS`); **no invented fixed domain/logical-key set**; `logical_key`/`target_hint` are informational hints, never addressable targets.
- **(7) API:** choice kept **OPEN** pending BUILD inspection; if a whitelisted disposition method is required it must authenticate, enforce reviewer permission, validate the transition, append an immutable decision row, update lifecycle, and never modify CRM/promote.
- **No other D12-E decision changed.** D12-A/B/C, D12-D, O01–O05, provider/O08, D12-F, promotion, Information Status unchanged.
- **Documents updated (documentation only):** Implementation Plan §FK-D12-E (header note, D12.E.3, D12.E.4, D12.E.5, D12.E.7, D12.E.9, D12.E.16, D12.E.18, D12.E.19, D12.E.20); Implementation Log (this entry).
- **Runtime/Git safety:** documentation-only; HEAD still `4242178`; no code/DocType/DB/UI/API/permission/CRM change; no provider call; no credentials; no commit/push.
- **Status:** FK-D12-E PLAN — APPROVED FOR BUILD; BUILD NOT YET AUTHORIZED; do not start D12-F.

---

### 2026-10-07 — FK-D12-E BUILD: Proposal / Human Review Handoff (PASS / FROZEN)

- **Authorization:** D12-E only. No D12-F, no promotion, no Deal Candidate, no D12-C change, no commit.
- **Created:** child DocType `fjk_ai_proposal_decision` (`istable:1`, `editable_grid:0`) — `disposition`, `from_state`, `to_state`, `reviewer (Link User)`, `decided_at`, `edited_value`, `reason`, `superseded_by (Link FJK AI Proposal)`; `ai_review_tests.py` (bench/rollback harness).
- **Modified:** `fjk_ai_proposal.json` (+`section_break_review` +`decisions` Table) and `fjk_ai_proposal.py` (append-only decision guard + exact lifecycle-transition guard); `api.py` (+whitelisted `record_proposal_disposition`). D12-A/B/C `ai/` untouched.
- **Implementation:** exact transitions per D12.E.4; `lifecycle_state` = current state driven only by append-only decisions; every transition appends exactly one immutable row; guards reject editing/deleting/reassigning/re-timestamping/re-dispositioning/changing `edited_value` of existing rows. `EDITED_ACCEPTED` requires `edited_value`; `SUPERSEDED` requires `superseded_by` (existing successor; self/circular rejected). Disposition API authenticates + `check_permission("write")` + validates transition + appends decision + updates lifecycle + records reviewer/timestamp; **never** writes CRM or promotes.
- **Runtime (PASS):** containerized bench `frappe/bench@7cf2354c` (5.31.0), site `crm.localhost`; migrate applied child DocType + Proposal field; `bench --site crm.localhost execute feeljapank_crm.ai_review_tests.run_ai_review_tests` → **40 passed, 0 failed** (all allowed + invalid transitions, append-only, attribution, edited acceptance, competing, authority/no-CRM-mutation, hostile-data-stays-data, Guest denied, audit). D12-D harness re-run **31 passed, 0 failed**; offline AI suite **116 passed, 0 failed**.
- **Permission mapping (OPEN):** `has_source_permission` short-circuits System Manager/Administrator; other roles cannot record dispositions yet; no new role.
- **UI:** native Proposal/Run forms + read-only decisions grid + source link; no custom dashboard/workspace redesign (handoff documented).
- **Security/authority:** no authoritative CRM write; no Deal selection; no confirmation/Info-Status/Info-Complete/Ready-for-Quotation/quotations; no credentials; no live provider call; no customer data.
- **Deal Candidate remains DEFERRED / BLOCKED.**
- **Documents updated (documentation only):** Implementation Plan §D12.E.24 (BUILD record); Implementation Log (this entry).
- **Git:** `api.py`, `hooks.py`, `permissions.py` modified; `fjk_ai_proposal_decision/` + `ai_review_tests.py` untracked; `ai/` untouched; no commit/push.
- **Status:** **FK-D12-E BUILD — PASS / FROZEN.** Do not start D12-F.

---

### 2026-10-08 — Telegram implementation authorized (STG0-D18)

- **Task:** record the operator governance decision authorizing the Telegram build; documentation only. No code/config/credential/webhook; no external calls.
- **Decision (STG0-D18):** the operator **revokes the prior "Telegram build pending / not authorized" state** and **AUTHORIZES the Telegram implementation**.
- **Preserved (unchanged):** Telegram is internal-only (not a customer channel); transport/control surface only; notifications cannot replace D12-E approval; Telegram metadata never establishes authoritative Company/Contact/Deal/requirements/customer confirmation/Info Complete (FK-D10/FK-D12/FK-D18/STG0-R01); STG0-R01 unchanged.
- **Still required for the build:** implementation approach selection (community Frappe Telegram app vs Bot-API integration [webhook/long-polling] vs generic webhook); O08-class security/data-handling determination (third-party processor, bot-token secrecy, chat/sender identifiers, retention); source-preservation mapping to native `File`/`Communication` with channel metadata; a scoped Telegram BUILD PLAN under the FK-D12 high-risk gate.
- **Documents updated (documentation only):** Decision Register §10 (O06 status, Telegram authorization subsection, Open Items, history); AI-Provenance Decisions STG0-O06/STG0-D18 + §3D; Technical Design §18.2/§18.3; Implementation Plan §3.2/M6; Verification Plan V58–V62 note; Implementation Log (this entry).
- **Runtime/Git safety:** no code/DocType/DB/config/credential/CRM change; no Telegram bot/webhook; no external call; no commit/push.
- **STOP:** Telegram BUILD PLAN not yet produced; no Telegram implementation performed.

---

### 2026-10-08 — Stage 0 Master Implementation Plan created (Phase 0 reconciliation)

- **Task:** inspect the operator-proposed end-to-end Stage 0 sequence, reconcile it against the current repository/governance state, and create a consolidated master doc (none existed). Documentation only.
- **Created:** `docs/business/FeelJapanK-Phase1-Stage0-Master-Implementation-Plan-v0.1.md` — the full sequence (Phase 0 reconciliation → Phase 11 completion; Tasks 0–14) ending at **Info Complete**, with Supplier Quotation / Customer Quotation / Trip explicitly out of scope.
- **Reconciliation findings (no conflicts with FROZEN decisions):**
  1. **Naming:** Roadmap v0.2 labels AI-intake as "Stage 0" and Summary/Info-Complete as "Stage 1"; the master plan adopts one "Stage 0" spanning to Info Complete — recorded as a labelling reconciliation, not a decision change.
  2. **D12-F scope:** assigning hardening **+ promotion mechanics** to D12-F is consistent with the D12-E §14 promotion handoff and the earlier naming of D12-F as hardening/idempotency owner.
  3. **WhatsApp:** O06 records live inbound as DEFERRED; master plan records WhatsApp as an *intended core channel whose live inbound is operationally deferred* (consistent; nuance made explicit). STG0-R01 unchanged.
  4. **Telegram:** STG0-D18 authorized; only *how* is open (approach, O08-class security, source mapping, build scope). Authorization not reopened.
  5. **Request Summary:** conceptual only; no DocType exists (flagged OPEN in Task 9).
  6. **Email:** inbound enablement still needs operational authorization (O06 open item).
  7. **Current state:** D12-A/B/C committed `4242178`; D12-D/E PASS/FROZEN in the working tree (uncommitted); D12-F not started.
- **Governance:** master plan is a working plan; each task keeps its own PLAN → APPROVAL → BUILD → VERIFY gate (D12-F and channel work under the FK-D12 high-risk gate). No frozen decision changed.
- **Documents updated (documentation only):** new master plan; Implementation Log (this entry).
- **Runtime/Git safety:** docs-only; no code/DocType/DB/config/credential/CRM change; no external call; no commit/push.

---

### 2026-10-08 — Stage 0 Master Implementation Plan LOCKED

- **Decision:** operator **locked** the Stage 0 master sequence (Phases 1–11, Tasks 1–14; ends at Info Complete). `docs/business/FeelJapanK-Phase1-Stage0-Master-Implementation-Plan-v0.1.md` status set to **LOCKED (2026-10-08)**; Phase 0 (reconciliation) marked **COMPLETE**, exit gate satisfied.
- **Effect:** this is the definitive working Stage 0 order. Each task still keeps its own **PLAN → APPROVAL → BUILD → VERIFY** gate (D12-F and channel work under the FK-D12 high-risk gate). No FROZEN decision changed.
- **Next action:** Task 1 — **D12-F PLAN** (dedicated read-only PLAN session).
- **Runtime/Git safety:** documentation-only; no code/config/credential/CRM change; no commit/push.

---

### 2026-10-08 — Task 0A: Stage 0 Master Plan completion reconciliation (status dashboard)

- **Task:** mark the locked master plan against the **actual repository state** so existing capabilities are not rebuilt. Documentation only.
- **Changes to `docs/business/FeelJapanK-Phase1-Stage0-Master-Implementation-Plan-v0.1.md`:** added **§0.3 execution dashboard** (per-task status: DONE / PARTIAL / FOUNDATION-ONLY / EXISTING / NOT DONE with done-vs-remaining); **§0.4 three kinds of "done"** (A already-implemented-and-reusable — do not rebuild; B foundation-not-connected; C missing); **§0.5 revised execution order** (`D12-A/B/C/D/E → DONE → D12-F NEXT → Common Source Intake → channel integrations → promotion into existing requirements/allocations/Info-Status → UX → E2E → human acceptance → freeze`); Phase 0 now records Task 0A; §13 working order includes 0A.
- **Verified against repo (`FACT`):** downstream FJK doctypes present (Deal Component, Requirement Line, Guide Requirement, Activity Item, Transportation/Accommodation Allocation, Quotation*); `d1.py` STATUSES (KNOWN/MISSING/TO CONFIRM/CUSTOMER-CONFIRMED/NOT APPLICABLE); `api.py` `set_info_complete`/`get_readiness`/`is_info_complete`; `setup.py` `fjk_info_complete`; N1 presentation doc present. Stage 0 AI Provenance Implementation Plan line: *"Missing: `Communication → structured requirement` as an automated/proposal flow."*
- **Effect:** D12-A/B/C/D/E, native CRM, downstream requirement/allocation/validation/Info-Complete and N1 are **reuse, not rebuild**. Missing work: D12-F; Common Source Intake; Telegram build; email enablement/integration; complete source→D12→review→promotion; AI-assisted human-controlled Deal resolution; AI→FJK promotion; E2E verification; human acceptance; freeze.
- **Governance:** controlled revision of the LOCKED plan (operator-requested Task 0A); no FROZEN decision changed; each task keeps PLAN → APPROVAL → BUILD → VERIFY.
- **Runtime/Git safety:** docs-only; no code/config/credential/CRM change; no commit/push.

---

### 2026-10-08 — D12-F design decisions DS1–DS9 approved (documented)

- **Task:** document the operator-approved D12-F design decisions (DS1–DS9, incl. DS6 final retry policy) into the Implementation Plan + this log. Documentation only; **BUILD NOT AUTHORIZED**.
- **Approved decisions:** DS1 dedicated append-only promotion record; DS2 idempotency key `sha256(proposal│target│effective_value)`; DS3 no silent overwrite (explicit `override`); DS4 atomic per-datum promotion; DS5 explicit human-initiated new Run reprocessing; **DS6 retry (below)**; DS7 unique key + state re-check + `for_update`; DS8 authenticated promoter with Deal-write on resolved target (reviewer/promoter may differ; no new role); DS9 FJK child-table targets only (allow-list), Deal scalars deferred.
- **DS6 final retry policy (APPROVED):** transport **maximum total attempts = 3** (1 initial + 2 retries), exponential backoff + full jitter (`base 1.0s`, `cap 8.0s`, sleep `uniform(0.5,1.0)×min(cap, base×2^(n-1))`); retryable = connection/timeout/429/500/502/503/504; non-retryable = **3xx redirect (corrected)**, malformed/oversized, 400/422, 401, 402/403, incomplete, schema/semantic/policy; `Retry-After` deferred; promotion no auto-retry (idempotent re-submission); retries reuse the same Run; no new Run states.
- **Implementation evidence (`FACT`):** `RetryingTransport` currently `max_attempts=1` (retries effectively disabled) with **linear** backoff, no jitter; 3xx maps to a retryable error. D12-F BUILD finalizes the explicitly-OPEN D12-B retry parameter + fixes 3xx classification (bounded finalization, not a D12-B redesign).
- **Documents updated (documentation only):** Implementation Plan §FK-D12-F (D12.F.1–D12.F.10); Implementation Log (this entry).
- **Runtime/Git safety:** docs-only; no code/DocType/DB/config/credential/CRM change; no provider call; no commit/push.
- **STOP:** D12-F BUILD NOT AUTHORIZED (separate authorization required).

---

### 2026-10-08 — FK-D12-F BUILT + VERIFIED (not committed)

- **Authorization:** D12-F BUILD (DS1–DS9).
- **Created:** `ai_promotion.py` (promote_proposal, effective_value, idempotency_key) + `ai_promotion_tests.py`; child DocType `FJK AI Proposal Promotion` (append-only; unique idempotency key; track_changes).
- **Modified:** `api.py` (`promote_ai_proposal`), `hooks.py` (permission registration); `ai_persistence.py` (DS5 reprocess nonce); `ai/config.py`, `ai/transport.py`, `ai/errors.py`, `ai_wiring.py`, `ai/tests.py` (DS6 finalization: 3 total attempts, exponential+full jitter base 1s cap 8s, 3xx non-retryable via `RedirectRefusedError`).
- **Verification (PASS):** containerized bench `frappe/bench@7cf2354c` (5.31.0) site `crm.localhost`; migrate applied the promotion DocType. `ai_promotion_tests` **16/16**; `ai_persistence_tests` **31/31**; `ai_review_tests` **40/40**; offline AI suite **130/130** (116 + 14 D12-F retry). Covers accepted→authoritative; edited-accepted→edited value; rejected/deferred/superseded cannot promote; duplicate idempotent; stale blocked without override; override updates; permission denial (Guest); audit reconstruction + reverse traversal; reprocessing new Run.
- **Deviations (recorded in Implementation Plan §D12.F.11):** initial allow-list = requirement-line `detail` (Information Status not a target; Guide/Activities excluded); appended rows also set `item` from `logical_key`; true concurrency covered by unique key + `for_update` + state re-check (test uses idempotent re-entry); true rollback represented by blocked/idempotent no-partial-change; reprocess capability present, human trigger belongs to intake layer.
- **Boundaries:** no Deal resolution; no Information Status / Info Complete / quotation; no live provider call; no credentials; no commit/push.
- **Documents updated (documentation only):** Implementation Plan §D12.F.11; Implementation Log (this entry).
- **STOP:** D12-F BUILT/VERIFIED; awaiting review before any commit/push.

---

### 2026-10-08 — FK-D12-F governance closure: CONDITIONAL PASS / READY FOR FREEZE

- **Task:** documentation-only closure for D12-F based on the completed BUILD + VERIFY. No implementation change; no migration; no commit/push.
- **Status recorded: FK-D12-F — BUILD VERIFIED: CONDITIONAL PASS / READY FOR FREEZE.**
- **Verified evidence (as recorded):** `ai_promotion_tests` **16/16**; `ai_persistence_tests` **31/31**; `ai_review_tests` **40/40**; offline AI suite **130/130** (116 + 14 D12-F retry). Environment: containerized `frappe/bench@7cf2354c` (bench 5.31.0), site `crm.localhost`; promotion DocType migrated; services stopped; no live provider call; no credentials; no customer data.
- **Residual limitations recorded (NOT defects):** (A) initial promotion allow-list = requirement-line `detail`; `Tour Guide`/`Activities & Tickets` excluded; richer per-domain mapping is later Stage 0 work — D12-F delivers the controlled mechanism; (B) concurrency is implementation/design-verified (unique key + `for_update` + state re-check); a **true parallel race stress test was not executed**; (C) a **mid-transaction process kill was not simulated** (blocked/idempotent paths showed no observed partial mutation) — crash-kill recovery not claimed runtime-proven; (D) reprocessing capability exists at the persistence layer; the human trigger belongs to the future intake workflow.
- **Audit-record semantics (as implemented, unchanged):** idempotency key applies to successful `PROMOTED` records; `BLOCKED`/`FAILED` rows are keyless append-only audit events.
- **DS1–DS9 not reopened.** Implementation files not modified. No migration/DB/CRM/customer-data change. No commit/push.
- **Documents updated (documentation only):** Implementation Plan §D12.F.11 (status) + §D12.F.12 (residual limitations + final status); Master Plan Task 1 status; this log entry.
- **STOP:** D12-F CONDITIONAL PASS / READY FOR FREEZE; next Stage 0 tasks (Common Source Intake, channels, Deal resolution, requirements/allocations mapping, Information Status, Info Complete, UX, human acceptance, quotations, Trip) require their own gates.

---

### 2026-10-08 — FK-D12-F FROZEN (release gate)

- **Governance action:** final verification + freeze + commit/push gate for D12-D/E/F.
- **Status: FK-D12-F — FROZEN (BUILD VERIFIED: CONDITIONAL PASS).** Residual limitations preserved exactly as bounded follow-on items (narrow initial promotion mapping; no true parallel-race stress test; no mid-transaction crash-kill test; reprocessing human trigger belongs to future intake). No unexecuted scenario is claimed as runtime-proven.
- **Verified evidence (unchanged):** `ai_promotion_tests` 16/16; `ai_persistence_tests` 31/31; `ai_review_tests` 40/40; offline AI suite 130/130. DS1–DS9 not reopened; implementation not modified in the closure/freeze sessions.
- **Released:** D12-A/B/C (committed `4242178`), **D12-D/E/F** committed and pushed as one release commit. Stage 0 remains **IN PROGRESS** (channels/intake/Deal resolution/promotion mapping/Information Status/UX/E2E/human acceptance pending their own gates).
- **Not staged:** `docs/evidence/phase1/runtime-state-2026-09-26.txt` (pilot runtime snapshot data — intentionally left untracked).

---

## 3. Future Entry Template

```
### YYYY-MM-DD — <entry title>

- Authorized by: <operator / governance reference>
- BUILD authorization: <reference>
- Scope implemented: <...>
- Files changed (app): <...>
- Schema/data changes: <...>
- Verification performed: <technical evidence reference>
- Human acceptance: <reference / pending>
- Result: <PASS/FAIL>
```

---

## 4. Rules

- No implementation entry may be added before an explicit `FK-D12` BUILD authorization for Stage 0.
- Verification evidence must be recorded separately from human acceptance.
- No stale or unsupported claims; distinguish FACT, FROZEN, PROPOSAL, OPEN.
