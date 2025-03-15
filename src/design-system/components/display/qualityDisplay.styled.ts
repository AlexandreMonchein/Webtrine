import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Section = styled.section`
  padding: 40px 120px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `
  )}
`;

export const Title = styled.h2`
  color: var(--title-color-2);
  text-align: center;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SvgIcon = styled.div`
  margin: 0 auto;

  svg {
    object-fit: contain;
  }
`;

export const Text = styled.p`
  color: var(--text-color);
`;
