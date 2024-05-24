import _ from "lodash";
import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle<{ globalStyle }>`
      :root {
      --font-family: ${(props) => _.get(props, "globalStyle.font-family")};

      --navbar-font-size: ${(props) => _.get(props, "globalStyle.navbar-font-size")};
      --title-font-size: ${(props) => _.get(props, "globalStyle.title-font-size")};
      --subtitle-font-size: ${(props) => _.get(props, "globalStyle.subtitle-font-size")};
      --text-font-size: ${(props) => _.get(props, "globalStyle.text-font-size")};

      --color-primary: ${(props) => _.get(props, "globalStyle.color-primary")};
      --color-secondary: ${(props) => _.get(props, "globalStyle.color-secondary")};
      --color-tertiary: ${(props) => _.get(props, "globalStyle.color-tertiary")};
      --color-quaternary: ${(props) => _.get(props, "globalStyle.color-quaternary")};
      --color-quinary: ${(props) => _.get(props, "globalStyle.color-quinary")};

      --hover-color: ${(props) => _.get(props, "globalStyle.hover-color")};
      --hover-border-color: ${(props) => _.get(props, "globalStyle.hover-border-color")};
      
      --background-color-1: var(--color-primary);
      --background-color-2: var(--color-secondary);

      --z-index-navbars: 3;
      --z-index-text: 2;
      --z-index-backgrounds: 1;

      font-family: var(--font-family);
      margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;  
    }

  [data-theme="dark"] {

  }

  @media screen and (prefers-color-scheme: dark) {
    :root {
      --font-family: ${(props) => _.get(props, "globalStyle.font-family")};

      --navbar-font-size: ${(props) => _.get(props, "globalStyle.navbar-font-size")};
      --title-font-size: ${(props) => _.get(props, "globalStyle.title-font-size")};
      --subtitle-font-size: ${(props) => _.get(props, "globalStyle.subtitle-font-size")};
      --text-font-size: ${(props) => _.get(props, "globalStyle.text-font-size")};

      --color-primary: ${(props) => _.get(props, "globalStyle.color-primary")};
      --color-secondary: ${(props) => _.get(props, "globalStyle.color-secondary")};
      --color-tertiary: ${(props) => _.get(props, "globalStyle.color-tertiary")};
      --color-quaternary: ${(props) => _.get(props, "globalStyle.color-quaternary")};
      --color-quinary: ${(props) => _.get(props, "globalStyle.color-quinary")};
      
      --background-color-1: var(--color-primary);
      --background-color-2: var(--color-secondary);

      --z-index-navbars: 3;
      --z-index-text: 2;
      --z-index-backgrounds: 1;

      font-family: var(--font-family);
      margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;  
    }
  }
`;
