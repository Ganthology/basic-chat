import { Stack } from "expo-router/stack";

import { transparentHeaderScreenOptions } from "@/modules/platform/style/transparentHeaderScreenOptions";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={transparentHeaderScreenOptions}>
      <Stack.Screen
        name="index"
        options={{ title: "Settings", headerLargeTitle: true }}
      />
    </Stack>
  );
}
