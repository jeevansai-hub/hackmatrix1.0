"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

type PixelGridProps = {
  /** Target pixel size in CSS px on desktop; scaled down on small screens. */
  cellSize?: number;
  /** Max extrusion height of a fully-lit pixel. */
  maxElevation?: number;
  /** Gap between pixels as a ratio of cell size. */
  gapRatio?: number;
  /** Overall brightness ceiling (0–1). Keeps the field behind the content. */
  intensityCap?: number;
  /** Radius (in cells) of the pointer's glow. */
  pointerRadius?: number;
  className?: string;
};

type Pixel = { value: number; elevation: number };
type Flare = { col: number; row: number; age: number; life: number };

/**
 * Crimson ramp — deliberately dark. Most cells live in the first two stops so
 * the grid reads as texture, not as a wall of colour. Peaks reach the site's
 * --cipher-red (#dc2626) and only just past it.
 */
const RAMP: [number, number, number][] = [
  [6, 4, 6],
  [20, 7, 10],
  [46, 11, 15],
  [86, 16, 20],
  [140, 22, 26],
  [185, 28, 28],
  [220, 38, 38],
  [244, 96, 96],
];

function rampColor(t: number): [number, number, number] {
  const c = t <= 0 ? 0 : t >= 1 ? 1 : t;
  const s = c * (RAMP.length - 1);
  const i = Math.min(RAMP.length - 2, Math.floor(s));
  const f = s - i;
  const a = RAMP[i];
  const b = RAMP[i + 1];
  return [
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + (b[2] - a[2]) * f,
  ];
}

export const PixelGrid: React.FC<PixelGridProps> = ({
  cellSize = 30,
  maxElevation = 14,
  gapRatio = 0.14,
  intensityCap = 0.8,
  pointerRadius = 7,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[][]>([]);
  const flaresRef = useRef<Flare[]>([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, cols: 0, rows: 0, cell: cellSize });
  const pointerRef = useRef({ col: -1, row: -1, active: false, ease: 0 });
  // Smoothed, normalised pointer offset for the parallax camera (-1 … 1).
  const camRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const nextFlareRef = useRef(0);

  const resize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w <= 0 || h <= 0) return;

    const cell = w < 640 ? cellSize * 0.7 : w < 1024 ? cellSize * 0.85 : cellSize;
    let cols = Math.ceil(w / cell) + 2;
    let rows = Math.ceil(h / cell) + 2;

    const MAX_CELLS = 5200;
    if (cols * rows > MAX_CELLS) {
      const k = Math.sqrt((cols * rows) / MAX_CELLS);
      cols = Math.ceil(cols / k);
      rows = Math.ceil(rows / k);
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    if (cols !== sizeRef.current.cols || rows !== sizeRef.current.rows) {
      pixelsRef.current = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ value: 0, elevation: 0 })),
      );
    }

    sizeRef.current = { w, h, cols, rows, cell: Math.max(w / cols, h / rows) };
  }, [cellSize]);

  // Pointer tracked on window so hovering the hero content still drives it.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const { cell } = sizeRef.current;
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside || cell <= 0) {
        pointerRef.current.active = false;
        return;
      }
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      pointerRef.current = {
        col: (e.clientX - rect.left) / cell,
        row: (e.clientY - rect.top) / cell,
        active: true,
        ease: pointerRef.current.ease,
      };
      camRef.current.tx = (px - 0.5) * 2;
      camRef.current.ty = (py - 0.5) * 2;
    };
    const onLeave = () => {
      pointerRef.current.active = false;
      camRef.current.tx = 0;
      camRef.current.ty = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  useEffect(() => {
    resize();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const start = performance.now();
    let last = start;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = (now - start) / 1000;

      const { w, h, cols, rows, cell } = sizeRef.current;
      const pixels = pixelsRef.current;
      if (w <= 0 || h <= 0 || !pixels.length) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // ── Parallax camera easing (cinematic drift) ──
      const cam = camRef.current;
      cam.x += (cam.tx - cam.x) * 0.045;
      cam.y += (cam.ty - cam.y) * 0.045;

      // ── Sparse flares: a few cells wake up, glow, fade ──
      if (!reduceMotion && t > nextFlareRef.current) {
        nextFlareRef.current = t + 0.5 + Math.random() * 1.1;
        flaresRef.current.push({
          col: Math.random() * cols,
          row: Math.random() * rows,
          age: 0,
          life: 2.6 + Math.random() * 1.8,
        });
      }
      const flares = flaresRef.current;
      for (let i = flares.length - 1; i >= 0; i--) {
        flares[i].age += dt;
        if (flares[i].age > flares[i].life) flares.splice(i, 1);
      }

      // Light angle drifts slowly → the extrusion direction breathes.
      const camAngle = -2.2 + Math.sin(t * 0.1) * 0.22;
      const lightX = Math.cos(camAngle);
      const lightY = Math.sin(camAngle);

      const gap = cell * gapRatio;
      const face = cell - gap;
      const pointer = pointerRef.current;

      // Parallax shift in px — small, so it reads as depth not movement.
      const shiftX = -cam.x * 14;
      const shiftY = -cam.y * 10;

      const cx = cols / 2;
      const cy = rows / 2;
      // Normalising radius for the centre mask.
      const maxR = Math.sqrt(cx * cx + cy * cy);

      for (let row = 0; row < rows; row++) {
        const pxRow = pixels[row];
        if (!pxRow) continue;
        for (let col = 0; col < cols; col++) {
          const pixel = pxRow[col];
          if (!pixel) continue;

          // ── Travelling light band (the main motion) ──
          let v = 0.045; // faint ambient so the grid is always just-visible
          if (!reduceMotion) {
            const s1 = Math.sin(col * 0.075 + row * 0.05 - t * 0.42);
            const band1 = Math.pow(Math.max(0, s1), 9);
            const s2 = Math.sin(col * 0.045 - row * 0.08 + t * 0.27);
            const band2 = Math.pow(Math.max(0, s2), 13);
            v += band1 * 0.5 + band2 * 0.32;
          } else {
            v += 0.06 * (0.5 + 0.5 * Math.sin(col * 0.12 + row * 0.09));
          }

          // ── Flares ──
          for (let i = 0; i < flares.length; i++) {
            const fl = flares[i];
            const dc = col - fl.col;
            const dr = row - fl.row;
            const d2 = dc * dc + dr * dr;
            if (d2 > 90) continue;
            const p = fl.age / fl.life;
            // rise fast, fall slow
            const env = p < 0.18 ? p / 0.18 : 1 - (p - 0.18) / 0.82;
            v += Math.exp(-d2 / 14) * Math.max(0, env) * 0.75;
          }

          // ── Pointer glow (hover interaction) ──
          if (pointer.active) {
            const dc = col - pointer.col;
            const dr = row - pointer.row;
            const dist = Math.sqrt(dc * dc + dr * dr);
            if (dist < pointerRadius) {
              const f = 1 - dist / pointerRadius;
              v += f * f * 0.7;
            }
          }

          // ── Centre mask: keep the middle dark so content always reads ──
          const dx = (col - cx) / maxR;
          const dy = (row - cy) / maxR;
          const r = Math.sqrt(dx * dx + dy * dy) * 1.42;
          // smoothstep(0.28 → 1.0)
          const e = Math.min(1, Math.max(0, (r - 0.28) / 0.72));
          v *= e * e * (3 - 2 * e);

          v = Math.min(intensityCap, Math.max(0, v));
          pixel.value += (v - pixel.value) * (reduceMotion ? 1 : 0.14);

          const val = pixel.value;
          // Skip near-invisible cells entirely — keeps the loop cheap.
          if (val < 0.012) {
            pixel.elevation += (0 - pixel.elevation) * 0.1;
            continue;
          }

          const targetElev = val * maxElevation;
          pixel.elevation += (targetElev - pixel.elevation) * (reduceMotion ? 1 : 0.1);
          const elev = pixel.elevation;

          const x = col * cell + shiftX;
          const y = row * cell + shiftY;
          const ox = -elev * lightX * 0.5;
          const oy = -elev * lightY * 0.5;
          const [cr, cg, cb] = rampColor(val / intensityCap);

          // ── 3D extrusion, only on genuinely lit cells ──
          if (elev > 1.1) {
            const fx = x + gap / 2 + ox;
            const fy = y + gap / 2 + oy;
            ctx.fillStyle = `rgb(${Math.max(4, cr * 0.34) | 0},${Math.max(3, cg * 0.3) | 0},${Math.max(3, cb * 0.3) | 0})`;
            ctx.beginPath();
            ctx.moveTo(fx + face, fy);
            ctx.lineTo(x + gap / 2 + face, y + gap / 2);
            ctx.lineTo(x + gap / 2 + face, y + gap / 2 + face);
            ctx.lineTo(fx + face, fy + face);
            ctx.lineTo(fx, fy + face);
            ctx.lineTo(x + gap / 2, y + gap / 2 + face);
            ctx.lineTo(x + gap / 2 + face, y + gap / 2 + face);
            ctx.closePath();
            ctx.fill();
          }

          ctx.fillStyle = `rgb(${cr | 0},${cg | 0},${cb | 0})`;
          ctx.fillRect(x + gap / 2 + ox, y + gap / 2 + oy, face, face);
        }
      }

      if (reduceMotion) return;
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gapRatio, intensityCap, maxElevation, pointerRadius]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden bg-black", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      {/* Vignette — sinks the edges and guarantees centre contrast for content */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.55)_45%,transparent_100%)]" />
    </div>
  );
};

export default PixelGrid;
