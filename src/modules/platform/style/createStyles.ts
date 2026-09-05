import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from "react-native";

import { COLOR } from "./COLOR";
import { FONT_FAMILY } from "./FONT_FAMILY";
import { FONT_SIZE } from "./FONT_SIZE";
import { FONT_WEIGHT } from "./FONT_WEIGHT";
import { PADDING } from "./PADDING";
import { RADIUS } from "./RADIUS";
import { SPACING } from "./SPACING";

type ColorScheme = "light" | "dark";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type StyleTokens = {
  color: (typeof COLOR)[ColorScheme];
  fontFamily: typeof FONT_FAMILY;
  fontSize: typeof FONT_SIZE;
  fontWeight: typeof FONT_WEIGHT;
  spacing: typeof SPACING;
  padding: typeof PADDING;
  radius: typeof RADIUS;
};

const STYLE_TOKENS = {
  light: Object.freeze({
    color: COLOR.light,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    fontWeight: FONT_WEIGHT,
    spacing: SPACING,
    padding: PADDING,
    radius: RADIUS,
  }),
  dark: Object.freeze({
    color: COLOR.dark,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    fontWeight: FONT_WEIGHT,
    spacing: SPACING,
    padding: PADDING,
    radius: RADIUS,
  }),
} as const satisfies Record<ColorScheme, StyleTokens>;

export function createStyles<T extends NamedStyles<T>>(
  factory: (styles: StyleTokens) => T,
  scheme?: ColorScheme,
): T {
  return StyleSheet.create(factory(tokensForScheme(scheme ?? "light")));
}

function tokensForScheme(scheme: ColorScheme): StyleTokens {
  switch (scheme) {
    case "light":
      return STYLE_TOKENS.light;
    case "dark":
      return STYLE_TOKENS.dark;
    default: {
      const _exhaustive: never = scheme;
      return _exhaustive;
    }
  }
}
