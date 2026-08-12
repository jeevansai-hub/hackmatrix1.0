"use client";
import React from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Shirt,
  AlarmClock,
  Cpu,
  Laptop,
  Wifi,
  BadgeCheck,
  UtensilsCrossed,
  FolderCheck,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
   FRAME 06 — ESSENTIALS & RULES
   The participant briefing board: venue, lab allotments, dress
   code and reporting up top as quick facts, then the mandatory
   rules laid out as a numbered console, closing on the hard
   1:00 PM re-entry deadline. Same program-board texture as the
   Timeline so the two read as one continuous document.
   ──────────────────────────────────────────────────────────── */

interface QuickFact {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
}

const QUICK_FACTS: QuickFact[] = [
  {
    icon: MapPin,
    label: "VENUE",
    value: "Aryabhatta Centre for Computing",
    sub: "Day 01 · Allotted labs",
  },
  {
    icon: Shirt,
    label: "DRESS CODE",
    value: "Non-Uniform",
    sub: "Come as you build",
  },
  {
    icon: AlarmClock,
    label: "REPORTING",
    value: "8:45 AM Sharp",
    sub: "For slot allocation",
  },
];

interface Lab {
  no: string;
  name: string;
}

const LABS: Lab[] = [
  { no: "01", name: "Mark" },
  { no: "02", name: "Dennis" },
  { no: "03", name: "Tim" },
  { no: "04", name: "Edgar" },
  { no: "05", name: "Larry" },
  { no: "06", name: "AB-05" },
];

interface Rule {
  icon: React.ElementType;
  no: string;
  title: string;
  body: string;
}

const RULES: Rule[] = [
  {
    icon: Laptop,
    no: "01",
    title: "Laptops & Devices",
    body: "Bring a fully charged laptop and charger. Organizers may provide computers, subject to availability.",
  },
  {
    icon: Wifi,
    no: "02",
    title: "Internet",
    body: "Wi-Fi will be provided at the venue. Keep your mobile hotspot ready as a backup connection.",
  },
  {
    icon: BadgeCheck,
    no: "03",
    title: "ID Card — Mandatory",
    body: "Carry your valid college / institute ID card at all times for verification at the venue.",
  },
  {
    icon: AlarmClock,
    no: "04",
    title: "Reporting",
    body: "Report at the venue sharp at 8:45 AM for slot allocation. Be punctual to avoid delays.",
  },
  {
    icon: UtensilsCrossed,
    no: "05",
    title: "Lunch & Refreshments",
    body: "Snacks are provided during the break. Carry your own water bottle and lunch box. On Day 1, be back sharp at 1:00 PM.",
  },
  {
    icon: FolderCheck,
    no: "06",
    title: "Project Preparation",
    body: "Keep your prototype ready beforehand. If incomplete, finish within the hackathon time before 1:00 PM, then be ready for evaluation.",
  },
  {
    icon: ShieldCheck,
    no: "07",
    title: "General Conduct",
    body: "Follow the schedule and coordinator instructions. Keep your belongings safe and cooperate with organizers and volunteers.",
  },
];

export default function Essentials() {
  return (
    <section
      id="essentials"
      className="relative overflow-hidden bg-[#04050a] text-zinc-300"
    >
      {/* program-board texture — matches the Timeline frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(140,150,180,0.05) 0, rgba(140,150,180,0.05) 1px, transparent 1px, transparent 46px)",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 100% 0%, rgba(70,90,140,0.10), transparent 55%), radial-gradient(50% 40% at 0% 100%, rgba(220,38,38,0.08), transparent 55%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 md:py-32">
        {/* ═══ HEADER ═══ */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] tracking-[0.4em] text-white/40"
        >
          06 / ESSENTIALS &amp; RULES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          KNOW BEFORE
          <br />
          <span className="text-white/40">YOU BUILD.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base"
        >
          Everything you need before you arrive — where to be, what to carry,
          and the ground rules that keep HackMatrix running on time. Read once,
          build worry-free.
        </motion.p>

        {/* ═══ QUICK FACTS ═══ */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {QUICK_FACTS.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-red-500/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
                  <f.icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                  {f.label}
                </span>
              </div>
              <p className="mt-4 text-lg font-bold leading-tight tracking-tight text-white">
                {f.value}
              </p>
              <p className="mt-1 text-xs text-white/45">{f.sub}</p>
              <span className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-red-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* ═══ LAB ALLOTMENTS ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          <div className="flex flex-col gap-3 border-b border-white/10 bg-gradient-to-r from-red-500/[0.07] to-transparent px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-[0.3em] text-red-500">
                  LAB ALLOTMENTS
                </span>
                <span className="h-3 w-px bg-white/20" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-white/45">
                  AI&amp;DS DEPARTMENT
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                FIND YOUR LAB
              </h3>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              6 LABS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:p-5">
            {LABS.map((lab, i) => (
              <motion.div
                key={lab.no}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 transition-colors hover:border-red-500/30 hover:bg-red-500/[0.05]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors group-hover:border-red-500/40 group-hover:text-red-400">
                  <Cpu className="h-4 w-4" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-white/35">
                    LAB {lab.no}
                  </p>
                  <p className="truncate text-base font-bold tracking-tight text-white">
                    {lab.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ IMPORTANT RULES ═══ */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-red-500">
              IMPORTANT RULES
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </motion.div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {RULES.map((rule, i) => (
              <motion.div
                key={rule.no}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 2) * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-red-500/25 hover:bg-white/[0.035]",
                  // last odd rule spans full width on 2-col grids
                  i === RULES.length - 1 && RULES.length % 2 === 1
                    ? "md:col-span-2"
                    : "",
                )}
              >
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
                    <rule.icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">
                    {rule.no}
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold tracking-tight text-white">
                    {rule.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {rule.body}
                  </p>
                </div>
                <span className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ RE-ENTRY DEADLINE CALLOUT ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col gap-4 rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-5 sm:flex-row sm:items-center sm:p-6"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/40 bg-red-500/15 text-red-400">
            <Clock3 className="h-5 w-5" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.3em] text-red-400">
              HARD DEADLINE · POST-LUNCH
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/80">
              Be back at your allotted lab by{" "}
              <span className="font-bold text-white">1:00 PM sharp</span> after
              lunch — Day 1 judging begins immediately. Late teams risk missing
              their evaluation slot.
            </p>
          </div>
        </motion.div>

        {/* ═══ CLOSING ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 border-t border-white/10 pt-10 text-center md:mt-28"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-red-400">
            HACKMATRIX 1.0 · PARTICIPANT BRIEFING
          </p>
          <p className="mt-3 text-sm text-white/45">
            Read it once, follow it through — the rest is all about the build.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
