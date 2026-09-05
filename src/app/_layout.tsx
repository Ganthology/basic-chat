import { Stack } from "expo-router/stack";

import { QueryProvider } from "@/modules/platform/query/QueryProvider";
import { useHideSplash } from "@/modules/platform/splash/useHideSplash";
import { transparentHeaderScreenOptions } from "@/modules/platform/style/transparentHeaderScreenOptions";
import { useLoadFonts } from "@/modules/platform/style/useLoadFonts";

export default function RootLayout() {
  const loaded = useLoadFonts();
  useHideSplash(loaded);

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <Stack screenOptions={transparentHeaderScreenOptions}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chat/[id]" options={{ title: "Chat" }} />
        <Stack.Screen name="profile/[id]" options={{ title: "Profile" }} />
      </Stack>
    </QueryProvider>
  );
}
