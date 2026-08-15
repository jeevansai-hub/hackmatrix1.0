"use client";

import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────
   VERSION WATCHER
   Static export + Firebase Hosting has no server to push
   updates, so a tab left open never learns a new deploy landed.
   This polls /version.json (written fresh on every build, never
   cached — see scripts/gen-version.js) and reloads the page the
   moment the deploy stamp changes, so visitors always land on
   the latest build without touching refresh.
   ──────────────────────────────────────────────────────────── */

const POLL_MS = 60_000;

async function fetchVersion(): Promise<string | null> {
  try {
    const res = await fetch(`/version.json?_=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { version?: string };
    return data.version ?? null;
  } catch {
    return null;
  }
}

export default function VersionWatcher() {
  const baseline = useRef<string | null>(null);
  const reloading = useRef(false);
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const current = await fetchVersion();
      if (cancelled || !current || reloading.current) return;

      if (baseline.current === null) {
        baseline.current = current;
        return;
      }

      if (current !== baseline.current) {
        reloading.current = true;
        setUpdateReady(true);
        window.setTimeout(() => window.location.reload(), 1200);
      }
    };

    check();
    const interval = window.setInterval(check, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
    };
  }, []);

  if (!updateReady) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[999] -translate-x-1/2 rounded-full border border-red-500/40 bg-black/90 px-5 py-2.5 font-mono text-xs tracking-[0.15em] text-red-300 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.6)] backdrop-blur-sm">
      NEW VERSION FOUND — UPDATING…
    </div>
  );
}
