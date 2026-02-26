#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { writeFile, mkdir, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const IMGFLIP_USERNAME = process.env.IMGFLIP_USERNAME;
const IMGFLIP_PASSWORD = process.env.IMGFLIP_PASSWORD;
const IMGFLIP_BASE_URL = "https://api.imgflip.com";

// Types
interface ImgflipMeme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

interface ImgflipGetMemesResponse {
  success: boolean;
  data: {
    memes: ImgflipMeme[];
  };
  error_message?: string;
}

interface ImgflipCaptionResponse {
  success: boolean;
  data: {
    url: string;
    page_url: string;
  };
  error_message?: string;
}

// Keyword-to-template mapping for fuzzy search
// Maps common emotions/concepts to meme template names that match them
const KEYWORD_ALIASES: Record<string, string[]> = {
  frustrated: [
    "Hide the Pain Harold",
    "First World Problems",
    "Captain Picard Facepalm",
    "Angry",
    "Table Flip",
    "Waiting Skeleton",
  ],
  angry: [
    "Angry",
    "Woman Yelling At Cat",
    "Change My Mind",
    "Table Flip",
    "Peter Griffin",
    "Triggered",
  ],
  happy: [
    "Success Kid",
    "Buddy Christ",
    "Satisfied Seal",
    "Dancing",
    "Celebration",
    "Good Fellas Hilarious",
  ],
  sad: [
    "Crying",
    "First World Problems",
    "I Know That Feel Bro",
    "Forever Alone",
    "Sad Pablo Escobar",
    "Sad Keanu",
  ],
  surprised: [
    "Surprised Pikachu",
    "Jackie Chan WTF",
    "Wait What",
    "Shocked",
    "Unsettled Tom",
    "Mother Of God",
  ],
  confused: [
    "Confused",
    "Jackie Chan WTF",
    "Futurama Fry",
    "Math Lady",
    "Questioning",
    "Wait What",
  ],
  smart: [
    "Roll Safe Think About It",
    "Expanding Brain",
    "Galaxy Brain",
    "Big Brain",
    "Thinking",
    "Tapping Head",
  ],
  thinking: [
    "Roll Safe Think About It",
    "Futurama Fry",
    "Thinking",
    "Hmm",
    "Philosoraptor",
    "Tapping Head",
  ],
  winning: [
    "Success Kid",
    "Leonardo Dicaprio Cheers",
    "Buddy Christ",
    "Stonks",
    "Winning",
    "Champion",
  ],
  losing: [
    "Bad Luck Brian",
    "Disaster Girl",
    "First World Problems",
    "This Is Fine",
    "Not Stonks",
    "Failure",
  ],
  sarcastic: [
    "Sarcastic",
    "Wonka",
    "Dr Evil Laser",
    "Air Quotes",
    "Sure Jan",
    "Oh Really",
  ],
  excited: [
    "Excited",
    "Leonardo Dicaprio Cheers",
    "Shut Up And Take My Money",
    "Celebration",
    "Yes",
    "Lets Go",
  ],
  scared: [
    "Scared",
    "Afraid To Ask",
    "Panik",
    "Sweating",
    "Run Away",
    "Hide",
  ],
  lazy: [
    "Lazy",
    "I Should Buy A Boat Cat",
    "Couch Potato",
    "Sleeping",
    "Do Nothing",
    "Procrastination",
  ],
  mind_blown: [
    "Expanding Brain",
    "Galaxy Brain",
    "Mind Blown",
    "Whoa",
    "Matrix Morpheus",
    "Blown Away",
  ],
  comparison: [
    "Drake Hotline Bling",
    "Buff Doge vs. Cheems",
    "Left Exit 12",
    "Two Buttons",
    "Distracted Boyfriend",
    "Tuxedo Winnie The Pooh",
  ],
  waiting: [
    "Waiting Skeleton",
    "Skeleton",
    "Still Waiting",
    "Any Day Now",
    "Patiently Waiting",
  ],
  awkward: [
    "Awkward",
    "Seal",
    "Socially Awesome Awkward Penguin",
    "Nervous",
    "Uncomfortable",
  ],
  relatable: [
    "Change My Mind",
    "Hard To Swallow Pills",
    "The Scroll Of Truth",
    "They're The Same Picture",
    "Facts",
  ],
  distracted: [
    "Distracted Boyfriend",
    "Squirrel",
    "Ooh",
    "Shiny",
  ],
  this_is_fine: [
    "This Is Fine",
    "Everything Is Fine",
    "Fine",
    "Dog Fire",
  ],
  choice: [
    "Two Buttons",
    "Left Exit 12",
    "Drake Hotline Bling",
    "Distracted Boyfriend",
    "Red Pill Blue Pill",
  ],
  level_up: [
    "Expanding Brain",
    "Tuxedo Winnie The Pooh",
    "Upgrade",
    "Evolution",
    "Stonks",
  ],
};

// Template cache
let cachedMemes: ImgflipMeme[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

// Fetch and cache meme templates
async function getMemeTemplates(): Promise<ImgflipMeme[]> {
  const now = Date.now();
  if (cachedMemes && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedMemes;
  }

  const response = await fetch(`${IMGFLIP_BASE_URL}/get_memes`);
  if (!response.ok) {
    throw new Error(`Imgflip API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as ImgflipGetMemesResponse;
  if (!data.success) {
    throw new Error(`Imgflip API error: ${data.error_message || "Unknown error"}`);
  }

  cachedMemes = data.data.memes;
  cacheTimestamp = now;
  return cachedMemes;
}

// Search memes by query with fuzzy matching
function filterMemes(memes: ImgflipMeme[], query: string, limit: number): ImgflipMeme[] {
  const queryLower = query.toLowerCase().trim();
  const queryTerms = queryLower.split(/\s+/);

  // Build a set of alias-matched template names for this query
  const aliasMatches = new Set<string>();
  for (const [keyword, templateNames] of Object.entries(KEYWORD_ALIASES)) {
    // Check if the query contains this keyword (or close variants)
    if (
      queryLower.includes(keyword) ||
      queryLower.includes(keyword.replace(/_/g, " "))
    ) {
      for (const name of templateNames) {
        aliasMatches.add(name.toLowerCase());
      }
    }
  }

  // Score each meme
  const scored = memes.map((meme) => {
    const nameLower = meme.name.toLowerCase();
    let score = 0;

    // Exact name match (highest priority)
    if (nameLower === queryLower) {
      score += 100;
    }

    // Full query is a substring of the name
    if (nameLower.includes(queryLower)) {
      score += 50;
    }

    // Name is a substring of the query
    if (queryLower.includes(nameLower)) {
      score += 40;
    }

    // Individual term matches
    for (const term of queryTerms) {
      if (term.length < 2) continue;
      if (nameLower.includes(term)) {
        score += 20;
      }
    }

    // Alias/keyword match
    for (const aliasName of aliasMatches) {
      if (nameLower.includes(aliasName) || aliasName.includes(nameLower)) {
        score += 30;
      }
      // Partial word matches within alias names
      const aliasWords = aliasName.split(/\s+/);
      for (const word of aliasWords) {
        if (word.length > 2 && nameLower.includes(word)) {
          score += 10;
        }
      }
    }

    return { meme, score };
  });

  // Filter to those with any match, sort by score descending
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.meme);
}

// Caption a meme template
async function captionMeme(
  templateId: string,
  topText?: string,
  bottomText?: string,
  font?: string
): Promise<ImgflipCaptionResponse> {
  if (!IMGFLIP_USERNAME || !IMGFLIP_PASSWORD) {
    throw new Error(
      "IMGFLIP_USERNAME and IMGFLIP_PASSWORD must be set in environment variables"
    );
  }

  const params = new URLSearchParams({
    template_id: templateId,
    username: IMGFLIP_USERNAME,
    password: IMGFLIP_PASSWORD,
  });

  if (topText !== undefined) params.set("text0", topText);
  if (bottomText !== undefined) params.set("text1", bottomText);
  if (font) params.set("font", font);

  const response = await fetch(`${IMGFLIP_BASE_URL}/caption_image`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(`Imgflip API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as ImgflipCaptionResponse;
  if (!data.success) {
    throw new Error(`Imgflip caption error: ${data.error_message || "Unknown error"}`);
  }

  return data;
}

// Download an image from a URL
async function downloadImage(
  url: string,
  outputDir: string,
  filename: string
): Promise<{ path: string; size: number }> {
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const safeName = filename.replace(/[^a-z0-9_-]/gi, "-").toLowerCase();
  const filePath = path.join(outputDir, `${safeName}.jpg`);

  await writeFile(filePath, buffer);

  const fileInfo = await stat(filePath);
  return { path: filePath, size: fileInfo.size };
}

// Format meme results for display
function formatMemeResults(memes: ImgflipMeme[]) {
  return memes.map((meme, i) => ({
    index: i + 1,
    id: meme.id,
    name: meme.name,
    url: meme.url,
    width: meme.width,
    height: meme.height,
    box_count: meme.box_count,
  }));
}

// Create MCP server
const server = new McpServer({
  name: "imgflip-mcp",
  version: "1.0.0",
});

// Tool: Search memes
server.tool(
  "search_memes",
  "Search Imgflip meme templates by name or keyword. Supports fuzzy matching and emotion keywords (e.g., 'frustrated', 'surprised', 'comparison'). Returns template IDs for use with caption_meme.",
  {
    query: z
      .string()
      .describe(
        "Search query - meme name or emotion keyword (e.g., 'drake', 'distracted boyfriend', 'frustrated', 'mind blown')"
      ),
    limit: z
      .number()
      .min(1)
      .max(100)
      .optional()
      .describe("Max results to return (default: 10)"),
  },
  async ({ query, limit }) => {
    try {
      const memes = await getMemeTemplates();
      const filtered = filterMemes(memes, query, limit || 10);

      if (filtered.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  query,
                  results: [],
                  message: `No meme templates found matching "${query}". Try a different keyword or use get_popular_memes to browse available templates.`,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                query,
                total_results: filtered.length,
                results: formatMemeResults(filtered),
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
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Get popular memes
server.tool(
  "get_popular_memes",
  "Get the most popular meme templates from Imgflip, sorted by popularity. Use this to browse available templates when you don't have a specific meme in mind.",
  {
    limit: z
      .number()
      .min(1)
      .max(100)
      .optional()
      .describe("Number of templates to return (default: 25, max: 100)"),
  },
  async ({ limit }) => {
    try {
      const memes = await getMemeTemplates();
      const sliced = memes.slice(0, limit || 25);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                total_available: memes.length,
                showing: sliced.length,
                templates: formatMemeResults(sliced),
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
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Caption a meme
server.tool(
  "caption_meme",
  "Generate a captioned meme image from a template. Use search_memes or get_popular_memes first to find the template_id. Returns a URL to the generated meme image.",
  {
    template_id: z
      .string()
      .describe("The meme template ID (from search_memes or get_popular_memes)"),
    top_text: z
      .string()
      .optional()
      .describe("Text for the top of the meme"),
    bottom_text: z
      .string()
      .optional()
      .describe("Text for the bottom of the meme"),
    font: z
      .enum(["impact", "arial"])
      .optional()
      .describe("Font to use (default: 'impact'). Use 'arial' for a cleaner look."),
  },
  async ({ template_id, top_text, bottom_text, font }) => {
    if (!IMGFLIP_USERNAME || !IMGFLIP_PASSWORD) {
      return {
        content: [
          {
            type: "text" as const,
            text: "Error: IMGFLIP_USERNAME and IMGFLIP_PASSWORD must be set in environment variables. Create a free account at imgflip.com.",
          },
        ],
        isError: true,
      };
    }

    try {
      // Look up template name for the response
      let templateName = "Unknown";
      try {
        const memes = await getMemeTemplates();
        const match = memes.find((m) => m.id === template_id);
        if (match) templateName = match.name;
      } catch {
        // Non-critical, continue without name
      }

      const result = await captionMeme(template_id, top_text, bottom_text, font);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                success: true,
                url: result.data.url,
                page_url: result.data.page_url,
                template_name: templateName,
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
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Download a meme
server.tool(
  "download_meme",
  "Download a meme image from a URL to a local directory. Use after caption_meme to save the generated meme.",
  {
    url: z.string().url().describe("The meme image URL (from caption_meme result)"),
    output_dir: z
      .string()
      .describe("Directory to save the meme image (e.g., '/path/to/memes')"),
    filename: z
      .string()
      .describe("Filename without extension (e.g., 'drake-coding-vs-debugging')"),
  },
  async ({ url, output_dir, filename }) => {
    try {
      const result = await downloadImage(url, output_dir, filename);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                success: true,
                path: result.path,
                size: `${Math.round(result.size / 1024)} KB`,
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
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Batch caption and download
server.tool(
  "batch_caption_and_download",
  "Caption multiple memes and download them all to a directory. Runs sequentially to respect Imgflip rate limits. Ideal for generating a batch of memes in one go.",
  {
    memes: z
      .array(
        z.object({
          template_id: z.string().describe("Meme template ID"),
          top_text: z.string().optional().describe("Top text"),
          bottom_text: z.string().optional().describe("Bottom text"),
          filename: z.string().describe("Output filename without extension"),
        })
      )
      .describe("Array of memes to generate"),
    output_dir: z.string().describe("Directory to save all meme images"),
  },
  async ({ memes: memeRequests, output_dir }) => {
    if (!IMGFLIP_USERNAME || !IMGFLIP_PASSWORD) {
      return {
        content: [
          {
            type: "text" as const,
            text: "Error: IMGFLIP_USERNAME and IMGFLIP_PASSWORD must be set in environment variables. Create a free account at imgflip.com.",
          },
        ],
        isError: true,
      };
    }

    // Pre-fetch templates for name lookups
    let templateLookup: Map<string, string> = new Map();
    try {
      const allMemes = await getMemeTemplates();
      for (const m of allMemes) {
        templateLookup.set(m.id, m.name);
      }
    } catch {
      // Non-critical
    }

    const results: Array<{
      filename: string;
      template_id: string;
      template_name?: string;
      success: boolean;
      path?: string;
      url?: string;
      size?: string;
      error?: string;
    }> = [];

    for (const req of memeRequests) {
      try {
        const captionResult = await captionMeme(
          req.template_id,
          req.top_text,
          req.bottom_text
        );

        const downloadResult = await downloadImage(
          captionResult.data.url,
          output_dir,
          req.filename
        );

        results.push({
          filename: req.filename,
          template_id: req.template_id,
          template_name: templateLookup.get(req.template_id),
          success: true,
          path: downloadResult.path,
          url: captionResult.data.url,
          size: `${Math.round(downloadResult.size / 1024)} KB`,
        });
      } catch (error) {
        results.push({
          filename: req.filename,
          template_id: req.template_id,
          template_name: templateLookup.get(req.template_id),
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }

      // Rate limit: delay between requests
      await new Promise((resolve) => setTimeout(resolve, 750));
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              output_dir,
              total: memeRequests.length,
              generated: results.filter((r) => r.success).length,
              failed: results.filter((r) => !r.success).length,
              results,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Imgflip MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
