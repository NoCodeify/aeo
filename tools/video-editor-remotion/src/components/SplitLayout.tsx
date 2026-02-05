import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Img,
  useVideoConfig,
  staticFile,
} from "remotion";

interface SplitLayoutProps {
  speakerSrc: string;
  slideSrc: string;
  gridSrc: string;
  side: "left" | "right";
  startFrom: number;
}

// Layout constants
const PADDING = 64;
const GAP = 32;

// Border styling - glass effect like Screen Studio
const BORDER_WIDTH = 16;
const BORDER_COLOR = "rgba(120, 140, 160, 0.6)"; // Semi-transparent gray glass
const BORDER_RADIUS = 32; // Squircle-ish rounded corners

// Shadow
const SHADOW = "0 8px 32px rgba(0, 0, 0, 0.4)";

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  speakerSrc,
  slideSrc,
  gridSrc,
  side,
  startFrom,
}) => {
  const { width, height } = useVideoConfig();

  // Calculate dimensions to fit within screen
  const availableWidth = width - PADDING * 2 - GAP;
  const availableHeight = height - PADDING * 2;

  // Slide is 16:9, Speaker takes remaining width
  // Slide takes ~76% (speaker ~10% wider than original 78/22 split)
  const slideWidthRatio = 0.76;
  const slideWidth = Math.floor(availableWidth * slideWidthRatio);
  const slideHeight = Math.min(Math.floor(slideWidth * 9 / 16), availableHeight);

  // Recalculate slide width based on constrained height
  const finalSlideWidth = Math.floor(slideHeight * 16 / 9);

  // Speaker takes remaining width, same height as slide
  const speakerWidth = availableWidth - finalSlideWidth;
  const speakerHeight = slideHeight;

  // Center vertically
  const contentY = Math.floor((height - slideHeight) / 2);

  // Positions based on side
  const slideX = side === "right" ? PADDING : PADDING + speakerWidth + GAP;
  const speakerX = side === "right" ? PADDING + finalSlideWidth + GAP : PADDING;

  return (
    <AbsoluteFill>
      {/* Grid background video */}
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile(gridSrc)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* Slide with glass border */}
      <div
        style={{
          position: "absolute",
          left: slideX,
          top: contentY,
          width: finalSlideWidth,
          height: slideHeight,
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

      {/* Speaker with glass border - 50% radius squircle */}
      <div
        style={{
          position: "absolute",
          left: speakerX,
          top: contentY,
          width: speakerWidth,
          height: speakerHeight,
          borderRadius: speakerWidth * 0.5, // 50% of width for squircle
          border: `${BORDER_WIDTH}px solid ${BORDER_COLOR}`,
          boxShadow: SHADOW,
          overflow: "hidden",
          boxSizing: "border-box",
          // @ts-ignore - experimental CSS property for true squircle
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
    </AbsoluteFill>
  );
};
