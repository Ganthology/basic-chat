const { spawnSync } = require("node:child_process");
const { copyFileSync, existsSync, mkdirSync, readFileSync } = require("node:fs");
const { join } = require("node:path");

const VARIANTS = {
  "arm64-v8a": "arm64-v8a",
  "armeabi-v7a": "armeabi-v7a",
  "x86_64": "x86_64",
  universal: "armeabi-v7a,arm64-v8a,x86,x86_64",
};

const GRADLE_SKIP_LINT = ["-x", "lintVitalAnalyzeRelease", "-x", "lintVitalRelease"];

function readVersion(root) {
  return JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
}

function parseVariants(argv) {
  if (argv.includes("--all")) {
    return Object.keys(VARIANTS);
  }

  return ["arm64-v8a"];
}

function assemble(androidDir, architectures) {
  const gradle = spawnSync(
    "./gradlew",
    [":app:assembleRelease", `-PreactNativeArchitectures=${architectures}`, ...GRADLE_SKIP_LINT],
    { cwd: androidDir, stdio: "inherit" },
  );

  if (gradle.status !== 0) {
    process.exit(gradle.status ?? 1);
  }
}

function copyBuiltApk(builtApk, dest) {
  if (!existsSync(builtApk)) {
    console.error(`Release APK not found at ${builtApk}`);
    process.exit(1);
  }

  copyFileSync(builtApk, dest);
  console.log(`Wrote ${dest}`);
}

function main() {
  const root = join(__dirname, "..");
  const androidDir = join(root, "android");
  const builtApk = join(androidDir, "app/build/outputs/apk/release/app-release.apk");
  const outDir = join(root, "dist/apk");
  const version = readVersion(root);

  if (!existsSync(androidDir)) {
    console.error("android/ is missing. Run: npx expo prebuild --platform android");
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });

  for (const name of parseVariants(process.argv.slice(2))) {
    const architectures = VARIANTS[name];
    if (architectures == null) {
      console.error(`Unknown variant: ${name}`);
      process.exit(1);
    }

    assemble(androidDir, architectures);
    copyBuiltApk(builtApk, join(outDir, `basic-chat-${version}-${name}.apk`));

    if (name === "arm64-v8a") {
      copyBuiltApk(builtApk, join(root, "basic-chat.apk"));
    }
  }
}

main();
