import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle`
  body {
    letter-spacing: 2px;  

    --color-primary: #E8EEF1;
    --color-secondary: #43B0F1;
    --color-tertiary: #057DCD;
    --color-quaternary: #1E3D58;
    --color-quinary: #000000;
    
    --background-color: var(--color-quaternary);
    --foreground-color: var(--color-primary);

    --z-index-navbars: 3;
    --z-index-text: 2;
    --z-index-backgrounds: 1;
  };

  [data-theme="dark"] {
    letter-spacing: 2px;  

    --color-primary:  #E8EEF1;
    --color-secondary: #43B0F1;
    --color-tertiary: #057DCD;
    --color-quaternary: #1E3D58;
    
    --background-color: var(--color-quaternary);
    --foreground-color: var(--color-primary);
    
    --z-index-navbars: 3;
    --z-index-text: 2;
    --z-index-backgrounds: 1;
  }

  @media screen and (prefers-color-scheme: dark) {
    body {  
      letter-spacing: 2px;  

      --color-primary: #E8EEF1;
      --color-secondary: #43B0F1;
      --color-tertiary: #057DCD;
      --color-quaternary: #1E3D58;
        
      --background-color: var(--color-quaternary);
      --foreground-color: var(--color-primary);
      
      --z-index-navbars: 3;
      --z-index-text: 2;
      --z-index-backgrounds: 1;
    }
  }
`;
