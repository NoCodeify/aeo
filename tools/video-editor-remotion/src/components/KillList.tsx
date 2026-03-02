import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { DarkGradientBg } from "./backgrounds";
import { glowShadow, hexToRgba, popScale, staggerDelay } from "./premium-utils";

loadSyne("normal", { weights: ["700", "800"], subsets: ["latin"] });

interface KillListItem {
  name: string;
  price: string;
}

interface KillListProps {
  speakerSrc?: string;
  startFrom?: number;
  items: KillListItem[];
  /** Label above the list */
  title?: string;
  /** Replacement cost shown after all items slashed */
  replacement?: string;
  /** Accent color for the slash and total */
  color?: string;
}

/**
 * KillList - Animated SaaS subscription kill list.
 * Items appear one by one, then get slashed with a red line.
 * A running total counts up, then collapses to the replacement cost.
 *
 * Timeline usage:
 *   { type: "kill_list", start: 128.5, end: 138.5, items: [...], title: "...", replacement: "$80/mo" }
 */
export const KillList: React.FC<KillListProps> = ({
  speakerSrc,
  startFrom,
  items,
  title = "The Kill List",
  replacement = "$80/mo",
  color = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Timing: each item gets ~0.5s to appear + 0.3s to slash
  const itemAppearFrames = Math.round(fps * 0.4);
  const slashDelay = Math.round(fps * 0.25);
  const totalItems = items.length;

  // Title entrance
  const titleScale = popScale(frame, 0);
  const titleOp = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Running total
  let runningTotal = 0;

  return (
    <AbsoluteFill>
      <DarkGradientBg accentColor={color} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 120px",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: syneFontFamily,
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: 3,
            textTransform: "uppercase" as const,
            opacity: titleOp,
            transform: `scale(${titleScale})`,
            marginBottom: 48,
            textShadow: glowShadow("#ffffff", "subtle"),
          }}
        >
          {title}
        </div>

        {/* Items grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 1600,
          }}
        >
          {items.map((item, i) => {
            const appearStart = 10 + i * itemAppearFrames;
            const slashStart = appearStart + slashDelay;

            // Item entrance
            const itemOp = interpolate(frame, [appearStart, appearStart + 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const itemX = interpolate(frame, [appearStart, appearStart + 8], [60, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            });

            // Slash animation (red line across)
            const slashProgress = interpolate(frame, [slashStart, slashStart + 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });

            const isSlashed = frame >= slashStart;

            // Parse price for running total (extract number)
            const priceNum = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
            if (frame >= appearStart) runningTotal += priceNum;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: itemOp,
                  transform: `translateX(${itemX}px)`,
                  position: "relative",
                  padding: "16px 32px",
                  borderRadius: 12,
                  background: isSlashed
                    ? hexToRgba(color, 0.08)
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isSlashed ? hexToRgba(color, 0.3) : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {/* Name */}
                <span
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 48,
                    fontWeight: 700,
                    color: isSlashed ? "rgba(255,255,255,0.35)" : "#fff",
                    transition: "color 0.1s",
                  }}
                >
                  {item.name}
                </span>

                {/* Price */}
                <span
                  style={{
                    fontFamily: syneFontFamily,
                    fontSize: 48,
                    fontWeight: 700,
                    color: isSlashed ? hexToRgba(color, 0.5) : color,
                    transition: "color 0.1s",
                  }}
                >
                  {item.price}
                </span>

                {/* Slash line */}
                {slashProgress > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 16,
                      width: `${slashProgress * 100}%`,
                      height: 4,
                      background: color,
                      boxShadow: `0 0 12px ${hexToRgba(color, 0.6)}`,
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Replacement cost - appears after all items */}
        {(() => {
          const allSlashedFrame = 10 + totalItems * itemAppearFrames + slashDelay + 10;
          const replOp = interpolate(frame, [allSlashedFrame, allSlashedFrame + 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const replScale = popScale(frame, allSlashedFrame, 1.15);

          return replOp > 0 ? (
            <div
              style={{
                marginTop: 48,
                display: "flex",
                alignItems: "baseline",
                gap: 24,
                opacity: replOp,
                transform: `scale(${replScale})`,
              }}
            >
              <span
                style={{
                  fontFamily: syneFontFamily,
                  fontSize: 48,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: 2,
                  textTransform: "uppercase" as const,
                }}
              >
                Replaced by
              </span>
              <span
                style={{
                  fontFamily: syneFontFamily,
                  fontSize: 96,
                  fontWeight: 800,
                  color: "#4ade80",
                  textShadow: glowShadow("#4ade80", "strong"),
                }}
              >
                {replacement}
              </span>
            </div>
          ) : null;
        })()}
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
