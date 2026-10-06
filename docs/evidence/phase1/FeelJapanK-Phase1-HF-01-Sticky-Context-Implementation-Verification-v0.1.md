# FeelJapanK Phase 1 — HF-01 Sticky Context Implementation & Verification — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-01-Sticky-Context-Implementation-Verification-v0.1 |
| Document status | IMPLEMENTED + TECHNICALLY VERIFIED (presentation-only). Human acceptance **not** claimed. |
| Date | 2026-10-04 |
| Authoritative plan | `docs/evidence/phase1/FeelJapanK-Phase1-HF-01-Sticky-Context-Refinement-Plan-v0.1.md` |
| Repository | `/home/yusmarin/frappe-crm` |

> Technical verification only. This document does **not** claim human acceptance; the operator must re-check HF-01 separately.

---

## 1. Exact change

Single CSS declaration in the existing `.fjk-sticky` rule (`App.vue`):

```diff
 .fjk-sticky {
   position: sticky;
-  top: var(--navbar-height, 0px);
+  top: calc(var(--navbar-height, 0px) + var(--page-head-height, 60px));
   z-index: 6;
   background: var(--fg-color, #ffffff);
   padding-bottom: 0.5rem;
   border-bottom: 1px solid var(--border-color, #e5e7eb);
 }
```

This offsets the Deal sticky context below the Frappe Desk `.page-head` (which contains "FeelJapanK Workspace"), so the Workspace header remains visible above it. **No** DOM change, no duplicated header, no route/navigation change, no z-index workaround.

Before → after (CSS `top`): one line only (`diff -u` against the rollback copy shows exactly one changed line).

## 2. Files changed

| File | Change |
|---|---|
| `bench/apps/feeljapank_crm/frontend/src/App.vue` | 1 CSS line in `.fjk-sticky` |
| `bench/apps/feeljapank_crm/feeljapank_crm/public/dist/feeljapank.js` | Rebuilt |
| `bench/apps/feeljapank_crm/feeljapank_crm/public/dist/feeljapank.css` | Rebuilt |
| `bench/apps/feeljapank_crm/feeljapank_crm/public/dist/feeljapank.js.map` | Rebuilt |
| `docs/evidence/phase1/FeelJapanK-Phase1-HF-01-Sticky-Context-Implementation-Verification-v0.1.md` | New (this document) |

(`bench/` is gitignored in the outer repository.)

## 3. Build result

`npm run build` (vite, inside `crm-frappe-1`):

```
vite v8.3.1 building client environment for production...
✓ 643 modules transformed.
../feeljapank_crm/public/dist/feeljapank.css  5,029.81 kB │ gzip: 3,424.83 kB
../feeljapank_crm/public/dist/feeljapank.js     378.76 kB │ gzip:   103.19 kB │ map: 1,751.74 kB
✓ built in 2.89s
```

Bundle serving: `feeljapank.js` → **HTTP 200**, `feeljapank.css` → **HTTP 200**.

## 4. Technical verification (backend)

`bench/n1_verify.py` (read-only Layer-1 harness): **120/120 passed**, `failures: []`.

## 5. Browser verification

Authenticated session reused as `yus.claimflow@gmail.com` (no credentials handled); browser relaunched from saved state to bypass the 12h HTTP cache and load the new bundle (`.fjk-sticky` present; computed `top = 108px`).

`CRM-DEAL-2026-00011`, Full Details, scrolled 700px:

| Assertion | Result |
|---|---|
| `.page-head` text | `FeelJapanK Workspace` |
| `.page-head` top / bottom | `48` / `108` (visible) |
| `.fjk-sticky` top | `108` (begins exactly below the Workspace header) |
| Overlap (sticky top < page-head bottom) | `false` |
| Tabs accessible | `Open in CRM`, `Summary`, `Full Details`, `Supplier Quotation` |

Resulting visual hierarchy while scrolling: **Frappe navbar (48)** → **FeelJapanK Workspace (48–108)** → **Deal identity + tabs (from 108)**. Workspace context no longer obscured.

Browser health: no JS/Vue console errors; no unexpected workspace/API failures (no non-2xx). (The pre-existing benign telemetry `boot_config` 417 was the only non-2xx, if present; filtered and unrelated.)

## 6. Regression results

| Deal | HF-03 readiness (Full Details) | HF-12 passengers | HF-04 status classes | DG-7 Supplier |
|---|---|---|---|---|
| 00011 | `Not yet` / `No`, no raw `0/1` | `1 infant`, `2 children` | known/confirm/missing | inactive |
| 00017 | `Yes` / `Yes`, no raw `0/1` | `4 adults` | known/confirm/missing | active placeholder |
| 00015 | `Not yet` / `No`, no raw `0/1` | `8 adults, 2 children` | missing/confirm/known | inactive |
| 00013 | `Not yet` / `No`, no raw `0/1` | `4 adults` | known/confirm/missing | inactive |
| 00019 | `Not yet` / `No`, no raw `0/1` | `—` (zeros) | known/confirm/missing | inactive |
| 00010 (baseline) | `Not yet` / `No`, no raw `0/1` | `16 adults, 2 children` | missing/confirm/known | inactive |

- **HF-03 unchanged** (human-readable readiness; no raw `0/1`).
- **HF-04 unchanged** (status classes/cues/text retained).
- **HF-12 unchanged** (singular/plural correct; zeros preserved).
- DG-1/DG-3/DG-4/DG-5/DG-6, cross-Deal isolation, numeric passengers incl. zeros, boolean presentation, protected baseline `00010`, `FJK-QUO-2026-00001` — unchanged.

## 7. Rollback

- Rollback copy: `/tmp/opencode/fjk-hf01-rollback-1791127757/` (`App.vue` + `dist/`).
- Also the prior A–D rollback: `/tmp/opencode/fjk-rollback-1791126147/`.
- Rollback = restore `App.vue` (revert the one CSS line) and rebuild, or restore the prior bundle.

## 8. Git status

`git status --short` shows only documentation changes (the pre-existing tracked doc modifications dated 2026-09-29 plus untracked `docs/` entries). `git diff --stat` shows only those pre-existing tracked files. The app/bundle changes are under gitignored `bench/`. Nothing staged.

## 9. Commit / push

**No `git add`, no commit, no push were performed.**

---

*Technical verification completed via OpenCode session on 2026-10-04. Human re-acceptance of HF-01 remains a separate operator step.*
