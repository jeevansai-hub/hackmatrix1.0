"use client";
import React, { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { X, Download, ChevronLeft, ChevronRight, Lock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getInitialProblemStatus,
  subscribeProblemStatus,
} from "@/lib/problem-status";

/* ────────────────────────────────────────────────────────────
   FRAME 5 — PROBLEM STATEMENTS
   A document access center (preview + download), not a wall of
   card content. The PDF is the centerpiece: a tilted, cursor-
   reactive document, a compact challenge index, and a cinematic
   in-page viewer that jumps to each PS. The official document is
   served from /public and never reproduced here.
   ──────────────────────────────────────────────────────────── */

const PDF_URL = "/hackmatrix-problem-statements.pdf";
const PDF_FILE = "HackMatrix-1.0-Problem-Statements.pdf";
const TOTAL_PAGES = 8;

interface PS {
  id: string;
  n: string;
  title: string;
  sub: string;
  page: number;
}

const PROBLEMS: PS[] = [
  { id: "PS-01", n: "01", title: "SMART TRANSPORTATION & MOBILITY", sub: "Intelligent routing for congestion & transit", page: 1 },
  { id: "PS-02", n: "02", title: "AI ENERGY CONSUMPTION OPTIMIZER", sub: "Detect & reduce wasteful energy usage", page: 2 },
  { id: "PS-03", n: "03", title: "GENAI RESUME & JOB MATCHING", sub: "Match skills to roles for seekers & recruiters", page: 3 },
  { id: "PS-04", n: "04", title: "AI AGENT FOR REPAIRING BROKEN APIS", sub: "Auto-diagnose, fix & test failing APIs", page: 4 },
  { id: "PS-05", n: "05", title: "AI PLANT DISEASE & CROP HEALTH", sub: "Early crop disease detection for farmers", page: 5 },
  { id: "PS-06", n: "06", title: "SMART COMPLAINT MANAGEMENT", sub: "AI-powered campus complaint routing", page: 6 },
  { id: "PS-07", n: "07", title: "SMART LOST & FOUND MANAGEMENT", sub: "Intelligent item matching on campus", page: 7 },
  { id: "PS-08", n: "08", title: "FACULTY WORKLOAD BALANCING", sub: "Intelligent workload distribution", page: 8 },
];

export default function Problems() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [startPage, setStartPage] = useState(1);
  const [isLaunched, setIsLaunched] = useState(getInitialProblemStatus);

  useEffect(() => {
    const unsub = subscribeProblemStatus((launched) => {
      setIsLaunched(launched);
    });
    return unsub;
  }, []);

  const openViewer = useCallback((page = 1) => {
    if (!isLaunched) return;
    setStartPage(page);
    setViewerOpen(true);
  }, [isLaunched]);

  return (
    <section
      id="problems"
      className="relative overflow-hidden bg-[#050505] text-zinc-300"
    >
      {/* faint engineering grid + warm document light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,130,150,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,130,150,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 30% 30%, #000 55%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 20% 0%, rgba(220,38,38,0.10), transparent 55%)",
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
          05 / PROBLEM STATEMENTS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          THE CHALLENGES
          <br />
          <span className="bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent">
            ARE WAITING.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base"
        >
          Real campus problems. Real constraints. One opportunity to build
          something meaningful. Explore the official HackMatrix 1.0 problem
          statements and choose the challenge your team wants to take on.
        </motion.p>

        {/* ═══ MAIN: document + content (LAUNCHED OR REVOKED) ═══ */}
        {isLaunched ? (
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_1.1fr] lg:gap-16">
            {/* left: tilted document */}
            <div className="flex justify-center lg:justify-start">
              <DocumentCard onOpen={() => openViewer(1)} />
            </div>

            {/* right: content */}
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-red-500">
                OFFICIAL CHALLENGE DOCUMENT
              </p>
              <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
                8 PROBLEMS.
                <br />
                <span className="text-white/40">COUNTLESS APPROACHES.</span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                The official HackMatrix 1.0 problem statement document contains
                eight real-world challenges designed around campus operations,
                student services, academic systems, and institutional efficiency.
              </p>

              {/* challenge index */}
              <div className="mt-7 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                {PROBLEMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => openViewer(p.page)}
                    className="group flex items-start gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="mt-0.5 font-mono text-[11px] text-red-500/80">
                      {p.n}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12px] font-bold tracking-tight text-white/85 group-hover:text-white">
                        {p.title}
                      </span>
                      <span className="block truncate text-[10px] text-white/40">
                        {p.sub}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              {/* primary actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => openViewer(1)}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:bg-red-500 hover:shadow-red-600/50 cursor-pointer"
                >
                  PREVIEW PROBLEM STATEMENTS
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </button>
                <a
                  href={PDF_URL}
                  download={PDF_FILE}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/10"
                >
                  DOWNLOAD PDF
                  <span className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </div>
              <p className="mt-3 font-mono text-[10px] tracking-[0.25em] text-white/35">
                OFFICIAL DOCUMENT · 16 PAGES · PDF
              </p>
            </div>
          </div>
        ) : (
          /* REVOKED / LOCKED STATE CARD */
          <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-b from-red-500/10 via-black/90 to-black p-8 text-center sm:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-500/40 bg-red-500/20 text-red-400 shadow-lg shadow-red-900/40">
              <Lock className="h-8 w-8" />
            </div>
            <p className="mt-6 font-mono text-xs tracking-[0.3em] text-red-400 font-bold">
              PROBLEM STATEMENTS LOCKED / REVOKED
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              CHALLENGE RELEASE PENDING
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400">
              The official HackMatrix 1.0 problem statements are currently locked or under review by the organisers. Check back soon for the official release!
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/50">
              <ShieldAlert className="h-4 w-4 text-red-400" />
              STATUS: AWAITING ORGANISER RELEASE
            </div>
          </div>
        )}

        {/* ═══ CLOSING ═══ */}
        <div className="mt-24 border-t border-white/10 pt-14 md:mt-32">
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl"
          >
            READ THE CHALLENGE.
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              THEN BUILD YOUR ANSWER.
            </span>
          </motion.h3>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-zinc-400">
            Study the requirements. Understand the constraints. Bring your
            team&apos;s perspective to the problem.
          </p>
          <button
            onClick={() => openViewer(1)}
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-red-500/40 bg-red-500/10 px-7 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-red-300 backdrop-blur-sm transition-colors hover:border-red-500/70 hover:bg-red-500/20 hover:text-white"
          >
            OPEN THE FULL DOCUMENT
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>

      {/* ═══ VIEWER MODAL ═══ */}
      <AnimatePresence>
        {viewerOpen && (
          <PdfViewer
            startPage={startPage}
            onClose={() => setViewerOpen(false)}
            problems={PROBLEMS}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════ TILTED DOCUMENT ══════════════════════ */

function DocumentCard({ onOpen }: { onOpen: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), {
    stiffness: 180,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 180,
    damping: 20,
  });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 1200 }}>
      <motion.button
        onPointerMove={onMove}
        onPointerLeave={reset}
        onClick={onOpen}
        aria-label="Preview problem statements"
        whileHover={{ y: -10 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative block w-64 cursor-pointer sm:w-72"
      >
        {/* underlying stacked pages (depth) */}
        <span className="absolute inset-0 -z-10 translate-x-2 translate-y-2 rounded-md bg-neutral-800/70" />
        <span className="absolute inset-0 -z-20 translate-x-4 translate-y-4 rounded-md bg-neutral-900/60" />
        {/* crimson bloom */}
        <span className="absolute -inset-6 -z-30 rounded-3xl bg-red-600/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />

        {/* the document face */}
        <span className="relative block aspect-[8.5/11] overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
          {/* header band */}
          <span className="block bg-red-600 px-5 py-4">
            <span className="block font-mono text-[9px] tracking-[0.3em] text-white/80">
              HACKMATRIX 1.0
            </span>
            <span className="mt-1 block text-lg font-black leading-tight text-white">
              OFFICIAL
              <br />
              PROBLEM
              <br />
              STATEMENTS
            </span>
          </span>

          {/* faux text lines */}
          <span className="block space-y-2 px-5 py-5">
            {[
              "w-4/5", "w-full", "w-3/5", "w-full", "w-2/3",
            ].map((w, i) => (
              <span
                key={i}
                className={cn("block h-1.5 rounded-full bg-neutral-400/60", w)}
              />
            ))}
          </span>

          {/* stat block */}
          <span className="absolute inset-x-5 bottom-5 flex items-end justify-between">
            <span className="block">
              <span className="block text-2xl font-black leading-none text-neutral-800">
                08
              </span>
              <span className="block font-mono text-[8px] tracking-[0.2em] text-neutral-500">
                CHALLENGES
              </span>
            </span>
            <span className="block text-right">
              <span className="block text-2xl font-black leading-none text-neutral-800">
                16
              </span>
              <span className="block font-mono text-[8px] tracking-[0.2em] text-neutral-500">
                PAGES
              </span>
            </span>
          </span>

          {/* moving light reflection */}
          <motion.span
            aria-hidden
            style={{ left: glareX }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </span>

        {/* technical annotation */}
        <span className="absolute -bottom-6 left-1 font-mono text-[9px] tracking-[0.3em] text-white/30">
          PDF / 01
        </span>
        <span className="absolute -right-2 -top-3 rounded-full border border-red-500/50 bg-black/80 px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] text-red-400 backdrop-blur-sm">
          CLICK TO PREVIEW
        </span>
      </motion.button>
    </div>
  );
}

/* ══════════════════════ PDF VIEWER MODAL ══════════════════════ */

function PdfViewer({
  startPage,
  onClose,
  problems,
}: {
  startPage: number;
  onClose: () => void;
  problems: PS[];
}) {
  const [page, setPage] = useState(startPage);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pageRef = useRef(startPage);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Smooth-scroll the viewer to a given page image.
  const go = useCallback((p: number) => {
    const target = Math.min(TOTAL_PAGES, Math.max(1, p));
    const el = pageRefs.current[target - 1];
    const container = scrollRef.current;
    if (el && container) {
      container.scrollTo({ top: el.offsetTop - 12, behavior: "smooth" });
    }
    setPage(target);
  }, []);

  // Open directly at the requested PS page (no animation on first paint).
  useEffect(() => {
    const el = pageRefs.current[startPage - 1];
    const container = scrollRef.current;
    if (el && container) container.scrollTop = el.offsetTop - 12;
  }, [startPage]);

  // Derive the active page from scroll position — scrolling moves through
  // the statements naturally (essential on mobile, where paging is by swipe).
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = container.scrollTop + container.clientHeight / 2;
        let best = 1;
        let bestDist = Infinity;
        pageRefs.current.forEach((el, i) => {
          if (!el) return;
          const center = el.offsetTop + el.offsetHeight / 2;
          const d = Math.abs(center - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i + 1;
          }
        });
        setPage(best);
      });
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Esc to close, arrows to page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(pageRef.current + 1);
      else if (e.key === "ArrowLeft") go(pageRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, go]);

  // active PS = the last one whose page <= current page
  const activePs =
    [...problems].reverse().find((p) => p.page <= page)?.id ?? problems[0].id;

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 14 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl"
      >
        {/* top bar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-red-500/[0.08] to-transparent px-4 py-3 sm:px-5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-red-400">
              OFFICIAL PROBLEM STATEMENTS
            </p>
            <p className="text-sm font-black tracking-tight text-white">
              HACKMATRIX 1.0
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={PDF_URL}
              download={PDF_FILE}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-white/80 transition-colors hover:bg-white/10"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">DOWNLOAD</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close viewer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/50 bg-red-500/15 text-red-400 transition-colors hover:bg-red-500 hover:text-white"
            >
              <X className="h-4.5 w-4.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* body: index + page */}
        <div className="flex min-h-0 flex-1">
          {/* PS index (desktop) */}
          <div className="hidden w-56 shrink-0 overflow-y-auto border-r border-white/10 bg-black/30 p-3 md:block">
            {problems.map((p) => (
              <button
                key={p.id}
                onClick={() => go(p.page)}
                className={cn(
                  "mb-1 block w-full rounded-lg border-l-2 px-3 py-2 text-left transition-colors",
                  activePs === p.id
                    ? "border-red-500 bg-red-500/10"
                    : "border-transparent hover:bg-white/5",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px]",
                    activePs === p.id ? "text-red-400" : "text-white/40",
                  )}
                >
                  {p.id}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block text-[11px] font-bold leading-tight tracking-tight",
                    activePs === p.id ? "text-white" : "text-white/55",
                  )}
                >
                  {p.title}
                </span>
              </button>
            ))}
          </div>

          {/* pages — continuous vertical scroll of rendered images. Works inline
              on mobile (an embedded PDF only offered an "Open" prompt there). */}
          <div ref={scrollRef} className="relative min-w-0 flex-1 overflow-y-auto bg-neutral-900">
            <div className="mx-auto flex max-w-3xl flex-col gap-3 p-3 sm:gap-4 sm:p-4">
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
                <div
                  key={p}
                  ref={(el) => {
                    pageRefs.current[p - 1] = el;
                  }}
                  className="relative overflow-hidden rounded-md bg-neutral-800 shadow-2xl"
                  style={{ aspectRatio: "1191 / 1684" }}
                >
                  <img
                    src={`/problem-statements/ps-${String(p).padStart(2, "0")}.jpg`}
                    alt={`Problem statements page ${p}`}
                    loading={p <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bottom bar: page nav — two rows on mobile so nothing overlaps */}
        <div className="flex flex-col gap-2.5 border-t border-white/10 bg-black/40 px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <span className="shrink-0 font-mono text-[11px] tracking-[0.2em] text-white/60">
              PAGE {String(page).padStart(2, "0")} / {TOTAL_PAGES}
            </span>

            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => go(page - 1)}
                disabled={page <= 1}
                aria-label="Previous page"
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-white/80 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">PREV</span>
              </button>
              <button
                onClick={() => go(page + 1)}
                disabled={page >= TOTAL_PAGES}
                aria-label="Next page"
                className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-red-300 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* PS jump — full width, mobile/tablet only */}
          <select
            value={activePs}
            onChange={(e) => {
              const ps = problems.find((p) => p.id === e.target.value);
              if (ps) go(ps.page);
            }}
            aria-label="Jump to problem statement"
            className="w-full truncate rounded-md border border-white/15 bg-black px-2.5 py-2 font-mono text-[11px] text-white/80 md:hidden"
          >
            {problems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} · {p.title}
              </option>
            ))}
          </select>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
