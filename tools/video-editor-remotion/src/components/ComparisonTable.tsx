import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { MeshGradientBg } from "./backgrounds";
import { SPRING_SNAPPY, hexToRgba } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface ComparisonRow {
  left: string;
  right: string;
  rightWins?: boolean;
}

interface ComparisonTableProps {
  speakerSrc?: string;
  startFrom?: number;
  leftLabel: string;
  rightLabel: string;
  rows: ComparisonRow[];
  accentColor?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  speakerSrc,
  startFrom,
  leftLabel,
  rightLabel,
  rows,
  accentColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Header entrance
  const headerSpring = spring({ frame, fps, config: SPRING_SNAPPY });
  const headerY = (1 - headerSpring) * -40;

  // Accent underline
  const underlineScale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: SPRING_SNAPPY,
  });

  // Exit animation (last 10 frames)
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const exitScale = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0.95],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      <MeshGradientBg color1={accentColor} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Glass card with exit animation */}
        <div
          style={{
            opacity: exitOpacity,
            transform: `scale(${exitScale})`,
          }}
        >
          <div
            style={{
              width: 2400,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              backgroundColor: "rgba(10,10,20,0.55)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 32,
              padding: "60px 80px",
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "flex",
                paddingBottom: 24,
                marginBottom: 16,
                opacity: headerSpring,
                transform: `translateY(${headerY}px)`,
              }}
            >
              <div
                style={{
                  flex: 1,
                  fontFamily: syneFontFamily,
                  fontSize: 64,
                  fontWeight: 700,
                  color: "#e8e4e0",
                  textAlign: "center",
                }}
              >
                {leftLabel}
              </div>
              <div
                style={{
                  flex: 1,
                  fontFamily: syneFontFamily,
                  fontSize: 64,
                  fontWeight: 700,
                  color: "#e8e4e0",
                  textAlign: "center",
                }}
              >
                {rightLabel}
              </div>
            </div>

            {/* Accent underline */}
            <div
              style={{
                height: 4,
                backgroundColor: accentColor,
                transform: `scaleX(${underlineScale})`,
                transformOrigin: "left",
                marginBottom: 16,
              }}
            />

            {/* Data rows */}
            {rows.map((row, i) => {
              const rowSpring = spring({
                frame: Math.max(0, frame - 8 - i * 4),
                fps,
                config: SPRING_SNAPPY,
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    borderBottom:
                      i < rows.length - 1
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "none",
                    padding: "20px 0",
                    backgroundColor: row.rightWins
                      ? hexToRgba(accentColor, 0.1)
                      : "transparent",
                    boxShadow: row.rightWins
                      ? `inset 4px 0 0 ${accentColor}, 0 0 20px ${hexToRgba(accentColor, 0.15)}`
                      : "none",
                    opacity: rowSpring,
                    transform: `scale(${0.95 + rowSpring * 0.05}) translateY(${(1 - rowSpring) * 20}px)`,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      fontFamily: syneFontFamily,
                      fontSize: 48,
                      fontWeight: 700,
                      color: "#e8e4e0",
                      textAlign: "center",
                      padding: "8px 24px",
                    }}
                  >
                    {row.left}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontFamily: syneFontFamily,
                      fontSize: 48,
                      fontWeight: 700,
                      color: row.rightWins ? accentColor : "#e8e4e0",
                      textAlign: "center",
                      padding: "8px 24px",
                    }}
                  >
                    {row.right}
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
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </AbsoluteFill>
  );
};
