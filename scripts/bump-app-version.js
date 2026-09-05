const { readFileSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;
const BUMPS = new Set(["major", "minor", "patch"]);

function parseSemver(version) {
  const match = SEMVER.exec(version);

  if (match == null) {
    throw new Error(`Invalid semver: ${version}`);
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function formatSemver({ major, minor, patch }) {
  return `${major}.${minor}.${patch}`;
}

function bumpSemver(version, bump) {
  const parsed = parseSemver(version);

  switch (bump) {
    case "major":
      return formatSemver({ major: parsed.major + 1, minor: 0, patch: 0 });
    case "minor":
      return formatSemver({ major: parsed.major, minor: parsed.minor + 1, patch: 0 });
    case "patch":
      return formatSemver({
        major: parsed.major,
        minor: parsed.minor,
        patch: parsed.patch + 1,
      });
    default: {
      const _exhaustive = bump;
      throw new Error(`Unknown bump: ${_exhaustive}`);
    }
  }
}

function readPackageVersion(manifestPath) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return { manifest, version: manifest.version };
}

function writePackageVersion(manifestPath, manifest, version) {
  writeFileSync(manifestPath, `${JSON.stringify({ ...manifest, version }, null, 2)}\n`);
}

function parseArgs(argv) {
  if (argv[0] === "--set") {
    const version = argv[1];
    if (version == null) {
      throw new Error("Usage: bump-app-version.js --set <x.y.z>");
    }
    parseSemver(version);
    return { kind: "set", version };
  }

  const bump = argv[0] ?? "patch";
  if (!BUMPS.has(bump)) {
    throw new Error("Usage: bump-app-version.js [major|minor|patch] | --set <x.y.z>");
  }

  return { kind: "bump", bump };
}

function main() {
  const action = parseArgs(process.argv.slice(2));
  const manifestPath = join(process.cwd(), "package.json");
  const { manifest, version: current } = readPackageVersion(manifestPath);
  const next = action.kind === "set" ? action.version : bumpSemver(current, action.bump);

  writePackageVersion(manifestPath, manifest, next);
  process.stdout.write(`${next}\n`);
}

main();
