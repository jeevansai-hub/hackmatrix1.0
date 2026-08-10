"use client";
import React, { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Code2,
  Cpu,
  FileCode2,
  FileCode,
  Atom,
  Server,
  Zap,
  Brain,
  Boxes,
  Container,
  Network,
  Cloud,
  Radio,
  CircuitBoard,
  Terminal,
  Database,
  Layers,
  Workflow,
  Sparkles,
} from "lucide-react";
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
    nav: "OPEN INNOVATION",
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

const TECH_LUCIDE = [
  { name: "PYTHON", Icon: Code2 },
  { name: "C++", Icon: Cpu },
  { name: "JAVASCRIPT", Icon: FileCode2 },
  { name: "TYPESCRIPT", Icon: FileCode },
  { name: "REACT", Icon: Atom },
  { name: "NODE.JS", Icon: Server },
  { name: "FASTAPI", Icon: Zap },
  { name: "PYTORCH", Icon: Brain },
  { name: "TENSORFLOW", Icon: Boxes },
  { name: "DOCKER", Icon: Container },
  { name: "KUBERNETES", Icon: Network },
  { name: "AWS", Icon: Cloud },
  { name: "GCP", Icon: Sparkles },
  { name: "IoT", Icon: Radio },
  { name: "ARDUINO", Icon: CircuitBoard },
  { name: "RUST", Icon: Terminal },
  { name: "GO", Icon: Workflow },
  { name: "POSTGRES", Icon: Database },
  { name: "REDIS", Icon: Layers },
];

function TechMark({ item }: { item: { name: string; Icon: React.ElementType } }) {
  const IconComponent = item.Icon;
  return (
    <span className="group/tech flex shrink-0 items-center gap-2">
      <IconComponent className="h-4 w-4 shrink-0 text-red-500/80 transition-transform group-hover/tech:scale-110 sm:h-4.5 sm:w-4.5" />
      <span className="whitespace-nowrap font-mono text-xs font-semibold tracking-[0.14em] text-white/75 sm:text-sm">
        {item.name}
      </span>
      <span className="ml-6 text-white/20">/</span>
    </span>
  );
}

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
          className="mt-10 grid grid-cols-6 gap-x-1.5 gap-y-2 border-y border-white/10 py-3 sm:flex sm:gap-1 sm:gap-y-0 sm:overflow-x-auto sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden"
        >
          {DOMAINS.map((dom, i) => (
            <button
              key={dom.nav}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "relative flex w-full items-center justify-center whitespace-nowrap rounded-md border px-2 py-2 text-center font-mono text-[10px] leading-tight tracking-[0.14em] transition-colors sm:w-auto sm:shrink-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-4 sm:py-1 sm:text-xs sm:tracking-[0.2em]",
                i < 3 ? "col-span-2" : "col-span-3",
                active === i
                  ? "border-red-500/50 bg-red-500/10 text-white sm:border-0 sm:bg-transparent"
                  : "border-white/10 bg-white/[0.03] text-white/40 hover:text-white/70 sm:bg-transparent",
              )}
            >
              {dom.nav}
              {active === i && (
                <motion.span
                  layoutId="domain-underline"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-x-2 -bottom-3 hidden h-0.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.9)] sm:block"
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
              CHOOSE YOUR STACK.
            </h3>
            <p className="text-sm text-zinc-500">
              Use the tools that best fit your solution.
            </p>
          </div>

          <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-white/30">
            EXAMPLES OF TECHNOLOGIES YOU MAY EXPLORE
          </p>

          <div className="relative mt-4 overflow-hidden border-y border-white/10 py-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] sm:py-5">
            <div className="flex w-max animate-[hm-marquee_28s_linear_infinite] gap-7 will-change-transform transform-gpu sm:gap-8">
              {[...TECH_LUCIDE, ...TECH_LUCIDE].map((item, i) => (
                <TechMark key={`${item.name}-${i}`} item={item} />
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

      {/* marquee keyframes (GPU accelerated translate3d) */}
      <style>{`@keyframes hm-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}`}</style>
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

/* ══════════════════════ DOMAIN VISUALS (ENGINEERING TELEMETRY HUD) ══════════════════════ */

const consoleShell =
  "relative w-full max-w-[300px] sm:w-[320px] h-[235px] sm:h-[250px] rounded-xl border border-white/10 bg-[#09090b]/90 p-3.5 sm:p-4 font-mono text-[10px] shadow-2xl shadow-black/80 backdrop-blur-md overflow-hidden flex flex-col justify-between border-box mx-auto lg:mx-0";

function DomainVisual({ visual }: { visual: Visual }) {
  if (visual === "ai") {
    return (
      <div className={consoleShell}>
        {/* Top telemetry bar */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[9px] text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              AI_ENGINE // v4.2
            </span>
            <span className="text-red-400 font-bold">ONLINE</span>
          </div>

          <div className="mt-2.5 space-y-1 text-zinc-400 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-white/40">MODEL:</span>
              <span className="text-white font-medium">NEURAL_TRANSFORMER</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">PRECISION:</span>
              <span className="text-red-400 font-bold">FP16 / TENSOR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">VAL_LOSS:</span>
              <span className="text-white font-semibold">0.0014</span>
            </div>
          </div>
        </div>

        {/* Dynamic Neural Grid Visual */}
        <div className="my-1.5 relative h-16 sm:h-18 w-full rounded-lg border border-white/5 bg-black/50 p-1.5 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 200 70" className="h-full w-full">
            {/* Connections */}
            <motion.path
              d="M 20 35 Q 60 10, 100 35 T 180 35"
              fill="none"
              stroke="rgba(220,38,38,0.5)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
              d="M 20 35 Q 60 60, 100 35 T 180 35"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            {/* Nodes */}
            {[20, 60, 100, 140, 180].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={35 + Math.sin(i) * 15}
                r={i % 2 === 0 ? 3.5 : 2.5}
                fill={i % 2 === 0 ? ACCENT : "#ffffff"}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </svg>
        </div>

        {/* Footer status readout */}
        <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-[9px]">
          <span className="text-white/40">LATENCY: <strong className="text-white">1.2ms</strong></span>
          <span className="text-red-400/80 tracking-widest font-bold">INFERENCE ACTIVE</span>
        </div>
      </div>
    );
  }

  if (visual === "cloud") {
    return (
      <div className={consoleShell}>
        {/* Top telemetry bar */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[9px] text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              CLOUD_MESH // SYS
            </span>
            <span className="text-white font-bold">HEALTHY</span>
          </div>

          <div className="mt-2.5 space-y-1 text-zinc-400 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-white/40">REGIONS:</span>
              <span className="text-white font-medium">US-EAST / EU-WEST</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">THROUGHPUT:</span>
              <span className="text-red-400 font-bold">4.8 GB/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">AVAILABILITY:</span>
              <span className="text-white font-semibold">99.999%</span>
            </div>
          </div>
        </div>

        {/* Node Traffic Graphic */}
        <div className="my-1.5 relative h-16 sm:h-18 w-full rounded-lg border border-white/5 bg-black/50 p-1.5 flex items-center justify-around">
          {[
            { label: "EDGE", color: "#e4e4e7" },
            { label: "GATEWAY", color: ACCENT },
            { label: "CLUSTER", color: "#3f3f46" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-0.5">
              <div
                className="h-7 sm:h-8 w-11 sm:w-12 rounded border border-white/15 bg-white/5 flex items-center justify-center font-bold text-[8px]"
                style={{ borderColor: item.color }}
              >
                {item.label}
              </div>
              <span className="text-[7px] text-white/40">0{idx + 1}_NODE</span>
            </div>
          ))}
        </div>

        {/* Footer status readout */}
        <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-[9px]">
          <span className="text-white/40">AUTOSCALE: <strong className="text-white">ENABLED</strong></span>
          <span className="text-red-400/80 tracking-widest font-bold">DISTRIBUTED</span>
        </div>
      </div>
    );
  }

  if (visual === "security") {
    return (
      <div className={consoleShell}>
        {/* Top telemetry bar */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[9px] text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
              ZERO_TRUST // PROTOCOL
            </span>
            <span className="text-red-400 font-bold">LOCKED</span>
          </div>

          <div className="mt-2.5 space-y-1 text-zinc-400 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-white/40">CIPHER:</span>
              <span className="text-white font-mono font-medium">ECDHE_RSA_AES256</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">KEY_HASH:</span>
              <span className="text-red-400 font-mono font-bold">0x7F8A...2B10</span>
            </div>
          </div>
        </div>

        {/* Live Packet Terminal Inspection */}
        <div className="my-1.5 relative h-16 sm:h-18 w-full rounded-lg border border-white/10 bg-black/80 p-1.5 flex flex-col justify-center gap-0.5 overflow-hidden">
          <div className="flex items-center gap-1 text-[8px] font-mono text-white">
            <span className="text-white/40">[0xFA49]</span>
            <span>TLS 1.3 HANDSHAKE VERIFIED</span>
          </div>
          <div className="flex items-center gap-1 text-[8px] font-mono text-zinc-400">
            <span className="text-white/40">[PACKET]</span>
            <span>192.168.1.104 → PORT 443</span>
          </div>
          <div className="flex items-center gap-1 text-[8px] font-mono text-red-400">
            <span className="text-white/40">[GUARD]</span>
            <span className="font-bold">0 DROPPED</span>
          </div>
          <motion.div
            className="mt-0.5 h-0.5 w-full bg-gradient-to-r from-red-600 via-red-400 to-transparent"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Footer status readout */}
        <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-[9px]">
          <span className="text-white/40">ISOLATION: <strong className="text-white">STRICT</strong></span>
          <span className="text-white tracking-widest font-bold">100% SECURE</span>
        </div>
      </div>
    );
  }

  if (visual === "robotics") {
    return (
      <div className={consoleShell}>
        {/* Top telemetry bar */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[9px] text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              6-DOF // KINEMATICS
            </span>
            <span className="text-red-400 font-bold">ARM_ACTIVE</span>
          </div>

          <div className="mt-2.5 space-y-1 text-zinc-400 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-white/40">JOINTS:</span>
              <span className="text-white font-mono font-medium">J1:+45° | J2:-12° | J3:+90°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">MOTOR PWM:</span>
              <span className="text-red-400 font-mono font-bold">8,450 RPM (94%)</span>
            </div>
          </div>
        </div>

        {/* Kinematic Servo Bars & Sensor Array */}
        <div className="my-1.5 relative h-16 sm:h-18 w-full rounded-lg border border-white/10 bg-black/80 p-1.5 flex flex-col justify-center gap-1 overflow-hidden">
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-[8px] font-mono">
              <span className="text-white/50">SERVO_A (BASE)</span>
              <span className="text-red-400 font-bold">98% POWER</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                animate={{ width: ["90%", "98%", "90%"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-zinc-300 pt-0.5 border-t border-white/5">
            <span className="text-white/40">LiDAR RANGE:</span>
            <span className="text-white font-bold">2.8m (CLEAR)</span>
          </div>
        </div>

        {/* Footer status readout */}
        <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-[9px]">
          <span className="text-white/40">FEEDBACK: <strong className="text-white">CLOSED_LOOP</strong></span>
          <span className="text-red-400/80 tracking-widest font-bold">CALIBRATED</span>
        </div>
      </div>
    );
  }

  // open — cross-disciplinary tech matrix
  return (
    <div className={consoleShell}>
      {/* Top telemetry bar */}
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[9px] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            OPEN_STACK // MATRIX
          </span>
          <span className="text-red-400 font-bold">UNRESTRICTED</span>
        </div>

        <div className="mt-2.5 space-y-1 text-zinc-400 text-[9.5px]">
          <div className="flex justify-between">
            <span className="text-white/40">DOMAINS:</span>
            <span className="text-white font-medium">CROSS_DISCIPLINARY</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">INTEROPERABILITY:</span>
            <span className="text-red-400 font-bold">NATIVE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">LIMITS:</span>
            <span className="text-white font-semibold">NONE</span>
          </div>
        </div>
      </div>

      {/* Cross-Stack Integration Graph */}
      <div className="my-1.5 relative h-16 sm:h-18 w-full rounded-lg border border-white/5 bg-black/50 p-1.5 flex flex-col justify-center gap-1">
        {["FINTECH × AI", "IoT × HEALTH", "WEB3 × AR"].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-[8px]">
            <span className="text-white/60 font-bold">{item}</span>
            <div className="h-1.5 w-16 sm:w-20 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: "0%" }}
                animate={{ width: `${70 + idx * 10}%` }}
                transition={{ duration: 1, delay: idx * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer status readout */}
      <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-[9px]">
        <span className="text-white/40">STACKS: <strong className="text-white">FLEXIBLE</strong></span>
        <span className="text-red-400/80 tracking-widest font-bold">BUILD ANYTHING</span>
      </div>
    </div>
  );
}
