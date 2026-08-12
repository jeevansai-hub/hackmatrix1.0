"use client";

import React from "react";
import { cn } from "@/lib/utils";
import styles from "./mechanical-keyboard.module.css";

export type KeyDef = {
  id: string;
  label: string;
  /** Characters this key produces (used to drive the typing animation). */
  chars?: string[];
  /** Special width class from the CSS module. */
  size?: keyof typeof styles;
};

const L = (letter: string): KeyDef => ({
  id: letter,
  label: letter,
  chars: [letter],
});

export const KEY_ROWS: KeyDef[][] = [
  [
    { id: "esc", label: "Esc" },
    { id: "1", label: "1 !", chars: ["1", "!"] },
    { id: "2", label: "2 @", chars: ["2", "@"] },
    { id: "3", label: "3 #", chars: ["3", "#"] },
    { id: "4", label: "4 $", chars: ["4", "$"] },
    { id: "5", label: "5 %", chars: ["5", "%"] },
    { id: "6", label: "6 ^", chars: ["6", "^"] },
    { id: "7", label: "7 &", chars: ["7", "&"] },
    { id: "8", label: "8 *", chars: ["8", "*"] },
    { id: "9", label: "9 (", chars: ["9", "("] },
    { id: "0", label: "0 )", chars: ["0", ")"] },
    { id: "minus", label: "- _", chars: ["-", "_"] },
    { id: "equal", label: "= +", chars: ["=", "+"] },
    { id: "backspace", label: "←", size: "backspace" },
  ],
  [
    { id: "tab", label: "⇥", size: "tab" },
    L("Q"), L("W"), L("E"), L("R"), L("T"), L("Y"), L("U"), L("I"), L("O"), L("P"),
    { id: "lbracket", label: "[ {", chars: ["[", "{"] },
    { id: "rbracket", label: "] }", chars: ["]", "}"] },
    { id: "backslash", label: "\\ |", chars: ["\\", "|"], size: "backslash" },
  ],
  [
    { id: "caps", label: "⇪", size: "caps" },
    L("A"), L("S"), L("D"), L("F"), L("G"), L("H"), L("J"), L("K"), L("L"),
    { id: "semicolon", label: "; :", chars: [";", ":"] },
    { id: "quote", label: "' \"", chars: ["'", '"'] },
    { id: "enter", label: "↵", size: "enter" },
  ],
  [
    { id: "lshift", label: "⇧", size: "lshift" },
    L("Z"), L("X"), L("C"), L("V"), L("B"), L("N"), L("M"),
    { id: "comma", label: ", <", chars: [",", "<"] },
    { id: "period", label: ". >", chars: [".", ">"] },
    { id: "slash", label: "/ ?", chars: ["/", "?"] },
    { id: "rshift", label: "⇧", size: "rshift" },
  ],
  [
    { id: "ctrl-l", label: "Ctrl", size: "ctrl" },
    { id: "cmd", label: "Cmd", size: "cmd" },
    { id: "alt-l", label: "Alt", size: "alt" },
    { id: "space", label: "", chars: [" "], size: "space" },
    { id: "alt-r", label: "Alt", size: "alt" },
    { id: "menu", label: "Menu", size: "menu" },
    { id: "ctrl-r", label: "Ctrl", size: "ctrl" },
    { id: "fn", label: "Fn", size: "fn" },
  ],
];

/** Map every producible character to the id of the key that types it. */
export const CHAR_TO_KEY: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const row of KEY_ROWS) {
    for (const key of row) {
      key.chars?.forEach((ch) => {
        if (!(ch in map)) map[ch] = key.id;
      });
    }
  }
  return map;
})();

/** Resolve the key that would type a given character. */
export function keyForChar(ch: string): string | undefined {
  if (ch === "\n") return "enter";
  return CHAR_TO_KEY[ch] ?? CHAR_TO_KEY[ch.toUpperCase()];
}

// Landing-page glow palette — pure crimson family, matching the site's
// --cipher-red (#dc2626) and its red text gradient (#dc2626 → #f87171).
const WARM: [number, number, number][] = [
  [220, 38, 38], // red-600  #dc2626  (site primary)
  [239, 68, 68], // red-500  #ef4444
  [248, 113, 113], // red-400  #f87171  (site light accent)
  [185, 28, 28], // red-700  #b91c1c  (deep)
];

// Deterministic per-key color (stable across SSR/hydration).
function keyColorVars(id: string): React.CSSProperties {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const [r, g, b] = WARM[h % WARM.length];
  return {
    "--color": `rgb(${r},${g},${b})`,
    "--box-shadow": `rgba(${r},${g},${b},0.5)`,
    "--box-shadow-inner": `rgba(${r},${g},${b},0.12)`,
    "--text-shadow": `rgba(${r},${g},${b},0.28)`,
  } as React.CSSProperties;
}

export interface MechanicalKeyboardProps {
  /** id of the key currently being struck (lights up + depresses). */
  pressedKeyId?: string | null;
  className?: string;
}

export function MechanicalKeyboard({
  pressedKeyId,
  className,
}: MechanicalKeyboardProps) {
  return (
    <div className={cn(styles.keyboard, className)}>
      <div className={styles.board}>
        {KEY_ROWS.map((row, ri) => (
          <div
            key={ri}
            className={cn(styles.row, styles[`row${ri + 1}` as keyof typeof styles])}
          >
            {row.map((key) => (
              <div
                key={key.id}
                style={keyColorVars(key.id)}
                className={cn(
                  styles.key,
                  key.size && styles[key.size],
                  pressedKeyId === key.id && styles.pressed,
                )}
              >
                {key.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
