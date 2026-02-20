# Script Planning Guide

Operational reference for the script-architect agent. Read this file before planning any script architecture.

---

## 1. Planning Philosophy

- **One conversation** maps the entire video. No iterating across sessions.
- Fill out everything upfront. AI proposes structure. User approves with adjustments.
- Produces an **architecture**, NOT a script. The architecture is handed off to the script-writer agent.
- **4-exchange process** -- no more, no less.

---

## 2. The Four-Exchange Process

| Exchange | Direction | What Happens |
|----------|-----------|-------------|
| 1 | User -> Agent | User gives everything: packaging, foundation, brain dump, CTAs |
| 2 | Agent -> User -> Agent | Agent asks clarifying questions, user answers |
| 3 | Agent -> User -> Agent | Agent proposes structure + CTA placement, user confirms/adjusts |
| 4 | Agent -> User -> Agent | Agent asks all creativity questions at once, user answers, architecture locked |

---

## 3. Exchange 1: The Complete Information Dump

### 3a. PACKAGING (required)

| Field | Source | Notes |
|-------|--------|-------|
| Title | Locked from `/youtube-title` | Do not modify |
| Thumbnail concept | Locked from ideation | Do not modify |
| Hook | Locked from `/youtube-hook` | Do not modify |
| The promise | Derived from title + thumbnail | What specific expectation does the title/thumbnail create? |

### 3b. FOUNDATION (required)

| Field | Format |
|-------|--------|
| Audience | One line |
| Core problem | One sentence |
| Why they have it | Root cause |
| What they've already tried | Failed approaches |
| Transformation | What changes for the viewer after watching |

### 3c. COMPLETE BRAIN DUMP

Everything the user has. Do not organize. Do not filter. More = better.

- Stories and personal experiences
- Examples (theirs and others')
- Stats and data points
- Concepts and frameworks
- Objections viewers might have
- Questions people ask about this topic
- Analogies and metaphors
- Case studies with specifics
- Visual ideas
- Anything else remotely related

### 3d. CTA INVENTORY

| CTA Type | Details Needed |
|----------|---------------|
| Lead magnet | Name + what it is (or "Newsletter" if none) |
| Sponsor | Name, offer, micro-problem it solves, your stance on the product, required talking points |
| Related videos | Which videos to reference and where |
| End screen CTA | Which video + how it extends this video's topic |

---

## 4. Exchange 2: Clarifying Questions

The agent asks these questions. User answers.

1. **What are you actually showing them?** Results / Method / Mindset / Demo / Combo
2. **If demo: what approach?** Live / Walkthrough / Hypothetical / Real project
3. **How will you prove it works?** Your results / Others' results / Demo itself / Combo
4. **What's the hardest part of delivering this promise?** Where does the audience typically get stuck or skeptical?

---

## 5. Exchange 3: Proposed Structure

### Hook Framework (20-30s)

4-part structure:

| Part | Purpose |
|------|---------|
| Opening statement | Pattern interrupt or bold claim |
| Credibility | Why you can deliver this promise |
| Enemy (optional) | Common approach that fails |
| Promise with roadmap | What they'll get, with 2-3 categories embedded |

**Roadmap rule:** Embed categories in the promise statement. 2-3 categories, NOT a numbered list of blocks.

### Block Structure

As many blocks as the topic demands. Each block has:

| Element | Description |
|---------|-------------|
| Working title | Internal name for the block |
| Purpose | What this block accomplishes for the viewer |
| Main points | Key content beats |

### Final Block Framework

The last block uses a 3-part structure:

| Part | Purpose | Rule |
|------|---------|------|
| Insight | What they now understand | Do NOT signal the video is ending |
| Gap | What's still missing | Creates need for the next video |
| Bridge | How end screen video addresses the gap | Natural transition, not a pitch |

**NEVER signal the video is ending.** No "wrapping up", no "final thoughts", no "to summarize".

### CTA Placement

| CTA | Placement | Rules |
|-----|-----------|-------|
| Lead magnet (first mention) | Early in Block 1 | After first value delivery |
| Lead magnet (second mention) | Later block, before final CTA | Must be 140+ words after first mention |
| Sponsor | End of Block 1 | Own STP mini-block (see Section 7) |
| Like request | After first major value delivery | Tied to a specific insight, not generic |
| Final CTA (end screen) | Final Block | Integrated via Insight -> Gap -> Bridge |

**Present structural options where alternatives exist.** User confirms or adjusts before locking.

---

## 6. Exchange 4: Creativity Brainstorm

All creativity questions asked in one batch. User answers everything, then architecture locks.

### Overall Video

**Central metaphor/analogy:** Present 2-3 options with reasoning. User picks one or says "none".

### Six Advanced Engagement Techniques

| Technique | What the Agent Does | Output |
|-----------|-------------------|--------|
| Tension Loop Mapping | Map raise/release points every 30-60s across the full video | 5-7 major tension points with location |
| Visual Storytelling Inventory | For each abstract concept, define a specific visual metaphor | One visual per abstract concept |
| Expectation Management Checklist | Define how to set expectations at EACH block transition | Transition approach per block boundary |
| Specificity Audit | Flag every vague statement from brain dump, suggest concrete replacements | List of vague -> specific upgrades |
| Credibility Through Vulnerability | Identify: specific struggle + turning point + contrast + which block it belongs in | One vulnerability arc placed in structure |
| "So What" Test | For 3-5 major points, build the chain | Point -> So what -> Which means -> Therefore |

### Per-Block Creative Elements

For each block, present options for:

| Element | Rule |
|---------|------|
| Metaphor/analogy | Present 2-3 options per block |
| Visual demonstration | MUST be specific. "Show the video with 25% end screen traffic highlighted" not "Show analytics" |
| Story/example | Include: contrast, specific numbers, visual moment. Ask: does it compress explanation? |
| Audio-friendly description | How does this work for audio-only listeners? |

---

## 7. Beat System (Per Block)

Every block follows Setup-Tension-Payoff.

### Beat Distribution

| Phase | % of Block | Function |
|-------|-----------|----------|
| SETUP | 30-40% | Problem statement, context, stakes |
| TENSION | 40-50% | Story, complication, discovery, resolution, lesson lead-in |
| PAYOFF | 10-20% | Revelation, action steps, closing |

### SETUP Beats (30-40%)

- Beat 1, Beat 2... building the problem statement
- Establish what's at stake
- Set expectations for what this block delivers

### TENSION Beats (40-50%)

- Story opening
- Complication (what went wrong or what's harder than expected)
- Discovery (the insight or turning point)
- Resolution (what happened as a result)
- Lesson lead-in (bridge to the payoff)

### PAYOFF Beats (10-20%)

- Revelation (the core takeaway)
- Action steps (what to do with this knowledge)
- Closing (transition to next block)

### Additional Beat Elements

| Element | Description |
|---------|-------------|
| "WHY THIS MATTERS" moments | Natural implications woven into beats. NEVER announced ("Here's why this matters...") |
| Creative elements | Visual demos, stories, metaphors, contrast, numbers -- all specified per beat |
| Tension loop | Raise, Tease, Deepen, Release, Re-tension -- mapped across the block |
| Estimated length | Time estimate for the block |

### Sponsor Block (End of Block 1)

Uses its own Setup-Tension-Payoff mini-block:

| Beat | Content |
|------|---------|
| Setup | Micro-problem the sponsor solves (from user's CTA inventory) |
| Tension | Why existing solutions fall short |
| Payoff | Sponsor as the answer + required talking points |

Plus a **return phrase** that bridges back to the main content naturally.

---

## 8. Voice Constraints

Minimal guardrails only. Full voice is handled by the script-writer agent.

| Rule | Type | Detail |
|------|------|--------|
| Question fragments | BANNED | Never use "[Subject]? [Answer]." pattern |
| Generic Forward Pulls | UPGRADE REQUIRED | Must be Level 3+ minimum |
| Announced WHY moments | AVOID | "Here's why this matters..." is banned. Weave naturally. |
| Transition word | USE | "So" for transitions |
| Contractions | USE | Write how people talk |
| Short sentences | USE | Vary rhythm but default short |
| Direct statements | USE | Say it, don't hedge |

---

## 9. Locked Architecture Output Format

The final output after Exchange 4 follows this exact structure:

```
VIDEO LENGTH: [estimated total] | BLOCKS: [count]

HOOK (20-30s)
- Opening statement: [specific line/approach]
- Credibility: [what and how]
- Enemy: [if applicable]
- Promise with roadmap: [statement with 2-3 embedded categories]

BLOCK [N]: [Title]
- Purpose: [one sentence]
- Opening phrase/approach: [how the block starts]
- SETUP beats (30-40%):
  - Beat 1: ...
  - Beat 2: ...
- TENSION beats (40-50%):
  - Beat 1: ...
  - Beat 2: ...
  - Beat 3: ...
- PAYOFF beats (10-20%):
  - Beat 1: ...
- WHY THIS MATTERS: [natural implication moment]
- Creative elements: [metaphor, visual demo, story, contrast]
- Tension loop: [Raise at..., Release at...]
- Estimated length: [time]

SPONSOR BLOCK (after Block 1)
- Setup: [micro-problem]
- Tension: [why alternatives fail]
- Payoff: [sponsor + talking points]
- Return phrase: [bridge back]

FINAL BLOCK: [Title]
- Insight: [what they now understand]
- Gap: [what's still missing]
- Bridge: [how end screen video fills the gap]

CTA PLACEMENT VERIFICATION
- Lead magnet #1: Block [N], after [beat] (~word [X])
- Lead magnet #2: Block [N], after [beat] (~word [X]) [140+ words confirmed]
- Sponsor: End of Block 1
- Like request: Block [N], after [moment]
- End screen: Final Block via Insight -> Gap -> Bridge
```

---

## 10. Options-First Principle

**Present options at every decision point. NEVER auto-select.**

| Decision Point | How to Present |
|----------------|---------------|
| Block ordering | "Option A: [order + reasoning]. Option B: [order + reasoning]." |
| Story/example per block | "Option A: [story]. Option B: [story]. Option C: skip story, use data instead." |
| Central metaphor | "Option A: [metaphor]. Option B: [metaphor]. Option C: no central metaphor." |
| Visual demonstrations | "Option A: [specific visual]. Option B: [specific visual]." |
| Demo approach | "Option A: Live. Option B: Walkthrough. Option C: Hypothetical." |

Always include reasoning for each option. Let the user decide.

---

## 11. Handoff to Script Writer

### What the script-writer agent CAN change

- Fix banned phrases (question fragments, announced WHY moments)
- Upgrade weak Forward Pulls to Level 3+
- Remove remaining question fragment patterns
- Make WHY THIS MATTERS moments sound natural
- Add micro-transitions between beats
- Fully write hook copy and final CTA copy
- Adjust pacing within beats

### What the script-writer agent MUST preserve

- All retention mechanics (tension loops, forward pulls, re-tensions)
- All structural beats (setup/tension/payoff ratios)
- All content decisions (which stories, which examples, which data)
- The FUNCTION of each beat (even if wording changes)
- All engagement patterns (vulnerability arcs, specificity upgrades)
- CTA placement and spacing (140+ word gaps)
- Block order and block count
