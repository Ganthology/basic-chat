import { type LucideIcon } from "lucide-react-native";

import { Icon } from "../Icon";
import { type IconButtonVariant } from "./IconButton";
import { useIconButtonContext } from "./IconButtonContext";

export type IconButtonIconProps = {
  icon: LucideIcon;
  size?: number;
};

export function IconButtonIcon({ icon, size }: IconButtonIconProps) {
  const { variant } = useIconButtonContext();

  return <Icon icon={icon} size={size} tone={toneForVariant(variant)} />;
}

function toneForVariant(variant: IconButtonVariant) {
  switch (variant) {
    case "container":
      return "accent" as const;
    case "filled":
      return "accentText" as const;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}
