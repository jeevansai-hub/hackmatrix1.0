"use client";
import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { SparklesCore } from "@/components/ui/sparkles";
import { SquigglyText } from "@/components/ui/squiggly-text";
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

const socialLinks = [
  {
    name: "Register",
    url: "https://bit.ly/HackMatrix10",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    label: "bit.ly/HackMatrix10",
    color: "text-red-400 hover:text-red-300",
    border: "border-red-500/20 hover:border-red-500/40",
  },
  {
    name: "Email",
    url: "mailto:aidsvjit@gmail.com",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Contact Us",
    color: "text-blue-400 hover:text-blue-300",
    border: "border-blue-500/20 hover:border-blue-500/40",
  },
  {
    name: "College",
    url: "https://www.vignaniit.edu.in/",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    label: "VIIT Website",
    color: "text-purple-400 hover:text-purple-300",
    border: "border-purple-500/20 hover:border-purple-500/40",
  },
];

export default function SocialFooter() {
  return (
    <footer id="contact" className="relative bg-[#030303] border-t border-white/5 overflow-hidden py-16">
      {/* ── WorldMap Background (For Contact Section Only) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35 overflow-hidden flex items-center justify-center">
        <WorldMap className="max-w-7xl mx-auto" />
      </div>

      <div className="relative z-10">
        {/* Large VIIT Text with TextHoverEffect */}
        <div className="h-[16rem] flex flex-col items-center justify-center relative">
          <TextHoverEffect text="VIIT" />

          {/* SparklesCore Preview under VIIT Text */}
          <div className="w-[36rem] max-w-full h-32 relative -mt-16 pointer-events-none">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-[4px] w-1/4 blur-sm" />
            <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px w-1/4" />

            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={800}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            <div className="absolute inset-0 w-full h-full bg-[#030303] [mask-image:radial-gradient(300px_150px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>

        {/* Social links row */}
        <div className="max-w-4xl mx-auto px-4 pb-12 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-full border ${link.border} bg-white/5 px-5 py-2.5 text-sm font-medium ${link.color} backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10`}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Event info row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center space-y-2"
          >
            <p className="text-white/40 text-xs font-mono">
              📅 13th &amp; 14th August 2026 · 📍 VIIT Campus, Duvvada, Visakhapatnam
            </p>
            <p className="text-white/40 text-xs font-mono">
              👥 Team Size: 2–4 Members · 💰 Registration: ₹400/Team · 🏆 Prize Pool: ₹10,000+
            </p>
            <p className="text-white/30 text-xs font-mono mt-4">
              HACKMATRIX 1.0 © 2026 · Dept. of AI &amp; DS, VIIT · All Rights Reserved
            </p>
          </motion.div>

          {/* Bottom divider with SquigglyText */}
          <div className="mt-8 flex items-center justify-center gap-4 text-white/30 text-xs tracking-widest uppercase font-mono">
            <SquigglyText scale={[3, 5]}>Innovate</SquigglyText>
            <span>✦</span>
            <SquigglyText scale={[3, 5]}>Collaborate</SquigglyText>
            <span>✦</span>
            <SquigglyText scale={[3, 5]}>Code</SquigglyText>
            <span>✦</span>
            <SquigglyText scale={[3, 5]}>Impact</SquigglyText>
          </div>
        </div>
      </div>
    </footer>
  );
}
