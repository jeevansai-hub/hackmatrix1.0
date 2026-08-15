"use client";
import React, { useState, useCallback } from "react";
import Preloader from "@/components/sections/Preloader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Gallery from "@/components/sections/Gallery";
import Domains from "@/components/sections/Domains";
import Prizes from "@/components/sections/Prizes";
import Certificates from "@/components/sections/Certificates";
import Schedule from "@/components/sections/Schedule";
import Essentials from "@/components/sections/Essentials";
import Problems from "@/components/sections/Problems";
import FAQ from "@/components/sections/FAQ";
import Organizers from "@/components/sections/Organizers";
import SocialFooter from "@/components/sections/SocialFooter";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {!preloaderDone && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {preloaderDone && (
          <motion.div
            key="main-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-black text-white min-h-screen"
          >
            {/* Navbar */}
            <Navbar />

            <main className="relative">
              {/* Hero Section */}
              <Hero />

              {/* Straight off the landing page: the event's photo wall */}
              <Gallery />

              {/* Subsequent sections on the consistent black theme */}
              <div className="relative z-10">
                <div className="relative z-10 bg-transparent">
                  <Experience />
                  <Domains />
                  <Prizes />
                  <Certificates />
                  <Schedule />
                  <Essentials />
                  <Problems />
                  <FAQ />
                  <Organizers />
                  <SocialFooter />
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
