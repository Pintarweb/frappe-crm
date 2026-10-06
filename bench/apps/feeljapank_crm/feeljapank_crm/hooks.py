app_name = "feeljapank_crm"
app_title = "FeelJapanK CRM"
app_publisher = "FeelJapanK"
app_description = (
    "FeelJapanK Phase 1 custom Frappe app: structured pre-invoice requirements, "
    "quotation versions, negotiation, and confirmation attached to native CRM Deal records."
)
app_email = "ops@example.invalid"
app_license = "mit"

required_apps = ["frappe", "crm"]

# Controlled configuration only (D1 custom fields + CRM Deal fields layout).
# Populated by `bench export-fixtures --app feeljapank_crm`.
fixtures = [
    {"dt": "Custom Field", "filters": [["dt", "=", "CRM Deal"], ["fieldname", "like", "fjk_%"]]},
    {"dt": "CRM Fields Layout", "filters": [["name", "=", "CRM Deal-Data Fields"]]},
]

# Mirror native CRM Deal access for FJK records (no second permission model).
has_permission = {
    "FJK Quotation": "feeljapank_crm.permissions.has_permission",
    "FJK Quotation Version": "feeljapank_crm.permissions.has_permission",
}

# D1 structured-requirements validation on the native Deal.
doc_events = {
    "CRM Deal": {
        "validate": "feeljapank_crm.d1.validate_deal_requirements",
    }
}
