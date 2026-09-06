import { useFeatureFlag } from "@/modules/platform/featureFlag/useFeatureFlag";
import { GroupedTable } from "@/modules/platform/ui/GroupedTable";
import type { ChatFeatureFlagRepository } from "@/modules/product/chat/data/repository/ChatFeatureFlagRepository";
import { ChatFeatureFlagRepositoryImpl } from "@/modules/product/chat/data/repositoryImpl/ChatFeatureFlagRepositoryImpl";

const chatFeatureFlagRepository: ChatFeatureFlagRepository = new ChatFeatureFlagRepositoryImpl();

export function ChatInboxEmptyFlagSettings() {
  const showEmptyConversationList = useFeatureFlag(
    chatFeatureFlagRepository,
    "showEmptyConversationList",
  );

  return (
    <GroupedTable>
      <GroupedTable.Row>
        <GroupedTable.Row.Heading>Empty conversation list</GroupedTable.Row.Heading>
        <GroupedTable.Row.Toggle
          accessibilityLabel="Show empty conversation list"
          value={showEmptyConversationList}
          onValueChange={(value) => {
            chatFeatureFlagRepository.set("showEmptyConversationList", value);
          }}
        />
      </GroupedTable.Row>
    </GroupedTable>
  );
}
