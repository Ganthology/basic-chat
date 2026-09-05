import { KeyboardAwareLegendList } from "@legendapp/list/keyboard";
import { type LegendListProps, type LegendListRef } from "@legendapp/list/react-native";
import { type Ref } from "react";
import { View } from "react-native";
import { type SharedValue } from "react-native-reanimated";

import { createStyles } from "@/modules/platform/style/createStyles";

type ChatRoomProps<ItemT> = Omit<
  LegendListProps<ItemT>,
  "anchoredEndSpace" | "contentInsetEndAdjustment" | "refScrollView" | "renderScrollComponent"
> & {
  contentInsetEndAdjustment?: SharedValue<number>;
  freeze?: boolean | SharedValue<boolean>;
  keyboardOffset?: number;
  ref?: Ref<LegendListRef>;
};

export function ChatRoom<ItemT>({
  style,
  contentContainerStyle,
  ItemSeparatorComponent = ChatRoomSeparator,
  ...rest
}: ChatRoomProps<ItemT>) {
  return (
    <KeyboardAwareLegendList
      accessibilityRole="list"
      alignItemsAtEnd
      maintainScrollAtEnd
      initialScrollAtEnd
      keyboardShouldPersistTaps="handled"
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
