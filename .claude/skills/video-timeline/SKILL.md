---
name: video-timeline
description: Generate and validate timeline.json using a builder + validator team. Use when user says "build timeline", "generate timeline", "timeline.json", or "video timeline".
---

# Video Timeline Pipeline

Generate and validate timeline.json using a builder + validator team. The builder generates the timeline, the validator enforces quality gates. Max 3 validation rounds.

## Team Structure

Create an agent team called "timeline-edit" with these teammates:

### builder (general-purpose agent)
**Role:** Generate timeline.json from script + transcript + assets.
**Skills to preload:** Load the timeline-builder agent instructions.
**MCP servers needed:** giphy, imgflip (NOT pexels - we use memes instead of B-roll)
**Tasks:**
1. Read the prompter/script file (or READ each slide image if no prompter exists)
2. Read the transcript (transcript-clean.json > transcript.json > SRT)
3. List available slides, GIFs, and memes in the video directory
4. **Read asset manifests** (`gifs/manifest.json` and `memes/manifest.json`) - these tell you what each GIF/meme is for and which speech moment it matches. If manifests are missing, flag as pipeline error.
5. If GIFs are missing or below density minimum, search and download via Giphy MCP, then write manifest
6. If memes are missing or below density minimum, search templates and caption via Imgflip MCP (NEVER use Pexels), then write manifest
7. Calculate minimum slide count from video duration (1 per 18s) - do NOT rely on script SLIDE markers
8. Match slides to speech moments using content understanding
9. **Place GIFs/memes using manifest `script_quote`** - grep transcript for each quote to find exact timestamp. NEVER guess from filenames. NEVER use same asset twice.
10. Generate creative edit decisions with ~20% distribution per layout type
11. Write timeline.json to the video directory
12. **Run lint**: `node tools/video-editor-remotion/lint-timeline.js --fix` to auto-fix short segments
13. Mark task complete and notify the lead

### validator (general-purpose agent)
**Role:** Validate timeline.json against 26 quality checks.
**Skills to preload:** Load the timeline-validator agent instructions.
**Model preference:** haiku (cheap and fast - just counting and checking rules)
**Tasks (run AFTER builder completes):**
1. Read timeline.json from the video directory
2. Read transcript-clean.json (or transcript.json)
3. List files in slides/, gifs/, memes/ directories
4. Run all 26 quality checks (structural, density, speech alignment)
5. Output PASS or FAIL verdict with specific fix instructions

## Workflow

1. Create team "timeline-edit"
2. Create task "Build timeline" and assign to builder
3. Builder generates timeline.json, runs lint --fix, marks task complete
4. Create task "Validate timeline" and assign to validator
5. Validator reads timeline.json + transcript, runs 26 checks
6. **If PASS:** clean up team, report success
7. **If FAIL:** create task "Fix timeline" for builder with the validator's specific feedback
8. Builder applies targeted fixes, runs lint --fix again, marks task complete
9. Create task "Re-validate timeline" for validator
10. **Max 3 rounds** (build + validate). If still failing after 3, report remaining issues to user.

## Key Rules (W14 Lessons Learned)

- **Asset manifests are REQUIRED** - `gifs/manifest.json` and `memes/manifest.json` map each file to its script quote, description, and intended placement. Builder MUST read these before placing any GIF or meme. Never guess from filenames.
- **Place assets by script quote** - Grep transcript for each manifest entry's `script_quote` to find the exact timestamp. This prevents contextual mismatches (e.g., "crushed" GIF placed at "eaten alive" moment).
- **Never reuse assets** - Each GIF and meme file appears exactly once in the timeline. No duplicates.
- **NO Pexels B-roll** - Use Imgflip memes as `slide_full` instead. Generic stock footage is never relevant.
- **Slide count from duration** - Calculate `floor(duration_seconds / 18)` minimum. Script SLIDE markers are always too few.
- **No text overlays in first 30s** - Use slides/GIFs/memes for hook pattern interrupts. Text overlays are weak.
- **CTA = "SaaS Accelerator"** - Never "Claudify", "Watch Next", or any stale branding.
- **Boop volume = 0.2** - Not 0.4 (too loud).
- **zoom_transition_in/out DEPRECATED** - Hard cuts between layouts are cleaner.
- **Run lint-timeline.js after EVERY build/fix** - Don't wait for the user to ask.
- **Don't stack text_overlay with newspaper_flash/callout** - Text flickers for a split second then gets covered.

## Input

Provide the video project directory:

$ARGUMENTS
