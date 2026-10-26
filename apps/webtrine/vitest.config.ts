import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

const dirname =
  typeof __dirname === "undefined"
    ? path.dirname(fileURLToPath(import.meta.url))
    : __dirname;

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ["react-helmet"], // évite un rechargement de Vite en cours de run
    },
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
        provider: playwright(),
        instances: [{ browser: "chromium" }],
        headless: true,
      },
      setupFiles: [".storybook/vitest.setup.ts"],
      coverage: {
        exclude: ["./build"],
      },
    },
  }),
);
