# FeelJapanK Phase 1 — HF-01 Sticky Context Diagnostic — v0.2

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-01-Sticky-Context-Diagnostic-v0.2 |
| Document status | DIAGNOSIS (read-only). Supersedes v0.1 conclusion. HF-01 human acceptance remains **OPEN**. |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Supersedes | `…HF-01-Sticky-Context-Diagnostic-v0.1.md` |

> No fix implemented. The operator reports the problem persists **after a hard reload**.

---

## 1. Reproduction steps (performed)

1. Authenticated operator session; relaunch from saved state (fresh HTTP cache) and hard-load `/app/fjk-workspace?deal=CRM-DEAL-2026-00011`.
2. Confirm the loaded bundle is the HF-01 build (fingerprint below).
3. Inspect DOM + computed styles at page top, partial scroll, and deep scroll (max `scrollY = 871`; content 1504, viewport 633).
4. Hit-test the top viewport band with `document.elementFromPoint` at deep scroll.
5. Repeat a scroll profile from `scrollY = 0` to `871`.
6. Check for service worker / Cache Storage / resource-cache behaviour.

Screenshot artifact (captured, not machine-viewable in this session): `/tmp/opencode/hf01_v02_deep.png` (68,295 bytes).

## 2. Loaded asset verification

| Asset | URL | Result |
|---|---|---|
| JS | `http://crm.localhost:8000/assets/feeljapank_crm/dist/feeljapank.js` | loaded; `encodedBodySize = 378,760` |
| CSS | `http://crm.localhost:8000/assets/feeljapank_crm/dist/feeljapank.css` | loaded; `encodedBodySize = 5,029,814` (HF-01 build) |

- Served CSS contains the HF-01 rule (`…var(--page-head-height,60px)…`) and the element's computed `top = 108px` confirms it executed.
- **Size fingerprint:** HF-01 CSS = `5,029,814` vs pre-HF-01 (A–D) CSS = `5,029,777`. **JS is `378,760` in both builds — JS size cannot distinguish builds; only the CSS differs.**
- `navigator.serviceWorker.controller` = `false`; `caches.keys()` = `[]` (no SW, no Cache Storage).

## 3. Actual scroll container

No element has `overflow-y: auto|scroll` with overflow. The scroller is the **document/window** (`document.scrollingElement`; `BODY` `clientHeight 633` vs `scrollHeight 1504`). Sticky is therefore evaluated against the viewport.

## 4. DOM hierarchy (`.fjk-sticky` → root)

`DIV.fjk-sticky` (sticky) → plain `div` → `DIV.p-4 max-w-[1100px]` → `div` → `DIV.layout-main-section` → `DIV.col-md-12 layout-main-section-wrapper` (relative) → `DIV.row layout-main` → `DIV.page-content` → `DIV.page-wrapper` → `DIV.container.page-body` → `DIV.content.page-container.no-list-sidebar` → `div` → `DIV.main-section` → `BODY.no-breadcrumbs` → `HTML.chrome`.

No ancestor `transform`; no ancestor clipping/overflow (all `visible`).

## 5. Bounding rectangles + computed styles (deep scroll, `scrollY = 871`)

| Element | rect top / bottom / height | position | top | z-index | background | visibility |
|---|---|---|---|---|---|---|
| `.page-head` (contains **"FeelJapanK Workspace"**) | 48 / 108 / 60 | sticky | 48px | 6 | `rgb(255,255,255)` | visible |
| `.page-head-content` (title row) | ~50 / 100 | — | — | — | — | visible |
| `.fjk-sticky` | 108 / 228 / 120 | sticky | 108px | 6 | `rgb(255,255,255)` | visible |
| Deal title `H1` | 108 / ~140 | static | — | auto | transparent | visible |
| Tabs `.mb-3.flex.gap-2` | ~190+ | static | — | auto | — | visible |

Scroll profile (`window.scrollTo`):

| scrollY | page-head top/bottom | `.fjk-sticky` top/bottom |
|---|---|---|
| 0 | 48 / 108 | 134 / 254 |
| 200 | 48 / 108 | 108 / 228 |
| 400–871 | 48 / 108 | 108 / 228 |

→ The Desk `.page-head` stays pinned at 48–108; `.fjk-sticky` pins at 108–228. **No overlap at any scroll depth.**

## 6. Visual stacking / hit-testing (deep scroll)

`document.elementFromPoint(640, y)` results:

| y | topmost element | text |
|---|---|---|
| 10–30 | `.container` | navbar ("Begin typing for results…") |
| 50–100 | `DIV.row.flex.align-center.page-head-content` | **FeelJapanK Workspace** (+ Actions) |
| 108–140 | `H1` | `N1 TEST - Rich Package · 2026 · #00011` |
| 160 | `DIV.text-gray-600.text-sm.mt-1` | `N1 TEST - Rich Package · Qualification` |
| 190 | `DIV.mb-3.flex.gap-2` | tabs |

**Actual visual order is correct:** navbar (0–48) → **FeelJapanK Workspace** (48–108) → Deal title (108+) → tabs. The Workspace header is on top (not covered) and is part of the persistent context. `.fjk-sticky` does **not** cover `.page-head`.

## 7. Old-bundle reproduction (why the operator sees the symptom)

Transiently forcing the pre-HF-01 sticky offset (`top:48px`) at deep scroll:

```
pageHead 48–108, fjkSticky top 48, overlap = true, coveredHeight = 60px
```

→ the sticky Deal area covers the **entire** 60px Workspace header. This is precisely the operator's reported symptom. Restored immediately (DOM-only; no file change).

## 8. Confirmed root cause

- **With the HF-01 bundle, there is no obscuring** — verified by both geometry and hit-testing. The HF-01 change is correct.
- The operator's persisting symptom **exactly matches the pre-HF-01 bundle** (60px covered).
- Therefore the operator is **still executing the pre-HF-01 bundle**. The custom bundle is injected by a **bare `<script src>` / `<link href>` with no version query** (`fjk_workspace.js:14,20,42`) and served with **`Cache-Control: max-age=43200, public`** (12h). A "hard reload" is not reliably sufficient here: the subresource is heavily cached (`transferSize = 0`) and `fjk_workspace.js:36-39` short-circuits on `window.feeljapank` during in-app (SPA) navigation, so the old bundle can persist across refreshes.
- The Frappe `.page-head` is **functioning correctly** (native `position: sticky; top: 48px`) and is the element that supplies the "FeelJapanK Workspace" header.

**Root cause of the discrepancy (confirmed):** the operator's browser is running the stale pre-HF-01 bundle (un-versioned, 12h-cached asset). The fix is correct but was not delivered.

### Residual evidence needed only if the operator can prove a fresh bundle
If DevTools shows `feeljapank.css` size `5,029,814` (or the CSS contains `page-head-height`) **and** the symptom persists, then the environment differs from this reproduction and we would need: `.page-head` computed height/top, `.fjk-sticky` computed top, window width/zoom, and a screenshot at the failing scroll position.

## 9. Proposed smallest corrective approach (not implemented)

1. **Operator verification (zero-code):** DevTools → Network → enable **Disable cache** → reload; confirm `feeljapank.css` = `5,029,814` bytes (or CSS contains `page-head-height`). This should resolve the visible symptom and enable genuine HF-01 re-acceptance.
2. **Durable (separate approval):** add cache-busting to the bundle URLs in `fjk_workspace.js` (append `?v=<hash or mtime>` to `feeljapank.css` and `feeljapank.js`), so any rebuild invalidates the browser cache automatically.
3. **Optional (separate approval):** make the sticky Workspace context self-contained (render the Workspace header inside `.fjk-sticky`) to remove reliance on the native Desk `.page-head` sticky — only if the operator's environment shows the native page-head not sticking.

## 10. Which files should change

- **`fjk_workspace.js` — YES** (cache-busting; item 9.2). Path: `bench/apps/feeljapank_crm/feeljapank_crm/feeljapank_crm/page/fjk_workspace/fjk_workspace.js`.
- **`App.vue` — NO further change** (geometry is correct with the current fix); only if item 9.3 is approved.
- **Rebuild bundle** only if `App.vue` changes.

## 11. Frappe `.page-head` involvement

Involved and **working**: it is the native sticky element that provides the "FeelJapanK Workspace" header (48–108, white, visible). It does not need modification. The fix intentionally places `.fjk-sticky` below it.

## 12. Verification plan (after corrective action)

1. Confirm loaded bundle fingerprint: CSS `5,029,814` (HF-01) at `/app/fjk-workspace?deal=CRM-DEAL-2026-00011`.
2. Deep-scroll: `.page-head` 48–108 visible; `.fjk-sticky` top 108; `overlap = false`; hit-test y=50–100 returns the Workspace header; y=108+ returns the Deal title; tabs accessible.
3. Re-confirm HF-03/04/12 + DG-1/3/4/5/6/7 unchanged on `00011/00017/00015/00013/00019/00010`.
4. Genuine human re-acceptance of HF-01 by the operator.

## 13. Repository / state confirmation

- No source or bundle was changed by this diagnosis (only this document was created). `App.vue` and `dist/feeljapank.{js,css,map}` remain at the HF-01 build timestamps (`2026-10-04 23:29`).
- No schema, database, CRM record, configuration, permission, route, or integration change.
- No commit, no push.

---

*Diagnosis via OpenCode session on 2026-10-04. Read-only except creating this document. No fix implemented; HF-01 human acceptance remains OPEN.*
