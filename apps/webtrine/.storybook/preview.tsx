import "../src/theme/customer/default/globalStyle.css";

import type { Preview } from "@storybook/react";
import { useEffect } from "react";

import { getCustomer } from "../src/customer.utils";

// Load customer configuration dynamically
const customer = getCustomer();

// Load style config synchronously
const loadConfig = async () => {
  try {
    const style = await import(
      `../config/customer/${customer}/style.config.json`
    );
    return style.default;
  } catch (error) {
    console.error("Error loading style configuration:", error);
    return {};
  }
};

// Dynamic style loader component
const StyleLoader = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const loadStyles = async () => {
      try {
        // Dynamically import customer-specific CSS variables
        await import(`../src/theme/customer/${customer}/variables.css`);

        // Load customer-specific style config
        const config = await loadConfig();

        // Inject CSS variables into :root
        if (config && typeof config === "object") {
          Object.entries(config).forEach(([key, value]) => {
            document.documentElement.style.setProperty(
              `--${key}-override`,
              String(value),
            );
          });
        }
      } catch (error) {
        console.error("Error loading customer styles:", error);
      }
    };

    loadStyles();
  }, []);

  return <>{children}</>;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      /*
       * 'todo' - show a11y violations in the test UI only
       * 'error' - fail CI on a11y violations
       * 'off' - skip a11y checks entirely
       */
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <StyleLoader>
        <Story />
      </StyleLoader>
    ),
  ],
};

export default preview;
