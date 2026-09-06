import { Text, type TextProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { type FontSize } from "@/modules/platform/style/FONT_SIZE";
import { fontSizeStyles } from "@/modules/platform/style/fontSizeStyles";

import { ParagraphSkeleton } from "./ParagraphSkeleton";

type Tone = "default" | "secondary" | "tertiary";

export type ParagraphProps = TextProps & {
  size?: FontSize;
  tone?: Tone;
};

function ParagraphRoot({ size = "md", tone = "default", style, ...rest }: ParagraphProps) {
  return <Text {...rest} style={[styles.root, styles[size], styles[tone], style]} />;
}

const styles = createStyles(({ color, fontFamily, fontSize }) => ({
  root: {
    fontFamily: fontFamily.body.regular,
  },
  default: { color: color.text },
  secondary: { color: color.textSecondary },
  tertiary: { color: color.textTertiary },
  ...fontSizeStyles(fontSize),
}));

export const Paragraph = Object.assign(ParagraphRoot, {
  Skeleton: ParagraphSkeleton,
});
