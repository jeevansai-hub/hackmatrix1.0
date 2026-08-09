"use client";
import React, { useState, useCallback } from "react";
import Preloader from "@/components/sections/Preloader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Motto from "@/components/sections/Motto";
import Tracks from "@/components/sections/Tracks";
import Prizes from "@/components/sections/Prizes";
import Timeline from "@/components/sections/Timeline";
import FAQ from "@/components/sections/FAQ";
import Organizers from "@/components/sections/Organizers";
import SocialFooter from "@/components/sections/SocialFooter";
import { VideoBackground } from "@/components/ui/video-background";
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

              {/* Background Video for subsequent sections */}
              <div className="relative z-10">
                <VideoBackground />

                <div className="relative z-10 bg-transparent">
                  <Motto />
                  <Tracks />
                  <Prizes />
                  <Timeline />
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
