"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  type User,
} from "firebase/auth";
import {
  ShieldCheck,
  LogOut,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  ExternalLink,
  FileText,
  Users,
  Database,
} from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { triggerCelebrationConfetti } from "@/lib/confetti";
import {
  getInitialProblemStatus,
  subscribeProblemStatus,
  updateProblemStatus,
} from "@/lib/problem-status";

const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd5HanrWsfYyQty8iWnHXvGu7NeqM2EEjd4x8nwqq0TJcpCGw/viewform";

/** Turn Firebase's error codes into something a human can act on. */
function authMessage(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/invalid-email":
      return "That email address isn't valid.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/operation-not-allowed":
    case "auth/configuration-not-found":
      return "Email/Password sign-in is not enabled for this Firebase project yet.";
    default:
      return "Sign-in failed. Please try again.";
  }
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore an existing session on load.
  useEffect(() => {
    const unsub = onAuthStateChanged(getFirebaseAuth(), (u) => {
      setUser(u);
      setChecking(false);
    });
    return unsub;
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setBusy(true);
      try {
        const auth = getFirebaseAuth();
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } catch (err) {
        const code =
          typeof err === "object" && err && "code" in err
            ? String((err as { code: unknown }).code)
            : "";
        setError(authMessage(code));
      } finally {
        setBusy(false);
      }
    },
    [email, password],
  );

  const handleLogout = useCallback(async () => {
    await signOut(getFirebaseAuth());
    setEmail("");
    setPassword("");
  }, []);

  /* ─────────────── verifying an existing session ─────────────── */
  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050507]">
        <Loader2 className="h-6 w-6 animate-spin text-red-500" />
      </main>
    );
  }

  /* ─────────────── locked ─────────────── */
  if (!user) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-5 py-12">
        {/* same blueprint surface as the site */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(120,130,150,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(120,130,150,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, #000 45%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 40% at 50% 0%, rgba(220,38,38,0.12), transparent 60%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent p-6 backdrop-blur-sm sm:p-7">
            {/* mark */}
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 bg-black p-1">
                <img
                  src="/hackmatrix-mark.png"
                  alt="HackMatrix"
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <p className="text-sm font-black tracking-[0.14em] text-white">
                  HACK<span className="text-red-500">MATRIX</span>
                </p>
                <p className="mt-0.5 font-mono text-[9px] tracking-[0.3em] text-white/40">
                  ADMIN CONSOLE
                </p>
              </div>
            </div>

            <div className="my-6 h-px w-full bg-white/10" />

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-red-400" strokeWidth={2} />
              <p className="font-mono text-[10px] tracking-[0.25em] text-red-400">
                RESTRICTED ACCESS
              </p>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-white/45">
              Authorised personnel only. Sign in with your organiser account.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-3">
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-white/40"
                >
                  EMAIL
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full rounded-lg border border-white/12 bg-black/50 px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-red-500/60"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-white/40"
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full rounded-lg border border-white/12 bg-black/50 px-3 py-2.5 pr-10 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-red-500/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/35 transition-colors hover:text-white/70"
                  >
                    {showPw ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                    <p className="text-[12px] leading-snug text-red-200">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={busy}
                className={cn(
                  "mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition-all",
                  busy
                    ? "cursor-not-allowed opacity-60"
                    : "hover:bg-red-500 hover:shadow-red-600/50",
                )}
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {busy ? "Verifying…" : "Sign In"}
              </button>
            </form>
          </div>

          <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-white/25">
            HACKMATRIX 1.0 · VIIT
          </p>
        </motion.div>
      </main>
    );
  }

  /* ─────────────── unlocked ─────────────── */
  return (
    <main className="min-h-screen bg-[#050507] text-zinc-300">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,130,150,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,130,150,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      {/* top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050507]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-black p-1">
              <img
                src="/hackmatrix-mark.png"
                alt="HackMatrix"
                className="h-full w-full object-contain"
              />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-black tracking-[0.14em] text-white">
                HACK<span className="text-red-500">MATRIX</span>
              </p>
              <p className="mt-0.5 truncate font-mono text-[9px] tracking-[0.28em] text-white/40">
                ADMIN CONSOLE
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-red-500/40 hover:text-red-300"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {/* session */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[10px] tracking-[0.35em] text-white/35">
            SESSION ACTIVE
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            Welcome back.
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/50">
            Signed in as
            <span className="font-mono text-[13px] text-red-300">
              {user.email}
            </span>
          </p>
        </motion.div>

        {/* ═══ PROBLEM STATEMENTS RELEASE CONTROL ═══ */}
        <ProblemStatusControlCard />

        {/* quick actions */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <AdminCard
            icon={<Users className="h-4 w-4" />}
            label="REGISTRATIONS"
            title="Google Form responses"
            body="Team submissions are collected in the registration form. Open it to review responses."
            href={REGISTER_URL}
            external
          />
          <AdminCard
            icon={<FileText className="h-4 w-4" />}
            label="DOCUMENT"
            title="Problem statements"
            body="The official problem statement PDF served to participants."
            href="/hackmatrix-problem-statements.pdf"
            external
          />
        </div>

        {/* data wiring note */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-white/40" />
            <p className="font-mono text-[10px] tracking-[0.25em] text-white/40">
              DATA SOURCE
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Problem statements status is synced live between the Admin Console and the main landing page via Firestore and local storage.
          </p>
        </div>
      </div>
    </main>
  );
}

function ProblemStatusControlCard() {
  const [psLaunched, setPsLaunched] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setPsLaunched(getInitialProblemStatus());
    const unsub = subscribeProblemStatus((launched) => {
      setPsLaunched(launched);
    });
    return unsub;
  }, []);

  const handleToggle = async (targetState: boolean) => {
    setUpdating(true);
    await updateProblemStatus(targetState);
    setPsLaunched(targetState);
    setUpdating(false);

    if (targetState) {
      triggerCelebrationConfetti();
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 backdrop-blur-sm sm:p-7">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-red-400" />
          <p className="font-mono text-xs font-bold tracking-[0.25em] text-red-400">
            PROBLEM STATEMENTS RELEASE CONTROL
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
          {psLaunched ? (
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              LAUNCHED & AVAILABLE
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              REVOKED & HIDDEN
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h3 className="text-lg font-black text-white">
            {psLaunched ? "Problem Statements are LIVE on Landing Page" : "Problem Statements are HIDDEN on Landing Page"}
          </h3>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-zinc-400">
            {psLaunched
              ? "Participants can currently preview the 8 problem statements and download the official PDF on the main landing page."
              : "Problem statements are hidden and locked on the main landing page. Click 'Launch Problem Statements' to make them public!"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!psLaunched ? (
            <button
              onClick={() => handleToggle(true)}
              disabled={updating}
              className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-900/50 transition-all hover:bg-emerald-500 hover:shadow-emerald-600/50 disabled:opacity-50 cursor-pointer"
            >
              🚀 LAUNCH PROBLEM STATEMENTS
            </button>
          ) : (
            <button
              onClick={() => handleToggle(false)}
              disabled={updating}
              className="flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/15 px-6 py-3 text-xs font-bold text-red-300 transition-all hover:bg-red-500 hover:text-white disabled:opacity-50 cursor-pointer"
            >
              🔒 REVOKE / HIDE PROBLEM STATEMENTS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════ CARD ══════════════════════ */

function AdminCard({
  icon,
  label,
  title,
  body,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-5 transition-all duration-300 hover:border-red-500/35 hover:shadow-[0_16px_44px_-24px_rgba(220,38,38,0.7)]"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-red-400">
          {icon}
          {label}
        </span>
        <ExternalLink className="h-3.5 w-3.5 text-white/25 transition-colors group-hover:text-red-400" />
      </div>
      <p className="mt-3 text-base font-bold text-white">{title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">{body}</p>
    </a>
  );
}
