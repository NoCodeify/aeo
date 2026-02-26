# VIDEO ARCHITECTURE: Why You Should NEVER EVER Build With Claude Code

**Length:** ~12 min (~2,720 words at 217 WPM) | **Blocks:** 3 + Final CTA
**Format:** Talking head + Excalidraw whiteboard slides. No screen recording.
**Tone:** Honest, direct, technical depth, conversational. Pro-Claude Code but realistic.
**Reference:** Porsche 997 "hidden complexity reveal" format -- progressive cost stacking, THE FLIP at ~60%, contrarian title / respectful content.

---

## PRODUCTION FOUNDATION

### Video Promise
The title/thumbnail ("Why You Should NEVER EVER Build With Claude Code" + "RUN.") promises a warning about hidden dangers. The video delivers 10 specific hidden costs with real numbers and stories (Blocks 1-2), then flips to show the architecture that makes it work (Block 3). Contrarian title, respectful content. Viewers who came for the warning get it. Viewers who came to learn get the architecture.

### Proof Method
Creator's own results: DMChamp ($100K/yr SaaS), AEO Protocol (client delivery), YouTube pipeline (19 agents, 24 skills, 7 MCP servers), 1,000+ hours of building.

### Vulnerability Arc
- **Struggle:** "I spent 3 hours hunting a bug that Claude Code introduced. One line of code. Half a day of my life."
- **Turning point:** "I stopped treating it like a magic wand and started treating it like a junior developer who needs structure."
- **Contrast:** Before -- every session was a gamble. After -- 19 agents, 24 skills, predictable results.
- **Placement:** Block 1 Tension (hallucination debugging story)

### Central Metaphor
The Porsche 997 teardown format IS the metaphor. Progressive cost stacking = progressive teardown. The "80,000 mile problems" framing. No additional central metaphor needed.

### Specificity Upgrades (Script Writer: Use These Exact Phrasings)
| Vague | Specific |
|-------|----------|
| "Context window fills up" | "Your 200K token context window fills up 3 files into a real project" |
| "The AI introduces bugs" | "Claude Code rewrote my authentication middleware and silently removed the rate limiter" |
| "It works sometimes" | "8 out of 10 runs produce working code. The other 2 rewrite your auth system." |
| "Prompt iteration is frustrating" | "I rewrote the same instruction 15 times. Version 12 was closest. Version 15 was worse than version 3." |
| "Token spend adds up" | "$50/day x 365 = $18,250 a year. That's a senior developer's health insurance." |
| "It takes longer than you think" | "The 10-minute demo is real. The 40 hours behind it are invisible." |
| "Architecture makes it work" | "19 agents, 24 skills, 7 MCP servers. DMChamp: $100K/year SaaS." |

---

## HOOK (32s, ~115 words) -- LOCKED FROM PACKAGING

- **Opening (Mirror hook):** "You're about to build something real with Claude Code. Maybe you already started. And it's going great. It's writing code faster than you expected. Features are just appearing. You're thinking, this is it."
- **Escalation:** "And then your first user logs in. Or your database hits a thousand rows. Or you try to change something the AI wrote three weeks ago. And suddenly you're staring at a system you don't understand, built by a tool that doesn't remember building it."
- **Credibility:** "I spent over a thousand hours in exactly that place."
- **Promise + Roadmap:** "And the problems aren't what you'd expect." (Categories embedded: the hidden costs you hit on day one, the invisible costs that sneak up at month three, and the architecture that actually solves them.)

**Forward Pull #1 (Hook):** "And the problems aren't what you'd expect." -- Level 4 (Curiosity Gap). Sets up Block 1.

---

## BLOCK 1: THE HIDDEN COSTS (~4 min, ~870 words)

**Purpose:** Stack the first wave of hidden costs that hit in the first weeks of building. Each beat drops a new cost. Viewer mentally accumulates dread. These are the "80,000 mile" problems -- the ones that only show up after the demo ends.

**Estimated Length:** ~4:00

### SETUP (30%, ~260 words)

- **Beat 1: The honeymoon.** First few days with Claude Code feel magical. Features appear. Code writes itself. You start thinking bigger. You start telling people about it.
- **Beat 2: The first wall.** Your context window fills up. 200K tokens sounds infinite until you're 3 files into a real project and the agent starts forgetting what it just built 10 minutes ago.
- **Problem statement:** The tool that was writing perfect code 10 minutes ago is now introducing bugs into its own work.

### TENSION (50%, ~435 words)

- **Beat 1 -- Hallucination debugging:** Story -- spent 3 hours hunting a bug that Claude Code introduced. Debugging code you didn't write, searching for logic you don't recognize. The fix was one line. The search was half a day. Specific detail: Claude Code rewrote authentication middleware and silently removed the rate limiter.
  - *WHY THIS MATTERS (natural):* "That's 3 hours of your life on a single line of code. Multiply that across a real project."
  - *Re-tension:* "And that's just when you catch it."
- **Beat 2 -- Non-determinism ("it works sometimes"):** Same prompt, same project, different results. 8 out of 10 times it's fine. The other 2 times it rewrites your auth system. You can't ship 80% reliability.
  - *Re-tension:* "So you run it again. And again. And you start treating every output like it might be wrong."
- **Beat 3 -- Legacy code you can't read:** Three weeks in, you need to change something the AI wrote on day one. You open the file. You don't recognize any of it. The AI wrote it, you approved it, and now neither of you remembers why it works.
- **Beat 4 -- Prompt iteration:** You rewrite the same instruction 15 times. Version 12 was closest. Version 15 was worse than version 3. You're not coding anymore. You're negotiating.
- **Lesson lead-in:** Every single one of these problems is solvable. But nobody shows you the cost of solving them.

**Forward Pull #2 (~1:30):** After context window beat -- "And that's the problem you can SEE filling up. The ones that don't look like problems are worse." Level 4 (Curiosity Gap).

**Forward Pull #3 (~3:00):** After non-determinism beat -- "But the code problems are just the warm-up. Wait until you see what happens to your bank account." Level 5 (Implied Stakes).

### PAYOFF (20%, ~175 words)

- **Revelation:** These are the "80,000 mile" problems -- the ones that only show up after the demo ends and real usage begins. Every "build X in 10 minutes" video stops right before these start.
- **Closing / Forward Pull #4 (~4:00):** "And these are just the problems you can see. The ones you can't see are worse." Level 5 (Implied Stakes). Transitions to Block 2.

### CREATIVE ELEMENTS
- **Visual demo:** SLIDE 01 -- Excalidraw bucket filling with water, water line near top, labeled "200K tokens." Items dropping in: "file1.ts", "file2.ts", "README.md". Last item splashes over.
- **Visual demo:** SLIDE 02 -- Excalidraw 10 identical boxes in a row. 8 green checkmarks, 2 red X's. Label: "Same prompt. Same project."
- **Visual demo:** SLIDE 03 -- Excalidraw file icon with "???" inside. Arrow from "You (3 weeks ago)" with checkmark, arrow from "You (today)" with question mark.
- **Story:** 3-hour hallucination debugging. Contrast: "One line of code. Half a day." Numbers: 3 hours, 1 line, authentication middleware.
- **Metaphor:** "You're not coding anymore. You're negotiating." (prompt iteration)
- **Audio-friendly:** Bucket metaphor described verbally. 8/10 grid described as "8 out of 10 times it works. The other 2 times it rewrites your auth system."

### TENSION LOOP
- **Raise:** Context window fills up, agent goes stupid (~1:00)
- **Tease:** "The tool that was writing perfect code 10 minutes ago..." (~1:15)
- **Deepen:** Each cost stack escalates (hallucination -> non-determinism -> legacy code -> prompt iteration) (~1:30-3:30)
- **Release:** "Every single one of these is solvable" (~3:30)
- **Re-tension:** "But nobody shows you the cost" + "the ones you can't see are worse" (~4:00)

### CTA PLACEMENTS IN THIS BLOCK

**Like request (~2:30):** After hallucination debugging story. Tied to specific insight: "If you've ever spent hours debugging code you didn't write, hit like so more people see this before they start building."

**Claudify mention #1 (~3:45):** After prompt iteration beat. Brief, earned: "I spent a thousand hours hitting every one of these walls. If you want to skip that, Claudify's in the description. But let me show you what's hiding underneath." Moves on immediately.

---

## BLOCK 2: THE REAL PRICE (~3 min, ~650 words)

**Purpose:** The invisible costs that don't show up until you're months deep. Maximum "this is worse than I thought" before the flip. The Porsche 997 "IMS bearing" moment -- the cost that kills the engine.

**Estimated Length:** ~3:00

### SETUP (35%, ~230 words)

- **Beat 1: Escalation.** The costs from Block 1 are annoying. These next ones are dangerous. Because they don't feel like problems when they're happening.
- **Beat 2 -- Token spend at scale:** $50/day sounds like nothing. Until you do the math. $50 x 365 = $18,250 a year. On a tool. That's a senior developer's health insurance.
  - *WHY THIS MATTERS (natural):* "That's not a tool cost. That's a headcount cost. And it doesn't come with a two-week notice."
  - *Re-tension:* "And you can't just stop spending. The system depends on it now."
- **Problem statement:** The real price of building with Claude Code isn't the subscription. It's everything the subscription doesn't cover.

### TENSION (45%, ~290 words)

- **Beat 1 -- Testing chaos:** No test framework exists for agentic workflows. Your AI writes code, but who tests the AI? You do. Manually. Every time. There's no pytest for prompts.

**Forward Pull #5 (~5:30):** After testing chaos -- "And just when you think you've stabilized everything, Anthropic ships a new model." Level 5 (Implied Stakes).

- **Beat 2 -- Model updates break prompts:** Anthropic ships a new model. Your prompts break overnight. Not because you did anything wrong. Because the tool changed under your feet. Version lock-in is real.
- **Beat 3 -- The real time cost (the big one):** "Build this in 10 minutes." Yeah. After 40 hours of learning the tool. After rewriting your project structure 6 times. After throwing away 3 approaches that almost worked. The 10-minute demo is real. The 40 hours behind it are invisible.
  - *WHY THIS MATTERS (natural):* "That gap -- between the demo and production -- is where most people quit. They think they're doing it wrong. They're not. They're just seeing the real price."
  - *Re-tension:* "So why would anyone build with Claude Code at all?"
- **Lesson lead-in:** "So why would anyone build with Claude Code at all?" -- rhetorical question that triggers THE FLIP.

### PAYOFF (20%, ~130 words)

- **THE FLIP:** "Because when it works -- when the architecture is right -- it's not a tool anymore. It's a team. A team that ships at 10x speed, doesn't take vacations, and costs less than a single contractor."
- **Pivot line:** "Unless you understand the architecture." This single line pivots the entire video from teardown to masterclass.

**Forward Pull #6 (~7:30, THE FLIP):** "Unless you understand the architecture. And it has four parts." Level 5 (Implied Stakes + specific count). Transitions to Block 3.

### CREATIVE ELEMENTS
- **Visual demo:** SLIDE 04 -- Excalidraw simple math: "$50/day x 365 = $18,250/yr." Comparison line below: "Senior dev health insurance: ~$18,000/yr."
- **Visual demo:** SLIDE 05 -- Excalidraw timeline: "10-minute demo" (tiny sliver) vs "40 hours behind it" (massive bar). Labeled "What you see" vs "What actually happened."
- **Story:** The real time cost reveal. Contrast: "10 minutes" vs "40 hours." This is the viewer's lived experience reflected back.
- **Metaphor:** "It's not a tool anymore. It's a team." (reframes the AI relationship post-flip)
- **Audio-friendly:** "$50 a day. Times 365. Eighteen thousand two hundred and fifty dollars a year." The math speaks for itself.

### TENSION LOOP
- **Raise:** "These next ones are dangerous" (~4:15)
- **Tease:** Token spend math -- $18K/year (~4:45)
- **Deepen:** Testing chaos + model updates compound the dread (~5:30-6:30)
- **Release:** "So why would anyone build with Claude Code at all?" (rhetorical) (~7:00)
- **Re-tension:** "Unless you understand the architecture" -- THE FLIP creates massive curiosity for Block 3 (~7:30)

---

## BLOCK 3: THE ARCHITECTURE THAT MAKES IT WORK (~3.5 min, ~760 words)

**Purpose:** Framework-level solutions. Name the four patterns, show why each solves specific costs from Blocks 1-2. "I did it so you don't have to" payoff. ~25% of the video.

**Estimated Length:** ~3:30

### SETUP (30%, ~230 words)

- **Beat 1: Root cause.** Every problem from the last 7 minutes has the same root cause. You're treating Claude Code like a magic wand instead of like a junior developer who needs structure.
  - *Re-tension:* "A junior developer without onboarding docs, without guardrails, without a defined role. No wonder it hallucinates."

**Forward Pull #7 (~8:00):** "The architecture has four parts. And each one maps back to specific problems you just saw." Level 3 (Specific Preview + callback).

- **Beat 2: The framework.** The architecture has four parts. Each one solves a specific set of problems you just saw.

### TENSION (50%, ~380 words)

- **Beat 1 -- CLAUDE.md + project structure:** Solves context limits, legacy code, and prompt iteration. Your CLAUDE.md is persistent memory. The AI reads it every session. You stop re-explaining your project. You stop rewriting instructions. The AI remembers what it built and why. What goes in: project rules, file structure, patterns, key decisions. One file solves 3 of the 10 problems.
  - *WHY THIS MATTERS (natural):* "Three of the ten problems you just saw. Gone. One file."
  - *Re-tension:* "But memory alone doesn't fix hallucination. For that, you need to limit what the AI can touch."
- **Beat 2 -- Agents and skills (scoped tools):** Solves hallucination and non-determinism. Instead of one general-purpose AI doing everything, you scope each tool. Each agent has one job, limited context, specific instructions. A script-writing agent doesn't touch your database. A timeline agent doesn't rewrite your business logic. Scoped tools don't hallucinate because they can't wander.
  - *WHY THIS MATTERS (natural):* "When you scope the tool, you don't get 80% reliability. You get 99%. That's the difference between a demo and a product."
  - *Re-tension:* "But scoped agents still need to talk to external services. And that's where your token spend explodes."

**Forward Pull #8 (~9:30):** After agents/skills beat -- "That handles hallucination. But there's one more piece that cuts your token spend in half." Level 4 (Curiosity Gap + specific benefit).

- **Beat 3 -- MCP servers:** Solves token spend and testing chaos. External capability without context bloat. Instead of pasting API docs into every conversation, the AI calls a server. 7 MCP servers, each handling a different external service. Your context window stays clean. Your token spend drops.
- **Beat 4 -- Architecture first principle:** Solves the real time cost. Plan before you prompt. The 40 hours behind the 10-minute demo? Most of that is wasted iteration. When you architect first -- define the blocks, the beats, the structure before touching code -- the AI executes in a fraction of the time.
- **Lesson lead-in:** Bridge from framework to real results.

### PAYOFF (20%, ~150 words)

- **Revelation: Real results.** DMChamp: $100K/year SaaS, maintained by agents. AEO Protocol: full client delivery system. YouTube pipeline: 19 agents, 24 skills, 7 MCP servers producing every video on this channel. Over 1,000 hours of building, condensed into a system that runs itself.
- **Closing:** "These aren't theoretical. This is what I use every day. This is what I built with the exact architecture I just showed you."

**Forward Pull #9 (~11:00):** After results -- "But knowing the architecture isn't the same as implementing it. And that gap is where the real value lives." Level 5 (Implied Stakes). Transitions to Final Block.

### CREATIVE ELEMENTS
- **Visual demo:** SLIDE 06 -- Excalidraw left side: one big circle labeled "General AI" with arrows going everywhere (chaos). Right side: 4 small focused circles, each with one arrow to one target. Labeled "Scoped Agents."
- **Visual demo:** SLIDE 07 -- Excalidraw brain icon connected to multiple session boxes. Left (no CLAUDE.md): each session has disconnected brain. Right (with CLAUDE.md): single brain connects all sessions.
- **Visual demo:** SLIDE 08 -- Excalidraw left: tangled spaghetti lines labeled "prompt -> iterate -> fail -> retry." Right: clean flow "Plan -> Structure -> Execute -> Ship."
- **Story:** DMChamp and YouTube pipeline as proof. Contrast: "1,000 hours of mistakes" -> "a system that runs itself." Numbers: $100K/yr, 19 agents, 24 skills, 7 MCP servers.
- **Metaphor:** "Junior developer who needs structure" (core metaphor for this block). Also: "not a tool anymore, it's a team."
- **Audio-friendly:** Chaos vs. order described verbally: "Instead of one AI doing everything, you give each agent one job. One job, limited context, specific instructions."

### TENSION LOOP
- **Raise:** "Same root cause: treating it like a magic wand" (~7:45)
- **Tease:** "Four parts. Each solves a specific set of problems" (~8:00)
- **Deepen:** Each solution maps back to specific costs -- viewers mentally check off the problems (~8:30-10:30)
- **Release:** Real results -- DMChamp, AEO, YouTube pipeline (~10:30)
- **Re-tension:** "But knowing the architecture isn't the same as implementing it" (~11:00)

### CTA PLACEMENT IN THIS BLOCK

**Claudify mention #2 (~10:45):** After results payoff. Fuller mention, earned: "I built all of this over a thousand hours. Inside Claudify, you build alongside me. Same tools, same architecture, same system. Link's in the description." Must be 140+ words after Claudify #1. VERIFIED: ~1,500+ words separate the two mentions.

---

## FINAL BLOCK: THE GAP (~1.5 min, ~325 words)

**Purpose:** Insight -> Gap -> Bridge to Claudify. NO ending signals. NO "wrapping up." NO "to summarize."

### INSIGHT (What they now understand)
You now see the 10 hidden costs that kill most Claude Code projects. And you see the four-part architecture -- CLAUDE.md, scoped agents, MCP servers, architecture-first planning -- that solves every single one of them. You understand why most people hit the wall and quit, and why the ones who don't quit aren't smarter. They just have better structure.

### GAP (What's still missing)
But knowing the architecture and implementing it are two different things. Which rules go in your CLAUDE.md. How to scope an agent so it actually stays in its lane. When to use an MCP server vs. inline tools. The hundreds of small decisions that make or break the system. That's not a 12-minute video. That's months of iteration. Or it's building alongside someone who already made the mistakes.

### BRIDGE (Claudify CTA -- final)
Claudify is where I build all of this live. The agents, the skills, the MCP servers, the exact project structures. Every week, new builds, new patterns, real projects. You build alongside me. Same tools, same architecture, same system. Ninety-seven dollars a month. Link's in the description.

**No ending signal. Video stops after the CTA. No outro, no "thanks for watching," no music fade.**

---

## CTA PLACEMENT VERIFICATION

| CTA | Location | Approximate Timing | Word Position |
|-----|----------|-------------------|---------------|
| Like request | Block 1, after hallucination debugging story | ~2:30 | ~word 430 |
| Claudify #1 | Block 1, after prompt iteration beat | ~3:45 | ~word 680 |
| Claudify #2 | Block 3, after results payoff | ~10:45 | ~word 2,350 |
| Final CTA (Claudify) | Final Block, Insight -> Gap -> Bridge | ~11:15 | ~word 2,500 |

**Spacing verification:**
- Like request -> Claudify #1: ~250 words apart. PASS (140+ required).
- Claudify #1 -> Claudify #2: ~1,670 words apart. PASS (140+ required).
- Claudify #2 -> Final CTA: ~150 words apart. PASS (140+ required).

---

## FORWARD PULL MAP (Every 45-60s, All Level 3+)

| # | Location | Approximate Time | Pull | Level |
|---|----------|-----------------|------|-------|
| 1 | Hook (end) | ~0:30 | "And the problems aren't what you'd expect." | 4 -- Curiosity Gap |
| 2 | Block 1, after context window | ~1:30 | "And that's the problem you can SEE filling up. The ones that don't look like problems are worse." | 4 -- Curiosity Gap |
| 3 | Block 1, after non-determinism | ~3:00 | "But the code problems are just the warm-up. Wait until you see what happens to your bank account." | 5 -- Implied Stakes |
| 4 | Block 1 -> Block 2 transition | ~4:00 | "And these are just the problems you can see. The ones you can't see are worse." | 5 -- Implied Stakes |
| 5 | Block 2, after testing chaos | ~5:30 | "And just when you think you've stabilized everything, Anthropic ships a new model." | 5 -- Implied Stakes |
| 6 | Block 2 -> THE FLIP | ~7:30 | "Unless you understand the architecture. And it has four parts." | 5 -- Implied Stakes + specific count |
| 7 | Block 3, opening | ~8:00 | "The architecture has four parts. And each one maps back to specific problems you just saw." | 3 -- Specific Preview + callback |
| 8 | Block 3, after agents/skills | ~9:30 | "That handles hallucination. But there's one more piece that cuts your token spend in half." | 4 -- Curiosity Gap + specific benefit |
| 9 | Block 3 -> Final Block | ~11:00 | "But knowing the architecture isn't the same as implementing it. And that gap is where the real value lives." | 5 -- Implied Stakes |

**Coverage:** 9 Forward Pulls across ~12 minutes = one every ~75 seconds average. All Level 3+. The longest gap is ~90 seconds (FP#5 at 5:30 to FP#6 at 7:00), which is acceptable given that stretch contains the emotional climax (real time cost reveal + THE FLIP).

---

## TENSION LOOP MAP (Full Video)

| Time | Event | Type |
|------|-------|------|
| 0:00-0:30 | Hook: mirror their near-future experience | Raise |
| 0:30-1:00 | Honeymoon phase -- everything works | Brief release (false comfort) |
| 1:00-1:30 | Context window fills up | Raise |
| 1:30-2:30 | Hallucination debugging story (3 hours, 1 line) | Deepen |
| 2:30-3:00 | Non-determinism (8/10 reliability) | Deepen |
| 3:00-3:30 | Legacy code + prompt iteration | Deepen further |
| 3:30-4:00 | "Every one is solvable... but the invisible ones are worse" | Release + immediate re-tension |
| 4:00-4:45 | Token spend math ($18K/year) | Raise (new dimension) |
| 4:45-5:30 | Testing chaos | Deepen |
| 5:30-6:30 | Model updates + real time cost reveal | Deepen to maximum |
| 6:30-7:30 | "So why would anyone build?" -> THE FLIP | Major release + re-tension |
| 7:30-8:30 | CLAUDE.md solves 3 problems at once | Release (solutions begin) |
| 8:30-9:30 | Agents/skills: 80% -> 99% reliability | Release continues |
| 9:30-10:30 | MCP servers + architecture first | Release continues |
| 10:30-11:00 | Real results (DMChamp, pipeline) | Full release |
| 11:00-12:00 | "But knowing vs implementing" -> Claudify CTA | Re-tension -> resolution via CTA |

---

## SLIDE LIST (Excalidraw Whiteboard Style)

| Slide | Description | Layout | Aspect |
|-------|-------------|--------|--------|
| SLIDE 01 | Context window bucket overflowing -- water line near top, labeled "200K tokens," files dropping in (file1.ts, file2.ts, README.md), last item splashes over | split_5050 or slide_full | TBD by timeline |
| SLIDE 02 | Reliability grid -- 10 identical boxes, 8 green checkmarks, 2 red X's. Label: "Same prompt. Same project." | split_5050 or slide_full | TBD by timeline |
| SLIDE 03 | Legacy code mystery -- file icon with "???" inside. Arrow from "You (3 weeks ago)" with checkmark, arrow from "You (today)" with question mark | slide_full or split_right | TBD by timeline |
| SLIDE 04 | Token spend math -- "$50/day x 365 = $18,250/yr." Below: "Senior dev health insurance: ~$18,000/yr" | split_5050 | TBD by timeline |
| SLIDE 05 | Time cost comparison -- "10-min demo" (tiny bar) vs "40 hours behind it" (massive bar). "What you see" vs "What actually happened" | slide_full | TBD by timeline |
| SLIDE 06 | Scoped agents -- Left: one big "General AI" circle with chaotic arrows everywhere. Right: 4 small circles, each with one clean arrow to one target. Label: "Scoped Agents" | split_5050 | TBD by timeline |
| SLIDE 07 | CLAUDE.md persistent memory -- Left (no CLAUDE.md): disconnected brain per session. Right (with CLAUDE.md): single brain connecting all sessions | slide_full or split_5050 | TBD by timeline |
| SLIDE 08 | Architecture first -- Left: tangled spaghetti "prompt -> iterate -> fail -> retry." Right: clean flow "Plan -> Structure -> Execute -> Ship" | slide_full | TBD by timeline |

---

## PEXELS B-ROLL QUERIES (3-5 clips needed)

| Query | Use Location | Purpose |
|-------|-------------|---------|
| "frustrated programmer at desk" | Block 1, hallucination debugging | Visual break during struggle story |
| "money counting cash bills" | Block 2, token spend math | Reinforce $18K cost reveal |
| "stopwatch time passing" | Block 2, real time cost | Reinforce 40 hours vs 10 minutes |
| "team collaboration technology" | Block 3, "it's a team" moment | Visual for the post-flip team metaphor |
| "architect blueprint planning" | Block 3, architecture-first principle | Visual for plan-before-prompt |

---

## SFX MAP

| SFX | Location | Purpose |
|-----|----------|---------|
| whoosh | Hook -> Block 1 transition (~0:32) | Chapter break |
| boop | After each cost stack reveal in Block 1 (~1:30, ~2:30, ~3:00, ~3:30) | Punctuate each "hidden cost" landing -- but only 2-3, not all 4. Pick the strongest moments. |
| shimmer | THE FLIP moment (~7:30) | Mark the tonal shift |
| whoosh | Block 2 -> Block 3 transition (~7:30) | Chapter break |
| achievement-ding | Results reveal -- DMChamp $100K/yr (~10:30) | Payoff moment |

**SFX discipline:** 5-6 total. No clicks on routine transitions. Minimum 10s between SFX. No thud.

---

## TEXT OVERLAY LIST

| Text | Location | Purpose |
|------|----------|---------|
| "200K tokens" | Block 1, context window beat (~1:00) | Reinforce the number |
| "3 HOURS. 1 LINE." | Block 1, hallucination debugging payoff (~2:00) | Visual punctuation of the contrast |
| "$50/day x 365 = $18,250/yr" | Block 2, token spend math (~4:45) | Key number -- must be on screen |
| "40 HOURS" | Block 2, real time cost reveal (~6:30) | Contrast with the "10 minutes" claim |
| "THE ARCHITECTURE" | Block 3, opening (~7:45) | Mark the shift to solutions |
| "$100K/yr" | Block 3, DMChamp result (~10:30) | Proof number |
| "19 agents. 24 skills. 7 MCP servers." | Block 3, YouTube pipeline (~10:45) | Proof specificity |

---

## LAYOUT FLOW (for timeline builder)

| Time Range | Layout | Notes |
|-----------|--------|-------|
| 0:00-0:05 | gradual_zoom | Hook opening, builds intensity |
| 0:05-0:15 | speaker_full + text_overlay | "200K tokens" or key phrase from hook |
| 0:15-0:25 | jump_cut | Escalation sequence (first user, database, legacy code) |
| 0:25-0:32 | gradual_zoom | Credibility line + promise |
| 0:32-1:00 | speaker_full | Block 1 setup -- honeymoon |
| 1:00-1:15 | split_5050 + SLIDE 01 | Context window bucket |
| 1:15-1:30 | speaker_full | Transition to hallucination story |
| 1:30-2:00 | gradual_zoom | Hallucination debugging story (building tension) |
| 2:00-2:15 | broll_full | "frustrated programmer" B-roll + text overlay "3 HOURS. 1 LINE." |
| 2:15-2:30 | speaker_full | WHY moment + like request |
| 2:30-3:00 | split_5050 + SLIDE 02 | 8/10 reliability grid |
| 3:00-3:15 | slide_full + SLIDE 03 | Legacy code mystery |
| 3:15-3:30 | speaker_full | Prompt iteration + "you're negotiating" |
| 3:30-4:00 | gradual_zoom | Payoff + Claudify #1 + transition to Block 2 |
| 4:00-4:45 | split_5050 + SLIDE 04 | Token spend math |
| 4:45-5:00 | broll_full | "money counting" B-roll |
| 5:00-5:30 | speaker_full | Testing chaos |
| 5:30-6:15 | speaker_full | Model updates |
| 6:15-6:45 | slide_full + SLIDE 05 | Time cost comparison bars |
| 6:45-7:00 | broll_full | "stopwatch" B-roll |
| 7:00-7:30 | gradual_zoom (slow) | THE FLIP -- "Unless you understand the architecture" |
| 7:30-8:00 | speaker_full | Root cause + "junior developer" metaphor |
| 8:00-8:30 | split_5050 + SLIDE 07 | CLAUDE.md persistent memory |
| 8:30-9:15 | split_5050 + SLIDE 06 | Scoped agents (chaos vs. order) |
| 9:15-9:30 | speaker_full | MCP servers explanation |
| 9:30-10:00 | slide_full + SLIDE 08 | Architecture first (spaghetti vs. clean flow) |
| 10:00-10:15 | broll_full | "architect blueprint" B-roll |
| 10:15-10:30 | speaker_full + text_overlay | Results -- "$100K/yr" |
| 10:30-10:50 | speaker_full + text_overlay | "19 agents. 24 skills. 7 MCP servers." + Claudify #2 |
| 10:50-12:00 | gradual_zoom | Final block -- Insight -> Gap -> Bridge -> Claudify CTA |

---

## HANDOFF NOTES FOR SCRIPT WRITER

### Script writer CAN change
- Fix any banned phrases (question fragments, announced WHY moments)
- Upgrade weak Forward Pulls to Level 3+
- Add micro-transitions between beats
- Fully write all spoken copy (hook, blocks, CTA)
- Adjust pacing within beats
- Choose which 2-3 of the 4 Block 1 cost stacks get "boop" SFX

### Script writer MUST preserve
- All 10 cost stacks in order (5 in Block 1, 5 in Block 2)
- THE FLIP placement at ~60% (end of Block 2 / start of Block 3)
- All 4 solution framework beats in Block 3 (CLAUDE.md, agents/skills, MCP, architecture-first)
- Progressive escalation structure (visible costs -> invisible costs -> solutions)
- All tension loops mapped above
- All 9 Forward Pulls at specified locations (can rewrite, cannot remove or move)
- All re-tension beats (every WHY moment followed by new tension within 1-2 sentences)
- CTA placement and 140+ word spacing
- Block order and block count (3 + Final)
- Vulnerability arc placement (Block 1 tension, hallucination debugging story)
- All specificity upgrades from the table above
- Insight -> Gap -> Bridge structure for Final Block (NO ending signals)
- "Junior developer who needs structure" metaphor in Block 3
- "You're not coding anymore. You're negotiating." metaphor in Block 1
- Contrarian title / respectful content dynamic throughout
