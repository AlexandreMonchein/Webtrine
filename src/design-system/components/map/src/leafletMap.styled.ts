import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";
import { Text } from "../../description/src/description.styled";

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

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-direction: column;
      width: 100%;
      height: 100vh;
      gap: 32px;
    `
  )}
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-direction: row;
      overflow-y: scroll;
    `
  )}
`;

export const Title = styled.h1`
  color: var(--title-color-2);
  text-align: center;

  &:not(.solo) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const ListSection = styled.div`
  height: 50%;
  width: 100%;

  &.solo {
    align-content: center;
  }

  ${bp.min(
    breakpointNames.large,
    css`
      overflow-y: scroll;
      align-content: center;
    `
  )}
`;

export const List = styled.div`
  width: 35%;
  padding: 20px;
  display: flex;
  overflow-y: scroll;
  overflow-x: scroll;
  align-content: baseline;
  flex-wrap: wrap;

  &.solo {
    align-content: center;
    justify-content: space-around;
    gap: 32px;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      display: flex;
      flex-direction: row;
      width: auto;
      height: 100%;
      overflow-y: scroll;
      overflow-x: visible;
      white-space: nowrap;

      &.solo {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 0px;
        height: 35%;
        overflow: hidden;
        padding: 0;
        justify-content: space-evenly;
        align-items: flex-start;
      }
    `
  )}

  ${bp.max(
    breakpointNames.small,
    css`
      &.solo {
        flex-direction: column;
        align-items: center;
        height: 100vh;
      }
    `
  )}
`;

export const ListMultipleItem = styled.div`
  border-bottom: 1px solid var(--border-colors);
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      border-bottom: none;
      border-right: 1px solid var(--border-colors);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px 10px;
    `
  )}
`;

export const ListItem = styled.div`
  &:not(.solo) {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }
`;

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListMultipleItemText = styled.p`
  word-break: break-word;
`;

export const ListItemText = styled(ListMultipleItemText)`
  text-align: center;
  margin: 0;
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

export const Marker = styled.div``;
