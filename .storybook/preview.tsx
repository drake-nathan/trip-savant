import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";

import { cn } from "@/lib/utils";
import { varelaRound } from "@/styles/fonts";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    tags: ["autodocs"],
  },
  decorators: [
    (Story) => (
      <div className={cn("font-varela-round", varelaRound.variable)}>
        <Story />
      </div>
    ),
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
