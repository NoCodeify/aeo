#!/usr/bin/env ts-node
/**
 * tella-splices.ts
 *
 * Fetches a Tella video document, extracts the actual cuts (removed segments),
 * and outputs splice points in the cut audio timeline.
 *
 * These splice points are where Tella made hard cuts between sentences.
 * The timeline builder can use them to sync layout changes to cuts.
 *
 * Usage:
 *   npx ts-node tella-splices.ts <video_id> [--cookie <wos-session>] [--file <path>]
 *   npx ts-node tella-splices.ts vid_cmm3mrq4b01pl04lb2u7wf2io --cookie "Fe26.2*1*..."
 *   npx ts-node tella-splices.ts --file /path/to/tella.json
 *
 * Output: public/splice-points.json
 */

import * as fs from "fs";
import * as path from "path";

// ── Types ──────────────────────────────────────────────────────────────────

interface TellaCut {
  startTime: number; // ms in raw timeline
  duration: number; // ms removed
}

interface TellaScene {
  id: string;
  name: string;
  maxDuration: number; // raw duration in ms
  cuts: TellaCut[];
}

interface TellaDocument {
  story: {
    id: string;
    name: string;
    duration: number; // cut duration in ms
    scenes?: TellaScene[];
  };
  // Scenes can be top-level (local file) or nested in story (API)
  scenes?: TellaScene[];
}

interface SplicePoint {
  /** Timestamp in the cut audio (seconds) where a splice occurs */
  cutTime: number;
  /** Where this segment starts in the raw audio (seconds) */
  rawTime: number;
  /** How much silence/content was removed at this point (ms) */
  removedMs: number;
  /** Classification: retake (>3s), sentence (0.3-3s), breath (<0.3s) */
  type: "retake" | "sentence" | "breath";
}

interface SpliceOutput {
  source: "tella";
  videoId: string;
  videoName: string;
  rawDurationSec: number;
  cutDurationSec: number;
  totalRemovedSec: number;
  spliceCount: number;
  distribution: {
    retakes: number;
    sentences: number;
    breaths: number;
  };
  splices: SplicePoint[];
}

// ── Fetch from Tella API ───────────────────────────────────────────────────

async function fetchTellaDocument(
  videoId: string,
  sessionCookie: string
): Promise<TellaDocument> {
  const url = `https://www.tella.tv/api/stories/${videoId}/document`;

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      cookie: `wos-session=${sessionCookie}`,
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    },
  });

  if (!res.ok) {
    throw new Error(`Tella API returned ${res.status}: ${res.statusText}`);
  }

  return (await res.json()) as TellaDocument;
}

// ── Parse cuts into splice points ──────────────────────────────────────────

function parseSplices(doc: TellaDocument): SpliceOutput {
  const { story } = doc;
  // Scenes can be top-level (local file) or nested in story (API response)
  const scenes = doc.scenes || story.scenes || [];
  const scene = scenes[0];

  if (!scene || !scene.cuts || scene.cuts.length === 0) {
    throw new Error("No cuts found in Tella document");
  }

  const cuts = scene.cuts
    .map((c) => ({
      startMs: c.startTime,
      endMs: c.startTime + c.duration,
      durationMs: c.duration,
    }))
    .sort((a, b) => a.startMs - b.startMs);

  const rawDurationMs = scene.maxDuration;
  const totalCutMs = cuts.reduce((sum, c) => sum + c.durationMs, 0);
  const cutDurationMs = rawDurationMs - totalCutMs;

  // Build kept segments (speech between cuts)
  const kept: { rawStartMs: number; rawEndMs: number; durationMs: number }[] =
    [];

  for (let i = 0; i < cuts.length; i++) {
    const cutEnd = cuts[i].endMs;
    const nextCutStart = i + 1 < cuts.length ? cuts[i + 1].startMs : rawDurationMs;
    const segDuration = nextCutStart - cutEnd;

    if (segDuration > 1) {
      // ignore sub-ms artifacts
      kept.push({
        rawStartMs: cutEnd,
        rawEndMs: nextCutStart,
        durationMs: segDuration,
      });
    }
  }

  // Map to cut timeline
  const splices: SplicePoint[] = [];
  let cutTimeCursor = 0;

  for (let i = 0; i < kept.length; i++) {
    if (i > 0) {
      const prevEnd = kept[i - 1].rawEndMs;
      const currStart = kept[i].rawStartMs;
      const removedMs = currStart - prevEnd;

      const type: SplicePoint["type"] =
        removedMs >= 3000 ? "retake" : removedMs >= 300 ? "sentence" : "breath";

      splices.push({
        cutTime: round(cutTimeCursor / 1000, 3),
        rawTime: round(currStart / 1000, 3),
        removedMs: Math.round(removedMs),
        type,
      });
    }

    cutTimeCursor += kept[i].durationMs;
  }

  const distribution = {
    retakes: splices.filter((s) => s.type === "retake").length,
    sentences: splices.filter((s) => s.type === "sentence").length,
    breaths: splices.filter((s) => s.type === "breath").length,
  };

  return {
    source: "tella",
    videoId: story.id,
    videoName: story.name,
    rawDurationSec: round(rawDurationMs / 1000, 1),
    cutDurationSec: round(cutDurationMs / 1000, 1),
    totalRemovedSec: round(totalCutMs / 1000, 1),
    spliceCount: splices.length,
    distribution,
    splices,
  };
}

function round(n: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}

// ── CLI ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  let doc: TellaDocument;

  // Parse args
  const fileIdx = args.indexOf("--file");
  const cookieIdx = args.indexOf("--cookie");

  if (fileIdx !== -1) {
    // Load from local file
    const filePath = args[fileIdx + 1];
    if (!filePath) {
      console.error("Usage: --file <path-to-tella.json>");
      process.exit(1);
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    doc = JSON.parse(raw) as TellaDocument;
    console.log(`Loaded from file: ${filePath}`);
  } else {
    // Fetch from API
    const videoId = args.find((a) => a.startsWith("vid_"));
    if (!videoId) {
      console.error(
        "Usage: tella-splices.ts <vid_xxx> --cookie <session> | --file <path>"
      );
      process.exit(1);
    }

    // Cookie from --cookie arg or TELLA_SESSION env var
    const cookie =
      cookieIdx !== -1
        ? args[cookieIdx + 1]
        : process.env.TELLA_SESSION;

    if (!cookie) {
      console.error(
        "No session cookie. Use --cookie <value> or set TELLA_SESSION env var"
      );
      process.exit(1);
    }

    console.log(`Fetching Tella document for ${videoId}...`);
    doc = await fetchTellaDocument(videoId, cookie);
    console.log(`Fetched: ${doc.story.name}`);
  }

  // Parse
  const result = parseSplices(doc);

  // Print summary
  console.log(`\nRaw duration:  ${result.rawDurationSec}s`);
  console.log(`Cut duration:  ${result.cutDurationSec}s`);
  console.log(`Removed:       ${result.totalRemovedSec}s`);
  console.log(`Splice points: ${result.spliceCount}`);
  console.log(
    `  Retakes (>3s):    ${result.distribution.retakes}`
  );
  console.log(
    `  Sentences (0.3-3s): ${result.distribution.sentences}`
  );
  console.log(
    `  Breaths (<0.3s):  ${result.distribution.breaths}`
  );

  // Print first 60s
  console.log(`\nFirst 60s splice points:`);
  for (const s of result.splices) {
    if (s.cutTime > 60) break;
    const label = s.type === "retake" ? " <-- retake" : "";
    console.log(
      `  @${s.cutTime.toFixed(2).padStart(7)}s | removed ${String(s.removedMs).padStart(5)}ms${label}`
    );
  }

  // Stats
  if (result.splices.length > 1) {
    const gaps = result.splices
      .slice(1)
      .map((s, i) => s.cutTime - result.splices[i].cutTime);
    const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    const sorted = [...gaps].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    console.log(`\nTime between splices:`);
    console.log(`  Mean:   ${mean.toFixed(1)}s`);
    console.log(`  Median: ${median.toFixed(1)}s`);
    console.log(`  Min:    ${sorted[0].toFixed(2)}s`);
    console.log(`  Max:    ${sorted[sorted.length - 1].toFixed(1)}s`);
  }

  // Write output
  const outPath = path.join(__dirname, "public", "splice-points.json");
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log(`\nSaved to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
