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
 * 8. Layout transitions not aligned with splice points (if splice-points.json exists)
 * 9. Counter tickers outliving their underlying speaker layout
 * 10. Zero-duration entries (crash Remotion: durationInFrames must be positive)
 * 11. Jump_cut_out directly before a visual layout (creates speaker flash)
 * 12. Jump cuts with minimum duration (<0.5s too short to register visually)
 * 13. Overlapping full-screen content (slide/meme hidden behind GIF)
 * 14. Timeline doesn't cover full video duration
 *
 * Usage: node lint-timeline.js [--fix]
 *   --fix  Auto-fix short speaker segments by extending adjacent layouts
 */
const fs = require("fs");
const path = require("path");

const fix = process.argv.includes("--fix");
const timelinePath = path.join(__dirname, "public/timeline.json");
const transcriptCleanPath = path.join(__dirname, "public/transcript-clean.json");
const transcriptFallbackPath = path.join(__dirname, "public/transcript.json");
const splicePath = path.join(__dirname, "public/splice-points.json");

const timeline = JSON.parse(fs.readFileSync(timelinePath, "utf-8"));

let transcript = null;
try {
  transcript = JSON.parse(fs.readFileSync(transcriptCleanPath, "utf-8"));
} catch {
  try {
    transcript = JSON.parse(fs.readFileSync(transcriptFallbackPath, "utf-8"));
  } catch {
    console.log("(no transcript found, skipping speech-timing checks)\n");
  }
}

let spliceData = null;
try {
  spliceData = JSON.parse(fs.readFileSync(splicePath, "utf-8"));
} catch {
  // splice-points.json is optional
}

const OVERLAY_TYPES = new Set([
  "text_overlay", "sfx", "gif_overlay", "lower_third", "callout",
  "light_leak", "confetti_burst", "check_x_mark", "cta_overlay",
  "counter_ticker", "screen_shake", "newspaper_flash", "social_proof_flash",
  "circle_timer", "text_reveal_wipe", "toggle_switch", "countdown_flip",
  "notification_stack"
]);

const SPEAKER_TYPES = new Set(["speaker_full", "gradual_zoom"]);
const VISUAL_TYPES = new Set(["slide_full", "gif_full", "broll_full", "split_5050_left", "split_5050_right", "split_left", "split_right"]);

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
      const searchWord = firstWord.replace(/[^a-z0-9]/g, "");
      // Match exact, plural (s/es/ies), or stem (word contains search or search contains word)
      if (wText.includes(searchWord) || searchWord.includes(wText)) {
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
        severity: bestDist > 10 ? "ERROR" : "WARN",
        msg: `Text overlay "${overlay.text}" at ${overlay.start}s — nearest speech "${bestMatch.word || bestMatch.text}" at ${(bestMatch.start > 1000 ? bestMatch.start / 1000 : bestMatch.start).toFixed(2)}s (${bestDist.toFixed(1)}s off)`,
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
        severity: "ERROR",
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

// === CHECK 8: Layout transitions aligned with splice points ===
// If splice-points.json exists, check that layout transitions happen at or near splice points.
// A splice point is where Tella physically cut the audio — layout changes should sync to these.
if (spliceData && spliceData.splices && spliceData.splices.length > 0) {
  const splices = spliceData.splices;
  const spliceTimes = splices.map(s => s.cutTime);

  // Find layout transitions (where one base layout ends and a different one begins)
  let transitionsTotal = 0;
  let transitionsAligned = 0;
  let transitionsMisaligned = [];

  for (let i = 0; i < baseLayouts.length - 1; i++) {
    const curr = baseLayouts[i];
    const next = baseLayouts[i + 1];

    // Skip zoom sequences (these are internal to a single visual moment)
    const ZOOM_TYPES = new Set(["jump_zoom_in", "jump_cut_in", "jump_zoom_out", "jump_cut_out"]);
    if (ZOOM_TYPES.has(curr.type) || ZOOM_TYPES.has(next.type)) continue;
    // Skip gradual_zoom to/from speaker_full (continuous, not a hard cut)
    if (
      (curr.type === "gradual_zoom" && next.type === "speaker_full") ||
      (curr.type === "speaker_full" && next.type === "gradual_zoom")
    ) continue;

    const transitionTime = curr.end;
    transitionsTotal++;

    // Find nearest splice point
    let minDist = Infinity;
    for (const st of spliceTimes) {
      const dist = Math.abs(st - transitionTime);
      if (dist < minDist) minDist = dist;
    }

    if (minDist <= 0.5) {
      transitionsAligned++;
    } else {
      transitionsMisaligned.push({
        time: transitionTime,
        from: curr.type,
        to: next.type,
        nearestSplice: minDist
      });
    }
  }

  const alignRate = transitionsTotal > 0
    ? ((transitionsAligned / transitionsTotal) * 100).toFixed(0)
    : 100;

  console.log(`\n  Splice alignment: ${transitionsAligned}/${transitionsTotal} layout transitions within 0.5s of a splice point (${alignRate}%)`);

  // Only warn about first-60s misalignments (these matter most for retention)
  const hookMisaligned = transitionsMisaligned.filter(t => t.time <= 60);
  if (hookMisaligned.length > 0) {
    for (const t of hookMisaligned) {
      issues.push({
        check: 8,
        severity: "ERROR",
        msg: `Layout transition at ${t.time.toFixed(2)}s (${t.from} -> ${t.to}) is ${t.nearestSplice.toFixed(1)}s from nearest splice point. In the first 60s, snap transitions to splice points for perfect sync.`
      });
    }
  }

  // Post-60s misalignments — still errors, just less retention-critical than hook
  const restMisaligned = transitionsMisaligned.filter(t => t.time > 60);
  if (restMisaligned.length > 0) {
    for (const t of restMisaligned) {
      issues.push({
        check: 8,
        severity: "ERROR",
        msg: `Layout transition at ${t.time.toFixed(2)}s (${t.from} -> ${t.to}) is ${t.nearestSplice.toFixed(1)}s from nearest splice point. Snap to splice for clean cut.`
      });
    }
  }
} else {
  console.log("\n  (no splice-points.json found, skipping splice alignment check)");
}

// === CHECK 9: Counter tickers outliving their underlying speaker layout ===
// A counter_ticker overlay must have a speaker layout (speaker_full/gradual_zoom) underneath
// for its entire duration. If a slide_full starts before the counter ends, the slide covers it.
const counterTickers = timeline
  .map((e, idx) => ({ ...e, _idx: idx }))
  .filter(e => e.type === "counter_ticker");

for (const counter of counterTickers) {
  // Find what base layouts cover the counter's time range
  for (const base of baseLayouts) {
    if (base.start > counter.start && base.start < counter.end && !SPEAKER_LAYOUT_TYPES.has(base.type)) {
      issues.push({
        check: 9,
        severity: "ERROR",
        msg: `Counter ticker (${counter.start}→${counter.end}) gets covered by ${base.type} starting at ${base.start}s. Extend the underlying speaker layout to ${counter.end}s or shorten the counter.`
      });
      break;
    }
  }
}

// === CHECK 10: Zero-duration entries (crash Remotion) ===
for (let i = 0; i < timeline.length; i++) {
  const e = timeline[i];
  if (e && e.start !== undefined && e.end !== undefined) {
    const dur = e.end - e.start;
    if (dur <= 0) {
      issues.push({
        check: 10,
        severity: "ERROR",
        msg: `Zero/negative duration ${e.type} at ${e.start}→${e.end} (${dur.toFixed(3)}s). Remotion will crash (durationInFrames must be positive). Delete this entry.`
      });

      if (fix) {
        timeline[i] = null;
        fixes++;
      }
    }
  }
}

// === CHECK 11: Jump_cut_out directly before a visual layout (speaker flash) ===
// A short jump_cut_out (<0.5s) immediately before a slide/gif/meme creates a brief talking head flash.
for (let i = 0; i < baseLayouts.length - 1; i++) {
  const curr = baseLayouts[i];
  const next = baseLayouts[i + 1];

  if (curr.type === "jump_cut_out" && (curr.end - curr.start) < 0.5 && VISUAL_TYPES.has(next.type)) {
    issues.push({
      check: 11,
      severity: "ERROR",
      msg: `Short jump_cut_out (${(curr.end - curr.start).toFixed(2)}s) at ${curr.start}→${curr.end} before ${next.type}. Creates a speaker flash. Delete it and extend the next visual to start at ${curr.start}s.`
    });

    if (fix) {
      timeline[next._idx].start = curr.start;
      timeline[curr._idx] = null;
      fixes++;
    }
  }
}

// === CHECK 12: Jump cuts with minimum duration ===
// Any jump_cut_in or jump_cut_out under 0.5s is too short to register visually.
// Also catches jump_cut_out before ANY non-speaker layout (extends Check 11).
const JUMP_TYPES = new Set(["jump_cut_in", "jump_cut_out", "jump_zoom_in", "jump_zoom_out"]);
for (let i = 0; i < baseLayouts.length; i++) {
  const entry = baseLayouts[i];
  if (!JUMP_TYPES.has(entry.type)) continue;

  const duration = entry.end - entry.start;
  if (duration < 0.5) {
    issues.push({
      check: 12,
      severity: "ERROR",
      msg: `Short ${entry.type} (${duration.toFixed(2)}s) at ${entry.start}→${entry.end}. Jump cuts must be >= 0.5s to register visually. Extend or merge with adjacent segment.`
    });

    if (fix) {
      // Merge into the previous or next segment
      const prev = i > 0 ? baseLayouts[i - 1] : null;
      const next = i < baseLayouts.length - 1 ? baseLayouts[i + 1] : null;
      if (prev && SPEAKER_TYPES.has(prev.type)) {
        // Extend previous speaker to cover
        timeline[prev._idx].end = entry.end;
        timeline[entry._idx] = null;
        fixes++;
      } else if (next) {
        // Extend next segment to cover
        timeline[next._idx].start = entry.start;
        timeline[entry._idx] = null;
        fixes++;
      }
    }
  }
}

// === CHECK 13: Overlapping full-screen content (slide/meme hidden behind GIF or vice versa) ===
// If two full-screen content types overlap or one is zero-duration while another covers the same time,
// the first is invisible and should be removed.
const fullScreenContent = baseLayouts.filter(e => VISUAL_TYPES.has(e.type) || SPEAKER_TYPES.has(e.type));
for (let i = 0; i < fullScreenContent.length - 1; i++) {
  const curr = fullScreenContent[i];
  const next = fullScreenContent[i + 1];

  // Case 1: curr is zero-duration at the same start as next
  if ((curr.end - curr.start) < 0.05 && Math.abs(curr.start - next.start) < 0.05) {
    issues.push({
      check: 13,
      severity: "ERROR",
      msg: `${curr.type} at ${curr.start}s is zero-duration and immediately covered by ${next.type} (${next.start}→${next.end}). The ${curr.type} is invisible — delete it.`
    });

    if (fix) {
      timeline[curr._idx] = null;
      fixes++;
    }
  }

  // Case 2: curr and next are both full-screen visual types and overlap
  if (VISUAL_TYPES.has(curr.type) && VISUAL_TYPES.has(next.type) && curr.end > next.start + 0.05) {
    issues.push({
      check: 13,
      severity: "ERROR",
      msg: `Overlapping full-screen: ${curr.type} (${curr.start}→${curr.end}) and ${next.type} (${next.start}→${next.end}) overlap by ${(curr.end - next.start).toFixed(2)}s. One is hidden — fix timing or remove.`
    });
  }
}

// === CHECK 14: Timeline doesn't cover full video duration ===
// If transcript exists, the last timeline entry should reach at least the transcript duration.
// Otherwise the render cuts off early (calculateDuration uses Math.max of timeline ends).
if (transcript && transcript.duration) {
  const maxEnd = Math.max(...timeline.filter(e => e !== null).map(e => e.end || 0));
  const gap = transcript.duration - maxEnd;
  if (gap > 0.5) {
    issues.push({
      check: 14,
      severity: "ERROR",
      msg: `Timeline ends at ${maxEnd.toFixed(2)}s but video is ${transcript.duration}s (${gap.toFixed(1)}s uncovered). Extend the last entry or add a closing segment to cover the full video.`
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
