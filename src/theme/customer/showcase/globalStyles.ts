import _ from "lodash";
import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle<{ globalStyle }>`
 :root {
    // sizes
    --navbar-font-size: ${(props) => _.get(props, "globalStyle.navbar-font-size")};
    --subtitle-font-size: ${(props) => _.get(props, "globalStyle.subtitle-font-size")};
    --text-font-size: ${(props) => _.get(props, "globalStyle.text-font-size")};
    --description-font-size: ${(props) => _.get(props, "globalStyle.description-font-size")};

    // colors
    --white: ${(props) => _.get(props, "globalStyle.white")};
    --light-grey: ${(props) => _.get(props, "globalStyle.light-grey")};
    --blue: ${(props) => _.get(props, "globalStyle.blue")};
    --dark-blue: ${(props) => _.get(props, "globalStyle.dark-blue")};
    --black: ${(props) => _.get(props, "globalStyle.black")};
    --gold: ${(props) => _.get(props, "globalStyle.gold")};

    --hover-color: var(--gold);
    
    --navigation-text-color: var(--white);

    --back-color-1: var(--white);
    --back-color-2: var(--light-grey);
    --background-color: var(--dark-blue);

    --button-background-color: var(--blue);
    --button-text-color: var(--white);

    --price-background-color: var(--white);
    --price-color: var(--blue);

    --title-color-1: var(--white);
    --title-color-2: var(--blue);
    --text-color: var(--black);

    --border-colors: var(--black);

    --text-color-primary: var(--white);
    --text-color-secondary: var(--black);
    --text-color-tertiary: var(--azur-blue);

    --z-index-navbars: 3;
    --z-index-text: 2;
    --z-index-backgrounds: 1;
  }

  [data-theme="dark"] {
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
