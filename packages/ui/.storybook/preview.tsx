import type { Preview } from "@storybook/react";
import { IntlProvider } from "react-intl";
import en from "../src/i18n/locales/en.json";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en" messages={en}>
        <div className="bg-slate-100 p-6">
          <Story />
        </div>
      </IntlProvider>
    ),
  ],
};

export default preview;
