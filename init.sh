#!/bin/bash
set -euo pipefail

if [ -d "/home/frappe/frappe-bench/apps/frappe" ]; then
    echo "Bench already exists, skipping init"
    cd frappe-bench
    exec bench start
fi

# ---------------------------------------------------------------------------
# Initialization preflight (fail-closed)
#
# Protects against partial persistence: if the bench/site directory is gone
# but the MariaDB volume survives, `bench new-site` would otherwise drop and
# recreate the existing database (data loss). Refuse to initialize whenever
# any site data is detected, and also refuse if the database state cannot be
# verified at all.
# ---------------------------------------------------------------------------
if [ -d "/home/frappe/frappe-bench/sites/crm.localhost" ]; then
    echo "ERROR: Site directory /home/frappe/frappe-bench/sites/crm.localhost already exists."
    echo "Refusing initialization to protect existing site data."
    echo "Restore the existing bench, or remove the site directory manually, before initializing."
    exit 1
fi

: "${MARIADB_ROOT_PASSWORD:?MARIADB_ROOT_PASSWORD required for initialization}"

existing_databases="$(
    mysql -h mariadb -u root --password="$MARIADB_ROOT_PASSWORD" -N -B -e \
        "SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys');" 2>/dev/null
)" || {
    echo "ERROR: Could not verify MariaDB database state (query failed or MariaDB is unavailable)."
    echo "Refusing initialization because existing database state cannot be ruled out."
    exit 1
}

if [ -n "${existing_databases}" ]; then
    echo "ERROR: Existing non-system database(s) detected:"
    echo "${existing_databases}"
    echo "Refusing initialization because existing database state was detected."
    echo "A genuinely fresh environment must have no non-system databases."
    exit 1
fi

echo "Creating new bench..."

bench init --skip-redis-config-generation frappe-bench --version version-15

cd frappe-bench

# Use containers instead of localhost
bench set-mariadb-host mariadb
bench set-redis-cache-host redis://redis:6379
bench set-redis-queue-host redis://redis:6379
bench set-redis-socketio-host redis://redis:6379

# Remove redis, watch from Procfile
sed -i '/redis/d' ./Procfile
sed -i '/watch/d' ./Procfile

bench get-app crm --branch main

bench new-site crm.localhost \
    --mariadb-root-password "${MARIADB_ROOT_PASSWORD:?MARIADB_ROOT_PASSWORD required for initialization}" \
    --admin-password "${ADMIN_PASSWORD:?ADMIN_PASSWORD required for initialization}" \
    --no-mariadb-socket

bench --site crm.localhost install-app crm
bench --site crm.localhost set-config developer_mode 1
bench --site crm.localhost set-config mute_emails 1
bench --site crm.localhost set-config server_script_enabled 1
bench --site crm.localhost clear-cache
bench use crm.localhost

bench start