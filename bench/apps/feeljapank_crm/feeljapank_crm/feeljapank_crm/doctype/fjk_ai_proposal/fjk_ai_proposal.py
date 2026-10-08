"""FJK AI Proposal — non-authoritative validated AI proposal evidence (FK-D12-D/E).

Boundary (O01/O02/O04/O05): stores the original AI proposed value and its target
identity as a *proposal*, never as authoritative CRM data. Original proposal
fields are immutable; `lifecycle_state` is the current disposition state, driven
only by append-only `decisions` (D12-E). No promotion/CRM write occurs here.
"""

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import now

# Original AI proposal content is immutable after creation.
IMMUTABLE_FIELDS = (
    "naming_series",
    "run",
    "source_doctype",
    "source_name",
    "domain",
    "logical_key",
    "proposed_value",
    "proposed_value_type",
    "provenance_status",
    "status_hint",
    "confidence",
    "uncertainty",
    "evidence_span",
    "target_hint",
    "created_at",
)

# D12-E exact permitted lifecycle transitions (no other transitions).
ALLOWED_TRANSITIONS = {
    "PROPOSED": {"ACCEPTED", "EDITED_ACCEPTED", "REJECTED", "DEFERRED", "SUPERSEDED"},
    "DEFERRED": {"ACCEPTED", "EDITED_ACCEPTED", "REJECTED", "SUPERSEDED"},
    "ACCEPTED": {"SUPERSEDED"},
    "EDITED_ACCEPTED": {"SUPERSEDED"},
    "REJECTED": set(),
    "SUPERSEDED": set(),
}
TERMINAL_STATES = {"REJECTED", "SUPERSEDED"}
PROMOTION_ELIGIBLE_STATES = {"ACCEPTED", "EDITED_ACCEPTED"}

# Fields compared to prove an existing decision row is unchanged (append-only).
DECISION_COMPARE_FIELDS = (
    "disposition",
    "from_state",
    "to_state",
    "reviewer",
    "decided_at",
    "edited_value",
    "reason",
    "superseded_by",
)


class FJKAIProposal(Document):
    def validate(self):
        if self.is_new():
            if self.decisions:
                frappe.throw(_("Decisions cannot be set when creating a proposal"))
            if not self.lifecycle_state:
                self.lifecycle_state = "PROPOSED"
            if self.lifecycle_state != "PROPOSED":
                frappe.throw(_("A new proposal must start in PROPOSED"))
            if not self.created_at:
                self.created_at = now()
            return

        previous = self.get_doc_before_save()
        if not previous:
            return

        for field in IMMUTABLE_FIELDS:
            if self.get(field) != previous.get(field):
                frappe.throw(_("Field {0} is immutable on FJK AI Proposal").format(field))

        self._validate_decisions_append_only(previous)
        self._validate_lifecycle_transition(previous)

    def _validate_decisions_append_only(self, previous):
        """Existing decision rows are immutable historical records."""
        previous_rows = {row.name: row for row in (previous.decisions or [])}
        current_rows = {row.name: row for row in (self.decisions or [])}
        for name, prev_row in previous_rows.items():
            if name not in current_rows:
                frappe.throw(_("Decisions are append-only; an existing decision cannot be deleted"))
            cur_row = current_rows[name]
            for field in DECISION_COMPARE_FIELDS:
                if (cur_row.get(field) or None) != (prev_row.get(field) or None):
                    frappe.throw(
                        _("Decisions are append-only; {0} of an existing decision cannot change").format(
                            field
                        )
                    )

    def _validate_lifecycle_transition(self, previous):
        previous_names = {row.name for row in (previous.decisions or [])}
        new_rows = [row for row in (self.decisions or []) if row.name not in previous_names]

        old_state = previous.lifecycle_state
        new_state = self.lifecycle_state

        if old_state == new_state:
            if new_rows:
                frappe.throw(_("A new decision must correspond to a lifecycle transition"))
            return

        if old_state in TERMINAL_STATES:
            frappe.throw(_("A terminal proposal ({0}) cannot transition").format(old_state))
        if new_state not in ALLOWED_TRANSITIONS.get(old_state, set()):
            frappe.throw(_("Illegal proposal transition: {0} -> {1}").format(old_state, new_state))
        if len(new_rows) != 1:
            frappe.throw(_("A lifecycle transition requires exactly one new decision row"))

        row = new_rows[0]
        if row.from_state != old_state or row.to_state != new_state or row.disposition != new_state:
            frappe.throw(_("Decision row does not match the requested lifecycle transition"))
