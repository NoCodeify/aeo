# Client Intake SOP

> **Purpose:** Standardized process for onboarding new AEO clients
> **Time:** 30 minutes total (5 min client, 25 min setup)
> **Owner:** AEO Operator

---

## Overview

Every new client goes through the same intake process:
1. Client fills out Tally form (5 min)
2. We create their folder structure
3. We generate their truth file template
4. We schedule kickoff call

---

## Step 1: Send Intake Form

Send client the Tally form link. Form collects:

**Required Fields:**
- Brand name
- Website URL
- Industry/category
- 5 "dream queries" (what they want to rank for in AI)
- Top 3 competitors (who they want to beat)
- Key differentiators (what makes them unique)
- Target geography (where their customers are)
- Price range (for schema markup)

**Optional Fields:**
- Founder/CEO name and bio
- Years in business
- Notable clients/case studies
- Awards or certifications
- Media mentions

See `systems/intake-questions.md` for full question list.

---

## Step 2: Create Client Folder

Once form is submitted, create folder structure:

```bash
mkdir -p clients/[brand-name]/{pages,assets,reports}
```

**Folder Structure:**
```
clients/
└── [brand-name]/
    ├── [brand]-intake.md          # Copy of form responses
    ├── [brand]-truth-file.md      # Brand facts for LLM context
    ├── [brand]-aeo-audit.md       # Audit results
    ├── [brand]-aeo-playbook.md    # Implementation plan
    ├── pages/                      # Website copy files
    │   ├── homepage.md
    │   ├── [service].md
    │   └── vs-[competitor].md
    ├── assets/                     # Images, PDFs, etc.
    └── reports/                    # Weekly/monthly reports
        └── weekly-YYYY-MM-DD.md
```

---

## Step 3: Create Intake File

Copy form responses into `[brand]-intake.md`:

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
[Any additional context from initial conversations]
```

---

## Step 4: Create Truth File Template

Generate `[brand]-truth-file.md` with collected information:

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
1. [First differentiator with specifics]
2. [Second differentiator with specifics]
3. [Third differentiator with specifics]

## Credentials
- [Award or certification]
- [Media mention]
- [Notable client/case study]

## Comparison Claims
vs [Competitor 1]: [How client is better]
vs [Competitor 2]: [How client is better]
vs [Competitor 3]: [How client is better]

## Quotable Facts
- "[Specific statistic or claim]"
- "[Another quotable fact]"
- "[Third quotable fact]"
```

---

## Step 5: Schedule Kickoff Call

Send calendar invite for 30-min kickoff call.

**Kickoff Call Agenda:**
1. Confirm intake information (5 min)
2. Review dream queries (5 min)
3. Discuss competitors (5 min)
4. Explain process and timeline (10 min)
5. Q&A (5 min)

---

## Step 6: Queue for Audit

After kickoff call:
1. Mark client as "Intake Complete" in roster
2. Add to audit queue
3. Set expected delivery date (48 hours)

---

## Checklist

- [ ] Intake form received
- [ ] Client folder created
- [ ] Intake file populated
- [ ] Truth file template created
- [ ] Kickoff call scheduled
- [ ] Client added to roster
- [ ] Audit queued

---

## Troubleshooting

**Client doesn't know dream queries:**
Suggest: "What would you type into ChatGPT if you were your ideal customer looking for your service?"

**Client has too many competitors:**
Ask: "Which 3 would you most want to beat in AI recommendations?"

**Client can't articulate differentiators:**
Ask: "Why do customers choose you over [specific competitor]?"

---

## Related Docs

- `systems/intake-questions.md` - Full question list for Tally
- `templates/client-folder-structure.md` - Folder structure details
- `tracking/client-roster.md` - Client status tracking
