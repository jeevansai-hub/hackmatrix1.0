"use client";
import React from "react";
import { motion } from "motion/react";
import { PixelGrid } from "@/components/ui/pixel-grid";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { HeistVaultCountdown } from "@/components/ui/heist-vault-countdown";

/** Essential event facts — level 4 of the hierarchy. */
const FACTS: { label: string; accent?: boolean }[] = [
  { label: "13–14 AUGUST 2026" },
  { label: "VIIT / DUVVADA" },
  { label: "2–4 MEMBERS" },
  { label: "₹400 / TEAM" },
  { label: "₹10,000+ PRIZE POOL", accent: true },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex w-full items-center justify-center overflow-hidden bg-black"
      style={{ minHeight: "100dvh" }}
    >
      {/* ── Interactive 3D pixel-grid background ── */}
      <div className="absolute inset-0 z-0">
        <PixelGrid
          cellSize={30}
          maxElevation={14}
          gapRatio={0.14}
          intensityCap={0.8}
          pointerRadius={7}
          className="h-full w-full"
        />
      </div>

      {/* Vignette keeps the centre readable */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* ── Frame 1: complete event overview ── */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center"
        style={{
          // Minimums are deliberately tight so short/landscape viewports
          // still fit the whole overview in one frame.
          paddingTop: "clamp(4.25rem, 12vh, 8rem)",
          paddingBottom: "clamp(1rem, 4.5vh, 3rem)",
          gap: "clamp(0.45rem, 1.85vh, 1.35rem)",
        }}
      >
        {/* 1 ── IDENTITY ─────────────────────────────── */}
        <motion.div {...fade(0.05)} className="flex flex-col items-center gap-1">
          <p
            className="font-mono uppercase text-white/60"
            style={{
              fontSize: "clamp(0.5rem, 1.45vw, 0.7rem)",
              letterSpacing: "0.28em",
            }}
          >
            Department of Artificial Intelligence &amp; Data Science
          </p>
          <p
            className="font-mono uppercase text-white/35"
            style={{
              fontSize: "clamp(0.44rem, 1.2vw, 0.62rem)",
              letterSpacing: "0.2em",
            }}
          >
            in association with Matrix Club &amp; IEEE CIS SBC
          </p>
        </motion.div>

        {/* 2 ── MAIN IDENTITY ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "backOut" }}
          className="flex flex-col items-center"
        >
          <h1
            className="font-black text-white"
            style={{
              fontSize: "clamp(2.6rem, min(14vw, 12.5vh), 8.5rem)",
              lineHeight: 0.86,
              letterSpacing: "-0.035em",
              textShadow: "0 0 80px rgba(220,38,38,0.45)",
            }}
          >
            HACK
            <SquigglyText scale={[6, 10]} className="text-red-500">
              MATRIX
            </SquigglyText>
          </h1>

          {/* version marker */}
          <div
            className="flex items-center justify-center gap-3"
            style={{ marginTop: "clamp(0.3rem, 1vh, 0.7rem)" }}
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-red-500/60 sm:w-14" />
            <span
              className="font-mono font-black text-red-500"
              style={{
                fontSize: "clamp(0.95rem, 3.2vw, 1.6rem)",
                letterSpacing: "0.16em",
              }}
            >
              1.0
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-red-500/60 sm:w-14" />
          </div>
        </motion.div>

        {/* 3 ── EVENT POSITIONING ────────────────────── */}
        <motion.div {...fade(0.3)} className="flex flex-col items-center gap-1.5">
          <p
            className="font-bold uppercase text-white"
            style={{
              fontSize: "clamp(0.78rem, 2.5vw, 1.35rem)",
              letterSpacing: "0.2em",
            }}
          >
            2-Day Hackathon 2026
          </p>
          <p
            className="font-mono uppercase text-red-400"
            style={{
              fontSize: "clamp(0.55rem, 1.7vw, 0.85rem)",
              letterSpacing: "0.3em",
              textShadow: "0 0 22px rgba(220,38,38,0.45)",
            }}
          >
            Build Today. Secure Tomorrow.
          </p>
        </motion.div>

        {/* 4 ── ESSENTIAL EVENT FACTS ────────────────── */}
        <motion.ul
          {...fade(0.4)}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4"
        >
          {FACTS.map((fact, i) => (
            <React.Fragment key={fact.label}>
              {i > 0 && (
                <li aria-hidden className="h-3 w-px bg-white/15 max-sm:hidden" />
              )}
              <li
                className={
                  fact.accent
                    ? "font-mono font-bold uppercase text-red-400"
                    : "font-mono uppercase text-white/70"
                }
                style={{
                  fontSize: "clamp(0.52rem, 1.55vw, 0.78rem)",
                  letterSpacing: "0.14em",
                }}
              >
                {fact.label}
              </li>
            </React.Fragment>
          ))}
        </motion.ul>

        {/* 5 ── LIVE COUNTDOWN ───────────────────────── */}
        <motion.div {...fade(0.5)}>
          <HeistVaultCountdown targetDate="2026-08-13T09:00:00" compact />
        </motion.div>

        {/* 6 ── PRIMARY ACTIONS ──────────────────────── */}
        <motion.div
          {...fade(0.6)}
          className="flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row sm:gap-3"
          style={{ marginTop: "clamp(0.15rem, 0.8vh, 0.6rem)" }}
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd5HanrWsfYyQty8iWnHXvGu7NeqM2EEjd4x8nwqq0TJcpCGw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-red-600 px-7 font-bold uppercase text-white shadow-lg shadow-red-900/40 transition-all hover:bg-red-500 hover:shadow-red-600/50 sm:w-auto"
            style={{
              height: "clamp(2.6rem, 6vh, 3.25rem)",
              fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)",
              letterSpacing: "0.14em",
            }}
          >
            <span className="relative z-10">Register Your Team</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              →
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          <a
            href="#about"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 font-medium uppercase text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/10 sm:w-auto"
            style={{
              height: "clamp(2.6rem, 6vh, 3.25rem)",
              fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)",
              letterSpacing: "0.14em",
            }}
          >
            Explore the Hackathon
            <span className="transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
