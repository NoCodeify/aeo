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
import { glassMorphism, popScale, glowShadow, hexToRgba, drawProgress } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface TreasureNode {
  label: string;
  description?: string;
}

interface TreasureMapProps {
  speakerSrc?: string;
  startFrom?: number;
  nodes: TreasureNode[];
  accentColor?: string;
  title?: string;
}

// Fixed waypoints on the map (up to 6 nodes) - winding path
const WAYPOINTS = [
  { x: 480, y: 1500 },
  { x: 1100, y: 900 },
  { x: 1900, y: 1300 },
  { x: 2600, y: 750 },
  { x: 3100, y: 1200 },
  { x: 3400, y: 650 },
];

export const TreasureMap: React.FC<TreasureMapProps> = ({
  speakerSrc,
  startFrom,
  nodes,
  accentColor = "#e63946",
  title,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const nodeStagger = 10;
  const pathStagger = 8;

  // Exit
  const exitOp = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Use first N waypoints
  const points = WAYPOINTS.slice(0, Math.min(nodes.length, 6));

  // Build SVG path segments between waypoints
  const pathSegments: string[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i];
    const to = points[i + 1];
    // Curved path with control point offset
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 + (i % 2 === 0 ? -120 : 120);
    pathSegments.push(`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`);
  }

  return (
    <AbsoluteFill>
      <DarkGradientBg accentColor={accentColor} />

      <AbsoluteFill style={{ opacity: exitOp }}>
        {/* Title */}
        {title && (
          <div
            style={{
              position: "absolute",
              top: 120,
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: syneFontFamily,
              fontSize: 72,
              fontWeight: 700,
              color: "#e8e4e0",
              letterSpacing: 6,
              textTransform: "uppercase",
              textShadow: glowShadow(accentColor, "subtle"),
              opacity: interpolate(frame, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {title}
          </div>
        )}

        {/* Dashed path SVG */}
        <svg
          width={3840}
          height={2160}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          <defs>
            <filter id="pathGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={accentColor} floodOpacity="0.5" />
            </filter>
          </defs>
          {pathSegments.map((d, i) => {
            const segStart = (i + 1) * pathStagger;
            const progress = drawProgress(frame, segStart, 20);
            // Approximate segment length
            const segLen = 800;
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={accentColor}
                strokeWidth={6}
                strokeDasharray="30 20"
                strokeDashoffset={segLen * (1 - progress)}
                strokeLinecap="round"
                filter="url(#pathGlow)"
                opacity={0.8}
              />
            );
          })}
        </svg>

        {/* Node markers */}
        {nodes.map((node, i) => {
          if (i >= points.length) return null;
          const pt = points[i];
          const isLast = i === nodes.length - 1;
          const scale = popScale(frame, i * nodeStagger, 1.08);
          const nodeOp = scale > 0 ? 1 : 0;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pt.x,
                top: pt.y,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: nodeOp,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* X mark for last node, numbered circle for others */}
              {isLast ? (
                <div style={{ position: "relative", width: 120, height: 120 }}>
                  <svg width={120} height={120} viewBox="0 0 120 120">
                    <line x1="15" y1="15" x2="105" y2="105" stroke={accentColor} strokeWidth="16" strokeLinecap="round" filter="url(#pathGlow)" />
                    <line x1="105" y1="15" x2="15" y2="105" stroke={accentColor} strokeWidth="16" strokeLinecap="round" filter="url(#pathGlow)" />
                  </svg>
                </div>
              ) : (
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: syneFontFamily,
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#0a0a14",
                    boxShadow: `0 0 16px ${hexToRgba(accentColor, 0.5)}`,
                  }}
                >
                  {i + 1}
                </div>
              )}

              {/* Label card */}
              <div
                style={{
                  ...glassMorphism(16, 0.6),
                  borderRadius: 16,
                  padding: "16px 32px",
                  border: `1px solid ${hexToRgba(accentColor, 0.2)}`,
                  textAlign: "center",
                  minWidth: 200,
                  boxShadow: glowShadow(accentColor, "subtle"),
                }}
              >
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 38,
                    fontWeight: 700,
                    color: "#e8e4e0",
                    lineHeight: 1.2,
                  }}
                >
                  {node.label}
                </div>
                {node.description && (
                  <div
                    style={{
                      fontFamily: syneFontFamily,
                      fontSize: 28,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.5)",
                      marginTop: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {node.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Compass rose (bottom-right decoration) */}
        <svg
          width={200}
          height={200}
          viewBox="0 0 100 100"
          style={{ position: "absolute", bottom: 160, right: 200, opacity: 0.15 }}
        >
          <polygon points="50,5 55,45 50,35 45,45" fill={accentColor} />
          <polygon points="50,95 55,55 50,65 45,55" fill={accentColor} />
          <polygon points="5,50 45,45 35,50 45,55" fill={accentColor} />
          <polygon points="95,50 55,45 65,50 55,55" fill={accentColor} />
          <circle cx="50" cy="50" r="4" fill={accentColor} />
          <text x="50" y="3" textAnchor="middle" fontSize="8" fill="rgba(232,228,224,0.4)" fontWeight="bold">N</text>
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
