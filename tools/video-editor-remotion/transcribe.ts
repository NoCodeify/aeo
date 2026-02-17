/**
 * Transcribe speaker video to get word-level timestamps via AssemblyAI.
 *
 * Dual-pass approach:
 *   1. Universal-3-Pro — accurate words, catches false starts & repeats
 *   2. Universal-2 (disfluencies: true) — filler detection (um, uh, er, ah)
 *   Merge: U3P base + filler positions from U2
 *
 * Usage:
 *   npx ts-node transcribe.ts <video_dir> [--clean]
 *
 * Examples:
 *   npx ts-node transcribe.ts ../../youtube/weekly-production/2026-w09-claude-code-use-cases
 *   npx ts-node transcribe.ts ../../youtube/weekly-production/2026-w09-claude-code-use-cases --clean
 *
 * Flags:
 *   --clean   Transcribe speaker-clean.mp4 → transcript-clean.json
 *             (use after manual rough cut in video editor)
 *
 * Prerequisites:
 *   - ffmpeg installed (for audio extraction)
 *   - ASSEMBLYAI_API_KEY env var set
 *
 * Output:
 *   <video_dir>/video/transcript.json        (default)
 *   <video_dir>/video/transcript-clean.json   (--clean mode)
 */

import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import "dotenv/config";

interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

interface SegmentTimestamp {
  start: number;
  end: number;
  text: string;
}

interface Transcript {
  duration: number;
  language: string;
  words: WordTimestamp[];
  segments: SegmentTimestamp[];
  text: string;
}

const ASSEMBLYAI_BASE = "https://api.assemblyai.com/v2";
const FILLER_WORDS = new Set(["um", "uh", "ah", "er", "hm", "hmm"]);

function msToSec(ms: number): number {
  return Math.round((ms / 1000) * 1000) / 1000;
}

function stripPunctuation(word: string): string {
  return word.replace(/[.,!?;:]$/, "");
}

/** Start a transcription job and return its ID */
async function startTranscription(
  apiKey: string,
  audioUrl: string,
  model: string,
  disfluencies: boolean
): Promise<string> {
  const res = await fetch(`${ASSEMBLYAI_BASE}/transcript`, {
    method: "POST",
    headers: {
      authorization: apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      audio_url: audioUrl,
      language_detection: true,
      disfluencies,
      speech_models: [model],
    }),
  });

  if (!res.ok) {
    throw new Error(`Transcription request failed (${model}): ${res.status} ${await res.text()}`);
  }

  const { id } = (await res.json()) as { id: string };
  return id;
}

/** Poll a transcription job until completed */
async function pollTranscription(apiKey: string, id: string, label: string): Promise<any> {
  while (true) {
    const res = await fetch(`${ASSEMBLYAI_BASE}/transcript/${id}`, {
      headers: { authorization: apiKey },
    });
    const result = await res.json();

    if (result.status === "completed") {
      return result;
    } else if (result.status === "error") {
      throw new Error(`Transcription failed (${label}): ${result.error}`);
    }

    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 3000));
  }
}

/**
 * Merge U3P base words with U2 filler words.
 *
 * Strategy: For each filler from U2, find the gap in U3P where it fits
 * (between two consecutive U3P words based on timestamp overlap).
 * Only insert fillers that don't overlap with existing U3P words.
 */
function mergeFillers(
  baseWords: WordTimestamp[],
  fillerSource: WordTimestamp[]
): WordTimestamp[] {
  // Extract only filler words from U2
  const fillers = fillerSource.filter((w) =>
    FILLER_WORDS.has(w.word.toLowerCase())
  );

  if (fillers.length === 0) return baseWords;

  // Merge into base by timestamp order
  const merged: WordTimestamp[] = [...baseWords];

  for (const filler of fillers) {
    // Find insertion point: after the last base word that ends before the filler starts
    let insertIdx = merged.length; // default: append
    for (let i = 0; i < merged.length; i++) {
      if (merged[i].start > filler.start) {
        insertIdx = i;
        break;
      }
    }

    // Check for overlap with neighbors
    const prev = insertIdx > 0 ? merged[insertIdx - 1] : null;
    const next = insertIdx < merged.length ? merged[insertIdx] : null;

    const overlapsPrev = prev && filler.start < prev.end + 0.05;
    const overlapsNext = next && filler.end > next.start - 0.05;

    // Skip if it overlaps existing words (U3P already has this region covered)
    if (overlapsPrev || overlapsNext) continue;

    // Skip if U3P already has a filler at this position
    const alreadyHasFiller =
      prev && FILLER_WORDS.has(prev.word.toLowerCase()) && filler.start - prev.end < 0.3;
    if (alreadyHasFiller) continue;

    merged.splice(insertIdx, 0, filler);
  }

  // Sort by start time (should already be sorted, but ensure)
  merged.sort((a, b) => a.start - b.start);

  return merged;
}

async function transcribe() {
  const args = process.argv.slice(2);

  const cleanMode = args.includes("--clean");
  const filteredArgs = args.filter((a) => a !== "--clean");

  if (filteredArgs.length < 1) {
    console.log("Usage: npx ts-node transcribe.ts <video_dir> [--clean]");
    console.log(
      "Example: npx ts-node transcribe.ts ../../youtube/weekly-production/2026-w09-claude-code-use-cases"
    );
    console.log("  --clean   Transcribe speaker-clean.mp4 instead of speaker.mp4");
    process.exit(1);
  }

  // Check for API key
  const apiKey = process.env.ASSEMBLYAI_API_KEY;
  if (!apiKey) {
    console.error("Error: ASSEMBLYAI_API_KEY environment variable is not set.");
    process.exit(1);
  }

  // Check for ffmpeg
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
  } catch {
    console.error("Error: ffmpeg is not installed or not in PATH.");
    process.exit(1);
  }

  const videoDir = path.resolve(filteredArgs[0]);
  const videoSubdir = path.join(videoDir, "video");
  const outputPath = path.join(videoSubdir, cleanMode ? "transcript-clean.json" : "transcript.json");

  // Find speaker video
  if (!fs.existsSync(videoSubdir)) {
    console.error("Video directory not found:", videoSubdir);
    process.exit(1);
  }

  let speakerVideoPath: string;

  if (cleanMode) {
    // --clean mode: target speaker-clean.mp4 directly
    speakerVideoPath = path.join(videoSubdir, "speaker-clean.mp4");
    if (!fs.existsSync(speakerVideoPath)) {
      console.error("speaker-clean.mp4 not found in", videoSubdir);
      console.error("Do a manual rough cut first and export as speaker-clean.mp4");
      process.exit(1);
    }
  } else {
    // Default: find raw speaker video (exclude clean/test/output)
    const videoFiles = fs
      .readdirSync(videoSubdir)
      .filter(
        (f) =>
          f.endsWith(".mp4") && !f.includes("test") && !f.includes("output") && !f.includes("clean")
      );

    if (videoFiles.length === 0) {
      console.error("No speaker video found in", videoSubdir);
      process.exit(1);
    }

    speakerVideoPath = path.join(videoSubdir, videoFiles[0]);
  }

  console.log("=== AssemblyAI Dual-Pass Transcription ===");
  console.log("Speaker video:", speakerVideoPath);
  console.log("Output:", outputPath);
  console.log("Pass 1: Universal-3-Pro (accuracy + false starts)");
  console.log("Pass 2: Universal-2 (filler detection)");
  console.log();

  // Step 1: Extract audio with ffmpeg
  const tempAudioPath = path.join(
    "/tmp",
    `speaker-audio-${Date.now()}.m4a`
  );

  console.log("Extracting audio...");
  try {
    execSync(
      `ffmpeg -i "${speakerVideoPath}" -vn -acodec aac -b:a 64k -ac 1 -ar 16000 -y "${tempAudioPath}"`,
      { stdio: "pipe" }
    );
  } catch (err: any) {
    console.error("ffmpeg audio extraction failed:", err.stderr?.toString());
    process.exit(1);
  }

  const audioSize = fs.statSync(tempAudioPath).size;
  const audioSizeMB = (audioSize / (1024 * 1024)).toFixed(1);
  console.log(`  Audio extracted: ${audioSizeMB}MB`);

  // Step 2: Get audio duration
  let totalDuration = 0;
  try {
    const durationOutput = execSync(
      `ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${tempAudioPath}"`,
      { encoding: "utf-8" }
    ).trim();
    totalDuration = parseFloat(durationOutput);
    console.log(
      `  Duration: ${Math.floor(totalDuration / 60)}m ${Math.floor(totalDuration % 60)}s`
    );
  } catch {
    console.warn("  Could not detect duration, will use API response");
  }

  // Step 3: Upload audio to AssemblyAI (once, shared by both passes)
  console.log("Uploading to AssemblyAI...");
  const audioData = fs.readFileSync(tempAudioPath);
  const uploadRes = await fetch(`${ASSEMBLYAI_BASE}/upload`, {
    method: "POST",
    headers: {
      authorization: apiKey,
      "content-type": "application/octet-stream",
    },
    body: audioData,
  });

  if (!uploadRes.ok) {
    console.error("Upload failed:", uploadRes.status, await uploadRes.text());
    process.exit(1);
  }

  const { upload_url } = (await uploadRes.json()) as { upload_url: string };
  console.log("  Uploaded successfully");

  // Cleanup temp audio
  fs.unlinkSync(tempAudioPath);

  // Step 4: Start both transcriptions in parallel
  console.log("Starting dual transcription...");

  const [u3pId, u2Id] = await Promise.all([
    startTranscription(apiKey, upload_url, "universal-3-pro", false),
    startTranscription(apiKey, upload_url, "universal-2", true),
  ]);

  console.log(`  Universal-3-Pro ID: ${u3pId}`);
  console.log(`  Universal-2 ID:     ${u2Id}`);

  // Step 5: Poll both in parallel
  console.log("Waiting for results...");

  const [u3pResult, u2Result] = await Promise.all([
    pollTranscription(apiKey, u3pId, "universal-3-pro"),
    pollTranscription(apiKey, u2Id, "universal-2"),
  ]);
  console.log(" Done!");

  // Step 6: Parse both results
  const u3pWords: WordTimestamp[] = (u3pResult.words || []).map((w: any) => ({
    word: stripPunctuation(w.text),
    start: msToSec(w.start),
    end: msToSec(w.end),
  }));

  const u2Words: WordTimestamp[] = (u2Result.words || []).map((w: any) => ({
    word: stripPunctuation(w.text),
    start: msToSec(w.start),
    end: msToSec(w.end),
  }));

  const u2Fillers = u2Words.filter((w) =>
    FILLER_WORDS.has(w.word.toLowerCase())
  );

  console.log();
  console.log("=== Pass Results ===");
  console.log(`  U3P words: ${u3pWords.length}`);
  console.log(`  U2 words:  ${u2Words.length}`);
  console.log(`  U2 fillers found: ${u2Fillers.length} (${u2Fillers.map((f) => `${f.word}@${f.start}s`).join(", ")})`);

  // Step 7: Merge — U3P base + U2 fillers
  const mergedWords = mergeFillers(u3pWords, u2Words);

  const fillersInserted = mergedWords.length - u3pWords.length;
  console.log(`  Fillers inserted: ${fillersInserted}`);
  console.log(`  Final words: ${mergedWords.length}`);

  // Step 8: Build segments from merged words
  const segments: SegmentTimestamp[] = [];
  let segWords: WordTimestamp[] = [];

  for (let i = 0; i < mergedWords.length; i++) {
    segWords.push(mergedWords[i]);

    const isLast = i === mergedWords.length - 1;
    const hasLongGap =
      !isLast && mergedWords[i + 1].start - mergedWords[i].end > 0.5;
    const segTooLong = segWords.length >= 20;

    if (isLast || hasLongGap || segTooLong) {
      segments.push({
        start: segWords[0].start,
        end: segWords[segWords.length - 1].end,
        text: segWords.map((w) => w.word).join(" "),
      });
      segWords = [];
    }
  }

  if (u3pResult.audio_duration) {
    totalDuration = u3pResult.audio_duration;
  }

  // Step 9: Write output
  const transcript: Transcript = {
    duration: totalDuration,
    language: u3pResult.language_code || "en",
    words: mergedWords,
    segments,
    text: u3pResult.text || "",
  };

  fs.writeFileSync(outputPath, JSON.stringify(transcript, null, 2));

  console.log();
  console.log("=== Done! ===");
  console.log(`Words: ${mergedWords.length} (${u3pWords.length} base + ${fillersInserted} fillers)`);
  console.log(`Segments: ${segments.length}`);
  console.log(`Output: ${outputPath}`);
  console.log(
    `Cost: ~$${((totalDuration / 60) * 0.005).toFixed(4)} (2 passes)`
  );
}

transcribe().catch((err) => {
  console.error("Transcription failed:", err);
  process.exit(1);
});
