"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
   3D MARQUEE — straight-on infinite photo columns.
   Deliberately flat (no diamond rotateZ/rotateY slant) so every
   frame stays sharp and legible, with a very light rotateX for
   a touch of depth. Columns loop seamlessly and alternate
   direction for a living, marquee-style wall.
   ──────────────────────────────────────────────────────────── */

interface ThreeDMarqueeProps {
  images?: string[];
  className?: string;
}

const defaultImages: string[] = [];

function MarqueeColumn({
  images,
  direction,
  duration,
  className,
}: {
  images: string[];
  direction: "up" | "down";
  duration: number;
  className?: string;
}) {
  const looped = [...images, ...images];
  return (
    <div className={cn("relative h-full overflow-hidden", className)}>
      <motion.div
        animate={{ y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-4 will-change-transform sm:gap-5"
      >
        {looped.map((src, i) => (
          <div key={i} className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              draggable={false}
              loading="lazy"
              alt="HackMatrix 1.0 — moment from the event"
              className="aspect-[4/3] w-full select-none rounded-lg bg-neutral-900 object-cover shadow-lg shadow-black/40 ring-1 ring-white/10"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const ThreeDMarquee = ({
  images = defaultImages,
  className,
}: ThreeDMarqueeProps) => {
  const columnCount = 4;
  const chunkSize = Math.ceil(images.length / columnCount);
  const chunks = Array.from({ length: columnCount }, (_, colIndex) =>
    images.slice(colIndex * chunkSize, colIndex * chunkSize + chunkSize),
  ).filter((c) => c.length > 0);

  return (
    <div
      className={cn(
        "relative mx-auto h-[30rem] w-full max-w-6xl overflow-hidden rounded-2xl max-sm:h-[26rem]",
        className,
      )}
      style={{ perspective: "1600px" }}
    >
      <div
        style={{ transform: "rotateX(8deg)", transformStyle: "preserve-3d" }}
        className="grid h-full w-full grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:gap-5 sm:px-6 lg:grid-cols-4"
      >
        {chunks.map((col, i) => (
          <MarqueeColumn
            key={i}
            images={col}
            direction={i % 2 === 0 ? "up" : "down"}
            duration={22 + i * 4}
            className={
              i === 2
                ? "hidden sm:block"
                : i === 3
                  ? "hidden lg:block"
                  : undefined
            }
          />
        ))}
      </div>

      {/* top/bottom fade so columns dissolve into the section bg */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent sm:h-24" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent sm:h-24" />
    </div>
  );
};

export default ThreeDMarquee;
