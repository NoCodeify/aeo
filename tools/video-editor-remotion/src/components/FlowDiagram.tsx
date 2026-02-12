import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
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
import { glassMorphism, popScale, glowShadow, drawProgress, hexToRgba } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface FlowNode {
  label: string;
  description?: string;
}

interface FlowDiagramProps {
  speakerSrc?: string;
  startFrom?: number;
  nodes: FlowNode[];
  accentColor?: string;
  direction?: "horizontal" | "vertical";
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  speakerSrc,
  startFrom,
  nodes,
  accentColor = "#e63946",
  direction = "horizontal",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const isHorizontal = direction === "horizontal";
  const nodeStagger = 8;

  // Exit animation (last 8 frames)
  const exitOp = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Card dimensions
  const cardW = isHorizontal ? 480 : 600;
  const cardH = isHorizontal ? 240 : 200;

  // Calculate positions - centers of each card
  const totalW = 3840;
  const totalH = 2160;

  const positions = nodes.map((_, i) => {
    if (isHorizontal) {
      const padX = 300 + cardW / 2;
      const usable = totalW - padX * 2;
      const spacing = nodes.length > 1 ? usable / (nodes.length - 1) : 0;
      return { x: padX + spacing * i, y: totalH / 2 };
    } else {
      const padY = 250 + cardH / 2;
      const usable = totalH - padY * 2;
      const spacing = nodes.length > 1 ? usable / (nodes.length - 1) : 0;
      return { x: totalW / 2, y: padY + spacing * i };
    }
  });

  return (
    <AbsoluteFill>
      <DarkGradientBg accentColor={accentColor} />

      <AbsoluteFill style={{ opacity: exitOp }}>
        {/* Connection arrows (SVG layer) */}
        <svg
          width={totalW}
          height={totalH}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="12"
              markerHeight="10"
              refX="10"
              refY="5"
              orient="auto"
            >
              <polygon points="0 0, 12 5, 0 10" fill={accentColor} />
            </marker>
            <filter id="arrowGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={accentColor} floodOpacity="0.5" />
            </filter>
          </defs>

          {positions.slice(0, -1).map((pos, i) => {
            const next = positions[i + 1];
            // Arrow draws after both nodes are visible
            const arrowStartFrame = (i + 1) * nodeStagger + 4;
            const progress = drawProgress(frame, arrowStartFrame, 12);

            let x1: number, y1: number, x2: number, y2: number;

            if (isHorizontal) {
              x1 = pos.x + cardW / 2 + 16;
              y1 = pos.y;
              x2 = next.x - cardW / 2 - 16;
              y2 = next.y;
            } else {
              x1 = pos.x;
              y1 = pos.y + cardH / 2 + 16;
              x2 = next.x;
              y2 = next.y - cardH / 2 - 16;
            }

            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const dashOffset = length * (1 - progress);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={accentColor}
                strokeWidth={4}
                strokeDasharray={length}
                strokeDashoffset={dashOffset}
                markerEnd={progress > 0.9 ? "url(#arrowhead)" : undefined}
                filter="url(#arrowGlow)"
              />
            );
          })}
        </svg>

        {/* Node cards */}
        {nodes.map((node, i) => {
          const pos = positions[i];
          const scale = popScale(frame, i * nodeStagger, 1.06);
          const nodeOpacity = scale > 0 ? 1 : 0;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pos.x - cardW / 2,
                top: pos.y - cardH / 2,
                width: cardW,
                height: cardH,
                ...glassMorphism(16, 0.6),
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 32px",
                gap: 12,
                opacity: nodeOpacity,
                transform: `scale(${scale})`,
                boxShadow: glowShadow(accentColor, "subtle"),
                borderColor: hexToRgba(accentColor, 0.15),
              }}
            >
              {/* Step number */}
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: syneFontFamily,
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#0a0a14",
                  boxShadow: `0 0 12px ${hexToRgba(accentColor, 0.5)}`,
                }}
              >
                {i + 1}
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: syneFontFamily,
                  fontSize: 44,
                  fontWeight: 700,
                  color: "#e8e4e0",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {node.label}
              </div>

              {/* Description */}
              {node.description && (
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 36,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.7)",
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {node.description}
                </div>
              )}
            </div>
          );
        })}
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
