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

  ${bp.min(
    breakpointNames.wide,
    css`
      padding: 40px 480px;
    `
  )}
`;

export const Title = styled.h2`
  color: var(--title-color-2);
  text-align: center;
`;

export const CardContainer = styled.div<{
  $displayInline?: boolean;
  $isEvenCount?: boolean;
}>`
  display: grid;
  gap: 1rem;

  /* Mode stack par défaut (si displayInline = false) */
  ${({ $displayInline }) =>
    !$displayInline &&
    css`
      grid-template-columns: 1fr;
    `}

  /* Mode inline (côte à côte) si displayInline = true */
  ${({ $displayInline, $isEvenCount }) =>
    $displayInline &&
    css`
      /* Mobile: toujours 1 colonne */
      grid-template-columns: 1fr;

      /* Tablette et plus: logique pair/impair */
      ${bp.min(
        breakpointNames.medium,
        css`
          ${$isEvenCount
            ? css`
                /* Nombre pair: 2 colonnes */
                grid-template-columns: repeat(2, 1fr);
              `
            : css`
                /* Nombre impair: 3 colonnes */
                grid-template-columns: repeat(3, 1fr);
              `}
        `
      )}

      /* Desktop large: adaptation selon pair/impair */
      ${bp.min(
        breakpointNames.xlarge,
        css`
          ${$isEvenCount
            ? css`
                /* Nombre pair: 4 colonnes si plus de 2 cartes */
                grid-template-columns: repeat(4, 1fr);
              `
            : css`
                /* Nombre impair: reste à 3 colonnes */
                grid-template-columns: repeat(3, 1fr);
              `}
        `
      )}
    `}
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1rem;
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
