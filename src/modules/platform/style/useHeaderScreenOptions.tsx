import { Platform } from "react-native";

import { AndroidStackHeader, type AndroidStackHeaderProps } from "./AndroidStackHeader";
import { transparentHeaderScreenOptions } from "./transparentHeaderScreenOptions";

export function useHeaderScreenOptions() {
  if (Platform.OS !== "android") {
    return transparentHeaderScreenOptions;
  }

  return {
    ...transparentHeaderScreenOptions,
    header: (props: AndroidStackHeaderProps) => <AndroidStackHeader {...props} />,
  };
}
