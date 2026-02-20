import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { SafeAudio as Audio } from "./SafeAudio";
import {
  loadFont as loadSyne,
  fontFamily as syneFontFamily,
} from "@remotion/google-fonts/Syne";
import {
  SPRING_BOUNCY,
  SPRING_SNAPPY,
  glassMorphism,
  hexToRgba,
  popScale,
  glowShadow,
} from "./premium-utils";

loadSyne("normal", { weights: ["700"], subsets: ["latin"] });

interface ToggleSwitchProps {
  speakerSrc?: string;
  startFrom?: number;
  labelOff: string;
  labelOn: string;
  startsOn?: boolean;
  accentColor?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  speakerSrc,
  startFrom,
  labelOff,
  labelOn,
  startsOn = false,
  accentColor = "#22c55e",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phase timing
  const appearEnd = 12;
  const holdEnd = appearEnd + 20;
  const flipFrame = holdEnd;

  // Pop scale entrance for entire toggle
  const containerScale = popScale(frame, 0, 1.08);

  // Thumb slide animation with bouncy spring
  const flipSpring = spring({
    frame: Math.max(0, frame - flipFrame),
    fps,
    config: SPRING_BOUNCY,
  });

  // Determine initial and target state
  const initialOn = startsOn;
  const finalOn = !startsOn;

  // Thumb position: 0 = left, 1 = right
  const thumbProgress = initialOn
    ? interpolate(flipSpring, [0, 1], [1, 0])
    : interpolate(flipSpring, [0, 1], [0, 1]);

  // Track dimensions
  const trackWidth = 400;
  const trackHeight = 200;
  const thumbSize = 180;
  const trackPadding = (trackHeight - thumbSize) / 2;
  const thumbTravel = trackWidth - thumbSize - trackPadding * 2;

  const thumbX = trackPadding + thumbProgress * thumbTravel;

  // Track color: grey when off, accent when on
  const isCurrentlyOn = frame < flipFrame ? initialOn : finalOn;
  const colorProgress = frame < flipFrame
    ? (initialOn ? 1 : 0)
    : flipSpring;
  const trackColorProgress = initialOn
    ? interpolate(colorProgress, [0, 1], [1, 0])
    : colorProgress;

  const greyR = 85, greyG = 85, greyB = 85;
  const accentR = parseInt(accentColor.slice(1, 3), 16);
  const accentG = parseInt(accentColor.slice(3, 5), 16);
  const accentB = parseInt(accentColor.slice(5, 7), 16);

  const trackR = Math.round(greyR + (accentR - greyR) * trackColorProgress);
  const trackG = Math.round(greyG + (accentG - greyG) * trackColorProgress);
  const trackB = Math.round(greyB + (accentB - greyB) * trackColorProgress);
  const trackColor = `rgb(${trackR}, ${trackG}, ${trackB})`;

  // Label crossfade
  const labelFadeOut = frame < flipFrame
    ? 1
    : interpolate(frame, [flipFrame, flipFrame + 8], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const labelFadeIn = frame < flipFrame
    ? 0
    : interpolate(frame, [flipFrame + 4, flipFrame + 14], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const currentLabel = initialOn ? labelOn : labelOff;
  const nextLabel = initialOn ? labelOff : labelOn;

  // Glow pulse after flip settles
  const glowPulseFrame = flipFrame + 15;
  const glowIntensity =
    frame >= glowPulseFrame
      ? interpolate(
          frame,
          [glowPulseFrame, glowPulseFrame + 10, glowPulseFrame + 20],
          [0, 0.5, 0.2],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      : 0;

  const flashOpacity = interpolate(
    frame,
    [flipFrame, flipFrame + 2, flipFrame + 6],
    [0, 0.3, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fade exit in last 10 frames
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Click SFX on flip */}
      <Sequence from={flipFrame} durationInFrames={15}>
        <Audio src={staticFile("sfx/click.mp3")} volume={0.5} />
      </Sequence>

      {/* Toggle overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: exitOpacity,
          transform: `scale(${containerScale})`,
        }}
      >
        {/* Toggle track FIRST */}
        <div
          style={{
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: trackColor,
            position: "relative",
            boxShadow:
              glowIntensity > 0
                ? `0 0 ${30 + glowIntensity * 40}px ${hexToRgba(accentColor, glowIntensity)}, 0 0 ${60 + glowIntensity * 60}px ${hexToRgba(accentColor, glowIntensity * 0.5)}`
                : "0 4px 20px rgba(0,0,0,0.4)",
            transition: "box-shadow 0.1s ease",
          }}
        >
          {/* Thumb */}
          <div
            style={{
              position: "absolute",
              top: trackPadding,
              left: thumbX,
              width: thumbSize,
              height: thumbSize,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          />
          {/* Flash overlay at flip moment */}
          {flashOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: trackHeight / 2,
                backgroundColor: `rgba(255,255,255,${flashOpacity})`,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Label area BELOW toggle */}
        <div style={{ position: "relative", marginTop: 32, minWidth: 800, height: 90 }}>
          {/* Old label fading out */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              whiteSpace: "nowrap",
              fontFamily: syneFontFamily,
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              opacity: labelFadeOut,
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            {currentLabel}
          </div>
          {/* New label fading in */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              whiteSpace: "nowrap",
              fontFamily: syneFontFamily,
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              opacity: labelFadeIn,
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            {nextLabel}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
