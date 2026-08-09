"use client";
import React from "react";
import { motion } from "motion/react";
import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { GlareCard } from "@/components/ui/glare-card";
import { PinContainer } from "@/components/ui/3d-pin";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { HeistVaultCountdown } from "@/components/ui/heist-vault-countdown";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-black"
      style={{ minHeight: "100dvh" }}
    >
      {/* ── background_animation_livecam.txt ──
          WebcamPixelGrid: 100% visible interactive grid.
          If webcam is denied or off, falls back to the Cloudfront video background automatically! */}
      <div
        className="absolute inset-0 z-0"
        style={{ width: "100vw", height: "100dvh", left: 0, top: 0 }}
      >
        <WebcamPixelGrid
          gridCols={36}
          gridRows={22}
          maxElevation={35}
          motionSensitivity={0.25}
          elevationSmoothing={0.15}
          colorMode="webcam"
          backgroundColor="#000000"
          mirror={true}
          gapRatio={0.08}
          invertColors={false}
          darken={0.1}
          borderColor="#ffffff"
          borderOpacity={0.15}
          className="w-full h-full"
        />
      </div>

      {/* Subtle vignette layer */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-[140px] md:pt-[180px] pb-[80px] max-w-6xl mx-auto w-full gap-[24px]">

        {/* Dali Cyber Emblem Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="h-28 w-28 sm:h-36 sm:w-36 rounded-full p-1 border-2 border-red-500/40 bg-black/80 shadow-2xl shadow-red-600/40 backdrop-blur-md"
        >
          <img
            src="/hackmatrix-logo.svg"
            alt="HackMatrix Emblem"
            className="h-full w-full object-contain"
          />
        </motion.div>

        {/* Department Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-mono text-red-400 backdrop-blur-md shadow-xl"
        >
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          Dept. of AI &amp; Data Science · VIIT Visakhapatnam
        </motion.div>

        {/* Headline: HACKMATRIX 1.0 */}
        <div className="flex flex-col items-center max-w-[800px]">
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "backOut" }}
            className="text-5xl sm:text-7xl md:text-[8.5rem] font-black tracking-tighter text-white leading-none drop-shadow-2xl"
            style={{ textShadow: "0 0 80px rgba(220,38,38,0.5)" }}
          >
            HACK<SquigglyText scale={[6, 10]} className="text-red-500">MATRIX</SquigglyText>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-2 text-lg sm:text-2xl font-bold text-white/80"
          >
            <span className="font-mono text-red-400 text-xl sm:text-3xl">1.0</span>
            &nbsp;— 2-Day Hackathon 2026
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-3 text-xs sm:text-sm font-normal text-white/70 max-w-[640px] text-center"
          >
            In association with Matrix Club &amp; IEEE CIS Student Branch · 13th &amp; 14th August 2026
          </motion.p>
        </div>

        {/* ── Heist Vault Lock Animated Countdown Timer ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="my-2 w-full flex justify-center"
        >
          <HeistVaultCountdown targetDate="2026-08-13T09:00:00" />
        </motion.div>

        {/* LayoutTextFlip for Tracks */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white"
        >
          <LayoutTextFlip
            text="Explore "
            words={["AI / ML", "Cloud Computing", "Cybersecurity", "Robotics"]}
            duration={3000}
          />
        </motion.div>

        {/* Event Facts with GlareCard and 3D Pin Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl items-stretch"
        >
          {/* Card 1: DATES */}
          <GlareCard className="p-5 flex flex-col justify-between text-left group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">📅</span>
                <span className="text-[10px] font-mono tracking-widest text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                  DATES
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                13–14 Aug 2026
              </h3>
            </div>
            <div className="pt-3 border-t border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-white/60">
                2 Full Days of Non-Stop Innovation &amp; Hacking
              </p>
            </div>
          </GlareCard>

          {/* Card 2: TEAM SIZE */}
          <GlareCard className="p-5 flex flex-col justify-between text-left group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">👥</span>
                <span className="text-[10px] font-mono tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  TEAM SIZE
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                2–4 Members
              </h3>
            </div>
            <div className="pt-3 border-t border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-white/60">
                Cross-College &amp; Interdisciplinary Teams Welcome
              </p>
            </div>
          </GlareCard>

          {/* Card 3: ENTRY FEE */}
          <GlareCard className="p-5 flex flex-col justify-between text-left group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">💰</span>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ENTRY FEE
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                ₹400 / Team
              </h3>
            </div>
            <div className="pt-3 border-t border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-white/60">
                Includes Food, Mentorship, Swag &amp; Certificates
              </p>
            </div>
          </GlareCard>

          {/* Card 4: VENUE */}
          <div className="h-full min-h-[170px] flex items-center justify-center">
            <PinContainer
              title="VIIT Campus · Duvvada, Visakhapatnam"
              href="https://maps.google.com/?q=Vignan's+Institute+of+Information+Technology+Duvvada"
              containerClassName="w-full h-full"
              className="w-full h-full"
            >
              <div className="flex flex-col justify-between p-5 w-64 sm:w-56 h-36 tracking-tight bg-slate-950/90 rounded-2xl">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📍</span>
                    <span className="text-[10px] font-mono tracking-widest text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                      VENUE
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white">
                    VIIT, Duvvada
                  </h3>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-red-400 font-mono flex items-center gap-1">
                    <span>View on Map</span>
                    <span>→</span>
                  </p>
                </div>
              </div>
            </PinContainer>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="https://bit.ly/HackMatrix10"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-full bg-red-600 px-8 text-base font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:bg-red-500 hover:scale-105 hover:shadow-red-600/50"
          >
            Register Now — bit.ly/HackMatrix10
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#tracks"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
          >
            Explore Tracks
          </a>
        </motion.div>
      </div>
    </section>
  );
}
