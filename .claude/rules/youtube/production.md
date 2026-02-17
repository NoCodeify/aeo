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
  system/              # SOPs and topic bank
    production-sop.md
    aeo-video-topics.md
    aeo-keyword-data.md  # KEYWORD SOURCE OF TRUTH
  stories/inventory/   # 146+ story files
  weekly-production/   # Active video production
  published-videos/    # Completed archives
```

## Keyword Data (Source of Truth)

**Claude Code keywords (primary):** `youtube/system/claude-code-keyword-data.csv`
**AEO keywords (legacy):** `youtube/system/aeo-keyword-data.md`

Channel pivoted to Claude Code content (Feb 2026). All new content decisions use Claude Code keyword data.

**Key Terms (Feb 2026):**

| Keyword | Volume | Growth |
|---------|--------|--------|
| claude code | 500K | +99,900% |
| vibe coding | 500K | +999,900% |
| mcp servers | 500K | +9,900% |
| ai agents | 500K | stable |
| ai app builder | 50K | +900% |

**Hottest Rising YouTube Queries:**

| Query | YouTube Growth |
|-------|---------------|
| claude code teams | +73,500% |
| claude code use cases | +65,150% |
| agent teams claude code | +55,700% |
| claude code masterclass | +30,750% |
| claude code best practices | +30,450% |

## Production Pipeline (CORRECT ORDER)

### Pre-Production
1. **Select keyword** from `youtube/system/claude-code-keyword-data.csv`
2. **Create brief** using `youtube/templates/video-brief-template.md`
3. **Write script** via `/youtube-script-writer` skill
4. **Generate thumbnail** via `/thumbnail` skill
5. **Extract prompter text** (plain text from script, no tables/slide refs)

### Post-Film
6. **Transcribe** raw footage (`transcribe.ts` - dual-pass AssemblyAI)
7. **Rough cut** speaker video manually in a video editor (DaVinci Resolve, CapCut, etc.)
   - Remove silences, fillers, false starts, repeated phrases, mistakes
   - Export as `speaker-clean.mp4` to `<video_dir>/video/`
   - This is faster and more reliable than automated cutting - you catch everything by ear
   - Optional: run `/auto-cutter` first to generate `cuts.json` as a reference for where issues are
8. **Re-transcribe** the clean video (`transcribe.ts --clean` → `transcript-clean.json`)
9. **Build timeline** via `/video-timeline` on clean transcript
   - Timeline decides layouts: speaker_full, slide_full, split_5050, gif_overlay, broll_full, etc.
   - This step determines which slides are 16:9 (full-screen) vs 1:1 (50/50 layout)
   - Timeline MUST include `broll_full` entries for long speaker-only stretches (5s+)
10. **Generate slides** at correct aspect ratios based on timeline
    - Full-screen slides (`slide_full`): generate at **16:9**
    - 50/50 slides (`split_5050_left/right`): generate at **1:1**
    - Use `/excalidraw-slides` for whiteboard style (NOT `/broll-prompting`)
11. **Research GIFs** via `/gif-search` (can run parallel with step 10)
12. **Source B-roll** via Pexels MCP (can run parallel with steps 10-11)
    - Search for stock video matching long speaker-only segments
    - Download to `video/broll/` directory
    - Every video MUST have at least 3-5 B-roll clips for visual variety
13. **Preview in Studio** before rendering
    - Copy assets to `public/`: speaker.mp4, slides/, gifs/, broll/, timeline.json
    - Generate speaker proxy: `ffmpeg -y -i public/speaker.mp4 -vf "scale=960:540" -c:v libx264 -preset fast -crf 28 -c:a aac -b:a 64k public/speaker-proxy.mp4`
    - Fix timeline paths: `broll/file.mp4` not `video/broll/file.mp4`
    - Check: overlays only on speaker layouts, SFX not too dense, zooms smooth
14. **Render** at 4K via `render.ts` (reads from `public/timeline.json`, auto-syncs back to source)

### Common Mistakes
- **DON'T skip the manual rough cut** - automated cutting misses repeated phrases, partial word bleeds, and splice artifacts. Manual editing with ears is faster and catches everything
- **DON'T forget to re-transcribe** after manual cut - `transcript-clean.json` must match `speaker-clean.mp4` timestamps. Run `transcribe.ts --clean`
- **DON'T generate slides before timeline** - you won't know which are 16:9 vs 1:1
- **DON'T use `/broll-prompting` for slides** - that's for premium dark-bg graphics. Use `/excalidraw-slides` for hand-drawn whiteboard style
- **DO run timeline before any visual generation** - timeline is the source of truth for what goes where
- **DON'T skip Pexels B-roll** - every video needs stock footage to break up long speaker stretches. Speaker-only segments over 5s should have B-roll inserted (pattern: speaker 2-3s -> broll_full 5-7s -> speaker 1-2s)
- **DON'T skip `split_5050` layouts** - every video needs 2-4 split_5050 entries for variety. Best for: big reveals, result moments, storytelling with equal speaker+visual weight. These require 1:1 slides (regenerate from 16:9 originals)
- **DON'T put gif_overlay on split/slide layouts** - GIF memes only on speaker_full, gradual_zoom, or jump segments
- **DON'T add SFX to every layout transition** - no clicks on routine transitions, whoosh only at chapter breaks, min 10s gap between SFX. Target 10-15 SFX per 10-min video
- **DON'T forget to fix timeline paths for Studio** - `broll/` not `video/broll/`, `gifs/` not `video/gifs/`
- **DO preview in Studio before rendering** - catches zoom resets, misplaced overlays, SFX density issues. Much faster than re-rendering 4K
- **DON'T place CTA overlay without checking transcript** - grep transcript-clean.json for the actual speech timestamp of the CTA mention. CTA overlay must sync to when the speaker says it, not where you estimate it
- **DON'T leave micro-gaps (<1s) between segments** - a 0.5s speaker_full before a counter_ticker creates a distracting flash. Extend the next segment to fill gaps, or remove the gap segment entirely
- **DON'T add overlays with <1s display time** - gif_overlays or text_overlays that only show for a fraction of a second before the next segment takes over are invisible flashes. Remove them
- **DO check z-order of overlapping overlays** - timeline array order = render z-order. Text overlays should come AFTER gif_overlays in the array so text renders on top

## Script Length Guide

**Measured speaking pace: ~217 WPM** (after cuts). Use this for future scripts:

| Target Length | Script Words |
|---------------|-------------|
| 8 min | ~1,750 |
| 10 min | ~2,170 |
| 12 min | ~2,600 |
| 15 min | ~3,250 |

Raw footage runs ~20% longer before auto-cut removes silences/fillers/false starts.

## Key Principles (Search-First Strategy)

- **Keyword first** - Select from aeo-keyword-data.md BEFORE writing
- **Search-optimized titles** - Keyword in first 5 words
- **Answer query in 30 seconds** - Satisfy search intent immediately
- **Stakes-based structure** - Order by urgency, not logic
- **Mid-video climax** - Big moment at 7-9 minutes
- **Show, don't explain** - Delete 40% of explanations
- **1+1=3 rule** - Title and thumbnail COMPLEMENT, don't repeat
- **Video-to-video CTA** - No external links, point to next video

## Title & Thumbnail Rules

**Search-First Titles:** Target keywords people actually search for.

| Target Keyword | Search-Optimized Title |
|----------------|----------------------|
| claude code use cases | "Claude Code Use Cases: 5 Things I Actually Built" |
| claude code teams | TBD (video 2) |
| claude code best practices | TBD (video 3) |

**The 1+1=3 Rule:** Title = search keyword. Thumbnail = emotional reaction (NOT repeating title words).

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

- **YouTube** = awareness (show what's possible with Claude Code)
- **Claudify** = execution (build real projects together)
- **Mid-video CTA**: Brief Claudify mention ("link in description")
- **End CTA**: Fuller Claudify pitch or tease next video
