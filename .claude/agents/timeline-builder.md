---
name: timeline-builder
description: "Generate timeline.json for the Remotion video editor from a script/prompter file. Maps slides, zooms, GIFs, text overlays, and transitions to word-level timestamps."
model: inherit
tools: Read, Grep, Glob, Write, Bash
---

# Timeline Builder Agent

Generate timeline.json for the Remotion video editor from a script/prompter file.

## Purpose

Read a video script or prompter with slide markers and generate a complete `timeline.json` that can be rendered by the Remotion video editor (`tools/video-editor-remotion/`).

## Input Required

1. **Prompter file** with `[SLIDE XX: name]` markers (if available)
2. **transcript-clean.json** with word-level timestamps (PRIMARY - from auto-cutter)
3. **transcript.json** (fallback if no auto-cut was run)
4. **SRT subtitle file** with timestamps (fallback if no transcript.json)
5. **Slides directory** with slide images (slide-01.jpg, slide-02.jpg, etc.)
6. **Speaker video** - `speaker-clean.mp4` if auto-cut was run, otherwise original
7. **GIFs directory** (optional) with downloaded GIFs from gif-researcher agent
8. **B-roll directory** (optional) with stock video clips from pexels-mcp

**Priority:** transcript-clean.json > transcript.json > SRT file

### Slide Content Discovery (CRITICAL)

**If a prompter file exists:** Cross-reference `[SLIDE XX]` markers with transcript words to map slides to speech moments.

**If NO prompter file exists:** You MUST READ each slide image using the Read tool before building the timeline. Claude is multimodal - reading a .jpg/.png shows you the image content. For each slide, note what it shows (topic, key text, diagram type) so you can match it to the correct spoken moment in the transcript. Never guess slide placement from filenames alone - filenames like `slide-01.jpg` tell you nothing about content.

### Generating transcript.json

Run from `tools/video-editor-remotion/`:
```bash
OPENAI_API_KEY=sk-... npx ts-node transcribe.ts <video_dir>
```
This extracts audio, sends to Whisper API, outputs `<video_dir>/video/transcript.json` with per-word timestamps.

## Output

A `timeline.json` file with edit decisions:

```json
[
  {"type": "speaker_full", "start": 0, "end": 3.0},
  {"type": "gradual_zoom", "start": 3.0, "end": 8.0, "zoomStart": 1.0, "zoomEnd": 1.1},
  {"type": "split_right", "start": 8.0, "end": 25.0, "content": "slides/slide-01.jpg"},
  {"type": "jump_zoom_in", "start": 25.0, "end": 25.4, "zoom": 1.20},
  {"type": "jump_cut_in", "start": 25.4, "end": 28.0, "zoom": 1.20},
  {"type": "jump_zoom_out", "start": 28.0, "end": 28.4, "zoom": 1.20}
]
```

## Available Layouts

### Core Layouts

| Layout | Description | When to Use |
|--------|-------------|-------------|
| `speaker_full` | Speaker fills frame | Intro, personal stories, transitions |
| `slide_full` | Slide fills frame | Teaching, CTA slides, complex diagrams |
| `split_right` | Slide left ~76%, speaker right ~24% | Teaching with speaker visible |
| `split_left` | Speaker left ~24%, slide right ~76% | Teaching (variety) |
| `split_5050_left` | Speaker left 50%, slide right 50% (full-bleed, no borders) | Equal emphasis, 1:1 slides |
| `split_5050_right` | Slide left 50%, speaker right 50% (full-bleed, no borders) | Equal emphasis, 1:1 slides |
| `jump_zoom_in` | Animated zoom punch (15-25%) | Key reveals, powerful statements |
| `jump_cut_in` | Instant zoom (no animation) | HOLD after jump_zoom_in |
| `jump_zoom_out` | Animated zoom back | After hold period |
| `jump_cut_out` | Instant back to normal | Hard cut reset |
| `zoom_transition_in` | Slide -> Speaker with zoom | Smooth transition to speaker |
| `zoom_transition_out` | Speaker -> Slide with zoom | Smooth transition to slide |
| `gradual_zoom` | Slow drift zoom (10-15%) | Speaker segments, 4-10s |
| `gif_overlay` | GIF on top of speaker video | Reaction GIFs, humor beats (1-3s) |
| `gif_full` | GIF fills frame (speaker audio continues) | Big meme moments (2-4s) |
| `text_overlay` | Text on top of speaker video | Key words, statistics, framework names (1-3 words) |
| `broll_full` | Stock video B-roll fills frame (no loop, speaker audio continues) | Visual metaphors, establishing shots, supporting claims (3-15s) |
| `sfx` | Sound effect overlay (audio-only, no visual) | Subtle boop/click on reveals, transitions (max 4-6 per video) |

### Speaker Overlays (on top of speaker video)

| Layout | Description | When to Use | Duration |
|--------|-------------|-------------|----------|
| `newspaper_flash` | Stacked newspaper clippings with keyword highlighted | Breaking news moments, trend emphasis | 2-4s |
| `lower_third` | Name/title bar overlay | Speaker introduction (once per video, early) | 3-5s |
| `counter_ticker` | Animated counting number (e.g. $0 → $100K) | Statistics, revenue numbers, growth metrics | 2-4s |
| `social_proof_flash` | Stacked tweet/post cards with keyword highlighted | Social proof, community buzz, testimonials | 2-4s |
| `callout` | Arrow + text label pointing to something | Drawing attention to specific detail on screen | 2-4s |
| `check_x_mark` | Green check or red X SVG overlay | Confirming/denying a claim, yes/no moments | 1-2s |
| `circle_timer` | Countdown circle draining over segment | Urgency, time-limited offers, countdowns | 3-5s |
| `text_reveal_wipe` | Clip-path text reveal (left/right/top/bottom wipe) | Dramatic text reveals, framework names | 1-2s |
| `confetti_burst` | Colorful particle explosion overlay | Celebration moments, milestones, wins | 2-3s |
| `screen_shake` | Camera shake transform (impact/earthquake/subtle) | Emphasis on shocking statements, impact moments | 0.5-1s |

### Speaker Effects (brief transforms)

| Layout | Description | When to Use | Duration |
|--------|-------------|-------------|----------|
| `glitch` | Digital distortion effect | Pattern interrupt, topic shift, error/mistake moment | 3-5 frames |
| `freeze_frame` | Hold speaker with desaturation + optional text | "Wait what?" moments, record scratch | 1-2s |
| `light_leak` | Cinematic light leak overlay | Transition sweetener, mood shift | 1-2s |
| `kinetic_type` | Words appear one at a time (big, bold) | Key phrases, memorable quotes | 3-6s |

### Full-Screen Data Viz (dark bg, optional 50/50 split)

Use these when you need to SHOW data, not just talk about it. By default, speaker video is replaced with animated graphics on a dark background.

All data viz types support an optional `layout` property:
- `"full"` (default) - Full-screen dark background, speaker audio hidden
- `"split_left"` - Speaker on left, data viz on right (50/50)
- `"split_right"` - Speaker on right, data viz on left (50/50)

Use split layout for simpler visualizations (bullet lists, stat cards, quotes) where maintaining speaker presence adds value. Use full-screen for complex visuals (flow diagrams, treasure maps, detailed charts) that need the space.

| Layout | Description | When to Use | Duration |
|--------|-------------|-------------|----------|
| `comparison_table` | Two-column side-by-side | Comparing two approaches (SEO vs AEO, before/after) | 4-6s |
| `quote_card` | Stylized quote with attribution | Expert quotes, research citations, testimonials | 3-5s |
| `progress_bars` | Horizontal stat bars with animated fill | Scoring, ratings, benchmark comparisons | 3-5s |
| `typewriter_text` | Monospace text typing out character by character | Key statements, code snippets, definitions | 3-6s |
| `bar_chart` | Vertical bars with spring animation | Revenue by channel, category comparisons | 4-6s |
| `line_chart` | SVG line drawing left-to-right with dots | Growth over time, trend data | 4-6s |
| `bullet_list` | Animated checklist items staggering in | Feature lists, what-you-get, action items | 4-6s |
| `stat_cards` | Grid of metric cards (value + label + trend) | KPI dashboards, multiple stats at once (2-4 cards) | 3-5s |
| `pie_chart` | Animated pie/donut segments with legend | Revenue breakdown, market share, distribution | 4-6s |
| `flow_diagram` | Linear node flow (A → B → C → D) | Process steps, workflows, methodologies | 4-6s |
| `treasure_map` | Winding dashed path with X marks the spot | Roadmaps, journey visualization, step sequences | 4-6s |

### Data Viz JSON Examples

```json
{"type": "bar_chart", "start": 63.0, "end": 68.0, "title": "Revenue by Channel", "bars": [{"label": "YouTube", "value": 4200, "color": "#e63946"}, {"label": "LinkedIn", "value": 8500, "color": "#457b9d"}]}

{"type": "pie_chart", "start": 83.0, "end": 88.0, "title": "Revenue Breakdown", "segments": [{"label": "Consulting", "value": 45, "color": "#e63946"}, {"label": "Community", "value": 30, "color": "#457b9d"}]}

{"type": "bullet_list", "start": 73.0, "end": 78.0, "title": "What You Get", "items": ["Weekly live calls", "Custom agents", "Community access"], "icon": "check", "color": "#22c55e"}

{"type": "stat_cards", "start": 78.0, "end": 83.0, "cards": [{"value": "$10.2K", "label": "Monthly Revenue", "trend": "up", "trendValue": "+23%", "color": "#22c55e"}, {"value": "439", "label": "Paid Members"}]}

{"type": "flow_diagram", "start": 88.0, "end": 93.0, "nodes": [{"label": "Audit"}, {"label": "Playbook"}, {"label": "Execute"}], "accentColor": "#e63946", "direction": "horizontal"}

{"type": "treasure_map", "start": 93.0, "end": 98.0, "title": "THE ROADMAP", "nodes": [{"label": "Step 1", "description": "Start here"}, {"label": "Goal!", "description": "X marks the spot"}], "accentColor": "#e63946"}

{"type": "bullet_list", "start": 73.0, "end": 78.0, "layout": "split_right", "title": "What You Get", "items": ["Weekly live calls", "Custom agents"], "icon": "check", "color": "#22c55e"}

{"type": "stat_cards", "start": 78.0, "end": 83.0, "layout": "split_left", "cards": [{"value": "$10.2K", "label": "Revenue", "trend": "up", "trendValue": "+23%"}]}

{"type": "comparison_table", "start": 59.0, "end": 65.0, "leftLabel": "Old Way", "rightLabel": "New Way", "rows": [{"left": "Slow", "right": "Fast", "rightWins": true}]}

{"type": "counter_ticker", "start": 24.0, "end": 27.0, "from": 0, "to": 100000, "prefix": "$", "suffix": "/yr", "label": "Revenue at Risk"}

{"type": "screen_shake", "start": 30.0, "end": 30.5, "intensity": 0.7, "style": "impact"}

{"type": "confetti_burst", "start": 33.0, "end": 36.0, "density": 1.0, "colors": ["#e63946", "#457b9d", "#2a9d8f"]}

{"type": "check_x_mark", "start": 38.0, "end": 39.5, "markType": "check", "position": "center"}
```

## Layout Distribution

| Layout | % of Video | Purpose |
|--------|------------|---------|
| `speaker_full` | ~15% | Intro, personal stories, trust-building, transitions |
| `slide_full` | ~15% | Teaching, complex diagrams, CTA slides |
| `split_right` / `split_left` | ~12% | Teaching with speaker visible (glass border style) |
| `split_5050_left` / `split_5050_right` | ~5% | Equal emphasis on speaker + slide (full-bleed, 1:1 slides) |
| `broll_full` | ~5% | Stock video B-roll (visual metaphors, establishing shots) |
| `jump_zoom` + `gradual_zoom` | ~15% | Emphasis, energy, movement |
| Speaker overlays | ~15% | newspaper_flash, counter_ticker, callout, check_x_mark, etc. |
| Full-screen data viz | ~12% | bar_chart, pie_chart, bullet_list, stat_cards, flow_diagram, etc. |
| Speaker effects | ~3% | glitch, freeze_frame, light_leak, screen_shake |
| `sfx` | 4-6 total | Sound effects: "boop" (reveals) or "click" (transitions). Overlaps visuals. |

**No single layout dominates** - keeps visual variety throughout the video.

### Data Viz Selection Guide

Pick the right visualization for the content:

| Data Type | Best Layout | Recommended Layout | Example |
|-----------|-------------|-------------------|---------|
| Comparing two things | `comparison_table` | full | SEO vs AEO, Before vs After |
| Multiple metrics at once | `stat_cards` | split or full | $10.2K revenue, 439 members, 97% retention |
| Ranked/scored items | `progress_bars` or `bar_chart` | full | LLM visibility scores, revenue by channel |
| Trend over time | `line_chart` | full | Growth month over month |
| Distribution/breakdown | `pie_chart` | full | Revenue sources, time allocation |
| Process/workflow | `flow_diagram` or `treasure_map` | full | Audit → Playbook → Execute → Monitor |
| Feature list / benefits | `bullet_list` | split or full | What you get, action items |
| Expert quote / citation | `quote_card` | split or full | Research stats, testimonials |
| Key statement | `typewriter_text` or `kinetic_type` | full | Memorable phrases, definitions |
| Counting up to a number | `counter_ticker` | full (overlay) | $0 → $100K revenue |

**When to use split vs full:**
- **Use split** (`split_left`/`split_right`) for simple visuals (bullet lists, stat cards, quotes) where the speaker is actively explaining - keeps the personal connection
- **Use full** for complex or detailed visuals (charts, diagrams, tables, maps) that need the screen real estate to be readable

### SFX Placement Rules

SFX edits are **audio-only overlays** - they don't replace the visual. Place them at the same timestamp as visual edits.

| Sound | When to Use |
|-------|-------------|
| `boop` | text_overlay reveals, soft emphasis moments |
| `click` | Layout changes to slides/splits, slide transitions |

**Rules:**
- Max **4-6 per 10-min video** - sparse and deliberate
- Volume `0.3-0.5` (never above `0.7`)
- SFX `start`/`end` = sound duration (0.5-1s)
- OK to overlap with any visual edit at the same timestamp

```json
{"type": "text_overlay", "start": 10.0, "end": 12.0, "text": "KEY STAT", "style": "center"},
{"type": "sfx", "start": 10.0, "end": 10.5, "content": "boop", "volume": 0.5}
```

## Hook Editing Rules (CRITICAL)

The first 60 seconds decide if people stay. Edit aggressively.

### First 30 seconds - Max 5s per segment
- **Something must happen every 3-5 seconds** - layout change, zoom punch, text overlay, GIF, anything
- **No segment longer than 5 seconds**
- **All layout types are fair game** - face, splits, slides, zooms, text, GIFs
- **At least 1 text overlay** with the key stat/hook word
- **At least 1 jump zoom** to punch a key statement
- **Visual variety is the priority** - don't repeat the same layout back-to-back

### 30-60 seconds - Max 7s per segment
- Still faster than the rest of the video
- **No segment longer than 7 seconds**
- Introduce the main teaching content (first slides)
- Keep the energy with zoom punches and layout changes

### Rest of video (60s+) - Normal pacing
- Segments can be 5-15 seconds
- Follow standard layout distribution rules below

### Hook Example (first 30s)
```json
[
  {"type": "speaker_full", "start": 0, "end": 3.0},
  {"type": "jump_zoom_in", "start": 3.0, "end": 3.3, "zoom": 1.20},
  {"type": "jump_cut_in", "start": 3.3, "end": 5.5, "zoom": 1.20},
  {"type": "jump_zoom_out", "start": 5.5, "end": 5.8, "zoom": 1.20},
  {"type": "text_overlay", "start": 5.8, "end": 8.0, "text": "$100K", "style": "center"},
  {"type": "split_right", "start": 8.0, "end": 13.0, "content": "slides/slide-01.jpg"},
  {"type": "gif_overlay", "start": 13.0, "end": 15.0, "content": "gifs/mind-blown.mp4", "position": "bottom-right", "size": 0.3},
  {"type": "gradual_zoom", "start": 15.0, "end": 19.0, "zoomStart": 1.0, "zoomEnd": 1.15},
  {"type": "zoom_transition_out", "start": 19.0, "end": 20.5, "content": "slides/slide-02.jpg", "zoom": 1.15, "toLayout": "split_left"},
  {"type": "split_left", "start": 20.5, "end": 25.0, "content": "slides/slide-02.jpg"},
  {"type": "jump_zoom_in", "start": 25.0, "end": 25.3, "zoom": 1.15},
  {"type": "jump_cut_in", "start": 25.3, "end": 27.5, "zoom": 1.15},
  {"type": "jump_zoom_out", "start": 27.5, "end": 27.8, "zoom": 1.15},
  {"type": "speaker_full", "start": 27.8, "end": 30.0}
]
```
10 visual changes in 30 seconds - that's the energy level for the hook.

## Zoom Rules

| Type | Amount | Duration | Use Case |
|------|--------|----------|----------|
| Gradual zoom | 10-15% | 4-10s | Subtle energy during speaker |
| Jump zoom (standard) | 15-20% | 0.3-0.5s | Emphasis, reveals |
| Jump zoom (major) | 20-25% | 0.3-0.5s | Surprising numbers, breaking misconceptions |

**Minimum 10%** - anything less is invisible to viewers.

## Timeline Generation Rules

### 1. Jump Zoom Sequence
**Always follow this pattern:**
```
jump_zoom_in (0.3-0.5s) -> jump_cut_in (HOLD 2-5s) -> jump_zoom_out (0.3-0.5s)
```
Never go directly from jump_zoom_in to jump_zoom_out.

### 2. Zoom Transition Rules

Zoom transitions create smooth cuts between layouts with continuous motion.

| Transition | Direction | Duration | What Happens |
|------------|-----------|----------|--------------|
| `zoom_transition_out` | Any -> Slide-focused | 1-2s | Zooms OUT, cuts to slide_full or split |
| `zoom_transition_in` | Any -> Speaker-focused | 1-2s | Zooms IN, cuts to speaker_full |

**Critical Rules:**
1. **Never zoom IN to slides** - cuts off content. Always zoom OUT to slides.
2. **Match zoom levels** - Previous segment's zoom must match transition's starting zoom.

#### Zoom Level Matching (IMPORTANT)

**Before transitions:** The transition's `zoom` parameter is the STARTING zoom level. Previous segment must match.

**After `zoom_transition_in`:** The transition ENDS at the zoom level. Next segment must be zoomed in.

**Wrong (jump BEFORE):**
```json
{"type": "speaker_full", "start": 0, "end": 5.0},
{"type": "zoom_transition_out", "start": 5.0, "end": 6.5, "zoom": 1.15, ...}
```

**Wrong (jump AFTER zoom_transition_in):**
```json
{"type": "zoom_transition_in", "start": 20.0, "end": 21.5, "zoom": 1.15, ...},
{"type": "speaker_full", "start": 21.5, "end": 25.0}
```

**Correct:**
```json
// Before: ramp UP to match
{"type": "gradual_zoom", "start": 4.0, "end": 5.0, "zoomStart": 1.0, "zoomEnd": 1.15},
{"type": "zoom_transition_out", "start": 5.0, "end": 6.5, "zoom": 1.15, ...}

// After zoom_transition_in: stay zoomed, then zoom out
{"type": "zoom_transition_in", "start": 20.0, "end": 21.5, "zoom": 1.15, ...},
{"type": "jump_cut_in", "start": 21.5, "end": 24.0, "zoom": 1.15},
{"type": "jump_zoom_out", "start": 24.0, "end": 24.4, "zoom": 1.15},
{"type": "speaker_full", "start": 24.4, "end": 28.0}
```

### Jump Zoom Emphasis Rules

| When to Use | Zoom | Duration |
|-------------|------|----------|
| Key statistic | 20% | 0.3-0.5s |
| Surprising claim | 20-25% | 0.3-0.5s |
| Framework name | 15% | 0.3s |
| Sentence emphasis | 15% | 0.3s |
| Word punch | 15-20% | 0.2-0.3s |

**Rules:**
- Max 1 jump zoom per 30-60 seconds
- **Never back-to-back zoom sequences** - minimum 1s `speaker_full` breather between any two zoom sequences. A zoom-out immediately followed by a zoom-in feels abrupt and jarring.
- Save 25% zooms for 1-2 moments per video

#### Supported Transitions (fromLayout -> toLayout)

| From | To | Transition | JSON params |
|------|-----|------------|-------------|
| `speaker_full` | `slide_full` | `zoom_transition_out` | default |
| `speaker_full` | `split_right` | `zoom_transition_out` | `"toLayout": "split_right"` |
| `speaker_full` | `split_left` | `zoom_transition_out` | `"toLayout": "split_left"` |
| `split_right` | `speaker_full` | `zoom_transition_in` | `"fromLayout": "split_right"` |
| `split_left` | `speaker_full` | `zoom_transition_in` | `"fromLayout": "split_left"` |
| `split_right` | `slide_full` | `zoom_transition_out` | `"fromLayout": "split_right"` |
| `split_left` | `slide_full` | `zoom_transition_out` | `"fromLayout": "split_left"` |
| `slide_full` | `speaker_full` | `zoom_transition_in` | default |
| `speaker_full` | `split_5050_left` | `zoom_transition_out` | `"toLayout": "split_5050_left"` |
| `speaker_full` | `split_5050_right` | `zoom_transition_out` | `"toLayout": "split_5050_right"` |
| `split_5050_left` | `speaker_full` | `zoom_transition_in` | `"fromLayout": "split_5050_left"` |
| `split_5050_right` | `speaker_full` | `zoom_transition_in` | `"fromLayout": "split_5050_right"` |
| `speaker_full` | `broll_full` | `zoom_transition_out` | `"toLayout": "broll_full"` |
| `broll_full` | `speaker_full` | `zoom_transition_in` | `"fromLayout": "broll_full"` |

#### Transition Flow Examples

```json
// Split -> Speaker (zoom in from teaching)
{"type": "split_right", "start": 10.0, "end": 14.5, "content": "slides/slide-01.jpg"},
{"type": "gradual_zoom", "start": 14.5, "end": 15.0, "zoomStart": 1.0, "zoomEnd": 1.15},
{"type": "zoom_transition_in", "start": 15.0, "end": 16.5, "content": "slides/slide-01.jpg", "zoom": 1.15, "fromLayout": "split_right"},
{"type": "speaker_full", "start": 16.5, "end": 20.0}

// Speaker -> Split (zoom out to teaching)
{"type": "speaker_full", "start": 0, "end": 4.0},
{"type": "gradual_zoom", "start": 4.0, "end": 5.0, "zoomStart": 1.0, "zoomEnd": 1.15},
{"type": "zoom_transition_out", "start": 5.0, "end": 6.5, "content": "slides/slide-01.jpg", "zoom": 1.15, "toLayout": "split_right"},
{"type": "split_right", "start": 6.5, "end": 15.0, "content": "slides/slide-01.jpg"}
```

### 3. Match Zoom Levels
Consecutive segments must have matching zoom levels to avoid jarring jumps.

### 4. Layout Changes at Speech Points (CRITICAL)
**NEVER place a layout change mid-sentence.** Always align layout changes with natural speech breaks:
- Gaps > 0.3s between words (search the transcript `words` array)
- Sentence boundaries (look for words starting with capitals after a pause)
- Topic shifts (new concept being introduced)

To find valid cut points, scan the transcript for gaps: if `words[n].end` + 0.3 < `words[n+1].start`, that's a valid layout change point. Placing a layout switch mid-phrase is jarring and breaks viewer focus.

## Example Timeline Structure

```
0:00-0:03   speaker_full              (intro - direct connection)
0:03-0:08   gradual_zoom 1.0->1.1    (subtle energy)
0:08-0:25   split_right slide-01      (teaching)
0:25-0:25.4 jump_zoom_in 1.15         (emphasis)
0:25.4-0:28 jump_cut_in 1.15          (HOLD zoomed)
0:28-0:28.4 jump_zoom_out 1.15        (release)
0:28.4-0:45 split_left slide-02       (teaching - variety)
0:45-1:10   slide_full slide-03       (complex diagram)
1:10-1:12   zoom_transition_in        (slide -> speaker)
1:12-1:20   speaker_full              (transition moment)
1:20-1:22   zoom_transition_out       (speaker -> slide)
1:22-1:45   split_right slide-04      (teaching)
...
5:30-5:40   slide_full slide-25       (CTA - full attention)
```

## GIF Layout Rules

### gif_overlay
GIF appears as a floating element on top of the speaker video. Used for reaction GIFs and humor beats.

```json
{"type": "gif_overlay", "start": 45.0, "end": 47.5, "content": "gifs/gif-01-mind-blown.gif", "position": "bottom-right", "size": 0.3}
```

| Property | Default | Options |
|----------|---------|---------|
| `position` | `bottom-right` | `bottom-right`, `bottom-left`, `top-right`, `top-left`, `center` |
| `size` | `0.3` | Fraction of frame width (0.2-0.5) |

**Animations:** Scale bounce on entrance, fade on exit (automatic).

### gif_full
GIF fills the entire frame. Speaker audio continues underneath. Used for big meme moments.

```json
{"type": "gif_full", "start": 120.0, "end": 122.0, "content": "gifs/gif-02-frustrated.gif"}
```

### GIF Placement Rules
- **Always download fresh assets** - never reuse GIFs or B-roll from previous runs. Delete existing files in gifs/ and broll/ directories and search for new ones each time.
- **Verify every download** - after downloading a GIF or B-roll clip, extract sample frames and READ them to check the content is valid and relevant. Use `fps=1` for short clips (GIFs under 5s) and `fps=1/5` for longer clips (B-roll). Command: `ffmpeg -i file.mp4 -vf "fps=1" /tmp/verify-%02d.jpg` or `ffmpeg -i file.mp4 -vf "fps=1/5" /tmp/verify-%02d.jpg`. Reject and re-search if it's a "content not available" placeholder, unrelated to the search query, or low quality.
- **Maximum 1 GIF per 45-60 seconds** (pattern interrupt, not constant)
- **Duration:** 1-3 seconds for overlays, 2-4 seconds for full
- **Placement:** Always AFTER the statement (punctuate, don't interrupt)
- **Never place during:** Important explanations, data/diagrams on screen
- **Typical count:** 6-10 GIFs per 10-minute video
- GIF files are in `gifs/` folder (parallel to `slides/`)

### Example Timeline with GIFs
```json
[
  {"type": "speaker_full", "start": 0, "end": 5.0},
  {"type": "split_right", "start": 5.0, "end": 25.0, "content": "slides/slide-01.jpg"},
  {"type": "jump_zoom_in", "start": 25.0, "end": 25.4, "zoom": 1.20},
  {"type": "jump_cut_in", "start": 25.4, "end": 28.0, "zoom": 1.20},
  {"type": "jump_zoom_out", "start": 28.0, "end": 28.4, "zoom": 1.20},
  {"type": "gif_overlay", "start": 28.4, "end": 30.5, "content": "gifs/gif-01-mind-blown.gif", "position": "bottom-right", "size": 0.3},
  {"type": "split_left", "start": 30.5, "end": 50.0, "content": "slides/slide-02.jpg"},
  {"type": "gif_full", "start": 50.0, "end": 52.0, "content": "gifs/gif-02-frustrated.gif"},
  {"type": "speaker_full", "start": 52.0, "end": 60.0}
]
```

## Text Overlay Rules

### text_overlay
Text appears on top of the speaker video with pop animation (scale bounce entrance).

```json
{"type": "text_overlay", "start": 16.4, "end": 19.0, "text": "AEO", "style": "center"}
```

| Property | Default | Options |
|----------|---------|---------|
| `text` | (required) | 1-3 words max |
| `style` | `caption` | `caption` (bottom), `center` (big center), `heading` (top) |
| `color` | `#e8e4e0` | Any hex color (off-white default) |
| `glow` | `true` | Glow effect around text |

**Font:** Always Syne (bold). No other fonts.

### Text Overlay Placement Rules
- **ONLY on speaker_full segments** - NEVER place text_overlay on slides, splits, or GIF layouts
- **Duration:** 1.5-3 seconds per overlay
- **Placement:** Timed to when the speaker says the word
- **Max 1-3 words** - single power words work best ("AEO", "THIS IS KEY", "$100K")
- **Frequency:** Max 1 per 30-60 seconds (like jump zooms - emphasis, not spam)
- **Use `center` style** for big impact moments (framework names, key stats)
- **Use `caption` style** for supporting emphasis (smaller, bottom of frame)

## Using Word-Level Timestamps (transcript.json)

When `transcript.json` exists in the video directory, use it as the **PRIMARY timing source** instead of the SRT file. It contains per-word `start`/`end` timestamps from Whisper API.

### Format
```json
{
  "words": [
    {"word": "invisible", "start": 23.45, "end": 23.82},
    {"word": "to", "start": 23.82, "end": 23.96},
    {"word": "AI", "start": 23.96, "end": 24.38}
  ],
  "segments": [
    {"start": 22.1, "end": 25.5, "text": "Your business is invisible to AI."}
  ]
}
```

### How to Use Word Timestamps

- **Jump zooms**: Find the exact word to punch, use its `start` timestamp
  ```json
  // Zoom on "invisible" at 23.45s
  {"type": "jump_zoom_in", "start": 23.45, "end": 23.75, "zoom": 1.20}
  ```
- **Text overlays**: Time to when the speaker SAYS the word (`word.start`)
  ```json
  // Text appears as speaker says "invisible"
  {"type": "text_overlay", "start": 23.45, "end": 25.5, "text": "INVISIBLE", "style": "center"}
  ```
- **Layout changes**: Place at natural speech breaks (gaps between words > 0.3s)
- **Slide transitions**: Align with the first word of a new topic section

### Finding Speech Gaps

Look for gaps > 0.3s between consecutive words - these are natural break points for layout changes and transitions. Example: if word N ends at 15.2s and word N+1 starts at 15.6s, that's a 0.4s gap - good place for a cut.

### Matching Prompter to Timestamps

Cross-reference the prompter's `[SLIDE XX]` markers with the transcript words to find exactly when each slide topic begins. Search the `words` array for the first few words after each slide marker to get precise timing.

## Technical Notes

- All timestamps in seconds (float)
- Content paths relative to `public/` folder
- Slide files named slide-XX.jpg (zero-padded)
- GIF files in `gifs/` folder, named gif-XX-[moment].gif
- Background video: `grid-loop.mp4` in `public/`

## Render Settings

| Setting | Value |
|---------|-------|
| Resolution | 3840x2160 (4K) |
| FPS | 30 |
| Codec | H.264 |
| Bitrate | 35-45 Mbps |

**Render command:**
```bash
npx remotion render MainVideo out/video.mp4 --video-bitrate=40M --props='{"config":{...}}'

# Or via render script
npx ts-node render.ts <video_dir>
```

## Remotion Styling (for reference)

The split layouts use:
- Glass borders: 16px width, `rgba(120, 140, 160, 0.6)`
- Speaker squircle: `border-radius: 50%` + `corner-shape: superellipse(2)`
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.4)`
- Slide: 16:9 aspect ratio, 32px border-radius

## Usage

```
Use the timeline-builder agent to generate timeline.json for the w08 video
```

The agent will:
1. Read the prompter file (or READ each slide image if no prompter exists)
2. Read the transcript (transcript-clean.json > transcript.json > SRT)
3. Match slides to speech moments using content understanding
4. Generate creative edit decisions with ~20% distribution per layout type
5. Output timeline.json

## After Generation

After writing timeline.json, report completion to the team lead. A separate validator agent will check the timeline for structural correctness, visual density, and speech alignment. If validation fails, you will receive specific fix instructions with exact timestamps and values to change.
