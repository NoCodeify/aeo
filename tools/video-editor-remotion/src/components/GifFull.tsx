import React, { useState, useEffect, useCallback } from "react";
import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Loop,
  delayRender,
  continueRender,
} from "remotion";
import { SmartVideo } from "../use-proxy";

interface GifFullProps {
  gifSrc: string;
  speakerSrc: string; // for audio only
  startFrom: number;
}

export const GifFull: React.FC<GifFullProps> = ({
  gifSrc,
  speakerSrc,
  startFrom,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [gifDurationFrames, setGifDurationFrames] = useState<number | null>(null);
  const [handle] = useState(() => delayRender("Loading GIF duration"));

  const resolveGifDuration = useCallback(() => {
    const video = document.createElement("video");
    video.src = staticFile(gifSrc);
    video.preload = "metadata";

    const onLoaded = () => {
      const durationSec = video.duration;
      if (durationSec && isFinite(durationSec) && durationSec > 0) {
        setGifDurationFrames(Math.max(Math.round(durationSec * fps), 1));
      } else {
        // Fallback: assume 2 seconds if metadata is broken
        setGifDurationFrames(Math.round(2 * fps));
      }
      continueRender(handle);
      video.remove();
    };

    const onError = () => {
      // Fallback: assume 2 seconds
      setGifDurationFrames(Math.round(2 * fps));
      continueRender(handle);
      video.remove();
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("error", onError);

    // Timeout fallback in case metadata never loads
    setTimeout(() => {
      if (gifDurationFrames === null) {
        setGifDurationFrames(Math.round(2 * fps));
        try { continueRender(handle); } catch { /* already continued */ }
        video.remove();
      }
    }, 5000);
  }, [gifSrc, fps, handle, gifDurationFrames]);

  useEffect(() => {
    resolveGifDuration();
  }, [resolveGifDuration]);

  // Quick fade in (6 frames = ~0.2s)
  const opacity = interpolate(
    frame,
    [0, 6],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  if (gifDurationFrames === null) {
    return null; // delayRender is active, waiting for metadata
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* GIF as MP4 centered - Loop guarantees replay */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity,
        }}
      >
        <Loop durationInFrames={gifDurationFrames}>
          <SmartVideo
            src={staticFile(gifSrc)}
            pauseWhenBuffering
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            muted
          />
        </Loop>
      </AbsoluteFill>

      {/* Audio from speaker video (hidden) */}
      <SmartVideo
        src={staticFile(speakerSrc)}
        startFrom={startFrom}
        pauseWhenBuffering
        style={{ display: "none" }}
      />
    </AbsoluteFill>
  );
};
