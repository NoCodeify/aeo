#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const SCRAPINGBEE_API_KEY = process.env.SCRAPINGBEE_API_KEY;
const BASE_URL = "https://app.scrapingbee.com/api/v1";

// --- Helper functions ---

async function fetchUrl(params: {
  url: string;
  render_js?: boolean;
  extract_rules?: Record<string, string>;
  wait_for?: string;
  timeout?: number;
  premium_proxy?: boolean;
  block_resources?: boolean;
  return_page_source?: boolean;
}): Promise<{ content: string; resolvedUrl: string; statusCode: number }> {
  if (!SCRAPINGBEE_API_KEY) {
    throw new Error("SCRAPINGBEE_API_KEY not configured");
  }

  const requestParams: Record<string, string | boolean> = {
    api_key: SCRAPINGBEE_API_KEY,
    url: params.url,
    render_js: params.render_js !== false ? "true" : "false",
    block_resources: params.block_resources !== false ? "true" : "false",
  };

  if (params.premium_proxy) {
    requestParams.premium_proxy = "true";
  }
  if (params.return_page_source) {
    requestParams.return_page_source = "true";
  }
  if (params.wait_for) {
    requestParams.wait_for = params.wait_for;
  }
  if (params.extract_rules) {
    requestParams.extract_rules = JSON.stringify(params.extract_rules);
  }

  const response = await axios.get(BASE_URL, {
    params: requestParams,
    timeout: params.timeout || 30000,
    responseType: params.extract_rules ? "json" : "text",
  });

  return {
    content: typeof response.data === "string" ? response.data : JSON.stringify(response.data, null, 2),
    resolvedUrl: response.headers["spb-resolved-url"] || params.url,
    statusCode: parseInt(response.headers["spb-initial-status-code"] || "200", 10),
  };
}

async function searchGoogle(params: {
  query: string;
  nb_results?: number;
  language?: string;
  country_code?: string;
  page?: number;
  device?: string;
  search_type?: string;
}): Promise<{
  query: string;
  aiOverview?: string;
  organicResults: Array<{ position: number; title: string; url: string; description: string }>;
  relatedSearches?: string[];
  peopleAlsoAsk?: string[];
}> {
  if (!SCRAPINGBEE_API_KEY) {
    throw new Error("SCRAPINGBEE_API_KEY not configured");
  }

  const response = await axios.get(`${BASE_URL}/google`, {
    params: {
      api_key: SCRAPINGBEE_API_KEY,
      search: params.query,
      nb_results: params.nb_results || 10,
      language: params.language || "en",
      country_code: params.country_code || "us",
      page: params.page || 1,
      device: params.device || "desktop",
      search_type: params.search_type || "classic",
    },
    timeout: 30000,
  });

  const data = response.data;

  const aiOverview = data.ai_overview?.text || data.ai_overview?.answer || undefined;

  const organicResults = (data.organic_results || [])
    .slice(0, params.nb_results || 10)
    .map(
      (
        result: {
          position?: number;
          title?: string;
          url?: string;
          link?: string;
          description?: string;
          snippet?: string;
        },
        index: number
      ) => ({
        position: result.position || index + 1,
        title: result.title || "",
        url: result.url || result.link || "",
        description: result.description || result.snippet || "",
      })
    );

  const relatedSearches = (data.related_searches || [])
    .map((r: { query?: string }) => r.query)
    .filter(Boolean);

  const peopleAlsoAsk = (data.people_also_ask || [])
    .map((r: { question?: string }) => r.question)
    .filter(Boolean);

  return {
    query: params.query,
    aiOverview,
    organicResults,
    relatedSearches: relatedSearches.length > 0 ? relatedSearches : undefined,
    peopleAlsoAsk: peopleAlsoAsk.length > 0 ? peopleAlsoAsk : undefined,
  };
}

async function screenshotUrl(params: {
  url: string;
  output_dir: string;
  filename?: string;
  full_page?: boolean;
  window_width?: number;
}): Promise<string> {
  if (!SCRAPINGBEE_API_KEY) {
    throw new Error("SCRAPINGBEE_API_KEY not configured");
  }

  const response = await axios.get(BASE_URL, {
    params: {
      api_key: SCRAPINGBEE_API_KEY,
      url: params.url,
      screenshot: "true",
      screenshot_full_page: params.full_page !== false ? "true" : "false",
      window_width: params.window_width || 1920,
    },
    timeout: 60000,
    responseType: "arraybuffer",
  });

  await mkdir(params.output_dir, { recursive: true });
  const filename = `${params.filename || "screenshot"}.png`;
  const outputPath = join(params.output_dir, filename);
  await writeFile(outputPath, Buffer.from(response.data));

  return outputPath;
}

async function checkUsage(): Promise<{
  max_api_credit: number;
  used_api_credit: number;
  remaining_credits: number;
}> {
  if (!SCRAPINGBEE_API_KEY) {
    throw new Error("SCRAPINGBEE_API_KEY not configured");
  }

  const response = await axios.get(`${BASE_URL}/usage`, {
    params: { api_key: SCRAPINGBEE_API_KEY },
    timeout: 10000,
  });

  return {
    max_api_credit: response.data.max_api_credit,
    used_api_credit: response.data.used_api_credit,
    remaining_credits: response.data.max_api_credit - response.data.used_api_credit,
  };
}

// --- MCP Server ---

const server = new McpServer({
  name: "scrapingbee-mcp",
  version: "1.0.0",
});

// Tool: Fetch URL
server.tool(
  "fetch_url",
  "Fetch a URL via ScrapingBee with headless browser rendering and proxy rotation. Use as a fallback when direct fetch fails on JS-heavy or bot-protected sites. Supports CSS selector extraction for structured data.",
  {
    url: z.string().describe("The URL to fetch"),
    render_js: z
      .boolean()
      .optional()
      .describe("Execute JavaScript on the page (default: true, costs 5 credits vs 1 without)"),
    extract_rules: z
      .record(z.string())
      .optional()
      .describe(
        'CSS selector extraction rules as key-value pairs. Values are CSS selectors. Append @attr to get attributes (e.g. "a @href"). Example: { "title": "h1", "links": "a @href", "prices": ".price" }'
      ),
    wait_for: z
      .string()
      .optional()
      .describe("CSS selector to wait for before returning content (useful for SPAs)"),
    timeout: z
      .number()
      .optional()
      .describe("Request timeout in milliseconds (default: 30000)"),
    premium_proxy: z
      .boolean()
      .optional()
      .describe("Use premium residential proxy for heavily protected sites (10x credit cost)"),
    block_resources: z
      .boolean()
      .optional()
      .describe("Block images/CSS/fonts for faster fetch (default: true)"),
    return_page_source: z
      .boolean()
      .optional()
      .describe("Return page source before JavaScript execution (default: false)"),
  },
  async ({ url, render_js, extract_rules, wait_for, timeout, premium_proxy, block_resources, return_page_source }) => {
    try {
      const result = await fetchUrl({
        url,
        render_js,
        extract_rules,
        wait_for,
        timeout,
        premium_proxy,
        block_resources,
        return_page_source,
      });

      // Truncate very large responses
      const maxLength = 100000;
      const content =
        result.content.length > maxLength
          ? result.content.slice(0, maxLength) + `\n\n... [Truncated: ${result.content.length} chars total]`
          : result.content;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                url: result.resolvedUrl,
                statusCode: result.statusCode,
                contentLength: result.content.length,
                content,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error fetching ${url}: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Google Search
server.tool(
  "search_google",
  "Search Google via ScrapingBee and get structured SERP results including organic results, AI Overview, People Also Ask, and related searches. More reliable than browser-based search with full geographic targeting.",
  {
    query: z.string().describe("The search query"),
    nb_results: z
      .number()
      .min(1)
      .max(100)
      .optional()
      .describe("Number of results to return (default: 10, max: 100)"),
    language: z.string().optional().describe("Language code (default: 'en')"),
    country_code: z
      .string()
      .optional()
      .describe("2-letter country code for geo-targeting (default: 'us')"),
    page: z.number().min(1).optional().describe("Results page number (default: 1)"),
    device: z
      .enum(["desktop", "mobile"])
      .optional()
      .describe("Device type for results (default: 'desktop')"),
  },
  async ({ query, nb_results, language, country_code, page, device }) => {
    try {
      const result = await searchGoogle({
        query,
        nb_results,
        language,
        country_code,
        page,
        device,
      });

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
            text: `Error searching "${query}": ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Screenshot URL
server.tool(
  "screenshot_url",
  "Take a full-page or viewport screenshot of a URL via ScrapingBee headless browser. Saves as PNG.",
  {
    url: z.string().describe("The URL to screenshot"),
    output_dir: z.string().describe("Directory to save the screenshot"),
    filename: z
      .string()
      .optional()
      .describe("Output filename without extension (default: 'screenshot')"),
    full_page: z
      .boolean()
      .optional()
      .describe("Capture full page scroll height (default: true)"),
    window_width: z
      .number()
      .optional()
      .describe("Browser viewport width in pixels (default: 1920)"),
  },
  async ({ url, output_dir, filename, full_page, window_width }) => {
    try {
      const outputPath = await screenshotUrl({
        url,
        output_dir,
        filename,
        full_page,
        window_width,
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                url,
                savedTo: outputPath,
                fullPage: full_page !== false,
                windowWidth: window_width || 1920,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error screenshotting ${url}: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Check API Usage
server.tool(
  "check_usage",
  "Check your ScrapingBee API credit balance. Shows total credits, used credits, and remaining credits.",
  {},
  async () => {
    try {
      const usage = await checkUsage();

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                totalCredits: usage.max_api_credit,
                usedCredits: usage.used_api_credit,
                remainingCredits: usage.remaining_credits,
                usagePercent: `${Math.round((usage.used_api_credit / usage.max_api_credit) * 100)}%`,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error checking usage: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ScrapingBee MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
