import _ from "lodash";
import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle<{ globalStyle }>`
  :root {
    /* ============================================
       TYPOGRAPHY
       ============================================ */
    --navbar-font-size: ${(props) => _.get(props, "globalStyle.navbar-font-size")};
    --subtitle-font-size: ${(props) => _.get(props, "globalStyle.subtitle-font-size")};
    --text-font-size: ${(props) => _.get(props, "globalStyle.text-font-size")};
    --description-font-size: ${(props) => _.get(props, "globalStyle.description-font-size")};

    /* ============================================
       Z-INDEX
       ============================================ */
    --z-index-navbars: ${(props) => _.get(props, "globalStyle.z-index-navbars")};
    --z-index-text: ${(props) => _.get(props, "globalStyle.z-index-text")};
    --z-index-backgrounds: ${(props) => _.get(props, "globalStyle.z-index-backgrounds")};

    /* ============================================
       BRAND PALETTE
       ============================================ */
    --theme-color-primary: ${(props) => _.get(props, "globalStyle.theme-color-primary")};
    --theme-color-secondary: ${(props) => _.get(props, "globalStyle.theme-color-secondary")};
    --theme-color-tertiary: ${(props) => _.get(props, "globalStyle.theme-color-tertiary")};
    --theme-color-quaternary: ${(props) => _.get(props, "globalStyle.theme-color-quaternary")};
    --theme-color-quinary: ${(props) => _.get(props, "globalStyle.theme-color-quinary")};

    /* ============================================
       UTILITY COLORS
       ============================================ */
    --theme-color-utility-1: ${(props) => _.get(props, "globalStyle.theme-color-utility-1")};
    --theme-color-utility-2: ${(props) => _.get(props, "globalStyle.theme-color-utility-2")};
    --theme-color-utility-3: ${(props) => _.get(props, "globalStyle.theme-color-utility-3")};
    --theme-color-utility-4: ${(props) => _.get(props, "globalStyle.theme-color-utility-4")};

    /* ============================================
       EXTENDED PALETTE
       ============================================ */
    --theme-color-hover: ${(props) => _.get(props, "globalStyle.theme-color-hover")};
    --theme-color-background-1: ${(props) => _.get(props, "globalStyle.theme-color-background-1")};
    --theme-color-background-2: ${(props) => _.get(props, "globalStyle.theme-color-background-2")};
  }
`;
