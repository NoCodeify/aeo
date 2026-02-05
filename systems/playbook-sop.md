# Playbook Creation SOP

> **Purpose:** Convert audit findings into actionable weekly implementation plan
> **Time:** 30-60 minutes
> **Owner:** AEO Operator

---

## Overview

The playbook turns audit insights into a prioritized action plan:
1. Review audit findings
2. Prioritize by impact
3. Assign to weeks
4. Add specific deliverables
5. QA and deliver

---

## Prerequisites

Before creating playbook:
- [ ] Audit complete: `[brand]-aeo-audit.md`
- [ ] Client tier confirmed (Foundation/Growth/Dominance)
- [ ] Technical access level known

---

## Step 1: Run Playbook Agent

```
Use the playbook-creator agent to create a playbook from the [brand] audit
```

The agent will:
1. Read the audit
2. Prioritize findings by impact
3. Create weekly action items
4. Generate deliverable list

---

## Step 2: Review Generated Playbook

Check that playbook includes:

### Week 1: Foundation
- [ ] Technical fixes (robots.txt, llms.txt)
- [ ] First 50 words rewrites
- [ ] Schema markup additions

### Weeks 2-4: Content
- [ ] Homepage optimization
- [ ] Key service pages
- [ ] Comparison pages (vs competitors)

### Weeks 5-8: Authority
- [ ] Backlink acquisition
- [ ] Press releases
- [ ] Directory submissions

### Ongoing: Monitoring
- [ ] Weekly consistency checks
- [ ] Monthly re-audits
- [ ] Adjustment based on results

---

## Step 3: Adjust for Client Tier

### Foundation Tier
- 4 content pages/month
- 2 comparison pages total
- 5 backlinks/month
- Weekly monitoring

### Growth Tier
- 8 content pages/month
- 5 comparison pages total
- 10 backlinks/month
- 2x/week monitoring

### Dominance Tier
- 15 content pages/month
- 10 comparison pages total
- 20 backlinks/month
- Daily monitoring

---

## Step 4: Add Specific Deliverables

For each week, list exact deliverables:

**Example Week 2:**
```markdown
## Week 2: Homepage & Core Pages

### Deliverables
- [ ] Homepage copy rewrite (first 50 words + full)
- [ ] About page rewrite
- [ ] Main service page rewrite

### Tasks
1. Read current pages
2. Apply First 50 Words rule
3. Add key claims and differentiators
4. Include comparison hooks
5. QA and deliver for client approval

### Success Criteria
- All pages have WHO/WHAT/WHERE/PRICE in first 50 words
- Key differentiators appear on every page
- Competitor comparison language included
```

---

## Step 5: Assign Owners

For each task, assign:
- **AI** = Claude drafts it
- **Operator** = AEO Operator handles
- **Founder** = Escalate to founder
- **Client** = Client provides/approves
- **Fiverr** = Outsource to contractor

---

## Step 6: Set Dependencies

Mark what blocks what:
- Technical fixes block content publishing
- Content blocks backlink outreach
- Backlinks require content targets

---

## Step 7: QA Playbook

Before delivering:
- [ ] All audit findings addressed
- [ ] Weeks are realistic (not overloaded)
- [ ] Deliverables match client tier
- [ ] Dependencies are clear
- [ ] Owner assigned to each task
- [ ] Success criteria defined

---

## Step 8: Deliver Playbook

1. Save to `clients/[brand]/[brand]-aeo-playbook.md`
2. Send to client with audit
3. Walk through on call
4. Get approval to proceed

---

## Playbook Template

```markdown
# [Brand] - AEO Implementation Playbook

> **Created:** YYYY-MM-DD
> **Tier:** [Foundation/Growth/Dominance]
> **Sprint Duration:** 12 weeks

---

## Executive Summary

Based on the AEO audit, this playbook outlines [X] weeks of implementation
to improve [Brand]'s visibility in AI search engines.

**Primary Goals:**
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

**Expected Outcomes:**
- Mention rate: [X]% -> [Y]%
- Position: [current] -> [target]
- Citations: [current] -> [target]

---

## Week 1: Technical Foundation

### Deliverables
- [ ] [Deliverable 1] | Owner: [AI/Operator/etc]
- [ ] [Deliverable 2] | Owner: [AI/Operator/etc]

### Tasks
1. [Task 1]
2. [Task 2]

### Success Criteria
- [Criterion 1]
- [Criterion 2]

---

## Week 2: Content - Homepage

[Continue for each week...]

---

## Ongoing: Monitoring

### Weekly
- Run 5 key queries
- Log results in tracking doc
- Alert on visibility drops

### Monthly
- Full re-audit
- Adjust strategy
- Report to client

---

## Appendix: Full Task List

| Week | Task | Owner | Status |
|------|------|-------|--------|
| 1 | [Task] | [Owner] | Pending |
| 1 | [Task] | [Owner] | Pending |
| 2 | [Task] | [Owner] | Pending |
[...]
```

---

## Related Docs

- `systems/audit-sop.md` - Audit process
- `templates/playbook-template.md` - Full template
- `.claude/agents/playbook-creator.md` - Agent instructions
