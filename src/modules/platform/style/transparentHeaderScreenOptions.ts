import { Platform } from "react-native";

import { COLOR } from "./COLOR";
import { FONT_FAMILY } from "./FONT_FAMILY";

const titleStyle = {
  fontFamily: FONT_FAMILY.display.bold,
  color: COLOR.light.text,
} as const;

const sharedHeaderScreenOptions = {
  headerShadowVisible: false,
  headerLargeTitleShadowVisible: false,
  headerBlurEffect: "none",
  headerBackButtonDisplayMode: "minimal",
  headerTitleStyle: titleStyle,
  headerLargeTitleStyle: titleStyle,
  headerTintColor: COLOR.light.text,
} as const;

const iosHeaderScreenOptions = {
  headerTransparent: true,
  headerStyle: { backgroundColor: "transparent" },
  headerLargeStyle: { backgroundColor: "transparent" },
} as const;

const androidHeaderScreenOptions = {
  headerTransparent: false,
  headerStyle: { backgroundColor: COLOR.light.background },
  headerLargeStyle: { backgroundColor: COLOR.light.background },
  statusBarStyle: "dark",
  statusBarTranslucent: true,
} as const;

export const transparentHeaderScreenOptions = {
  ...sharedHeaderScreenOptions,
  ...(Platform.OS === "ios" ? iosHeaderScreenOptions : androidHeaderScreenOptions),
};
