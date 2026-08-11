"use client";
import React from "react";
import { motion } from "motion/react";

const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd5HanrWsfYyQty8iWnHXvGu7NeqM2EEjd4x8nwqq0TJcpCGw/viewform";
const EMAIL = "hackmatrix-aids@vignaniit.edu.in";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Problem Statements", href: "#problems" },
  { label: "Schedule", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "tel:+919391936673" },
];

// Official brand logo paths (24×24). LinkedIn has no public page yet → disabled.
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ai_ds_viit/",
    hover: "hover:border-[#E4405F]/60 hover:text-[#E4405F]",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589387153937",
    hover: "hover:border-[#1877F2]/60 hover:text-[#1877F2]",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@AIDSVIIT",
    hover: "hover:border-[#FF0000]/60 hover:text-[#FF0000]",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    label: "LinkedIn",
    href: null,
    hover: "",
    disabled: true,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "Gmail",
    href: `mailto:${EMAIL}`,
    hover: "hover:border-[#EA4335]/60 hover:text-[#EA4335]",
    path: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
  },
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
                  loading="lazy"
                  decoding="async"
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
                Vignan&apos;s Institute of Information Technology (A)
              </span>
              , Visakhapatnam.
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-wide text-white/35">
              13–14 August 2026 · VIIT Campus, Duvvada
            </p>

            <h4 className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-red-500/80">
              Contact
            </h4>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              For any queries or help &amp; support, reach out to us at the email
              below.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-white/55 transition-colors hover:text-red-300"
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
        <div className="mt-14 flex flex-col items-center justify-center gap-6 border-t border-white/10 pt-8 text-center">
          {/* Social icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {SOCIALS.map((s) =>
              s.disabled ? (
                <span
                  key={s.label}
                  aria-label={`${s.label} — coming soon`}
                  title={`${s.label} — coming soon`}
                  className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/25"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="h-[18px] w-[18px]"
                  >
                    <path d={s.path} />
                  </svg>
                </span>
              ) : (
                <a
                  key={s.label}
                  href={s.href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06] ${s.hover}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ),
            )}
          </div>

          <p className="font-mono text-[11px] tracking-wide text-white/40">
            © 2026 <span className="text-white/60">HACKMATRIX</span>. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* oversized brand watermark — closing brand statement */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-4 pb-4 text-center"
      >
        <span
          className="block max-w-full bg-gradient-to-b from-white/[0.12] to-white/[0.05] bg-clip-text font-black leading-none tracking-tighter text-transparent"
          style={{ fontSize: "clamp(2.75rem, 14vw, 13rem)" }}
        >
          HACKMATRIX
        </span>
      </div>
    </footer>
  );
}
