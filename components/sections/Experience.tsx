"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
   FRAME 2 — THE HACKMATRIX EXPERIENCE
   A deliberately different "engineering blueprint / build log"
   chapter: cool graphite surface, mono editorial system, thin
   rails. Crimson (--cipher-red) appears only as the *active*
   accent so it lightly syncs with the rest of the site.
   ──────────────────────────────────────────────────────────── */

type StageVariant = "points" | "network" | "terminal" | "expand" | "lock";

interface Stage {
  n: string;
  key: string;
  lead: string;
  body: string;
  tags: string;
  variant: StageVariant;
}

const STAGES: Stage[] = [
  {
    n: "01",
    key: "INNOVATE",
    lead: "Think beyond the obvious.",
    body: "Bring fresh perspectives, experiment with ideas, and explore what technology can make possible.",
    tags: "IDEAS / CREATIVITY / EXPLORATION",
    variant: "points",
  },
  {
    n: "02",
    key: "COLLABORATE",
    lead: "Great solutions are rarely built alone.",
    body: "Work with your team, exchange perspectives, learn from mentors, and build together.",
    tags: "TEAM / MENTORS / KNOWLEDGE",
    variant: "network",
  },
  {
    n: "03",
    key: "CODE",
    lead: "Turn ideas into working systems.",
    body: "Design. Develop. Test. Iterate. Make your solution real.",
    tags: "ARCHITECTURE / DEVELOPMENT / ITERATION",
    variant: "terminal",
  },
  {
    n: "04",
    key: "IMPACT",
    lead: "Build for more than the competition.",
    body: "Create solutions that address real-world challenges and demonstrate the difference technology can make.",
    tags: "PROBLEM / SOLUTION / VALUE",
    variant: "expand",
  },
  {
    n: "05",
    key: "WIN",
    lead: "Put your work in the spotlight.",
    body: "Present your solution, defend your approach, and compete for recognition and prizes.",
    tags: "DEMO / JUDGING / RECOGNITION",
    variant: "lock",
  },
];

const ACCENT = "#dc2626";

export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.65", "end 0.55"],
  });
  const spineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#050507] text-zinc-300"
    >
      {/* ── Blueprint surface: fine dotted grid + steel wash ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,130,150,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(120,130,150,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 55%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 8%, rgba(220,38,38,0.10), transparent 60%), radial-gradient(50% 60% at 0% 100%, rgba(70,90,120,0.10), transparent 60%)",
        }}
      />
      {/* top + bottom hairlines that fade the chapter in/out of the site */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        {/* ═══ HEADER ═══ */}
        <Header />

        {/* ═══ OVERVIEW RAIL (desktop map) ═══ */}
        <OverviewRail />

        {/* ═══ STAGES ═══ */}
        <div ref={railRef} className="relative mt-16 md:mt-24">
          {/* spine track */}
          <div className="absolute bottom-4 left-[15px] top-2 w-px bg-white/10 sm:left-[19px]" />
          {/* animated spine fill — travels as you scroll */}
          <motion.div
            style={{ scaleY: spineScale }}
            className="absolute bottom-4 left-[15px] top-2 w-px origin-top bg-gradient-to-b from-red-500 via-red-500 to-red-500/30 shadow-[0_0_12px_rgba(220,38,38,0.8)] sm:left-[19px]"
          />

          {STAGES.map((stage, i) => (
            <StageRow key={stage.key} stage={stage} last={i === STAGES.length - 1} />
          ))}
        </div>

        {/* ═══ TRANSITION STATEMENT ═══ */}
        <TransitionStatement />

        {/* ═══ CLOSING + CTA ═══ */}
        <Closing />
      </div>
    </section>
  );
}

/* ══════════════════════ HEADER ══════════════════════ */

function Header() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
      <div>
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-[11px] tracking-[0.4em] text-white/40"
        >
          02 / THE EXPERIENCE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          IDEAS START IT.
          <br />
          <span className="bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent">
            BUILDERS MAKE IT REAL.
          </span>
        </motion.h2>

        {/* five official themes as a connected inline chain */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] tracking-[0.25em] text-white/45 sm:text-xs"
        >
          {["INNOVATE", "COLLABORATE", "CODE", "IMPACT", "WIN"].map((t, i) => (
            <React.Fragment key={t}>
              {i > 0 && <span className="text-red-500/70">·</span>}
              <span>{t}</span>
            </React.Fragment>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base"
        >
          HackMatrix is more than a coding competition. It is a space to think
          boldly, work together, build with technology, and turn your skills
          into something that creates impact.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-5 font-mono text-[10px] tracking-[0.22em] text-white/35 sm:text-[11px]"
        >
          THINK DIFFERENT <span className="text-red-500/80">→</span> BUILD
          TOGETHER <span className="text-red-500/80">→</span> SHIP WITH PURPOSE
        </motion.p>
      </div>

      {/* header 3D-ish system visual */}
      <div className="hidden justify-center lg:flex">
        <SystemLattice />
      </div>
    </div>
  );
}

/* Rotating wireframe lattice — the "system" that gets built. */
function SystemLattice() {
  const nodes = [
    [130, 40],
    [210, 90],
    [210, 175],
    [130, 225],
    [50, 175],
    [50, 90],
    [130, 132],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 800 }}
      className="relative"
    >
      <motion.svg
        width="260"
        height="265"
        viewBox="0 0 260 265"
        animate={{ rotateZ: [0, 3, 0, -3, 0], rotateY: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke={i > 5 ? "rgba(220,38,38,0.5)" : "rgba(160,170,190,0.35)"}
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.8 }}
          />
        ))}
        {nodes.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={i === 6 ? 4 : 3}
            fill={i === 6 ? ACCENT : "#e4e4e7"}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 300 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}
      </motion.svg>
      <div className="mt-2 text-center font-mono text-[9px] tracking-[0.3em] text-white/30">
        SYSTEM / ASSEMBLING
      </div>
    </motion.div>
  );
}

/* ══════════════════════ OVERVIEW RAIL ══════════════════════ */

function OverviewRail() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mt-14 hidden md:block"
    >
      <div className="relative flex items-center justify-between">
        {/* base line */}
        <div className="absolute left-0 right-0 top-[7px] h-px bg-white/10" />
        {/* draw-in accent line */}
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 1.2, ease: "easeInOut" } },
          }}
          className="absolute left-0 right-0 top-[7px] h-px origin-left bg-gradient-to-r from-red-600 via-red-500 to-red-500/20"
        />
        {STAGES.map((s, i) => (
          <motion.div
            key={s.key}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.15 + i * 0.12, duration: 0.4 },
              },
            }}
            className="relative flex flex-col items-center"
            style={{ width: "18%" }}
          >
            <span className="relative z-10 h-3.5 w-3.5 rounded-full border-2 border-red-500 bg-[#050507] shadow-[0_0_10px_rgba(220,38,38,0.6)]" />
            <span className="mt-3 font-mono text-[10px] text-white/40">{s.n}</span>
            <span className="mt-0.5 text-xs font-bold tracking-wide text-white">
              {s.key}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════ STAGE ROW ══════════════════════ */

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function StageRow({ stage, last }: { stage: Stage; last: boolean }) {
  return (
    <motion.div
      variants={rowVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className={cn(
        "group relative pl-12 sm:pl-16",
        last ? "pb-2" : "pb-14 md:pb-20",
      )}
    >
      {/* node on the spine */}
      <motion.span
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="absolute left-[7px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-red-500 bg-[#050507] sm:left-[11px]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.9)]" />
      </motion.span>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
        {/* text column */}
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-3xl font-black leading-none text-white/12 sm:text-4xl">
              {stage.n}
            </span>
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {stage.key}
            </h3>
          </div>

          <p className="mt-4 text-base font-semibold text-zinc-200 sm:text-lg">
            {stage.lead}
          </p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400">
            {stage.body}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white/40">
            <span className="h-1 w-1 rounded-full bg-red-500" />
            {stage.tags}
          </div>
        </div>

        {/* procedural visual */}
        <div className="flex items-center justify-start lg:justify-end">
          <StageGlyph variant={stage.variant} />
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════ STAGE GLYPHS ══════════════════════ */

const StageGlyph = React.memo(function StageGlyph({
  variant,
}: {
  variant: StageVariant;
}) {
  const shell =
    "relative h-28 w-40 sm:h-32 sm:w-48 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden";

  if (variant === "points") {
    // scattered points → snap into an ordered lattice
    const targets = Array.from({ length: 9 }, (_, i) => ({
      x: 40 + (i % 3) * 36,
      y: 30 + Math.floor(i / 3) * 30,
    }));
    return (
      <div className={shell}>
        <svg viewBox="0 0 192 128" className="h-full w-full">
          {targets.map((p, i) => (
            <motion.circle
              key={i}
              r={2.5}
              fill={i === 4 ? ACCENT : "#d4d4d8"}
              initial={{
                cx: 96 + Math.sin(i * 3) * 60,
                cy: 64 + Math.cos(i * 2.3) * 40,
                opacity: 0,
              }}
              whileInView={{ cx: p.x, cy: p.y, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.9, ease: "easeInOut" }}
            />
          ))}
        </svg>
        <Caption>RAW IDEA → CONCEPT</Caption>
      </div>
    );
  }

  if (variant === "network") {
    const nodes = [
      [40, 40],
      [150, 34],
      [96, 66],
      [44, 96],
      [150, 96],
    ];
    const links: [number, number][] = [
      [2, 0],
      [2, 1],
      [2, 3],
      [2, 4],
      [0, 3],
      [1, 4],
    ];
    return (
      <div className={shell}>
        <svg viewBox="0 0 192 128" className="h-full w-full">
          {links.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              stroke="rgba(220,38,38,0.5)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
            />
          ))}
          {nodes.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={i === 2 ? 4 : 3}
              fill={i === 2 ? ACCENT : "#d4d4d8"}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          ))}
        </svg>
        <Caption>NODES → NETWORK</Caption>
      </div>
    );
  }

  if (variant === "terminal") {
    const lines = ["> build()", "> test()", "> iterate()", "> ship()"];
    return (
      <div className={cn(shell, "bg-black/40")}>
        <div className="flex h-full flex-col justify-center gap-1.5 px-4 font-mono text-[11px] text-red-300/90">
          {lines.map((l, i) => (
            <motion.span
              key={l}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.22, duration: 0.3 }}
            >
              {l}
              {i === lines.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-0.5 text-red-400"
                >
                  ▌
                </motion.span>
              )}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "expand") {
    return (
      <div className={shell}>
        <svg viewBox="0 0 192 128" className="h-full w-full">
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={96}
              cy={64}
              r={14 + i * 16}
              fill="none"
              stroke={i === 0 ? ACCENT : "rgba(160,170,190,0.35)"}
              strokeWidth={1}
              initial={{ scale: 0.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.14, duration: 0.7, ease: "easeOut" }}
              style={{ transformOrigin: "96px 64px" }}
            />
          ))}
          <circle cx={96} cy={64} r={3.5} fill={ACCENT} />
        </svg>
        <Caption>PROTOTYPE → IMPACT</Caption>
      </div>
    );
  }

  // lock — assembles into a completed form
  const hex = "96,26 150,58 150,98 96,118 42,98 42,58";
  return (
    <div className={shell}>
      <svg viewBox="0 0 192 128" className="h-full w-full">
        <motion.polygon
          points={hex}
          fill="rgba(220,38,38,0.08)"
          stroke={ACCENT}
          strokeWidth={1.5}
          initial={{ pathLength: 0, opacity: 0, rotate: -12 }}
          whileInView={{ pathLength: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "96px 72px" }}
        />
        <motion.circle
          cx={96}
          cy={72}
          r={4}
          fill={ACCENT}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
          style={{ transformOrigin: "96px 72px" }}
        />
      </svg>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1 }}
        className="absolute inset-x-0 bottom-1.5 text-center font-mono text-[8px] tracking-[0.3em] text-red-400"
      >
        SYSTEM COMPLETE
      </motion.div>
    </div>
  );
});

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-0 bottom-1.5 text-center font-mono text-[8px] tracking-[0.28em] text-white/30">
      {children}
    </div>
  );
}

/* ══════════════════════ TRANSITION STATEMENT ══════════════════════ */

function TransitionStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const aOpacity = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  const aY = useTransform(scrollYProgress, [0.1, 0.45], [0, -18]);
  const bOpacity = useTransform(scrollYProgress, [0.5, 0.85], [0, 1]);
  const bY = useTransform(scrollYProgress, [0.5, 0.85], [18, 0]);

  const chainA = ["INNOVATE", "COLLABORATE", "CODE", "IMPACT", "WIN"];
  const chainB = ["IDEA", "TEAM", "CODE", "IMPACT", "RECOGNITION"];

  return (
    <div
      ref={ref}
      className="relative mt-24 flex h-24 items-center justify-center md:mt-32"
    >
      <motion.div
        style={{ opacity: aOpacity, y: aY }}
        className="absolute flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center font-mono text-sm font-bold tracking-[0.18em] text-white sm:text-base"
      >
        {chainA.map((t, i) => (
          <React.Fragment key={t}>
            {i > 0 && <span className="text-red-500">→</span>}
            <span>{t}</span>
          </React.Fragment>
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: bOpacity, y: bY }}
        className="absolute flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center font-mono text-sm font-bold tracking-[0.18em] text-red-400 sm:text-base"
      >
        {chainB.map((t, i) => (
          <React.Fragment key={t}>
            {i > 0 && <span className="text-white/40">→</span>}
            <span>{t}</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════ CLOSING + CTA ══════════════════════ */

function Closing() {
  return (
    <div className="mt-20 flex flex-col items-center text-center md:mt-28">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl"
      >
        DON&apos;T JUST JOIN
        <br className="hidden sm:block" /> THE HACKATHON.
        <br />
        <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
          BUILD SOMETHING WORTH REMEMBERING.
        </span>
      </motion.h3>

      <motion.a
        href="#tracks"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ y: -2 }}
        className="group mt-10 inline-flex items-center gap-3 rounded-full border border-red-500/40 bg-red-500/10 px-7 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-red-300 backdrop-blur-sm transition-colors hover:border-red-500/70 hover:bg-red-500/20 hover:text-white"
      >
        EXPLORE THE DOMAINS
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </motion.a>
    </div>
  );
}
