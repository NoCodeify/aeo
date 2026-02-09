import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";

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
  return (
    <AbsoluteFill>
      {/* Slide image fills screen */}
      <Img
        src={staticFile(slideSrc)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Audio from speaker video */}
      <OffthreadVideo
        src={staticFile(speakerSrc)}
        startFrom={startFrom}
        pauseWhenBuffering
        style={{ display: "none" }}
      />
    </AbsoluteFill>
  );
};
