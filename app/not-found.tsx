"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* ── Money Heist Red/Black Atmospheric Background Layer ── */}
      <div className="absolute inset-0 z-0">
        {/* Dark Red Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-red-700/20 rounded-full blur-[160px] pointer-events-none" />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black pointer-events-none" />

        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(220,38,38,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Floating Dali Mask Accents (Left & Right Corners like 2nd Image) ── */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 -left-12 w-48 h-48 opacity-30 pointer-events-none z-10 blur-[1px]"
      >
        <img src="/hackmatrix-logo.svg" alt="Dali Mask" className="w-full h-full object-contain" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 -right-12 w-56 h-56 opacity-30 pointer-events-none z-10 blur-[1px]"
      >
        <img src="/hackmatrix-logo.svg" alt="Dali Mask" className="w-full h-full object-contain" />
      </motion.div>

      {/* ── MONEY HEIST TOP NAVBAR ── */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6 border-b border-red-900/30 backdrop-blur-md bg-black/40">
        {/* Money Heist Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-full border border-red-500/40 bg-black p-1 shadow-lg shadow-red-600/40">
            <img src="/hackmatrix-logo.svg" alt="HackMatrix Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-red-500 block leading-none">MONEY HEIST</span>
            <span className="font-black text-white text-base tracking-wider">HACKMATRIX</span>
          </div>
        </Link>

        {/* Heist Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/70">
          <Link href="/" className="text-red-500 font-bold hover:text-red-400 border-b-2 border-red-500 pb-1">
            HOME
          </Link>
          <a href="/#tracks" className="hover:text-white transition-colors">CHARACTER</a>
          <a href="/#timeline" className="hover:text-white transition-colors">HEIST PLAN</a>
          <a href="/#prizes" className="hover:text-white transition-colors">GALLERY</a>
          <a href="/#about" className="hover:text-white transition-colors">ABOUT</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/20 px-4 py-1.5 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white transition-all"
          >
            RETURN TO BASE →
          </Link>
        </div>
      </header>

      {/* ── HEIST 404 MAIN HERO CONTENT (LA CASA DA PAPEL 404 STYLE) ── */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 py-12 max-w-5xl mx-auto w-full">
        {/* Emblem Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 h-28 w-28 sm:h-36 sm:w-36 rounded-full border-2 border-red-500/50 bg-black/90 p-2 shadow-2xl shadow-red-600/50 flex items-center justify-center backdrop-blur-xl"
        >
          <img src="/hackmatrix-logo.svg" alt="Dali Mask Heist" className="h-full w-full object-contain" />
        </motion.div>

        {/* Heist Warning Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 inline-flex items-center gap-2 rounded-md border border-red-500/40 bg-red-950/40 px-4 py-1 text-xs font-mono text-red-400 tracking-widest uppercase"
        >
          <span>🚨 WARNING: UNMET VAULT ROUTE</span>
        </motion.div>

        {/* LA CASA DA PAPEL Style 404 Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-4"
        >
          <h1 className="text-5xl sm:text-8xl md:text-[9rem] font-black tracking-tighter text-white uppercase leading-none">
            LA CASA DE
          </h1>
          <div className="bg-[#e50914] text-white px-4 sm:px-8 py-1 sm:py-3 text-5xl sm:text-8xl md:text-[9rem] font-black tracking-tight rounded-md shadow-2xl shadow-red-600/50 leading-none">
            404
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-base sm:text-2xl font-mono text-red-400 font-bold uppercase tracking-widest mt-2 mb-8"
        >
          PAGE NOT FOUND · THE PROFESSOR RE-ROUTED THIS PATH
        </motion.p>

        {/* START THE HEIST Button (Red Pill Button like 2nd Image) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Link
            href="/"
            className="inline-flex h-14 sm:h-16 items-center justify-center rounded-full bg-[#e50914] px-10 sm:px-14 text-lg sm:text-xl font-extrabold uppercase tracking-wider text-white shadow-2xl shadow-red-600/60 transition-all hover:bg-red-600 hover:scale-105 active:scale-95 border border-red-400/40"
          >
            START THE HEIST (RETURN HOME)
          </Link>
        </motion.div>
      </main>

      {/* ── HEIST FOOTER ── */}
      <footer className="relative z-20 py-6 text-center border-t border-red-900/30 backdrop-blur-md bg-black/60">
        <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
          HACKMATRIX 1.0 © 2026 · DEPT. OF AI &amp; DS · VIGNAN&apos;S INSTITUTE OF INFORMATION TECHNOLOGY
        </p>
      </footer>
    </div>
  );
}
