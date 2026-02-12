import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { proxyVideo } from "../use-proxy";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { popScale, hexToRgba } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface CircleTimerProps {
  speakerSrc?: string;
  startFrom?: number;
  color?: string;
  label?: string;
  showNumbers?: boolean;
}

export const CircleTimer: React.FC<CircleTimerProps> = ({
  speakerSrc,
  startFrom,
  color = "#e63946",
  label,
  showNumbers = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const radius = 120;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = frame / durationInFrames;
  const dashOffset = circumference * (1 - progress);

  const countdown = Math.ceil((durationInFrames - frame) / fps);

  // Pop entrance over first 8 frames
  const scale = popScale(frame, 0, 1.15);

  // Fade out last 6 frames
  const exitOp = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const svgSize = (radius + strokeWidth) * 2 + 20;
  const center = svgSize / 2;

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      {speakerSrc && (
        <OffthreadVideo
          src={staticFile(proxyVideo(speakerSrc))}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Timer container - top right */}
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${scale})`,
          opacity: exitOp,
        }}
      >
        {/* Label above circle */}
        {label && (
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 32,
              fontWeight: 700,
              color: "#e8e4e0",
              textTransform: "uppercase" as const,
              letterSpacing: 4,
              marginBottom: 16,
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {label}
          </div>
        )}

        {/* SVG circle */}
        <div style={{ position: "relative", width: svgSize, height: svgSize }}>
          <svg
            width={svgSize}
            height={svgSize}
            style={{
              filter: `drop-shadow(0 0 20px ${hexToRgba(color, 0.4)}) drop-shadow(0 0 40px ${hexToRgba(color, 0.2)})`,
            }}
          >
            {/* Background track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={strokeWidth}
            />
            {/* Progress arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${center} ${center})`}
            />
          </svg>

          {/* Countdown number */}
          {showNumbers && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: syneFontFamily,
                fontSize: 64,
                fontWeight: 700,
                color: "#e8e4e0",
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              {countdown}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
