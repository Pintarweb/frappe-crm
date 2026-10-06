# FeelJapanK Phase 1 — HF-01 Sticky Context Refinement Plan — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-01-Sticky-Context-Refinement-Plan-v0.1 |
| Document status | **PLAN — READ-ONLY. Not approved. Not implemented.** |
| Scope | HF-01 only: keep the FeelJapanK Workspace header/context visible above the sticky Deal identity + tabs |
| Nature | Implementation **plan**. Does **not** authorize implementation. |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |

> **This document authorizes planning only. It does not authorize implementation.**

---

## 1. Plan status

`PLAN — READ-ONLY. Not approved. Not implemented.`

## 2. Purpose / required outcome

Human re-acceptance of the A–D presentation increment returned: HF-03 **ACCEPTED**, HF-04 **ACCEPTED**, HF-12 **ACCEPTED**, HF-01 **PARTIAL / NEEDS REFINEMENT**.

Required outcome (HF-01): while scrolling the long Full Details view, the sticky context must present, top-to-bottom:

1. **FeelJapanK Workspace** header/context (not obscured),
2. Deal identity / derived Deal title,
3. Summary / Full Details / Supplier Quotation tabs.

The Workspace context must remain visible when scrolling.

## 3. Governance boundary

Planning only. No code/schema/DB/CRM/config/permission/route/integration change; no build; no commit/push is authorized by this document. Scope is limited to HF-01. HF-03, HF-04, HF-12 are frozen at their accepted behavior and must not change.

## 4. Authoritative sources

- `docs/evidence/phase1/FeelJapanK-Phase1-Presentation-Refinement-Plan-v0.1.md` (A–D plan; HF-01 item A)
- `docs/evidence/phase1/FeelJapanK-Phase1-Presentation-Refinement-Implementation-Verification-v0.1.md` (A–D build/verification)
- `docs/architecture/FeelJapanK-Phase1-Forward-Implementation-Roadmap-v0.1.md` (FROZEN)
- `docs/architecture/FeelJapanK-Phase1-N1-Presentation-Operator-Decisions-v0.1.md` (DG-1, DG-3)

## 5. Human finding in scope

**HF-01 (PARTIAL):** sticky behavior works, but the sticky context begins too low and the **FeelJapanK Workspace** header/context is obscured by the sticky Deal-title area.

## 6. Current implementation inspection (read-only)

Live DOM inspection on `/app/fjk-workspace?deal=CRM-DEAL-2026-00011` (authenticated session):

| Element | Computed state |
|---|---|
| `.page-head` (Desk page header; visible text **"FeelJapanK Workspace"**) | `position: sticky`, `top: 48px`, `z-index: 6`, height `60px` (occupies 48–108px) |
| `.page-content` | `position: static`, top 113px |
| `.fjk-sticky` (App.vue: Deal title + tabs) | `position: sticky`, `top: 48px`, `z-index: 6`, height `120px` |
| Root CSS vars | `--navbar-height: 48px`; `--page-head-height: 60px` |
| Scroll context | window / `document.scrollingElement` (whole page scrolls) |

Current App.vue sticky CSS:

```css
.fjk-sticky {
  position: sticky;
  top: var(--navbar-height, 0px);   /* = 48px */
  z-index: 6;
  background: var(--fg-color, #ffffff);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}
```

The App.vue deal branch does **not** render a "FeelJapanK Workspace" element of its own; that text is the Frappe Desk page header (`.page-head`). The no-deal branch already uses the string "FeelJapanK Workspace" as fallback context.

## 7. Root cause

Two sticky elements share the **same vertical band and z-index**:

- Desk `.page-head` sticks at `top: 48px` (Workspace header, height 60 → 48–108).
- Our `.fjk-sticky` also sticks at `top: 48px` (z-index 6), occupying 48–168.

Because `.fjk-sticky` appears later in the DOM with the **same** `z-index: 6`, it paints on top of `.page-head`, obscuring the **FeelJapanK Workspace** header. The sticky mechanism is correct; only the vertical offset is wrong.

## 8. Proposed change (smallest safe, presentation-only)

Offset the App.vue sticky below the Desk page header so the Workspace context stays visible above it. One CSS declaration in `.fjk-sticky`:

```css
top: calc(var(--navbar-height, 0px) + var(--page-head-height, 60px));
```

(= 48 + 60 = 108px, exactly the `.page-head` bottom). Result while scrolling (top→down): **FeelJapanK Workspace** (`.page-head`, sticky at 48–108) → Deal identity → tabs (`.fjk-sticky`, sticky from 108). Both remain visible; no DOM change, no new element, no route change, no duplication of the Workspace title.

**Deliberately not done:** adding a duplicate "FeelJapanK Workspace" line inside `.fjk-sticky` (would duplicate the Desk header), and raising `.fjk-sticky` z-index above `.page-head` (would still cover the header). No JavaScript; no change to the sticky wrapper structure.

## 9. Global Desk navbar interaction

The Desk navbar is 48px (`--navbar-height`). The Desk `.page-head` already accounts for it (sticky `top: 48px`). Our offset is expressed **relative to** `--navbar-height` plus `--page-head-height`, so the sticky context sits below both the global navbar and the Desk page header. No hardcoded magic number; both offsets use Frappe CSS variables (with safe fallbacks `0px` / `60px`).

## 10. Files expected to change

- `bench/apps/feeljapank_crm/frontend/src/App.vue` (single CSS declaration in the existing `.fjk-sticky` rule).
- Rebuilt `bench/apps/feeljapank_crm/feeljapank_crm/public/dist/feeljapank.{js,css,js.map}`.

(`bench/` is gitignored in the outer repository.)

## 11. Data / schema / API impact

**None.** Pure scoped-CSS change. No DOM, API, backend, schema, DocType, field, permission, route, or integration change. HF-03/04/12 template/logic untouched.

## 12. Regression protection

The change must not alter the accepted A–D behavior:

- **HF-03:** Full Details readiness still `Yes`/`Not yet`/`No` (no raw `0/1`).
- **HF-04:** status badges/cues/text unchanged (MISSING red `!`, TO CONFIRM amber `?`, CUSTOMER-CONFIRMED green `✓`, KNOWN neutral, NOT APPLICABLE muted).
- **HF-12:** `1 infant` / `2 children` unchanged.
- DG-1 derived title + native Deal ID; DG-3 three tabs + Summary default; DG-4 Summary categories; DG-5 scope; DG-6 Information Status; DG-7 Supplier activation; numeric passengers incl. zeros; boolean presentation; cross-Deal isolation; baseline `CRM-DEAL-2026-00010`; `FJK-QUO-2026-00001`.

## 13. Verification plan

1. Rebuild bundle (`npm run build` in `frontend/`); confirm HTTP 200.
2. Backend smoke `bench/n1_verify.py` (expect 120/120).
3. Authenticated browser verification (reuse the operator session; no credentials handled) on `CRM-DEAL-2026-00011`:
   - open Full Details, scroll the window;
   - assert `.page-head` visible with text **"FeelJapanK Workspace"**, `top ≈ 48`, `bottom ≈ 108`;
   - assert `.fjk-sticky` `top ≈ 108` (no overlap with `.page-head`; `overlap = false`);
   - assert Deal title + three tabs remain visible; no global-navbar overlap.
4. Re-check `00017` (Info Complete, Supplier active), `00015` (status hierarchy), `00013` (single scope), `00019` (zeros), `00010` (protected baseline) for no regression.
5. Confirm no JS/Vue console errors and no unexpected API failures.

## 14. Rollback

Keep a pre-build copy of `App.vue` and `public/dist/*`. Rollback = restore the prior `App.vue` (revert the single CSS declaration) and rebuild the bundle, or restore the prior bundle artifacts.

## 15. Approval gate

`PLAN → REVIEW → EXPLICIT APPROVAL → BUILD → VERIFY → HUMAN RE-ACCEPTANCE (HF-01)`.

**This document authorizes planning only. It does not authorize implementation.**

---

*Created via OpenCode session on 2026-10-04. Planning/read-only. No code, schema, database, CRM record, configuration, permission, route, integration, or bundle change; no build; no commit; no push.*
