import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Section = styled.section`
  position: relative;
  padding: 40px 120px;
  color: var(--theme-color-tertiary);
  overflow: hidden;

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

export const Title = styled.h2`
  color: var(--theme-color-quaternary);
  text-align: center;
`;

export const Description = styled.p`
  text-align: center;
  padding-bottom: 24px;
`;

export const CardContainer = styled.div<{
  $displayInline?: boolean;
  $isEvenCount?: boolean;
  $cardCount?: number;
}>`
  display: grid;
  gap: 1rem;
  justify-items: center; /* Centre les cartes dans leurs colonnes */

  /* Mode stack par défaut (si displayInline = false) */
  ${({ $displayInline }) =>
    !$displayInline &&
    css`
      grid-template-columns: 1fr;
    `}

  /* Mode inline (côte à côte) si displayInline = true */
  ${({ $displayInline, $isEvenCount, $cardCount = 0 }) =>
    $displayInline &&
    css`
      /* Mobile: toujours 1 colonne */
      grid-template-columns: 1fr;

      /* Tablette et plus: logique adaptative */
      ${bp.min(
        breakpointNames.medium,
        css`
          ${$isEvenCount
            ? css`
                /* Nombre pair: 2 colonnes max */
                grid-template-columns: repeat(${Math.min($cardCount, 2)}, 1fr);
                justify-content: center;
              `
            : css`
                /* Nombre impair: 3 colonnes max */
                grid-template-columns: repeat(${Math.min($cardCount, 3)}, 1fr);
                justify-content: center;
              `}
        `,
      )}

      /* Desktop large: adaptation selon le nombre de cartes */
      ${bp.min(
        breakpointNames.xlarge,
        css`
          ${$isEvenCount
            ? css`
                /* Nombre pair: 4 colonnes max, mais pas plus que le nombre de cartes */
                grid-template-columns: repeat(${Math.min($cardCount, 4)}, 1fr);
                justify-content: center;
              `
            : css`
                /* Nombre impair: 3 colonnes max, mais pas plus que le nombre de cartes */
                grid-template-columns: repeat(${Math.min($cardCount, 3)}, 1fr);
                justify-content: center;
              `}
        `,
      )}
    `}
`;

export const Card = styled.div`
  background: var(--theme-color-background-2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 1rem;
  width: -webkit-fill-available;
  transition: box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    outline: none;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1; /* Image carrée */
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

export const CardTitle = styled.p`
  font-weight: bold;
`;

export const CardDescription = styled.p``;
