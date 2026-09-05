import BootSplash from "react-native-bootsplash";

export function hideSplash(): Promise<void> {
  return BootSplash.hide({ fade: true });
}
