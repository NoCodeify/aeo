# Video Editor (Remotion)

React-based video editor for talking head + slides using Remotion. Migrated from MoviePy (Python) for better CSS-based layouts and styling.

## Quick Start

```bash
cd tools/video-editor-remotion
npm install

# Preview in browser
npm run dev

# Render video
npx ts-node render.ts ../../youtube/weekly-production/2026-w08-rank-in-chatgpt
```

## Layouts

| Type | Description |
|------|-------------|
| `speaker_full` | Speaker fills entire frame |
| `slide_full` | Slide fills frame (speaker audio continues) |
| `split_right` | Grid bg + slide left (~76%), speaker right (~24%) with glass border |
| `split_left` | Grid bg + speaker left, slide right with glass border |
| `jump_zoom_in` | Animated zoom punch (configurable duration) |
| `jump_zoom_out` | Animated zoom back to normal |
| `jump_cut_in` | Instant zoom (no animation) - use to HOLD after jump_zoom_in |
| `jump_cut_out` | Instant back to normal |
| `zoom_transition_in` | Slide → Speaker with continuous zoom IN |
| `zoom_transition_out` | Speaker → Slide with continuous zoom OUT |
| `gradual_zoom` | Slow drift zoom over entire segment |

---

## Editing Guidelines

### Layout Distribution (~20% each)

| Layout | % of Video | When to Use |
|--------|------------|-------------|
| `speaker_full` | ~20% | Intro, personal stories, trust-building, section transitions |
| `slide_full` | ~20% | Teaching, complex diagrams, CTA slides |
| `split_right` | ~20% | Teaching with speaker visible |
| `split_left` | ~20% | Teaching with speaker visible (variety) |
| `jump_zoom` + `gradual_zoom` | ~20% | Emphasis, energy, movement |

**No single layout dominates** - keeps visual variety throughout the video.

### Zoom Rules

| Type | Amount | When to Use |
|------|--------|-------------|
| **Gradual zoom** | 10-15% | Over entire speaker segment for subtle energy |
| **Jump zoom (standard)** | 15-20% | End of powerful statements, key reveals |
| **Jump zoom (major)** | 20-25% | Surprising numbers, breaking misconceptions |
| **Minimum** | 10% | Anything less is invisible to viewers |

### Emphasis Hierarchy

| Level | Technique | Frequency |
|-------|-----------|-----------|
| **Subtle** | Layout change, gradual zoom | Frequent |
| **Moderate** | 15% jump zoom | Regular |
| **Strong** | 20% jump zoom | Sparingly |
| **Maximum** | 25% jump zoom | Rarely |

### Jump Zoom Emphasis Rules

Use jump zooms to punch key words/sentences. Rules:

| When to Use | Zoom Amount | Duration |
|-------------|-------------|----------|
| Key statistic ("$100k ARR") | 20% | 0.3-0.5s |
| Surprising claim | 20-25% | 0.3-0.5s |
| Framework name reveal | 15% | 0.3s |
| Sentence emphasis | 15% | 0.3s |
| Word punch (single word) | 15-20% | 0.2-0.3s |

**Frequency rules:**
- Max 1 jump zoom per 30-60 seconds
- Never back-to-back jump zooms (needs breathing room)
- Save 25% zooms for 1-2 moments per video

**Word punch pattern:**
```json
{"type": "speaker_full", "start": 10.0, "end": 12.5},
{"type": "jump_zoom_in", "start": 12.5, "end": 12.7, "zoom": 1.15},
{"type": "jump_cut_in", "start": 12.7, "end": 13.5, "zoom": 1.15},
{"type": "jump_zoom_out", "start": 13.5, "end": 13.8, "zoom": 1.15},
{"type": "speaker_full", "start": 13.8, "end": 18.0}
```

### Flow Rules

1. **Always follow `jump_zoom_in` with `jump_cut_in` (HOLD), then `jump_zoom_out`**
2. **Match zoom levels** between consecutive segments (no jarring jumps)
3. **Place layout changes at natural speech points** - tied to spoken words

### Zoom Transition Rules

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

**After `zoom_transition_in`:** The transition ENDS at the zoom level. Next segment must be zoomed in (e.g., `jump_cut_in`).

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
// Before: ramp UP to match starting zoom
{"type": "gradual_zoom", "start": 4.0, "end": 5.0, "zoomStart": 1.0, "zoomEnd": 1.15},
{"type": "zoom_transition_out", "start": 5.0, "end": 6.5, "zoom": 1.15, ...}

// After zoom_transition_in: next segment must be zoomed in, then zoom out
{"type": "zoom_transition_in", "start": 20.0, "end": 21.5, "zoom": 1.15, ...},
{"type": "jump_cut_in", "start": 21.5, "end": 24.0, "zoom": 1.15},
{"type": "jump_zoom_out", "start": 24.0, "end": 24.4, "zoom": 1.15},
{"type": "speaker_full", "start": 24.4, "end": 28.0}
```

#### Supported Transitions

| From | To | Transition | Notes |
|------|-----|------------|-------|
| `speaker_full` | `slide_full` | `zoom_transition_out` | Zoom out to full slide |
| `speaker_full` | `split_right/left` | `zoom_transition_out` | Zoom out to split view |
| `slide_full` | `speaker_full` | `zoom_transition_in` | Zoom in to speaker |
| `split_right/left` | `speaker_full` | `zoom_transition_in` | Zoom in from split to speaker |
| `split_right/left` | `slide_full` | `zoom_transition_out` | Zoom out from split to full slide |

#### Transition Flow Examples

```
# Speaker → Split (zoom out to teaching)
gradual_zoom (1.0→1.15) → zoom_transition_out → split_right

# Split → Speaker (zoom in from teaching)
split_left → zoom_transition_in → speaker_full

# Split → Full slide (zoom out to full slide)
split_right → zoom_transition_out → slide_full

# Full slide → Speaker (zoom in)
slide_full → zoom_transition_in → speaker_full
```

### Typical Flow

```
speaker_full (intro)
  → split_right (teaching)
  → jump_zoom_in → jump_cut_in (HOLD) → jump_zoom_out (emphasis)
  → split_left (more teaching - variety)
  → zoom_transition_out → slide_full (CTA)
  → zoom_transition_in → speaker_full (outro)
```

---

## Timeline Format

```json
[
  {"type": "speaker_full", "start": 0, "end": 3.0},
  {"type": "gradual_zoom", "start": 3.0, "end": 8.0, "zoomStart": 1.0, "zoomEnd": 1.1},
  {"type": "split_right", "start": 8.0, "end": 25.0, "content": "slides/slide-01.jpg"},
  {"type": "jump_zoom_in", "start": 25.0, "end": 25.4, "zoom": 1.20},
  {"type": "jump_cut_in", "start": 25.4, "end": 28.0, "zoom": 1.20},
  {"type": "jump_zoom_out", "start": 28.0, "end": 28.4, "zoom": 1.20},
  {"type": "zoom_transition_out", "start": 28.4, "end": 30.0, "content": "slides/slide-02.jpg", "zoom": 1.15},
  {"type": "slide_full", "start": 30.0, "end": 35.0, "content": "slides/slide-02.jpg"}
]
```

**Notes:**
- Timestamps in seconds (float)
- Content paths relative to `public/` folder
- Render script copies files to `public/` automatically
- Jump zoom duration: 0.3-0.5s recommended
- Gradual zoom duration: 4-10s recommended

---

## Technical Details

### Why Remotion? (vs MoviePy)

| Feature | MoviePy (old) | Remotion (current) |
|---------|---------------|-------------------|
| Styling | PIL drawing, complex math | CSS - just works |
| Borders | Manual superellipse paths | `border-radius` + `corner-shape` |
| Shadows | Complex compositing | `box-shadow` |
| Layout | Manual pixel calculations | Flexbox-like positioning |
| Preview | Render to test | Live browser preview |
| Types | Python dicts | TypeScript interfaces |

### The Squircle Discovery

True squircles (iOS-style superellipse) need:

```css
border-radius: 50%;  /* Half the width */
corner-shape: superellipse(2);  /* CSS4 - continuous curve */
```

**In React/Remotion:**
```tsx
style={{
  borderRadius: width * 0.5,
  // @ts-ignore - experimental CSS property
  "cornerShape": "superellipse(2)",
}}
```

### Glass Border Styling

```tsx
const PADDING = 64;
const GAP = 32;
const BORDER_WIDTH = 16;
const BORDER_COLOR = "rgba(120, 140, 160, 0.6)";
const BORDER_RADIUS = 32;
const SHADOW = "0 8px 32px rgba(0, 0, 0, 0.4)";
```

### Split Layout Dimensions

```
3840x2160 frame (4K)
├── PADDING (64px each side)
├── Slide: ~76% of available width, 16:9 aspect ratio
├── GAP (32px between elements)
├── BORDER: 16px glass border
└── Speaker: ~24% width, squircle shape, same height as slide
```

---

## Project Structure

```
video-editor-remotion/
├── src/
│   ├── components/
│   │   ├── SplitLayout.tsx      # Split view with glass borders + squircle
│   │   ├── SpeakerFull.tsx      # Full frame speaker
│   │   ├── SlideFull.tsx        # Full frame slide
│   │   ├── JumpZoom.tsx         # Animated zoom (configurable duration)
│   │   ├── JumpCut.tsx          # Instant zoom (no animation)
│   │   ├── ZoomTransition.tsx   # Zoom across speaker↔slide cut
│   │   ├── GradualZoom.tsx      # Slow drift zoom
│   │   └── MainVideo.tsx        # Timeline renderer
│   ├── types/
│   │   └── timeline.ts          # TypeScript types
│   ├── Root.tsx
│   └── index.ts
├── public/
│   ├── grid-loop.mp4
│   ├── speaker.mp4
│   └── slides/
├── render.ts
├── remotion.config.ts
└── CLAUDE.md
```

## Render Settings

| Setting | Value |
|---------|-------|
| Resolution | 3840×2160 (4K) |
| FPS | 30 |
| Codec | H.264 |
| Format | MP4 |
| Bitrate | 35-45 Mbps (use `--video-bitrate=40M`) |

**Quick render command:**
```bash
npx remotion render MainVideo out/video.mp4 --video-bitrate=40M --props='{"config":{...}}'
```

## Development

```bash
# Start dev server with live preview
npm run dev

# Test render (specific frames, 4K, 40Mbps)
npx remotion render MainVideo out/test.mp4 --frames=0-89 --video-bitrate=40M --props='{"config":{...}}'

# Full render via script
npx ts-node render.ts <video_dir>
```
