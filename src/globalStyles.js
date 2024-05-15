import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle`
  body {
    --color-primary: #E8EEF1;
    --color-secondary: #43B0F1;
    --color-tertiary: #057DCD;
    --color-quaternary: #1E3D58;
    
    --background-color: var(--color-quaternary);
    --foreground-color: var(--color-primary);
  };

  [data-theme="dark"] {
    --color-primary:  #E8EEF1;
    --color-secondary: #43B0F1;
    --color-tertiary: #057DCD;
    --color-quaternary: #1E3D58;
    
    --background-color: var(--color-quaternary);
    --foreground-color: var(--color-primary);
  }

  @media screen and (prefers-color-scheme: dark) {
    body {
      --color-primary: #E8EEF1;
      --color-secondary: #43B0F1;
      --color-tertiary: #057DCD;
      --color-quaternary: #1E3D58;
      
    --background-color: var(--color-quaternary);
    --foreground-color: var(--color-primary);
    }
  }
`;
