"""
SRT Parser - Extract word timestamps from subtitle files.
"""

import re
from typing import List, Optional
from dataclasses import dataclass


@dataclass
class SubtitleEntry:
    index: int
    start: float
    end: float
    text: str


def parse_timestamp(ts: str) -> float:
    """Convert SRT timestamp (00:01:23,456) to seconds."""
    ts = ts.replace(',', '.')
    parts = ts.split(':')
    hours = int(parts[0])
    minutes = int(parts[1])
    seconds = float(parts[2])
    return hours * 3600 + minutes * 60 + seconds


def parse_srt(srt_path: str) -> List[SubtitleEntry]:
    """Parse SRT file into list of subtitle entries."""
    with open(srt_path, 'r', encoding='utf-8') as f:
        content = f.read()

    entries = []
    blocks = re.split(r'\n\n+', content.strip())

    for block in blocks:
        lines = block.strip().split('\n')
        if len(lines) < 3:
            continue

        try:
            index = int(lines[0])
            timestamp_line = lines[1]
            text = ' '.join(lines[2:])

            match = re.match(r'(\S+)\s*-->\s*(\S+)', timestamp_line)
            if match:
                start = parse_timestamp(match.group(1))
                end = parse_timestamp(match.group(2))

                entries.append(SubtitleEntry(
                    index=index,
                    start=start,
                    end=end,
                    text=text.strip()
                ))
        except (ValueError, IndexError):
            continue

    return entries


def find_phrase_timestamp(entries: List[SubtitleEntry], phrase: str) -> Optional[float]:
    """Find the timestamp when a phrase is spoken."""
    phrase_lower = phrase.lower()

    # Clean phrase
    phrase_clean = re.sub(r'[^\w\s]', '', phrase_lower)

    # Try exact substring match first
    for entry in entries:
        entry_clean = re.sub(r'[^\w\s]', '', entry.text.lower())
        if phrase_clean in entry_clean:
            return entry.start

    # Try matching key words (at least 50% overlap)
    phrase_words = set(phrase_clean.split())
    best_match = None
    best_score = 0

    for entry in entries:
        entry_clean = re.sub(r'[^\w\s]', '', entry.text.lower())
        entry_words = set(entry_clean.split())
        overlap = len(phrase_words & entry_words)
        if overlap > best_score:
            best_score = overlap
            best_match = entry

    if best_match and best_score >= len(phrase_words) * 0.4:
        return best_match.start

    return None
