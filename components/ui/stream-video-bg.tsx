"use client";
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export function StreamVideoBackground({
  className = "",
  showFade = true,
}: {
  className?: string;
  showFade?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      "https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#070612] ${className}`}
      style={{ backgroundColor: "#070612" }}
    >
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover origin-left scale-125 ml-[100px] md:ml-[200px]"
        />
      </div>

      {/* Bottom Fade Gradient */}
      {showFade && (
        <div className="absolute bottom-0 inset-x-0 h-40 z-10 bg-gradient-to-t from-[#070612] via-[#070612]/60 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
