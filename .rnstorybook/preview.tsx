import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import { type Preview } from "@storybook/react-native";
import { type ReactNode } from "react";

import { COLOR } from "@/modules/platform/style/COLOR";
import { useLoadFonts } from "@/modules/platform/style/useLoadFonts";

function WithFonts({ children }: { children: ReactNode }) {
  const loaded = useLoadFonts();
  if (!loaded) {
    return null;
  }
  return children;
}

const preview: Preview = {
  decorators: [
    withBackgrounds,
    (Story) => (
      <WithFonts>
        <Story />
      </WithFonts>
    ),
  ],
  parameters: {
    backgrounds: {
      default: "background",
      values: [
        { name: "background", value: COLOR.light.background },
        { name: "container", value: COLOR.light.container },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
