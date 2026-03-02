---
name: youtube-video-ideation
description: "Full YouTube video packaging: title generation + thumbnail concept + hook selection. Orchestrates /youtube-title, thumbnail validation, and /youtube-hook into a complete packaging document. Use when user says 'video idea', 'video title', 'thumbnail concept', 'next video', or 'what video should I make'. Do NOT use for script planning (/youtube-script-plan), script writing (/youtube-script-writer), or editing (/youtube-video-editor)."
allowed-tools: Read;Glob;Grep;WebSearch
---

# YouTube Video Ideation (Packaging Orchestrator)

Generate a complete video packaging document: validated title + thumbnail concept + hook. Presents OPTIONS at every step - user picks the winner.

## Production Flow

```
/youtube-video-ideation [topic]
  Step 1: Title generation -> USER PICKS (via /youtube-title)
  Step 2: Thumbnail concept -> USER PICKS (options-first)
  Step 3: Hook generation -> USER PICKS (via /youtube-hook)
  Output: Locked packaging document
```

**No keyword research step.** The topic is already decided by the user. This is a feed-first channel - most views come from Browse and Suggested, not Search. Good packaging (title + thumbnail + hook) drives clicks, not keyword targeting.

---

## Step 1: Title Generation

**Invoke `/youtube-title` with the topic context.**

The title-validator agent will:
1. Identify acute moments relevant to the topic
2. Generate 5-7 title candidates using 16 proven patterns + 765 frameworks
3. Validate each against red/green flags
4. Run variety check
5. Present all options with scores

**User picks the winning title.**

### Title Requirements (Quick Reference)
- Under 65 characters
- Taps into an acute moment (not chronic pain)
- Has 3+ green flags, zero red flags
- Creates a curiosity gap explainable in one sentence

---

## Step 2: Thumbnail Concept

**After the title is locked, generate 3+ thumbnail concepts.**

### Title-Thumbnail Synergy Rule
| Title Provides | Thumbnail Provides |
|---------------|-------------------|
| WHEN + WHY (acute moment, urgency) | WHAT + EMOTION (visual, feeling) |

**Golden rule: REINFORCE, never REPEAT.** If thumbnail re-explains the title visually, it fails.

### Thumbnail Text (2-4 Words Max)

**5 Patterns That Work:**
1. **Name the emotion/moment** - "DON'T QUIT", "THE GAME HAS CHANGED"
2. **Emphasize timing** - "AFTER EVERY UPLOAD", "BEFORE/AFTER"
3. **Contradict expectations** - "NO TALENT", "POST BAD CONTENT"
4. **Simple comparison** - "VS", "BEFORE" and "AFTER"
5. **Direct outcome label** - "VIEWS 362K", "STEAL THIS"

**Patterns That Bomb:** Explaining process, vague reassurance, generic statements.

### Four Visual Reinforcement Types (Pick ONE Primary)
1. **Literal Object** - Physical prop representing outcome
2. **Visual Metaphor** - Graphic element symbolizing concept
3. **Expressive Gesture** - Expression does heavy lifting
4. **Familiar Symbol** - Recognizable icon/logo for instant context

### Apple Aesthetic (Our Style)
| Element | Specification |
|---------|---------------|
| Background | Pure black (#000000) |
| Icons | Glossy 3D iOS-style, each with own color glow |
| Text | ALL CAPS, Porsche font, white-to-silver gradient |
| Faces | No faces until 2-5K subs |
| Max elements | 3-5 total |

### Icon Color Palette
| Project | Color | Symbol |
|---------|-------|--------|
| AI Chat | Teal | Chat bubble |
| Code/CI-CD | Purple | Terminal cursor |
| Email | Blue | Envelope |
| NFC/Access | Gold | NFC waves |
| Search/AEO | Orange | Magnifying glass |
| Claude/AI | Coral-orange | Stylized "A" |
| SaaS/Business | Green | Dollar/chart icon |
| Distribution | Red-orange | Megaphone/funnel |

### Pre-Flight Checklist (Per Concept)
- [ ] Text reinforces (not repeats) title
- [ ] 2-4 words maximum
- [ ] Names EMOTION or MOMENT (not process)
- [ ] Readable at mobile size (160x90px)
- [ ] ONE primary visual reinforcement type
- [ ] 3-5 elements MAX
- [ ] Glance test: identifiable in 2 seconds

### Present 3+ Thumbnail Concepts
For each concept show:
- Text (2-4 words)
- Visual reinforcement type
- Layout (subject+text arrangement)
- Which text pattern it uses
- Pre-flight score (checkboxes passed)

**NEVER pick a winner.** Present options, user picks.

---

## Step 3: Hook Generation

**Invoke `/youtube-hook` with the locked title + thumbnail concept.**

The hook-generator agent will:
1. Determine video type
2. Generate 3 hook options (Safe / Experimental / Hybrid)
3. Run voice authenticity + efficiency checks
4. Present all 3 with template analysis

**User picks the winning hook.**

---

## Output: Locked Packaging Document

After all selections are made, produce this document:

```markdown
# VIDEO PACKAGING: [Title]

## TITLE (Locked)
**Title:** [exact title]
**Characters:** [count]
**Acute Moment:** [which one]
**Pattern:** [which title pattern]

## THUMBNAIL CONCEPT (Locked)
**Text:** [2-4 words]
**Visual Type:** [literal object / metaphor / gesture / symbol]
**Layout:** [arrangement]
**Style:** Pure black bg, glossy 3D icons, Porsche font, white-to-silver gradient

## HOOK (Locked)
**Template:** [F/A/B/C/D/E]
**Timing:** ~[X]s
**Full Text:**
[The complete hook text]

## NEXT STEP
Invoke `/youtube-script-plan` with this packaging document + brain dump + CTA inventory.
```

---

## Remember

1. **Options-first** - Present choices at every step, never auto-select
2. **Title = acute moment** - Must tap into something urgent, not chronic
3. **Thumbnail = emotion** - Reinforce, never repeat the title
4. **Hook = anticipation** - Set up script without spoiling it
5. **No keyword research** - Topic is already decided. Feed-first, not search-first.
6. **Sequence** - This skill feeds into `/youtube-script-plan` then `/youtube-script-writer`
