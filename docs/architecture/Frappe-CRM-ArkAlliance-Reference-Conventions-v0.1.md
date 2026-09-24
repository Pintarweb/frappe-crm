# Frappe CRM ↔ ArkAlliance — Reference Conventions v0.1

**Status:** FROZEN — REFERENCE ARCHITECTURE

**Scope:** Frappe-side architectural stance for future integration.

**Nature:** This document records the already-approved and frozen architectural decision. It does not authorize implementation.

---

## Purpose

Record the approved and frozen Frappe-side conventions for a future
ArkAlliance ↔ Frappe CRM interoperability boundary.

This document does not redesign, reinterpret, expand, or introduce new
architectural decisions. It records the approved stance exactly.

---

## Terminology

- **Frappe Contact** — Frappe's local `Contact` DocType.
- **P01 Contact** — ArkAlliance canonical person entity (owned by P01).
- **CRM Organization** — Frappe's local company record (`CRM Organization` DocType).
- **P01 Company** — ArkAlliance canonical company entity (owned by P01).

---

## Frozen Conventions

1. Frappe Contact ≠ P01 Contact.
2. CRM Organization ≠ P01 Company.
3. P01 is canonical for Contact/Company identity.
4. Cross-LEGO references use:
   - `ark_organisation_id`
   - `ark_entity_type`
   - `ark_entity_id`
5. Future reference mechanism is mapping-only via a dedicated Frappe-side mapping DocType.
6. The mapping DocType will eventually live in a separate, independently deployable integration app.
7. No convenience `ark_entity_id` field is authorized at this stage.
8. Frappe Contact and CRM Organization are the identity anchors.
9. CRM Lead and CRM Deal carry no direct P01 references.
10. P01 references are optional and non-blocking.
11. Frappe must operate when P01 is unavailable; P01 must operate when Frappe is unavailable.
12. Stale/unresolved references must not delete, overwrite, cascade, or silently mutate local Frappe identity.
13. Integration will use HTTP contracts, never direct D1/database coupling or a shared database.
14. No speculative event bus, broker, queue, universal registry, generic adapter framework, second auth model, or synchronization machinery.
15. Duplicate resolution remains conceptual/deferred:
    Frappe local duplicate detection → P01 canonical check → reference existing or create P01.
16. Email/full_name/company_name are candidate matching signals only, never identity keys.
17. `Contact.links` is not reused for P01 references.
18. CRM's existing Contact override remains the only Contact override.

---

## Implementation Boundary

**IMPLEMENTATION STATUS:**

- No mapping DocType exists yet.
- No integration app is to be created yet.
- No Custom Fields.
- No hooks.
- No APIs.
- No P01 client.
- No migrations/schema changes.
- No Docker/configuration changes.
- No integration transport has been selected.
- No stale-reference repair workflow has been implemented.

---

## Authority Statement

This document records the approved Frappe-side architectural stance for
future integration. It does not itself authorize implementation. Any future
implementation requires a separate PLAN → REVIEW → OWNER APPROVAL → BUILD
cycle against this frozen reference.
