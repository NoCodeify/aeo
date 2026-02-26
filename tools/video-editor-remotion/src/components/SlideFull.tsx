import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { SmartVideo } from "../use-proxy";

interface SlideFullProps {
  slideSrc: string;
  speakerSrc: string; // For audio only
  startFrom: number;
}

export const SlideFull: React.FC<SlideFullProps> = ({
  slideSrc,
  speakerSrc,
  startFrom,
}) => {
  const isMeme = slideSrc.startsWith("memes/");
  return (
    <AbsoluteFill style={isMeme ? { backgroundColor: "#0a0a0a" } : undefined}>
      {/* Slide image fills screen */}
      <Img
        src={staticFile(slideSrc)}
        delayRenderRetries={3}
        style={{
          width: "100%",
          height: "100%",
          objectFit: isMeme ? "contain" : "cover",
        }}
      />
      {/* Audio from speaker video */}
      <SmartVideo
        src={staticFile(speakerSrc)}
        startFrom={startFrom}
        pauseWhenBuffering
        style={{ display: "none" }}
      />
    </AbsoluteFill>
  );
};
