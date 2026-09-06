import { Stack } from "expo-router/stack";

import { useHeaderScreenOptions } from "@/modules/platform/style/useHeaderScreenOptions";

export default function ChatsLayout() {
  const screenOptions = useHeaderScreenOptions();

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ title: "Chats", headerLargeTitle: false }} />
    </Stack>
  );
}
