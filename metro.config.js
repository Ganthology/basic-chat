const { existsSync } = require("node:fs");
const { join } = require("node:path");

const { getDefaultConfig } = require("expo/metro-config");
const { withStorybook } = require("@storybook/react-native/withStorybook");

const config = getDefaultConfig(__dirname);

const storybookEnabled =
  process.env.STORYBOOK_ENABLED === "true" ||
  existsSync(join(__dirname, ".rnstorybook", "enabled"));

module.exports = withStorybook(config, { enabled: storybookEnabled });
