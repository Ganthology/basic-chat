import { type DimensionValue, type ViewProps } from "react-native";

import { FONT_SIZE, type FontSize } from "@/modules/platform/style/FONT_SIZE";

import { SkeletonBone } from "../Skeleton/SkeletonBone";

export type ParagraphSkeletonProps = Omit<ViewProps, "children"> & {
  size?: FontSize;
  width?: DimensionValue;
};

export function ParagraphSkeleton({
  size = "md",
  width = "70%",
  style,
  ...rest
}: ParagraphSkeletonProps) {
  return <SkeletonBone width={width} height={FONT_SIZE[size]} {...rest} style={style} />;
}
