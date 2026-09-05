import { forwardRef } from "react";
import { TextInput, type TextInputProps } from "react-native";

import { COLOR } from "@/modules/platform/style/COLOR";
import { createStyles } from "@/modules/platform/style/createStyles";

export type ComposerInputProps = TextInputProps;

export const ComposerInput = forwardRef<TextInput, ComposerInputProps>(
  function ComposerInput(
    {
      accessibilityLabel = "Message",
      placeholder = "Message",
      placeholderTextColor = COLOR.light.textTertiary,
      blurOnSubmit = false,
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
        blurOnSubmit={blurOnSubmit}
        {...rest}
        style={[styles.input, style]}
      />
    );
  },
);
