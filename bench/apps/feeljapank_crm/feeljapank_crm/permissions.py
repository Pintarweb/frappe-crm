"""Access for FJK records mirrors the linked native CRM Deal's permissions.

No second permission model is introduced: if the user can access the Deal,
they can access the FJK records attached to it (subject to role permissions).
"""

import frappe

EVAL_PTYPES = {"read", "write", "create", "submit", "cancel", "delete", "share", "select"}


def _resolve_deal(doc):
    deal = doc.get("deal")
    if not deal and doc.get("quotation"):
        deal = frappe.db.get_value("FJK Quotation", doc.quotation, "deal")
    return deal


def has_permission(doc, ptype=None, user=None, **kwargs):
    user = user or frappe.session.user
    if user == "Administrator":
        return True
    if "System Manager" in frappe.get_roles(user):
        return True
    deal = _resolve_deal(doc)
    if not deal:
        return False
    check = ptype if ptype in EVAL_PTYPES else "read"
    return bool(frappe.has_permission("CRM Deal", doc=deal, ptype=check, user=user))
