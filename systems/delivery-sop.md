# Delivery SOP

> **Purpose:** How to deliver work to clients professionally
> **Owner:** AEO Operator

---

## Overview

Professional delivery builds trust and reduces back-and-forth. Every deliverable follows a standard format and process.

---

## Delivery Channels

| Client Preference | How We Deliver |
|-------------------|----------------|
| Slack | Shared channel with client |
| Email | Structured email with attachments |
| Notion | Shared workspace (if client uses Notion) |

Default to Slack for speed, email for formal documents.

---

## Deliverable Types

### 1. Audit Report

**Format:** Markdown + PDF export
**Timing:** Within 48 hours of kickoff call

**Delivery Message:**
```
Hi [Name],

Your AEO audit is ready. Here's what we found:

**Summary:**
- ChatGPT mentions: [X]% across [N] test queries
- Gemini mentions: [X]%
- Key finding: [One-sentence insight]

**Attached:**
- Full audit report (PDF)
- Playbook (PDF)

**Next steps:**
Let's schedule a 30-min call to walk through the findings and discuss implementation priorities.

[Calendar link]

Let me know if you have questions before then.

[Your name]
```

### 2. Playbook

**Format:** Markdown + PDF export
**Timing:** Same time as audit

**Delivery Message:**
(Include with audit delivery - see above)

### 3. Content Pages

**Format:** Markdown (for easy copy-paste to CMS)
**Timing:** Per content calendar, typically weekly batches

**Delivery Message:**
```
Hi [Name],

Here's this week's content batch:

**Pages Ready for Review:**
1. [Page name] - [target query]
2. [Page name] - [target query]
3. [Page name] - [target query]

**Notes:**
- Each file includes meta title and description
- [Any specific questions or options for client]

**Action needed:**
Please review and let me know:
- Approved as-is
- Approved with changes (specify)
- Questions/concerns

Once approved, we'll move to implementation.

[Your name]
```

### 4. Weekly Report

**Format:** Markdown (in Slack) or brief email
**Timing:** Same day each week (e.g., Monday)

**Delivery Message:**
```
## Weekly AEO Update - [Brand]

**Week of:** [Date]

**Highlights:**
- ChatGPT: [X]% mentions (was [Y]%)
- Gemini: [X]% mentions (was [Y]%)
- [Notable win or observation]

**Completed:**
- [x] [Task 1]
- [x] [Task 2]

**This Week:**
- [ ] [Planned task 1]
- [ ] [Planned task 2]

**Questions?** Just reply here.
```

### 5. Monthly Report

**Format:** PDF (formal)
**Timing:** First week of each month for previous month

**Delivery Message:**
```
Hi [Name],

Here's your monthly AEO report for [Month].

**Key Results:**
- Overall visibility: [X]% (+[Y]% from start)
- Best performing query: [Query] at [X]%
- [Top achievement this month]

**Attached:**
- Full monthly report (PDF)

**Upcoming:**
Next month we're focusing on [priority area].

Happy to schedule a call if you'd like to discuss in detail.

[Your name]
```

---

## File Naming Convention

```
[brand]-[type]-[date/version].md
```

**Examples:**
- `fuegenix-aeo-audit-2026-01.md`
- `fuegenix-homepage-v1.md`
- `fuegenix-weekly-report-2026-01-27.md`
- `fuegenix-vs-zarev-v2.md`

---

## PDF Export Process

For formal deliverables (audit, monthly report):

1. Finalize markdown file
2. Export to PDF using:
   - VS Code: Markdown PDF extension
   - Pandoc: `pandoc file.md -o file.pdf`
   - Or: Copy to Google Docs, export as PDF
3. Verify formatting looks professional
4. Attach to delivery message

---

## Review Before Sending Checklist

### All Deliverables
- [ ] Client name spelled correctly
- [ ] Dates are accurate
- [ ] No placeholder text ([BRAND], [DATE], etc.)
- [ ] Links work
- [ ] Attachments included
- [ ] Professional tone

### Content
- [ ] First 50 words rule followed
- [ ] No em dashes
- [ ] 500+ words
- [ ] Meta tags included
- [ ] Spellchecked

### Reports
- [ ] Numbers add up
- [ ] Comparisons are accurate
- [ ] Claims match reality
- [ ] Recommendations are actionable

---

## Response Time Expectations

| Channel | Expected Response |
|---------|-------------------|
| Slack | < 4 hours (business hours) |
| Email | < 24 hours |
| Urgent | < 1 hour (tag appropriately) |

If can't meet timeline, acknowledge receipt and give ETA:
> "Got it! I'll have the updated version to you by [time]."

---

## Handling Feedback

### Minor Changes
Make change, confirm done:
> "Updated - see attached v2."

### Major Rework
Clarify scope, manage expectations:
> "Thanks for the feedback. To make sure I capture this correctly: you'd like us to [restate request]. This will take [time estimate]. Does that sound right?"

### Disagreement
Explain reasoning, offer options:
> "I understand the concern. The reason we recommended [X] is [reason]. However, if you'd prefer [alternative], we can do that. What would you like to proceed with?"

---

## Escalation

### When to Escalate to Founder
- Client unhappy with quality
- Client requesting out-of-scope work
- Strategic questions beyond operator knowledge
- Technical issues beyond operator ability
- Any conflict or complaint

### How to Escalate
1. Send Slack DM to Founder with:
   - Client name
   - Issue summary
   - What you've tried
   - Recommendation (if any)
2. Let client know: "Let me loop in [Founder] on this."

---

## Templates

### Kickoff Call Follow-up
```
Hi [Name],

Great speaking with you! Here's what we discussed:

**Confirmed:**
- Dream queries: [list]
- Competitors: [list]
- Key differentiators: [list]

**Next steps:**
1. We'll complete your audit within 48 hours
2. You'll receive audit + playbook
3. We'll schedule a walkthrough call

Let me know if I missed anything.

[Your name]
```

### Approval Request
```
Hi [Name],

[Content type] is ready for your review.

**Please confirm:**
- Approve as-is
- Approve with changes
- Questions before approving

**Note:** Approval needed by [date] to stay on schedule.

Thanks!
[Your name]
```

### Completed Work
```
Hi [Name],

[Task] is complete.

**What was done:**
- [Item 1]
- [Item 2]

**Verification:**
- [How to verify / link to live page]

Let me know if you have questions.

[Your name]
```

---

## Related Docs

- `templates/weekly-report-template.md`
- `templates/audit-report-template.md`
- `tracking/client-roster.md`
