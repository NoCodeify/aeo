import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import { glassMorphism, glowShadow, popScale } from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface FreezeFrameProps {
  speakerSrc?: string;
  startFrom?: number;
  text?: string;
  style?: "record_scratch" | "pause";
}

/**
 * Freeze frame effect - holds the speaker video with desaturation/contrast
 * to signal a frozen moment. Optional text annotation and vignette.
 * "record_scratch" adds zoom + vignette, "pause" is a clean freeze.
 */
export const FreezeFrame: React.FC<FreezeFrameProps> = ({
  speakerSrc,
  startFrom,
  text,
  style = "pause",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const hasSpeaker = !!speakerSrc;
  const isRecordScratch = style === "record_scratch";

  // Filter transition: animate over 4 frames
  const filterProgress = interpolate(frame, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sat = interpolate(filterProgress, [0, 1], [1, 0.6]);
  const cont = interpolate(filterProgress, [0, 1], [1, 1.2]);
  const freezeFilter = `saturate(${sat}) contrast(${cont})`;

  // Vignette fades in over 6 frames
  const vignetteOp = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text entrance: pop starting at frame 4
  const textScaleVal = popScale(frame, 4);
  const textOp = interpolate(frame, [4, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      {/* Frozen speaker video */}
      {hasSpeaker && (
        <AbsoluteFill
          style={{
            transform: isRecordScratch ? "scale(1.05)" : undefined,
          }}
        >
          <SmartVideo
            src={staticFile(speakerSrc)}
            startFrom={startFrom ?? 0}
            pauseWhenBuffering
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: freezeFilter,
            }}
          />
        </AbsoluteFill>
      )}

      {/* Vignette for record_scratch style */}
      {isRecordScratch && (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
            pointerEvents: "none",
            opacity: vignetteOp,
          }}
        />
      )}

      {/* Optional text annotation */}
      {text && (
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: syneFontFamily,
              fontSize: 80,
              fontWeight: 700,
              color: "#e8e4e0",
              textShadow: glowShadow("#e8e4e0", "medium"),
              padding: "16px 60px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              backgroundColor: "rgba(10,10,20,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              transform: `scale(${textScaleVal})`,
              opacity: textOp,
            }}
          >
            {text}
          </div>
        </div>
      )}

      {/* Speaker audio (hidden) */}
      {hasSpeaker && (
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
