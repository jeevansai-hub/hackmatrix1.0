"use client";
import React from "react";
import { motion } from "motion/react";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const day1Events = [
  { time: "08:30 AM", title: "Registration & Kit Distribution", desc: "Check-in at VIIT Auditorium & collect hackathon ID badges." },
  { time: "09:30 AM", title: "Grand Inauguration", desc: "Opening remarks by Faculty Advisors, HOD AI&DS & Chief Guest." },
  { time: "10:30 AM", title: "Hacking Begins 🚀", desc: "Problem statements released & 24-Hour hackathon countdown starts." },
  { time: "01:00 PM", title: "Networking Lunch", desc: "Buffet lunch provided for all participating team members." },
  { time: "04:00 PM", title: "Mentorship Round 1", desc: "Industry mentors review team architecture & technical approach." },
  { time: "08:00 PM", title: "Dinner & Energy Boost", desc: "Dinner served + coffee & snacks available all night." },
  { time: "11:30 PM", title: "Midnight Cipher Challenge ⚡", desc: "Optional side quest for bonus prizes & swag!" },
];

const day2Events = [
  { time: "07:30 AM", title: "Breakfast & Morning Refresh", desc: "Hot breakfast & coffee served to fuel the home stretch." },
  { time: "10:30 AM", title: "Hacking Concludes 🛑", desc: "Code freeze! All GitHub repositories & pitch decks submitted." },
  { time: "11:30 AM", title: "Jury Evaluation Round", desc: "Teams demo live prototypes & pitch to jury panel." },
  { time: "02:30 PM", title: "Grand Finale & Prize Ceremony 🏆", desc: "Winner announcements, ₹10,000+ prize distribution & closing." },
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-24 px-4 bg-transparent overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500/60 mb-4 font-mono"
          >
            2-Day Schedule
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black text-white"
          >
            Event <SquigglyText scale={[5, 8]} className="text-red-500">Timeline</SquigglyText>
          </motion.h2>
        </div>

        {/* ── SVG Mask Effect Container for Interactive Timeline Reveal ── */}
        <div className="mb-16">
          <MaskContainer
            revealSize={500}
            className="min-h-[22rem] bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border-red-500/30"
            revealText={
              <div className="text-center max-w-3xl">
                <span className="text-xs font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                  Hover / Touch Card to Reveal Details
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-3">
                  13th &amp; 14th August 2026
                </h3>
                <p className="text-base sm:text-lg text-white/70">
                  2 Days · 24+ Hours Non-Stop Coding · Mentorship · Food &amp; ₹10,000+ Prizes
                </p>
              </div>
            }
          >
            <div className="text-center">
              <p className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-400">
                Move Cursor to Reveal Event Timeline
              </p>
              <p className="text-sm font-mono text-white/50 mt-3">
                Dept. of AI &amp; DS · VIIT Duvvada Campus
              </p>
            </div>
          </MaskContainer>
        </div>

        {/* Schedule Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Day 1 Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-white/10 p-2 bg-black/60 backdrop-blur-xl"
          >
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-red-400 uppercase tracking-widest">Day 1</span>
                  <h3 className="text-2xl font-black text-white">Thursday, 13 Aug 2026</h3>
                </div>
                <span className="text-xs font-mono text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                  Hacking Launch
                </span>
              </div>

              <div className="space-y-5">
                {day1Events.map((ev, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/20 flex-shrink-0 mt-0.5">
                      {ev.time}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                        {ev.title}
                      </h4>
                      <p className="text-xs text-white/60 mt-0.5 leading-relaxed">{ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Day 2 Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-white/10 p-2 bg-black/60 backdrop-blur-xl"
          >
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-red-400 uppercase tracking-widest">Day 2</span>
                  <h3 className="text-2xl font-black text-white">Friday, 14 Aug 2026</h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Grand Finale
                </span>
              </div>

              <div className="space-y-5">
                {day2Events.map((ev, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 flex-shrink-0 mt-0.5">
                      {ev.time}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {ev.title}
                      </h4>
                      <p className="text-xs text-white/60 mt-0.5 leading-relaxed">{ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
