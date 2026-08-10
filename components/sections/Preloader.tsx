"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { MechanicalKeyboard, keyForChar } from "@/components/ui/mechanical-keyboard";
import { RadialGlowBackground } from "@/components/ui/tailwind-css-background-snippet";
import { cn } from "@/lib/utils";

// Lines that get "typed" on the keyboard, one character at a time.
const LINE_1 = "HACKMATRIX 1.0";
const LINE_2 = "AI&DS | VIIT";
const FULL = `${LINE_1}\n${LINE_2}`;
// Everything from here on ("1.0") renders in the crimson accent.
const BRAND_SPLIT = LINE_1.indexOf(" ") + 1;

// Split a (possibly partial) line into words, keeping each word's absolute
// start index so per-character styling/animation stays stable while typing.
function splitWords(line: string): { word: string; start: number }[] {
  const out: { word: string; start: number }[] = [];
  let start = 0;
  for (const word of line.split(" ")) {
    out.push({ word, start });
    start += word.length + 1; // +1 for the space
  }
  return out;
}

const START_DELAY = 650; // pause before typing begins
const CHAR_MS = 90; // per-character cadence
const NEWLINE_MS = 260; // extra beat on the line break
const PRESS_MS = 75; // how long a key stays depressed
const HOLD_AFTER_MS = 2400; // hold the finished content before completing
const KB_EXIT_DELAY = 420; // beat after the last keystroke before the board leaves

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState("");
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [kbGone, setKbGone] = useState(false);
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

  // Once typing lands, let the board power down and sink away.
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setKbGone(true), KB_EXIT_DELAY);
    return () => clearTimeout(t);
  }, [done]);

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white px-5 py-8 overflow-hidden select-none"
    >
      {/* Themed radial glow background — black core → deep red → crimson */}
      <RadialGlowBackground className="pointer-events-none" />
      {/* Soft crimson bloom behind the content for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.14)_0%,transparent_65%)]" />

      {/* Display screen — the typed / final content */}
      <motion.div
        // as the board recedes, the title settles forward and takes the frame
        animate={kbGone && !reduce ? { y: 34, scale: 1.05 } : { y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative z-10 mb-7 flex min-h-[7rem] w-full max-w-5xl flex-col items-center justify-center text-center sm:min-h-[9rem]"
      >
        {/* ── Brand title ── */}
        <div className="relative" style={{ perspective: "600px" }}>
          <h1
            className="relative font-black leading-[0.95] tracking-[0.1em] text-white sm:tracking-[0.13em]"
            style={{
              fontFamily: "var(--font-flap), ui-monospace, monospace",
              fontSize: "clamp(1.7rem, 8.2vw, 4.75rem)",
              textShadow:
                "0 0 10px rgba(255,255,255,0.28), 0 0 34px rgba(220,38,38,0.62), 0 0 76px rgba(220,38,38,0.4), 0 6px 30px rgba(0,0,0,0.85)",
            }}
          >
            {/* Words render as unbreakable groups, so "1.0" can never split
                across lines — a break may only occur at a real space. */}
            {splitWords(line1).map(({ word, start }, wi) => (
              <React.Fragment key={wi}>
                {wi > 0 && " "}
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((ch, ci) => {
                    const gi = start + ci;
                    return (
                      <motion.span
                        key={gi}
                        initial={
                          reduce
                            ? { opacity: 0 }
                            : { opacity: 0, y: "-0.42em", rotateX: -88, scale: 1.45 }
                        }
                        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        transition={
                          reduce
                            ? { duration: 0.18 }
                            : { type: "spring", stiffness: 460, damping: 22, mass: 0.5 }
                        }
                        className={cn(
                          "inline-block will-change-transform",
                          gi >= BRAND_SPLIT ? "text-red-500" : "text-white",
                        )}
                        style={{ transformOrigin: "50% 100%" }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                </span>
              </React.Fragment>
            ))}
            {showCursor && !typingLine2 && <Caret />}
          </h1>

          {/* light sheen sweeps the title once it lands */}
          {done && !reduce && (
            <motion.span
              aria-hidden
              initial={{ x: "-130%", opacity: 0 }}
              animate={{ x: "130%", opacity: [0, 0.85, 0] }}
              transition={{ duration: 1.15, ease: "easeInOut", delay: 0.12 }}
              className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/55 to-transparent mix-blend-plus-lighter"
            />
          )}
        </div>

        <p
          className="mt-3 font-bold tracking-[0.34em] text-red-400 sm:tracking-[0.4em]"
          style={{
            fontFamily: "var(--font-flap), ui-monospace, monospace",
            fontSize: "clamp(0.85rem, 4vw, 1.5rem)",
            textShadow:
              "0 0 14px rgba(220,38,38,0.7), 0 0 40px rgba(220,38,38,0.35)",
          }}
        >
          {line2.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.3em", scale: 1.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={
                reduce
                  ? { duration: 0.18 }
                  : { type: "spring", stiffness: 480, damping: 24, mass: 0.45 }
              }
              className="inline-block will-change-transform"
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
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
      </motion.div>

      {/* The mechanical keyboard — cinematic 3D camera rig */}
      <div
        className="relative z-10 w-full max-w-3xl"
        style={{ perspective: "1150px", perspectiveOrigin: "50% 34%" }}
      >
        {/* floor bloom — swells as the board lands, then breathes */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 bottom-2 h-24 rounded-[50%] bg-red-600/35 blur-3xl"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={
            kbGone
              ? // one last power surge, then the light dies out
                { opacity: [0.55, 0.95, 0], scaleX: [1, 1.18, 0.45] }
              : reduce
                ? { opacity: 0.5, scaleX: 1 }
                : {
                    opacity: [0, 0.25, 0.85, 0.55],
                    scaleX: [0.4, 0.9, 1.12, 1],
                  }
          }
          transition={
            kbGone
              ? { duration: 1.0, ease: "easeIn", times: [0, 0.2, 1] }
              : { duration: 2.6, ease: [0.16, 1, 0.3, 1], times: [0, 0.5, 0.78, 1] }
          }
        />

        {/* Layer 1 — cinematic swoop: far dolly-in, roll, overshoot, settle */}
        <motion.div
          style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
          initial={
            reduce
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 0.32,
                  rotateX: 64,
                  rotateY: -40,
                  rotateZ: -11,
                  y: 190,
                }
          }
          animate={
            kbGone
              ? // powers down: lifts, tips back flat, then sinks into the dark
                {
                  opacity: [1, 1, 0],
                  scale: [1, 1.04, 0.78],
                  rotateX: [12, 4, 58],
                  rotateY: 0,
                  rotateZ: 0,
                  y: [0, -18, 165],
                }
              : reduce
                ? { opacity: 1, scale: 1, rotateX: 12, rotateY: 0, rotateZ: 0, y: 0 }
                : {
                    opacity: [0, 1, 1, 1, 1],
                    // zoom-out → punch-in past target → ease back → settle
                    scale: [0.32, 0.92, 1.16, 0.98, 1],
                    rotateX: [64, 14, 2, 16, 12],
                    rotateY: [-40, -6, 12, -4, 0],
                    rotateZ: [-11, -3, 3, -1, 0],
                    y: [190, 24, -14, 6, 0],
                  }
          }
          transition={
            kbGone
              ? reduce
                ? { duration: 0.45, ease: "easeIn" }
                : {
                    duration: 1.15,
                    // hangs for a beat, then accelerates away
                    ease: [0.65, 0, 0.85, 0],
                    times: [0, 0.24, 1],
                  }
              : reduce
                ? { duration: 0.4 }
                : {
                    duration: 2.6,
                    ease: [0.16, 1, 0.3, 1],
                    times: [0, 0.42, 0.64, 0.85, 1],
                  }
          }
        >
          {/* Layer 2 — living idle drift + gentle zoom breathing */}
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            initial={{ filter: "blur(0px)" }}
            animate={
              kbGone
                ? // idle drift stops; the board defocuses as it recedes
                  { filter: "blur(11px)", rotateY: 0, rotateX: 0, scale: 1 }
                : reduce
                  ? undefined
                  : {
                      rotateY: [0, 7, 0, -7, 0],
                      rotateX: [0, -2.5, 0, 2.5, 0],
                      scale: [1, 1.03, 1, 1.015, 1],
                    }
            }
            transition={
              kbGone
                ? { duration: 0.95, ease: "easeIn" }
                : {
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.6,
                  }
            }
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
