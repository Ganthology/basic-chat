import { ChevronLeft } from "lucide-react-native";
import { type ReactNode, useEffect } from "react";
import { PixelRatio, Pressable, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLOR } from "./COLOR";
import { createStyles } from "./createStyles";
import { Heading } from "@/modules/platform/ui/Heading";
import { Icon } from "@/modules/platform/ui/Icon";

type HeaderTitleProp =
  | string
  | ((props: { children: string; tintColor?: string }) => ReactNode);

export type AndroidStackHeaderProps = {
  back?: { title?: string };
  navigation: { goBack: () => void };
  options: {
    title?: string;
    headerTitle?: HeaderTitleProp;
    headerTintColor?: string;
    headerLargeTitle?: boolean;
  };
  route: { name: string };
};

export function AndroidStackHeader({
  back,
  navigation,
  options,
  route,
}: AndroidStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, StatusBar.currentHeight ?? 0, PixelRatio.get() * 24);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
  }, []);
  const title = options.title ?? route.name;
  const headerTitle = options.headerTitle;

  return (
    <View style={[styles.bar, { paddingTop: topInset }]}>
      <View style={styles.row}>
        {back ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={8}
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            <Icon icon={ChevronLeft} size={24} />
          </Pressable>
        ) : null}
        <View style={styles.title}>
          {typeof headerTitle === "function" ? (
            headerTitle({
              children: title,
              tintColor: options.headerTintColor ?? COLOR.light.text,
            })
          ) : (
            <Heading size={options.headerLargeTitle ? "3xl" : "xl"} numberOfLines={1}>
              {typeof headerTitle === "string" ? headerTitle : title}
            </Heading>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = createStyles(({ color, padding, spacing }) => ({
  bar: {
    backgroundColor: color.background,
    paddingHorizontal: padding.md,
  },
  row: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  back: {
    width: 40,
    justifyContent: "center",
  },
  title: {
    flex: 1,
    justifyContent: "center",
  },
}));
