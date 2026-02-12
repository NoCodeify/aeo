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
import { DarkGradientBg, BlurredSpeakerBg } from "./backgrounds";
import { SPRING_BOUNCY, glassMorphism, glowShadow, hexToRgba } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface QuoteCardProps {
  speakerSrc?: string;
  startFrom?: number;
  quote: string;
  attribution: string;
  role?: string;
  accentColor?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  speakerSrc,
  startFrom,
  quote,
  attribution,
  role,
  accentColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Quote mark springs in with bounce
  const quoteSpring = spring({
    frame,
    fps,
    config: SPRING_BOUNCY,
  });
  const markScale = quoteSpring;

  // Quote text fades + scales in at frame 8
  const textOp = interpolate(frame, [8, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textScale = interpolate(frame, [8, 16], [0.95, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Attribution slides up from translateY(40) at frame 16
  const attrOp = interpolate(frame, [16, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const attrY = interpolate(frame, [16, 24], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit: over last 10 frames, mark scales down, card fades
  const exitProgress = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitMarkScale = interpolate(exitProgress, [0, 1], [1.0, 0.8]);
  const exitOp = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <>
      {/* Background */}
      {speakerSrc ? (
        <BlurredSpeakerBg speakerSrc={speakerSrc} startFrom={startFrom ?? 0} />
      ) : (
        <DarkGradientBg accentColor={accentColor} />
      )}

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
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            backgroundColor: "rgba(10,10,20,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 40,
            padding: "80px 100px",
            maxWidth: 2400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Decorative opening quotation mark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -70%) scale(${markScale * exitMarkScale})`,
              fontFamily: syneFontFamily,
              fontSize: 600,
              fontWeight: 700,
              color: accentColor,
              opacity: markScale > 0.01 ? 0.2 : 0,
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              textShadow: glowShadow(accentColor, "medium"),
            }}
          >
            {"\u201C"}
          </div>

          {/* Quote text */}
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 72,
              fontWeight: 700,
              fontStyle: "italic",
              color: "#ffffff",
              textAlign: "center",
              maxWidth: 2200,
              lineHeight: 1.4,
              position: "relative",
              zIndex: 1,
              opacity: textOp,
              transform: `scale(${textScale})`,
            }}
          >
            {quote}
          </div>

          {/* Attribution */}
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 44,
              fontWeight: 700,
              color: accentColor,
              marginTop: 48,
              position: "relative",
              zIndex: 1,
              opacity: attrOp,
              transform: `translateY(${attrY}px)`,
            }}
          >
            -- {attribution}{role ? `, ${role}` : ""}
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
    </>
  );
};
