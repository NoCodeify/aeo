# Script: 1,158 Hours of Building With Claude Code in 10 Minutes (V4)

**Target Keyword:** claude code
**Secondary Keywords:** claude code tutorial 2026, claude code tips, claude code best practices
**Target Length:** ~10 minutes (~2,100 words at 217 WPM)
**Format:** Talking head + screen recordings + Excalidraw slides + Pexels B-roll + GIFs

---

## PRODUCTION KEY

| Marker | Meaning |
|--------|---------|
| Speaker | Talking head (speaker_full or gradual_zoom) |
| SLIDE XX | Excalidraw whiteboard slide (slide_full or split_5050) |
| SCREEN XX | Pre-recorded screen capture (broll_full) |
| BROLL | Pexels stock video (broll_full) |
| GIF | Reaction GIF overlay (gif_overlay, speaker layouts only) |
| SFX | Sound effect |
| TEXT | Text overlay on speaker |
| LAYOUT | Layout change note for timeline builder |

---

## HOOK (0:00 - 0:40) ~130 words

| Visual | What You Say |
|--------|------------|
| LAYOUT: gradual_zoom (slow build through hook) | |
| Speaker | "So after 1,158 hours in Claude Code..." |
| SCREEN 01: Hours tracked screen showing 1,158 hours | |
| Speaker | "...here's the thing nobody tells you. Most of what you'll find on YouTube about this tool is already outdated." |
| Speaker | "The system changes every few months. The workflows shift. What worked in October genuinely does not work in February. And I'm not talking about small stuff. I'm talking about fundamentally different ways of working." |
| SLIDE 01: Three icons - SaaS app, government building, business hub | "I spent those hours building three production systems. A SaaS that does a hundred grand a year. A government access control system. And a full business running through AI agents and custom servers." |
| SFX: shimmer (on slide reveal) | |
| Speaker | "This is everything that actually matters. And there's one thing everyone recommends that made everything worse for me. I'll get to that." |

---

## THE EASIEST START YOU'LL EVER HAVE (0:40 - 2:00) ~270 words

| Visual | What You Say |
|--------|------------|
| SFX: whoosh (chapter transition) | |
| LAYOUT: speaker_full | |
| Speaker | "So let's start from the beginning. My first project was DM Champ. It's an AI sales agent. You connect it to WhatsApp, Instagram, your website, whatever, and it handles customer conversations. Closes deals. Makes about a hundred grand a year." |
| TEXT: "DM Champ - $100K/yr" (bottom third) | |
| Speaker | "Now DM Champ already existed when I started using Claude Code. Existing codebase. And honestly, the code was kind of a mess because it was originally built with a no-code tool and then exported." |
| BROLL: person typing on phone, messaging app interface | "And the setup was just..." |
| SCREEN 02: Terminal running `claude`, scanning the repo | "...you open the repo and run Claude Code. It goes through everything. Reads the files, understands the structure. That's it. No migration. No restructuring. Just init and go." |
| LAYOUT: speaker_full | |
| Speaker | "Did it break stuff? Yeah. But so do normal developers. That's not a Claude Code problem. And with the latest models, it barely makes mistakes anymore." |
| Speaker | "But here's where it gets interesting. On top of DM Champ, I built a separate system with six AI agents that handle the entire support pipeline." |
| SLIDE 02: Flow diagram - bug report → triage agent → developer agent → fix → notify customer on WhatsApp | "A bug comes in. One agent figures out what's wrong. Another one writes the fix. Another one messages the customer on WhatsApp saying it's resolved. I wake up, check the fix, approve it. Done." |
| SFX: boop (on "Done") | |
| SCREEN 03: dm-champ-agents repo, src/publish/ with 6 handlers | "Six agents. Four custom servers. All running in production." |
| Speaker | "And the setup file for this project? Just a basic CLAUDE.md explaining the repo and how to add new agents. Nothing fancy. When you're starting out, you don't need a complex setup. You just need to start." |

---

## THE MISTAKE THAT'LL COST YOU WEEKS (2:00 - 3:15) ~250 words

| Visual | What You Say |
|--------|------------|
| SFX: whoosh (chapter transition) | |
| LAYOUT: gradual_zoom (building tension) | |
| Speaker | "Now here's where most people go wrong. And I made this exact mistake." |
| Speaker | "So once DM Champ was running, I started working on a much bigger project. Government access control system. You know, tap-to-enter badges, admin dashboard, mobile app. The whole thing. Over 8,000 files." |
| TEXT: "8,000+ files" | |
| BROLL: person tapping access card on door reader | |
| Speaker | "And I thought, well, Claude Code is amazing, right? So let me just let it build everything. Fully autonomous. End to end. No human checking anything." |
| LAYOUT: speaker_full | |
| Speaker | "It doesn't work." |
| GIF: disappointed / "well that didn't work" reaction | |
| Speaker | "And I know that's not what you want to hear because everyone on the internet is telling you to just let AI do everything. But for anything going into production, the bottleneck is checking whether the code actually works." |
| Speaker | "Claude can write tests, but they're basic. And testing the actual interface? What takes you a minute, just clicking around and seeing if things look right, takes the AI fifteen minutes. It has to open a browser, take screenshots, analyze them. It doesn't have that visual speed yet." |
| SLIDE 03: Left side "AI" with speed icon, right side "Human" with eye icon, arrow between: "builds" / "verifies" | "So the real workflow is: AI builds fast, human verifies. That's it. Don't skip the verify step. I tried. It cost me weeks." |
| LAYOUT: speaker_full | |
| Speaker | "But that wasn't even the real lesson from this project. The real lesson was something I stumbled into by accident." |

---

## THE STRUCTURE THAT CHANGES EVERYTHING (3:15 - 5:10) ~400 words

| Visual | What You Say |
|--------|------------|
| SFX: whoosh (chapter transition) | |
| LAYOUT: speaker_full | |
| Speaker | "So I'm working on this government project. Twenty-seven features across the app. And Claude keeps losing context. It doesn't know what a feature is supposed to do. It's mixing things up. Writing code that runs but doesn't fit the system." |
| Speaker | "And I'm thinking, okay, the model isn't stupid. I've seen what it can do. So the problem has to be on my end." |
| SLIDE 04: Folder tree diagram - each folder labeled (auth, NFC, permissions, cards, locations) with a small doc icon inside each | "So I reorganized everything. One folder per feature. Authentication gets its own folder. Access badges get their own folder. Permissions, locations, cards. Every feature isolated." |
| SCREEN 04: VS Code, features/ folder expanded, 15 folders | "Fifteen features on the backend. Twelve on the frontend. Each one self-contained." |
| LAYOUT: gradual_zoom (building to the reveal) | |
| Speaker | "But here's the part that made the real difference. Every single feature folder gets its own instruction file. Not just a description. I'm talking about what the feature is for, how it works, what the current status is. Everything Claude needs to understand the context." |
| SCREEN 05: Per-feature CLAUDE.md open, scrolling through | "Twenty-seven of these across the whole project. So when Claude works on the access badge feature, it automatically loads all of that context. It knows what the feature is for, how it connects to the rest of the system, what's already been built." |
| TEXT: "27 context files" | |
| SLIDE 05: Left "Claude + context = clean code" (check), Right "Claude - context = compiles but wrong" (X) | "That was the unlock. Claude is only as good as the context you give it. No context? It'll write code that runs but makes no sense." |
| SFX: shimmer (on insight reveal) | |

### In-Repo Task Management

| Visual | What You Say |
|--------|------------|
| LAYOUT: speaker_full | |
| Speaker | "The other thing I did is project management inside the repo. Not Jira. Not Linear. Just text files." |
| SCREEN 06: TASKS/ directory, numbered files with status emojis | "107 task files. Todo, in progress, completed, blocked. Dependencies between tasks." |
| TEXT: "107 tasks in markdown" | |
| Speaker | "Why not a real project management tool? Because Claude can read local files instantly. The moment you make it talk to an external tool through an API, it's slower and less reliable. We actually built a custom integration with ClickUp, and it's still slower than just reading a text file. For an AI, local is king." |
| LAYOUT: gradual_zoom (building to transition) | |
| Speaker | "So at this point I've got a SaaS running on Claude Code, a government system with a proper structure, and I'm thinking, okay, I've figured this out." |
| Speaker | "But then things got a lot bigger." |
| GIF: "it's about to get real" / buckle up reaction | |

---

## MID-VIDEO CTA (~5:10) ~40 words

| Visual | What You Say |
|--------|------------|
| LAYOUT: speaker_full | |
| Speaker | "Quick thing. If you're watching this and you want to set up Claude Code for a real project, I'm building a community called Claudify where we do exactly that. Real builds, not toy projects. Link in description." |
| TEXT: CTA overlay - "Claudify" + link | |

---

## THE BUSINESS OPERATING SYSTEM (5:20 - 8:20) ~680 words

| Visual | What You Say |
|--------|------------|
| SFX: whoosh (major chapter transition) | |
| LAYOUT: speaker_full | |
| Speaker | "So the third project isn't even a project. It's my entire business running through Claude Code." |
| SLIDE 06: Hub diagram - center "One Repo" with 4 spokes: Consulting, YouTube, SaaS, Client Delivery | "I run a consulting business, a YouTube channel, a SaaS product, and client delivery. All from one repo. Over a thousand files." |
| SFX: shimmer (on hub reveal) | |
| TEXT: "1,066 files / 1 repo" | |

### Custom Servers

| Visual | What You Say |
|--------|------------|
| SCREEN 07: .mcp.json showing 7 server configs | "Seven custom MCP servers. And when I say custom, I mean I built these myself. One checks how brands appear when you ask ChatGPT or Gemini a question. One does keyword research. One generates images. One finds stock video. One scans what's trending on GitHub and Hacker News for content ideas." |
| BROLL: server room / data center abstract | |
| Speaker | "Why build your own? Because the ones other people have made don't do what you actually need for real work. Every time I hit that wall, I ended up building my own. That's the pattern." |

### Task Agents, Not Role Agents

| Visual | What You Say |
|--------|------------|
| LAYOUT: gradual_zoom (building to the big contrarian point) | |
| Speaker | "Now here's the big one. And this goes against what basically everyone is saying right now." |
| SLIDE 07: Left "Role Agents" with ~ (frontend dev, PM, designer), Right "Task Agents" with check (generate timeline, create report, find GIFs) | "Everyone talks about giving agents roles. Make a frontend developer agent. A PM agent. A designer agent. The government project actually has fifteen agents set up like this. And honestly? It doesn't make things noticeably better. They work, they run, but the output isn't really different from just using Claude Code directly with good context." |
| GIF: shrug or "meh" reaction (on "not really different") | |
| SCREEN 08: .claude/agents/ folder, 14 agent files | "What actually makes a difference is giving agents specific tasks. Not 'be a developer.' It's 'take this transcript and generate a video timeline.' Or 'take this data and create a client report.' Or 'find the best GIFs for each section of this script.'" |
| TEXT: "14 agents / 24 skills" | |
| Speaker | "Each agent gets specific tools and specific context. They do one thing well. Fourteen of these, plus twenty-four skills. A skill is basically a set of instructions for a specific job. So instead of explaining how to write a video script every time, Claude just loads the skill and knows exactly what to do. Same for audits, reports, timelines. One skill per job." |
| SFX: boop (punctuate the point) | |

### Agent Teams

| Visual | What You Say |
|--------|------------|
| LAYOUT: speaker_full | |
| Speaker | "And the latest evolution is these task agents working together in teams. Not one agent calling another. Actual teams with a shared task list." |
| Speaker | "So I have a command that says 'produce this video.' It kicks off a team. One agent builds the timeline. Another one finds GIFs. Another one sources stock footage. They're all working in parallel off the same task list, coordinating with each other." |
| Speaker | "That's the part that feels genuinely new. I'm not managing each agent. They pick up tasks, do their work, report back. It's the closest thing to having an actual team." |
| Speaker | "Now you might be wondering, when do you use a sub-agent versus a full team? Simple. A sub-agent is for one-off tasks. You send it off, it does the thing, it's done. The context is gone. A team is when you need back-and-forth. Multiple agents coordinating, passing work between each other, building on what the others did. That's the difference." |

### AI Setup Debt

| Visual | What You Say |
|--------|------------|
| LAYOUT: speaker_full | |
| Speaker | "And here's something nobody talks about. Just like your code accumulates technical debt, your Claude Code setup does too." |
| Speaker | "Skills get outdated. Agents reference old patterns. Instructions start contradicting each other. You wrote something three months ago that's now wrong, and the AI is following those old instructions instead of the new ones." |
| SCREEN 09: MAINTAINING.md scrolling through | "I have a 346-line document just for how to maintain the AI setup itself. Every time something gets added, I clean up the whole structure. Same way you'd clean up code. And sometimes Claude creates new shortcuts on its own. It noticed a workflow I kept repeating and just made a command for it without me asking." |

### Workflows Keep Changing

| Visual | What You Say |
|--------|------------|
| SLIDE 08: Timeline arrow with 4 stages: "Approve every edit" → "Bypass permissions" → "Plan mode" → "Just say it" | "And the last thing. The workflow keeps changing. When I started, you had to approve every single edit. Then I realized you can bypass that. Then plan mode came out, where Claude plans first and you review before it builds. Now you just say 'think about this first' in plain English and it does." |
| LAYOUT: speaker_full | |
| Speaker | "That's four different workflows in less than a year. If you're watching a Claude Code tutorial from six months ago, it's probably teaching you the old way." |

---

## THE TRAP - PAYOFF (8:25 - 9:05) ~150 words

| Visual | What You Say |
|--------|------------|
| SFX: whoosh (section break) | |
| LAYOUT: gradual_zoom (tension for the payoff) | |
| Speaker | "Alright. So remember that thing I said at the beginning? The one thing everyone recommends that made everything worse?" |
| SLIDE 09: Overloaded toolbox visual - too many MCP servers spilling out, confused AI in the middle | "It's adding everything at once. Every MCP server you can find. Every skill. Every plugin. People treat it like a shopping spree. More tools, more power." |
| Speaker | "It's the opposite. You give Claude forty tools and it doesn't know which one to use. Quality goes down." |
| GIF: "mind blown" or realization reaction (ironic, on "quality goes down") | |
| Speaker | "The government project has fifteen agents. But I didn't start with fifteen. I started with zero. Hit a wall. Added one. Hit another wall. Added another. Every single one earned its place." |
| LAYOUT: speaker_full | |
| Speaker | "Start with nothing. Add things only when you feel the pain of not having them. Less is more until it isn't." |

---

## CLOSE + CTA (9:05 - 10:00) ~165 words

| Visual | What You Say |
|--------|------------|
| SLIDE 10: Three steps stacked: "1. Init and go" → "2. Structure everything" → "3. Build a system" | "So that's 1,158 hours compressed. You start by just opening your repo and going. Don't overthink it. It works on messy codebases. It works on existing projects." |
| LAYOUT: speaker_full | |
| Speaker | "Then you structure everything. One folder per feature. Context files everywhere. Tasks inside the repo. And always a human checking anything that goes to production." |
| Speaker | "And eventually you build a system around it. Custom servers when the generic ones don't cut it. Task agents instead of role agents. And you maintain that system the same way you maintain your code." |
| Speaker | "The difference between ten hours in Claude Code and a thousand hours isn't knowing more features. It's knowing which ones to ignore." |
| SFX: shimmer (closing line emphasis) | |
| Speaker | "If you want to see the actual repo structures, agent configs, and workflows I use, I share all of that inside Claudify. Link in the description." |
| TEXT: CTA overlay - "Claudify" + link | |
| Speaker | "I'll see you in the next one." |

---

## VISUAL ASSET LISTS

### Screen Recordings (record before filming)

| # | What to Record | Repo | Duration |
|---|---------------|------|----------|
| 1 | Hours tracked screen showing 1,158 hours | Time tracker app | 3-4s |
| 2 | Terminal: running `claude` on a repo, scanning files | DM Champ | 5-8s |
| 3 | dm-champ-agents: `src/publish/` folder, 6 agent handlers | dm-champ-agents | 5s |
| 4 | VS Code: `features/` folder expanded, 15 feature folders | access-control-system | 6s |
| 5 | Per-feature CLAUDE.md open, scrolling through | access-control-system | 8s |
| 6 | `TASKS/` directory, numbered files with emojis | access-control-system | 5s |
| 7 | `.mcp.json` showing 7 MCP server configs | aeo | 6s |
| 8 | `.claude/agents/` folder, 14 agent files | aeo | 5s |
| 9 | `MAINTAINING.md` scrolling through | aeo | 6s |

**Total: ~49-58 seconds. REDACT: API keys, client names, customer data.**

### Slides (Excalidraw whiteboard, generate via /excalidraw-slides post-timeline)

| # | Description | Layout |
|---|------------|--------|
| 01 | Three icons: SaaS app, government building, business hub | slide_full (16:9) |
| 02 | Flow: bug → triage → fix → notify customer | split_5050 (1:1) |
| 03 | AI builds (speed) / Human verifies (eye) | split_5050 (1:1) |
| 04 | Folder tree: feature folders with doc icon inside each | slide_full (16:9) |
| 05 | Claude + context = good / Claude - context = bad | split_5050 (1:1) |
| 06 | Hub: "One Repo" center, 4 spokes (consulting, YT, SaaS, clients) | slide_full (16:9) |
| 07 | Role agents (~, "works but meh") vs task agents (check, specific jobs) | split_5050 (1:1) |
| 08 | Timeline: approve → bypass → plan mode → natural language | slide_full (16:9) |
| 09 | Overloaded toolbox, confused AI in the middle | slide_full (16:9) |
| 10 | Three steps: init → structure → system | slide_full (16:9) |

### Pexels B-Roll (source via Pexels MCP post-timeline)

| # | Search Query | When | Duration |
|---|-------------|------|----------|
| 1 | "person messaging phone business" | DM Champ intro (~0:50) | 3-5s |
| 2 | "access card door security" | Government project intro (~2:10) | 3-5s |
| 3 | "server room data center" | Custom MCP servers (~6:00) | 3-5s |

### GIFs (source via /gif-search post-timeline)

| # | Search Query | When | On Layout |
|---|-------------|------|-----------|
| 1 | "disappointed that didnt work" | "It doesn't work" (~2:25) | speaker_full |
| 2 | "buckle up here we go" | "Things got a lot bigger" (~5:05) | gradual_zoom |
| 3 | "shrug meh whatever" | "Not really different" (~6:30) | gradual_zoom |
| 4 | "mind blown realization" | "Quality goes down" (~8:00) | gradual_zoom |

### SFX Map (place in timeline)

| SFX | When | Why |
|-----|------|-----|
| whoosh | 0:40 - Chapter: DM Champ | Section break |
| boop | ~1:50 - "Done." | Punctuate the agent pipeline |
| whoosh | 2:00 - Chapter: The Mistake | Section break |
| whoosh | 3:15 - Chapter: Structure | Section break |
| shimmer | ~4:50 - "That was the unlock" | Insight reveal |
| whoosh | 5:20 - Chapter: Business OS | Major section break |
| shimmer | ~5:25 - Hub diagram reveal | Big moment |
| boop | ~6:55 - "They all work" | Punctuate agent point |
| whoosh | 7:45 - Chapter: The Trap | Section break |
| shimmer | ~9:05 - Closing line | Final emphasis |

**Total: 10 SFX (5 whoosh, 3 shimmer, 2 boop). Target is 10-15 per 10 min. Within range.**

### Text Overlays

| Text | When | Style |
|------|------|-------|
| "DM Champ - $100K/yr" | ~0:45 | Bottom third, white |
| "8,000+ files" | ~2:10 | Center pop, large |
| "27 context files" | ~4:40 | Bottom third, white |
| "107 tasks in markdown" | ~4:55 | Bottom third, white |
| "1,066 files / 1 repo" | ~5:25 | Center pop, large |
| "14 agents / 24 skills" | ~6:50 | Bottom third, white |
| CTA: "Claudify - link in description" | ~5:10 | CTA overlay component |
| CTA: "Claudify - link in description" | ~9:10 | CTA overlay component |

---

## LAYOUT FLOW (for timeline builder)

```
0:00  gradual_zoom     Hook - slow build
0:05  broll_full       SCREEN 01: hours tracked (1,158)
0:08  gradual_zoom     Continue hook
0:30  slide_full       SLIDE 01 (three systems)
0:40  speaker_full     DM Champ intro
0:50  broll_full       Pexels: phone messaging
0:55  broll_full       SCREEN 01: terminal init
1:10  speaker_full     Break stuff / latest models
1:25  split_5050       SLIDE 02 (agent pipeline flow)
1:40  broll_full       SCREEN 02: agent handlers
1:48  speaker_full     Basic CLAUDE.md, just start
2:00  gradual_zoom     The Mistake - tension build
2:10  broll_full       Pexels: access card door
2:15  speaker_full     "Let it build everything"
2:25  speaker_full     "It doesn't work" + GIF overlay
2:35  speaker_full     QA bottleneck explanation
2:55  split_5050       SLIDE 03 (AI builds / human verifies)
3:05  speaker_full     "Cost me weeks" + transition
3:15  speaker_full     Structure intro - losing context
3:35  slide_full       SLIDE 04 (folder tree)
3:45  broll_full       SCREEN 03: features/ folder
3:52  gradual_zoom     Per-feature instruction files
4:10  broll_full       SCREEN 04: per-feature CLAUDE.md
4:25  split_5050       SLIDE 05 (context = quality)
4:35  speaker_full     Task management
4:45  broll_full       SCREEN 05: TASKS/ directory
4:55  speaker_full     Why not Jira - local is king
5:05  gradual_zoom     "Things got a lot bigger" + GIF
5:10  speaker_full     Mid CTA (Claudify)
5:20  speaker_full     "Business running through Claude Code"
5:25  slide_full       SLIDE 06 (hub diagram)
5:35  broll_full       SCREEN 06: .mcp.json
5:50  broll_full       Pexels: server room
5:55  speaker_full     "Build your own, that's the pattern"
6:05  gradual_zoom     "Big one, goes against everyone"
6:15  split_5050       SLIDE 07 (role vs task agents)
6:25  speaker_full     + GIF overlay (facepalm)
6:35  broll_full       SCREEN 07: agents/ folder
6:50  speaker_full     "14 agents, 24 skills"
7:00  speaker_full     Agent teams intro
7:10  speaker_full     "Produce this video" - team example
7:20  speaker_full     "Not managing each agent"
7:30  speaker_full     Sub-agent vs team distinction
7:45  speaker_full     AI setup debt intro
7:55  broll_full       SCREEN 09: MAINTAINING.md
8:05  slide_full       SLIDE 08 (workflow evolution)
8:20  speaker_full     "Teaching you the old way"
8:25  gradual_zoom     Trap payoff tension
8:35  slide_full       SLIDE 09 (overloaded toolbox)
8:45  speaker_full     + GIF overlay (mind blown)
8:50  speaker_full     "Started with zero, earned its place"
9:05  slide_full       SLIDE 10 (three steps summary)
9:15  speaker_full     Structure recap
9:30  speaker_full     System recap
9:40  speaker_full     Closing line + shimmer
9:50  speaker_full     Claudify CTA + end
```

**Layout counts:**
- speaker_full: ~21 segments
- gradual_zoom: ~6 segments
- slide_full: 6 slides (16:9)
- split_5050: 4 slides (1:1)
- broll_full: 9 screen recordings + 3 Pexels = 12
- gif_overlay: 4 (all on speaker/gradual_zoom layouts)
- text_overlay: 8
- SFX: 10

**Visual density: ~51 layout changes in ~9:50 = 1 change every ~11.5 seconds. High energy, matches the format.**

---

## WORD COUNT

| Section | Words | Time (217 WPM) |
|---------|-------|----------------|
| Hook | 130 | 0:36 |
| Easy Start (DM Champ) | 270 | 1:15 |
| The Mistake (Autonomy) | 250 | 1:09 |
| Structure Unlock | 400 | 1:51 |
| Mid CTA | 40 | 0:11 |
| Business OS (Climax) | 680 | 3:08 |
| The Trap (Payoff) | 150 | 0:41 |
| Close + CTA | 165 | 0:46 |
| **Total** | **~2,085** | **~9:36** |

With pauses + visual transitions: **~10:30-10:45**

---

## POST-PRODUCTION PIPELINE

1. Film talking head (reading from prompter text extracted from this script)
2. Record 8 screen recordings (shot list above)
3. Rough cut speaker video manually
4. Re-transcribe clean video
5. Build timeline via `/video-timeline` (use Layout Flow above as guidance)
6. Generate slides via `/excalidraw-slides` at correct aspect ratios from timeline
7. Source GIFs via `/gif-search` (4 GIFs, queries above)
8. Source B-roll via Pexels MCP (3 clips, queries above)
9. Preview in Remotion Studio
10. Render at 4K via `render.ts --chunks 10`

---

## STATUS: SCRIPT V5 - FULL PRODUCTION BLUEPRINT
