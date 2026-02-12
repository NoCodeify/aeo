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
import { DarkGradientBg } from "./backgrounds";
import { hexToRgba, glowShadow } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

const DEFAULT_COLORS = ["#e63946", "#457b9d", "#2a9d8f", "#e76f51", "#f4a261", "#264653"];

interface Bar {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

interface ProgressBarsProps {
  speakerSrc?: string;
  startFrom?: number;
  bars: Bar[];
  title?: string;
}

export const ProgressBars: React.FC<ProgressBarsProps> = ({
  speakerSrc,
  startFrom,
  bars,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const globalMax = Math.max(...bars.map((b) => b.maxValue ?? b.value));

  const fillProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 15,
  });

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

  return (
    <AbsoluteFill>
      <DarkGradientBg />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "200px 400px",
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
              marginBottom: 80,
              textAlign: "center",
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              textShadow: glowShadow("#e8e4e0", "subtle"),
            }}
          >
            {title}
          </div>
        )}

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 48 }}>
          {bars.map((bar, i) => {
            const max = bar.maxValue ?? globalMax;
            const fraction = max > 0 ? bar.value / max : 0;
            const barColor = bar.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
            const barWidth = fraction * fillProgress * 100;

            // Bar stagger entrance
            const barDelay = i * 5;
            const barOpacity = interpolate(frame, [barDelay, barDelay + 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const barTranslateX = interpolate(frame, [barDelay, barDelay + 8], [-60, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Value pop when bar is mostly filled
            const valueScale = fillProgress > 0.9
              ? interpolate(frame, [barDelay + 12, barDelay + 18], [0.7, 1.0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 0;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 40,
                  opacity: barOpacity,
                  transform: `translateX(${barTranslateX}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#e8e4e0",
                    width: 400,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {bar.label}
                </div>

                <div
                  style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${barWidth}%`,
                      height: "100%",
                      backgroundColor: barColor,
                      borderRadius: 12,
                      boxShadow: `4px 0 20px ${hexToRgba(barColor, 0.6)}, 0 0 12px ${hexToRgba(barColor, 0.3)}`,
                    }}
                  />
                </div>

                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#e8e4e0",
                    width: 160,
                    textAlign: "left",
                    flexShrink: 0,
                    opacity: valueScale,
                    transform: `scale(${valueScale})`,
                  }}
                >
                  {bar.value}
                </div>
              </div>
            );
          })}
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
    </AbsoluteFill>
  );
};
