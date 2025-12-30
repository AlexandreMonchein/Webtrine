import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const GalleryTitle = styled.h1`
  color: var(--title-color-2);
  text-align: center;
`;
export const GalleryDescription = styled.p`
  text-align: center;
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

export const GalleryRoot = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 40px 120px;
  background-color: var(--back-color-2);

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 40px 40px;
    `,
  )}

  &.isLogo {
    flex-direction: row;
    padding: 24px 120px;

    ${bp.min(
      breakpointNames.wide,
      css`
        padding: 40px 360px;
      `,
    )}
  }

  ${bp.min(
    breakpointNames.wide,
    css`
      padding: 40px 360px;
    `,
  )}
`;

export const MainColumn = styled.div`
  flex: 1;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  column-gap: 24px;

  &.isLogo {
    padding-bottom: 0px;
  }
`;

export const CardWrapper = styled.div`
  min-width: 261px;
  max-width: 261px;
  padding-bottom: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  ${bp.min(
    breakpointNames.wide,
    css`
      min-width: 500px;
      max-width: 500px;
    `,
  )};

  &.isLogo {
    min-width: 64px;
    max-width: 128px;
    padding-bottom: 0;

    img {
      height: auto;

      ${bp.min(
        breakpointNames.wide,
        css`
          min-width: auto;
          max-width: 256px;
        `,
      )};
    }
  }
`;

export const CardDescription = styled.p``;
