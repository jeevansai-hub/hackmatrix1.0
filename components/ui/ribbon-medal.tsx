"use client";
import React from "react";

/* ────────────────────────────────────────────────────────────
   Flat "ribbon medal" badge — a perfectly round disc (thin rim +
   two-tone face) with a bold rank number and two symmetric
   hanging ribbon tails. Ribbon stays HackMatrix red across every
   rank so the badge ties back to the site's identity; only the
   disc face shifts gold / silver / bronze for rank recognition.
   ──────────────────────────────────────────────────────────── */

type RibbonMedalProps = {
  rank: 1 | 2 | 3;
  rimColor: string;
  discLight: string;
  discDark: string;
  numberColor: string;
  ribbonLight?: string;
  ribbonDark?: string;
  className?: string;
  style?: React.CSSProperties;
};

const CX = 50;
const CY = 40;
const RIM_R = 31;
const DISC_R = 27;

// Left ribbon tail, walked as a simple boundary: inner-top (near centre,
// hidden behind the disc) → outer-top → outer-tip → notch → inner-tip →
// back to inner-top. Right tail is an exact mirror across x = 50.
const L_INNER_TOP: [number, number] = [49, 54];
const L_OUTER_TOP: [number, number] = [38, 50];
const L_OUTER_TIP: [number, number] = [22, 108];
const L_NOTCH: [number, number] = [36, 92];
const L_INNER_TIP: [number, number] = [43, 108];

const mirrorX = ([x, y]: [number, number]): [number, number] => [100 - x, y];
const R_INNER_TOP = mirrorX(L_INNER_TOP);
const R_OUTER_TOP = mirrorX(L_OUTER_TOP);
const R_OUTER_TIP = mirrorX(L_OUTER_TIP);
const R_NOTCH = mirrorX(L_NOTCH);
const R_INNER_TIP = mirrorX(L_INNER_TIP);

const toPath = (pts: [number, number][]) =>
  `M${pts.map(([x, y]) => `${x},${y}`).join(" L")} Z`;

const LEFT_RIBBON = toPath([L_INNER_TOP, L_OUTER_TOP, L_OUTER_TIP, L_NOTCH, L_INNER_TIP]);
const LEFT_FOLD = toPath([L_INNER_TOP, L_NOTCH, L_INNER_TIP]);
const RIGHT_RIBBON = toPath([R_INNER_TOP, R_OUTER_TOP, R_OUTER_TIP, R_NOTCH, R_INNER_TIP]);
const RIGHT_FOLD = toPath([R_INNER_TOP, R_NOTCH, R_INNER_TIP]);

export function RibbonMedal({
  rank,
  rimColor,
  discLight,
  discDark,
  numberColor,
  ribbonLight = "#ef4444",
  ribbonDark = "#a01818",
  className,
  style,
}: RibbonMedalProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      style={style}
      role="img"
      aria-label={`${rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"} place medal`}
    >
      {/* ── ribbon tails (behind the disc) — flat base + inner fold shadow ── */}
      <path d={LEFT_RIBBON} fill={ribbonLight} />
      <path d={LEFT_FOLD} fill={ribbonDark} opacity={0.4} />
      <path d={RIGHT_RIBBON} fill={ribbonLight} />
      <path d={RIGHT_FOLD} fill={ribbonDark} opacity={0.4} />

      {/* ── perfectly round rim + disc ── */}
      <circle cx={CX} cy={CY} r={RIM_R} fill={rimColor} />
      <circle cx={CX} cy={CY} r={DISC_R} fill={discLight} />
      <path
        d={`M${CX},${CY - DISC_R} A${DISC_R},${DISC_R} 0 0 1 ${CX},${CY + DISC_R} Z`}
        fill={discDark}
      />
      <circle
        cx={CX}
        cy={CY}
        r={RIM_R - 1}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={1}
      />

      {/* ── rank number ── */}
      <text
        x={CX}
        y={CY + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="30"
        fontWeight={800}
        fill={numberColor}
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
      >
        {rank}
      </text>
    </svg>
  );
}
