# FeelJapanK — Decision Check Standard

**Project:** FeelJapanK
**Subject:** Mandatory Decision Check for OpenCode PLAN and BUILD work
**Version:** v0.1
**Status:** FROZEN
**Nature:** Governance standard. It authorizes no application code, schema, configuration, WhatsApp, or integration change.

---

## 1. Purpose

Ensure that every meaningful OpenCode PLAN and BUILD checks the project's settled decisions **before** proposing or performing work, and **stops** when it discovers a conflict instead of silently choosing between conflicting rules.

The authoritative index of settled decisions is:

`docs/governance/FeelJapanK-Decision-Register-v0.1-FROZEN.md`

---

## 2. Mandatory Decision Check — PLAN

Before planning, OpenCode MUST:

1. Read the Decision Register.
2. Identify decisions relevant to the requested task.
3. Check the proposed work against FROZEN decisions.
4. Check the relevant authority documents.
5. Detect conflicts.
6. **STOP** if a conflict exists.
7. Report the conflict instead of silently resolving it.
8. Include a Decision Check table in the PLAN output.

Required table (only relevant decisions need be listed):

| Decision ID | Relevant? | Compliance | Notes |
| ----------- | --------- | ---------- | ----- |
| FK-Dxx | Yes/No | PASS/CONFLICT | explanation |

If a task would require changing a FROZEN decision:

- STOP planning the conflicting implementation;
- identify the exact conflict;
- report it;
- request an explicit decision review / controlled revision.

Do **not** resolve the conflict by inventing a new interpretation.

---

## 3. Mandatory Decision Check — BUILD

Before implementation, OpenCode MUST:

1. Confirm the applicable FROZEN decisions.
2. Confirm the approved PLAN respects them.
3. Confirm implementation does not silently change any decision.
4. Confirm no scope expansion has occurred.
5. Confirm no unresolved authority conflict affects the BUILD.
6. STOP and return to PLAN/REVIEW if a conflict appears.
7. If the implementation would require changing a FROZEN decision — do **not** implement it.

BUILD is permitted only after the relevant decision boundary is established and **no unresolved authority conflict exists**.

---

## 4. Conflict Handling

A later conversation statement does **not** silently supersede a FROZEN decision. The only path is:

`STOP → PLAN → REVIEW → explicit decision → controlled revision → FREEZE`

Never silently choose between conflicting business rules. Report the conflict.

---

## 5. Verification

After BUILD, record the Decision Check outcome as evidence (which decisions were relevant, and that the work complies), consistent with the project's `THINK → BUILD → CHECK` and high-risk `PLAN → REVIEW → APPROVE/FREEZE → BUILD → VERIFY → EVIDENCE` processes (Master Plan §3–§4).
