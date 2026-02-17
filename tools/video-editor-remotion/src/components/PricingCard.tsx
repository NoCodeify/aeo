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

// Checkmark SVG
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

interface PricingCardProps {
  speakerSrc?: string;
  startFrom?: number;
  name: string;
  price: string;
  period?: string;
  features: string[];
  badge?: string;
  accentColor?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  speakerSrc,
  startFrom,
  name,
  price,
  period = "/mo",
  features,
  badge,
  accentColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // === Phase 1: Card slides up with spring (frames 0-15) ===
  const cardSpring = spring({ frame, fps, config: SPRING_SNAPPY });
  const cardY = interpolate(cardSpring, [0, 1], [300, 0]);
  const cardOpacity = cardSpring;

  // === Phase 2: Name appears (frame 8) ===
  const nameDelay = 8;
  const nameOpacity = interpolate(frame, [nameDelay, nameDelay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Phase 3: Price appears (frame 16) ===
  const priceDelay = 16;
  const priceScale = popScale(frame, priceDelay, 1.08);
  const priceOpacity = interpolate(frame, [priceDelay, priceDelay + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Phase 4: Features check in one by one (staggered 8 frames, starting frame 28) ===
  const featuresStart = 28;
  const featureStagger = 8;

  // === Phase 5: Badge pops in (after last feature) ===
  const badgeFrame = featuresStart + features.length * featureStagger + 4;
  const badgeScale = badge ? popScale(frame, badgeFrame, 1.15) : 0;
  const badgeOpacity = badge
    ? interpolate(frame, [badgeFrame, badgeFrame + 6], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const badgeShineProgress = badge
    ? interpolate(frame, [badgeFrame + 2, badgeFrame + 14], [-0.3, 1.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : -1;

  // === Phase 6: Card border pulse (starts after features complete) ===
  const pulseStart = featuresStart + features.length * featureStagger;
  const glowIntensity =
    frame >= pulseStart
      ? interpolate(
          frame,
          [pulseStart, pulseStart + 10, pulseStart + 20],
          [0, 0.6, 0.3],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      : 0;

  // === Phase 7: Mouse cursor enters and clicks ===
  const clickPercent = 0.7;
  const clickFrame = Math.round(durationInFrames * clickPercent);
  const cursorEnterFrame = clickFrame - 20;

  // Cursor position: enters from right, moves to card center
  const cursorStartX = 1920 + 200; // off screen right
  const cursorStartY = 600;
  const cursorEndX = 1920; // card center
  const cursorEndY = 1080; // card center

  const cursorProgress = interpolate(
    frame,
    [cursorEnterFrame, clickFrame - 4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  // Ease out cubic for natural cursor movement
  const easedProgress = 1 - Math.pow(1 - cursorProgress, 3);

  const cursorX = cursorStartX + (cursorEndX - cursorStartX) * easedProgress;
  const cursorY = cursorStartY + (cursorEndY - cursorStartY) * easedProgress;
  const cursorVisible = frame >= cursorEnterFrame && frame < durationInFrames - 10;

  // Cursor press animation (scale down on click, back up)
  const cursorScale =
    frame >= clickFrame && frame < clickFrame + 6
      ? interpolate(frame, [clickFrame, clickFrame + 3, clickFrame + 6], [1, 0.7, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  // === Phase 7b: Card scale bump on click ===
  const clickBumpSpring = spring({
    frame: Math.max(0, frame - clickFrame),
    fps,
    config: SPRING_BOUNCY,
  });
  const cardScaleBump =
    frame >= clickFrame
      ? interpolate(clickBumpSpring, [0, 0.5, 1], [1.0, 1.06, 1.0])
      : 1.0;

  // Ripple ring from click point
  const rippleProgress =
    frame >= clickFrame
      ? interpolate(frame, [clickFrame, clickFrame + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  const rippleVisible = frame >= clickFrame && rippleProgress < 1;
  const rippleSize = rippleProgress * 600;
  const rippleOpacity = 1 - rippleProgress;

  // === Phase 8: Selected state after click ===
  const isSelected = frame >= clickFrame + 6;
  const selectedCheckScale = isSelected ? popScale(frame, clickFrame + 6, 1.2) : 0;
  const selectedCheckOpacity = isSelected
    ? interpolate(frame, [clickFrame + 6, clickFrame + 12], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // === Phase 9: Fade exit last 10 frames ===
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Card dimensions
  const cardWidth = 1200;

  return (
    <AbsoluteFill>
      <DarkGradientBg accentColor={accentColor} />

      {/* Boop SFX per feature */}
      {features.map((_, i) => {
        const sfxFrame = featuresStart + i * featureStagger;
        return (
          <Sequence key={`boop-${i}`} from={sfxFrame} durationInFrames={15}>
            <Audio src={staticFile("sfx/boop.mp3")} volume={0.5} />
          </Sequence>
        );
      })}

      {/* Click SFX on mouse click */}
      <Sequence from={clickFrame} durationInFrames={15}>
        <Audio src={staticFile("sfx/click.mp3")} volume={0.5} />
      </Sequence>

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: exitOpacity,
        }}
      >
        {/* Card container */}
        <div
          style={{
            transform: `translateY(${cardY}px) scale(${cardScaleBump})`,
            opacity: cardOpacity,
            position: "relative",
          }}
        >
          {/* Main card */}
          <div
            style={{
              width: cardWidth,
              ...glassMorphism(20, 0.6),
              borderRadius: 32,
              padding: "64px 80px 72px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              position: "relative",
              border: isSelected
                ? `2px solid ${accentColor}`
                : "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                glowIntensity > 0
                  ? `0 0 ${20 + glowIntensity * 60}px ${hexToRgba(accentColor, glowIntensity * 0.4)}, 0 0 ${40 + glowIntensity * 80}px ${hexToRgba(accentColor, glowIntensity * 0.2)}, 0 20px 60px rgba(0,0,0,0.5)`
                  : "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Badge (top-right) */}
            {badge && (
              <div
                style={{
                  position: "absolute",
                  top: -24,
                  right: 40,
                  backgroundColor: accentColor,
                  borderRadius: 100,
                  padding: "10px 32px",
                  opacity: badgeOpacity,
                  transform: `scale(${badgeScale})`,
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                  }}
                >
                  {badge}
                </span>
                {/* Badge shine sweep */}
                {badgeShineProgress > -0.3 && badgeShineProgress < 1.3 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 100,
                      background: `linear-gradient(135deg, transparent ${(badgeShineProgress - 0.12) * 100}%, rgba(255,255,255,0.3) ${badgeShineProgress * 100}%, transparent ${(badgeShineProgress + 0.12) * 100}%)`,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            )}

            {/* Selected checkmark (top-left corner after click) */}
            {isSelected && (
              <div
                style={{
                  position: "absolute",
                  top: -24,
                  left: 40,
                  opacity: selectedCheckOpacity,
                  transform: `scale(${selectedCheckScale})`,
                }}
              >
                <Checkmark color={accentColor} opacity={1} scale={1} />
              </div>
            )}

            {/* Plan name */}
            <div
              style={{
                fontFamily: syneFontFamily,
                fontSize: 56,
                fontWeight: 700,
                color: "#ffffff",
                textAlign: "center",
                opacity: nameOpacity,
                marginBottom: 8,
              }}
            >
              {name}
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: 8,
                opacity: priceOpacity,
                transform: `scale(${priceScale})`,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  fontFamily: syneFontFamily,
                  fontSize: 160,
                  fontWeight: 700,
                  color: accentColor,
                  lineHeight: 1,
                }}
              >
                {price}
              </span>
              {period && (
                <span
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 48,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {period}
                </span>
              )}
            </div>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "rgba(255,255,255,0.1)",
                marginBottom: 16,
              }}
            />

            {/* Features */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                width: "100%",
                paddingLeft: 32,
              }}
            >
              {features.map((feature, i) => {
                const featureFrame = featuresStart + i * featureStagger;
                const featureSpring = spring({
                  frame: Math.max(0, frame - featureFrame),
                  fps,
                  config: SPRING_BOUNCY,
                });
                const featureOpacity = interpolate(
                  frame,
                  [featureFrame, featureFrame + 6],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                const featureX = interpolate(featureSpring, [0, 1], [30, 0]);

                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                      opacity: featureOpacity,
                      transform: `translateX(${featureX}px)`,
                    }}
                  >
                    <Checkmark
                      color="#22c55e"
                      opacity={featureSpring}
                      scale={featureSpring}
                    />
                    <span
                      style={{
                        fontFamily: syneFontFamily,
                        fontSize: 48,
                        fontWeight: 700,
                        color: "#e8e4e0",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ripple ring on click */}
          {rippleVisible && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: rippleSize,
                height: rippleSize,
                borderRadius: "50%",
                border: `3px solid ${hexToRgba(accentColor, rippleOpacity)}`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Mouse cursor */}
        {cursorVisible && (
          <div
            style={{
              position: "absolute",
              left: cursorX,
              top: cursorY,
              pointerEvents: "none",
              zIndex: 100,
            }}
          >
            <MouseCursor scale={cursorScale} />
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
