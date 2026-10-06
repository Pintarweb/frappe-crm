# FeelJapanK Phase 1 — Human UI Test Evidence

**Document status:** EVIDENCE — GENUINE HUMAN / OPERATOR-EXECUTED BASELINE
**Scope:** Phase 1C — Manual UI Testing (human)
**Version:** v0.1
**Repository:** `/home/yusmarin/frappe-crm`
**Nature:** Evidence preservation only. No review, classification, remediation, or fix is recorded here.

> **Boundary of this record**
>
> This file records **genuine human operator** executions of the Phase 1C UI workflows against the **untouched baseline** native Frappe CRM. The tests are UI-01 (new enquiry → new Deal), UI-02 (repeat customer / multiple Deals), UI-03 (multiple Contacts), UI-04 (ambiguous inbound enquiry), UI-05 (amend existing Deal / preserve history), UI-06 (distinct new request from the same customer), UI-07 (Deal comprehension / summary, history and sections), UI-08 (customer confirmation / RFQ readiness), UI-09 (quotation negotiation / revision), and UI-10 (fresh-operator comprehension).
>
> These are **HUMAN TEST OBSERVATIONS**, not defect classifications. Nothing here is labelled as a bug, failure, accepted limitation, or remediation requirement, and nothing here is a pass/fail judgement. Classification is deferred to the Phase 1D Manual Testing Assessment.
>
> This record is distinct from, and must not overwrite or relabel, the earlier **agent-executed** UI evidence (see §4, §5.6, §6.6, §7.7, §8.7, §9.6, §10.6, §11.6, §12.7 and §13.7).

---

## 1. Test Context

- **Test:** UI-01 — New enquiry → new Deal
- **Operator:** Human operator / project user
- **System:** FeelJapanK Phase 1 native Frappe CRM pilot
- **State under test:** Untouched baseline
- **Remediation during test:** None
- **CRM artifact created:** `CRM-DEAL-2026-00009` (do not modify or delete)
- **Execution date:** September 2026 human baseline session

---

## 2. Human Observations (preserved)

### UI-01-O01 — Deal creation flow

User described the Deal creation flow as:

> "confusing and too complicated."

### UI-01-O02 — Company vs Organization

User questioned the use of "Organization" instead of "Company" and questioned whether a new client means creating new company details inside the Deal.

### UI-01-O03 — Desired Company-selection flow

User described the desired smooth UX:

> "the smooth ux is we open the create page, we will choose the company from our database. If none found, we will be given the options to create a new company, and choosing that will send us to the new company create page"

### UI-01-O04 — Company/Contact creation

User observed that Company and Contact creation should have dedicated pages rather than being embedded inside Deal creation.

### UI-01-O05 — Company fields

The native Create Deal modal displayed these Organization fields:

- Organization Name
- Website
- No. Of Employees
- Territory
- Annual Revenue
- Industry

User observed that the Company fields shown were not what had been planned.

### UI-01-O06 — Contact fields

User was unsure about the Contact fields shown in the Deal creation flow.

The displayed Contact fields were:

- Salutation
- First Name
- Last Name
- Primary email
- Primary mobile no.
- Gender

### UI-01-O07 — Post-Company-selection orientation

After selecting an existing Company/Organization, the user landed on `CRM-DEAL-2026-00009` for ABC Travel and said:

> "then? Am lost what to do? Where to"

### UI-01-O08 — Core inputs tucked in sidebar

User observed:

> "why did the things we need to set up is tuck nicely at the side,which you usually display info rather than key-in data and selecting things"

The observation concerns important Deal-entry controls/actions being presented in the right sidebar/details area rather than as an obvious creation/completion flow.

### UI-01-O09 — Contact selector

When the user clicked the `+` beside Contacts, the selector showed 3 contacts. User said:

> "list of 3 contact to choose from. Nt if all 3 belongs to the abc company"

### UI-01-O10 — Company → Contact filtering expectation

User said:

> "the contact should populate only the one attched to the selected company only"

---

## 3. Status

- UI-01 baseline human execution: **captured**
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**
- Evidence must remain preserved as **baseline**

These observations are recorded as-is. No meaning has been changed, and no wording has been interpreted beyond the user's own words.

---

## 4. Distinction From Earlier Agent-Executed UI Evidence

- The earlier UI-01 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md` and `docs/evidence/phase1/manual-ui/`) was **agent-executed** by an OpenCode/browser agent and created a different Deal (`CRM-DEAL-2026-00008`). It represents **agent evidence**, not human testing.
- This file records a **genuine human operator** execution creating `CRM-DEAL-2026-00009`.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing by this record.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## 5. UI-02 — Repeat customer / multiple Deals (Human Baseline)

### 5.1 Purpose

Test whether a human operator can work with an existing customer that has multiple Deals and distinguish the relevant existing Deal.

### 5.2 Human baseline

- **Operator:** human / project user
- **System:** FeelJapanK Phase 1 native Frappe CRM pilot
- **Baseline:** unchanged (no remediation)
- **Customer selection:** ABC Travel selected from the Organization filter
- **Evidence:** screenshot showed 8 of 8 ABC Travel Deals

### 5.3 Human Observations (preserved)

#### UI-02-O01 — Finding ABC Travel

User opened Deals and used the Organization dropdown to select ABC Travel, which populated the ABC Travel Deals.

#### UI-02-O02 — Status ordering

User observed that Status options are listed alphabetically and said they should instead follow the operational/pipeline sequence rather than alphabetical ordering.

#### UI-02-O03 — Probability

User encountered the Probability field but was unsure what it represents or how it should be used.

#### UI-02-O04 — Primary Email

User encountered Primary Email in the list/filter context but was unsure what its purpose is in this workflow.

#### UI-02-O05 — Sorting

User observed sorting controls but said there was not enough data/context to meaningfully test sorting.

#### UI-02-O06 — Import/Export

User noticed Import/Export controls but was unsure of their relevance/use in this workflow.

#### UI-02-O07 — Deal inspection

Selecting a Deal returned to the Deal view, but the user expected a more immediately useful summary of the selected Deal.

#### UI-02-O08 — Desired Deal summary

User expected a concise summary showing things such as current status, next action, due date, and other key information before requiring the operator to go through the full details and attachments.

#### UI-02-O09 — Existing Deal rather than new Deal

User understood that the workflow at this point is to work with the existing Deal rather than create another Deal.

#### UI-02-O10 — Deal list ordering

ABC Travel Deals are presented according to Last Modified. User observed that this does not provide the most useful operational sequence.

#### UI-02-O11 — Insufficient Deal-identifying information

User observed that the list does not expose enough immediately useful information to distinguish the Deals by their business context.

#### UI-02-O12 — Low-value list fields

User questioned the usefulness of Annual Revenue in this operational list and also considered Email and Mobile No. unnecessary for this view.

#### UI-02-O13 — Desired operational summary

User expects the list to expose important information such as Deal date, current status, assigned person, and concise current action/context.

#### UI-02-O14 — Status/context detail

User observed that a generic status such as Proposal is insufficient by itself and suggested concise operational context such as waiting for supplier reply or waiting for invoice confirmation.

#### UI-02-O15 — Attention indicators

User suggested visual indicators such as red/yellow/green flags so an operator can immediately see which Deals need attention.

#### UI-02-O16 — New Deal identification

User observed that Last Modified does not tell the operator when a Deal was created or clearly identify which Deal is the new one.

#### UI-02-O17 — Deal date/context

User expects relevant date/context information to be available in the Deal list.

#### UI-02-O18 — Overall list usability

User expects the Deal list to function more like an operational summary/work queue rather than primarily a database-style record list.

### 5.4 Result context

The user was unable to derive sufficient business context from the visible Deal list alone to confidently distinguish the appropriate Deal for a generic new ABC Travel enquiry. This is recorded as a human observation only and is **not** classified as a defect here.

### 5.5 Status

- UI-02 human baseline: **completed**
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**

### 5.6 Distinction from earlier agent-executed UI-02 evidence

- The earlier UI-02 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md` and `docs/evidence/phase1/manual-ui/ui02-deals-list.png`, `ui02-org-deals.png`) was **agent-executed** by an OpenCode/browser agent. It represents **agent evidence**, not human testing.
- This section records the **genuine human operator** UI-02 baseline execution.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## 6. UI-03 — Multiple Contacts (Human Baseline)

### 6.1 Purpose

Test whether a human operator can understand and distinguish multiple Contacts associated with a Deal, including primary/secondary status and the role/context of each Contact.

### 6.2 Human baseline

- **Operator:** human / project user
- **System:** FeelJapanK Phase 1 native Frappe CRM pilot
- **Baseline:** unchanged (no remediation)
- **Deal inspected:** `CRM-DEAL-2026-00007` (do not modify or delete)
- **Organization shown:** ABC Travel
- **Contacts shown:** Ahmad and Siti

### 6.3 Human Observations (preserved)

#### UI-03-O01 — Contacts identifiable by name

Ahmad and Siti are visibly associated with the Deal.

#### UI-03-O02 — Primary status

Ahmad is explicitly marked Primary. Siti does not have an equivalent role/status shown.

#### UI-03-O03 — Contact context missing

The Deal does not tell the operator who Ahmad or Siti are in relation to the customer/request.

#### UI-03-O04 — Contact role missing

There is no immediately visible role/context explaining what each Contact represents.

#### UI-03-O05 — No Details Added

Both Contacts display "No Details Added", providing no additional contextual information.

#### UI-03-O06 — Activity ambiguity

The Activity entry says "Pilot Operator created this deal" but does not explain what the Deal itself represents.

#### UI-03-O07 — Overall Deal ambiguity

The human operator could not readily understand who the Contacts are, why they are associated with the Deal, or what the Deal is about.

### 6.4 Operator reaction (preserved)

> "I can see Ahmad and Siti in the contact, but it didn't tell me anything. Who is Ahmad? Who is Siti? And what as a contact? What? What? What? Who are they? And it didn't tell me anything. And then if you look at the activity what, we got a pilot operator created this deal. What deal? I mean, this is still ambiguous."

### 6.5 Status

- UI-03 human baseline: **completed**
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**

### 6.6 Distinction from earlier agent-executed UI-03 evidence

- The earlier UI-03 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md` and `docs/evidence/phase1/manual-ui/ui03-contacts-expanded.png`, `ui03-deal00007.png`, `ui03-request-summary.png`) was **agent-executed** by an OpenCode/browser agent. It represents **agent evidence**, not human testing.
- This section records the **genuine human operator** UI-03 baseline execution.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## 7. UI-04 — Ambiguous inbound enquiry (Human Baseline)

### 7.1 Purpose

Test whether a human operator can identify the correct existing Deal for an inbound enquiry when the sender is known but the message does not identify which request/trip/stream it concerns.

### 7.2 Scenario

An inbound message is received from Ahmad:

> "Hi, we'd like to make some changes to our trip. Can you help?"

The operator knows Ahmad is associated with the customer, but the message does not identify which existing Deal/request/trip it concerns.

### 7.3 Human baseline execution

The operator opened CRM and naturally expected to search for Ahmad first to find the relevant Deal.

### 7.4 Human Observations (preserved)

#### UI-04-O01 — Contact-first search expectation

User's natural first action for an inbound message from Ahmad would be to search for Ahmad in CRM to find the relevant Deal.

#### UI-04-O02 — No apparent Contact search path

User could not identify where to search for Ahmad from the CRM interface.

#### UI-04-O03 — Deal list search limitation

In the Deals area, the user could not use Ahmad as a way to identify the relevant Deal. The available Deal-list filtering appeared oriented around Organization and Status.

#### UI-04-O04 — Ambiguous Deal remains unresolved

Because the inbound message did not identify which request/trip/stream it concerned, the user could not determine the correct existing Deal.

#### UI-04-O05 — Appropriate stopping point

The user stopped rather than arbitrarily attaching the enquiry to a Deal or creating a new Deal.

### 7.5 Operator account (preserved)

> "I open up the CRM. So I receive a message from Ahmad. For me, if I want to, I've received a message from Ahmad, I would just search Ahmad in our CRM to find the deal. But I cannot see where can I do that. I don't know because I don't know. I cannot find. I cannot use Ahmad as a way to search. And then because they don't identify which stream. So if we go to the deal tab, and then there's no listing that Ahmad is in here because the tabulated one is that I can find the organization using status. I don't know. That's all."

### 7.6 Status

- UI-04 human baseline: **completed**
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**

### 7.7 Distinction from earlier agent-executed UI-04 evidence

- The earlier UI-04 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md`, recorded against the Deals list) was **agent-executed** by an OpenCode/browser agent. It represents **agent evidence**, not human testing.
- This section records the **genuine human operator** UI-04 baseline execution.
- No Contact→Deal relationship was inferred or invented here; none was visible to the operator.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## 8. UI-05 — Amend existing Deal / preserve history (Human Baseline)

### 8.1 Purpose

Test whether a human operator can understand the current state of an existing Deal, amend its requirement, and retain a clear history of what changed.

### 8.2 Deal inspected

- `CRM-DEAL-2026-00005` (do not modify or delete)

### 8.3 Important baseline outcome

The operator did **not** amend the Deal because the interface did not provide enough confidence about the current requirement/state to make a safe amendment. No amendment or new requirement was fabricated.

Any illustrative example of the type of current-state information that would be needed (for example, a change such as 20% → 18%) was used only to describe the information gap; **no such amendment was performed**.

### 8.4 Human Observations (preserved)

#### UI-05-O01 — Deal number not visible in list

The operator observed that Deal 00005 cannot be identified directly from the Deal list because the Deal number is embedded/not displayed in the list and becomes visible after opening the Deal. The operator had difficulty locating the requested Deal number from the list.

#### UI-05-O02 — Activity dates lack timestamps

Activity/history entries are dated but do not show a time-of-day timestamp. The operator observed that if multiple amendments occur on the same day, date-only entries would not clearly establish their sequence.

#### UI-05-O03 — Current Deal state not sufficiently visible

Before making an amendment, the operator expected to see the current Deal requirement/state clearly so that the change could be understood against the existing value. The operator did not find a clear summary showing the current value to be amended.

#### UI-05-O04 — No clear amendment/revision action

The operator did not find an obvious action or workflow indicating that the Deal was being revised or amended. The visible navigation consisted of areas such as Activity, Emails, Comments, Data, Calls, Tasks, Notes, and Attachments.

#### UI-05-O05 — Data/Deal information did not establish the current requirement

The operator inspected the available Deal information but could not confidently determine the current requirement/state that should be amended.

#### UI-05-O06 — Amendment not performed

Because the operator could not confidently establish the current state and intended amendment, no Deal change was made.

### 8.5 Operator account (preserved)

> "First thing I would like to tell you, you asked me to go with deal number zero zero five. But the thing is, you cannot find deal zero zero five from the display. It's embedded inside the system, and then you have to open the deal, and then only then will you see what's the numbering there."

> "It just said that 26th of September, and then the later on 30th of September. Also this one is 26th of September. So yeah, it should be timestamp."

> "There is no display of what is the deal summary. So if I want to amend something, I need to know what's the current status of the deal itself."

> "And then there's no, like, a clear way to say that revise the deal or something like that."

> "So if I go to for the data, I'm not this is the one. Yeah, it didn't tell me anything about the deal itself. So I didn't change anything."

### 8.6 Status

- UI-05 human baseline: **partially testable / stopped before amendment**
- Reason: operator could not confidently establish the current Deal requirement/state and therefore did not make an unsafe or arbitrary change
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**
- `CRM-DEAL-2026-00005`: **unchanged**

### 8.7 Distinction from earlier agent-executed UI-05 evidence

- The earlier UI-05 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md` and `docs/evidence/phase1/manual-ui/ui05-deal00005-activity.png`) was **agent-executed** by an OpenCode/browser agent (the agent amended `CRM-DEAL-2026-00005`). It represents **agent evidence**, not human testing.
- This section records the **genuine human operator** UI-05 baseline execution, in which no amendment was performed.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## 9. UI-06 — Distinct new request from the same customer (Human Baseline)

### 9.1 Purpose

Test whether a human operator can initiate a genuinely new request from an existing customer as a distinct new Deal without confusing it with an existing Deal.

### 9.2 Human baseline

The operator considered a new request from ABC Travel and inspected the Create Deal workflow **without creating a new CRM record**.

### 9.3 Human Observations (preserved)

#### UI-06-O01 — Create action is context-insensitive

Whether starting from the general Deals tab or from an ABC Travel Deal list, clicking Create sends the operator to the same Create Deal flow.

#### UI-06-O02 — New-vs-existing intent is not explicit

The interface does not clearly tell the operator that this action is creating a new Deal for ABC Travel.

#### UI-06-O03 — Existing Organization selection

The operator can choose an existing Organization such as ABC Travel, but this still feels like starting a generic creation process rather than clearly creating a distinct new Deal/request.

#### UI-06-O04 — Creation flow resembles Company creation

The operator experienced the flow as being more like creating a company/customer record than clearly creating a new Deal/request.

#### UI-06-O05 — Existing Contact ambiguity

The interface offers choosing an existing Contact, but the operator did not understand why selecting an existing Contact is necessary to create a Deal.

#### UI-06-O06 — New request separation unclear

The interface does not clearly communicate how a new request from an existing customer becomes a distinct Deal while preserving the customer's existing Deals.

### 9.4 Operator account (preserved)

> "No matter where you are from, if you just like you are in the deal tab, whether you are creating a new deal or you are in like a ABC Travel deal list listing, when you click the create button, it will automatically send you to the create deal button, the create deal page."

> "It didn't tell you, yes, you are creating a new deal for ABC. You have to do it like a brand new one."

> "You can click toggle the choose existing organization. So you can choose that organization, like ABC Travel."

> "It's not like creating a deal. It's more like creating a company."

> "You can either you can choose existing organization or existing contact. I'm not how to do it too. Why you have to choose existing contact to make a deal."

The operator's question about why an existing Contact is required is preserved as a **human usability observation**; it is not answered here.

### 9.5 Status

- UI-06 human baseline: **completed / inspected without record creation**
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**
- No new Deal was created during this test (no Deal ID applies).

### 9.6 Distinction from earlier agent-executed UI-06 evidence

- The earlier UI-06 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md`, where the agent used Deal `CRM-DEAL-2026-00007` for the distinct Osaka request) was **agent-executed** by an OpenCode/browser agent. It represents **agent evidence**, not human testing.
- This section records the **genuine human operator** UI-06 baseline execution, in which no record was created.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## 10. UI-07 — Deal comprehension / summary, history and sections (Human Baseline)

### 10.1 Purpose

Test whether a human operator can comprehend an existing Deal — what it is about, where it stands, and its history — from the summary, Activity, Comments, Notes, Tasks and related sections.

### 10.2 Human baseline

- **Operator:** human / project user
- **System:** FeelJapanK Phase 1 native Frappe CRM pilot
- **Baseline:** unchanged (no remediation)
- **Deal inspected:** `CRM-DEAL-2026-00005` (do not modify or delete)

### 10.3 Human Observations (preserved)

#### UI-07-O01 — Missing Deal summary

When opening an ABC Travel Deal, the first view should immediately explain what this particular Deal is about, especially because ABC Travel has many Deals. The title/summary should identify the actual trip/request, e.g. destination, duration, dates and other identifying context.

#### UI-07-O02 — Expected summary content

The main Deal summary should show, where known: what/trip the Deal concerns, date, number of people, who it is for, transportation requirement, accommodation requirement, other requirements, and current Deal/pipeline status.

#### UI-07-O03 — Pipeline status

The operator should immediately know where the Deal is in its progression, such as proposal, payment, won/lost, etc.

#### UI-07-O04 — Activity as history

Activity is understood primarily as the chronological history/progress of the Deal: when it was created, who requested it, what happened subsequently, and progress over time.

#### UI-07-O05 — Email

Email integration may be useful in future, but implemented email integration was not tested.

#### UI-07-O06 — Comment vs Note unclear

The operator could not clearly distinguish the intended purpose of Comments versus Notes and questioned what a comment such as "customer written confirmation received" is supposed to represent and how it differs from a note.

#### UI-07-O07 — Important information buried in comments

Examples such as customer confirmation received, group size amended from 20 to 24, and the reason for amendment may contain important Deal history/context, but the operator would not expect users to read through all comments to understand the current Deal state. Important information should be summarized.

#### UI-07-O08 — Data tab not meaningful

Fields such as Organization/website, Territory and Annual Revenue did not appear useful for understanding this Deal. The operator questioned why these fields are present in the Deal context and what they contribute operationally.

#### UI-07-O09 — Call

The Call section is present, but its usefulness/workflow was not explored in this test. The operator indicated that how Calls should be handled/integrated will be addressed in the future.

#### UI-07-O10 — Task

The operator understood the Task area as potentially useful for follow-up work and expressed a preference for tasks to be automated where possible. The operator also expects relevant task information to appear in the main Deal summary so the user does not have to open the Task section separately.

#### UI-07-O11 — Notes

The operator was unclear about the intended purpose of Notes and said Notes should be meaningfully used rather than becoming a place to dump information into the database.

#### UI-07-O12 — Attachments

Attachment behaviour was not tested. The operator wants to establish what kinds of inputs can be attached and how those attachments are subsequently used.

### 10.4 Additional record notes

- No Deal data was changed during this inspection.
- No new Deal was created.
- There was no Cost observation in UI-07; O09 is specifically about Call.
- These are human observations only and are not yet classified as defects or remediation items.

### 10.5 Status

- UI-07 human baseline: **completed / inspected without record change**
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**

### 10.6 Distinction from earlier agent-executed UI-07 evidence

- The earlier UI-07 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md` and `docs/evidence/phase1/manual-ui/ui07-comments.png`, `ui07-tasks.png`) was **agent-executed** by an OpenCode/browser agent. It represents **agent evidence**, not human testing.
- This section records the **genuine human operator** UI-07 baseline execution, in which no record was changed.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## 11. UI-08 — Customer confirmation / RFQ readiness (Human Baseline)

### 11.1 Purpose

Test whether a human operator can determine whether a Deal is ready to proceed to RFQ, and can compile the required details for a supplier RFQ from the Deal.

### 11.2 Human baseline

- **Operator:** human / project user
- **System:** FeelJapanK Phase 1 native Frappe CRM pilot
- **Baseline:** unchanged (no remediation)
- **Deal inspected:** `CRM-DEAL-2026-00005` (do not modify or delete)

### 11.3 Human Observations (preserved)

#### UI-08-O01 — Cannot establish Deal/RFQ readiness

The operator was not confident about the Deal state and could not determine whether the Deal was ready to proceed to RFQ. The current CRM view did not provide enough information to establish readiness.

#### UI-08-O02 — Missing readiness/checklist

The operator expects a template checklist for the Deal that shows what information is still missing and what needs to be obtained from the customer. The checklist should help determine whether the Deal is ready for RFQ.

#### UI-08-O03 — Requested/quoted/confirmed information is unclear

The current CRM did not clearly show what was requested by the customer, what was quoted/proposed, and what was subsequently confirmed.

#### UI-08-O04 — Confirmation lacks context

If a customer says that they confirm the Deal, the CRM should make clear exactly what is being confirmed. The operator could not determine from the current CRM what a customer confirmation would refer to.

#### UI-08-O05 — RFQ cannot be meaningfully initiated

Because the requested requirements, quoted/proposed information, and confirmed scope were not sufficiently visible, the operator did not know what should be sent/requested for RFQ.

#### UI-08-O06 — Supplier RFQ should be compiled from the Deal

Once a Deal is ready for RFQ, the system should tabulate/compile all required details from the Deal for sending to the supplier. The operator should not need to search through CRM records again and manually reconstruct the required supplier information.

#### UI-08-O07 — Appropriate stopping point

The operator did not proceed with an RFQ because the current CRM did not establish what the Deal contained or whether it was ready. No RFQ or confirmation was fabricated or created merely to force completion of the test.

### 11.4 Additional record notes

- No CRM data was changed during UI-08.
- No new Deal was created.
- No RFQ was created or sent.
- These are human observations only and are not yet classified as defects or remediation items.

### 11.5 Status

- UI-08 human baseline: **completed / stopped before RFQ**
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**

### 11.6 Distinction from earlier agent-executed UI-08 evidence

- The earlier UI-08 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md` and `docs/evidence/phase1/manual-ui/ui08-ui09-rfq-negotiation.png`) was **agent-executed** by an OpenCode/browser agent. It represents **agent evidence**, not human testing.
- This section records the **genuine human operator** UI-08 baseline execution, in which no RFQ was created or sent.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## 12. UI-09 — Quotation negotiation / revision (Human Baseline)

### 12.1 Purpose

Test whether a human operator can, against the current Deal state, understand an existing quotation/proposal and handle a customer request for amendment/clarification or a quotation revision.

### 12.2 Human baseline

- **Operator:** human / project user
- **System:** FeelJapanK Phase 1 native Frappe CRM pilot
- **Baseline:** unchanged (no remediation)
- **Deal inspected:** `CRM-DEAL-2026-00005` (do not modify or delete)

### 12.3 Human Observations (preserved)

#### UI-09-O01 — Deal context cannot be established

When opening Deal `CRM-DEAL-2026-00005`, the operator could not determine what the Deal was about. The system did not provide enough information to understand the underlying request.

#### UI-09-O02 — Current request cannot be established

The operator could not determine what had been requested in the Deal.

#### UI-09-O03 — Current status cannot be established

The operator could not determine the current status/progress of the Deal.

#### UI-09-O04 — Amendment/clarification cannot be handled confidently

If a client subsequently asks for an amendment or clarification, the operator does not believe the required information can be obtained from the current Deal view.

#### UI-09-O05 — Quotation revision scenario could not meaningfully proceed

Because the Deal's underlying request and current status were not sufficiently clear, the operator could not meaningfully establish what the original quotation/proposal was or what should be amended. No fictional quotation or revision was created to force completion of the test.

### 12.4 Operator account (preserved)

> "By opening the deal, like 005, I don't know what the deal is all about. The system didn't tell me anything, so I didn't know what's being requested and what's the current status of it. So if a client come to me and say that they need any amendment or any clarification, I don't think I can get it from here."

### 12.5 Additional record notes

- No CRM data was changed during UI-09.
- No quotation was created.
- No quotation revision was created.
- No customer amendment was fabricated.
- These are human observations only and are not yet classified as defects or remediation items.

### 12.6 Status

- UI-09 human baseline: **completed / could not meaningfully proceed**
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**

### 12.7 Distinction from earlier agent-executed UI-09 evidence

- The earlier UI-09 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md` and `docs/evidence/phase1/manual-ui/ui08-ui09-rfq-negotiation.png`) was **agent-executed** by an OpenCode/browser agent. It represents **agent evidence**, not human testing.
- This section records the **genuine human operator** UI-09 baseline execution, in which no quotation or revision was created.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## 13. UI-10 — Fresh-operator comprehension (Human Baseline)

### 13.1 Purpose

Test whether a new/fresh operator can understand what to do in the CRM interface without prior explanation: whether the interface is self-explanatory, and whether its main areas communicate their purpose and context.

### 13.2 Human baseline

- **Operator:** human / project user (fresh-operator comprehension)
- **System:** FeelJapanK Phase 1 native Frappe CRM pilot
- **Baseline:** unchanged (no remediation)

### 13.3 Human Observations (preserved)

#### UI-10-O01 — Fresh-operator comprehension

The operator's answer to whether the CRM interface allows a new operator to understand what to do without prior explanation is **"No."**

#### UI-10-O02 — Dashboard purpose unclear

The dashboard does not make its purpose clear. The operator could not tell whether it is intended to show the current status of the company/work.

#### UI-10-O03 — Little workflow guidance

The interface largely assumes that the user already knows how the system is intended to work.

#### UI-10-O04 — Notifications unclear

The notification area did not provide useful guidance during this test.

#### UI-10-O05 — Leads unclear

The operator did not understand what the Lead section is for. It was not tested because Phase 1 has been focused on Deals.

#### UI-10-O06 — Deal list insufficiently informative

Selecting Deals allows organization and status filtering, but the tabulated Deal display does not provide enough information to understand or distinguish the Deals.

#### UI-10-O07 — Contact list lacks relationship/context

Contacts show basic fields such as email, phone, organization and last modified, but do not explain who the person is, their role, or their relationship to the customer/Deal.

#### UI-10-O08 — Contact identity/context

The operator again questioned who Ahmad and Siti are and what their relationship/role is in relation to ABC Travel and the Deal.

#### UI-10-O09 — Organization information insufficient

ABC Travel can be opened from Organizations, but the displayed company information was not considered sufficiently informative.

#### UI-10-O10 — Deal archive/history

The operator expects settled Deals, including won/lost Deals, to be separated from the current active Deal list while remaining available as historical reference.

#### UI-10-O11 — Notes on main section unclear

The Notes area contains multiple notes with the same title, "request summary." The operator questioned what each request summary refers to and how multiple notes could be distinguished.

#### UI-10-O12 — Notes need differentiation/search

The operator expects note titles/content to distinguish individual notes and suggested a way to search notes.

#### UI-10-O13 — Notes placement unclear

The operator questioned whether Notes should be presented as a global/main section or instead be associated within the relevant Deal or Organization.

#### UI-10-O14 — Tasks understood

The Tasks section was comparatively understandable as a consolidated view of current tasks.

#### UI-10-O15 — Task list information

The operator expects the task list to show useful operational fields such as priority, due date and status.

### 13.4 Operator account (preserved in substance)

- "the answer is NO".
- the dashboard does not help and assumes the user knows how it works;
- uncertainty about what the dashboard should show;
- the Deal list being insufficiently informative;
- uncertainty about who Ahmad and Siti are;
- the expectation that settled/won/lost Deals should be archived but retained for history/reference;
- concern that multiple Notes all titled "request summary" are difficult to distinguish;
- uncertainty about whether Notes belong in the global/main section or within the relevant Deal/Organization;
- understanding that Tasks should show current tasks with priority, due dates and status.

### 13.5 Scope notes

- Leads were not tested because Phase 1 has focused on Deals.
- Notifications were not substantively tested.
- The operator's observations about Notes are expectations/questions, not implementation decisions.
- None of these observations are classified here as defects or remediation items.

### 13.6 Status

- UI-10 human baseline: **completed**
- Assessment/classification: **pending Phase 1D**
- Remediation: **none**

### 13.7 Distinction from earlier agent-executed UI-10 evidence

- The earlier UI-10 evidence (in `docs/operations/FeelJapanK-Phase1-Pilot-Test-Results-v0.1.md`, the agent's cold comprehension pass answered from `ui05`/`ui07`/`ui08`) was **agent-executed** by an OpenCode/browser agent. It represents **agent evidence**, not human testing.
- This section records the **genuine human operator** UI-10 baseline execution.
- The earlier agent evidence is **not overwritten, altered, or relabelled** as human testing.
- The two must remain separately identifiable: **agent evidence ≠ human UAT**.

---

## Governance / Safety Statement

This preservation performed no modification to the CRM application, configuration, DocTypes, schema, database data, permissions, code, or UI. No Deal, Contact, Organization, or other CRM record was created, modified, attached, or deleted. No new Deal, Note, Task, quotation, RFQ, or other CRM record was created. No remediation was performed. UI-10 is the last workflow in the defined matrix; no further UI test was begun. No commit or push was made.
