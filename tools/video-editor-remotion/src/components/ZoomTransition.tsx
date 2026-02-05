import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";

type LayoutType = "speaker_full" | "slide_full" | "split_right" | "split_left";

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
const BORDER_RADIUS = 32;
const SHADOW = "0 8px 32px rgba(0, 0, 0, 0.4)";

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
    <OffthreadVideo
      src={staticFile(speakerSrc)}
      startFrom={startFrom}
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
          <OffthreadVideo
            src={staticFile(gridSrc)}
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
              boxShadow: SHADOW,
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <Img
              src={staticFile(slideSrc)}
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
              boxShadow: SHADOW,
              overflow: "hidden",
              boxSizing: "border-box",
              // @ts-ignore
              "cornerShape": "superellipse(2)",
            } as React.CSSProperties}
          >
            <OffthreadVideo
              src={staticFile(speakerSrc)}
              startFrom={startFrom}
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
