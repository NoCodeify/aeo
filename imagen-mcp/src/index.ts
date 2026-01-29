#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import mime from "mime";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Initialize Gemini client
const geminiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Types
interface GeneratedImage {
  filename: string;
  path: string;
  mimeType: string;
  size: number;
}

interface GenerationResult {
  prompt: string;
  outputDir: string;
  images: GeneratedImage[];
  errors: string[];
}

// Generate a single image
async function generateImage(
  prompt: string,
  outputDir: string,
  baseName: string,
  index: number
): Promise<GeneratedImage | null> {
  try {
    const config = {
      responseModalities: ["IMAGE", "TEXT"],
      imageConfig: {
        imageSize: "4K",
      },
    };

    const contents = [
      {
        role: "user" as const,
        parts: [{ text: prompt }],
      },
    ];

    const response = await geminiClient.models.generateContentStream({
      model: "gemini-3-pro-image-preview",
      config,
      contents,
    });

    for await (const chunk of response) {
      if (!chunk.candidates?.[0]?.content?.parts) {
        continue;
      }

      const inlineData = chunk.candidates[0].content.parts[0]?.inlineData;
      if (inlineData?.data && inlineData?.mimeType) {
        const fileExtension = mime.getExtension(inlineData.mimeType) || "png";
        const filename = `${baseName}_${index}.${fileExtension}`;
        const filePath = path.join(outputDir, filename);
        const buffer = Buffer.from(inlineData.data, "base64");

        await writeFile(filePath, buffer);

        return {
          filename,
          path: filePath,
          mimeType: inlineData.mimeType,
          size: buffer.length,
        };
      }
    }

    return null;
  } catch (error) {
    throw new Error(`Image generation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Generate multiple images for a prompt
async function generateImages(
  prompt: string,
  outputDir: string,
  baseName: string,
  count: number = 3
): Promise<GenerationResult> {
  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  const images: GeneratedImage[] = [];
  const errors: string[] = [];

  // Generate images in parallel
  const promises = Array.from({ length: count }, (_, i) =>
    generateImage(prompt, outputDir, baseName, i + 1)
      .then((result) => {
        if (result) {
          images.push(result);
        } else {
          errors.push(`Generation ${i + 1}: No image returned`);
        }
      })
      .catch((error) => {
        errors.push(`Generation ${i + 1}: ${error instanceof Error ? error.message : String(error)}`);
      })
  );

  await Promise.all(promises);

  return {
    prompt,
    outputDir,
    images: images.sort((a, b) => a.filename.localeCompare(b.filename)),
    errors,
  };
}

// Create MCP server
const server = new McpServer({
  name: "imagen-mcp",
  version: "1.0.0",
});

// Tool: Generate images from a prompt
server.tool(
  "generate_images",
  "Generate multiple AI images from a text prompt using Gemini's image generation model. By default generates 3 variations so you can pick the best one.",
  {
    prompt: z.string().describe("The detailed prompt for image generation"),
    output_dir: z.string().describe("Directory path to save the generated images"),
    name: z.string().describe("Base name for the output files (e.g., '3-layer-diagram')"),
    count: z.number().min(1).max(5).optional().describe("Number of image variations to generate (default: 3, max: 5)"),
  },
  async ({ prompt, output_dir, name, count }) => {
    try {
      const result = await generateImages(prompt, output_dir, name, count || 3);

      const summary = {
        success: result.images.length > 0,
        prompt: result.prompt.slice(0, 200) + (result.prompt.length > 200 ? "..." : ""),
        outputDir: result.outputDir,
        generatedImages: result.images.map((img) => ({
          filename: img.filename,
          path: img.path,
          size: `${Math.round(img.size / 1024)} KB`,
        })),
        errors: result.errors.length > 0 ? result.errors : undefined,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(summary, null, 2),
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

// Tool: Batch generate images from multiple prompts
server.tool(
  "batch_generate_images",
  "Generate images for multiple prompts in sequence. Each prompt generates 3 variations.",
  {
    prompts: z
      .array(
        z.object({
          prompt: z.string().describe("The image generation prompt"),
          name: z.string().describe("Base name for output files"),
        })
      )
      .describe("Array of prompts with their output names"),
    output_dir: z.string().describe("Directory path to save all generated images"),
    count_per_prompt: z.number().min(1).max(5).optional().describe("Variations per prompt (default: 3)"),
  },
  async ({ prompts, output_dir, count_per_prompt }) => {
    const results: Array<{
      name: string;
      success: boolean;
      images: string[];
      errors?: string[];
    }> = [];

    for (const { prompt, name } of prompts) {
      try {
        const result = await generateImages(prompt, output_dir, name, count_per_prompt || 3);
        results.push({
          name,
          success: result.images.length > 0,
          images: result.images.map((img) => img.filename),
          errors: result.errors.length > 0 ? result.errors : undefined,
        });
      } catch (error) {
        results.push({
          name,
          success: false,
          images: [],
          errors: [error instanceof Error ? error.message : String(error)],
        });
      }

      // Small delay between prompts to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const summary = {
      outputDir: output_dir,
      totalPrompts: prompts.length,
      successful: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      results,
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

// Tool: Generate B-roll images from a broll-prompts.md file
server.tool(
  "generate_broll_from_file",
  "Parse a broll-prompts.md file and generate images for each prompt. Extracts prompts from markdown structure.",
  {
    file_path: z.string().describe("Path to the broll-prompts.md file"),
    output_dir: z.string().describe("Directory to save generated images"),
    count_per_prompt: z.number().min(1).max(5).optional().describe("Variations per prompt (default: 3)"),
  },
  async ({ file_path, output_dir, count_per_prompt }) => {
    try {
      // Read the file
      const { readFile } = await import("fs/promises");
      const content = await readFile(file_path, "utf-8");

      // Parse prompts from markdown
      // Looking for sections with ## or ### headers followed by prompt content
      const promptRegex = /##\s*(?:Prompt\s*)?(\d+)[:\s]*([^\n]+)\n[\s\S]*?(?:```\n([\s\S]*?)```|(?:\*\*Prompt:\*\*|Prompt:)\s*([\s\S]*?)(?=\n##|\n---|\Z))/gi;

      const prompts: Array<{ name: string; prompt: string }> = [];
      let match;

      while ((match = promptRegex.exec(content)) !== null) {
        const num = match[1];
        const title = match[2].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
        const prompt = (match[3] || match[4] || "").trim();

        if (prompt) {
          prompts.push({
            name: `${num.padStart(2, "0")}-${title}`,
            prompt,
          });
        }
      }

      if (prompts.length === 0) {
        // Try alternative parsing - look for quoted prompts or code blocks
        const codeBlockRegex = /```(?:text)?\n([\s\S]*?)```/g;
        let blockIndex = 1;
        while ((match = codeBlockRegex.exec(content)) !== null) {
          const prompt = match[1].trim();
          if (prompt.length > 50) {
            // Likely a real prompt
            prompts.push({
              name: `broll-${blockIndex.toString().padStart(2, "0")}`,
              prompt,
            });
            blockIndex++;
          }
        }
      }

      if (prompts.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: Could not parse any prompts from the file. Expected markdown with ## Prompt N headers or code blocks.",
            },
          ],
          isError: true,
        };
      }

      // Generate images for each prompt
      const results: Array<{
        name: string;
        success: boolean;
        images: string[];
        errors?: string[];
      }> = [];

      for (const { name, prompt } of prompts) {
        try {
          const result = await generateImages(prompt, output_dir, name, count_per_prompt || 3);
          results.push({
            name,
            success: result.images.length > 0,
            images: result.images.map((img) => img.filename),
            errors: result.errors.length > 0 ? result.errors : undefined,
          });
        } catch (error) {
          results.push({
            name,
            success: false,
            images: [],
            errors: [error instanceof Error ? error.message : String(error)],
          });
        }

        // Delay between prompts
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      const summary = {
        sourceFile: file_path,
        outputDir: output_dir,
        totalPrompts: prompts.length,
        successful: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
        results,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(summary, null, 2),
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
  console.error("Imagen MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
