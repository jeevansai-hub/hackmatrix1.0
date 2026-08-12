"use client";

import React, { useEffect, useRef, useState } from "react";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

/* ────────────────────────────────────────────────────────────
   DEVELOPER CREDIT — one-shot vaporize
   Shows "Developed by M. Jeevan Sai & L. Prasanth" a single time
   when the footer scrolls into view, then vaporizes away and is
   removed for good. A sessionStorage flag guarantees it plays at
   most once per browser session. Theme-matched: red on black.
   ──────────────────────────────────────────────────────────── */

const STORAGE_KEY = "hm_dev_credit_shown";

type Phase = "idle" | "playing" | "fading" | "done";

export default function DeveloperCredit() {
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  const [allowed, setAllowed] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");

  // Only ever run once per session.
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setAllowed(true);
    } catch {
      setAllowed(true);
    }
  }, []);

  // Start a single vaporize pass when the credit enters view, then vanish.
  useEffect(() => {
    if (!allowed) return;
    const el = ref.current;
    if (!el) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        setPhase("playing");
        // Fade the wrapper out just as the vaporize completes (~2s),
        // masking the effect's internal fade-in so it never reappears.
        timers.push(setTimeout(() => setPhase("fading"), 2700));
        timers.push(
          setTimeout(() => {
            try {
              sessionStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* ignore */
            }
            setPhase("done");
          }, 3500),
        );
        observer.disconnect();
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [allowed]);

  // Once finished (or disallowed), render nothing — totally gone.
  if (!allowed || phase === "done") return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none mx-auto h-6 w-full max-w-[20rem] transition-opacity duration-700 ease-out"
      style={{ opacity: phase === "fading" ? 0 : 1 }}
    >
      {phase === "playing" || phase === "fading" ? (
        <VaporizeTextCycle
          texts={["Developed by M. Jeevan Sai & L. Prasanth"]}
          font={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
          }}
          color="rgb(248, 113, 113)"
          spread={3}
          density={6}
          animation={{
            vaporizeDuration: 3,
            fadeInDuration: 8,
            waitDuration: 6,
          }}
          direction="left-to-right"
          alignment="center"
          tag={Tag.P}
        />
      ) : null}
    </div>
  );
}
