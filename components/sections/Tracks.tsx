"use client";
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion } from "motion/react";

const tracks = [
  {
    icon: "🤖",
    title: "AI / ML",
    description:
      "Build intelligent systems, machine learning models, and AI-powered applications that tackle real-world problems.",
    badge: "Artificial Intelligence",
  },
  {
    icon: "☁️",
    title: "Cloud Computing",
    description:
      "Design scalable cloud architectures, serverless solutions, and distributed systems for modern workloads.",
    badge: "Cloud & DevOps",
  },
  {
    icon: "🔐",
    title: "Cybersecurity",
    description:
      "Develop tools to detect threats, secure systems, and protect data against modern cyber attacks.",
    badge: "Security",
  },
  {
    icon: "🦾",
    title: "Robotics",
    description:
      "Create autonomous robots, control systems, and embedded solutions that interact with the physical world.",
    badge: "Hardware & Embedded",
  },
  {
    icon: "✨",
    title: "Open Innovation",
    description:
      "Got an idea that doesn't fit neatly into a category? Bring it — any exciting technology domain is welcome!",
    badge: "Any Domain",
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="relative py-24 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500/60 mb-4"
          >
            Problem Domains
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Hackathon <span className="text-red-500">Tracks</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-white/40 max-w-xl mx-auto"
          >
            Choose your domain and build innovative solutions across cutting-edge
            technology areas.
          </motion.p>
        </div>

        {/* ── every_border_animation.txt + background-gradient.tsx ──
            Each track card is wrapped with BackgroundGradient (5s animated
            radial-gradient cycling at 400% background-size, reverse repeat).
            GlowingEffect remains on the inner card for mouse-tracking border glow. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tracks.map((track, i) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* BackgroundGradient: animated radial gradient border, 5s cycle */}
              <BackgroundGradient
                className="rounded-[22px] p-6 bg-zinc-900 h-full"
                containerClassName="rounded-[22px] h-full"
                animate={true}
              >
                {/* GlowingEffect inside — cursor-tracking conic glow */}
                <div className="relative h-full rounded-xl border border-white/5 p-0">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />

                  <div className="relative flex flex-col gap-4 h-full">
                    {/* Icon + badge */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl">
                        {track.icon}
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/40 uppercase tracking-wider">
                        {track.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {track.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/55 leading-relaxed flex-1">
                      {track.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <p className="text-xs text-white/20 font-mono">
                      HackMatrix 1.0 · VIIT 2026
                    </p>
                  </div>
                </div>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>

        {/* Domain count callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-white/30">
            + Many more exciting technology domains to explore!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
