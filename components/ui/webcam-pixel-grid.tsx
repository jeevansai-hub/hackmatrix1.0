"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { VideoBackground } from "@/components/ui/video-background";

type WebcamPixelGridProps = {
  gridCols?: number;
  gridRows?: number;
  maxElevation?: number;
  motionSensitivity?: number;
  elevationSmoothing?: number;
  colorMode?: "webcam" | "monochrome";
  monochromeColor?: string;
  backgroundColor?: string;
  mirror?: boolean;
  gapRatio?: number;
  invertColors?: boolean;
  darken?: number;
  borderColor?: string;
  borderOpacity?: number;
  className?: string;
  onWebcamError?: (error: Error) => void;
  onWebcamReady?: () => void;
};

type PixelData = {
  r: number;
  g: number;
  b: number;
  motion: number;
  targetElevation: number;
  currentElevation: number;
};

export const WebcamPixelGrid: React.FC<WebcamPixelGridProps> = ({
  gridCols = 36,
  gridRows = 22,
  maxElevation = 30,
  motionSensitivity = 0.3,
  elevationSmoothing = 0.15,
  colorMode = "webcam",
  monochromeColor = "#dc2626",
  backgroundColor = "#070612",
  mirror = true,
  gapRatio = 0.08,
  invertColors = false,
  darken = 0.1,
  borderColor = "#ffffff",
  borderOpacity = 0.15,
  className,
  onWebcamError,
  onWebcamReady,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const processingCanvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const previousFrameRef = useRef<Uint8ClampedArray | null>(null);
  const pixelDataRef = useRef<PixelData[][]>([]);
  const animationRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const mountedRef = useRef(true);
  const [isReady, setIsReady] = useState(false);
  const [cameraDenied, setCameraDenied] = useState(false);

  const borderRGB = React.useMemo(() => {
    const hex = borderColor.replace("#", "");
    return {
      r: parseInt(hex.slice(0, 2), 16) || 255,
      g: parseInt(hex.slice(2, 4), 16) || 255,
      b: parseInt(hex.slice(4, 6), 16) || 255,
    };
  }, [borderColor]);

  // Initialize pixels grid
  useEffect(() => {
    pixelDataRef.current = Array.from({ length: gridRows }, (_, r) =>
      Array.from({ length: gridCols }, (_, c) => ({
        r: 40 + Math.sin(r + c) * 20,
        g: 20 + Math.cos(r) * 15,
        b: 50 + Math.sin(c) * 25,
        motion: 0.2,
        targetElevation: Math.sin(r * 0.5) * Math.cos(c * 0.5) * 5 + 3,
        currentElevation: 2,
      })),
    );
  }, [gridCols, gridRows]);

  const requestCameraAccess = useCallback(async () => {
    try {
      setCameraDenied(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
      });

      if (!mountedRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.srcObject = stream;

        try {
          await videoRef.current.play();
          if (mountedRef.current) {
            setIsReady(true);
            setCameraDenied(false);
            onWebcamReady?.();
          }
        } catch (playErr: any) {
          if (playErr?.name !== "AbortError") {
            setIsReady(false);
            setCameraDenied(true);
          }
        }
      }
    } catch (err) {
      if (!mountedRef.current) return;
      setIsReady(false);
      setCameraDenied(true);
      const errorObj = err instanceof Error ? err : new Error("Webcam access denied");
      onWebcamError?.(errorObj);
    }
  }, [onWebcamError, onWebcamReady]);

  useEffect(() => {
    mountedRef.current = true;
    requestCameraAccess();
    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(animationRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [requestCameraAccess]);

  // Main canvas render loop (runs continuous 3D grid animation)
  const render = useCallback(() => {
    if (!mountedRef.current) return;

    const video = videoRef.current;
    const processingCanvas = processingCanvasRef.current;
    const displayCanvas = displayCanvasRef.current;

    if (!displayCanvas) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    const dispCtx = displayCanvas.getContext("2d");
    if (!dispCtx) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    // Process camera frames if video is playing
    if (video && processingCanvas && isReady && video.readyState >= 2) {
      const procCtx = processingCanvas.getContext("2d", { willReadFrequently: true });
      if (procCtx) {
        processingCanvas.width = gridCols;
        processingCanvas.height = gridRows;

        procCtx.save();
        if (mirror) {
          procCtx.scale(-1, 1);
          procCtx.drawImage(video, -gridCols, 0, gridCols, gridRows);
        } else {
          procCtx.drawImage(video, 0, 0, gridCols, gridRows);
        }
        procCtx.restore();

        const imageData = procCtx.getImageData(0, 0, gridCols, gridRows);
        const currentData = imageData.data;
        const previousData = previousFrameRef.current;
        const pixels = pixelDataRef.current;

        for (let row = 0; row < gridRows; row++) {
          for (let col = 0; col < gridCols; col++) {
            const idx = (row * gridCols + col) * 4;
            const r = currentData[idx];
            const g = currentData[idx + 1];
            const b = currentData[idx + 2];
            const pixel = pixels[row]?.[col];
            if (!pixel) continue;

            let motion = 0;
            if (previousData) {
              const diff = Math.abs(r - previousData[idx]) + Math.abs(g - previousData[idx + 1]) + Math.abs(b - previousData[idx + 2]);
              motion = Math.min(1, diff / 255 / motionSensitivity);
            }
            pixel.motion = pixel.motion * 0.7 + motion * 0.3;

            pixel.r = r;
            pixel.g = g;
            pixel.b = b;
            pixel.targetElevation = Math.max(2, pixel.motion * maxElevation);
            pixel.currentElevation += (pixel.targetElevation - pixel.currentElevation) * elevationSmoothing;
          }
        }

        previousFrameRef.current = new Uint8ClampedArray(currentData);
      }
    } else {
      // Gentle ambient wave idle animation when camera isn't active
      const t = Date.now() * 0.002;
      const pixels = pixelDataRef.current;
      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const pixel = pixels[row]?.[col];
          if (!pixel) continue;
          const wave = Math.sin(col * 0.3 + t) * Math.cos(row * 0.3 + t);
          pixel.targetElevation = Math.max(1, (wave + 1) * 8);
          pixel.currentElevation += (pixel.targetElevation - pixel.currentElevation) * 0.1;
        }
      }
    }

    // Render Canvas
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = displayCanvas.clientWidth;
    const displayHeight = displayCanvas.clientHeight;

    if (displayWidth > 0 && displayHeight > 0) {
      displayCanvas.width = displayWidth * dpr;
      displayCanvas.height = displayHeight * dpr;
      dispCtx.scale(dpr, dpr);

      dispCtx.fillStyle = backgroundColor;
      dispCtx.fillRect(0, 0, displayWidth, displayHeight);

      const cellSize = Math.max(displayWidth / gridCols, displayHeight / gridRows);
      const gap = cellSize * gapRatio;
      const gridW = cellSize * gridCols;
      const gridH = cellSize * gridRows;
      const offsetXGrid = (displayWidth - gridW) / 2;
      const offsetYGrid = (displayHeight - gridH) / 2;
      const pixels = pixelDataRef.current;

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const pixel = pixels[row]?.[col];
          if (!pixel) continue;
          const x = offsetXGrid + col * cellSize;
          const y = offsetYGrid + row * cellSize;
          const elevation = pixel.currentElevation;
          const offsetX = -elevation * 1.2;
          const offsetY = -elevation * 1.8;

          // 3D Shadow & Side extrusion
          if (elevation > 0.5) {
            dispCtx.fillStyle = `rgba(0,0,0,${Math.min(0.5, elevation * 0.03)})`;
            dispCtx.fillRect(x + gap / 2 + elevation * 1.5, y + gap / 2 + elevation * 2, cellSize - gap, cellSize - gap);

            dispCtx.fillStyle = `rgb(${Math.max(10, pixel.r - 70)},${Math.max(10, pixel.g - 70)},${Math.max(10, pixel.b - 70)})`;
            dispCtx.beginPath();
            dispCtx.moveTo(x + cellSize - gap / 2 + offsetX, y + gap / 2 + offsetY);
            dispCtx.lineTo(x + cellSize - gap / 2, y + gap / 2);
            dispCtx.lineTo(x + cellSize - gap / 2, y + cellSize - gap / 2);
            dispCtx.lineTo(x + cellSize - gap / 2 + offsetX, y + cellSize - gap / 2 + offsetY);
            dispCtx.closePath();
            dispCtx.fill();

            dispCtx.fillStyle = `rgb(${Math.max(10, pixel.r - 40)},${Math.max(10, pixel.g - 40)},${Math.max(10, pixel.b - 40)})`;
            dispCtx.beginPath();
            dispCtx.moveTo(x + gap / 2 + offsetX, y + cellSize - gap / 2 + offsetY);
            dispCtx.lineTo(x + gap / 2, y + cellSize - gap / 2);
            dispCtx.lineTo(x + cellSize - gap / 2, y + cellSize - gap / 2);
            dispCtx.lineTo(x + cellSize - gap / 2 + offsetX, y + cellSize - gap / 2 + offsetY);
            dispCtx.closePath();
            dispCtx.fill();
          }

          // Top face
          dispCtx.fillStyle = `rgb(${Math.min(255, Math.round(pixel.r))},${Math.min(255, Math.round(pixel.g))},${Math.min(255, Math.round(pixel.b))})`;
          dispCtx.fillRect(x + gap / 2 + offsetX, y + gap / 2 + offsetY, cellSize - gap, cellSize - gap);

          // Grid Border
          dispCtx.strokeStyle = `rgba(${borderRGB.r},${borderRGB.g},${borderRGB.b},${borderOpacity})`;
          dispCtx.lineWidth = 0.5;
          dispCtx.strokeRect(x + gap / 2 + offsetX, y + gap / 2 + offsetY, cellSize - gap, cellSize - gap);
        }
      }
    }

    animationRef.current = requestAnimationFrame(render);
  }, [gridCols, gridRows, mirror, motionSensitivity, isReady, maxElevation, elevationSmoothing, backgroundColor, gapRatio, borderRGB, borderOpacity]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(animationRef.current); };
  }, [render]);

  return (
    <div className={cn("relative h-full w-full bg-black overflow-hidden", className)}>
      <video ref={videoRef} className="pointer-events-none absolute h-0 w-0 opacity-0" playsInline muted />
      <canvas ref={processingCanvasRef} className="pointer-events-none absolute h-0 w-0 opacity-0" />

      {/* ── 3D WEBCAM PIXEL GRID CANVAS (ALWAYS VISIBLE & RENDERING) ── */}
      <canvas
        ref={displayCanvasRef}
        className="h-full w-full block absolute inset-0 z-10"
        style={{ backgroundColor }}
      />

      {/* ── FALLBACK VIDEO BACKGROUND ONLY WHEN CAMERA IS DENIED ── */}
      {cameraDenied && (
        <div className="absolute inset-0 z-20">
          <VideoBackground />
        </div>
      )}

      {/* Camera permission prompt button */}
      {!isReady && !cameraDenied && (
        <div className="absolute bottom-6 right-6 z-30">
          <button
            onClick={requestCameraAccess}
            className="flex items-center gap-2 rounded-full border border-red-500/40 bg-black/80 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-md hover:bg-red-600 transition-all"
          >
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            Enable Camera for Interactive Pixel Grid
          </button>
        </div>
      )}
    </div>
  );
};

export default WebcamPixelGrid;
