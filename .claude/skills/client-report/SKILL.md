---
name: client-report
description: Generate client-friendly AI visibility reports from audit data. Use when creating client reports, visibility reports, or presenting audit results in a client-facing format. Triggers on "client report", "generate report", "visibility report", "create report", "report for client".
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Client Report Skill

Generate client-friendly AI visibility reports that translate technical audit findings into compelling narratives clients can understand.

## Core Principle

> "Here's what we found -> Here's what we fixed -> Here's the proof"

Every report follows this narrative arc. No jargon. No technical terms. Just results.

## The 8-Section Narrative Structure

Reports use these components (from `aeo-landing/src/components/report/`):

| # | Component | Purpose |
|---|-----------|---------|
| 1 | `ReportCover` | Brand name, category, audit date, tagline |
| 2 | `HeadlineResult` | 3 most impactful before/after stats |
| 3 | `CurrentVisibility` | Scores per engine (branded vs discovery) |
| 4 | `KeyFindings` | What we discovered (synthesized, not raw) |
| 5 | `Achievements` | Gap analysis showing before/after improvements |
| 6 | `ResultsProof` | Recommendations with completion status |
| 7 | `CompetitorPosition` | Where client sits vs competitors |
| 8 | `NextSteps` | Pending actions, prioritized |

Supporting components:
- `SectionNav` - Sticky navigation between sections
- `SectionHeading` - Consistent section headers
- `ProgressRing` - Visual score indicators

## No-Jargon Rules

NEVER show these terms to clients:

| Internal Term | Client-Facing Label |
|---------------|---------------------|
| LLM | AI platforms |
| AEO | AI visibility |
| SERP | Google search results |
| Discovery queries | When people search for what you do |
| Branded queries | When people search your name |
| Grounding | How AI finds information |
| Consistency score | Recommendation rate |
| 10-run test | We tested 10 times |
| Cache forcing | Making AI remember you |
| Schema.org | Structured data so AI reads your site correctly |
| SSR | Making your site readable by AI |
| robots.txt | AI crawler access |
| First 50 words | Opening content |
| Triangulation | Multiple sources confirming you |

## Data Structure Requirements

The report data file (`src/data/[client]-report.ts`) must export these TypeScript interfaces:

```typescript
export interface VisibilityScore {
  engine: string;
  branded: number;    // 0-100
  discovery: number;  // 0-100
}

export interface Competitor {
  name: string;
  location: string;
  specialization: string;
  priceRange: string;
  tier: 1 | 2;
}

export interface GapItem {
  area: string;            // Internal technical area
  clientLabel: string;     // REQUIRED: Plain English label shown to client
  description: string;     // What was tested
  beforeScore: number;     // 0-100
  afterScore: number;      // 0-100
  status: "done" | "pending" | "in-progress";
  detail: string;          // Plain English explanation
}

export interface Recommendation {
  action: string;          // Internal action description
  clientLabel: string;     // REQUIRED: Client-facing action description
  priority: "immediate" | "short-term" | "medium-term";
  status: "done" | "pending" | "in-progress";
  category?: string;
}

export interface KeyFinding {
  title: string;           // Plain English headline
  detail: string;          // 1-2 sentence explanation
  severity: "high" | "medium" | "low";
}
```

Additionally export:
- `brandInfo` - Name, website, location, category, audit date, tagline, key stats
- `executiveSummary` - headline, subheadline, heroStat (averaged across engines for the key query)
- `headlineResults` - Array of 3 most impactful before/after changes
- `visibilityScores` - Per-engine branded/discovery scores
- `engineDetails` - Per-engine narrative detail + strength label
- `gapAnalysis` - Array of GapItems
- `recommendations` - Array of Recommendations
- `competitors` - Array of Competitors
- `keyFindings` - Array of KeyFindings

## Key Principles

1. **Every `GapItem` gets a `clientLabel`** - Plain English, no jargon
2. **Every `Recommendation` gets a `clientLabel`** - Describes what was done in client terms
3. **`keyFindings` are synthesized** - Not copied raw from audit; rewritten as insights
4. **`headlineResults` pick the 3 most impactful** - Best before/after stats
5. **`executiveSummary.heroStat` averages across engines** - Average the before/after scores from ChatGPT and Gemini for the key discovery query
6. **Scores are percentages (0-100)** - Not fractions like 7/10
7. **`detail` fields use plain language** - "You weren't mentioned" not "0% consistency score"

## Component Patterns

The page component follows this pattern:

```tsx
import { ReportCover } from "../components/report/ReportCover";
import { SectionNav } from "../components/report/SectionNav";
import { HeadlineResult } from "../components/report/HeadlineResult";
import { CurrentVisibility } from "../components/report/CurrentVisibility";
import { KeyFindings } from "../components/report/KeyFindings";
import { Achievements } from "../components/report/Achievements";
import { ResultsProof } from "../components/report/ResultsProof";
import { CompetitorPosition } from "../components/report/CompetitorPosition";
import { NextSteps } from "../components/report/NextSteps";

export function [Client]Report() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto px-4 pb-20">
      <ReportCover />
      <SectionNav />
      <HeadlineResult />
      <CurrentVisibility />
      <KeyFindings />
      <Achievements />
      <ResultsProof />
      <CompetitorPosition />
      <NextSteps />
    </main>
  );
}
```

## Report Generation Workflow

1. Read the client's audit file: `clients/[client]/[client]-aeo-audit.md`
2. Read the client's playbook: `clients/[client]/[client]-aeo-playbook.md`
3. Extract brand info, scores, gaps, recommendations, competitors
4. Translate all findings into client-friendly language
5. Generate the data file: `aeo-landing/src/data/[client]-report.ts`
6. Create the page component: `aeo-landing/src/pages/[Client]Report.tsx`
7. Register the route in the router (if one exists)
8. Run build to verify: `cd aeo-landing && npm run build`

## Verification Checklist

Before delivering a report, verify:

- [ ] Every `GapItem` has a non-empty `clientLabel`
- [ ] Every `Recommendation` has a non-empty `clientLabel`
- [ ] No jargon terms appear in any client-facing strings
- [ ] `headlineResults` has exactly 3 entries
- [ ] `heroStat` averages scores across engines for the key discovery query
- [ ] All scores are 0-100 percentages
- [ ] `keyFindings` are synthesized insights, not raw audit data
- [ ] The page component renders all 8 sections
- [ ] Build passes without errors

## Reference

- Data structure example: `aeo-landing/src/data/fuegenix-report.ts`
- Page component example: `aeo-landing/src/pages/FuegenixReport.tsx`
- Report components: `aeo-landing/src/components/report/`
