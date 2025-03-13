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
  display: flex;
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  color: var(--title-color-2);
  text-align: center;
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

export const ImageContainer = styled.div`
  margin: 0;
  padding: 0 24px 0 0;
  height: auto;
  float: left;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 0 0 12px 0;
    `
  )};

  &.isReversed {
    float: right;
    padding: 0 0 0 24px;

    ${bp.max(
      breakpointNames.medium,
      css`
      padding: 0 0 12px 0;
      `
    )};
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 416px;
  border-radius: 8px;
`;

export const TextContent = styled.div`
  display: flex;
  overflow: hidden;
`;

export const Text = styled.p`
  padding-bottom: 16px;
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
