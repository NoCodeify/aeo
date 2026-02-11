---
paths:
  - "tools/video-editor-remotion/**"
  - "test-video/**"
---

# Video Editing Rules

**ALWAYS render at 4K (3840x2160) with 35Mbps bitrate.** Never render at 1080p. Use `--video-bitrate=35M` flag.

## ALWAYS use dedicated agents for video tasks

- Video timelines: `/video-timeline` skill (pipeline: timeline-builder + timeline-validator agents)
- Auto-cut: `/auto-cutter` skill (forks to auto-cutter agent)
- B-roll prompts: `/broll-prompting` skill (forks to broll-prompter agent)
- GIF search: `/gif-search` skill (forks to gif-researcher agent)
- Slides: `/excalidraw-slides` skill (forks to slide-prompter agent)
- Thumbnails: `/thumbnail` skill (forks to thumbnail-prompter agent)
- Full pipeline: `/video-produce` skill (agent team)

## Pipeline

1. Record raw footage
2. `/auto-cutter` - intelligent silence/filler removal
3. `/video-timeline` - generate timeline.json from script + transcript
4. Remotion render at 4K

## Quick Start

```bash
cd tools/video-editor-remotion
npm install

# 1. Transcribe speaker video (word-level timestamps + filler detection)
ASSEMBLYAI_API_KEY=... npx ts-node transcribe.ts ../../youtube/weekly-production/2026-w08-rank-in-chatgpt

# 2. Auto-cut silences/fillers (via Claude Code agent)
# Say: "use the auto-cutter agent on the w08 video"
# → generates cuts.json → runs autocut.ts → speaker-clean.mp4 + transcript-clean.json

# 3. Preview in browser
npm run dev

# 4. Render video (auto-detects speaker-clean.mp4 if available)
npx ts-node render.ts ../../youtube/weekly-production/2026-w08-rank-in-chatgpt
```

## Layouts

| Type | Description |
|------|-------------|
| `speaker_full` | Speaker fills entire frame |
| `slide_full` | Slide fills frame (speaker audio continues) |
| `split_right` | Grid bg + slide left (~76%), speaker right (~24%) with glass border |
| `split_left` | Grid bg + speaker left, slide right with glass border |
| `split_5050_left` | Full-bleed 50/50: speaker left, slide right (no padding/borders) |
| `split_5050_right` | Full-bleed 50/50: slide left, speaker right (no padding/borders) |
| `broll_full` | Stock video B-roll fills frame (speaker audio continues, no loop) |
| `gif_overlay` | GIF on top of speaker video (reaction memes, humor beats) |
| `gif_full` | GIF fills frame (speaker audio continues, big meme moments) |
| `text_overlay` | Text on speaker video (Syne font, off-white, pop animation) |
| `jump_zoom_in` | Animated zoom punch (configurable duration) |
| `jump_zoom_out` | Animated zoom back to normal |
| `jump_cut_in` | Instant zoom (no animation) - use to HOLD after jump_zoom_in |
| `jump_cut_out` | Instant back to normal |
| `zoom_transition_in` | Slide → Speaker with continuous zoom IN |
| `zoom_transition_out` | Speaker → Slide with continuous zoom OUT |
| `gradual_zoom` | Slow drift zoom over entire segment |
| `sfx` | Sound effect overlay (audio-only, no visual). "boop" or "click" |

---

## Editing Guidelines

### Layout Distribution (~20% each)

| Layout | % of Video | When to Use |
|--------|------------|-------------|
| `speaker_full` | ~20% | Intro, personal stories, trust-building, section transitions |
| `slide_full` | ~20% | Teaching, complex diagrams, CTA slides |
| `split_right` / `split_left` | ~15% | Teaching with speaker visible (glass border style) |
| `split_5050_left` / `split_5050_right` | ~5% | Equal emphasis on speaker + slide (full-bleed, no borders) |
| `broll_full` | ~5% | Stock video B-roll (visual metaphors, establishing shots, 3-15s) |
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
- **Never back-to-back jump zooms** - minimum 1s `speaker_full` breather between any two zoom sequences. A zoom-out immediately followed by a zoom-in feels abrupt and jarring.
- Save 25% zooms for 1-2 moments per video

**Word punch pattern:**
```json
{"type": "speaker_full", "start": 10.0, "end": 12.5},
{"type": "jump_zoom_in", "start": 12.5, "end": 12.7, "zoom": 1.15},
{"type": "jump_cut_in", "start": 12.7, "end": 13.5, "zoom": 1.15},
{"type": "jump_zoom_out", "start": 13.5, "end": 13.8, "zoom": 1.15},
{"type": "speaker_full", "start": 13.8, "end": 18.0}
```

### Text Overlay Rules

**Font:** Syne (bold) — all styles. No other fonts in video.
**Default color:** `#e8e4e0` (off-white). Override with `color` property.
**Animation:** Pop scale (70% → 110% → 100% over 12 frames) + fade in/out.

| Style | Position | Font Size | Use Case |
|-------|----------|-----------|----------|
| `caption` | Bottom | 128px | Supporting emphasis |
| `center` | Center | 240px | Big impact (framework names, key stats) |
| `heading` | Top | 160px | Section headers |

**CRITICAL: text_overlay ONLY on speaker_full segments.** Never on slides, splits, or GIFs.

**Rules:**
- 1-3 words max (power words work best)
- Duration 1.5-3 seconds
- Max 1 per 30-60 seconds
- Timed to when speaker says the word
- `glow: true` by default (soft glow around text)

```json
{"type": "text_overlay", "start": 4.0, "end": 6.5, "text": "THIS IS KEY", "style": "caption"},
{"type": "text_overlay", "start": 16.4, "end": 19.0, "text": "AEO", "style": "center"}
```

### Flow Rules

1. **First segment must have motion** - Never start with static `speaker_full`. Use `gradual_zoom` or a transition so the video has movement from frame 1.
2. **Always follow `jump_zoom_in` with `jump_cut_in` (HOLD), then `jump_zoom_out`**
3. **Match zoom levels** between consecutive segments (no jarring jumps)
4. **Place layout changes at natural speech points** - tied to spoken words

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
| `speaker_full` | `split_5050_left/right` | `zoom_transition_out` | Zoom out to 50/50 |
| `slide_full` | `speaker_full` | `zoom_transition_in` | Zoom in to speaker |
| `split_right/left` | `speaker_full` | `zoom_transition_in` | Zoom in from split to speaker |
| `split_5050_left/right` | `speaker_full` | `zoom_transition_in` | Zoom in from 50/50 to speaker |
| `speaker_full` | `broll_full` | `zoom_transition_out` | Zoom out to B-roll |
| `broll_full` | `speaker_full` | `zoom_transition_in` | Zoom in from B-roll to speaker |
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

### Background Music

**Tracks:** `public/sfx/lofi-beat-bg.mp3` (default) and `public/sfx/upbeat-bg.mp3` (rare, suspense/tense moments).

The lofi track plays automatically on every video via the `bgMusic` config in `VideoConfig`. No timeline entry needed.

**Volume curve:** Starts at 16%, fades linearly to 8% over 10 seconds, stays at 8% for the rest of the video.

**Looping:** Uses Remotion's `<Audio loop>` to seamlessly loop the track for the entire video duration.

**Config (set automatically in Root.tsx and render.ts):**
```ts
bgMusic: {
  src: "sfx/lofi-beat-bg.mp3",
  startVolume: 0.16,  // 16%
  mainVolume: 0.08,   // 8%
  fadeDuration: 10,   // seconds
}
```

To disable bg music for a specific render, omit the `bgMusic` field from the config.

### Sound Effects (SFX) Rules

**Library:** `public/sfx/boop.mp3` and `public/sfx/click.mp3` - ship with editor, not per-video.

| Sound | Use Case |
|-------|----------|
| `boop` | Text overlay reveals, soft emphasis, gentle moments |
| `click` | Layout transitions to slides, UI-like moments |

**Rules:**
- Max **4-6 sfx per 10-min video** - sparse and deliberate
- Default volume `0.5` (subtle) - never louder than `0.7`
- SFX edits **overlap** with visual edits (same timestamp is fine)
- Duration matches the sound file length (0.5-1s typical)

```json
{"type": "sfx", "start": 10.0, "end": 10.5, "content": "boop", "volume": 0.5},
{"type": "sfx", "start": 25.0, "end": 25.5, "content": "click", "volume": 0.4}
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

### 50/50 Layout Dimensions

```
3840x2160 frame (4K)
├── Left half:  1920x2160 (speaker or slide)
└── Right half: 1920x2160 (speaker or slide)
No padding, no gap, no borders. Full-bleed edge-to-edge.
Generate slides at 1:1 aspect ratio for best coverage (~11% side crop).
```

### Squircle (iOS-style superellipse)

```css
border-radius: 50%;
corner-shape: superellipse(2);
```

---

## Transcription (Word-Level Timestamps)

**Script:** `transcribe.ts` — dual-pass transcription via AssemblyAI for best-of-both-worlds accuracy.

```bash
ASSEMBLYAI_API_KEY=... npx ts-node transcribe.ts <video_dir>
```

**How it works (dual-pass):**
1. Finds speaker video in `<video_dir>/video/`
2. Extracts audio with ffmpeg (64kbps mono m4a)
3. Uploads once to AssemblyAI
4. Runs two transcriptions in parallel:
   - **Universal-3-Pro** — higher accuracy, catches false starts & repeated phrases
   - **Universal-2** (`disfluencies: true`) — detects filler words (um, uh, er, ah)
5. Merges: U3P words as base + U2 filler positions inserted into gaps
6. Outputs `<video_dir>/video/transcript.json`

**Output format (`transcript.json`):**
```json
{
  "duration": 355.64,
  "language": "english",
  "words": [
    {"word": "So", "start": 0, "end": 0.62},
    {"word": "um", "start": 1.2, "end": 1.4},
    {"word": "a", "start": 1.4, "end": 0.88}
  ],
  "segments": [
    {"start": 0, "end": 7.32, "text": "So um a few months ago..."}
  ],
  "text": "Full transcript text..."
}
```

**Cost:** ~$0.005/min ($0.03 for a 6-min video, $0.05 for 10-min) — 2 passes

---

## Auto-Cut (Smart Silence/Filler Removal)

**Agent:** `.claude/agents/auto-cutter.md` — Claude Code reads the transcript and intelligently decides what to cut.
**Script:** `autocut.ts` — Applies the cuts mechanically with ffmpeg.

```bash
# Step 1: Agent generates cuts.json (say: "use the auto-cutter agent on the w08 video")
# Step 2: Script applies cuts
npx ts-node autocut.ts <video_dir>
```

**What gets cut:** Filler words (um, uh, like), silences > 0.7s, repeated words, false starts, trailing fillers.
**What gets kept:** Dramatic pauses before key reveals, sentence-end breaths, emphasis pauses.

**Output:**
- `speaker-clean.mp4` — clean video with cuts applied (ffmpeg concat, no re-encoding)
- `transcript-clean.json` — remapped word timestamps matching the clean video
- `cuts.json` — the cut decisions (for review)

**Typical results:** 8-15% time savings for a 5-10 min video.

`render.ts` auto-detects `speaker-clean.mp4` and uses it over the original.

---

## Project Structure

```
video-editor-remotion/
├── src/
│   ├── components/
│   │   ├── SplitLayout.tsx      # Split view with glass borders + squircle
│   │   ├── Split5050.tsx        # 50/50 full-bleed split (no borders)
│   │   ├── BrollFull.tsx        # Full-screen stock video B-roll
│   │   ├── SpeakerFull.tsx      # Full frame speaker
│   │   ├── SlideFull.tsx        # Full frame slide
│   │   ├── JumpZoom.tsx         # Animated zoom (configurable duration)
│   │   ├── JumpCut.tsx          # Instant zoom (no animation)
│   │   ├── ZoomTransition.tsx   # Zoom across speaker↔slide cut
│   │   ├── GradualZoom.tsx      # Slow drift zoom
│   │   ├── GifOverlay.tsx       # GIF overlay on speaker (reaction memes)
│   │   ├── GifFull.tsx          # Full-screen GIF moment
│   │   ├── TextOverlay.tsx      # Text on speaker (Syne font, pop animation)
│   │   └── MainVideo.tsx        # Timeline renderer
│   ├── types/
│   │   └── timeline.ts          # TypeScript types
│   ├── Root.tsx
│   └── index.ts
├── public/
│   ├── grid-loop.mp4
│   ├── speaker.mp4
│   ├── slides/
│   ├── gifs/                    # Downloaded GIFs (from gif-researcher)
│   ├── broll/                   # Stock video B-roll (from pexels-mcp)
│   └── sfx/                     # Audio (boop.mp3, click.mp3, lofi-beat-bg.mp3, upbeat-bg.mp3) - permanent
├── render.ts
├── transcribe.ts              # Dual-pass AssemblyAI transcription (U3P + U2 fillers)
├── autocut.ts                 # Apply cuts.json (ffmpeg + timestamp remap)
├── remotion.config.ts
└── package.json
```

## Render Settings

| Setting | Value |
|---------|-------|
| Resolution | 3840x2160 (4K) |
| FPS | 30 |
| Codec | H.264 |
| Format | MP4 |
| Bitrate | 35-45 Mbps (use `--video-bitrate=40M`) |
