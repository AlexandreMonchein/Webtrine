import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

export const Section = styled.section`
  position: relative;
  padding: 40px 120px;
  color: var(--text-color-secondary);

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `
  )}
`;

export const Container = styled.div`
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
  display: flex;
  gap: 48px;

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-direction: column;
      align-items: center;
      gap: 0px;
    `
  )};

  &.isTextOnly {
  }

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
  width: 100%;
  height: auto;

  ${bp.max(
    breakpointNames.medium,
    css`
      width: auto;
    `
  )};

  ${bp.min(
    breakpointNames.wide,
    css`
      width: auto;
    `
  )};
`;
export const Image = styled.img`
  vertical-align: middle;
  max-width: 620px;
  min-width: 300px;
`;

export const TextContent = styled.div`
  display: flex;
  overflow: hidden;
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
