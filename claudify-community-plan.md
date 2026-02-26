# Claudify Community Content Plan

The Claudify Skool community content structure. Designed to launch lean (8 modules) and expand 1-2 modules per month based on member demand. Overwhelm is the #1 driver of Skool churn - this plan prevents it.

**Key constraints:**
- No free tier. YouTube is the free content, everything in Skool is behind $97/mo.
- Video lesson format for all modules.
- Three tracks: build for yourself, build a product, build a service.
- 21-day milestone: structured onboarding path to a first working system (not a refund guarantee).
- Launch with enough to feel substantial, not enough to overwhelm.

---

## 1. Skool Classroom Structure

### Category: 21-Day Quick Start

Every new member starts here. Linear, no choices to make. The structured onboarding path that gives new members direction and momentum.

**Core framing: chatbot vs operating system.** The Quick Start teaches the shift from "chatting with AI" (Module 2) to "building with AI" (Module 4). By the end, members understand why ChatGPT frustrates them and what a real AI system looks like.

**Demo project: Language Tutor.** The founder builds a Dutch language tutor on camera as the running example across Modules 2-5. Members follow along with whatever they want to build - a language tutor, a client tool, a personal system. The language tutor is the demo because it's relatable (everyone's tried to learn a language), unexpected (nobody thinks "language app" when they hear Claude Code), and it showcases memory, skills, and file-based tracking better than a static document generator.

**Rule: Do not skip ahead.** Trust the process. Each day builds on the previous one. Members who rush through modules miss the community actions and coaching that make the difference. (Inspired by CoderCo's "clean completion" philosophy.)

| # | Module | What they build | Day |
|---|--------|----------------|-----|
| 1 | Welcome + Setup | Claude Code installed, terminal running | Day 1 |
| 2 | Your First Session | Complete a real task with Claude Code | Day 2-3 |
| 3 | CLAUDE.md: Your Project's Brain | A CLAUDE.md for their own project | Day 4-6 |
| 4 | Your First Real System | A working automation/tool for their actual work | Day 7-14 |
| 5 | When Things Go Wrong | Debug skills, context management, recovery | Day 15-18 |
| 6 | Pick Your Track | Choose: build for yourself / product / service | Day 19-21 |

**Module 4 is the key module.** This is where the 21-day milestone lives or dies. Members pick ONE real thing from their work (not a tutorial project) and build it with Claude Code. Coaching calls during weeks 2-3 focus heavily on helping people through this module.

#### Quick Start Module Outlines (Recording Guide)

**Total recording time: ~2.5 hours.** Each module is a screen share recording in the terminal. The founder builds the Dutch language tutor on camera while explaining concepts. Members pause and build their own version.

---

**Module 1: Welcome + Setup (~15 min) | Day 1**

| Lesson | What's on screen | What you say |
|--------|-----------------|-------------|
| 1.1 Show the end result | Run the finished language tutor: `/lesson`, watch it review old words, teach new ones, quiz, save progress | "By Module 4, you'll have built this yourself. Let me show you what we're building." |
| 1.2 Install Claude Code | Terminal: install Node.js (if needed), `npm install -g @anthropic-ai/claude-code`, run `claude`, authenticate | "If you've never opened a terminal before, that's fine. This is the only setup you'll ever do." |
| 1.3 Your workspace | `mkdir dutch-tutor && cd dutch-tutor`. Explain what a directory is and why Claude Code works inside one | "Claude Code always works inside a folder. That folder is your project." |

Deliverable: Claude Code installed, running, inside a project folder. Post screenshot in Wins.

---

**Module 2: Your First Session (~20 min) | Day 2-3**

This is the "chatbot" experience. Members use Claude Code the way they'd use ChatGPT - one-shot prompts, no structure. It works, but they'll see the limits in Module 3.

| Lesson | What's on screen | What you say |
|--------|-----------------|-------------|
| 2.1 The magic moment | Paste raw text: "My wife is British, lives in the Netherlands, needs to learn Dutch for daily life." Ask: "Give me 5 common Dutch phrases for ordering at a cafe, with pronunciation tips for an English speaker." | "That's already more useful than Google Translate. But watch what happens next." |
| 2.2 Make it interactive | "Now quiz me on those phrases." Get some wrong, see corrections with explanations. Then: "Give me 5 phrases for the grocery store." | "You're having a language lesson in your terminal. No app, no subscription, no ads." |
| 2.3 Working with files | "Save those phrases and my quiz results to lesson-01-cafe.md." Open the file. Then: "Read lesson-01-cafe.md and give me a harder quiz based on what I got wrong." | "Claude Code reads files, writes files, and edits files. That's 90% of what you need." |

Deliverable: Two lesson files with quiz results. Members try it with any language. Post first quiz score in Wins.

---

**Module 3: CLAUDE.md - Your Project's Brain (~25 min) | Day 4-6**

This is the turning point. The shift from "chatbot" to "system." Before vs after CLAUDE.md is the entire sales pitch for Claude Code over ChatGPT.

| Lesson | What's on screen | What you say |
|--------|-----------------|-------------|
| 3.1 The problem with one-shots | Open a NEW Claude Code session. Ask for a Dutch lesson. It doesn't know the learner is British, beginner, needs daily-life Dutch. It gives generic output | "Every session starts fresh. It doesn't know your rules, your level, your weak areas. Sound familiar? This is exactly how ChatGPT works. And this is the problem CLAUDE.md solves." |
| 3.2 Writing your first CLAUDE.md | Create CLAUDE.md in the project root. Walk through each section live | The file on screen should include: learner profile (British English, Netherlands Dutch, beginner A1, daily life focus, weak on de/het articles), teaching rules (plain English explanations, no IPA symbols, quiz after every 5 words, track progress in files, correct mistakes encouragingly), and session format (review 3 words from last lesson, teach new topic, end with 5-question quiz, save to lessons/ folder) |
| 3.3 Before vs after | Run the EXACT same prompt as Module 2 but now with CLAUDE.md in place. Output follows all the rules automatically | "You didn't tell it any of this. It already knows. That's the difference between using a tool and owning a system." |
| 3.4 Making it yours | Add a custom rule: "Focus on spoken Dutch, not written. Skip spelling exercises." Show the output adapting | "This is YOUR system now. No two CLAUDE.md files are the same. And this is why ChatGPT users are frustrated - they're starting from scratch every single time." |

Deliverable: A CLAUDE.md file in their project. Members share theirs in Show Your Work (for any project, not just language tutors).

---

**Module 4: Your First Real System (~40 min, split 4a/4b/4c) | Day 7-14**

The big module. On camera, the founder builds the Dutch tutor into a complete system with project structure, slash commands, and progress tracking. Members build THEIR system - could be a language tutor, a client tool, an internal workflow, anything.

**4a: Structure your project (~15 min)**

Build the project structure on screen:

```
dutch-tutor/
  CLAUDE.md
  .claude/
    commands/
      lesson.md
      quiz.md
      review.md
  lessons/
    01-cafe.md
    02-grocery.md
  progress/
    vocabulary.md       (master word list with scores)
    weak-areas.md       (auto-updated after each quiz)
  topics/
    daily-life.md       (topic outlines: cafe, grocery, doctor, neighbors)
```

Key point: "A system has structure. A one-shot prompt doesn't. These files ARE the memory that ChatGPT doesn't have."

**4b: Build slash commands (~15 min)**

Create `.claude/commands/lesson.md`:

```
Read progress/vocabulary.md and progress/weak-areas.md.
Read the next untaught topic from topics/daily-life.md.
Start with a 3-word review from vocabulary.md (pick words with low scores).
Teach today's topic following the session format in CLAUDE.md.
Run the end-of-lesson quiz.
Update vocabulary.md with new words and scores.
Update weak-areas.md if any quiz answers were wrong.
Save the full lesson to lessons/ with today's date.
```

Demo it live: run `/lesson`. Watch it review old words, teach new ones, quiz, update scores, save everything. Run it again the next day - it remembers, it adapts, it progresses.

"That's not a chatbot. That's a tutor with memory."

Add `/quiz` (quick quiz from vocabulary, weighted toward weak areas) and `/review` (targeted practice from weak-areas.md).

**4c: Add polish and power (~10 min)**

- Add a conversation mode: "Simulate a conversation at the grocery store in Dutch. I'll respond in Dutch, you correct my mistakes." Show the back-and-forth dialogue
- Add a new topic file (`topics/emergencies.md`) and show the system picks it up automatically
- Show bulk: "My wife's friend also wants to learn. Copy the project, change the CLAUDE.md profile, done - a second tutor in 30 seconds"

"You now have something that Duolingo charges $13/mo for. Yours is free, personalized, and runs on your laptop."

Deliverable: Working system with slash commands, progress tracking, and conversation mode. Members build THEIR version. Build Lab hot seats during Week 2 focus entirely on helping members through their builds.

---

**Module 5: When Things Go Wrong (~20 min) | Day 15-18**

| Lesson | What's on screen | What you say |
|--------|-----------------|-------------|
| 5.1 Context limits | Feed it a massive vocabulary review (200+ words). Show context filling up. Fix: summarize progress into a status file, reference that instead of loading all lessons | "If your system gets big, you summarize. Same as you'd brief a colleague - you don't hand them every email, you give them the summary." |
| 5.2 Hallucinations | Ask it to teach a Dutch word - it gives a slightly wrong translation or invents a phrase. Why it happens (it fills gaps). Fix: add CLAUDE.md rule: "Never invent Dutch words. If unsure, say so and suggest checking a dictionary." | "LLMs are not dictionaries. They approximate. Your CLAUDE.md rules are the guardrails." |
| 5.3 Inconsistent difficulty | One session teaches A1, next jumps to B2. Fix: CLAUDE.md learner level + progress files keep it calibrated. Show how the system (files + commands) reduces variance vs raw prompting | "This is why 'just prompting ChatGPT' frustrates people. Without structure, every session is a coin flip." |
| 5.4 File conflicts and recovery | Show vocabulary.md getting overwritten. Explain the permission system (accept/deny edits). Teach git basics: `git init`, `git add`, `git commit` | "If you only learn one thing from this module: commit before you experiment. It's your undo button." |

Deliverable: Error-prevention rules added to CLAUDE.md. Members share their "biggest mistake so far" in Help & Debug (normalizes failure, builds community trust).

---

**Module 6: Pick Your Track (~15 min) | Day 19-21**

Talking head + screen share examples. No building in this module.

| Section | What you cover |
|---------|---------------|
| 6.1 What you built | Recap: "You went from zero to a working system in 18 days. You have memory, slash commands, progress tracking, and conversation practice. Most people using AI are still prompting ChatGPT one question at a time." |
| 6.2 Track A: Build for yourself | Turn this pattern into other personal tools: client intake forms, report generators, a personal knowledge base, a fitness tracker. "You're replacing SaaS subscriptions with tools you own." Next: Modules 7, 8, 14 |
| 6.3 Track B: Build a product | Turn the language tutor into a product: web frontend, Stripe payments, multi-user support. "Duolingo charges $13/mo for generic lessons. Yours are personalized. That's a product." Tease CS1 (DMChamp): same journey from personal tool to $100K SaaS. Next: Modules 8, 9, 10 |
| 6.4 Track C: Build a service | Sell custom AI systems to businesses. "My friend is a scientist who checks ingredient safety in ChatGPT - it forgets the rules every session. That's a $3-5K project for you." Next: Service Track SK1-SK5 |
| 6.5 What's next | Walk through Foundations modules and case studies. Point to The Vault (annual). "Pick a track, start the next module, bring your questions to Thursday's Build Lab." |

Deliverable: Members post which track they chose and what they want to build next. This data tells the founder what modules to prioritize.

#### Day-by-Day Pacing (21 Days)

Same 6 modules, but with daily milestones, check-ins, and community actions between modules. This prevents "I watched all 6 videos in one sitting and don't know what to do next."

**Week 1: Foundation (Modules 1-3)**

| Day | Module | Action | Community |
|-----|--------|--------|-----------|
| 1 | Module 1: Setup | Install Claude Code, configure terminal, run first command | Post intro in Introductions ("who I am, what I want to build") |
| 2 | Module 2: First Session | Watch module. Pick ONE real task from your actual work | Reply to someone else's intro in Introductions |
| 3 | Module 2 (continued) | Complete the task. Screenshot the result | Post first win in Wins ("I just did X with Claude Code") |
| 4 | Module 3: CLAUDE.md | Watch module. Start writing a CLAUDE.md for your project | Browse Show Your Work, see what others are building |
| 5 | Module 3 (continued) | Finish your CLAUDE.md. Test it: start a new session and see if Claude understands your project | Post your CLAUDE.md in Show Your Work for feedback |
| 6 | Module 3 (continued) | Refine based on community feedback. Add project-specific rules | Attend coaching call replay if you missed Thursday |
| 7 | Rest / catch up | Review what you built this week. Read 3 posts in Help & Debug | Founder DM check-in: "How's the first week going?" |

**Week 2: The Build (Module 4, Part 1)**

| Day | Action | Community |
|-----|--------|-----------|
| 8 | Module 4: Watch the full module. Pick your ONE real system to build | Post in Show Your Work: "Here's what I'm building and why" |
| 9 | Start building. Focus on the simplest version that works | Ask one question in Help & Debug (even if you don't need to - practice asking) |
| 10 | Keep building. Hit your first wall. That's normal | Post your wall in Help & Debug. Someone has hit it before you |
| 11 | Attend The Build Lab (Thursday). Bring your project if you're stuck | If not attending live, post a specific question for the replay |
| 12 | Apply what you learned from The Build Lab. Push through the wall | Watch Friday Ship Log. Reply with your own progress |
| 13 | Keep building. Your system should be partially working by now | Post a progress update in Show Your Work |
| 14 | End of Week 2 checkpoint. Your system should do at least ONE useful thing | Founder DM follow-up: "How's the build going? Need a hot seat?" |

**Week 3: Polish + Pick Your Track (Modules 5-6)**

| Day | Action | Community |
|-----|--------|-----------|
| 15 | Module 5: When Things Go Wrong. Watch the module | Try to break your system on purpose. Document what happens |
| 16 | Fix what you broke. Practice the debug/recovery patterns | Post your debug story in Help & Debug (helps future members) |
| 17 | Polish your system. Add error handling from Module 5 | Browse the weekly challenge. Try it if you have time |
| 18 | Your system should be working and handling edge cases | Post your completed system in Wins with a short writeup |
| 19 | Module 6: Pick Your Track. Watch the module | Decide: Track A (build for yourself), B (product), C (service) |
| 20 | Start exploring your chosen track's first module | Post in Show Your Work: "I picked Track [X] because..." |
| 21 | Milestone day. You have a working system. Celebrate | Post your 21-day milestone in Wins. Badge unlocked |

### Category: Foundations

Unlocked after Quick Start (or browse freely). Added over time, 1-2 per month based on demand.

| # | Module | Prerequisite |
|---|--------|-------------|
| 7 | Custom Slash Commands & Skills | Quick Start |
| 8 | Building Agents | Quick Start |
| 9 | MCP Servers | Module 8 |
| 10 | Multi-Agent Teams | Module 8 |
| 11 | Hooks & Automation Triggers | Quick Start |
| 12 | Claude Code for Research & Analysis | Quick Start |
| 13 | Claude Code for Content & Marketing | Quick Start |
| 14 | Building Internal Tools & Dashboards | Quick Start |
| 15 | Advanced Patterns (git worktrees, parallel sessions) | Module 10 |

### Category: Case Studies

Released 1 per month. Each based on the founder's actual production systems.

| # | Case Study | What members learn |
|---|-----------|-------------------|
| CS1 | DMChamp: $100K SaaS | Full SaaS lifecycle with Claude Code - pricing, deployment, maintenance |
| CS2 | Agentic CI/CD Pipeline | Automated bug detection, fix, customer notification flow |
| CS3 | AEO Consulting Business | Building a consulting delivery system with agents + MCP |
| CS4 | NFC Smart Lock | Hardware/firmware - proving Claude Code goes beyond software |
| CS5 | Video Production & Outreach Stack | Content pipeline, cold outreach, marketing automation |

### Category: The Vault (Annual Members Only)

Production-grade templates and files pulled directly from the founder's systems. Monthly members learn everything they need from the Classroom. Annual members get the shortcuts: ready-to-copy production files that save weeks of setup time.

**This is the genuine value gap between monthly and annual.** Monthly members learn how to build. Annual members get files they can copy and ship with today.

Contents:
- CLAUDE.md templates (by industry/use case)
- Agent configuration files
- Skill templates
- Project structure starters

### Category: Service Track

For members on the service track (Track C). Open to all members (monthly and annual). Released progressively via the monthly content roadmap.

| # | Module | Content |
|---|--------|---------|
| SK1 | The Claude Code Service Menu | What you can sell, at what price points |
| SK2 | Scoping & Discovery | How to scope a Claude Code implementation project |
| SK3 | Pricing & Packaging | $2-5K project packages, retainer models |
| SK4 | Client Delivery | How to deliver, communicate, and hand off |
| SK5 | Finding & Closing Clients | Outreach, proposals, closing |

---

## 2. Launch Content (Day 1)

The minimum viable community. Enough to deliver on the 21-day milestone, show depth, and tease future content.

**Must-have at launch:**

- Orientation video: "Welcome to Claudify" (10-15 min, see Section 6)
- 21-Day Quick Start: All 6 modules (video lessons)
- Case Studies: CS1 (DMChamp) - the flagship case study
- The Vault: 3-5 CLAUDE.md templates, 2-3 agent configs (annual members only)
- Service Track: SK1 (Service Menu overview)
- Community spaces set up with posting guidelines (see Section 4)
- First Build Lab call scheduled

**Total launch effort: orientation video + 8 video modules + templates + community setup**

This is enough to:
- Deliver on the 21-day milestone (Quick Start path)
- Show depth (DMChamp case study is substantial)
- Give templates to start immediately (Vault for annual members)
- Tease the service pathway (SK1)

---

## 3. Monthly Content Roadmap

| Month | New Modules | Case Study | Vault Additions (Annual Only) |
|-------|------------|------------|-------------------------------|
| Launch | Quick Start (6) + SK1 | CS1: DMChamp | 5 CLAUDE.md templates, 3 agent configs |
| Month 2 | Module 7 (Commands/Skills) + Module 8 (Agents) | CS2: CI/CD Pipeline | Skill templates, hook examples |
| Month 3 | Module 9 (MCP) + SK2 (Scoping) | - | MCP server starters |
| Month 4 | Module 11 (Hooks) + SK3 (Pricing) | CS3: AEO Consulting | Client proposal templates |
| Month 5 | Module 10 (Multi-Agent) + Module 12 (Research) | - | Research workflow templates |
| Month 6 | Module 13 (Content) + SK4 (Delivery) + SK5 (Closing) | CS4: NFC Lock | Delivery checklist templates |
| Month 7+ | Module 14 (Dashboards), Module 15 (Advanced), demand-driven | CS5: Video/Outreach | Ongoing |

**Key principle: every month has something new.** Members always have a reason to stay. But it is 1-2 modules per month, not 5. Digestible.

---

## 4. Community Spaces (Skool Feed Categories)

| Space | Purpose | Posting Guidelines |
|-------|---------|-------------------|
| Announcements | New modules, updates, events (founder only) | Founder posts only. Members comment, don't post |
| Wins | Members share what they built (celebration + social proof) | Post what you shipped + a short writeup of what it does. Screenshots encouraged |
| Help & Debug | Get unstuck, share errors, ask questions | Include: what you tried, what happened, what you expected. Paste error messages, not screenshots of errors |
| Show Your Work | Share work-in-progress, get feedback | Share early and often. No need to be finished. Include context on what you're building and why |
| Ideas & Requests | Members request modules, features, templates | One idea per post. Upvote existing requests before creating duplicates |
| Coaching Call Replays | Recordings of weekly Build Lab calls | Watch first, then comment with questions or follow-ups |
| Introductions | New member intros (who are you, what do you want to build) | Template: "I'm [name], I [what I do], I want to build [specific thing]" |

**Before posting, ask yourself: where does this belong?** Each space has a pinned post explaining its purpose. Using the right space keeps the community clean and makes it easier for members to find answers.

---

## 5. Weekly Cadence

| Day | Activity |
|-----|----------|
| Monday | Weekly challenge posted (small, specific, doable in 1-2 hours) |
| Tuesday-Wednesday | Founder active in Help & Debug + community feed |
| Thursday evening | **The Build Lab** - Weekly live coaching call (60-90 min) |
| Friday | **Friday Ship Log** - Founder shares what he built that week with Claude Code (5-10 min Loom). Members reply with their own ship logs |
| Weekend | Community self-serves; founder responds async |

### The Build Lab (Thursday Coaching Call)

A named, recurring event. Not just "weekly coaching" but a signature community ritual. Rotating format keeps it fresh:

| Week | Format | What happens |
|------|--------|-------------|
| Week 1 | Hot Seats | 2-3 members share screen, build/debug live with founder |
| Week 2 | CLAUDE.md Roast | Member submits their CLAUDE.md, founder tears it apart live. Brutally honest, immediately actionable |
| Week 3 | Hot Seats | Same as Week 1 |
| Week 4 | Project Teardown | Member demos what they built, founder critiques architecture, patterns, and next steps |

Every Build Lab follows this structure:
1. Quick wins round (5 min) - members share what they shipped
2. Main format (40-50 min) - hot seats, roast, or teardown
3. Open Q&A (15-20 min) - rapid-fire questions
4. Next week preview (5 min) - what's coming

### Friday Ship Log

The founder records a 5-10 min Loom every Friday showing what he built that week with Claude Code. Not polished, not scripted. Raw building. Members are encouraged to reply with their own ship logs (text, screenshots, or Loom).

This creates a weekly rhythm of building and shipping. When members see the founder shipping every week, it normalizes consistent output.

---

## 6. Onboarding Flow (First 21 Days)

### Orientation Video: "Welcome to Claudify" (10-15 min)

Every new member watches this BEFORE starting Module 1. It tours the platform and sets expectations. Separate from the Quick Start curriculum. (Inspired by CoderCo's 20-min orientation.)

What it covers:
1. **What Claudify is** (2 min) - Not a course. A structured system with live support and a community of builders
2. **The 4 areas** (5 min) - Tour the Classroom, The Vault (annual), Community spaces, and The Build Lab
3. **The 21-day path** (3 min) - Overview of the day-by-day Quick Start. Set expectations: 30-60 minutes per day
4. **Ground rules** (2 min) - Do not skip ahead. Use the right community space. Show up to The Build Lab. Post your work
5. **What to do right now** (2 min) - Watch Module 1. Post your intro. Attend the next Build Lab (or watch the replay)

### Day-by-Day Onboarding Touchpoints

| When | What happens |
|------|-------------|
| Join | Welcome DM from founder (personal, not automated bot voice) |
| Join | Auto-tagged to "New Member" - gets pinned onboarding post pointing to orientation video |
| Join | Watch orientation video ("Welcome to Claudify") |
| Day 1 | Watch Module 1 (Setup). Post intro in Introductions |
| Day 1 | Encouraged to attend next Build Lab (or watch replay) |
| Day 2-3 | Module 2 (First Session). Share first win in Wins channel |
| Day 4-6 | Module 3 (CLAUDE.md). Share their CLAUDE.md in Show Your Work |
| Day 7 | Module 4 starts (the real build). Founder checks in via DM |
| Day 14 | Module 4 should be complete. Founder follows up via DM |
| Day 21 | Milestone checkpoint. Member should have a working system |

The founder DM at Day 7 and Day 14 is critical for retention. Personal touch in the first 21 days is what prevents early churn.

---

## 7. Gamification & Retention

### Skool built-in

- Levels (based on engagement points)
- Leaderboard (visible to all members)
- Points for posting, commenting, completing modules

### Custom retention mechanics

- **21-Day Quick Start badge** - complete Quick Start = badge + leaderboard points
- **Monthly build challenges** - themed (e.g. "Automate one thing you hate doing this week")
- **Member spotlight** - featured in Announcements when they ship something notable
- **"First $1K" milestone** - for Track C members who close their first service client
- **Coaching call attendance streak** - bonus points for showing up to The Build Lab consistently
- **Friday Ship Log streak** - bonus points for posting ship logs 3+ weeks in a row

### Retention levers

**Price lock.** The price you join at today is yours for life. When the price increases (see Pricing section), early members keep their original rate. This rewards loyalty and creates genuine urgency for new members.

**The Vault (annual-exclusive).** Monthly members get the full Classroom, community, and Build Lab. Annual members also get The Vault (production templates, CLAUDE.md files, agent configs, project starters), 1-on-1 project reviews, priority access on Build Lab calls, and 2 months free. The Vault is the main incentive to commit annually. Monthly members learn everything they need. Annual members get the shortcuts.

**Consistent new content.** Every month has at least 1-2 new modules. Members always have something new to work through. No "I've seen everything" feeling.

### Anti-churn triggers

- If a member has not logged in for 7 days: founder DM ("Hey, saw you started Module X - need help?")
- If a member is stuck on Module 4 for 14+ days: invite to Build Lab hot seat
- Monthly "what's your next build?" prompt in the feed (keeps people forward-looking)

---

## 8. Track-Specific Paths

The three tracks share the same Quick Start and Foundations. They diverge at Module 6 ("Pick Your Track") with recommended paths.

### Track A: Build for Yourself

Quick Start -> Module 7 (Commands) -> Module 8 (Agents) -> Module 14 (Dashboards) -> CS1 (DMChamp for inspiration)

Goal: internal tools, custom workflows, replace SaaS subscriptions.

### Track B: Build a Product

Quick Start -> Module 8 (Agents) -> Module 9 (MCP) -> Module 10 (Multi-Agent) -> CS1 (DMChamp as blueprint)

Goal: ship a SaaS or tool that generates revenue.

### Track C: Build a Service

Quick Start -> Service Track (all modules) -> Module 8 (Agents) -> CS3 (AEO as service template)

Goal: package and sell Claude Code implementation services.

Tracks are recommendations, not gatekeeping. Any member can access any module.

---

## 9. Pricing

### Monthly: $97/mo

What you get:
- 21-Day Quick Start (full curriculum)
- Foundations (20+ modules, released monthly)
- Case Studies (5 real-world breakdowns)
- Service Track (all modules)
- The Build Lab (weekly live coaching)
- Friday Ship Log
- All community spaces
- Weekly challenges

### Annual: $970/yr (2 months free)

Everything in monthly, PLUS:
- **The Vault** - Production-grade templates, CLAUDE.md files, agent configs, project starters
- **1-on-1 project review** with the founder
- **Priority access** on Build Lab calls
- **2 months free** (12 months for the price of 10)

### Price Increase Plan

One real price increase from $97 to $117 at a meaningful milestone (100 or 200 members). Not a recurring tactic. Not "prices go up every week" urgency theatre.

- Early members lock in $97/mo for life
- New members after the increase pay $117/mo
- Annual adjusts proportionally ($970 -> $1,170)
- Communicate honestly: "We increased the price because the community is bigger and the content library is deeper. If you joined early, you keep your original rate forever"

This creates real urgency for prospective members without the dishonesty of manufactured scarcity.

---

## 10. What This Changes in Existing Docs

### new-plan-wip-draft.md

- Remove free Skool tier (Layer 3). YouTube is the free content. No free community.
- Update module numbering to match this plan (Quick Start 1-6, Foundations 7-15, Case Studies CS1-CS5, Service Track SK1-SK5).
- Remove "refund guarantee" / "money back" language from the guarantee section. Reframe as a 21-day structured milestone.
- Update 90-day action plan to reflect no free tier launch.

### claudify-brand-copy.md

- The Vault is now annual-exclusive. Update "What you get" accordingly.
- Weekly coaching is now "The Build Lab." Update all references.
- Friday update is now "Friday Ship Log."
- Add price lock messaging near CTA.
- Add objection handling section.
- Add cost of waiting framing.
