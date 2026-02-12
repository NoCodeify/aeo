import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { LightLeak } from "@remotion/light-leaks";

interface LightLeakOverlayProps {
  speakerSrc?: string;
  startFrom?: number;
  seed?: number;
  hueShift?: number;
}

export const LightLeakOverlay: React.FC<LightLeakOverlayProps> = ({
  speakerSrc,
  startFrom,
  seed = 3,
  hueShift = 30,
}) => {
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

      {/* Light leak overlay */}
      <AbsoluteFill style={{ mixBlendMode: "screen", filter: `hue-rotate(${hueShift}deg)` }}>
        <LightLeak seed={seed} hueShift={hueShift} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
