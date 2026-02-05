import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import { Edit, VideoConfig } from "../types/timeline";
import { SpeakerFull } from "./SpeakerFull";
import { SlideFull } from "./SlideFull";
import { SplitLayout } from "./SplitLayout";
import { JumpZoom } from "./JumpZoom";
import { JumpCut } from "./JumpCut";
import { ZoomTransition } from "./ZoomTransition";
import { GradualZoom } from "./GradualZoom";

interface MainVideoProps {
  config: VideoConfig;
}

export const MainVideo: React.FC<MainVideoProps> = ({ config }) => {
  const { fps } = useVideoConfig();
  const { speakerVideo, gridBackground, timeline } = config;

  return (
    <>
      {timeline.map((edit, index) => {
        const startFrame = Math.round(edit.start * fps);
        const endFrame = Math.round(edit.end * fps);
        const durationInFrames = endFrame - startFrame;

        // Speaker video startFrom (in frames)
        const speakerStartFrom = startFrame;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={durationInFrames}
            name={`${edit.type}-${index}`}
          >
            {renderEdit(edit, speakerVideo, gridBackground, speakerStartFrom)}
          </Sequence>
        );
      })}
    </>
  );
};

function renderEdit(
  edit: Edit,
  speakerVideo: string,
  gridBackground: string,
  speakerStartFrom: number
): React.ReactNode {
  switch (edit.type) {
    case "speaker_full":
      return (
        <SpeakerFull
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
        />
      );

    case "slide_full":
      return (
        <SlideFull
          slideSrc={edit.content}
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
        />
      );

    case "split_right":
      return (
        <SplitLayout
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          gridSrc={gridBackground}
          side="right"
          startFrom={speakerStartFrom}
        />
      );

    case "split_left":
      return (
        <SplitLayout
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          gridSrc={gridBackground}
          side="left"
          startFrom={speakerStartFrom}
        />
      );

    case "jump_zoom_in":
      return (
        <JumpZoom
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.2}
          direction="in"
        />
      );

    case "jump_zoom_out":
      return (
        <JumpZoom
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.2}
          direction="out"
        />
      );

    // Instant zoom cut (no animation)
    case "jump_cut_in":
      return (
        <JumpCut
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.2}
        />
      );

    case "jump_cut_out":
      return (
        <JumpCut
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoom={1.0}
        />
      );

    // Zoom transition (any layout → any layout with continuous zoom)
    case "zoom_transition_in":
      return (
        <ZoomTransition
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          gridSrc={gridBackground}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.15}
          direction="in"
          fromLayout={edit.fromLayout}
          toLayout={edit.toLayout}
        />
      );

    case "zoom_transition_out":
      return (
        <ZoomTransition
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          gridSrc={gridBackground}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.15}
          direction="out"
          fromLayout={edit.fromLayout}
          toLayout={edit.toLayout}
        />
      );

    case "gradual_zoom":
      return (
        <GradualZoom
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoomStart={edit.zoomStart ?? 1.0}
          zoomEnd={edit.zoomEnd ?? 1.1}
        />
      );

    default:
      return null;
  }
}
