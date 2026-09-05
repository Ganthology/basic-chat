import { Stack } from "expo-router/stack";

import { transparentHeaderScreenOptions } from "@/modules/platform/style/transparentHeaderScreenOptions";

export default function ChatsLayout() {
  return (
    <Stack screenOptions={transparentHeaderScreenOptions}>
      <Stack.Screen name="index" options={{ title: "Chats", headerLargeTitle: false }} />
    </Stack>
  );
}
