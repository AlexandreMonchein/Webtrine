import styled from "styled-components";

// Container for the showcase page
export const ShowcaseContainer = styled.div`
  padding-top: 120px;
  padding-left: 40px;
  padding-right: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  max-width: calc(100% - 80px); /* Réserve 40px de padding de chaque côté */
  margin: 0 auto;
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: center;

  &.double-width {
    width: 100%;
    grid-column-end: span 2;
  }

  &.double-height {
    height: 100%;
    grid-row-end: span 2;
  }
`;

// Styled image
export const Image = styled.img`
  width: 100%;
`;
