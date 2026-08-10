"use client";
import React, { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Award,
  Medal,
  Trophy,
  Mail,
  MapPin,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   FRAME 07 — CERTIFICATION & RECOGNITION
   Everyone who shows up is recognized; the certificate scales
   with how far a team progresses. A recognition ladder up top,
   then two tilted, cursor-reactive certificate cards that open a
   cinematic full-screen viewer with the real certificate images.
   ──────────────────────────────────────────────────────────── */

// ── Three-stage recognition ladder ──────────────────────────────────────────
const STAGES = [
  {
    step: "01",
    tag: "DAY 01 · PARTICIPATE",
    title: "Certificate of Participation",
    Icon: Award,
    blurb:
      "Complete the first day of HackMatrix 1.0 and receive an official e-Certificate of Participation delivered to your registered email.",
    meta: [
      { k: "FORMAT", v: "DIGITAL" },
      { k: "DELIVERY", v: "REGISTERED EMAIL" },
      { k: "ELIGIBILITY", v: "DAY 01 PARTICIPANTS" },
    ],
    cta: "E-CERTIFICATE",
  },
  {
    step: "02",
    tag: "DAY 02 · SHORTLISTED",
    title: "Certificate of Appreciation",
    Icon: Medal,
    blurb:
      "Teams selected to continue into the second day receive an official physical Certificate of Appreciation, presented at the venue.",
    meta: [
      { k: "FORMAT", v: "PHYSICAL" },
      { k: "DELIVERY", v: "AT THE VENUE" },
      { k: "ELIGIBILITY", v: "SELECTED DAY 02 TEAMS" },
    ],
    cta: "PHYSICAL CERTIFICATE",
  },
  {
    step: "03",
    tag: "FINALE · WINNERS",
    title: "₹10,000 Cash + Winner Certificate",
    Icon: Trophy,
    blurb:
      "The final winning team takes home the ₹10,000 cash prize alongside an official Winner Certificate, awarded on stage at the venue.",
    meta: [
      { k: "PRIZE", v: "₹10,000 CASH" },
      { k: "DELIVERY", v: "ON STAGE" },
      { k: "ELIGIBILITY", v: "FINAL WINNERS" },
    ],
    cta: "WINNER CERTIFICATE",
    highlight: true,
  },
];

// ── The two certificate designs available to preview ─────────────────────────
interface Cert {
  id: string;
  title: string;
  tag: string;
  format: string;
  delivery: string;
  src: string;
  alt: string;
}

const CERTS: Cert[] = [
  {
    id: "participation",
    title: "Certificate of Participation",
    tag: "DAY 01 · PARTICIPATION",
    format: "E-CERTIFICATE",
    delivery: "REGISTERED EMAIL",
    src: "/certificates/participation.jpeg",
    alt: "HackMatrix 1.0 Certificate of Participation",
  },
  {
    id: "appreciation",
    title: "Certificate of Appreciation",
    tag: "DAY 02 · APPRECIATION",
    format: "PHYSICAL CERTIFICATE",
    delivery: "AT THE VENUE",
    src: "/certificates/appreciation.jpeg",
    alt: "HackMatrix 1.0 Certificate of Appreciation",
  },
];

export default function Certificates() {
  const [viewer, setViewer] = useState<number | null>(null);

  const open = useCallback((i: number) => setViewer(i), []);
  const close = useCallback(() => setViewer(null), []);

  return (
    <section
      id="recognition"
      className="relative py-28 px-4 bg-transparent overflow-hidden"
    >
      {/* Cyber grid background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      {/* Ambient red glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[620px] h-[620px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* ── Header ── */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500/60 mb-3 font-mono"
          >
            07 / Recognition
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black text-white leading-[1.05]"
          >
            Every Builder <span className="text-red-500">Gets Recognized.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-white/50 max-w-2xl mx-auto text-base sm:text-lg"
          >
            Your HackMatrix journey comes with official recognition. The
            certificate you receive scales with how far your team progresses.
          </motion.p>
        </div>

        {/* ── Progression ladder — 3D scroll-reveal ── */}
        <LadderReveal>
          {STAGES.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative"
            >
              <CardContainer className="w-full" containerClassName="py-0 w-full h-full">
                <CardBody
                  className={`group/card relative flex h-full w-full flex-col rounded-2xl border p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 ${
                    s.highlight
                      ? "border-red-500/50 bg-gradient-to-b from-red-500/[0.10] via-black to-zinc-950 hover:border-red-500/70 hover:shadow-2xl hover:shadow-red-600/20"
                      : "border-white/10 bg-gradient-to-b from-zinc-900/90 via-black to-zinc-950 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-600/10"
                  }`}
                >
                  <CardItem
                    translateZ="20"
                    className="pointer-events-none absolute right-5 top-4 font-mono text-5xl font-black text-white/[0.04] select-none"
                  >
                    {s.step}
                  </CardItem>

                  <CardItem translateZ="60">
                    <motion.span
                      animate={
                        s.highlight
                          ? { rotate: [0, -8, 8, -8, 0], y: [0, -2, 0] }
                          : { y: [0, -3, 0] }
                      }
                      transition={{
                        duration: 3 + i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 shadow-lg shadow-red-600/10"
                    >
                      <s.Icon className="h-6 w-6" strokeWidth={1.75} />
                    </motion.span>
                  </CardItem>

                  <CardItem translateZ="40" className="mt-5 w-full">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">
                      {s.tag}
                    </span>
                    <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-white">
                      {s.title}
                    </h3>
                  </CardItem>

                  <CardItem translateZ="30" as="p" className="mt-3 w-full text-sm leading-relaxed text-white/55">
                    {s.blurb}
                  </CardItem>

                  <CardItem translateZ="30" className="mt-5 w-full space-y-2 border-t border-white/10 pt-4">
                    {s.meta.map((m) => (
                      <div key={m.k} className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                          {m.k}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                          {m.v}
                        </span>
                      </div>
                    ))}
                  </CardItem>

                  <CardItem translateZ="50" className="mt-6 w-full">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide ${
                        s.highlight
                          ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                          : "border border-red-500/30 bg-red-500/10 text-red-300"
                      }`}
                    >
                      {s.highlight ? (
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                      )}
                      {s.cta}
                    </span>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </LadderReveal>

        {/* Flow line under the ladder (desktop) */}
        <div className="mt-6 hidden items-center justify-center gap-3 lg:flex">
          {["DAY 01", "SHORTLISTED", "DAY 02", "WINNERS"].map((label, i, arr) => (
            <React.Fragment key={label}>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {label}
              </span>
              {i < arr.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 text-red-500/50" strokeWidth={2} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Certificate preview gallery ── */}
        <div className="mt-28 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.4em] text-red-500/60 mb-3 font-mono"
          >
            Official Certificate Preview
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-black text-white"
          >
            See What You&apos;ll <span className="text-red-500">Earn</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-lg text-sm text-white/45"
          >
            Two official certificate designs. Click any card to open the
            full-screen preview.
          </motion.p>

          {/* Two tilted certificate cards */}
          <div className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2">
            {CERTS.map((c, i) => (
              <CertCard key={c.id} cert={c} index={i} onOpen={() => open(i)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-screen viewer ── */}
      <AnimatePresence>
        {viewer !== null && (
          <CertViewer
            index={viewer}
            certs={CERTS}
            onClose={close}
            onNavigate={setViewer}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════ 3D SCROLL-REVEAL LADDER ══════════════════════ */

// Wraps the three recognition cards and stands them up from a tilted plane
// as they scroll into view — the scroll-linked 3D reveal, applied in place.
// Fully responsive: on mobile the cards stack and still reveal cleanly.
function LadderReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 60%"],
  });
  // Spring-smooth the scroll so the reveal glides instead of tracking 1:1.
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
    restDelta: 0.001,
  });
  const rotateX = useTransform(p, [0, 1], [42, 0]);
  const scale = useTransform(p, [0, 1], [0.9, 1]);
  const y = useTransform(p, [0, 1], [70, 0]);
  const opacity = useTransform(p, [0, 0.45], [0, 1]);
  const blur = useTransform(p, [0, 0.5], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <div ref={ref} className="mt-16 [perspective:1500px]">
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          filter,
          transformOrigin: "50% 0%",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, filter",
        }}
        className="grid gap-5 lg:grid-cols-3 lg:gap-6"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ══════════════════════ TILTED CERTIFICATE CARD ══════════════════════ */

function CertCard({
  cert,
  index,
  onOpen,
}: {
  cert: Cert;
  index: number;
  onOpen: () => void;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 180,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.55 }}
      style={{ perspective: 1300 }}
      className="flex flex-col items-center"
    >
      <motion.button
        onPointerMove={onMove}
        onPointerLeave={reset}
        onClick={onOpen}
        aria-label={`Preview ${cert.title}`}
        whileHover={{ y: -8 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative block w-full max-w-md cursor-pointer"
      >
        {/* stacked depth layers */}
        <span className="absolute inset-0 -z-10 translate-x-2 translate-y-2 rounded-xl bg-neutral-800/60" />
        <span className="absolute inset-0 -z-20 translate-x-4 translate-y-4 rounded-xl bg-neutral-900/50" />
        {/* crimson bloom */}
        <span className="absolute -inset-6 -z-30 rounded-3xl bg-red-600/20 blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-100" />

        {/* certificate face — LOCKED MOCKUP (real certificate stays hidden until preview) */}
        <span className="relative block overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85)]">
          <span className="relative block w-full" style={{ aspectRatio: "1500 / 1050" }}>
            {/* red header band */}
            <span className="block bg-red-600 px-5 py-3.5 sm:px-6 sm:py-4">
              <span className="block font-mono text-[8px] tracking-[0.3em] text-white/80 sm:text-[9px]">
                HACKMATRIX 1.0
              </span>
              <span className="mt-1 block text-sm font-black leading-tight text-white sm:text-base">
                {cert.title.toUpperCase()}
              </span>
            </span>

            {/* faux recipient + text lines */}
            <span className="block px-5 pt-4 sm:px-6 sm:pt-5">
              <span className="block h-2 w-2/5 rounded-full bg-neutral-500/50" />
              <span className="mt-3 block space-y-2">
                {["w-full", "w-4/5", "w-11/12", "w-2/3"].map((w, i) => (
                  <span key={i} className={`block h-1.5 rounded-full bg-neutral-400/50 ${w}`} />
                ))}
              </span>
            </span>

            {/* stat / signature block */}
            <span className="absolute inset-x-5 bottom-4 flex items-end justify-between sm:inset-x-6 sm:bottom-5">
              <span className="block">
                <span className="block h-1.5 w-16 rounded-full bg-neutral-500/60" />
                <span className="mt-1.5 block font-mono text-[8px] tracking-[0.2em] text-neutral-500">
                  {cert.format}
                </span>
              </span>
              <span className="block text-right">
                <span className="ml-auto block h-1.5 w-16 rounded-full bg-neutral-500/60" />
                <span className="mt-1.5 block font-mono text-[8px] tracking-[0.2em] text-neutral-500">
                  {cert.delivery}
                </span>
              </span>
            </span>

            {/* frosted overlay — hides the design until preview */}
            <span className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-200/30 backdrop-blur-[3px] transition-all duration-300 group-hover:bg-black/50 group-hover:backdrop-blur-[2px]">
              <span className="rounded-full border border-red-500/40 bg-black/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white shadow-lg shadow-red-900/30 transition-transform duration-300 group-hover:scale-105">
                Click to reveal
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

        {/* corner badge */}
        <span className="absolute -right-2 -top-3 rounded-full border border-red-500/50 bg-black/80 px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] text-red-400 backdrop-blur-sm">
          CLICK TO PREVIEW
        </span>
      </motion.button>

      {/* caption below card */}
      <div className="mt-8 w-full max-w-md text-left">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-500/80">
          {cert.tag}
        </p>
        <h4 className="mt-1.5 text-lg font-bold tracking-tight text-white">
          {cert.title}
        </h4>
        <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
          <span className="text-white/70">{cert.format}</span>
          <span className="text-red-500/50">·</span>
          <span>{cert.delivery}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════ FULL-SCREEN CERTIFICATE VIEWER ══════════════════════ */

function CertViewer({
  index,
  certs,
  onClose,
  onNavigate,
}: {
  index: number;
  certs: Cert[];
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const cert = certs[index];

  const go = useCallback(
    (i: number) => onNavigate((i + certs.length) % certs.length),
    [certs.length, onNavigate],
  );

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, go, index]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
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
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.3em] text-red-400">
              {cert.tag}
            </p>
            <p className="truncate text-sm font-black tracking-tight text-white">
              {cert.title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={cert.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-white/80 transition-colors hover:bg-white/10"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">FULL IMAGE</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close viewer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/50 bg-red-500/15 text-red-400 transition-colors hover:bg-red-500 hover:text-white"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* body: certificate image with flip transition */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-neutral-950 p-4 sm:p-8">
          {/* subtle grid backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(220,38,38,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative w-full max-w-3xl" style={{ perspective: 1600 }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={cert.id}
                src={cert.src}
                alt={cert.alt}
                initial={{ opacity: 0, rotateY: 30, scale: 0.96 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -30, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto w-full rounded-lg border border-white/10 shadow-2xl shadow-red-600/10"
                style={{ transformStyle: "preserve-3d" }}
              />
            </AnimatePresence>
          </div>

          {/* prev / next arrows */}
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous certificate"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur transition-colors hover:border-red-500/60 hover:text-white sm:left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next certificate"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur transition-colors hover:border-red-500/60 hover:text-white sm:right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* bottom bar: switch tabs + delivery note */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-4 py-3 sm:flex-row sm:px-5">
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white/55">
            {index === 0 ? (
              <Mail className="h-3.5 w-3.5 text-red-400" strokeWidth={2} />
            ) : (
              <MapPin className="h-3.5 w-3.5 text-red-400" strokeWidth={2} />
            )}
            {cert.format} · {cert.delivery}
          </span>

          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {certs.map((c, i) => (
              <button
                key={c.id}
                onClick={() => onNavigate(i)}
                className={`relative rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors ${
                  index === i ? "text-white" : "text-white/45 hover:text-white/75"
                }`}
              >
                {index === i && (
                  <motion.span
                    layoutId="viewer-tab-pill"
                    className="absolute inset-0 rounded-full bg-red-600 shadow-lg shadow-red-900/40"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {c.id === "participation" ? "Participation" : "Appreciation"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
