import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";

type LayoutType = "speaker_full" | "slide_full" | "split_right" | "split_left" | "split_5050_left" | "split_5050_right" | "broll_full";

interface ZoomTransitionProps {
  speakerSrc: string;
  slideSrc: string;
  gridSrc: string;
  startFrom: number;
  zoom: number;
  direction: "in" | "out";
  fromLayout?: LayoutType;
  toLayout?: LayoutType;
}

// Layout constants (same as SplitLayout)
const PADDING = 64;
const GAP = 32;
const BORDER_WIDTH = 16;
const BORDER_COLOR = "rgba(120, 140, 160, 0.6)";
const BORDER_RADIUS = 64;

export const ZoomTransition: React.FC<ZoomTransitionProps> = ({
  speakerSrc,
  slideSrc,
  gridSrc,
  startFrom,
  zoom,
  direction,
  fromLayout,
  toLayout,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Defaults based on direction
  const actualFromLayout = fromLayout || (direction === "in" ? "slide_full" : "speaker_full");
  const actualToLayout = toLayout || (direction === "in" ? "speaker_full" : "slide_full");

  // Cut happens at midpoint
  const cutFrame = Math.floor(durationInFrames / 2);

  // Zoom animates across the entire duration (continuous through the cut)
  const startZoom = direction === "in" ? 1.0 : zoom;
  const endZoom = direction === "in" ? zoom : 1.0;

  const currentZoom = interpolate(
    frame,
    [0, durationInFrames],
    [startZoom, endZoom],
    {
      easing: Easing.inOut(Easing.quad),
    }
  );

  // Which layout to show
  const showFirstLayout = frame < cutFrame;
  const currentLayout = showFirstLayout ? actualFromLayout : actualToLayout;

  // Calculate split layout dimensions
  const availableWidth = width - PADDING * 2 - GAP;
  const availableHeight = height - PADDING * 2;
  const slideWidthRatio = 0.76;
  const slideWidthCalc = Math.floor(availableWidth * slideWidthRatio);
  const slideHeightCalc = Math.min(Math.floor(slideWidthCalc * 9 / 16), availableHeight);
  const finalSlideWidth = Math.floor(slideHeightCalc * 16 / 9);
  const speakerWidthCalc = availableWidth - finalSlideWidth;
  const speakerHeightCalc = slideHeightCalc;
  const contentY = Math.floor((height - slideHeightCalc) / 2);

  // Render speaker_full
  const renderSpeakerFull = () => (
    <SmartVideo
      src={staticFile(speakerSrc)}
      startFrom={startFrom}
      pauseWhenBuffering
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${currentZoom})`,
      }}
    />
  );

  // Render slide_full
  const renderSlideFull = () => (
    <Img
      src={staticFile(slideSrc)}
      delayRenderRetries={3}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${currentZoom})`,
      }}
    />
  );

  // Render split layout
  const renderSplit = (side: "left" | "right") => {
    const slideX = side === "right" ? PADDING : PADDING + speakerWidthCalc + GAP;
    const speakerX = side === "right" ? PADDING + finalSlideWidth + GAP : PADDING;

    return (
      <>
        {/* Grid background */}
        <AbsoluteFill>
          <SmartVideo
            src={staticFile(gridSrc)}
            pauseWhenBuffering
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>

        {/* Container for zoom transform */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: `scale(${currentZoom})`,
            transformOrigin: "center center",
          }}
        >
          {/* Slide */}
          <div
            style={{
              position: "absolute",
              left: slideX,
              top: contentY,
              width: finalSlideWidth,
              height: slideHeightCalc,
              borderRadius: BORDER_RADIUS,
              border: `${BORDER_WIDTH}px solid ${BORDER_COLOR}`,
              overflow: "hidden",
              boxSizing: "border-box",
              zIndex: 1,
              filter: "drop-shadow(0 16px 128px rgba(0, 0, 0, 0.5))",
            }}
          >
            <Img
              src={staticFile(slideSrc)}
              delayRenderRetries={3}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundColor: "white",
              }}
            />
          </div>

          {/* Speaker */}
          <div
            style={{
              position: "absolute",
              left: speakerX,
              top: contentY,
              width: speakerWidthCalc,
              height: speakerHeightCalc,
              borderRadius: speakerWidthCalc * 0.5,
              border: `${BORDER_WIDTH}px solid ${BORDER_COLOR}`,
              overflow: "hidden",
              boxSizing: "border-box",
              zIndex: 2,
              filter: "drop-shadow(0 16px 128px rgba(0, 0, 0, 0.5))",
              // @ts-ignore
              "cornerShape": "superellipse(2)",
            } as React.CSSProperties}
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
        </div>
      </>
    );
  };

  // Render 5050 full-bleed split layout
  const renderSplit5050 = (side: "left" | "right") => {
    const halfWidth = width / 2;
    const speakerX = side === "left" ? 0 : halfWidth;
    const slideX = side === "left" ? halfWidth : 0;

    return (
      <>
        {/* Container for zoom transform */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: `scale(${currentZoom})`,
            transformOrigin: "center center",
          }}
        >
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
        </div>
      </>
    );
  };

  // Render broll_full
  const renderBrollFull = () => (
    <SmartVideo
      src={staticFile(slideSrc)}
      muted
      pauseWhenBuffering
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${currentZoom})`,
      }}
    />
  );

  // Render the appropriate layout
  const renderLayout = (layout: LayoutType) => {
    switch (layout) {
      case "speaker_full":
        return renderSpeakerFull();
      case "slide_full":
        return renderSlideFull();
      case "split_right":
        return renderSplit("right");
      case "split_left":
        return renderSplit("left");
      case "split_5050_left":
        return renderSplit5050("left");
      case "split_5050_right":
        return renderSplit5050("right");
      case "broll_full":
        return renderBrollFull();
      default:
        return renderSpeakerFull();
    }
  };

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {renderLayout(currentLayout)}
      </div>
    </AbsoluteFill>
  );
};
