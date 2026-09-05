import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";

export function initLogger(): void {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    enableLogs: true,
    tracesSampleRate: __DEV__ ? 1.0 : 0.1,
    environment: __DEV__ ? "development" : "production",
    enableNativeFramesTracking: !isRunningInExpoGo(),
  });
}
