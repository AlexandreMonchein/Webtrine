import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle`
      :root {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
    }
    body {    
      font-family: "Josefin Sans",sans-serif;

      --navbar-font-size: 16px;
      --title-font-size: 42px;
      --subtitle-font-size: 32px;
      --text-font-size: 24px;

      --color-primary: #ffffff;
      --color-secondary: #E8EEF1;
      --color-tertiary: #60A3D9;
      --color-quaternary: #1E3D58;
      --color-quinary: #000000;
      
      --background-color-1: var(--color-primary);
      --background-color-2: var(--color-secondary);
      --foreground-color: var(--color-primary);

      --z-index-navbars: 3;
      --z-index-text: 2;
      --z-index-backgrounds: 1;
    }

  [data-theme="dark"] {

  }

  @media screen and (prefers-color-scheme: dark) {

    :root {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
    }
    body {    
      font-family: "Josefin Sans",sans-serif;

      --navbar-font-size: 16px;
      --title-font-size: 42px;
      --subtitle-font-size: 32px;
      --text-font-size: 24px;

      --color-primary: #ffffff;
      --color-secondary: #E8EEF1;
      --color-tertiary: #60A3D9;
      --color-quaternary: #1E3D58;
      --color-quinary: #000000;
      
      --background-color-1: var(--color-primary);
      --background-color-2: var(--color-secondary);
      --foreground-color: var(--color-primary);

      --z-index-navbars: 3;
      --z-index-text: 2;
      --z-index-backgrounds: 1;
    }
  }
`;
