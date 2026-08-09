"use client";
import React from "react";
import { Cover } from "@/components/ui/cover";
import { FocusCards } from "@/components/ui/focus-cards";
import { motion } from "motion/react";

// ── loading_landingpage_animation.txt / motto_section_animation.txt ──
// Why-participate section now uses FocusCards (hover-blur focus effect).
// Each card maps exactly to INNOVATE / COLLABORATE / CODE / IMPACT / WIN
// with hackathon-relevant Unsplash imagery.
const whyCards = [
  {
    title: "💡 INNOVATE — Bring your ideas to life",
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "🤝 COLLABORATE — Work with like-minded peers",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "</> CODE — Solve real-world challenges",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "🎯 IMPACT — Build solutions that create impact",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "🏆 WIN — Exciting prizes await you",
    src: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Motto() {
  return (
    <section id="about" className="relative py-24 px-4 bg-transparent overflow-hidden">
      {/* Subtle cipher grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-6 text-center text-xs uppercase tracking-[0.4em] text-red-500/60"
        >
          Our Mission
        </motion.p>

        {/* ── motto_section_animation.txt ──
            Cover + SparklesCore: sparkle beams + corner pulsing circles on hover.
            Exact component, timing, beam duration preserved. */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-4xl mx-auto text-center mt-4 relative z-20 py-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 via-white to-white"
        >
          Innovate for Tomorrow <br className="hidden sm:block" /> at{" "}
          <Cover>warp speed</Cover>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 text-center text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          HackMatrix 1.0 is a 2-day hackathon where the brightest minds come together
          to solve real-world challenges across AI/ML, Cloud Computing, Cybersecurity,
          and Robotics.
        </motion.p>

        {/* BUILD TODAY. SECURE TOMORROW. tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-white/25">
            <span className="h-px w-12 bg-red-500/30" />
            HACKMATRIX 1.0
            <span className="h-px w-12 bg-red-500/30" />
          </div>
          <p className="text-2xl sm:text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-600">
            BUILD TODAY. SECURE TOMORROW.
          </p>
        </motion.div>

        {/* ── Why Participate — FocusCards ──
            Hover over a card to blur the rest and reveal its title.
            Cards match the 5 hackathon pillars from the poster. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-16"
        >
          <p className="text-center text-xs uppercase tracking-[0.4em] text-white/30 mb-8">
            Why Participate?
          </p>
          <FocusCards cards={whyCards} />
        </motion.div>
      </div>
    </section>
  );
}
