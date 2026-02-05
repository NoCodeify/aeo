#!/usr/bin/env python3
"""
Main entry point for video rendering.

Usage:
    python render.py <video_dir>

Expects in video_dir:
    - video/*.mp4 (speaker video)
    - video/*.srt (subtitles)
    - prompter.txt (with [SLIDE XX] markers)
    - slides/*.jpg (slide images)

Outputs:
    - video/timeline.json
    - video/output.mp4
"""

import os
import sys
import glob
import json
from generate_timeline import generate_timeline
from editor import render_video
from schema import validate_and_report


def find_file(directory: str, pattern: str) -> str:
    """Find a file matching pattern in directory."""
    matches = glob.glob(os.path.join(directory, pattern))
    if not matches:
        raise FileNotFoundError(f"No file matching '{pattern}' in {directory}")
    return matches[0]


def main(video_dir: str):
    """Main render pipeline."""

    print(f"=== Video Editor ===")
    print(f"Directory: {video_dir}")
    print()

    # Find required files
    video_subdir = os.path.join(video_dir, "video")
    slides_dir = os.path.join(video_dir, "slides")

    try:
        speaker_video = find_file(video_subdir, "*.mp4")
        srt_file = find_file(video_subdir, "*.srt")
        prompter_file = os.path.join(video_dir, "prompter.txt")

        if not os.path.exists(prompter_file):
            raise FileNotFoundError(f"prompter.txt not found in {video_dir}")
        if not os.path.exists(slides_dir):
            raise FileNotFoundError(f"slides/ directory not found in {video_dir}")

    except FileNotFoundError as e:
        print(f"Error: {e}")
        sys.exit(1)

    print(f"Speaker video: {speaker_video}")
    print(f"Subtitles: {srt_file}")
    print(f"Prompter: {prompter_file}")
    print(f"Slides: {slides_dir}")
    print()

    # Generate timeline
    timeline_path = os.path.join(video_subdir, "timeline.json")
    print("=== Generating Timeline ===")
    edits = generate_timeline(
        prompter_path=prompter_file,
        srt_path=srt_file,
        slides_dir=slides_dir,
        video_path=speaker_video,
        output_path=timeline_path
    )
    print()

    # Validate
    print("=== Validating Timeline ===")
    if not validate_and_report(edits):
        print("Fix validation errors before rendering.")
        sys.exit(1)
    print()

    # Render
    output_path = os.path.join(video_subdir, "output.mp4")
    print("=== Rendering Video ===")
    render_video(speaker_video, edits, output_path)

    print()
    print(f"=== Done! ===")
    print(f"Output: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python render.py <video_dir>")
        print()
        print("Example:")
        print("  python render.py ../youtube/weekly-production/2026-w08-rank-in-chatgpt/")
        sys.exit(1)

    main(sys.argv[1])
