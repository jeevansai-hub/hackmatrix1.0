"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MechanicalKeyboard, keyForChar } from "@/components/ui/mechanical-keyboard";

// Lines that get "typed" on the keyboard, one character at a time.
const LINE_1 = "HACKMATRIX 1.0";
const LINE_2 = "AI&DS | VIIT";
const FULL = `${LINE_1}\n${LINE_2}`;

const START_DELAY = 650; // pause before typing begins
const CHAR_MS = 90; // per-character cadence
const NEWLINE_MS = 260; // extra beat on the line break
const PRESS_MS = 75; // how long a key stays depressed
const HOLD_AFTER_MS = 2400; // hold the finished content before completing

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [typed, setTyped] = useState("");
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Typing engine — advances one char per tick and strikes the matching key.
  useEffect(() => {
    let i = 0;
    let tickTimer: ReturnType<typeof setTimeout>;
    let pressTimer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (i >= FULL.length) {
        setPressedKeyId(null);
        setDone(true);
        return;
      }
      const ch = FULL[i];
      setTyped(FULL.slice(0, i + 1));

      const keyId = keyForChar(ch);
      if (keyId) {
        setPressedKeyId(keyId);
        pressTimer = setTimeout(
          () => setPressedKeyId((p) => (p === keyId ? null : p)),
          PRESS_MS,
        );
      }

      const delay = ch === "\n" ? NEWLINE_MS : CHAR_MS;
      i++;
      tickTimer = setTimeout(tick, delay);
    };

    tickTimer = setTimeout(tick, START_DELAY);
    return () => {
      clearTimeout(tickTimer);
      clearTimeout(pressTimer);
    };
  }, []);

  // Auto-complete once the content has been revealed.
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => onCompleteRef.current(), HOLD_AFTER_MS);
    return () => clearTimeout(t);
  }, [done]);

  const [line1, line2 = ""] = typed.split("\n");
  const typingLine2 = typed.includes("\n");
  const showCursor = !done;

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white px-5 py-8 overflow-hidden select-none"
    >
      {/* Ambient heist glow + scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.16)_0%,transparent_72%)] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[repeating-linear-gradient(to_bottom,#fff_0,#fff_1px,transparent_1px,transparent_3px)]" />

      {/* Emblem */}
      <motion.div
        initial={{ opacity: 0, y: -18, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-6 h-14 w-14 sm:h-16 sm:w-16 shrink-0"
      >
        <motion.div
          animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-red-600/40 blur-xl"
        />
        <div className="relative h-full w-full rounded-full border-2 border-red-500/40 p-1 bg-black shadow-2xl shadow-red-600/30 flex items-center justify-center">
          <img
            src="/hackmatrix-logo.svg"
            alt="HackMatrix Logo"
            className="h-full w-full object-contain"
          />
        </div>
      </motion.div>

      {/* Display screen — the typed / final content */}
      <div className="relative z-10 mb-7 flex min-h-[7rem] w-full max-w-2xl flex-col items-center justify-center text-center sm:min-h-[8.5rem]">
        <h1
          className="font-black tracking-[0.14em] text-white"
          style={{
            fontFamily: "var(--font-flap), ui-monospace, monospace",
            fontSize: "clamp(1.75rem, 8vw, 3.75rem)",
            textShadow: "0 0 24px rgba(239,68,68,0.45)",
          }}
        >
          {line1}
          {showCursor && !typingLine2 && <Caret />}
        </h1>

        <p
          className="mt-2 font-bold tracking-[0.32em] text-amber-400"
          style={{
            fontFamily: "var(--font-flap), ui-monospace, monospace",
            fontSize: "clamp(0.9rem, 4vw, 1.6rem)",
            textShadow: "0 0 18px rgba(245,158,11,0.4)",
          }}
        >
          {line2}
          {showCursor && typingLine2 && <Caret />}
        </p>

        {/* Date + Venue revealed once typing finishes */}
        <AnimatePresence>
          {done && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-5 flex flex-col items-center"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-red-500/60" />
                <p className="font-mono text-xs font-bold tracking-[0.28em] text-white sm:text-sm">
                  13 &amp; 14 AUGUST 2026
                </p>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-red-500/60" />
              </div>
              <p className="mt-2.5 max-w-md px-2 font-mono text-[10px] leading-relaxed tracking-wide text-white/55 sm:text-xs">
                Aryabhatta Centre for Computing · VIIT Campus, Duvvada,
                Visakhapatnam
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The mechanical keyboard — cinematic 3D camera rig */}
      <div
        className="z-10 w-full max-w-3xl"
        style={{ perspective: "1300px", perspectiveOrigin: "50% 38%" }}
      >
        {/* Layer 1 — combined angle sweep + zoom-out→zoom-in→settle */}
        <motion.div
          style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
          initial={{ opacity: 0, scale: 0.6, rotateX: 36, rotateY: -22, y: 80 }}
          animate={{
            opacity: [0, 1, 1, 1],
            scale: [0.6, 1.1, 0.97, 1],
            rotateX: [36, 5, 17, 12],
            rotateY: [-22, 9, -5, 0],
            y: [80, -8, 5, 0],
          }}
          transition={{
            duration: 2.3,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.55, 0.82, 1],
          }}
        >
          {/* Layer 2 — living idle drift + gentle zoom breathing */}
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, 6, 0, -6, 0], scale: [1, 1.025, 1] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.3,
            }}
          >
            <MechanicalKeyboard pressedKeyId={pressedKeyId} />
          </motion.div>
        </motion.div>
      </div>

      {/* Skip intro */}
      <button
        onClick={() => onCompleteRef.current()}
        className="absolute bottom-6 text-xs font-mono text-white/40 hover:text-red-400 transition-colors uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/10 cursor-pointer z-50"
      >
        Skip Intro →
      </button>
    </motion.div>
  );
}

function Caret() {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      className="ml-0.5 inline-block w-[0.06em] self-stretch align-middle"
      style={{
        borderRight: "0.5ch solid currentColor",
        marginLeft: "0.08em",
      }}
    />
  );
}
