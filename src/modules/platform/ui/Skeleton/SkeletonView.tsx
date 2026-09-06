import { useEffect, useMemo } from "react";
import { Animated, type ViewProps } from "react-native";

export type SkeletonViewProps = ViewProps;

export function SkeletonView({ style, ...rest }: SkeletonViewProps) {
  const pulse = useMemo(() => new Animated.Value(0.4), []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, [pulse]);

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true }}
      {...rest}
      style={[{ opacity: pulse }, style]}
    />
  );
}
