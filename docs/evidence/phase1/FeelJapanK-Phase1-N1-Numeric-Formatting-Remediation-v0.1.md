# FeelJapanK Phase 1 — N1 Numeric Formatting Remediation — v0.1

**Document status:** TARGETED REMEDIATION EVIDENCE (follow-up to N1 hybrid verification)
**Nature:** additive technical remediation + verification evidence. **NOT human acceptance.**
**Predecessor:** `docs/evidence/phase1/FeelJapanK-Phase1-N1-Hybrid-Technical-Verification-v0.1.md` (§3.1 implementation defect). This document does not overwrite that evidence.

---

## 1. Defect

N1 Full Details applied the boolean formatter to integer `fjk_*` fields, so numeric values rendered as booleans:
- `fjk_infants = 1` → `Yes`
- `fjk_total_pax = 0` → `No`
- `fjk_children = 0` → `No`

Affected fields: `fjk_total_pax`, `fjk_adults`, `fjk_children`, `fjk_infants` (all native `Int` in the shared context table of Full Details).

## 2. Root cause

`fmtShared(v)` in `App.vue` compared by loose value (`v === 1`, `v === 0`), which cannot distinguish integers `0/1` from booleans. Frappe serializes `Check` fields as integers too (verified: `frappe.as_json` returns `1`/`0` for `fjk_ready_for_quotation` / `fjk_info_complete`), so value-based detection was unsound.

## 3. Exact fix

File changed: `bench/apps/feeljapank_crm/frontend/src/App.vue` — function `fmtShared` only.

```js
// before
function fmtShared(v) {
  if (v === null || v === undefined || v === "") return "—";
  if (v === 1 || v === true) return "Yes";
  if (v === 0 || v === false) return "No";
  return v;
}

// after
function fmtShared(v) {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return v;
}
```

Type-based handling only; no field names hard-coded; no schema/backend/API change.

## 4. Before / after examples

| Field | Value | Before | After |
|---|---|---|---|
| Total Pax (`00019`) | 0 | No | **0** |
| Infants (`00011`) | 1 | Yes | **1** |
| Children (`00014`) | 1 | Yes | **1** |
| Children (`00011`) | 2 | 2 | 2 |
| Infants (`00017`) | 0 | No | **0** |

Consequence (documented, not a defect): because Frappe delivers `Check` fields as integers, the two raw check rows in the Full Details context table now show `0`/`1` (previously `No`/`Yes`). Their boolean meaning remains presented correctly in the **Information Status** area (`Ready to proceed: Yes/Not yet`; `Info Complete: YES/NO`), which uses the top-level booleans.

## 5. Verification performed

- **Numeric formatting (A):** re-rendered the real rebuilt bundle against retained dataset payloads. `00011`: Total Pax 20, Adults 17, Children 2, Infants 1. `00017`: 4/4/0/0. `00015`: 10/8/2/0. `00013`: 4/4/0/0. `00019`: 0/0/0/0. `00010`: 18/16/2/0. **No numeric value renders `Yes`/`No`.**
- **Boolean regression (B):** Information Status booleans intact — `00017` → `Ready to proceed: Yes`, `Info Complete: YES`; all others → `Not yet` / `NO`. `typeof === "boolean"` path verified in code.
- **Dataset (C):** the five representative Deals plus baseline re-rendered with 0 JS errors.
- **Build (D):** `vite build` OK (642 modules; `feeljapank.js` 377.06 KB). Bundle served over HTTP: `js:200`, `css:200`.
- **Backend regression (E):** `bench --site crm.localhost execute feeljapank_crm.tests.run_smoke_tests` → **54/54 passed, 0 failures**.
- **Dataset integrity (F):** `CRM-DEAL-2026-00010` unchanged (ABC Travel; info=0; ready=0; 2 components; 2 requirement lines). 11 N1 test Deals intact. `FJK-QUO-2026-00001` preserved (Draft). FJK DocTypes = 9; `fjk_*` custom fields = 18 (unchanged). No schema change, no new fields, no new DocTypes, no migration, no naming-series change.

## 6. Out of scope (recorded, not fixed)

- UX: `1 children` / `1 infants` pluralization in Summary.
- Data/model: unset `Int` reads as `0`; unset `Select` surfaces defaults (`New request`, `Quotation wanted`).
- Verification limitation: authenticated browser end-to-end not yet performed (login-gated; credential handling prohibited).

## 7. Governance

- Only `App.vue` presentation formatter changed; bundle rebuilt. No backend/API/schema/permission/integration/CRM-frontend change. No other N1 behaviour changed.
- No commit; no push. Human acceptance not claimed.

*Recorded via OpenCode session on 2026-10-02.*
