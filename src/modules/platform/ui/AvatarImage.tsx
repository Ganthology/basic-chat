import { Image, type ImageProps } from "expo-image";

import { createStyles } from "@/modules/platform/style/createStyles";

export type AvatarImageProps = ImageProps;

export function AvatarImage({ contentFit = "cover", style, ...rest }: AvatarImageProps) {
  return <Image contentFit={contentFit} {...rest} style={[styles.root, style]} />;
}

const styles = createStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
}));
