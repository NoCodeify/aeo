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

import {
  loadFont as loadMono,
  fontFamily as monoFontFamily,
} from "@remotion/google-fonts/JetBrainsMono";

loadMono("normal", { weights: ["400", "700"], subsets: ["latin"] });

interface BrowserMockupProps {
  speakerSrc?: string;
  startFrom?: number;
  url: string;
  pageTitle?: string;
  content: string[];
  accentColor?: string;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  speakerSrc,
  startFrom,
  url,
  pageTitle,
  content,
  accentColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // === Phase timing ===
  // Phase 1: Browser chrome slides up (frames 0-15)
  const chromeSpring = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
  });
  const chromeY = interpolate(chromeSpring, [0, 1], [200, 0]);
  const chromeOpacity = chromeSpring;

  // Phase 2: URL typing starts at frame 15
  const typingStartFrame = 15;
  const charsPerSecond = 12;
  const framesPerChar = fps / charsPerSecond;
  const typingFrames = frame - typingStartFrame;
  const typedChars = typingFrames > 0
    ? Math.min(Math.floor(typingFrames / framesPerChar), url.length)
    : 0;
  const typedUrl = url.slice(0, typedChars);
  const urlComplete = typedChars >= url.length;
  const urlCompleteFrame = typingStartFrame + Math.ceil(url.length * framesPerChar);

  // Phase 3: Loading bar sweeps after URL complete (Enter press)
  const loadingStartFrame = urlCompleteFrame + 2;
  const loadingDuration = 20;
  const loadingProgress = interpolate(
    frame,
    [loadingStartFrame, loadingStartFrame + loadingDuration],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 4: Content blocks fade in staggered after loading
  const contentStartFrame = loadingStartFrame + loadingDuration + 5;
  const contentStagger = 12;

  // Phase 5: Fade exit last 10 frames
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitScale = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0.96],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Cursor blink for URL bar
  const cursorVisible = !urlComplete && typingFrames > 0
    ? Math.floor(frame * 2 / (fps / 2)) % 2 === 0
    : false;

  // Browser dimensions
  const browserWidth = 2800;
  const titleBarHeight = 80;
  const urlBarAreaHeight = 70;
  const contentAreaHeight = 1200;
  const totalBrowserHeight = titleBarHeight + urlBarAreaHeight + contentAreaHeight;

  return (
    <AbsoluteFill>
      <DarkGradientBg accentColor={accentColor} />

      {/* Keyboard typing SFX during URL entry */}
      <Sequence from={typingStartFrame} durationInFrames={urlCompleteFrame - typingStartFrame}>
        <Audio src={staticFile("sfx/keyboard-typing.mp3")} volume={0.3} loop />
      </Sequence>

      {/* Enter key SFX (URL complete) */}
      <Sequence from={urlCompleteFrame} durationInFrames={15}>
        <Audio src={staticFile("sfx/enter.mp3")} volume={0.5} />
      </Sequence>

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: exitOpacity,
          transform: `scale(${exitScale})`,
        }}
      >
        {/* Browser window */}
        <div
          style={{
            width: browserWidth,
            opacity: chromeOpacity,
            transform: `translateY(${chromeY}px)`,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: `0 20px 80px rgba(0,0,0,0.6), 0 0 40px ${hexToRgba(accentColor, 0.1)}`,
          }}
        >
          {/* Title bar (Chrome-style) */}
          <div
            style={{
              height: titleBarHeight,
              backgroundColor: "#2d2d3d",
              display: "flex",
              alignItems: "center",
              paddingLeft: 32,
              paddingRight: 32,
              position: "relative",
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
                  boxShadow: frame >= loadingStartFrame + loadingDuration
                    ? `0 0 ${8 + Math.sin(frame * 0.2) * 6}px rgba(40, 200, 64, ${0.4 + Math.sin(frame * 0.2) * 0.3})`
                    : "none",
                }}
              />
            </div>
          </div>

          {/* URL bar area */}
          <div
            style={{
              height: urlBarAreaHeight,
              backgroundColor: "#2d2d3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 32,
              paddingRight: 32,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* URL input field */}
            <div
              style={{
                width: 1800,
                height: 48,
                backgroundColor: "#1a1a2e",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              {/* Lock icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: 12, opacity: 0.5 }}
              >
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="#888" strokeWidth="2" />
                <path d="M8 11V7a4 4 0 118 0v4" stroke="#888" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span
                style={{
                  fontFamily: monoFontFamily,
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                }}
              >
                {typedUrl}
                {cursorVisible && (
                  <span style={{ color: accentColor }}>|</span>
                )}
              </span>
            </div>
          </div>

          {/* Content area */}
          <div
            style={{
              minHeight: contentAreaHeight,
              backgroundColor: "#1a1a2e",
              padding: "60px 100px",
              display: "flex",
              flexDirection: "column",
              gap: 32,
              position: "relative",
            }}
          >
            {/* Loading bar with shimmer gradient */}
            {frame >= loadingStartFrame && loadingProgress < 100 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: 4,
                  width: `${loadingProgress}%`,
                  background: `linear-gradient(90deg, ${accentColor} 0%, ${hexToRgba(accentColor, 0.4)} 40%, #ffffff 50%, ${hexToRgba(accentColor, 0.4)} 60%, ${accentColor} 100%)`,
                  backgroundSize: "200% 100%",
                  backgroundPosition: `${interpolate(frame, [loadingStartFrame, loadingStartFrame + loadingDuration], [100, -100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}% 0`,
                  boxShadow: `0 0 12px ${hexToRgba(accentColor, 0.6)}`,
                }}
              />
            )}

            {/* Page title */}
            {pageTitle && (() => {
              const titleDelay = contentStartFrame;
              const titleOpacity = interpolate(
                frame,
                [titleDelay, titleDelay + 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const titleY = interpolate(
                frame,
                [titleDelay, titleDelay + 10],
                [20, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 64,
                    fontWeight: 700,
                    color: "#ffffff",
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    marginBottom: 16,
                  }}
                >
                  {pageTitle}
                </div>
              );
            })()}

            {/* Content blocks */}
            {content.map((block, i) => {
              const blockDelay = contentStartFrame + (pageTitle ? contentStagger : 0) + i * contentStagger;
              const blockOpacity = interpolate(
                frame,
                [blockDelay, blockDelay + 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const blockY = interpolate(
                frame,
                [blockDelay, blockDelay + 10],
                [24, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={i}
                  style={{
                    ...glassMorphism(12, 0.45),
                    borderRadius: 16,
                    padding: "32px 48px",
                    opacity: blockOpacity,
                    transform: `translateY(${blockY}px)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: syneFontFamily,
                      fontSize: 48,
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 1.5,
                    }}
                  >
                    {block}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      {/* Speaker audio (hidden) */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </AbsoluteFill>
  );
};
