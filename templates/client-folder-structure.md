# Client Folder Structure

> **Purpose:** Standard folder structure for every client project

---

## Folder Structure

```
clients/
└── [brand-name]/
    ├── [brand]-intake.md              # Intake form responses
    ├── [brand]-truth-file.md          # Brand facts for LLM context
    ├── [brand]-aeo-audit.md           # Audit results
    ├── [brand]-aeo-playbook.md        # Implementation plan
    ├── [brand]-website-copy.md        # Index of all page copies
    │
    ├── pages/                          # Website copy files
    │   ├── homepage.md
    │   ├── about.md
    │   ├── [service-1].md
    │   ├── [service-2].md
    │   ├── vs-[competitor-1].md
    │   ├── vs-[competitor-2].md
    │   └── vs-[competitor-3].md
    │
    ├── assets/                         # Images, PDFs, etc.
    │   ├── logo.png
    │   ├── team-photos/
    │   └── case-studies/
    │
    ├── reports/                        # Weekly/monthly reports
    │   ├── weekly-2026-01-13.md
    │   ├── weekly-2026-01-20.md
    │   ├── weekly-2026-01-27.md
    │   └── monthly-2026-01.md
    │
    └── backlinks/                      # Link tracking
        └── backlink-log.md
```

---

## File Naming Conventions

### Core Files
```
[brand]-intake.md
[brand]-truth-file.md
[brand]-aeo-audit.md
[brand]-aeo-playbook.md
[brand]-website-copy.md
```

### Page Copies
```
pages/homepage.md
pages/about.md
pages/[service-name].md           # e.g., hair-transplant.md
pages/vs-[competitor].md          # e.g., vs-zarev.md
pages/faq.md
pages/contact.md
```

### Reports
```
reports/weekly-YYYY-MM-DD.md      # e.g., weekly-2026-01-27.md
reports/monthly-YYYY-MM.md        # e.g., monthly-2026-01.md
```

---

## Creating a New Client Folder

### Quick Setup Command

```bash
# Replace [brand] with actual brand name (lowercase, hyphens)
BRAND="brand-name"
mkdir -p clients/$BRAND/{pages,assets,reports,backlinks}
touch clients/$BRAND/$BRAND-intake.md
touch clients/$BRAND/$BRAND-truth-file.md
touch clients/$BRAND/$BRAND-aeo-audit.md
touch clients/$BRAND/$BRAND-aeo-playbook.md
touch clients/$BRAND/$BRAND-website-copy.md
touch clients/$BRAND/backlinks/backlink-log.md
```

### Or Ask Claude

```
Create a new client folder for [Brand Name] in the [category] category
```

---

## File Templates

### Intake File Template
```markdown
# [Brand] - Client Intake

**Date:** YYYY-MM-DD
**Tier:** Foundation / Growth / Dominance

## Brand Information
- **Name:**
- **Website:**
- **Category:**
- **Geography:**
- **Price Range:**

## Dream Queries
1.
2.
3.
4.
5.

## Competitors
1.
2.
3.

## Key Differentiators
-
-
-

## Brand Facts
- Founded:
- Founder:
- Notable clients:
- Awards:
- Media mentions:

## Notes
```

### Truth File Template
```markdown
# [Brand] - Truth File

> Last updated: YYYY-MM-DD

## Entity Definition
[Brand] is a [category] based in [location] that [primary service/product].

## Key Facts
- Founded: [year]
- Location: [city, country]
- Specialization: [main focus]
- Price range: [range]

## Differentiators
1. [First differentiator]
2. [Second differentiator]
3. [Third differentiator]

## Credentials
- [Award or certification]
- [Media mention]
- [Notable client]

## Comparison Claims
- vs [Competitor 1]: [How client is better]
- vs [Competitor 2]: [How client is better]

## Quotable Facts
- "[Specific statistic]"
- "[Another quotable fact]"
```

### Website Copy Index Template
```markdown
# [Brand] - Website Copy Index

> Last updated: YYYY-MM-DD

## Published Pages

| Page | File | Status | Last Updated |
|------|------|--------|--------------|
| Homepage | pages/homepage.md | Live | YYYY-MM-DD |
| About | pages/about.md | Draft | YYYY-MM-DD |

## Comparison Pages

| Page | File | Status | Last Updated |
|------|------|--------|--------------|
| vs [Competitor 1] | pages/vs-[comp1].md | Live | YYYY-MM-DD |
| vs [Competitor 2] | pages/vs-[comp2].md | Draft | YYYY-MM-DD |

## Planned Pages

| Page | Priority | Target Date |
|------|----------|-------------|
| [Page name] | High | YYYY-MM-DD |
```

### Backlink Log Template
```markdown
# [Brand] - Backlink Log

## Summary
- **Total Links:** 0
- **Average DR:** -
- **Last Updated:** YYYY-MM-DD

## Links

| Date | Type | Linking Domain | DR | Target URL | Anchor | Status | Cost |
|------|------|----------------|----|-----------| -------|--------|------|
| | | | | | | | |
```

---

## Folder Permissions

- Client folder is private (client-specific data)
- Only share with client what's in their folder
- Never reference other client data

---

## Archiving Completed Clients

When a client project ends:

```bash
# Move to archive
mv clients/[brand] clients/_archive/[brand]
```

Or add prefix:
```bash
mv clients/[brand] clients/_[brand]
```

---

## Related Docs

- `systems/intake-sop.md` - Intake process
- `templates/audit-report-template.md` - Audit format
- `templates/playbook-template.md` - Playbook format
