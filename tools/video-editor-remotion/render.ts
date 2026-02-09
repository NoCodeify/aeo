/**
 * Render script - reads timeline.json and renders video
 *
 * Usage:
 *   npx ts-node render.ts <video_dir>
 *
 * Example:
 *   npx ts-node render.ts ../../youtube/weekly-production/2026-w08-rank-in-chatgpt
 */

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";

async function render() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("Usage: npx ts-node render.ts <video_dir>");
    console.log("Example: npx ts-node render.ts ../../youtube/weekly-production/2026-w08-rank-in-chatgpt");
    process.exit(1);
  }

  const videoDir = path.resolve(args[0]);
  const timelinePath = path.join(videoDir, "video", "timeline.json");
  const slidesDir = path.join(videoDir, "slides");
  const publicDir = path.resolve(__dirname, "public");

  // Find speaker video (prefer speaker-clean.mp4 from auto-cutter)
  const videoSubdir = path.join(videoDir, "video");
  const cleanVideoPath = path.join(videoSubdir, "speaker-clean.mp4");
  let speakerVideoPath: string;

  if (fs.existsSync(cleanVideoPath)) {
    speakerVideoPath = cleanVideoPath;
    console.log("Using auto-cut speaker video");
  } else {
    const videoFiles = fs.readdirSync(videoSubdir).filter(f => f.endsWith(".mp4") && !f.includes("test") && !f.includes("output") && !f.includes("clean"));
    if (videoFiles.length === 0) {
      console.error("No speaker video found in", videoSubdir);
      process.exit(1);
    }
    speakerVideoPath = path.join(videoSubdir, videoFiles[0]);
  }

  // Read timeline
  if (!fs.existsSync(timelinePath)) {
    console.error("Timeline not found:", timelinePath);
    process.exit(1);
  }
  const timeline = JSON.parse(fs.readFileSync(timelinePath, "utf-8"));

  console.log("=== Remotion Video Render ===");
  console.log("Speaker video:", speakerVideoPath);
  console.log("Timeline:", timelinePath);
  console.log("Slides:", slidesDir);
  console.log("Edits:", timeline.length);
  console.log();

  // Copy files to public folder for video access
  console.log("Copying files to public folder...");

  const speakerDest = path.join(publicDir, "speaker.mp4");
  const slidesDest = path.join(publicDir, "slides");

  // Remove existing files/folders
  if (fs.existsSync(speakerDest)) fs.unlinkSync(speakerDest);
  if (fs.existsSync(slidesDest)) fs.rmSync(slidesDest, { recursive: true, force: true });

  // Copy speaker video
  fs.copyFileSync(speakerVideoPath, speakerDest);
  console.log("  Copied speaker video");

  // Copy slides folder
  fs.mkdirSync(slidesDest, { recursive: true });
  const slideFiles = fs.readdirSync(slidesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  for (const file of slideFiles) {
    fs.copyFileSync(path.join(slidesDir, file), path.join(slidesDest, file));
  }
  console.log(`  Copied ${slideFiles.length} slides`);

  // Copy GIFs folder (if it exists)
  const gifsDir = path.join(videoDir, "gifs");
  const gifsDest = path.join(publicDir, "gifs");
  if (fs.existsSync(gifsDir)) {
    if (fs.existsSync(gifsDest)) fs.rmSync(gifsDest, { recursive: true, force: true });
    fs.mkdirSync(gifsDest, { recursive: true });
    const gifFiles = fs.readdirSync(gifsDir).filter(f => f.endsWith('.gif') || f.endsWith('.mp4'));
    for (const file of gifFiles) {
      fs.copyFileSync(path.join(gifsDir, file), path.join(gifsDest, file));
    }
    console.log(`  Copied ${gifFiles.length} GIFs`);
  }

  // Copy B-roll folder (if it exists)
  const brollDir = path.join(videoDir, "broll");
  const brollDest = path.join(publicDir, "broll");
  if (fs.existsSync(brollDir)) {
    if (fs.existsSync(brollDest)) fs.rmSync(brollDest, { recursive: true, force: true });
    fs.mkdirSync(brollDest, { recursive: true });
    const brollFiles = fs.readdirSync(brollDir).filter(f => f.endsWith('.mp4'));
    for (const file of brollFiles) {
      fs.copyFileSync(path.join(brollDir, file), path.join(brollDest, file));
    }
    console.log(`  Copied ${brollFiles.length} B-roll clips`);
  }

  // Update timeline to use relative paths (via staticFile)
  const updatedTimeline = timeline.map((edit: any) => {
    if (edit.content) {
      const filename = path.basename(edit.content);
      // GIF types use gifs/ prefix, B-roll uses broll/ prefix, SFX keeps original, everything else uses slides/
      if (edit.type === "gif_overlay" || edit.type === "gif_full") {
        return { ...edit, content: `gifs/${filename}` };
      }
      if (edit.type === "broll_full") {
        return { ...edit, content: `broll/${filename}` };
      }
      if (edit.type === "sfx") {
        return edit;
      }
      return { ...edit, content: `slides/${filename}` };
    }
    return edit;
  });

  // Bundle the project
  console.log("Bundling...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(__dirname, "src/index.ts"),
    publicDir,
  });

  // Get composition
  const inputProps = {
    config: {
      speakerVideo: "speaker.mp4",  // Relative to public/
      gridBackground: "grid-loop.mp4",  // Already in public/
      timeline: updatedTimeline,
      fps: 30,
      width: 3840,
      height: 2160,
      bgMusic: {
        src: "sfx/lofi-beat-bg.mp3",
        startVolume: 0.16,
        mainVolume: 0.08,
        fadeDuration: 10,
      },
    },
  };

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "MainVideo",
    inputProps,
  });

  // Render
  const outputPath = path.join(videoSubdir, "output-remotion.mp4");
  console.log("Rendering to:", outputPath);

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputPath,
    inputProps,
    videoBitrate: "35M",
  });

  // Cleanup copied files
  console.log("Cleaning up...");
  fs.unlinkSync(speakerDest);
  fs.rmSync(slidesDest, { recursive: true, force: true });
  if (fs.existsSync(gifsDest)) fs.rmSync(gifsDest, { recursive: true, force: true });
  if (fs.existsSync(brollDest)) fs.rmSync(brollDest, { recursive: true, force: true });

  console.log();
  console.log("=== Done! ===");
  console.log("Output:", outputPath);
}

render().catch((err) => {
  console.error("Render failed:", err);
  process.exit(1);
});
