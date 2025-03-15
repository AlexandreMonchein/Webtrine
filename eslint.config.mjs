import path from "node:path";
import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginEslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

import { baseConfig } from "./config/eslint/base.config.mjs";
import { configConfigs } from "./config/eslint/configFiles.config.mjs";
import { importConfigs } from "./config/eslint/import.config.mjs";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const gitignorePath = path.resolve(__dirname, ".gitignore");

export default tseslint.config([
  includeIgnoreFile(gitignorePath),
  stylistic.configs["all"],
  {
    name: "stylistic",
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0 }],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],
    },
  },
  {
    name: "global/files",
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
  {
    ...pluginJs.configs.recommended,
    name: "plugin/eslintjs",
  },
  ...tseslint.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    name: "plugin/react",
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
    name: "plugin/react-hook",
  },
  {
    name: "plugin/react-compiler",
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "warn",
    },
  },
  ...importConfigs,
  {
    ...jsxA11y.flatConfigs.strict,
    name: "plugin/jsx-a11y",
  },
  baseConfig,
  {
    name: "global/typescript",
    files: ["**/*.{ts,tsx}"],
    rules: {
      "react/prop-types": "off",
    },
  },
  ...configConfigs,
  {
    name: "config/storybook",
    files: ["apps/app-storybook/**/*"],
    rules: {
      "jstools/no-nullish-coalescing-operator": "off",
    },
  },
  {
    ...pluginEslintPluginPrettierRecommended,
    name: "plugin/prettier",
  },
]);
