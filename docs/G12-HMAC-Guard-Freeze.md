# Frappe WhatsApp — G12 HMAC Guard Promotion

**Status:** FROZEN — PASS

**Environment:** `~/frappe-crm` (root project) · site `crm.localhost`

**Nature:** This document records the already-completed, verified, and frozen
G12 stage. It does not authorize implementation beyond the frozen boundary.

---

## Purpose

Protect the `frappe_whatsapp` inbound webhook with the validated
`ark_whatsapp_guard` HMAC security boundary, so that Meta's
`X-Hub-Signature-256` is verified against the raw request body before the
existing webhook executes.

---

## Frozen Implementation

**frappe_whatsapp**
- Repository: https://github.com/shridarpatil/frappe_whatsapp
- Branch: `version-15`
- Exact commit: `8441c3820c98828aa1f53faf47e7392d7d270748`
- Working tree: clean (detached at the pinned commit)

**ark_whatsapp_guard**
- Local commit: `b128d7f3ea1ba545339893da64e8aa3d26f45a9c`
- Local-only repository (not published)
- No DocTypes, tables, dependencies, migrations, or background jobs

**Guard mechanism**
- `override_whitelisted_methods`
- Target: `frappe_whatsapp.utils.webhook.webhook`
- Guard: `ark_whatsapp_guard.guard.validated_webhook`

**Security properties**
- HMAC computed over the **raw** request body (`frappe.request.get_data()`)
- Header: `X-Hub-Signature-256`
- `sha256=` prefix validated explicitly
- HMAC-SHA256
- `hmac.compare_digest()` constant-time comparison
- Fail closed (missing secret / missing header / malformed header / mismatch)
- HTTP **403** on authentication failure
- Validation occurs **before** the original webhook executes
- Successful validation delegates to the existing webhook unchanged
- Meta **GET** verification-token flow remains intact

---

## Verified G12 Results

| Check | Observed | Result |
|---|---|---|
| Hook resolution | `ark_whatsapp_guard.guard.validated_webhook` | PASS |
| Unsigned POST | HTTP 403, rejected | PASS |
| Invalid signature | HTTP 403, rejected | PASS |
| Valid signature | HTTP 200, normal processing | PASS |
| GET valid token | `CHAL123`, HTTP 200 | PASS |
| GET invalid token | HTTP 417 | PASS |
| Rejected POST data integrity | no `WhatsApp Notification Log`, no `WhatsApp Message` | PASS |
| `ark_whatsapp_guard` tests | 7/7 OK | PASS |
| `frappe_whatsapp` webhook tests | 13/13 OK | PASS |

Test fixtures created during validation were removed; the relevant entities
were returned to the pre-BUILD **zero-record** baseline.

---

## Configuration

- `whatsapp_app_secret` is configured in `crm.localhost` `site_config.json`
  and contains a **TEST-ONLY** value. The secret itself is intentionally not
  recorded here.
- **No real Meta App Secret is configured.**
- **No real WhatsApp credentials are configured.**
- **No public Meta webhook is registered.**
- **No public webhook exposure exists.**

---

## Frozen Boundary (not part of G12)

The following require separate future PLAN → REVIEW → APPROVAL → BUILD → VERIFY:

- real Meta credentials (App Secret, access token)
- WhatsApp Account production configuration (WABA / Phone Number ID)
- Meta webhook registration
- public HTTPS exposure
- replay / idempotency / deduplication
- publishing `ark_whatsapp_guard` as a remote repository
- reverse proxy / Cloudflare Worker / sidecar
- P01 integration
- CRM customization
- messaging abstraction

---

## Known Operational Notes

- Installing a Frappe app while `bench start` is running may crash the
  scheduler; a restart is required (bench is host-persisted).
- `frappe_whatsapp` application tests can create test fixtures; these were
  cleaned during G12.
- `frappe_whatsapp` remains pinned to the verified commit `8441c382…`.
- `ark_whatsapp_guard` is local-only.

---

## Source / Repository State

- Root repository change: `docs/versions.lock` only.
- `docs/versions.lock` records:
  - `frappe_whatsapp` → `8441c3820c98828aa1f53faf47e7392d7d270748`
  - `ark_whatsapp_guard` → `b128d7f3ea1ba545339893da64e8aa3d26f45a9c`
- No commit/push has been performed for the `versions.lock` change.

---

## Authority Statement

**G12 is FROZEN.**

The frozen implementation must not be changed casually. Any change to the G12
security boundary, webhook interception, the `frappe_whatsapp` pin, guard
behaviour, or secret-storage design requires a new
PLAN → REVIEW → APPROVAL → BUILD → VERIFY cycle.
