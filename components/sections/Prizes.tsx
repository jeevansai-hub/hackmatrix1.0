"use client";
import React, { useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { MoneyShower } from "@/components/ui/money-rain";
import { motion } from "motion/react";

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

        {/* Throw Money Interactive Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex justify-center items-center gap-3"
        >
          <button
            onClick={throwMoney}
            className="group relative inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-6 py-2.5 text-sm font-bold text-yellow-300 shadow-lg shadow-yellow-500/10 backdrop-blur-md transition-all hover:scale-105 hover:bg-yellow-500/20 active:scale-95 cursor-pointer z-30"
          >
            <span className="text-lg animate-bounce">💸</span>
            <span>Make It Rain Money! (Click to Throw 💰)</span>
            <span className="text-xs bg-yellow-400/20 rounded-full px-2 py-0.5 text-yellow-200 font-mono">
              ₹10,000+
            </span>
          </button>
        </motion.div>

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
                <span className="text-3xl">🏆</span>
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
                className="w-full mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {[
                  { domain: "AI / ML", icon: "🤖" },
                  { domain: "Cloud Computing", icon: "☁️" },
                  { domain: "Cybersecurity", icon: "🔐" },
                  { domain: "Robotics", icon: "🦾" },
                ].map((item) => (
                  <div
                    key={item.domain}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                  >
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs font-semibold text-white/80">{item.domain}</div>
                  </div>
                ))}
              </CardItem>

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
                <CardItem
                  translateZ={30}
                  as="a"
                  href="https://bit.ly/HackMatrix10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  bit.ly/HackMatrix10 →
                </CardItem>
                <CardItem
                  translateZ={50}
                  as="button"
                  onClick={throwMoney}
                  className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/40 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Throw Cash</span>
                  <span>💸</span>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
}
