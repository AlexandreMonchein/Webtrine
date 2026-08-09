import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Section = styled.section`
  position: relative;
  padding: 40px 120px;
  color: var(--theme-color-tertiary);
  overflow: hidden;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;

      &.isContinious {
        padding: 0px 40px;
      }
    `,
  )}

  ${bp.min(
    breakpointNames.wide,
    css`
      padding: 40px 480px;
    `,
  )}
`;

export const TableTitle = styled.h2.withConfig({
  shouldForwardProp: (prop) => !["centered"].includes(prop),
})<{ centered?: boolean }>`
  text-align: center;
  color: var(--theme-color-hover);
  text-align: ${({ centered }) => (centered ? "center" : "left")};
`;

export const TableSubTitle = styled.p.withConfig({
  shouldForwardProp: (prop) => !["centered"].includes(prop),
})<{ centered?: boolean }>`
  text-align: ${({ centered }) => (centered ? "center" : "left")};
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background: var(--theme-color-primary);
  border: 1px solid var(--theme-color-tertiary);

  ${bp.max(
    breakpointNames.medium,
    css`
      border-radius: 8px;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    `,
  )};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: var(--description-font-size);
  table-layout: auto;

  /* Screen reader only caption for accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus styles for keyboard navigation */
  th:focus,
  td:focus {
    outline: 2px solid var(--theme-color-utility-4);
    outline-offset: -2px;
    background-color: var(--theme-color-background-1);
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      table-layout: fixed;
    `,
  )};

  ${bp.max(
    breakpointNames.small,
    css`
      table-layout: auto;
      min-width: 100%;
    `,
  )};
`;

export const TableHeader = styled.thead`
  background: var(--theme-color-background-1);
  border-bottom: 2px solid var(--theme-color-tertiary);
`;

export const TableHeaderCell = styled.th.withConfig({
  shouldForwardProp: (prop) =>
    !["isFirst", "isLast", "centered"].includes(prop),
})<{
  isFirst?: boolean;
  isLast?: boolean;
  centered?: boolean;
}>`
  padding: 16px 20px;
  text-align: ${({ centered }) => (centered ? "center" : "left")};
  color: var(--theme-color-tertiary);
  font-size: var(--description-font-size);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;

  /* Accessibility: Focus indicator */
  &:focus {
    outline: 2px solid var(--theme-color-utility-4);
    outline-offset: -2px;
    background-color: var(--theme-color-background-1);
    z-index: 1;
  }

  /* Accessibility: Focus visible for keyboard users only */
  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--theme-color-utility-4);
    outline-offset: -2px;
    background-color: var(--theme-color-background-1);
  }

  ${({ isFirst }) =>
    isFirst &&
    css`
      border-top-left-radius: 12px;
    `}

  ${({ isLast }) =>
    isLast &&
    css`
      border-top-right-radius: 12px;
    `}

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 12px 16px;
      white-space: normal;
    `,
  )};

  ${bp.max(
    breakpointNames.small,
    css`
      padding: 10px 12px;
      white-space: normal;
      font-size: calc(var(--description-font-size) * 0.9);
    `,
  )};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid var(--theme-color-tertiary);
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--theme-color-background-1);
  }
`;

export const TableCell = styled.td.withConfig({
  shouldForwardProp: (prop) =>
    !["isFirst", "isLast", "centered"].includes(prop),
})<{
  isFirst?: boolean;
  isLast?: boolean;
  centered?: boolean;
}>`
  padding: 16px 20px;
  color: var(--theme-color-tertiary);
  vertical-align: top;
  text-align: ${({ centered }) => (centered ? "center" : "left")};
  word-wrap: break-word;
  overflow-wrap: break-word;
  position: relative;

  /* Accessibility: Focus indicator */
  &:focus {
    outline: 2px solid var(--theme-color-utility-4);
    outline-offset: -2px;
    background-color: var(--theme-color-background-1);
    z-index: 1;
  }

  /* Accessibility: Focus visible for keyboard users only */
  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--theme-color-utility-4);
    outline-offset: -2px;
    background-color: var(--theme-color-background-1);
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 12px 16px;
    `,
  )};

  ${bp.max(
    breakpointNames.small,
    css`
      padding: 10px 12px;
      font-size: calc(var(--description-font-size) * 0.9);
    `,
  )};
`;
