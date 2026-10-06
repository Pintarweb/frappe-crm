"""D1 validation for the native CRM Deal structured requirements (Increment 2)."""

import frappe
from frappe import _

STATUSES = {"KNOWN", "MISSING", "TO CONFIRM", "CUSTOMER-CONFIRMED", "NOT APPLICABLE"}
RESERVED_DOMAINS = {"Tour Guide", "Activities & Tickets"}


def _check_status(status):
    if status and status not in STATUSES:
        frappe.throw(_("Invalid requirement status: {0}").format(status))


def validate_deal_requirements(doc, method=None):
    meta = frappe.get_meta("CRM Deal")

    if meta.has_field("fjk_components"):
        seen = set()
        for row in doc.get("fjk_components") or []:
            if not row.component:
                frappe.throw(_("Component is required in FeelJapanK Requirements"))
            if row.component in seen:
                frappe.throw(
                    _("Duplicate component {0} — each component may appear once").format(row.component)
                )
            seen.add(row.component)
            _check_status(row.status)

    if meta.has_field("fjk_requirement_lines"):
        for row in doc.get("fjk_requirement_lines") or []:
            if row.domain in RESERVED_DOMAINS:
                frappe.throw(
                    _("Domain {0} must be recorded in the dedicated Guide/Activity table").format(row.domain)
                )
            if not row.item:
                frappe.throw(_("Item is required on a requirement line"))
            _check_status(row.status)

    for field in ("fjk_guide_requirements", "fjk_activity_items"):
        if meta.has_field(field):
            for row in doc.get(field) or []:
                _check_status(row.status)

    if meta.has_field("fjk_transport_allocations"):
        for row in doc.get("fjk_transport_allocations") or []:
            _check_allocation_row(row, "Transport allocation")
            _validate_capacity(row, "Transport allocation", "capacity", "vehicle quantity")

    if meta.has_field("fjk_accommodation_allocations"):
        for row in doc.get("fjk_accommodation_allocations") or []:
            _check_allocation_row(row, "Accommodation allocation")
            _validate_capacity(row, "Accommodation allocation", "occupancy", "room quantity")


def _check_allocation_row(row, label):
    _check_status(row.status)
    if getattr(row, "demand_status", None):
        _check_status(row.demand_status)
    for fieldname in ("demand", "capacity", "occupancy", "quantity", "allocated_pax"):
        value = getattr(row, fieldname, None)
        if value is not None and value < 0:
            frappe.throw(_("{0}: {1} cannot be negative").format(label, fieldname))


def _validate_capacity(row, label, capacity_field, quantity_label):
    capacity = getattr(row, capacity_field, 0) or 0
    quantity = row.quantity or 0
    allocated = row.allocated_pax or 0
    if quantity > 0 and capacity <= 0:
        frappe.throw(
            _("{0}: capacity per unit must be greater than 0 when {1} is set").format(label, quantity_label)
        )
    total_capacity = capacity * quantity
    if allocated > total_capacity:
        frappe.throw(
            _("{0}: allocated pax ({1}) exceeds total capacity ({2})").format(
                label, allocated, total_capacity
            )
        )
