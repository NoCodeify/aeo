---
paths:
  - "clients/**"
  - "templates/**"
---

# Client Project Workflow

## Directory Structure

Client files are organized in `clients/[client-name]/`:

```
clients/[client-name]/
  [client]-aeo-audit.md           # Audit report
  [client]-aeo-playbook.md        # Implementation playbook
  [client]-website-copy.md        # Copy index
  pages/                           # Individual page copy files
    homepage.md
    [service-pages].md
    vs-[competitor].md             # Comparison pages
  image-prompts.md                 # AI image generation prompts
  google-business-profile.md       # GBP optimization
  llms.txt                         # LLM availability declaration
```

## Templates

Available in `templates/`:
- `audit-report-template.md`
- `playbook-template.md`
- `weekly-report-template.md`
- `proposal-template.md`
- `client-folder-structure.md`
- `content/homepage.md`, `content/service-page.md`, `content/comparison-page.md`, `content/press-release-listicle.md`

## Delivery Pipeline

Use `/aeo-deliver` for full pipeline (agent team), or individual skills:

1. **Intake**: Collect brand info + 5 dream queries (protocol lines 2703-2770)
2. **Audit**: `/aeo-audit [brand]` (forks to aeo-auditor agent)
3. **Playbook**: `/playbook` (forks to playbook-creator agent)
4. **Content**: `/optimize-content` (forks to content-optimizer agent)
5. **Report**: `/client-report` (forks to report-generator agent)

## Tracking

- `tracking/client-roster.md` - Active clients
- `tracking/backlink-tracker.md` - Backlink progress
- `tracking/content-calendar.md` - Publishing schedule
