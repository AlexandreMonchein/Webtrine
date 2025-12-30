import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

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
    `,
  )}

  ${bp.min(
    breakpointNames.wide,
    css`
      padding: 40px 480px;
    `,
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
  width: 100%;

  &.isCentered {
    display: flex;
  }

  &.isReversed {
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      display: flex;
      gap: 48px;
      flex-direction: column;
      align-items: center;
      gap: 0px;

      &.isTextBefore {
        flex-direction: column-reverse;
      }
    `,
  )};
`;

export const ImageContainer = styled.div`
  padding: 0 24px 0 0;
  float: left;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 0 12px 12px 0;
    `,
  )};

  &.isReversed {
    float: right;
    padding: 0 0 0 24px;

    ${bp.max(
      breakpointNames.medium,
      css`
        padding: 0 0 12px 0;
      `,
    )};
  }

  &.isCentered {
    float: unset;
    align-content: center;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 416px;
  border-radius: 24px;

  &.isCentered {
    width: auto;
  }
`;

export const TextContent = styled.div`
  display: block;
  justify-content: flex-start;

  height: 100%;

  &.isCentered {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const Text = styled.p`
  width: 100%;
  padding-bottom: 16px;

  a {
    background: linear-gradient(
        var(--link-hover-color),
        var(--link-hover-color)
      )
      center bottom / 100% 1px no-repeat;
    border-bottom: none;
    color: var(--link-hover-color);
    text-decoration: none;
    transition:
      background 300ms ease-in-out,
      color 300ms ease-in-out;

    &:hover,
    &:focus {
      background: linear-gradient(
          var(--link-hover-color),
          var(--link-hover-color)
        )
        center bottom / 100% 100% no-repeat;
      color: var(--text-color-primary);
    }
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonLink = styled.button`
  border-radius: 64px;

  a {
    display: inline-block;
    font-size: x-large;
    padding: 24px 64px;
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    text-decoration: none;
    border-radius: 64px;
    transition: all 0.3s ease;
    border: 2px solid var(--button-background-color);

    &:hover,
    &:focus {
      background-color: var(--nav-hover-color);
      border-color: var(--nav-hover-color);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;
