"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/* ────────────────────────────────────────────────────────────
   DEVELOPER CREDIT — appears once, then dissolves away for good.

   Flow when the footer scrolls into view:
     1. "show"     → gradient text fades in, holds static & readable
     2. "dissolve" → the whole line dissolves smoothly (fade + blur + rise)
     3. "done"     → removed from the DOM; never shown again this session

   A single motion animation drives the disappear, so it can never
   loop or flash back. It plays once per page load, so a plain refresh
   shows it again. Theme-matched: red/white on black.
   ──────────────────────────────────────────────────────────── */

const HOLD_MS = 2600; // how long the text stays static & readable
const DISSOLVE_MS = 1200; // smooth disappear duration

type Phase = "idle" | "show" | "dissolve" | "done";

export default function DeveloperCredit() {
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");

  // Kick off the sequence when the credit enters view (once per page load).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        setPhase("show"); // fade in, then hold static
        timers.push(setTimeout(() => setPhase("dissolve"), HOLD_MS));
        timers.push(
          setTimeout(() => setPhase("done"), HOLD_MS + DISSOLVE_MS),
        );
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  // Once finished, render nothing — gone until the next page load.
  if (phase === "done") return null;

  const dissolving = phase === "dissolve";

  return (
    <div
      ref={ref}
      className="pointer-events-none mx-auto flex h-6 w-full max-w-[24rem] items-center justify-center overflow-hidden"
    >
      <motion.p
        aria-label="Developed by M. Jeevan Sai & L. Prasanth"
        initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
        animate={
          dissolving
            ? { opacity: 0, y: -8, filter: "blur(10px)" }
            : { opacity: phase === "show" ? 1 : 0, y: 0, filter: "blur(0px)" }
        }
        transition={{
          duration: dissolving ? DISSOLVE_MS / 1000 : 0.6,
          ease: dissolving ? [0.4, 0, 0.2, 1] : "easeOut",
        }}
        className="whitespace-nowrap text-center font-sans text-[13px] font-semibold tracking-wide"
      >
        <span className="text-white/45">Developed by </span>
        <span className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
          M. Jeevan Sai
        </span>
        <span className="mx-1 text-red-400/60">&amp;</span>
        <span className="bg-gradient-to-r from-red-500 via-red-200 to-white bg-clip-text text-transparent">
          L. Prasanth
        </span>
      </motion.p>
    </div>
  );
}
