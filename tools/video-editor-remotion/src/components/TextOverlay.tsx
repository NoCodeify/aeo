import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { TextStyle } from "../types/timeline";

// Load font
loadSyne("normal", { weights: ["700", "800"], subsets: ["latin"] });

interface TextOverlayProps {
  speakerSrc?: string;  // unused, kept for API compat
  startFrom?: number;   // unused, kept for API compat
  text: string;
  style?: TextStyle;
  color?: string;
  glow?: boolean;
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

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getTextStyles(style: TextStyle, color: string, glow: boolean): React.CSSProperties {
  const glowFilter = glow
    ? `0 0 40px ${hexToRgba(color, 0.25)}, 0 0 80px ${hexToRgba(color, 0.15)}, 0 4px 12px rgba(0, 0, 0, 0.8)`
    : "0 4px 12px rgba(0, 0, 0, 0.8)";

  switch (style) {
    case "caption":
      return {
        fontFamily: syneFontFamily,
        fontSize: 128,
        fontWeight: 700,
        color,
        textTransform: "uppercase" as const,
        letterSpacing: 8,
        textShadow: glowFilter,
      };
    case "center":
      return {
        fontFamily: syneFontFamily,
        fontSize: 240,
        fontWeight: 800,
        color,
        textTransform: "uppercase" as const,
        letterSpacing: 16,
        textShadow: glowFilter,
      };
    case "heading":
      return {
        fontFamily: syneFontFamily,
        fontSize: 160,
        fontWeight: 700,
        color,
        letterSpacing: 8,
        textShadow: glowFilter,
      };
    default:
      return {
        fontFamily: syneFontFamily,
        fontSize: 128,
        fontWeight: 700,
        color,
        textShadow: glowFilter,
      };
  }
}

export const TextOverlay: React.FC<TextOverlayProps> = ({
  speakerSrc,
  startFrom,
  text,
  style = "caption",
  color = "#e8e4e0",
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Isaac's pop animation: 70% → 110% (7 frames) → 100% (5 frames) = 12 frames total
  const scale = interpolate(
    frame,
    [0, 7, 12],
    [0.7, 1.1, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Fade in with the scale (first 7 frames)
  const opacity = interpolate(
    frame,
    [0, 5, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const positionStyles = getTextPosition(style);
  const textStyles = getTextStyles(style, color, glow);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Pure overlay - no speaker video. The underlying layout handles speaker. */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          ...positionStyles,
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            textAlign: "center",
            ...textStyles,
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
