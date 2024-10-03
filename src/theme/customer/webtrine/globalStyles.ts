import _ from "lodash";
import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle<{ globalStyle }>`
  :root {
    // font
    --font-family: ${(props) => _.get(props, "globalStyle.font-family")};
    --title-font-weight: ${(props) => _.get(props, "globalStyle.titles-font-weight")};
    --text-font-weight: ${(props) => _.get(props, "globalStyle.text-font-weight")};

    // sizes
    --navbar-font-size: ${(props) => _.get(props, "globalStyle.navbar-font-size")};
    --title-font-size: ${(props) => _.get(props, "globalStyle.title-font-size")};
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

    --title-color-1: var(--black);
    --title-color-2: var(--blue);
    --text-color: var(--black);

    --border-colors: var(--black);

    --text-color-primary: var(--white);
    --text-color-secondary: var(--black);
    --text-color-tertiary: var(--azur-blue);

    --z-index-navbars: 3;
    --z-index-text: 2;
    --z-index-backgrounds: 1;

    font-family: var(--font-family);
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;  
  }

`;
