"use client";
import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Trophy, X, Download, ExternalLink, Sparkles } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   DAY 1 RESULTS — PRELIMINARY ROUND
   A compact, cursor-reactive results poster preview card that
   sits in the hero (below the final-announcement countdown).
   Clicking it opens a cinematic full-screen viewer that shows
   the official results poster directly. Poster is served from
   /public and never reproduced here.
   ──────────────────────────────────────────────────────────── */

const RESULTS_SRC = "/results/day1-preliminary.jpeg";
const RESULTS_FILE = "HackMatrix-1.0-Day1-Preliminary-Results.jpeg";

export default function ResultsReveal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ResultsCard onOpen={() => setOpen(true)} />

      <AnimatePresence>
        {open && <ResultsViewer onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════ HERO RESULTS PREVIEW CARD ══════════════════════ */

function ResultsCard({ onOpen }: { onOpen: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 180,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180,
    damping: 20,
  });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.button
        onPointerMove={onMove}
        onPointerLeave={reset}
        onClick={onOpen}
        aria-label="Reveal Day 1 preliminary round results"
        whileHover={{ y: -4 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative flex items-center gap-4 rounded-2xl border border-red-500/40 bg-gradient-to-br from-zinc-900/90 via-black to-zinc-950 py-3 pl-3 pr-5 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.85)] backdrop-blur-sm transition-colors hover:border-red-400/70"
      >
        {/* crimson bloom */}
        <span className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-red-600/20 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* mini tilted poster thumbnail */}
        <span
          className="relative block h-14 w-11 shrink-0 overflow-hidden rounded-md border border-white/15 bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-lg sm:h-16 sm:w-12"
          style={{ transform: "rotate(-4deg)" }}
        >
          <span className="block bg-[#1e3a8a] px-1 py-1">
            <span className="block text-[4px] font-black leading-none text-white sm:text-[5px]">
              HACKMATRIX 1.0
            </span>
          </span>
          <span className="block space-y-[3px] px-1 py-1.5">
            {["w-full", "w-3/4", "w-full", "w-2/3", "w-5/6"].map((w, i) => (
              <span
                key={i}
                className={`block h-[2px] rounded-full bg-neutral-400/70 ${w}`}
              />
            ))}
          </span>
          {/* trophy stamp */}
          <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-white">
            <Trophy className="h-2 w-2" strokeWidth={2.5} />
          </span>
          {/* moving glare */}
          <motion.span
            aria-hidden
            style={{ left: glareX }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </span>

        {/* label */}
        <span className="relative z-10 flex flex-col items-start text-left leading-tight">
          <span className="flex items-center gap-2">
            <span className="flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span
              className="font-mono font-bold uppercase text-white"
              style={{
                fontSize: "clamp(0.72rem, 2vw, 0.92rem)",
                letterSpacing: "0.1em",
              }}
            >
              Day 1 Results Are Out
            </span>
          </span>
          <span
            className="mt-1 font-mono uppercase text-red-300/90"
            style={{
              fontSize: "clamp(0.5rem, 1.4vw, 0.64rem)",
              letterSpacing: "0.18em",
            }}
          >
            Preliminary Round · Click to reveal
          </span>
        </span>

        {/* reveal arrow */}
        <span className="relative z-10 ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-400 transition-all group-hover:bg-red-600 group-hover:text-white">
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      </motion.button>
    </div>
  );
}

/* ══════════════════════ FULL-SCREEN RESULTS VIEWER ══════════════════════ */

function ResultsViewer({ onClose }: { onClose: () => void }) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 14 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-red-500/20 bg-[#0a0a0c] shadow-2xl shadow-red-900/30"
      >
        {/* top bar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-red-500/[0.12] to-transparent px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/15 text-red-400">
              <Trophy className="h-4.5 w-4.5" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] tracking-[0.3em] text-red-400">
                PRELIMINARY ROUND
              </p>
              <p className="truncate text-sm font-black tracking-tight text-white">
                Day 1 Results · 13 August 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={RESULTS_SRC}
              download={RESULTS_FILE}
              onClick={(e) => e.stopPropagation()}
              className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-white/80 transition-colors hover:bg-white/10 sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" />
              SAVE
            </a>
            <a
              href={RESULTS_SRC}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-white/80 transition-colors hover:bg-white/10"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">FULL IMAGE</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close results"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/50 bg-red-500/15 text-red-400 transition-colors hover:bg-red-500 hover:text-white"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* body: the results poster, shown directly */}
        <div className="relative flex min-h-0 flex-1 flex-col bg-neutral-950">
          {/* subtle grid backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(220,38,38,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="pointer-events-none absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-red-600/15 blur-[120px]" />

          <div className="relative z-10 flex min-h-0 flex-1 items-start justify-center overflow-y-auto p-3 sm:p-6">
            <motion.img
              src={RESULTS_SRC}
              alt="HackMatrix 1.0 — Day 1 Preliminary Round Results"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl rounded-lg border border-white/10 shadow-2xl shadow-red-600/10"
            />
          </div>
        </div>

        {/* bottom note */}
        <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-black/40 px-4 py-3 text-center">
          <Sparkles className="h-3.5 w-3.5 text-red-400" strokeWidth={2} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-[11px]">
            Congratulations to all teams — best wishes for the next round
          </span>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
