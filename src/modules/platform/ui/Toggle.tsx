import { useEffect } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { COLOR } from "@/modules/platform/style/COLOR";
import { createStyles } from "@/modules/platform/style/createStyles";

const TRACK_WIDTH = 51;
const TRACK_HEIGHT = 31;
const KNOB_SIZE = 27;
const KNOB_INSET = 2;
const KNOB_TRAVEL = TRACK_WIDTH - KNOB_SIZE - KNOB_INSET * 2;
const TRACK_OFF = COLOR.light.track;
const TRACK_ON = COLOR.light.accent;

const TIMING = {
  duration: 180,
  easing: Easing.bezier(0.23, 1, 0.32, 1),
  reduceMotion: ReduceMotion.System,
};

export type ToggleProps = Omit<PressableProps, "style" | "children" | "onPress"> & {
  accessibilityLabel: string;
  value: boolean;
  onValueChange?: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function Toggle({
  accessibilityLabel,
  value,
  onValueChange,
  disabled,
  style,
  ...rest
}: ToggleProps) {
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, TIMING);
  }, [progress, value]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [TRACK_OFF, TRACK_ON]),
  }));

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * KNOB_TRAVEL }],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled ?? false, checked: value }}
      disabled={disabled}
      onPress={() => onValueChange?.(!value)}
      {...rest}
      style={({ pressed }) => [pressed && styles.pressed, disabled && styles.disabled, style]}
    >
      <Animated.View style={[styles.track, value ? styles.on : styles.off, trackStyle]}>
        <Animated.View style={[styles.knob, knobStyle]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = createStyles(({ radius }) => ({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: radius.lg,
  },
  off: {
    backgroundColor: TRACK_OFF,
  },
  on: {
    backgroundColor: TRACK_ON,
  },
  knob: {
    position: "absolute",
    top: KNOB_INSET,
    left: KNOB_INSET,
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: radius.full,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 2,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.4,
  },
}));
