---
name: thumbnail
description: "Generate YouTube thumbnail prompts using minimal Apple aesthetic (black background, glossy icons, Porsche font) with validation. Use when user says 'thumbnail', 'YouTube thumbnail', 'generate thumbnail', or 'thumbnail prompts'. Do NOT use for title generation (/youtube-title) or video ideation (/youtube-video-ideation)."
context: fork
agent: thumbnail-prompter
---

# YouTube Thumbnail Generator

Generate thumbnail prompts with validation. Reads `youtube/system/thumbnail-validation.md` for rules.

## Validation Rules (Apply Before Generation)

### Title-Thumbnail Synergy
- Title = WHEN + WHY (acute moment + urgency)
- Thumbnail = WHAT + EMOTION (visual + feeling)
- **REINFORCE, never REPEAT.** If thumbnail re-explains the title visually, it fails.

### Text Rules
- **2-4 words maximum** (ideally 2-3)
- Must name EMOTION or MOMENT (not explain process)
- 5 patterns that work: emotion/moment, timing, contradiction, comparison, outcome
- Patterns that bomb: flowcharts, step icons, checklists, vague reassurance

### Visual Reinforcement (Pick ONE Primary)
1. Literal Object - Physical prop
2. Visual Metaphor - Graphic symbol
3. Expressive Gesture - Expression does heavy lifting
4. Familiar Symbol - Recognizable icon/logo

### Pre-Flight Checklist (Must Pass Before Generating)
- [ ] Text reinforces (not repeats) title
- [ ] 2-4 words maximum
- [ ] Names EMOTION or MOMENT
- [ ] Readable at mobile size
- [ ] ONE primary visual reinforcement type
- [ ] 3-5 elements MAX
- [ ] Glance test: identifiable in 2 seconds

### Options-First
Present 3+ thumbnail concepts with pre-flight scores. NEVER auto-select.

## Apple Aesthetic (Our Style)
- Background: Pure black (#000000)
- Icons: Glossy 3D iOS-style, each with own color glow
- Text: ALL CAPS, Porsche font, white-to-silver gradient
- No faces until 2-5K subs
- Reference: AntiGravity channel

Video/title: $ARGUMENTS
