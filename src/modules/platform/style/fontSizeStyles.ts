import { FONT_SIZE } from "./FONT_SIZE";

export function fontSizeStyles(fontSize: typeof FONT_SIZE) {
  return {
    xs: { fontSize: fontSize.xs },
    sm: { fontSize: fontSize.sm },
    md: { fontSize: fontSize.md },
    lg: { fontSize: fontSize.lg },
    xl: { fontSize: fontSize.xl },
    "2xl": { fontSize: fontSize["2xl"] },
    "3xl": { fontSize: fontSize["3xl"] },
  } as const satisfies Record<keyof typeof FONT_SIZE, { fontSize: number }>;
}
