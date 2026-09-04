import { useLocalSearchParams, useRouter } from "expo-router";

import { ChatScreen } from "@/modules/product/chat/view/screens/ChatScreen";

export default function ChatRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = Array.isArray(id) ? id[0] : id;

  if (!conversationId) {
    return null;
  }

  return (
    <ChatScreen
      conversationId={conversationId}
      onOpenProfile={() => {
        router.push({ pathname: "/profile/[id]", params: { id: conversationId } });
      }}
    />
  );
}
