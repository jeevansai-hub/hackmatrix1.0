"use client";
import React from "react";
import { motion } from "motion/react";
import DeveloperCredit from "@/components/ui/developer-credit";

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

// Full-colour official brand logos. LinkedIn has no public page yet → disabled.
type Social = {
  label: string;
  href: string | null;
  disabled?: boolean;
  viewBox: string;
  icon: React.ReactNode;
};

const SOCIALS: Social[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ai_ds_viit/",
    viewBox: "0 0 24 24",
    icon: (
      <>
        <defs>
          <radialGradient id="ig-grad" cx="30%" cy="107%" r="135%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
        <path
          fill="#fff"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 1.837c-3.15 0-3.522.012-4.764.069-2.457.112-3.6 1.274-3.712 3.712-.057 1.242-.07 1.614-.07 4.764s.013 3.522.07 4.764c.112 2.436 1.253 3.6 3.712 3.712 1.242.057 1.615.069 4.764.069 3.15 0 3.522-.012 4.764-.069 2.454-.112 3.6-1.272 3.712-3.712.057-1.242.069-1.614.069-4.764s-.012-3.522-.069-4.764c-.112-2.436-1.256-3.6-3.712-3.712C15.522 3.849 15.15 3.837 12 3.837zm0 3.868a4.295 4.295 0 100 8.59 4.295 4.295 0 000-8.59zm0 7.085a2.79 2.79 0 110-5.581 2.79 2.79 0 010 5.581zm5.466-7.254a1.003 1.003 0 11-2.006 0 1.003 1.003 0 012.006 0z"
        />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589387153937",
    viewBox: "0 0 24 24",
    icon: (
      <>
        <path
          fill="#1877F2"
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
        <path
          fill="#fff"
          d="M16.671 15.543l.532-3.47h-3.328V9.82c0-.949.464-1.874 1.955-1.874h1.513V4.922s-1.374-.235-2.686-.235c-2.741 0-4.532 1.662-4.532 4.669v2.647H7.078v3.47h3.047v8.385a12.13 12.13 0 003.75 0v-8.385h2.796z"
        />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@AIDSVIIT",
    viewBox: "0 0 24 24",
    icon: (
      <>
        <path
          fill="#FF0000"
          d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        />
        <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </>
    ),
  },
  {
    // Placeholder LinkedIn URL — replace with the real page when available.
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ai-ds-viit",
    viewBox: "0 0 24 24",
    icon: (
      <>
        <path
          fill="#0A66C2"
          d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"
        />
        <path
          fill="#fff"
          d="M7.06 20.45H3.56V9h3.5v11.45zM5.31 7.43a2.03 2.03 0 110-4.06 2.03 2.03 0 010 4.06zM20.45 20.45h-3.5v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67h-3.5V9h3.36v1.56h.05c.47-.89 1.61-1.83 3.32-1.83 3.55 0 4.21 2.34 4.21 5.38v6.34z"
        />
      </>
    ),
  },
  {
    label: "Gmail",
    href: `mailto:${EMAIL}`,
    viewBox: "0 0 256 193",
    icon: (
      <>
        <path
          fill="#4285F4"
          d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727z"
        />
        <path
          fill="#34A853"
          d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837-27.026 25.798v98.91z"
        />
        <path
          fill="#EA4335"
          d="M58.182 93.14l-4.174-38.647 4.174-36.989L128 69.868l69.818-52.364 4.669 34.992-4.669 40.644L128 145.504z"
        />
        <path
          fill="#FBBC04"
          d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218z"
        />
        <path
          fill="#C5221F"
          d="M0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.231z"
        />
      </>
    ),
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
              href="#home"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:bg-red-500 hover:shadow-red-600/50"
            >
              View Day 1 Results
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
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href as string}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 hover:-translate-y-0.5"
              >
                <svg
                  viewBox={s.viewBox}
                  aria-hidden
                  className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                >
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>

          <p className="font-mono text-[11px] tracking-wide text-white/40">
            © 2026 <span className="text-white/60">HACKMATRIX</span>. All rights
            reserved.
          </p>

          {/* One-time vaporize credit — shows once, then disappears */}
          <DeveloperCredit />
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
