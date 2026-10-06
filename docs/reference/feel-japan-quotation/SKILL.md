---
name: feel-japan-quotation
description: Use this skill whenever Yus (Feel Japan with K Co. Ltd / Ark Alliance Sdn Bhd) asks to create a tour quotation, price quotation, or itinerary document in .docx Word format. Triggers include any mention of "quotation", "quote", "itinerary", "Feel Japan", "Ark Alliance", or requests to produce a formatted Word document for a Japan tour group. Always use this skill when the Feel_Japan_K_letterhead.docx is attached. Even if the user just says "create a quotation for this" or pastes trip details, use this skill.
---

# Feel Japan Quotation Skill

Produces client-facing quotation documents (with optional tentative itinerary) in branded Word (.docx) format on the Feel Japan / Ark Alliance letterhead.

## When This Skill Is Used

- User attaches `Feel_Japan_K_letterhead.docx` and asks for a quotation
- User says "create a quotation", "write a quote", "make an itinerary" for a Japan tour
- User pastes pricing data, trip dates, group size, hotel names, or transport details and asks for a document

---

## Step 1 — Read the DOCX skill first

Before writing any code or XML, always read:
```
/mnt/skills/public/docx/SKILL.md
```
This is mandatory. It defines the pack/unpack scripts, validation commands, and environment constraints.

---

## Step 2 — Unpack the letterhead

The user will always attach `Feel_Japan_K_letterhead.docx`. Unpack it as the base:

```bash
mkdir -p /home/claude/quotation_work
unzip -q /mnt/user-data/uploads/Feel_Japan_K_letterhead.docx -d /home/claude/quotation_work/
cd /mnt/skills/public/docx && python3 scripts/merge_runs.py /home/claude/quotation_work/
```

Never build from scratch — always use the letterhead as the base to preserve the logo, header, footer, fonts, and page margins.

---

## Step 3 — Write the document.xml

Replace `/home/claude/quotation_work/word/document.xml` with the full quotation content. Always include the complete XML namespace declaration (copy from the unpacked file's first line).

### Document structure order:
1. QUOTATION title
2. Re: line
3. Spacer
4. Attn: (blank)
5. Salutation
6. Opening paragraph
7. PRICING SUMMARY section + table
8. ACCOMMODATION section + table
9. PRICE INCLUDES section + bullets
10. PRICE EXCLUDES section + bullets
11. Closing paragraph
12. Signature block
13. [Page break + TENTATIVE ITINERARY — only if itinerary data provided]

---

## Step 4 — Standard rules (apply to every document)

### Title & header
- `QUOTATION` — bold, uppercase, centred, font size 32 (w:sz val="32")
- **No date** on the document
- **Attn: field always left blank** — just `<w:t>Attn:</w:t>` with nothing after it

### Pricing
- Apply **20% markup silently** — never mention markup, percentage, or "marked up" anywhere in the document
- Never show per-item cost breakdowns — no accommodation cost, transport cost, or meal cost figures
- Entrance fees: list **attraction names only**, no prices
- Meal pricing: **do not show** per-person rates

### Standard wording — copy exactly
**Tipping line (always in PRICE EXCLUDES):**
```
Tipping: JPY 400 per person / per day for driver and guide (2 persons)
```

**Overtime/bus limit note (always in PRICE INCLUDES under transport bullet):**
```
Note: Daily bus usage must not exceed 10 hours or 300 km. Beyond that, both driver and guide
are required to be paid JPY 12,000 per hour / per 100 km overtime surcharge. Any work after
8:00 PM incurs a night work fee of JPY 12,000 per hour per person, regardless of total hours used.
```

### Sign-off (always)
```
Feel Japan with K Co. Ltd
Ark Alliance Sdn Bhd
```

---

## Step 5 — Formatting & colours

### Section headings (PRICING SUMMARY, ACCOMMODATION, PRICE INCLUDES, PRICE EXCLUDES)
```xml
<w:r><w:rPr><w:b/><w:bCs/><w:color w:val="1E6CB5"/></w:rPr><w:t>SECTION HEADING</w:t></w:r>
```

### Table styling
- Header rows: fill `1E6CB5` (blue), text white (`FFFFFF`), bold
- Data rows: alternate between no fill (white) and fill `EBF2FA` (light blue)
- All borders: `single`, sz=4, color `CCCCCC`
- Cell margins: top/bottom 80 dxa, left/right 120 dxa
- **Use `w:shd` not `w:shading`** (common mistake — wrong element name will fail validation)
- In `w:tcPr`, order must be: `w:tcW` → `w:tcBorders` → `w:shd` → `w:tcMar`

### Bullets (PRICE INCLUDES / PRICE EXCLUDES)
```xml
<w:pPr><w:spacing w:after="60"/><w:ind w:left="360" w:hanging="360"/></w:pPr>
<w:r><w:t xml:space="preserve">•  Item text here</w:t></w:r>
```

Sub-bullets (e.g. entrance fee list):
```xml
<w:pPr><w:spacing w:after="60"/><w:ind w:left="720" w:hanging="360"/></w:pPr>
<w:r><w:t xml:space="preserve">–  Attraction name</w:t></w:r>
```

### Paragraph properties (all paragraphs)
Always include `w:keepTogether` and `w:keepNext` to prevent mid-paragraph page breaks:
```xml
<w:pPr>
  <w:keepNext/>
  <w:keepLines/>
  <w:spacing w:after="60"/>
</w:pPr>
```

### Table rows — never split across pages
Add to every `w:tr`:
```xml
<w:trPr><w:cantSplit/></w:trPr>
```

### Page breaks
- If quotation exceeds one page, insert a page break **before** the signature block
- If itinerary follows, insert a page break **after** the signature block
```xml
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

### Element ordering in w:pPr (strict OOXML order)
`w:pStyle` → `w:numPr` → `w:keepNext` → `w:keepLines` → `w:spacing` → `w:ind` → `w:jc` → `w:rPr`

Incorrect order will fail validation.

---

## Step 6 — Itinerary page (only if itinerary data is provided)

Add after the signature block, separated by a page break.

```
TENTATIVE ITINERARY          ← bold uppercase centred, sz=32
Route | Dates                ← bold centred
Group composition line       ← regular centred
[blank spacer paragraph]

DD Mon (Day N) — Location (meal codes)   ← bold, colour 1E6CB5
•  Activity one
•  Activity two
...

[repeat for each day]

B = Breakfast | L = Lunch | D = Dinner   ← italic, colour 888888
* This itinerary is tentative and subject to change...  ← italic, colour 888888
```

Day header format:
```xml
<w:p><w:pPr><w:spacing w:before="160" w:after="40"/></w:pPr>
  <w:r><w:rPr><w:b/><w:bCs/><w:color w:val="1E6CB5"/></w:rPr>
    <w:t>14 Nov (Day 1) — Osaka – Fuji (BD)</w:t>
  </w:r>
</w:p>
```

---

## Step 7 — Validate and pack

```bash
cd /mnt/skills/public/docx
python scripts/office/validate.py /home/claude/quotation_work --original /mnt/user-data/uploads/Feel_Japan_K_letterhead.docx
```

Fix any validation errors before packing. Common issues:
- `w:shading` → must be `w:shd`
- Wrong element order in `w:pPr` (spacing before jc)
- Wrong element order in `w:tcPr` (shd before tcBorders)

Pack once validation passes:
```bash
cd /home/claude/quotation_work
zip -Xr /mnt/user-data/outputs/[filename].docx .
```

Then call `present_files` with the output path.

---

## Naming convention for output files

| Tour type | Example filename |
|---|---|
| Group city tour | `Sapporo-Tokyo_Quotation_Dec2026.docx` |
| Private family tour | `Osaka-Fuji-Tokyo_Quotation_Nov2026.docx` |
| Van/transport only | `Osaka_Van_Quotation_Aug2026.docx` |
| Itinerary only | `Osaka-Fuji-Tokyo_Itinerary_Nov2026.docx` |

---

## Common mistakes to avoid

| Mistake | Fix |
|---|---|
| Using `w:shading` | Use `w:shd` |
| `w:jc` before `w:spacing` in pPr | Put `w:spacing` first |
| `w:shd` before `w:tcBorders` in tcPr | Put `w:tcBorders` first |
| Mentioning "20% markup" | Never mention it |
| Showing hotel/transport/meal costs | Never show per-item costs |
| Showing entrance fee prices | Names only, no prices |
| Building from scratch | Always unpack the letterhead first |
| Packing without validating | Always validate first |
