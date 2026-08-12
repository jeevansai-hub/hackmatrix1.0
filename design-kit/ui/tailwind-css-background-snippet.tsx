import { cn } from "@/lib/utils";

/**
 * Themed radial-glow background — black core fading through deep red (red-950)
 * to the site's crimson (#dc2626, --cipher-red). Drop-in background layer:
 * render it as an absolutely-positioned child inside any `relative`/`fixed`
 * container. No props/state/assets required.
 */
export const RadialGlowBackground = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full",
        "[background:radial-gradient(125%_125%_at_50%_10%,#000_45%,#450a0a_75%,#dc2626_100%)]",
        className,
      )}
    />
  );
};

/**
 * Full-screen showcase matching the original snippet's API
 * (`import { Hero } from "@/components/ui/tailwind-css-background-snippet"`).
 */
export const Hero = () => {
  return (
    <div className={cn("w-full relative h-screen")}>
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <RadialGlowBackground className="-z-10 px-5 py-24" />
      </div>
    </div>
  );
};
