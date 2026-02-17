import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  staticFile,
  useCurrentFrame,
} from "remotion";
import { proxyVideo } from "../use-proxy";
import { screenShake } from "./premium-utils";

interface ScreenShakeProps {
  speakerSrc?: string;
  startFrom?: number;
  intensity?: number;
  style?: "impact" | "earthquake" | "subtle";
}

/**
 * Transform effect on speaker video.
 * Impact = fast 6-frame decay, earthquake = 15-frame wobble, subtle = small tremor.
 */
export const ScreenShake: React.FC<ScreenShakeProps> = ({
  speakerSrc,
  startFrom = 0,
  intensity = 0.5,
  style = "impact",
}) => {
  const frame = useCurrentFrame();

  const { decay, effectiveIntensity } = (() => {
    switch (style) {
      case "impact":
        return { decay: 0.5, effectiveIntensity: intensity };
      case "earthquake":
        return { decay: 0.15, effectiveIntensity: intensity };
      case "subtle":
        return { decay: 0.7, effectiveIntensity: intensity * 0.3 };
    }
  })();

  const shake = screenShake(frame, effectiveIntensity, decay);

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `translate(${shake.x}px, ${shake.y}px)`,
        }}
      >
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
      </div>
    </AbsoluteFill>
  );
};
