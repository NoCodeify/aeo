export type LayoutType =
  | "speaker_full"
  | "slide_full"
  | "split_right"
  | "split_left"
  | "jump_zoom_in"
  | "jump_zoom_out"
  | "jump_cut_in"
  | "jump_cut_out"
  | "zoom_transition_in"
  | "zoom_transition_out"
  | "gradual_zoom";

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
  fromLayout?: "slide_full" | "split_right" | "split_left"; // default: slide_full
  toLayout?: "speaker_full"; // zoom_in always goes to speaker
}

export interface ZoomTransitionOutEdit extends BaseEdit {
  type: "zoom_transition_out";
  content: string; // slide image
  zoom?: number; // default 1.15 - MUST match previous segment's zoom level
  fromLayout?: "speaker_full" | "split_right" | "split_left"; // default: speaker_full
  toLayout?: "slide_full" | "split_right" | "split_left"; // default: slide_full
}

export interface GradualZoomEdit extends BaseEdit {
  type: "gradual_zoom";
  zoomStart?: number;
  zoomEnd?: number;
  direction?: "in" | "out";
}

export type Edit =
  | SpeakerFullEdit
  | SlideFullEdit
  | SplitEdit
  | JumpZoomInEdit
  | JumpZoomOutEdit
  | JumpCutInEdit
  | JumpCutOutEdit
  | ZoomTransitionInEdit
  | ZoomTransitionOutEdit
  | GradualZoomEdit;

export interface VideoConfig {
  speakerVideo: string;
  gridBackground: string;
  timeline: Edit[];
  fps: number;
  width: number;
  height: number;
}
