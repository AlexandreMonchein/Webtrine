import styled, { css } from "styled-components";
import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Section = styled.section`
  position: relative;
  padding: 40px 120px;
  color: var(--text-color-secondary);
  overflow: hidden;

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

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1rem;
  transition: box-shadow 0.3s ease-in-out;
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-basis: 100%;
    `
  )}
`;

export const CardTitle = styled.p`
  font-weight: bold;
`;

export const CardDescription = styled.p``;
