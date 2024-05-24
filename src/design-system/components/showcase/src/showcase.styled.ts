import styled from "styled-components";

// Container for the whole section
export const SectionContainer = styled.section`
  padding: 40px 120px;
`;

// Grid container for items
export const ItemsGrid = styled.div`
  display: grid;
  column-gap: 10%;

  &.isOdd {
    grid-template-columns: repeat(2, 1fr);
  }

  &.isEven {
    grid-template-columns: repeat(2, 1fr);
  }

  &.isOdd .first-item {
    grid-column: span 2;
    justify-self: center;

    div {
      display: flex;
    }
  }

  &.regular-item {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// Individual item container
export const Item = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-bottom: 5%;

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
`;

// Title and description
export const Title = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

export const Description = styled.p`
  margin: 5px 0 0;
`;
