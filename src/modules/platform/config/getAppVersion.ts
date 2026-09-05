import Constants from "expo-constants";

export function getAppVersion(): string {
  const version = Constants.expoConfig?.version;

  if (version == null || version.length === 0) {
    return "0.0.0";
  }

  return version;
}
