import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
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
  glowShadow,
  hexToRgba,
} from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

type CalloutPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type ArrowDirection = "down" | "up" | "left" | "right";

interface CalloutAnnotationProps {
  speakerSrc?: string;
  startFrom?: number;
  text: string;
  position?: CalloutPosition;
  arrowDirection?: ArrowDirection;
  color?: string;
}

function getPositionStyles(position: CalloutPosition): React.CSSProperties {
  switch (position) {
    case "top-left":
      return { top: 240, left: 240 };
    case "top-right":
      return { top: 240, right: 240 };
    case "bottom-left":
      return { bottom: 360, left: 240 };
    case "bottom-right":
      return { bottom: 360, right: 240 };
  }
}

function getArrowPath(direction: ArrowDirection): string {
  // SVG paths for arrows pointing in each direction (within a 60x60 viewbox)
  switch (direction) {
    case "down":
      return "M30 10 L30 50 M18 38 L30 50 L42 38";
    case "up":
      return "M30 50 L30 10 M18 22 L30 10 L42 22";
    case "left":
      return "M50 30 L10 30 M22 18 L10 30 L22 42";
    case "right":
      return "M10 30 L50 30 M38 18 L50 30 L38 42";
  }
}

function getArrowOffset(
  direction: ArrowDirection,
): React.CSSProperties {
  // Position the arrow relative to the text pill based on arrow direction
  switch (direction) {
    case "down":
      return { left: "50%", top: "100%", transform: "translateX(-50%)", marginTop: 12 };
    case "up":
      return { left: "50%", bottom: "100%", transform: "translateX(-50%)", marginBottom: 12 };
    case "left":
      return { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 12 };
    case "right":
      return { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 12 };
  }
}

function getPillEntrance(direction: ArrowDirection, progress: number) {
  // Pill slides in from the arrow direction
  switch (direction) {
    case "down":
      return { translateY: interpolate(progress, [0, 1], [-30, 0]) };
    case "up":
      return { translateY: interpolate(progress, [0, 1], [30, 0]) };
    case "left":
      return { translateX: interpolate(progress, [0, 1], [40, 0]) };
    case "right":
      return { translateX: interpolate(progress, [0, 1], [-40, 0]) };
  }
}

function getPillExit(direction: ArrowDirection, frame: number, durationInFrames: number) {
  // Reverse slide out over last 8 frames
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  switch (direction) {
    case "down":
      return { translateY: interpolate(frame, [durationInFrames - 8, durationInFrames], [0, -30], clamp) };
    case "up":
      return { translateY: interpolate(frame, [durationInFrames - 8, durationInFrames], [0, 30], clamp) };
    case "left":
      return { translateX: interpolate(frame, [durationInFrames - 8, durationInFrames], [0, 40], clamp) };
    case "right":
      return { translateX: interpolate(frame, [durationInFrames - 8, durationInFrames], [0, -40], clamp) };
  }
}

export const CalloutAnnotation: React.FC<CalloutAnnotationProps> = ({
  speakerSrc,
  startFrom,
  text,
  position = "top-right",
  arrowDirection = "down",
  color = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const positionStyles = getPositionStyles(position);
  const arrowPath = getArrowPath(arrowDirection);
  const arrowOffset = getArrowOffset(arrowDirection);

  // Arrow circle entrance: bouncy spring scale
  const arrowSpring = spring({ frame, fps, config: SPRING_BOUNCY });
  const arrowScale = interpolate(arrowSpring, [0, 1], [0, 1]);

  // Arrow exit: last 8 frames
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const arrowExitScale = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0.8], clamp);
  const arrowExitOpacity = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);

  // Text pill entrance: delayed 4 frames, snappy spring
  const pillSpring = spring({ frame: Math.max(0, frame - 4), fps, config: SPRING_SNAPPY });
  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);
  const pillEntrance = getPillEntrance(arrowDirection, pillSpring);
  const pillExit = getPillExit(arrowDirection, frame, durationInFrames);
  const pillExitOpacity = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);

  // Combine pill transforms
  const pillTx = (pillEntrance.translateX ?? 0) + (pillExit.translateX ?? 0);
  const pillTy = (pillEntrance.translateY ?? 0) + (pillExit.translateY ?? 0);

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

      {/* Callout annotation */}
      <div
        style={{
          position: "absolute",
          ...positionStyles,
        }}
      >
        {/* Container for text pill + arrow */}
        <div style={{ position: "relative", display: "inline-flex" }}>
          {/* Text pill */}
          <div
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              backgroundColor: "rgba(10,10,20,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "20px 48px",
              borderTop: `4px solid ${color}`,
              borderBottom: `4px solid ${color}`,
              borderLeft: `4px solid ${color}`,
              borderRight: `4px solid ${color}`,
              opacity: pillOpacity * pillExitOpacity,
              transform: `translate(${pillTx}px, ${pillTy}px)`,
            }}
          >
            <span
              style={{
                fontFamily: syneFontFamily,
                fontSize: 56,
                fontWeight: 700,
                color: "#e8e4e0",
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </span>
          </div>

          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              ...arrowOffset,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${arrowScale * arrowExitScale})`,
                opacity: arrowExitOpacity,
                boxShadow: glowShadow(color, "medium"),
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 60 60"
                fill="none"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={arrowPath} />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Speaker audio (hidden) - only if speaker is NOT already visible */}
      {!speakerSrc && null}
    </AbsoluteFill>
  );
};
