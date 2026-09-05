import { Stack } from "expo-router/stack";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { initLogger, wrapRoot } from "@/modules/platform/logger";
import { QueryProvider } from "@/modules/platform/query/QueryProvider";
import { transparentHeaderScreenOptions } from "@/modules/platform/style/transparentHeaderScreenOptions";
import { useLoadFonts } from "@/modules/platform/style/useLoadFonts";

initLogger();

function RootLayout() {
  const loaded = useLoadFonts();

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <KeyboardProvider>
        <Stack screenOptions={transparentHeaderScreenOptions}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="chat/[id]" options={{ title: "Chat" }} />
          <Stack.Screen name="profile/[id]" options={{ title: "Profile" }} />
        </Stack>
      </KeyboardProvider>
    </QueryProvider>
  );
}

export default wrapRoot(RootLayout);
