"""
Video Editor - MoviePy 2.x compositor for talking head + slides/b-roll

Layouts:
    - speaker_full: Speaker fills entire screen
    - slide_full: Slide fills entire screen (speaker audio continues)
    - split_right: Grid bg + slide left ~80%, speaker right ~20% (3:4 portrait, glass border)
    - split_left: Grid bg + speaker left ~20%, slide right ~80% (3:4 portrait, glass border)
    - jump_zoom_in: Animated 0.25s zoom punch on speaker (15-25%)
    - jump_zoom_out: Animated 0.25s zoom back to normal
    - gradual_zoom: Slow drift zoom over entire speaker segment (10-15%)

Usage:
    from editor import render_video

    edits = [
        {"type": "speaker_full", "start": 0, "end": 5},
        {"type": "split_right", "start": 5, "end": 15, "content": "slide.jpg"},
        {"type": "jump_zoom_in", "start": 15, "end": 16, "zoom": 1.2},
        ...
    ]

    render_video("speaker.mp4", edits, "output.mp4")
"""

from moviepy import (
    VideoFileClip, ImageClip, CompositeVideoClip,
    concatenate_videoclips
)
import os
from typing import List, Dict, Any, Literal

# Default settings
DEFAULT_RESOLUTION = (1920, 1080)
DEFAULT_FPS = 30

# Split layout settings - speaker takes ~20% width, 3:4 aspect ratio
SPLIT_SPEAKER_WIDTH_RATIO = 0.18  # ~20% of screen width for speaker
SPLIT_SPEAKER_ASPECT = 3/4  # 3:4 portrait ratio


def create_speaker_full(
    speaker: VideoFileClip,
    start: float,
    end: float
) -> VideoFileClip:
    """Speaker fills entire frame."""
    clip = speaker.subclipped(start, end)
    return clip.resized(DEFAULT_RESOLUTION)


def create_slide_full(
    speaker: VideoFileClip,
    start: float,
    end: float,
    content: str
) -> VideoFileClip:
    """Slide fills entire frame, speaker audio continues."""
    duration = end - start
    audio = speaker.subclipped(start, end).audio

    if content.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
        content_clip = ImageClip(content).with_duration(duration)
    else:
        content_clip = VideoFileClip(content).subclipped(0, duration)

    content_clip = content_clip.resized(DEFAULT_RESOLUTION)
    content_clip = content_clip.with_audio(audio)
    return content_clip


def add_rounded_border(img, radius: int, border_width: int, border_color=(140, 160, 180, 220)):
    """
    Add a rounded rectangle border AROUND an image.
    The border is OUTSIDE the content - content is clipped to fit inside.

    Total output size = img size
    Content area = img size - border_width*2 on each side
    """
    import numpy as np
    from PIL import Image, ImageDraw

    w, h = img.size

    # Ensure RGBA
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # The content area is INSIDE the border
    content_w = w - border_width * 2
    content_h = h - border_width * 2
    inner_radius = max(0, radius - border_width)

    # Resize image to fit content area
    img_resized = img.resize((content_w, content_h), Image.LANCZOS)

    # Create mask for inner rounded rectangle (where content goes)
    inner_mask = Image.new('L', (content_w, content_h), 0)
    inner_draw = ImageDraw.Draw(inner_mask)
    inner_draw.rounded_rectangle([(0, 0), (content_w-1, content_h-1)], radius=inner_radius, fill=255)

    # Apply mask to content
    content_masked = Image.new('RGBA', (content_w, content_h), (0, 0, 0, 0))
    content_masked.paste(img_resized, (0, 0))
    content_masked.putalpha(inner_mask)

    # Create output canvas
    output = Image.new('RGBA', (w, h), (0, 0, 0, 0))

    # Place masked content inside border area
    output.paste(content_masked, (border_width, border_width), content_masked)

    # Draw border stroke around the outer edge
    border_draw = ImageDraw.Draw(output)
    border_draw.rounded_rectangle(
        [(border_width//2, border_width//2), (w - border_width//2 - 1, h - border_width//2 - 1)],
        radius=radius - border_width//2,
        outline=border_color,
        width=border_width
    )

    return output


# Asset paths
ASSETS_DIR = os.path.join(os.path.dirname(__file__), "assets")
GRID_VIDEO = os.path.join(ASSETS_DIR, "grid-loop.mp4")
GRID_IMAGE = os.path.join(ASSETS_DIR, "grid.png")


def create_split(
    speaker: VideoFileClip,
    start: float,
    end: float,
    content: str,
    side: Literal["left", "right"] = "right"
) -> CompositeVideoClip:
    """
    Split layout: slide on one side, speaker on other with grid video background.
    Both slide and speaker have same height with rounded borders.
    """
    import numpy as np
    from PIL import Image, ImageDraw

    clip = speaker.subclipped(start, end)
    duration = end - start

    # Layout constants
    padding = 30
    gap = 20  # Gap between slide and speaker
    border_width = 8
    corner_radius = 24  # Rounded corner radius
    speaker_width_ratio = 0.20  # Speaker takes ~20% of width

    # Both slide and speaker have SAME height
    content_height = DEFAULT_RESOLUTION[1] - padding * 2
    speaker_width = int((DEFAULT_RESOLUTION[0] - padding * 2 - gap) * speaker_width_ratio)
    speaker_height = content_height  # Same as slide

    slide_width = DEFAULT_RESOLUTION[0] - speaker_width - padding * 2 - gap
    slide_height = content_height

    # Load background video
    if os.path.exists(GRID_VIDEO):
        bg_clip = VideoFileClip(GRID_VIDEO).resized(DEFAULT_RESOLUTION)
        # Loop the background to match duration
        if bg_clip.duration < duration:
            loops_needed = int(duration / bg_clip.duration) + 1
            bg_clip = bg_clip.with_effects([lambda c: concatenate_videoclips([c] * loops_needed)])
        bg_clip = bg_clip.subclipped(0, duration)
    else:
        # Fallback to static image
        bg_img = Image.open(GRID_IMAGE).convert('RGB')
        bg_img = bg_img.resize(DEFAULT_RESOLUTION, Image.LANCZOS)
        bg_clip = ImageClip(np.array(bg_img)).with_duration(duration)

    # Load and process slide
    if content.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
        slide_img = Image.open(content).convert('RGBA')

        # Calculate slide dimensions maintaining aspect ratio
        img_ratio = slide_img.width / slide_img.height
        target_ratio = slide_width / slide_height

        if img_ratio > target_ratio:
            new_w = slide_width
            new_h = int(slide_width / img_ratio)
        else:
            new_h = slide_height
            new_w = int(slide_height * img_ratio)

        # Resize and add squircle border
        slide_img = slide_img.resize((new_w, new_h), Image.LANCZOS)
        slide_with_border = add_rounded_border(slide_img, corner_radius, border_width)
        slide_clip = ImageClip(np.array(slide_with_border)).with_duration(duration)
    else:
        # Video content - no border for now
        slide_clip = VideoFileClip(content).subclipped(0, duration)
        slide_clip = slide_clip.resized(height=slide_height)
        if slide_clip.w > slide_width:
            slide_clip = slide_clip.resized(width=slide_width)
        new_w, new_h = slide_clip.w, slide_clip.h

    # Position slide
    if side == "right":
        slide_x = padding
    else:
        slide_x = padding + speaker_width + gap

    slide_y = padding + (slide_height - new_h) // 2

    # Process speaker - crop to fit inside border area
    # Content area is smaller to leave room for border
    content_w = speaker_width - border_width * 2
    content_h = speaker_height - border_width * 2
    inner_radius = max(0, corner_radius - border_width)

    speaker_scaled = clip.resized(height=content_h)
    if speaker_scaled.w > content_w:
        crop_x = (speaker_scaled.w - content_w) // 2
        speaker_cropped = speaker_scaled.cropped(x1=crop_x, x2=crop_x + content_w)
    else:
        speaker_cropped = speaker_scaled.resized(width=content_w)

    # Create rounded rectangle mask for the content
    mask_img = Image.new('L', (content_w, content_h), 0)
    mask_draw = ImageDraw.Draw(mask_img)
    mask_draw.rounded_rectangle([(0, 0), (content_w-1, content_h-1)], radius=inner_radius, fill=255)
    mask_array = np.array(mask_img) / 255.0
    mask_clip = ImageClip(mask_array, is_mask=True).with_duration(duration)

    # Apply mask to speaker
    speaker_masked = speaker_cropped.with_mask(mask_clip)

    # Create border overlay (static image)
    border_img = Image.new('RGBA', (speaker_width, speaker_height), (0, 0, 0, 0))
    border_draw = ImageDraw.Draw(border_img)
    # Draw the border stroke
    border_draw.rounded_rectangle(
        [(border_width//2, border_width//2),
         (speaker_width - border_width//2 - 1, speaker_height - border_width//2 - 1)],
        radius=corner_radius - border_width//2,
        outline=(140, 160, 180, 220),
        width=border_width
    )
    border_clip = ImageClip(np.array(border_img)).with_duration(duration)

    # Composite: speaker (with mask) + border overlay
    speaker_bordered = CompositeVideoClip([
        speaker_masked.with_position((border_width, border_width)),
        border_clip
    ], size=(speaker_width, speaker_height)).with_duration(duration)

    # Position speaker
    if side == "right":
        speaker_x = DEFAULT_RESOLUTION[0] - speaker_width - padding
    else:
        speaker_x = padding

    speaker_y = padding  # Full height, aligned to top

    return CompositeVideoClip([
        bg_clip,
        slide_clip.with_position((slide_x, slide_y)),
        speaker_bordered.with_position((speaker_x, speaker_y))
    ], size=DEFAULT_RESOLUTION).with_duration(duration)


def create_split_right(
    speaker: VideoFileClip,
    start: float,
    end: float,
    content: str
) -> CompositeVideoClip:
    """Slide on left ~80%, speaker on right ~20%."""
    return create_split(speaker, start, end, content, side="right")


def create_split_left(
    speaker: VideoFileClip,
    start: float,
    end: float,
    content: str
) -> CompositeVideoClip:
    """Speaker on left ~20%, slide on right ~80%."""
    return create_split(speaker, start, end, content, side="left")


def create_jump_zoom_in(
    speaker: VideoFileClip,
    start: float,
    end: float,
    zoom: float = 1.20
) -> VideoFileClip:
    """
    Animated zoom punch on speaker.
    Quick 0.25s animation into zoom, then holds.
    Use 15-25% zoom (1.15 to 1.25) for clear impact.
    """
    clip = speaker.subclipped(start, end)
    anim_duration = 0.25  # Quick punch animation

    def zoom_frame(get_frame, t):
        import numpy as np
        from PIL import Image

        frame = get_frame(t)

        # Animate zoom over first 0.25s, then hold
        if t < anim_duration:
            progress = t / anim_duration
            # Ease out for snappy feel
            progress = 1 - (1 - progress) ** 2
            current_zoom = 1.0 + (zoom - 1.0) * progress
        else:
            current_zoom = zoom

        h, w = frame.shape[:2]
        new_h, new_w = int(h * current_zoom), int(w * current_zoom)

        # Resize frame
        img = Image.fromarray(frame)
        img = img.resize((new_w, new_h), Image.LANCZOS)
        frame = np.array(img)

        # Center crop back to original size
        crop_y = (new_h - h) // 2
        crop_x = (new_w - w) // 2
        frame = frame[crop_y:crop_y+h, crop_x:crop_x+w]

        return frame

    clip = clip.transform(zoom_frame)
    clip = clip.resized(DEFAULT_RESOLUTION)
    return clip


def create_jump_zoom_out(
    speaker: VideoFileClip,
    start: float,
    end: float,
    zoom_from: float = 1.20
) -> VideoFileClip:
    """
    Animated zoom out from punch back to normal.
    Quick 0.25s animation out.
    """
    clip = speaker.subclipped(start, end)
    anim_duration = 0.25

    def zoom_frame(get_frame, t):
        import numpy as np
        from PIL import Image

        frame = get_frame(t)

        # Animate zoom out over first 0.25s
        if t < anim_duration:
            progress = t / anim_duration
            # Ease out
            progress = 1 - (1 - progress) ** 2
            current_zoom = zoom_from - (zoom_from - 1.0) * progress
        else:
            current_zoom = 1.0

        if current_zoom <= 1.0:
            return frame

        h, w = frame.shape[:2]
        new_h, new_w = int(h * current_zoom), int(w * current_zoom)

        img = Image.fromarray(frame)
        img = img.resize((new_w, new_h), Image.LANCZOS)
        frame = np.array(img)

        crop_y = (new_h - h) // 2
        crop_x = (new_w - w) // 2
        frame = frame[crop_y:crop_y+h, crop_x:crop_x+w]

        return frame

    clip = clip.transform(zoom_frame)
    clip = clip.resized(DEFAULT_RESOLUTION)
    return clip


def create_gradual_zoom(
    speaker: VideoFileClip,
    start: float,
    end: float,
    zoom_start: float = 1.0,
    zoom_end: float = 1.12,
    direction: Literal["in", "out"] = "in"
) -> VideoFileClip:
    """
    Slow drift zoom over entire speaker segment.
    Use 10-15% zoom (1.10 to 1.15) for subtle movement.
    """
    clip = speaker.subclipped(start, end)
    duration = end - start

    if direction == "out":
        zoom_start, zoom_end = zoom_end, zoom_start

    def get_zoom(t):
        progress = t / duration if duration > 0 else 0
        return zoom_start + (zoom_end - zoom_start) * progress

    # Apply gradual zoom
    def make_frame(get_frame):
        def new_frame(t):
            import numpy as np
            from PIL import Image

            frame = get_frame(t)
            z = get_zoom(t)

            h, w = frame.shape[:2]
            new_h, new_w = int(h * z), int(w * z)

            # Resize frame
            img = Image.fromarray(frame)
            img = img.resize((new_w, new_h), Image.LANCZOS)
            frame = np.array(img)

            # Center crop back to original size
            crop_y = (new_h - h) // 2
            crop_x = (new_w - w) // 2
            frame = frame[crop_y:crop_y+h, crop_x:crop_x+w]

            return frame
        return new_frame

    clip = clip.transform(make_frame)
    clip = clip.resized(DEFAULT_RESOLUTION)
    return clip


# Legacy support
def create_full_frame(speaker: VideoFileClip, start: float, end: float) -> VideoFileClip:
    """Legacy: Full frame talking head."""
    return create_speaker_full(speaker, start, end)


def create_full_content(
    speaker: VideoFileClip,
    start: float,
    end: float,
    content: str
) -> VideoFileClip:
    """Legacy: Full frame content."""
    return create_slide_full(speaker, start, end, content)


def create_punch_zoom(
    speaker: VideoFileClip,
    start: float,
    end: float,
    zoom: float = 1.2,
    animate: bool = False
) -> VideoFileClip:
    """Legacy: Punch zoom (now defaults to instant jump zoom)."""
    if animate:
        return create_gradual_zoom(speaker, start, end, zoom_end=zoom)
    return create_jump_zoom_in(speaker, start, end, zoom)


# Primitive registry
PRIMITIVES = {
    # New layouts
    "speaker_full": create_speaker_full,
    "slide_full": create_slide_full,
    "split_right": create_split_right,
    "split_left": create_split_left,
    "jump_zoom_in": create_jump_zoom_in,
    "jump_zoom_out": create_jump_zoom_out,
    "gradual_zoom": create_gradual_zoom,
    # Legacy support
    "full": create_full_frame,
    "full_content": create_full_content,
    "punch_zoom": create_punch_zoom,
    "split": create_split_right,  # Default pip to right side
}


def render_video(
    speaker_path: str,
    edits: List[Dict[str, Any]],
    output_path: str,
    fps: int = DEFAULT_FPS,
    verbose: bool = True
) -> str:
    """
    Render final video from speaker footage and edit timeline.
    """
    if verbose:
        print(f"Loading speaker video: {speaker_path}")

    speaker = VideoFileClip(speaker_path)
    clips = []

    for i, edit in enumerate(edits):
        edit_type = edit["type"]
        start = edit["start"]
        end = edit["end"]

        # Skip zero-duration edits
        if end <= start:
            if verbose:
                print(f"Skipping edit {i+1}: zero duration")
            continue

        if verbose:
            print(f"Processing edit {i+1}/{len(edits)}: {edit_type} ({start:.1f}s - {end:.1f}s)")

        if edit_type not in PRIMITIVES:
            raise ValueError(f"Unknown edit type: {edit_type}")

        kwargs = {k: v for k, v in edit.items() if k not in ["type", "start", "end"]}

        clip = PRIMITIVES[edit_type](speaker, start, end, **kwargs)
        clips.append(clip)

    if verbose:
        print("Concatenating clips...")

    final = concatenate_videoclips(clips, method="compose")

    if verbose:
        print(f"Rendering to {output_path}...")

    final.write_videofile(
        output_path,
        fps=fps,
        codec="libx264",
        audio_codec="aac",
        logger="bar" if verbose else None
    )

    speaker.close()
    final.close()

    if verbose:
        print(f"Done! Output: {output_path}")

    return output_path


if __name__ == "__main__":
    import sys
    import json

    if len(sys.argv) < 3:
        print("Usage: python editor.py <speaker.mp4> <output.mp4>")
        print("Edit timeline should be in timeline.json")
        sys.exit(1)

    speaker = sys.argv[1]
    output = sys.argv[2]

    with open("timeline.json") as f:
        edits = json.load(f)

    render_video(speaker, edits, output)
