import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  loadFont as loadInter,
  fontFamily as interFontFamily,
} from "@remotion/google-fonts/Inter";
import { hexToRgba } from "./premium-utils";

// Inter is the closest Google Font to Twitter/X's "Chirp"
const { fontFamily: twitterFont } = loadInter("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// LinkedIn uses system fonts
const linkedinFont = "system-ui, -apple-system, 'Segoe UI', sans-serif";

interface Post {
  username: string;
  handle: string;
  text: string;
}

interface SocialProofFlashProps {
  speakerSrc?: string;
  startFrom?: number;
  keyword: string;
  posts?: Post[];
  platform?: "twitter" | "linkedin";
  highlightColor?: string;
}

const DEFAULT_POSTS: Post[] = [
  { username: "Sarah Chen", handle: "@sarahchen_ai", text: "Just discovered {keyword} and it completely changed how I think about search visibility. This is the future." },
  { username: "Alex Rivera", handle: "@arivera_tech", text: "Everyone sleeping on {keyword} is going to regret it. The data is clear." },
  { username: "David Park", handle: "@dpark_growth", text: "Our team implemented {keyword} last month. Results are insane. 3x more AI citations." },
  { username: "Maria Lopez", handle: "@mlopez_digital", text: "If you're not thinking about {keyword} in 2026, you're already behind. Period." },
  { username: "James Wu", handle: "@jameswu_seo", text: "The {keyword} shift is real. Seeing it firsthand with every client we work with." },
  { username: "Emma Richards", handle: "@emmar_marketing", text: "Just had a client ask about {keyword} for the first time. The awareness is finally hitting mainstream." },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = ["#e63946", "#457b9d", "#2a9d8f", "#e76f51", "#8b5cf6", "#16a34a"];

function renderHighlightedText(
  text: string,
  keyword: string,
  highlightColor: string,
): React.ReactNode {
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  const idx = lowerText.indexOf(lowerKeyword);

  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + keyword.length);
  const after = text.slice(idx + keyword.length);

  return (
    <>
      {before}
      <span
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: -6,
            right: -6,
            top: "50%",
            height: "1.1em",
            transform: "translateY(-50%)",
            backgroundColor: highlightColor,
            borderRadius: "0.12em",
            zIndex: 0,
          }}
        />
        <span style={{ position: "relative", zIndex: 1 }}>{match}</span>
      </span>
      {after}
    </>
  );
}

export const SocialProofFlash: React.FC<SocialProofFlashProps> = ({
  speakerSrc,
  startFrom,
  keyword,
  posts: customPosts,
  platform = "twitter",
  highlightColor = "#fde047",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const posts = (customPosts ?? DEFAULT_POSTS).map((p) => ({
    ...p,
    text: p.text.replace(/\{keyword\}/g, keyword),
  }));

  const numPosts = posts.length;
  const framesPerPost = Math.floor(durationInFrames / numPosts);
  const currentIndex = Math.min(
    Math.floor(frame / framesPerPost),
    numPosts - 1,
  );

  const isTwitter = platform === "twitter";
  const cardFont = isTwitter ? twitterFont : linkedinFont;

  const CARD_ROTATIONS = [-4, 3, -5, 3.5, -2.5, 4.5];
  const CARD_OFFSETS_Y = [-20, 15, -35, 25, -10, 20];

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #2a2a3e 0%, #1a1a2e 50%, #111118 100%)",
      }}
    >
      {/* Stacked cards - each new one appears on top */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {posts.map((post, i) => {
          if (i > currentIndex) return null;

          const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const rotation = CARD_ROTATIONS[i % CARD_ROTATIONS.length];
          const offsetY = CARD_OFFSETS_Y[i % CARD_OFFSETS_Y.length];

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 2200,
                transform: `translateY(${offsetY}px) rotate(${rotation}deg)`,
                backgroundColor: "#ffffff",
                borderRadius: 24,
                padding: "80px 96px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
                zIndex: i,
              }}
            >
              {/* Header: avatar + name + handle */}
              <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 48 }}>
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    backgroundColor: avatarColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: cardFont,
                      fontSize: 36,
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {getInitials(post.username)}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        fontFamily: cardFont,
                        fontSize: 44,
                        fontWeight: 700,
                        color: "#111",
                      }}
                    >
                      {post.username}
                    </span>
                    {isTwitter && (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: "#1d9bf0",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: cardFont,
                      fontSize: 36,
                      color: "#687684",
                    }}
                  >
                    {post.handle}
                  </span>
                </div>
              </div>

              {/* Post text */}
              <div
                style={{
                  fontFamily: cardFont,
                  fontSize: 52,
                  color: "#111",
                  lineHeight: 1.6,
                }}
              >
                {renderHighlightedText(post.text, keyword, highlightColor)}
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: 48,
                  paddingTop: 36,
                  borderTop: "2px solid #eee",
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: cardFont,
                    fontSize: 28,
                    color: "#999",
                  }}
                >
                  {isTwitter ? "Post" : "LinkedIn Post"}
                </span>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Speaker audio (hidden) */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}
    </AbsoluteFill>
  );
};
