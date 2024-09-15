import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

export const PricesContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--text-color-secondary);

  position: relative;
  padding: 40px 120px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `
  )}
`;

export const Title = styled.h2`
  line-height: 56px;
  font-size: var(--title-font-size);
  text-align: center;
  font-weight: lighter;
  text-transform: uppercase;
  word-wrap: break-word;
`;

export const SubTitle = styled.p`
  font-size: var(--text-font-size);
  font-weight: var(--font-weight);
  line-height: 1.5;
  word-break: break-word;
`;

export const PriceCardsContainer = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PriceCard = styled.div`
  background: var(--color-primary);
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: center;
`;

export const CardTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-color-secondary);
`;

export const CardPrice = styled.p`
  font-size: 32px;
  margin-bottom: 20px;
  color: var(--color-tertiary);
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

export const FeatureItem = styled.li`
  font-size: 16px;
  color: var(--text-color-secondary);
  margin-bottom: 10px;
`;

export const ActionButton = styled(Link)`
  padding: 10px 20px;
  font-size: 16px;
  color: var(--color-primary);
  background-color: var(--color-tertiary);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
