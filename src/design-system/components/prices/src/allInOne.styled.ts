import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

export const PricesContainer = styled.section`
  position: relative;
  padding: 40px 120px;
  color: var(--text-color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;

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

export const Description = styled.p`
  font-size: var(--description-font-size);
  font-weight: var(--font-weight);
  word-break: break-word;
  margin: 0;
`;

export const FeaturesCard = styled.div`
  background: var(--color-primary);
  border-radius: 10px;
  box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 20px;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;

  ${bp.max(
    breakpointNames.small,
    css`
      grid-template-columns: 1fr;
      justify-items: center;
    `
  )}
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const FeatureImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

export const FeatureText = styled.p`
  font-size: 16px;
  padding-left: 12px;
  color: var(--text-color-secondary);
`;

export const PriceContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const Price = styled.p`
  font-size: 32px;
  margin: 20px 0;
  color: var(--color-tertiary);
  text-align: center;
`;

export const Per = styled.p`
  font-size: 24px;
  margin: 20px 0;
  color: var(--color-quinary);
  text-align: center;
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
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
