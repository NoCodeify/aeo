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
import { DarkGradientBg } from "./backgrounds";
import { SPRING_BOUNCY, SPRING_SNAPPY, glassMorphism, glowShadow, hexToRgba } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface ChapterCardProps {
  speakerSrc?: string;
  startFrom?: number;
  title: string;
  number?: number;
  subtitle?: string;
  accentColor?: string;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  speakerSrc,
  startFrom,
  title,
  number,
  subtitle,
  accentColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Number fades in first with bouncy spring
  const numberSpring = spring({ frame, fps, config: SPRING_BOUNCY });
  const numberScale = interpolate(numberSpring, [0, 1], [0.5, 1]);
  const numberOp = numberSpring;

  // Title wipes in from left starting at frame 6
  const titleProgress = interpolate(frame, [6, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleX = interpolate(titleProgress, [0, 1], [-200, 0]);
  const titleOp = titleProgress;

  // Divider line grows from center at frame 8
  const dividerProgress = interpolate(frame, [8, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle fades in below at frame 14
  const subtitleOp = interpolate(frame, [14, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [14, 22], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit: all fade out in last 8 frames
  const exitOp = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <>
      {/* Dark gradient background */}
      <DarkGradientBg accentColor={accentColor} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: exitOp,
        }}
      >
        {/* Glass card */}
        <div
          style={{
            ...glassMorphism(20, 0.55),
            borderRadius: 40,
            padding: "80px 120px",
            maxWidth: 2800,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Chapter number */}
          {number !== undefined && (
            <div
              style={{
                fontFamily: syneFontFamily,
                fontSize: 160,
                fontWeight: 700,
                color: accentColor,
                lineHeight: 1,
                opacity: numberOp,
                transform: `scale(${numberScale})`,
                textShadow: glowShadow(accentColor, "medium"),
              }}
            >
              {String(number).padStart(2, "0")}
            </div>
          )}

          {/* Accent divider line */}
          <div
            style={{
              width: 400 * dividerProgress,
              height: 4,
              backgroundColor: accentColor,
              borderRadius: 2,
              boxShadow: `0 0 20px ${hexToRgba(accentColor, 0.4)}`,
            }}
          />

          {/* Title */}
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 120,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.2,
              opacity: titleOp,
              transform: `translateX(${titleX}px)`,
              textShadow: "0 4px 16px rgba(0,0,0,0.6)",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontFamily: syneFontFamily,
                fontSize: 56,
                fontWeight: 700,
                color: "rgba(255,255,255,0.6)",
                textAlign: "center",
                lineHeight: 1.3,
                opacity: subtitleOp,
                transform: `translateY(${subtitleY}px)`,
              }}
            >
              {subtitle}
            </div>
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
