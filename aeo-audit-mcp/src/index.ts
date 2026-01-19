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
