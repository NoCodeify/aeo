#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

// Environment
const GITHUB_API_BASE = "https://api.github.com";

// Default AI/agent keyword list for filtering
const DEFAULT_AI_KEYWORDS = [
  // Core AI
  "ai", "llm", "gpt", "claude", "gemini", "openai", "anthropic", "mistral",
  "deepseek", "llama", "qwen", "phi", "groq",
  // Agent/tool use
  "agent", "agentic", "mcp", "tool-use", "function-calling", "rag",
  "multi-agent", "swarm", "crew", "autogen",
  // Coding tools
  "copilot", "cursor", "windsurf", "cline", "aider", "codegen",
  "vibe coding", "vibe-coding", "claude code",
  // Infra
  "vector", "embedding", "fine-tune", "finetune", "lora", "qlora",
  "transformer", "diffusion", "inference", "quantization", "gguf",
  // Applications
  "chatbot", "assistant", "automation", "workflow", "n8n", "langchain",
  "llamaindex", "semantic", "knowledge-graph",
];

// Default subreddits for AI/agent trend monitoring
const DEFAULT_SUBREDDITS = [
  "ClaudeAI",
  "LocalLLaMA",
  "artificial",
  "MachineLearning",
  "selfhosted",
  "ChatGPT",
  "singularity",
  "StableDiffusion",
];

// --- Helper Functions ---

function matchesKeywords(text: string, keywords: string[]): string[] {
  const lower = text.toLowerCase();
  return keywords.filter((kw) => {
    // Word-boundary matching for short keywords to avoid false positives
    // e.g., "ai" should not match "email" or "said"
    if (kw.length <= 3) {
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      return regex.test(lower);
    }
    return lower.includes(kw.toLowerCase());
  });
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    let path = u.pathname.replace(/\/+$/, "").toLowerCase();
    // For GitHub repos, normalize to /owner/repo
    if (u.hostname === "github.com") {
      const parts = path.split("/").filter(Boolean);
      if (parts.length >= 2) {
        path = `/${parts[0]}/${parts[1]}`;
      }
    }
    return `${u.hostname}${path}`;
  } catch {
    return url.toLowerCase().replace(/\/+$/, "");
  }
}

// --- Core Scanner Functions ---

interface ScanGitHubParams {
  language?: string;
  since?: string;
  keywords?: string[];
  ai_only?: boolean;
}

async function scanGitHubTrending(params: ScanGitHubParams) {
  const since = params.since || "daily";
  const keywords = params.keywords || DEFAULT_AI_KEYWORDS;

  // Calculate date range based on 'since' parameter
  const now = new Date();
  const daysBack = since === "daily" ? 1 : since === "weekly" ? 7 : 30;
  const dateFrom = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  const dateStr = dateFrom.toISOString().split("T")[0];

  // GitHub Search API: find repos created recently with high star velocity
  // Also include repos pushed recently with significant stars
  let query = `created:>${dateStr} stars:>20`;
  if (params.language) {
    query += ` language:${params.language}`;
  }

  const headers: Record<string, string> = {
    "User-Agent": "trend-scanner-mcp/1.0",
    Accept: "application/vnd.github.v3+json",
  };

  const response = await axios.get(`${GITHUB_API_BASE}/search/repositories`, {
    params: {
      q: query,
      sort: "stars",
      order: "desc",
      per_page: 30,
    },
    headers,
    timeout: 15000,
  });

  const items = response.data?.items || [];

  const repos = items.map((item: Record<string, unknown>) => {
    const name = (item.full_name as string) || "";
    const description = (item.description as string) || "";
    const searchText = `${name} ${description} ${(item.topics as string[] || []).join(" ")}`.toLowerCase();
    const matched = matchesKeywords(searchText, keywords);

    return {
      source: "github" as const,
      title: name,
      url: (item.html_url as string) || "",
      description,
      language: (item.language as string) || "",
      score: (item.stargazers_count as number) || 0,
      forks: (item.forks_count as number) || 0,
      created_at: item.created_at,
      topics: item.topics || [],
      ai_relevant: matched.length > 0,
      matched_keywords: matched,
    };
  });

  const filtered = params.ai_only ? repos.filter((r: { ai_relevant: boolean }) => r.ai_relevant) : repos;
  return {
    source: "github_trending",
    since,
    language: params.language || null,
    date_range: `created after ${dateStr}`,
    total_repos: repos.length,
    ai_relevant_count: repos.filter((r: { ai_relevant: boolean }) => r.ai_relevant).length,
    repos: filtered,
  };
}

interface ScanHNParams {
  feed?: string;
  limit?: number;
  min_score?: number;
  keywords?: string[];
  ai_only?: boolean;
}

async function scanHackerNews(params: ScanHNParams) {
  const feed = params.feed || "top";
  const limit = Math.min(params.limit || 50, 100);
  const minScore = params.min_score ?? 10;
  const keywords = params.keywords || DEFAULT_AI_KEYWORDS;

  // Fetch story IDs
  const idsResponse = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${feed}stories.json`,
    { timeout: 10000 }
  );
  const storyIds: number[] = (idsResponse.data || []).slice(0, limit);

  // Fetch stories in batches of 10
  const stories: Array<Record<string, unknown>> = [];
  const BATCH_SIZE = 10;

  for (let i = 0; i < storyIds.length; i += BATCH_SIZE) {
    const batch = storyIds.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map((id) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { timeout: 5000 })
      )
    );

    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      const item = result.value.data;
      if (!item || item.type !== "story" || item.dead || item.deleted) continue;
      if ((item.score || 0) < minScore) continue;

      const searchText = `${item.title || ""} ${item.url || ""}`.toLowerCase();
      const matched = matchesKeywords(searchText, keywords);

      stories.push({
        source: "hackernews",
        title: item.title || "",
        url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
        description: "",
        score: item.score || 0,
        comments: item.descendants || 0,
        author: item.by || "",
        timestamp: item.time,
        hn_url: `https://news.ycombinator.com/item?id=${item.id}`,
        ai_relevant: matched.length > 0,
        matched_keywords: matched,
      });
    }
  }

  // Sort by score descending
  stories.sort((a, b) => (b.score as number) - (a.score as number));

  const filtered = params.ai_only
    ? stories.filter((s) => s.ai_relevant)
    : stories;

  return {
    source: "hackernews",
    feed,
    fetched: storyIds.length,
    after_score_filter: stories.length,
    ai_relevant_count: stories.filter((s) => s.ai_relevant).length,
    stories: filtered,
  };
}

interface ScanRedditParams {
  subreddits?: string[];
  sort?: string;
  limit_per_sub?: number;
  min_score?: number;
  keywords?: string[];
  ai_only?: boolean;
  time?: string;
}

async function scanRedditTrending(params: ScanRedditParams) {
  const subreddits = params.subreddits || DEFAULT_SUBREDDITS;
  const sort = params.sort || "hot";
  const limitPerSub = Math.min(params.limit_per_sub || 15, 25);
  const minScore = params.min_score ?? 5;
  const keywords = params.keywords || DEFAULT_AI_KEYWORDS;
  const time = params.time || "day";

  const results = await Promise.allSettled(
    subreddits.map((sub) => {
      let url = `https://www.reddit.com/r/${sub}/${sort}.json?limit=${limitPerSub}&raw_json=1`;
      if (sort === "top") url += `&t=${time}`;
      return axios.get(url, {
        headers: { "User-Agent": "trend-scanner-mcp/1.0 (Claude Code MCP Server)" },
        timeout: 10000,
      });
    })
  );

  const posts: Array<Record<string, unknown>> = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status !== "fulfilled") continue;

    const children = result.value.data?.data?.children || [];
    for (const child of children) {
      const post = child.data;
      if (!post || post.stickied) continue;
      if ((post.score || 0) < minScore) continue;

      const searchText = `${post.title || ""} ${(post.selftext || "").slice(0, 500)}`.toLowerCase();
      const matched = matchesKeywords(searchText, keywords);

      posts.push({
        source: "reddit",
        title: post.title || "",
        url: post.url?.startsWith("/") ? `https://reddit.com${post.url}` : (post.url || ""),
        description: (post.selftext || "").slice(0, 200),
        score: post.score || 0,
        comments: post.num_comments || 0,
        subreddit: subreddits[i],
        author: post.author || "",
        timestamp: post.created_utc,
        upvote_ratio: post.upvote_ratio,
        permalink: `https://reddit.com${post.permalink}`,
        ai_relevant: matched.length > 0,
        matched_keywords: matched,
      });
    }
  }

  // Sort by score descending
  posts.sort((a, b) => (b.score as number) - (a.score as number));

  const filtered = params.ai_only
    ? posts.filter((p) => p.ai_relevant)
    : posts;

  return {
    source: "reddit",
    subreddits_scanned: subreddits,
    total_posts: posts.length,
    ai_relevant_count: posts.filter((p) => p.ai_relevant).length,
    posts: filtered,
  };
}

interface ScanAllParams {
  keywords?: string[];
  ai_only?: boolean;
  github_language?: string;
  github_since?: string;
  hn_limit?: number;
  hn_min_score?: number;
  reddit_subreddits?: string[];
  reddit_min_score?: number;
}

async function scanAllSources(params: ScanAllParams) {
  const keywords = params.keywords || DEFAULT_AI_KEYWORDS;
  const aiOnly = params.ai_only !== false; // default true for combined scan

  const [ghResult, hnResult, redditResult] = await Promise.allSettled([
    scanGitHubTrending({
      language: params.github_language,
      since: params.github_since,
      keywords,
      ai_only: aiOnly,
    }),
    scanHackerNews({
      feed: "top",
      limit: params.hn_limit || 50,
      min_score: params.hn_min_score || 20,
      keywords,
      ai_only: aiOnly,
    }),
    scanRedditTrending({
      subreddits: params.reddit_subreddits,
      sort: "hot",
      limit_per_sub: 15,
      min_score: params.reddit_min_score || 10,
      keywords,
      ai_only: aiOnly,
    }),
  ]);

  // Extract results or error messages
  const ghData = ghResult.status === "fulfilled" ? ghResult.value : null;
  const hnData = hnResult.status === "fulfilled" ? hnResult.value : null;
  const redditData = redditResult.status === "fulfilled" ? redditResult.value : null;

  const ghError = ghResult.status === "rejected" ? String(ghResult.reason) : null;
  const hnError = hnResult.status === "rejected" ? String(hnResult.reason) : null;
  const redditError = redditResult.status === "rejected" ? String(redditResult.reason) : null;

  // Cross-source deduplication
  const urlMap = new Map<string, {
    sources: string[];
    items: Record<string, unknown>;
    title: string;
    url: string;
    combined_score: number;
    matched_keywords: string[];
  }>();

  // Index GitHub repos
  if (ghData) {
    for (const repo of ghData.repos) {
      const key = normalizeUrl(repo.url);
      urlMap.set(key, {
        sources: ["github"],
        items: { github: { stars_today: repo.score, language: repo.language, description: repo.description } },
        title: repo.title,
        url: repo.url,
        combined_score: repo.score,
        matched_keywords: [...repo.matched_keywords],
      });
    }
  }

  // Index HN stories and check for cross-source
  if (hnData) {
    for (const story of hnData.stories) {
      const key = normalizeUrl(story.url as string);
      const existing = urlMap.get(key);
      if (existing) {
        existing.sources.push("hackernews");
        existing.items.hackernews = { score: story.score, comments: story.comments, hn_url: story.hn_url };
        existing.combined_score += story.score as number;
        for (const kw of story.matched_keywords as string[]) {
          if (!existing.matched_keywords.includes(kw)) existing.matched_keywords.push(kw);
        }
      } else {
        urlMap.set(key, {
          sources: ["hackernews"],
          items: { hackernews: { score: story.score, comments: story.comments, hn_url: story.hn_url } },
          title: story.title as string,
          url: story.url as string,
          combined_score: story.score as number,
          matched_keywords: [...(story.matched_keywords as string[])],
        });
      }
    }
  }

  // Index Reddit posts and check for cross-source
  if (redditData) {
    for (const post of redditData.posts) {
      const key = normalizeUrl(post.url as string);
      const existing = urlMap.get(key);
      if (existing) {
        existing.sources.push("reddit");
        existing.items.reddit = { score: post.score, comments: post.comments, subreddit: post.subreddit };
        existing.combined_score += post.score as number;
        for (const kw of post.matched_keywords as string[]) {
          if (!existing.matched_keywords.includes(kw)) existing.matched_keywords.push(kw);
        }
      } else {
        urlMap.set(key, {
          sources: ["reddit"],
          items: { reddit: { score: post.score, comments: post.comments, subreddit: post.subreddit } },
          title: post.title as string,
          url: post.url as string,
          combined_score: post.score as number,
          matched_keywords: [...(post.matched_keywords as string[])],
        });
      }
    }
  }

  // Classify signal strength and sort
  const allTrends = Array.from(urlMap.values()).map((entry) => {
    const numSources = entry.sources.length;
    let signal_strength: string;
    if (numSources >= 3) {
      signal_strength = "STRONG";
    } else if (numSources === 2) {
      signal_strength = entry.combined_score > 200 ? "STRONG" : "MODERATE";
    } else if (entry.combined_score > 200) {
      signal_strength = "EMERGING";
    } else {
      signal_strength = "NOTABLE";
    }

    return {
      title: entry.title,
      url: entry.url,
      sources: entry.sources,
      combined_score: entry.combined_score,
      items: entry.items,
      signal_strength,
      matched_keywords: entry.matched_keywords,
    };
  });

  // Sort: multi-source first, then by combined score
  allTrends.sort((a, b) => {
    if (a.sources.length !== b.sources.length) return b.sources.length - a.sources.length;
    return b.combined_score - a.combined_score;
  });

  const crossSourceMatches = allTrends.filter((t) => t.sources.length > 1);

  return {
    scan_timestamp: new Date().toISOString(),
    sources_scanned: {
      github: ghData
        ? { status: "ok", total: ghData.total_repos, ai_relevant: ghData.ai_relevant_count }
        : { status: "error", error: ghError },
      hackernews: hnData
        ? { status: "ok", total: hnData.fetched, ai_relevant: hnData.ai_relevant_count }
        : { status: "error", error: hnError },
      reddit: redditData
        ? { status: "ok", total: redditData.total_posts, ai_relevant: redditData.ai_relevant_count }
        : { status: "error", error: redditError },
    },
    cross_source_matches: crossSourceMatches.length,
    top_trends: allTrends.slice(0, 30),
    all_items: {
      github: ghData?.repos || [],
      hackernews: hnData?.stories || [],
      reddit: redditData?.posts || [],
    },
  };
}

// --- MCP Server ---

const server = new McpServer({
  name: "trend-scanner-mcp",
  version: "1.0.0",
});

// Tool 1: Scan GitHub Trending
server.tool(
  "scan_github_trending",
  "Scan GitHub for recently created repositories gaining stars fast. Uses the GitHub Search API (free, no credits needed). Optionally filter by programming language and timeframe.",
  {
    language: z.string().optional().describe("Programming language filter (e.g., 'python', 'typescript', 'rust')"),
    since: z.enum(["daily", "weekly", "monthly"]).optional().describe("Timeframe for trending (default: daily)"),
    keywords: z.array(z.string()).optional().describe("Custom keyword list for AI relevance filtering (default: built-in AI keyword list)"),
    ai_only: z.boolean().optional().describe("If true, only return AI-relevant repos (default: false)"),
  },
  async ({ language, since, keywords, ai_only }) => {
    try {
      const result = await scanGitHubTrending({ language, since, keywords, ai_only });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        isError: true,
      };
    }
  }
);

// Tool 2: Scan Hacker News
server.tool(
  "scan_hackernews",
  "Scan Hacker News top/best/new stories. Filters by minimum score and optionally by AI-related keywords. Free API, no credits needed.",
  {
    feed: z.enum(["top", "best", "new"]).optional().describe("Which HN feed to scan (default: top)"),
    limit: z.number().min(1).max(100).optional().describe("How many stories to fetch (default: 50, max: 100)"),
    min_score: z.number().optional().describe("Minimum points threshold (default: 10)"),
    keywords: z.array(z.string()).optional().describe("Custom keyword list for AI relevance filtering"),
    ai_only: z.boolean().optional().describe("If true, only return AI-relevant stories (default: false)"),
  },
  async ({ feed, limit, min_score, keywords, ai_only }) => {
    try {
      const result = await scanHackerNews({ feed, limit, min_score, keywords, ai_only });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        isError: true,
      };
    }
  }
);

// Tool 3: Scan Reddit Trending
server.tool(
  "scan_reddit_trending",
  "Scan Reddit AI-related subreddits for hot posts. Returns top posts across multiple subreddits sorted by engagement. Free API, no credits needed.",
  {
    subreddits: z.array(z.string()).optional().describe("Subreddits to scan (default: ClaudeAI, LocalLLaMA, artificial, MachineLearning, selfhosted, ChatGPT, singularity, StableDiffusion)"),
    sort: z.enum(["hot", "top", "new"]).optional().describe("Sort order (default: hot)"),
    limit_per_sub: z.number().min(1).max(25).optional().describe("Posts per subreddit (default: 15)"),
    min_score: z.number().optional().describe("Minimum upvote threshold (default: 5)"),
    keywords: z.array(z.string()).optional().describe("Custom keyword list for AI relevance filtering"),
    ai_only: z.boolean().optional().describe("If true, only return AI-relevant posts (default: false)"),
    time: z.enum(["hour", "day", "week", "month"]).optional().describe("Time filter for 'top' sort (default: day)"),
  },
  async ({ subreddits, sort, limit_per_sub, keywords, ai_only, time }) => {
    try {
      const result = await scanRedditTrending({ subreddits, sort, limit_per_sub, keywords, ai_only, time });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        isError: true,
      };
    }
  }
);

// Tool 4: Scan All Sources
server.tool(
  "scan_all_sources",
  "Combined scan across GitHub Trending, Hacker News, and Reddit in parallel. Finds cross-source trends (repos that appear on multiple platforms). Best for discovering emerging topics before they peak on YouTube.",
  {
    keywords: z.array(z.string()).optional().describe("Custom keyword list for AI relevance filtering"),
    ai_only: z.boolean().optional().describe("Only return AI-relevant items (default: true for combined scan)"),
    github_language: z.string().optional().describe("Filter GitHub by programming language"),
    github_since: z.enum(["daily", "weekly", "monthly"]).optional().describe("GitHub timeframe (default: daily)"),
    hn_limit: z.number().min(1).max(100).optional().describe("HN stories to fetch (default: 50)"),
    hn_min_score: z.number().optional().describe("HN minimum score (default: 20)"),
    reddit_subreddits: z.array(z.string()).optional().describe("Subreddits to scan"),
    reddit_min_score: z.number().optional().describe("Reddit minimum score (default: 10)"),
  },
  async ({ keywords, ai_only, github_language, github_since, hn_limit, hn_min_score, reddit_subreddits, reddit_min_score }) => {
    try {
      const result = await scanAllSources({
        keywords,
        ai_only,
        github_language,
        github_since,
        hn_limit,
        hn_min_score,
        reddit_subreddits,
        reddit_min_score,
      });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        isError: true,
      };
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Trend Scanner MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
