import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,

  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface NewspaperFlashProps {
  speakerSrc?: string;
  startFrom?: number;
  keyword: string;
  headlines?: string[];
  highlightColor?: string;
}

const HEADLINE_TEMPLATES = [
  "{keyword} Changes Everything for the Industry",
  "The Unstoppable Rise of {keyword}",
  "Why {keyword} Is Dominating Headlines",
  "Experts: {keyword} Will Reshape the Future",
  "{keyword} Sees Explosive Growth Worldwide",
  "Inside the {keyword} Revolution",
  "How {keyword} Is Disrupting Traditional Markets",
  "Report: {keyword} Adoption Hits Record High",
  "Companies Race to Embrace {keyword}",
  "The {keyword} Effect: What You Need to Know",
  "{keyword} Is No Longer Optional, Say Leaders",
  "Why Everyone Is Talking About {keyword}",
  "New Study Reveals {keyword} Impact on Business",
  "{keyword} Surge Catches Industry Off Guard",
  "Wall Street Bets Big on {keyword}",
];

const INTRO_TEMPLATES = [
  "In a move that analysts are calling unprecedented, the rapid adoption of {keyword} has sent shockwaves through the industry. Major players are scrambling to adapt their strategies as market dynamics shift dramatically...",
  "A comprehensive new report published today reveals that {keyword} is reshaping how businesses operate at a fundamental level. Industry experts say the changes are only accelerating...",
  "Leading technology firms are investing billions into {keyword} as the competitive landscape continues to evolve. According to sources familiar with the matter, early adopters are already seeing significant returns...",
  "The global push toward {keyword} has reached a tipping point, according to senior executives at multiple Fortune 500 companies. What was once considered experimental is now mainstream...",
  "Market research firm Gartner estimates that {keyword} will account for a significant share of enterprise spending by 2027. The implications for businesses that fail to adapt could be severe...",
  "From Silicon Valley startups to Wall Street giants, the conversation has shifted to {keyword}. Multiple industry leaders confirmed the trend in exclusive interviews this week...",
];

// Each "site" has its own visual identity
const SITE_CONFIGS = [
  {
    siteName: "TechInsider",
    bg: "#ffffff",
    headerBg: "#1a1a2e",
    headerText: "#ffffff",
    accentColor: "#e63946",
    breadcrumbs: ["Home", "Technology", "Analysis"],
    category: "TECHNOLOGY",
    categoryBg: "#e63946",
    font: "system-ui, -apple-system, sans-serif",
    author: "Sarah Chen",
    readTime: "4 min read",
    date: "Jan 15, 2026",
  },
  {
    siteName: "The Business Standard",
    bg: "#faf9f6",
    headerBg: "#0d1b2a",
    headerText: "#ffffff",
    accentColor: "#2b6cb0",
    breadcrumbs: ["Markets", "Industry", "Trends"],
    category: "MARKETS",
    categoryBg: "#2b6cb0",
    font: "Georgia, 'Times New Roman', serif",
    author: "James Whitfield",
    readTime: "6 min read",
    date: "Feb 3, 2026",
  },
  {
    siteName: "WIRED DIGEST",
    bg: "#ffffff",
    headerBg: "#000000",
    headerText: "#ffffff",
    accentColor: "#8b5cf6",
    breadcrumbs: ["Science", "Innovation"],
    category: "INNOVATION",
    categoryBg: "#8b5cf6",
    font: "system-ui, -apple-system, sans-serif",
    author: "Maria Lopez",
    readTime: "5 min read",
    date: "Dec 12, 2025",
  },
  {
    siteName: "Global Finance Today",
    bg: "#f8f8f8",
    headerBg: "#14532d",
    headerText: "#ffffff",
    accentColor: "#16a34a",
    breadcrumbs: ["Economy", "Reports", "Global"],
    category: "ECONOMY",
    categoryBg: "#16a34a",
    font: "Georgia, 'Times New Roman', serif",
    author: "David Park",
    readTime: "7 min read",
    date: "Nov 28, 2025",
  },
  {
    siteName: "Reuters Digital",
    bg: "#ffffff",
    headerBg: "#ff6600",
    headerText: "#ffffff",
    accentColor: "#ff6600",
    breadcrumbs: ["World", "Business", "Technology"],
    category: "EXCLUSIVE",
    categoryBg: "#ff6600",
    font: "system-ui, -apple-system, sans-serif",
    author: "Emma Richards",
    readTime: "3 min read",
    date: "Jan 30, 2026",
  },
  {
    siteName: "The Morning Brief",
    bg: "#fefce8",
    headerBg: "#78350f",
    headerText: "#ffffff",
    accentColor: "#b45309",
    breadcrumbs: ["News", "Spotlight"],
    category: "BREAKING",
    categoryBg: "#dc2626",
    font: "Georgia, 'Times New Roman', serif",
    author: "Tom Bradley",
    readTime: "5 min read",
    date: "Oct 19, 2025",
  },
];

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 2147483647;
  }
  return Math.abs(hash) || 1;
}

function generateHeadlines(keyword: string, count: number): string[] {
  const seed = hashString(keyword);
  const shuffled = seededShuffle(HEADLINE_TEMPLATES, seed);
  return shuffled.slice(0, count).map((t) => t.replace(/\{keyword\}/g, keyword));
}

function generateIntro(keyword: string, index: number): string {
  const template = INTRO_TEMPLATES[index % INTRO_TEMPLATES.length];
  return template.replace(/\{keyword\}/g, keyword);
}

const ROTATIONS = [-5, 3.5, -4, 6, -3, 4.5];
const OFFSETS_Y = [-30, 20, -50, 40, -20, 30];

const HighlightSpan: React.FC<{
  word: string;
  color: string;
}> = ({ word, color }) => {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: -8,
          right: -8,
          top: "50%",
          height: "1.1em",
          transform: "translateY(-50%)",
          backgroundColor: color,
          borderRadius: "0.12em",
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{word}</span>
    </span>
  );
};

function renderHighlightedText(
  text: string,
  keyword: string,
  highlightColor: string
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
      <HighlightSpan word={match} color={highlightColor} />
      {after}
    </>
  );
}

export const NewspaperFlash: React.FC<NewspaperFlashProps> = ({
  speakerSrc,
  startFrom,
  keyword,
  headlines: customHeadlines,
  highlightColor = "#fde047",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const headlines = customHeadlines ?? generateHeadlines(keyword, 6);
  const numClippings = headlines.length;
  const framesPerClipping = Math.floor(durationInFrames / numClippings);
  const currentIndex = Math.min(
    Math.floor(frame / framesPerClipping),
    numClippings - 1
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #2a2a3e 0%, #1a1a2e 50%, #111118 100%)",
      }}
    >
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.25) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Stacked papers - each new one appears on top */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {headlines.map((headline, i) => {
          if (i > currentIndex) return null;

          const site = SITE_CONFIGS[i % SITE_CONFIGS.length];
          const intro = generateIntro(keyword, i);
          const rotation = ROTATIONS[i % ROTATIONS.length];
          const offsetY = OFFSETS_Y[i % OFFSETS_Y.length];

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 2800,
                transform: `translateY(${offsetY}px) rotate(${rotation}deg)`,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.08)",
                zIndex: i,
              }}
            >
              {/* Site header / nav bar */}
              <div
                style={{
                  backgroundColor: site.headerBg,
                  padding: "28px 80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    color: site.headerText,
                    fontSize: 42,
                    fontFamily: site.font,
                    fontWeight: 700,
                    letterSpacing: site.siteName === "WIRED DIGEST" ? 8 : 1,
                  }}
                >
                  {site.siteName}
                </div>
                <div style={{ display: "flex", gap: 48 }}>
                  {["News", "Opinion", "Markets", "Tech", "Subscribe"].map((item) => (
                    <span
                      key={item}
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: 26,
                        fontFamily: site.font,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Article body area */}
              <div
                style={{
                  backgroundColor: site.bg,
                  padding: "60px 120px 80px",
                }}
              >
                {/* Breadcrumbs */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 28,
                    fontFamily: site.font,
                    fontSize: 24,
                    color: "#999",
                  }}
                >
                  {site.breadcrumbs.map((crumb, ci) => (
                    <React.Fragment key={crumb}>
                      {ci > 0 && <span style={{ color: "#ccc" }}>/</span>}
                      <span
                        style={{
                          color: ci === site.breadcrumbs.length - 1 ? site.accentColor : "#999",
                        }}
                      >
                        {crumb}
                      </span>
                    </React.Fragment>
                  ))}
                </div>

                {/* Category tag */}
                <div style={{ marginBottom: 32 }}>
                  <span
                    style={{
                      backgroundColor: site.categoryBg,
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 700,
                      fontFamily: site.font,
                      padding: "8px 24px",
                      borderRadius: 4,
                      letterSpacing: 3,
                    }}
                  >
                    {site.category}
                  </span>
                </div>

                {/* Headline */}
                <div
                  style={{
                    fontFamily: site.font,
                    fontSize: 86,
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: 1.2,
                    marginBottom: 36,
                  }}
                >
                  {renderHighlightedText(headline, keyword, highlightColor)}
                </div>

                {/* Byline */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    marginBottom: 40,
                    fontFamily: site.font,
                    fontSize: 24,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: site.accentColor,
                      opacity: 0.2,
                    }}
                  />
                  <div>
                    <div style={{ color: "#333", fontWeight: 600 }}>
                      By {site.author}
                    </div>
                    <div style={{ color: "#999", fontSize: 22 }}>
                      {site.date} &middot; {site.readTime}
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      gap: 20,
                    }}
                  >
                    {["Share", "Save", "Print"].map((action) => (
                      <span
                        key={action}
                        style={{
                          color: "#bbb",
                          fontSize: 22,
                          fontFamily: site.font,
                          border: "2px solid #ddd",
                          padding: "6px 20px",
                          borderRadius: 6,
                        }}
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Separator */}
                <div
                  style={{
                    height: 1,
                    backgroundColor: "#e5e5e5",
                    marginBottom: 36,
                  }}
                />

                {/* Intro paragraph */}
                <div
                  style={{
                    fontFamily: site.font,
                    fontSize: 36,
                    color: "#444",
                    lineHeight: 1.7,
                  }}
                >
                  {renderHighlightedText(intro, keyword, highlightColor)}
                </div>
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
