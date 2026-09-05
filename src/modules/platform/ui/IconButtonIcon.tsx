import { Icon, type IconName } from "./Icon";
import { type IconButtonVariant } from "./IconButton";
import { useIconButtonContext } from "./IconButtonContext";

export type IconButtonIconProps = {
  name: IconName;
  size?: number;
};

export function IconButtonIcon({ name, size }: IconButtonIconProps) {
  const { variant } = useIconButtonContext();

  return <Icon name={name} size={size} tone={toneForVariant(variant)} />;
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
