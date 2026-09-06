import { useEffect } from "react";
import { StatusBar } from "react-native";

export function useDarkStatusBarIcons() {
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
  }, []);
}
