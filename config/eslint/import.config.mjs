/**
 * ESLint configuration for managing and sorting imports.
 *
 * This configuration is designed to enforce a consistent import order and improve module resolution.
 */

import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";

export const importConfigs = [
  {
    name: "plugin/simple-import-sort",
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
];
