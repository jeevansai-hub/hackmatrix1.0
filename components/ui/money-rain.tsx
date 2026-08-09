"use client";
import React, { useEffect, useRef, useCallback } from "react";

interface Bill {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  scale: number;
  type: "rupee" | "cash" | "coin";
  opacity: number;
}

export function MoneyShower({ trigger }: { trigger?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const billsRef = useRef<Bill[]>([]);
  const animationFrameId = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);

  const spawnBills = useCallback((count: number, burst = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width || window.innerWidth;
    const height = canvas.height || window.innerHeight;

    for (let i = 0; i < count; i++) {
      const types: ("rupee" | "cash" | "coin")[] = ["rupee", "cash", "coin", "rupee"];
      const type = types[Math.floor(Math.random() * types.length)];

      if (burst) {
        const startX = width * 0.5 + (Math.random() - 0.5) * 250;
        const startY = height * 0.55 + (Math.random() - 0.5) * 80;
        const angle = Math.PI * 1.5 + (Math.random() - 0.5) * 1.5;
        const speed = Math.random() * 10 + 6;

        billsRef.current.push({
          x: startX,
          y: startY,
          z: Math.random() * 300 + 50,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          vz: (Math.random() - 0.5) * 3,
          rotX: Math.random() * 360,
          rotY: Math.random() * 360,
          rotZ: Math.random() * 360,
          vRotX: (Math.random() - 0.5) * 10,
          vRotY: (Math.random() - 0.5) * 12,
          vRotZ: (Math.random() - 0.5) * 6,
          scale: Math.random() * 0.5 + 0.7,
          type,
          opacity: 1,
        });
      } else {
        billsRef.current.push({
          x: Math.random() * width,
          y: -40 - Math.random() * 100,
          z: Math.random() * 400 + 50,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 2 + 1,
          vz: (Math.random() - 0.5) * 0.5,
          rotX: Math.random() * 360,
          rotY: Math.random() * 360,
          rotZ: Math.random() * 360,
          vRotX: (Math.random() - 0.5) * 3,
          vRotY: (Math.random() - 0.5) * 4,
          vRotZ: (Math.random() - 0.5) * 2,
          scale: Math.random() * 0.4 + 0.6,
          type,
          opacity: 1,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (trigger && trigger > 0) {
      spawnBills(35, true);
    }
  }, [trigger, spawnBills]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Seed initial subtle bills
    spawnBills(15, false);

    let lastSpawn = Date.now();
    isRunningRef.current = true;

    const drawBill = (ctx: CanvasRenderingContext2D, bill: Bill) => {
      ctx.save();
      ctx.translate(bill.x, bill.y);

      const fov = 350;
      const pScale = fov / (fov + bill.z);
      const s = bill.scale * Math.max(0.2, pScale);

      ctx.scale(s, s);
      ctx.rotate((bill.rotZ * Math.PI) / 180);

      const cosY = Math.cos((bill.rotY * Math.PI) / 180);
      const cosX = Math.cos((bill.rotX * Math.PI) / 180);
      ctx.scale(cosY || 0.1, cosX || 0.1);

      ctx.globalAlpha = bill.opacity * Math.min(1, Math.max(0.25, pScale));

      if (bill.type === "rupee" || bill.type === "cash") {
        const w = 80;
        const h = 42;

        ctx.fillStyle = bill.type === "rupee" ? "#e11d48" : "#059669";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(bill.type === "rupee" ? "₹" : "$", 0, 0);

        ctx.font = "bold 8px sans-serif";
        ctx.fillText("10k+", -w / 2 + 12, -h / 2 + 8);
        ctx.fillText("10k+", w / 2 - 12, h / 2 - 8);
      } else {
        const r = 16;
        ctx.fillStyle = "#eab308";
        ctx.strokeStyle = "#fef08a";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#713f12";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("₹", 0, 0);
      }

      ctx.restore();
    };

    const loop = () => {
      if (!isRunningRef.current) return;
      ctx.clearRect(0, 0, width, height);

      if (Date.now() - lastSpawn > 800 && billsRef.current.length < 25) {
        spawnBills(1, false);
        lastSpawn = Date.now();
      }

      const gravity = 0.12;
      const drag = 0.99;

      for (let i = billsRef.current.length - 1; i >= 0; i--) {
        const bill = billsRef.current[i];

        bill.vy += gravity;
        bill.vx *= drag;
        bill.vy *= drag;

        bill.x += bill.vx;
        bill.y += bill.vy;
        bill.z += bill.vz;

        bill.rotX += bill.vRotX;
        bill.rotY += bill.vRotY;
        bill.rotZ += bill.vRotZ;

        drawBill(ctx, bill);

        if (bill.y > height + 60 || bill.x < -80 || bill.x > width + 80) {
          billsRef.current.splice(i, 1);
        }
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      isRunningRef.current = false;
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [spawnBills]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
    />
  );
}
