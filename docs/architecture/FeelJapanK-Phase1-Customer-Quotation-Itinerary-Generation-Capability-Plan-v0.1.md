# FeelJapanK Phase 1 — Customer Quotation & Itinerary Generation Capability Plan — v0.1

**Document status:** PROPOSED / CAPABILITY ASSESSMENT — **implementation NOT authorized**
**Repository:** `/home/yusmarin/frappe-crm`
**Provenance:** persisted from PLAN-mode material produced in the current project session. Not previously stored as a repository artifact.

**Sources of authority (read-only):**
- Skill: `docs/reference/feel-japan-quotation/SKILL.md` (skill `feel-japan-quotation`; the `.skill` archive contains the same SKILL.md).
- Sample quotation + itinerary: `docs/reference/revised_Tokyo-Osaka_Quotation_Sep2026.docx`.
- Sample standalone itinerary: `docs/reference/9.24-10.1 Itin.docx`.
- Letterhead base: `docs/reference/Feel_Japan_K_letterhead.docx` (logo `word/media/image1.png`; footer: "Malaysia Office: ARK ALLIANCE SDN BHD (1664559-V) www.arkalliance.com.my | Japan Office: FEEL JAPAN WITH K CO. LTD www.feeljapanwithk.com").
- Decision context: `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Workflow-Decisions-v0.1.md`; Decision Register (`FK-D12/D14/D15/D16/D17`).

> "Quotation generation" is **not merely document formatting**: it is a business-rule-governed commercial document. Rules below are requirements of the capability; visual/formatting details are implementation.

## 1. Capability statement
Generate a client-facing **customer quotation** (and optional **tentative itinerary**) in branded `.docx` from (a) Deal requirements, (b) one or more **supplier quotations**, and (c) internal commercial processing (markup, package/room selection), producing **Customer Quotation V1…Vn → Final Quotation**.

## 2. Required inputs
Deal: customer/agent + attention; route; dates/duration; pax and room sharing; accommodation preferences; transport; guide; activities/tickets; meals; special/dietary; group composition.
Supplier: cost basis, validity, items, conditions; re-quotes.
Commercial parameters: markup %, pricing unit, single-room supplement, currency, confirmation deadline, inclusions/exclusions policy, standard wording constants (tipping, overtime/bus limit), branding.
Itinerary: day-by-day plan, locations, meal codes.

## 3. Business / pricing rules (as documented in SKILL.md)
1. Apply **20% markup silently** — never mention markup/percentage (SKILL.md L71, L226).
2. **Never show per-item costs** (accommodation/transport/meal) (L72, L227).
3. **Entrance fees: names only**, no prices (L73, L228).
4. **Meal pricing: not shown** per person (L74).
5. **Standard tipping line** (L77–79): "Tipping: JPY 400 per person / per day for driver and guide (2 persons)".
6. **Standard overtime/bus-limit note** (L82–86): 10 h / 300 km; JPY 12,000/hour/100 km; after 20:00 night work JPY 12,000/hour/person.
7. **No date**; **Attn: always blank** (L67–68).
8. **Title** `QUOTATION` bold/uppercase/centred sz 32 (L66).
9. **Structure order** (L46–59) and sign-off `Feel Japan with K Co. Ltd / Ark Alliance Sdn Bhd` (L88–91).
From the **sample quotation** (as observed, not as frozen rules): PRICING SUMMARY (per-person rate twin/triple + single supplement per person per night + confirmation deadline); ACCOMMODATION table; PRICE INCLUDES with dietary note (+10% restaurant reservation fee on post-booking change from incorrect dietary info); PRICE EXCLUDES (tipping; bottled water; optional lunch/dinner; insurance; personal expenses); TENTATIVE ITINERARY.

> **Skill↔sample divergences (OPEN / PROVISIONAL — see §11):** tipping 400 (skill) vs 500 (sample); skill "don't show meal per-person rates" vs sample showing optional lunch/dinner prices.

## 4. Generation logic (conceptual)
Deal requirements + supplier quote(s) → **commercial processing** (component selection; markup; room/pax pricing; supplement; deadline) → **document assembly** from structured data + standard blocks + itinerary → **branded .docx** on letterhead → **operator review/edit** → Customer Quotation **V1**. Changes → new version (Vn). Deterministic rules enforced regardless of generation method.

## 5. Customer quotation structure (SKILL.md Step 3 + sample)
`QUOTATION` → `Re:` → spacer → `Attn:` (blank) → salutation → opening → **PRICING SUMMARY** (+table) → **ACCOMMODATION** (+table) → **PRICE INCLUDES** → **PRICE EXCLUDES** → closing → signature → optional page-break + **TENTATIVE ITINERARY**.

## 6. Itinerary structure (SKILL.md Step 6 + sample)
`TENTATIVE ITINERARY` (centred sz32) → `Route | Dates` → group composition → per-day headers `DD Mon (Day N) – Location (meal codes)` + bullets → `B/L/D` legend → tentative disclaimer. Present both embedded in the quotation and (per the sample folder) as a standalone itinerary.

## 7. Document-generation requirements
Letterhead base preserved (logo/header/footer/fonts/pagination); section headings `1E6CB5`; table header fill `1E6CB5` white bold, alt rows `EBF2FA`, borders `CCCCCC`; bullet/sub-bullet indents; `keepNext/keepLines`, `cantSplit`; page-break rules; strict OOXML ordering; validate then pack; naming convention by tour type.

## 8. Human review / approval boundary
Operator reviews/edits and is the authority for commercial content (consistent with FJK-SQ-D10 and FJK-SQ-D02 operator authority). No generated document is sent without human review.

## 9. Evidence that must be preserved
Inputs (Deal requirements; supplier quotation(s) + validity + original attachments); commercial parameters used; each generated document version (V1…Vn) and the Final Quotation; operator edits; what was sent; customer confirmation evidence (`FK-D14`).

## 10. Versioning requirements
Customer Quotation versions **V1→Vn** (`FK-D17`); each generated document bound to a version; regeneration/material change → new version (never overwrite); **Final Quotation** = reproduced reference of the agreed latest (not a V-number) — technical representation OPEN (`FJK-SQ-D03`).

## 11. Provisional / chat-only clarifications (NOT frozen)
The following were raised in conversation and are **PROVISIONAL** — they must not be represented as settled:
- markup default 20% **but adjustable per quotation/deal**;
- tipping default **JPY 500/person/day** (vs skill's 400);
- optional meals/add-ons **may show prices** (vs skill's meal-pricing rule);
- other amendments to the skill's current rules.

## 12. Authoritative structured data (FJK) vs external/LLM generation
- **Authoritative in FJK (structured):** Deal requirements; supplier quotation data (versions, validity, items, conditions); commercial parameters and computed pricing; inclusions/exclusions selection; standard wording constants; itinerary day plan; branding reference; version + Final Quotation records; evidence files.
- **May remain external/LLM generation function:** narrative prose (opening/closing), itinerary wording, and `.docx` assembly/formatting — **bounded by** deterministic rules and validated; the LLM must **not** invent prices or expose costs. The skill is a Claude/docx-generation skill (SKILL.md Step 1 references `/mnt/skills/public/docx`), i.e., an external generation function, not the system of record.

## 13. Relationship: Supplier Quotation → Customer Quotation V1→Vn → Final Quotation → Trip
```
Supplier Quotation (supplier pricing/validity; FJK-SQ)
   → internal commercial processing (markup, package/room selection)
   → Customer Quotation V1 → V2 … Vn           (FK-D17; pre-invoice)
   → Final Quotation (reference of truth; FJK-SQ-D03)
   → invoice → Trip initiation (FK-D15; Phase 2/3)
```
Supplier and Customer quotations are **distinct directions**; both remain CRM/pre-invoice; Trip begins at invoice.

## 14. Open decisions and ambiguities (OPEN)
1. Markup: is 20% current, and on what cost basis? 2. Tipping 400 vs 500. 3. Meal/optional pricing display rule. 4. Itinerary: embedded vs standalone vs both; who authors day content. 5. Currency/FX. 6. Single supplement per night vs per stay; rounding. 7. Deadline source. 8. Generation service (which LLM/external; where it runs). 9. Deterministic-rule encoding boundaries. 10. Final Quotation ↔ `FK-D17` CONFIRMED mapping.

## 15. No architecture chosen
No implementation architecture is selected. Candidate directions (later PLAN): FJK holds authoritative structured data + versioning; document generation remains an external/LLM function behind deterministic rules; native Print Format vs letterhead-based docx pipeline is OPEN.

## 16. Reconciliation items
Record this as a new Phase 1 capability; map Customer Quotation ↔ Final Quotation ↔ `FK-D17` CONFIRMED; note generation is external/LLM-assisted but rules are authoritative.
