"use client";

import { useRef, useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  className?: string;
}

export default function WorldMap({
  dots = [
    {
      start: { lat: 17.7231, lng: 83.3012, label: "Visakhapatnam (VIIT)" },
      end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    },
    {
      start: { lat: 17.7231, lng: 83.3012, label: "Visakhapatnam (VIIT)" },
      end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    },
    {
      start: { lat: 17.7231, lng: 83.3012, label: "Visakhapatnam (VIIT)" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    {
      start: { lat: 17.7231, lng: 83.3012, label: "Visakhapatnam (VIIT)" },
      end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    },
    {
      start: { lat: 17.7231, lng: 83.3012, label: "Visakhapatnam (VIIT)" },
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    },
  ],
  lineColor = "#dc2626",
  className,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const svgMap = useMemo(() => {
    try {
      const map = new DottedMap({ height: 100, grid: "diagonal" });
      return map.getSVG({
        radius: 0.22,
        color: "#FFFFFF30",
        shape: "circle",
        backgroundColor: "transparent",
      });
    } catch (e) {
      return "";
    }
  }, []);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 40;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className={`w-full aspect-[2/1] bg-transparent rounded-xl relative font-sans ${className}`}>
      {svgMap && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full opacity-40 [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-contain"
          alt="world map"
          height="400"
          width="800"
          draggable={false}
        />
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.5"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.4 * i,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2,
                }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
            <stop offset="20%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="80%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="10"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="10"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
