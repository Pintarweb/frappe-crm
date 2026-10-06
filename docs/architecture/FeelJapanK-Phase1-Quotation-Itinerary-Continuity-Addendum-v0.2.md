# FeelJapanK Phase 1 — Quotation & Itinerary Continuity — v0.2 (Addendum)

**Document status:** PROPOSED / CURRENT UNDERSTANDING — **implementation NOT authorized**
**Repository:** `/home/yusmarin/frappe-crm`
**Nature:** controlled v0.2 addendum. It **adds** the current session's itinerary/quotation continuity understanding. It **does not modify** any historical v0.1 artifact (none of the referenced v0.1 quotation documents were previously persisted to the repository; they are preserved here as the required companion v0.1 records).

**Provenance / companion records:**
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Workflow-Decisions-v0.1.md` (business decisions `FJK-SQ-D01…D12`).
- `docs/architecture/FeelJapanK-Phase1-Supplier-Quotation-Capability-Architecture-Plan-v0.1.md`.
- `docs/architecture/FeelJapanK-Phase1-Customer-Quotation-Itinerary-Generation-Capability-Plan-v0.1.md`.
- Skill source: `docs/reference/feel-japan-quotation/SKILL.md`; samples: `docs/reference/revised_Tokyo-Osaka_Quotation_Sep2026.docx`, `docs/reference/9.24-10.1 Itin.docx`, `docs/reference/Feel_Japan_K_letterhead.docx`.
- Existing authorities: Decision Register (`FK-D12/D14/D15/D16/D17`); Business Requirements/Capability/Architecture Reconciliation v0.1.
- Raw captured chat/source artifacts (historical, not implementation specs): `docs/reference/source-artifacts/Pasted text(20260930-143952).txt` (capability plan capture) and `docs/reference/source-artifacts/Pasted markdown (2).md` (decisions capture, truncated as pasted); see `docs/reference/source-artifacts/README.md`.
- Reconciliation of the immediate workstream (**itinerary within Deal Information Gathering** → Supplier Quotation Request): `docs/architecture/FeelJapanK-Phase1-Deal-Information-Gathering-and-Supplier-Quotation-Request-Reconciliation-v0.2.md`.

**Legend:** **[ESTABLISHED]** = already approved business rule/decision · **[WORKING]** = current working assumption · **[PROVISIONAL]** = chat-only, not frozen · **[OPEN]** = unresolved, requires a later decision.

---

## 1. Itinerary continuity [ESTABLISHED intent]

The itinerary is **not two unrelated documents**. The intended continuity is:

```
Customer/agent itinerary or raw travel information
→ Deal Information Gathering
→ working/structured Deal-level itinerary / travel plan
→ Claude-generated/restructured supplier-facing itinerary
→ operator review
→ Supplier Quotation Request + supplier-facing itinerary
→ supplier quotation
→ internal commercial processing
→ Customer Quotation V1 + customer-facing itinerary
→ V2…Vn as required
→ Final Quotation
→ invoice / Trip boundary
```

The **supplier-facing itinerary is important evidence**: it establishes the travel scope/information sent to the supplier for pricing. The same underlying itinerary/travel-plan information should support the supplier-facing itinerary, the customer-facing quotation/itinerary, and the continuity between what was requested and what is presented to the customer.

The exact **itinerary data model is** **[OPEN]**.

## 2. Source / provenance layers [ESTABLISHED intent · model OPEN]

Conceptually preserve provenance between:
1. Original customer/agent source itinerary or raw travel information;
2. Structured/working itinerary maintained as part of the Deal information;
3. Supplier-facing itinerary generated/restructured from that information and reviewed by the operator;
4. Customer-facing itinerary presentation derived from the agreed underlying itinerary.

Do **not** prescribe the exact technical DocType/data model for these layers in this document ([OPEN]).

## 3. Supplier-facing itinerary generation [ESTABLISHED intent]

Intended workflow: customer/agent provides itinerary/raw travel information → Claude may restructure/generate the supplier-facing itinerary → **operator reviews it** → the reviewed itinerary is sent to the supplier together with the Supplier Quotation Request → supplier quotation is received against that requested scope.

This is an **assisted generation workflow, not an autonomous send/trust workflow**.

## 4. Customer quotation generation [ESTABLISHED intent]

Customer quotation generation is **not merely a formatting step**. It sits after supplier quotation/commercial processing and uses the itinerary/travel-plan continuity:

```
Supplier Quotation
→ itinerary/travel-plan continuity
→ internal commercial processing
→ Customer Quotation & Itinerary Generation
→ operator review
→ Customer Quotation V1 → V2…Vn → Final Quotation
```

Customer-facing documents remain subject to **operator review before being sent**.

## 5. Existing Supplier Quotation architecture preserved [ESTABLISHED]

The following previously documented concepts are retained unchanged (see v0.1 decisions/plan): supplier quotation history; immutable/versioned supplier quotations; validity periods; reconfirmation/requote when validity expires while the Deal remains open; preservation of original supplier documents; structured extraction plus commercial/free-text information; Extract → Review → Confirm; Supplier Quotation Request; versioned Supplier Request Template Builder; native Frappe email direction; original email/attachment preservation; supplier reply/threading direction; no automatic trust of extracted data.

## 6. Customer quotation skill as source authority [ESTABLISHED]

The actual `feel-japan-quotation` skill remains an important source authority for the customer-facing quotation/document-generation capability. Its business rules must not be silently altered. Rules currently documented in `docs/reference/feel-japan-quotation/SKILL.md` include (as documented there): branded quotation document; required quotation structure; 20% markup rule; no per-item cost display; entrance names only; meal-pricing treatment; tipping rule; overtime/bus note; optional tentative itinerary; operator review before sending.

## 7. Provisional / chat-only clarifications [PROVISIONAL — NOT frozen]

Recorded as **OPEN / PROVISIONAL** reconciliation items only; **not** established:
- markup default 20% but **adjustable per quotation/deal**;
- tipping default **JPY 500/person/day** (skill documents JPY 400);
- optional meals/add-ons **may show prices** (skill documents a meal-pricing rule);
- other amendments to the skill's current rules.

Source of the divergence: `SKILL.md` vs the observed sample `revised_Tokyo-Osaka_Quotation_Sep2026.docx`.

## 8. Final Quotation [business understanding ESTABLISHED · representation OPEN]

- Final Quotation is the latest agreed customer quotation **copied/replicated and named as the Final Quotation**; it is **not "V3"**; V1/V2/V3 remain historical versions.
- It provides the **stable reference for invoice creation**.
- If a later customer quotation becomes the agreed one, a **new Final Quotation may be created** from that agreed version.
- The exact **technical representation is [OPEN]**; do not implement or freeze a technical model.

## 9. Invoice / Trip boundary [ESTABLISHED]

- Final Quotation becomes the reference for invoice creation.
- Invoice creation is the commercial transition into **Trip**.
- Deal may be marked **Won** at that boundary.
- Trip is **outside the current Phase 1 Deal-centred implementation scope**.
- Post-invoice amendments/additional costs and supplier involvement are **future Phase 2/3** concerns unless separately authorized.

## 10. Open questions [OPEN]

Unresolved matters (not forced into decisions): currency / FX; exact markup basis and override mechanics; final technical representation of Final Quotation; exact itinerary data model; generation service architecture; deterministic business-rule encoding; exact customer-facing itinerary role; plus the open questions already recorded in the Supplier Quotation plan (`FJK-SQ-Q01…Q14`) and the Customer Quotation plan (§14).

## 11. Reconciliation items (do not silently edit frozen docs)

- Record the itinerary-continuity capability and the two-stream (supplier/customer) quotation model in the architecture authority.
- Map Customer Quotation ↔ Final Quotation ↔ `FK-D17` CONFIRMED.
- Reconcile the provisional clarifications (§7) with the skill's documented rules at the next governed review.
- Reconcile automated supplier email reply intake (`FJK-SQ-D08`) with existing automation-deferral statements.

## 12. No implementation authorization

No application, DocType, schema, migration, email, UI, data, or runtime change is authorized. This document captures understanding for later governed planning only.
