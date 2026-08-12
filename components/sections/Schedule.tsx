"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
   FRAME 4 — HACKATHON EXPERIENCE
   A professional event-program board: a time-driven agenda where
   every slot stays quiet by default and the focused item grows
   stronger. Distinct from Frame 2 (build-log) and Frame 3
   (domain console): here the left column is real clock time and
   the two days are linked by an evaluation → selection junction.
   ──────────────────────────────────────────────────────────── */

type Kind = "normal" | "break" | "milestone";

interface Slot {
  id: string;
  time: string;
  title: string;
  label: string;
  body: string;
  kind?: Kind;
  flow?: string[];
}

interface Day {
  tag: string;
  date: string;
  window: string;
  heading: string;
  desc: string;
  slots: Slot[];
}

const DAY_01: Day = {
  tag: "DAY 1",
  date: "",
  window: "8:45 AM – 4:00 PM",
  heading: "BUILD · EVALUATE · QUALIFY",
  desc: "Venue: Aryabhatta Centre for Computing (Labs — Mark, Dennis, Tim, Edgar, Larry & AB-05). Day 1 runs from the problem-statement workout through building, judging, and the Top 10 qualification announcement.",
  slots: [
    {
      id: "d1-0",
      time: "8:45 AM",
      title: "REPORTING & SLOT ALLOCATION",
      label: "ARRIVE · VERIFY · SETTLE",
      body: "Report at the venue sharp at 8:45 AM for slot allocation. Carry your ID card and be punctual to avoid delays.",
    },
    {
      id: "d1-1",
      time: "9:00 AM – 10:30 AM",
      title: "PROBLEM STATEMENT & PROBLEM-SOLVING WORKOUT",
      label: "ANALYZE · IDEATE · PLAN",
      body: "The event opens with the problem statements and a problem-solving workout. Understand the challenge, shape your approach, and plan your build with your team.",
      flow: ["PROBLEM", "IDEA", "APPROACH", "PLAN"],
    },
    {
      id: "d1-2",
      time: "10:30 AM – 11:00 AM",
      title: "SNACKS BREAK",
      label: "PAUSE · REFUEL · RESET",
      body: "A short refreshment break before the building session begins.",
      kind: "break",
    },
    {
      id: "d1-3",
      time: "11:00 AM – 12:00 PM",
      title: "PPT MAKING & APPLICATION BUILDING",
      label: "DESIGN · BUILD · PREPARE",
      body: "Build your prototype and prepare your presentation. Turn the planned approach into a working application and a pitch deck for evaluation.",
      flow: ["ARCHITECTURE", "BUILD", "PPT", "PROTOTYPE"],
    },
    {
      id: "d1-4",
      time: "12:00 PM – 1:00 PM",
      title: "LUNCH BREAK",
      label: "PAUSE · CONNECT · RESET",
      body: "Lunch break as per the official schedule. Be back at your allotted lab by 1:00 PM sharp — Day 1 judging begins immediately after.",
      kind: "break",
    },
    {
      id: "d1-5",
      time: "1:00 PM – 2:45 PM",
      title: "JUDGING & EVALUATION",
      label: "DEMONSTRATE · REVIEW · SCORE",
      body: "Teams present their prototype and pitch to the evaluation panel. Judging determines the ranking and which teams qualify for Day 2.",
      flow: ["DEMO", "PITCH", "REVIEW", "SCORE"],
      kind: "milestone",
    },
    {
      id: "d1-6",
      time: "3:15 PM – 4:00 PM",
      title: "RESULTS & TOP 10 QUALIFICATION",
      label: "RANK · DECLARE · QUALIFY",
      body: "Team-wise results and the ranking outcome are announced, followed by the Top 10 teams qualification and instructions for the qualified teams.",
      flow: ["TEAM RESULTS", "RANKING", "TOP 10 QUALIFY", "INSTRUCTIONS"],
      kind: "milestone",
    },
  ],
};

const DAY_02: Day = {
  tag: "DAY 2",
  date: "",
  window: "9:00 AM – 3:30 PM",
  heading: "PITCH · CELEBRATE · WIN",
  desc: "Venue: Seminar Hall – 1. The qualified Top 10 teams pitch their ideas for final evaluation in the morning, followed by the closing ceremony, prize distribution, and recognition.",
  slots: [
    {
      id: "d2-1",
      time: "9:00 AM – 12:30 PM",
      title: "IDEA PITCHING & FINAL EVALUATION",
      label: "PRESENT · DEMO · EXPLAIN",
      body: "The qualified teams pitch their ideas and demonstrate their solutions to the panel for the final evaluation that decides the winners.",
      flow: ["PROBLEM", "SOLUTION", "TECHNOLOGY", "DEMO", "IMPACT"],
      kind: "milestone",
    },
    {
      id: "d2-2",
      time: "12:30 PM – 1:30 PM",
      title: "LUNCH BREAK",
      label: "PAUSE · CONNECT · RESET",
      body: "Break after the pitching session while the panel completes the final evaluation.",
      kind: "break",
    },
    {
      id: "d2-3",
      time: "2:00 PM – 3:30 PM",
      title: "CLOSING CEREMONY & PRIZE DISTRIBUTION",
      label: "CELEBRATE · AWARD · CLOSE",
      body: "Welcome and opening remarks, address by the HOD, the Principal's speech, final results, prize money and certificate distribution, recognition of winning & finalist teams, vote of thanks, and the group photograph.",
      flow: ["RESULTS", "PRIZES", "CERTIFICATES", "VOTE OF THANKS", "GROUP PHOTO"],
      kind: "milestone",
    },
  ],
};

export default function Schedule() {
  const [active, setActive] = useState<string | null>("d1-4");

  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-[#04050a] text-zinc-300"
    >
      {/* program-board texture: faint horizontal ruling + cool wash */}
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
            "radial-gradient(60% 40% at 0% 0%, rgba(70,90,140,0.10), transparent 55%), radial-gradient(50% 40% at 100% 100%, rgba(220,38,38,0.08), transparent 55%)",
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
          04 / HACKATHON EXPERIENCE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          TWO DAYS.
          <br />
          <span className="text-white/40">ONE CONTINUOUS EXPERIENCE.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base"
        >
          From the opening session to the final evaluation, HackMatrix gives
          teams a focused environment to collaborate, develop, receive guidance,
          and present their work.
        </motion.p>

        {/* ═══ DAY 01 ═══ */}
        <DayPanel day={DAY_01} active={active} setActive={setActive} />

        {/* ═══ JUNCTION ═══ */}
        <Junction />

        {/* ═══ DAY 02 ═══ */}
        <DayPanel day={DAY_02} active={active} setActive={setActive} />

        {/* ═══ CLOSING ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 border-t border-white/10 pt-10 text-center md:mt-28"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-red-400">
            HACKMATRIX 1.0 · EVENT PROGRAM
          </p>
          <p className="mt-3 text-sm text-white/45">
            Two days. One continuous build — from first idea to final
            recognition.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════ DAY PANEL ══════════════════════ */

function DayPanel({
  day,
  active,
  setActive,
}: {
  day: Day;
  active: string | null;
  setActive: (id: string | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
    >
      {/* day header bar */}
      <div className="flex flex-col gap-3 border-b border-white/10 bg-gradient-to-r from-red-500/[0.07] to-transparent px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.3em] text-red-500">
              {day.tag}
            </span>
            {day.date && (
              <>
                <span className="h-3 w-px bg-white/20" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-white/45">
                  {day.date}
                </span>
              </>
            )}
          </div>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            {day.heading}
          </h3>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          {day.window}
        </span>
      </div>

      <p className="max-w-2xl px-5 pt-5 text-sm leading-relaxed text-zinc-400 sm:px-7">
        {day.desc}
      </p>

      {/* slots */}
      <div className="px-2 py-4 sm:px-4">
        {day.slots.map((slot) => (
          <SlotRow
            key={slot.id}
            slot={slot}
            open={active === slot.id}
            onOpen={() => setActive(slot.id)}
            onToggle={() =>
              setActive(active === slot.id ? null : slot.id)
            }
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════ SLOT ROW ══════════════════════ */

function SlotRow({
  slot,
  open,
  onOpen,
  onToggle,
}: {
  slot: Slot;
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const isBreak = slot.kind === "break";
  const isMilestone = slot.kind === "milestone";

  return (
    <div
      onMouseEnter={onOpen}
      onClick={onToggle}
      className={cn(
        "group relative grid cursor-pointer grid-cols-[64px_1fr] gap-3 rounded-xl px-3 py-3 transition-colors sm:grid-cols-[92px_1fr] sm:gap-5 sm:px-4",
        open ? "bg-white/[0.04]" : "hover:bg-white/[0.02]",
      )}
    >
      {/* time (clean column — no rail / nodes) */}
      <div className="flex flex-col items-end pr-3 sm:pr-4">
        <span
          className={cn(
            "font-mono text-[10px] tabular-nums tracking-tight transition-colors sm:text-xs",
            open ? "text-white" : isBreak ? "text-white/30" : "text-white/50",
          )}
        >
          {slot.time}
        </span>
      </div>

      {/* content */}
      <div className="min-w-0 pb-1">
        <div className="flex items-center gap-2">
          {isMilestone && (
            <span className="rounded bg-red-500/15 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.2em] text-red-400">
              KEY
            </span>
          )}
          {isBreak && (
            <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.2em] text-white/35">
              BREAK
            </span>
          )}
          <h4
            className={cn(
              "truncate text-sm font-bold tracking-tight transition-colors sm:text-base",
              open
                ? "text-white"
                : isBreak
                  ? "text-white/45"
                  : "text-white/70 group-hover:text-white",
            )}
          >
            {slot.title}
          </h4>
        </div>

        <p className="mt-1 font-mono text-[9px] tracking-[0.18em] text-white/35 sm:text-[10px]">
          {slot.label}
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-3 max-w-lg text-xs leading-relaxed text-zinc-400 sm:text-sm">
                {slot.body}
              </p>
              {slot.flow && <FlowChain items={slot.flow} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FlowChain({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
      {items.map((t, i) => (
        <React.Fragment key={t}>
          {i > 0 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 + i * 0.08 }}
              className="text-red-500"
            >
              →
            </motion.span>
          )}
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded border border-white/10 bg-black/40 px-2 py-1 font-mono text-[9px] font-bold tracking-[0.15em] text-white/80 sm:text-[10px]"
          >
            {t}
          </motion.span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ══════════════════════ JUNCTION (DAY 01 → DAY 02) ══════════════════════ */

function Junction() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center py-8"
    >
      {/* connecting line down */}
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-6 w-px origin-top bg-gradient-to-b from-red-500/70 to-white/10"
      />

      <div className="flex flex-col items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/[0.06] px-5 py-3 text-center">
        <span className="font-mono text-[10px] tracking-[0.3em] text-red-400">
          DAY 01 COMPLETE
        </span>
        <span className="text-sm font-bold tracking-tight text-white">
          TOP 10 TEAMS QUALIFY
        </span>
      </div>

      <p className="mt-3 max-w-xs text-center text-xs text-white/40">
        Based on the Day 01 judging, the Top 10 teams qualify and advance to the
        final pitching round on Day 02.
      </p>

      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="mt-3 h-6 w-px origin-top bg-gradient-to-b from-white/10 to-red-500/70"
      />
      <span className="text-red-500">▼</span>
    </motion.div>
  );
}
