import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

interface SpeakerFullProps {
  speakerSrc: string;
  startFrom: number;
}

export const SpeakerFull: React.FC<SpeakerFullProps> = ({
  speakerSrc,
  startFrom,
}) => {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(speakerSrc)}
        startFrom={startFrom}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};
