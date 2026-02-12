import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { hexToRgba } from "./premium-utils";

// === DarkGradientBg ===
// Radial gradient (#1a1a2e -> #0a0a0f) + accent glow at bottom + vignette
interface DarkGradientBgProps {
  accentColor?: string;
}

export const DarkGradientBg: React.FC<DarkGradientBgProps> = ({
  accentColor = "#e63946",
}) => {
  return (
    <AbsoluteFill>
      {/* Base gradient */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at 50% 40%, #1a1a2e 0%, #0f0f1a 50%, #0a0a0f 100%)",
        }}
      />
      {/* Accent glow at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 2400,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${hexToRgba(accentColor, 0.12)} 0%, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// === MeshGradientBg ===
// 3 animated blurred color blobs orbiting slowly (frame-driven) + vignette
interface MeshGradientBgProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

export const MeshGradientBg: React.FC<MeshGradientBgProps> = ({
  color1 = "#e63946",
  color2 = "#457b9d",
  color3 = "#2a9d8f",
}) => {
  const frame = useCurrentFrame();
  const t = frame * 0.008; // slow orbit

  const blobs = [
    {
      color: color1,
      x: 35 + Math.sin(t) * 15,
      y: 30 + Math.cos(t * 0.7) * 12,
    },
    {
      color: color2,
      x: 65 + Math.cos(t * 0.9) * 12,
      y: 55 + Math.sin(t * 1.1) * 10,
    },
    {
      color: color3,
      x: 45 + Math.sin(t * 0.6 + 2) * 18,
      y: 70 + Math.cos(t * 0.8 + 1) * 14,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a14" }}>
      {blobs.map((blob, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: 1200,
            height: 1200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${hexToRgba(blob.color, 0.2)} 0%, transparent 70%)`,
            filter: "blur(100px)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      ))}
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// === BlurredSpeakerBg ===
// Speaker video at blur(50px) scale(1.1) + dark overlay
interface BlurredSpeakerBgProps {
  speakerSrc: string;
  startFrom: number;
}

export const BlurredSpeakerBg: React.FC<BlurredSpeakerBgProps> = ({
  speakerSrc,
  startFrom,
}) => {
  return (
    <AbsoluteFill>
      {/* Blurred speaker */}
      <OffthreadVideo
        src={staticFile(speakerSrc)}
        startFrom={startFrom}
        pauseWhenBuffering
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(50px) brightness(0.4)",
          transform: "scale(1.1)",
        }}
      />
      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          pointerEvents: "none",
        }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
