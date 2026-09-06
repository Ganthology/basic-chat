"use no memo";

import { type ReactNode, useEffect } from "react";
import { View, type ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

export type ChatMessageFrom = "user" | "other";

export type ChatMessageProps = ViewProps & {
  from: ChatMessageFrom;
  appear?: boolean;
  children: ReactNode;
};

export function ChatMessage({
  from,
  appear = false,
  children,
  style,
  ...rest
}: ChatMessageProps) {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(appear && !reduceMotion ? 0 : 1);

  useEffect(() => {
    if (!appear || reduceMotion) {
      scale.set(1);
      return;
    }

    scale.set(0);
    scale.set(withSpring(1));
  }, [appear, reduceMotion, scale]);

  const growStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [{ scale: scale.get() }],
    };
  });

  return (
    <View {...rest} style={[styles.row, rowStyles(from), style]}>
      <Animated.View
        style={[styles.bubble, bubbleStyles(from), styles.growOrigin, growStyle]}
      >
        {typeof children === "string" || typeof children === "number" ? (
          <Paragraph style={textStyles(from)}>{children}</Paragraph>
        ) : (
          children
        )}
      </Animated.View>
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
  growOrigin: {
    transformOrigin: "bottom right",
  },
}));
