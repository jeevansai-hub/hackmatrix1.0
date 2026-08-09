"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    leadName: "",
    phone: "",
    email: "",
    members: "3",
    track: "AI / ML",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-red-500/40 bg-zinc-950 p-6 sm:p-8 text-white shadow-2xl shadow-red-900/50 overflow-hidden"
          >
            {/* Ambient Red Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full border-2 border-red-500 bg-red-500/20 p-2 flex items-center justify-center text-3xl">
                  🎉
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  HEIST REGISTRATION COMPLETE!
                </h3>
                <p className="text-sm text-white/70 mb-6">
                  Team <span className="text-red-400 font-bold">{formData.teamName}</span> is registered for HackMatrix 1.0. Check your WhatsApp &amp; Email for entry pass &amp; guidelines.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-900/50 transition-all"
                >
                  Close &amp; Return to Home
                </button>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full border border-red-500/40 bg-black p-1">
                    <img src="/hackmatrix-logo.svg" alt="Logo" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">REGISTER FOR HACKMATRIX 1.0</h3>
                    <p className="text-xs text-red-400 font-mono">13th &amp; 14th Aug 2026 · VIIT Visakhapatnam</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cipher Syndicate"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                        Team Lead Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.leadName}
                        onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit Mobile"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                        Team Size
                      </label>
                      <select
                        value={formData.members}
                        onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
                      >
                        <option value="2">2 Members (₹400)</option>
                        <option value="3">3 Members (₹400)</option>
                        <option value="4">4 Members (₹400)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                        Preferred Track
                      </label>
                      <select
                        value={formData.track}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
                      >
                        <option value="AI / ML">AI / ML</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Robotics">Robotics</option>
                        <option value="Open Innovation">Open Innovation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="lead@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-900/50 transition-all cursor-pointer"
                    >
                      CONFIRM REGISTRATION (₹400 / TEAM) →
                    </button>
                    <p className="text-[10px] text-white/40 text-center mt-2 font-mono">
                      Also available directly via bit.ly/hackmatrix10
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
