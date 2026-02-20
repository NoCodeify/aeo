---
name: youtube-hook
description: "Generate 3 YouTube hook options (Safe/Experimental/Hybrid) from a locked title using 6 proven templates. Use AFTER /youtube-title. Do NOT use for titles (/youtube-title), scripts (/youtube-script-plan), or thumbnails (/thumbnail)."
allowed-tools: Read;Grep;Glob;Write
context: fork
agent: hook-generator
---

# YouTube Hook Generator

Generate 3 hook options from a locked title + thumbnail concept. Presents Safe, Experimental, and Hybrid approaches - user picks the winner.

## Input
Locked title + thumbnail concept. Optionally include: video type, brain dump notes, recent hooks to avoid.

## Output
3 hook options with template analysis, voice check, and efficiency justification.

$ARGUMENTS
