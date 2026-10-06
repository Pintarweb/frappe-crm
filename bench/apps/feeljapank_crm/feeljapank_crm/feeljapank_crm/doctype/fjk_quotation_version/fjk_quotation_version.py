import frappe
from frappe import _
from frappe.model.document import Document


class FJKQuotationVersion(Document):
    def validate(self):
        if not self.quotation:
            frappe.throw(_("Quotation is required"))
        if self.docstatus == 0:
            for it in self.items or []:
                if it.qty is not None and it.unit_price is not None:
                    it.amount = (it.qty or 0) * (it.unit_price or 0)
            total = sum((it.amount or 0) for it in self.items or [])
            if total:
                self.version_total = total
                self.final_total = (total or 0) - (self.negotiated_discount or 0)

    def before_submit(self):
        # server-assigned monotonic version number (finalized model Y2/Y3)
        last = frappe.db.get_value(
            "FJK Quotation Version",
            {"quotation": self.quotation, "docstatus": 1},
            "version_no",
            order_by="version_no desc",
        )
        self.version_no = (last or 0) + 1
        prev = frappe.db.get_value(
            "FJK Quotation Version",
            {"quotation": self.quotation, "docstatus": 1},
            "name",
            order_by="version_no desc",
        )
        self.previous_version = prev or None

    def on_submit(self):
        q = frappe.get_doc("FJK Quotation", self.quotation)
        q.db_set("current_version", self.name)
        if not q.status or q.status == "Draft":
            q.db_set("status", "Active")
