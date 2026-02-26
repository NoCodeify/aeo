/**
 * Transform timeline.json:
 * 1. Convert all gif_overlay → gif_full (split underlying base layout)
 * 2. Replace data viz components with Excalidraw slides
 * 3. Insert new slides at specified timestamps
 *
 * Two-pass approach to avoid conflicts:
 * Pass 1: gif conversions + data viz replacements
 * Pass 2: slide insertions into remaining base layouts
 */

const fs = require("fs");
const path = require("path");

const timelinePath = path.join(__dirname, "public/timeline.json");
const backupPath = path.join(__dirname, "public/timeline-backup.json");

// Backup original
const originalTimeline = JSON.parse(fs.readFileSync(timelinePath, "utf-8"));
fs.writeFileSync(backupPath, JSON.stringify(originalTimeline, null, 2));
console.log("Backed up to timeline-backup.json");

let timeline = JSON.parse(JSON.stringify(originalTimeline));

const OVERLAY_TYPES = new Set([
  "text_overlay", "sfx", "gif_overlay", "lower_third", "callout",
  "light_leak", "confetti_burst", "check_x_mark", "cta_overlay",
  "counter_ticker", "screen_shake", "newspaper_flash", "social_proof_flash",
  "circle_timer", "text_reveal_wipe", "toggle_switch", "countdown_flip",
  "notification_stack",
]);

function isBaseLayout(e) { return !OVERLAY_TYPES.has(e.type); }

// ========== PASS 1A: Replace data viz with slides ==========
const dataVizReplacements = [
  { matchType: "flow_diagram", matchStart: 60.0, content: "slides/slide-10-walls-ceiling.jpg", newType: "slide_full" },
  { matchType: "bullet_list", matchStart: 130.0, content: "slides/slide-09-five-projects.jpg", newType: "slide_full" },
  { matchType: "comparison_table", matchStart: 140.67, content: "slides/slide-10-walls-ceiling.jpg", newType: "slide_full" },
  { matchType: "flow_diagram", matchStart: 197.05, content: "slides/slide-11-bug-pipeline.jpg", newType: "slide_full" },
  { matchType: "stat_cards", matchStart: 314.87, content: "slides/slide-13-hours-vs-minutes.jpg", newType: "slide_full" },
  { matchType: "stat_cards", matchStart: 362.0, content: "slides/slide-15-v2-monster.jpg", newType: "slide_full" },
  { matchType: "split_5050_left", matchStart: 556.12, content: "slides/slide-19-sixty-three-percent.jpg", newType: "slide_full" },
  { matchType: "bullet_list", matchStart: 570.0, content: "slides/slide-20-four-skills.jpg", newType: "slide_full" },
];

for (const repl of dataVizReplacements) {
  const idx = timeline.findIndex(e => e.type === repl.matchType && Math.abs(e.start - repl.matchStart) < 0.5);
  if (idx !== -1) {
    const orig = timeline[idx];
    timeline[idx] = { type: repl.newType, start: orig.start, end: orig.end, content: repl.content };
    console.log(`✓ Replaced ${repl.matchType} at ${orig.start}s → ${repl.content}`);
  } else {
    console.log(`✗ Could not find ${repl.matchType} near ${repl.matchStart}s`);
  }
}

// ========== PASS 1B: Convert gif_overlay → gif_full ==========
// Collect all gif_overlays
const gifEntries = [];
timeline = timeline.filter(e => {
  if (e.type === "gif_overlay") {
    gifEntries.push(e);
    return false; // remove from timeline
  }
  return true;
});

// For each gif, split the underlying base layout and insert gif_full
for (const gif of gifEntries) {
  const gs = gif.start;
  const ge = gif.end;

  // Find base layout that contains this gif's time range
  const baseIdx = timeline.findIndex(e => isBaseLayout(e) && e.start <= gs && e.end >= ge);

  if (baseIdx !== -1) {
    const base = timeline[baseIdx];
    const parts = [];

    // Before
    if (gs - base.start > 0.3) {
      parts.push({ ...base, end: gs });
    }

    // GIF full
    parts.push({ type: "gif_full", start: gs, end: ge, content: gif.content });

    // After
    if (base.end - ge > 0.3) {
      parts.push({ ...base, start: ge });
    }

    timeline.splice(baseIdx, 1, ...parts);
    console.log(`✓ gif_overlay → gif_full at ${gs}s (split ${base.type} ${base.start}-${base.end})`);
  } else {
    // Try to find a base that at least starts before the gif
    const nearestIdx = timeline.findIndex(e => isBaseLayout(e) && e.start <= gs && e.end > gs);
    if (nearestIdx !== -1) {
      const base = timeline[nearestIdx];
      // Trim the base and insert gif
      const origEnd = base.end;
      base.end = gs;

      const gifFull = { type: "gif_full", start: gs, end: ge, content: gif.content };

      const insertParts = [gifFull];
      // If the base extended past the gif, add the remainder
      if (origEnd > ge + 0.3) {
        // Find what comes after
        const nextBase = timeline.find(e => isBaseLayout(e) && e.start >= ge);
        if (!nextBase || nextBase.start > ge + 0.3) {
          insertParts.push({ ...base, start: ge, end: origEnd, type: base.type });
        }
      }

      // Insert after the trimmed base
      const insertAt = nearestIdx + 1;
      timeline.splice(insertAt, 0, ...insertParts);
      console.log(`✓ gif_overlay → gif_full at ${gs}s (trimmed ${base.type}, partial overlap)`);
    } else {
      // Just insert
      const insertIdx = timeline.findIndex(e => e.start >= gs);
      timeline.splice(insertIdx >= 0 ? insertIdx : timeline.length, 0, {
        type: "gif_full", start: gs, end: ge, content: gif.content
      });
      console.log(`✓ gif_overlay → gif_full at ${gs}s (standalone insert)`);
    }
  }
}

// ========== PASS 2: Insert new slides into remaining base layouts ==========
// Now scan for available speaker_full/gradual_zoom segments to split
const newSlides = [
  // Hook area
  { time: 1.76, dur: 1.36, content: "slides/slide-03-dm-champ.jpg", type: "slide_full" },
  // After "one developer reviews" - in speaker_full 10.0-11.84
  { time: 10.0, dur: 1.84, content: "slides/slide-04-one-dev-zero-code.jpg", type: "slide_full" },
  // "real day to day" - in gradual_zoom 16.64-18.8
  { time: 16.64, dur: 2.16, content: "slides/slide-05-tutorials-vs-reality.jpg", type: "slide_full" },
  // After GHL/Zapier origin - in broll 40.08-46.0 area, let's use the speaker after broll
  // Actually there's speaker_full 34.84-36.0 (before gif), then gif 36-38.5, then speaker 38.5-40.08
  // Use after broll: speaker_full at 46.0-48.5 (before FlutterFlow gif)
  // Actually let me check - after gif conversion, what's at ~40?
  // broll 40.08-46.0 is still there. Put slide-06 right after the broll
  // speaker_full was 46.0-51.04 but gif split it. So ~46-48.5 is speaker, 48.5-51 is gif
  // Put slide-06 at 39.0 by splitting 38.5-40.08 speaker... that's only 1.58s, too short
  // Better: replace broll at 40.08-46.0 partially, or insert slide before broll
  // Simplest: put slide in the 34.84-36.0 speaker segment (1.16s only, too short)
  // Actually let's just put it after the no-code discussion, at ~52s after flutterflow gif
  // After gif 48.5-51.0, there's gradual_zoom 51.04-55.0 (3.96s) - perfect!
  { time: 51.04, dur: 3.0, content: "slides/slide-06-no-code-stack.jpg", type: "slide_full" },
  // FlutterFlow walls - after cursor area. gradual_zoom at 68.27-75.0 has room before broll
  // Actually wait, we already have slide-08 cursor going there. Let me put flutterflow earlier
  // The speaker_full at 55.0-60.0 (5s) has room
  { time: 55.0, dur: 3.0, content: "slides/slide-07-flutterflow-walls.jpg", type: "slide_full" },
  // Cursor slide - gradual_zoom 68.27-75.0 (before broll)
  { time: 68.27, dur: 3.5, content: "slides/slide-08-cursor.jpg", type: "slide_full" },
  // Scope blindness - speaker_full 254.35-260.0 (5.65s, good)
  { time: 254.35, dur: 4.0, content: "slides/slide-12-scope-blindness.jpg", type: "slide_full" },
  // Wins vs losses - speaker_full 332.0-336.0 (after gif conversion, before next gif at 336)
  { time: 332.0, dur: 4.0, content: "slides/slide-14-wins-vs-losses.jpg", type: "slide_full" },
  // Migration plan square (split_5050) - speaker_full 400.0-407.0
  { time: 400.0, dur: 5.0, content: "slides/slide-16-migration-plan-square.jpg", type: "split_5050_right" },
  // Parallel systems - gradual_zoom 407.0-410.0 (before gif at 410) + speaker after gif at 412.5
  // Better: use speaker_full 424.0-430.0 (6s, plenty of room)
  { time: 424.0, dur: 4.0, content: "slides/slide-17-parallel-systems.jpg", type: "slide_full" },
  // Team vs solo - speaker_full 493.3-499.0 area
  { time: 493.3, dur: 4.0, content: "slides/slide-18-team-vs-solo.jpg", type: "slide_full" },
];

for (const slide of newSlides) {
  const ss = slide.time;
  const se = ss + slide.dur;

  // Find base layout that fully contains [ss, se]
  const baseIdx = timeline.findIndex(e => isBaseLayout(e) && e.start <= ss + 0.01 && e.end >= se - 0.01);

  if (baseIdx !== -1) {
    const base = timeline[baseIdx];
    const parts = [];

    if (ss - base.start > 0.3) {
      parts.push({ ...base, end: ss });
    }
    parts.push({ type: slide.type, start: ss, end: se, content: slide.content });
    if (base.end - se > 0.3) {
      parts.push({ ...base, start: se });
    }

    timeline.splice(baseIdx, 1, ...parts);
    console.log(`✓ Inserted ${slide.type} at ${ss}-${se}s (split ${base.type} ${base.start}-${base.end})`);
  } else {
    console.log(`✗ No base layout for slide at ${ss}s (${slide.content})`);
    // List nearby base layouts for debugging
    const nearby = timeline.filter(e => isBaseLayout(e) && Math.abs(e.start - ss) < 10)
      .map(e => `  ${e.type} ${e.start}-${e.end}`).join("\n");
    console.log(`  Nearby base layouts:\n${nearby}`);
  }
}

// ========== CLEANUP ==========
// Sort: base layouts by start, overlays attached to their time
timeline.sort((a, b) => {
  const diff = a.start - b.start;
  if (Math.abs(diff) < 0.01) {
    if (isBaseLayout(a) && !isBaseLayout(b)) return -1;
    if (!isBaseLayout(a) && isBaseLayout(b)) return 1;
  }
  return diff;
});

// Check for overlapping base layouts
const bases = timeline.filter(isBaseLayout);
let fixes = 0;
for (let i = 0; i < bases.length - 1; i++) {
  if (bases[i].end > bases[i+1].start + 0.02) {
    console.log(`⚠ Overlap: ${bases[i].type} ends ${bases[i].end} vs ${bases[i+1].type} starts ${bases[i+1].start} → trimming`);
    bases[i].end = bases[i+1].start;
    fixes++;
  }
}

// Remove micro-segments
timeline = timeline.filter(e => {
  const dur = e.end - e.start;
  if (dur < 0.2) {
    console.log(`🗑 Removed ${e.type} at ${e.start}s (${dur.toFixed(2)}s)`);
    return false;
  }
  return true;
});

// Write
fs.writeFileSync(timelinePath, JSON.stringify(timeline, null, 2));

// Stats
const gifFull = timeline.filter(e => e.type === "gif_full").length;
const slides = timeline.filter(e => e.type === "slide_full" || e.type?.startsWith("split_5050")).length;
const brolls = timeline.filter(e => e.type === "broll_full").length;
const speakers = timeline.filter(e => e.type === "speaker_full" || e.type === "gradual_zoom").length;
const totalBase = timeline.filter(isBaseLayout).length;

console.log(`\n=== RESULT ===`);
console.log(`Total entries: ${timeline.length}`);
console.log(`GIF full: ${gifFull}`);
console.log(`Slides: ${slides}`);
console.log(`B-roll: ${brolls}`);
console.log(`Speaker/zoom: ${speakers}`);
console.log(`Total base layouts: ${totalBase}`);
