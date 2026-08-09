"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$()-+&=;:'\"%,./?°|";

// Characters used for the *intermediate* scramble only — clean A–Z/0–9 so no
// odd symbols or foreign-looking glyphs flash while a tile is settling.
const SCRAMBLE_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const BOARD_ROWS = 2;
const BOARD_COLS = 16;

const BASE_COL_DELAY = 30;
const BASE_ROW_DELAY = 20;
const BASE_STEP_MS = 55;
const BASE_FLIP_S = 0.35;
const BASE_TOTAL_S =
  ((BOARD_COLS - 1) * BASE_COL_DELAY +
    (BOARD_ROWS - 1) * BASE_ROW_DELAY +
    8 * BASE_STEP_MS) /
  1000;

type AccentColor = {
  top: string;
  bottom: string;
  text: string;
};

// Curated "heist" palette — coherent crimson / gold / white instead of a
// noisy rainbow. Each entry uses a subtle vertical gradient for real depth.
const ACCENT_COLORS: AccentColor[] = [
  {
    top: "bg-gradient-to-b from-red-500 to-red-600",
    bottom: "bg-gradient-to-b from-red-600 to-red-800",
    text: "text-white",
  },
  {
    top: "bg-gradient-to-b from-red-700 to-red-800",
    bottom: "bg-gradient-to-b from-red-800 to-red-950",
    text: "text-white",
  },
  {
    top: "bg-gradient-to-b from-orange-400 to-orange-500",
    bottom: "bg-gradient-to-b from-orange-500 to-orange-700",
    text: "text-white",
  },
  {
    top: "bg-gradient-to-b from-amber-300 to-amber-400",
    bottom: "bg-gradient-to-b from-amber-400 to-amber-600",
    text: "text-neutral-900",
  },
  {
    top: "bg-gradient-to-b from-white to-neutral-200",
    bottom: "bg-gradient-to-b from-neutral-200 to-neutral-400",
    text: "text-neutral-900",
  },
];

// Probability that a mid-scramble character flashes an accent color.
// 0 = every tile stays a single, consistent color while typing (no rainbow).
const ACCENT_FLICKER = 0;

// Default "resting" flap surfaces — brushed graphite with a lit top edge.
const DEFAULT_TOP = "bg-gradient-to-b from-neutral-700 to-neutral-900";
const DEFAULT_BOTTOM = "bg-gradient-to-b from-neutral-900 to-black";
const DEFAULT_FLAP_TOP = "bg-gradient-to-b from-neutral-700 to-neutral-900";

const CELL_TEXT_STYLE: React.CSSProperties = {
  fontSize: "clamp(6px, 2vw, 22px)",
  lineHeight: 1,
  fontFamily: "var(--font-flap), ui-monospace, monospace",
};

const FlapCell = React.memo(function FlapCell({
  target,
  delay,
  stepMs,
  flipDuration,
}: {
  target: string;
  delay: number;
  stepMs: number;
  flipDuration: number;
}) {
  const [current, setCurrent] = useState(" ");
  const [prev, setPrev] = useState(" ");
  const [flipId, setFlipId] = useState(0);
  const [accent, setAccent] = useState<AccentColor | null>(null);
  const [prevAccent, setPrevAccent] = useState<AccentColor | null>(null);
  const curRef = useRef(" ");
  const tgtRef = useRef<string | null>(null);
  const accentRef = useRef<AccentColor | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (startTimer.current) clearTimeout(startTimer.current);
    if (stepTimer.current) clearTimeout(stepTimer.current);
    startTimer.current = null;
    stepTimer.current = null;

    const normalized = FLAP_CHARS.includes(target.toUpperCase())
      ? target.toUpperCase()
      : " ";
    if (normalized === tgtRef.current) return;
    tgtRef.current = normalized;

    if (normalized === " " && curRef.current === " ") return;

    const scrambleCount =
      normalized === " "
        ? 8 + Math.floor(Math.random() * 8)
        : 25 + Math.floor(Math.random() * 15);

    const runStep = (i: number) => {
      const isLast = i === scrambleCount;
      const ch = isLast
        ? normalized
        : SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];

      const newAccent = isLast
        ? null
        : Math.random() < ACCENT_FLICKER
          ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
          : null;

      setPrev(curRef.current);
      setPrevAccent(accentRef.current);
      curRef.current = ch;
      accentRef.current = newAccent;
      setCurrent(ch);
      setAccent(newAccent);
      setFlipId((n) => n + 1);

      if (!isLast) {
        stepTimer.current = setTimeout(() => runStep(i + 1), stepMs);
      }
    };

    startTimer.current = setTimeout(() => runStep(1), delay);

    return () => {
      if (startTimer.current) clearTimeout(startTimer.current);
      if (stepTimer.current) clearTimeout(stepTimer.current);
      startTimer.current = null;
      stepTimer.current = null;
      tgtRef.current = null;
    };
  }, [target, delay, stepMs]);

  const show = current === " " ? "\u00A0" : current;
  const showPrev = prev === " " ? "\u00A0" : prev;

  const textCx =
    "absolute inset-x-0 flex select-none items-center justify-center font-mono font-bold tracking-wide";
  const topBg = accent?.top ?? DEFAULT_TOP;
  const bottomBg = accent?.bottom ?? DEFAULT_BOTTOM;
  const textColor = accent?.text ?? "text-white";

  const flapTopBg = prevAccent?.top ?? DEFAULT_FLAP_TOP;
  const flapTextColor = prevAccent?.text ?? "text-white";

  const bottomDelay = flipDuration * 0.5;

  return (
    <div className="flex aspect-3/6 flex-col overflow-hidden rounded-[2px] border border-neutral-800 md:rounded-[3px] md:border-2 dark:border-black">
      <div className="relative flex-1 perspective-dramatic transform-3d">
        <div className="absolute inset-0 z-40 hidden flex-row items-center justify-center md:flex">
          <div className="h-1/2 w-px rounded-tr-sm rounded-br-sm bg-black" />
          <div className="flex h-px flex-1 bg-black" />
          <div className="h-1/2 w-px rounded-tl-sm rounded-bl-sm bg-black" />
        </div>

        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[calc(50%-0.5px)] overflow-hidden rounded-t-[3px]",
            topBg,
          )}
        >
          <div
            className={cn(textCx, textColor, "top-0 h-[200%]")}
            style={CELL_TEXT_STYLE}
          >
            {show}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.14),transparent_65%)]" />
        </div>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-[calc(50%-0.5px)] overflow-hidden rounded-b-[3px]",
            bottomBg,
          )}
        >
          <div
            className={cn(textCx, textColor, "bottom-0 h-[200%]")}
            style={CELL_TEXT_STYLE}
          >
            {show}
          </div>
          {flipId > 0 && (
            <motion.div
              key={`s${flipId}`}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),transparent_60%)]"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0 }}
              transition={{ duration: flipDuration * 1.3, ease: "easeOut" }}
            />
          )}
        </div>

        {flipId > 0 && (
          <motion.div
            key={flipId}
            className={cn(
              "absolute inset-x-0 top-0 z-10 h-[calc(50%-0.5px)] origin-bottom overflow-hidden rounded-t-[3px] backface-hidden transform-3d",
              flapTopBg,
            )}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -100 }}
            transition={{
              duration: flipDuration,
              ease: [0.55, 0.055, 0.675, 0.19],
            }}
          >
            <div
              className={cn(textCx, flapTextColor, "top-0 h-[200%]")}
              style={CELL_TEXT_STYLE}
            >
              {showPrev}
            </div>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: flipDuration }}
            />
          </motion.div>
        )}

        {flipId > 0 && (
          <motion.div
            key={`b${flipId}`}
            className={cn(
              "absolute inset-x-0 bottom-0 z-10 h-[calc(50%-0.5px)] origin-top overflow-hidden rounded-b-[3px] backface-hidden transform-3d",
              bottomBg,
            )}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{
              duration: flipDuration * 0.85,
              delay: bottomDelay,
              ease: [0.33, 1.55, 0.64, 1],
            }}
          >
            <div
              className={cn(textCx, textColor, "bottom-0 h-[200%]")}
              style={CELL_TEXT_STYLE}
            >
              {show}
            </div>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0),rgba(0,0,0,0.6))]"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: flipDuration * 0.85,
                delay: bottomDelay,
              }}
            />
          </motion.div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-[0.5px] bg-black/50" />
      </div>

      <div className="h-2 w-full bg-[repeating-linear-gradient(to_bottom,currentColor_0,currentColor_1px,transparent_1px,transparent_0.15rem)] mask-t-from-50% text-black opacity-100 md:h-4 md:bg-[repeating-linear-gradient(to_bottom,currentColor_0,currentColor_1px,transparent_1px,transparent_0.2rem)]" />
    </div>
  );
},
(prevProps, nextProps) =>
  prevProps.target === nextProps.target &&
  prevProps.delay === nextProps.delay &&
  prevProps.stepMs === nextProps.stepMs &&
  prevProps.flipDuration === nextProps.flipDuration,
);

const COLOR_MAP: Record<string, string> = {
  "{R}": "#D32F2F",
  "{O}": "#F57C00",
  "{Y}": "#FBC02D",
  "{G}": "#43A047",
  "{B}": "#1E88E5",
  "{V}": "#8E24AA",
  "{W}": "#FAFAFA",
};

const ColorCell = React.memo(function ColorCell({ color }: { color: string }) {
  return (
    <div
      className="aspect-3/5 rounded-[3px] border-2 border-black"
      style={{ backgroundColor: color }}
    />
  );
});

type ParsedCell =
  | { type: "char"; value: string }
  | { type: "color"; hex: string };

function parseRow(row: string): ParsedCell[] {
  const cells: ParsedCell[] = [];
  let i = 0;
  while (i < row.length) {
    if (row[i] === "{" && i + 2 < row.length && row[i + 2] === "}") {
      const code = row.substring(i, i + 3);
      if (COLOR_MAP[code]) {
        cells.push({ type: "color", hex: COLOR_MAP[code] });
        i += 3;
        continue;
      }
    }
    cells.push({ type: "char", value: row[i] });
    i++;
  }
  return cells;
}

function wrapParagraph(paragraph: string, maxCols: number): string[] {
  const lines: string[] = [];
  const words = paragraph.split(/[ \t]+/).filter(Boolean);
  let currentLine = "";

  for (const word of words) {
    if (word.length > maxCols) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
      lines.push(word.slice(0, maxCols));
      continue;
    }

    if (!currentLine) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxCols) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

function wrapText(input: string, maxCols: number): string[] {
  return input
    .split("\n")
    .flatMap((paragraph) =>
      paragraph.trim() === "" ? [""] : wrapParagraph(paragraph, maxCols),
    );
}

export interface TextFlippingBoardProps {
  rows?: string[];
  text?: string;
  className?: string;
  duration?: number;
  /** Swoop the board in from a tilted 3D camera angle and rest with depth. */
  cinematic?: boolean;
}

export function TextFlippingBoard({
  rows,
  text,
  className,
  duration = BASE_TOTAL_S,
  cinematic = true,
}: TextFlippingBoardProps) {
  const scale = duration / BASE_TOTAL_S;
  const colDelay = BASE_COL_DELAY * scale;
  const rowDelay = BASE_ROW_DELAY * scale;
  const stepMs = BASE_STEP_MS * scale;
  const flipDur = Math.min(0.6, Math.max(0.15, BASE_FLIP_S * scale));

  const board = useMemo(() => {
    const grid: ParsedCell[][] = Array.from({ length: BOARD_ROWS }, () =>
      Array.from({ length: BOARD_COLS }, () => ({
        type: "char" as const,
        value: " ",
      })),
    );

    if (text) {
      const lines = wrapText(text, BOARD_COLS).slice(0, BOARD_ROWS);
      const startRow = Math.max(0, Math.floor((BOARD_ROWS - lines.length) / 2));
      lines.forEach((line, i) => {
        const row = startRow + i;
        if (row >= BOARD_ROWS) return;
        const parsed = parseRow(line);
        const startCol = Math.max(
          0,
          Math.floor((BOARD_COLS - parsed.length) / 2),
        );
        parsed.forEach((cell, c) => {
          if (startCol + c < BOARD_COLS) {
            grid[row][startCol + c] = cell;
          }
        });
      });
    } else if (rows) {
      rows.forEach((row, r) => {
        if (r >= BOARD_ROWS) return;
        const parsed = parseRow(row);
        parsed.forEach((cell, c) => {
          if (c < BOARD_COLS) {
            grid[r][c] = cell;
          }
        });
      });
    }

    return grid;
  }, [rows, text]);

  const panel = (
    <div
      className={cn(
        "relative mx-auto w-full max-w-3xl rounded-xl p-3 md:rounded-2xl md:p-4",
        // machined brushed-metal housing
        "bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950",
        "ring-1 ring-white/10 border border-white/5",
        "shadow-[0_2px_0_0_rgba(255,255,255,0.06)_inset,0_-2px_24px_0_rgba(0,0,0,0.6)_inset,0_45px_120px_-30px_rgba(220,38,38,0.4),0_20px_60px_-20px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {/* corner screws */}
      {[
        "left-2 top-2",
        "right-2 top-2",
        "left-2 bottom-2",
        "right-2 bottom-2",
      ].map((pos) => (
        <div
          key={pos}
          className={cn(
            "pointer-events-none absolute z-30 h-1.5 w-1.5 rounded-full md:h-2 md:w-2",
            "bg-[radial-gradient(circle_at_35%_30%,#a3a3a3,#404040_60%,#171717)] shadow-[0_1px_1px_rgba(0,0,0,0.8)]",
            pos,
          )}
        />
      ))}

      <div
        className="relative grid gap-px md:gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) =>
            cell.type === "color" ? (
              <ColorCell key={`${r}-${c}`} color={cell.hex} />
            ) : (
              <FlapCell
                key={`${r}-${c}`}
                target={cell.value}
                delay={c * colDelay + r * rowDelay}
                stepMs={stepMs}
                flipDuration={flipDur}
              />
            ),
          ),
        )}
      </div>

      {/* glass gloss + vignette over the whole board */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_18%,transparent_82%,rgba(0,0,0,0.35))] md:rounded-2xl" />
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.08),transparent_55%)] md:rounded-2xl" />
    </div>
  );

  if (!cinematic) return panel;

  return (
    <div
      className="w-full"
      style={{ perspective: "1600px", perspectiveOrigin: "50% 30%" }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
        initial={{ rotateX: 26, rotateY: -14, scale: 0.9, opacity: 0, y: 40 }}
        animate={{ rotateX: 7, rotateY: -2.5, scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {panel}
      </motion.div>
    </div>
  );
}
