import { type LucideIcon } from "lucide-react-native";

import { COLOR } from "@/modules/platform/style/COLOR";

export type IconTone = "default" | "accent" | "accentText" | "secondary" | "tertiary";

export type IconProps = {
  icon: LucideIcon;
  size?: number;
  tone?: IconTone;
};

export function Icon({ icon: Glyph, size = 18, tone = "default" }: IconProps) {
  return <Glyph color={colorForTone(tone)} size={size} strokeWidth={2.4} />;
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
