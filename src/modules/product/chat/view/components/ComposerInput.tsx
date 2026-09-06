import { forwardRef } from "react";
import { TextInput, type TextInputProps } from "react-native";

import { COLOR } from "@/modules/platform/style/COLOR";
import { FONT_SIZE } from "@/modules/platform/style/FONT_SIZE";
import { PADDING } from "@/modules/platform/style/PADDING";
import { createStyles } from "@/modules/platform/style/createStyles";

const LINE_HEIGHT = FONT_SIZE.md * 1.25;
const MAX_LINES = 5;
const MIN_HEIGHT = LINE_HEIGHT + PADDING.sm * 2;
const MAX_HEIGHT = LINE_HEIGHT * MAX_LINES + PADDING.sm * 2;

export type ComposerInputProps = TextInputProps;

export const ComposerInput = forwardRef<TextInput, ComposerInputProps>(function ComposerInput(
  {
    accessibilityLabel = "Message",
    placeholder = "Message",
    placeholderTextColor = COLOR.light.textTertiary,
    style,
    ...rest
  },
  ref,
) {
  return (
    <TextInput
      ref={ref}
      accessibilityLabel={accessibilityLabel}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      {...rest}
      multiline
      scrollEnabled
      nestedScrollEnabled
      contextMenuHidden={false}
      submitBehavior="newline"
      textAlignVertical="top"
      style={[styles.input, style]}
    />
  );
});

const styles = createStyles(({ color, fontFamily, fontSize, padding }) => ({
  input: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
    paddingVertical: padding.sm,
    color: color.text,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
    lineHeight: LINE_HEIGHT,
  },
}));
