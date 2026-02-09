import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
} from "remotion";

interface JumpCutProps {
  speakerSrc: string;
  startFrom: number;
  zoom: number;
}

// Instant zoom - no animation, just cut to zoomed level
export const JumpCut: React.FC<JumpCutProps> = ({
  speakerSrc,
  startFrom,
  zoom,
}) => {
  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <OffthreadVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom}
          pauseWhenBuffering
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
