"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Step 1: TextFlippingBoard flips in ~1.0s, then HOLDS FOR 4.0 SECONDS to read (Total 5.2s)
    const t1 = setTimeout(() => {
      setStep(2);
    }, 5200);

    // Step 2: EncryptedText decrypts in ~1.2s, then HOLDS FOR 4.0 SECONDS to read (Total +5.2s = 10.4s)
    const t2 = setTimeout(() => {
      setStep(3);
    }, 10400);

    // Step 3: TypewriterEffectSmooth types in ~1.4s, then HOLDS FOR 4.0 SECONDS to read (Total +5.4s = 15.8s) -> complete
    const t3 = setTimeout(() => {
      onCompleteRef.current();
    }, 15800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const typewriterWords = [
    { text: "Welcome" },
    { text: "to" },
    { text: "Matrix", className: "text-red-500 font-black" },
    { text: "Hacks", className: "text-red-400 font-bold" },
    { text: "1.0!", className: "text-yellow-400 font-extrabold" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white p-6 overflow-hidden select-none"
      >
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15)_0%,transparent_75%)] pointer-events-none" />

        {/* Top Dali Mask Emblem Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-red-500/40 p-1 bg-black shadow-2xl shadow-red-600/30 flex items-center justify-center"
        >
          <img
            src="/hackmatrix-logo.svg"
            alt="HackMatrix Logo"
            className="h-full w-full object-contain"
          />
        </motion.div>

        {/* Step 1: TextFlippingBoard (Fast flip in 1s, holds 4 SECONDS) */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl text-center flex flex-col items-center"
          >
            <TextFlippingBoard
              text={"HACKMATRIX 1.0 \nBELLA CIAO \nJOIN THE HEIST"}
              duration={1.0}
            />
            <p className="mt-6 font-mono text-xs text-red-500/60 uppercase tracking-widest animate-pulse">
              Initializing Heist Protocol...
            </p>
          </motion.div>
        )}

        {/* Step 2: EncryptedText (Fast decrypt in 1.2s, holds 4 SECONDS) */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl text-center font-mono text-lg sm:text-2xl px-4 py-8 rounded-2xl bg-zinc-950/80 border border-red-500/30 shadow-2xl"
          >
            <EncryptedText
              text="Welcome to the Matrix. Powered by Dept. of AI & DS."
              encryptedClassName="text-red-600/40"
              revealedClassName="text-white font-bold"
              revealDelayMs={30}
            />
          </motion.div>
        )}

        {/* Step 3: TypewriterEffectSmooth (Smooth type in 1.4s, holds 4 SECONDS) */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <p className="text-xs uppercase tracking-widest font-mono text-white/50 mb-2">
              VIIT Visakhapatnam · 13th &amp; 14th August 2026
            </p>
            <TypewriterEffectSmooth words={typewriterWords} />
          </motion.div>
        )}

        {/* Skip intro button */}
        <button
          onClick={() => onCompleteRef.current()}
          className="absolute bottom-8 text-xs font-mono text-white/40 hover:text-red-400 transition-colors uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/10 cursor-pointer z-50"
        >
          Skip Intro →
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
