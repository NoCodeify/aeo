import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";

interface JumpZoomProps {
  speakerSrc: string;
  startFrom: number;
  zoom: number;
  direction: "in" | "out";
}

export const JumpZoom: React.FC<JumpZoomProps> = ({
  speakerSrc,
  startFrom,
  zoom,
  direction,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation uses full segment duration (set via timeline start/end)
  const animFrames = durationInFrames;

  let currentZoom: number;

  if (direction === "in") {
    // Animate from 1.0 to zoom, then hold
    currentZoom = interpolate(
      frame,
      [0, animFrames],
      [1.0, zoom],
      {
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.quad), // slow → fast → slow
      }
    );
  } else {
    // Animate from zoom to 1.0, then hold
    currentZoom = interpolate(
      frame,
      [0, animFrames],
      [zoom, 1.0],
      {
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.quad), // slow → fast → slow
      }
    );
  }

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <OffthreadVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom}
          pauseWhenBuffering
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${currentZoom})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
