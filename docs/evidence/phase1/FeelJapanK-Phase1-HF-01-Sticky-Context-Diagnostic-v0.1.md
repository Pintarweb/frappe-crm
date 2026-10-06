# FeelJapanK Phase 1 — HF-01 Sticky Context Diagnostic — v0.1

| Field | Value |
|---|---|
| Document | FeelJapanK-Phase1-HF-01-Sticky-Context-Diagnostic-v0.1 |
| Document status | DIAGNOSIS (read-only). Human acceptance of HF-01 remains **OPEN**. |
| Date | 2026-10-04 |
| Repository | `/home/yusmarin/frappe-crm` |
| Related | `…HF-01-Sticky-Context-Refinement-Plan-v0.1.md`; `…HF-01-Sticky-Context-Implementation-Verification-v0.1.md` |

> No fix is implemented by this document. The previous technical browser result must **not** be treated as closure.

---

## 1. Summary

The HF-01 `App.vue` change (`top: calc(var(--navbar-height,0px) + var(--page-head-height,60px))` = 108px) is **correct and present in the built bundle**. In a **fresh-cache** browser it produces the intended hierarchy with **no overlap**. The operator's "still not resolved" is reproduced exactly by the **old bundle** (sticky `top: 48px`), which **covers the entire 60px `.page-head` ("FeelJapanK Workspace")**.

Confirmed root cause of the discrepancy: **the operator's normal Chrome is still running the stale, cached bundle**, because the custom bundle URL is loaded with **no cache-busting version** and served with **`Cache-Control: max-age=43200`**.

## 2. Observed technical geometry (new bundle, authenticated session, DEAL 00011, deep scroll)

| Element | top / bottom | notes |
|---|---|---|
| `.page-head` (title `FeelJapanK Workspace`) | 48 / 108 | `position: sticky`, `z-index: 6`, `background: rgb(255,255,255)`, `overflow: visible`, `visibility: visible` |
| `.page-head` title element | 66 / 90 | visible |
| `.fjk-sticky` | 108 / 228 | `position: sticky`, `z-index: 6`, `background: rgb(255,255,255)` |
| Overlap (`sticky.top < pageHead.bottom`) | **false** | |

Served CSS contains the new rule: `…+var(--page-head-height,60px));z-index:6;…`.

## 3. Observed human-visible problem

Operator: the **FeelJapanK Workspace** header/context is **obscured by the sticky Deal title area**; HF-01 not resolved.

## 4. Reproduction (DOM-only, no file change)

Transiently forcing the **old** sticky offset (`element.style.top='48px'`) at deep scroll:

```
pageHead_top=48, pageHead_bottom=108, fjkSticky_top=48, overlap=true, coveredHeight=60px
```

i.e. the sticky Deal area covers the **entire** 60px Workspace header — exactly the reported symptom. Restored immediately afterwards (no persistence).

## 5. Discrepancy explanation / root cause

Why OpenCode measured "fixed" but the operator still sees the problem:

1. The workspace bundle is injected by a **bare** `<script src>` / `<link href>` with **no version query**:
   - `fjk_workspace.js:14` `const base = "/assets/feeljapank_crm/dist/";`
   - `:20` `link.href = base + "feeljapank.css";`
   - `:42` `script.src = base + "feeljapank.js";`
   - Live DOM confirms: `http://crm.localhost:8000/assets/feeljapank_crm/dist/feeljapank.js` (no `?v=`).
2. The asset is served with `Cache-Control: max-age=43200, public` (12h) plus `ETag`/`Last-Modified`. A **normal reload/reopen** reuses the fresh cached copy; the browser does not revalidate until expiry.
3. Within a SPA session, `fjk_workspace.js:36-39` short-circuits (`if (window.feeljapank) { mount(); return; }`), so the bundle is not refetched on in-app navigation.

OpenCode's verification session loaded the **new** bundle only because it was relaunched from saved state (empty HTTP cache). The operator's normal Chrome, opened/reloaded normally, continued to use the **old** bundle → old behavior.

**Confirmed root cause:** stale cached bundle in the operator's browser (un-versioned custom asset + 12h public cache). The App.vue fix is correct; it simply was not delivered to the operator.

### Secondary risk (not the current cause)
`.fjk-sticky` offset uses a **fixed** `--page-head-height: 60px`. If an operator's `.page-head` were taller (wrapping/zoom/longer title/actions), the fixed offset could under-clear it. Measured height is exactly 60px here.

## 6. If root cause is disputed

If the operator asserts they performed a **hard reload / cache clear** and still sees the problem, these exact evidence items are required (from the operator's Chrome DevTools):
- the loaded script URL (`document.querySelector('script[src*=feeljapank]').src`) and whether the loaded CSS/JS contains `page-head-height`;
- computed `getComputedStyle(document.querySelector('.fjk-sticky')).top` (expect `108px`);
- `.page-head` computed `height` and `top` (expect 60 and 48);
- window width and device pixel ratio/zoom;
- a screenshot at the failing scroll position.

## 7. Smallest proposed corrective approach

Ordered; **not implemented**.

1. **Immediate, zero-code:** operator performs a hard reload (Ctrl+Shift+R) or DevTools "Empty cache and hard reload" to load the new bundle. This alone should resolve the visible symptom and allows genuine human re-acceptance of HF-01.
2. **Durable (proposed, separate approval):** add cache-busting to the custom bundle URL in `fjk_workspace.js` (append a version, e.g. `?v=<asset hash or file mtime>`) for both `feeljapank.css` and `feeljapank.js`, so future rebuilds invalidate the browser cache automatically. (Optionally align with Frappe's site asset version.)
3. **Optional hardening (proposed, separate):** make the `.fjk-sticky` offset robust to a variable page-head height rather than the fixed 60px fallback.

## 8. Files that would need changing (proposed only)

- `bench/apps/feeljapank_crm/feeljapank_crm/feeljapank_crm/page/fjk_workspace/fjk_workspace.js` — cache-busting query on the bundle CSS/JS URLs (item 7.2).
- (Optional) `bench/apps/feeljapank_crm/frontend/src/App.vue` — only if item 7.3 hardening is approved; **not** required for item 7.1/7.2.
- Rebuild bundle only if App.vue changes.

## 9. Verification plan (after corrective action)

1. Operator hard-reloads; DevTools confirms the script URL carries the new version (or a cache-cleared load) and the loaded CSS/JS contains `page-head-height`.
2. Authenticated browser on `CRM-DEAL-2026-00011`, Full Details, scrolled: `.page-head` visible 48–108, `.fjk-sticky` top 108, `overlap=false`, tabs accessible.
3. Re-confirm HF-03/04/12 and DG-1/3/4/5/6/7 unchanged on `00011/00017/00015/00013/00019/00010`.
4. Genuine human re-acceptance of HF-01 (operator).

## 10. Repository / state confirmation

- `App.vue` and `dist/feeljapank.js` remain at the HF-01 build timestamps (`2026-10-04 23:29`); **this diagnosis changed no source or bundle**.
- No schema, database, CRM record, configuration, permission, route, or integration change.
- No commit, no push.

---

*Diagnosis via OpenCode session on 2026-10-04. Read-only except the creation of this document. No fix implemented; HF-01 human acceptance remains OPEN.*
