# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Overview

AEO (Answer Engine Optimization) Protocol toolkit: consulting methodology, MCP servers, YouTube production, and client delivery.

- `aeo-protocol-sop.md` - Master AEO methodology (3500+ lines, source of truth)
- `aeo-audit-mcp/` / `seo-agent-mcp/` / `imagen-mcp/` / `giphy-mcp/` / `pexels-mcp/` / `scrapingbee-mcp/` / `trend-scanner-mcp/` - MCP servers
- `tools/video-editor-remotion/` - React-based video editor (Remotion)
- `youtube/` - Video production framework
- `clients/` - Client project files
- `systems/` - SaaS spec, business strategy, SOPs

## Build & Run Commands

```bash
# Build any MCP server
cd [server]-mcp && npm run build

# Dev mode
cd [server]-mcp && npm run dev

# Servers: aeo-audit-mcp, seo-agent-mcp, imagen-mcp, giphy-mcp, pexels-mcp, scrapingbee-mcp, trend-scanner-mcp
```

## Environment Variables

Required in `.env` or MCP config:
- `OPENAI_API_KEY` - OpenAI API key with web search access
- `GEMINI_API_KEY` - Google AI API key
- `SCRAPINGBEE_API_KEY` - ScrapingBee API key
- `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` - DataForSEO credentials
- `GIPHY_API_KEY` - Giphy API key
- `PEXELS_API_KEY` - Pexels API key
- `ASSEMBLYAI_API_KEY` - AssemblyAI API key (filler detection enabled)

## Critical Rules

1. **Always read `aeo-protocol-sop.md` BEFORE any AEO audit or optimization task**
2. **Always render video at 4K (3840x2160) with 35Mbps bitrate**
3. **Always use dedicated skills/agents for tasks** - don't do manually what a skill/agent is built for

## Modular Rules (`.claude/rules/`)

Domain-specific rules load automatically based on what files you're working with:

| Rule | Path scope | Content |
|------|-----------|---------|
| `aeo/methodology.md` | Always | AEO protocol reference, workflow, first-50-words |
| `aeo/mcp-servers.md` | Always | MCP server architecture, tools, backends |
| `youtube/production.md` | `youtube/**` | Keyword data, title/thumbnail rules, search-first strategy |
| `youtube/video-editing.md` | `tools/video-editor-remotion/**` | 4K render, layouts, timeline, autocut |
| `saas/decisions.md` | `systems/**` | D1-D59 decisions, tech stack, pricing |
| `clients/workflow.md` | `clients/**` | Client structure, delivery pipeline, templates |
| `website/copywriting.md` | Always | Copy rules: sitemap first, no em dashes, 500+ words |

## Skills (invoke with `/name`)

### Auto-triggering (Claude loads when relevant)
| Skill | Triggers on |
|-------|------------|
| `/aeo-audit` | "audit", "LLM visibility", "ChatGPT mentions" |
| `/premium-aeo` | "premium brand", "luxury", "HNWI" |
| `/sitemap-audit` | "sitemap", "site structure" |
| `/website-copywriting` | "write copy", "page content" |
| `/content-strategist` | "content strategy", "keyword research" |
| `/youtube-script-writer` | "write script", "video script" |
| `/youtube-video-ideation` | "video idea", "title", "thumbnail" |
| `/youtube-video-editor` | "editing guide", "retention edit" |

### Manual-only (invoke explicitly with `/name`)
| Skill | Purpose | Delegates to agent |
|-------|---------|-------------------|
| `/broll-prompting` | B-roll image prompts | broll-prompter |
| `/gif-search` | GIF search + download | gif-researcher |
| `/excalidraw-slides` | Whiteboard slides | slide-prompter |
| `/image-generation` | Website image prompts | image-prompter |
| `/client-report` | Client visibility report | report-generator |
| `/forum-research` | Reddit/forum competitor research | competitor-researcher |
| `/auto-cutter` | Intelligent silence removal | auto-cutter |
| `/thumbnail` | YouTube thumbnails | thumbnail-prompter |
| `/playbook` | Audit to playbook conversion | playbook-creator |
| `/optimize-content` | Content optimization for LLMs | content-optimizer |
| `/aeo-site-page` | AEO Protocol site pages | aeo-site-writer |
| `/linkedin-content` | LinkedIn posts/banners | (inline) |

### Pipeline Skills (agent teams)
| Skill | Purpose |
|-------|---------|
| `/video-timeline` | Generate + validate timeline.json (builder + validator team, max 3 rounds) |
| `/video-produce` | Full video pipeline: visuals + GIFs + timeline (parallel workers, persistent context) |
| `/aeo-deliver` | Full client delivery: audit + playbook + content + report (sequential, persistent context) |

## Agents (`.claude/agents/`)

14 specialized agents with isolated context, tool restrictions, and MCP access. Skills delegate to agents via `context: fork`. See individual agent files for full system prompts.
