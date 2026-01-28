#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

// Initialize clients
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const geminiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SCRAPINGBEE_API_KEY = process.env.SCRAPINGBEE_API_KEY;

// Types for responses
interface SearchResult {
  query: string;
  response: string;
  citations?: string[];
  model: string;
  searchEngine: string;
}

interface GoogleSearchResult {
  query: string;
  aiOverview?: string;
  organicResults: Array<{
    position: number;
    title: string;
    url: string;
    description: string;
  }>;
  relatedSearches?: string[];
  searchEngine: string;
}

interface AuditResult {
  query: string;
  chatgpt: SearchResult | { error: string };
  gemini: SearchResult | { error: string };
  google: GoogleSearchResult | { error: string };
}

// Query ChatGPT with web search
async function queryChatGPT(query: string): Promise<SearchResult> {
  try {
    const response = await openaiClient.responses.create({
      model: "gpt-5.2",
      tools: [{ type: "web_search_preview" }],
      input: query,
    });

    // Extract citations from the response if available
    const citations: string[] = [];
    if (response.output && Array.isArray(response.output)) {
      for (const item of response.output) {
        // Handle web search results - structure may vary
        const anyItem = item as unknown as Record<string, unknown>;
        if (anyItem.type === "web_search_call" || anyItem.type === "web_search_result") {
          // Try to extract URLs from various possible structures
          const results = anyItem.results as Array<{ url?: string }> | undefined;
          if (results && Array.isArray(results)) {
            for (const result of results) {
              if (result.url) {
                citations.push(result.url);
              }
            }
          }
        }
        // Also check for citations in message content
        if (anyItem.type === "message" && anyItem.content) {
          const content = anyItem.content as Array<{ annotations?: Array<{ url?: string }> }>;
          if (Array.isArray(content)) {
            for (const c of content) {
              if (c.annotations && Array.isArray(c.annotations)) {
                for (const ann of c.annotations) {
                  if (ann.url) {
                    citations.push(ann.url);
                  }
                }
              }
            }
          }
        }
      }
    }

    return {
      query,
      response: response.output_text || "No response generated",
      citations: [...new Set(citations)], // Deduplicate
      model: "gpt-5.2",
      searchEngine: "Bing",
    };
  } catch (error) {
    throw new Error(`ChatGPT query failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Query Gemini with Google Search grounding
async function queryGemini(query: string): Promise<SearchResult> {
  try {
    const tools = [
      { googleSearch: {} },
    ];

    const config = {
      tools,
    };

    const contents = [
      {
        role: "user" as const,
        parts: [{ text: query }],
      },
    ];

    const response = await geminiClient.models.generateContent({
      model: "gemini-3-flash-preview",
      config,
      contents,
    });

    // Extract grounding metadata/citations if available
    const citations: string[] = [];
    const candidate = response.candidates?.[0];
    if (candidate?.groundingMetadata?.groundingChunks) {
      for (const chunk of candidate.groundingMetadata.groundingChunks) {
        if (chunk.web?.uri) {
          citations.push(chunk.web.uri);
        }
      }
    }

    const responseText = candidate?.content?.parts?.[0]?.text || "No response generated";

    return {
      query,
      response: responseText,
      citations,
      model: "gemini-3-flash-preview",
      searchEngine: "Google",
    };
  } catch (error) {
    throw new Error(`Gemini query failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Query Google Search via ScrapingBee (includes AI Overview)
async function queryGoogle(query: string, language: string = "en", country: string = "us"): Promise<GoogleSearchResult> {
  try {
    if (!SCRAPINGBEE_API_KEY) {
      throw new Error("SCRAPINGBEE_API_KEY not configured");
    }

    const response = await axios.get("https://app.scrapingbee.com/api/v1/google", {
      params: {
        api_key: SCRAPINGBEE_API_KEY,
        search: query,
        language: language,
        country_code: country,
        light_request: "false",
      },
      timeout: 30000,
    });

    const data = response.data;

    // Extract AI Overview if present
    const aiOverview = data.ai_overview?.text || data.ai_overview?.answer || undefined;

    // Extract organic results
    const organicResults = (data.organic_results || []).slice(0, 10).map((result: {
      position?: number;
      title?: string;
      url?: string;
      link?: string;
      description?: string;
      snippet?: string;
    }, index: number) => ({
      position: result.position || index + 1,
      title: result.title || "",
      url: result.url || result.link || "",
      description: result.description || result.snippet || "",
    }));

    // Extract related searches
    const relatedSearches = (data.related_searches || []).map((r: { query?: string }) => r.query).filter(Boolean);

    return {
      query,
      aiOverview,
      organicResults,
      relatedSearches,
      searchEngine: "Google",
    };
  } catch (error) {
    throw new Error(`Google search failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Run audit across all engines
async function runAudit(query: string): Promise<AuditResult> {
  const [chatgptResult, geminiResult, googleResult] = await Promise.allSettled([
    queryChatGPT(query),
    queryGemini(query),
    queryGoogle(query),
  ]);

  return {
    query,
    chatgpt: chatgptResult.status === "fulfilled"
      ? chatgptResult.value
      : { error: chatgptResult.reason?.message || "Unknown error" },
    gemini: geminiResult.status === "fulfilled"
      ? geminiResult.value
      : { error: geminiResult.reason?.message || "Unknown error" },
    google: googleResult.status === "fulfilled"
      ? googleResult.value
      : { error: googleResult.reason?.message || "Unknown error" },
  };
}

// Standard AEO audit queries
const AEO_AUDIT_QUERIES = [
  "What is {brand}?",
  "{brand} pricing",
  "{brand} features",
  "{brand} reviews",
  "Best {category} tools",
  "{brand} vs {competitor}",
  "Is {brand} good?",
  "{brand} alternatives",
];

// Create MCP server
const server = new McpServer({
  name: "aeo-audit-mcp",
  version: "1.0.0",
});

// Tool: Query ChatGPT with web search
server.tool(
  "query_chatgpt",
  "Query ChatGPT (GPT-5.2) with Bing web search enabled. Returns the response and any citations.",
  {
    query: z.string().describe("The search query to send to ChatGPT"),
  },
  async ({ query }) => {
    try {
      const result = await queryChatGPT(query);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Query Gemini with Google Search grounding
server.tool(
  "query_gemini",
  "Query Gemini (gemini-3-flash) with Google Search grounding enabled. Returns the response and grounding citations.",
  {
    query: z.string().describe("The search query to send to Gemini"),
  },
  async ({ query }) => {
    try {
      const result = await queryGemini(query);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Query Google Search via ScrapingBee
server.tool(
  "query_google",
  "Query Google Search via ScrapingBee. Returns organic results, AI Overview (if present), and related searches.",
  {
    query: z.string().describe("The search query to send to Google"),
    language: z.string().optional().describe("Language code (default: 'en')"),
    country: z.string().optional().describe("Country code (default: 'us')"),
  },
  async ({ query, language, country }) => {
    try {
      const result = await queryGoogle(query, language || "en", country || "us");
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Run comparison audit across all engines
server.tool(
  "compare_llms",
  "Run the same query across ChatGPT, Gemini, and Google Search, comparing their responses and citations.",
  {
    query: z.string().describe("The search query to compare across engines"),
  },
  async ({ query }) => {
    try {
      const result = await runAudit(query);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Run full AEO brand audit
server.tool(
  "run_brand_audit",
  "Run a comprehensive AEO audit for a brand across ChatGPT, Gemini, and Google Search. Tests visibility, accuracy, and citations.",
  {
    brand: z.string().describe("The brand name to audit"),
    category: z.string().describe("The product category (e.g., 'chatbot', 'CRM', 'AI sales assistant')"),
    competitor: z.string().optional().describe("Optional: A main competitor to compare against"),
  },
  async ({ brand, category, competitor }) => {
    const queries = AEO_AUDIT_QUERIES.map(q =>
      q.replace("{brand}", brand)
       .replace("{category}", category)
       .replace("{competitor}", competitor || "competitors")
    );

    const results: AuditResult[] = [];

    // Run queries sequentially to avoid rate limits
    for (const query of queries) {
      try {
        const result = await runAudit(query);
        results.push(result);
      } catch (error) {
        results.push({
          query,
          chatgpt: { error: error instanceof Error ? error.message : String(error) },
          gemini: { error: error instanceof Error ? error.message : String(error) },
          google: { error: error instanceof Error ? error.message : String(error) },
        });
      }
      // Small delay between queries
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Generate summary
    const summary = {
      brand,
      category,
      competitor: competitor || "N/A",
      totalQueries: results.length,
      results,
      analysis: {
        chatgpt: {
          mentionedBrand: results.filter(r =>
            !("error" in r.chatgpt) &&
            r.chatgpt.response.toLowerCase().includes(brand.toLowerCase())
          ).length,
          totalCitations: results.reduce((acc, r) =>
            acc + (!("error" in r.chatgpt) ? (r.chatgpt.citations?.length || 0) : 0), 0
          ),
        },
        gemini: {
          mentionedBrand: results.filter(r =>
            !("error" in r.gemini) &&
            r.gemini.response.toLowerCase().includes(brand.toLowerCase())
          ).length,
          totalCitations: results.reduce((acc, r) =>
            acc + (!("error" in r.gemini) ? (r.gemini.citations?.length || 0) : 0), 0
          ),
        },
        google: {
          inTop10: results.filter(r =>
            !("error" in r.google) &&
            r.google.organicResults.some(res =>
              res.url.toLowerCase().includes(brand.toLowerCase()) ||
              res.title.toLowerCase().includes(brand.toLowerCase())
            )
          ).length,
          hasAiOverview: results.filter(r =>
            !("error" in r.google) &&
            r.google.aiOverview
          ).length,
          mentionedInAiOverview: results.filter(r =>
            !("error" in r.google) &&
            r.google.aiOverview?.toLowerCase().includes(brand.toLowerCase())
          ).length,
        },
      },
    };

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(summary, null, 2),
        },
      ],
    };
  }
);

// Tool: Run 10-run consistency test
server.tool(
  "run_consistency_test",
  "Run a query 10 times in parallel across ChatGPT and/or Gemini to test how consistently a brand is mentioned. Returns mention rate, position analysis, and how the brand was described each time.",
  {
    query: z.string().describe("The discovery query to test (e.g., 'Best hair transplant clinic in Europe')"),
    brand: z.string().describe("The brand name to check for mentions in responses"),
    engines: z.enum(["both", "chatgpt", "gemini"]).optional().describe("Which engines to test (default: 'both')"),
    runs: z.number().min(1).max(20).optional().describe("Number of runs per engine (default: 10, max: 20)"),
  },
  async ({ query, brand, engines, runs }) => {
    const numRuns = runs || 10;
    const engineChoice = engines || "both";
    const brandLower = brand.toLowerCase();

    interface ConsistencyRun {
      run: number;
      mentioned: boolean;
      position?: string;
      context?: string;
      error?: string;
    }

    interface EngineResult {
      engine: string;
      totalRuns: number;
      mentions: number;
      mentionRate: string;
      consistency: string;
      runs: ConsistencyRun[];
    }

    const results: EngineResult[] = [];

    // Helper to extract context around brand mention
    function extractContext(response: string, brandName: string): { position: string; context: string } | null {
      const lowerResponse = response.toLowerCase();
      const brandIdx = lowerResponse.indexOf(brandName.toLowerCase());
      if (brandIdx === -1) return null;

      // Get surrounding context (200 chars)
      const start = Math.max(0, brandIdx - 50);
      const end = Math.min(response.length, brandIdx + brandName.length + 150);
      const context = response.slice(start, end).trim();

      // Try to determine position/tier
      const beforeBrand = response.slice(0, brandIdx).toLowerCase();
      let position = "mentioned";
      if (beforeBrand.includes("## 1") || beforeBrand.includes("### 1") || beforeBrand.includes("top tier") || beforeBrand.includes("elite") || beforeBrand.includes("gold standard")) {
        position = "top-tier";
      } else if (beforeBrand.includes("## 2") || beforeBrand.includes("### 2") || beforeBrand.includes("second") || beforeBrand.includes("mid")) {
        position = "second-tier";
      } else if (beforeBrand.includes("## 3") || beforeBrand.includes("### 3") || beforeBrand.includes("budget") || beforeBrand.includes("value")) {
        position = "third-tier";
      }

      return { position, context };
    }

    // Run ChatGPT tests
    if (engineChoice === "both" || engineChoice === "chatgpt") {
      const chatgptPromises = Array.from({ length: numRuns }, (_, i) =>
        queryChatGPT(query)
          .then((result): ConsistencyRun => {
            const mentioned = result.response.toLowerCase().includes(brandLower);
            const ctx = mentioned ? extractContext(result.response, brand) : null;
            return {
              run: i + 1,
              mentioned,
              position: ctx?.position,
              context: ctx?.context,
            };
          })
          .catch((error): ConsistencyRun => ({
            run: i + 1,
            mentioned: false,
            error: error instanceof Error ? error.message : String(error),
          }))
      );

      const chatgptRuns = await Promise.all(chatgptPromises);
      const mentions = chatgptRuns.filter(r => r.mentioned).length;

      results.push({
        engine: "ChatGPT (GPT-5.2)",
        totalRuns: numRuns,
        mentions,
        mentionRate: `${mentions}/${numRuns} (${Math.round((mentions / numRuns) * 100)}%)`,
        consistency: mentions >= 7 ? "STRONG" : mentions >= 4 ? "MODERATE" : mentions >= 1 ? "WEAK" : "INVISIBLE",
        runs: chatgptRuns,
      });
    }

    // Run Gemini tests
    if (engineChoice === "both" || engineChoice === "gemini") {
      const geminiPromises = Array.from({ length: numRuns }, (_, i) =>
        queryGemini(query)
          .then((result): ConsistencyRun => {
            const mentioned = result.response.toLowerCase().includes(brandLower);
            const ctx = mentioned ? extractContext(result.response, brand) : null;
            return {
              run: i + 1,
              mentioned,
              position: ctx?.position,
              context: ctx?.context,
            };
          })
          .catch((error): ConsistencyRun => ({
            run: i + 1,
            mentioned: false,
            error: error instanceof Error ? error.message : String(error),
          }))
      );

      const geminiRuns = await Promise.all(geminiPromises);
      const mentions = geminiRuns.filter(r => r.mentioned).length;

      results.push({
        engine: "Gemini (gemini-3-flash)",
        totalRuns: numRuns,
        mentions,
        mentionRate: `${mentions}/${numRuns} (${Math.round((mentions / numRuns) * 100)}%)`,
        consistency: mentions >= 7 ? "STRONG" : mentions >= 4 ? "MODERATE" : mentions >= 1 ? "WEAK" : "INVISIBLE",
        runs: geminiRuns,
      });
    }

    const summary = {
      query,
      brand,
      engines: engineChoice,
      totalRuns: numRuns,
      results,
      overall: {
        totalMentions: results.reduce((acc, r) => acc + r.mentions, 0),
        totalQueries: results.reduce((acc, r) => acc + r.totalRuns, 0),
        overallRate: `${results.reduce((acc, r) => acc + r.mentions, 0)}/${results.reduce((acc, r) => acc + r.totalRuns, 0)}`,
      },
    };

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(summary, null, 2),
        },
      ],
    };
  }
);

// Tool: Get suggested audit queries
server.tool(
  "get_audit_queries",
  "Get a list of suggested AEO audit queries for a brand. Use these to manually test or customize your audit.",
  {
    brand: z.string().describe("The brand name"),
    category: z.string().describe("The product category"),
    competitor: z.string().optional().describe("Optional: A main competitor"),
  },
  async ({ brand, category, competitor }) => {
    const queries = AEO_AUDIT_QUERIES.map(q =>
      q.replace("{brand}", brand)
       .replace("{category}", category)
       .replace("{competitor}", competitor || "[competitor]")
    );

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            brand,
            category,
            suggestedQueries: queries,
            additionalQueries: [
              `Who founded ${brand}?`,
              `${brand} integrations`,
              `How does ${brand} work?`,
              `${brand} customer reviews`,
              `Is ${brand} worth it?`,
              `${brand} pros and cons`,
            ],
          }, null, 2),
        },
      ],
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("AEO Audit MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
