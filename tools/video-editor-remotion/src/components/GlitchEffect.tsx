import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface GlitchEffectProps {
  speakerSrc?: string;
  startFrom?: number;
  intensity?: number;
}

/**
 * Quick digital distortion overlay on speaker video.
 * RGB channel split + scanlines + horizontal slice displacement.
 * Meant for very short durations (3-5 frames) as a pattern interrupt.
 */
export const GlitchEffect: React.FC<GlitchEffectProps> = ({
  speakerSrc,
  startFrom,
  intensity = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // 2-frame fade out at end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 2, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Pseudo-random based on frame for deterministic but chaotic look
  const seed = (frame * 7919 + 1301) % 997;
  const rgbShift = Math.round(intensity * 40 + (seed % 30));

  // Generate slice offsets for horizontal displacement
  const sliceCount = 8;
  const sliceHeight = height / sliceCount;
  const slices = Array.from({ length: sliceCount }, (_, i) => {
    const s = ((frame * 3571 + i * 2137) % 499) / 499;
    const offset = Math.round((s - 0.5) * intensity * 120);
    return { top: i * sliceHeight, height: sliceHeight, offset };
  });

  const hasSpeaker = !!speakerSrc;

  return (
    <AbsoluteFill style={{ backgroundColor: "#111", opacity: fadeOut }}>
      {/* Base speaker layer (green channel - no shift) */}
      {hasSpeaker && (
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile(speakerSrc)}
            startFrom={startFrom ?? 0}
            pauseWhenBuffering
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Red channel - shifted left */}
      {hasSpeaker && (
        <AbsoluteFill
          style={{
            mixBlendMode: "screen",
            opacity: 0.8,
          }}
        >
          <OffthreadVideo
            src={staticFile(speakerSrc)}
            startFrom={startFrom ?? 0}
            pauseWhenBuffering
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `translateX(${-rgbShift}px)`,
              filter: "grayscale(1) brightness(0.5) sepia(1) hue-rotate(-30deg) saturate(5)",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Blue channel - shifted right */}
      {hasSpeaker && (
        <AbsoluteFill
          style={{
            mixBlendMode: "screen",
            opacity: 0.8,
          }}
        >
          <OffthreadVideo
            src={staticFile(speakerSrc)}
            startFrom={startFrom ?? 0}
            pauseWhenBuffering
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `translateX(${rgbShift}px)`,
              filter: "grayscale(1) brightness(0.5) sepia(1) hue-rotate(180deg) saturate(5)",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Horizontal slice displacement */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {slices.map((slice, i) =>
          slice.offset !== 0 ? (
            <div
              key={i}
              style={{
                position: "absolute",
                top: slice.top,
                left: 0,
                width,
                height: slice.height,
                backgroundColor: `rgba(255, 255, 255, ${0.03 * intensity})`,
                transform: `translateX(${slice.offset}px)`,
              }}
            />
          ) : null,
        )}
      </AbsoluteFill>

      {/* Scanline overlay */}
      <AbsoluteFill
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 4px,
            rgba(0, 0, 0, ${0.15 * intensity}) 4px,
            rgba(0, 0, 0, ${0.15 * intensity}) 8px
          )`,
          pointerEvents: "none",
        }}
      />

      {/* Speaker audio (hidden) */}
      {hasSpeaker && (
        <OffthreadVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </AbsoluteFill>
  );
};
