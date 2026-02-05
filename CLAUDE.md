# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository contains the AEO (Answer Engine Optimization) Protocol toolkit:
- **aeo-protocol-sop.md** — Internal strategy document for LLM search optimization
- **aeo-audit-mcp/** — MCP server for running AEO audits across ChatGPT, Gemini, and Google
- **seo-agent-mcp/** — MCP server for DataForSEO API (keyword research, competitor analysis, content gaps)
- **imagen-mcp/** — MCP server for AI image generation using Gemini
- **tools/video-editor-remotion/** — React-based video editor for YouTube content (WIP)

## Build & Run Commands

```bash
# Build the AEO Audit MCP server
cd aeo-audit-mcp && npm run build

# Build the SEO Agent MCP server
cd seo-agent-mcp && npm run build

# Build the Imagen MCP server
cd imagen-mcp && npm run build

# Run in development mode
cd aeo-audit-mcp && npm run dev
cd seo-agent-mcp && npm run dev
cd imagen-mcp && npm run dev

# Start the MCP servers
cd aeo-audit-mcp && npm start
cd seo-agent-mcp && npm start
cd imagen-mcp && npm start
```

## MCP Server Architecture

The MCP server (`aeo-audit-mcp/src/index.ts`) queries three search backends:

| Function | Backend | API |
|----------|---------|-----|
| `queryChatGPT()` | Bing (via OpenAI) | OpenAI Responses API (gpt-5-chat-latest + web_search) |
| `queryGemini()` | Google Grounding | Google GenAI (gemini-3-flash-preview + googleSearch) |
| `queryGoogle()` | Google SERP | ScrapingBee (organic results + AI Overview) |

> **Note:** ChatGPT's web search is powered by Bing. Ranking #1 on Bing for a query correlates strongly with ChatGPT visibility for that query.

**Exposed MCP Tools:**
- `query_chatgpt` / `query_gemini` / `query_google` — Individual engine queries
- `compare_llms` — Same query across all 3 engines
- `run_brand_audit` — Full 8-query audit with analysis summary
- `get_audit_queries` — Suggested audit queries for a brand
- `run_consistency_test` — Run a query 10x in parallel, check brand mention rate

## SEO Agent MCP Server

The SEO Agent MCP server (`seo-agent-mcp/src/index.ts`) provides DataForSEO API access:

**Exposed MCP Tools:**
| Tool | Purpose |
|------|---------|
| `ranked_keywords` | Get all keywords a domain ranks for |
| `find_competitors` | Find domains competing for same keywords |
| `keyword_gap` | Find keywords competitor has that you don't |
| `keyword_overview` | Bulk check volume/difficulty for keywords |
| `get_locations` | List available location/language codes |

**Key Features:**
- Auto-detects location/language from TLD (.com → US, .co.uk → UK, etc.)
- Returns clean, transformed data (not raw API response)
- Handles errors gracefully

## Imagen MCP Server

The Imagen MCP server (`imagen-mcp/src/index.ts`) generates AI images using Gemini's image generation model:

**Exposed MCP Tools:**
| Tool | Purpose |
|------|---------|
| `generate_images` | Generate an image from a prompt |
| `batch_generate_images` | Generate images for multiple prompts in sequence |
| `generate_broll_from_file` | Parse a broll-prompts.md file and generate all images |

**Key Features:**
- Saves images to specified output directory
- Supports batch generation from markdown prompt files
- Uses Gemini's `gemini-3-pro-image-preview` model at 4K resolution

**Usage Example:**
```
Generate images for the 3-layer diagram from the b-roll prompts file
```

## Environment Variables

Required in `.env` or MCP config:
- `OPENAI_API_KEY` — OpenAI API key with web search access
- `GEMINI_API_KEY` — Google AI API key
- `SCRAPINGBEE_API_KEY` — ScrapingBee API key
- `DATAFORSEO_LOGIN` — DataForSEO API login
- `DATAFORSEO_PASSWORD` — DataForSEO API password

## AEO Protocol Reference

**CRITICAL RULE: Always read the protocol BEFORE running any AEO audit or optimization task.**

The SOP document (`aeo-protocol-sop.md`) is the source of truth. Key sections:

| Lines | Content |
|-------|---------|
| 1-200 | Core methodology |
| 850-900 | **First 50 Words Audit** (CRITICAL - every key page needs WHO/WHAT/WHERE/PRICE in first 50 words) |
| 1200-1300 | Content gap analysis |
| 2703-2770 | **Client Intake Questionnaire** (CRITICAL - collect dream queries before audit) |
| 2861-2947 | **Audit to Playbook Conversion** (CRITICAL - every audit must produce a playbook) |
| 2950-2970 | Implementation checklist |
| 3348-3432 | **10-Run Consistency Test** (CRITICAL - run each key query 10 times per LLM) |
| 3370-3393 | **Custom Client Queries** (dream queries beyond standard set) |
| 3500+ | Final implementation checklist |

The protocol contains methodology for:
- LLM retrieval architecture (ChatGPT 3-layer cache, Gemini grounding)
- Technical requirements (robots.txt, SSR, Schema.org)
- Content strategy for LLM extraction
- Trust validation and entity establishment
- Cache forcing and monitoring techniques
- **Client Intake Questionnaire** (collect dream queries + brand facts before audit)
- **First 50 Words Rule** (every page needs WHO/WHAT/WHERE/PRICE)
- **10-Run Consistency Test** (LLM responses vary - must test 10x per query)
- **Custom Client Queries** (dream queries beyond standard set)
- **Advanced Tracking** (position, citations, accuracy, sentiment per run)

## Skills (Auto-Invoked by Claude)

Skills are specialized knowledge modules that Claude automatically activates when relevant.

### AEO Skills
| Skill | Location | Triggers On |
|-------|----------|-------------|
| `aeo-audit` | `.claude/skills/aeo-audit/` | "audit", "LLM visibility", "ChatGPT mentions" |
| `forum-research` | `.claude/skills/forum-research/` | "competitors", "Reddit", "forum research" |
| `premium-aeo` | `.claude/skills/premium-aeo/` | "premium brand", "luxury", "HNWI" |
| `sitemap-audit` | `.claude/skills/sitemap-audit/` | "sitemap", "site structure", "URL audit", "migration" |
| `website-copywriting` | `.claude/skills/website-copywriting/` | "write copy", "page content", "rewrite page", "create page" |
| `image-generation` | `.claude/skills/image-generation/` | "generate image", "image prompt", "infographic", "diagram", "icon set" |
| `content-strategist` | `.claude/skills/content-strategist/` | "content strategy", "what content", "content plan", "data study", "keyword research", "terms to own", "content audit" |
| `linkedin-content` | `.claude/skills/linkedin-content/` | "LinkedIn post", "LinkedIn banner", "LinkedIn profile", "write a post", "LinkedIn content" |
| `client-report` | `.claude/skills/client-report/` | "client report", "generate report", "visibility report", "create report", "report for client" |
| `aeo-site-content` | `.claude/skills/aeo-site-content/` | "write page for aeoprotocol", "create site content", "add page to aeo site" |

### YouTube Skills (Search-First + Stakes-Based)
| Skill | Location | Triggers On |
|-------|----------|-------------|
| `youtube-script-writer` | `.claude/skills/youtube-script-writer/` | "write script", "video script" - search-first opening, stakes structure, mid-video climax |
| `youtube-video-ideation` | `.claude/skills/youtube-video-ideation/` | "video idea", "title", "thumbnail" - keyword targeting, 1+1=3 thumbnails |
| `youtube-video-editor` | `.claude/skills/youtube-video-editor/` | "editing guide", "retention edit", "thumbnail tournament" |
| `excalidraw-slides` | `.claude/skills/excalidraw-slides/` | "slides", "whiteboard", "excalidraw", "diagram" - Hormozi-style hand-drawn visuals |
| `broll-prompting` | `.claude/skills/broll-prompting/` | "b-roll", "broll", "video visuals", "imagen for video" |
| `gif-search` | `.claude/skills/gif-search/` | "gif", "reaction gif", "meme", "retention beat" |

### Usage
Skills activate automatically. Just ask naturally:
- "Audit this brand for AEO"
- "Find real competitors via Reddit"
- "Optimize this copy for a premium brand"
- "Audit the sitemap for issues"
- "Write copy for the homepage"
- "Create a comparison page"
- "Generate image prompts for the website"
- "What content should we create for [brand]?"
- "Find zero-volume keywords for [brand]"
- "Plan a data study for [brand]"
- "Generate a client report for [brand]"
- "Write a LinkedIn post about [topic]"
- "Design a LinkedIn banner"
- "Optimize my LinkedIn profile"

## Subagents (Specialized Assistants)

Subagents are specialized AI assistants with their own context and tool access.

### AEO Agents
| Agent | Model | Purpose |
|-------|-------|---------|
| `aeo-auditor` | inherit | Full AEO audits with MCP tools **(reads protocol first)** |
| `playbook-creator` | inherit | Converts audits into executable playbooks |
| `competitor-researcher` | inherit | Forum-based competitor discovery |
| `content-optimizer` | inherit | Website copy optimization for LLM extraction |
| `image-prompter` | inherit | Generate AI image prompts for website assets |
| `report-generator` | inherit | Generate client-friendly AI visibility reports from audit data |
| `aeo-site-writer` | inherit | Write content pages for aeoprotocol.ai (React TSX components) |

**AEO Workflow:**
1. **Intake** → Collect brand info + dream queries (see protocol lines 2703-2770)
2. **Audit** → Run `aeo-auditor` agent (10-run consistency test)
3. **Playbook** → Run `playbook-creator` agent to convert audit → actions
4. **Execute** → Implement playbook week by week
5. **Monitor** → Weekly consistency checks, monthly re-audits

**Note:** The `aeo-auditor` agent MUST read `aeo-protocol-sop.md` before running any audit. This includes the First 50 Words check and 10-run consistency test.

### YouTube Agents
| Agent | Model | Purpose |
|-------|-------|---------|
| `video-timeline` | inherit | Generate timeline.json from script/prompter for video editor |
| `slide-prompter` | inherit | Generate Excalidraw-style whiteboard slides (Hormozi look) |
| `thumbnail-prompter` | inherit | Transform freeze frames into professional thumbnails (text effects, color grade, visual elements) |
| `broll-prompter` | inherit | Generate Imagen prompts for video B-roll (premium dark style) |
| `gif-researcher` | inherit | Generate Giphy/Tenor search queries for GIFs |

### Usage
```
Use the aeo-auditor agent to audit [brand]
Use the competitor-researcher agent to find real competitors for [brand]
Use the content-optimizer agent to rewrite the homepage for AEO
Use the thumbnail-prompter agent to generate thumbnail concepts for [video]
Use the broll-prompter agent to generate B-roll prompts for [script]
Use the gif-researcher agent to find GIFs for [script]
Use the video-timeline agent to generate timeline.json for [video]
Use the report-generator agent to create a client report for [brand]
Use the aeo-site-writer agent to write the /aeo-vs-seo page
```

### Agent Files
Located in `.claude/agents/`:
- `aeo-auditor.md` — Comprehensive audit workflow (10-run testing, first 50 words)
- `playbook-creator.md` — Converts audits into executable playbooks
- `competitor-researcher.md` — Reddit/forum research methodology
- `content-optimizer.md` — Content optimization patterns
- `image-prompter.md` — AI image prompt generation for Imagen
- `video-timeline.md` — Generate timeline.json for video editor from script/prompter
- `slide-prompter.md` — Excalidraw-style whiteboard slides for videos (Hormozi look)
- `thumbnail-prompter.md` — YouTube thumbnail concepts + Imagen prompts (tournament selection)
- `broll-prompter.md` — Video B-roll prompt generation for Imagen (premium dark style)
- `gif-researcher.md` — GIF search query generation for Giphy/Tenor
- `report-generator.md` — Client-friendly AI visibility report generation
- `aeo-site-writer.md` — AEO Protocol site content pages (React TSX)

## Project Files

| File | Purpose |
|------|---------|
| `aeo-protocol-sop.md` | Master AEO methodology (v1.3) |

### Client Projects

Client-specific files are organized in `clients/[client-name]/`:

```
clients/
└── fuegenix/
    ├── fuegenix-aeo-audit.md      # Audit report
    ├── fuegenix-aeo-playbook.md   # Implementation playbook
    ├── fuegenix-website-copy.md   # Website copy index
    └── pages/                      # Individual page copy files
        ├── homepage.md
        ├── hair-transplant.md
        ├── the-team.md
        ├── costs.md
        ├── experiences.md
        ├── before-and-after.md
        ├── art-gallery.md
        ├── contact.md
        ├── vs-zarev.md
        ├── vs-konior.md
        ├── vs-feriduni.md
        ├── vs-bisanga.md
        └── vs-couto.md
```

## Quick Start

**Before any AEO task:** Read `aeo-protocol-sop.md` (especially lines 850-900 for First 50 Words)

### Full AEO Workflow
1. **Intake**: Collect brand info + 5 dream queries (protocol lines 2703-2770)
2. **Audit**: "Audit [brand] for AEO visibility" (10-run consistency test)
3. **Playbook**: "Create playbook from the audit" (converts findings → actions)
4. **Execute**: Implement playbook actions week by week
5. **Monitor**: Weekly consistency checks, monthly re-audits

### Individual Tasks
- **Find competitors**: "Research [brand]'s real competitors on Reddit"
- **Optimize content**: "Optimize [brand]'s homepage for LLM extraction"
- **Compare engines**: Use `compare_llms` MCP tool with any query
- **Write copy**: "Write copy for [brand]'s homepage" (checks sitemap first)
- **Plan content strategy**: "What content should [brand] create?" (uses content-strategist skill)
- **SEO Analysis**: "Analyze SEO opportunities for [domain]" (uses seo-agent-mcp tools)
- **Keyword Gap**: "Find keywords [competitor] ranks for that [brand] doesn't"

## YouTube Content Production

The `youtube/` folder contains the video production framework (Ed Lawrence method).

### YouTube Structure
```
youtube/
├── templates/           # Production templates
│   ├── video-brief-template.md
│   ├── script-template.md
│   ├── prompter-template.txt
│   ├── shot-list-template.md
│   ├── editing-guide-template.md
│   ├── work-log-template.md
│   ├── brain-dump-template.md
│   └── thumbnail-style-guide.md  # Brand colors, layout, text rules
├── system/              # SOPs and topic bank
│   ├── production-sop.md
│   ├── aeo-video-topics.md
│   └── aeo-keyword-data.md      # KEYWORD SOURCE OF TRUTH
├── stories/             # Story inventory (146+ stories)
│   └── inventory/
├── weekly-production/   # Active video production
└── published-videos/    # Completed archives
```

### Keyword Data (Source of Truth)
**Location:** `youtube/system/aeo-keyword-data.md`

All content decisions MUST reference this file:
- Video titles → must contain target keyword
- Search volume → prioritize growing terms (+900% YoY)
- CPC → high CPC = commercial intent

**Key Terms (Jan 2026):**
| Keyword | Volume | Growth |
|---------|--------|--------|
| answer engine optimization | 1K-10K | +900% |
| ai search optimization | 1K-10K | +9,900% |
| rank in chatgpt | 10-100 | +∞ |
| seo vs geo | 1K-10K | +900% |

### YouTube Quick Start

1. **Select keyword**: Check `youtube/system/aeo-keyword-data.md` for target terms
2. **Create brief**: Use `youtube/templates/video-brief-template.md`
3. **Write script**: "Write a script for [keyword]" (uses youtube-script-writer skill)
4. **Generate B-roll**: "Generate B-roll prompts for this script" (uses broll-prompter agent)
5. **Find GIFs**: "Find GIFs for this script" (uses gif-researcher agent)

### Key YouTube Principles (Search-First Strategy)

- **Keyword first** - Select from aeo-keyword-data.md BEFORE writing
- **Search-optimized titles** - Keyword in first 5 words
- **Answer query in 30 seconds** - Satisfy search intent immediately
- **Stakes-based structure** - Order by urgency, not logic
- **Mid-video climax** - "Holy shit" moment at 7-9 minutes
- **Show, don't explain** - Delete 40% of explanations
- **1+1=3 rule** - Title and thumbnail COMPLEMENT, don't repeat
- **Video-to-video CTA** - No external links, point to next video

### Title & Thumbnail Rules (CRITICAL FOR CTR)

**Search-First Titles:** Target keywords people actually search for. The AEO category is exploding (+900% YoY).

| Target Keyword | Search-Optimized Title |
|----------------|----------------------|
| answer engine optimization | "Answer Engine Optimization: Complete Guide 2026" |
| rank in chatgpt | "How to Rank in ChatGPT (Step-by-Step)" |
| seo vs geo | "SEO vs GEO: What Actually Matters in 2026" |

**The 1+1=3 Rule:** Title and thumbnail must COMPLEMENT, not repeat.
- Title = targets the search keyword
- Thumbnail = creates emotional reaction (does NOT repeat title words)

**Thumbnail Workflow:**
1. Extract freeze frame from video (with correct expression)
2. Run through Imagen - adds text, effects, color grade ON TOP of freeze frame
3. Result: Cinematic, professional thumbnail

**Thumbnail Style:**
- Text: Heavy stroke (4-6px black), drop shadow, outer glow - NOT flat amateur text
- Color grade: Crush blacks to navy, add contrast/vignette - NOT raw footage
- Layout: You on right 40%, text upper-left, visual metaphor as accent
- See `youtube/templates/thumbnail-style-guide.md` for full specs

### Origin Story
> "I was on my second BMW. Going to buy another one. Asked ChatGPT for advice. It convinced me to buy a Porsche Boxster instead. If AI can change MY buying decision, what's it doing to my clients' businesses?"

---

## Website Copywriting Rules

When writing website copy, ALWAYS:

1. **Check sitemap first** - Never create imaginary URLs
2. **No em dashes (—)** - Triggers AI detection paranoia
3. **Single-line backticks** - Multi-line blocks break CMS copy-paste
4. **Headline + Subheadline** - Every section needs both
5. **Minimum 500 words** - No thin pages
6. **Include meta tags** - Title (60 chars) + Meta (155 chars)
7. **Edit, don't delete** - When asked to improve, don't rm -rf
8. **Reference playbook** - Check existing docs before writing
