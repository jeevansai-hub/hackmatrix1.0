"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface HeistVaultCountdownProps {
  targetDate: string;
  className?: string;
}

const DigitFlap = ({ value, label, isUrgentStrobe }: { value: number; label: string; isUrgentStrobe?: boolean }) => {
  const [prevVal, setPrevVal] = useState(value);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (value !== prevVal) {
      setIsGlitching(true);
      const t = setTimeout(() => setIsGlitching(false), 80);
      setPrevVal(value);
      return () => clearTimeout(t);
    }
  }, [value, prevVal]);

  const formattedStr = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative h-16 w-14 sm:h-20 sm:w-16 rounded-xl bg-black border border-[#c41e3a]/40 shadow-xl overflow-hidden flex items-center justify-center perspective-dramatic",
          isUrgentStrobe && "animate-pulse border-red-500 shadow-red-600/60"
        )}
      >
        {/* Hinge Line */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#c41e3a]/40 z-30 pointer-events-none" />

        {/* RGB Glitch Overlay */}
        {isGlitching && (
          <div className="absolute inset-0 z-40 bg-[#c41e3a]/20 mix-blend-color-dodge pointer-events-none animate-ping" />
        )}

        {/* Flip Digit Container */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formattedStr}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={cn(
              "font-mono text-2xl sm:text-4xl font-black text-white tracking-widest drop-shadow-md select-none",
              isGlitching && "text-red-400 translate-x-[1px]"
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {formattedStr}
          </motion.span>
        </AnimatePresence>

        {/* Top/Bottom gradient shading */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      <span className="text-[10px] font-mono text-[#c41e3a] uppercase tracking-widest mt-2 font-bold">
        {label}
      </span>
    </div>
  );
};

export function HeistVaultCountdown({ targetDate, className }: HeistVaultCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [totalSeconds, setTotalSeconds] = useState(10000);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      const secs = Math.floor(diff / 1000);
      setTotalSeconds(secs);

      setTimeLeft({
        days: Math.floor(secs / (3600 * 24)),
        hours: Math.floor((secs % (3600 * 24)) / 3600),
        minutes: Math.floor((secs % 3600) / 60),
        seconds: secs % 60,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isUnder60Mins = totalSeconds < 3600;
  const isUnder5Mins = totalSeconds < 300;

  return (
    <div className={cn("relative flex items-center justify-center p-6", className)}>
      {/* ── Rotating Vault Lock Ring Background ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 m-auto h-48 w-48 sm:h-56 sm:w-56 rounded-full border border-dashed border-[#c41e3a]/20 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 m-auto h-56 w-56 sm:h-64 sm:w-64 rounded-full border border-[#c41e3a]/15 pointer-events-none"
      />

      {/* ── Main Panel with Ambient Silent Alarm Red Pulse ── */}
      <motion.div
        animate={{
          boxShadow: isUnder60Mins
            ? [
                "0 0 10px rgba(196,30,58,0.3)",
                "0 0 35px rgba(220,38,38,0.8)",
                "0 0 10px rgba(196,30,58,0.3)",
              ]
            : [
                "0 0 5px rgba(196,30,58,0.15)",
                "0 0 20px rgba(196,30,58,0.4)",
                "0 0 5px rgba(196,30,58,0.15)",
              ],
        }}
        transition={{
          duration: isUnder60Mins ? 0.8 : 2.0,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 flex items-center gap-2 sm:gap-4 rounded-2xl bg-black/90 border border-[#c41e3a]/50 p-4 sm:p-6 backdrop-blur-xl"
      >
        {/* DAYS */}
        <DigitFlap value={timeLeft.days} label="Days" />

        {/* COLON */}
        <span className="text-xl sm:text-2xl font-black text-[#c41e3a] animate-pulse -mt-4">:</span>

        {/* HOURS */}
        <DigitFlap value={timeLeft.hours} label="Hours" />

        {/* COLON */}
        <span className="text-xl sm:text-2xl font-black text-[#c41e3a] animate-pulse -mt-4">:</span>

        {/* MINS */}
        <DigitFlap value={timeLeft.minutes} label="Mins" />

        {/* COLON */}
        <span className="text-xl sm:text-2xl font-black text-[#c41e3a] animate-pulse -mt-4">:</span>

        {/* SECS */}
        <DigitFlap value={timeLeft.seconds} label="Secs" isUrgentStrobe={isUnder5Mins} />
      </motion.div>
    </div>
  );
}
