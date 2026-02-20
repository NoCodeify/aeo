import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { SafeAudio as Audio } from "./SafeAudio";
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

type SearchEngine = "google" | "chatgpt" | "gemini";

interface SearchBarProps {
  speakerSrc?: string;
  startFrom?: number;
  query: string;
  engine?: SearchEngine;
  results?: string[];
  accentColor?: string;
}

// Engine configs
const ENGINE_COLORS: Record<SearchEngine, string> = {
  google: "#4285f4",
  chatgpt: "#10a37f",
  gemini: "#8e44ad",
};

const ENGINE_LABELS: Record<SearchEngine, string> = {
  google: "Google",
  chatgpt: "ChatGPT",
  gemini: "Gemini",
};

// Google "G" icon
const GoogleIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// ChatGPT icon
const ChatGPTIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#10a37f" />
    <path d="M8 12.5l2.5 2.5L16 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Gemini icon
const GeminiIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#8e44ad" />
    <path d="M12 5v14M7 8l5 4 5-4M7 16l5-4 5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// SVG mouse cursor
const MouseCursor: React.FC<{ scale: number }> = ({ scale }) => (
  <svg
    width="96"
    height="120"
    viewBox="0 0 24 30"
    fill="none"
    style={{
      filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.7))",
      transform: `scale(${scale})`,
      transformOrigin: "4px 1px",
    }}
  >
    <path
      d="M4 1L4 21L9.5 16L14.5 25L17.5 23.5L12.5 14.5L19.5 13L4 1Z"
      fill="white"
      stroke="rgba(0,0,0,0.5)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

const EngineIcon: React.FC<{ engine: SearchEngine; size: number }> = ({ engine, size }) => {
  switch (engine) {
    case "google":
      return <GoogleIcon size={size} />;
    case "chatgpt":
      return <ChatGPTIcon size={size} />;
    case "gemini":
      return <GeminiIcon size={size} />;
  }
};

export const SearchBar: React.FC<SearchBarProps> = ({
  speakerSrc,
  startFrom,
  query,
  engine = "google",
  results = [],
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const accent = accentColor ?? ENGINE_COLORS[engine];
  const engineLabel = ENGINE_LABELS[engine];

  // === TIMING ===
  const barEntrance = 0; // bar slides up
  const cursorEnter = 20; // cursor appears
  const cursorArriveBar = 35; // cursor reaches search bar
  const clickBar = 37; // click on bar
  const typeStart = 45; // start typing query
  const charsPerSec = 12;
  const typeDuration = Math.ceil((query.length / charsPerSec) * fps);
  const typeEnd = typeStart + typeDuration;
  const cursorMoveToButton = typeEnd + 5;
  const cursorArriveButton = cursorMoveToButton + 12;
  const clickButton = cursorArriveButton + 2;
  const loadingStart = clickButton + 5;
  const loadingEnd = loadingStart + 30; // 3 pulses over ~30 frames
  const resultsStart = loadingEnd;

  // === Bar entrance spring ===
  const barSpring = spring({ frame, fps, config: SPRING_BOUNCY });
  const barY = interpolate(barSpring, [0, 1], [200, 0]);

  // === Blinking text cursor ===
  const textCursorVisible = Math.floor(frame / 8) % 2 === 0;

  // === Typed characters ===
  const typedChars = frame >= typeStart
    ? Math.min(Math.floor(((frame - typeStart) / fps) * charsPerSec), query.length)
    : 0;
  const typingDone = typedChars >= query.length;

  // === Mouse cursor position ===
  // Phase 1: enter from right, move to search bar
  const cursorPhase1Progress = interpolate(
    frame,
    [cursorEnter, cursorArriveBar],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  // Phase 2: move from bar to search button
  const cursorPhase2Progress = interpolate(
    frame,
    [cursorMoveToButton, cursorArriveButton],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  // Cursor positions (in frame coords)
  const barCenterX = 1920; // center of 3840
  const barCenterY = 3840 * 0.25 + 60; // paddingTop 25% is % of width (CSS rule) + half bar height
  const startCursorX = 3400;
  const startCursorY = 1400;
  const barClickX = barCenterX - 200;
  const barClickY = barCenterY;
  const buttonX = barCenterX + 1050; // right side of bar where button is
  const buttonY = barCenterY;

  let cursorX: number;
  let cursorY: number;

  if (frame < cursorMoveToButton) {
    cursorX = interpolate(cursorPhase1Progress, [0, 1], [startCursorX, barClickX]);
    cursorY = interpolate(cursorPhase1Progress, [0, 1], [startCursorY, barClickY]);
  } else {
    cursorX = interpolate(cursorPhase2Progress, [0, 1], [barClickX, buttonX]);
    cursorY = interpolate(cursorPhase2Progress, [0, 1], [barClickY, buttonY]);
  }

  // Cursor opacity
  const cursorOp = interpolate(frame, [cursorEnter, cursorEnter + 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor click scales
  const clickBarScale = interpolate(
    frame,
    [clickBar, clickBar + 2, clickBar + 4, clickBar + 6],
    [1, 0.7, 0.7, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const clickButtonScale = interpolate(
    frame,
    [clickButton, clickButton + 2, clickButton + 4, clickButton + 6],
    [1, 0.7, 0.7, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cursorScale = frame >= cursorMoveToButton ? clickButtonScale : clickBarScale;

  // === Bar focus glow ===
  const barFocused = frame >= clickBar;
  const focusGlow = interpolate(
    frame,
    [clickBar, clickBar + 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Loading pulse ===
  const loadingActive = frame >= loadingStart && frame < loadingEnd;
  const loadingPulse = loadingActive
    ? Math.sin(((frame - loadingStart) / 10) * Math.PI * 2) * 0.5 + 0.5
    : 0;

  const spinAngle = loadingActive
    ? interpolate(frame, [loadingStart, loadingEnd], [0, 720], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // === Exit fade ===
  const exitOp = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Cursor exit ===
  const cursorExitOp = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames - 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {/* Background */}
      <DarkGradientBg accentColor={accent} />

      {/* Speaker audio only */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}

      {/* Keyboard typing SFX during query entry */}
      <Sequence from={typeStart} durationInFrames={typeDuration}>
        <Audio src={staticFile("sfx/keyboard-typing.mp3")} volume={0.3} loop />
      </Sequence>

      {/* Bar click SFX */}
      <Sequence from={clickBar} durationInFrames={15}>
        <Audio src={staticFile("sfx/click.mp3")} volume={0.5} />
      </Sequence>

      {/* Button click SFX */}
      <Sequence from={clickButton} durationInFrames={15}>
        <Audio src={staticFile("sfx/click.mp3")} volume={0.5} />
      </Sequence>

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "25%",
          opacity: exitOp,
        }}
      >
        {/* Search bar */}
        <div
          style={{
            transform: `translateY(${barY}px)`,
            display: "flex",
            alignItems: "center",
            width: 2400,
            height: 120,
            borderRadius: 60,
            ...glassMorphism(20, 0.6),
            boxShadow: barFocused
              ? `0 0 ${20 + focusGlow * 40}px ${hexToRgba(accent, 0.15 + focusGlow * 0.2)}, 0 4px 20px rgba(0,0,0,0.4)`
              : `0 4px 20px rgba(0,0,0,0.4)`,
            padding: "0 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Engine icon + label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingLeft: 20,
              paddingRight: 24,
              borderRight: "1px solid rgba(255,255,255,0.1)",
              height: 70,
              flexShrink: 0,
            }}
          >
            <EngineIcon engine={engine} size={44} />
            <span
              style={{
                fontFamily: syneFontFamily,
                fontSize: 40,
                fontWeight: 700,
                color: accent,
                whiteSpace: "nowrap",
              }}
            >
              {engineLabel}
            </span>
          </div>

          {/* Query text area */}
          <div
            style={{
              flex: 1,
              paddingLeft: 32,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontFamily: syneFontFamily,
                fontSize: 48,
                fontWeight: 700,
                color: "#ffffff",
                whiteSpace: "nowrap",
              }}
            >
              {query.slice(0, typedChars)}
            </span>
            {/* Blinking cursor */}
            {!typingDone && frame >= clickBar && (
              <span
                style={{
                  fontFamily: syneFontFamily,
                  fontSize: 48,
                  fontWeight: 700,
                  color: accent,
                  opacity: textCursorVisible ? 1 : 0,
                  marginLeft: 2,
                }}
              >
                |
              </span>
            )}
          </div>

          {/* Search button */}
          <div
            style={{
              width: 200,
              height: 80,
              borderRadius: 40,
              backgroundColor: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginRight: 4,
              boxShadow: `0 0 20px ${hexToRgba(accent, 0.3)}`,
            }}
          >
            {loadingActive ? (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${spinAngle}deg)` }}>
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" fill="none" />
                <path d="M12 3a9 9 0 0 1 9 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.5" />
                <path d="M16.5 16.5L21 21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </div>

          {/* Loading pulse overlay */}
          {loadingActive && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 60,
                boxShadow: `inset 0 0 ${30 + loadingPulse * 40}px ${hexToRgba(accent, loadingPulse * 0.3)}`,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Result cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 32,
            width: 2200,
          }}
        >
          {results.map((result, i) => {
            const resultFrame = resultsStart + i * 8;
            const resultSpring = spring({
              frame: Math.max(0, frame - resultFrame),
              fps,
              config: SPRING_SNAPPY,
            });
            const resultY = interpolate(resultSpring, [0, 1], [40, 0]);
            const resultOp = resultSpring;

            const firstResultGlow = i === 0
              ? interpolate(frame, [resultFrame, resultFrame + 6, resultFrame + 18], [0, 0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
              : 0;

            return (
              <React.Fragment key={i}>
                {/* Result entrance SFX */}
                {frame >= resultFrame && frame < resultFrame + 2 && (
                  <Sequence from={resultFrame} durationInFrames={15}>
                    <Audio src={staticFile("sfx/boop.mp3")} volume={0.35} />
                  </Sequence>
                )}
                <div
                  style={{
                    ...glassMorphism(14, 0.5),
                    borderRadius: 20,
                    padding: "28px 44px",
                    opacity: resultOp,
                    transform: `translateY(${resultY}px)`,
                    boxShadow: firstResultGlow > 0
                      ? `0 0 ${20 + firstResultGlow * 30}px ${hexToRgba(accent, firstResultGlow * 0.3)}, inset 0 0 0 2px ${hexToRgba(accent, firstResultGlow * 0.5)}`
                      : undefined,
                  }}
                >
                  <div
                    style={{
                      fontFamily: syneFontFamily,
                      fontSize: 44,
                      fontWeight: 700,
                      color: "#e8e4e0",
                      lineHeight: 1.3,
                    }}
                  >
                    {result}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Mouse cursor */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          opacity: cursorOp * cursorExitOp,
          pointerEvents: "none",
          zIndex: 100,
        }}
      >
        <MouseCursor scale={cursorScale} />
      </div>
    </AbsoluteFill>
  );
};
