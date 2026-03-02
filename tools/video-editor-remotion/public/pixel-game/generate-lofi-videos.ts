// Animate lo-fi pixel art scenes using Veo 3.1
// Usage: npx ts-node generate-lofi-videos.ts
// Requires: GEMINI_API_KEY env var, npm install @google/genai

import { GoogleGenAI } from "@google/genai";
import { writeFile, readFile } from "fs/promises";
import { execSync } from "child_process";
import path from "path";

const SCENES = [
  // ── Generic lo-fi scenes ──────────────────────────────────────
  {
    image: "lofi-coding-desk_2.jpg",
    output: "lofi-coding-desk-animated",
    prompt:
      "Subtle lo-fi animation of this pixel art scene. Gentle rain falling outside the window. Monitor screens have a soft flickering glow. Coffee mug has thin wisps of steam rising. City lights in background twinkle faintly. Very slow, calm, ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  {
    image: "lofi-city-rain_3.jpg",
    output: "lofi-city-rain-animated",
    prompt:
      "Subtle lo-fi animation of this pixel art cyberpunk city scene. Rain falling steadily with droplets hitting puddles creating small ripples. Neon signs glow and flicker slightly. Puddle reflections shimmer. The figure with umbrella sways gently. Faint fog drifts slowly. Very atmospheric, calm ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  {
    image: "lofi-home-office_3.jpg",
    output: "lofi-home-office-animated",
    prompt:
      "Subtle lo-fi animation of this pixel art cozy home office scene. Fairy lights on the wall twinkle softly. Monitor screen has gentle glow fluctuation showing dashboard data. Cat on the chair breathes slowly, body rising and falling gently. Sunset light through the window shifts very subtly. Very slow, calm, ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  {
    image: "lofi-server-room_1.jpg",
    output: "lofi-server-room-animated",
    prompt:
      "Subtle lo-fi animation of this pixel art dark server room scene. Server rack LED lights blink randomly in green and red patterns. Thin haze and fog drifts slowly through the room. Laptop screen has a soft pulsing glow. Overhead fluorescent lights flicker very faintly. Dust particles float in the light beams. Very atmospheric, calm ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  // ── M1: Distribution First scenes ─────────────────────────────
  {
    image: "m1-money-burning_1.jpg",
    output: "m1-money-burning-animated",
    prompt:
      "Subtle lo-fi animation of this pixel art scene of money dissolving in a dark void. Dollar bills slowly rotate and disintegrate into green pixel dust. Coins tumble and glow. ERROR windows flash and glitch. The cost counter in the corner ticks upward. Broken phone screens flicker with static. Red warning particles drift. Haunting but mesmerizing ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  {
    image: "m1-graveyard_2.jpg",
    output: "m1-graveyard-animated",
    prompt:
      "Subtle lo-fi animation of this pixel art digital graveyard scene. Code symbols float gently like fireflies in the night sky. Tombstone app icons pulse with a faint ghostly glow. Cobwebs sway very slightly. Fog creeps slowly along the ground. The warm light at the end of the path flickers softly. Moon casts shifting light through clouds. Very eerie but calm ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  {
    image: "m1-building-alone_1.jpg",
    output: "m1-building-alone-animated",
    prompt:
      "Subtle lo-fi animation of this pixel art scene of a lonely developer at 3AM. Rain streams down the window steadily. Monitor screens flicker with code scrolling slowly. The 0 USERS notification pulses with a sad red glow. Steam wisps rise from coffee mugs. The 03:00 clock digits glow. Crumpled papers sit still. Very melancholic, slow, atmospheric ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  {
    image: "m1-customer-convo_1.jpg",
    output: "m1-customer-convo-animated",
    prompt:
      "Subtle lo-fi animation of this pixel art coffee shop scene. Warm sunlight streams through the window with dust particles floating in the beams. People walk past outside the window slowly. The laptop screen glows softly showing a video call. Steam rises gently from the coffee cup. Cafe lamp lights have a warm flicker. Very warm, hopeful, calm ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
];

async function generateVideo(
  ai: GoogleGenAI,
  scene: (typeof SCENES)[0],
  dir: string
) {
  console.log(`\n🎬 Starting: ${scene.output}`);
  console.log(`   Image: ${scene.image}`);

  // Read image and convert to base64
  const imagePath = path.join(dir, scene.image);
  const imageBuffer = await readFile(imagePath);
  const imageBase64 = imageBuffer.toString("base64");

  let operation = await ai.models.generateVideos({
    model: "veo-3.1-fast-generate-preview",
    source: {
      image: {
        imageBytes: imageBase64,
        mimeType: "image/jpeg",
      },
      prompt: scene.prompt,
    },
    config: {
      numberOfVideos: 1,
      aspectRatio: "16:9",
      resolution: "720p",
      durationSeconds: 8,
    },
  });

  console.log(`   Polling for completion...`);
  let pollCount = 0;

  while (!operation.done) {
    pollCount++;
    const elapsed = pollCount * 10;
    process.stdout.write(
      `\r   Waiting... ${elapsed}s elapsed (operation: ${operation.name})`
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({
      operation: operation,
    });
  }

  console.log(`\n   ✅ Generation complete!`);

  const videos = operation.response?.generatedVideos ?? [];
  console.log(`   Generated ${videos.length} video(s)`);

  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    if (!video?.video?.uri) {
      console.log(`   ⚠️ Video ${i} has no URI, skipping`);
      continue;
    }

    console.log(`   Downloading: ${video.video.uri}`);
    const response = await fetch(
      `${video.video.uri}&key=${process.env["GEMINI_API_KEY"]}`
    );
    const buffer = await response.arrayBuffer();

    const rawPath = path.join(dir, `${scene.output}-raw.mp4`);
    const finalPath = path.join(dir, `${scene.output}.mp4`);
    await writeFile(rawPath, Buffer.from(buffer));
    console.log(`   💾 Raw saved: ${rawPath}`);

    // Post-process: drop to 10fps (pixel art timing) + upscale to 4K nearest-neighbor
    console.log(`   🎬 Post-processing: 10fps + 4K upscale...`);
    try {
      execSync(
        `ffmpeg -y -i "${rawPath}" -vf "fps=10,scale=3840:2160:flags=neighbor" -r 30 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p "${finalPath}"`,
        { stdio: "pipe" }
      );
      console.log(`   ✨ Final: ${finalPath}`);
    } catch (ffErr: any) {
      console.error(`   ⚠️ ffmpeg failed, keeping raw: ${ffErr.message}`);
      // Fallback: just rename raw to final
      await writeFile(finalPath, await readFile(rawPath));
    }
  }
}

async function main() {
  if (!process.env["GEMINI_API_KEY"]) {
    console.error("❌ GEMINI_API_KEY env var required");
    process.exit(1);
  }

  const ai = new GoogleGenAI({
    apiKey: process.env["GEMINI_API_KEY"],
  });

  const dir = path.dirname(new URL(import.meta.url).pathname);

  // Filter scenes by CLI arg
  const filter = process.argv[2]; // e.g. --m1-only or --generic-only
  let scenesToRun = SCENES;
  if (filter === "--m1-only") {
    scenesToRun = SCENES.filter((s) => s.output.startsWith("m1-"));
  } else if (filter === "--generic-only") {
    scenesToRun = SCENES.filter((s) => s.output.startsWith("lofi-"));
  }

  console.log("🎨 Lo-fi Pixel Art Video Generator");
  console.log(`   Scenes: ${scenesToRun.length}${filter ? ` (${filter})` : ""}`);
  console.log(`   Output dir: ${dir}`);

  // Run sequentially to avoid rate limits
  for (const scene of scenesToRun) {
    try {
      await generateVideo(ai, scene, dir);
    } catch (err: any) {
      console.error(`\n   ❌ Failed: ${scene.output}`);
      console.error(`   ${err.message}`);
      // Continue with next scene
    }
  }

  console.log("\n🎉 All done!");
}

main();
