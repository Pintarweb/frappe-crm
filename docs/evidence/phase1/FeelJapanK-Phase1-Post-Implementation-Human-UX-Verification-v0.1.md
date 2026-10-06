# FeelJapanK Phase 1 — Post-Implementation Human UX Verification — v0.1

**Document status:** EVIDENCE — HUMAN OPERATOR, POST-IMPLEMENTATION (HALTED)
**Mode of execution:** O2 — facilitated turn-by-turn
**Scope:** the actual implemented FeelJapanK workspace at `/app/feeljapank?deal=CRM-DEAL-2026-00010`
**Nature:** additive evidence capture only. No classification, remediation, or implementation change is recorded here.

> **Boundary of this record**
>
> This file records a genuine human-operator walkthrough against the implemented FeelJapanK Desk Page.
> It preserves the operator's wording verbatim. Nothing here is classified as a defect, gap, or remediation requirement.
> The baseline human evidence `docs/evidence/phase1/FeelJapanK-Phase1-Human-UI-Test-Evidence-v0.1.md` (UI-01…UI-10) is unchanged and is not altered by this record.

---

## 1. Context

- **Controlled test Deal (dedicated):** `CRM-DEAL-2026-00010` (ABC Travel; status Qualification; deal_owner `pilot.operator@example.com`; shared D1 context Osaka / Dec 2026 / 18 pax; 2 component rows; 2 requirement-line rows).
- No existing baseline Deal used by UI-01…UI-10 was modified.
- Browser-only execution by the human operator; no direct API/database interaction by the operator.
- Baseline evidence SHA-256 at start: `8878c5d114d3cdbe2586884011186f520427854165eb935a3d566c110a9cb9af`.

## 2. Execution result

**HALTED at UX-V1 / UX-V2.** Stop condition §6.3 (inability to identify the correct Deal) was triggered: the operator reported that opening `http://crm.localhost:8000/app/feeljapank?deal=CRM-DEAL-2026-00010` did not display the Deal.

**UX-V3 through UX-V8: NOT EXECUTED.**

## 3. Operator observations (verbatim)

### UX-V1

> "i did not see any deal displayed. I expect to have the dela summary"

### UX-V2

> "It should display the deal summary, such as like it's a Tokyo-Osaka trip, the date, the numbers of pax, the accommodation, and whatever info that is available that being given by the client. And then, yeah, what's the current status of the deal? And such as like need more info. If you say need more info, so you will say what info are required."

## 4. Stop condition

- **Triggered:** §6.3 — inability to identify the correct Deal.
- Action taken: halted; no coaching, no retry via alternate navigation, no implementation change, no classification, no remediation.

## 5. Not executed

UX-V3 (create V1), UX-V4 (V2+ / material amendment), UX-V5 (negotiation history), UX-V6 (CONFIRMED + evidence), UX-V7 (return to Deal / status / next action), UX-V8 (fresh-operator comprehension) — **not executed**.

## 6. Runtime / data state at halt

- New record created for this test: `CRM-DEAL-2026-00010` (+ 2 component rows, + 2 requirement-line rows). Retained per the no-cleanup decision.
- FJK Quotation / Quotation Version / Quotation Confirmation records: **0 / 0 / 0**.
- The 8 baseline Deals retain identical `modified` timestamps (no unintended CRM data change).
- No application, schema, configuration, frontend, API, test, or fixture change.
- Git HEAD `7664bf23349053b18da3d328c48d58355c1112ef`; branch `main`; no commit; no push.

## 7. Classification / remediation

None performed. Phase 1D classification and any remediation are explicitly deferred.

---

## 8. Post-remediation human retest — operator observations (UX-V1…UX-V8)

**Execution context.** These observations were captured during the human retest performed after two remediations: (1) the Workspace/Page route collision was fixed (Workspace retained at `/app/feeljapank`; the Deal-centred Desk Page moved to `/app/fjk-workspace`); (2) the frontend bundle runtime defect was fixed (Vite build-time `process.env.NODE_ENV` definition). Technical verification confirmed the Page loads, Vue mounts, and the Deal context / readiness / quotation APIs return for `CRM-DEAL-2026-00010`. No implementation change was made during this UX evidence session. Nothing below is classified.

*Note: sections 2–3 above record the earlier halted run at `/app/feeljapank` and are preserved unchanged. This section records the later retest at `/app/fjk-workspace`.*

### UX-V1

> "better, but the display is all mix-up with the field title combined together link 2 · Requirements & 3 · Readiness, or 4 · Quotation V1 & 5 · V2+ & 6 · Version history.
>
> We have 'open in crm' button, but i wonder if we can come back here once we click it and send to th crm.
>
> The display looks ok"

Preserved:
- the Deal is now visible;
- overall display looks okay;
- section headings/navigation labels appear visually concatenated/mixed together;
- "Open in CRM" exists;
- operator is uncertain whether there is a way to return from CRM to FJK;
- operator is uncertain about the navigation relationship between FJK and CRM.

### UX-V2

> "I think the summary is okay, but we need to have, like, categories, whereas I want to know whether the deal is for the full package, or is it for transportation only, or accommodation only, or what. So, and then there's, like, the requirement. Are there any special requests? And then the numbers of packs. Yeah, just it needs to be, like, more specific, like 14 adults, 3 children, and 1 infant, and things like that. That would be nice. And about the requirement, it would be nice to have a more specific what I intend to get, need to request to the client to meet all the requirement. Because there's something that we need to know that something is optional and then not. So it would be deal with in the CRM template, I think."

Preserved (operator observations):
- summary is okay;
- wants categories/scope: full package; transportation only; accommodation only; etc.;
- wants special requests visible;
- wants detailed passenger breakdown: adults; children; infants;
- wants more specific requirement information;
- wants clarity on what information still needs to be requested from the client;
- wants distinction between optional and non-optional requirements;
- operator suggested this could be dealt with in the CRM template.

### UX-V3

> "I think the create quotation button should be like, I don't want it to, where you just, you click it and then you can make, you can start the quotation. It should be like a guarded, like a gated button. So once you fulfill all the requirement and send then, like you send a tick box or something confirming that the requirement is enough. So with that only the create button will be enabled.It would be better if we can have the system display, use a template like quotation, using all the info that we have collected and tabulate inside it, and then together with the company logo and all of it, so that it will be like a template that we will be using throughout all the quotations that we send to the supplier."

Preserved:
- Create Quotation should be gated/guarded;
- operator expects requirements to be fulfilled before quotation creation;
- operator wants explicit confirmation/tick-box confirming requirements are sufficient;
- only after that confirmation should Create Quotation become enabled;
- operator wants quotation generated from collected Deal information;
- wants information tabulated;
- wants company logo/standard formatting;
- wants a reusable quotation template for supplier quotations.

### UX-V4

> "I will email to the supplier and attach the latest quotation we received from him, and then we highlight the changes that we want to get, and then wait for the feedback."

Preserved:
- supplier communication is expected to be by email in this described workflow;
- latest supplier quotation is attached as reference;
- requested changes are highlighted;
- operator waits for supplier feedback;
- the next supplier negotiation step should be based on the latest supplier quotation rather than rebuilding the entire request without reference.

### UX-V5

> ", I just want to see the history. I mean the workflow, the flow of the negotiation and then the amendments and things like that. But do bear in mind that the quotation we sent prior, we need to capture the validity of the quotation itself. Because once the validity expires, without us closing the trip detail, the deals, and get the payment from our client, the quotation would be void."

Preserved:
- operator wants negotiation/amendment workflow history;
- operator wants to see the flow, not merely a list of versions;
- quotation validity period must be captured;
- expiry of quotation validity matters commercially;
- an expired quotation should not continue being treated as valid;
- the Deal/Trip may still remain open when quotation validity expires;
- operator specifically distinguished quotation expiry from closure/payment.

### UX-V6

> "Once we finalize the quotation with our client, then we will create a new quotation. We name it Final Quotation. So this final quotation will be the reference for us to create our invoice. So upon creating the invoice, we will start the trip. That's going to be like this commercially. So the trip and the invoice will be concurrently created. So from there, it will no longer just be a deal. So we can mark the deal as won, and then we start processing the invoice.But bear in mind that when the invoicing is still not finalized, once we give the client the invoice, they will surely ask for some discount or, I mean, you know, something free and things like that. So we still need to have a few amendments, a few negotiation there also."

Preserved:
- once client quotation is finalized, create a new quotation named "Final Quotation";
- Final Quotation becomes the reference for invoice creation;
- creating the invoice is the point at which the Trip starts;
- Trip and invoice are concurrently created;
- after this point it is no longer "just a Deal";
- Deal can be marked Won;
- invoice processing begins;
- invoice issuance does NOT necessarily mean that commercial negotiation is completely frozen;
- client may still request: discount; complimentary/free items; other amendments;
- further amendments/negotiation may therefore occur around the invoice stage.

### UX-V7

> "When the client asks for amendments to our invoicing, to our invoice, there are two questions to ask: whether it involves the supplier. If it involves the supplier to make the amendment, then we will ask, we will send the request to supplier together with our final quotation, the last quotation sent by the supplier, and asking them if the changes are made, are there going to be any additional cost, any additional things that we need to do, or is a new item requested to add in. So we will ask supplier to supply us, and then based on that we will send back to the client for approval. And another thing, another question is that if the decision does not involve the supplier, then it's us, our company. Then let's say like that they want like a 5% discount. So it's our decision to make. So that would be simple, then we just amend and redo the invoice for a new version."

Preserved:
- when client requests invoice amendment, first ask whether supplier involvement is required;
- if supplier involvement is required:
  - send request to supplier;
  - include Final Quotation as reference;
  - include latest supplier quotation;
  - ask whether requested change is possible;
  - ask whether there is additional cost;
  - ask whether additional work/actions are required;
  - ask whether a new item must be added;
  - receive supplier response;
  - relay resulting price/terms to client;
  - obtain client approval;
- if supplier is not involved:
  - company makes the decision internally;
  - example: 5% discount;
  - amend commercial terms;
  - create a new invoice version;
- operator expects previous invoice version/history to remain distinguishable.

### UX-V8

> "During the trip, there will be additional costs. Let's say, like on the third day of their trip, they decided to add a dinner, a farewell dinner party, to be in the hotel. So let's say for, like, ten people, and they ask us to organize it, and there will be additional cost, as additional cost. So we ask our supplier if they can do it in that short time, short of time. So if the supplier say that they can do it, and then they will quote us a price, and then we will relay the price with the markup to our client. And if they agree, then we usually using WhatsApp. So we need a confirmation. A WhatsApp message will be sufficient, saying that they agree to pay that amount if we do it. And then with that confirmation, we will send back to our supplier to proceed. This additional item will be billed later, once the trip is done. So I mean after they finish the trip, and it will be sent to their office for the additional, we call it additional invoice. About the payment to the supplier, usually we get some slack there. We can just pay them just a tiny deposit for the additional cost, or even some, like 14 days free before we make any payment to that. It depends. And then once, let's say the trip is done, if there is no additional charges occurred, we just close the trip as done, and then we need to send some email and/or WhatsApp to our client asking for their review, and then any comment, anything to improve our service. And also we will then archive it. And if there is an additional invoice, then we will send the additional invoice to them, and then usually like a 14 days payment, and then we will start chasing the payment after that."

Preserved:
- additional costs can arise during the Trip;
- example: Day 3; farewell dinner; hotel; 10 people;
- operator first asks supplier whether the additional arrangement can be fulfilled on short notice;
- supplier provides price;
- operator applies markup;
- operator relays price to client;
- client approval is required;
- WhatsApp confirmation is sufficient customer confirmation in this described workflow;
- after customer confirmation, supplier is instructed to proceed;
- additional item is billed after the Trip;
- this is called an "additional invoice";
- supplier payment for additional item may vary: small deposit; deferred payment; example: 14 days; depends on supplier;
- if Trip finishes without additional charges:
  - close Trip as done;
  - send email and/or WhatsApp requesting client review;
  - request comments/feedback/improvement suggestions;
  - archive the completed Trip;
- if an additional invoice exists:
  - send additional invoice to client;
  - typical payment term described as 14 days;
  - begin payment chasing after payment term expires.

---

## 9. Evidence metadata / update

- UX-V6 captured (herein).
- UX-V7 captured (herein).
- UX-V8 captured (herein).
- Evidence persistence only.
- No implementation changes.
- No CRM data changes.
- No classification applied.

Cross-test baseline observations (UI-01…UI-10) in `docs/evidence/phase1/FeelJapanK-Phase1-Human-UI-Test-Evidence-v0.1.md` remain preserved and are not replaced by these post-implementation observations.
