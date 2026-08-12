# HackMatrix Design Kit

The color palette, theme, and reusable animation/UI components extracted from the
HackMatrix 1.0 site — a **dark, crimson-on-black "cipher / heist" theme**.
Drop this folder into another project to reuse the same look and feel.

## What's inside

```
design-kit/
├── globals.css      # Theme tokens, Tailwind v4 @theme, utilities, fonts, scrollbar
├── typography.css   # Type scale as ready-made classes (.type-hero, .type-eyebrow, …)
├── lib/utils.ts     # cn() helper (clsx + tailwind-merge)
└── ui/              # Reusable components
    ├── squiggly-text.tsx          # SVG turbulence wobble on text
    ├── glowing-effect.tsx         # Pointer-tracking conic-gradient border glow
    ├── pixel-grid.tsx             # Interactive 3D crimson pixel field (canvas)
    ├── heist-vault-countdown.tsx  # Split-flap countdown timer
    ├── 3d-card.tsx                # Tilt-on-hover 3D card
    ├── macbook-scroll.tsx         # Scroll-driven MacBook reveal
    ├── money-rain.tsx             # Falling-money canvas effect
    ├── mechanical-keyboard.tsx    # + mechanical-keyboard.module.css
    └── tailwind-css-background-snippet.tsx
```

## Requirements (in the target project)

```bash
npm install motion clsx tailwind-merge lucide-react @tabler/icons-react
```

- **Tailwind CSS v4** and **React 19 / Next 16** (components use `"use client"`).
- Fonts: `General Sans` (loaded via the `@import` at the top of `globals.css`) and
  `JetBrains Mono` — expose it as the CSS var `--font-flap` (e.g. Next.js
  `JetBrains_Mono({ variable: "--font-flap" })`).

## Setup

1. Copy `globals.css` into your app and `@import` it once (it already
   `@import "tailwindcss"`). Or merge its `:root`, `@theme`, and utility blocks
   into your existing global stylesheet.
2. Copy `lib/utils.ts` and make sure the `@/` path alias resolves (components
   import `@/lib/utils`). Adjust the import path if your alias differs.
3. Copy the `ui/` components you want. Icon-heavy ones need `lucide-react`.

## Theme reference

| Token | Value | Meaning |
|-------|-------|---------|
| `--cipher-bg` | `#000000` | Background |
| `--cipher-surface` | `#0a0a0a` | Cards / surfaces |
| `--cipher-border` | `rgba(255,255,255,0.06)` | Hairline borders |
| `--cipher-red` | `#dc2626` | Primary accent |
| `--cipher-red` (light) | `#f87171` | Gradient light end |
| `--cipher-red-soft` | `rgba(220,38,38,0.15)` | Soft fills / glows |
| `--cipher-glow` | `rgba(220,38,38,0.4)` | Glow shadow |

After the `@theme` block, tokens are usable as classes: `bg-cipher-bg`,
`bg-cipher-surface`, `bg-cipher-red`, `text-cipher-red`, `border-cipher-border`,
`shadow-cipher-glow`, `font-mono`.

### Utilities (in globals.css)
- `.glass-card` — glassmorphism (blur + faint white border, 16px radius)
- `.text-gradient-red` — `#dc2626 → #f87171` clipped text gradient
- Red thin scrollbar, red `::selection`, smooth scroll, reduced-motion guard.

### Typography (see `typography.css`)
Ready-made classes so you don't re-derive the clamps / tracking:
`.type-hero`, `.type-heading`, `.type-card-title`, `.type-eyebrow`,
`.type-tagline`, `.type-label` (+ `--accent` / `--bright`), `.font-display`,
`.font-mono-flap`. The file also documents the full type scale and the
letter-spacing ladder (0.14em dense rows → 0.4em top-level eyebrows).
Import it **after** `globals.css`.

### Motion signature
- Library: `motion` v13 (`motion/react`).
- Default reveal: `initial {opacity:0, y:12}` → `animate {opacity:1, y:0}`,
  `duration: 0.55`, `ease: [0.16, 1, 0.3, 1]` (expo-out). Titles use `"backOut"`.
- Typography: huge `font-black`, tight tracking `-0.035em`, `clamp()` fluid sizes,
  red text-shadow glow `0 0 80px rgba(220,38,38,0.45)`. Mono uppercase eyebrow
  labels with `0.14em–0.3em` letter-spacing.
