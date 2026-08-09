"use client";
import React from "react";

export function VideoBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden bg-black ${className}`}
      style={{ backgroundColor: "#000000" }}
    >
      {/* Looping Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
          type="video/mp4"
        />
      </video>

      {/* 50% Black Overlay for Readability */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
    </div>
  );
}
