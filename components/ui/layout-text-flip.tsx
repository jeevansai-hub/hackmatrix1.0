"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}: {
  text: string;
  words: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // ── Pointer-driven 3D tilt (cinematic parallax) ──
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), spring);
  const glowX = useTransform(mx, [-0.5, 0.5], [25, 75]);
  const glowY = useTransform(my, [-0.5, 0.5], [25, 75]);
  // Pointer-following specular highlight, composed at the top level.
  const highlight = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(120px circle at ${x}% ${y}%, rgba(248,113,113,0.22), transparent 70%)`,
  );

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my],
  );

  const handleLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  useEffect(() => {
    if (words.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <div
      ref={wrapRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
      style={{ perspective: 1100 }}
    >
      {/* ── Static label ── */}
      <motion.span
        layoutId="subtext"
        className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-2xl font-black tracking-tight text-transparent md:text-4xl"
        style={{ textShadow: "0 0 30px rgba(220,38,38,0.25)" }}
      >
        {text}
      </motion.span>

      {/* ── Flipping capsule ── */}
      <motion.div
        layout
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ layout: { type: "spring", stiffness: 260, damping: 28 } }}
        className="relative w-fit rounded-xl"
      >
        {/* rotating conic sheen (the "ring of light") */}
        <motion.span
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -inset-px rounded-xl opacity-80 [background:conic-gradient(from_0deg,transparent_0deg,#dc2626_50deg,#f87171_95deg,transparent_150deg,transparent_360deg)]"
        />

        {/* ambient crimson bloom */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl bg-red-600/25 blur-xl"
        />

        {/* inner face */}
        <span className="relative block overflow-hidden rounded-[11px] bg-gradient-to-b from-neutral-900 via-neutral-950 to-black px-4 py-2 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_-10px_24px_-8px_rgba(220,38,38,0.5)_inset] md:px-5 md:py-2.5">
          {/* pointer-following specular highlight */}
          <motion.span
            aria-hidden
            style={{ background: highlight }}
            className="pointer-events-none absolute inset-0"
          />

          <span className="relative flex items-center gap-2.5">
            {/* live dot */}
            <motion.span
              aria-hidden
              animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.9)]"
            />

            <AnimatePresence mode="popLayout">
              <motion.span
                key={currentIndex}
                initial={{ y: -38, rotateX: 70, filter: "blur(10px)", opacity: 0 }}
                animate={{ y: 0, rotateX: 0, filter: "blur(0px)", opacity: 1 }}
                exit={{ y: 44, rotateX: -60, filter: "blur(10px)", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "50% 50%" }}
                className={cn(
                  "inline-block whitespace-nowrap bg-gradient-to-b from-white via-red-100 to-red-400 bg-clip-text text-2xl font-black tracking-tight text-transparent md:text-4xl",
                )}
              >
                {words[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </span>

          {/* cycle progress rail */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
            <motion.span
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className="block h-full bg-gradient-to-r from-red-700 via-red-500 to-red-300 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
            />
          </span>
        </span>
      </motion.div>
    </div>
  );
};
