"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FloatingDock } from "@/components/ui/floating-dock";

const navLinks = [
  {
    title: "Home",
    href: "#home",
    icon: (
      <svg className="h-full w-full text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9.75L12 3l9 6.75V21H15v-6H9v6H3V9.75z" />
      </svg>
    ),
  },
  {
    title: "About",
    href: "#about",
    icon: (
      <svg className="h-full w-full text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
      </svg>
    ),
  },
  {
    title: "Tracks",
    href: "#tracks",
    icon: (
      <svg className="h-full w-full text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Prizes",
    href: "#prizes",
    icon: (
      <svg className="h-full w-full text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3h14M5 3a2 2 0 00-2 2v1a10 10 0 0014 0V5a2 2 0 00-2-2M5 3h14M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Timeline",
    href: "#timeline",
    icon: (
      <svg className="h-full w-full text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "FAQ",
    href: "#faq",
    icon: (
      <svg className="h-full w-full text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
      </svg>
    ),
  },
  {
    title: "Register",
    href: "https://bit.ly/HackMatrix10",
    icon: (
      <svg className="h-full w-full text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/50 border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 bg-black p-1 shadow-lg shadow-red-500/30">
          <img src="/hackmatrix-logo.svg" alt="HackMatrix Logo" className="h-full w-full object-contain" />
        </div>
        <div>
          <p className="font-bold text-white text-sm leading-none tracking-wider">HACKMATRIX</p>
          <p className="text-red-500 font-mono text-xs">1.0</p>
        </div>
      </div>

      {/* Desktop FloatingDock nav */}
      <div className="hidden md:block">
        <FloatingDock
          items={navLinks}
          desktopClassName="bg-black/60 border border-white/10 backdrop-blur-xl dark:bg-black/60 h-12 gap-2"
        />
      </div>

      {/* CTA Button — HoverBorderGradient */}
      <a href="https://bit.ly/HackMatrix10" target="_blank" rel="noopener noreferrer">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="div"
          className="bg-black text-white flex items-center space-x-2 text-sm font-semibold px-5 py-2"
        >
          <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Register Now</span>
        </HoverBorderGradient>
      </a>

      {/* Mobile menu icon */}
      <div className="md:hidden">
        <FloatingDock items={navLinks} mobileClassName="" />
      </div>
    </header>
  );
}
