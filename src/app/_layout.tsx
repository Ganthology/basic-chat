import { Stack } from "expo-router/stack";

import { QueryProvider } from "@/modules/platform/query/QueryProvider";
import { useLoadFonts } from "@/modules/platform/style/useLoadFonts";

export default function RootLayout() {
  const loaded = useLoadFonts();

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chat/[id]" options={{ title: "Chat" }} />
        <Stack.Screen name="profile/[id]" options={{ title: "Profile" }} />
      </Stack>
    </QueryProvider>
  );
}
