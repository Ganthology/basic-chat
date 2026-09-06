import { type ReactNode } from "react";
import { View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

import { ChatMessageGrow } from "./ChatMessageGrow";

export type ChatMessageFrom = "user" | "other";

export type ChatMessageProps = ViewProps & {
  from: ChatMessageFrom;
  children: ReactNode;
};

function ChatMessageRoot({ from, children, style, ...rest }: ChatMessageProps) {
  return (
    <View {...rest} style={[styles.row, rowStyles(from), style]}>
      <View style={[styles.bubble, bubbleStyles(from)]}>
        {typeof children === "string" || typeof children === "number" ? (
          <Paragraph style={textStyles(from)}>{children}</Paragraph>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

function rowStyles(from: ChatMessageFrom) {
  switch (from) {
    case "other":
      return styles.rowOther;
    case "user":
      return styles.rowUser;
    default: {
      const _exhaustive: never = from;
      return _exhaustive;
    }
  }
}

function bubbleStyles(from: ChatMessageFrom) {
  switch (from) {
    case "other":
      return styles.bubbleOther;
    case "user":
      return styles.bubbleUser;
    default: {
      const _exhaustive: never = from;
      return _exhaustive;
    }
  }
}

function textStyles(from: ChatMessageFrom) {
  switch (from) {
    case "other":
      return styles.textOther;
    case "user":
      return styles.textUser;
    default: {
      const _exhaustive: never = from;
      return _exhaustive;
    }
  }
}

const styles = createStyles(({ color, padding, radius }) => ({
  row: {
    width: "100%",
    flexDirection: "row",
  },
  rowOther: {
    justifyContent: "flex-start",
  },
  rowUser: {
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    borderRadius: radius.xl,
  },
  bubbleOther: {
    backgroundColor: color.container,
    borderBottomLeftRadius: radius.sm,
  },
  bubbleUser: {
    backgroundColor: color.accent,
    borderBottomRightRadius: radius.sm,
  },
  textOther: {
    color: color.text,
  },
  textUser: {
    color: color.accentText,
  },
}));

export const ChatMessage = Object.assign(ChatMessageRoot, {
  Grow: ChatMessageGrow,
});
