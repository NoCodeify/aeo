import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  staticFile,
  useCurrentFrame,
} from "remotion";
import { proxyVideo } from "../use-proxy";
import { drawProgress, popScale, hexToRgba } from "./premium-utils";

interface CheckXMarkProps {
  speakerSrc?: string;
  startFrom?: number;
  markType?: "check" | "x";
  color?: string;
  size?: number;
  position?: "center" | "top-right" | "top-left";
}

function getPositionStyles(position: string): React.CSSProperties {
  switch (position) {
    case "top-right":
      return {
        top: 120,
        right: 120,
        left: "auto",
        bottom: "auto",
      };
    case "top-left":
      return {
        top: 120,
        left: 120,
        right: "auto",
        bottom: "auto",
      };
    case "center":
    default:
      return {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
  }
}

/**
 * SVG check or X mark overlay on speaker video.
 * Stroke draws in over 12 frames with pop scale and glow.
 */
export const CheckXMark: React.FC<CheckXMarkProps> = ({
  speakerSrc,
  startFrom = 0,
  markType = "check",
  color,
  size = 400,
  position = "center",
}) => {
  const frame = useCurrentFrame();

  const effectiveColor = color ?? (markType === "check" ? "#22c55e" : "#ef4444");

  const progress = drawProgress(frame, 0, 12);
  const scale = popScale(frame, 0, 1.1);
  const glowFilter = `drop-shadow(0 0 20px ${hexToRgba(effectiveColor, 0.4)}) drop-shadow(0 0 60px ${hexToRgba(effectiveColor, 0.2)})`;

  // Check path: M 25,50 L 45,70 L 75,30
  // X path: M 25,25 L 75,75 M 75,25 L 25,75
  const checkPath = "M 25,50 L 45,70 L 75,30";
  const xPath = "M 25,25 L 75,75 M 75,25 L 25,75";
  const svgPath = markType === "check" ? checkPath : xPath;

  // Approximate path lengths for stroke-dasharray
  const checkLength = 100;
  const xLength = 142; // two diagonal strokes ~71 each
  const pathLength = markType === "check" ? checkLength : xLength;

  const dashOffset = pathLength * (1 - progress);

  const positionStyles = getPositionStyles(position);

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(proxyVideo(speakerSrc))}
          startFrom={startFrom}
          pauseWhenBuffering
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Check/X mark overlay */}
      <div
        style={{
          position: "absolute",
          ...positionStyles,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{
            transform: `scale(${scale})`,
            filter: glowFilter,
          }}
        >
          <path
            d={svgPath}
            fill="none"
            stroke={effectiveColor}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
            pathLength={pathLength}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
