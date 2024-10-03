import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

export const Section = styled.section`
  position: relative;
  padding: 40px 120px;
  color: var(--text-color-secondary);
  overflow: hidden;

  &.isContinious {
    padding: 0px 120px;
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;

      &.isContinious {
        padding: 0px 40px;
      }
    `
  )}
`;

export const Container = styled.div`
  display: block;
`;

export const SectionTitle = styled.h2`
  line-height: 56px;
  font-size: var(--title-font-size);
  color: var(--title-color-2);
  font-family: "Josefin Sans", sans-serif;
  text-align: center;
  font-weight: var(--title-font-weight);
  text-transform: uppercase;
  word-wrap: break-word;
`;

export const Content = styled.div`
  ${bp.max(
    breakpointNames.medium,
    css`
      display: flex;
      gap: 48px;
      flex-direction: column;
      align-items: center;
      gap: 0px;
    `
  )};
`;

export const ImageWrapper = styled.figure`
  margin: 0;
  padding: 0 24px 0 0;
  height: auto;
  float: left;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 0;
    `
  )};

  &.isReversed {
    float: right;
    padding: 0 0 0 24px;

    ${bp.max(
      breakpointNames.medium,
      css`
        padding: 0;
      `
    )};
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 50vh;
`;

export const TextContent = styled.div`
  display: flex;
  overflow: hidden;
`;

export const Text = styled.p`
  font-size: var(--text-font-size);
  font-weight: var(--text-font-weight);

  line-height: 1.5;
  word-break: break-word;
  text-align: justify;
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
