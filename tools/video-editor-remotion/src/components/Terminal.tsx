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
  loadFont,
  fontFamily,
} from "@remotion/google-fonts/JetBrainsMono";
import { DarkGradientBg } from "./backgrounds";
import {
  SPRING_BOUNCY,
  SPRING_SNAPPY,
  glassMorphism,
  hexToRgba,
  popScale,
  glowShadow,
} from "./premium-utils";

loadFont("normal", { weights: ["400", "700"], subsets: ["latin"] });

interface TerminalCommand {
  input: string;
  output?: string;
}

interface TerminalProps {
  speakerSrc?: string;
  startFrom?: number;
  commands: TerminalCommand[];
  prompt?: string;
  accentColor?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  speakerSrc,
  startFrom,
  commands,
  prompt = "$",
  accentColor = "#22c55e",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const CHARS_PER_SEC = 15;
  const ENTER_PAUSE = 5; // frames after typing before output
  const OUTPUT_LINE_STAGGER = 6; // frames between output lines
  const COMMAND_GAP = 10; // frames gap between commands

  // Calculate timing for all commands
  interface CommandTiming {
    promptFrame: number;
    typeStart: number;
    typeEnd: number;
    enterFrame: number;
    outputStart: number;
    outputLines: string[];
    totalEnd: number;
  }

  const commandTimings: CommandTiming[] = [];
  let currentFrame = 15; // start after window slides in

  for (const cmd of commands) {
    const typeFrames = Math.ceil((cmd.input.length / CHARS_PER_SEC) * fps);
    const outputLines = cmd.output ? cmd.output.split("\n") : [];
    const outputDuration = outputLines.length * OUTPUT_LINE_STAGGER + 10;

    const timing: CommandTiming = {
      promptFrame: currentFrame,
      typeStart: currentFrame,
      typeEnd: currentFrame + typeFrames,
      enterFrame: currentFrame + typeFrames,
      outputStart: currentFrame + typeFrames + ENTER_PAUSE,
      outputLines,
      totalEnd: currentFrame + typeFrames + ENTER_PAUSE + (outputLines.length > 0 ? outputDuration : 0),
    };

    commandTimings.push(timing);
    currentFrame = timing.totalEnd + COMMAND_GAP;
  }

  // === Window entrance spring ===
  const windowSpring = spring({ frame, fps, config: SPRING_BOUNCY });
  const windowY = interpolate(windowSpring, [0, 1], [300, 0]);
  const windowScale = interpolate(windowSpring, [0, 1], [0.9, 1]);

  // === Exit fade ===
  const exitOp = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Collect all enter-key SFX frames
  const enterSfxFrames = commandTimings.map((t) => t.enterFrame);

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

      {/* Keyboard typing SFX for each command */}
      {commandTimings.map((timing, i) => (
        <Sequence key={`typing-${i}`} from={timing.typeStart} durationInFrames={timing.typeEnd - timing.typeStart}>
          <Audio src={staticFile("sfx/keyboard-typing.mp3")} volume={0.3} loop />
        </Sequence>
      ))}

      {/* Enter key SFX for each command */}
      {enterSfxFrames.map((sfxFrame, i) => (
        <Sequence key={`enter-${i}`} from={sfxFrame} durationInFrames={15}>
          <Audio src={staticFile("sfx/enter.mp3")} volume={0.5} />
        </Sequence>
      ))}

      {/* Terminal window */}
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
            transform: `translateY(${windowY}px) scale(${windowScale})`,
            width: 2800,
            borderRadius: 24,
            backgroundColor: "#1e1e2e",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: `0 8px 60px rgba(0,0,0,0.6), 0 0 40px ${hexToRgba(accentColor, 0.08)}`,
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px 28px",
              backgroundColor: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Traffic light dots */}
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#ff5f57",
                }}
              />
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#febc2e",
                }}
              />
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#28c840",
                }}
              />
            </div>

            {/* Title */}
            <div
              style={{
                flex: 1,
                textAlign: "center",
                fontFamily: fontFamily,
                fontSize: 32,
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Terminal
            </div>

            {/* Spacer for centering */}
            <div style={{ width: 84 }} />
          </div>

          {/* Terminal content */}
          <div
            style={{
              padding: "40px 48px",
              minHeight: 600,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {commandTimings.map((timing, cmdIndex) => {
              // Prompt + typed input
              const typedChars = frame >= timing.typeStart
                ? Math.min(
                    Math.floor(((frame - timing.typeStart) / fps) * CHARS_PER_SEC),
                    commands[cmdIndex].input.length
                  )
                : 0;

              const typingDone = typedChars >= commands[cmdIndex].input.length;
              const showPrompt = frame >= timing.promptFrame;
              const blinkCursor = !typingDone && frame >= timing.typeStart && Math.floor(frame / 8) % 2 === 0;

              if (!showPrompt) return null;

              return (
                <React.Fragment key={cmdIndex}>
                  {/* Command line */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 16,
                      marginBottom: 4,
                    }}
                  >
                    {/* Prompt */}
                    <span
                      style={{
                        fontFamily: fontFamily,
                        fontSize: 52,
                        fontWeight: 700,
                        color: accentColor,
                        flexShrink: 0,
                      }}
                    >
                      {prompt}
                    </span>

                    {/* Command text */}
                    <span
                      style={{
                        fontFamily: fontFamily,
                        fontSize: 52,
                        fontWeight: 700,
                        color: "#ffffff",
                        whiteSpace: "pre",
                      }}
                    >
                      {commands[cmdIndex].input.slice(0, typedChars)}
                    </span>

                    {/* Blinking cursor */}
                    {!typingDone && (
                      <span
                        style={{
                          fontFamily: fontFamily,
                          fontSize: 52,
                          fontWeight: 700,
                          color: accentColor,
                          opacity: blinkCursor ? 1 : 0,
                        }}
                      >
                        |
                      </span>
                    )}
                  </div>

                  {/* Output lines */}
                  {timing.outputLines.map((line, lineIndex) => {
                    const lineFrame = timing.outputStart + lineIndex * OUTPUT_LINE_STAGGER;
                    const lineSpring = spring({
                      frame: Math.max(0, frame - lineFrame),
                      fps,
                      config: SPRING_SNAPPY,
                    });
                    const lineX = interpolate(lineSpring, [0, 1], [-40, 0]);
                    const lineOp = lineSpring;

                    return (
                      <div
                        key={lineIndex}
                        style={{
                          fontFamily: fontFamily,
                          fontSize: 44,
                          fontWeight: 700,
                          color: "rgba(34,197,94,0.9)",
                          backgroundColor: "rgba(34,197,94,0.05)",
                          borderRadius: 4,
                          opacity: lineOp,
                          transform: `translateX(${lineX}px)`,
                          paddingLeft: 20,
                          whiteSpace: "pre",
                          marginBottom: 2,
                        }}
                      >
                        {line}
                      </div>
                    );
                  })}

                  {/* Gap between commands */}
                  {cmdIndex < commands.length - 1 && (
                    <div style={{ height: 16 }} />
                  )}
                </React.Fragment>
              );
            })}

            {/* Terminal blinking cursor at the end (after last command finishes) */}
            {commandTimings.length > 0 && frame >= commandTimings[commandTimings.length - 1].totalEnd && (
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: fontFamily,
                    fontSize: 52,
                    fontWeight: 700,
                    color: accentColor,
                    opacity: 0.5 + Math.sin(frame * 0.15) * 0.3,
                  }}
                >
                  {prompt}
                </span>
                <span
                  style={{
                    fontFamily: fontFamily,
                    fontSize: 52,
                    fontWeight: 700,
                    color: accentColor,
                    opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                  }}
                >
                  |
                </span>
              </div>
            )}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
