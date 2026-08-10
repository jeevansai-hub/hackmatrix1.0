"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
  UserPlus,
  LogIn,
} from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase";
import { cn } from "@/lib/utils";

const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd5HanrWsfYyQty8iWnHXvGu7NeqM2EEjd4x8nwqq0TJcpCGw/viewform";

const AUTHORIZED_ADMIN_EMAIL = "hackmatrixaids@gmail.com";

/** Turn Firebase's error codes into something a human can act on. */
function authMessage(code: string, isSignUp: boolean): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with hackmatrixaids@gmail.com already exists. Please switch to Sign In mode.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect password for hackmatrixaids@gmail.com.";
    case "auth/user-not-found":
      return "No admin account found. Switch to 'Create Account' mode below to register hackmatrixaids@gmail.com.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-disabled":
      return "This admin account has been disabled in Firebase.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your internet connection and try again.";
    case "auth/operation-not-allowed":
    case "auth/configuration-not-found":
      return "Email/Password sign-in is not enabled in Firebase Console. Enable it under Auth → Sign-in method.";
    default:
      return isSignUp ? "Account creation failed. Please try again." : "Sign-in failed. Check your password and try again.";
  }
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  const [email, setEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Restore an existing session on load & enforce admin email restriction.
  useEffect(() => {
    const unsub = onAuthStateChanged(getFirebaseAuth(), (u) => {
      if (u && u.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        signOut(getFirebaseAuth());
        setUser(null);
        setError(`Access denied. Only ${AUTHORIZED_ADMIN_EMAIL} is authorized to access the admin console.`);
      } else {
        setUser(u);
      }
      setChecking(false);
    });
    return unsub;
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccessMsg(null);

      const trimmedEmail = email.trim().toLowerCase();
      if (trimmedEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        setError(`Access Denied: Only ${AUTHORIZED_ADMIN_EMAIL} is authorized for admin access.`);
        return;
      }

      setBusy(true);
      try {
        const auth = getFirebaseAuth();
        await setPersistence(auth, browserLocalPersistence);

        if (isSignUpMode) {
          await createUserWithEmailAndPassword(auth, trimmedEmail, password);
          setSuccessMsg(`Admin account (${AUTHORIZED_ADMIN_EMAIL}) created and signed in successfully!`);
        } else {
          await signInWithEmailAndPassword(auth, trimmedEmail, password);
        }
      } catch (err) {
        const code =
          typeof err === "object" && err && "code" in err
            ? String((err as { code: unknown }).code)
            : "";
        setError(authMessage(code, isSignUpMode));
      } finally {
        setBusy(false);
      }
    },
    [email, password, isSignUpMode],
  );

  const handleLogout = useCallback(async () => {
    await signOut(getFirebaseAuth());
    setEmail(AUTHORIZED_ADMIN_EMAIL);
    setPassword("");
    setError(null);
    setSuccessMsg(null);
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

            <div className="my-5 h-px w-full bg-white/10" />

            {/* Mode switch tabs */}
            <div className="mb-5 grid grid-cols-2 gap-1 rounded-lg border border-white/10 bg-black/40 p-1 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => {
                  setIsSignUpMode(false);
                  setError(null);
                }}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-md py-1.5 font-bold transition-all",
                  !isSignUpMode
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-white/40 hover:text-white",
                )}
              >
                <LogIn className="h-3 w-3" />
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUpMode(true);
                  setError(null);
                }}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-md py-1.5 font-bold transition-all",
                  isSignUpMode
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-white/40 hover:text-white",
                )}
              >
                <UserPlus className="h-3 w-3" />
                Create Account
              </button>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-red-400" strokeWidth={2} />
              <p className="font-mono text-[10px] tracking-[0.2em] text-red-400">
                RESTRICTED: {AUTHORIZED_ADMIN_EMAIL}
              </p>
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">
              {isSignUpMode
                ? "Register a new admin password for hackmatrixaids@gmail.com."
                : "Enter your admin password to access the control panel."}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-white/40"
                >
                  ADMIN EMAIL
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={AUTHORIZED_ADMIN_EMAIL}
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
                    autoComplete={isSignUpMode ? "new-password" : "current-password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2"
                  >
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <p className="text-[12px] leading-snug text-emerald-200">
                      {successMsg}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={busy}
                className={cn(
                  "mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition-all",
                  busy
                    ? "cursor-not-allowed opacity-60"
                    : "hover:bg-red-500 hover:shadow-red-600/50",
                )}
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {busy
                  ? isSignUpMode
                    ? "Creating Account…"
                    : "Verifying…"
                  : isSignUpMode
                  ? "Create Admin Account"
                  : "Sign In"}
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

        {/* quick actions */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
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

        {/* honest note about data wiring */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-white/40" />
            <p className="font-mono text-[10px] tracking-[0.25em] text-white/40">
              DATA SOURCE
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            No Firestore collection is wired to this panel yet — registrations
            currently go through the Google Form, which Firebase can&apos;t read.
            Once submissions are written to Firestore, this console can list and
            filter them here.
          </p>
        </div>
      </div>
    </main>
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
