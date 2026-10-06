import frappe
from frappe import _
from frappe.model.document import Document


class FJKQuotation(Document):
    def validate(self):
        if not self.deal:
            frappe.throw(_("Deal is required"))
        if not self.organization:
            org = frappe.db.get_value("CRM Deal", self.deal, "organization")
            if org:
                self.organization = org
