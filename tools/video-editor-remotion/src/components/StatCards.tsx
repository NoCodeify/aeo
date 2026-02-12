import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
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
import { MeshGradientBg } from "./backgrounds";
import { glassMorphism, popScale, glowShadow, hexToRgba, SPRING_BOUNCY } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface StatCard {
  value: string;
  label: string;
  trend?: "up" | "down";
  trendValue?: string;
  color?: string;
}

interface StatCardsProps {
  speakerSrc?: string;
  startFrom?: number;
  cards: StatCard[];
}

const TrendArrow: React.FC<{ direction: "up" | "down"; color: string; scale: number }> = ({
  direction,
  color,
  scale,
}) => {
  const points = direction === "up" ? "12,4 4,20 20,20" : "12,20 4,4 20,4";
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      style={{ transform: `scale(${scale})` }}
    >
      <polygon points={points} fill={color} />
    </svg>
  );
};

export const StatCards: React.FC<StatCardsProps> = ({
  speakerSrc,
  startFrom,
  cards,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Exit animation (last 8 frames)
  const exitOp = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Layout: 2 = row, 3 = row of 3, 4 = 2x2
  const cardCount = cards.length;
  const useGrid = cardCount === 4;
  const gap = 48;

  return (
    <AbsoluteFill>
      <MeshGradientBg />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "200px 300px",
          opacity: exitOp,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: useGrid ? "wrap" : "nowrap",
            justifyContent: "center",
            alignItems: "center",
            gap,
            maxWidth: useGrid ? 1800 : undefined,
          }}
        >
          {cards.map((card, i) => {
            const cardColor = card.color ?? "#e63946";
            const scale = popScale(frame, i * 6, 1.08);
            const cardOpacity = scale > 0 ? 1 : 0;

            // Trend arrow bounce in
            const trendSpring = spring({
              frame: Math.max(0, frame - i * 6 - 18),
              fps,
              config: SPRING_BOUNCY,
            });

            const cardWidth = useGrid ? 820 : Math.min(700, 2800 / cardCount);

            return (
              <div
                key={i}
                style={{
                  ...glassMorphism(16, 0.55),
                  borderRadius: 32,
                  padding: "48px 56px",
                  width: cardWidth,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  opacity: cardOpacity,
                  transform: `scale(${scale})`,
                  boxShadow: glowShadow(cardColor, "medium"),
                  borderColor: hexToRgba(cardColor, 0.2),
                }}
              >
                {/* Value */}
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 96,
                    fontWeight: 700,
                    color: "#e8e4e0",
                    lineHeight: 1.1,
                    textShadow: glowShadow(cardColor, "subtle"),
                  }}
                >
                  {card.value}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 40,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.6)",
                    textAlign: "center",
                  }}
                >
                  {card.label}
                </div>

                {/* Trend */}
                {card.trend && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 8,
                      opacity: trendSpring,
                    }}
                  >
                    <TrendArrow
                      direction={card.trend}
                      color={card.trend === "up" ? "#22c55e" : "#ef4444"}
                      scale={trendSpring}
                    />
                    {card.trendValue && (
                      <div
                        style={{
                          fontFamily: syneFontFamily,
                          fontSize: 36,
                          fontWeight: 700,
                          color: card.trend === "up" ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {card.trendValue}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Speaker audio (hidden) */}
      {speakerSrc && (
        <OffthreadVideo
          src={staticFile(proxyVideo(speakerSrc))}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </AbsoluteFill>
  );
};
