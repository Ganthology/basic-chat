import { View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Heading } from "@/modules/platform/ui/Heading";

export function ChatThreadEmpty() {
  return (
    <View style={styles.root}>
      <Heading size="xl" style={styles.copy}>
        No messages
      </Heading>
    </View>
  );
}

const styles = createStyles(({ padding }) => ({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: padding.lg,
  },
  copy: {
    textAlign: "center",
  },
}));
