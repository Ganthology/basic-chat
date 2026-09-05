import { COLOR } from "./COLOR";
import { FONT_FAMILY } from "./FONT_FAMILY";

const titleStyle = {
  fontFamily: FONT_FAMILY.display.bold,
  color: COLOR.light.text,
} as const;

export const transparentHeaderScreenOptions = {
  headerTransparent: true,
  headerShadowVisible: false,
  headerLargeTitleShadowVisible: false,
  headerBlurEffect: "none",
  headerBackButtonDisplayMode: "minimal",
  headerStyle: { backgroundColor: "transparent" },
  headerLargeStyle: { backgroundColor: "transparent" },
  headerTitleStyle: titleStyle,
  headerLargeTitleStyle: titleStyle,
  headerTintColor: COLOR.light.text,
} as const;
