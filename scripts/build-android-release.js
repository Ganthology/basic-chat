const { spawnSync } = require("node:child_process");
const { copyFileSync, existsSync } = require("node:fs");
const { join } = require("node:path");

const root = join(__dirname, "..");
const androidDir = join(root, "android");
const builtApk = join(androidDir, "app/build/outputs/apk/release/app-release.apk");
const destApk = join(root, "basic-chat.apk");

if (!existsSync(androidDir)) {
  console.error("android/ is missing. Run: npx expo prebuild --platform android");
  process.exit(1);
}

const gradle = spawnSync(
  "./gradlew",
  [
    ":app:assembleRelease",
    "-PreactNativeArchitectures=arm64-v8a",
    "-x",
    "lintVitalAnalyzeRelease",
    "-x",
    "lintVitalRelease",
  ],
  { cwd: androidDir, stdio: "inherit" },
);

if (gradle.status !== 0) {
  process.exit(gradle.status ?? 1);
}

if (!existsSync(builtApk)) {
  console.error(`Release APK not found at ${builtApk}`);
  process.exit(1);
}

copyFileSync(builtApk, destApk);
console.log(`Wrote ${destApk}`);
