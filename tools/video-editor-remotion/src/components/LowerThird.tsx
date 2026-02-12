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
import { SPRING_SNAPPY, hexToRgba } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface LowerThirdProps {
  speakerSrc?: string;
  startFrom?: number;
  title: string;
  subtitle: string;
  accentColor?: string;
}

export const LowerThird: React.FC<LowerThirdProps> = ({
  speakerSrc,
  startFrom,
  title,
  subtitle,
  accentColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance: slide in from left
  const slideIn = spring({ frame, fps, config: SPRING_SNAPPY });
  const translateXIn = interpolate(slideIn, [0, 1], [-600, 0]);

  // Exit: last 10 frames slide left + fade
  const exitTranslateX = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0, -200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const translateX = translateXIn + exitTranslateX;

  // Subtitle stagger: delays 4 frames
  const subtitleOpacity = interpolate(frame, [4, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [4, 10], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      {speakerSrc && (
        <OffthreadVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Lower third bar */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 120,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(10,10,20,0.65)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: `6px solid ${accentColor}`,
          padding: "32px 48px",
          transform: `translateX(${translateX}px)`,
          opacity: exitOpacity,
          boxShadow: `-4px 0 20px ${hexToRgba(accentColor, 0.5)}, 0 0 40px ${hexToRgba(accentColor, 0.2)}`,
        }}
      >
        <div
          style={{
            fontFamily: syneFontFamily,
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: syneFontFamily,
            fontSize: 40,
            fontWeight: 700,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.2,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
