"""
Generate edit timeline from prompter + SRT + slides.

Matches [SLIDE XX] markers in prompter to timestamps in SRT,
then generates edit decisions (50/50 splits, zooms, etc.)
"""

import re
import os
import json
from typing import List, Dict, Optional
from srt_parser import parse_srt, find_phrase_timestamp, SubtitleEntry


def parse_prompter(prompter_path: str) -> List[Dict]:
    """
    Parse prompter.txt to extract slide markers and their spoken cues.

    Returns list of:
        {"slide_num": 1, "slide_name": "...", "slide_file": "slide-01.jpg", "cue": "..."}
    """
    with open(prompter_path, 'r') as f:
        content = f.read()

    pattern = r'\[SLIDE (\d+):\s*([^\]]+)\]'
    matches = list(re.finditer(pattern, content))

    slides = []
    for i, match in enumerate(matches):
        slide_num = int(match.group(1))
        slide_name = match.group(2).strip()

        # Get the text between this marker and the next
        start_pos = match.end()
        end_pos = matches[i + 1].start() if i + 1 < len(matches) else len(content)
        section_text = content[start_pos:end_pos].strip()

        # Get first 8-10 words as the cue
        clean_text = section_text.replace('\n', ' ').strip()
        words = clean_text.split()[:10]
        cue = ' '.join(words)

        slides.append({
            "slide_num": slide_num,
            "slide_name": slide_name,
            "slide_file": f"slide-{slide_num:02d}.jpg",
            "cue": cue,
            "full_text": clean_text
        })

    return slides


def match_slides_to_timestamps(
    slides: List[Dict],
    srt_entries: List[SubtitleEntry],
    sequential: bool = True
) -> List[Dict]:
    """
    Match slide cues to SRT timestamps.
    If sequential=True, enforce slide order and only search forward in time.
    """
    min_timestamp = 0.0

    for slide in slides:
        cue = slide["cue"]
        timestamp = None

        if sequential:
            valid_entries = [e for e in srt_entries if e.start >= min_timestamp - 1.0]
        else:
            valid_entries = srt_entries

        timestamp = find_phrase_timestamp(valid_entries, cue)

        if timestamp is None:
            # Try with fewer words
            words = cue.split()
            for n in range(len(words), 2, -1):
                shorter_cue = ' '.join(words[:n])
                timestamp = find_phrase_timestamp(valid_entries, shorter_cue)
                if timestamp is not None:
                    break

        if timestamp is not None:
            slide["start_time"] = timestamp
            if sequential:
                min_timestamp = timestamp + 0.5
        else:
            print(f"Warning: Could not find timestamp for slide {slide['slide_num']}: '{cue[:50]}...'")
            slide["start_time"] = None

    return slides


def interpolate_missing_timestamps(slides: List[Dict], video_duration: float) -> List[Dict]:
    """Fill in missing timestamps by interpolating between known points."""
    # Build list of (index, time) for known timestamps
    known = [(i, s["start_time"]) for i, s in enumerate(slides) if s.get("start_time") is not None]

    if not known:
        # No matches - distribute evenly
        for i, slide in enumerate(slides):
            slide["start_time"] = (i / len(slides)) * video_duration
        return slides

    # Add anchors at start/end
    if known[0][0] != 0:
        known.insert(0, (0, 0.0))
    if known[-1][0] != len(slides) - 1:
        known.append((len(slides) - 1, video_duration))

    # Sort by index
    known.sort(key=lambda x: x[0])

    # Interpolate missing slides
    for i, slide in enumerate(slides):
        if slide.get("start_time") is not None:
            continue

        # Find surrounding known points
        prev_point = None
        next_point = None
        for k_idx, k_time in known:
            if k_idx <= i:
                prev_point = (k_idx, k_time)
            if k_idx >= i and next_point is None:
                next_point = (k_idx, k_time)
                break

        if prev_point and next_point and prev_point[0] != next_point[0]:
            progress = (i - prev_point[0]) / (next_point[0] - prev_point[0])
            slide["start_time"] = prev_point[1] + progress * (next_point[1] - prev_point[1])
        elif prev_point:
            slide["start_time"] = prev_point[1]
        elif next_point:
            slide["start_time"] = next_point[1]

    return slides


def generate_edits(
    slides: List[Dict],
    slides_dir: str,
    video_duration: float,
    speaker_side: str = "right"
) -> List[Dict]:
    """Generate edit timeline with creative decisions."""
    edits = []

    valid_slides = [s for s in slides if s.get("start_time") is not None]
    valid_slides.sort(key=lambda x: x["start_time"])

    if not valid_slides:
        print("Error: No slides matched to timestamps")
        return []

    # Full frame hook before first slide
    first_slide_time = valid_slides[0]["start_time"]
    if first_slide_time > 0.5:
        edits.append({
            "type": "full",
            "start": 0,
            "end": first_slide_time
        })

    for i, slide in enumerate(valid_slides):
        start = slide["start_time"]
        end = valid_slides[i + 1]["start_time"] if i + 1 < len(valid_slides) else video_duration

        slide_path = os.path.join(slides_dir, slide["slide_file"])
        slide_name = slide["slide_name"].upper()

        # CTA slide - full content
        if "AEOPROTOCOL" in slide_name:
            edits.append({
                "type": "full_content",
                "start": start,
                "end": end,
                "content": slide_path
            })
        # Default: 50/50 split
        else:
            edits.append({
                "type": "split_50",
                "start": start,
                "end": end,
                "content": slide_path,
                "speaker_side": speaker_side
            })

    return edits


def generate_timeline(
    prompter_path: str,
    srt_path: str,
    slides_dir: str,
    video_path: str,
    output_path: str = "timeline.json",
    speaker_side: str = "right"
) -> List[Dict]:
    """Full pipeline: prompter + SRT -> timeline.json"""
    from moviepy import VideoFileClip

    print(f"Parsing prompter: {prompter_path}")
    slides = parse_prompter(prompter_path)
    print(f"Found {len(slides)} slides")

    print(f"Parsing SRT: {srt_path}")
    srt_entries = parse_srt(srt_path)
    print(f"Found {len(srt_entries)} subtitle entries")

    print("Matching slides to timestamps...")
    slides = match_slides_to_timestamps(slides, srt_entries)

    matched = sum(1 for s in slides if s.get("start_time") is not None)
    print(f"Matched {matched}/{len(slides)} slides")

    print(f"Getting video duration: {video_path}")
    video = VideoFileClip(video_path)
    duration = video.duration
    video.close()
    print(f"Video duration: {duration:.1f}s")

    if matched < len(slides):
        print(f"Interpolating {len(slides) - matched} missing timestamps...")
        slides = interpolate_missing_timestamps(slides, duration)

    print("Generating edit timeline...")
    edits = generate_edits(slides, slides_dir, duration, speaker_side)

    print(f"Generated {len(edits)} edits")

    with open(output_path, 'w') as f:
        json.dump(edits, f, indent=2)
    print(f"Saved to {output_path}")

    return edits


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 5:
        print("Usage: python generate_timeline.py <prompter.txt> <subtitles.srt> <slides_dir> <video.mp4> [output.json]")
        sys.exit(1)

    prompter = sys.argv[1]
    srt = sys.argv[2]
    slides_dir = sys.argv[3]
    video = sys.argv[4]
    output = sys.argv[5] if len(sys.argv) > 5 else "timeline.json"

    generate_timeline(prompter, srt, slides_dir, video, output)
