import { Link } from "react-router-dom";
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
    breakpointNames.wide,
    css`
      padding: 40px 480px;
    `,
  )}
`;

export const SectionTitle = styled.h2`
  text-align: center;
  color: var(--theme-color-quaternary);
  margin-bottom: 40px;
`;

export const CardsGrid = styled.div`
  display: grid;
  justify-content: center;
  gap: 24px;

  /* Mobile: 1 colonne */
  grid-template-columns: 1fr;

  /* Tablette: 2 colonnes */
  ${bp.min(
    breakpointNames.medium,
    css`
      grid-template-columns: repeat(2, 1fr);
    `,
  )}

  /* Très grand écran: 4 colonnes si vraiment beaucoup de place */
  ${bp.min(
    breakpointNames.wide,
    css`
      grid-template-columns: repeat(4, 1fr);
    `,
  )}
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--theme-color-primary);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;

  /* Mobile: cartes plus hautes */
  min-height: 500px;
  min-width: 280px;

  /* Desktop large: cartes plus compactes pour 4 colonnes */
  ${bp.min(
    breakpointNames.xlarge,
    css`
      min-width: 300px;
    `,
  )}
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  color: var(--theme-color-primary);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  h3 {
    font-size: var(--text-font-size);
    margin-bottom: 12px;
  }

  p {
    font-size: var(--description-font-size);
    margin-bottom: 16px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
`;

export const ActionCardButton = styled(Link)`
  background-color: var(--theme-color-secondary);
  color: var(--theme-color-primary);
  font-size: var(--description-font-size);
  border: none;
  max-width: 250px;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: center;
  text-decoration: none;

  &:hover,
  &:focus {
    color: var(--theme-color-tertiary);
    background-color: var(--theme-color-hover);
    outline: none;
  }
`;
