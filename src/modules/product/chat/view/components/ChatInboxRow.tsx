import Animated, { Easing, FadeIn, FadeInUp, useReducedMotion } from "react-native-reanimated";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Heading } from "@/modules/platform/ui/Heading";
import { ListGroup } from "@/modules/platform/ui/ListGroup";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

const LAST_MESSAGE_PLACEHOLDER = "No messages yet";
const ENTER_MS = 180;
const STAGGER_MS = 32;
const STAGGER_MAX_INDEX = 10;
const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);
const enteringReduced = FadeIn.duration(ENTER_MS);
const enteringSlideUp = FadeInUp.duration(ENTER_MS).easing(EASE_OUT);

type ChatInboxRowProps = {
  name: string;
  avatar: string;
  onPress: () => void;
  enterOrder?: number | null;
};

export function ChatInboxRow({ name, avatar, onPress, enterOrder }: ChatInboxRowProps) {
  const reduceMotion = useReducedMotion();
  const initials = initialsFromName(name);

  return (
    <Animated.View entering={enteringForOrder(enterOrder, reduceMotion)} style={styles.enter}>
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
    </Animated.View>
  );
}

function enteringForOrder(enterOrder: number | null | undefined, reduceMotion: boolean | null) {
  if (enterOrder == null) {
    return undefined;
  }
  if (reduceMotion) {
    return enteringReduced;
  }

  const delay = Math.min(enterOrder, STAGGER_MAX_INDEX) * STAGGER_MS;
  return enteringSlideUp.delay(delay);
}

const styles = createStyles(() => ({
  enter: {
    width: "100%",
  },
}));

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
