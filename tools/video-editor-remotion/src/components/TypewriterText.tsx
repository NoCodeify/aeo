import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { proxyVideo } from "../use-proxy";
import {
  loadFont,
  fontFamily,
} from "@remotion/google-fonts/JetBrainsMono";
import { DarkGradientBg } from "./backgrounds";

loadFont("normal", { weights: ["400", "700"], subsets: ["latin"] });

interface TypewriterTextProps {
  speakerSrc?: string;
  startFrom?: number;
  text: string;
  speed?: number; // chars per second, default 12
  cursorColor?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  speakerSrc,
  startFrom,
  text,
  speed = 12,
  cursorColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const visibleChars = Math.min(
    Math.floor((frame / fps) * speed),
    text.length,
  );

  const cursorVisible = Math.floor(frame / 10) % 2 === 0;

  // Fade out over last 6 frames
  const exitOp = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <>
      <DarkGradientBg accentColor={cursorColor} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 300,
          opacity: exitOp,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 72,
            fontWeight: 400,
            color: "#e8e4e0",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            maxWidth: 3200,
          }}
        >
          {text.slice(0, visibleChars)}
          <span
            style={{
              color: cursorColor,
              opacity: cursorVisible ? 1 : 0,
            }}
          >
            |
          </span>
        </div>
      </AbsoluteFill>

      {/* Speaker audio only */}
      {speakerSrc && (
        <OffthreadVideo
          src={staticFile(proxyVideo(speakerSrc))}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </>
  );
};
