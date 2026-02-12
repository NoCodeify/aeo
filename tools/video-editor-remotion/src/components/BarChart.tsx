import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { proxyVideo } from "../use-proxy";
import { DarkGradientBg } from "./backgrounds";
import { glassMorphism, hexToRgba, glowShadow } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

const DEFAULT_COLORS = ["#e63946", "#457b9d", "#2a9d8f", "#e76f51", "#f4a261", "#264653"];

interface Bar {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  speakerSrc?: string;
  startFrom?: number;
  bars: Bar[];
  title?: string;
  maxValue?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  speakerSrc,
  startFrom,
  bars,
  title,
  maxValue,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const globalMax = maxValue ?? Math.max(...bars.map((b) => b.value));

  // Title entrance
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 10], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit animation (last 8 frames)
  const exitOp = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const MAX_BAR_HEIGHT = 800;

  return (
    <AbsoluteFill>
      <DarkGradientBg />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 300px",
          opacity: exitOp,
        }}
      >
        {title && (
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 64,
              fontWeight: 700,
              color: "#e8e4e0",
              marginBottom: 60,
              textAlign: "center",
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              textShadow: glowShadow("#e8e4e0", "subtle"),
            }}
          >
            {title}
          </div>
        )}

        {/* Glass card container */}
        <div
          style={{
            ...glassMorphism(16, 0.55),
            borderRadius: 32,
            padding: "60px 80px 40px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: Math.max(40, 200 / bars.length),
            width: "100%",
            height: MAX_BAR_HEIGHT + 200,
          }}
        >
          {bars.map((bar, i) => {
            const fraction = globalMax > 0 ? bar.value / globalMax : 0;
            const barColor = bar.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];

            // Bar grow spring with stagger
            const barDelay = i * 5;
            const growSpring = spring({
              frame: Math.max(0, frame - barDelay - 10),
              fps,
              config: { damping: 200 },
              durationInFrames: 18,
            });

            const barHeight = fraction * growSpring * MAX_BAR_HEIGHT;

            // Bar entrance opacity
            const barOpacity = interpolate(frame, [barDelay, barDelay + 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Value pop when bar is mostly filled
            const valueScale = growSpring > 0.9
              ? interpolate(frame, [barDelay + 18, barDelay + 24], [0.7, 1.0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 0;

            const barWidth = Math.max(60, Math.min(160, 1800 / bars.length));

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: barOpacity,
                }}
              >
                {/* Value label above bar */}
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#e8e4e0",
                    marginBottom: 12,
                    opacity: valueScale,
                    transform: `scale(${valueScale})`,
                  }}
                >
                  {bar.value}
                </div>

                {/* Bar */}
                <div
                  style={{
                    width: barWidth,
                    height: barHeight,
                    backgroundColor: barColor,
                    borderRadius: "12px 12px 4px 4px",
                    boxShadow: `0 -4px 20px ${hexToRgba(barColor, 0.5)}, 0 0 12px ${hexToRgba(barColor, 0.3)}`,
                  }}
                />

                {/* Label below bar */}
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#e8e4e0",
                    marginTop: 16,
                    textAlign: "center",
                    maxWidth: barWidth + 40,
                  }}
                >
                  {bar.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Speaker audio (hidden) */}
      {speakerSrc && (
        <OffthreadVideo
          src={staticFile(proxyVideo(speakerSrc))}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </AbsoluteFill>
  );
};
