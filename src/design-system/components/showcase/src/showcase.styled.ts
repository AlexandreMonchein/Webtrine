import styled from "styled-components";

// Container for the whole section
export const SectionContainer = styled.section`
  padding: 1px 120px;
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

    width: 65%;
    padding-left: 10%;

    div {
      display: flex;
      padding-left: 16px;
    }

    img {
      width: 120px;
      height: 120px;
      margin-right: 20px;
      padding-left: 0;
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
  padding-bottom: 5%;

  &.isSingleItem {
    flex-direction: row;
    text-align: left;
  }

  &.first-item {
    text-align: left;
  }
`;

// Round image
export const RoundImage = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 0;

  &.isSingleItem,
  &.isOdd,
  &.first-item {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
`;

// Text container
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;

  &.isSingleItem,
  &.first-item {
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
