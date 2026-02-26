/**
 * Lint timeline.json for common issues.
 *
 * Checks:
 * 1. Short speaker segments (<2s) between non-speaker layouts (flash of talking head)
 * 2. Micro-gaps between consecutive base layouts (<0.5s uncovered)
 * 3. Text overlays on non-speaker layouts (must only be on speaker_full/gradual_zoom/jump_cut_in)
 * 4. Overlapping base layouts (two non-overlay types at same time)
 * 5. Text overlays >2s away from transcript speech
 * 6. First segment must be speaker + animation (gradual_zoom recommended)
 * 7. Text overlays spanning a layout transition (abrupt visual change under text)
 *
 * Usage: node lint-timeline.js [--fix]
 *   --fix  Auto-fix short speaker segments by extending adjacent layouts
 */
const fs = require("fs");
const path = require("path");

const fix = process.argv.includes("--fix");
const timelinePath = path.join(__dirname, "public/timeline.json");
const transcriptPath = path.join(__dirname, "public/transcript-clean.json");

const timeline = JSON.parse(fs.readFileSync(timelinePath, "utf-8"));

let transcript = null;
try {
  transcript = JSON.parse(fs.readFileSync(transcriptPath, "utf-8"));
} catch {
  console.log("(no transcript found, skipping speech-timing checks)\n");
}

const OVERLAY_TYPES = new Set([
  "text_overlay", "sfx", "gif_overlay", "lower_third", "callout",
  "light_leak", "confetti_burst", "check_x_mark", "cta_overlay",
  "counter_ticker", "screen_shake", "newspaper_flash", "social_proof_flash",
  "circle_timer", "text_reveal_wipe", "toggle_switch", "countdown_flip",
  "notification_stack"
]);

const SPEAKER_TYPES = new Set(["speaker_full", "gradual_zoom"]);
const VISUAL_TYPES = new Set(["slide_full", "gif_full", "broll_full", "split_5050_left", "split_5050_right"]);

// Get base layouts only (no overlays)
const baseLayouts = timeline
  .map((e, idx) => ({ ...e, _idx: idx }))
  .filter(e => !OVERLAY_TYPES.has(e.type));

// Get text overlays
const textOverlays = timeline
  .map((e, idx) => ({ ...e, _idx: idx }))
  .filter(e => e.type === "text_overlay");

let issues = [];
let fixes = 0;

// === CHECK 1: Short speaker segments between visual layouts ===
// Skip index 0 — the opening speaker segment is intentionally short (hook pacing).
for (let i = 1; i < baseLayouts.length; i++) {
  const entry = baseLayouts[i];
  if (!SPEAKER_TYPES.has(entry.type)) continue;

  const duration = entry.end - entry.start;
  if (duration >= 2) continue;

  const prev = i > 0 ? baseLayouts[i - 1] : null;
  const next = i < baseLayouts.length - 1 ? baseLayouts[i + 1] : null;

  const prevIsVisual = prev && VISUAL_TYPES.has(prev.type);
  const nextIsVisual = next && VISUAL_TYPES.has(next.type);

  if (prevIsVisual || nextIsVisual) {
    issues.push({
      check: 1,
      severity: "ERROR",
      msg: `Short ${entry.type} (${duration.toFixed(2)}s) at ${entry.start}→${entry.end} between ${prev?.type || "start"} and ${next?.type || "end"}`,
      entry,
      prev,
      next
    });

    if (fix) {
      // Extend the adjacent visual to cover this gap
      if (prevIsVisual && nextIsVisual) {
        // Between two visuals: extend previous to cover
        timeline[prev._idx].end = entry.end;
        timeline[entry._idx] = null; // mark for removal
        fixes++;
      } else if (prevIsVisual) {
        timeline[prev._idx].end = entry.end;
        timeline[entry._idx] = null;
        fixes++;
      } else if (nextIsVisual) {
        timeline[next._idx].start = entry.start;
        timeline[entry._idx] = null;
        fixes++;
      }
    }
  }
}

// === CHECK 2: Micro-gaps between consecutive base layouts ===
for (let i = 0; i < baseLayouts.length - 1; i++) {
  const curr = baseLayouts[i];
  const next = baseLayouts[i + 1];
  const gap = next.start - curr.end;

  if (gap > 0.01 && gap < 0.5) {
    issues.push({
      check: 2,
      severity: "WARN",
      msg: `Micro-gap ${gap.toFixed(3)}s between ${curr.type} (ends ${curr.end}) and ${next.type} (starts ${next.start})`,
      entry: curr,
      next
    });

    if (fix) {
      // Extend current to fill gap
      timeline[curr._idx].end = next.start;
      fixes++;
    }
  }
}

// === CHECK 3: Text overlays ONLY on speaker layouts ===
// Text overlays must be on speaker_full, gradual_zoom, or jump_cut_in ONLY.
// Never on slides, GIFs, B-roll, splits, or any non-speaker layout.
const SPEAKER_LAYOUT_TYPES = new Set(["speaker_full", "gradual_zoom", "jump_cut_in", "jump_zoom_in", "jump_zoom_out", "jump_cut_out"]);
for (const overlay of textOverlays) {
  const midpoint = (overlay.start + overlay.end) / 2;
  const underlyingLayout = baseLayouts.find(e => e.start <= midpoint && e.end > midpoint);

  if (underlyingLayout && !SPEAKER_LAYOUT_TYPES.has(underlyingLayout.type)) {
    issues.push({
      check: 3,
      severity: "ERROR",
      msg: `Text overlay "${overlay.text}" at ${overlay.start}→${overlay.end} lands on ${underlyingLayout.type} (${underlyingLayout.start}→${underlyingLayout.end}) — text must only be on speaker layouts`,
      entry: overlay,
      underlying: underlyingLayout
    });

    if (fix) {
      // Remove text overlay that's on a non-speaker layout
      timeline[overlay._idx] = null;
      fixes++;
    }
  }
}

// === CHECK 4: Overlapping base layouts ===
for (let i = 0; i < baseLayouts.length - 1; i++) {
  const curr = baseLayouts[i];
  const next = baseLayouts[i + 1];

  if (curr.end > next.start + 0.01) {
    issues.push({
      check: 4,
      severity: "ERROR",
      msg: `Overlapping: ${curr.type} (${curr.start}→${curr.end}) overlaps ${next.type} (${next.start}→${next.end}) by ${(curr.end - next.start).toFixed(2)}s`,
      entry: curr,
      next
    });
  }
}

// === CHECK 5: Text overlays misaligned with speech ===
if (transcript && transcript.words) {
  for (const overlay of textOverlays) {
    const text = overlay.text.toLowerCase().split(/\s+/);
    const firstWord = text[0];

    // Find nearest word match in transcript
    let bestMatch = null;
    let bestDist = Infinity;

    for (const w of transcript.words) {
      const wText = (w.word || w.text || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      if (wText.includes(firstWord.replace(/[^a-z0-9]/g, ""))) {
        const dist = Math.abs((w.start > 1000 ? w.start / 1000 : w.start) - overlay.start);
        if (dist < bestDist) {
          bestDist = dist;
          bestMatch = w;
        }
      }
    }

    if (bestMatch && bestDist > 2) {
      issues.push({
        check: 5,
        severity: "WARN",
        msg: `Text overlay "${overlay.text}" at ${overlay.start}s — nearest speech "${bestMatch.text}" at ${(bestMatch.start / 1000).toFixed(2)}s (${bestDist.toFixed(1)}s off)`,
        entry: overlay,
        match: bestMatch
      });
    }
  }
}

// === CHECK 7: Text overlays spanning a jarring layout transition ===
// If the underlying base layout changes significantly while text is still visible, it looks abrupt.
// Skip visually continuous transitions (zoom_in→cut_in, cut_in→zoom_out are the same zoom).
const CONTINUOUS_PAIRS = new Set([
  "jump_zoom_in->jump_cut_in",
  "jump_cut_in->jump_zoom_out",
  "jump_cut_in->jump_cut_out",
  "speaker_full->gradual_zoom",
  "gradual_zoom->speaker_full"
]);
for (const overlay of textOverlays) {
  for (let i = 0; i < baseLayouts.length - 1; i++) {
    const boundary = baseLayouts[i].end;
    if (boundary > overlay.start + 0.05 && boundary < overlay.end - 0.05) {
      const before = baseLayouts[i];
      const after = baseLayouts[i + 1];
      const pair = `${before.type}->${after.type}`;
      if (CONTINUOUS_PAIRS.has(pair)) continue; // visually smooth, skip
      issues.push({
        check: 7,
        severity: "WARN",
        msg: `Text overlay "${overlay.text}" (${overlay.start}→${overlay.end}) spans layout transition at ${boundary}s: ${before.type}→${after.type}. End overlay at ${boundary}s or delay layout change to ${overlay.end}s.`,
        entry: overlay
      });
      break;
    }
  }
}

// === CHECK 6: First segment must be a speaker layout with motion ===
const SPEAKER_WITH_MOTION = new Set(["gradual_zoom", "jump_cut_in", "jump_zoom_in"]);
if (baseLayouts.length > 0) {
  const first = baseLayouts[0];
  if (!SPEAKER_WITH_MOTION.has(first.type)) {
    const label = SPEAKER_TYPES.has(first.type)
      ? `${first.type} (no motion — use gradual_zoom instead)`
      : `${first.type} (not a speaker layout — viewers must see the speaker first)`;
    issues.push({
      check: 6,
      severity: "ERROR",
      msg: `First segment is ${label}. Timeline must start with speaker + animation (gradual_zoom recommended).`
    });
  }
}

// === Apply fixes ===
if (fix) {
  const cleaned = timeline.filter(e => e !== null);
  cleaned.sort((a, b) => a.start - b.start);
  fs.writeFileSync(timelinePath, JSON.stringify(cleaned, null, 2));
  console.log(`\nApplied ${fixes} auto-fixes. ${cleaned.length} entries remaining.\n`);
}

// === Report ===
if (issues.length === 0) {
  console.log("✓ No issues found.");
} else {
  const errors = issues.filter(i => i.severity === "ERROR");
  const warns = issues.filter(i => i.severity === "WARN");

  console.log(`Found ${issues.length} issues (${errors.length} errors, ${warns.length} warnings):\n`);

  for (const issue of issues) {
    const prefix = issue.severity === "ERROR" ? "ERROR" : "WARN ";
    console.log(`  [${prefix}] Check ${issue.check}: ${issue.msg}`);
  }

  if (!fix && errors.length > 0) {
    console.log(`\nRun with --fix to auto-fix ${errors.filter(i => i.check === 1).length} short speaker segments.`);
  }
}
