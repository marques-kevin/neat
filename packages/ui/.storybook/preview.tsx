import type { Preview } from "@storybook/react";
import { IntlProvider } from "react-intl";
import { TooltipProvider } from "../src/components/ui/tooltip";
import en from "../src/i18n/locales/en.json";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "padded",
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "oklch(0.97 0 0)" },
        { name: "card", value: "oklch(1 0 0)" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en" messages={en}>
        <TooltipProvider>
          <div className="bg-background p-6 text-foreground">
            <Story />
          </div>
        </TooltipProvider>
      </IntlProvider>
    ),
  ],
};

export default preview;
