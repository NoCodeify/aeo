import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from "remotion";
import { SmartVideo } from "../use-proxy";

interface GifFullProps {
  gifSrc: string;
  speakerSrc: string; // for audio only
  startFrom: number;
}

export const GifFull: React.FC<GifFullProps> = ({
  gifSrc,
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
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* GIF as MP4 centered */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity,
        }}
      >
        <SmartVideo
          src={staticFile(gifSrc)}
          pauseWhenBuffering
          loop
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          muted
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
