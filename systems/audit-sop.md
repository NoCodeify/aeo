# AEO Audit SOP

> **Purpose:** Step-by-step process for running a complete AEO audit
> **Time:** 2-4 hours (mostly automated)
> **Owner:** AEO Operator

---

## Overview

Every audit follows this process:
1. Review intake and truth file
2. Run automated 10-run consistency tests
3. Check technical requirements
4. Analyze results
5. Generate report
6. QA and deliver

---

## Prerequisites

Before starting:
- [ ] Client folder exists: `clients/[brand]/`
- [ ] Intake file complete: `[brand]-intake.md`
- [ ] Truth file drafted: `[brand]-truth-file.md`
- [ ] Dream queries identified (5 minimum)
- [ ] Competitors identified (3 minimum)

---

## Step 1: Review Client Context (5 min)

Read through:
1. `[brand]-intake.md` - Understand the brand
2. `[brand]-truth-file.md` - Know the key facts
3. Their website homepage - Get the vibe

Note any:
- Specific claims to verify
- Competitor relationships
- Geographic focus
- Price positioning

---

## Step 2: Run Automated Audit (30-60 min)

### Option A: Full Agent Audit (Recommended)

```
Use the aeo-auditor agent to audit [brand] in the [category] category
```

The agent will:
1. Read the protocol (aeo-protocol-sop.md)
2. Run 10x consistency tests per dream query
3. Check technical requirements
4. Analyze competitor positioning
5. Generate audit report

### Option B: Manual MCP Queries

If you need to run specific queries manually:

**Discovery Queries (Brand Awareness):**
```
mcp__aeo-audit__run_consistency_test
- query: "Best [category] in [location]"
- brand: "[Brand]"
- engines: "both"
- runs: 10
```

**Comparison Queries:**
```
mcp__aeo-audit__compare_llms
- query: "[Brand] vs [Competitor]"
```

**Technical Check:**
```
# Check robots.txt
WebFetch: [website]/robots.txt

# Check for llms.txt
WebFetch: [website]/llms.txt

# Check homepage first 50 words
WebFetch: [website] - "Extract first 50 words of main content"
```

---

## Step 3: Technical Audit (15 min)

Check these requirements manually or via WebFetch:

### Robots.txt
- [ ] Allows Googlebot
- [ ] Allows GPTBot (or not blocked)
- [ ] Allows Google-Extended (for Gemini)
- [ ] Allows ClaudeBot

### llms.txt
- [ ] Exists at /llms.txt
- [ ] Contains accurate brand information
- [ ] Follows correct format

### Schema Markup
Check homepage source for:
- [ ] Organization schema
- [ ] LocalBusiness schema (if applicable)
- [ ] Product/Service schema
- [ ] FAQ schema
- [ ] Review/Rating schema

### First 50 Words Check
Every key page needs WHO/WHAT/WHERE/PRICE in first 50 words:
- [ ] Homepage passes
- [ ] Main service pages pass
- [ ] About page passes

### Server-Side Rendering
- [ ] Content visible without JavaScript
- [ ] Meta tags render server-side
- [ ] No "loading..." placeholders

---

## Step 4: Competitor Analysis (15 min)

For each competitor:

1. **Run comparison query:**
```
mcp__aeo-audit__compare_llms
- query: "[Brand] vs [Competitor]"
```

2. **Note:**
- How are they described?
- What claims does the LLM attribute to them?
- What sources are cited?
- Do they have comparison pages targeting [brand]?

3. **Check their site:**
- Do they have llms.txt?
- What's their first 50 words?
- Do they have comparison pages?

---

## Step 5: Analyze Results (30 min)

### Mention Rate Analysis

| Query | ChatGPT (10 runs) | Gemini (10 runs) |
|-------|-------------------|------------------|
| [Query 1] | X/10 | X/10 |
| [Query 2] | X/10 | X/10 |
| [Query 3] | X/10 | X/10 |

### Position Analysis

When mentioned, what position?
- 1st position: [X] times
- 2nd position: [X] times
- 3rd position: [X] times
- Lower: [X] times

### Citation Analysis

- Cited with link: [X] times
- Mentioned without link: [X] times
- Competitor cited more: [Y/N]

### Accuracy Analysis

- Claims accurate: [Y/N]
- Outdated information: [Y/N]
- Competitor comparisons fair: [Y/N]

### Gap Analysis

- What queries get no mention?
- What competitors always beat them?
- What claims are missing from LLM responses?

---

## Step 6: Generate Report (15 min)

Use the report generator:

```
Use the report-generator agent to create a client report for [brand]
```

Or manually create from template:
- Copy `templates/audit-report-template.md`
- Fill in all sections
- Save to `clients/[brand]/[brand]-aeo-audit.md`

---

## Step 7: QA Review (15-30 min)

Before delivering, verify:

- [ ] All dream queries tested (10x each)
- [ ] All competitors analyzed
- [ ] Technical requirements checked
- [ ] Results accurately transcribed
- [ ] Recommendations are specific and actionable
- [ ] No placeholder text remaining
- [ ] Spelling/grammar checked
- [ ] Brand name spelled correctly throughout

---

## Step 8: Create Playbook (30 min)

After audit, generate the playbook:

```
Use the playbook-creator agent to create a playbook from the [brand] audit
```

This converts audit findings into actionable weekly tasks.

---

## Step 9: Deliver to Client

1. Export audit as PDF (if required)
2. Send via agreed channel (email/Slack)
3. Schedule walkthrough call
4. Add follow-up tasks to tracking

---

## Troubleshooting

### Brand never appears in LLM responses
- Check if they're indexed in Bing (ChatGPT uses Bing)
- Check if they have any backlinks
- They may need foundational SEO first

### LLM gives inaccurate information
- Note specific inaccuracies
- Plan cache-forcing strategy
- Prioritize llms.txt and first-50-words fixes

### Competitor always wins
- Analyze competitor's strategy
- Check their comparison pages
- Note their citations and backlinks

### Technical checks fail
- Document what's missing
- Prioritize in playbook
- May need developer involvement

---

## Time Estimates

| Step | Time |
|------|------|
| Review context | 5 min |
| Run automated audit | 30-60 min |
| Technical audit | 15 min |
| Competitor analysis | 15 min |
| Analyze results | 30 min |
| Generate report | 15 min |
| QA review | 15-30 min |
| Create playbook | 30 min |
| **Total** | **2-4 hours** |

---

## Related Docs

- `aeo-protocol-sop.md` - Full methodology (lines 3348-3432 for consistency tests)
- `templates/audit-report-template.md` - Report format
- `systems/playbook-sop.md` - Playbook creation process
- `.claude/agents/aeo-auditor.md` - Agent instructions
