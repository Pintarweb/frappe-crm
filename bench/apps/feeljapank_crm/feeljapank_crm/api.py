"""Server-authoritative APIs for the FJK pre-invoice commercial workflow.

Increment 1 scope: Deal linkage, quotation creation, version creation/submission,
confirmation (append-only), negotiation entries, readiness/history/seed reads.
No CRM Deal writes are performed here.
"""

import frappe
from frappe import _
from frappe.utils import now


def _require_deal_access(deal, ptype="read"):
    if not deal:
        frappe.throw(_("Deal is required"))
    if not frappe.has_permission("CRM Deal", doc=deal, ptype=ptype):
        frappe.throw(_("Not permitted for Deal {0}").format(deal), frappe.PermissionError)


@frappe.whitelist()
def create_quotation(deal):
    _require_deal_access(deal, "read")
    existing = frappe.db.get_value("FJK Quotation", {"deal": deal}, "name")
    if existing:
        return {"quotation": existing, "created": False}
    doc = frappe.new_doc("FJK Quotation")
    doc.deal = deal
    org = frappe.db.get_value("CRM Deal", deal, "organization")
    if org:
        doc.organization = org
    doc.insert()
    return {"quotation": doc.name, "created": True}


@frappe.whitelist()
def create_version(quotation, change_type=None, negotiation_note=None, supplier_requote_ref=None, items=None):
    q = frappe.get_doc("FJK Quotation", quotation)
    q.check_permission("write")
    v = frappe.new_doc("FJK Quotation Version")
    v.quotation = q.name
    v.change_type = change_type
    v.negotiation_note = negotiation_note
    v.supplier_requote_ref = supplier_requote_ref
    if items:
        for it in frappe.parse_json(items) if isinstance(items, str) else items:
            v.append("items", it)
    v.insert()
    return {"version": v.name}


@frappe.whitelist()
def submit_version(name):
    v = frappe.get_doc("FJK Quotation Version", name)
    v.check_permission("submit")
    v.submit()
    return {"version": v.name, "version_no": v.version_no, "previous_version": v.previous_version}


@frappe.whitelist()
def confirm_version(quotation, version, source, evidence, notes=None):
    q = frappe.get_doc("FJK Quotation", quotation)
    q.check_permission("write")
    v = frappe.get_doc("FJK Quotation Version", version)
    if v.quotation != q.name:
        frappe.throw(_("Version {0} does not belong to quotation {1}").format(version, quotation))
    if v.docstatus != 1:
        frappe.throw(_("Only a submitted version can be confirmed"))
    if not source or not evidence:
        frappe.throw(_("Confirmation source and evidence are required"))
    # Append-only: never mutate the submitted version.
    q.append(
        "confirmations",
        {
            "version": v.name,
            "confirmed_on": now(),
            "source": source,
            "confirmation_evidence": evidence,
            "notes": notes,
        },
    )
    q.confirmed_version = v.name
    q.status = "Confirmed"
    q.save()
    return {"quotation": q.name, "confirmed_version": v.name}


@frappe.whitelist()
def add_negotiation_entry(
    quotation,
    entry_date=None,
    actor=None,
    change_type=None,
    description=None,
    source=None,
    supplier_requote_ref=None,
    quotation_version=None,
):
    q = frappe.get_doc("FJK Quotation", quotation)
    q.check_permission("write")
    q.append(
        "negotiation_entries",
        {
            "entry_date": entry_date,
            "actor": actor or frappe.session.user,
            "change_type": change_type,
            "description": description,
            "source": source,
            "supplier_requote_ref": supplier_requote_ref,
            "quotation_version": quotation_version,
        },
    )
    q.save()
    return {"quotation": q.name, "entries": len(q.negotiation_entries)}


def _active_confirmation_version(quotation):
    rows = frappe.get_all(
        "FJK Quotation Confirmation",
        filters={"parent": quotation},
        fields=["version", "confirmed_on", "idx"],
        order_by="confirmed_on desc, idx desc",
        limit=1,
    )
    return rows[0].version if rows else None


@frappe.whitelist()
def get_version_history(quotation):
    if not frappe.has_permission("FJK Quotation", doc=quotation, ptype="read"):
        frappe.throw(_("Not permitted"), frappe.PermissionError)
    active = _active_confirmation_version(quotation)
    confirmed_ever = set(
        frappe.get_all("FJK Quotation Confirmation", filters={"parent": quotation}, pluck="version")
    )
    versions = frappe.get_all(
        "FJK Quotation Version",
        filters={"quotation": quotation},
        fields=["name", "version_no", "docstatus", "previous_version", "final_total"],
        order_by="version_no asc",
    )
    for v in versions:
        if v.docstatus == 0:
            v["derived_state"] = "Draft"
        elif v.name == active:
            v["derived_state"] = "Confirmed"
        elif v.name in confirmed_ever:
            v["derived_state"] = "Superseded"
        else:
            v["derived_state"] = "Submitted"
    return {"quotation": quotation, "active_confirmed_version": active, "versions": versions}


@frappe.whitelist()
def get_deal_context(deal):
    _require_deal_access(deal, "read")
    d = frappe.get_doc("CRM Deal", deal)
    out = {
        "deal": d.name,
        "organization": d.organization,
        "status": d.status,
        "deal_owner": d.deal_owner,
        "next_step": d.next_step,
    }
    for f in (
        "fjk_request_nature",
        "fjk_commercial_intent",
        "fjk_destination_route",
        "fjk_timeframe",
        "fjk_exact_dates",
        "fjk_duration",
        "fjk_total_pax",
        "fjk_adults",
        "fjk_children",
        "fjk_infants",
        "fjk_trip_purpose",
        "fjk_other_shared_context",
        "fjk_ready_for_quotation",
        "fjk_info_complete",
    ):
        if d.meta.has_field(f):
            out[f] = d.get(f)
    return out


@frappe.whitelist()
def get_quotation(deal):
    _require_deal_access(deal, "read")
    return {"quotation": frappe.db.get_value("FJK Quotation", {"deal": deal}, "name")}


@frappe.whitelist()
def set_info_complete(deal, value):
    """Operator-controlled, reversible Info Complete state on a Deal.

    Guard for future Supplier Quotation Request creation only; does not block
    ordinary Deal edits. Audit is via native Frappe Version (track_changes).
    """
    _require_deal_access(deal, "write")
    if not frappe.get_meta("CRM Deal").has_field("fjk_info_complete"):
        frappe.throw(_("Info Complete field is not installed"))
    if isinstance(value, str):
        token = value.strip().lower()
        if token in ("true", "1"):
            val = True
        elif token in ("false", "0"):
            val = False
        else:
            frappe.throw(_("value must be a boolean"))
    else:
        val = value
    if not isinstance(val, bool):
        frappe.throw(_("value must be a boolean"))
    d = frappe.get_doc("CRM Deal", deal)
    d.fjk_info_complete = 1 if val else 0
    d.save()
    return {"deal": d.name, "fjk_info_complete": int(d.fjk_info_complete)}


@frappe.whitelist()
def is_info_complete(deal):
    _require_deal_access(deal, "read")
    if not frappe.get_meta("CRM Deal").has_field("fjk_info_complete"):
        return {"deal": deal, "info_complete": False}
    return {
        "deal": deal,
        "info_complete": bool(frappe.db.get_value("CRM Deal", deal, "fjk_info_complete")),
    }


@frappe.whitelist()
def get_readiness(deal):
    _require_deal_access(deal, "read")
    meta = frappe.get_meta("CRM Deal")
    field = "fjk_requirement_lines"
    if not meta.has_field(field):
        return {
            "deal": deal,
            "available": False,
            "missing": [],
            "to_confirm": [],
            "note": "D1 structured requirements not installed yet (Increment 2).",
        }
    rows = frappe.get_all(
        "FJK Deal Requirement Line",
        filters={"parent": deal, "parenttype": "CRM Deal"},
        fields=["domain", "item", "status"],
    )
    return {
        "deal": deal,
        "available": True,
        "missing": [r for r in rows if r.status == "MISSING"],
        "to_confirm": [r for r in rows if r.status == "TO CONFIRM"],
    }


@frappe.whitelist()
def get_deal_summary(deal):
    """Read-only Deal Information Gathering / Deal Summary for the operator.

    Surfaces existing D1 shared fields and the four child grids plus an
    advisory outstanding-information rollup. Does not mutate data and does
    not change get_readiness semantics.
    """
    _require_deal_access(deal, "read")
    meta = frappe.get_meta("CRM Deal")
    d = frappe.get_doc("CRM Deal", deal)

    shared_names = (
        "fjk_request_nature",
        "fjk_commercial_intent",
        "fjk_destination_route",
        "fjk_timeframe",
        "fjk_exact_dates",
        "fjk_duration",
        "fjk_total_pax",
        "fjk_adults",
        "fjk_children",
        "fjk_infants",
        "fjk_trip_purpose",
        "fjk_other_shared_context",
        "fjk_ready_for_quotation",
        "fjk_info_complete",
    )
    out = {
        "deal": d.name,
        "organization": d.organization,
        "status": d.status,
        "deal_owner": d.deal_owner,
        "next_step": d.next_step,
        "info_complete": bool(d.get("fjk_info_complete")) if meta.has_field("fjk_info_complete") else False,
        "ready_for_quotation": bool(d.get("fjk_ready_for_quotation"))
        if meta.has_field("fjk_ready_for_quotation")
        else False,
        "shared": {},
        "components": [],
        "requirement_lines": [],
        "requirement_lines_by_domain": {},
        "guide_requirements": [],
        "activity_items": [],
        "outstanding": {"missing": [], "to_confirm": []},
        "evidence": [],
    }
    for f in shared_names:
        if meta.has_field(f):
            out["shared"][f] = d.get(f)

    def child(dt, grid_field, fields):
        if not meta.has_field(grid_field):
            return []
        return frappe.get_all(
            dt,
            filters={"parent": deal, "parenttype": "CRM Deal"},
            fields=fields,
            order_by="idx asc",
        )

    out["components"] = child(
        "FJK Deal Component", "fjk_components", ["component", "requested", "status", "notes"]
    )
    req = child(
        "FJK Deal Requirement Line",
        "fjk_requirement_lines",
        ["domain", "item", "detail", "date_from", "date_to", "pax_or_qty", "location", "status", "notes"],
    )
    out["requirement_lines"] = req
    by_domain = {}
    for r in req:
        by_domain.setdefault(r.get("domain") or "—", []).append(r)
    out["requirement_lines_by_domain"] = by_domain
    out["guide_requirements"] = child(
        "FJK Deal Guide Requirement",
        "fjk_guide_requirements",
        [
            "languages",
            "date_from",
            "date_to",
            "duration",
            "location",
            "pax",
            "coverage_scope",
            "other",
            "status",
        ],
    )
    out["activity_items"] = child(
        "FJK Deal Activity Item",
        "fjk_activity_items",
        ["item", "quantity", "date_time", "pax_or_coverage", "status", "notes"],
    )

    def collect(area, items):
        for r in items:
            state = r.get("status")
            if state not in ("MISSING", "TO CONFIRM"):
                continue
            entry = {
                "area": area,
                "domain": r.get("domain"),
                "item": r.get("item") or r.get("component") or "—",
            }
            if state == "MISSING":
                out["outstanding"]["missing"].append(entry)
            else:
                out["outstanding"]["to_confirm"].append(entry)

    collect("Components", out["components"])
    collect("Requirements", out["requirement_lines"])
    collect("Guides", out["guide_requirements"])
    collect("Activities", out["activity_items"])

    out["evidence"] = frappe.get_all(
        "File",
        filters={"attached_to_doctype": "CRM Deal", "attached_to_name": deal},
        fields=["name", "file_name", "file_url"],
        order_by="creation desc",
    )
    return out


@frappe.whitelist()
def get_allocation_validation(deal):
    """Read-only advisory allocation + validation for Transportation and
    Accommodation allocations. Never mutates data and never changes readiness."""
    _require_deal_access(deal, "read")
    meta = frappe.get_meta("CRM Deal")

    def rows(dt, grid, fields):
        if not meta.has_field(grid):
            return []
        return frappe.get_all(
            dt,
            filters={"parent": deal, "parenttype": "CRM Deal"},
            fields=fields,
            order_by="idx asc",
        )

    def build(rows_list, type_field, name_field, capacity_field):
        contexts = {}
        for r in rows_list:
            key = (
                r.get("date_from") or "",
                r.get("date_to") or "",
                r.get("location") or "",
                r.get(name_field) or "",
            )
            ctx = contexts.setdefault(
                key,
                {
                    "key": key,
                    "date_from": r.get("date_from"),
                    "date_to": r.get("date_to"),
                    "location": r.get("location"),
                    "name": r.get(name_field),
                    "demand": r.get("demand"),
                    "demand_status": r.get("demand_status"),
                    "rows": [],
                    "total_capacity": 0,
                    "total_allocated": 0,
                    "special": False,
                    "invalid": False,
                    "demand_conflict": False,
                },
            )
            cap = (r.get(capacity_field) or 0) * (r.get("quantity") or 0)
            alloc = r.get("allocated_pax") or 0
            if cap < 0 or alloc < 0 or alloc > cap:
                ctx["invalid"] = True
            if r.get("is_special"):
                ctx["special"] = True
            if r.get("demand") is not None:
                if ctx["demand"] is not None and r.get("demand") != ctx["demand"]:
                    ctx["demand_conflict"] = True
                ctx["demand"] = r.get("demand")
            ctx["total_capacity"] += cap
            ctx["total_allocated"] += alloc
            ctx["rows"].append(
                {
                    "type": r.get(type_field),
                    "quantity": r.get("quantity"),
                    "capacity": r.get(capacity_field),
                    "allocated_pax": r.get("allocated_pax"),
                    "is_special": bool(r.get("is_special")),
                    "status": r.get("status"),
                    "notes": r.get("notes"),
                    "row_capacity": cap,
                }
            )

        out = []
        for ctx in contexts.values():
            if ctx["demand_conflict"]:
                ctx["invalid"] = True
            demand = ctx["demand"]
            dstatus = ctx["demand_status"]
            total_capacity = ctx["total_capacity"]
            allocated = ctx["total_allocated"]
            if ctx["invalid"]:
                state = "ERROR"
            elif demand is None or dstatus in ("MISSING", "TO CONFIRM"):
                state = "NOT DETERMINABLE"
            elif total_capacity <= 0:
                state = "NOT DETERMINABLE"
            elif ctx["special"] or allocated != demand or total_capacity > allocated:
                state = "WARNING"
            else:
                state = "PASS"
            ctx["remaining"] = (demand - allocated) if demand is not None else None
            ctx["excess"] = max(0, total_capacity - allocated)
            ctx["state"] = state
            out.append(ctx)
        return out

    return {
        "deal": deal,
        "transportation": build(
            rows(
                "FJK Transportation Allocation",
                "fjk_transport_allocations",
                [
                    "date_from",
                    "date_to",
                    "location",
                    "demand",
                    "demand_status",
                    "capacity",
                    "quantity",
                    "allocated_pax",
                    "is_special",
                    "status",
                    "notes",
                    "item",
                    "vehicle_type",
                ],
            ),
            "vehicle_type",
            "item",
            "capacity",
        ),
        "accommodation": build(
            rows(
                "FJK Accommodation Allocation",
                "fjk_accommodation_allocations",
                [
                    "date_from",
                    "date_to",
                    "location",
                    "demand",
                    "demand_status",
                    "occupancy",
                    "quantity",
                    "allocated_pax",
                    "is_special",
                    "status",
                    "notes",
                    "hotel",
                    "room_type",
                ],
            ),
            "room_type",
            "hotel",
            "occupancy",
        ),
    }


@frappe.whitelist()
def get_trip_seed_snapshot(deal):
    """Consume-only contract for the future (Phase 2) Trip implementation."""
    _require_deal_access(deal, "read")
    q = frappe.db.get_value("FJK Quotation", {"deal": deal}, "name")
    quoting = None
    if q:
        active = _active_confirmation_version(q)
        if active:
            v = frappe.get_doc("FJK Quotation Version", active)
            quoting = {
                "quotation": q,
                "confirmed_version": v.name,
                "version_no": v.version_no,
                "final_total": v.final_total,
                "items": [
                    {
                        "description": i.description,
                        "component": i.component,
                        "qty": i.qty,
                        "unit_price": i.unit_price,
                        "amount": i.amount,
                    }
                    for i in v.items
                ],
            }
    return {
        "deal": deal,
        "organization": frappe.db.get_value("CRM Deal", deal, "organization"),
        "confirmed_quotation": quoting,
    }
