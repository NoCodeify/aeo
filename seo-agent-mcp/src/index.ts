#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

// DataForSEO API configuration
const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;

const DATAFORSEO_AUTH = Buffer.from(
  `${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`
).toString("base64");

const DATAFORSEO_BASE_URL = "https://api.dataforseo.com/v3";

const headers = {
  Authorization: `Basic ${DATAFORSEO_AUTH}`,
  "Content-Type": "application/json",
};

// TLD to location/language mapping
const TLD_TO_LOCATION: Record<string, { location_code: number; language_code: string }> = {
  ".com": { location_code: 2840, language_code: "en" }, // US
  ".co.uk": { location_code: 2826, language_code: "en" }, // UK
  ".de": { location_code: 2276, language_code: "de" }, // Germany
  ".nl": { location_code: 2528, language_code: "nl" }, // Netherlands
  ".fr": { location_code: 2250, language_code: "fr" }, // France
  ".es": { location_code: 2724, language_code: "es" }, // Spain
  ".it": { location_code: 2380, language_code: "it" }, // Italy
  ".ca": { location_code: 2124, language_code: "en" }, // Canada
  ".au": { location_code: 2036, language_code: "en" }, // Australia
  ".be": { location_code: 2056, language_code: "nl" }, // Belgium
};

function detectLocation(domain: string): { location_code: number; language_code: string } {
  for (const [tld, config] of Object.entries(TLD_TO_LOCATION)) {
    if (domain.endsWith(tld)) return config;
  }
  return TLD_TO_LOCATION[".com"]; // Default to US
}

// Helper to clean domain (remove protocol and trailing slash)
function cleanDomain(domain: string): string {
  return domain
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

// Types for API responses
interface DataForSEOResponse<T> {
  version: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  tasks_count: number;
  tasks_error: number;
  tasks: Array<{
    id: string;
    status_code: number;
    status_message: string;
    time: string;
    cost: number;
    result_count: number;
    result: T[];
  }>;
}

// API Functions

async function getRankedKeywords(
  domain: string,
  locationCode: number,
  languageCode: string,
  limit: number
): Promise<unknown> {
  const response = await axios.post<DataForSEOResponse<unknown>>(
    `${DATAFORSEO_BASE_URL}/dataforseo_labs/google/ranked_keywords/live`,
    [
      {
        target: cleanDomain(domain),
        location_code: locationCode,
        language_code: languageCode,
        limit: limit,
        historical_serp_mode: "live",
        ignore_synonyms: false,
        include_clickstream_data: false,
        load_rank_absolute: false,
      },
    ],
    { headers, timeout: 60000 }
  );

  if (response.data.status_code !== 20000) {
    throw new Error(`DataForSEO error: ${response.data.status_message}`);
  }

  const result = response.data.tasks?.[0]?.result?.[0];
  if (!result) {
    return { items: [], total_count: 0, message: "No data found" };
  }

  // Transform the response to a cleaner format
  const items = (result as { items?: unknown[] }).items || [];
  const transformedItems = items.map((item: unknown) => {
    const i = item as {
      keyword_data?: {
        keyword?: string;
        keyword_info?: {
          search_volume?: number;
          monthly_searches?: Array<{ year: number; month: number; search_volume: number }>;
        };
        search_intent_info?: { main_intent?: string };
      };
      ranked_serp_element?: {
        serp_item?: {
          rank_absolute?: number;
          url?: string;
          etv?: number;
        };
      };
    };
    return {
      keyword: i.keyword_data?.keyword,
      volume: i.keyword_data?.keyword_info?.search_volume,
      position: i.ranked_serp_element?.serp_item?.rank_absolute,
      url: i.ranked_serp_element?.serp_item?.url,
      intent: i.keyword_data?.search_intent_info?.main_intent,
      traffic_value: i.ranked_serp_element?.serp_item?.etv,
      trend: i.keyword_data?.keyword_info?.monthly_searches?.map(m => m.search_volume) || [],
    };
  });

  return {
    domain: cleanDomain(domain),
    total_count: (result as { total_count?: number }).total_count || items.length,
    items: transformedItems,
  };
}

async function findCompetitors(
  domain: string,
  locationCode: number,
  languageCode: string,
  limit: number
): Promise<unknown> {
  const response = await axios.post<DataForSEOResponse<unknown>>(
    `${DATAFORSEO_BASE_URL}/dataforseo_labs/google/competitors_domain/live`,
    [
      {
        target: cleanDomain(domain),
        location_code: locationCode,
        language_code: languageCode,
        exclude_top_domains: true,
        ignore_synonyms: false,
        include_clickstream_data: false,
        limit: limit + 1, // +1 because first result is the target domain itself
      },
    ],
    { headers, timeout: 60000 }
  );

  if (response.data.status_code !== 20000) {
    throw new Error(`DataForSEO error: ${response.data.status_message}`);
  }

  const result = response.data.tasks?.[0]?.result?.[0];
  if (!result) {
    return { competitors: [], message: "No data found" };
  }

  // Skip first item (target domain itself) and transform
  const items = ((result as { items?: unknown[] }).items || []).slice(1);
  const transformedItems = items.map((item: unknown) => {
    const i = item as {
      domain?: string;
      intersections?: number;
      full_domain_metrics?: {
        organic?: { etv?: number; count?: number };
      };
      competitor_metrics?: {
        organic?: { etv?: number; count?: number };
      };
    };
    return {
      domain: i.domain,
      shared_keywords: i.intersections,
      their_exclusive_keywords: i.competitor_metrics?.organic?.count,
      missed_traffic_value: i.competitor_metrics?.organic?.etv,
      their_total_traffic: i.full_domain_metrics?.organic?.etv,
      their_total_keywords: i.full_domain_metrics?.organic?.count,
    };
  });

  return {
    target_domain: cleanDomain(domain),
    competitors: transformedItems,
  };
}

async function getKeywordGap(
  yourDomain: string,
  competitorDomain: string,
  locationCode: number,
  languageCode: string,
  limit: number
): Promise<unknown> {
  const response = await axios.post<DataForSEOResponse<unknown>>(
    `${DATAFORSEO_BASE_URL}/dataforseo_labs/google/domain_intersection/live`,
    [
      {
        target1: cleanDomain(yourDomain),
        target2: cleanDomain(competitorDomain),
        location_code: locationCode,
        language_code: languageCode,
        include_serp_info: false,
        include_clickstream_data: false,
        intersections: false, // Only show gaps (keywords competitor has but you don't)
        limit: limit,
      },
    ],
    { headers, timeout: 60000 }
  );

  if (response.data.status_code !== 20000) {
    throw new Error(`DataForSEO error: ${response.data.status_message}`);
  }

  const result = response.data.tasks?.[0]?.result?.[0];
  if (!result) {
    return { gap_keywords: [], message: "No data found" };
  }

  const items = (result as { items?: unknown[] }).items || [];
  const transformedItems = items.map((item: unknown) => {
    const i = item as {
      keyword_data?: {
        keyword?: string;
        keyword_info?: {
          search_volume?: number;
          competition_level?: string;
          cpc?: number;
        };
        search_intent_info?: { main_intent?: string };
      };
      first_domain_serp_element?: {
        rank_absolute?: number;
      } | null;
      second_domain_serp_element?: {
        rank_absolute?: number;
        url?: string;
        backlinks_info?: { backlinks?: number };
      };
    };
    return {
      keyword: i.keyword_data?.keyword,
      volume: i.keyword_data?.keyword_info?.search_volume,
      difficulty: i.keyword_data?.keyword_info?.competition_level,
      cpc: i.keyword_data?.keyword_info?.cpc,
      intent: i.keyword_data?.search_intent_info?.main_intent,
      your_position: i.first_domain_serp_element?.rank_absolute || null,
      competitor_position: i.second_domain_serp_element?.rank_absolute,
      competitor_url: i.second_domain_serp_element?.url,
      competitor_backlinks: i.second_domain_serp_element?.backlinks_info?.backlinks,
    };
  });

  return {
    your_domain: cleanDomain(yourDomain),
    competitor_domain: cleanDomain(competitorDomain),
    total_count: (result as { total_count?: number }).total_count || items.length,
    gap_keywords: transformedItems,
  };
}

async function getKeywordOverview(
  keywords: string[],
  locationCode: number,
  languageCode: string
): Promise<unknown> {
  const response = await axios.post<DataForSEOResponse<unknown>>(
    `${DATAFORSEO_BASE_URL}/dataforseo_labs/google/keyword_overview/live`,
    [
      {
        keywords: keywords,
        location_code: locationCode,
        language_code: languageCode,
        include_serp_info: false,
        include_clickstream_data: false,
      },
    ],
    { headers, timeout: 60000 }
  );

  if (response.data.status_code !== 20000) {
    throw new Error(`DataForSEO error: ${response.data.status_message}`);
  }

  const result = response.data.tasks?.[0]?.result;
  if (!result || result.length === 0) {
    return { keywords: [], message: "No data found" };
  }

  const transformedItems = result.map((item: unknown) => {
    const i = item as {
      keyword?: string;
      keyword_info?: {
        search_volume?: number;
        competition?: number;
        competition_level?: string;
        cpc?: number;
        search_volume_trend?: {
          monthly?: number;
          quarterly?: number;
          yearly?: number;
        };
      };
      keyword_properties?: {
        keyword_difficulty?: number;
      };
      avg_backlinks_info?: {
        backlinks?: number;
      };
      search_intent_info?: {
        main_intent?: string;
      };
    } | null;

    if (!i) {
      return null;
    }

    return {
      keyword: i.keyword,
      volume: i.keyword_info?.search_volume,
      difficulty: i.keyword_properties?.keyword_difficulty,
      competition: i.keyword_info?.competition_level,
      cpc: i.keyword_info?.cpc,
      intent: i.search_intent_info?.main_intent,
      trend: i.keyword_info?.search_volume_trend || null,
      avg_backlinks_needed: i.avg_backlinks_info?.backlinks,
    };
  });

  return {
    keywords_checked: keywords.length,
    results: transformedItems,
  };
}

async function getLocations(): Promise<unknown> {
  const response = await axios.get<DataForSEOResponse<unknown>>(
    `${DATAFORSEO_BASE_URL}/dataforseo_labs/locations_and_languages`,
    { headers, timeout: 30000 }
  );

  if (response.data.status_code !== 20000) {
    throw new Error(`DataForSEO error: ${response.data.status_message}`);
  }

  const result = response.data.tasks?.[0]?.result;
  if (!result) {
    return { locations: [], message: "No data found" };
  }

  const transformedItems = result.map((item: unknown) => {
    const i = item as {
      location_code?: number;
      location_name?: string;
      country_iso_code?: string;
      available_languages?: Array<{
        language_code?: string;
        language_name?: string;
      }>;
    };
    return {
      location_code: i.location_code,
      location_name: i.location_name,
      country_iso_code: i.country_iso_code,
      languages: i.available_languages?.map(l => ({
        language_code: l.language_code,
        language_name: l.language_name,
      })) || [],
    };
  });

  return {
    total_locations: transformedItems.length,
    locations: transformedItems,
  };
}

// Create MCP server
const server = new McpServer({
  name: "seo-agent-mcp",
  version: "1.0.0",
});

// Tool 1: Get Ranked Keywords
server.tool(
  "ranked_keywords",
  "Get all keywords a domain currently ranks for in Google. Returns keyword, volume, position, URL, intent, and monthly trend.",
  {
    domain: z.string().describe("Domain to get keywords for (e.g., example.com)"),
    location_code: z.number().optional().describe("Location code (default: auto-detect from TLD). Use get_locations to see all codes."),
    language_code: z.string().optional().describe("Language code (default: auto-detect from TLD)"),
    limit: z.number().optional().describe("Max keywords to return (default: 100, max: 1000)"),
  },
  async ({ domain, location_code, language_code, limit }) => {
    try {
      const location = detectLocation(domain);
      const result = await getRankedKeywords(
        domain,
        location_code || location.location_code,
        language_code || location.language_code,
        limit || 100
      );
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

// Tool 2: Find Competitors
server.tool(
  "find_competitors",
  "Find domains that compete for the same keywords. Returns shared keywords, their exclusive keywords, and traffic metrics.",
  {
    domain: z.string().describe("Your domain to find competitors for"),
    location_code: z.number().optional().describe("Location code (default: auto-detect from TLD)"),
    language_code: z.string().optional().describe("Language code (default: auto-detect from TLD)"),
    limit: z.number().optional().describe("Max competitors to return (default: 10)"),
  },
  async ({ domain, location_code, language_code, limit }) => {
    try {
      const location = detectLocation(domain);
      const result = await findCompetitors(
        domain,
        location_code || location.location_code,
        language_code || location.language_code,
        limit || 10
      );
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

// Tool 3: Keyword Gap Analysis
server.tool(
  "keyword_gap",
  "Find keywords that a competitor ranks for but you don't. Great for discovering content opportunities.",
  {
    your_domain: z.string().describe("Your domain"),
    competitor_domain: z.string().describe("Competitor domain to compare against"),
    location_code: z.number().optional().describe("Location code (default: auto-detect from TLD)"),
    language_code: z.string().optional().describe("Language code (default: auto-detect from TLD)"),
    limit: z.number().optional().describe("Max gap keywords to return (default: 100)"),
  },
  async ({ your_domain, competitor_domain, location_code, language_code, limit }) => {
    try {
      const location = detectLocation(your_domain);
      const result = await getKeywordGap(
        your_domain,
        competitor_domain,
        location_code || location.location_code,
        language_code || location.language_code,
        limit || 100
      );
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

// Tool 4: Keyword Overview (bulk volume check)
server.tool(
  "keyword_overview",
  "Bulk check search volume, difficulty, competition, CPC, and intent for a list of keywords. Max 1000 keywords per call.",
  {
    keywords: z.array(z.string()).describe("Array of keywords to check (max 1000)"),
    location_code: z.number().optional().describe("Location code (default: 2840 for US)"),
    language_code: z.string().optional().describe("Language code (default: en)"),
  },
  async ({ keywords, location_code, language_code }) => {
    try {
      if (keywords.length > 1000) {
        throw new Error("Maximum 1000 keywords per call");
      }
      const result = await getKeywordOverview(
        keywords,
        location_code || 2840,
        language_code || "en"
      );
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

// Tool 5: Get Locations
server.tool(
  "get_locations",
  "Get all available location and language codes for DataForSEO queries. Use this to find the right codes for different countries.",
  {},
  async () => {
    try {
      const result = await getLocations();
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

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SEO Agent MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
