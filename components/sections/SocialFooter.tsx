"use client";
import React from "react";
import { motion } from "motion/react";

const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd5HanrWsfYyQty8iWnHXvGu7NeqM2EEjd4x8nwqq0TJcpCGw/viewform";
const EMAIL = "hackermatrix@gmail.com";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Problem Statements", href: "#problems" },
  { label: "Schedule", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "tel:+919391936673" },
];

export default function SocialFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-[#030303] text-zinc-400"
    >
      {/* subtle technical grid + top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,130,150,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,130,150,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-8 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.3fr]">
          {/* ── Brand ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 bg-black p-1 shadow-lg shadow-red-600/30">
                <img
                  src="/hackmatrix-mark.png"
                  alt="HackMatrix"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-xl font-black tracking-[0.12em] text-white">
                HACK<span className="text-red-500">MATRIX</span>
              </span>
            </a>
            <p className="mt-4 font-mono text-sm tracking-wide text-white/50">
              Innovate. Build. Transform.
            </p>

            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:bg-red-500 hover:shadow-red-600/50"
            >
              Register Your Team
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </motion.div>

          {/* ── Quick Links ── */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            <h4 className="font-mono text-[11px] uppercase tracking-[0.3em] text-red-500/80">
              Quick Links
            </h4>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* ── Event + Leadership ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h4 className="font-mono text-[11px] uppercase tracking-[0.3em] text-red-500/80">
              Event
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Organized by the Department of Artificial Intelligence &amp; Data
              Science,{" "}
              <span className="text-white/80">
                Vignan&apos;s Institute of Information Technology
              </span>
              , Visakhapatnam.
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-wide text-white/35">
              13–14 August 2026 · VIIT Campus, Duvvada
            </p>

            <h4 className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-red-500/80">
              Leadership
            </h4>
            <p className="mt-4 text-sm font-bold tracking-tight text-white">
              Dr. T. V. Madhusudhana Rao
            </p>
            <p className="text-xs text-white/50">
              Professor &amp; HoD — AI &amp; DS, VIIT
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-white/55 transition-colors hover:text-red-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {EMAIL}
            </a>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-[11px] tracking-wide text-white/40">
            © 2026 <span className="text-white/60">HACKMATRIX</span>. All rights
            reserved.
          </p>
          <p className="font-mono text-[11px] tracking-wide text-white/30">
            Designed &amp; Developed by the{" "}
            <span className="text-red-400/80">HACKMATRIX Team</span>
          </p>
        </div>
      </div>

      {/* oversized brand watermark — closing brand statement */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-4 pb-4 text-center"
      >
        <span
          className="block max-w-full font-black leading-none tracking-tighter text-white/[0.035]"
          style={{ fontSize: "clamp(2.25rem, 13vw, 13rem)" }}
        >
          HACKMATRIX
        </span>
      </div>
    </footer>
  );
}
