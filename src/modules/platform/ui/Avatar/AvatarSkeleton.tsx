import { type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { SkeletonBone } from "../Skeleton/SkeletonBone";
import { type AvatarSize } from "./Avatar";

export type AvatarSkeletonProps = Omit<ViewProps, "children"> & {
  size?: AvatarSize;
};

export function AvatarSkeleton({ size = "md", style, ...rest }: AvatarSkeletonProps) {
  const dimension = sizeDimension(size);

  return (
    <SkeletonBone width={dimension} height={dimension} {...rest} style={[styles.circle, style]} />
  );
}

function sizeDimension(size: AvatarSize): number {
  switch (size) {
    case "sm":
      return 32;
    case "md":
      return 52;
    case "xl":
      return 104;
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

const styles = createStyles(({ radius }) => ({
  circle: {
    borderRadius: radius.full,
  },
}));
