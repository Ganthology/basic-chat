const REM = 16;

export const FONT_SIZE = {
  xs: 0.75 * REM,
  sm: 0.875 * REM,
  md: 1 * REM,
  lg: 1.125 * REM,
  xl: 1.25 * REM,
  "2xl": 1.5 * REM,
  "3xl": 2 * REM,
} as const;

export type FontSize = keyof typeof FONT_SIZE;
