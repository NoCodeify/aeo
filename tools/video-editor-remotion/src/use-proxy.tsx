import React, { useContext } from "react";
import {
  getRemotionEnvironment,
  Video,
  OffthreadVideo,
} from "remotion";

const PROXY_FILES = new Set(["speaker.mp4", "grid-loop.mp4"]);

export function proxyVideo(filename: string): string {
  const env = getRemotionEnvironment();

  if (env.isRendering || !PROXY_FILES.has(filename)) {
    return filename;
  }

  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) return filename;

  return `${filename.substring(0, dotIndex)}-proxy${filename.substring(dotIndex)}`;
}

// --- Continuous speaker mode (Studio performance) ---
// When active, per-segment speaker videos are skipped; one base video handles all.

/** Whether MainVideo's continuous base layer is active (Studio only). */
export const ContinuousSpeakerContext = React.createContext(false);

/** The current edit type, set per-Sequence so SmartVideo knows what layout it's in. */
export const EditTypeContext = React.createContext<string | null>(null);

/** DataVizSplit sets this to force-keep its positioned speaker video. */
export const ForceVideoContext = React.createContext(false);

// Edit types that KEEP their own per-segment video (need special speaker positioning)
const KEEP_OWN_VIDEO = new Set([
  "split_right",
  "split_left",
  "split_5050_left",
  "split_5050_right",
  "zoom_transition_in",
  "zoom_transition_out",
  "freeze_frame",
  "glitch",
  "screen_shake",
]);

/**
 * SmartVideo: Drop-in replacement for OffthreadVideo.
 *
 * - Rendering: uses OffthreadVideo (frame-accurate)
 * - Studio: uses native <Video> (hardware-accelerated)
 * - Studio + continuous mode: skips per-segment speaker videos entirely
 *   (the base continuous video handles audio + visual), except for
 *   split/special types that need their own positioned video (rendered muted).
 */
export const SmartVideo: React.FC<React.ComponentProps<typeof OffthreadVideo>> = (props) => {
  const env = getRemotionEnvironment();
  const continuousMode = useContext(ContinuousSpeakerContext);
  const editType = useContext(EditTypeContext);
  const forceKeep = useContext(ForceVideoContext);

  // Continuous mode: skip per-segment speaker videos (base layer handles them)
  if (continuousMode && props.startFrom !== undefined && !forceKeep) {
    if (!editType || !KEEP_OWN_VIDEO.has(editType)) {
      return null; // Base continuous video handles audio + visual
    }
    // Split/special types: render for visual positioning, muted (base handles audio)
    if (env.isRendering) {
      return <OffthreadVideo {...props} muted />;
    }
    const { pauseWhenBuffering, ...rest } = props as any;
    return <Video {...rest} pauseWhenBuffering={pauseWhenBuffering} muted />;
  }

  // Rendering: frame-accurate OffthreadVideo
  if (env.isRendering) {
    return <OffthreadVideo {...props} />;
  }

  // Studio (non-continuous or no startFrom): native Video
  const { pauseWhenBuffering, ...videoProps } = props as any;
  return <Video {...videoProps} pauseWhenBuffering={pauseWhenBuffering} />;
};
