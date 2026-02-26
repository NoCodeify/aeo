---
name: youtube-script-writer
description: "Write a YouTube script from locked architecture with retention mechanics and production blueprint output. Uses a writer + validator team with max 3 rounds. Use AFTER /youtube-script-plan. Do NOT use for titles (/youtube-title), hooks (/youtube-hook), or planning (/youtube-script-plan)."
---

# YouTube Script Writer Pipeline

Write a complete production blueprint from a locked script architecture. Uses a **writer + validator team** to enforce retention mechanics (Forward Pulls, WHY moments, re-tension, punchy sentences, STP ratios).

## Team Structure

Create an agent team called "script-edit" with these teammates:

### writer (general-purpose agent)
**Role:** Write the production blueprint script from locked architecture.
**Skills to preload:** Load the `script-writer` agent instructions from `.claude/agents/script-writer.md`.
**Tasks:**
1. Read the locked architecture file
2. Read `youtube/system/script-writing-rules.md`
3. Write the full production blueprint (dialogue tables, layout markers, asset lists, layout flow, new component candidate, chapter map)
4. Save to the video's weekly-production directory as `script.md`
5. Mark task complete and notify the lead

### validator (general-purpose agent)
**Role:** Validate the script against 14 quality gates.
**Skills to preload:** Load the `script-validator` agent instructions from `.claude/agents/script-validator.md`.
**Model preference:** haiku (cheap and fast - just reading and checking rules)
**Tasks (run AFTER writer completes):**
1. Read the script file
2. Read the locked architecture file
3. Read `youtube/system/script-writing-rules.md`
4. Read recent scripts from `youtube/weekly-production/*/script.md` (for story overlap check)
5. Run all 14 checks (re-tension, Forward Pulls, punchy sentences, STP ratios, banned phrases, voice, architecture compliance, production completeness, hook pacing, spoken word count, clarity, chapter re-hooks, story overlap, fact-check)
6. Output PASS or FAIL with specific fixes

## Workflow

1. Create team "script-edit"
2. Create task "Write script V1" and assign to writer
3. Writer produces script, marks task complete
4. Create task "Validate script" and assign to validator
5. Validator runs 11 checks, outputs verdict
6. **If PASS:** Have the writer extract a `prompter.md` file (plain text only - no markdown, no headings, no dividers, just spoken words with blank lines between paragraphs). Then clean up team, report success
7. **If FAIL:** Create task "Fix script" for writer with the validator's specific feedback
8. Writer applies fixes, marks task complete
9. Create task "Re-validate script" for validator
10. **Max 3 rounds** (write + validate). If still failing after 3, report remaining issues to user.

## Critical Checks (What the Validator Enforces)

| # | Check | Why It Matters |
|---|-------|---------------|
| 1 | WHY Moment + Re-tension | Viewers leave after getting answers without new questions |
| 2 | Forward Pulls every 45-60s, Level 3+ | Keeps viewers watching forward |
| 3 | Short punchy sentences (flag >25 words, require staccato sequences) | Spoken scripts need rhythm variation |
| 4 | STP ratios per block (30-40% / 40-50% / 10-20%) | Withholds payoff for tension |
| 5 | Banned phrases | Removes AI tells and lecture tone |
| 6 | Voice consistency (contractions, connectors, reading level) | Must sound like the creator |
| 7 | Architecture compliance | Script must match locked decisions |
| 8 | Production blueprint completeness | Downstream tools need markers + asset lists |
| 9 | Hook pacing | First 60s decides if viewers stay |
| 10 | **Spoken word count** | **Count ONLY quoted dialogue, not production markers. #1 failure mode.** |
| 11 | Clarity & simplicity | Confusing sentences, fancy words, vague bridges |
| 12 | **Chapter re-hooks** | **Every block must open with a standalone mini-hook for scrub-arrivals, not a soft transition** |
| 13 | **Story overlap** | **No story/example reused from recent videos (last 6-8 weeks). Viewers notice.** |
| 14 | **Fact-check & fabrication** | **All stats verified, no [NEEDS REAL DETAILS] tags remaining, stories have specific details** |

## Input

Provide the locked architecture file path:

$ARGUMENTS
