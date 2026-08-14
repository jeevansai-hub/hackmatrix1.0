"use client";
import React, { useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { MoneyShower } from "@/components/ui/money-rain";
import { motion } from "motion/react";
import { Cpu, Cloud, ShieldCheck, Bot, Trophy } from "lucide-react";

const TRACKS = [
  { domain: "AI / ML", Icon: Cpu },
  { domain: "Cloud Computing", Icon: Cloud },
  { domain: "Cybersecurity", Icon: ShieldCheck },
  { domain: "Robotics", Icon: Bot },
];

export default function Prizes() {
  const [moneyTrigger, setMoneyTrigger] = useState(0);

  const throwMoney = () => {
    setMoneyTrigger((prev) => prev + 1);
  };

  return (
    <section id="prizes" className="relative py-28 px-4 bg-transparent overflow-hidden min-h-[80vh] flex flex-col justify-center">
      {/* ── 3D Full-Screen Money Shower ── */}
      <MoneyShower trigger={moneyTrigger} />

      {/* Cyber Grid Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Ambient Red Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Section Header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.4em] text-red-500/60 mb-3"
        >
          Rewards &amp; Glory
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-black text-white"
        >
          Prize <span className="text-red-500">Pool</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-white/50 max-w-xl mx-auto text-base sm:text-lg"
        >
          Compete across AI/ML, Cloud, Cybersecurity &amp; Robotics tracks to win cash rewards, trophies, and exciting prizes!
        </motion.p>

        {/* ── Main Showcase 3D Card ── */}
        <div className="mt-12 flex justify-center w-full">
          <CardContainer className="w-full max-w-2xl" containerClassName="py-0 w-full">
            <CardBody
              onMouseEnter={throwMoney}
              className="relative group/card w-full h-auto rounded-3xl border border-red-500/30 bg-gradient-to-b from-black/90 via-zinc-950/95 to-black/90 backdrop-blur-xl p-8 sm:p-10 text-center shadow-2xl dark:hover:shadow-red-600/[0.25] transition-all duration-300"
            >
              <CardItem
                translateZ="40"
                className="w-full flex items-center justify-between"
              >
                <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-mono font-semibold text-red-400">
                  HACKMATRIX 1.0
                </span>
                <motion.span
                  animate={{ rotate: [0, -8, 8, -8, 0], y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 shadow-lg shadow-yellow-500/10"
                >
                  <Trophy className="h-6 w-6" strokeWidth={1.75} />
                </motion.span>
              </CardItem>

              <CardItem
                translateZ="70"
                className="w-full mt-4 text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-200 to-red-500"
              >
                ₹10,000+
              </CardItem>

              <CardItem
                translateZ="50"
                as="p"
                className="text-base sm:text-xl text-white/90 font-medium mt-2"
              >
                Total Cash Prize Pool &amp; Exclusive Awards
              </CardItem>

              <CardItem
                translateZ="40"
                as="p"
                className="text-sm text-white/60 max-w-md mx-auto mt-2"
              >
                Cash prizes, winner trophies, certificates, exclusive swag kits &amp; mentorship opportunities for top innovators.
              </CardItem>

              <CardItem
                translateZ="80"
                className="mt-8 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3"
              >
                {TRACKS.map((item, i) => (
                  <motion.div
                    key={item.domain}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-colors hover:border-red-500/40 hover:bg-red-500/[0.06] sm:p-4"
                  >
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 2.4 + i * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 transition-colors group-hover:text-red-300 sm:h-11 sm:w-11"
                    >
                      <item.Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                    </motion.span>
                    <span className="text-[11px] font-semibold leading-tight text-white/80 sm:text-xs">
                      {item.domain}
                    </span>
                  </motion.div>
                ))}
              </CardItem>

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
                <CardItem
                  translateZ={30}
                  as="a"
                  href="#home"
                  className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  Winners →
                </CardItem>
                <CardItem
                  translateZ={50}
                  as="button"
                  onClick={throwMoney}
                  className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/40 transition-all cursor-pointer"
                >
                  Throw Cash
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
}
