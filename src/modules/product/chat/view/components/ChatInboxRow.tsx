import { Heading } from "@/modules/platform/ui/Heading";
import { ListGroup } from "@/modules/platform/ui/ListGroup";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

const LAST_MESSAGE_PLACEHOLDER = "No messages yet";

type ChatInboxRowProps = {
  name: string;
  avatar: string;
  onPress: () => void;
};

export function ChatInboxRow({ name, avatar, onPress }: ChatInboxRowProps) {
  const initials = initialsFromName(name);

  return (
    <ListGroup.Item onPress={onPress}>
      <ListGroup.Item.Avatar initials={initials} accessibilityLabel={name}>
        {avatar.length > 0 ? <ListGroup.Item.Avatar.Image source={avatar} /> : null}
      </ListGroup.Item.Avatar>
      <ListGroup.Item.Content>
        <ListGroup.Item.Headline>
          <Heading size="lg" numberOfLines={1}>
            {name}
          </Heading>
        </ListGroup.Item.Headline>
        <Paragraph size="md" tone="secondary" numberOfLines={1}>
          {LAST_MESSAGE_PLACEHOLDER}
        </Paragraph>
      </ListGroup.Item.Content>
    </ListGroup.Item>
  );
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return `${first}${last}`.toUpperCase();
}
