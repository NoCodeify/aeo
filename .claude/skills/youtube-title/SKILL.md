---
name: youtube-title
description: "Generate and validate YouTube video titles using acute moments, 16 proven patterns, and 765 title frameworks. Use this for title generation. Do NOT use for hooks (/youtube-hook), scripts (/youtube-script-plan), or thumbnails (/thumbnail)."
allowed-tools: Read;Grep;Glob;Write
context: fork
agent: title-validator
---

# YouTube Title Generator

Generate 5-7 validated title options for a YouTube video. Presents options with scores - user picks the winner.

## Input
Topic, keyword, or video concept. Optionally include: target audience, niche, recent titles to avoid.

## Output
Scored title options with pattern analysis, acute moment mapping, and red/green flag validation.

$ARGUMENTS
