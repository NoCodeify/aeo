# Video Brief: Claude Code Use Cases - 5 Things I Actually Built

**Date Created:** 2026-02-16
**Target Publish Date:** TBD

---

## Search Targeting

**Target Keyword:** claude code use cases
**YouTube Trend:** +65,150% rising
**Volume Anchor:** "claude code" = 500K/month (+99,900% YoY)
**Search Intent:** "I've seen Claude Code tutorials but what can you actually build with it? Show me real projects, not toys."

**Keyword Tier:**
- [x] Tier 3: Emerging (+inf growth)

**Secondary Keywords:** claude code, vibe coding, claude code best practices

---

## Video Goal

**Primary Goal:** [x] Views + Community funnel (Claudify)

**Success Metric:** 5K+ views in first 30 days, establishes Claude Code authority, drives Claudify signups

---

## Title & Thumbnail (1+1=3 Rule)

### Title
**Title:** "Claude Code Use Cases: 5 Things I Actually Built"
(52 characters)

**Title Checklist:**
- [x] Keyword in first 5 words ("Claude Code Use Cases")
- [x] Under 60 characters (52)
- [x] Specific promise ("5 Things I Actually Built")
- [x] Would rank for target keyword

### Thumbnail

**Text (3 words):** "I BUILT THESE"
**Hero Color:** [x] Teal #00D4FF (new/tech/modern)
**Expression:** Confident half-smile, slight nod, arms crossed or pointing at the 5 icons
**Visual Metaphor:** 5 small project icons (chat bubble, code terminal, email, NFC card, magnifying glass) floating in a grid behind you

**Thumbnail Checklist:**
- [x] Text does NOT repeat title words
- [x] Readable at 160x90px (mobile)
- [ ] Face on right 40%
- [ ] Bottom-right clear for timestamp
- [ ] Professional text effects (stroke + shadow + glow)

**1+1=3 Test:** Title = keyword + promise ("5 things"), Thumbnail = proof energy ("I BUILT THESE") [x] Yes

---

## The Contrarian Positioning

**The problem with current Claude Code YouTube content:**
- Entertainment, not production use
- Automating tasks that don't need automating
- Setting up 25 agents for no reason
- "Fully automating your entire job" fantasy
- Toy projects, not real business tools

**Our positioning:**
- 5 (secretly 6) things running IN PRODUCTION right now
- Real revenue, real users, real results
- Not a tutorial. Not a demo. Stories of what happened.

---

## The 5+1 Use Cases (CONFIRMED)

### Use Case 1: DM Champ ($100K/yr SaaS)
**What:** AI sales agent across WhatsApp, Instagram, Facebook, web chat. Claude (the model) IS the AI engine - more reliable than OpenAI, less hallucinations, better tool use.
**Claude Code role:** DM Champ went through GHL+Zapier -> FlutterFlow -> Cursor -> Claude Code. CC is what "rocketed development" - spitting out new features rapidly.
**Proof:** $100K ARR, serves businesses worldwide (clinics, restaurants, stores)
**Story beat:** The evolution story. Each platform had limitations. Claude Code removed the bottleneck - new features came fast.

### Use Case 2: DM Champ CI/CD Pipeline
**What:** Full automated dev/support pipeline. 7 specialized agents connected via Pub/Sub.

**How it works:**
- 4 entry points: ClickUp form, @claude comment, error webhook, GCP alert
- ROUTER agent (Opus) classifies and routes to the right agent
- BUG_TRIAGE: Clones repos, searches codebase, queries production logs, finds root cause
- DEVELOPER: Creates branch, fixes code, runs tests, opens PR
- OUTREACH: Sends WhatsApp + email notification ("Hey! We found and fixed the issue")
- SUPPORT_TRIAGE: Investigates support issues, can re-route to bug/feature
- FEATURE_PLANNER: Creates implementation plans, routes to developer
- ANALYZER: Reviews every agent conversation, flags prompt issues

**Design patterns:** Router-first classification, atomic Firestore locks, Pub/Sub decoupling, error dedup via MD5 fingerprints, session resume for follow-ups

**Proof:** "Automated myself out of the development process" - he does QA only now
**Story beat:** "Bug comes in at 3am. By the time I wake up, it's triaged, fixed, PR opened, and the customer got a WhatsApp saying it's resolved."

### Use Case 3: Cold Email Agent
**What:** Fully personalized cold emails per company. Agent Googles the company, finds info, writes a personalized email based on what it finds.
**Claude Code role:** Built the entire agent
**Proof:** [NEEDS METRICS - response rates, volume]
**Story beat:** "Not template + name swap. It actually researches your company before writing."

### Use Case 4: NFC Access Control System (CLIMAX)
**What:** Government access control system using NFC
**Claude Code role:** 90% built by Claude Code over 2 months. Remaining 10% took another month with offshore devs + Claude. User did QA only.
**Proof:** Government contract. Physical infrastructure.
**Timeline:** 2 months for 90% + 1 month for final 10% = 3 months total
**Story beat:** This is the "holy shit" moment. Government-level infrastructure, mostly built by AI. Not a to-do app. Not a chatbot. Physical access control with NFC readers.
**Note:** Limited details can be shared (government project). Keep it high-level but the numbers speak for themselves.

### Use Case 5: AEO System
**What:** Answer Engine Optimization system - audits whether AI (ChatGPT, Gemini) knows your business exists. Multiple agents, MCP servers, audit pipeline.
**Claude Code role:** Entire system built with Claude Code
**Proof:** Built for a client. Real service generating revenue.
**Story beat:** "I built an entire system that checks if ChatGPT knows your business exists. If it doesn't, the system tells you exactly what to fix."

### Use Case 6: Video Editing (SURPRISE ENDING)
**What:** This video's editing pipeline uses Claude Code
**Claude Code role:** Part of the production pipeline
**Story beat:** Quick mention at the end. "Oh, and one more thing." Don't dive deep. Don't say "fully automated." Mic-drop energy, move to CTA.

---

## Structure (Talking Head + Slides, ~10-12 min)

### Hook (0:00-0:45)
**Format:** Quick credibility + contrarian take

Draft hook:
> "I built a SaaS making a hundred grand a year. A government access control system. A cold email agent. All with Claude Code. But every time I go on YouTube, all I see is people buying 20 Mac Minis to run AI agents locally. Like, what are you doing with your life that you need 20 AI agents running in your closet? And then people building SaaS apps nobody asked for. Nobody uses. That's not building. That's entertainment. Here are 5 things I actually built that are running in production right now."

**Slide:** Title card or visual list of the 5 projects

### Use Case 1: DM Champ (0:45-2:30)
- Origin: "I built an AI sales agent called DM Champ"
- The evolution: GHL+Zapier -> FlutterFlow -> Cursor -> Claude Code
- Why Claude Code: "It rocketed development. New features just came out"
- Claude as the AI engine: More reliable than OpenAI, fewer hallucinations, better tool use
- Result: $100K/yr, businesses worldwide
- Slide: DM Champ website / dashboard

### Use Case 2: CI/CD Pipeline (2:30-4:30)
- "After DM Champ was running, I had a new problem: I was still doing all the dev work"
- The system: Bug comes in from 4 sources -> Router agent classifies -> specialized agents handle it
- The magic: "Bug comes in at 3am. By morning: triaged, fixed, PR opened, customer notified on WhatsApp"
- 7 agents, Pub/Sub, fully autonomous
- Result: "I automated myself out of development. I just do QA now."
- Slide: Pipeline flow diagram (simplified version of the architecture)

### Use Case 3: Cold Email Agent (4:30-5:45)
- "I needed to do outreach. But I hate sending the same template to everyone"
- What it does: Googles the company, finds relevant info, writes fully personalized email
- "Not template plus name swap. It actually researches you before writing."
- Slide: Side-by-side generic vs. personalized email

### Use Case 4: NFC Access Control (5:45-7:45) <-- MID-VIDEO CLIMAX
- "This one's different. This isn't a web app. This isn't a chatbot."
- Government access control system using NFC
- 90% built by Claude Code in 2 months
- "I delegated the last 10% to my offshore developers and Claude. I just did QA."
- 3 months total, government-level infrastructure
- "People think Claude Code is for building landing pages. I used it to build something the government uses."
- Slide: Generic NFC/access control visual (no specifics needed)

### Use Case 5: AEO System (7:45-9:00)
- "I built a system that checks if ChatGPT knows your business exists"
- Multiple agents query ChatGPT, Gemini, Google
- Produces an audit with exactly what to fix
- Built for a real client as a real service
- Slide: Audit output or before/after visualization

### Mid-Video CTA: Claudify (after Use Case 3, ~5:30)
- Quick, natural plug before the climax
- "If you want to go deeper on this stuff, I'm building a community called Claudify where we build real projects together. Link in the description."
- Don't break flow. 10 seconds max. Then straight into "Now this next one is different..."

### The Pattern (9:00-9:30)
- The thesis: Claude Code is the only tool you need.
- OpenAI is doing all kinds of stuff - images, video, search, agents, plugins. Google same thing. Scattered.
- Anthropic? They're just building a killer product. One thing, done right.
- "That's what I've learned from building all five of these. You don't need ten tools. You need one good one."

### Surprise 6th: Video Editing (9:30-9:45)
- "Oh, and one more thing."
- Brief mention that this video's production used Claude Code too
- Don't elaborate. Move on.

### End CTA (9:45-10:15)
- Tease next video: "Next week I'm going deeper on [Claude Code teams / best practices]"
- Subscribe + bell
- Note: Next video topic TBD - likely "Claude Code Teams" (highest trending query) or "Claude Code Best Practices"

---

## Mid-Video Climax

**Timestamp:** 5:45-7:45
**The reveal:** A GOVERNMENT access control system, 90% built by Claude Code in 2 months
**Why it's surprising:** Everyone expects Claude Code = web apps and chatbots. This is physical NFC infrastructure for government.
**Visual:** Generic access control / NFC visual

---

## Proof Elements

**Slides to prepare:**
- [ ] DM Champ website or dashboard screenshot
- [ ] CI/CD pipeline flow diagram (simplified from the full architecture)
- [ ] Cold email comparison slide (generic vs. personalized)
- [ ] NFC/access control generic visual
- [ ] AEO audit output or before/after
- [ ] Revenue number slide ($100K/yr)

---

## STATUS: BRIEF APPROVED - READY FOR SCRIPTING

**Confirmed:**
- [x] Hook approved
- [x] Pattern: "Claude Code is the only tool you need" (Anthropic focused vs. OpenAI/Google scattered)
- [x] Mid-video CTA: Claudify (after use case 3, before climax)
- [x] End CTA: Tease next video + subscribe
- [x] Revenue: Using $100K/yr (not pushed back on)
- [x] Cold email: Keep vague on metrics (no numbers shared)
- [x] Video editing: Brief mention only, don't elaborate
- [x] NFC: High-level only (government project, limited details)
