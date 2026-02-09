---
paths:
  - "tools/video-editor-remotion/**"
  - "test-video/**"
---

# Video Editing Rules

**ALWAYS render at 4K (3840x2160) with 35Mbps bitrate.** Never render at 1080p. Use `--video-bitrate=35M` flag.

## Video Editor (`tools/video-editor-remotion/`)

React-based Remotion video editor. See `tools/video-editor-remotion/CLAUDE.md` for full 498-line editing guide including layout types, zoom rules, timeline schema, and autocut workflow.

## Key Commands

```bash
# Render at 4K
cd tools/video-editor-remotion && npx remotion render src/index.ts MyComposition out/video.mp4 --video-bitrate=35M

# Transcribe (dual-pass: U3P + U2 with filler detection)
cd tools/video-editor-remotion && npx tsx transcribe.ts

# Auto-cut (intelligent silence/filler removal)
cd tools/video-editor-remotion && npx tsx autocut.ts
```

## Pipeline

1. Record raw footage
2. `/auto-cutter` - intelligent silence/filler removal
3. `/video-timeline` - generate timeline.json from script + transcript
4. Remotion render at 4K

## ALWAYS use dedicated agents for video tasks

- Video timelines: `/video-timeline` skill (forks to video-timeline agent)
- Auto-cut: `/auto-cutter` skill (forks to auto-cutter agent)
- B-roll prompts: `/broll-prompting` skill (forks to broll-prompter agent)
- GIF search: `/gif-search` skill (forks to gif-researcher agent)
- Slides: `/excalidraw-slides` skill (forks to slide-prompter agent)
- Thumbnails: `/thumbnail` skill (forks to thumbnail-prompter agent)
- Full pipeline: `/video-produce` skill (agent team)
