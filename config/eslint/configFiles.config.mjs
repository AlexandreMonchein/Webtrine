/**
 * ESLint configuration for our project configuration files.
 *
 * This configuration is used to enforce specific rules for the config/ folder.
 */

export const configConfigs = [
  {
    name: "config/webpack",
    files: ["config/webpack/plugins/**/*"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [{ name: "lodash-es" }, { name: "crypto-js" }],
        },
      ],
    },
  },
];
