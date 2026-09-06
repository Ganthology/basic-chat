import { View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { Avatar } from "../Avatar";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import { ListItemContent } from "./ListItemContent";

export type ListItemSkeletonProps = Omit<ViewProps, "children">;

export function ListItemSkeleton({ style, ...rest }: ListItemSkeletonProps) {
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      {...rest}
      style={[styles.root, style]}
    >
      <Avatar.Skeleton size="md" />
      <ListItemContent>
        <Heading.Skeleton size="lg" width="40%" />
        <Paragraph.Skeleton size="md" width="70%" />
      </ListItemContent>
    </View>
  );
}

const styles = createStyles(({ padding, spacing }) => ({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    width: "100%",
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
  },
}));
