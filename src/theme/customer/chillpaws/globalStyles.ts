import _ from "lodash";
import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle<{ globalStyle }>`
  :root {
    // sizes
    --navbar-font-size: ${(props) => _.get(props, "globalStyle.navbar-font-size")};
    --subtitle-font-size: ${(props) => _.get(props, "globalStyle.subtitle-font-size")};
    --text-font-size: ${(props) => _.get(props, "globalStyle.text-font-size")};
    --description-font-size: ${(props) => _.get(props, "globalStyle.description-font-size")};

    // new colors

    --dark-brown: ${(props) => _.get(props, "globalStyle.dark-brown")};
    --brown: ${(props) => _.get(props, "globalStyle.brown")};
    --light-brown: ${(props) => _.get(props, "globalStyle.light-brown")};
    --white: ${(props) => _.get(props, "globalStyle.white")};
    --light-grey: ${(props) => _.get(props, "globalStyle.light-grey")};
    --black: ${(props) => _.get(props, "globalStyle.black")};
    --beige: ${(props) => _.get(props, "globalStyle.beige")};
    --light-beige: ${(props) => _.get(props, "globalStyle.light-beige")};

    --nav-hover-color: var(--white);
    --link-hover-color: var(--brown);

    --navigation-text-color: var(--white);

    --back-color-1: var(--beige);
    --back-color-2: var(--light-beige);
    --background-color: var(--dark-brown);

    --button-background-color: var(--brown);
    --button-text-color: var(--white);

    --price-background-color: var(--white);
    --price-color: var(--brown);

    --title-color-1: var(--white);
    --title-color-2: var(--brown);
    --text-color: var(--black);

    --border-colors: var(--black);

    --text-color-primary: var(--white);
    --text-color-secondary: var(--black);
    --text-color-tertiary: var(--brown);

    --z-index-navbars: 3;
    --z-index-text: 2;
    --z-index-backgrounds: 1;
  }
`;
