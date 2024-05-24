import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  padding: 40px 120px;
  background-color: var(--background-color-1);
`;

export const Container = styled.div`
  margin: 0 120px;
  display: block;
`;

export const SectionTitle = styled.h2`
  line-height: 56px;
  font-size: var(--title-font-size);
  font-family: "Josefin Sans", sans-serif;
  text-align: center;
  font-weight: lighter;
  text-transform: uppercase;
  word-wrap: break-word;
`;

export const Content = styled.div`
  display: grid;
  grid-gap: 64px;
  grid-template-columns: 1fr 1fr;

  &.isTextOnly {
    grid-template-columns: none;
  }

  &.isReversed {
    grid-template-columns: 1fr 1fr;

    :first-child {
      order: 1;
    }

    :last-child {
      order: -1;
    }
  }
`;
export const ImageWrapper = styled.figure`
  max-width: 620px;
  margin: 0;
`;
export const Image = styled.img`
  height: auto;
  max-width: unset;
  vertical-align: middle;
  width: 100%;
`;

export const TextContent = styled.div`
  display: flex;
  overflow: hidden;
  max-height: 460px;
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
