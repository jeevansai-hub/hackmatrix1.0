"use client";
import React, { useState } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "Who can participate in HackMatrix 1.0?",
    a: "HackMatrix 1.0 is open to students of VIIT and VIEW (UG/PG). Teams of 2–4 members are required, and cross-department team formation is accepted.",
  },
  {
    q: "What is the registration fee?",
    a: "The registration fee is ₹400 per team. Register at bit.ly/HackMatrix10.",
  },
  {
    q: "What are the available domains/tracks?",
    a: "AI/ML, Cloud Computing, Cybersecurity, Robotics, and other exciting technology domains. You can also propose your own innovative idea!",
  },
  {
    q: "When and where is the hackathon?",
    a: "HackMatrix 1.0 is a 2-day event on 13th & 14th August 2026 at VIIT Campus, Duvvada, Visakhapatnam.",
  },
  {
    q: "Do I need to bring my own hardware/laptop?",
    a: "Yes, participants must bring their own laptops. Power strips and internet connectivity will be provided.",
  },
  {
    q: "How will projects be judged?",
    a: "Projects are judged on Innovation, Technical Complexity, Impact, Feasibility, and Presentation Quality.",
  },
  {
    q: "What is the prize pool?",
    a: "The total prize pool is ₹10,000+ with exciting prizes distributed across first, second, third place, and special category awards.",
  },
  {
    q: "How can I contact the organizers?",
    a: "Reach out to the student coordinators: S. Manohar (9381716121), M. Sai Deepika (7981954548), B. Chaitanya Surya Deva (8143245575).",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="list-none"
    >
      <div className="relative rounded-2xl border border-white/10 p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <button
          onClick={() => setOpen(!open)}
          className="relative w-full rounded-xl bg-white/3 p-5 text-left hover:bg-white/5 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="text-sm font-semibold text-white/80 leading-relaxed">{q}</span>
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 text-red-400 text-xl leading-none mt-0.5"
            >
              +
            </motion.span>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-sm text-white/50 leading-relaxed border-t border-white/5 pt-4">{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 px-4 bg-transparent">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500/60 mb-4"
          >
            Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Frequently <span className="text-red-500">Asked</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
