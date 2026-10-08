"""FJK AI Proposal Promotion — append-only authoritative promotion record (FK-D12-F).

Boundary (O04): records one human-authorized promotion of an accepted/edited-accepted
AI proposal into an authoritative CRM target, with attribution, idempotency key,
before/after values and outcome. Immutable historical evidence; never edited or
deleted. This record is the reverse-traceability anchor (authoritative → proposal).
"""

import frappe
from frappe import _
from frappe.model.document import Document


class FJKAIProposalPromotion(Document):
    def validate(self):
        if not self.is_new():
            frappe.throw(_("FJK AI Proposal Promotion records are append-only and cannot be modified"))

    def on_trash(self):
        frappe.throw(_("FJK AI Proposal Promotion records cannot be deleted"))
