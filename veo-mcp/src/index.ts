#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { execSync } from "child_process";
import path from "path";

const geminiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// ── Types ───────────────────────────────────────────────────────────
interface GeneratedVideo {
  filename: string;
  path: string;
  size: string;
}

// ── Core: generate video via Veo ────────────────────────────────────
async function generateVeoVideo(opts: {
  model: string;
  prompt: string;
  imagePath?: string;
  outputDir: string;
  name: string;
  aspectRatio: string;
  durationSeconds: number;
  pixelArtMode: boolean;
}): Promise<GeneratedVideo> {
  // Build source
  const source: Record<string, any> = { prompt: opts.prompt };

  if (opts.imagePath) {
    const imageBuffer = await readFile(opts.imagePath);
    source.image = {
      imageBytes: imageBuffer.toString("base64"),
      mimeType: opts.imagePath.endsWith(".png") ? "image/png" : "image/jpeg",
    };
  }

  let operation = await (geminiClient.models as any).generateVideos({
    model: opts.model,
    source,
    config: {
      numberOfVideos: 1,
      aspectRatio: opts.aspectRatio,
      resolution: "720p",
      durationSeconds: opts.durationSeconds,
    },
  });

  // Poll for completion
  while (!operation.done) {
    await new Promise((r) => setTimeout(r, 10000));
    operation = await (geminiClient.operations as any).getVideosOperation({
      operation,
    });
  }

  const videos = operation.response?.generatedVideos ?? [];
  if (videos.length === 0 || !videos[0]?.video?.uri) {
    throw new Error("No video generated");
  }

  const videoUri = videos[0].video.uri;
  const response = await fetch(
    `${videoUri}&key=${process.env.GEMINI_API_KEY}`
  );
  const buffer = await response.arrayBuffer();

  await mkdir(opts.outputDir, { recursive: true });

  const rawPath = path.join(opts.outputDir, `${opts.name}-raw.mp4`);
  const finalPath = path.join(opts.outputDir, `${opts.name}.mp4`);

  await writeFile(rawPath, Buffer.from(buffer));

  if (opts.pixelArtMode) {
    // Drop to 10fps (pixel art timing), upscale 4K nearest-neighbor, strip audio, good compression
    try {
      execSync(
        `ffmpeg -y -i "${rawPath}" -vf "fps=10,scale=3840:2160:flags=neighbor" -r 30 -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p "${finalPath}"`,
        { stdio: "pipe" }
      );
    } catch {
      // Fallback: just strip audio
      execSync(
        `ffmpeg -y -i "${rawPath}" -an -c:v copy "${finalPath}"`,
        { stdio: "pipe" }
      );
    }
  } else {
    // Standard: strip audio only
    execSync(
      `ffmpeg -y -i "${rawPath}" -an -c:v copy "${finalPath}"`,
      { stdio: "pipe" }
    );
  }

  // Get file size
  const { size } = await readFile(finalPath).then((b) => ({
    size: `${Math.round(b.length / 1024)} KB`,
  }));

  return { filename: path.basename(finalPath), path: finalPath, size };
}

// ── MCP Server ──────────────────────────────────────────────────────
const server = new McpServer({
  name: "veo-mcp",
  version: "1.0.0",
});

// Tool: generate_video (text-to-video)
server.tool(
  "generate_video",
  "Generate a video from a text prompt using Google Veo 3.1. Returns an 8s video clip.",
  {
    prompt: z.string().describe("Detailed prompt describing the video to generate"),
    output_dir: z.string().describe("Directory to save the video"),
    name: z.string().describe("Base name for the output file (e.g., 'hero-animation')"),
    model: z
      .enum(["veo-3.1-generate-preview", "veo-3.1-fast-generate-preview"])
      .default("veo-3.1-generate-preview")
      .describe("Model: 'veo-3.1-generate-preview' (HQ) or 'veo-3.1-fast-generate-preview' (fast)"),
    aspect_ratio: z
      .enum(["16:9", "9:16"])
      .default("16:9")
      .describe("Aspect ratio"),
    duration_seconds: z
      .number()
      .min(4)
      .max(8)
      .default(4)
      .describe("Duration in seconds (4-8)"),
    pixel_art_mode: z
      .boolean()
      .default(false)
      .describe("Post-process for pixel art: drop to 10fps, upscale 4K nearest-neighbor, strip audio"),
  },
  async ({ prompt, output_dir, name, model, aspect_ratio, duration_seconds, pixel_art_mode }) => {
    try {
      const video = await generateVeoVideo({
        model,
        prompt,
        outputDir: output_dir,
        name,
        aspectRatio: aspect_ratio,
        durationSeconds: duration_seconds,
        pixelArtMode: pixel_art_mode,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                prompt: prompt.slice(0, 200) + "...",
                video,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [{ type: "text", text: JSON.stringify({ success: false, error: err.message }) }],
      };
    }
  }
);

// Tool: animate_image (image-to-video)
server.tool(
  "animate_image",
  "Animate a static image into a video using Google Veo 3.1. Feed it a pixel art scene and describe the animation. Returns a video clip.",
  {
    image_path: z.string().describe("Absolute path to the source image (JPG/PNG)"),
    prompt: z
      .string()
      .describe(
        "Animation prompt describing what should move/animate in the image. Be specific about motion: rain, glow, flicker, steam, particles, etc."
      ),
    output_dir: z.string().describe("Directory to save the video"),
    name: z.string().describe("Base name for the output file"),
    model: z
      .enum(["veo-3.1-generate-preview", "veo-3.1-fast-generate-preview"])
      .default("veo-3.1-generate-preview")
      .describe("Model: HQ or fast"),
    aspect_ratio: z.enum(["16:9", "9:16"]).default("16:9").describe("Aspect ratio"),
    duration_seconds: z.number().min(4).max(8).default(4).describe("Duration (4-8s)"),
    pixel_art_mode: z
      .boolean()
      .default(true)
      .describe("Post-process for pixel art: 10fps, 4K nearest-neighbor, no audio. Default true."),
  },
  async ({
    image_path,
    prompt,
    output_dir,
    name,
    model,
    aspect_ratio,
    duration_seconds,
    pixel_art_mode,
  }) => {
    try {
      if (!existsSync(image_path)) {
        throw new Error(`Image not found: ${image_path}`);
      }

      const video = await generateVeoVideo({
        model,
        prompt,
        imagePath: image_path,
        outputDir: output_dir,
        name,
        aspectRatio: aspect_ratio,
        durationSeconds: duration_seconds,
        pixelArtMode: pixel_art_mode,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                sourceImage: path.basename(image_path),
                prompt: prompt.slice(0, 200) + "...",
                video,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [{ type: "text", text: JSON.stringify({ success: false, error: err.message }) }],
      };
    }
  }
);

// Tool: batch_animate (multiple images)
server.tool(
  "batch_animate",
  "Animate multiple images into videos in sequence. Each entry needs an image path, animation prompt, and output name.",
  {
    scenes: z
      .array(
        z.object({
          image_path: z.string().describe("Absolute path to source image"),
          prompt: z.string().describe("Animation prompt"),
          name: z.string().describe("Output filename base"),
        })
      )
      .describe("Array of scenes to animate"),
    output_dir: z.string().describe("Directory to save all videos"),
    model: z
      .enum(["veo-3.1-generate-preview", "veo-3.1-fast-generate-preview"])
      .default("veo-3.1-generate-preview")
      .describe("Model for all scenes"),
    duration_seconds: z.number().min(4).max(8).default(4).describe("Duration per video"),
    pixel_art_mode: z.boolean().default(true).describe("Pixel art post-processing"),
  },
  async ({ scenes, output_dir, model, duration_seconds, pixel_art_mode }) => {
    const results: any[] = [];

    for (const scene of scenes) {
      try {
        const video = await generateVeoVideo({
          model,
          prompt: scene.prompt,
          imagePath: scene.image_path,
          outputDir: output_dir,
          name: scene.name,
          aspectRatio: "16:9",
          durationSeconds: duration_seconds,
          pixelArtMode: pixel_art_mode,
        });
        results.push({ name: scene.name, success: true, video });
      } catch (err: any) {
        results.push({ name: scene.name, success: false, error: err.message });
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { success: true, generated: results.filter((r) => r.success).length, total: scenes.length, results },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ── Start server ────────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Veo MCP server running on stdio");
}

main().catch(console.error);
