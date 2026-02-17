import React, { useMemo } from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,
  Audio,

  Sequence,
  staticFile,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { proxyVideo } from "../use-proxy";
import { generateParticles, updateParticle } from "./premium-utils";

const DEFAULT_COLORS = [
  "#e63946",
  "#f1c453",
  "#2a9d8f",
  "#457b9d",
  "#e8e4e0",
  "#f77f00",
  "#d62828",
  "#7209b7",
];

interface ConfettiBurstProps {
  speakerSrc?: string;
  startFrom?: number;
  colors?: string[];
  density?: number;
}

/**
 * Particle overlay on speaker video.
 * 60-80 confetti pieces explode from center-bottom,
 * fade out after frame 30.
 */
export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
  speakerSrc,
  startFrom = 0,
  colors = DEFAULT_COLORS,
  density = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const particleCount = Math.round(70 * density);
  const particles = useMemo(
    () => generateParticles(42, particleCount, colors, 1920, 1800, 1),
    [particleCount, colors],
  );

  const particleOpacity = interpolate(
    frame,
    [0, 5, 30, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(proxyVideo(speakerSrc))}
          startFrom={startFrom}
          pauseWhenBuffering
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      <Sequence from={3} durationInFrames={15}>
        <Audio src={staticFile("sfx/achievement-ding.mp3")} volume={0.1} />
      </Sequence>

      {/* Confetti particles */}
      <AbsoluteFill style={{ pointerEvents: "none", opacity: particleOpacity }}>
        {particles.map((p) => {
          const pos = updateParticle(p, frame);
          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: p.color,
                transform: `rotate(${pos.rotation}deg) scale(${p.scale})`,
                opacity: particleOpacity,
              }}
            />
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
