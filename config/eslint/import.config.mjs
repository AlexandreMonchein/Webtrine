/**
 * ESLint configuration for managing and sorting imports.
 *
 * This configuration is designed to enforce a consistent import order and improve module resolution.
 */

import { flatConfigs as importFlatConfigs } from "eslint-plugin-import";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import nodeModule from "module";

export const importConfigs = [
  {
    name: "plugin/simple-import-sort",
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          // The default grouping is done alphabetically, and with a blank lines between all.
          groups: [
            // Side effect imports. eg: `import '../../bibi.js';`
            ["^\\u0000"],
            // Module import. eg: `import * as fs from "node:fs";`
            [`^(${nodeModule.builtinModules.join("|")})(/|$)`],
            // Packages related to react. eg: `import React from 'react';`
            ["^react", "^prop-types"],
            /*
             * Packages. eg: `import { createThunk } from '@reduxjs/toolkit'; or `import { writeFile } from 'fs';`
             * Things that start with a letter (or digit or underscore), or `@` followed by a letter.
             */
            ["^@?\\w"],
            /*
             * Parent imports. Sort by most deep first.
             * eg: `import { bib } from '../../bibi';` before `import { ibi } from '../croco';`
             */
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            /*
             * Relative imports. Sort by most deep first.
             * eg: `import { bib } from './bibi/bar';` before `import { ibi } from './foo';`
             */
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports. eg: import './bibi.style.scss';'
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "import/order": "off",
      "import/no-unresolved": [
        "error",
        {
          commonjs: true,
          caseSensitive: true,
          caseSensitiveStrict: false,
        },
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "import/no-cycle": "off",
      "import/no-dynamic-require": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],
      "import/prefer-default-export": "off",
      "import/no-relative-packages": "error",
      "no-restricted-imports": "error",
      "import/no-named-as-default": "error",
      "import/no-named-as-default-member": "error",
      "simple-import-sort/exports": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": ["error", { "prefer-inline": true }],
    },
  },
  {
    ...importFlatConfigs.recommended,
    name: "plugin/import",
    settings: {
      "import/resolver": {
        typescript: {
          // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
          alwaysTryTypes: true,
        },
      },
    },
  },
];
