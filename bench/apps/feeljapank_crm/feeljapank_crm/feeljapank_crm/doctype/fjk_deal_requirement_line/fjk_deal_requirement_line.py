import frappe
from frappe import _
from frappe.model.document import Document


class FJKDealRequirementLine(Document):
    def validate(self):
        if self.domain in ("Tour Guide", "Activities & Tickets"):
            frappe.throw(
                _("Domain {0} is not allowed here; use the dedicated Guide/Activity tables.").format(
                    self.domain
                )
            )
        if not self.item:
            frappe.throw(_("Item is required"))
