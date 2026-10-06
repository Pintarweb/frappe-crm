# FeelJapanK Phase 1 — N1 Human Acceptance Test Sheet — v0.1

**Document status:** PREPARED HUMAN-ACCEPTANCE TEST SHEET (not yet executed)
**Nature:** operational questions for genuine human acceptance of the N1 Stage 1 presentation. This sheet is **not** evidence yet; operator observations, when captured, must be recorded verbatim in a separate human-acceptance evidence document.
**Workspace:** FeelJapanK workspace (`/app/fjk-workspace?deal=<Deal ID>`), opened as the genuine human/operator acceptance account **Yus.Claimflow** (`yus.claimflow@gmail.com`).

> Context for the operator: these are test Deals only (`N1 TEST - ...`). Please judge the workspace as a daily-use operator, not as a developer. There are no right/wrong answers.
>
> Numeric-formatting regression check (already remediated and separately verified): the earlier presentation defect where numeric passenger fields rendered as `Yes`/`No` has been fixed. While in **Full Details → Deal / Customer Context**, please confirm it does not recur (e.g. `Infants`, `Children`, adults show numbers, not `Yes`/`No`). No action needed unless it reappears.

---

## Recommended acceptance set (5 Deals)

| Order | Deal ID | Scenario | Why selected |
|---|---|---|---|
| 1 | `CRM-DEAL-2026-00011` | N1-A Rich / Full Package | Maximum Summary + Full Details content |
| 2 | `CRM-DEAL-2026-00017` | N1-G Information Complete | Positive transition; Supplier Quotation active |
| 3 | `CRM-DEAL-2026-00015` | N1-E Information incomplete | Outstanding / readiness / Supplier Quotation inactive |
| 4 | `CRM-DEAL-2026-00013` | N1-C Transportation only | Single-component scope, empty categories |
| 5 | `CRM-DEAL-2026-00019` | N1-I Minimal | Sparse Deal; robustness |

This set covers: rich vs sparse, multi- vs single-component, incomplete vs complete, inactive vs active Supplier Quotation, and activities/guide-rich vs transport-only (via the rich record). Technical verification additionally covered N1-B/D/F/H/J.

---

## Questions (per Deal)

### Summary
1. Do you immediately understand what this Deal is about?
2. Is the company obvious?
3. Are the destination, dates, duration and passengers easy to understand?
4. Is the requested scope clear (what we are arranging)?
5. Can you understand the current state and the next action?
6. Can you see what information still needs attention?

### Full Details
7. Does this feel like the complete specification of the Deal?
8. Are the business categories logical?
9. Can you find the information you need without feeling like you are reading a database dump?
10. Is anything important difficult to find?

### Information Status
11. Is it clear what has been collected?
12. Is it clear what remains to be confirmed or is missing?
13. Is it clear whether the Deal is ready to proceed?

### Supplier Quotation
14. When inactive, is it obvious why?
15. When active (N1-G), is the transition understandable?
16. Does the tab's behaviour make sense without implying functionality that does not yet exist?

### Overall
17. Could you operate this Deal confidently?
18. What, if anything, confused you?
19. What would you change?

---

## Recording instructions

- Capture the operator's answers **verbatim**, per Deal and per question.
- Do **not** reinterpret, summarise into technical conclusions, or classify findings as defects at capture time. Classification belongs to a separate assessment stage.
- Distinguish these observations from automated/browser-agent/technical verification.
- Store the captured observations as a new additive human-acceptance evidence document; do not modify this sheet or prior evidence.

*Prepared via OpenCode session on 2026-10-02.*
