import React from "react";
import { Audio } from "remotion";

/**
 * Drop-in replacement for Remotion's <Audio> with delayRenderRetries={3}.
 * Prevents render crashes when the bundle server is slow to serve audio files.
 */
export const SafeAudio: React.FC<React.ComponentProps<typeof Audio>> = (props) => {
  return <Audio delayRenderRetries={3} {...props} />;
};
