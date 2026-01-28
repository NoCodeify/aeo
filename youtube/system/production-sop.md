# AEO YouTube Production SOP

Standard Operating Procedure for producing weekly AEO content.

---

## Production Cadence

**1 video per week**
- Sunday: Plan + Brief
- Monday-Tuesday: Script + Assets
- Wednesday-Thursday: Film
- Friday: Edit
- Saturday: Review + Upload
- Sunday: Publish

---

## Weekly Workflow

### Sunday Evening (30 min): Planning

1. **Review work log** from the week
2. **Check content calendar** for next video topic
3. **Complete video brief template**
4. **Identify proof elements** needed
5. **Note any screen recordings** to capture

### Monday (2-3 hours): Scripting

1. **Run ideation skill** to generate 5+ title options
2. **GATE: Run title/thumbnail validation** (see checklist above - MANDATORY)
3. **Write script** using script-writer skill
4. **Run hook tournament** (6 -> 3 -> 1)
5. **Extract prompter text** (plain text version)
6. **Identify B-roll needs**
7. **Identify GIF moments**

### Tuesday (1-2 hours): Asset Preparation

1. **Run broll-prompter agent** on script
2. **Generate images** in Imagen
3. **Run gif-researcher agent** on script
4. **Source GIFs** from Giphy/Tenor
5. **Prepare screen recordings** (if needed)
6. **Complete shot list**

### Wednesday/Thursday (2-3 hours): Filming

1. **Set up equipment**
2. **Load prompter** with script
3. **Warm up** (practice hook 2-3 times)
4. **Record in sections:**
   - Hook (2-3 takes)
   - Setup
   - Point 1
   - Point 2
   - Point 3
   - Payoff
   - CTA
5. **Review takes** and mark best ones
6. **Backup files**

### Friday (3-4 hours): Editing

1. **Layer 1: Radio edit** (assemble audio)
2. **Layer 2: B-roll placement**
3. **Layer 3: GIF placement**
4. **Layer 4: Text overlays**
5. **Layer 5: Sound design** (optional)
6. **End screen setup**
7. **Export draft**

### Saturday (1 hour): Review + Upload

1. **Watch full video** on different devices
2. **Check audio levels**
3. **Verify all elements**
4. **Export final**
5. **Upload to YouTube** (schedule for Sunday)
6. **Write title, description, tags**
7. **Set thumbnail**
8. **Configure end screens**

### Sunday: Publish

1. **Video goes live**
2. **Share on socials** (if applicable)
3. **Start planning next video**

---

## Title & Thumbnail Validation (MANDATORY GATE)

No video gets filmed until the title/thumbnail passes this checklist. Video 2 got 0 clicks because this step was skipped.

### Title Kill List (If your title does any of these, reject it)

| Anti-Pattern | Example (BAD) | Why It Fails |
|--------------|----------------|--------------|
| Process-focused | "The 5-Step System I Use" | Viewers don't care about YOUR process |
| Jargon without context | "AEO Audit System" | They don't know what AEO means yet |
| "I use with every client" | "...I Use With Every Client" | Positions YOU, not THEIR problem |
| No number or specificity | "How to Optimize for AI" | Too vague, no curiosity gap |
| No emotional trigger | "My Complete Audit Framework" | No fear, curiosity, or urgency |
| Describes content | "5-Step Audit Walkthrough" | Tells them what it IS, not why to CARE |
| No positioning keyword | "The System That Changed Everything" | Must include ChatGPT/Gemini/AI |

### Title Must-Haves (ALL required)

- [ ] **Speaks to THEIR problem** (not your solution)
- [ ] **Contains ChatGPT, Gemini, or AI** (positioning keyword)
- [ ] **Creates a curiosity gap** (they need to click to resolve it)
- [ ] **Has specificity** (number, timeframe, or percentage)
- [ ] **Passes Ed's Q1:** Would a business owner understand every word?
- [ ] **Passes Ed's Q2:** Is it immediately obvious why this matters to them?
- [ ] **Passes Ed's Q3:** Does it match the problem they think they have?
- [ ] **The "scroll test":** Would YOU stop scrolling for this?

### Thumbnail Kill List

| Anti-Pattern | Example (BAD) | Why It Fails |
|--------------|----------------|--------------|
| Descriptive text | "5-STEP AUDIT" | Describes content, creates no emotion |
| Too many words | "AEO AUDIT SYSTEM" | Unreadable on mobile, no impact |
| No face/emotion | Just text on background | No human connection |
| Matches title exactly | Title: "5 Steps" / Thumb: "5 STEPS" | Redundant, wastes thumbnail real estate |
| No visual metaphor | Plain text on solid color | Nothing to decode or be curious about |

### Thumbnail Must-Haves (ALL required)

- [ ] **3 words MAX** (readable at mobile size)
- [ ] **Creates emotion** (shock, fear, curiosity - not description)
- [ ] **Your face with clear emotion** (surprised, concerned, excited)
- [ ] **Visual metaphor** (something to decode beyond the text)
- [ ] **Text ADDS to title** (doesn't repeat it)
- [ ] **High contrast** (readable in any feed context)
- [ ] **The "mute test":** Would the thumbnail alone make you curious?

### Validation Process

1. Write 3-5 title options (use ideation skill)
2. Run each through the kill list - reject any matches
3. Run survivors through must-haves checklist
4. Pick winner, then design thumbnail to COMPLEMENT (not repeat) title
5. Show to someone unfamiliar with AEO - do they want to click?

---

## Quality Standards

### Video Quality
- [ ] 1080p minimum
- [ ] Consistent lighting
- [ ] Clear audio (-3dB peaks)
- [ ] No background noise

### Content Quality
- [ ] Hook under 45 seconds
- [ ] Visual every 10-15 seconds
- [ ] GIF every 45-60 seconds max
- [ ] Clear framework with name
- [ ] Proof elements included
- [ ] CTA to next video (not external link)

### Pacing Quality
- [ ] No long pauses (>2 sec)
- [ ] No verbal filler
- [ ] Varied pace throughout
- [ ] Strong ending

---

## File Organization

```
youtube/
├── weekly-production/
│   └── 2026-w01-porsche-story/
│       ├── brief.md
│       ├── script.md
│       ├── prompter.txt
│       ├── shot-list.md
│       ├── editing-guide.md
│       ├── assets/
│       │   ├── broll/
│       │   ├── gifs/
│       │   └── screenshots/
│       ├── footage/
│       │   └── takes/
│       └── exports/
│           └── final.mp4
└── published-videos/
    └── 01-chatgpt-made-me-buy-porsche/
        ├── script.md
        ├── assets/
        └── final.mp4
```

---

## Tool Usage

### Skills (Auto-Invoked)
| Skill | When to Use |
|-------|-------------|
| youtube-script-writer | Writing scripts |
| youtube-video-ideation | Generating ideas |
| youtube-video-editor | Editing guidance |
| broll-prompting | Creating B-roll prompts |
| gif-search | Finding GIFs |

### Agents (Manual Invoke)
| Agent | When to Use |
|-------|-------------|
| broll-prompter | After script finalized |
| gif-researcher | After script finalized |

---

## CTA Strategy

**Every video points to another video**
- Never send to external links
- Build playlist sequences
- Keep viewers on platform
- End screens always configured

**Recommended CTA Flow:**
- Week 1 -> Week 2 (origin story -> system)
- Week 2 -> Week 3 (system -> case study)
- Week 3 -> Week 4 (case study -> contrarian)
- etc.

---

## Checklist Templates

### Pre-Production Checklist
- [ ] Video brief completed
- [ ] **Title validated (kill-list + must-haves)**
- [ ] **Thumbnail validated (kill-list + must-haves)**
- [ ] Script written
- [ ] Hook tournament done
- [ ] Prompter text extracted
- [ ] B-roll prompts generated
- [ ] GIF queries generated
- [ ] Shot list ready

### Production Checklist
- [ ] Equipment tested
- [ ] Environment prepared
- [ ] All sections recorded
- [ ] Best takes identified
- [ ] Files backed up

### Post-Production Checklist
- [ ] Radio edit complete
- [ ] B-roll placed
- [ ] GIFs placed
- [ ] Text overlays added
- [ ] End screens configured
- [ ] Final export done
- [ ] Uploaded and scheduled

---

## Troubleshooting

### Low Energy on Camera
- Take a break, do jumping jacks
- Practice hook out loud 5 times
- Remind yourself of the viewer's problem

### Script Not Flowing
- Read out loud
- Record yourself talking naturally about topic
- Cut unnecessary words

### Missing Proof Elements
- Use stories from inventory
- Reach out to clients for screenshots
- Create anonymized examples

### Technical Issues
- Always have backup battery/memory
- Test audio BEFORE recording
- Check lighting consistency

---

## Key Principles

1. **Scripts are non-negotiable** - Don't wing it
2. **Tension management** - Create and resolve throughout
3. **Visual support** - Every 10-15 seconds
4. **Cognitive load** - Don't overwhelm viewers
5. **Video-to-video CTA** - Keep them on platform
6. **Quality over perfection** - Good enough ships
