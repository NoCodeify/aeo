import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from "remotion";
import { SmartVideo } from "../use-proxy";

interface BrollFullProps {
  brollSrc: string;
  speakerSrc: string; // for audio only
  startFrom: number;
}

export const BrollFull: React.FC<BrollFullProps> = ({
  brollSrc,
  speakerSrc,
  startFrom,
}) => {
  const frame = useCurrentFrame();

  // Quick fade in (6 frames = ~0.2s)
  const opacity = interpolate(
    frame,
    [0, 6],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill>
      {/* B-roll video - full screen, no loop */}
      <AbsoluteFill style={{ opacity }}>
        <SmartVideo
          src={staticFile(brollSrc)}
          pauseWhenBuffering
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* Audio from speaker video (hidden) */}
      <SmartVideo
        src={staticFile(speakerSrc)}
        startFrom={startFrom}
        pauseWhenBuffering
        style={{ display: "none" }}
      />
    </AbsoluteFill>
  );
};
