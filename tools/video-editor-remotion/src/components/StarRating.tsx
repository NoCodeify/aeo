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
import {
  SPRING_BOUNCY,
  SPRING_SNAPPY,
  glassMorphism,
  hexToRgba,
  popScale,
  glowShadow,
} from "./premium-utils";
import { DarkGradientBg } from "./backgrounds";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface StarRatingProps {
  speakerSrc?: string;
  startFrom?: number;
  rating: number;
  label?: string;
  reviewCount?: string;
  color?: string;
  layout?: "full" | "split_left" | "split_right";
}

// 5-pointed star SVG path (centered in 0,0 to 100,100 viewBox)
const STAR_PATH =
  "M50 5 L61.8 38.2 L97.6 38.2 L68.9 59.5 L80.9 93.5 L50 72.5 L19.1 93.5 L31.1 59.5 L2.4 38.2 L38.2 38.2 Z";

const StarShape: React.FC<{
  filled: number; // 0 to 1
  color: string;
  size: number;
  scale: number;
}> = ({ filled, color, size, scale }) => {
  const clipId = `star-clip-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `scale(${scale})`,
        position: "relative",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Empty star (outline) */}
        <path
          d={STAR_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={2}
        />
        {/* Filled portion using clipPath */}
        <defs>
          <clipPath id={clipId}>
            <rect x={0} y={0} width={filled * 100} height={100} />
          </clipPath>
        </defs>
        <path d={STAR_PATH} fill={color} clipPath={`url(#${clipId})`} />
      </svg>
    </div>
  );
};

export const StarRating: React.FC<StarRatingProps> = ({
  speakerSrc,
  startFrom,
  rating,
  label,
  reviewCount,
  color = "#fbbf24",
  layout = "full",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const starSize = 120;
  const starGap = 24;
  const totalStars = 5;
  const staggerPerStar = 8;

  // Label fade in (first)
  const labelOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelY = interpolate(frame, [0, 10], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stars entrance starts at frame 8
  const starsStartFrame = 8;

  // Rating number pops in after all stars
  const ratingNumberFrame = starsStartFrame + totalStars * staggerPerStar + 5;
  const ratingSpring = spring({
    frame: Math.max(0, frame - ratingNumberFrame),
    fps,
    config: SPRING_BOUNCY,
  });
  const ratingScale = interpolate(ratingSpring, [0, 1], [0, 1]);

  // Review count fades below stars
  const reviewFrame = ratingNumberFrame + 10;
  const reviewOpacity = interpolate(
    frame,
    [reviewFrame, reviewFrame + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Final glow pulse
  const glowFrame = reviewFrame + 8;
  const glowIntensity = interpolate(
    frame,
    [glowFrame, glowFrame + 12, glowFrame + 24],
    [0, 0.6, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Shimmer sweep across filled stars
  const shimmerFrame = glowFrame + 4;
  const shimmerProgress = interpolate(
    frame,
    [shimmerFrame, shimmerFrame + 20],
    [-0.3, 1.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Sparkle dots around stars area
  const sparkleFrame = glowFrame;
  const sparkles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 320 + (i % 3) * 40;
    const sparkleDelay = sparkleFrame + i * 3;
    const sparkleOp = interpolate(
      frame,
      [sparkleDelay, sparkleDelay + 6, sparkleDelay + 14],
      [0, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius - 40,
      opacity: sparkleOp,
      size: 6 + (i % 3) * 3,
    };
  });

  // Fade exit in last 10 frames
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const isOverlay = !!speakerSrc;

  return (
    <AbsoluteFill>
      {/* Background: speaker video or dark gradient */}
      {isOverlay ? (
        <SmartVideo
          src={staticFile(speakerSrc!)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <DarkGradientBg accentColor={color} />
      )}

      {/* Boop SFX for each star fill */}
      {Array.from({ length: totalStars }).map((_, i) => {
        const sfxFrame = starsStartFrame + i * staggerPerStar;
        return (
          <Sequence key={`sfx-${i}`} from={sfxFrame} durationInFrames={15}>
            <Audio src={staticFile("sfx/boop.mp3")} volume={0.4} />
          </Sequence>
        );
      })}

      {/* Shimmer sweep SFX */}
      <Sequence from={shimmerFrame} durationInFrames={20}>
        <Audio src={staticFile("sfx/shimmer.mp3")} volume={0.3} />
      </Sequence>

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          opacity: exitOpacity,
        }}
      >
        {/* Label */}
        {label && (
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              opacity: labelOpacity,
              transform: `translateY(${labelY}px)`,
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
              textAlign: "center",
            }}
          >
            {label}
          </div>
        )}

        {/* Rating number */}
        <div
          style={{
            fontFamily: syneFontFamily,
            fontSize: 200,
            fontWeight: 700,
            color: "#ffffff",
            transform: `scale(${ratingScale})`,
            textShadow: glowShadow(color, "strong"),
            lineHeight: 1,
          }}
        >
          {rating.toFixed(1)}
        </div>

        {/* Stars row with sparkle container */}
        <div
          style={{
            position: "relative",
            display: "flex",
            gap: starGap,
            boxShadow:
              glowIntensity > 0
                ? `0 0 ${40 * glowIntensity}px ${hexToRgba(color, glowIntensity * 0.3)}`
                : "none",
            borderRadius: 20,
            padding: "12px 24px",
          }}
        >
          {Array.from({ length: totalStars }).map((_, i) => {
            const starFrame = starsStartFrame + i * staggerPerStar;
            const starSpring = spring({
              frame: Math.max(0, frame - starFrame),
              fps,
              config: SPRING_BOUNCY,
            });

            // Calculate fill for this star
            const starFill = Math.min(1, Math.max(0, rating - i));
            // Animate fill from 0 to target
            const animatedFill = starFill * interpolate(starSpring, [0, 1], [0, 1]);

            // Per-star glow as it fills
            const starGlow = interpolate(starSpring, [0.5, 1], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{ filter: starGlow > 0 ? `drop-shadow(0 0 ${8 + starGlow * 16}px ${hexToRgba(color, starGlow)})` : "none" }}>
                <StarShape
                  filled={animatedFill}
                  color={color}
                  size={starSize}
                  scale={starSpring}
                />
              </div>
            );
          })}

          {/* Sparkle dots */}
          {sparkles.map((sparkle, i) => (
            <div
              key={`sparkle-${i}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: sparkle.size,
                height: sparkle.size,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                opacity: sparkle.opacity,
                transform: `translate(calc(-50% + ${sparkle.x}px), calc(-50% + ${sparkle.y}px))`,
                pointerEvents: "none",
                boxShadow: `0 0 ${sparkle.size * 2}px rgba(255,255,255,0.6)`,
              }}
            />
          ))}

          {/* Shimmer sweep */}
          {frame >= shimmerFrame && shimmerProgress < 1.3 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, transparent ${(shimmerProgress - 0.15) * 100}%, rgba(255,255,255,0.25) ${shimmerProgress * 100}%, transparent ${(shimmerProgress + 0.15) * 100}%)`,
                pointerEvents: "none",
                borderRadius: 20,
              }}
            />
          )}
        </div>

        {/* Review count */}
        {reviewCount && (
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 48,
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              opacity: reviewOpacity,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            {reviewCount}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
