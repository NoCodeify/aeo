# Video Timeline Agent

Generate timeline.json for the Remotion video editor from a script/prompter file.

## Purpose

Read a video script or prompter with slide markers and generate a complete `timeline.json` that can be rendered by the Remotion video editor (`tools/video-editor-remotion/`).

## Input Required

1. **Prompter file** with `[SLIDE XX: name]` markers
2. **SRT subtitle file** with timestamps
3. **Slides directory** with slide images (slide-01.jpg, slide-02.jpg, etc.)
4. **Speaker video** to get total duration

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

| Layout | Description | When to Use |
|--------|-------------|-------------|
| `speaker_full` | Speaker fills frame | Intro, personal stories, transitions |
| `slide_full` | Slide fills frame | Teaching, CTA slides, complex diagrams |
| `split_right` | Slide left ~76%, speaker right ~24% | Teaching with speaker visible |
| `split_left` | Speaker left ~24%, slide right ~76% | Teaching (variety) |
| `jump_zoom_in` | Animated zoom punch (15-25%) | Key reveals, powerful statements |
| `jump_cut_in` | Instant zoom (no animation) | HOLD after jump_zoom_in |
| `jump_zoom_out` | Animated zoom back | After hold period |
| `jump_cut_out` | Instant back to normal | Hard cut reset |
| `zoom_transition_in` | Slide → Speaker with zoom | Smooth transition to speaker |
| `zoom_transition_out` | Speaker → Slide with zoom | Smooth transition to slide |
| `gradual_zoom` | Slow drift zoom (10-15%) | Speaker segments, 4-10s |

## Layout Distribution (~20% each)

| Layout | % of Video | Purpose |
|--------|------------|---------|
| `speaker_full` | ~20% | Intro, personal stories, trust-building, transitions |
| `slide_full` | ~20% | Teaching, complex diagrams, CTA slides |
| `split_right` | ~20% | Teaching with speaker visible |
| `split_left` | ~20% | Teaching with speaker visible (variety) |
| `jump_zoom` + `gradual_zoom` | ~20% | Emphasis, energy, movement |

**No single layout dominates** - keeps visual variety throughout the video.

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
jump_zoom_in (0.3-0.5s) → jump_cut_in (HOLD 2-5s) → jump_zoom_out (0.3-0.5s)
```
Never go directly from jump_zoom_in to jump_zoom_out.

### 2. Zoom Transition Rules

Zoom transitions create smooth cuts between layouts with continuous motion.

| Transition | Direction | Duration | What Happens |
|------------|-----------|----------|--------------|
| `zoom_transition_out` | Any → Slide-focused | 1-2s | Zooms OUT, cuts to slide_full or split |
| `zoom_transition_in` | Any → Speaker-focused | 1-2s | Zooms IN, cuts to speaker_full |

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
- Never back-to-back (needs breathing room)
- Save 25% zooms for 1-2 moments per video

#### Supported Transitions (fromLayout → toLayout)

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

#### Transition Flow Examples

```json
// Split → Speaker (zoom in from teaching)
{"type": "split_right", "start": 10.0, "end": 14.5, "content": "slides/slide-01.jpg"},
{"type": "gradual_zoom", "start": 14.5, "end": 15.0, "zoomStart": 1.0, "zoomEnd": 1.15},
{"type": "zoom_transition_in", "start": 15.0, "end": 16.5, "content": "slides/slide-01.jpg", "zoom": 1.15, "fromLayout": "split_right"},
{"type": "speaker_full", "start": 16.5, "end": 20.0}

// Speaker → Split (zoom out to teaching)
{"type": "speaker_full", "start": 0, "end": 4.0},
{"type": "gradual_zoom", "start": 4.0, "end": 5.0, "zoomStart": 1.0, "zoomEnd": 1.15},
{"type": "zoom_transition_out", "start": 5.0, "end": 6.5, "content": "slides/slide-01.jpg", "zoom": 1.15, "toLayout": "split_right"},
{"type": "split_right", "start": 6.5, "end": 15.0, "content": "slides/slide-01.jpg"}
```

### 3. Match Zoom Levels
Consecutive segments must have matching zoom levels to avoid jarring jumps.

### 4. Layout Changes at Speech Points
Place layout changes at natural speech breaks - tied to spoken words.

## Example Timeline Structure

```
0:00-0:03   speaker_full              (intro - direct connection)
0:03-0:08   gradual_zoom 1.0→1.1      (subtle energy)
0:08-0:25   split_right slide-01      (teaching)
0:25-0:25.4 jump_zoom_in 1.15         (emphasis)
0:25.4-0:28 jump_cut_in 1.15          (HOLD zoomed)
0:28-0:28.4 jump_zoom_out 1.15        (release)
0:28.4-0:45 split_left slide-02       (teaching - variety)
0:45-1:10   slide_full slide-03       (complex diagram)
1:10-1:12   zoom_transition_in        (slide → speaker)
1:12-1:20   speaker_full              (transition moment)
1:20-1:22   zoom_transition_out       (speaker → slide)
1:22-1:45   split_right slide-04      (teaching)
...
5:30-5:40   slide_full slide-25       (CTA - full attention)
```

## Technical Notes

- All timestamps in seconds (float)
- Content paths relative to `public/` folder
- Slide files named slide-XX.jpg (zero-padded)
- Background video: `grid-loop.mp4` in `public/`

## Render Settings

| Setting | Value |
|---------|-------|
| Resolution | 3840×2160 (4K) |
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
Use the video-timeline agent to generate timeline.json for the w08 video
```

The agent will:
1. Read the prompter file
2. Read the SRT file
3. Match slides to timestamps
4. Generate creative edit decisions with ~20% distribution per layout type
5. Output timeline.json
