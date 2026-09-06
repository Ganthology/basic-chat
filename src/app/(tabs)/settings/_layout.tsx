import { Stack } from "expo-router/stack";

import { useHeaderScreenOptions } from "@/modules/platform/style/useHeaderScreenOptions";

export default function SettingsLayout() {
  const screenOptions = useHeaderScreenOptions();

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{ title: "Settings", headerLargeTitle: true }}
      />
    </Stack>
  );
}
