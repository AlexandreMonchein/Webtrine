// DescriptionB.styled.ts
import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Section = styled.section`
  padding: 40px 120px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `,
  )}

  ${bp.min(
    (breakpointNames as any).wide || ("wide" as any),
    css`
      padding: 40px 480px;
    `,
  )}
`;

export const Container = styled.div`
  position: relative;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;

  ${bp.min(
    breakpointNames.medium,
    css`
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    `,
  )}
`;

export const Figure = styled.figure<{ $bleedTop?: boolean }>`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${bp.min(
    breakpointNames.medium,
    css`
      transform: ${(p) => (p.$bleedTop ? "translateY(32px)" : "none")};
    `,
  )}
`;

export const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;

  ${bp.min(
    breakpointNames.medium,
    css`
      width: 480px;
    `,
  )}
`;

export const Box = styled.div<{ $anchor: "top-left" | "bottom-right" }>`
  background-color: var(--light-grey);
  min-width: 250px;
  max-width: 480px;
  padding: 12px;

  ${bp.max(
    breakpointNames.medium,
    css`
      margin-top: -64px;
    `,
  )}

  ${bp.min(
    breakpointNames.medium,
    css`
      position: absolute;
      width: 400px;
      ${(p) =>
        p.$anchor === "top-left"
          ? css`
              left: 0;
              top: -24px;
              transform: translate(10%, -12%);
            `
          : css`
              right: 0;
              bottom: -24px;
              transform: translate(-10%, 12%);
            `}
    `,
  )}
`;

export const Divider = styled.hr`
  width: 140px;
  height: 2px;
  border: 0;
  margin: 8px 0 20px 0;
  background: var(--black);
`;

export const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--black);
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
    outline-offset: 4px;
  }
`;

export const RightFigure = styled(Figure)`
  ${bp.min(
    breakpointNames.medium,
    css`
      transform: translateY(-32px);
    `,
  )}
`;
