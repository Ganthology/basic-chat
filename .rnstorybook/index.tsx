import "@expo/metro-runtime";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRootComponent } from "expo";
import { UNSTABLE_UnhandledLinkingContext as UnhandledLinkingContext } from "expo-router/build/react-navigation/native";
import { useEffect, useState, type ComponentType } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

function StorybookScreen() {
  const [lastUnhandledLink, setLastUnhandledLink] = useState<string | undefined>();
  const [StorybookUI, setStorybookUI] = useState<ComponentType | null>(null);

  useEffect(() => {
    // Load after providers mount. storybook.requires start() throws
    // UnhandledLinkingContext if expo-router's nav patch runs at import time.
    void import("./storybook.requires").then(({ view }) => {
      const UI = view.getStorybookUI({
        storage: {
          getItem: AsyncStorage.getItem,
          setItem: AsyncStorage.setItem,
        },
      });
      setStorybookUI(() => UI);
    });
  }, []);

  return (
    <UnhandledLinkingContext.Provider value={{ lastUnhandledLink, setLastUnhandledLink }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>{StorybookUI ? <StorybookUI /> : null}</SafeAreaProvider>
      </GestureHandlerRootView>
    </UnhandledLinkingContext.Provider>
  );
}

registerRootComponent(StorybookScreen);
