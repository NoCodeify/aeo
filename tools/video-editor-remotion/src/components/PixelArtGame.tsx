import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  staticFile,
  delayRender,
  continueRender,
  Img,
} from "remotion";

// ═══════════════════════════════════════════════════════════════════
// METAL SLUG–STYLE SIDE-SCROLLER  (Imagen sprite sheets + Remotion)
// ═══════════════════════════════════════════════════════════════════

// ── Asset paths ─────────────────────────────────────────────────────
const ASSETS = {
  player: staticFile("pixel-game/player-spritesheet_3.jpg"),
  enemy: staticFile("pixel-game/enemy-spritesheet_1.jpg"),
  explosion: staticFile("pixel-game/explosion-spritesheet_2.jpg"),
  background: staticFile("pixel-game/background_2.jpg"),
};

// ── Sprite sheet configs ────────────────────────────────────────────
// All sheets are 1408x768

const SHEET_W = 1408;
const SHEET_H = 768;

const PLAYER_COLS = 4;
const PLAYER_ROWS = 2;
const PLAYER_FW = SHEET_W / PLAYER_COLS; // 352
const PLAYER_FH = SHEET_H / PLAYER_ROWS; // 384

const ENEMY_COLS = 3;
const ENEMY_ROWS = 2;
const ENEMY_FW = Math.floor(SHEET_W / ENEMY_COLS); // 469
const ENEMY_FH = SHEET_H / ENEMY_ROWS; // 384

const EXPLOSION_COLS = 3;
const EXPLOSION_ROWS = 2;
const EXPLOSION_FW = Math.floor(SHEET_W / EXPLOSION_COLS); // 469
const EXPLOSION_FH = SHEET_H / EXPLOSION_ROWS; // 384

// ── Chromakey processor ─────────────────────────────────────────────
// Removes green (#00ff00-ish) pixels from sprite sheets

function useChromaKey(src: string): string | null {
  const [processed, setProcessed] = useState<string | null>(null);
  const [handle] = useState(() => delayRender("ChromaKey: " + src));

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        // Green screen: high green, low red & blue
        if (g > 120 && r < 160 && b < 120 && g > r * 1.2 && g > b * 1.5) {
          d[i + 3] = 0;
        }
        // Edge softening: semi-green pixels get partial transparency
        else if (g > 100 && r < 180 && b < 140 && g > r && g > b) {
          const greenness = (g - Math.max(r, b)) / g;
          if (greenness > 0.2) {
            d[i + 3] = Math.round(255 * (1 - greenness));
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessed(canvas.toDataURL("image/png"));
      continueRender(handle);
    };
    img.onerror = () => {
      continueRender(handle);
    };
    img.src = src;
  }, [src, handle]);

  return processed;
}

// ── Sprite frame renderer ───────────────────────────────────────────
// Crops a single frame from a processed sprite sheet

const SpriteFrame: React.FC<{
  sheet: string | null;
  col: number;
  row: number;
  frameW: number;
  frameH: number;
  sheetW: number;
  sheetH: number;
  x: number;
  y: number;
  scale: number;
  flipX?: boolean;
  opacity?: number;
}> = ({
  sheet,
  col,
  row,
  frameW,
  frameH,
  sheetW,
  sheetH,
  x,
  y,
  scale,
  flipX = false,
  opacity = 1,
}) => {
  if (!sheet) return null;

  const displayW = frameW * scale;
  const displayH = frameH * scale;
  const offsetX = col * frameW * scale;
  const offsetY = row * frameH * scale;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: displayW,
        height: displayH,
        overflow: "hidden",
        transform: flipX ? "scaleX(-1)" : undefined,
        opacity,
        imageRendering: "pixelated",
      }}
    >
      <img
        src={sheet}
        style={{
          position: "absolute",
          left: -offsetX,
          top: -offsetY,
          width: sheetW * scale,
          height: sheetH * scale,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// ── Muzzle flash (code-generated) ───────────────────────────────────
const MuzzleFlash: React.FC<{
  x: number;
  y: number;
  visible: boolean;
  scale: number;
}> = ({ x, y, visible, scale }) => {
  if (!visible) return null;
  const s = scale * 40;
  return (
    <>
      {/* Core white */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y - s * 0.3,
          width: s * 1.2,
          height: s * 0.6,
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          boxShadow: `0 0 ${s}px ${s * 0.5}px rgba(255,238,68,0.8), 0 0 ${s * 2}px ${s}px rgba(255,136,0,0.4)`,
        }}
      />
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          left: x - s * 0.3,
          top: y - s * 0.5,
          width: s * 1.8,
          height: s,
          backgroundColor: "rgba(255,170,0,0.6)",
          borderRadius: "50%",
          filter: `blur(${s * 0.3}px)`,
        }}
      />
    </>
  );
};

// ── Bullet tracer ───────────────────────────────────────────────────
const BulletTracer: React.FC<{
  x: number;
  y: number;
  width: number;
  opacity: number;
}> = ({ x, y, width, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height: 6,
      background: "linear-gradient(90deg, rgba(255,238,68,0) 0%, #ffee44 30%, #ffffff 100%)",
      opacity,
      borderRadius: 3,
      boxShadow: "0 0 8px 2px rgba(255,200,0,0.5)",
    }}
  />
);

// ── Particle system for extra debris/sparks ─────────────────────────
interface Spark {
  angle: number;
  speed: number;
  life: number;
  size: number;
  color: string;
}

const SparkBurst: React.FC<{
  cx: number;
  cy: number;
  time: number;
  triggerTime: number;
  sparks: Spark[];
}> = ({ cx, cy, time, triggerTime, sparks }) => {
  const elapsed = time - triggerTime;
  if (elapsed < 0 || elapsed > 1.2) return null;

  return (
    <>
      {sparks.map((s, i) => {
        const t = elapsed;
        if (t > s.life) return null;
        const progress = t / s.life;
        const px = cx + Math.cos(s.angle) * s.speed * t;
        const py = cy + Math.sin(s.angle) * s.speed * t + 500 * t * t;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: s.size * (1 - progress * 0.5),
              height: s.size * (1 - progress * 0.5),
              backgroundColor: s.color,
              opacity: 1 - progress,
              borderRadius: 2,
            }}
          />
        );
      })}
    </>
  );
};

function makeSparks(count: number, seed: number): Spark[] {
  return Array.from({ length: count }, (_, i) => ({
    angle: ((i + seed) / count) * Math.PI * 2 + seed * 0.1,
    speed: 150 + ((i * 137 + seed * 31) % 350),
    life: 0.4 + ((i * 53 + seed) % 60) / 100,
    size: 8 + ((i * 29 + seed) % 12),
    color: ["#ffee44", "#ff8800", "#ff4400", "#ffffff", "#ffcc00"][(i + seed) % 5],
  }));
}

// ── Screen flash on explosion ───────────────────────────────────────
const ScreenFlash: React.FC<{ time: number; triggers: number[] }> = ({
  time,
  triggers,
}) => {
  let opacity = 0;
  for (const trig of triggers) {
    const elapsed = time - trig;
    if (elapsed >= 0 && elapsed < 0.15) {
      opacity = Math.max(opacity, interpolate(elapsed, [0, 0.05, 0.15], [0.8, 0.6, 0]));
    }
  }
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: `rgba(255, 240, 200, ${opacity})`,
        pointerEvents: "none",
        zIndex: 90,
      }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export const PixelArtGame: React.FC<{ durationSec?: number }> = ({
  durationSec = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  // ── Process sprite sheets (chromakey green removal) ─────────────
  const playerSheet = useChromaKey(ASSETS.player);
  const enemySheet = useChromaKey(ASSETS.enemy);
  // Explosion has black bg — no chromakey needed, but we'll still process
  // to keep rendering consistent (black bg works with additive blending)

  // ── Scroll speed ──────────────────────────────────────────────────
  const scrollSpeed = 300;
  const scrollX = t * scrollSpeed;

  // ── Ground level ──────────────────────────────────────────────────
  const groundY = height * 0.78;

  // ── Player sprite scale (make character ~18% of screen height) ────
  const playerScale = (height * 0.22) / PLAYER_FH;
  const playerDisplayH = PLAYER_FH * playerScale;
  const playerDisplayW = PLAYER_FW * playerScale;

  // ── Player position ───────────────────────────────────────────────
  const playerScreenX = width * 0.15;
  const playerBaseY = groundY - playerDisplayH;

  // Jump arcs
  const jump1 =
    t >= 3 && t < 4
      ? Math.sin(
          interpolate(t, [3, 4], [0, Math.PI], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        ) * 280
      : 0;
  const jump2 =
    t >= 7 && t < 8
      ? Math.sin(
          interpolate(t, [7, 8], [0, Math.PI], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        ) * 220
      : 0;

  const playerY = playerBaseY - jump1 - jump2;

  // ── Player animation frame ────────────────────────────────────────
  // Row 0: 4 run frames, Row 1: 4 more run/action frames
  // Cycle through row 0 for running, use row 1 frames for shooting
  const isShooting =
    (t >= 1 && t < 2.5) ||
    (t >= 4.5 && t < 5.8) ||
    (t >= 6 && t < 6.8) ||
    (t >= 8 && t < 9.5);

  const runCol = Math.floor(t * 8) % 4;
  const shootCol = Math.floor(t * 10) % 4;

  const playerCol = isShooting ? shootCol : runCol;
  const playerRow = isShooting ? 1 : 0;

  // ── Enemies ───────────────────────────────────────────────────────
  const enemies = useMemo(
    () => [
      { id: 0, spawnT: 0.5, startX: width + 200, deathT: 2.0, speed: -250 },
      { id: 1, spawnT: 1.2, startX: width + 400, deathT: 2.3, speed: -220 },
      { id: 2, spawnT: 3.5, startX: width + 100, deathT: 5.0, speed: -280 },
      { id: 3, spawnT: 4.0, startX: width + 350, deathT: 5.2, speed: -200 },
      { id: 4, spawnT: 4.3, startX: width + 500, deathT: 5.5, speed: -240 },
      { id: 5, spawnT: 6.0, startX: width + 150, deathT: 6.6, speed: -300 },
      { id: 6, spawnT: 7.5, startX: width + 200, deathT: 8.8, speed: -220 },
      { id: 7, spawnT: 8.0, startX: width + 400, deathT: 9.0, speed: -260 },
      { id: 8, spawnT: 8.5, startX: width + 600, deathT: 9.3, speed: -230 },
    ],
    [width],
  );

  // Enemy sprite scale (~15% screen height)
  const enemyScale = (height * 0.18) / ENEMY_FH;
  const enemyDisplayH = ENEMY_FH * enemyScale;

  // ── Explosions ────────────────────────────────────────────────────
  const explosionScale = (height * 0.28) / EXPLOSION_FH;
  const deathTimes = useMemo(() => enemies.map((e) => e.deathT), [enemies]);

  // Spark particles for each explosion
  const sparkSets = useMemo(
    () => enemies.map((e, i) => makeSparks(15, i * 17 + 5)),
    [enemies],
  );

  // Big explosion at 5.5
  const bigSparks = useMemo(() => makeSparks(30, 99), []);

  // ── Bullets ───────────────────────────────────────────────────────
  const bullets = useMemo(() => {
    if (!isShooting) return [];
    return Array.from({ length: 5 }, (_, i) => {
      const phase = (t * 18 + i * 0.2) % 1;
      return {
        x: playerScreenX + playerDisplayW * 0.9 + phase * width * 0.7,
        y: playerY + playerDisplayH * 0.35 + Math.sin(phase * 8 + i) * 6,
        width: 60 + phase * 40,
        opacity: interpolate(phase, [0, 0.1, 0.8, 1], [0, 1, 0.6, 0]),
      };
    });
  }, [isShooting, t, playerScreenX, playerY, playerDisplayW, playerDisplayH, width]);

  // ── Screen shake ──────────────────────────────────────────────────
  let shakeX = 0;
  let shakeY = 0;
  const allExplosionTimes = [...deathTimes, 5.5];
  for (const trig of allExplosionTimes) {
    const elapsed = t - trig;
    if (elapsed >= 0 && elapsed < 0.5) {
      const intensity = (1 - elapsed / 0.5) * (trig === 5.5 ? 30 : 15);
      shakeX += Math.sin(elapsed * 70) * intensity;
      shakeY += Math.cos(elapsed * 55) * intensity;
    }
  }

  // ── Muzzle flash ──────────────────────────────────────────────────
  const showMuzzle = isShooting && Math.floor(t * 16) % 3 === 0;

  // ── Dust trail ────────────────────────────────────────────────────
  const isOnGround = jump1 === 0 && jump2 === 0;

  // ── HUD ───────────────────────────────────────────────────────────
  const score = Math.floor(t * 1000);
  const kills = enemies.filter((e) => t >= e.deathT).length;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        imageRendering: "pixelated",
        backgroundColor: "#1a1a1a",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        {/* ── SCROLLING BACKGROUND ──────────────────────────────── */}
        {/* Tile the background twice for seamless scroll */}
        {[0, 1, 2].map((i) => {
          const bgScale = height / 768;
          const bgW = 1408 * bgScale;
          const xPos = i * bgW - (scrollX % bgW);
          return (
            <img
              key={`bg-${i}`}
              src={ASSETS.background}
              style={{
                position: "absolute",
                left: xPos,
                top: 0,
                width: bgW,
                height: height,
                imageRendering: "pixelated",
                objectFit: "cover",
                pointerEvents: "none",
              }}
            />
          );
        })}

        {/* ── ENEMIES ────────────────────────────────────────────── */}
        {enemies.map((enemy) => {
          if (t < enemy.spawnT) return null;

          const elapsed = t - enemy.spawnT;
          const alive = t < enemy.deathT;
          const ex = enemy.startX + enemy.speed * elapsed;

          // Skip if offscreen
          if (ex < -500 || ex > width + 500) return null;

          let enemyOpacity = 1;
          let enemyOffsetY = 0;

          if (!alive) {
            const deathElapsed = t - enemy.deathT;
            if (deathElapsed > 1.0) return null;

            // Blink then fall
            if (deathElapsed < 0.3) {
              enemyOpacity = Math.floor(deathElapsed * 30) % 2 === 0 ? 1 : 0.1;
            } else {
              enemyOpacity = interpolate(deathElapsed, [0.3, 1.0], [0.8, 0], {
                extrapolateRight: "clamp",
              });
              enemyOffsetY = (deathElapsed - 0.3) * 400;
            }
          }

          // Animation frame: row 0 = run (3 frames), row 1 = shoot/hit/die
          let eCol: number;
          let eRow: number;

          if (!alive) {
            // Death frame: row 1, col 2 (dying)
            eCol = 2;
            eRow = 1;
          } else {
            // Running: cycle row 0
            eCol = Math.floor(t * 6 + enemy.id * 0.7) % 3;
            eRow = 0;
          }

          return (
            <SpriteFrame
              key={`enemy-${enemy.id}`}
              sheet={enemySheet}
              col={eCol}
              row={eRow}
              frameW={ENEMY_FW}
              frameH={ENEMY_FH}
              sheetW={SHEET_W}
              sheetH={SHEET_H}
              x={ex}
              y={groundY - enemyDisplayH + enemyOffsetY}
              scale={enemyScale}
              flipX={true}
              opacity={enemyOpacity}
            />
          );
        })}

        {/* ── BULLETS ────────────────────────────────────────────── */}
        {bullets.map((b, i) => (
          <BulletTracer
            key={`bullet-${i}`}
            x={b.x}
            y={b.y}
            width={b.width}
            opacity={b.opacity}
          />
        ))}

        {/* ── PLAYER ─────────────────────────────────────────────── */}
        <SpriteFrame
          sheet={playerSheet}
          col={playerCol}
          row={playerRow}
          frameW={PLAYER_FW}
          frameH={PLAYER_FH}
          sheetW={SHEET_W}
          sheetH={SHEET_H}
          x={playerScreenX}
          y={playerY}
          scale={playerScale}
        />

        {/* Muzzle flash */}
        <MuzzleFlash
          x={playerScreenX + playerDisplayW * 0.85}
          y={playerY + playerDisplayH * 0.38}
          visible={showMuzzle}
          scale={playerScale * 0.8}
        />

        {/* ── DUST TRAIL ─────────────────────────────────────────── */}
        {isOnGround &&
          Array.from({ length: 6 }, (_, i) => {
            const phase = (t * 10 + i * 0.17) % 1;
            const size = 12 * (1 - phase);
            return (
              <div
                key={`dust-${i}`}
                style={{
                  position: "absolute",
                  left:
                    playerScreenX +
                    playerDisplayW * 0.2 -
                    phase * 100 -
                    i * 15,
                  top: groundY - 10 - phase * 40,
                  width: size,
                  height: size * 0.7,
                  backgroundColor: "#a09070",
                  opacity: (1 - phase) * 0.5,
                  borderRadius: "50%",
                  filter: `blur(${phase * 3}px)`,
                }}
              />
            );
          })}

        {/* ── EXPLOSION SPRITES ───────────────────────────────────── */}
        {enemies.map((enemy, i) => {
          const elapsed = t - enemy.deathT;
          if (elapsed < 0 || elapsed > 0.7) return null;

          // 6 frames over 0.7s
          const frameIdx = Math.min(5, Math.floor((elapsed / 0.7) * 6));
          const eCol = frameIdx % EXPLOSION_COLS;
          const eRow = Math.floor(frameIdx / EXPLOSION_COLS);

          const enemyElapsed = enemy.deathT - enemy.spawnT;
          const ex = enemy.startX + enemy.speed * enemyElapsed;

          return (
            <React.Fragment key={`exp-${i}`}>
              <SpriteFrame
                sheet={ASSETS.explosion}
                col={eCol}
                row={eRow}
                frameW={EXPLOSION_FW}
                frameH={EXPLOSION_FH}
                sheetW={SHEET_W}
                sheetH={SHEET_H}
                x={ex - EXPLOSION_FW * explosionScale * 0.2}
                y={groundY - EXPLOSION_FH * explosionScale * 0.9}
                scale={explosionScale}
                opacity={interpolate(elapsed, [0, 0.5, 0.7], [1, 1, 0], {
                  extrapolateRight: "clamp",
                })}
              />
              {/* Spark particles */}
              <SparkBurst
                cx={ex + ENEMY_FW * enemyScale * 0.5}
                cy={groundY - enemyDisplayH * 0.5}
                time={t}
                triggerTime={enemy.deathT}
                sparks={sparkSets[i]}
              />
            </React.Fragment>
          );
        })}

        {/* ── BIG EXPLOSION at 5.5s ──────────────────────────────── */}
        {(() => {
          const elapsed = t - 5.5;
          if (elapsed < 0 || elapsed > 0.9) return null;
          const frameIdx = Math.min(5, Math.floor((elapsed / 0.9) * 6));
          const eCol = frameIdx % EXPLOSION_COLS;
          const eRow = Math.floor(frameIdx / EXPLOSION_COLS);
          const bigScale = explosionScale * 1.8;
          return (
            <React.Fragment>
              <SpriteFrame
                sheet={ASSETS.explosion}
                col={eCol}
                row={eRow}
                frameW={EXPLOSION_FW}
                frameH={EXPLOSION_FH}
                sheetW={SHEET_W}
                sheetH={SHEET_H}
                x={width * 0.55}
                y={groundY - EXPLOSION_FH * bigScale}
                scale={bigScale}
                opacity={interpolate(elapsed, [0, 0.7, 0.9], [1, 1, 0], {
                  extrapolateRight: "clamp",
                })}
              />
              <SparkBurst
                cx={width * 0.6}
                cy={groundY - EXPLOSION_FH * bigScale * 0.4}
                time={t}
                triggerTime={5.5}
                sparks={bigSparks}
              />
            </React.Fragment>
          );
        })()}
      </div>

      {/* ── SCREEN FLASH ───────────────────────────────────────── */}
      <ScreenFlash time={t} triggers={allExplosionTimes} />

      {/* ── HUD (outside shake) ────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 70,
          fontFamily: '"Courier New", monospace',
          fontWeight: 900,
          fontSize: 64,
          color: "#ffffff",
          textShadow:
            "4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
          letterSpacing: 3,
          zIndex: 200,
        }}
      >
        <span style={{ color: "#ffaa00", fontSize: 48 }}>SCORE </span>
        {String(score).padStart(7, "0")}
      </div>

      <div
        style={{
          position: "absolute",
          top: 50,
          right: 70,
          fontFamily: '"Courier New", monospace',
          fontWeight: 900,
          fontSize: 64,
          color: "#ffffff",
          textShadow:
            "4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
          letterSpacing: 3,
          zIndex: 200,
        }}
      >
        <span style={{ color: "#ff4444", fontSize: 48 }}>KILLS </span>
        {kills}
        <span style={{ color: "#888", fontSize: 40 }}>/9</span>
      </div>

      {/* Lives */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 70,
          display: "flex",
          gap: 20,
          zIndex: 200,
        }}
      >
        {[0, 1, 2].map((i) => (
          <svg key={i} width="40" height="36" viewBox="0 0 40 36">
            <path
              d="M20 35 L3 18 C-4 10 3 0 12 0 C16 0 20 3 20 8 C20 3 24 0 28 0 C37 0 44 10 37 18 Z"
              fill="#ff3333"
              stroke="#881111"
              strokeWidth="2"
            />
          </svg>
        ))}
      </div>

      {/* ── SCANLINES ──────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 2px, transparent 2px, transparent 5px)",
          pointerEvents: "none",
          zIndex: 300,
        }}
      />

      {/* ── VIGNETTE ───────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
          zIndex: 301,
        }}
      />
    </AbsoluteFill>
  );
};
