import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useVideoConfig,
} from "remotion";
import { proxyVideo } from "../use-proxy";

interface DataVizSplitProps {
  speakerSrc: string;
  startFrom: number;
  side: "left" | "right"; // which side the SPEAKER is on
  children: React.ReactNode;
}

export const DataVizSplit: React.FC<DataVizSplitProps> = ({
  speakerSrc,
  startFrom,
  side,
  children,
}) => {
  const { width, height } = useVideoConfig();
  const halfWidth = width / 2;

  const speakerX = side === "left" ? 0 : halfWidth;
  const vizX = side === "left" ? halfWidth : 0;

  return (
    <AbsoluteFill>
      {/* Data viz half */}
      <div
        style={{
          position: "absolute",
          left: vizX,
          top: 0,
          width: halfWidth,
          height,
          overflow: "hidden",
        }}
      >
        {children}
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
        <OffthreadVideo
          src={staticFile(proxyVideo(speakerSrc))}
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
