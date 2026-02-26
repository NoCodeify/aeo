/**
 * Fix all 25 audit issues in timeline.json
 */
const fs = require("fs");
const path = require("path");

const timelinePath = path.join(__dirname, "public/timeline.json");
let t = JSON.parse(fs.readFileSync(timelinePath, "utf-8"));

function findOverlay(text) {
  return t.findIndex(e => e.type === "text_overlay" && e.text === text);
}
function findSfx(start, content) {
  return t.findIndex(e => e.type === "sfx" && Math.abs(e.start - start) < 0.5 && e.content === content);
}

let fixes = 0;

// === TEXT OVERLAY TIMING FIXES ===

// #1: "1 DEV. THAT'S IT." 11.84→8.5 (when "one developer" spoken at 8.64)
let i = findOverlay("1 DEV. THAT'S IT.");
if (i !== -1) { t[i].start = 8.5; t[i].end = 10.5; fixes++; console.log(`Fixed #1: "1 DEV" → 8.5s`); }

// #2: "AI SALES AGENT" 28→26.5 (spoken at 26.48)
i = findOverlay("AI SALES AGENT");
if (i !== -1) { t[i].start = 26.5; t[i].end = 28.5; fixes++; console.log(`Fixed #2: "AI SALES AGENT" → 26.5s`); }

// #3: "FLUTTERFLOW" 46→52.5 (spoken at 52.67)
i = findOverlay("FLUTTERFLOW");
if (i !== -1) { t[i].start = 52.5; t[i].end = 54.5; fixes++; console.log(`Fixed #3: "FLUTTERFLOW" → 52.5s`); }
// Also move the boop SFX that was paired with it
i = findSfx(46, "boop");
if (i !== -1) { t[i].start = 52.5; t[i].end = 53; fixes++; console.log(`Fixed #3b: boop SFX → 52.5s`); }

// #4: "CURSOR" 66→67.5 (spoken at 68.27)
i = findOverlay("CURSOR");
if (i !== -1) { t[i].start = 67.5; t[i].end = 69.5; fixes++; console.log(`Fixed #4: "CURSOR" → 67.5s`); }

// #5/#17: "DIRECTING AI" 100.3→96 (spoken at 96.14, move off gif to gradual_zoom 88-96.14)
i = findOverlay("DIRECTING AI");
if (i !== -1) { t[i].start = 95.5; t[i].end = 97.5; fixes++; console.log(`Fixed #5: "DIRECTING AI" → 95.5s (on gradual_zoom)`); }

// #6: "DIRECTOR, NOT CODER" 114.31→107.5 (spoken at 107.78)
i = findOverlay("DIRECTOR, NOT CODER");
if (i !== -1) { t[i].start = 107.5; t[i].end = 110; fixes++; console.log(`Fixed #6: "DIRECTOR, NOT CODER" → 107.5s`); }

// #7: "2 ALREADY FIXED" 194.8→190.5 (spoken at 190.65)
i = findOverlay("2 ALREADY FIXED");
if (i !== -1) { t[i].start = 190.5; t[i].end = 192.5; fixes++; console.log(`Fixed #7: "2 ALREADY FIXED" → 190.5s`); }

// #8: "5 MINUTES" + boop 307.3→304.5 (spoken at 304.51)
i = findOverlay("5 MINUTES");
if (i !== -1) { t[i].start = 304.5; t[i].end = 307; fixes++; console.log(`Fixed #8: "5 MINUTES" → 304.5s`); }
i = findSfx(307.3, "boop");
if (i !== -1) { t[i].start = 304.5; t[i].end = 305; fixes++; console.log(`Fixed #8b: boop SFX → 304.5s`); }

// #9/#16: "360 FUNCTIONS" 358→356.5 (spoken at 354.55, move off gif to gradual_zoom 356.5-358)
i = findOverlay("360 FUNCTIONS");
if (i !== -1) { t[i].start = 356.5; t[i].end = 358; fixes++; console.log(`Fixed #9: "360 FUNCTIONS" → 356.5s (on gradual_zoom)`); }

// #10/#19: "FIREBASE TO SUPABASE" 400→389.5 (spoken at 389.81)
// This overlay is on split_5050_right, need to move to the split_5050_right that starts at 389.17
i = findOverlay("FIREBASE TO SUPABASE");
if (i !== -1) { t[i].start = 389.5; t[i].end = 392; fixes++; console.log(`Fixed #10: "FIREBASE TO SUPABASE" → 389.5s`); }

// #11: "360 TO 3" + boop 472→480 (contextually better near "One person. Directing Claude Code.")
i = findOverlay("360 TO 3");
if (i !== -1) { t[i].start = 480; t[i].end = 483; fixes++; console.log(`Fixed #11: "360 TO 3" → 480s`); }
i = findSfx(472, "boop");
if (i !== -1) { t[i].start = 480; t[i].end = 480.5; fixes++; console.log(`Fixed #11b: boop SFX → 480s`); }

// #12/#18: "WILLING TO ATTEMPT" 493.3→489.5 (spoken at 489.48, move off slide to speaker 487.5-490)
i = findOverlay("WILLING TO ATTEMPT");
if (i !== -1) { t[i].start = 489.5; t[i].end = 491.5; fixes++; console.log(`Fixed #12: "WILLING TO ATTEMPT" → 489.5s`); }

// #13: "SOLO DECISION" 496.5→498 (spoken at 498.36)
i = findOverlay("SOLO DECISION");
if (i !== -1) { t[i].start = 498; t[i].end = 500; fixes++; console.log(`Fixed #13: "SOLO DECISION" → 498s`); }

// #14: "DIRECTING > CODING" 542→547.5 (spoken at 547.52)
i = findOverlay("DIRECTING > CODING");
if (i !== -1) { t[i].start = 547.5; t[i].end = 550; fixes++; console.log(`Fixed #14: "DIRECTING > CODING" → 547.5s`); }

// #15: "THE REAL UNLOCK" 608.3→603 (spoken at 603.01)
i = findOverlay("THE REAL UNLOCK");
if (i !== -1) { t[i].start = 603; t[i].end = 606; fixes++; console.log(`Fixed #15: "THE REAL UNLOCK" → 603s`); }

// === STRUCTURAL FIXES ===

// #20: Micro-gap at 16.28-16.64 — extend speaker_full end to 16.64
i = t.findIndex(e => e.type === "speaker_full" && Math.abs(e.start - 14.16) < 0.1 && Math.abs(e.end - 16.28) < 0.1);
if (i !== -1) { t[i].end = 16.64; fixes++; console.log(`Fixed #20: speaker_full 14.16 end → 16.64 (closed gap)`); }

// #21: counter_ticker overlaps chapter_card — delay counter_ticker start to 356.5
i = t.findIndex(e => e.type === "counter_ticker" && Math.abs(e.start - 354.55) < 0.5);
if (i !== -1) { t[i].start = 356.5; fixes++; console.log(`Fixed #21: counter_ticker start → 356.5 (after chapter_card)`); }

// #22: Merge speaker_full 476.5-482 + 482-485
const sp1 = t.findIndex(e => e.type === "speaker_full" && Math.abs(e.start - 476.5) < 0.1);
const sp2 = t.findIndex(e => e.type === "speaker_full" && Math.abs(e.start - 482) < 0.1 && Math.abs(e.end - 485) < 0.1);
if (sp1 !== -1 && sp2 !== -1) {
  t[sp1].end = 485;
  t.splice(sp2, 1);
  fixes++;
  console.log(`Fixed #22: Merged speaker_full 476.5-482 + 482-485 → 476.5-485`);
}

// #23: Merge speaker_full 596-598 + 598-603.65
const sp3 = t.findIndex(e => e.type === "speaker_full" && Math.abs(e.start - 596) < 0.1 && Math.abs(e.end - 598) < 0.1);
const sp4 = t.findIndex(e => e.type === "speaker_full" && Math.abs(e.start - 598) < 0.1);
if (sp3 !== -1 && sp4 !== -1) {
  t[sp3].end = t[sp4].end;
  t.splice(sp4, 1);
  fixes++;
  console.log(`Fixed #23: Merged speaker_full 596-598 + 598-603.65 → 596-603.65`);
}

// === SORT & WRITE ===
t.sort((a, b) => a.start - b.start);
fs.writeFileSync(timelinePath, JSON.stringify(t, null, 2));
console.log(`\nDone! Applied ${fixes} fixes. ${t.length} entries.`);
