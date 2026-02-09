export type LayoutType =
  | "speaker_full"
  | "slide_full"
  | "split_right"
  | "split_left"
  | "split_5050_left"
  | "split_5050_right"
  | "jump_zoom_in"
  | "jump_zoom_out"
  | "jump_cut_in"
  | "jump_cut_out"
  | "zoom_transition_in"
  | "zoom_transition_out"
  | "gradual_zoom"
  | "gif_overlay"
  | "gif_full"
  | "broll_full"
  | "text_overlay"
  | "sfx";

export interface BaseEdit {
  type: LayoutType;
  start: number; // seconds
  end: number; // seconds
}

export interface SpeakerFullEdit extends BaseEdit {
  type: "speaker_full";
}

export interface SlideFullEdit extends BaseEdit {
  type: "slide_full";
  content: string; // path to slide image
}

export interface SplitEdit extends BaseEdit {
  type: "split_right" | "split_left";
  content: string; // path to slide image
}

// 50/50 full-bleed split (no padding, no borders, edge-to-edge)
export interface Split5050Edit extends BaseEdit {
  type: "split_5050_left" | "split_5050_right";
  content: string; // path to slide image (generate at 1:1 aspect ratio)
}

// Animated zoom (duration from segment length)
export interface JumpZoomInEdit extends BaseEdit {
  type: "jump_zoom_in";
  zoom?: number; // default 1.2
}

export interface JumpZoomOutEdit extends BaseEdit {
  type: "jump_zoom_out";
  zoom?: number; // default 1.2
}

// Instant zoom cut (no animation)
export interface JumpCutInEdit extends BaseEdit {
  type: "jump_cut_in";
  zoom?: number; // default 1.2
}

export interface JumpCutOutEdit extends BaseEdit {
  type: "jump_cut_out";
}

// Zoom transition (any layout → any layout with continuous zoom)
// fromLayout/toLayout: "speaker_full" | "slide_full" | "split_right" | "split_left"
export interface ZoomTransitionInEdit extends BaseEdit {
  type: "zoom_transition_in";
  content: string; // slide image
  zoom?: number; // default 1.15 - MUST match previous segment's zoom level
  fromLayout?: "slide_full" | "split_right" | "split_left" | "split_5050_left" | "split_5050_right" | "broll_full"; // default: slide_full
  toLayout?: "speaker_full"; // zoom_in always goes to speaker
}

export interface ZoomTransitionOutEdit extends BaseEdit {
  type: "zoom_transition_out";
  content: string; // slide image
  zoom?: number; // default 1.15 - MUST match previous segment's zoom level
  fromLayout?: "speaker_full" | "split_right" | "split_left" | "split_5050_left" | "split_5050_right"; // default: speaker_full
  toLayout?: "slide_full" | "split_right" | "split_left" | "split_5050_left" | "split_5050_right" | "broll_full"; // default: slide_full
}

export interface GradualZoomEdit extends BaseEdit {
  type: "gradual_zoom";
  zoomStart?: number;
  zoomEnd?: number;
  direction?: "in" | "out";
}

// GIF overlay on top of speaker video (reaction meme style)
export type GifPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "center";

export interface GifOverlayEdit extends BaseEdit {
  type: "gif_overlay";
  content: string; // path to GIF file
  position?: GifPosition; // default: "bottom-right"
  size?: number; // fraction of frame width, default 0.3
}

// Full-screen GIF moment (replaces speaker)
export interface GifFullEdit extends BaseEdit {
  type: "gif_full";
  content: string; // path to GIF file
}

// Full-screen B-roll video (replaces speaker visual, speaker audio continues)
export interface BrollFullEdit extends BaseEdit {
  type: "broll_full";
  content: string; // path to b-roll video file
}

// Text overlay on top of speaker video
// 3 styles: "caption" (bottom), "center" (big center), "heading" (top area)
export type TextStyle = "caption" | "center" | "heading";

export interface TextOverlayEdit extends BaseEdit {
  type: "text_overlay";
  text: string; // 1-3 words max
  style?: TextStyle; // default: "caption"
  color?: string; // default: "#ffffff"
  glow?: boolean; // default: true
}

// Sound effect (audio-only overlay, no visual - plays on top of current layout)
export interface SfxEdit extends BaseEdit {
  type: "sfx";
  content: string; // sfx name: "boop" or "click"
  volume?: number; // 0-1, default 0.5
}

export type Edit =
  | SpeakerFullEdit
  | SlideFullEdit
  | SplitEdit
  | Split5050Edit
  | JumpZoomInEdit
  | JumpZoomOutEdit
  | JumpCutInEdit
  | JumpCutOutEdit
  | ZoomTransitionInEdit
  | ZoomTransitionOutEdit
  | GradualZoomEdit
  | GifOverlayEdit
  | GifFullEdit
  | BrollFullEdit
  | TextOverlayEdit
  | SfxEdit;

export interface BgMusicConfig {
  src: string; // path relative to public/, e.g. "sfx/lofi-beat-bg.mp3"
  startVolume?: number; // volume at start, default 0.16 (16%)
  mainVolume?: number; // volume after fade, default 0.08 (8%)
  fadeDuration?: number; // seconds to fade from startVolume to mainVolume, default 10
}

export interface VideoConfig {
  speakerVideo: string;
  gridBackground: string;
  timeline: Edit[];
  fps: number;
  width: number;
  height: number;
  bgMusic?: BgMusicConfig;
}
