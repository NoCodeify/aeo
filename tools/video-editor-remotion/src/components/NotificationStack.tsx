import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
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
import {
  SPRING_BOUNCY,
  SPRING_SNAPPY,
  glassMorphism,
  hexToRgba,
  popScale,
  glowShadow,
} from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface NotificationItem {
  title: string;
  body: string;
  icon?: string;
}

interface NotificationStackProps {
  speakerSrc?: string;
  startFrom?: number;
  notifications: NotificationItem[];
  accentColor?: string;
}

export const NotificationStack: React.FC<NotificationStackProps> = ({
  speakerSrc,
  startFrom,
  notifications,
  accentColor = "#3b82f6",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const staggerGap = 20; // frames between each notification entrance
  const cardWidth = 1600;
  const cardHeight = 180;
  const cardRadius = 24;
  const cardGap = 20;
  const iconSize = 56;
  const baseTop = 120;

  // Fade exit in last 10 frames (all together)
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      {speakerSrc && (
        <OffthreadVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Boop SFX for each notification */}
      {notifications.map((_, i) => {
        const entranceFrame = i * staggerGap;
        return (
          <Sequence key={`sfx-${i}`} from={entranceFrame} durationInFrames={15}>
            <Audio src={staticFile("sfx/bubble-pop.mp3")} volume={0.4} />
          </Sequence>
        );
      })}

      {/* Notifications container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: baseTop,
          gap: cardGap,
          opacity: exitOpacity,
          pointerEvents: "none",
        }}
      >
        {notifications.map((notification, i) => {
          const entranceFrame = i * staggerGap;
          const localFrame = Math.max(0, frame - entranceFrame);

          // Slide down from top with snappy spring
          const slideSpring = spring({
            frame: localFrame,
            fps,
            config: SPRING_SNAPPY,
          });

          const translateY = interpolate(slideSpring, [0, 1], [-300, 0]);
          const opacity = interpolate(slideSpring, [0, 1], [0, 1]);

          // Glow pulse on card border when notification arrives
          const glowPulse = interpolate(localFrame, [0, 8, 20], [0, 0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          // Icon circle scale pulse on entrance
          const iconPulse = interpolate(localFrame, [0, 6, 12], [0.8, 1.1, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          // Later notifications push earlier ones down - earlier ones also scale down slightly
          // Count how many notifications have appeared after this one
          const appearedAfter = notifications.filter(
            (_, j) => j > i && frame >= j * staggerGap
          ).length;

          const scaleDown = Math.pow(0.97, appearedAfter);

          // Get icon letter (first char of icon prop, or first char of title)
          const iconLetter = notification.icon
            ? notification.icon.charAt(0).toUpperCase()
            : notification.title.charAt(0).toUpperCase();

          return (
            <div
              key={i}
              style={{
                width: cardWidth,
                minHeight: cardHeight,
                borderRadius: cardRadius,
                ...glassMorphism(20, 0.7),
                padding: "32px 40px",
                display: "flex",
                alignItems: "center",
                gap: 28,
                transform: `translateY(${translateY}px) scale(${scaleDown})`,
                opacity,
                boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${hexToRgba(accentColor, 0.1 + glowPulse * 0.4)}, 0 0 ${glowPulse * 30}px ${hexToRgba(accentColor, glowPulse * 0.3)}`,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: iconSize,
                  height: iconSize,
                  borderRadius: "50%",
                  backgroundColor: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transform: `scale(${iconPulse})`,
                }}
              >
                <span
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  {iconLetter}
                </span>
              </div>

              {/* Text content */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 48,
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {notification.title}
                </div>
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 40,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical" as const,
                  }}
                >
                  {notification.body}
                </div>
              </div>

              {/* Timestamp (cosmetic) */}
              <div
                style={{
                  fontFamily: syneFontFamily,
                  fontSize: 32,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.35)",
                  flexShrink: 0,
                }}
              >
                now
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
