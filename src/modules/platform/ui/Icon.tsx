import { Plus, Send } from "lucide-react-native";

import { COLOR } from "@/modules/platform/style/COLOR";

export type IconName = "plus" | "send";
export type IconTone = "default" | "accent" | "accentText" | "secondary" | "tertiary";

export type IconProps = {
  name: IconName;
  size?: number;
  tone?: IconTone;
};

export function Icon({ name, size = 18, tone = "default" }: IconProps) {
  const color = colorForTone(tone);

  switch (name) {
    case "plus":
      return <Plus color={color} size={size} strokeWidth={2.4} />;
    case "send":
      return <Send color={color} size={size} strokeWidth={2.4} />;
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

function colorForTone(tone: IconTone): string {
  switch (tone) {
    case "default":
      return COLOR.light.text;
    case "accent":
      return COLOR.light.accent;
    case "accentText":
      return COLOR.light.accentText;
    case "secondary":
      return COLOR.light.textSecondary;
    case "tertiary":
      return COLOR.light.textTertiary;
    default: {
      const _exhaustive: never = tone;
      return _exhaustive;
    }
  }
}
