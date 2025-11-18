import { createGlobalStyle, css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Luciole';
    src: url('/assets/fonts/Luciole-Regular.ttf') format('ttf');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Luciole';
    src: url('/assets/fonts/Luciole-Regular-Italic.ttf') format('ttf');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Luciole';
    src: url('/assets/fonts/Luciole-Bold.ttf') format('ttf');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Luciole';
    src: url('/assets/fonts/Luciole-Bold-Italic.ttf') format('ttf');
    font-weight: 700;
    font-style: normal;
  }

  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
    height: 1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:focus-visible {
    outline: 2px solid var(--white) !important;
    outline-offset: 2px !important;
    box-shadow: 0px 0px 0px 3px var(--black) !important;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
  }

  body {
    min-height: 100vh;
    font-family: 'Luciole', Arial, sans-serif;
  }

  img,
  picture,
  video,
  canvas {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  button {
    color: inherit;
    border: none;
    cursor: pointer;
    outline: inherit;
    padding: 0;
    border: none;
  }

  a {
    text-decoration: none;
    color: inherit;

    ${bp.min(
      breakpointNames.medium,
      css`
        font-size: large;
      `,
    )}

    ${bp.min(
      breakpointNames.large,
      css`
        font-size: large;
      `,
    )}

    ${bp.min(
      breakpointNames.wide,
      css`
        font-size: x-large;
      `,
    )}
  }

  ul,
  ol {
    list-style: none;
  }

  blockquote {
    margin: 0;
    padding: 0;
    border: none;
    quotes: none;
  }

  blockquote:before,
  blockquote:after {
    content: '';
    content: none;
  }

  h1 {
    font-size: xxx-large;
  }

  h2 {
    font-size: xx-large;
    word-wrap: break-word;
    padding-bottom: 24px;

    ${bp.min(
      breakpointNames.wide,
      css`
        font-size: xxx-large;
      `,
    )}
  }

  p, li {
    word-break: break-word;
    overflow-wrap: break-word;

    ${bp.min(
      breakpointNames.medium,
      css`
        font-size: large;
      `,
    )}

    ${bp.min(
      breakpointNames.large,
      css`
        font-size: x-large;
      `,
    )}

    ${bp.min(
      breakpointNames.wide,
      css`
        font-size: x-large;
      `,
    )}
  }

  span {
    word-break: break-word;
    overflow-wrap: break-word;

    ${bp.min(
      breakpointNames.medium,
      css`
        font-size: large;
      `,
    )}
  }
`;

export default GlobalStyle;
