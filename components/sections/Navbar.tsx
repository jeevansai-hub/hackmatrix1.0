"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Info,
  Layers,
  Trophy,
  Clock,
  ClipboardList,
  HelpCircle,
  FileText,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { title: "Home", href: "#home", id: "home", icon: Home },
  { title: "About", href: "#about", id: "about", icon: Info },
  { title: "Tracks", href: "#tracks", id: "tracks", icon: Layers },
  { title: "Problems", href: "#problems", id: "problems", icon: FileText },
  { title: "Prizes", href: "#prizes", id: "prizes", icon: Trophy },
  { title: "Timeline", href: "#timeline", id: "timeline", icon: Clock },
  { title: "Rules", href: "#essentials", id: "essentials", icon: ClipboardList },
  { title: "FAQ", href: "#faq", id: "faq", icon: HelpCircle },
];

// Announcements shown in the header bell. Edit freely — order is newest-first.
const ANNOUNCEMENTS = [
  {
    title: "Report by 8:45 AM sharp",
    desc: "Reach the venue for slot allocation. Carry your ID card — mandatory.",
    tag: "REPORTING",
    href: "#essentials",
  },
  {
    title: "Lab allotments are out",
    desc: "AI&DS labs: Mark, Dennis, Tim, Edgar, Larry & AB-05.",
    tag: "VENUE",
    href: "#essentials",
  },
  {
    title: "Dress code: Non-Uniform",
    desc: "Come as you build — full rules & instructions inside.",
    tag: "RULES",
    href: "#essentials",
  },
  {
    title: "Winners announced 🏆",
    desc: "Team Toffan takes 1st place — see the full podium on the home page.",
    tag: "NEW",
    href: "#home",
  },
  {
    title: "₹10,000+ prize pool live",
    desc: "Cash prizes, trophies & swag across every track.",
    tag: "PRIZES",
    href: "#prizes",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [seen, setSeen] = useState(false);

  // Condense the bar on scroll + highlight the section under a probe line.
  // Scroll-driven (rather than a thin-band IntersectionObserver) so the active
  // link never goes stale between sections.
  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      // Probe line sits ~35% down the viewport.
      const probe = window.innerHeight * 0.35;
      let current = NAV_LINKS[0].id;

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        // Viewport-relative top — correct regardless of positioned ancestors.
        const top = el.getBoundingClientRect().top;
        // Last section whose top has passed the probe line wins.
        if (top <= probe) current = link.id;
      }

      // Pin the final link once the page is scrolled to the bottom.
      const atBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = NAV_LINKS[NAV_LINKS.length - 1].id;

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = useCallback((id: string) => {
    setActive(id);
    setOpen(false);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
        <motion.nav
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border transition-all duration-300",
            scrolled
              ? "border-white/10 bg-black/70 px-3 py-2 shadow-[0_8px_32px_-12px_rgba(220,38,38,0.45)] backdrop-blur-xl sm:px-4"
              : "border-white/5 bg-black/30 px-3 py-2.5 backdrop-blur-md sm:px-5 sm:py-3",
          )}
        >
          {/* ── Brand ── */}
          <a href="#home" className="group flex shrink-0 items-center gap-2.5">
            <span
              className={cn(
                "relative flex items-center justify-center rounded-full border border-red-500/40 bg-black p-1 shadow-lg shadow-red-600/30 transition-all duration-300",
                scrolled ? "h-8 w-8" : "h-9 w-9",
              )}
            >
              <img
                src="/hackmatrix-mark.png"
                alt="HackMatrix"
                decoding="async"
                className="h-full w-full object-contain"
              />
              <span className="absolute inset-0 rounded-full bg-red-600/25 blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[13px] font-black tracking-[0.16em] text-white sm:text-sm">
                HACK<span className="text-red-500">MATRIX</span>
              </span>
              <span className="mt-0.5 font-mono text-[9px] tracking-[0.3em] text-white/40">
                1.0 · VIIT
              </span>
            </span>
          </a>

          {/* ── Desktop links ── */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative">
                  <a
                    href={link.href}
                    onClick={() => handleNavClick(link.id)}
                    className={cn(
                      "relative z-10 block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200",
                      isActive
                        ? "text-white"
                        : "text-white/55 hover:text-white",
                    )}
                  >
                    {link.title}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full border border-red-500/30 bg-red-500/10 shadow-[0_0_18px_-4px_rgba(220,38,38,0.8)_inset]"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* ── Actions ── */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Announcements bell — compact, both desktop & mobile */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setSeen(true);
                  setOpen(false);
                }}
                aria-label="Announcements"
                aria-expanded={notifOpen}
                className={cn(
                  "relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                  notifOpen
                    ? "border-red-500/50 bg-red-500/15 text-red-400"
                    : "border-white/10 bg-white/5 text-white hover:border-red-500/40 hover:text-red-400",
                )}
              >
                <Bell className="h-4 w-4" strokeWidth={2} />
                {!seen && (
                  <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-black" />
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <>
                    {/* click-away backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setNotifOpen(false)}
                    />
                    <motion.div
                      key="notif-panel"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="fixed right-3 top-[4.75rem] z-50 w-[15rem] max-w-[calc(100vw-1.5rem)] origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-[0_24px_60px_-20px_rgba(220,38,38,0.5)] backdrop-blur-2xl sm:absolute sm:right-0 sm:top-[calc(100%+0.7rem)] sm:w-80"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
                        <span className="flex min-w-0 items-center gap-2 text-sm font-bold text-white">
                          <Bell className="h-4 w-4 shrink-0 text-red-400" />
                          <span className="truncate">Announcements</span>
                        </span>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="rounded-full bg-red-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-red-400">
                            {ANNOUNCEMENTS.length} NEW
                          </span>
                          <button
                            onClick={() => setNotifOpen(false)}
                            aria-label="Close announcements"
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-400"
                          >
                            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                      <ul className="max-h-[60vh] overflow-y-auto p-1.5">
                        {ANNOUNCEMENTS.map((a) => {
                          const external = !a.href.startsWith("#");
                          return (
                            <li key={a.title}>
                              <a
                                href={a.href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                onClick={() => setNotifOpen(false)}
                                className="group flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.9)]" />
                                <span className="flex min-w-0 flex-1 flex-col">
                                  <span className="flex items-center gap-2">
                                    <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white">
                                      {a.title}
                                    </span>
                                    <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-white/50">
                                      {a.tag}
                                    </span>
                                  </span>
                                  <span className="mt-0.5 text-[11px] leading-snug text-white/50">
                                    {a.desc}
                                  </span>
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => {
                setOpen((v) => !v);
                setNotifOpen(false);
              }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-red-500/40 hover:text-red-400 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-4.5 w-4.5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-4.5 w-4.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ── Mobile sheet ── */}
      {/* Direct children of AnimatePresence (no Fragment) so exits are tracked */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}
        {open && (
          <motion.div
              key="sheet"
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 top-[4.75rem] z-50 overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-2.5 shadow-[0_24px_60px_-20px_rgba(220,38,38,0.5)] backdrop-blur-2xl sm:inset-x-5 lg:hidden"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = active === link.id;
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.25 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => handleNavClick(link.id)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-red-500/10 text-white"
                            : "text-white/65 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-xl border transition-colors",
                            isActive
                              ? "border-red-500/40 bg-red-500/15 text-red-400"
                              : "border-white/10 bg-white/5 text-white/50",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        {link.title}
                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.9)]" />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

