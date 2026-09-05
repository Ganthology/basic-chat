import { IconButton, type IconButtonProps } from "@/modules/platform/ui/IconButton";

export type ComposerIconButtonProps = Omit<IconButtonProps, "size" | "variant">;

function ComposerIconButtonRoot(props: ComposerIconButtonProps) {
  return <IconButton size="sm" variant="filled" {...props} />;
}

export const ComposerIconButton = Object.assign(ComposerIconButtonRoot, {
  Icon: IconButton.Icon,
});
