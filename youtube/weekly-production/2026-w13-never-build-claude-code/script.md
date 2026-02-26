# Script: Why You Should NEVER EVER Build With Claude Code (V6 - Pivot + Rules Fix)

**Target Keyword:** claude code
**Secondary Keywords:** claude code problems, claude code issues, vibe coding problems
**Target Length:** ~12 minutes (~2,600 words at 217 WPM)
**Format:** Talking head + Excalidraw whiteboard slides, no screen recording

---

## PRODUCTION KEY

| Marker | Meaning |
|--------|---------|
| Speaker | Talking head (speaker_full or gradual_zoom) |
| SLIDE XX | Excalidraw whiteboard slide (slide_full or split_5050) |
| BROLL | Pexels stock video (broll_full) |
| GIF | Reaction GIF full-screen (gif_full, hard cut) |
| SFX | Sound effect |
| TEXT | Text overlay on speaker |
| LAYOUT | Layout change note for timeline builder |

---

## HOOK (0:00 - 0:35) ~102 words

| Visual | What You Say |
|--------|------------|
| LAYOUT: gradual_zoom | |
| Speaker | "You're about to build something real with Claude Code." |
| TEXT: "CLAUDE CODE" | |
| LAYOUT: jump_cut | |
| Speaker | "Maybe you already started. And it's going great." |
| LAYOUT: speaker_full | |
| Speaker | "It's writing code faster than you expected. Features are just appearing." |
| TEXT: "Features are just appearing" | |
| LAYOUT: gradual_zoom | |
| Speaker | "You're thinking, this is it. This changes everything. I can build anything." |
| LAYOUT: jump_cut (snap to escalation) | |
| Speaker | "And then your first user logs in." |
| LAYOUT: speaker_full | |
| Speaker | "Or your database hits a thousand rows." |
| LAYOUT: jump_cut | |
| Speaker | "Or you try to change something the AI wrote three weeks ago." |
| LAYOUT: gradual_zoom (tension build) | |
| Speaker | "And suddenly you're staring at a system you don't understand. Built by a tool that doesn't remember building it." |
| Speaker | "I spent over a thousand hours in exactly that place. And the problems aren't what you'd expect." |

---

## BLOCK 1: THE HIDDEN COSTS (0:35 - 4:40) ~892 words

### SETUP (~191 words, ~0:53)

| Visual | What You Say |
|--------|------------|
| SFX: whoosh (chapter transition) | |
| LAYOUT: speaker_full | |
| Speaker | "The first few days with Claude Code feel like a cheat code. You describe a feature. It builds it. You describe another one. Built. In two days I had more working features than I'd shipped in the previous month. You start thinking bigger. You start telling friends about it." |
| GIF: "this is amazing" excited reaction | |
| Speaker | "I did the same thing. My SaaS needed a guided onboarding flow. Something I'd never even attempted in FlutterFlow because it was just impossible. Claude Code built it. Not in one shot, but it got done. Then I needed a full credit reselling system. Users buying credits, reselling them to their own clients. Good luck building that in a visual builder. Claude Code handled it." |
| LAYOUT: gradual_zoom (tension building) | |
| Speaker | "And then the context window fills up." |
| SLIDE 01: Excalidraw bucket overflowing - water line near top, labeled "200K tokens," files dropping in (file1.ts, file2.ts, README.md), last item splashes over | |
| LAYOUT: split_5050 (speaker + SLIDE 01) | |
| TEXT: "200K tokens" | |
| Speaker | "Your 200K token context window sounds infinite. Until you're three files into a real project and the agent starts forgetting what it just built ten minutes ago. You ask it to update a component. It rewrites the file from scratch. It can't remember the version it wrote twenty minutes earlier." |
| LAYOUT: speaker_full | |
| Speaker | "The tool that was writing perfect code ten minutes ago is now introducing bugs into its own work. And that's the problem you can SEE filling up. The ones that don't look like problems are worse." |

### TENSION (~576 words, ~2:39)

| Visual | What You Say |
|--------|------------|
| LAYOUT: gradual_zoom (slow build into story) | |
| Speaker | "Nobody warns you about this part. Claude Code lies to you. Not maliciously. But confidently. You ask it to fix a bug. It says 'Done. Fixed the issue and verified the logic.' You read that. You trust it. You move on to the next thing." |
| BROLL: frustrated programmer at desk | |
| Speaker | "And then two hours later something breaks. You trace it back. The bug is still there. It didn't fix anything. It just told you it did." |
| SFX: boop (punctuate the betrayal) | |
| LAYOUT: speaker_full | |
| Speaker | "People on Reddit literally use the word 'gaslit.' And that's exactly what it feels like. You ask 'did this work?' It says yes. You ask 'are you sure?' It says absolutely. You check. It didn't work. It was never going to work. But it sounded so confident you didn't question it." |
| TEXT: "\"DONE. FIXED.\"" | |
| Speaker | "And it's not just bugs. You ask it to add a feature. It reports back: 'Added the feature, updated the tests, everything passes.' So you move on. Three features later you realize the first one was never actually connected to anything. The function exists. The tests pass. But nobody calls it. It's dead code that looks alive." |
| Speaker | "You stop trusting the tool. And once you stop trusting it, you're checking everything manually. Which means you're doing the work twice. Once to build it, once to verify it actually built what it said it built." |
| Speaker | "And that double-checking only catches what you can see. The bugs that look like working code slip right through." |
| Speaker | "If you've ever spent hours debugging code you didn't write, hit like so more people see this before they start building." |
| LAYOUT: gradual_zoom | |
| Speaker | "The AI introduces bugs. But that's not even the maddening part. Same prompt. Same project. Different results." |
| SLIDE 02: Excalidraw 10 identical boxes in a row. 8 green checkmarks, 2 red X's. Label: "Same prompt. Same project." | |
| LAYOUT: split_5050 (speaker + SLIDE 02) | |
| Speaker | "I tested this. Same codebase. Same instruction. 'Add rate limiting to the API routes.' Most of the time it works. Clean, solid, passes tests. But sometimes it decides your code isn't good enough. I asked for a simple feature on a TypeScript backend. It came back with constructor injection, abstract factory patterns, three new interfaces. I'm looking at it like, what is this? Why do we need any of this? I asked for one endpoint. It restructured half the project." |
| Speaker | "You can't ship 80% reliability. So you run it again. And again. And you start treating every single output like it might be wrong. You become a full-time code reviewer for a tool that's supposed to save you time." |
| SFX: boop (punctuate "80% reliability") | |
| LAYOUT: speaker_full | |
| Speaker | "But the code problems are just the warm-up. Wait until you see what it actually costs to run this thing." |
| LAYOUT: gradual_zoom | |
| Speaker | "And the over-engineering compounds. Every session, the AI adds another abstraction layer you didn't ask for." |
| SLIDE 03: Excalidraw snowball rolling downhill, getting bigger. Layer labels: "Session 1: clean code", "Session 5: factory patterns", "Session 10: ???". Arrow pointing down labeled "Complexity" | |
| LAYOUT: slide_full (SLIDE 03) | |
| SFX: draw (on slide reveal) | |
| Speaker | "You direct it to add a simple feature. It comes back with dependency injection and three wrapper classes. Next session, it builds on top of those wrappers. Now there's a whole architecture you never designed and never chose. The codebase is growing in complexity and you're not the one deciding how." |
| Speaker | "That's the real danger. It's not that the code doesn't work. It works fine. But it's five times more complex than it needs to be. And every new thing you add sits on top of that complexity. So the next change is harder. And the one after that is harder still." |
| Speaker | "And good luck telling the AI to simplify. It'll tell you 'refactored for simplicity' and add two more abstractions." |
| LAYOUT: speaker_full | |
| Speaker | "And the worst part about the lying? Sometimes it 'fixes' a bug by hiding it. The error goes away. Tests pass. Everything looks green. But it didn't solve the problem. It just suppressed the error message. The bug is still there, running silently, and now you can't even see it." |
| GIF: "this is fine" everything on fire reaction | |
| Speaker | "You're not coding anymore. You're negotiating." |
| Speaker | "Every single one of these problems is solvable. But nobody shows you the cost of solving them. And trust me, the cost is higher than the problems themselves." |

### PAYOFF (~125 words, ~0:35)

| Visual | What You Say |
|--------|------------|
| LAYOUT: speaker_full | |
| Speaker | "These are the problems nobody films. The ones that only show up after the demo ends and real usage begins. Every 'build X in ten minutes' video stops right before these start." |
| Speaker | "And those videos have millions of views. So imagine how many people are walking into this blind." |
| Speaker | "That means if you're watching those demos and thinking 'I can do this' -- you can. But the demo is the easy part. And nobody tells you what the hard part costs." |
| Speaker | "And the hard part isn't even what you think it is." |
| Speaker | "I spent a thousand hours hitting every one of these walls. If you want to skip that, SaaS Accelerator's in the description. And what's hiding underneath is worse." |
| TEXT: CTA overlay - "SaaS Accelerator" + link (~4:15) | |
| Speaker | "And these are just the problems you can see. The ones you can't see are worse." |

---

## BLOCK 2: THE REAL PRICE (4:40 - 7:45) ~661 words

### SETUP (~214 words, ~0:59)

| Visual | What You Say |
|--------|------------|
| SFX: whoosh (chapter transition) | |
| LAYOUT: gradual_zoom (escalation) | |
| Speaker | "Some Claude Code problems are obvious. Bugs. Crashes. Code that doesn't work. Those are annoying but you can see them. These next ones are dangerous. Because they don't feel like problems when they're happening. They feel normal. They feel like the cost of doing business." |
| LAYOUT: speaker_full | |
| Speaker | "A hundred dollars a day. That's what I was spending on my DM Champ agents running on Claude's Agent SDK. A hundred dollars. Every single day." |
| Speaker | "Until you do the math." |
| SLIDE 04: Excalidraw simple math: "$100/day x 365 = $36,500/yr." Comparison line below: "Junior developer salary in most countries." | |
| LAYOUT: split_5050 (speaker + SLIDE 04) | |
| TEXT: "$100/day x 365 = $36,500/yr" | |
| Speaker | "A hundred dollars a day times 365. Thirty-six thousand five hundred dollars a year. On API calls. That's a junior developer's full salary in most countries. That's a used car every six months. And this was just one project. One set of agents." |
| SFX: boop (on the total) | |
| LAYOUT: speaker_full | |
| Speaker | "That's not a tool cost. That's a headcount cost. Except this headcount doesn't come with a two-week notice. It doesn't give you documentation when it leaves. And if you stop paying, everything it built still needs maintaining." |
| Speaker | "And you can't just stop spending. The system depends on it now. Your entire workflow runs through it. Shutting it off means going back to writing code yourself. And you haven't done that in months." |
| Speaker | "The real price of building with Claude Code isn't the subscription. It's everything the subscription doesn't cover. And most of it doesn't show up on any invoice." |

### TENSION (~324 words, ~1:30)

| Visual | What You Say |
|--------|------------|
| LAYOUT: speaker_full | |
| Speaker | "No test framework exists for code the AI writes. Your AI writes code. But who tests the AI? You do. Manually. Every single time. Last week Claude Code updated my pricing logic. Tests passed. But it didn't check the frontend that displays those prices. I had to trace every flow myself, making sure nothing broke three files away." |
| BROLL: money counting cash bills | |
| Speaker | "There's no pytest for prompts. No unit test for 'did the AI understand what I meant.' So you become the test suite. And you're not getting paid for it." |
| LAYOUT: speaker_full | |
| Speaker | "And just when you think you've stabilized everything, Anthropic ships a new model." |
| Speaker | "Your prompts break overnight. Not because you did anything wrong. Because the tool changed under your feet. That system prompt you spent two weeks perfecting behaves differently now. And Anthropic doesn't send you a changelog for how the model's personality shifted. You just wake up one morning and everything is slightly off." |
| Speaker | "So you fix it. And then the next update breaks it again. That cycle never stops." |
| LAYOUT: gradual_zoom (building to the big reveal) | |
| Speaker | "But there's one more. And it's the one that really gets people." |
| Speaker | "'Build this in ten minutes.' Yeah. After 40 hours of learning the tool. After rewriting your project structure six times. After throwing away three approaches that almost worked." |
| BROLL: stopwatch time passing | |
| SLIDE 05: Excalidraw timeline: "10-min demo" (tiny sliver) vs "40 hours behind it" (massive bar). Labeled "What you see" vs "What actually happened." | |
| LAYOUT: slide_full (SLIDE 05) | |
| TEXT: "40 HOURS" | |
| Speaker | "The ten-minute demo is real. I can build things in ten minutes now. But the 40 hours behind that ability are invisible. Weekends rebuilding project structure. Hours reading through error logs. Three complete rewrites before landing on something that works. Nobody films that part." |
| LAYOUT: speaker_full | |
| Speaker | "That gap between the demo and production is where most people quit. They think they're doing it wrong because theirs takes ten hours instead of ten minutes. They're not doing it wrong. They're just seeing the real price for the first time." |
| Speaker | "And that price keeps climbing the deeper you go. Every layer you add, every integration, every edge case -- the gap widens." |
| Speaker | "So why would anyone build with Claude Code at all?" |

### PAYOFF -- THE FLIP (~112 words, ~0:31)

| Visual | What You Say |
|--------|------------|
| LAYOUT: gradual_zoom (slow, deliberate, THE FLIP) | |
| Speaker | "Because when it works -- when the architecture is right -- it's not a tool anymore. It's a team. A team that writes, reviews, and ships code at 10x speed. That doesn't take vacations. That doesn't call in sick. And costs less than a single contractor." |
| Speaker | "I have one agent that writes scripts. Another that validates them. Another that builds video timelines. They hand work to each other. They catch each other's mistakes. And I just review the output." |
| SFX: shimmer (THE FLIP moment) | |
| Speaker | "Every problem I just showed you. I don't hit those anymore. But only because I stopped treating Claude Code like a magic wand." |
| Speaker | "Unless you understand the architecture." |
| SFX: whoosh (chapter break) | |
| TEXT: "THE ARCHITECTURE" | |
| Speaker | "And it has four parts." |

---

## BLOCK 3: THE ARCHITECTURE THAT MAKES IT WORK (7:45 - 11:10) ~732 words

### SETUP (~200 words, ~0:55)

| Visual | What You Say |
|--------|------------|
| LAYOUT: speaker_full | |
| Speaker | "Most people use Claude Code wrong. They treat it like a magic wand instead of like a junior developer who needs structure." |
| Speaker | "Think about it. When you hire a junior developer, you give them an onboarding doc. You tell them which repos to touch and which ones to leave alone. You set up code review. You give them a specific role -- 'you handle the frontend, don't touch the database.' You define boundaries so they can do great work without accidentally breaking things." |
| Speaker | "Now think about what most people do with Claude Code. They drop it into a complex codebase with zero documentation, no guardrails, no defined role, and full access to every file. Then they get surprised when it breaks things." |
| Speaker | "That's not the tool failing. That's the onboarding failing. And the difference between a chaotic junior and a productive one isn't talent. It's structure." |
| Speaker | "Give that same junior clear boundaries, a defined role, and documentation they can reference. They become your most reliable team member. Same person. Different structure. Same principle applies to Claude Code." |
| Speaker | "The architecture has four parts. And each one maps back to specific problems you just saw." |

### TENSION (~422 words, ~1:57)

#### Part 1: CLAUDE.md

| Visual | What You Say |
|--------|------------|
| LAYOUT: speaker_full | |
| Speaker | "Part one. CLAUDE.md and project structure." |
| SLIDE 07: Excalidraw brain icon connected to session boxes. Left (no CLAUDE.md): each session disconnected brain. Right (with CLAUDE.md): single brain connecting all sessions | |
| LAYOUT: split_5050 (speaker + SLIDE 07) | |
| Speaker | "CLAUDE.md is persistent memory. It sits in your project root, and the AI reads it at the start of every single session. You stop re-explaining your project. You stop rewriting instructions. The AI remembers what it built and why." |
| Speaker | "What goes in there: your project rules, which files are off-limits, naming conventions, key architectural decisions. Things like 'never modify the auth middleware without asking first' or 'always use Supabase, never Firebase.' One file. And the AI follows it every time it spins up." |
| LAYOUT: speaker_full | |
| Speaker | "Three of the ten problems you just saw. Context limits, legacy confusion, prompt repetition. Gone. One file." |
| Speaker | "But memory alone doesn't fix hallucination. For that, you need to limit what the AI can touch." |

#### Part 2: Agents and Skills

| Visual | What You Say |
|--------|------------|
| Speaker | "Part two. Agents and skills." |
| SLIDE 06: Excalidraw left: one big circle "General AI" with chaotic arrows everywhere. Right: 4 small focused circles, each with one arrow to one target. Label: "Scoped Agents" | |
| LAYOUT: split_5050 (speaker + SLIDE 06) | |
| Speaker | "Instead of one general-purpose AI doing everything, you scope each tool. Each agent has one job, limited context, specific instructions." |
| Speaker | "My script-writing agent can only read script files and architecture docs. It can't touch my database. It doesn't even know those files exist. Scoped tools don't hallucinate because they can't wander. They can't accidentally delete your rate limiter because they don't have access to your middleware." |
| LAYOUT: speaker_full | |
| Speaker | "When you scope the tool, you don't get 80% reliability. You get 99%. That's the difference between a demo and a product." |
| Speaker | "But scoped agents still need to talk to external services. And that's where your token spend explodes." |

#### Part 3: MCP Servers

| Visual | What You Say |
|--------|------------|
| Speaker | "That handles hallucination. But there's one more piece that cuts your token spend in half." |
| Speaker | "Part three. MCP servers. New abilities without filling up the AI's memory." |
| Speaker | "Instead of pasting entire API documentation into every conversation, the AI just calls a server. One function call. Done. The docs live on the server, not in your context window." |
| Speaker | "I run eight MCP servers, each handling a different external service. The AI just calls a function and gets results back. Your context window stays clean. Your token spend drops." |
| Speaker | "But even with clean context and low token spend, you can still waste weeks if you start building without a plan." |

#### Part 4: Architecture First

| Visual | What You Say |
|--------|------------|
| LAYOUT: gradual_zoom | |
| Speaker | "Part four. Architecture first." |
| SLIDE 08: Excalidraw left: tangled spaghetti "prompt -> iterate -> fail -> retry." Right: clean flow "Plan -> Structure -> Execute -> Ship" | |
| LAYOUT: slide_full (SLIDE 08) | |
| Speaker | "Remember the 40 hours behind the ten-minute demo? Most of that is wasted iteration. Prompt, fail, retry, start over." |
| Speaker | "When you architect first -- define the structure before you write a single prompt -- the AI executes in a fraction of the time. An hour of planning saves twenty hours of iteration." |
| Speaker | "Plan before you prompt. That one principle cuts your iteration cycles by more than half. So what does all of this look like when you put it together?" |

### PAYOFF (~110 words, ~0:30)

| Visual | What You Say |
|--------|------------|
| LAYOUT: speaker_full | |
| Speaker | "DMChamp. $100K a year SaaS. Maintained by agents." |
| TEXT: "$100K/yr" | |
| Speaker | "AEO Protocol. Full client delivery system. YouTube pipeline." |
| TEXT: "19 agents. 26 skills. 8 MCP servers." | |
| Speaker | "Nineteen agents, twenty-six skills, eight MCP servers producing every video on this channel. Over a thousand hours of building, condensed into a system that runs itself." |
| SFX: achievement-ding (results moment) | |
| Speaker | "These aren't theoretical. This is what I use every day. This is what I built with the exact architecture I just showed you." |
| Speaker | "But it took me a thousand hours of wrong turns to get here. Every shortcut I tried cost me weeks." |
| Speaker | "Inside SaaS Accelerator, you build alongside me. Same tools, same architecture, same system. Link's in the description." |
| TEXT: CTA overlay - "SaaS Accelerator" + link (~11:10) | |
| Speaker | "But knowing the architecture isn't the same as implementing it. And that gap is what costs you months." |

---

## FINAL BLOCK: THE GAP (11:10 - 12:15) ~310 words

| Visual | What You Say |
|--------|------------|
| LAYOUT: gradual_zoom (through entire final block) | |
| Speaker | "Ten hidden costs kill most Claude Code projects. There's a four-part architecture -- CLAUDE.md, scoped agents, MCP servers, architecture-first planning -- that solves every single one of them." |
| Speaker | "You understand why most people hit the wall and quit. And why the ones who don't quit aren't smarter. They just have better structure." |
| Speaker | "So the real question becomes: how do you get that structure into your own projects?" |
| Speaker | "Because knowing the architecture and implementing it are two different things. Which rules go in your CLAUDE.md and which ones just add noise? How do you scope an agent so it actually stays in its lane? When is an MCP server overkill?" |
| Speaker | "I put 500 lines in my CLAUDE.md. The AI started ignoring half of it. Took me a week to figure out why. That's one decision out of hundreds." |
| Speaker | "Every single one of them has a wrong answer that costs you hours. I know because I've hit every wrong answer at least once." |
| Speaker | "You can figure all of this out yourself. Plenty of people do. But it takes months of trial and error. And most of those months feel like you're going backwards." |
| Speaker | "Or you can build alongside someone who already made the mistakes." |
| Speaker | "SaaS Accelerator is where I build all of this live. The agents, the skills, the MCP servers, the exact project structures. Every week, new builds, new patterns, real projects. You build alongside me. Same tools, same architecture, same system." |
| Speaker | "Link's in the description." |

---

## VISUAL ASSET LISTS

### Slides (Excalidraw whiteboard, generate via /excalidraw-slides post-timeline)

| # | Description | Layout | Aspect Ratio |
|---|------------|--------|--------------|
| 01 | Context window bucket overflowing - water line near top, labeled "200K tokens," files dropping in (file1.ts, file2.ts, README.md), last item splashes over | split_5050 | 1:1 |
| 02 | Reliability grid - 10 identical boxes in a row. 8 green checkmarks, 2 red X's. Label: "Same prompt. Same project." | split_5050 | 1:1 |
| 03 | Complexity snowball - snowball rolling downhill getting bigger. Layer labels: "Session 1: clean code", "Session 5: factory patterns", "Session 10: ???". Arrow down labeled "Complexity" | slide_full | 16:9 |
| 04 | Token spend math - "$100/day x 365 = $36,500/yr." Below: "Junior developer salary in most countries" | split_5050 | 1:1 |
| 05 | Time cost comparison - "10-min demo" (tiny bar) vs "40 hours behind it" (massive bar). "What you see" vs "What actually happened" | slide_full | 16:9 |
| 06 | Scoped agents - Left: one big "General AI" circle with chaotic arrows everywhere. Right: 4 small circles, each with one arrow to one target. Label: "Scoped Agents" | split_5050 | 1:1 |
| 07 | CLAUDE.md persistent memory - Left (no CLAUDE.md): disconnected brain per session. Right (with CLAUDE.md): single brain connecting all sessions | split_5050 | 1:1 |
| 08 | Architecture first - Left: tangled spaghetti "prompt -> iterate -> fail -> retry." Right: clean flow "Plan -> Structure -> Execute -> Ship" | slide_full | 16:9 |

### Pexels B-Roll (source via Pexels MCP post-timeline)

| # | Search Query | When | Duration |
|---|-------------|------|----------|
| 1 | "frustrated programmer at desk" | Block 1, gaslighting moment (~2:10) | 5-7s |
| 2 | "money counting cash bills" | Block 2, token spend context (~5:55) | 3-5s |
| 3 | "stopwatch time passing" | Block 2, real time cost (~7:00) | 3-5s |
| 4 | "team collaboration technology" | Block 3, "it's a team" moment (~8:00) | 3-5s |
| 5 | "architect blueprint planning" | Block 3, architecture-first principle (~10:30) | 3-5s |

### GIFs (source via /gif-search post-timeline)

| # | Search Query | When | On Layout |
|---|-------------|------|-----------|
| 1 | "this is amazing excited" | Block 1 honeymoon "feel like a cheat code" (~0:45) | gif_full |
| 2 | "this is fine everything on fire" | Block 1 gaslighting "fixes bug by hiding it" (~3:55) | gif_full |
| 3 | "mind blown shocked" | Block 3 "Three problems. Gone. One file." payoff (~9:00) | gif_full |

### SFX Map (place in timeline)

| SFX | When | Why |
|-----|------|-----|
| whoosh | ~0:35 - Hook -> Block 1 | Chapter break |
| boop | ~2:25 - "It didn't fix anything" | Punctuate the betrayal |
| boop | ~3:15 - "80% reliability" | Punctuate the number |
| whoosh | ~5:05 - Block 1 -> Block 2 | Chapter break |
| boop | ~5:40 - "$36,500 a year" | Punctuate the total |
| shimmer | ~7:55 - THE FLIP moment | Mark the tonal shift |
| whoosh | ~8:00 - Block 2 -> Block 3 | Chapter break |
| achievement-ding | ~11:05 - DMChamp $100K/yr reveal | Payoff moment |

**Total: 8 SFX (3 whoosh, 3 boop, 1 shimmer, 1 achievement-ding). Under the 10-15 target; timeline builder can add 1-2 draw/shimmer at slide reveals.**

### Text Overlays

| Text | When | Style |
|------|------|-------|
| "CLAUDE CODE" | ~0:01 (hook opening) | Center pop, large |
| "Features are just appearing" | ~0:08 (hook) | Bottom third, white |
| "200K tokens" | ~1:15 (context window) | Center pop, large |
| "\"DONE. FIXED.\"" | ~2:20 (gaslighting moment) | Center pop, large |
| "$100/day x 365 = $36,500/yr" | ~5:30 (token spend) | Center pop, large |
| "40 HOURS" | ~7:10 (real time cost) | Center pop, large |
| "THE ARCHITECTURE" | ~8:05 (the flip) | Center pop, large |
| "$100K/yr" | ~11:00 (DMChamp result) | Center pop, large |
| "19 agents. 26 skills. 8 MCP servers." | ~11:10 (pipeline proof) | Bottom third, white |
| CTA: "SaaS Accelerator" | ~4:15 (SaaS Accelerator #1) | CTA overlay component |
| CTA: "SaaS Accelerator" | ~11:10 (SaaS Accelerator #2) | CTA overlay component |

---

## LAYOUT FLOW (for timeline builder)

```
0:00  gradual_zoom     Hook - "You're about to build something real" + TEXT: "CLAUDE CODE"
0:04  jump_cut         "Maybe you already started. And it's going great."
0:07  speaker_full     "Writing code faster than you expected" + TEXT: "Features are just appearing"
0:11  gradual_zoom     "You're thinking, this is it."
0:14  jump_cut         "And then your first user logs in."
0:17  speaker_full     "Or your database hits a thousand rows."
0:20  jump_cut         "Or you try to change something the AI wrote three weeks ago."
0:24  gradual_zoom     "system you don't understand" (tension build)
0:30  gradual_zoom     "A thousand hours" + "problems aren't what you'd expect"
0:35  speaker_full     Block 1 start - honeymoon + GIF overlay "amazing"
0:50  gradual_zoom     "kanban deal flow in 30 mins, chat export in 5 mins"
1:00  gradual_zoom     "and then the context window fills up"
1:08  split_5050       SLIDE 01 (context window bucket 1:1) + TEXT: "200K tokens"
1:22  speaker_full     "tool that was writing perfect code" + Forward Pull #2
1:35  gradual_zoom     Gaslighting story - "Claude Code lies to you"
2:00  broll_full       Pexels: frustrated programmer
2:08  speaker_full     "The bug is still there. It just told you it did." + boop
2:18  speaker_full     "Gaslit" - Reddit quote + TEXT: "DONE. FIXED."
2:35  speaker_full     Dead code that looks alive + WHY moment
2:45  speaker_full     "Doing the work twice" + Like CTA
2:55  gradual_zoom     Non-determinism intro
3:02  split_5050       SLIDE 02 (8/10 grid 1:1)
3:18  speaker_full     "80% reliability" + boop + re-tension "full-time code reviewer"
3:30  speaker_full     Forward Pull #3 - "bank account"
3:38  gradual_zoom     Over-engineering compounds
3:48  slide_full       SLIDE 03 (complexity snowball 16:9) + SFX: draw
4:00  speaker_full     "factory patterns and dependency injection you never chose"
4:08  speaker_full     Re-tension: "good luck telling the AI to simplify"
4:12  speaker_full     Bug suppression + GIF overlay "this is fine"
4:24  speaker_full     "You're not coding. You're negotiating." + re-tension "cost is higher"
4:32  speaker_full     Payoff - "problems nobody films" + re-tension "millions of views"
4:42  speaker_full     CTA: SaaS Accelerator #1 + CTA overlay
4:52  speaker_full     Forward Pull #4 - "ones you can't see are worse"
5:00  speaker_full     Transition beat
5:05  gradual_zoom     Block 2 start - "These next ones are dangerous"
5:15  speaker_full     "$100 a day on Agent SDK."
5:25  split_5050       SLIDE 04 (token math 1:1) + TEXT: "$100/day x 365"
5:45  speaker_full     WHY: "headcount cost" + "doesn't give you documentation" + boop
6:00  speaker_full     "Can't just stop spending" + "haven't written code in months"
6:12  speaker_full     "Real price... subscription doesn't cover" + re-tension "no invoice"
6:18  broll_full       Pexels: money counting
6:22  speaker_full     Testing chaos - "no pytest for prompts"
6:38  speaker_full     Forward Pull #5 - "Anthropic ships a new model"
6:48  speaker_full     Model updates break prompts + re-tension "cycle never stops"
7:02  gradual_zoom     "Build this in ten minutes" - big reveal buildup
7:14  broll_full       Pexels: stopwatch time passing
7:20  slide_full       SLIDE 05 (time cost comparison 16:9) + TEXT: "40 HOURS"
7:30  speaker_full     "Nobody films the weekends" + WHY: "gap where most people quit"
7:38  speaker_full     Re-tension: "price keeps climbing, gap widens"
7:44  speaker_full     "So why would anyone build with Claude Code at all?"
7:50  gradual_zoom     THE FLIP - "when it works... it's a team" + shimmer
7:58  speaker_full     "One agent writes scripts. Another validates." (team in practice)
8:06  speaker_full     "Every problem I just showed you? I don't hit those anymore."
8:12  gradual_zoom     "Unless you understand the architecture" + TEXT + whoosh
8:18  speaker_full     Block 3 - root cause + "magic wand vs junior developer"
8:28  speaker_full     "When you hire a junior dev, you give them onboarding"
8:40  speaker_full     "What most people do with Claude Code. Zero documentation."
8:50  speaker_full     "Not the tool failing. The onboarding failing."
8:58  speaker_full     "Give them clear boundaries? Most reliable team member."
9:05  speaker_full     "Four parts. Each maps back."
9:12  speaker_full     Part 1 intro - CLAUDE.md
9:17  split_5050       SLIDE 07 (persistent memory 1:1)
9:28  speaker_full     "Project rules, naming conventions, off-limits files" detail
9:40  speaker_full     "Three problems. Gone. One file." + GIF overlay "mind blown"
9:48  gradual_zoom     Re-tension: "memory alone doesn't fix hallucination"
9:55  speaker_full     Part 2 intro - agents and skills
10:02 split_5050       SLIDE 06 (scoped agents 1:1)
10:15 speaker_full     "Script-writing agent can only read scripts" concrete example
10:25 speaker_full     "80% to 99%" + re-tension: "token spend explodes"
10:33 speaker_full     Forward Pull #8 - "cuts token spend in half"
10:40 speaker_full     Part 3 - MCP servers + brief example
10:50 speaker_full     "Seven MCP servers" + re-tension: "still waste weeks without a plan"
10:58 gradual_zoom     Part 4 - Architecture first
11:04 slide_full       SLIDE 08 (spaghetti vs clean flow 16:9)
11:12 speaker_full     "An hour of planning saves twenty hours." + "what does it look like?"
11:20 speaker_full     Results - DMChamp + TEXT: "$100K/yr"
11:30 speaker_full     Pipeline proof + TEXT: "19 agents..." + achievement-ding
11:40 speaker_full     SaaS Accelerator #2 + CTA overlay
11:50 gradual_zoom     Final block - Insight (ten costs + four parts)
12:00 gradual_zoom     "why the ones who don't quit aren't smarter"
12:08 gradual_zoom     Gap - "knowing vs implementing" + expanded questions
12:22 gradual_zoom     "scope an agent, MCP vs inline, skill vs agent"
12:30 gradual_zoom     Re-tension: "every wrong answer costs you hours"
12:38 gradual_zoom     "Months of trial and error. Or build alongside someone."
12:44 gradual_zoom     Bridge - SaaS Accelerator CTA
12:52 gradual_zoom     "Link in description."
12:55 end
```

**Layout counts:**
- speaker_full: ~35 segments
- gradual_zoom: ~18 segments
- jump_cut: 4 segments
- split_5050: 5 slides (1:1)
- slide_full: 3 slides (16:9)
- broll_full: 3 Pexels clips
- gif_full: 3 (hard cut, full-screen)
- text_overlay: 11
- SFX: 8

**Visual density: ~72 layout changes in ~12:55 = 1 change every ~10.8 seconds. Hook: 10 changes in 35s = 1 every ~3.5 seconds.**

---

## FORWARD PULL VERIFICATION

| # | Time | Level | Forward Pull |
|---|------|-------|-------------|
| 1 | ~0:30 | 4 (Curiosity Gap) | "And the problems aren't what you'd expect." |
| 2 | ~1:22 | 4 (Curiosity Gap) | "And that's the problem you can SEE filling up. The ones that don't look like problems are worse." |
| 3 | ~3:30 | 5 (Implied Stakes) | "But the code problems are just the warm-up. Wait until you see what happens to your bank account." |
| 4 | ~4:50 | 5 (Implied Stakes) | "And these are just the problems you can see. The ones you can't see are worse." |
| 5 | ~6:40 | 5 (Implied Stakes) | "And just when you think you've stabilized everything, Anthropic ships a new model." |
| 6 | ~8:05 | 5 (Implied Stakes + count) | "Unless you understand the architecture. And it has four parts." |
| 7 | ~8:40 | 3 (Specific Preview + callback) | "The architecture has four parts. And each one maps back to specific problems you just saw." |
| 8 | ~10:20 | 4 (Curiosity Gap + benefit) | "That handles hallucination. But there's one more piece that cuts your token spend in half." |
| 9 | ~11:38 | 5 (Implied Stakes) | "But knowing the architecture isn't the same as implementing it. And that gap is where the real value lives." |

**9 Forward Pulls across ~12:55 = one every ~86 seconds average. All Level 3+. Longest gap is ~90s (FP#5 at 6:38 to FP#6 at 8:12), during the emotional climax.**

---

## CTA VERIFICATION

| CTA | Location | Timing | Words Since Last CTA |
|-----|----------|--------|---------------------|
| Like request | Block 1, after hallucination debugging | ~2:45 (~500 words in) | n/a (first CTA) |
| SaaS Accelerator #1 | Block 1, after prompt iteration | ~4:35 (~830 words in) | ~330 words |
| SaaS Accelerator #2 | Block 3, after results payoff | ~11:38 (~2,380 words in) | ~1,550 words |
| Final CTA (SaaS Accelerator) | Final Block, Insight -> Gap -> Bridge | ~12:25 (~2,570 words in) | ~190 words |

**All SaaS Accelerator mentions 140+ words apart. Verified.**

---

## WORD COUNT

| Section | Spoken Words | Time (217 WPM) |
|---------|-------------|----------------|
| Hook | 102 | 0:28 |
| Block 1 (Hidden Costs) | 892 | 4:07 |
| Block 2 (Real Price) | 650 | 3:00 |
| Block 3 (Architecture) | 732 | 3:22 |
| Final Block (Gap) | 292 | 1:21 |
| **Total** | **~2,668** | **~12:18** |

With pauses + visual transitions: **~12:50**

---

## TENSION LOOP VERIFICATION

| # | Time | Tension Raised | Released At |
|---|------|---------------|-------------|
| 1 | 0:00-0:35 | Hook mirrors viewer's near-future | Ongoing across video |
| 2 | ~1:00 | Context window fills up | ~1:22 "introducing bugs into its own work" -> re-raises with "ones that don't look like problems" |
| 3 | ~1:35 | Gaslighting - "it lies to you" | ~2:18 "dead code that looks alive" + re-tensions with "doing the work twice" |
| 4 | ~2:55 | Non-determinism (8/10) | ~3:18 "80% reliability" + re-tensions with "bank account" |
| 5 | ~5:15 | Token spend ($36.5K/year) | ~5:45 + re-tensions with "system depends on it now" |
| 6 | ~6:22 | Testing chaos + model updates | ~7:38 "most people quit" + re-tensions with "why build at all?" |
| 7 | ~7:55 | THE FLIP triggers curiosity for solutions | ~11:28 Full release with real results |
| 8 | ~11:38 | "Knowing vs implementing" | ~12:32 Resolved via Claudify CTA |

**8 tension loops across ~12:35. All raise and release.**

---

## VULNERABILITY ARC VERIFICATION

| Block | Vulnerability | Purpose |
|-------|--------------|---------|
| Block 1 | Gaslighting pattern. "It says 'done, fixed' and it didn't fix anything." | Builds trust. Shows creator hits the same walls. |
| Block 2 | "The 40 hours behind it are invisible. Nobody films the weekends." | Validates viewer's frustration. They're not doing it wrong. |
| Block 3 | "I spent a thousand hours hitting every one of these walls." (Repeated twice) | Earns the Claudify CTA. The solution comes from real experience. |

---

## POST-PRODUCTION PIPELINE

1. Film talking head (reading from prompter text extracted from this script)
2. Rough cut speaker video manually
3. Re-transcribe clean video (`transcribe.ts --clean`)
4. Build timeline via `/video-timeline` (use Layout Flow above as guidance)
5. Generate slides via `/excalidraw-slides` at correct aspect ratios from timeline
6. Source GIFs via `/gif-search` (3 GIFs, queries above)
7. Source B-roll via Pexels MCP (5 clips, queries above)
8. Preview in Remotion Studio
9. Render at 4K via `render.ts --chunks 10`

---

## STATUS: SCRIPT V7 - VALIDATED + POLISHED (re-tension fixes, chapter re-hooks, jargon cleanup, sentence splits)
