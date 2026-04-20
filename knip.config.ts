import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    // App entrypoints
    "src/index.tsx",
    "src/App.tsx",
    // Vite config
    "vite.config.js",
    // Server
    "server.js",
    // Scripts
    "scripts/**/*.{js,ts}",
  ],
  project: ["src/**/*.{ts,tsx,js,jsx}"],
  ignore: [
    // Build output
    "build/**",
    "storybook-static/**",
    "playwright-report/**",
    "test-results/**",
    // Config files handled by their own plugins
    "postcss.config.js",
  ],
  ignoreDependencies: [
    // Required by CRA/react-scripts but not directly imported
    "react-scripts",
    // PostCSS plugins referenced in postcss.config.js (not imported in code)
    "postcss-custom-media",
    "postcss-import",
  ],
  // Plugin configurations
  storybook: {
    entry: ["src/**/*.stories.{tsx,ts,jsx,js}", ".storybook/**/*.{ts,js}"],
  },
  playwright: {
    entry: ["tests/e2e/**/*.{ts,js}", "playwright.config.ts"],
  },
  vitest: {
    entry: [
      "src/**/__tests__/**/*.{ts,tsx}",
      "vitest.config.ts",
      "vitest.component.config.ts",
    ],
  },
};

export default config;
