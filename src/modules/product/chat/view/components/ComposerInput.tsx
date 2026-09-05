import { TextInput, type TextInputProps } from "react-native";

import { COLOR } from "@/modules/platform/style/COLOR";
import { createStyles } from "@/modules/platform/style/createStyles";

export type ComposerInputProps = TextInputProps;

export function ComposerInput({
  accessibilityLabel = "Message",
  placeholder = "Message",
  placeholderTextColor = COLOR.light.textTertiary,
  style,
  ...rest
}: ComposerInputProps) {
  return (
    <TextInput
      accessibilityLabel={accessibilityLabel}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      {...rest}
      style={[styles.input, style]}
    />
  );
}

const styles = createStyles(({ color, fontFamily, fontSize, padding, radius }) => ({
  input: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    borderRadius: radius.xl,
    backgroundColor: color.background,
    color: color.text,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
  },
}));
