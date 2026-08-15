"use client";
import React from "react";
import { motion } from "motion/react";
import ThreeDMarquee from "@/components/ui/3d-marquee";

/* ────────────────────────────────────────────────────────────
   FRAME — RELIVE THE MOMENTS
   Straight-on infinite marquee wall built from the actual
   HackMatrix floor photos. Sits right under the landing hero,
   ahead of everything else, as the first proof-of-energy beat.
   ──────────────────────────────────────────────────────────── */

const GALLERY_IMAGES = [
  "/gallery/DSC_3048.webp",
  "/gallery/DSC_3245.webp",
  "/gallery/DSC_3274.webp",
  "/gallery/DSC_3300.webp",
  "/gallery/DSC_3321.webp",
  "/gallery/DSC_3333.webp",
  "/gallery/DSC_3343.webp",
  "/gallery/DSC_3349.webp",
  "/gallery/DSC_3356.webp",
  "/gallery/DSC_3363.webp",
  "/gallery/DSC_3446.webp",
  "/gallery/DSC_3465.webp",
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-black py-24 text-zinc-300 sm:py-28"
    >
      {/* ambient wash to match the site's cipher surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 15% 0%, rgba(220,38,38,0.10), transparent 60%), radial-gradient(50% 45% at 100% 30%, rgba(70,90,120,0.08), transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center font-mono text-[11px] tracking-[0.4em] text-white/40 sm:text-left"
        >
          THE FLOOR
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-center text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-left sm:text-5xl md:text-6xl"
        >
          RELIVE
          <br />
          <span className="bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent">
            THE MOMENTS.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mb-12 max-w-xl text-center text-sm leading-relaxed text-zinc-400 sm:mx-0 sm:text-left sm:text-base"
        >
          24 hours of code, chaos, and camaraderie. Frames from the floor at
          HackMatrix 1.0.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ThreeDMarquee
            images={GALLERY_IMAGES}
            className="border border-white/10 shadow-[0_30px_80px_-40px_rgba(220,38,38,0.35)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <motion.a
            href="#organizers"
            whileHover={{ y: -2 }}
            className="group inline-flex items-center gap-3 rounded-full border border-red-500/40 bg-red-500/10 px-7 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-red-300 backdrop-blur-sm transition-colors hover:border-red-500/70 hover:bg-red-500/20 hover:text-white"
          >
            MEET THE ORGANIZERS
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
