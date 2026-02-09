#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs";

// Types
interface GiphyImage {
  url: string;
  width: string;
  height: string;
  size?: string;
}

interface GiphyGif {
  id: string;
  title: string;
  url: string;
  rating: string;
  images: {
    original: GiphyImage;
    downsized: GiphyImage;
    fixed_height: GiphyImage;
    fixed_width: GiphyImage;
    preview_gif: GiphyImage;
  };
}

interface GiphySearchResponse {
  data: GiphyGif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

// Search GIFs
async function searchGifs(
  query: string,
  limit: number = 10,
  offset: number = 0,
  rating: string = "pg-13"
): Promise<GiphySearchResponse> {
  const params = new URLSearchParams({
    api_key: GIPHY_API_KEY!,
    q: query,
    limit: limit.toString(),
    offset: offset.toString(),
    rating,
    lang: "en",
  });

  const response = await fetch(`${GIPHY_BASE_URL}/search?${params}`);
  if (!response.ok) {
    throw new Error(`Giphy API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<GiphySearchResponse>;
}

// Get trending GIFs
async function getTrending(
  limit: number = 10,
  rating: string = "pg-13"
): Promise<GiphySearchResponse> {
  const params = new URLSearchParams({
    api_key: GIPHY_API_KEY!,
    limit: limit.toString(),
    rating,
  });

  const response = await fetch(`${GIPHY_BASE_URL}/trending?${params}`);
  if (!response.ok) {
    throw new Error(`Giphy API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<GiphySearchResponse>;
}

// Convert GIF to MP4 using ffmpeg (for flicker-free Remotion playback)
async function convertGifToMp4(gifPath: string, mp4Path: string): Promise<void> {
  await execFileAsync("ffmpeg", [
    "-y",
    "-i", gifPath,
    "-movflags", "faststart",
    "-pix_fmt", "yuv420p",
    "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
    "-an",
    mp4Path,
  ]);
}

// Download a GIF and convert to MP4
async function downloadGif(
  gifUrl: string,
  outputDir: string,
  filename: string
): Promise<{ path: string; size: number }> {
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  const response = await fetch(gifUrl);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const safeName = filename.replace(/[^a-z0-9_-]/gi, "-").toLowerCase();
  const gifPath = path.join(outputDir, `${safeName}.gif`);
  const mp4Path = path.join(outputDir, `${safeName}.mp4`);

  // Save GIF temporarily
  await writeFile(gifPath, buffer);

  // Convert to MP4 for Remotion
  try {
    await convertGifToMp4(gifPath, mp4Path);
    // Remove original GIF
    await unlink(gifPath);
    const { size } = await import("fs").then(fs => fs.statSync(mp4Path));
    return { path: mp4Path, size };
  } catch (error) {
    // If ffmpeg fails, keep the GIF as fallback
    console.error("ffmpeg conversion failed, keeping GIF:", error);
    return { path: gifPath, size: buffer.length };
  }
}

// Format GIF results for display
function formatGifResults(gifs: GiphyGif[]) {
  return gifs.map((gif, i) => ({
    index: i + 1,
    id: gif.id,
    title: gif.title,
    url: gif.url,
    rating: gif.rating,
    preview: gif.images.preview_gif?.url || gif.images.fixed_height?.url,
    download_url: gif.images.original.url,
    dimensions: `${gif.images.original.width}x${gif.images.original.height}`,
    size: gif.images.original.size
      ? `${Math.round(parseInt(gif.images.original.size) / 1024)} KB`
      : "unknown",
  }));
}

// Create MCP server
const server = new McpServer({
  name: "giphy-mcp",
  version: "1.0.0",
});

// Tool: Search GIFs
server.tool(
  "search_gifs",
  "Search Giphy for GIFs by query. Returns previews and download URLs. Use specific emotion/reaction queries for best results (e.g., 'mind blown gif', 'surprised pikachu', 'facepalm').",
  {
    query: z.string().describe("Search query (e.g., 'mind blown', 'surprised reaction', 'facepalm')"),
    limit: z
      .number()
      .min(1)
      .max(25)
      .optional()
      .describe("Number of results to return (default: 10, max: 25)"),
    offset: z
      .number()
      .min(0)
      .optional()
      .describe("Pagination offset for more results (default: 0)"),
    rating: z
      .enum(["g", "pg", "pg-13", "r"])
      .optional()
      .describe("Content rating filter (default: pg-13)"),
  },
  async ({ query, limit, offset, rating }) => {
    if (!GIPHY_API_KEY) {
      return {
        content: [{ type: "text" as const, text: "Error: GIPHY_API_KEY not set in environment" }],
        isError: true,
      };
    }

    try {
      const result = await searchGifs(query, limit || 10, offset || 0, rating || "pg-13");
      const formatted = formatGifResults(result.data);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                query,
                total_results: result.pagination.total_count,
                showing: formatted.length,
                offset: result.pagination.offset,
                results: formatted,
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

// Tool: Download a GIF
server.tool(
  "download_gif",
  "Download a GIF from a URL to a local directory. Use after search_gifs to save selected GIFs for use in Remotion video editor.",
  {
    url: z.string().url().describe("The GIF download URL (use download_url from search results)"),
    output_dir: z.string().describe("Directory to save the GIF (e.g., '/path/to/video/gifs')"),
    filename: z.string().describe("Filename without extension (e.g., 'mind-blown', 'surprised-pikachu')"),
  },
  async ({ url, output_dir, filename }) => {
    try {
      const result = await downloadGif(url, output_dir, filename);

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

// Tool: Batch search and download
server.tool(
  "batch_search_and_download",
  "Search for multiple GIF queries and download the top result for each. Ideal for sourcing all GIFs for a video in one go from gif-researcher output.",
  {
    queries: z
      .array(
        z.object({
          query: z.string().describe("Search query"),
          filename: z.string().describe("Output filename without extension"),
        })
      )
      .describe("Array of search queries with desired filenames"),
    output_dir: z.string().describe("Directory to save all GIFs"),
    rating: z
      .enum(["g", "pg", "pg-13", "r"])
      .optional()
      .describe("Content rating filter (default: pg-13)"),
  },
  async ({ queries, output_dir, rating }) => {
    if (!GIPHY_API_KEY) {
      return {
        content: [{ type: "text" as const, text: "Error: GIPHY_API_KEY not set in environment" }],
        isError: true,
      };
    }

    const results: Array<{
      query: string;
      filename: string;
      success: boolean;
      path?: string;
      size?: string;
      title?: string;
      error?: string;
    }> = [];

    for (const { query, filename } of queries) {
      try {
        const searchResult = await searchGifs(query, 1, 0, rating || "pg-13");

        if (searchResult.data.length === 0) {
          results.push({ query, filename, success: false, error: "No results found" });
          continue;
        }

        const gif = searchResult.data[0];
        const downloaded = await downloadGif(gif.images.original.url, output_dir, filename);

        results.push({
          query,
          filename,
          success: true,
          path: downloaded.path,
          size: `${Math.round(downloaded.size / 1024)} KB`,
          title: gif.title,
        });
      } catch (error) {
        results.push({
          query,
          filename,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }

      // Rate limit: small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              output_dir,
              total: queries.length,
              downloaded: results.filter((r) => r.success).length,
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

// Tool: Trending GIFs
server.tool(
  "trending_gifs",
  "Get currently trending GIFs from Giphy. Good for discovering popular reactions.",
  {
    limit: z
      .number()
      .min(1)
      .max(25)
      .optional()
      .describe("Number of results (default: 10, max: 25)"),
    rating: z
      .enum(["g", "pg", "pg-13", "r"])
      .optional()
      .describe("Content rating filter (default: pg-13)"),
  },
  async ({ limit, rating }) => {
    if (!GIPHY_API_KEY) {
      return {
        content: [{ type: "text" as const, text: "Error: GIPHY_API_KEY not set in environment" }],
        isError: true,
      };
    }

    try {
      const result = await getTrending(limit || 10, rating || "pg-13");
      const formatted = formatGifResults(result.data);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ trending: formatted }, null, 2),
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
  console.error("Giphy MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
