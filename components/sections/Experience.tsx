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

export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.7", "end 0.6"],
  });
  // the rail inks in as the section travels up the viewport
  const railFill = useSpring(scrollYProgress, {
    stiffness: 110,
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

        {/* ═══ THE ROUTE — one continuous rail through the five stages ═══ */}
        <div ref={railRef} className="relative mt-16 md:mt-24">
          {/* rail track */}
          <div className="absolute bottom-6 left-[10px] top-3 w-px bg-white/12 sm:left-[12px]" />
          {/* the stretch already travelled */}
          <motion.div
            style={{ scaleY: railFill }}
            className="absolute bottom-6 left-[10px] top-3 w-px origin-top bg-gradient-to-b from-red-500 via-red-500 to-red-500/20 shadow-[0_0_12px_rgba(220,38,38,0.75)] sm:left-[12px]"
          />

          {STAGES.map((stage, i) => (
            <StageRow
              key={stage.key}
              stage={stage}
              last={i === STAGES.length - 1}
            />
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
    <div className="max-w-3xl">
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
          WHERE IDEAS
          <br />
          <span className="bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent">
            BECOME REALITY.
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
    </div>
  );
}

/* ══════════════════════ STAGE ROW ══════════════════════ */

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function StageRow({
  stage,
  last,
}: {
  stage: Stage;
  last: boolean;
}) {
  return (
    <motion.div
      variants={rowVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("group relative", last ? "pb-2" : "pb-8 sm:pb-10 md:pb-12")}
    >
      {/* ── waypoint marker, centred on the rail ── */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
          delay: 0.08,
        }}
        className="absolute left-[2px] top-3 z-20 sm:left-[4px]"
      >
        <span className="relative flex h-4 w-4 items-center justify-center sm:h-[18px] sm:w-[18px]">
          <span className="absolute inset-0 rounded-full bg-red-500/25 blur-[6px] transition-colors duration-500 group-hover:bg-red-500/70" />
          <span className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-red-500 bg-[#050507] shadow-[0_0_12px_rgba(220,38,38,0.85)] transition-transform duration-300 group-hover:scale-110">
            <span className="h-[5px] w-[5px] rounded-full bg-red-500" />
          </span>
        </span>
      </motion.span>

      {/* ── the stop ── */}
      <div className="pl-9 sm:pl-12" style={{ perspective: "1000px" }}>
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-transparent p-4 transition-all duration-500 will-change-transform group-hover:border-red-500/35 group-hover:shadow-[0_18px_50px_-26px_rgba(220,38,38,0.7)] sm:rounded-2xl sm:p-5 md:p-6 md:group-hover:[transform:rotateX(2deg)_translateZ(12px)]">
          {/* fine machined hatch — keeps the surface from reading as flat CG */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.022) 0 1px, transparent 1px 8px)",
            }}
          />

          <div className="relative">
            {/* header: label rule + the numeral, fully inside the panel */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.3em] text-red-400 sm:text-[10px]">
                STAGE
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-red-500/45 to-transparent" />
              <span className="shrink-0 font-mono text-2xl font-black leading-none text-white/15 transition-colors duration-500 group-hover:text-white/30 sm:text-3xl">
                {stage.n}
              </span>
            </div>

            <h3 className="mt-2.5 text-xl font-black leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
              {stage.key}
            </h3>

            <p className="mt-2 text-[15px] font-semibold leading-snug text-zinc-200 sm:text-base">
              {stage.lead}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400 sm:text-sm">
              {stage.body}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {stage.tags.split("/").map((t) => (
                <span
                  key={t}
                  className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-white/50 transition-colors duration-500 group-hover:border-red-500/25 group-hover:text-white/70 sm:px-2.5 sm:py-1 sm:text-[10px]"
                >
                  {t.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
