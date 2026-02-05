# Monitoring SOP

> **Purpose:** Weekly and monthly tracking of client AEO visibility
> **Time:** 30-60 minutes per client per week
> **Owner:** AEO Operator (will be automated)

---

## Overview

After implementation, we monitor to:
1. Track visibility changes
2. Catch visibility drops early
3. Prove ROI to clients
4. Adjust strategy as needed

---

## Monitoring Frequency by Tier

| Tier | Consistency Tests | Full Re-Audit |
|------|-------------------|---------------|
| Foundation | Weekly (5 queries) | Monthly |
| Growth | 2x/week (5 queries) | Bi-weekly |
| Dominance | Daily (5 queries) | Weekly |

---

## Weekly Monitoring Process

### Step 1: Run Consistency Tests (15 min)

For each client, run their top 5 dream queries:

```
mcp__aeo-audit__run_consistency_test
- query: "[Dream Query 1]"
- brand: "[Brand]"
- engines: "both"
- runs: 10
```

Repeat for all 5 queries.

### Step 2: Log Results

Record in `tracking/[brand]-visibility-log.md`:

```markdown
## Week of YYYY-MM-DD

### ChatGPT Results

| Query | Mentions (10 runs) | Avg Position | Change |
|-------|-------------------|--------------|--------|
| [Query 1] | 7/10 | 2.1 | +2 |
| [Query 2] | 5/10 | 3.5 | -1 |
| [Query 3] | 8/10 | 1.8 | +1 |
| [Query 4] | 3/10 | 4.0 | 0 |
| [Query 5] | 6/10 | 2.5 | +1 |

**Overall:** 29/50 (58%) | Last week: 25/50 (50%)

### Gemini Results

[Same format]

### Notes
- [Any significant changes or observations]
- [Action items if needed]
```

### Step 3: Check for Alerts

**Alert Triggers:**
- Mention rate drops >20% week over week
- Average position drops >1 position
- Competitor overtakes client in mentions
- Inaccurate information appears
- Client no longer cited (was previously)

### Step 4: Weekly Report (5 min)

Send client weekly update (Growth/Dominance tiers):

```markdown
## Weekly AEO Update - [Brand]

**Week of:** YYYY-MM-DD

### Highlights
- ChatGPT mentions: 58% (+8% from last week)
- Gemini mentions: 45% (+5% from last week)
- Best performing query: [Query 3] at 80% mention rate

### Changes This Week
- [Content published / links acquired / etc.]

### Next Week
- [Planned activities]

### Detailed Results
[Link to full log or attach]
```

---

## Monthly Re-Audit Process

### Step 1: Full Audit Refresh (60 min)

Run complete audit again:
```
Use the aeo-auditor agent to re-audit [brand]
```

### Step 2: Compare to Baseline

Track month-over-month changes:

| Metric | Baseline | Month 1 | Month 2 | Month 3 |
|--------|----------|---------|---------|---------|
| ChatGPT Mention Rate | 30% | 45% | 58% | 72% |
| Gemini Mention Rate | 25% | 40% | 52% | 65% |
| Avg Position | 4.2 | 3.1 | 2.5 | 1.8 |
| Citation Rate | 10% | 25% | 40% | 55% |
| Accuracy | 60% | 80% | 95% | 98% |

### Step 3: Monthly Report

Create full monthly report:

```markdown
# [Brand] - Monthly AEO Report

**Period:** Month X (Date - Date)

## Executive Summary
[2-3 sentence overview of progress]

## Key Metrics

| Metric | Start | Current | Change |
|--------|-------|---------|--------|
| ChatGPT Mentions | X% | Y% | +Z% |
| Gemini Mentions | X% | Y% | +Z% |
| Average Position | X | Y | +Z |
| Citations | X% | Y% | +Z% |

## What We Did
- [Content published]
- [Links acquired]
- [Technical changes]

## Wins
- [Notable achievements]

## Challenges
- [What's not working]
- [What we're adjusting]

## Next Month Plan
- [Planned activities]

## Appendix
- [Detailed query-by-query data]
```

---

## Automated Monitoring (To Build)

### MVP: Cron + MCP

```bash
# Run daily at 6 AM
0 6 * * * /path/to/monitoring-script.sh
```

Script runs:
1. For each client in roster
2. Run 5 key queries via MCP
3. Log results to file
4. Check for alerts
5. Send Slack notification if alerts

### V2: Dashboard

- Web dashboard showing live visibility
- Historical charts
- Alert configuration
- Client login access

---

## Tracking Files

### Per-Client Files

Located in `clients/[brand]/reports/`:
- `visibility-log-YYYY-MM.md` - Monthly detailed log
- `monthly-report-YYYY-MM.md` - Client-facing report

### Master Tracking

Located in `tracking/`:
- `monitoring-schedule.md` - When each client gets checked
- `alert-log.md` - All alerts triggered

---

## Alert Response Playbook

### Visibility Drop >20%

1. **Investigate:** What changed?
   - Did competitor publish new content?
   - Did our content change?
   - Did LLM behavior change broadly?

2. **Quick fixes:**
   - Re-run cache forcing (search brand + claim)
   - Check if technical issues (robots.txt, site down)
   - Verify no negative content published

3. **Escalate if:**
   - Drop persists >1 week
   - Cause unclear
   - Client is Dominance tier

### Competitor Overtakes

1. **Analyze competitor:**
   - What queries are they winning?
   - What content do they have?
   - What links do they have?

2. **Counter-strategy:**
   - Create comparison page if missing
   - Strengthen claims on that query
   - Acquire similar links

3. **Report to client:**
   - What happened
   - What we're doing
   - Expected timeline to recover

### Inaccurate Information

1. **Document:**
   - What's wrong
   - What should be correct
   - Screenshot evidence

2. **Fix sources:**
   - Update website first 50 words
   - Update llms.txt
   - Force cache refresh

3. **Monitor:**
   - Re-test in 48-72 hours
   - May take 1-2 weeks to update

---

## Metrics Definitions

### Mention Rate
Percentage of runs where brand is mentioned in response.
- 7/10 runs = 70% mention rate

### Average Position
When mentioned, what position in the list?
- 1st = position 1, 2nd = position 2, etc.
- Average across all mentions

### Citation Rate
Percentage of mentions that include a link.
- "Recommended: [Brand](link)" = citation
- "Recommended: Brand" = mention without citation

### Accuracy Score
Percentage of claims about brand that are correct.
- Manual assessment based on truth file

---

## Related Docs

- `systems/audit-sop.md` - Full audit process
- `tracking/client-roster.md` - Active clients
- `templates/weekly-report-template.md` - Report format
