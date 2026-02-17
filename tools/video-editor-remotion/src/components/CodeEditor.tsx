import React from "react";
import { SmartVideo } from "../use-proxy";
import {
  AbsoluteFill,
  Audio,

  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import {
  loadFont,
  fontFamily,
} from "@remotion/google-fonts/JetBrainsMono";
import { DarkGradientBg } from "./backgrounds";
import {
  SPRING_BOUNCY,
  SPRING_SNAPPY,
  glassMorphism,
  hexToRgba,
  popScale,
  glowShadow,
} from "./premium-utils";

loadFont("normal", { weights: ["400", "700"], subsets: ["latin"] });

interface CodeEditorProps {
  speakerSrc?: string;
  startFrom?: number;
  code: string;
  language?: string;
  highlightLines?: number[];
  accentColor?: string;
}

// Simple syntax keywords
const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "import",
  "from",
  "export",
  "default",
  "async",
  "await",
  "return",
  "function",
  "if",
  "else",
  "for",
  "while",
  "class",
  "new",
  "this",
  "throw",
  "try",
  "catch",
  "finally",
  "typeof",
  "interface",
  "type",
  "extends",
  "implements",
  "public",
  "private",
  "protected",
  "static",
  "void",
  "null",
  "undefined",
  "true",
  "false",
  "def",
  "self",
  "print",
  "None",
  "True",
  "False",
  "in",
  "not",
  "and",
  "or",
  "with",
  "as",
  "yield",
  "pass",
  "raise",
  "lambda",
]);

// Tokenize a line into colored spans
function tokenizeLine(
  line: string,
  accentColor: string
): Array<{ text: string; color: string }> {
  const tokens: Array<{ text: string; color: string }> = [];
  let i = 0;

  while (i < line.length) {
    // Whitespace
    if (line[i] === " " || line[i] === "\t") {
      let ws = "";
      while (i < line.length && (line[i] === " " || line[i] === "\t")) {
        ws += line[i];
        i++;
      }
      tokens.push({ text: ws, color: "#ffffff" });
      continue;
    }

    // Single-line comment (// or #)
    if (
      (line[i] === "/" && i + 1 < line.length && line[i + 1] === "/") ||
      line[i] === "#"
    ) {
      tokens.push({ text: line.slice(i), color: "#6a6a8a" });
      break;
    }

    // Strings (single or double quotes, backticks)
    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      const quote = line[i];
      let str = quote;
      i++;
      while (i < line.length && line[i] !== quote) {
        if (line[i] === "\\" && i + 1 < line.length) {
          str += line[i] + line[i + 1];
          i += 2;
        } else {
          str += line[i];
          i++;
        }
      }
      if (i < line.length) {
        str += line[i];
        i++;
      }
      tokens.push({ text: str, color: "#a8db8a" });
      continue;
    }

    // Numbers
    if (/[0-9]/.test(line[i])) {
      let num = "";
      while (i < line.length && /[0-9.]/.test(line[i])) {
        num += line[i];
        i++;
      }
      tokens.push({ text: num, color: "#dab98f" });
      continue;
    }

    // Words (potential keywords)
    if (/[a-zA-Z_$]/.test(line[i])) {
      let word = "";
      while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) {
        word += line[i];
        i++;
      }
      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, color: accentColor });
      } else {
        tokens.push({ text: word, color: "#ffffff" });
      }
      continue;
    }

    // Operators and punctuation
    tokens.push({ text: line[i], color: "#aaaaaa" });
    i++;
  }

  return tokens;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  speakerSrc,
  startFrom,
  code,
  language = "typescript",
  highlightLines = [],
  accentColor = "#e63946",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const CHARS_PER_SEC = 18;
  const lines = code.split("\n");

  // === Window entrance spring ===
  const windowSpring = spring({ frame, fps, config: SPRING_BOUNCY });
  const windowY = interpolate(windowSpring, [0, 1], [300, 0]);
  const windowScale = interpolate(windowSpring, [0, 1], [0.9, 1]);

  // === Typed characters (global count across all lines) ===
  const typeStart = 12; // frames after window entrance
  const totalChars = code.length;
  const typedChars = frame >= typeStart
    ? Math.min(Math.floor(((frame - typeStart) / fps) * CHARS_PER_SEC), totalChars)
    : 0;

  // Calculate which line and char position we're at
  let charCount = 0;
  let currentLineIndex = 0;
  let currentCharInLine = 0;

  for (let li = 0; li < lines.length; li++) {
    const lineLen = lines[li].length;
    // +1 for the newline character (except last line)
    const lineTotal = li < lines.length - 1 ? lineLen + 1 : lineLen;

    if (charCount + lineTotal > typedChars) {
      currentLineIndex = li;
      currentCharInLine = typedChars - charCount;
      break;
    }
    charCount += lineTotal;
    if (li === lines.length - 1) {
      currentLineIndex = li;
      currentCharInLine = lineLen;
    }
  }

  const typingDone = typedChars >= totalChars;
  const typingDoneFrame = typeStart + Math.ceil((totalChars / CHARS_PER_SEC) * fps);

  // === Highlight animation (after typing completes + 15 frame pause) ===
  const highlightStart = typingDoneFrame + 15;
  const HIGHLIGHT_STAGGER = 4;

  // === Blinking cursor ===
  const blinkCursor = !typingDone && frame >= typeStart && Math.floor(frame / 8) % 2 === 0;

  // === Exit fade ===
  const exitOp = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {/* Background */}
      <DarkGradientBg accentColor={accentColor} />

      {/* Keyboard typing SFX during code entry */}
      <Sequence from={typeStart} durationInFrames={typingDoneFrame - typeStart}>
        <Audio src={staticFile("sfx/keyboard-typing.mp3")} volume={0.3} loop />
      </Sequence>

      {/* Speaker audio only */}
      {speakerSrc && (
        <SmartVideo
          src={staticFile(speakerSrc)}
          startFrom={startFrom ?? 0}
          pauseWhenBuffering
          style={{ display: "none" }}
        />
      )}

      {/* Editor window */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: exitOp,
        }}
      >
        <div
          style={{
            transform: `translateY(${windowY}px) scale(${windowScale})`,
            width: 2800,
            borderRadius: 24,
            backgroundColor: "#1e1e2e",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: `0 8px 60px rgba(0,0,0,0.6), 0 0 40px ${hexToRgba(accentColor, 0.08)}`,
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px 28px",
              backgroundColor: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Traffic light dots */}
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#ff5f57",
                }}
              />
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#febc2e",
                }}
              />
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#28c840",
                  boxShadow: typingDone
                    ? `0 0 ${8 + Math.sin(frame * 0.2) * 6}px rgba(40, 200, 64, ${0.4 + Math.sin(frame * 0.2) * 0.3})`
                    : "none",
                }}
              />
            </div>

            {/* Language label */}
            <div
              style={{
                flex: 1,
                textAlign: "center",
                fontFamily: fontFamily,
                fontSize: 36,
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {language}
            </div>

            {/* Spacer for centering */}
            <div style={{ width: 84 }} />
          </div>

          {/* Code content */}
          <div
            style={{
              padding: "36px 0",
              minHeight: 500,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {lines.map((line, lineIndex) => {
              // Calculate how many chars of this line are visible
              let visibleChars = 0;
              if (lineIndex < currentLineIndex) {
                visibleChars = line.length; // fully visible
              } else if (lineIndex === currentLineIndex) {
                visibleChars = Math.min(currentCharInLine, line.length);
              } else {
                visibleChars = 0; // not yet visible
              }

              // Is this line visible at all?
              if (lineIndex > currentLineIndex && !typingDone) return null;

              const lineNumber = lineIndex + 1;
              const isHighlighted = highlightLines.includes(lineNumber);

              // Highlight animation for this line
              const highlightIndex = highlightLines.indexOf(lineNumber);
              const highlightFrame = highlightStart + highlightIndex * HIGHLIGHT_STAGGER;
              const highlightProgress =
                isHighlighted && frame >= highlightStart
                  ? interpolate(
                      frame,
                      [highlightFrame, highlightFrame + 10],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    )
                  : 0;

              // Get visible text
              const visibleText = line.slice(0, visibleChars);

              // Tokenize visible text
              const tokens = tokenizeLine(visibleText, accentColor);

              // Show cursor on current line
              const showCursorHere = lineIndex === currentLineIndex && !typingDone;

              // Pulsing glow for highlighted lines
              const highlightGlow = isHighlighted && highlightProgress > 0
                ? 0.5 + Math.sin((frame - highlightFrame) * 0.3) * 0.3
                : 0;

              return (
                <div
                  key={lineIndex}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    minHeight: 60,
                    paddingRight: 48,
                    backgroundColor: isHighlighted
                      ? hexToRgba(accentColor, 0.1 * highlightProgress)
                      : "transparent",
                    borderLeft: isHighlighted
                      ? `4px solid ${hexToRgba(accentColor, highlightProgress)}`
                      : "4px solid transparent",
                    transition: "none",
                    boxShadow: isHighlighted && highlightGlow > 0
                      ? `inset 0 0 ${20 + highlightGlow * 30}px ${hexToRgba(accentColor, highlightGlow * 0.15)}`
                      : "none",
                  }}
                >
                  {/* Line number */}
                  <div
                    style={{
                      width: 80,
                      textAlign: "right",
                      paddingRight: 24,
                      fontFamily: fontFamily,
                      fontSize: 44,
                      fontWeight: 400,
                      color: isHighlighted
                        ? hexToRgba(accentColor, 0.4 + highlightProgress * 0.4)
                        : "#555555",
                      flexShrink: 0,
                      userSelect: "none",
                    }}
                  >
                    {lineNumber}
                  </div>

                  {/* Code text */}
                  <div
                    style={{
                      fontFamily: fontFamily,
                      fontSize: 48,
                      fontWeight: 400,
                      letterSpacing: -1,
                      lineHeight: 1.3,
                      whiteSpace: "pre",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  >
                    {tokens.map((token, ti) => (
                      <span key={ti} style={{ color: token.color }}>
                        {token.text}
                      </span>
                    ))}

                    {/* Blinking cursor */}
                    {showCursorHere && (
                      <span
                        style={{
                          color: accentColor,
                          opacity: blinkCursor ? 1 : 0,
                          marginLeft: 1,
                        }}
                      >
                        |
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
