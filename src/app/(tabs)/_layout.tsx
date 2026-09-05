import { NativeTabs } from "expo-router/unstable-native-tabs";

import { FONT_FAMILY } from "@/modules/platform/style/FONT_FAMILY";

const tabLabelStyle = {
  fontFamily: FONT_FAMILY.display.bold,
} as const;

export default function TabsLayout() {
  return (
    <NativeTabs labelStyle={tabLabelStyle}>
      <NativeTabs.Trigger name="(chats)" disableTransparentOnScrollEdge>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "bubble.left.and.bubble.right",
            selected: "bubble.left.and.bubble.right.fill",
          }}
          md="chat"
        />
        <NativeTabs.Trigger.Label selectedStyle={tabLabelStyle}>Chats</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings" disableTransparentOnScrollEdge>
        <NativeTabs.Trigger.Icon
          sf={{ default: "gearshape", selected: "gearshape.fill" }}
          md="settings"
        />
        <NativeTabs.Trigger.Label selectedStyle={tabLabelStyle}>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
