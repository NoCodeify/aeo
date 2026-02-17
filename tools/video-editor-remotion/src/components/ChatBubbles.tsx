import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,
  Audio,

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
import { DarkGradientBg } from "./backgrounds";
import {
  SPRING_BOUNCY,
  SPRING_SNAPPY,
  glassMorphism,
  hexToRgba,
  popScale,
  glowShadow,
} from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

interface ChatBubblesProps {
  speakerSrc?: string;
  startFrom?: number;
  messages: ChatMessage[];
  aiName?: string;
  accentColor?: string;
}

export const ChatBubbles: React.FC<ChatBubblesProps> = ({
  speakerSrc,
  startFrom,
  messages,
  aiName = "AI",
  accentColor = "#457b9d",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const CHARS_PER_SEC = 15;
  const FRAMES_PER_MESSAGE = 60;

  // Calculate timing for each message
  const messageTiming = messages.map((msg, i) => {
    const entranceFrame = i * FRAMES_PER_MESSAGE;
    const typingFrames = Math.ceil((msg.text.length / CHARS_PER_SEC) * fps);
    return {
      entrance: entranceFrame,
      typingStart: entranceFrame + 8, // after slide-in completes
      typingEnd: entranceFrame + 8 + typingFrames,
    };
  });

  // Exit fade
  const exitOp = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Track if we've shown AI name label yet
  let aiNameShown = false;

  return (
    <AbsoluteFill>
      {/* Background */}
      <DarkGradientBg accentColor={accentColor} />

      {/* Speaker audio only */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}

      {/* Boop SFX for each message entrance */}
      {messages.map((_, i) => (
        <Sequence key={`sfx-${i}`} from={messageTiming[i].entrance} durationInFrames={15}>
          <Audio src={staticFile("sfx/boop.mp3")} volume={0.4} />
        </Sequence>
      ))}

      {/* Chat container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "200px 0",
          opacity: exitOp,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            width: 2400,
            maxHeight: 1600,
          }}
        >
          {messages.map((msg, i) => {
            const timing = messageTiming[i];
            const isUser = msg.role === "user";
            const isAi = msg.role === "ai";

            // Slide-in spring with bouncy overshoot
            const slideSpring = spring({
              frame: Math.max(0, frame - timing.entrance),
              fps,
              config: SPRING_BOUNCY,
            });

            // Slide from side
            const slideX = isUser
              ? interpolate(slideSpring, [0, 1], [300, 0])
              : interpolate(slideSpring, [0, 1], [-300, 0]);
            const bubbleOp = slideSpring;

            // Scale bounce on arrival
            const scaleBounce = interpolate(slideSpring, [0, 0.7, 1], [0.95, 1.03, 1.0]);

            // Typed characters
            const typedChars = frame >= timing.typingStart
              ? Math.min(
                  Math.floor(((frame - timing.typingStart) / fps) * CHARS_PER_SEC),
                  msg.text.length
                )
              : 0;
            const typingDone = typedChars >= msg.text.length;

            // Blinking cursor during typing
            const cursorVisible = !typingDone && frame >= timing.typingStart && Math.floor(frame / 8) % 2 === 0;

            // Show AI name label above first AI message
            const showAiLabel = isAi && !aiNameShown;
            if (isAi) aiNameShown = true;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isUser ? "flex-end" : "flex-start",
                  opacity: bubbleOp,
                  transform: `translateX(${slideX}px) scale(${scaleBounce})`,
                }}
              >
                {/* AI name label */}
                {showAiLabel && (
                  <div
                    style={{
                      fontFamily: syneFontFamily,
                      fontSize: 36,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: 8,
                      marginLeft: 24,
                      opacity: interpolate(slideSpring, [0, 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                    }}
                  >
                    {aiName}
                  </div>
                )}

                {/* Bubble */}
                <div
                  style={{
                    maxWidth: 1800,
                    padding: "32px 44px",
                    borderRadius: 24,
                    ...(isUser
                      ? {
                          backgroundColor: accentColor,
                          borderBottomRightRadius: 4,
                        }
                      : {
                          backgroundColor: "rgba(30, 30, 50, 0.8)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderBottomLeftRadius: 4,
                        }),
                    boxShadow: isUser
                      ? `0 4px 20px ${hexToRgba(accentColor, 0.3)}, 0 0 30px ${hexToRgba(accentColor, 0.15)}`
                      : "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: syneFontFamily,
                      fontSize: 52,
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 1.4,
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.text.slice(0, typedChars)}
                  </span>
                  {/* Typing cursor */}
                  <span
                    style={{
                      fontFamily: syneFontFamily,
                      fontSize: 52,
                      fontWeight: 700,
                      color: isUser ? "rgba(255,255,255,0.7)" : accentColor,
                      opacity: cursorVisible ? 1 : 0,
                      marginLeft: 2,
                    }}
                  >
                    |
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
