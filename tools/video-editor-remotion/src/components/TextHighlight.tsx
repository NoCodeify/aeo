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

// Mouse cursor SVG
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

// Text I-beam cursor SVG (for text selection/drag phase)
const TextIBeam: React.FC<{ scale: number }> = ({ scale }) => (
  <svg
    width="64"
    height="96"
    viewBox="0 0 16 24"
    fill="none"
    style={{
      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.7))",
      transform: `scale(${scale})`,
      transformOrigin: "8px 12px",
    }}
  >
    {/* Top serif */}
    <line x1="4" y1="2" x2="12" y2="2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Vertical beam */}
    <line x1="8" y1="2" x2="8" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Bottom serif */}
    <line x1="4" y1="22" x2="12" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

interface TextHighlightProps {
  speakerSrc?: string;
  startFrom?: number;
  paragraph: string;
  highlight: string;
  accentColor?: string;
}

export const TextHighlight: React.FC<TextHighlightProps> = ({
  speakerSrc,
  startFrom,
  paragraph,
  highlight,
  accentColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Split the paragraph into 3 parts based on the highlight
  const highlightIndex = paragraph.indexOf(highlight);
  const beforeText = highlightIndex >= 0 ? paragraph.slice(0, highlightIndex) : paragraph;
  const highlightText = highlightIndex >= 0 ? highlight : "";
  const afterText =
    highlightIndex >= 0 ? paragraph.slice(highlightIndex + highlight.length) : "";

  // === Phase timing ===

  // Phase 1: Paragraph fades in (frames 0-15)
  const paragraphOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const paragraphY = interpolate(frame, [0, 15], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Mouse cursor enters from right (frames 20-35)
  const cursorEnterFrame = 20;
  const cursorArriveFrame = 35;

  // Cursor starts off-screen right, arrives at highlight start position
  // Position relative to text card center
  const cursorStartX = 1920 + 200;
  const cursorStartY = 800;
  // Target: roughly where the highlight starts in the text block
  // Approximate: highlight starts roughly proportionally through the text
  const textProportion = highlightIndex >= 0 ? highlightIndex / paragraph.length : 0.3;
  const cursorTargetX = 720 + textProportion * 2000; // approximate x in card
  const cursorTargetY = 995; // approximate vertical center of text

  const cursorEnterProgress = interpolate(
    frame,
    [cursorEnterFrame, cursorArriveFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const easedEnter = 1 - Math.pow(1 - cursorEnterProgress, 3);

  const cursorX = cursorStartX + (cursorTargetX - cursorStartX) * easedEnter;
  const cursorY = cursorStartY + (cursorTargetY - cursorStartY) * easedEnter;

  // Phase 3: Click + drag to highlight (frames 38-58)
  const dragStartFrame = cursorArriveFrame + 3;
  const highlightDuration = 20;
  const dragEndFrame = dragStartFrame + highlightDuration;

  // Highlight sweep progress (0 to 1 = characters highlighted)
  const highlightProgress = interpolate(
    frame,
    [dragStartFrame, dragEndFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Cursor moves across the highlight during drag
  const highlightWidthApprox = (highlight.length / paragraph.length) * 2000 + 600;
  const dragCursorX =
    frame >= dragStartFrame
      ? cursorTargetX + highlightProgress * highlightWidthApprox
      : cursorTargetX;
  const activeCursorX = frame >= dragStartFrame ? dragCursorX : cursorX;

  const cursorVisible = frame >= cursorEnterFrame && frame < durationInFrames - 10;

  // Phase 4: Release + zoom (5 frames after highlight complete)
  const releaseFrame = dragEndFrame + 5;
  const zoomDuration = 15;

  // Boop SFX on zoom
  const boopFrame = releaseFrame;

  // Highlighted text scales up and moves center
  const zoomSpring = spring({
    frame: Math.max(0, frame - releaseFrame),
    fps,
    config: SPRING_BOUNCY,
  });

  const highlightScale =
    frame >= releaseFrame
      ? interpolate(zoomSpring, [0, 1], [1.0, 1.4])
      : 1.0;

  // Dim the rest of the text
  const restDim =
    frame >= releaseFrame
      ? interpolate(zoomSpring, [0, 1], [1.0, 0.2])
      : 1.0;

  // Glow on zoomed highlight
  const highlightGlow =
    frame >= releaseFrame
      ? interpolate(zoomSpring, [0, 1], [0, 1])
      : 0;

  // Phase 5: Hold for ~30 frames after zoom settles (handled by remaining duration)

  // Phase 6: Fade exit last 10 frames
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

  // Background color of highlight selection
  const selectionBgOpacity =
    highlightProgress > 0 ? highlightProgress * 0.3 : 0;

  // After release, the highlight has full background
  const isZoomed = frame >= releaseFrame;

  // For the character-by-character reveal, calculate how many chars are highlighted
  const highlightedChars = Math.round(highlightProgress * highlightText.length);

  return (
    <AbsoluteFill>
      <DarkGradientBg accentColor={accentColor} />

      {/* Boop SFX on zoom */}
      <Sequence from={boopFrame} durationInFrames={15}>
        <Audio src={staticFile("sfx/boop.mp3")} volume={0.5} />
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
        {/* Text card */}
        <div
          style={{
            ...glassMorphism(16, 0.55),
            borderRadius: 32,
            padding: "80px 100px",
            maxWidth: 2800,
            opacity: paragraphOpacity,
            transform: `translateY(${paragraphY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.6,
              color: "#ffffff",
              textAlign: "left",
            }}
          >
            {/* Before highlight */}
            <span
              style={{
                opacity: restDim,
                transition: "opacity 0.1s",
              }}
            >
              {beforeText}
            </span>

            {/* Highlight span */}
            <span
              style={{
                position: "relative",
                display: "inline",
                transform: isZoomed ? `scale(${highlightScale})` : undefined,
                transformOrigin: "center center",
                ...(isZoomed
                  ? {
                      display: "inline-block",
                      transform: `scale(${highlightScale})`,
                      boxShadow: highlightGlow > 0
                        ? glowShadow(accentColor, "medium")
                        : "none",
                      borderRadius: 8,
                      padding: "4px 8px",
                      margin: "0 4px",
                    }
                  : {}),
              }}
            >
              {/* Character-by-character highlight during drag */}
              {!isZoomed ? (
                <>
                  {/* Highlighted portion (with background) */}
                  <span
                    style={{
                      backgroundColor:
                        highlightedChars > 0
                          ? hexToRgba(accentColor, 0.3)
                          : "transparent",
                      borderRadius: 4,
                      padding: highlightedChars > 0 ? "2px 0" : 0,
                    }}
                  >
                    {highlightText.slice(0, highlightedChars)}
                  </span>
                  {/* Remaining unhighlighted portion */}
                  <span>{highlightText.slice(highlightedChars)}</span>
                </>
              ) : (
                // Zoomed state: full highlight with accent background
                <span
                  style={{
                    backgroundColor: hexToRgba(accentColor, 0.3),
                    borderRadius: 4,
                    padding: "2px 0",
                  }}
                >
                  {highlightText}
                </span>
              )}
            </span>

            {/* After highlight */}
            <span
              style={{
                opacity: restDim,
                transition: "opacity 0.1s",
              }}
            >
              {afterText}
            </span>
          </div>
        </div>

        {/* Mouse cursor */}
        {cursorVisible && (
          <div
            style={{
              position: "absolute",
              left: activeCursorX,
              top: cursorY,
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            {frame >= dragStartFrame ? (
              <TextIBeam scale={1} />
            ) : (
              <MouseCursor scale={1} />
            )}
          </div>
        )}
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
