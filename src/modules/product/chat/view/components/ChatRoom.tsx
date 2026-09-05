import { LegendList, type LegendListProps } from "@legendapp/list/react-native";
import { View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export function ChatRoom<ItemT>({
  style,
  contentContainerStyle,
  ItemSeparatorComponent = ChatRoomSeparator,
  ...rest
}: LegendListProps<ItemT>) {
  return (
    <LegendList
      accessibilityRole="list"
      alignItemsAtEnd
      maintainScrollAtEnd
      initialScrollAtEnd
      ItemSeparatorComponent={ItemSeparatorComponent}
      {...rest}
      style={[styles.list, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
    />
  );
}

function ChatRoomSeparator() {
  return <View style={styles.separator} />;
}

const styles = createStyles(({ padding, spacing }) => ({
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
  },
  separator: {
    height: spacing.sm,
  },
}));
