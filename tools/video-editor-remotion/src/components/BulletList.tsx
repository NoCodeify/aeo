import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { proxyVideo } from "../use-proxy";
import { DarkGradientBg } from "./backgrounds";
import { glassMorphism, glowShadow, SPRING_BOUNCY, hexToRgba } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface BulletListProps {
  speakerSrc?: string;
  startFrom?: number;
  items: string[];
  icon?: "check" | "arrow" | "number" | "dot";
  title?: string;
  color?: string;
}

const CheckIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4 4L19 7"
        stroke="#0a0a14"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const BulletList: React.FC<BulletListProps> = ({
  speakerSrc,
  startFrom,
  items,
  icon = "check",
  title,
  color = "#22c55e",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title entrance
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 10], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit animation (last 8 frames)
  const exitOp = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const renderIcon = (index: number, iconSpring: number) => {
    const iconSize = 52;
    const scale = iconSpring;

    const wrapStyle: React.CSSProperties = {
      transform: `scale(${scale})`,
      flexShrink: 0,
    };

    switch (icon) {
      case "check":
        return (
          <div style={wrapStyle}>
            <CheckIcon color={color} size={iconSize} />
          </div>
        );
      case "arrow":
        return (
          <div
            style={{
              ...wrapStyle,
              fontFamily: syneFontFamily,
              fontSize: 48,
              fontWeight: 700,
              color,
              width: iconSize,
              textAlign: "center",
            }}
          >
            {"\u2192"}
          </div>
        );
      case "number":
        return (
          <div
            style={{
              ...wrapStyle,
              fontFamily: syneFontFamily,
              fontSize: 44,
              fontWeight: 700,
              color,
              width: iconSize,
              textAlign: "center",
            }}
          >
            {index + 1}.
          </div>
        );
      case "dot":
        return (
          <div
            style={{
              ...wrapStyle,
              fontFamily: syneFontFamily,
              fontSize: 56,
              fontWeight: 700,
              color,
              width: iconSize,
              textAlign: "center",
              lineHeight: "0.8",
            }}
          >
            {"\u2022"}
          </div>
        );
    }
  };

  return (
    <AbsoluteFill>
      <DarkGradientBg />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 400px",
          opacity: exitOp,
        }}
      >
        {title && (
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 64,
              fontWeight: 700,
              color: "#e8e4e0",
              marginBottom: 60,
              textAlign: "center",
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              textShadow: glowShadow("#e8e4e0", "subtle"),
            }}
          >
            {title}
          </div>
        )}

        {/* Glass card container */}
        <div
          style={{
            ...glassMorphism(16, 0.55),
            borderRadius: 32,
            padding: "60px 80px",
            width: "100%",
            maxWidth: 2600,
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {items.map((item, i) => {
            const itemDelay = 10 + i * 6;

            // Icon bounce
            const iconSpring = spring({
              frame: Math.max(0, frame - itemDelay),
              fps,
              config: SPRING_BOUNCY,
            });

            // Text slide in
            const textOpacity = interpolate(frame, [itemDelay, itemDelay + 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const textX = interpolate(frame, [itemDelay, itemDelay + 8], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 32,
                }}
              >
                {renderIcon(i, iconSpring)}

                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 48,
                    fontWeight: 700,
                    color: "#e8e4e0",
                    opacity: textOpacity,
                    transform: `translateX(${textX}px)`,
                  }}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Speaker audio (hidden) */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(proxyVideo(speakerSrc))}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </AbsoluteFill>
  );
};
