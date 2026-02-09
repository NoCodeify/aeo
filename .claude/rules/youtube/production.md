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

**Location:** `youtube/system/aeo-keyword-data.md`

All content decisions MUST reference this file:
- Video titles must contain target keyword
- Search volume prioritizes growing terms (+900% YoY)
- CPC high = commercial intent

**Key Terms (Jan 2026):**

| Keyword | Volume | Growth |
|---------|--------|--------|
| answer engine optimization | 1K-10K | +900% |
| ai search optimization | 1K-10K | +9,900% |
| rank in chatgpt | 10-100 | +inf |
| seo vs geo | 1K-10K | +900% |

## Quick Start

1. **Select keyword**: Check `youtube/system/aeo-keyword-data.md`
2. **Create brief**: Use `youtube/templates/video-brief-template.md`
3. **Write script**: `/youtube-script-writer` skill
4. **Generate B-roll**: `/broll-prompting` skill
5. **Find GIFs**: `/gif-search` skill
6. **Generate timeline**: `/video-timeline` skill
7. **Full pipeline**: `/video-produce` (agent team)

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
| answer engine optimization | "Answer Engine Optimization: Complete Guide 2026" |
| rank in chatgpt | "How to Rank in ChatGPT (Step-by-Step)" |
| seo vs geo | "SEO vs GEO: What Actually Matters in 2026" |

**The 1+1=3 Rule:** Title = search keyword. Thumbnail = emotional reaction (NOT repeating title words).

**Thumbnail Workflow:**
1. Extract freeze frame from video (correct expression)
2. Run through Imagen - adds text, effects, color grade ON TOP
3. Result: Cinematic, professional thumbnail

**Thumbnail Style:**
- Text: Heavy stroke (4-6px black), drop shadow, outer glow
- Color grade: Crush blacks to navy, add contrast/vignette
- Layout: You on right 40%, text upper-left, visual metaphor as accent
- Full specs: `youtube/templates/thumbnail-style-guide.md`

## Origin Story

> "I was on my second BMW. Going to buy another one. Asked ChatGPT for advice. It convinced me to buy a Porsche Boxster instead. If AI can change MY buying decision, what's it doing to my clients' businesses?"
