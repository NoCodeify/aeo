---
paths:
  - "youtube/**"
---

# YouTube Content Production

The `youtube/` folder contains the video production framework (Ed Lawrence method).

## Structure

```
youtube/
  templates/           # Production templates (brief, script, prompter, shot-list, editing-guide, work-log, brain-dump, thumbnail-style-guide)
  system/              # SOPs and reference docs
    title-frameworks.md           # 765 proven title frameworks
    title-validation-rules.md     # Acute moments, 16 patterns, red/green flags
    hook-templates.md             # 6 hook templates (F/A/B/C/D/E)
    script-planning-guide.md      # 4-exchange architecture process
    script-writing-rules.md       # Retention mechanics, Forward Pulls, WHY moments
    thumbnail-validation.md       # Reinforce-not-repeat, pre-flight checklist
    aeo-keyword-data.md           # Legacy AEO keywords (reference only)
  stories/inventory/   # 146+ story files
  weekly-production/   # Active video production
  published-videos/    # Completed archives
```

## Content Strategy (Feed-First)

No keyword research step. Topics come from the curriculum (8 modules) and standalone video ideas in the community plan (`saas-accelerator-community-plan.md`). Most views come from Browse and Suggested, not Search. Good packaging (title + thumbnail + hook) drives clicks, not keyword targeting.

Legacy keyword files (`claude-code-keyword-data.csv`, `aeo-keyword-data.md`) are from the old Claude Code channel and no longer drive content decisions.

## Production Pipeline (CORRECT ORDER)

### Pre-Production (New 5-Step Pipeline)
1. **Ideation + Packaging** via `/youtube-video-ideation` - title generation (5-7 options, user picks), thumbnail concept (3+ options, user picks), hook generation (3 options: Safe/Experimental/Hybrid, user picks). No keyword research - topic is already decided. Output: locked packaging document.
2. **Script Architecture** via `/youtube-script-plan` - 4-exchange process producing beat-level architecture with STP ratios, tension loops, Forward Pull map, creative elements. Output: locked architecture.
3. **Script Writing** via `/youtube-script-writer` - executes locked architecture with retention mechanics. **Script = full production blueprint** including:
   - Dialogue in `| Visual | What You Say |` tables with inline production markers
   - Layout directions (gradual_zoom, speaker_full, etc.)
   - Slide markers (SLIDE XX), screen recording markers (SCREEN XX)
   - B-roll moments (BROLL: Pexels search query)
   - GIF placements (GIF: search query, emotional beats only, speaker layouts only)
   - SFX cues (whoosh at chapters, shimmer at reveals, boop for punctuation)
   - Text overlay cues (key numbers/stats only)
   - Asset lists: screen recordings, slides, Pexels queries, GIF queries, SFX map, text overlays
   - Layout flow: second-by-second guidance for timeline builder
4. **Generate thumbnail** via `/thumbnail` skill (reads `youtube/system/thumbnail-validation.md` for validation)
5. **Extract prompter text** (plain text from script, no markdown/headings/dividers - just raw spoken words with blank lines between paragraphs)

### Post-Film
6. **Transcribe** the pre-cut footage (`transcribe.ts` - dual-pass AssemblyAI)
   - Videos are pre-cut before delivery (silences, fillers, mistakes already removed)
   - No rough cut or auto-cut step needed
7. **Clean transcript** - fix ASR mistakes in `transcript.json`
   - Brand names: "Cloud Code" → "Claude Code", "ReMotion" → "Remotion", "Data4SEO" → "DataForSEO"
   - Product names: "ImageGen" → "Imagen", "Volt" → "Bolt", "Rapid Agent" → "Replit Agent"
   - Terms: "Market SaaS" → "Micro SaaS" (context-dependent)
   - Read full `text` field, identify misheard words, fix in `words` array, rebuild `text` and `segments`
   - This matters because text overlays and captions pull directly from transcript words
8. **Build timeline** via `/video-timeline` on transcript
   - Timeline decides layouts: speaker_full, slide_full, split_5050, gif_overlay, broll_full, etc.
   - This step determines which slides are 16:9 (full-screen) vs 1:1 (50/50 layout)
   - Timeline MUST include `broll_full` entries for long speaker-only stretches (5s+)
9. **Generate slides** at correct aspect ratios based on timeline
    - Full-screen slides (`slide_full`): generate at **16:9**
    - 50/50 slides (`split_5050_left/right`): generate at **1:1**
    - Use `/excalidraw-slides` for whiteboard style (NOT `/broll-prompting`)
10. **Research GIFs** via `/gif-search` (can run parallel with step 9)
    - gif-researcher writes `gifs/manifest.json` mapping each GIF to its script quote and description
    - Manifest is how the timeline builder knows where to place each GIF
11. **Generate memes** via Imgflip MCP + Imagen MCP (can run parallel with steps 9-10)
    - **Imgflip** for famous templates (Drake, distracted boyfriend, this is fine, expanding brain, etc.) — recognition IS the joke. Use `boxes` param for 3+ text area templates.
    - **Imagen** for custom scenes with Impact font (no template exists), layout-based memes (starter pack, tier list), or multi-label memes. Describe exact meme format + art style in prompt. Do NOT prompt for vague "funny images" — always anchor to a recognizable format.
    - Caption with relevant text, download to `video/memes/` directory
    - **Write `memes/manifest.json`** mapping each meme to its script quote, template, and captions
    - Use as `slide_full` entries in timeline (not `broll_full`)
    - Every video MUST have at least 10-13 memes for visual variety
    - Memes replace generic Pexels B-roll (always relevant because captions match speech)
12. **Build new Remotion component** from the script's NEW COMPONENT candidate (section F of production blueprint)
    - Read the candidate spec from the script
    - Implement in `tools/video-editor-remotion/src/components/[ComponentName].tsx`
    - Register in `Root.tsx` timeline type system
    - Use `/remotion-best-practices` for animation patterns
    - Update timeline to reference the new component instead of the static slide it replaces
13. **Lint timeline** via `node lint-timeline.js` (from `tools/video-editor-remotion/`)
    - Catches: short speaker flashes (<2s), micro-gaps, text on GIFs/broll, overlapping layouts, text-speech misalignment
    - Use `--fix` to auto-resolve short speaker segments
    - Run BEFORE Studio preview to catch issues early
14. **Preview in Studio** before rendering
    - Copy assets to `public/`: speaker.mp4, slides/, gifs/, broll/, timeline.json
    - Generate speaker proxy: `ffmpeg -y -i public/speaker.mp4 -vf "scale=960:540" -c:v libx264 -preset fast -crf 28 -c:a aac -b:a 64k public/speaker-proxy.mp4`
    - Fix timeline paths: `broll/file.mp4` not `video/broll/file.mp4`
    - Check: overlays only on speaker layouts, SFX not too dense, zooms smooth
15. **Render** at 4K via `render.ts` (reads from `public/timeline.json`, auto-syncs back to source)

### Hook Pacing (First 60 Seconds) - CRITICAL

The first 60 seconds decide if viewers stay. This is the #1 thing timeline builders get wrong. Be BRUTAL.

| Time Range | Max Segment | Visual Change Every | Requirements |
|-----------|-------------|--------------------|-|
| **0-5s** | 2s | 1-2s | Text overlay in first 2s. Jump cut or slide within 3s. |
| **5-10s** | 3s | 2-3s | At least 1 slide/GIF/meme. At least 1 jump cut. |
| **10-20s** | 3s | 2-3s | Keep alternating layouts. No bare speaker_full. |
| **20-30s** | 4s | 3-4s | Slightly more room but still fast. |
| **30-60s** | 5s | 3-5s | Normal fast pacing. |

**Hard rules:**
- No bare speaker_full in first 20s (every speaker segment needs an overlay or be a zoom)
- First visual (slide/GIF/meme) within 3s
- Minimum 6 visual changes in first 10s
- Minimum 12 visual changes in first 20s
- Minimum 20 visual changes in first 30s
- Visual change every 1.5-3 seconds in first 10s, every 3-5 seconds from 10-30s
- If viewer survives first 60 seconds, they'll likely watch the rest

### GIF Rules
- **ALWAYS use `gif_full` (hard cut, full-screen)** - NEVER `gif_overlay`. Full-screen GIFs break up talking head far more effectively than tiny overlays in the corner. Hard cut in, hard cut out, no fades.
- **Target 15-20 GIFs per 10-min video** - GIFs are cheap visual variety. Split underlying speaker/gradual_zoom segments to insert them.

### Slide Density Rules
- **First slide within 5 seconds** - viewers need visual variety from the start, not just a talking head
- **Every key concept needs a slide** - target 15-20 Excalidraw slides per 10-min video
- **Generate slides AFTER timeline** (to know 16:9 vs 1:1), but plan for high density from the start
- **Slides replace talking head, not supplement it** - `slide_full` (full-screen) is the default, not split layouts

### B-Roll and GIF Content Rules
- **Males only** - all B-roll clips and GIFs featuring people must show males. Reject and re-search if they feature females.

### New Remotion Component Per Video

Every video must ship one new Remotion animation component to grow the library over time. Current library: `tools/video-editor-remotion/src/components/` (54+ components).

**Flow:**
1. **Script writer flags the candidate** - identifies the best visual moment that would be more impactful animated than as a static slide (output in section F of the production blueprint)
2. **Build during post-production** - after timeline, before render. Use `/remotion-best-practices` for implementation patterns
3. **Component must be generic** - designed for this video's content but reusable. Accepts props for text, colors, counts, etc.
4. **Register in Root.tsx** - add to the timeline type system so future timelines can reference it
5. **Wire into the timeline** - replace the static slide it was designed for

**Good components:** Animate data (cost stackers, grids, math reveals), visualize processes (flowcharts, before/after flips), or create reusable effects (countdown timers, progress reveals).

**Bad components:** One-off visuals that only make sense for this specific video with hardcoded content.

### Chapter Strategy (YouTube Description Timestamps)

Chapters create entry points for scrub-arrivals. Every chapter marker is a second chance at a first impression.

**In the script (handled by script-architect + script-writer):**
- Each block has a **chapter title** (curiosity-gap, not label) and a **re-hook opening** (standalone mini-hook for cold arrivals)
- Script outputs a **CHAPTER MAP** section ready to paste into the YouTube description

**In post-production (timeline + editing):**
- **Visual reset at every chapter boundary** - new slide, layout change, or SFX: whoosh. The scrub-arrival needs a visual signal that something new is starting
- **No soft transitions at chapter starts** - hard cuts, not fades. The viewer just scrubbed here, they need energy not ambience
- **Chapter titles in description** - paste the CHAPTER MAP from the script. Adjust timestamps after final edit. Format: `0:00 Title` (one per line)

**Chapter title rules:**
- Curiosity gaps, NOT labels ("Why This Costs You Months" not "The Problem")
- First chapter (0:00) must hook cold arrivals, not say "Intro"
- Titles should make sense standalone (someone browsing chapters decides based on title alone)
- 6-8 chapters max for a 10-min video

### Common Mistakes
- **ALWAYS use `transcribe.ts` for transcription** - NEVER call AssemblyAI manually via curl/API. The script does dual-pass (Universal-3-Pro + Universal-2 filler detection), proper audio extraction, and outputs the correct JSON format. Run from `tools/video-editor-remotion/`: `npx ts-node transcribe.ts <video_dir>`
- **ALWAYS use dedicated skills/agents for pipeline steps** - don't manually do what a skill is built for. `/video-timeline` for timelines, `/excalidraw-slides` for slides, `/gif-search` for GIFs, `transcribe.ts` for transcription
- **Videos are pre-cut** - no rough cut or auto-cut step. Speaker video arrives ready to transcribe and edit
- **DON'T generate slides before timeline** - you won't know which are 16:9 vs 1:1
- **DON'T use `/broll-prompting` for slides** - that's for premium dark-bg graphics. Use `/excalidraw-slides` for hand-drawn whiteboard style
- **DO run timeline before any visual generation** - timeline is the source of truth for what goes where
- **DON'T use generic Pexels B-roll** - replaced by captioned memes via Imgflip MCP. Memes are always relevant (captions match speech), more engaging than "man at desk" stock footage, and render as `slide_full` (no fade-in bleed-through issues). Every video needs 10-13 memes for speaker-only stretches over 5s
- **DON'T skip `split_5050` layouts** - every video needs 2-4 split_5050 entries for variety. Best for: big reveals, result moments, storytelling with equal speaker+visual weight. These require 1:1 slides (regenerate from 16:9 originals)
- **DON'T use gif_overlay** - ALWAYS use gif_full (hard cut, full-screen). Overlays are too small and don't break up talking head. Split the underlying speaker segment to make room for gif_full.
- **DON'T have too few slides** - W12 originally had 2 slides for a 10-min video. Rebuilt to 20. Every key concept, stat, comparison, process, or framework needs its own Excalidraw slide. First slide must appear within 5 seconds.
- **DON'T add SFX to every layout transition** - no clicks on routine transitions, whoosh only at chapter breaks, min 10s gap between SFX. Target 10-15 SFX per 10-min video
- **DON'T forget to fix timeline paths for Studio** - `broll/` not `video/broll/`, `gifs/` not `video/gifs/`
- **DO preview in Studio before rendering** - catches zoom resets, misplaced overlays, SFX density issues. Much faster than re-rendering 4K
- **DON'T place CTA overlay without checking transcript** - grep transcript-clean.json for the actual speech timestamp of the CTA mention. CTA overlay must sync to when the speaker says it, not where you estimate it
- **DON'T leave micro-gaps (<1s) between segments** - a 0.5s speaker_full before a counter_ticker creates a distracting flash. Extend the next segment to fill gaps, or remove the gap segment entirely
- **DON'T add overlays with <1s display time** - gif_overlays or text_overlays that only show for a fraction of a second before the next segment takes over are invisible flashes. Remove them
- **DO check z-order of overlapping overlays** - timeline array order = render z-order. Text overlays should come AFTER gif_overlays in the array so text renders on top
- **DO run `node lint-timeline.js` after every timeline edit** - catches short speaker flashes, micro-gaps, text on non-speaker layouts, overlapping layouts. Use `--fix` to auto-resolve. W12 had 14 short speaker flashes + 9 misplaced text overlays invisible to manual scrubbing
- **DON'T leave short speaker segments (<2s) between visual layouts** - creates a brief flash of talking head that's jarring. Extend the adjacent visual to cover the gap
- **DON'T put text overlays on slides, GIFs, broll, splits, or chapter cards** - text overlays are ONLY for speaker layouts (speaker_full, gradual_zoom, jump_cut_in). The slide/visual already conveys the information. Redundant text on slides is visual clutter
- **DON'T start the timeline with a slide/gif/broll** - first segment must be speaker + animation (gradual_zoom recommended). Viewers need to see who's talking immediately. Slide can come at 1-2s, not 0s

## Script Length Guide

**Measured speaking pace: ~217 WPM** (after cuts). Use this for future scripts:

| Target Length | Script Words |
|---------------|-------------|
| 8 min | ~1,750 |
| 10 min | ~2,170 |
| 12 min | ~2,600 |
| 15 min | ~3,250 |

Videos are pre-cut before delivery - no auto-cut step needed.

## Key Principles (Feed-First Strategy)

Most views come from Browse (home feed) and Suggested, not Search. Title + thumbnail create curiosity in the feed. Hook justifies the click. Tension mechanics keep them watching.

- **Curiosity-first titles** - Create a gap the viewer needs to close. No keyword stuffing.
- **Hook justifies the click** - Pain-first order: viewer's experience (0-5s), packaging payoff (5-10s), credibility (10-15s), anticipation (15-18s), roadmap (18-22s). First word is "You", never "So I" or "I built." Block 1 must NOT repeat what the hook already established.
- **NEVER satisfy curiosity early** - Giving the answer releases tension. Viewers get what they wanted and leave. Withhold payoff until the block's end (STPR: Setup 25-35%, Tension 35-45%, Payoff 10-15%, Retention 5-10%). Every block ends by closing one loop and opening the next.
- **Re-tension after every payoff** - Every WHY moment (answer/insight) must be followed by new tension within 1-2 sentences. No answer without a new question. (Magnet analogy: place the next magnet before they reach the current one.)
- **Forward Pulls every 30-60s** - Tell them what's coming and why they should care. Level 3+ only (specific preview, curiosity gap, or implied stakes). Never generic ("Next, I'll show you...").
- **Stakes-based structure** - Order by urgency, not logic
- **Mid-video climax** - Big moment at 7-9 minutes
- **Show, don't explain** - Delete 40% of explanations
- **1+1=3 rule** - Title and thumbnail COMPLEMENT, don't repeat
- **Video-to-video CTA** - No external links, point to next video

## Title & Thumbnail Rules

**The 1+1=3 Rule:** Title = curiosity gap. Thumbnail = emotional reaction (NOT repeating title words).

**Thumbnail Workflow:**
1. Pick 2-3 thumbnail types to combine (big numbers, shock, simple, comparison, etc.)
2. Write text (ALL CAPS, 3-5 words, Porsche font)
3. Generate with Imagen - glossy 3D icons on pure black
4. Test on thumbsup.tv at mobile size before publishing

**Thumbnail Types (combine 2-3):** Big Numbers, Shock/Curiosity, Simple/Minimal, Social Hacking, Header Text, Comparison, Blur/Mystery, Weird Object, Branded

**Thumbnail Style (Minimal Apple Aesthetic):**
- Background: Pure black (#000000), no gradients, no navy
- Icons: Glossy 3D iOS-style app icons, each glowing its own color
- Text: ALL CAPS, Porsche font, smooth white-to-silver gradient (not abrupt)
- No faces (revisit at 2-5K subs), no cinematic grading, no heavy text effects
- Reference: AntiGravity channel thumbnails
- Full specs: `youtube/templates/thumbnail-style-guide.md`

## Origin Story (AEO - legacy)

> "I was on my second BMW. Going to buy another one. Asked ChatGPT for advice. It convinced me to buy a Porsche Boxster instead. If AI can change MY buying decision, what's it doing to my clients' businesses?"

## CTA Strategy (Post-Pivot)

- **YouTube** = awareness (show what's possible building SaaS)
- **SaaS Accelerator** = execution (build and launch your SaaS to first paying customer, $47/mo Skool)
- **Mid-video CTA**: `cta_overlay` with text "Join SaaS Accelerator", style "offer"
- **End CTA**: `cta_overlay` with text "SaaS Accelerator", style "next_video"
- **NEVER use "Claudify"** - old branding, superseded
