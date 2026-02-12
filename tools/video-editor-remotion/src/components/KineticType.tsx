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
import { glowShadow, hexToRgba, fadeInOut } from "./premium-utils";

loadSyne("normal", { weights: ["700", "800"], subsets: ["latin"] });

interface KineticTypeProps {
  speakerSrc?: string;
  startFrom?: number;
  words: string;
  color?: string;
  size?: "large" | "huge";
}

/**
 * Words appear one at a time on dark background for maximum emphasis.
 * Current word is full white, previous words dim to 40% opacity.
 * Center-aligned with natural line wrapping.
 */
export const KineticType: React.FC<KineticTypeProps> = ({
  speakerSrc,
  startFrom,
  words,
  color = "#e8e4e0",
  size = "large",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const wordList = words.split(" ").filter((w) => w.length > 0);
  const totalWords = wordList.length;

  // Evenly space word reveals across the segment duration
  const framesPerWord = durationInFrames / totalWords;
  const currentWordIndex = Math.min(
    Math.floor(frame / framesPerWord),
    totalWords - 1,
  );

  const fontSize = size === "huge" ? 240 : 160;
  const hasSpeaker = !!speakerSrc;

  // Exit: fade out over last 6 frames
  const exitOp = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <>
      <DarkGradientBg />

      {/* Words container */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: exitOp,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: size === "huge" ? 48 : 36,
            maxWidth: 3200,
            padding: "0 200px",
          }}
        >
          {wordList.map((word, i) => {
            if (i > currentWordIndex) return null;

            const isCurrent = i === currentWordIndex;

            // Word entrance animation
            const wordFrame = frame - i * framesPerWord;
            const wordScale = interpolate(wordFrame, [0, 6], [0.85, 1.0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const wordY = interpolate(wordFrame, [0, 6], [-20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const wordOp = interpolate(wordFrame, [0, 4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Dim transition: previous words fade to 40% after they stop being current
            let finalOp = wordOp;
            if (!isCurrent && i < currentWordIndex) {
              const dimFrame = frame - (i + 1) * framesPerWord;
              const dimOp = interpolate(dimFrame, [0, 6], [1, 0.4], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              finalOp = wordOp * dimOp;
            }

            return (
              <span
                key={i}
                style={{
                  fontFamily: syneFontFamily,
                  fontSize,
                  fontWeight: 700,
                  color: isCurrent ? color : "rgba(255, 255, 255, 0.4)",
                  lineHeight: 1.2,
                  transition: "none",
                  transform: `scale(${wordScale}) translateY(${wordY}px)`,
                  opacity: finalOp,
                  textShadow: isCurrent ? glowShadow(color, "medium") : undefined,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Speaker audio (hidden) */}
      {hasSpeaker && (
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
