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

interface GradualZoomProps {
  speakerSrc: string;
  startFrom: number;
  zoomStart: number;
  zoomEnd: number;
}

// Gradual zoom - slow drift over entire segment
export const GradualZoom: React.FC<GradualZoomProps> = ({
  speakerSrc,
  startFrom,
  zoomStart,
  zoomEnd,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Linear interpolation over entire segment
  const currentZoom = interpolate(
    frame,
    [0, durationInFrames],
    [zoomStart, zoomEnd],
    {
      easing: Easing.inOut(Easing.quad), // smooth start and end
    }
  );

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
