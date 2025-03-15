import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Container = styled.section`
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  padding: 40px 120px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `
  )}
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const MainSubtitle = styled.h2`
  margin: 0;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  margin-bottom: 15px;
`;

export const ContentTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const ContentText = styled.p`
  font-size: 16px;
`;

export const Disclaimer = styled(ContentText)``;
