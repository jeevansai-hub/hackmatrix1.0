"use client";
import React, { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
   FRAME 3 — TECHNOLOGY DOMAINS
   A technology *interface* (developer-docs × editorial magazine):
   sticky index on the left, a transforming console panel on the
   right, one coherent diagram language across five domains.
   Distinct from Frame 2 (this is a "product console", not a
   build-log). Crimson (--cipher-red) is the active accent only.
   ──────────────────────────────────────────────────────────── */

type Visual = "ai" | "cloud" | "security" | "robotics" | "open";

interface Domain {
  idx: string;
  nav: string;
  title: string;
  sub: string;
  desc: string;
  spectrum: string[];
  flow: string[];
  visual: Visual;
}

const DOMAINS: Domain[] = [
  {
    idx: "01",
    nav: "AI / ML",
    title: "ARTIFICIAL INTELLIGENCE",
    sub: "MACHINE LEARNING",
    desc: "Build systems that learn from data, recognize patterns, generate intelligent outputs, and support better decisions.",
    spectrum: [
      "MACHINE LEARNING",
      "COMPUTER VISION",
      "NATURAL LANGUAGE PROCESSING",
      "GENERATIVE AI",
      "INTELLIGENT AUTOMATION",
    ],
    flow: ["DATA", "MODEL", "INFERENCE", "ACTION"],
    visual: "ai",
  },
  {
    idx: "02",
    nav: "CLOUD",
    title: "CLOUD SYSTEMS",
    sub: "INFRASTRUCTURE",
    desc: "Design applications that can scale beyond a single machine — from APIs and services to distributed systems and cloud-native architectures.",
    spectrum: [
      "CLOUD ARCHITECTURE",
      "APIs & SERVICES",
      "SERVERLESS",
      "DISTRIBUTED SYSTEMS",
      "SCALABILITY",
    ],
    flow: ["REQUEST", "SERVICE", "DATA", "SCALE"],
    visual: "cloud",
  },
  {
    idx: "03",
    nav: "SECURITY",
    title: "CYBERSECURITY",
    sub: "DEFENSE & TRUST",
    desc: "Build technology that protects systems, identities, networks, applications, and the data moving through them.",
    spectrum: [
      "APPLICATION SECURITY",
      "NETWORK SECURITY",
      "IDENTITY",
      "THREAT DETECTION",
      "PRIVACY",
    ],
    flow: ["IDENTIFY", "VERIFY", "PROTECT", "RESPOND"],
    visual: "security",
  },
  {
    idx: "04",
    nav: "ROBOTICS",
    title: "ROBOTICS",
    sub: "PHYSICAL COMPUTING",
    desc: "Connect software with the physical world through intelligent machines, sensors, automation, and responsive hardware.",
    spectrum: ["ROBOTICS", "IoT", "SENSORS", "EMBEDDED SYSTEMS", "AUTOMATION"],
    flow: ["SENSE", "COMPUTE", "DECIDE", "ACT"],
    visual: "robotics",
  },
  {
    idx: "05",
    nav: "OPEN TECHNOLOGY",
    title: "OPEN TECHNOLOGY",
    sub: "BEYOND THE OBVIOUS",
    desc: "Technology doesn't stop at a predefined category. Bring an idea that crosses disciplines and find the tools needed to make it work.",
    spectrum: [
      "FINTECH",
      "HEALTHTECH",
      "EDTECH",
      "SUSTAINABILITY",
      "AR / VR",
      "WEB3",
      "AUTOMATION",
      "AND MORE",
    ],
    flow: ["IDEA", "TECHNOLOGY", "POSSIBILITY"],
    visual: "open",
  },
];

const ACCENT = "#dc2626";

const TECH = [
  "PYTHON", "C++", "JAVASCRIPT", "TYPESCRIPT", "REACT", "NODE.JS", "FASTAPI",
  "PYTORCH", "TENSORFLOW", "DOCKER", "KUBERNETES", "AWS", "GCP", "IoT",
  "ARDUINO", "RASPBERRY PI", "RUST", "GO", "POSTGRES", "REDIS", "WEBGL",
];

export default function Domains() {
  const [active, setActive] = useState(0);
  const d = DOMAINS[active];

  return (
    <section
      id="tracks"
      className="relative overflow-hidden bg-[#040405] text-zinc-300"
    >
      {/* thin vertical console rules — different structural motif from Frame 2 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "25% 100%",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 40% at 100% 0%, rgba(220,38,38,0.08), transparent 55%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        {/* ═══ HEADER ═══ */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] tracking-[0.4em] text-white/40"
        >
          03 / TECHNOLOGY DOMAINS
        </motion.p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            FIVE DIRECTIONS.
            <br />
            <span className="text-white/40">ONE BUILD ENVIRONMENT.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="max-w-sm text-sm leading-relaxed text-zinc-400 lg:pb-2"
          >
            HackMatrix brings together multiple areas of modern technology,
            giving teams the freedom to approach challenges through the tools,
            systems, and ideas they know best.
          </motion.p>
        </div>

        {/* ═══ INDEX STRIP ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 flex gap-1 overflow-x-auto border-y border-white/10 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_92%,transparent)] sm:[mask-image:none]"
        >
          {DOMAINS.map((dom, i) => (
            <button
              key={dom.nav}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "relative shrink-0 px-3 py-1 font-mono text-[11px] tracking-[0.2em] transition-colors sm:px-4 sm:text-xs",
                active === i ? "text-white" : "text-white/35 hover:text-white/70",
              )}
            >
              {dom.nav}
              {active === i && (
                <motion.span
                  layoutId="domain-underline"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-x-2 -bottom-3 h-0.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.9)]"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ═══ MAIN: sticky index + console panel ═══ */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[290px_1fr] lg:gap-10">
          {/* left index (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 flex flex-col">
              {DOMAINS.map((dom, i) => (
                <button
                  key={dom.title}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "group relative flex items-baseline gap-4 border-l-2 py-4 pl-5 text-left transition-colors",
                    active === i
                      ? "border-red-500"
                      : "border-white/10 hover:border-white/30",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-xs transition-colors",
                      active === i ? "text-red-500" : "text-white/30",
                    )}
                  >
                    {dom.idx}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-bold tracking-tight transition-colors",
                      active === i
                        ? "text-white"
                        : "text-white/45 group-hover:text-white/75",
                    )}
                  >
                    {dom.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* console panel */}
          <ConsolePanel domain={d} />
        </div>

        {/* ═══ TECH STRIP ═══ */}
        <div className="mt-24 md:mt-32">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              TECHNOLOGY IS THE MEDIUM.
            </h3>
            <p className="text-sm text-zinc-500">
              Use the tools that best fit your solution.
            </p>
          </div>

          <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-white/30">
            EXAMPLES OF TECHNOLOGIES YOU MAY EXPLORE
          </p>

          <div className="relative mt-4 overflow-hidden border-y border-white/10 py-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <div className="flex w-max animate-[hm-marquee_38s_linear_infinite] gap-8">
              {[...TECH, ...TECH].map((t, i) => (
                <span
                  key={i}
                  className="font-mono text-sm tracking-[0.15em] text-white/45"
                >
                  {t}
                  <span className="ml-8 text-red-500/40">/</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ CLOSING + CTA ═══ */}
        <div className="mt-24 md:mt-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl"
          >
            TECHNOLOGY ISN&apos;T THE ANSWER.
            <br />
            <span className="text-white/35">IT&apos;S THE MEDIUM.</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-8 text-2xl font-bold leading-tight tracking-tight text-zinc-300 sm:text-3xl"
          >
            THE PROBLEM
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              IS WHERE THE BUILD BEGINS.
            </span>
          </motion.p>

          <motion.a
            href="#timeline"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            whileHover={{ y: -2 }}
            className="group mt-12 inline-flex items-center gap-3 rounded-full border border-red-500/40 bg-red-500/10 px-7 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-red-300 backdrop-blur-sm transition-colors hover:border-red-500/70 hover:bg-red-500/20 hover:text-white"
          >
            EXPLORE THE HACKATHON JOURNEY
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </div>
      </div>

      {/* marquee keyframes */}
      <style>{`@keyframes hm-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

/* ══════════════════════ CONSOLE PANEL ══════════════════════ */

function ConsolePanel({ domain }: { domain: Domain }) {
  // cursor-reactive depth
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 24,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 24,
  });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Only tilt for mouse — never on touch (would jitter while scrolling).
      if (e.pointerType !== "mouse") return;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my],
  );
  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5 sm:p-8"
    >
      {/* corner ticks — technical interface framing */}
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "left-3 bottom-3 border-l border-b",
        "right-3 bottom-3 border-r border-b",
      ].map((c) => (
        <span
          key={c}
          className={cn("pointer-events-none absolute h-3 w-3 border-red-500/50", c)}
        />
      ))}

      <AnimatePresence mode="wait">
        <motion.div
          key={domain.idx}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-6"
        >
          {/* text side */}
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-red-500">
              {domain.idx} / {domain.title}
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-white/40">
              {domain.sub}
            </p>

            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-300">
              {domain.desc}
            </p>

            <div className="my-6 h-px w-full bg-white/10" />

            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {domain.spectrum.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="font-mono text-[10px] tracking-[0.18em] text-white/55 sm:text-[11px]"
                >
                  {s}
                </motion.li>
              ))}
            </ul>

            <FlowLine items={domain.flow} />
          </div>

          {/* diagram side */}
          <div className="flex items-center justify-center lg:justify-end">
            <DomainVisual visual={domain.visual} />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function FlowLine({ items }: { items: string[] }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] font-bold tracking-[0.18em] text-white sm:text-[11px]">
      {items.map((t, i) => (
        <React.Fragment key={t}>
          {i > 0 && <span className="text-red-500">→</span>}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.1 }}
          >
            {t}
          </motion.span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ══════════════════════ DOMAIN VISUALS ══════════════════════ */

const box =
  "h-48 w-48 sm:h-60 sm:w-60 rounded-xl border border-white/10 bg-black/40";

function DomainVisual({ visual }: { visual: Visual }) {
  if (visual === "ai") {
    // scattered data points reorganise into a structured lattice
    const grid = Array.from({ length: 16 }, (_, i) => ({
      x: 60 + (i % 4) * 40,
      y: 45 + Math.floor(i / 4) * 40,
    }));
    return (
      <svg viewBox="0 0 300 260" className={box}>
        {grid.map((p, i) => (
          <motion.circle
            key={i}
            r={2.6}
            fill={i % 5 === 0 ? ACCENT : "#d4d4d8"}
            initial={{
              cx: 150 + Math.sin(i * 2.3) * 90,
              cy: 130 + Math.cos(i * 1.7) * 90,
              opacity: 0,
            }}
            animate={{ cx: p.x, cy: p.y, opacity: 1 }}
            transition={{ delay: i * 0.03, duration: 0.9, ease: "easeInOut" }}
          />
        ))}
        <VLabels items={["DATA", "MODEL", "INFERENCE"]} />
      </svg>
    );
  }

  if (visual === "cloud") {
    // USER → API → services → DATA
    return (
      <svg viewBox="0 0 300 260" className={box}>
        {(
          [
            [150, 34, 150, 84],
            [150, 84, 70, 140],
            [150, 84, 150, 140],
            [150, 84, 230, 140],
            [70, 140, 150, 205],
            [150, 140, 150, 205],
            [230, 140, 150, 205],
          ] as const
        ).map((l, i) => (
          <motion.line
            key={i}
            x1={l[0]}
            y1={l[1]}
            x2={l[2]}
            y2={l[3]}
            stroke="rgba(220,38,38,0.45)"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
          />
        ))}
        {(
          [
            [150, 34, "USER"],
            [70, 140, ""],
            [150, 140, ""],
            [230, 140, ""],
            [150, 205, "DATA"],
          ] as const
        ).map(([x, y], i) => (
          <motion.rect
            key={i}
            x={(x as number) - 12}
            y={(y as number) - 9}
            width={24}
            height={18}
            rx={3}
            fill="#18181b"
            stroke={i === 0 || i === 4 ? ACCENT : "rgba(160,170,190,0.5)"}
            strokeWidth={1}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        ))}
        <circle cx={150} cy={84} r={13} fill="#18181b" stroke={ACCENT} strokeWidth={1} />
        <text x={150} y={88} textAnchor="middle" className="fill-white" style={{ font: "700 9px monospace" }}>API</text>
      </svg>
    );
  }

  if (visual === "security") {
    // perimeter with a scanning sweep
    return (
      <svg viewBox="0 0 300 260" className={box}>
        <motion.polygon
          points="150,30 250,90 250,180 150,230 50,180 50,90"
          fill="none"
          stroke="rgba(160,170,190,0.35)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.polygon
          points="150,70 210,105 210,165 150,195 90,165 90,105"
          fill="rgba(220,38,38,0.06)"
          stroke={ACCENT}
          strokeWidth={1.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        />
        {/* scanning sweep line */}
        <motion.line
          x1={50}
          x2={250}
          y1={30}
          y2={30}
          stroke={ACCENT}
          strokeWidth={1}
          opacity={0.7}
          animate={{ y1: [40, 220, 40], y2: [40, 220, 40] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx={150} cy={132} r={4} fill={ACCENT} />
      </svg>
    );
  }

  if (visual === "robotics") {
    // minimal mechanical assembly with a rotating gear
    return (
      <svg viewBox="0 0 300 260" className={box}>
        <rect x={70} y={110} width={160} height={44} rx={4} fill="#18181b" stroke="rgba(160,170,190,0.4)" />
        <line x1={70} y1={132} x2={40} y2={132} stroke="rgba(160,170,190,0.4)" />
        <line x1={230} y1={132} x2={260} y2={132} stroke="rgba(160,170,190,0.4)" />
        <circle cx={40} cy={132} r={6} fill="none" stroke={ACCENT} />
        <circle cx={260} cy={132} r={6} fill="none" stroke={ACCENT} />
        {/* rotating gear */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "150px 132px" }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <rect
                key={i}
                x={148}
                y={100}
                width={4}
                height={9}
                fill={ACCENT}
                style={{ transformOrigin: "150px 132px", transform: `rotate(${(a * 180) / Math.PI}deg)` }}
              />
            );
          })}
          <circle cx={150} cy={132} r={18} fill="#0a0a0a" stroke={ACCENT} strokeWidth={1.4} />
          <circle cx={150} cy={132} r={5} fill={ACCENT} />
        </motion.g>
        {/* sensor pulse */}
        <motion.circle
          cx={150}
          cy={70}
          r={5}
          fill="none"
          stroke={ACCENT}
          animate={{ r: [4, 12, 4], opacity: [0.9, 0, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx={150} cy={70} r={2.5} fill="#d4d4d8" />
      </svg>
    );
  }

  // open — five systems converge into a new system
  const sources = [
    [50, 40],
    [50, 90],
    [50, 140],
    [50, 190],
    [50, 220],
  ];
  return (
    <svg viewBox="0 0 300 260" className={box}>
      {sources.map(([x, y], i) => (
        <motion.line
          key={i}
          x1={x}
          y1={y}
          x2={180}
          y2={130}
          stroke={i === 4 ? ACCENT : "rgba(160,170,190,0.35)"}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.1, duration: 0.7 }}
        />
      ))}
      {["AI", "CLOUD", "SEC", "ROBO", "OPEN"].map((t, i) => (
        <text
          key={t}
          x={20}
          y={sources[i][1] + 3}
          className="fill-white/50"
          style={{ font: "700 8px monospace" }}
        >
          {t}
        </text>
      ))}
      <motion.circle
        cx={180}
        cy={130}
        r={22}
        fill="rgba(220,38,38,0.08)"
        stroke={ACCENT}
        strokeWidth={1.4}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260 }}
        style={{ transformOrigin: "180px 130px" }}
      />
      <text x={180} y={133} textAnchor="middle" className="fill-white" style={{ font: "700 8px monospace" }}>
        NEW
      </text>
    </svg>
  );
}

function VLabels({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t, i) => (
        <motion.text
          key={t}
          x={252}
          y={70 + i * 60}
          textAnchor="end"
          className="fill-white/40"
          style={{ font: "700 8px monospace", letterSpacing: "1px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + i * 0.15 }}
        >
          {t}
        </motion.text>
      ))}
    </>
  );
}
