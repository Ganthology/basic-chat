import { View, type DimensionValue, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export type SkeletonBoneProps = Omit<ViewProps, "children"> & {
  width?: DimensionValue;
  height?: DimensionValue;
};

export function SkeletonBone({ width, height, style, ...rest }: SkeletonBoneProps) {
  return (
    <View
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      {...rest}
      style={[styles.bone, width != null || height != null ? { width, height } : null, style]}
    />
  );
}

const styles = createStyles(({ color, radius }) => ({
  bone: {
    backgroundColor: color.track,
    borderRadius: radius.sm,
  },
}));
