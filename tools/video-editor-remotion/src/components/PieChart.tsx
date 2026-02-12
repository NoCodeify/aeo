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
import { SPRING_BOUNCY, glowShadow, hexToRgba } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface Segment {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  speakerSrc?: string;
  startFrom?: number;
  segments: Segment[];
  title?: string;
  donut?: boolean;
}

// Build an SVG arc path for a pie slice
function pieSlicePath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const x1 = cx + Math.cos(startAngle) * radius;
  const y1 = cy + Math.sin(startAngle) * radius;
  const x2 = cx + Math.cos(endAngle) * radius;
  const y2 = cy + Math.sin(endAngle) * radius;
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

export const PieChart: React.FC<PieChartProps> = ({
  speakerSrc,
  startFrom,
  segments,
  title,
  donut = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = 420;
  const donutInner = 220;
  const svgSize = radius * 2 + 80; // extra padding for glow
  const cx = svgSize / 2;
  const cy = svgSize / 2;

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

  // Calculate cumulative angles
  let cumulativeAngle = -Math.PI / 2; // start from top (12 o'clock)
  const segmentData = segments.map((seg, i) => {
    const fraction = total > 0 ? seg.value / total : 0;
    const startAngle = cumulativeAngle;
    const fullSweep = fraction * 2 * Math.PI;
    cumulativeAngle += fullSweep;
    return { ...seg, fraction, startAngle, fullSweep, index: i };
  });

  // Legend fades in after all segments drawn
  const lastSegmentDone = 8 + segments.length * 8 + 15;
  const legendOpacity = interpolate(frame, [lastSegmentDone, lastSegmentDone + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <DarkGradientBg />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 200px",
          opacity: exitOp,
        }}
      >
        {title && (
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 72,
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 140,
          }}
        >
          {/* Pie chart SVG */}
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            style={{ overflow: "visible", flexShrink: 0 }}
          >
            <defs>
              <filter id="pieGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodOpacity="0.3" />
              </filter>
            </defs>

            {segmentData.map((seg) => {
              const segSpring = spring({
                frame: Math.max(0, frame - 8 - seg.index * 8),
                fps,
                config: SPRING_BOUNCY,
              });

              const animatedSweep = seg.fullSweep * segSpring;
              if (animatedSweep <= 0.001) return null;

              const endAngle = seg.startAngle + animatedSweep;
              const d = pieSlicePath(cx, cy, radius, seg.startAngle, endAngle);

              return (
                <path
                  key={seg.index}
                  d={d}
                  fill={seg.color}
                  filter="url(#pieGlow)"
                  stroke="rgba(10,10,20,0.4)"
                  strokeWidth={2}
                />
              );
            })}

            {/* Donut hole */}
            {donut && (
              <circle
                cx={cx}
                cy={cy}
                r={donutInner}
                fill="#0a0a14"
              />
            )}
          </svg>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
              opacity: legendOpacity,
            }}
          >
            {segments.map((seg, i) => {
              const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: seg.color,
                      boxShadow: `0 0 12px ${hexToRgba(seg.color, 0.4)}`,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: syneFontFamily,
                      fontSize: 48,
                      fontWeight: 700,
                      color: "#e8e4e0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {seg.label}
                  </div>
                  <div
                    style={{
                      fontFamily: syneFontFamily,
                      fontSize: 44,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.5)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pct}%
                  </div>
                </div>
              );
            })}
          </div>
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
