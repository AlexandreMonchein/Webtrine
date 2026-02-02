import type { Preview } from "@storybook/react";
import { useEffect, useState } from "react";

import { getCustomer } from "../src/customer.utils";
import GlobalStyle from "../src/theme/customer/default/globalStyled";

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
  const [RootStyle, setRootStyle] = useState<any>(null);
  const [styleConfig, setStyleConfig] = useState({});

  useEffect(() => {
    const loadStyles = async () => {
      try {
        // Load customer-specific global styles
        const module = await import(
          `../src/theme/customer/${customer}/globalStyles.ts`
        );
        setRootStyle(() => module.RootStyle);

        // Load customer-specific style config
        const config = await loadConfig();
        setStyleConfig(config);
      } catch (error) {
        console.error("Error loading customer styles:", error);
      }
    };

    loadStyles();
  }, []);

  return (
    <>
      <GlobalStyle />
      {RootStyle && <RootStyle globalStyle={{ ...styleConfig }} />}
      {children}
    </>
  );
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
