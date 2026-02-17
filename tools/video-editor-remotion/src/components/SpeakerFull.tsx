import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { SmartVideo } from "../use-proxy";

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
      <SmartVideo
        src={staticFile(speakerSrc)}
        startFrom={startFrom}
        pauseWhenBuffering
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};
