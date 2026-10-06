# FeelJapanK — Email Delivery Incident and Remediation (v0.1)

| Field | Value |
|---|---|
| Document | FeelJapanK-Email-Delivery-Incident-and-Remediation-v0.1 |
| Status | VERIFIED — OPERATIONAL REFERENCE |
| Date | 2026-10-04 |
| Scope | FeelJapanK Phase 1 native Frappe CRM pilot — outbound email delivery |
| Nature | Incident record + remediation record + cloud-migration reference |
| Open item | Whether the corrected configuration should become a durable bootstrap/cloud default remains **OPEN / FUTURE DECISION** (not authorized). |

> This document records a **completed incident and an authorized remediation**. It is a migration and operational reference. It is **not** an authorization to change the environment bootstrap (`init.sh`), Docker configuration, or application code.

---

## 1. Purpose

This document allows a future operator or developer to understand:

1. What went wrong.
2. Why email initially appeared to be configured but did not deliver.
3. How the problem was diagnosed (source-level tracing, not assumptions).
4. The exact two independent blocking conditions.
5. What was changed.
6. How delivery was verified.
7. What was deliberately **not** changed.
8. What must be considered when rebuilding or migrating the environment to a cloud server.

The incident arose because the project needed a normal Frappe **"Forgot Password?"** email workflow and therefore required working outbound email.

---

## 2. Known Environment

| Item | Value |
|---|---|
| Project | FeelJapanK Phase 1 native Frappe CRM pilot |
| Repository | `/home/yusmarin/frappe-crm` |
| Bench | `/home/yusmarin/frappe-crm/bench` |
| Site | `crm.localhost` |
| Frappe | v15.121.1 |
| Frappe commit / tag | `8f801ade` / `v15.121.1` |
| Email Account (outgoing) | `FeelJapanK CRM` — `feeljapankmalaysia@gmail.com` |
| Runtime | Docker Compose (`crm-frappe-1`, `crm-mariadb-1`, `crm-redis-1`); container starts via `/workspace/init.sh` → `bench start` |

---

## 3. Symptom / Context

- A Gmail outgoing **Email Account** was created successfully.
- Direct `frappe.sendmail()` testing created **Email Queue** records that stayed:

```
Status = Not Sent
Error  = None
Email_account = FeelJapanK CRM
Sender = FeelJapanK CRM <feeljapankmalaysia@gmail.com>
```

- Example records: `f1qv4akrj5`, `h5qjrj9pbn`, `e1kr8nta7s`.
- The initial investigation considered (and ruled out as the cause): Gmail credentials, SMTP reachability, Email Account selection, worker availability, scheduler process availability, RQ queue connectivity, and generic Email Queue processing.

---

## 4. Diagnostic Investigation

### 4.1 Method

The investigation **traced the installed Frappe source code** at `/home/yusmarin/frappe-crm/bench/apps/frappe/` rather than relying on generic Frappe knowledge, and correlated it with on-disk configuration, logs, and read-only database queries. All inspection was read-only until an explicit remediation authorization was given.

### 4.2 Actual delivery pipeline

```
frappe.sendmail()
  → Email Queue (status "Not Sent")
  → frappe.email.queue.flush           (Frappe scheduled task)
  → Scheduled Job Type                 (row: name "queue.flush")
  → run_scheduled_job                  (RQ job on the "default" queue)
  → EmailQueue.send()
  → SMTP                               (Gmail outgoing account)
```

### 4.3 Key source-level behavior ([CONFIRMED])

1. `frappe.sendmail()` creates the **Email Queue** record with initial status **"Not Sent"**. Queued rows exist regardless of muting. Queue selection: `frappe/email/queue.py:164` (`get_queue()` selects `status='Not Sent' or 'Partially Sent'`).
2. `frappe.email.queue.flush` is registered in Frappe scheduler events under `scheduler_events["all"]` — `frappe/hooks.py:241-246`.
3. The `Scheduled Job Type` row exists as:

```
Name       = queue.flush
Method     = frappe.email.queue.flush
Frequency  = All
Stopped    = 0
```

   (Frequency `"All"` is derived in `frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:239`; queue name resolves to `"default"` at `:182-183`.)
4. `EmailQueue.send()` checks `can_send_now()` — `frappe/email/doctype/email_queue/email_queue.py:179` with the gate at `:169-177`.
5. `can_send_now()` checks `frappe.are_emails_muted()` — `email_queue.py:171`.
6. With email muting enabled, `send()` returns **before** opening SMTP and **without** writing any queue error (`email_queue.py:181-182`). `flush()` itself does not return early on mute — it prints "Emails are muted" and continues (`frappe/email/queue.py:137-138`) — but each `send()` then no-ops.

---

## 5. Root Causes

The incident had **two independent blocking conditions**. Fixing only one would **not** have restored normal email delivery.

### 5.1 Gate 1 — Email muting ([CONFIRMED])

`bench/sites/crm.localhost/site_config.json` contained:

```json
"mute_emails": 1
```

This was set during initialization by `init.sh:70`:

```bash
bench --site crm.localhost set-config mute_emails 1
```

Consequence chain:

```
mute_emails = 1
  → frappe.are_emails_muted() = True        (frappe/__init__.py:2111-2112)
  → EmailQueue.send() exits before SMTP      (email_queue.py:169-182)
  → Email Queue remains "Not Sent"
  → Error remains None
```

### 5.2 Gate 2 — Scheduler disabled ([CONFIRMED, from read-only runtime DB evidence])

After the environment was deliberately brought up for read-only verification, direct database evidence established:

```
System Settings.enable_scheduler = 0
```

The flush job row existed and was enabled, but had never run:

```
Scheduled Job Type: method = frappe.email.queue.flush
                    name    = queue.flush
                    stopped = 0
                    frequency = All
                    last_execution = NULL

Scheduled Job Log: 0 rows
All 67 Scheduled Job Type rows: last_execution = NULL
```

Consequence chain (`frappe/utils/scheduler.py`):

```
enable_scheduler = 0
  → is_scheduler_disabled() true → is_scheduler_inactive() true   (scheduler.py:149-161, 132-144)
  → enqueue_events_for_site() returns early                        (scheduler.py:99-100)
  → scheduled jobs are NOT enqueued
  → frappe.email.queue.flush never executes
  → no run_scheduled_job entry for email flush
  → Email Queue remains untouched
```

---

## 6. Remediation Performed ([PERFORMED] — exactly two authorized changes)

Explicit authorization was given for **exactly two configuration changes**. No other remediation was authorized or performed.

**Change 1 — Enable the site scheduler**

```bash
bench --site crm.localhost enable-scheduler
```

Result: `System Settings.enable_scheduler` `0 → 1`.

**Change 2 — Unmute site email**

```bash
bench --site crm.localhost set-config mute_emails 0
```

Result: `site_config.json` → `"mute_emails"` `1 → 0`.

> `init.sh` was **NOT** modified.
> `docker-compose.yml` was **NOT** modified.
> Application code was **NOT** modified.

---

## 7. Verification ([PERFORMED] — post-remediation evidence)

After the two changes:

| Check | Before | After |
|---|---|---|
| `System Settings.enable_scheduler` | `0` | `1` |
| `are_emails_muted()` | `1` (True) | `0` (False) |
| `frappe.email.queue.flush` `last_execution` | `NULL` | populated (`2026-10-04 18:38:05`) |
| `Scheduled Job Log` rows | `0` | populated (all `Complete`) |
| Email Queue `Not Sent` | `25` | `0` |
| Email Queue `Sent` | `0` | `25` |
| Email Queue rows with error | — | `0` |

Observed execution in `bench/logs/worker.log`:

```
...run_scheduled_job..., kwargs={'job_type': 'frappe.email.queue.flush'} (crm.localhost::scheduled_job::frappe.email.queue.flush)
Job OK (crm.localhost::scheduled_job::frappe.email.queue.flush)
```

Narrative:

- The scheduler began enqueuing scheduled jobs; `Scheduled Job Log` became populated and `last_execution` values were established.
- `run_scheduled_job` appeared in `worker.log` for `frappe.email.queue.flush`, and the job **completed successfully**.
- `flush` executed; the existing queued messages were automatically processed.
- **25** queued messages transitioned to **Sent**; **0** remained `Not Sent`; **0** records had errors.
- The three original test records (`f1qv4akrj5`, `h5qjrj9pbn`, `e1kr8nta7s`) were among the successfully sent records, via the `FeelJapanK CRM` Gmail account.
- **SMTP accepted the messages.**
- The operator personally confirmed receipt of the email in the recipient mailbox.
- **No new `frappe.sendmail()` test was sent after remediation.**

Side effect of enabling the scheduler: all **67** normal `Scheduled Job Type` jobs became active, and some normal Frappe scheduled notification/report emails (for example `email_account.notify_unreplied`, `auto_email_report.send_monthly`, `newsletter.send_scheduled_email`) were consequently processed. They completed without errors. This is expected Frappe behavior, not a targeted test.

---

## 8. Final Technical Conclusion

**EMAIL DELIVERY — PASS / VERIFIED**

The complete chain was verified end-to-end:

```
Frappe → scheduler → Email Queue → worker → email flush → Gmail SMTP → recipient inbox
```

**Root causes (both had to be corrected):**

1. `mute_emails = 1`
2. `System Settings.enable_scheduler = 0`

---

## 9. Governance / Change Boundary ([PERFORMED])

- Authorized changes: **exactly two configuration changes** (enable scheduler; unmute email).
- No application code changes.
- No CRM schema changes.
- No CRM record changes.
- No Email Account replacement.
- No Docker configuration changes.
- No `init.sh` changes.
- No commit.
- No push.

---

## 10. Cloud Migration / Environment Rebuild Implications

> This section is a **migration reference**. It is **not** an authorization to change the bootstrap.

1. The current environment's `init.sh` deliberately establishes:

   ```
   mute_emails = 1
   ```

   Therefore a fresh environment created using the current initialization path **may reproduce the email-muted condition**. ([CONFIRMED — `init.sh:70`])

2. The historical initialization also resulted in:

   ```
   System Settings.enable_scheduler = 0
   ```

   This is **DB/site state**, not a `site_config.json` value, so it is not visible in the bootstrap files and must be checked in the database after provisioning. ([CONFIRMED — runtime DB evidence])

3. Therefore a future cloud deployment **MUST explicitly verify** the full set:

   - `System Settings.enable_scheduler`
   - `site_config` `mute_emails`
   - the `Scheduled Job Type` row for `frappe.email.queue.flush`
   - the scheduler process
   - the worker process
   - Redis / RQ connectivity
   - Email Account configuration
   - SMTP authentication
   - actual end-to-end email receipt

4. **Do NOT recommend modifying `init.sh` yet.** Whether these settings should become durable defaults in the environment bootstrap is a **separate BUILD/architecture decision** and **has not yet been authorized**.

5. This document is a **migration reference**, not an authorization to change the bootstrap.

### 10.1 Cloud Deployment Verification Checklist

```
[ ] Scheduler enabled                          (System Settings.enable_scheduler = 1)
[ ] Email not muted                            (site_config mute_emails = 0)
[ ] Email Account configured                   (outgoing account present and enabled)
[ ] Gmail/SMTP credentials valid               (app password / auth verified)
[ ] Scheduled Job Type exists                  (method = frappe.email.queue.flush)
[ ] Email flush job not stopped                (stopped = 0)
[ ] Scheduler process running                  (bench schedule)
[ ] Worker process running                     (bench worker)
[ ] Redis/RQ connectivity verified             (queue reachable; no connection errors)
[ ] Email Queue processing verified            (flush executes; queue transitions)
[ ] One controlled end-to-end email receipt verified
[ ] Configuration captured as deployment evidence
```

---

## 11. Related Evidence

Existing artifacts referenced during this investigation (no files invented):

**Configuration / bootstrap**

- `bench/sites/crm.localhost/site_config.json` — contains `mute_emails` (currently `0`).
- `bench/sites/common_site_config.json` — Redis/queue/socketio URLs, `developer_mode` context.
- `init.sh` — line 70 sets `mute_emails 1` at initialization.
- `docker-compose.yml` — container/bench startup (`bash /workspace/init.sh`).

**Logs** (`bench/logs/`)

- `worker.log` — worker startup, queue subscription, `run_scheduled_job` for `frappe.email.queue.flush`, `Job OK`.
- `worker.error.log` — RQ deprecation warnings; historical (pre-install) `ModuleNotFoundError: No module named 'feeljapank_crm'`; no SMTP/auth errors on post-remediation delivery.
- `scheduler.log` — single historical scheduler enqueue failure (2026-09-30, pre-app-install); no enqueue errors after scheduler was enabled.
- `bench.log` — records `set-config mute_emails 1` at initialization.
- `ipython.log` — the bench-console session that issued the original `frappe.sendmail()` test and Email Queue queries.

**Frappe source traced during diagnosis** (`bench/apps/frappe/`)

- `frappe/email/queue.py` — `flush()` (`:129`), mute check (`:137`), `get_queue()` (`:164`).
- `frappe/email/doctype/email_queue/email_queue.py` — `can_send_now()` (`:169`), `send()` (`:179`).
- `frappe/__init__.py` — `are_emails_muted()` (`:2111-2112`).
- `frappe/hooks.py` — `scheduler_events["all"]` incl. `frappe.email.queue.flush` (`:241-246`).
- `frappe/utils/scheduler.py` — `start_scheduler()` (`:36`), `enqueue_events_for_site()` (`:92-100`), `is_scheduler_inactive()`/`is_scheduler_disabled()` (`:132-161`).
- `frappe/core/doctype/scheduled_job_type/scheduled_job_type.py` — `enqueue()` (`:71`), frequency (`:239`), `get_queue_name()` (`:182`), `run_scheduled_job()` (`:197`).
- `frappe/utils/background_jobs.py` — `enqueue()` (`:59`), `get_queue()` (`:455`), `is_job_enqueued()` (`:566`).

**Remediation before/after evidence**

- Captured during this incident as database queries and log excerpts (values recorded in §6 and §7 above). No separate remediation evidence file was persisted; the authoritative values are reproduced in this document.

---

## 12. Document Status

- **Incident:** CLOSED — remediated and verified.
- **Configuration durability (bootstrap / cloud):** **OPEN / FUTURE DECISION** — not authorized. Whether `mute_emails` and `enable_scheduler` should become durable defaults in the environment bootstrap is a separate BUILD/architecture decision.

_End of document._
