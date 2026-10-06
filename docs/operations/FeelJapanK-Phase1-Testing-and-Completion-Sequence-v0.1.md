# FeelJapanK Phase 1 — Testing and Completion Sequence

**Status:** PROPOSED / PILOT
**Version:** v0.1
**Purpose:** Durable reference for Phase 1 testing, completion assessment, manual testing, and pilot closure.

---

## 1. Purpose

This document defines the mandatory sequence for validating the FeelJapanK Phase 1 native Frappe CRM pilot.

Its purpose is to prevent the project from:

* skipping required manual UI testing;
* declaring Phase 1 complete based only on automated/API testing;
* jumping directly from test scenarios to the real operational pilot;
* inventing additional sequential scenarios merely to continue testing;
* introducing customization or automation without evidence of a genuine Phase 1 gap.

This document is a process-control reference for future planning and implementation.

---

# 2. Mandatory Phase 1 Testing Sequence

The required sequence is:

**Phase 1A — Automated/API Pilot Scenarios**
↓
**Phase 1B — Phase 1 Completion Assessment (PLAN)**
↓
**Phase 1C — Manual UI Testing**
↓
**Phase 1D — Manual Testing Assessment**
↓
**Phase 1E — Targeted Remediation, if justified**
↓
**Phase 1F — Phase 1 Pilot Closure / Freeze**
↓
**Phase 1G — Real Operational Pilot**

No phase may be silently skipped.

---

# 3. Phase 1A — Automated/API Pilot Validation

The executed pilot scenarios A–L constitute the automated/API validation layer.

This layer establishes whether the underlying CRM model and workflow behavior operate correctly at the data/API level.

The completed scenarios include, among others:

* new enquiry and Deal creation;
* component capture;
* existing Deal amendment;
* distinct new Deal;
* ambiguous communication requiring human resolution;
* customer confirmation;
* quotation preparation and negotiation/revision;
* repeat-customer / multiple-Contact / multiple-Deal representation.

The completion of A–L does **not** by itself constitute final Phase 1 completion.

---

# 4. Phase 1B — Phase 1 Completion Assessment

After the automated/API scenarios are complete, a dedicated **Phase 1 Completion Assessment — PLAN** must be performed.

This assessment is read-only.

Its purpose is to determine:

1. Which Phase 1 workflows have been validated;
2. Which Phase 1 requirements remain untested;
3. Whether any genuine testing gaps remain;
4. Which limitations are accepted native Frappe CRM limitations;
5. Which capabilities are explicitly deferred;
6. Whether the automated/API evidence is sufficient to define the manual UI test scope;
7. What must be tested manually through the actual Frappe CRM interface.

The assessment must not invent additional scenarios because the existing sequence ends at L.

If a genuine untested requirement is identified, the assessment may recommend a specific additional test.

If no genuine gap exists, no additional scenario should be invented.

---

# 5. Phase 1C — Mandatory Manual UI Testing

**Manual UI testing is mandatory.**

It must occur **after the automated/API validation and completion assessment, but before Phase 1 is declared complete or the real operational pilot begins.**

Manual testing must use the actual Frappe CRM user interface.

The purpose is not merely to reproduce API assertions.

It must establish whether an actual operator can perform and understand the Phase 1 workflow through the UI.

Manual testing should cover, as applicable:

* creating a new enquiry/Deal;
* searching for and selecting the correct existing customer;
* handling repeat customers with multiple Deals;
* handling multiple Contacts on a Deal;
* identifying the correct Deal for a communication;
* recognizing an ambiguous communication;
* stopping and requesting clarification when Deal identity is ambiguous;
* maintaining Request Summary;
* recording dated Comments;
* maintaining Task follow-up;
* understanding and using `next_step`;
* marking Ready for Quotation appropriately;
* handling customer confirmation;
* handling quotation preparation and revision;
* handling amendments to an existing Deal;
* distinguishing an amendment from a genuinely new Deal;
* navigating Deal history;
* maintaining the intended human-in-the-loop workflow.

The manual test must evaluate **operator usability and workflow clarity**, not just database correctness.

---

# 6. Phase 1D — Manual Testing Assessment

After manual UI testing, a separate assessment must determine the outcome.

Findings should be classified as:

### A — PASS / Validated

The workflow operates correctly and is understandable through the UI.

### B — Accepted Native Limitation

The behavior is a limitation of the native CRM but is acceptable for Phase 1 and covered by an operating convention.

### C — Explicitly Deferred

The capability is intentionally outside Phase 1.

Examples include:

* automated WhatsApp routing;
* AI extraction;
* transcription;
* automatic Deal creation;
* automatic Deal assignment;
* automated communication classification;
* structured quotation automation;
* future Trip/Operations integration;
* P01 integration.

### D — Genuine Phase 1 Gap / Defect

A real requirement or defect remains that prevents the intended Phase 1 workflow from operating correctly.

Only this category automatically justifies further implementation planning.

---

# 7. Phase 1E — Targeted Remediation

If genuine gaps or defects are identified, remediation must follow the project's normal governance:

**PLAN → REVIEW → APPROVE/FREEZE → BUILD → VERIFY → EVIDENCE → FREEZE**

No customization should be introduced merely because a native CRM feature is imperfect.

Any proposed change must identify:

* the actual validated problem;
* why it matters to Phase 1;
* the smallest permitted change;
* affected native CRM behavior;
* regression implications;
* verification criteria.

If no genuine Phase 1 gap exists, remediation should not be created merely to continue development.

---

# 8. Phase 1F — Pilot Closure / Freeze

Phase 1 may be considered ready for closure only after:

1. Automated/API validation is complete;
2. Phase 1 Completion Assessment is complete;
3. Required manual UI testing is complete;
4. Manual Testing Assessment is complete;
5. Genuine defects, if any, have been resolved and verified;
6. Accepted native limitations are documented;
7. Deferred capabilities are documented;
8. The Phase 1 operating convention is reviewed and frozen where appropriate;
9. Evidence is preserved.

At this point, the project should stop treating the native CRM pilot as an open-ended sequence of test scenarios.

---

# 9. Phase 1G — Real Operational Pilot

Only after the above testing and closure gates are satisfied should the project proceed to the real operational pilot.

Current target:

**15–25 enquiries over 4–6 weeks.**

The purpose of this stage is different from automated/API and manual testing.

The real pilot should determine whether the workflow remains practical under real operating conditions.

Evidence should include observations about:

* Deal identification;
* repeat-customer handling;
* multiple Contacts;
* Request Summary maintenance;
* Task follow-up;
* `next_step`;
* quotation negotiation;
* operator usability;
* information repeatedly missing from enquiries;
* limitations that become operationally significant;
* whether deferred automation/customization is justified.

Real operational evidence should drive future Phase 2 decisions.

---

# 10. Scenario Numbering Rule

There is **no predefined Scenario M**.

The completed sequence ending at Scenario L does not imply that Scenario M must exist.

Additional scenarios may be introduced only when a genuine untested requirement or gap is identified.

The correct decision process is:

**A–L complete**
→ **Completion Assessment**
→ determine whether an actual gap exists
→ create a targeted scenario only if justified.

Do not create sequential scenarios to extend the test series.

---

# 11. Non-Negotiable Control

The following sequence must not be bypassed:

> **Automated/API testing → Completion Assessment → Manual UI testing → Manual Testing Assessment → Remediation if justified → Phase 1 Closure → Real Operational Pilot**

In particular:

> **Automated/API PASS does not equal Phase 1 complete.**

Manual UI testing is a required validation layer.

Likewise:

> **Completion Assessment does not automatically mean "build more."**

Its purpose is to determine what, if anything, remains to be proven.

---

# 12. Future Planning Rule

When continuing this project in a new conversation or with a new planning session, this document must be treated as the reference sequence.

Planning must not:

* skip manual UI testing;
* declare Phase 1 complete immediately after A–L;
* jump directly to the real operational pilot;
* invent Scenario M/N/etc. without a demonstrated requirement;
* introduce automation/customization merely because it could be useful.

The next stage must always be determined from the evidence produced by the preceding stage.
