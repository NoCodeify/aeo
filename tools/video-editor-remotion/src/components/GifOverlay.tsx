import React from "react";
import { AbsoluteFill, OffthreadVideo, Loop, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { GifPosition } from "../types/timeline";

interface GifOverlayProps {
  speakerSrc: string;
  gifSrc: string;
  startFrom: number;
  position?: GifPosition;
  size?: number; // fraction of frame width (0.3 = 30%)
}

const PADDING = 48;

function getPositionStyle(
  position: GifPosition,
  gifWidth: number,
  gifHeight: number
): React.CSSProperties {
  switch (position) {
    case "bottom-right":
      return { bottom: PADDING, right: PADDING };
    case "bottom-left":
      return { bottom: PADDING, left: PADDING };
    case "top-right":
      return { top: PADDING, right: PADDING };
    case "top-left":
      return { top: PADDING, left: PADDING };
    case "center":
      return {
        top: "50%",
        left: "50%",
        marginTop: -gifHeight / 2,
        marginLeft: -gifWidth / 2,
      };
    default:
      return { bottom: PADDING, right: PADDING };
  }
}

export const GifOverlay: React.FC<GifOverlayProps> = ({
  speakerSrc,
  gifSrc,
  startFrom,
  position = "bottom-right",
  size = 0.3,
}) => {
  const frame = useCurrentFrame();
  const { width, durationInFrames } = useVideoConfig();

  const gifWidth = Math.floor(width * size);
  const gifHeight = gifWidth;

  // Entrance animation: scale bounce (first 8 frames = ~0.27s)
  const entranceFrames = 8;
  const scale = interpolate(
    frame,
    [0, Math.floor(entranceFrames * 0.6), entranceFrames],
    [0, 1.1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Exit animation: fade out (last 6 frames = ~0.2s)
  const exitStart = durationInFrames - 6;
  const opacity = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const posStyle = getPositionStyle(position, gifWidth, gifHeight);

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      <OffthreadVideo
        src={staticFile(speakerSrc)}
        startFrom={startFrom}
        pauseWhenBuffering
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* GIF as MP4 overlay */}
      <div
        style={{
          position: "absolute",
          width: gifWidth,
          height: gifHeight,
          transform: `scale(${scale})`,
          opacity,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          ...posStyle,
        }}
      >
        <Loop durationInFrames={durationInFrames}>
          <OffthreadVideo
            src={staticFile(gifSrc)}
            pauseWhenBuffering
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
          />
        </Loop>
      </div>
    </AbsoluteFill>
  );
};
