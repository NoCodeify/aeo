import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  Img,
  useVideoConfig,
  staticFile,
} from "remotion";

interface Split5050Props {
  speakerSrc: string;
  slideSrc: string;
  side: "left" | "right"; // which side the speaker is on
  startFrom: number;
}

export const Split5050: React.FC<Split5050Props> = ({
  speakerSrc,
  slideSrc,
  side,
  startFrom,
}) => {
  const { width, height } = useVideoConfig();
  const halfWidth = width / 2;

  const speakerX = side === "left" ? 0 : halfWidth;
  const slideX = side === "left" ? halfWidth : 0;

  return (
    <AbsoluteFill>
      {/* Slide half */}
      <div
        style={{
          position: "absolute",
          left: slideX,
          top: 0,
          width: halfWidth,
          height,
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <Img
          src={staticFile(slideSrc)}
          delayRenderRetries={3}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Speaker half */}
      <div
        style={{
          position: "absolute",
          left: speakerX,
          top: 0,
          width: halfWidth,
          height,
          overflow: "hidden",
        }}
      >
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
      </div>
    </AbsoluteFill>
  );
};
