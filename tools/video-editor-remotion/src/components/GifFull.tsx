import React from "react";
import { AbsoluteFill, OffthreadVideo, Loop, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

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
  const { durationInFrames } = useVideoConfig();

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
        <Loop durationInFrames={durationInFrames}>
          <OffthreadVideo
            src={staticFile(gifSrc)}
            pauseWhenBuffering
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            muted
          />
        </Loop>
      </AbsoluteFill>

      {/* Audio from speaker video (hidden) */}
      <OffthreadVideo
        src={staticFile(speakerSrc)}
        startFrom={startFrom}
        pauseWhenBuffering
        style={{ display: "none" }}
      />
    </AbsoluteFill>
  );
};
