"use client";
import React from "react";
import { motion } from "motion/react";
import { RibbonMedal } from "@/components/ui/ribbon-medal";

/* ────────────────────────────────────────────────────────────
   HACKMATRIX 1.0 — OFFICIAL WINNERS
   Compact, high-impact podium reveal for the hero. Chrome
   (border/glow/bg) stays in the site's red/black identity —
   only the medal icon carries a gold/silver/bronze accent.
   Card size steps down by rank for a real podium silhouette.
   ──────────────────────────────────────────────────────────── */

type Winner = {
  place: 1 | 2 | 3;
  label: string;
  team: string;
  members: string[];
};

const WINNERS: Winner[] = [
  {
    place: 1,
    label: "1st Place",
    team: "TEAM TOFFAN",
    members: [
      "P.Tulasi Priya",
      "P.Dinesh Sampath Ram",
      "R.Sai Vaibhav",
      "P.Charishma",
    ],
  },
  {
    place: 2,
    label: "2nd Place",
    team: "SYNTAX ERROR",
    members: [
      "Tanna Dusyanth",
      "Nikhil Runkana",
      "P.V.S.D.Lohith",
      "Pilla Premsatya",
    ],
  },
  {
    place: 3,
    label: "3rd Place",
    team: "EVORA",
    members: ["S.V.Kishore Reddy", "K.Ashritha", "K.Mounika"],
  },
];

const STEP: Record<
  1 | 2 | 3,
  {
    ring: string;
    glow: string;
    bg: string;
    rimColor: string;
    discLight: string;
    discDark: string;
    numberColor: string;
    medalGlow: string;
    pad: string;
    medalWidth: string;
    teamSize: string;
    labelSize: string;
    memberSize: string;
    mt: string;
    order: string;
  }
> = {
  1: {
    ring: "border-red-500/60 hover:border-red-400/90",
    glow: "bg-red-600/25",
    bg: "from-red-950/25 via-black to-zinc-950",
    rimColor: "#ffe08a",
    discLight: "#ffbe45",
    discDark: "#f2861f",
    numberColor: "#fff3d6",
    medalGlow: "rgba(220,38,38,0.5)",
    pad: "clamp(0.4rem, 1.7vw, 1.1rem)",
    medalWidth: "clamp(2.1rem, 6.6vw, 3.6rem)",
    teamSize: "clamp(0.62rem, 2.5vw, 1.05rem)",
    labelSize: "clamp(0.42rem, 1.5vw, 0.72rem)",
    memberSize: "clamp(6.5px, 1.9vw, 10.5px)",
    mt: "sm:mt-0",
    order: "sm:order-2",
  },
  2: {
    ring: "border-red-500/30 hover:border-red-400/60",
    glow: "bg-red-600/10",
    bg: "from-zinc-900/90 via-black to-zinc-950",
    rimColor: "#eef1f4",
    discLight: "#cfd6dd",
    discDark: "#97a2ad",
    numberColor: "#ffffff",
    medalGlow: "rgba(220,38,38,0.28)",
    pad: "clamp(0.3rem, 1.3vw, 0.8rem)",
    medalWidth: "clamp(1.7rem, 5.2vw, 2.7rem)",
    teamSize: "clamp(0.52rem, 2vw, 0.88rem)",
    labelSize: "clamp(0.36rem, 1.2vw, 0.62rem)",
    memberSize: "clamp(6px, 1.7vw, 10px)",
    mt: "sm:mt-7",
    order: "sm:order-1",
  },
  3: {
    ring: "border-red-500/20 hover:border-red-400/45",
    glow: "bg-red-600/5",
    bg: "from-zinc-900/80 via-black to-zinc-950",
    rimColor: "#e7c39a",
    discLight: "#cd8a4e",
    discDark: "#9c5f2e",
    numberColor: "#fff3e0",
    medalGlow: "rgba(220,38,38,0.16)",
    pad: "clamp(0.26rem, 1.1vw, 0.7rem)",
    medalWidth: "clamp(1.5rem, 4.6vw, 2.3rem)",
    teamSize: "clamp(0.46rem, 1.8vw, 0.8rem)",
    labelSize: "clamp(0.33rem, 1.1vw, 0.58rem)",
    memberSize: "clamp(5.5px, 1.6vw, 9.5px)",
    mt: "sm:mt-11",
    order: "sm:order-3",
  },
};

export default function WinnersPodium() {
  // Visual order: 2nd — 1st — 3rd, with 1st the tallest (classic podium read).
  const order: Winner[] = [WINNERS[1], WINNERS[0], WINNERS[2]];

  return (
    <div className="flex w-full flex-col items-center gap-2 sm:gap-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <span className="flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <p
          className="font-mono font-bold uppercase text-red-400"
          style={{
            fontSize: "clamp(0.5rem, 1.7vw, 0.78rem)",
            letterSpacing: "0.22em",
            textShadow: "0 0 22px rgba(220,38,38,0.45)",
          }}
        >
          HackMatrix 1.0 · Official Winners
        </p>
      </motion.div>

      {/* Always 3 columns — even on the smallest phones — so the full
          podium reads in one frame instead of stacking full-width cards. */}
      <div className="grid w-full max-w-2xl grid-cols-3 items-end gap-1.5 sm:gap-3">
        {order.map((w, i) => {
          const s = STEP[w.place];
          return (
            <motion.div
              key={w.team}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08 * i,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              style={{ padding: s.pad }}
              className={`group relative ${s.order} ${s.mt} rounded-xl sm:rounded-2xl border ${s.ring} bg-gradient-to-b ${s.bg} text-center shadow-[0_16px_40px_-14px_rgba(0,0,0,0.85)] backdrop-blur-sm transition-colors`}
            >
              {/* glow */}
              <span
                className={`pointer-events-none absolute -inset-2 -z-10 rounded-3xl ${s.glow} opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
              />

              <RibbonMedal
                rank={w.place}
                rimColor={s.rimColor}
                discLight={s.discLight}
                discDark={s.discDark}
                numberColor={s.numberColor}
                className="mx-auto block"
                style={{
                  width: s.medalWidth,
                  filter: `drop-shadow(0 2px 6px ${s.medalGlow})`,
                }}
              />

              <p
                className="mt-1 font-mono font-bold uppercase text-red-400 sm:mt-2"
                style={{ fontSize: s.labelSize, letterSpacing: "0.14em" }}
              >
                {w.label}
              </p>

              <p
                className="mt-0.5 break-words font-black uppercase text-white sm:mt-1"
                style={{
                  fontSize: s.teamSize,
                  letterSpacing: "0.01em",
                  lineHeight: 1.1,
                }}
              >
                {w.team}
              </p>

              <ul className="mt-1 space-y-0.5 border-t border-white/10 pt-1 sm:mt-2 sm:pt-2">
                {w.members.map((m) => (
                  <li
                    key={m}
                    className="break-words font-mono leading-snug text-white/55"
                    style={{ fontSize: s.memberSize }}
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
