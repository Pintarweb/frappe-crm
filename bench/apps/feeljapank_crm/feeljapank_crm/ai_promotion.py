"""FK-D12-F authoritative promotion boundary (frappe-aware; outside ``feeljapank_crm.ai``).

Promotes an accepted / edited-accepted, non-authoritative AI Proposal into an
authoritative FJK child-table target on a human-supplied resolved Deal. This is
the ONLY authoritative write path in Stage 0.

Boundaries: human-authorized (DS8 permission); explicit allow-listed target (DS9);
no silent overwrite (DS3); append-only audit record (DS1); idempotent (DS2, DS7);
atomic per datum (DS4); never selects/resolves a Deal, never sets Information
Status / Info Complete / quotation state, never writes arbitrary fields.
"""

from __future__ import annotations

import hashlib

import frappe
from frappe import _
from frappe.utils import now

from feeljapank_crm.ai.schema import ALLOWED_DOMAINS

PROMOTION_DOCTYPE = "FJK AI Proposal Promotion"
PROPOSAL_DOCTYPE = "FJK AI Proposal"

PROMOTABLE_STATES = {"ACCEPTED", "EDITED_ACCEPTED"}

# DS9 allow-list: domain -> (CRM Deal parent fieldname, child doctype, value field).
# Initial allow-list reuses the general requirement line (Information Status `status`
# is deliberately NOT a target). Domains that the requirement line rejects
# (Guide/Activities use dedicated tables) are excluded. Richer per-domain mapping
# remains OPEN (D12.F.9).
_ALLOWED_TARGET = ("fjk_requirement_lines", "FJK Deal Requirement Line", "detail")
_REQUIREMENT_LINE_EXCLUDED = {"Tour Guide", "Activities & Tickets"}
PROMOTION_ALLOWLIST = {
    domain: _ALLOWED_TARGET for domain in ALLOWED_DOMAINS if domain not in _REQUIREMENT_LINE_EXCLUDED
}


def effective_value(proposal) -> str:
    """The promotable value: accepted `edited_value` (EDITED_ACCEPTED) else `proposed_value`."""
    if proposal.lifecycle_state == "EDITED_ACCEPTED":
        for row in reversed(list(proposal.decisions or [])):
            if row.disposition == "EDITED_ACCEPTED" and (row.edited_value or "").strip():
                return row.edited_value
    return proposal.proposed_value


def idempotency_key(proposal, target_deal, target_child_table, target_field, logical_key, value) -> str:
    raw = "|".join([proposal, target_deal, target_child_table, target_field, logical_key or "", value or ""])
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def _audit(
    *,
    proposal,
    target_deal,
    target_child_table,
    target_row,
    target_field,
    logical_key,
    value,
    key,
    override,
    outcome,
    before,
    after,
    error,
):
    doc = frappe.new_doc(PROMOTION_DOCTYPE)
    doc.proposal = proposal.name if hasattr(proposal, "name") else proposal
    doc.run = proposal.run
    doc.source_doctype = proposal.source_doctype
    doc.source_name = proposal.source_name
    doc.target_deal = target_deal
    doc.target_child_table = target_child_table
    doc.target_row = target_row
    doc.target_field = target_field
    doc.target_logical_key = logical_key
    doc.effective_value = value
    doc.idempotency_key = key
    doc.override = override
    doc.outcome = outcome
    doc.before_value = before
    doc.after_value = after
    doc.promoter = frappe.session.user
    doc.promoted_at = now()
    doc.error_detail = error
    doc.insert(ignore_permissions=True)
    return doc


def promote_proposal(*, proposal, target_deal, target_row=None, override=False) -> dict:
    """Promote one accepted proposal into an authoritative target (atomic per datum)."""
    if frappe.session.user in (None, "", "Guest"):
        frappe.throw(_("Login is required to promote an AI proposal"), frappe.PermissionError)

    doc = frappe.get_doc(PROPOSAL_DOCTYPE, proposal)
    if doc.lifecycle_state not in PROMOTABLE_STATES:
        frappe.throw(_("Proposal {0} is not promotion-eligible ({1})").format(doc.name, doc.lifecycle_state))

    # DS8: promotion writes the target Deal, so it requires Deal write authority.
    if not frappe.has_permission("CRM Deal", doc=target_deal, ptype="write"):
        frappe.throw(_("Not permitted to promote into Deal {0}").format(target_deal), frappe.PermissionError)

    allowed = PROMOTION_ALLOWLIST.get(doc.domain)
    if not allowed:
        frappe.throw(_("Domain {0} is not an allowed promotion target").format(doc.domain))
    parent_field, _child_doctype, field = allowed

    value = effective_value(doc)
    key = idempotency_key(doc.name, target_deal, parent_field, field, doc.logical_key, value)

    # DS2/DS7: idempotent duplicate (same proposal + target + effective value).
    existing = frappe.db.get_value(PROMOTION_DOCTYPE, {"idempotency_key": key}, "name")
    if existing:
        return {"promotion": existing, "outcome": "PROMOTED", "idempotent": True, "value": value}

    # DS7: lock the proposal row, then re-check its state inside the transaction.
    frappe.db.get_value(PROPOSAL_DOCTYPE, doc.name, "name", for_update=True)
    doc.reload()
    if doc.lifecycle_state not in PROMOTABLE_STATES:
        frappe.throw(_("Proposal {0} is not promotion-eligible ({1})").format(doc.name, doc.lifecycle_state))

    deal = frappe.get_doc("CRM Deal", target_deal)
    before = ""
    row = None
    if target_row:
        rows = deal.get(parent_field) or []
        row = next((r for r in rows if r.name == target_row), None)
        if row is None:
            frappe.throw(_("Target row {0} not found on Deal {1}").format(target_row, target_deal))
        before = row.get(field) or ""
        if before and str(before) != str(value) and not override:
            # DS3: no silent overwrite — record BLOCKED audit (no key) and raise.
            _audit(
                proposal=doc,
                target_deal=target_deal,
                target_child_table=parent_field,
                target_row=row.name,
                target_field=field,
                logical_key=doc.logical_key,
                value=value,
                key=None,
                override=False,
                outcome="BLOCKED",
                before=before,
                after=before,
                error="existing authoritative value differs",
            )
            frappe.db.commit()
            frappe.throw(_("Authoritative value differs; explicit override required to overwrite"))
        row.set(field, value)
    else:
        # Requirement line requires `item`; the proposal's logical_key is the datum id.
        row = deal.append(parent_field, {"domain": doc.domain, "item": doc.logical_key, field: value})

    try:
        # Authoritative write (respects Deal permission already checked).
        deal.save()
    except Exception as exc:  # noqa: BLE001 - audit failure, never claim success
        frappe.db.rollback()
        _audit(
            proposal=doc,
            target_deal=target_deal,
            target_child_table=parent_field,
            target_row=getattr(row, "name", None),
            target_field=field,
            logical_key=doc.logical_key,
            value=value,
            key=None,
            override=override,
            outcome="FAILED",
            before=before,
            after="",
            error=type(exc).__name__,
        )
        frappe.db.commit()
        raise

    try:
        promo = _audit(
            proposal=doc,
            target_deal=target_deal,
            target_child_table=parent_field,
            target_row=row.name,
            target_field=field,
            logical_key=doc.logical_key,
            value=value,
            key=key,
            override=override if target_row else False,
            outcome="PROMOTED",
            before=before,
            after=value,
            error=None,
        )
        frappe.db.commit()
    except frappe.db.IntegrityError:
        # Concurrent duplicate: roll back this attempt's target write; return the winner.
        frappe.db.rollback()
        existing = frappe.db.get_value(PROMOTION_DOCTYPE, {"idempotency_key": key}, "name")
        if existing:
            return {"promotion": existing, "outcome": "PROMOTED", "idempotent": True, "value": value}
        raise

    return {
        "promotion": promo.name,
        "outcome": "PROMOTED",
        "idempotent": False,
        "value": value,
        "target_row": row.name,
    }
