import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { proxyVideo } from "../use-proxy";
import { DarkGradientBg } from "./backgrounds";
import { drawProgress, glowShadow, hexToRgba, popScale } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface Point {
  label: string;
  value: number;
}

interface LineChartProps {
  speakerSrc?: string;
  startFrom?: number;
  points: Point[];
  title?: string;
  lineColor?: string;
  showDots?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  speakerSrc,
  startFrom,
  points,
  title,
  lineColor = "#e63946",
  showDots = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Chart dimensions
  const chartW = 2800;
  const chartH = 900;
  const padLeft = 120;
  const padRight = 80;
  const padTop = 60;
  const padBottom = 100;
  const plotW = chartW - padLeft - padRight;
  const plotH = chartH - padTop - padBottom;

  const minVal = Math.min(...points.map((p) => p.value));
  const maxVal = Math.max(...points.map((p) => p.value));
  const range = maxVal - minVal || 1;

  // Map points to SVG coordinates
  const coords = points.map((p, i) => ({
    x: padLeft + (plotW / Math.max(points.length - 1, 1)) * i,
    y: padTop + plotH - ((p.value - minVal) / range) * plotH,
  }));

  const polylinePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");

  // Title entrance
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 10], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Grid lines fade in
  const gridOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line draw animation (frames 8-38)
  const lineProgress = drawProgress(frame, 8, 30);

  // Calculate total polyline length for dash animation
  let totalLength = 0;
  for (let i = 1; i < coords.length; i++) {
    const dx = coords[i].x - coords[i - 1].x;
    const dy = coords[i].y - coords[i - 1].y;
    totalLength += Math.sqrt(dx * dx + dy * dy);
  }

  const dashOffset = totalLength * (1 - lineProgress);

  // Exit animation (last 8 frames)
  const exitOp = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Grid lines at 25%, 50%, 75%, 100%
  const gridLines = [0.25, 0.5, 0.75, 1.0];

  return (
    <AbsoluteFill>
      <DarkGradientBg />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 400px",
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

        <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.6} />
              <stop offset="50%" stopColor={lineColor} stopOpacity={1} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0.6} />
            </linearGradient>
            <filter id="lineGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={lineColor} floodOpacity="0.6" />
              <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor={lineColor} floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Grid lines */}
          {gridLines.map((pct, i) => {
            const y = padTop + plotH - pct * plotH;
            const val = Math.round(minVal + pct * range);
            return (
              <g key={i} opacity={gridOpacity}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + plotW}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={2}
                />
                <text
                  x={padLeft - 20}
                  y={y + 6}
                  textAnchor="end"
                  fontFamily={syneFontFamily}
                  fontSize={28}
                  fontWeight={700}
                  fill="rgba(255,255,255,0.35)"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* X-axis baseline */}
          <line
            x1={padLeft}
            y1={padTop + plotH}
            x2={padLeft + plotW}
            y2={padTop + plotH}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={2}
            opacity={gridOpacity}
          />

          {/* Animated line */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLength}
            strokeDashoffset={dashOffset}
            filter="url(#lineGlow)"
          />

          {/* Dots + labels */}
          {showDots &&
            coords.map((c, i) => {
              // Dot pops in after line reaches it
              const dotStartFrame = 8 + (30 * i) / Math.max(coords.length - 1, 1);
              const dotScale = popScale(frame, dotStartFrame + 4, 1.2);
              const dotOpacity = dotScale > 0 ? 1 : 0;

              return (
                <g key={i} opacity={dotOpacity}>
                  {/* Outer glow */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={16 * dotScale}
                    fill={hexToRgba(lineColor, 0.25)}
                  />
                  {/* Inner dot */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={8 * dotScale}
                    fill={lineColor}
                  />
                  {/* Value at dot */}
                  <text
                    x={c.x}
                    y={c.y - 28}
                    textAnchor="middle"
                    fontFamily={syneFontFamily}
                    fontSize={32}
                    fontWeight={700}
                    fill="#e8e4e0"
                    opacity={dotScale > 0.5 ? 1 : 0}
                  >
                    {points[i].value}
                  </text>
                  {/* X label */}
                  <text
                    x={c.x}
                    y={padTop + plotH + 50}
                    textAnchor="middle"
                    fontFamily={syneFontFamily}
                    fontSize={30}
                    fontWeight={700}
                    fill="rgba(255,255,255,0.5)"
                  >
                    {points[i].label}
                  </text>
                </g>
              );
            })}
        </svg>
      </AbsoluteFill>

      {/* Speaker audio (hidden) */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(proxyVideo(speakerSrc))}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </AbsoluteFill>
  );
};
