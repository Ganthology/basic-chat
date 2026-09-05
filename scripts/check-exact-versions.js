const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const EXACT_VERSION =
  /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

const SECTIONS = ["dependencies", "devDependencies"];

function collectRangedDeps(manifest) {
  const ranged = [];

  for (const section of SECTIONS) {
    const deps = manifest[section];
    if (deps == null) {
      continue;
    }

    for (const [name, version] of Object.entries(deps)) {
      if (!EXACT_VERSION.test(version)) {
        ranged.push({ section, name, version });
      }
    }
  }

  return ranged;
}

function main() {
  const manifestPath = join(__dirname, "..", "package.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const ranged = collectRangedDeps(manifest);

  if (ranged.length === 0) {
    return;
  }

  for (const { section, name, version } of ranged) {
    console.error(`${section}: ${name}@${version} — use an exact version`);
  }

  process.exitCode = 1;
}

main();
