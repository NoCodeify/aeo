import { getRemotionEnvironment } from "remotion";

const PROXY_FILES = new Set(["speaker.mp4", "grid-loop.mp4"]);

export function proxyVideo(filename: string): string {
  const env = getRemotionEnvironment();

  if (env.isRendering || !PROXY_FILES.has(filename)) {
    return filename;
  }

  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) return filename;

  return `${filename.substring(0, dotIndex)}-proxy${filename.substring(dotIndex)}`;
}
