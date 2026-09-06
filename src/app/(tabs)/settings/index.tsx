import { ChatInboxEmptyFlagSettings } from "@/modules/product/chat/view/components/ChatInboxEmptyFlagSettings";
import { SettingsScreen } from "@/modules/product/settings/view/screens/SettingsScreen";

export default function SettingsRoute() {
  return (
    <SettingsScreen>
      <ChatInboxEmptyFlagSettings />
    </SettingsScreen>
  );
}
