import { type ReactNode } from "react";
import Animated, { ZoomIn, useReducedMotion } from "react-native-reanimated";

type ChatMessageGrowProps = {
  children: ReactNode;
};

export function ChatMessageGrow({ children }: ChatMessageGrowProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Animated.View
      entering={reduceMotion ? undefined : ZoomIn.springify()}
      style={growOrigin}
    >
      {children}
    </Animated.View>
  );
}

const growOrigin = {
  transformOrigin: "bottom right",
} as const;
