import { useRouter } from "expo-router";

import { ChatInboxScreen } from "@/modules/product/chat/view/screens/ChatInboxScreen";

export default function Index() {
  const router = useRouter();

  return (
    <ChatInboxScreen
      onOpenChat={(conversationId) => {
        router.push({ pathname: "/chat/[id]", params: { id: conversationId } });
      }}
    />
  );
}
