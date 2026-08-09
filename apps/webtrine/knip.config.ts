import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    // App entrypoints
    "src/index.tsx",
    "src/App.tsx",
    // Vite config
    "vite.config.js",
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
  // Known false positives since the workspace move: the shared eslint flat config
  // lives at the repo root (../../eslint.config.mjs + ../../config/eslint/*), and
  // knip's single-workspace analysis cannot attribute its imports to this package.
  // It therefore reports ~9 eslint-related devDependencies as unused — they are not.
  // Deliberately NOT silenced via ignoreDependencies so a real unused dep still shows.
  // Endgame: move lint tooling to root devDependencies in a later plan.
  ignoreDependencies: [
    // Required by CRA/react-scripts but not directly imported
    "react-scripts",
    // PostCSS plugins referenced in postcss.config.js (not imported in code)
    "postcss-custom-media",
    "postcss-import",
  ],
  // Plugin configurations
  // stylelint config stays at the monorepo root (shared tooling, see
  // 63c7c42 "move app into apps/webtrine pnpm workspace") -- point the
  // plugin there explicitly so its "extends"/"plugins" resolve correctly
  // and knip doesn't flag stylelint/stylelint-config-standard as unused.
  stylelint: {
    config: ["../../.stylelintrc.json"],
  },
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
