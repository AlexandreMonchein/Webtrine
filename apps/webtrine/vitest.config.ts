import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

const dirname =
  typeof __dirname === "undefined"
    ? path.dirname(fileURLToPath(import.meta.url))
    : __dirname;

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      storybookTest({
        configDir: path.join(dirname, ".storybook"),
        storybookScript: "pnpm storybook --ci",
      }),
    ],
    test: {
      globals: true, // Added globals option (sometimes required for Storybook/Vitest)
      environment: "jsdom", // Add jsdom environment for DOM testing
      browser: {
        enabled: true,
        name: "chromium",
        provider: "playwright",
        headless: true,
      },
      setupFiles: [".storybook/vitest.setup.ts"],
      coverage: {
        exclude: ["./build"],
      },
    },
  }),
);
