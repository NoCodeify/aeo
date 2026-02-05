# Video Editor for Claude Code

Render talking head videos with slides/b-roll overlays using MoviePy.

## Quick Start

```bash
cd tools/video-editor
source venv/bin/activate

# Render video from timeline
python -c "
from editor import render_video
import json

with open('timeline.json') as f:
    edits = json.load(f)

render_video('speaker.mp4', edits, 'output.mp4')
"
```

## Layouts

| Type | Description | Required Fields |
|------|-------------|-----------------|
| `speaker_full` | Speaker fills entire frame | start, end |
| `slide_full` | Slide fills frame (speaker audio continues) | start, end, content |
| `split_right` | Grid bg + slide left ~80%, speaker right ~20% | start, end, content |
| `split_left` | Grid bg + speaker left ~20%, slide right ~80% | start, end, content |
| `jump_zoom_in` | Animated 0.25s zoom punch (15-25%) | start, end, zoom |
| `jump_zoom_out` | Animated 0.25s zoom back to normal | start, end |
| `gradual_zoom` | Slow drift zoom over segment | start, end, zoom_start, zoom_end, direction |

## Layout Distribution (Typical Video)

- **split_right**: 60-70% (default teaching layout)
- **speaker_full**: 15-20% (hook, transitions, emphasis)
- **slide_full**: 5-10% (CTA, important diagrams)
- **jump_zoom_in/out**: 3-5% (strategic emphasis)

## Timeline Format

```json
[
  {"type": "speaker_full", "start": 0, "end": 3.0},
  {"type": "split_right", "start": 3.0, "end": 25.0, "content": "slides/slide-01.jpg"},
  {"type": "jump_zoom_in", "start": 25.0, "end": 26.5, "zoom": 1.20},
  {"type": "jump_zoom_out", "start": 26.5, "end": 28.0},
  {"type": "split_right", "start": 28.0, "end": 45.0, "content": "slides/slide-02.jpg"},
  {"type": "slide_full", "start": 45.0, "end": 50.0, "content": "slides/slide-cta.jpg"}
]
```

## Zoom Guidelines

**Minimum 10% Rule:** All zooms must be at least 10% to be noticeable.

| Zoom Type | Amount | Use Case |
|-----------|--------|----------|
| Jump zoom | 1.15-1.25 | Key reveals, powerful statements |
| Gradual zoom in | 1.10-1.15 | Energy, excitement |
| Gradual zoom out | 1.10-1.15 | Calm, reflective |

## Split Layout Details

The split layout uses:
- Background: `/Users/sohaib/Downloads/grid.png`
- Speaker: 3:4 portrait aspect ratio, ~20% screen width
- Glass borders with squircle corners on both elements
- Centered vertically

## Files

- `editor.py` - Rendering primitives (MoviePy 2.x)
- `generate_timeline.py` - Matches prompter to SRT → timeline (legacy)
- `srt_parser.py` - Parses subtitle files
- `schema.py` - Validates timeline format

## Usage with Agent

Use the `video-timeline` agent to generate timeline.json from a script:

```
Use the video-timeline agent to generate timeline.json for the w08 video
```
