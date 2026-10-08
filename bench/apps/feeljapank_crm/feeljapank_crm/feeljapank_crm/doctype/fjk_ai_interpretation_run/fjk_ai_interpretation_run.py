"""FJK AI Interpretation Run — durable, immutable AI processing/provenance record (FK-D12-D).

Boundary (O01): a Run holds immutable identity/provenance facts and a single
PROCESSING -> terminal outcome transition. It never stores raw provider payload
and never writes authoritative CRM data.

Immutability is enforced here so ordinary edits cannot rewrite historical facts
or re-open a terminal outcome.
"""

import frappe
from frappe import _
from frappe.model.document import Document

# Immutable after creation.
IMMUTABLE_FIELDS = (
    "naming_series",
    "source_doctype",
    "source_name",
    "source_state_ref",
    "source_content_hash",
    "source_timestamp",
    "instruction_ref",
    "output_contract_ref",
    "provider",
    "model",
    "run_key",
    "started_at",
)

# Known only after the provider call; write-once (None -> value) during outcome.
WRITE_ONCE_FIELDS = ("model_fingerprint", "provider_request_id", "provider_response_id")

TERMINAL_STATUSES = {
    "SUCCEEDED",
    "FAILED",
    "INCOMPLETE",
    "MALFORMED",
    "VALIDATION_FAILED",
    "POLICY_REJECTED",
}


class FJKAIInterpretationRun(Document):
    def validate(self):
        if self.is_new():
            if not self.status:
                self.status = "PROCESSING"
            return

        previous = self.get_doc_before_save()
        if not previous:
            return

        for field in IMMUTABLE_FIELDS:
            if self.get(field) != previous.get(field):
                frappe.throw(_("Field {0} is immutable on FJK AI Interpretation Run").format(field))

        for field in WRITE_ONCE_FIELDS:
            old_value = previous.get(field)
            if old_value and self.get(field) != old_value:
                frappe.throw(_("Field {0} is write-once").format(field))

        # Outcome may complete exactly once: PROCESSING -> terminal (or no-op).
        if previous.status in TERMINAL_STATUSES and self.status != previous.status:
            frappe.throw(_("A terminal Run status cannot be changed"))
        if previous.status == "PROCESSING" and self.status not in TERMINAL_STATUSES | {"PROCESSING"}:
            frappe.throw(_("Invalid Run status transition from PROCESSING"))
