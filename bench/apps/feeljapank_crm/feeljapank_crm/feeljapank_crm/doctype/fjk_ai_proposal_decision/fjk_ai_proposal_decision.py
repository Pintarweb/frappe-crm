"""FJK AI Proposal Decision — append-only human disposition record (FK-D12-E).

Row-level validation only. Immutability of *existing* rows is enforced at the
parent (``FJK AI Proposal``) level by comparing against the persisted document,
plus ``editable_grid: 0``; this controller validates the semantics of a new row.
"""

import frappe
from frappe import _
from frappe.model.document import Document


class FJKAIProposalDecision(Document):
    def validate(self):
        if self.disposition and self.to_state and self.to_state != self.disposition:
            frappe.throw(_("Decision to_state must equal the disposition"))

        has_edit = bool((self.edited_value or "").strip())
        if self.disposition == "EDITED_ACCEPTED" and not has_edit:
            frappe.throw(_("edited_value is required for EDITED_ACCEPTED"))
        if self.disposition != "EDITED_ACCEPTED" and has_edit:
            frappe.throw(_("edited_value is only allowed for EDITED_ACCEPTED"))

        if self.disposition == "SUPERSEDED" and not self.superseded_by:
            frappe.throw(_("superseded_by is required for SUPERSEDED"))
        if self.disposition != "SUPERSEDED" and self.superseded_by:
            frappe.throw(_("superseded_by is only allowed for SUPERSEDED"))
