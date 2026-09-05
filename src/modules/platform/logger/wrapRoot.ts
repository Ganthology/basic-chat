import * as Sentry from "@sentry/react-native";
import type { ComponentType } from "react";

export function wrapRoot(Root: ComponentType): ComponentType {
  return Sentry.wrap(Root as ComponentType<Record<string, unknown>>);
}
