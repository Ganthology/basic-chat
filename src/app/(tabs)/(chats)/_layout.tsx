import { Stack } from "expo-router/stack";

import { COLOR } from "@/modules/platform/style/COLOR";
import { FONT_FAMILY } from "@/modules/platform/style/FONT_FAMILY";

const titleStyle = {
  fontFamily: FONT_FAMILY.display.bold,
  color: COLOR.light.text,
} as const;

export default function ChatsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: false,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerStyle: { backgroundColor: COLOR.light.background },
        headerLargeStyle: { backgroundColor: COLOR.light.background },
        headerTitleStyle: titleStyle,
        headerLargeTitleStyle: titleStyle,
        headerTintColor: COLOR.light.text,
      }}
    >
      <Stack.Screen name="index">
        <Stack.Title large>Chats</Stack.Title>
      </Stack.Screen>
    </Stack>
  );
}
