import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

export const Section = styled.section`
  padding: 40px 120px;
  box-sizing: border-box;
  color: var(--text-color-secondary);
  position: relative;
  z-index: var(--z-index-text);

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `
  )}
`;
export const Container = styled.div`
  display: flex;
  height: 70vh;
  border: 1px solid var(--color-quinary);

  ${bp.max(
    breakpointNames.small,
    css`
      flex-direction: column;
      width: 100%;
      height: 80vh;
    `
  )}
`;

export const List = styled.div`
  width: 30%;
  padding: 20px;
  overflow-y: scroll;
  overflow-x: scroll;

  ${bp.max(
    breakpointNames.small,
    css`
      display: flex;
      flex-direction: row;
      width: auto;
      overflow-y: scroll;
      overflow-x: visible;
      white-space: nowrap;
    `
  )}
`;

export const ListItem = styled.div`
  border-bottom: 1px solid var(--color-quinary);
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  ${bp.max(
    breakpointNames.small,
    css`
      border-bottom: none;
      border-right: 1px solid var(--color-quinary);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px 10px;
    `
  )}
`;

export const MapWrapper = styled.div`
  width: 70%;

  ${bp.max(
    breakpointNames.medium,
    css`
      width: 100%;
      height: 100%;
    `
  )}
`;
