# MCP Server Architecture

## AEO Audit MCP (`aeo-audit-mcp/src/index.ts`)

Queries three search backends:

| Function | Backend | API |
|----------|---------|-----|
| `queryChatGPT()` | Bing (via OpenAI) | OpenAI Responses API (gpt-5-chat-latest + web_search) |
| `queryGemini()` | Google Grounding | Google GenAI (gemini-3-flash-preview + googleSearch) |
| `queryGoogle()` | Google SERP | ScrapingBee (organic results + AI Overview) |

> ChatGPT's web search is powered by Bing. Ranking #1 on Bing correlates strongly with ChatGPT visibility.

**Tools:** `query_chatgpt`, `query_gemini`, `query_google`, `compare_llms`, `run_brand_audit`, `get_audit_queries`, `run_consistency_test`

## SEO Agent MCP (`seo-agent-mcp/src/index.ts`)

DataForSEO API access. Auto-detects location/language from TLD.

**Tools:** `ranked_keywords`, `find_competitors`, `keyword_gap`, `keyword_overview`, `get_locations`

## Imagen MCP (`imagen-mcp/src/index.ts`)

AI image generation using Gemini (`gemini-3-pro-image-preview` at 4K).

**Tools:** `generate_images`, `batch_generate_images`, `generate_broll_from_file`

## Giphy MCP (`giphy-mcp/src/index.ts`)

GIF search and download. Content rating filter (G, PG, PG-13, R).

**Tools:** `search_gifs`, `download_gif`, `batch_search_and_download`, `trending_gifs`

**Pipeline:** Script -> gif-researcher (queries) -> giphy-mcp (search + download) -> Remotion (render)

## Pexels MCP (`pexels-mcp/src/index.ts`)

Stock video search and download. Free API (200 req/hr, 20k/month). HD/4K quality.

**Tools:** `search_videos`, `download_video`, `batch_search_and_download`

**Pipeline:** Script -> broll-prompter (search terms) -> pexels-mcp (search + download) -> Remotion (render)
