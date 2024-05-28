import _ from "lodash";
import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle<{ globalStyle }>`
  :root {
    --font-family: ${(props) => _.get(props, "globalStyle.light.font-family")};

    --navbar-font-size: ${(props) => _.get(props, "globalStyle.light.navbar-font-size")};
    --title-font-size: ${(props) => _.get(props, "globalStyle.light.title-font-size")};
    --subtitle-font-size: ${(props) => _.get(props, "globalStyle.light.subtitle-font-size")};
    --text-font-size: ${(props) => _.get(props, "globalStyle.light.text-font-size")};

    --color-primary: ${(props) => _.get(props, "globalStyle.light.color-primary")};
    --color-secondary: ${(props) => _.get(props, "globalStyle.light.color-secondary")};
    --color-tertiary: ${(props) => _.get(props, "globalStyle.light.color-tertiary")};
    --color-quaternary: ${(props) => _.get(props, "globalStyle.light.color-quaternary")};
    --color-quinary: ${(props) => _.get(props, "globalStyle.light.color-quinary")};

    --hover-color: ${(props) => _.get(props, "globalStyle.light.hover-color")};
    --hover-border-color: ${(props) => _.get(props, "globalStyle.light.hover-border-color")};
    
    --navigation-text-color: ${(props) => _.get(props, "globalStyle.light.navigation-text-color")};

    --background-color-1: var(--color-primary);
    --background-color-2: var(--color-secondary);

    --text-color-primary: var(--color-primary);
    --text-color-secondary: var(--color-quinary);
    --text-color-tertiary: var(--color-tertiary);

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
    --font-family: ${(props) => _.get(props, "globalStyle.dark.font-family")};

    --navbar-font-size: ${(props) => _.get(props, "globalStyle.dark.navbar-font-size")};
    --title-font-size: ${(props) => _.get(props, "globalStyle.dark.title-font-size")};
    --subtitle-font-size: ${(props) => _.get(props, "globalStyle.dark.subtitle-font-size")};
    --text-font-size: ${(props) => _.get(props, "globalStyle.dark.text-font-size")};

    --color-primary: ${(props) => _.get(props, "globalStyle.dark.color-primary")};
    --color-secondary: ${(props) => _.get(props, "globalStyle.dark.color-secondary")};
    --color-tertiary: ${(props) => _.get(props, "globalStyle.dark.color-tertiary")};
    --color-quaternary: ${(props) => _.get(props, "globalStyle.dark.color-quaternary")};
    --color-quinary: ${(props) => _.get(props, "globalStyle.dark.color-quinary")};

    --hover-color: ${(props) => _.get(props, "globalStyle.dark.hover-color")};
    --hover-border-color: ${(props) => _.get(props, "globalStyle.dark.hover-border-color")};

    --navigation-text-color: ${(props) => _.get(props, "globalStyle.dark.navigation-text-color")};

    --background-color-1: var(--color-primary);
    --background-color-2: var(--color-secondary);

    --text-color-primary: var(--color-primary);
    --text-color-secondary: var(--color-quinary);
    --text-color-tertiary: var(--color-tertiary);
    
  }

  @media screen and (prefers-color-scheme: dark) {
    --font-family: ${(props) => _.get(props, "globalStyle.dark.font-family")};

    --navbar-font-size: ${(props) => _.get(props, "globalStyle.dark.navbar-font-size")};
    --title-font-size: ${(props) => _.get(props, "globalStyle.dark.title-font-size")};
    --subtitle-font-size: ${(props) => _.get(props, "globalStyle.dark.subtitle-font-size")};
    --text-font-size: ${(props) => _.get(props, "globalStyle.dark.text-font-size")};

    --color-primary: ${(props) => _.get(props, "globalStyle.dark.color-primary")};
    --color-secondary: ${(props) => _.get(props, "globalStyle.dark.color-secondary")};
    --color-tertiary: ${(props) => _.get(props, "globalStyle.dark.color-tertiary")};
    --color-quaternary: ${(props) => _.get(props, "globalStyle.dark.color-quaternary")};
    --color-quinary: ${(props) => _.get(props, "globalStyle.dark.color-quinary")};

    --hover-color: ${(props) => _.get(props, "globalStyle.dark.hover-color")};
    --hover-border-color: ${(props) => _.get(props, "globalStyle.dark.hover-border-color")};

    --navigation-text-color: ${(props) => _.get(props, "globalStyle.dark.navigation-text-color")};

    --background-color-1: var(--color-primary);
    --background-color-2: var(--color-secondary);

    --text-color-primary: var(--color-primary);
    --text-color-secondary: var(--color-quinary);
    --text-color-tertiary: var(--color-tertiary);
  }
`;
