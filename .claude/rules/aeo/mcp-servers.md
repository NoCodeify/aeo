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

| Function | Endpoint | Purpose |
|----------|----------|---------|
| `getRankedKeywords()` | Labs: `ranked_keywords/live` | All keywords a domain ranks for |
| `findCompetitors()` | Labs: `competitors_domain/live` | Domains competing for same keywords |
| `getKeywordGap()` | Labs: `domain_intersection/live` | Keywords competitor has but you don't |
| `getKeywordOverview()` | Labs: `keyword_overview/live` | Bulk volume/difficulty/CPC check |
| `googleTrendsExplore()` | Keyword Data: `google_trends/explore/live` | Google Trends with YouTube support |
| `dataforseoTrendsExplore()` | Keyword Data: `dataforseo_trends/explore/live` | Proprietary trend data (web/news/ecommerce) |

> `google_trends_explore` with `type: "youtube"` is the key tool for YouTube video ideation. Returns trend graphs, related topics, and rising queries for YouTube search.

**Tools:** `ranked_keywords`, `find_competitors`, `keyword_gap`, `keyword_overview`, `get_locations`, `google_trends_explore`, `dataforseo_trends_explore`

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

## ScrapingBee MCP (`scrapingbee-mcp/src/index.ts`)

Web fetch fallback and Google Search via ScrapingBee. Use when built-in WebFetch fails on JS-heavy or bot-protected sites.

| Function | Endpoint | Purpose |
|----------|----------|---------|
| `fetchUrl()` | HTML API (`/api/v1/`) | Headless browser fetch with proxy rotation |
| `searchGoogle()` | Google API (`/api/v1/google`) | Structured SERP with AI Overview, PAA |
| `screenshotUrl()` | HTML API (screenshot mode) | Full-page PNG screenshots |
| `checkUsage()` | Usage API (`/api/v1/usage`) | Credit balance check |

> Credit costs: 1 (no JS) / 5 (JS render) / 10 (premium proxy) / 25 (premium + JS)

**Tools:** `fetch_url`, `search_google`, `screenshot_url`, `check_usage`

## Trend Scanner MCP (`trend-scanner-mcp/src/index.ts`)

Monitors 3 trend sources for emerging AI/agent topics before they peak on YouTube.

| Function | Source | API |
|----------|--------|-----|
| `scanGitHubTrending()` | GitHub Trending | GitHub Search API (free, 60 req/hr) |
| `scanHackerNews()` | Hacker News | Firebase REST API (free, no auth) |
| `scanRedditTrending()` | Reddit | Public JSON API (free, User-Agent required) |
| `scanAllSources()` | All 3 in parallel | Promise.allSettled + cross-source dedup |

> Signal chain: GitHub stars spike -> HN front page -> Reddit hot -> YouTube content wave. This server catches stages 1-3.

**Tools:** `scan_github_trending`, `scan_hackernews`, `scan_reddit_trending`, `scan_all_sources`
