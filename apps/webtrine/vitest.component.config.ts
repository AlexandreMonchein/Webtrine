import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test-setup.ts"],
      include: [
        "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
        "src/**/__tests__/**/*.int.{js,ts,jsx,tsx}",
      ],
      exclude: [
        "node_modules",
        "dist",
        "build",
        "**/*.stories.{js,ts,jsx,tsx}",
      ],
      coverage: {
        exclude: ["./build", "**/*.stories.{js,ts,jsx,tsx}"],
        reporter: ["text", "json", "html"],
      },
    },
  }),
);
