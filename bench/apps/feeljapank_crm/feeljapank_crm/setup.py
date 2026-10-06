"""D1 schema application for the native CRM Deal (Increment 2).

Creates the approved D1 custom fields (shared context + four child grids) and
appends the "FeelJapanK Requirements" section to the CRM Deal Data Fields
layout in the locked order. Idempotent.
"""

import json

import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

MODULE = "FeelJapanK CRM"

SHARED_FIELDS = [
    ("fjk_request_nature", "Select", "Request Nature", "New request\nAmendment\nRepeat customer enquiry"),
    ("fjk_commercial_intent", "Select", "Commercial Intent", "Quotation wanted\nInfo only\nUndecided"),
    ("fjk_destination_route", "Data", "Destination / Route", None),
    ("fjk_timeframe", "Data", "Timeframe", None),
    ("fjk_exact_dates", "Data", "Exact Dates", None),
    ("fjk_duration", "Data", "Duration", None),
    ("fjk_total_pax", "Int", "Total Pax", None),
    ("fjk_adults", "Int", "Adults", None),
    ("fjk_children", "Int", "Children", None),
    ("fjk_infants", "Int", "Infants", None),
    ("fjk_trip_purpose", "Data", "Trip Purpose / Type", None),
    ("fjk_other_shared_context", "Small Text", "Other Shared Context", None),
    ("fjk_ready_for_quotation", "Check", "Ready for Quotation", None),
    ("fjk_info_complete", "Check", "Info Complete", None),
]

TABLE_FIELDS = [
    ("fjk_components", "FJK Deal Component", "Components"),
    ("fjk_requirement_lines", "FJK Deal Requirement Line", "Requirement Lines"),
    ("fjk_guide_requirements", "FJK Deal Guide Requirement", "Guide Requirements"),
    ("fjk_activity_items", "FJK Deal Activity Item", "Activity Items"),
    ("fjk_transport_allocations", "FJK Transportation Allocation", "Transportation Allocations"),
    ("fjk_accommodation_allocations", "FJK Accommodation Allocation", "Accommodation Allocations"),
]


def make_d1_custom_fields():
    fields = {}
    df = []
    insert_after = "territory"
    for name, ftype, label, options in SHARED_FIELDS:
        d = {
            "fieldname": name,
            "fieldtype": ftype,
            "label": label,
            "insert_after": insert_after,
            "module": MODULE,
        }
        if options:
            d["options"] = options
        if ftype == "Check":
            d["default"] = "0"
        df.append(d)
        insert_after = name
    for name, target, label in TABLE_FIELDS:
        d = {
            "fieldname": name,
            "fieldtype": "Table",
            "options": target,
            "label": label,
            "insert_after": insert_after,
            "module": MODULE,
        }
        df.append(d)
        insert_after = name
    fields["CRM Deal"] = df
    create_custom_fields(fields, update=True)
    return len(df)


def make_deal_layout():
    name = "CRM Deal-Data Fields"
    if not frappe.db.exists("CRM Fields Layout", name):
        frappe.throw("CRM Fields Layout {0} not found".format(name))
    doc = frappe.get_doc("CRM Fields Layout", name)
    layout = json.loads(doc.layout)

    section_names = {s.get("name") for tab in layout for s in tab.get("sections", [])}
    if "fjk_requirements_section" in section_names:
        changed = False
        for tab in layout:
            for section in tab.get("sections", []):
                if section.get("name") == "fjk_requirements_section":
                    for column in section.get("columns", []):
                        fields = column.get("fields", [])
                        if "fjk_ready_for_quotation" in fields and "fjk_info_complete" not in fields:
                            fields.insert(fields.index("fjk_ready_for_quotation") + 1, "fjk_info_complete")
                            changed = True
        if "fjk_allocations_section" not in section_names:
            layout[0].setdefault("sections", []).append(
                {
                    "label": "FeelJapanK Allocations",
                    "name": "fjk_allocations_section",
                    "opened": True,
                    "columns": [
                        {"name": "fjk_col_alloc_1", "fields": ["fjk_transport_allocations"]},
                        {"name": "fjk_col_alloc_2", "fields": ["fjk_accommodation_allocations"]},
                    ],
                }
            )
            changed = True
        if changed:
            doc.layout = json.dumps(layout)
            doc.save(ignore_permissions=True)
            return "updated"
        return "already-present"

    fjk_sections = [
        {
            "label": "FeelJapanK Requirements",
            "name": "fjk_requirements_section",
            "opened": True,
            "columns": [
                {
                    "name": "fjk_col_context_1",
                    "fields": [
                        "fjk_request_nature",
                        "fjk_commercial_intent",
                        "fjk_destination_route",
                        "fjk_timeframe",
                        "fjk_exact_dates",
                    ],
                },
                {
                    "name": "fjk_col_context_2",
                    "fields": [
                        "fjk_duration",
                        "fjk_total_pax",
                        "fjk_adults",
                        "fjk_children",
                        "fjk_infants",
                        "fjk_trip_purpose",
                        "fjk_other_shared_context",
                        "fjk_ready_for_quotation",
                        "fjk_info_complete",
                    ],
                },
            ],
        },
        {
            "label": "FeelJapanK Requirement Detail",
            "name": "fjk_requirements_detail_section",
            "opened": True,
            "columns": [
                {"name": "fjk_col_grids_1", "fields": ["fjk_components", "fjk_requirement_lines"]},
                {"name": "fjk_col_grids_2", "fields": ["fjk_guide_requirements", "fjk_activity_items"]},
            ],
        },
        {
            "label": "FeelJapanK Allocations",
            "name": "fjk_allocations_section",
            "opened": True,
            "columns": [
                {"name": "fjk_col_alloc_1", "fields": ["fjk_transport_allocations"]},
                {"name": "fjk_col_alloc_2", "fields": ["fjk_accommodation_allocations"]},
            ],
        },
    ]

    target_tab = layout[0]
    target_tab.setdefault("sections", []).extend(fjk_sections)
    doc.layout = json.dumps(layout)
    doc.save(ignore_permissions=True)
    return "appended"


def apply_d1():
    frappe.set_user("Administrator")
    n = make_d1_custom_fields()
    res = make_deal_layout()
    frappe.db.commit()
    return {"custom_fields": n, "layout": res}
