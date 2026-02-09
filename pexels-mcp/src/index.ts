#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PEXELS_BASE_URL = "https://api.pexels.com";

// Types
interface PexelsVideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
}

interface PexelsVideo {
  id: number;
  url: string;
  image: string; // thumbnail
  duration: number;
  width: number;
  height: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: PexelsVideoFile[];
}

interface PexelsSearchResponse {
  page: number;
  per_page: number;
  total_results: number;
  videos: PexelsVideo[];
}

// Search videos
async function searchVideos(
  query: string,
  options: {
    orientation?: string;
    size?: string;
    minDuration?: number;
    maxDuration?: number;
    perPage?: number;
    page?: number;
  } = {}
): Promise<PexelsSearchResponse> {
  const params = new URLSearchParams({ query });

  if (options.orientation) params.set("orientation", options.orientation);
  if (options.size) params.set("size", options.size);
  if (options.minDuration) params.set("min_duration", options.minDuration.toString());
  if (options.maxDuration) params.set("max_duration", options.maxDuration.toString());
  params.set("per_page", (options.perPage || 10).toString());
  params.set("page", (options.page || 1).toString());

  const response = await fetch(`${PEXELS_BASE_URL}/videos/search?${params}`, {
    headers: { Authorization: PEXELS_API_KEY! },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<PexelsSearchResponse>;
}

// Pick best video file for desired quality
function pickVideoFile(
  files: PexelsVideoFile[],
  quality: string = "hd"
): PexelsVideoFile | null {
  // Sort by resolution descending
  const sorted = [...files]
    .filter((f) => f.file_type === "video/mp4")
    .sort((a, b) => b.width - a.width);

  if (quality === "uhd") {
    // Prefer 4K+ (width >= 2560)
    return sorted.find((f) => f.width >= 2560) || sorted[0] || null;
  } else if (quality === "hd") {
    // Prefer 1080p (width ~1920), avoid 4K (too large)
    return sorted.find((f) => f.width >= 1920 && f.width < 2560) || sorted[0] || null;
  } else {
    // SD - prefer 720p
    return sorted.find((f) => f.width >= 1280 && f.width < 1920) || sorted[sorted.length - 1] || null;
  }
}

// Download a video
async function downloadVideo(
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
  const filePath = path.join(outputDir, `${safeName}.mp4`);

  await writeFile(filePath, buffer);

  return { path: filePath, size: buffer.length };
}

// Format video results for display
function formatVideoResults(videos: PexelsVideo[]) {
  return videos.map((video, i) => {
    const hdFile = pickVideoFile(video.video_files, "hd");
    return {
      index: i + 1,
      id: video.id,
      url: video.url,
      thumbnail: video.image,
      duration: `${video.duration}s`,
      dimensions: `${video.width}x${video.height}`,
      photographer: video.user.name,
      download_url: hdFile?.link || null,
      download_dimensions: hdFile ? `${hdFile.width}x${hdFile.height}` : null,
      download_fps: hdFile?.fps || null,
    };
  });
}

// Create MCP server
const server = new McpServer({
  name: "pexels-mcp",
  version: "1.0.0",
});

// Tool: Search videos
server.tool(
  "search_videos",
  "Search Pexels for stock videos by query. Returns thumbnails, duration, dimensions, and download URLs. Use for B-roll footage in video production.",
  {
    query: z.string().describe("Search query (e.g., 'technology', 'business meeting', 'abstract data')"),
    orientation: z
      .enum(["landscape", "portrait", "square"])
      .optional()
      .describe("Video orientation (default: any). Use 'landscape' for full-screen B-roll."),
    size: z
      .enum(["large", "medium", "small"])
      .optional()
      .describe("Minimum size: large (4K), medium (1080p), small (720p)"),
    min_duration: z
      .number()
      .optional()
      .describe("Minimum duration in seconds"),
    max_duration: z
      .number()
      .optional()
      .describe("Maximum duration in seconds"),
    per_page: z
      .number()
      .min(1)
      .max(80)
      .optional()
      .describe("Results per page (default: 10, max: 80)"),
  },
  async ({ query, orientation, size, min_duration, max_duration, per_page }) => {
    if (!PEXELS_API_KEY) {
      return {
        content: [{ type: "text" as const, text: "Error: PEXELS_API_KEY not set in environment" }],
        isError: true,
      };
    }

    try {
      const result = await searchVideos(query, {
        orientation,
        size,
        minDuration: min_duration,
        maxDuration: max_duration,
        perPage: per_page || 10,
      });
      const formatted = formatVideoResults(result.videos);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                query,
                total_results: result.total_results,
                showing: formatted.length,
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

// Tool: Download a video
server.tool(
  "download_video",
  "Download a stock video from Pexels to a local directory. Use after search_videos to save clips for Remotion video editor.",
  {
    url: z.string().url().describe("The video download URL (use download_url from search results)"),
    output_dir: z.string().describe("Directory to save the video (e.g., '/path/to/video/broll')"),
    filename: z.string().describe("Filename without extension (e.g., 'tech-abstract', 'business-meeting')"),
  },
  async ({ url, output_dir, filename }) => {
    try {
      const result = await downloadVideo(url, output_dir, filename);

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
  "Search for multiple video queries and download the best result for each. Ideal for sourcing all B-roll for a video in one go from broll-prompter output.",
  {
    queries: z
      .array(
        z.object({
          query: z.string().describe("Search query"),
          filename: z.string().describe("Output filename without extension"),
          orientation: z
            .enum(["landscape", "portrait", "square"])
            .optional()
            .describe("Video orientation (default: landscape)"),
        })
      )
      .describe("Array of search queries with desired filenames"),
    output_dir: z.string().describe("Directory to save all videos"),
    quality: z
      .enum(["hd", "sd", "uhd"])
      .optional()
      .describe("Video quality: hd (1080p, default), sd (720p), uhd (4K)"),
  },
  async ({ queries, output_dir, quality }) => {
    if (!PEXELS_API_KEY) {
      return {
        content: [{ type: "text" as const, text: "Error: PEXELS_API_KEY not set in environment" }],
        isError: true,
      };
    }

    const results: Array<{
      query: string;
      filename: string;
      success: boolean;
      path?: string;
      size?: string;
      duration?: string;
      photographer?: string;
      error?: string;
    }> = [];

    for (const { query, filename, orientation } of queries) {
      try {
        const searchResult = await searchVideos(query, {
          orientation: orientation || "landscape",
          perPage: 1,
        });

        if (searchResult.videos.length === 0) {
          results.push({ query, filename, success: false, error: "No results found" });
          continue;
        }

        const video = searchResult.videos[0];
        const file = pickVideoFile(video.video_files, quality || "hd");

        if (!file) {
          results.push({ query, filename, success: false, error: "No suitable video file found" });
          continue;
        }

        const downloaded = await downloadVideo(file.link, output_dir, filename);

        results.push({
          query,
          filename,
          success: true,
          path: downloaded.path,
          size: `${Math.round(downloaded.size / 1024)} KB`,
          duration: `${video.duration}s`,
          photographer: video.user.name,
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

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Pexels MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
