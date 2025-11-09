// List.styled.ts
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

export const BigTitle = styled.h2`
  color: var(--title-color-2);
  text-align: center;
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 24px 0px;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1rem;
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const NumberCircle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #007bff;
  color: #fff;
  font-weight: bold;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 0.5rem;
    align-self: center;
  }
`;

export const Content = styled.div`
  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const Title = styled.p`
  font-weight: bold;
  margin: 0 0 0.5rem 0;
`;

export const Description = styled.p``;
