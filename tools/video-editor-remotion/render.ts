/**
 * Render script - reads timeline.json and renders video
 *
 * Usage:
 *   npx ts-node render.ts <video_dir>                    # Full render
 *   npx ts-node render.ts <video_dir> --test             # 30s test at 1080p
 *   npx ts-node render.ts <video_dir> --chunks 5         # Render in 5 chunks, auto-concat
 *   npx ts-node render.ts <video_dir> --chunk 3/5        # Render only chunk 3 of 5
 *   npx ts-node render.ts <video_dir> --concat 5         # Just concat 5 existing chunks
 *   npx ts-node render.ts <video_dir> --concurrency 6    # Override concurrency
 *
 * Chunked rendering:
 *   - Splits video into N equal parts, renders each separately
 *   - If a chunk already exists, it's SKIPPED (delete the file to re-render)
 *   - After all chunks render, auto-concatenates with ffmpeg
 *   - If one chunk fails, re-run the same command - it picks up where it left off
 */

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

async function render() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("Usage: npx ts-node render.ts <video_dir> [options]");
    console.log("");
    console.log("Options:");
    console.log("  --test            Render 30s at 1080p");
    console.log("  --chunks N        Render in N chunks, skip existing, auto-concat");
    console.log("  --chunk X/N       Render only chunk X of N (no concat)");
    console.log("  --concat N        Just concat N existing chunks (no render)");
    console.log("  --concurrency N   Override concurrency (default: 8)");
    console.log("");
    console.log("Example:");
    console.log("  npx ts-node render.ts ../../youtube/weekly-production/2026-w09-claude-code-use-cases --chunks 5");
    process.exit(1);
  }

  const videoDir = path.resolve(args[0]);
  const timelinePath = path.join(videoDir, "video", "timeline.json");
  const slidesDir = path.join(videoDir, "video", "slides");
  const publicDir = path.resolve(__dirname, "public");

  // Parse flags
  const isTest = args.includes("--test");
  const chunksIdx = args.indexOf("--chunks");
  const chunkIdx = args.indexOf("--chunk");
  const concatIdx = args.indexOf("--concat");
  const concurrencyIdx = args.indexOf("--concurrency");

  const totalChunks = chunksIdx !== -1 ? parseInt(args[chunksIdx + 1]) : null;
  const concatOnly = concatIdx !== -1 ? parseInt(args[concatIdx + 1]) : null;
  const concurrency = concurrencyIdx !== -1 ? parseInt(args[concurrencyIdx + 1]) : (isTest ? 8 : 8);

  let singleChunk: { index: number; total: number } | null = null;
  if (chunkIdx !== -1) {
    const [idx, total] = args[chunkIdx + 1].split("/").map(Number);
    singleChunk = { index: idx, total };
  }

  // Find speaker video (prefer speaker-clean.mp4 from auto-cutter)
  const videoSubdir = path.join(videoDir, "video");
  const cleanVideoPath = path.join(videoSubdir, "speaker-clean.mp4");
  let speakerVideoPath: string;

  if (fs.existsSync(cleanVideoPath)) {
    speakerVideoPath = cleanVideoPath;
    console.log("Using auto-cut speaker video");
  } else {
    const videoFiles = fs.readdirSync(videoSubdir).filter(f => f.endsWith(".mp4") && !f.includes("test") && !f.includes("output") && !f.includes("clean") && !f.includes("chunk-"));
    if (videoFiles.length === 0) {
      console.error("No speaker video found in", videoSubdir);
      process.exit(1);
    }
    speakerVideoPath = path.join(videoSubdir, videoFiles[0]);
  }

  // Read timeline - prefer public/timeline.json (Studio working copy) over source
  const publicTimelinePath = path.join(publicDir, "timeline.json");
  const timelineSource = fs.existsSync(publicTimelinePath) ? publicTimelinePath : timelinePath;

  if (!fs.existsSync(timelineSource)) {
    console.error("Timeline not found:", timelineSource);
    process.exit(1);
  }
  const timeline = JSON.parse(fs.readFileSync(timelineSource, "utf-8"));

  // Sync: copy Studio working copy back to source dir
  if (timelineSource === publicTimelinePath && timelinePath !== publicTimelinePath) {
    fs.copyFileSync(publicTimelinePath, timelinePath);
    console.log("Synced public/timeline.json -> source");
  }

  // --- Concat-only mode: just join existing chunks ---
  if (concatOnly) {
    const outputPath = path.join(videoSubdir, "output-remotion.mp4");
    concatChunks(videoSubdir, concatOnly, outputPath);
    return;
  }

  console.log("=== Remotion Video Render ===");
  console.log("Speaker video:", speakerVideoPath);
  console.log("Timeline:", timelinePath);
  console.log("Slides:", slidesDir);
  console.log("Edits:", timeline.length);
  console.log("Concurrency:", concurrency);
  if (totalChunks) console.log("Chunks:", totalChunks);
  if (singleChunk) console.log("Chunk:", `${singleChunk.index}/${singleChunk.total}`);
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
  if (fs.existsSync(slidesDir)) {
    const slideFiles = fs.readdirSync(slidesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    for (const file of slideFiles) {
      fs.copyFileSync(path.join(slidesDir, file), path.join(slidesDest, file));
    }
    console.log(`  Copied ${slideFiles.length} slides`);
  }

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
  const brollDir = path.join(videoDir, "video", "broll");
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

  // Copy screen-recordings folder (if it exists)
  const screenRecDir = path.join(videoDir, "video", "screen-recordings");
  const screenRecDest = path.join(publicDir, "screen-recordings");
  if (fs.existsSync(screenRecDir)) {
    if (fs.existsSync(screenRecDest)) fs.rmSync(screenRecDest, { recursive: true, force: true });
    fs.mkdirSync(screenRecDest, { recursive: true });
    const screenFiles = fs.readdirSync(screenRecDir).filter(f => f.endsWith('.mp4'));
    for (const file of screenFiles) {
      fs.copyFileSync(path.join(screenRecDir, file), path.join(screenRecDest, file));
    }
    console.log(`  Copied ${screenFiles.length} screen recordings`);
  }

  // Update timeline to use relative paths (via staticFile)
  const updatedTimeline = timeline.map((edit: any) => {
    if (edit.content) {
      const filename = path.basename(edit.content);
      if (edit.type === "gif_overlay" || edit.type === "gif_full") {
        return { ...edit, content: `gifs/${filename}` };
      }
      if (edit.type === "broll_full") {
        // Keep screen-recordings/ path for screen recordings
        if (edit.content.includes("screen-recordings/")) {
          return { ...edit, content: `screen-recordings/${filename}` };
        }
        return { ...edit, content: `broll/${filename}` };
      }
      if (edit.type === "sfx") {
        return edit;
      }
      return { ...edit, content: `slides/${filename}` };
    }
    return edit;
  });

  // Bundle the project (once, reused for all chunks)
  console.log("Bundling...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(__dirname, "src/index.ts"),
    publicDir,
  });

  // Get composition
  const inputProps = {
    config: {
      speakerVideo: "speaker.mp4",
      gridBackground: "grid-loop.mp4",
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

  const totalFrames = composition.durationInFrames;
  const outputPath = path.join(videoSubdir, "output-remotion.mp4");

  // Shared render options
  const renderOpts = {
    composition,
    serveUrl: bundleLocation,
    codec: "h264" as const,
    inputProps,
    videoBitrate: isTest ? "10M" : "35M",
    concurrency,
    chromiumOptions: { gl: "angle" as const },
    offthreadVideoCacheSizeInBytes: 512 * 1024 * 1024,
    timeoutInMilliseconds: 120000,
    hardwareAcceleration: "required" as const,
  };

  // --- Single chunk mode ---
  if (singleChunk) {
    const { index, total } = singleChunk;
    const range = getChunkRange(index, total, totalFrames);
    const chunkPath = path.join(videoSubdir, `chunk-${index}-of-${total}.mp4`);
    console.log(`\nRendering chunk ${index}/${total}: frames ${range[0]}-${range[1]} (${((range[1] - range[0] + 1) / 30).toFixed(1)}s)`);
    console.log("Output:", chunkPath);

    await renderChunk(renderOpts, range, chunkPath, index, total);
    console.log(`\nChunk ${index}/${total} done!`);
    return;
  }

  // --- Multi-chunk mode (parallel) ---
  if (totalChunks) {
    // Distribute concurrency across chunks: total ~10 Chrome tabs
    const perChunkConcurrency = Math.max(2, Math.floor(10 / totalChunks));
    console.log(`\nTotal frames: ${totalFrames} (${(totalFrames / 30).toFixed(1)}s)`);
    console.log(`Splitting into ${totalChunks} chunks, rendering ALL in parallel`);
    console.log(`Per-chunk concurrency: ${perChunkConcurrency} (${perChunkConcurrency * totalChunks} total Chrome tabs)\n`);

    const chunkPromises: Promise<{ index: number; status: string; error?: string }>[] = [];

    for (let i = 1; i <= totalChunks; i++) {
      const range = getChunkRange(i, totalChunks, totalFrames);
      const chunkPath = path.join(videoSubdir, `chunk-${i}-of-${totalChunks}.mp4`);

      // Skip if chunk already exists
      if (fs.existsSync(chunkPath)) {
        const stat = fs.statSync(chunkPath);
        if (stat.size > 1000) {
          console.log(`Chunk ${i}/${totalChunks}: SKIP (already exists, ${(stat.size / 1024 / 1024).toFixed(1)}MB)`);
          chunkPromises.push(Promise.resolve({ index: i, status: "skipped" }));
          continue;
        }
      }

      console.log(`Chunk ${i}/${totalChunks}: frames ${range[0]}-${range[1]} (${((range[1] - range[0] + 1) / 30).toFixed(1)}s)`);

      const chunkOpts = { ...renderOpts, concurrency: perChunkConcurrency };
      chunkPromises.push(
        renderChunk(chunkOpts, range, chunkPath, i, totalChunks)
          .then(() => ({ index: i, status: "done" }))
          .catch((err: any) => ({ index: i, status: "failed", error: err.message }))
      );
    }

    // Wait for ALL chunks (don't bail on first failure)
    const results = await Promise.all(chunkPromises);

    // Report results
    console.log("\n\n--- Results ---");
    const failed: number[] = [];
    for (const r of results) {
      if (r.status === "done") console.log(`Chunk ${r.index}: OK`);
      else if (r.status === "skipped") console.log(`Chunk ${r.index}: SKIPPED`);
      else {
        console.error(`Chunk ${r.index}: FAILED - ${r.error}`);
        failed.push(r.index);
      }
    }

    if (failed.length > 0) {
      console.error(`\n${failed.length} chunk(s) failed: ${failed.join(", ")}`);
      console.error("Re-run the same command - completed chunks will be skipped.");
      process.exit(1);
    }

    // Concat all chunks
    console.log("\n--- Concatenating chunks ---");
    concatChunks(videoSubdir, totalChunks, outputPath);

    console.log("\n=== Done! ===");
    console.log("Output:", outputPath);
    return;
  }

  // --- Normal full render (no chunks) ---
  console.log("Rendering to:", outputPath);

  await renderMedia({
    ...renderOpts,
    outputLocation: outputPath,
    ...(isTest ? {
      frameRange: [0, 30 * composition.fps] as [number, number],
      scale: 0.5,
    } : {}),
    onProgress: makeProgressLogger("Rendering"),
  });

  console.log("\n=== Done! ===");
  console.log("Output:", outputPath);
}

// --- Helpers ---

function getChunkRange(index: number, total: number, totalFrames: number): [number, number] {
  const framesPerChunk = Math.ceil(totalFrames / total);
  const start = (index - 1) * framesPerChunk;
  const end = Math.min(index * framesPerChunk - 1, totalFrames - 1);
  return [start, end];
}

async function renderChunk(
  opts: any,
  range: [number, number],
  outputPath: string,
  chunkIndex: number,
  totalChunks: number,
) {
  await renderMedia({
    ...opts,
    outputLocation: outputPath,
    frameRange: range,
    onProgress: makeProgressLogger(`Chunk ${chunkIndex}/${totalChunks}`),
  });
}

function makeProgressLogger(label: string) {
  let lastLog = 0;
  return ({ progress }: { progress: number }) => {
    const pct = Math.floor(progress * 100);
    if (pct > lastLog) {
      lastLog = pct;
      process.stdout.write(`\r${label}: ${pct}%`);
    }
  };
}

function concatChunks(videoSubdir: string, totalChunks: number, outputPath: string) {
  // Build ffmpeg concat list
  const listPath = path.join(videoSubdir, "chunks-list.txt");
  const lines: string[] = [];

  for (let i = 1; i <= totalChunks; i++) {
    const chunkPath = path.join(videoSubdir, `chunk-${i}-of-${totalChunks}.mp4`);
    if (!fs.existsSync(chunkPath)) {
      console.error(`Missing chunk ${i}: ${chunkPath}`);
      console.error(`Run: npx ts-node render.ts <dir> --chunk ${i}/${totalChunks}`);
      process.exit(1);
    }
    lines.push(`file '${chunkPath}'`);
  }

  fs.writeFileSync(listPath, lines.join("\n"));
  console.log(`Concatenating ${totalChunks} chunks...`);

  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}"`,
    { stdio: "inherit" },
  );

  // Clean up chunk files and list
  fs.unlinkSync(listPath);
  for (let i = 1; i <= totalChunks; i++) {
    const chunkPath = path.join(videoSubdir, `chunk-${i}-of-${totalChunks}.mp4`);
    fs.unlinkSync(chunkPath);
  }
  console.log("Cleaned up chunk files");
}

render().catch((err) => {
  console.error("Render failed:", err);
  process.exit(1);
});
