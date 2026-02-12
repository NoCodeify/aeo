import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { DarkGradientBg } from "./backgrounds";
import { glowShadow, hexToRgba, fadeInOut } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface CounterTickerProps {
  speakerSrc?: string;
  startFrom?: number;
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  color?: string;
}

export const CounterTicker: React.FC<CounterTickerProps> = ({
  speakerSrc,
  startFrom,
  from = 0,
  to,
  prefix = "",
  suffix = "",
  label,
  color = "#e8e4e0",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(
    frame,
    [0, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const currentValue = Math.round(from + (to - from) * progress);
  const formattedValue = currentValue.toLocaleString();

  // Container entrance: pop scale
  const containerScale = interpolate(frame, [0, 6, 10], [0.8, 1.05, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Label entrance: fade in first
  const labelOp = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Number entrance: pops 5 frames later
  const numOp = interpolate(frame, [5, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit: fade out over last 8 frames
  const exitOp = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <>
      <DarkGradientBg accentColor={color} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${containerScale})`,
          opacity: exitOp,
        }}
      >
        {label && (
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 56,
              fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 24,
              letterSpacing: 4,
              textTransform: "uppercase" as const,
              opacity: labelOp,
            }}
          >
            {label}
          </div>
        )}
        <div
          style={{
            fontFamily: syneFontFamily,
            fontWeight: 700,
            color,
            display: "flex",
            alignItems: "baseline",
            opacity: numOp,
            textShadow: glowShadow(color, "strong"),
          }}
        >
          {prefix && (
            <span style={{ fontSize: 180 }}>{prefix}</span>
          )}
          <span style={{ fontSize: 280 }}>{formattedValue}</span>
          {suffix && (
            <span style={{ fontSize: 180 }}>{suffix}</span>
          )}
        </div>
      </AbsoluteFill>

      {/* Speaker audio (hidden) */}
      {speakerSrc && (
        <OffthreadVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </>
  );
};
