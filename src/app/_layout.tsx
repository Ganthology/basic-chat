import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { initLogger, wrapRoot } from "@/modules/platform/logger";
import { QueryProvider } from "@/modules/platform/query/QueryProvider";
import { useDarkStatusBarIcons } from "@/modules/platform/style/useDarkStatusBarIcons";
import { useHeaderScreenOptions } from "@/modules/platform/style/useHeaderScreenOptions";
import { useLoadFonts } from "@/modules/platform/style/useLoadFonts";

initLogger();

function RootLayout() {
  const loaded = useLoadFonts();
  const screenOptions = useHeaderScreenOptions();
  useDarkStatusBarIcons();

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <KeyboardProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={screenOptions}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="chat/[id]" options={{ title: "Chat" }} />
          <Stack.Screen name="profile/[id]" options={{ title: "Profile" }} />
        </Stack>
      </KeyboardProvider>
    </QueryProvider>
  );
}

export default wrapRoot(RootLayout);
