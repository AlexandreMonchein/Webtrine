import path from "node:path";
import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginEslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
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
  stylistic.configs.recommended,
  {
    name: "stylistic",
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      // Désactiver temporairement la plupart des règles stylistic
      "@stylistic/quotes": "off",
      "@stylistic/semi": "off",
      "@stylistic/member-delimiter-style": "off",
      "@stylistic/arrow-parens": "off",
      "@stylistic/multiline-ternary": "off",
      "@stylistic/indent": "off",
      "@stylistic/brace-style": "off",
      "@stylistic/operator-linebreak": "off",
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/padding-line-between-statements": "off",
      "@stylistic/eol-last": "off",
      "@stylistic/padded-blocks": "off",
      "@stylistic/object-curly-spacing": "off",
      "@stylistic/quote-props": "off",
      "@stylistic/comma-dangle": "off",
      // Garder quelques règles utiles
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0 }],
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
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off", // React 17+ n'a plus besoin d'importer React
      "react/jsx-uses-react": "off", // React 17+
    },
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
    name: "plugin/react-hook",
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
    ...pluginEslintPluginPrettierRecommended,
    name: "plugin/prettier",
  },
]);
