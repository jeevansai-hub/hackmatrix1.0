"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-4 z-50 w-full px-4", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(8px)",
        boxShadow: visible
          ? "0 0 24px rgba(220, 38, 38, 0.15), 0 1px 1px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          : "0 0 0 1px rgba(255, 255, 255, 0.05)",
        width: visible ? "65%" : "100%",
        y: visible ? 5 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 35,
      }}
      style={{
        minWidth: "min(100%, 750px)",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-6xl flex-row items-center justify-between self-start rounded-full border border-white/10 bg-black/60 px-6 py-2.5 lg:flex dark:bg-black/60",
        visible && "bg-black/80 dark:bg-black/80 border-red-500/30",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-row items-center justify-center space-x-1 text-sm font-medium text-neutral-300 transition duration-200 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-300 hover:text-white transition-colors"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-red-500/15 border border-red-500/30"
            />
          )}
          <span className="relative z-20 font-medium text-xs uppercase tracking-wider">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(8px)",
        boxShadow: visible
          ? "0 0 24px rgba(220, 38, 38, 0.15), 0 1px 1px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          : "none",
        width: visible ? "95%" : "100%",
        paddingRight: visible ? "16px" : "12px",
        paddingLeft: visible ? "16px" : "12px",
        borderRadius: visible ? "1.5rem" : "1rem",
        y: visible ? 5 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 35,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between rounded-2xl border border-white/10 bg-black/80 px-4 py-3 lg:hidden",
        visible && "bg-black/90 dark:bg-black/90 border-red-500/30",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl border border-white/10 bg-black/95 px-6 py-6 shadow-2xl backdrop-blur-xl dark:bg-black/95",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-white hover:text-red-400 transition-colors cursor-pointer"
      aria-label="Toggle Menu"
    >
      {isOpen ? (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#home"
      className="relative z-20 flex items-center space-x-2 px-1 py-1 text-sm font-normal text-white"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10">
        <span className="font-mono text-sm font-black text-red-500">H</span>
      </div>
      <div>
        <p className="font-bold text-white text-xs tracking-wider leading-none">HACKMATRIX</p>
        <p className="text-red-500 font-mono text-[10px]">1.0</p>
      </div>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-5 py-2 rounded-full text-xs font-bold relative cursor-pointer hover:scale-105 transition duration-200 inline-flex items-center justify-center text-center";

  const variantStyles = {
    primary:
      "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 border border-red-500/40",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10",
    dark: "bg-black text-white border border-white/20",
    gradient:
      "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-900/40",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
