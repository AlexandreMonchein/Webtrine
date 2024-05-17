import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  padding: 40px 0;
  background-color: var(--background-color-1);
`;

export const Container = styled.div`
  padding: 0 80px;
`;

export const Title = styled.h2`
  line-height: 56px;
  font-size: var(--title-font-size);
  text-align: center;
`;

export const Content = styled.div`
  display: grid;
  grid-gap: 60px;
  grid-template-columns: 31fr 34fr !important;

  &.isReversed {
    :first-child {
      order: 1;
    }

    :last-child {
      order: -1;
    }
  }
`;
export const ImageWrapper = styled.figure`
  margin: 0;
`;
export const Image = styled.img`
  vertical-align: middle;
  width: 100%;
`;

export const TextContent = styled.div`
  display: flex;
`;
export const Text = styled.p`
  font-size: var(--text-font-size);
  font-weight: var(--font-weight);

  line-height: 1.5;
  word-break: break-word;

  &.isCentered {
    align-content: center;
  }
`;

export const DescriptionContentWrapper = styled.ul`
  list-style: none;
  padding-left: 0;

  :last-child {
    margin-bottom: 0;
  }
`;
export const DescriptionContentContainer = styled.li``;
export const DescriptionContentWithBullet = styled.p``;
