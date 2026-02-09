import React from "react";
import { Composition, staticFile } from "remotion";
import { MainVideo } from "./components/MainVideo";
import { VideoConfig, Edit, BgMusicConfig } from "./types/timeline";

// Default config for studio preview
// Loads timeline.json from public/ folder
const defaultTimeline: Edit[] = (() => {
  try {
    return require("../public/timeline.json");
  } catch {
    return [];
  }
})();

const defaultConfig: VideoConfig = {
  speakerVideo: "speaker.mp4",
  gridBackground: "grid-loop.mp4",
  timeline: defaultTimeline,
  fps: 30,
  width: 3840,
  height: 2160,
  bgMusic: {
    src: "sfx/lofi-beat-bg.mp3",
    startVolume: 0.16,
    mainVolume: 0.08,
    fadeDuration: 10,
  },
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
        component={MainVideo as any}
        durationInFrames={calculateDuration(defaultConfig.timeline, defaultConfig.fps)}
        fps={defaultConfig.fps}
        width={defaultConfig.width}
        height={defaultConfig.height}
        defaultProps={{ config: defaultConfig }}
        calculateMetadata={async ({ props }: any) => {
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
