import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

export const DisplayWrapper = styled.section`
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 32px;
  padding: 40px 40px;
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
`;

export const CardWrapper = styled.div`
  min-width: 261px;
  flex: 1;

  ${bp.min(
    breakpointNames.wide,
    css`
      min-width: 500px;
    `
  )};
`;
