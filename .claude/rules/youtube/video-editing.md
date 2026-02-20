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

## Pipeline (Post-Film)

1. **Transcribe** raw footage (`transcribe.ts`)
2. **Auto-cut** silences/fillers (`/auto-cutter` -> `autocut.ts`)
3. **Build timeline** (`/video-timeline`) - MUST happen before slide generation
   - Timeline decides layouts per segment (speaker_full, slide_full, split_5050, etc.)
   - This determines slide aspect ratios: 16:9 for `slide_full`, 1:1 for `split_5050`
4. **Generate slides** at correct aspect ratios per timeline
   - `/excalidraw-slides` for hand-drawn whiteboard style
   - `/broll-prompting` only for premium dark-bg graphics (rare)
5. **Download GIFs** (can run parallel with step 4)
6. **Remotion render** at 4K

## Quick Start

```bash
cd tools/video-editor-remotion
npm install

# 0. Generate proxy videos for smooth preview (one-time, ~10MB vs 705MB)
npm run proxy

# 1. Transcribe speaker video (word-level timestamps + filler detection)
ASSEMBLYAI_API_KEY=... npx ts-node transcribe.ts ../../youtube/weekly-production/2026-w08-rank-in-chatgpt

# 2. Auto-cut silences/fillers (via Claude Code agent)
# Say: "use the auto-cutter agent on the w08 video"
# → generates cuts.json → runs autocut.ts → speaker-clean.mp4 + transcript-clean.json

# 3. Preview in browser (uses proxy videos automatically)
npm run dev

# 4. Render video (uses full 4K source automatically)
npx ts-node render.ts ../../youtube/weekly-production/2026-w08-rank-in-chatgpt
```

## Layouts

### Core Layouts (speaker video)

| Type | Description |
|------|-------------|
| `speaker_full` | Speaker fills entire frame |
| `slide_full` | Slide fills frame (speaker audio continues) |
| `split_right` | Grid bg + slide left (~76%), speaker right (~24%) with glass border |
| `split_left` | Grid bg + speaker left, slide right with glass border |
| `split_5050_left` | Full-bleed 50/50: speaker left, slide right (no padding/borders) |
| `split_5050_right` | Full-bleed 50/50: slide left, speaker right (no padding/borders) |
| `broll_full` | Stock video B-roll fills frame (speaker audio continues, no loop) |
| `gif_overlay` | GIF on top of speaker video (reaction memes, humor beats). **Speaker-only layouts!** |
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

### Speaker Overlays (render on top of speaker video)

| Type | Description | Duration |
|------|-------------|----------|
| `newspaper_flash` | Stacked newspaper clippings with keyword highlighted | 2-4s |
| `lower_third` | Name/title bar overlay | 3-5s |
| `counter_ticker` | Animated counting number (e.g. $0 → $100K) | 2-4s |
| `social_proof_flash` | Stacked tweet/post cards with keyword highlighted | 2-4s |
| `callout` | Arrow + text label pointing to something | 2-4s |
| `check_x_mark` | Green check or red X SVG overlay | 1-2s |
| `circle_timer` | Countdown circle draining over segment | 3-5s |
| `text_reveal_wipe` | Clip-path text reveal (left/right/top/bottom wipe) | 1-2s |
| `confetti_burst` | Colorful particle explosion overlay | 2-3s |
| `screen_shake` | Camera shake transform (impact/earthquake/subtle) | 0.5-1s |
| `cta_overlay` | Animated CTA card (offer/subscribe/next_video) | 5-10s |
| `toggle_switch` | iOS toggle with spring flip + label change | 2-4s |
| `countdown_flip` | Airport flip-clock countdown | 3-5s |
| `notification_stack` | iOS notification cards sliding in from top | 4-8s |

### Full-Screen Section Headers

| Type | Description | Duration |
|------|-------------|----------|
| `chapter_card` | Animated chapter title card (dark bg, glass card, number + title + subtitle) | 2-4s |

### Speaker Effects (brief transforms)

| Type | Description | Duration |
|------|-------------|----------|
| `glitch` | Digital distortion effect | 3-5 frames |
| `freeze_frame` | Hold speaker with desaturation + optional text | 1-2s |
| `light_leak` | Cinematic light leak overlay | 1-2s |

### Full-Screen Data Viz (dark bg, optional 50/50 split)

All data viz types support an optional `layout` property:
- `"full"` (default) - Full-screen dark background, speaker audio hidden
- `"split_left"` - Speaker on left, data viz on right (50/50)
- `"split_right"` - Speaker on right, data viz on left (50/50)

| Type | Description | Duration |
|------|-------------|----------|
| `comparison_table` | Two-column side-by-side (e.g. SEO vs AEO) | 4-6s |
| `quote_card` | Stylized quote with attribution | 3-5s |
| `progress_bars` | Horizontal stat bars with animated fill | 3-5s |
| `typewriter_text` | Monospace text typing out character by character | 3-6s |
| `kinetic_type` | Words appear one at a time (big, bold) | 3-6s |
| `bar_chart` | Vertical bars with spring animation | 4-6s |
| `line_chart` | SVG line drawing left-to-right with dots | 4-6s |
| `bullet_list` | Animated checklist items staggering in | 4-6s |
| `stat_cards` | Grid of metric cards (value + label + trend) | 3-5s |
| `pie_chart` | Animated pie/donut segments with legend | 4-6s |
| `flow_diagram` | Linear node flow (A → B → C → D) horizontal or vertical | 4-6s |
| `treasure_map` | Winding dashed path with numbered waypoints, X marks the spot | 4-6s |

### Interactive Animation Components (full-screen, simulated UI)

Mouse cursor, typing, clicking interactions for realistic UI demos.

| Type | Description | Duration |
|------|-------------|----------|
| `search_bar` | Search bar with cursor click, query typing, results appearing | 6-10s |
| `star_rating` | Stars fill one by one with glow + sparkle (supports 4.5) | 4-5s |
| `chat_bubbles` | iMessage/ChatGPT-style bubbles typing in one by one | 6-12s |
| `terminal` | Command line with typing commands + output appearing | 5-10s |
| `code_editor` | VS Code editor with code typing + syntax highlighting | 5-10s |
| `browser_mockup` | Chrome browser with URL typing + page loading | 5-8s |
| `pricing_card` | Pricing tier with features checking in + mouse click selection | 5-8s |
| `text_highlight` | Paragraph with mouse drag highlight + zoomed phrase | 5-8s |

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

**CRITICAL: Overlays ONLY on speaker_full/gradual_zoom/jump segments.** Never on slides, splits, or B-roll.
- `text_overlay` - text on speaker only
- `gif_overlay` - GIF meme on speaker only (never on split/slide layouts)
- Other overlays (lower_third, callout, confetti, etc.) - speaker only

**Technical note:** Overlay components are pure overlays (no speaker video). The underlying layout handles the speaker. This means overlays preserve the zoom level of whatever layout is underneath.

**Z-order note:** Timeline array order = render z-order. When multiple overlays share a timestamp (e.g., two gif_overlays + text_overlay), put text_overlay LAST so it renders on top of GIFs.

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

### CTA Rules

Every video MUST have two CTA moments:

**Mid-Roll CTA (~50% mark):**
- Place at natural topic break closest to 50% of total video duration
- 30-60s of speaker-focused content (`speaker_full`, `gradual_zoom`)
- Use `cta_overlay` with `style: "offer"` during speaker segments
- One `text_overlay` also allowed for the offer name
- NOT allowed during CTA: data viz, slides, splits, GIFs, B-roll

**End CTA (last 15-20s):**
- `speaker_full` or `gradual_zoom` only
- Optional `cta_overlay` with `style: "next_video"`
- No other graphics - YouTube end screen elements overlay this section

**Chapter Cards:**
- Use `chapter_card` between major topic sections (2-4s each)
- Speaker audio continues underneath
- Number prop for sequential chapter numbers (01, 02, 03...)

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

**Library:** `public/sfx/` - ship with editor, not per-video.

| Sound | Use Case |
|-------|----------|
| `boop` | Text overlay reveals, soft emphasis, gentle moments |
| `click` | Layout transitions to slides, UI-like moments |
| ~~`thud`~~ | **REMOVED** - too abrupt, use `boop` or `achievement-ding` instead |
| `achievement-ding` | Success moments, milestone reveals, surprise beats |
| `whoosh` | Fast transitions, speed emphasis |
| `shimmer` | Sparkle moments, premium/quality reveals |
| `bubble-pop` | Playful moments, list items appearing |
| `draw` | Excalidraw/whiteboard slide reveals |
| `enter` | Element entrances |
| `flipcard-count` | Counter/flipcard animations |
| `keyboard-typing` | Terminal/code editor typing |
| `ticking-fast` | Countdown/urgency moments |

**Rules:**
- Max **10-15 sfx per 10-min video** - sparse and deliberate
- **No click SFX on routine layout transitions** - only use for significant UI moments
- **Whoosh only at chapter transitions** - not every layout change
- **Minimum 10s between SFX** - never cluster multiple SFX within seconds of each other
- Default volume `0.5` (subtle) - never louder than `0.7`
- SFX edits **overlap** with visual edits (same timestamp is fine)
- Duration matches the sound file length (0.5-1s typical)
- **No thud** - removed from library (too abrupt). Use `boop` or `achievement-ding` instead
- **Component-embedded SFX must be quiet** - ComparisonTable, ConfettiBurst, etc. have auto-playing SFX. Keep these at `0.1-0.15` max. These stack with timeline SFX and bg music
- **screen_shake needs clear speech context** - only use when the speaker says something genuinely impactful. Random screen_shake is distracting

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

## Hook Pacing (First 60 Seconds) - CRITICAL

The first 60 seconds decide if viewers stay. Edit aggressively.

- **First 30s:** Max 5s per segment. Visual change every 3-5s. At least 1 text overlay + 1 jump zoom. No speaker-only stretches.
- **30-60s:** Max 7s per segment. Maintain variety.
- **Entire video:** No speaker-only stretch > 10s ANYWHERE. Break up with text overlays, gradual_zoom changes, or layout switches.

W11 lesson: First timeline had a 12s gradual_zoom in the hook and 15s+ speaker stretches throughout. Had to completely rebuild from 80 to 162 entries. Design this in from the start - don't rely on the validator to catch it after the fact.

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
│   │   ├── MainVideo.tsx        # Timeline renderer (57 layout types)
│   │   ├── backgrounds.tsx      # DarkGradientBg, MeshGradientBg, BlurredSpeakerBg
│   │   ├── premium-utils.ts     # Shared animation utilities (springs, glow, particles)
│   │   ├── # Core layouts
│   │   ├── SpeakerFull.tsx      # Full frame speaker
│   │   ├── SlideFull.tsx        # Full frame slide
│   │   ├── SplitLayout.tsx      # Split view with glass borders + squircle
│   │   ├── Split5050.tsx        # 50/50 full-bleed split (no borders)
│   │   ├── BrollFull.tsx        # Full-screen stock video B-roll
│   │   ├── JumpZoom.tsx         # Animated zoom
│   │   ├── JumpCut.tsx          # Instant zoom
│   │   ├── ZoomTransition.tsx   # Zoom across speaker↔slide cut
│   │   ├── GradualZoom.tsx      # Slow drift zoom
│   │   ├── GifOverlay.tsx       # GIF overlay on speaker
│   │   ├── GifFull.tsx          # Full-screen GIF
│   │   ├── TextOverlay.tsx      # Text on speaker
│   │   ├── # Speaker overlays
│   │   ├── NewspaperFlash.tsx    # Stacked newspaper clippings
│   │   ├── LowerThird.tsx       # Name/title bar
│   │   ├── CounterTicker.tsx    # Animated counting number
│   │   ├── SocialProofFlash.tsx # Stacked tweet/post cards
│   │   ├── CalloutAnnotation.tsx # Arrow + text label
│   │   ├── CheckXMark.tsx       # Green check / red X
│   │   ├── CircleTimer.tsx      # Countdown circle
│   │   ├── TextRevealWipe.tsx   # Clip-path text reveal
│   │   ├── ConfettiBurst.tsx    # Particle explosion
│   │   ├── ScreenShake.tsx      # Camera shake transform
│   │   ├── # Speaker effects
│   │   ├── GlitchEffect.tsx     # Digital distortion
│   │   ├── FreezeFrame.tsx      # Hold + desaturation
│   │   ├── LightLeakOverlay.tsx # Cinematic light leak
│   │   ├── KineticType.tsx      # Words one at a time
│   │   ├── DataVizSplit.tsx      # 50/50 wrapper for data viz + speaker
│   │   ├── # Full-screen data viz
│   │   ├── ComparisonTable.tsx  # Two-column comparison
│   │   ├── QuoteCard.tsx        # Stylized quote
│   │   ├── ProgressBars.tsx     # Horizontal stat bars
│   │   ├── TypewriterText.tsx   # Monospace typing
│   │   ├── BarChart.tsx         # Vertical bar chart
│   │   ├── LineChart.tsx        # SVG line chart
│   │   ├── BulletList.tsx       # Animated checklist
│   │   ├── StatCards.tsx        # Metric cards grid
│   │   ├── PieChart.tsx         # Animated pie/donut
│   │   ├── FlowDiagram.tsx      # Linear node flow
│   │   ├── TreasureMap.tsx      # Winding path + X marks spot
│   │   ├── ChapterCard.tsx     # Animated chapter title card
│   │   ├── CtaOverlay.tsx      # CTA overlay (offer/subscribe/next_video)
│   │   ├── # Interactive animation components
│   │   ├── SearchBar.tsx       # Search engine query + results demo
│   │   ├── StarRating.tsx      # Animated star rating with sparkle
│   │   ├── ChatBubbles.tsx     # iMessage/ChatGPT conversation
│   │   ├── Terminal.tsx        # Command line typing + output
│   │   ├── CodeEditor.tsx      # VS Code editor with syntax highlighting
│   │   ├── BrowserMockup.tsx   # Chrome browser with page loading
│   │   ├── ToggleSwitch.tsx    # iOS toggle with spring flip
│   │   ├── NotificationStack.tsx # iOS notification cards
│   │   ├── PricingCard.tsx     # Pricing card with mouse click
│   │   ├── CountdownFlip.tsx   # Airport flip-clock countdown
│   │   └── TextHighlight.tsx   # Mouse drag highlight + zoom
│   ├── types/
│   │   └── timeline.ts          # TypeScript types
│   ├── Root.tsx
│   └── index.ts
├── public/
│   ├── grid-loop.mp4
│   ├── grid-loop-proxy.mp4  # 720p proxy (generated via npm run proxy)
│   ├── speaker.mp4
│   ├── speaker-proxy.mp4    # 720p proxy (generated via npm run proxy)
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

## Studio Preview Setup

To preview a video in Remotion Studio, copy all assets to `public/`:

```bash
# Copy from production dir to public/
cp <video_dir>/video/speaker-clean.mp4 public/speaker.mp4
cp -r <video_dir>/slides/ public/slides/
cp -r <video_dir>/gifs/ public/gifs/
cp -r <video_dir>/video/broll/ public/broll/
cp <video_dir>/video/timeline.json public/timeline.json

# Generate proxy for smooth preview
ffmpeg -y -i public/speaker.mp4 -vf "scale=960:540" -c:v libx264 -preset fast -crf 28 -c:a aac -b:a 64k public/speaker-proxy.mp4
```

**Timeline editing:** `public/timeline.json` is the single working copy during Studio preview. Edit ONLY this file - never the source `video/timeline.json` separately. `render.ts` auto-syncs public → source before rendering.

**Timeline paths:** Content paths must be relative to `public/` (e.g., `broll/file.mp4` not `video/broll/file.mp4`). The `render.ts` script remaps paths automatically at render time, but Studio reads them as-is.

**Auto-reload timeline:** The timeline is imported directly from `public/timeline.json` via Vite. Changes to the file trigger HMR auto-reload in Studio - no manual refresh needed. Props are also editable in the Studio sidebar via Zod schema.

**Config:** `remotion.config.ts` sets `setMaxTimelineTracks(200)` for videos with 100+ timeline entries.

**Speaker crop fix:** If the speaker is off-center, crop with ffmpeg (not in Remotion):
```bash
# Shift 120px right: crop right edge, proportional Y to keep 16:9, scale back
ffmpeg -y -i speaker-clean.mp4 -vf "crop=3720:2092:0:34,scale=3840:2160" -c:a copy speaker-shifted.mp4
```

## Render Settings

| Setting | Value |
|---------|-------|
| Resolution | 3840x2160 (4K) |
| FPS | 30 |
| Codec | H.264 (VideoToolbox hardware encoder on Mac) |
| Format | MP4 |
| Bitrate | 35 Mbps |
| Concurrency | 12 (M3 Max P-cores) |
| GL renderer | ANGLE (Metal GPU on Apple Silicon) |
| Video cache | 512MB offthread cache |

### Render Commands

```bash
# Full 4K production render
npx ts-node render.ts ../../youtube/weekly-production/2026-w09-claude-code-use-cases

# Quick test render (first 30s, 1080p, 10Mbps) - ~4x faster
npx ts-node render.ts ../../youtube/weekly-production/2026-w09-claude-code-use-cases --test
```

**Test mode (`--test`):** Renders first 30s at 1080p (half scale) with 10Mbps bitrate and 8 threads. Use for spot-checking sections without waiting for full 4K.
