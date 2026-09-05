/* global __dirname */
const { spawn } = require("node:child_process");
const { unlinkSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const root = join(__dirname, "..");
const flagPath = join(root, ".rnstorybook", "enabled");

writeFileSync(flagPath, "1");

const child = spawn("npx", ["expo", "start", "--ios", ...process.argv.slice(2)], {
  cwd: root,
  env: { ...process.env, STORYBOOK_ENABLED: "true" },
  stdio: "inherit",
});

function cleanup() {
  try {
    unlinkSync(flagPath);
  } catch {
    // flag already gone
  }
}

child.on("exit", (code) => {
  cleanup();
  process.exit(code ?? 0);
});

process.on("SIGINT", () => {
  child.kill("SIGINT");
});
process.on("SIGTERM", () => {
  child.kill("SIGTERM");
});
