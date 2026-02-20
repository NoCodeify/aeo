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
import { SPRING_BOUNCY, glassMorphism, hexToRgba } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

type CtaStyle = "offer" | "subscribe" | "next_video";

interface CtaOverlayProps {
  speakerSrc?: string;
  startFrom?: number;
  text: string;
  subtitle?: string;
  style?: CtaStyle;
  accentColor?: string;
}

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

// SVG checkmark
const Checkmark: React.FC<{ color: string; opacity: number; scale: number }> = ({
  color,
  opacity,
  scale,
}) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    style={{ opacity, transform: `scale(${scale})` }}
  >
    <circle cx="12" cy="12" r="11" fill={color} opacity={0.9} />
    <path
      d="M7 12.5L10.5 16L17 9"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CtaOverlay: React.FC<CtaOverlayProps> = ({
  speakerSrc,
  startFrom,
  text,
  subtitle,
  style: ctaStyle = "offer",
  accentColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // === Card entrance: slide up from bottom ===
  const enterSpring = spring({ frame, fps, config: SPRING_BOUNCY });
  const cardY = interpolate(enterSpring, [0, 1], [400, 0]);

  // === Card exit: slide down in last 14 frames ===
  const exitY = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [0, 400],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitOp = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Timing ===
  const cursorEnter = 20;
  const cursorArrive = 40;
  const clickDown = 44;
  const clickUp = 48;
  const clickDone = 52;

  // === Mouse cursor: absolute position in frame ===
  const startX = width * 0.82;
  const startY = height * 0.95;
  const endX = width * 0.58;
  const endY = height - 200;

  const cursorProgress = interpolate(
    frame,
    [cursorEnter, cursorArrive],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  const cursorX = interpolate(cursorProgress, [0, 1], [startX, endX]);
  const cursorY = interpolate(cursorProgress, [0, 1], [startY, endY]);

  const cursorOp = interpolate(frame, [cursorEnter, cursorEnter + 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorExitOp = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Hover glow: card brightens when cursor arrives ===
  const hoverGlow = interpolate(
    frame,
    [cursorArrive - 4, cursorArrive],
    [0.15, 0.35],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Card bg lightens slightly on hover
  const cardBgAlpha = interpolate(
    frame,
    [cursorArrive - 4, cursorArrive, clickDown, clickDone],
    [0.7, 0.6, 0.5, 0.65],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Click: cursor presses down then releases ===
  const cursorScale = interpolate(
    frame,
    [clickDown, clickDown + 2, clickUp, clickUp + 2],
    [1, 0.7, 0.7, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Card reacts: scale bump on click
  const cardClickScale = interpolate(
    frame,
    [clickDown + 1, clickDown + 4, clickDone],
    [1, 1.06, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Click ripple: ring expands from click point
  const rippleProgress = interpolate(
    frame,
    [clickDown + 2, clickDone + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const rippleScale = interpolate(rippleProgress, [0, 1], [0, 3]);
  const rippleOp = interpolate(rippleProgress, [0, 0.3, 1], [0.8, 0.5, 0]);

  // Glow pulse on click (combine hover + click)
  const clickGlow = interpolate(
    frame,
    [clickDown, clickDown + 4, clickDone + 6],
    [0, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const glowAmount = Math.max(hoverGlow, hoverGlow + clickGlow);

  // === After-click checkmark ===
  const checkOp = interpolate(
    frame,
    [clickDone, clickDone + 6, clickDone + 60, clickDone + 68],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const checkScale = interpolate(
    frame,
    [clickDone, clickDone + 4, clickDone + 8],
    [0.5, 1.15, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Diagonal shine sweep after click
  const shineProgress = interpolate(
    frame,
    [clickDone + 2, clickDone + 18],
    [-0.5, 1.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Check draw-in using stroke-dasharray
  const checkDrawProgress = interpolate(
    frame,
    [clickDone, clickDone + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtitle stagger
  const subtitleOp = interpolate(frame, [6, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displaySubtitle = subtitle ?? (
    ctaStyle === "subscribe" ? "Don't miss out"
    : ctaStyle === "next_video" ? "Watch Next"
    : "Link in Description"
  );

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Click SFX - plays at clickDown frame */}
      <Sequence from={clickDown} durationInFrames={15}>
        <Audio src={staticFile("sfx/click.mp3")} volume={0.5} />
      </Sequence>

      {/* CTA card - bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: "50%",
          transform: `translateX(-50%) translateY(${cardY + exitY}px) scale(${cardClickScale})`,
          opacity: exitOp,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            backgroundColor: `rgba(10, 10, 20, ${cardBgAlpha})`,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 28,
            padding: "44px 80px",
            boxShadow: `0 0 ${30 + glowAmount * 80}px ${hexToRgba(accentColor, glowAmount)}, 0 8px 32px rgba(0,0,0,0.5)`,
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 68,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            {text}
          </div>
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 40,
              fontWeight: 700,
              color: accentColor,
              lineHeight: 1.2,
              opacity: subtitleOp,
            }}
          >
            {displaySubtitle}
          </div>

          {/* After-click checkmark with stroke draw-in - top right of card */}
          {checkOp > 0 && (
            <div style={{ position: "absolute", top: -20, right: -20 }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ opacity: checkOp, transform: `scale(${checkScale})` }}>
                <circle cx="12" cy="12" r="11" fill={accentColor} opacity={0.9} />
                <path
                  d="M7 12.5L10.5 16L17 9"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={20}
                  strokeDashoffset={20 * (1 - checkDrawProgress)}
                />
              </svg>
            </div>
          )}

          {/* Diagonal shine sweep after click */}
          {shineProgress > -0.5 && shineProgress < 1.5 && frame >= clickDone + 2 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 28,
                background: `linear-gradient(135deg, transparent ${(shineProgress - 0.1) * 100}%, rgba(255,255,255,0.15) ${shineProgress * 100}%, transparent ${(shineProgress + 0.1) * 100}%)`,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>

      {/* Click ripple ring */}
      {rippleProgress > 0 && rippleProgress < 1 && (
        <div
          style={{
            position: "absolute",
            left: endX - 60,
            top: endY - 60,
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: `4px solid ${accentColor}`,
            opacity: rippleOp * exitOp,
            transform: `scale(${rippleScale})`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Mouse cursor - positioned absolutely in the frame */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          opacity: cursorOp * cursorExitOp,
          pointerEvents: "none",
        }}
      >
        <MouseCursor scale={cursorScale} />
      </div>
    </AbsoluteFill>
  );
};
