# AEO Protocol Reference

**CRITICAL RULE: Always read `aeo-protocol-sop.md` BEFORE running any AEO audit or optimization task.**

The SOP document is the source of truth. Key sections:

| Lines | Content |
|-------|---------|
| 1-200 | Core methodology |
| 850-900 | **First 50 Words Audit** (every key page needs WHO/WHAT/WHERE/PRICE in first 50 words) |
| 1200-1300 | Content gap analysis |
| 2703-2770 | **Client Intake Questionnaire** (collect dream queries before audit) |
| 2861-2947 | **Audit to Playbook Conversion** (every audit must produce a playbook) |
| 2950-2970 | Implementation checklist |
| 3348-3432 | **10-Run Consistency Test** (run each key query 10 times per LLM) |
| 3370-3393 | **Custom Client Queries** (dream queries beyond standard set) |
| 3500+ | Final implementation checklist |

## Core Methodology

- LLM retrieval architecture (ChatGPT 3-layer cache, Gemini grounding)
- Technical requirements (robots.txt, SSR, Schema.org)
- Content strategy for LLM extraction
- Trust validation and entity establishment
- Cache forcing and monitoring techniques
- **Client Intake Questionnaire** (collect dream queries + brand facts before audit)
- **First 50 Words Rule** (every page needs WHO/WHAT/WHERE/PRICE)
- **10-Run Consistency Test** (LLM responses vary - must test 10x per query)
- **Custom Client Queries** (dream queries beyond standard set)
- **Advanced Tracking** (position, citations, accuracy, sentiment per run)

## AEO Workflow

1. **Intake** - Collect brand info + dream queries (protocol lines 2703-2770)
2. **Audit** - Use `/aeo-audit` or run `aeo-auditor` agent (10-run consistency test)
3. **Playbook** - Use `/playbook` to convert audit findings into actions
4. **Execute** - Implement playbook week by week
5. **Monitor** - Weekly consistency checks, monthly re-audits

The `aeo-auditor` agent MUST read `aeo-protocol-sop.md` before running any audit. This includes the First 50 Words check and 10-run consistency test.
