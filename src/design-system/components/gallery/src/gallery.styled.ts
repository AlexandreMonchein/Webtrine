import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

export const GalleryRoot = styled.section`
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 32px;
  padding: 40px 120px;

  &.isLogo {
    padding: 0px 120px;
  }
`;

export const MainColumn = styled.div`
  flex: 1;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  column-gap: 32px;
  padding-bottom: 32px;

  &.isLogo {
    padding-bottom: 0px;
  }
`;

export const CardWrapper = styled.div`
  min-width: 261px;
  max-width: 261px;
  flex: 1;

  ${bp.min(
    breakpointNames.wide,
    css`
      min-width: 500px;
      max-width: 500px;
    `
  )};

  &.isLogo {
    min-width: 64px;
    max-width: 128px;

    img {
      height: auto;

      ${bp.min(
        breakpointNames.wide,
        css`
          min-width: auto;
          max-width: 256px;
        `
      )};
    }
  }
`;
