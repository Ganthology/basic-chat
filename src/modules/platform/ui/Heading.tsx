import { Text, type TextProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { type FontSize } from "@/modules/platform/style/FONT_SIZE";
import { fontSizeStyles } from "@/modules/platform/style/fontSizeStyles";

type Tone = "default" | "secondary" | "tertiary";

export type HeadingProps = TextProps & {
  size?: FontSize;
  tone?: Tone;
};

export function Heading({
  size = "2xl",
  tone = "default",
  style,
  ...rest
}: HeadingProps) {
  return (
    <Text
      accessibilityRole="header"
      {...rest}
      style={[styles.root, styles[size], styles[tone], style]}
    />
  );
}

const styles = createStyles(({ color, fontFamily, fontSize }) => ({
  root: {
    fontFamily: fontFamily.display.bold,
  },
  default: { color: color.text },
  secondary: { color: color.textSecondary },
  tertiary: { color: color.textTertiary },
  ...fontSizeStyles(fontSize),
}));
