import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { proxyVideo } from "../use-proxy";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { TextStyle } from "../types/timeline";
import { glowShadow } from "./premium-utils";

loadSyne("normal", { weights: ["700", "800"], subsets: ["latin"] });

interface TextRevealWipeProps {
  speakerSrc?: string;
  startFrom?: number;
  text: string;
  direction?: "left" | "right" | "top" | "bottom";
  style?: TextStyle;
  color?: string;
}

function getClipPath(direction: string, progress: number): string {
  const p = Math.min(progress, 1) * 100;
  switch (direction) {
    case "left":
      return `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
    case "right":
      return `polygon(${100 - p}% 0, 100% 0, 100% 100%, ${100 - p}% 100%)`;
    case "top":
      return `polygon(0 0, 100% 0, 100% ${p}%, 0 ${p}%)`;
    case "bottom":
      return `polygon(0 ${100 - p}%, 100% ${100 - p}%, 100% 100%, 0 100%)`;
    default:
      return `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
  }
}

function getTextPosition(style: TextStyle): React.CSSProperties {
  switch (style) {
    case "caption":
      return {
        bottom: 240,
        left: 0,
        right: 0,
        justifyContent: "center",
      };
    case "center":
      return {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
      };
    case "heading":
      return {
        top: 200,
        left: 0,
        right: 0,
        justifyContent: "center",
      };
    default:
      return {
        bottom: 240,
        left: 0,
        right: 0,
        justifyContent: "center",
      };
  }
}

function getFontSize(style: TextStyle): number {
  switch (style) {
    case "caption":
      return 128;
    case "center":
      return 240;
    case "heading":
      return 160;
    default:
      return 128;
  }
}

export const TextRevealWipe: React.FC<TextRevealWipeProps> = ({
  speakerSrc,
  startFrom,
  text,
  direction = "left",
  style = "caption",
  color = "#e8e4e0",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Wipe reveal over 15 frames
  const wipeProgress = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const revealComplete = frame >= 15;

  // Fade out over last 6 frames
  const exitOp = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const clipPath = getClipPath(direction, wipeProgress);
  const positionStyles = getTextPosition(style);
  const fontSize = getFontSize(style);

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(proxyVideo(speakerSrc))}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Text with clip-path wipe */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          ...positionStyles,
          opacity: exitOp,
        }}
      >
        <div
          style={{
            fontFamily: syneFontFamily,
            fontSize,
            fontWeight: style === "center" ? 800 : 700,
            color,
            textTransform: "uppercase" as const,
            letterSpacing: style === "center" ? 16 : 8,
            clipPath,
            textShadow: revealComplete
              ? glowShadow(color, "medium")
              : "0 4px 12px rgba(0,0,0,0.8)",
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
