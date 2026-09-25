# Frappe CRM — Environment & Foundation

**Status:** FROZEN — PASS

**Environment:** `~/frappe-crm` · site `crm.localhost`

**Nature:** This document records the already-completed and verified
environment/foundation baseline. It is a governance boundary; it does not
authorize implementation or modification outside the normal controlled workflow.

---

## Purpose

Record the verified foundation state on which subsequent Frappe CRM work is
based: the environment baseline, bench persistence, initialization safety,
credential/config reproducibility, version/image reproducibility, and the
repository boundary. It consolidates the previously verified-but-unrecorded
foundation stages (A–F) into a single authoritative record.

---

## A — Environment Baseline

- Project path: `~/frappe-crm`
- Frappe Framework: `15.121.1`
- Frappe CRM: `1.84.0`
- MariaDB: `10.8`
- Redis: present (containerized)
- Site: `crm.localhost`
- Developer mode: enabled
- Server script setting: enabled
- Mute emails: enabled
- Installed application baseline: `frappe`, `crm`

---

## B — Persistence

The Frappe bench is persisted through the host bind mount:

```
./bench:/home/frappe/frappe-bench:Z
```

Verified properties:

- The bench survives container recreation / `down` / `up`.
- The existing bench is reused.
- The existing site is reused.
- Initialization is not repeated.
- The MariaDB volume remains separately persisted.
- The runtime bench is explicitly excluded from root Git tracking (`bench/`).

This was intentionally a **persistence-only** change and did not authorize
unrelated runtime changes.

---

## C — init.sh Safety

When an existing bench is detected, the frozen path is:

```
cd /home/frappe/frappe-bench
exec bench start
```

The existing-bench path must not fall through into:

- `bench init`
- `bench get-app`
- `bench new-site --force`
- fresh initialization

Static and runtime verification established the existing-bench startup path
without reinitialization.

---

## D — Credential / Config Reproducibility

- Bootstrap secrets are supplied through environment variables.
- Actual local values live in `.env`.
- `.env` is mode `600`.
- `.env` is gitignored.
- `.env.example` contains placeholders only.
- Existing persisted benches do not require bootstrap secrets.
- Fresh initialization fails closed when required bootstrap variables are absent.

Variables (names only; values are not recorded):

- `MARIADB_ROOT_PASSWORD`
- `ADMIN_PASSWORD`

The original hardcoded bootstrap credentials were removed from the
tracked/runtime definition.

---

## E — Version / Image Reproducibility

**Frappe**
- version: `15.121.1`
- HEAD: `8f801ade016078685c3165c96e38f84f249f5309`

**CRM**
- version: `1.84.0`
- HEAD: `0adc6715d79b7647d1bcecf41f5d2cf928253b4b`

**Images (repository@sha256 digests, pinned in `docker-compose.yml`)**
- bench: `sha256:7cf2354c5024d8362c507619566fec700740e31bcd71a2e745e3ec9a3a778a2a`
- MariaDB: `sha256:456709ab146585d6189da05669b84384518baecd83670c9e5221f8c20a47cf1e`
- Redis: `sha256:ba6e394f6acc2a695ef1b6944f161b9ca813711739be68319fa0db3470673f1d`

`docs/versions.lock` is the version/baseline traceability record.

*(The uncommitted G12 additions to `docs/versions.lock` are outside this
documentation task and are not altered here.)*

---

## F — Git Baseline

The root project repository tracks the environment definition and associated
documentation:

- environment definition (`docker-compose.yml`)
- initialization logic (`init.sh`)
- architecture documentation (`docs/architecture/…`)
- version/baseline documentation (`docs/versions.lock`)
- reproducibility metadata (`.env.example`, `.gitignore`)

Explicitly excluded from root Git:

- `.env`
- `bench/`

Recorded properties:

- Nested Frappe/CRM repositories remain independent repositories.
- `bench/` is runtime/environment state and is not vendored.
- Secrets are not tracked.
- The root repository is independently deployable as an
  environment-definition repository, subject to the documented
  bootstrap/runtime assumptions.

---

## Frozen Boundary

This freeze establishes the **foundation baseline only**. It does **not** freeze:

- future CRM customizations
- WhatsApp production configuration
- Meta credentials
- public webhook exposure
- Telegram operational controls
- P01 integration
- CRM/P01 synchronization
- future business workflows
- future application additions
- production deployment hardening beyond what is explicitly documented here

---

## Relationship to Other Frozen Records

This document **complements, but does not replace**:

- `docs/architecture/Frappe-CRM-ArkAlliance-Reference-Conventions-v0.1.md`
  — governs the ArkAlliance ↔ Frappe CRM reference boundary.
- `docs/G12-HMAC-Guard-Freeze.md`
  — governs the WhatsApp HMAC guard promotion.

This document governs the verified **environment/foundation baseline**.
Their contents are not duplicated here.

---

## Authority Statement

This document records the verified Environment/Foundation Baseline as
**FROZEN**.

Changes to the frozen foundation that affect persistence, initialization
safety, credential handling, version identity, runtime reproducibility, or the
repository boundary require a new
PLAN → REVIEW → APPROVAL → BUILD → VERIFY cycle.

The freeze is a governance boundary, not permission to modify the environment
outside the normal controlled workflow.
