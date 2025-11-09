/**
 * ESLint basic configuration for the application.
 *
 * This configuration defines general rules for the entire application, covering various aspects such as React,
 * TypeScript, i18n, and JS tools, without being tied to a specific context.
 */

import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";

export const baseConfig = {
  name: "config/base",
  rules: {
    /**
     * a11y rules
     */
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/aria-role": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/iframe-has-title": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/media-has-caption": "off",
    "jsx-a11y/mouse-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-autofocus": "off",

    /**
     * React-hooks rules
     */
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",

    /**
     * Typescript rules
     */
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        caughtErrors: "none",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/consistent-type-imports": "off", // Désactiver temporairement
    // We must disable the base rule https://typescript-eslint.io/rules/no-use-before-define/#how-to-use
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-wrapper-object-types": "error",
    "@typescript-eslint/no-namespace": "off", // Désactiver les erreurs de namespace

    /**
     * Core ESLint rules à désactiver temporairement
     */
    // "no-inline-comments": "off", - Déjà défini plus haut
    // "no-console": "off", - Déjà défini plus haut
    // "no-restricted-syntax": "off", - Déjà défini plus bas
    // "no-await-in-loop": "off", - Déjà défini plus haut
    // "no-negated-condition": "off", - Déjà défini plus haut
    // "no-nested-ternary": "off", - Déjà défini plus haut
    // "no-case-declarations": "off", - Déjà défini plus bas

    /**
     * React rules
     */
    "react/jsx-fragments": ["error", "syntax"],
    "react/function-component-definition": "off",
    "react/jsx-no-target-blank": "off",
    "react/jsx-no-useless-fragment": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "react/no-unescaped-entities": "off",
    "react/no-array-index-key": "error",
    "react/button-has-type": "error",
    "react/no-deprecated": "error",
    "react/jsx-key": "error",
    "react/no-unused-prop-types": ["error", { skipShapeProps: true }],
    "react/prop-types": "error",
    "react/display-name": "off",

    /**
     * Basics rules
     */
    camelcase: "off",
    "consistent-return": "error",
    "capitalized-comments": "off",
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-param-reassign": ["error", { props: false }],
    "no-multi-str": "error",
    "no-inline-comments": [
      "error",
      { ignorePattern: "webpackChunkName:\\s.+" },
    ],
    "sort-keys": "off",
    "no-new-func": "error",
    "consistent-this": ["error", "_this"],
    "no-console": "error",
    "max-classes-per-file": ["error", 1],
    "no-extend-native": "error",
    "no-await-in-loop": "error",
    "no-bitwise": "error",
    "no-useless-concat": "error",
    "prefer-template": "error",
    "no-constant-binary-expression": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "ForOfStatement",
        message:
          "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.",
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parser: typescriptParser,
  },
};
