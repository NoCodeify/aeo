import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
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

interface CountdownFlipProps {
  speakerSrc?: string;
  startFrom?: number;
  from: number;
  to: number;
  label?: string;
  suffix?: string;
  color?: string;
}

function getDigits(num: number, totalDigits: number): string[] {
  const str = Math.abs(num).toString().padStart(totalDigits, "0");
  return str.split("");
}

export const CountdownFlip: React.FC<CountdownFlipProps> = ({
  speakerSrc,
  startFrom,
  from,
  to,
  label,
  suffix,
  color = "#8b5cf6",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const steps = Math.abs(to - from);
  const direction = to >= from ? 1 : -1;

  // Determine digit count from the larger number
  const maxNum = Math.max(Math.abs(from), Math.abs(to));
  const totalDigits = Math.max(maxNum.toString().length, 1);

  // Pop scale entrance for entire clock
  const containerScale = popScale(frame, 0, 1.06);

  // Each flip takes ~8 frames. Distribute evenly across available duration (minus entrance + exit buffer)
  const entranceFrames = 14;
  const exitFrames = 10;
  const availableFrames = durationInFrames - entranceFrames - exitFrames;
  const framesPerStep = steps > 0 ? Math.max(8, Math.floor(availableFrames / steps)) : availableFrames;

  // Current number based on frame
  const currentStep = Math.min(
    steps,
    Math.max(0, Math.floor((frame - entranceFrames) / framesPerStep))
  );
  const currentNumber = from + direction * currentStep;
  const currentDigits = getDigits(currentNumber, totalDigits);

  // Next number (for flip animation)
  const nextStep = Math.min(steps, currentStep + 1);
  const nextNumber = from + direction * nextStep;
  const nextDigits = getDigits(nextNumber, totalDigits);

  // Flip progress within current step
  const stepStartFrame = entranceFrames + currentStep * framesPerStep;
  const flipProgress = interpolate(
    frame,
    [stepStartFrame, stepStartFrame + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Final number glow
  const isFinalNumber = currentStep >= steps;
  const finalGlow = isFinalNumber
    ? interpolate(
        frame,
        [stepStartFrame, stepStartFrame + 15],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  const finalPulse = isFinalNumber
    ? 0.3 + Math.sin(frame * 0.15) * 0.15
    : 0;
  const combinedFinalGlow = Math.max(finalGlow, finalPulse);

  // Label + suffix fade in after last flip
  const labelOpacity = isFinalNumber
    ? interpolate(
        frame,
        [stepStartFrame + 5, stepStartFrame + 15],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  // Fade exit in last 10 frames
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - exitFrames, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Card dimensions
  const cardWidth = 200;
  const cardHeight = 280;
  const cardGap = 20;
  const digitFontSize = 160;

  return (
    <AbsoluteFill>
      {/* Speaker video underneath */}
      {speakerSrc && (
        <OffthreadVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Flip SFX on each step */}
      {Array.from({ length: Math.min(steps, 30) }).map((_, i) => {
        const sfxFrame = entranceFrames + i * framesPerStep;
        return (
          <Sequence key={i} from={sfxFrame} durationInFrames={15}>
            <Audio src={staticFile("sfx/flipcard-count.mp3")} volume={0.3} />
          </Sequence>
        );
      })}

      {/* Countdown overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          opacity: exitOpacity,
          transform: `scale(${containerScale})`,
        }}
      >
        {/* Digit cards row */}
        <div
          style={{
            display: "flex",
            gap: cardGap,
            perspective: 1200,
          }}
        >
          {currentDigits.map((digit, i) => {
            const nextDigit = nextDigits[i];
            const isDigitFlipping = !isFinalNumber && digit !== nextDigit;
            const rotateX = isDigitFlipping
              ? interpolate(flipProgress, [0, 1], [0, -180])
              : 0;
            const pastMidpoint = isDigitFlipping && flipProgress > 0.5;

            return (
              <div
                key={i}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  position: "relative",
                  perspective: 1200,
                  boxShadow: isFinalNumber
                    ? `0 0 ${20 + combinedFinalGlow * 30}px ${hexToRgba(color, combinedFinalGlow * 0.4)}, 0 0 ${40 + combinedFinalGlow * 50}px ${hexToRgba(color, combinedFinalGlow * 0.2)}`
                    : "0 4px 20px rgba(0,0,0,0.5)",
                  borderRadius: 16,
                }}
              >
                {/* Layer 0: Back card - shows next digit (revealed as overlays flip away) */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                    backgroundColor: "#1e1e2e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    border: `1px solid ${hexToRgba(color, 0.15)}`,
                  }}
                >
                  {/* Split line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: isDigitFlipping
                        ? `${hexToRgba(color, 0.3 + flipProgress * 0.4)}`
                        : "rgba(0,0,0,0.4)",
                      boxShadow: isDigitFlipping
                        ? `0 0 ${6 + flipProgress * 10}px ${hexToRgba(color, flipProgress * 0.5)}`
                        : "none",
                      zIndex: 2,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: syneFontFamily,
                      fontSize: digitFontSize,
                      fontWeight: 700,
                      color: isFinalNumber ? color : "#e8e4e0",
                      lineHeight: 1,
                    }}
                  >
                    {isDigitFlipping ? nextDigit : digit}
                  </span>
                </div>

                {/* Layer 1: Flipping top half - shows current digit, rotates away */}
                {isDigitFlipping && (
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "50%",
                      top: 0,
                      borderRadius: "16px 16px 0 0",
                      backgroundColor: "#1e1e2e",
                      overflow: "hidden",
                      transformOrigin: "50% 100%",
                      transform: `rotateX(${rotateX}deg)`,
                      backfaceVisibility: "hidden",
                      zIndex: 4,
                      border: `1px solid ${hexToRgba(color, 0.15)}`,
                      borderBottom: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: cardHeight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: syneFontFamily,
                          fontSize: digitFontSize,
                          fontWeight: 700,
                          color: "#e8e4e0",
                          lineHeight: 1,
                        }}
                      >
                        {digit}
                      </span>
                    </div>
                  </div>
                )}

                {/* Layer 2: Static bottom half - shows current digit until flip passes midpoint */}
                {isDigitFlipping && !pastMidpoint && (
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "50%",
                      bottom: 0,
                      borderRadius: "0 0 16px 16px",
                      backgroundColor: "#1e1e2e",
                      overflow: "hidden",
                      zIndex: 3,
                      border: `1px solid ${hexToRgba(color, 0.15)}`,
                      borderTop: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: cardHeight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: -(cardHeight / 2),
                      }}
                    >
                      <span
                        style={{
                          fontFamily: syneFontFamily,
                          fontSize: digitFontSize,
                          fontWeight: 700,
                          color: "#e8e4e0",
                          lineHeight: 1,
                        }}
                      >
                        {digit}
                      </span>
                    </div>
                  </div>
                )}

                {/* Layer 3: Non-flipping static card (when not animating) */}
                {!isDigitFlipping && (
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: 16,
                      backgroundColor: "#1e1e2e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      zIndex: 1,
                      border: `1px solid ${hexToRgba(color, 0.15)}`,
                    }}
                  >
                    {/* Split line */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        right: 0,
                        height: 2,
                        backgroundColor: isDigitFlipping
                          ? `${hexToRgba(color, 0.3 + flipProgress * 0.4)}`
                          : "rgba(0,0,0,0.4)",
                        boxShadow: isDigitFlipping
                          ? `0 0 ${6 + flipProgress * 10}px ${hexToRgba(color, flipProgress * 0.5)}`
                          : "none",
                        zIndex: 2,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: syneFontFamily,
                        fontSize: digitFontSize,
                        fontWeight: 700,
                        color: isFinalNumber ? color : "#e8e4e0",
                        lineHeight: 1,
                      }}
                    >
                      {digit}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Label + suffix row */}
        {(label || suffix) && (
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 20,
              opacity: labelOpacity,
            }}
          >
            {label && (
              <span
                style={{
                  fontFamily: syneFontFamily,
                  fontSize: 56,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.7)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                }}
              >
                {label}
              </span>
            )}
            {suffix && (
              <span
                style={{
                  fontFamily: syneFontFamily,
                  fontSize: 56,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                }}
              >
                {suffix}
              </span>
            )}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
