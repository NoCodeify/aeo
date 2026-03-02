import { GoogleGenAI } from "@google/genai";
import { writeFile, readFile } from "fs/promises";
import { execSync } from "child_process";
import path from "path";

const SCENES = [
  {
    image: "m1-money-burning_1.jpg",
    output: "m1-money-burning-hq",
    prompt: "Subtle lo-fi animation of this pixel art scene of money dissolving in a dark void. Dollar bills slowly rotate and disintegrate into green pixel dust. Coins tumble and glow. ERROR windows flash and glitch. The cost counter in the corner ticks upward. Broken phone screens flicker with static. Red warning particles drift. Haunting but mesmerizing ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  {
    image: "m1-graveyard_2.jpg",
    output: "m1-graveyard-hq",
    prompt: "Subtle lo-fi animation of this pixel art digital graveyard scene. Code symbols float gently like fireflies in the night sky. Tombstone app icons pulse with a faint ghostly glow. Cobwebs sway very slightly. Fog creeps slowly along the ground. The warm light at the end of the path flickers softly. Moon casts shifting light through clouds. Very eerie but calm ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  {
    image: "m1-building-alone_1.jpg",
    output: "m1-building-alone-hq",
    prompt: "Subtle lo-fi animation of this pixel art scene of a lonely developer at 3AM. Rain streams down the window steadily. Monitor screens flicker with code scrolling slowly. The 0 USERS notification pulses with a sad red glow. Steam wisps rise from coffee mugs. The 03:00 clock digits glow. Crumpled papers sit still. Very melancholic, slow, atmospheric ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
  {
    image: "m1-customer-convo_1.jpg",
    output: "m1-customer-convo-hq",
    prompt: "Subtle lo-fi animation of this pixel art coffee shop scene. Warm sunlight streams through the window with dust particles floating in the beams. People walk past outside the window slowly. The laptop screen glows softly showing a video call. Steam rises gently from the coffee cup. Cafe lamp lights have a warm flicker. Very warm, hopeful, calm ambient movement. Keep the pixel art style perfectly intact. Seamless looping animation.",
  },
];

async function generateVideo(ai: GoogleGenAI, scene: typeof SCENES[0], dir: string) {
  console.log(`\n🎬 Starting: ${scene.output}`);
  const imageBuffer = await readFile(path.join(dir, scene.image));
  const imageBase64 = imageBuffer.toString("base64");

  let operation = await ai.models.generateVideos({
    model: "veo-3.1-generate-preview",
    source: {
      image: { imageBytes: imageBase64, mimeType: "image/jpeg" },
      prompt: scene.prompt,
    },
    config: {
      numberOfVideos: 1,
      aspectRatio: "16:9",
      resolution: "720p",
      durationSeconds: 8,
    },
  });

  console.log(`   Polling (HQ model)...`);
  let pollCount = 0;
  while (!operation.done) {
    pollCount++;
    process.stdout.write(`\r   Waiting... ${pollCount * 10}s (${operation.name})`);
    await new Promise((r) => setTimeout(r, 10000));
    operation = await ai.operations.getVideosOperation({ operation });
  }

  console.log(`\n   ✅ Done!`);
  const videos = operation.response?.generatedVideos ?? [];
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    if (!video?.video?.uri) continue;
    const response = await fetch(`${video.video.uri}&key=${process.env["GEMINI_API_KEY"]}`);
    const buffer = await response.arrayBuffer();
    const rawPath = path.join(dir, `${scene.output}-raw.mp4`);
    const finalPath = path.join(dir, `${scene.output}.mp4`);
    await writeFile(rawPath, Buffer.from(buffer));
    console.log(`   🎬 Post-processing: 10fps + 4K...`);
    try {
      execSync(`ffmpeg -y -i "${rawPath}" -vf "fps=10,scale=3840:2160:flags=neighbor" -r 30 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p "${finalPath}"`, { stdio: "pipe" });
      console.log(`   ✨ ${finalPath}`);
    } catch { await writeFile(finalPath, await readFile(rawPath)); }
  }
}

async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_API_KEY"]! });
  const dir = path.dirname(new URL(import.meta.url).pathname);
  console.log("🎨 HQ Model (veo-3.1-generate-preview)");
  for (const scene of SCENES) {
    try { await generateVideo(ai, scene, dir); }
    catch (err: any) { console.error(`   ❌ ${scene.output}: ${err.message}`); }
  }
  console.log("\n🎉 All done!");
}
main();
