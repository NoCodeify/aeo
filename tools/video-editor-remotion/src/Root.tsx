import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./components/MainVideo";
import { VideoConfig, Edit } from "./types/timeline";

// Default config - paths are relative to public/ folder
// These get overridden by inputProps from render script
const defaultConfig: VideoConfig = {
  speakerVideo: "speaker.mp4",
  gridBackground: "grid-loop.mp4",
  timeline: [],
  fps: 30,
  width: 1920,
  height: 1080,
};

// Calculate total duration from timeline
const calculateDuration = (timeline: Edit[], fps: number): number => {
  if (timeline.length === 0) return fps * 10; // 10 seconds default
  const lastEdit = timeline[timeline.length - 1];
  return Math.ceil(lastEdit.end * fps);
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={calculateDuration(defaultConfig.timeline, defaultConfig.fps)}
        fps={defaultConfig.fps}
        width={defaultConfig.width}
        height={defaultConfig.height}
        defaultProps={{ config: defaultConfig }}
        calculateMetadata={async ({ props }) => {
          const { config } = props;
          return {
            durationInFrames: calculateDuration(config.timeline, config.fps),
            fps: config.fps,
            width: config.width,
            height: config.height,
          };
        }}
      />
    </>
  );
};
