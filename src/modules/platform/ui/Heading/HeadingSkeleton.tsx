import { type DimensionValue, type ViewProps } from "react-native";

import { FONT_SIZE, type FontSize } from "@/modules/platform/style/FONT_SIZE";

import { SkeletonBone } from "../Skeleton/SkeletonBone";

export type HeadingSkeletonProps = Omit<ViewProps, "children"> & {
  size?: FontSize;
  width?: DimensionValue;
};

export function HeadingSkeleton({
  size = "2xl",
  width = "40%",
  style,
  ...rest
}: HeadingSkeletonProps) {
  return <SkeletonBone width={width} height={FONT_SIZE[size]} {...rest} style={style} />;
}
