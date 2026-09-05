/**
 * Pick by role (where it sits), not by how it looks.
 *
 * background — screen root
 * container — card, row, composer, sheet on background
 * containerSelected — selected/pressed container
 * accent / accentPressed — brand fill
 * accentText — text/icon drawn on accent
 * text / textSecondary / textTertiary — copy on background or container
 * separator — hairline
 * track — inactive control track
 */
export const COLOR = {
  light: {
    accent: "#3b6eff",
    accentPressed: "#2c58d6",
    accentText: "#ffffff",
    background: "#eef2fb",
    container: "#ffffff",
    containerSelected: "rgba(59, 110, 255, 0.08)",
    text: "#101528",
    textSecondary: "#5b6480",
    textTertiary: "#8b93ab",
    separator: "rgba(59, 110, 255, 0.12)",
    track: "#d9dff0",
  },
  dark: {
    accent: "#6b8fff",
    accentPressed: "#8aa6ff",
    accentText: "#0b1020",
    background: "#0b1020",
    container: "#161b2e",
    containerSelected: "rgba(107, 143, 255, 0.08)",
    text: "#f3f5ff",
    textSecondary: "#a8b0cc",
    textTertiary: "#7b84a3",
    separator: "rgba(107, 143, 255, 0.16)",
    track: "#2a3150",
  },
} as const;
