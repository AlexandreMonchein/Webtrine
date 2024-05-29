import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

// Container for the whole section
export const SectionContainer = styled.section`
  padding: 40px 120px;
  color: var(--text-color-secondary);

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `
  )}
`;

// Grid container for items
export const ItemsGrid = styled.div`
  display: grid;
  column-gap: 10%;

  grid-template-columns: repeat(2, 1fr);

  &.isOdd .first-item {
    grid-column: span 2;
    justify-self: center;

    div {
      display: flex;
    }
  }

  ${bp.max(
    breakpointNames.small,
    css`
      grid-template-columns: repeat(1, 1fr);

      &.isOdd .first-item {
        grid-column: span 1;
      }
    `
  )}
`;

// Individual item container
export const Item = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  padding-bottom: 5%;

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-direction: column;
    `
  )}

  &.isSingleItem {
    flex-direction: row;
    text-align: left;
  }
`;

// Round image
export const RoundImage = styled.img`
  border-radius: 50%;
`;

// Text container
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2%;

  &.isSingleItem {
    align-items: flex-start;
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      padding-top: 2%;
      padding-left: 0;
    `
  )};
`;

// Title and description
export const Title = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

export const Description = styled.p`
  margin: 5px 0 0;
`;
