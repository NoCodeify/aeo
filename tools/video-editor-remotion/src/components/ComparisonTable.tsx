import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
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
import { SPRING_SNAPPY, SPRING_BOUNCY, hexToRgba, glowShadow } from "./premium-utils";

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
  winnerSide?: "left" | "right";
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  speakerSrc,
  startFrom,
  leftLabel,
  rightLabel,
  rows,
  accentColor = "#e63946",
  winnerSide,
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

  // Winner reveal animation (after all rows visible)
  const allRowsVisibleFrame = 8 + rows.length * 4 + 20; // rows done + settle time
  const winnerRevealFrame = allRowsVisibleFrame + 10;
  const hasWinner = !!winnerSide;

  const winnerSpring = hasWinner
    ? spring({ frame: Math.max(0, frame - winnerRevealFrame), fps, config: SPRING_BOUNCY })
    : 0;

  const winnerGlow = hasWinner
    ? interpolate(
        frame,
        [winnerRevealFrame, winnerRevealFrame + 8, winnerRevealFrame + 20, winnerRevealFrame + 30],
        [0, 1, 1, 0.6],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 0;

  const winnerScale = hasWinner
    ? interpolate(winnerSpring, [0, 1], [1, 1.03])
    : 1;

  const winnerCheckOp = hasWinner
    ? interpolate(
        frame,
        [winnerRevealFrame + 4, winnerRevealFrame + 10],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 0;

  const winnerCheckScale = hasWinner
    ? spring({ frame: Math.max(0, frame - winnerRevealFrame - 4), fps, config: SPRING_BOUNCY })
    : 0;

  // Ripple ring expanding from winner column header on reveal
  const winnerRippleProgress = hasWinner
    ? interpolate(frame, [winnerRevealFrame, winnerRevealFrame + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const winnerRippleSize = winnerRippleProgress * 500;
  const winnerRippleOpacity = 1 - winnerRippleProgress;

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
              border: hasWinner && winnerGlow > 0
                ? `2px solid ${hexToRgba(accentColor, winnerGlow * 0.8)}`
                : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 32,
              padding: "60px 80px",
              position: "relative",
              overflow: "hidden",
              boxShadow: hasWinner && winnerGlow > 0
                ? `0 0 ${40 * winnerGlow}px ${hexToRgba(accentColor, winnerGlow * 0.3)}, 0 0 ${80 * winnerGlow}px ${hexToRgba(accentColor, winnerGlow * 0.15)}`
                : "none",
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
                  color: winnerSide === "left" && winnerGlow > 0 ? accentColor : "#e8e4e0",
                  textAlign: "center",
                  position: "relative",
                  transform: winnerSide === "left" ? `scale(${winnerScale})` : undefined,
                  transition: "color 0.3s",
                }}
              >
                {leftLabel}
                {winnerSide === "left" && winnerCheckOp > 0 && (
                  <div style={{ position: "absolute", top: -16, right: 20, transform: `scale(${winnerCheckScale})` }}>
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" style={{ opacity: winnerCheckOp }}>
                      <circle cx="12" cy="12" r="11" fill={accentColor} opacity={0.9} />
                      <path d="M7 12.5L10.5 16L17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <div
                style={{
                  flex: 1,
                  fontFamily: syneFontFamily,
                  fontSize: 64,
                  fontWeight: 700,
                  color: winnerSide === "right" && winnerGlow > 0 ? accentColor : "#e8e4e0",
                  textAlign: "center",
                  position: "relative",
                  transform: winnerSide === "right" ? `scale(${winnerScale})` : undefined,
                  transition: "color 0.3s",
                }}
              >
                {rightLabel}
                {winnerSide === "right" && winnerCheckOp > 0 && (
                  <div style={{ position: "absolute", top: -16, right: 20, transform: `scale(${winnerCheckScale})` }}>
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" style={{ opacity: winnerCheckOp }}>
                      <circle cx="12" cy="12" r="11" fill={accentColor} opacity={0.9} />
                      <path d="M7 12.5L10.5 16L17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
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

              // Shimmer sweep on winning rows after winner reveal
              const rowShimmer = row.rightWins && hasWinner && frame >= winnerRevealFrame
                ? interpolate(frame, [winnerRevealFrame + 2, winnerRevealFrame + 18], [-0.3, 1.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
                : -1;

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
                    background: row.rightWins && rowShimmer > -0.3 && rowShimmer < 1.3
                      ? `linear-gradient(90deg, transparent ${(rowShimmer - 0.15) * 100}%, ${hexToRgba(accentColor, 0.15)} ${rowShimmer * 100}%, transparent ${(rowShimmer + 0.15) * 100}%)`
                      : undefined,
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

            {/* Ripple ring expanding from winner column header */}
            {hasWinner && winnerRippleProgress > 0 && winnerRippleProgress < 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 60,
                  left: winnerSide === "left" ? "25%" : "75%",
                  width: winnerRippleSize,
                  height: winnerRippleSize,
                  borderRadius: "50%",
                  border: `3px solid ${hexToRgba(accentColor, winnerRippleOpacity)}`,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </div>
      </AbsoluteFill>

      {/* Winner reveal SFX */}
      {hasWinner && (
        <Sequence from={winnerRevealFrame} durationInFrames={15}>
          <Audio src={staticFile("sfx/achievement-ding.mp3")} volume={0.4} />
        </Sequence>
      )}

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
