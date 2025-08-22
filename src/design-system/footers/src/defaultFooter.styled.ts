import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const FooterContainer = styled.footer`
  background-color: var(--background-color);
  color: var(--color-primary);
  width: 100%;
  margin-top: auto;
  border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));

  /* Prévention du CLS */
  min-height: 300px;

  ${bp.max(
    breakpointNames.medium,
    css`
      min-height: 400px;
    `
  )}

  ${bp.max(
    breakpointNames.small,
    css`
      min-height: 500px;
    `
  )}
`;

export const TopFooterSection = styled.div`
  padding: 48px 32px 32px;
  display: grid;
  gap: 48px;
  align-items: start;

  /* Grille dynamique selon les sections présentes */
  grid-template-columns: 1fr 2fr 1fr;

  /* Quand seule la section centrale est présente */
  &[data-sections="center-only"] {
    grid-template-columns: 1fr;
    justify-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 64px 32px;
  }

  /* Quand logos + centre (pas de réseaux sociaux) */
  &[data-sections="left-center"] {
    grid-template-columns: 1fr 2fr;
  }

  /* Quand centre + réseaux sociaux (pas de logos) */
  &[data-sections="center-right"] {
    grid-template-columns: 2fr 1fr;
  }

  ${bp.max(
    breakpointNames.large,
    css`
      grid-template-columns: 1fr 2fr;
      gap: 32px;

      &[data-sections="center-only"] {
        grid-template-columns: 1fr;
        justify-items: center;
        max-width: 1000px;
        padding: 32px 48px 24px;
      }

      &[data-sections="left-center"],
      &[data-sections="center-right"] {
        grid-template-columns: 1fr 1fr;
      }
    `
  )}

  ${bp.max(
    breakpointNames.medium,
    css`
      grid-template-columns: 1fr;
      gap: 32px;
      padding: 32px 24px 24px;
      text-align: center;
      justify-items: center;

      &[data-sections="center-only"] {
        max-width: 800px;
        padding: 32px 32px 24px;
      }
    `
  )}

  ${bp.max(
    breakpointNames.small,
    css`
      padding: 24px 16px 16px;
      gap: 24px;
    `
  )}
`;

export const BottomFooterSection = styled.div`
  padding: 16px 32px;
  border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  background-color: var(--footer-bottom-bg, rgba(0, 0, 0, 0.1));
  text-align: center;

  ${bp.max(
    breakpointNames.small,
    css`
      padding: 16px;
    `
  )}
`;

export const LogosSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
    `
  )}
`;

export const LogoLink = styled.a`
  display: inline-block;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid var(--focus-color, #007acc);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const Logo = styled.img`
  display: block;
  max-width: 120px;
  max-height: 60px;
  width: auto;
  height: auto;
  object-fit: contain;

  ${bp.max(
    breakpointNames.small,
    css`
      max-width: 100px;
      max-height: 50px;
    `
  )}
`;

export const CentralSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  ${bp.max(
    breakpointNames.large,
    css`
      grid-column: span 2;
    `
  )}

  ${bp.max(
    breakpointNames.medium,
    css`
      grid-column: span 1;
    `
  )}
`;

export const LinksGrid = styled.div`
  display: grid;
  gap: 32px;
  width: 100%;

  /* Configuration dynamique selon le nombre de colonnes */
  grid-template-columns: repeat(3, 1fr);

  /* Quand c'est la seule section, on peut être plus généreux */
  &[data-layout="center-only"] {
    gap: 48px;
    max-width: 1000px;

    /* Pour 3 colonnes ou moins, on les garde sur une ligne */
    &[data-columns="1"] {
      grid-template-columns: 1fr;
      max-width: 300px;
    }

    &[data-columns="2"] {
      grid-template-columns: repeat(2, 1fr);
      max-width: 600px;
    }

    &[data-columns="3"] {
      grid-template-columns: repeat(3, 1fr);
      max-width: 900px;
    }

    /* Pour 4 colonnes ou plus, on peut faire du 4 colonnes */
    &[data-columns="4"] {
      grid-template-columns: repeat(4, 1fr);
    }

    &[data-columns="5"], &[data-columns="6"] {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Pour 4 colonnes ou plus, créer 2 lignes de 2 colonnes chacune */
  &[data-columns="4"], &[data-columns="5"], &[data-columns="6"] {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Pour 6 colonnes ou plus, créer 3 lignes de 2 colonnes chacune */
  &[data-columns="6"], &[data-columns="7"], &[data-columns="8"] {
    grid-template-columns: repeat(2, 1fr);
  }

  ${bp.max(
    breakpointNames.large,
    css`
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;

      &[data-layout="center-only"] {
        gap: 32px;

        &[data-columns="1"] {
          grid-template-columns: 1fr;
        }

        &[data-columns="2"] {
          grid-template-columns: repeat(2, 1fr);
        }

        &[data-columns="3"], &[data-columns="4"] {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      &[data-columns="4"], &[data-columns="5"], &[data-columns="6"],
      &[data-columns="7"], &[data-columns="8"] {
        grid-template-columns: repeat(2, 1fr);
      }
    `
  )}

  ${bp.max(
    breakpointNames.medium,
    css`
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;

      &[data-layout="center-only"] {
        gap: 24px;

        &[data-columns="1"] {
          grid-template-columns: 1fr;
        }

        &[data-columns="2"], &[data-columns="3"], &[data-columns="4"] {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      &[data-columns="4"], &[data-columns="5"], &[data-columns="6"],
      &[data-columns="7"], &[data-columns="8"] {
        grid-template-columns: repeat(2, 1fr);
      }
    `
  )}

  ${bp.max(
    breakpointNames.small,
    css`
      grid-template-columns: 1fr;
      gap: 16px;
      text-align: center;

      &[data-columns="4"], &[data-columns="5"], &[data-columns="6"],
      &[data-columns="7"], &[data-columns="8"] {
        grid-template-columns: 1fr;
      }
    `
  )}
`;

export const LinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ColumnTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;

  ${bp.max(
    breakpointNames.small,
    css`
      font-size: 1rem;
    `
  )}
`;

export const LinkItem = styled.div`
  margin: 0;
`;

export const FooterLink = styled.a`
  color: var(--nav-hover-color, #888);
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1.5;
  transition: color 0.3s ease;
  display: inline-block;

  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid var(--focus-color, #007acc);
    outline-offset: 2px;
    border-radius: 2px;
  }

  ${bp.max(
    breakpointNames.small,
    css`
      font-size: 0.85rem;
    `
  )}
`;

export const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  ${bp.max(
    breakpointNames.large,
    css`
      grid-column: 1;
      grid-row: 1;
    `
  )}

  ${bp.max(
    breakpointNames.medium,
    css`
      grid-column: span 1;
      grid-row: auto;
    `
  )}
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;

  ${bp.max(
    breakpointNames.small,
    css`
      gap: 12px;
    `
  )}
`;

export const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--social-bg, rgba(255, 255, 255, 0.1));
  transition: all 0.3s ease;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--color-primary);
    text-decoration: none;
    border-radius: 50%;

    svg {
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }
  }

  &:hover {
    background-color: var(--social-hover-bg, rgba(255, 255, 255, 0.2));
    transform: translateY(-2px);

    svg {
      transform: scale(1.1);
    }
  }

  &:focus-within {
    outline: 2px solid var(--focus-color, #007acc);
    outline-offset: 2px;
  }

  ${bp.max(
    breakpointNames.small,
    css`
      width: 36px;
      height: 36px;

      a svg {
        width: 18px;
        height: 18px;
      }
    `
  )}
`;

export const CopyrightText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: var(--nav-hover-color, #888);
  line-height: 1.4;

  ${bp.max(
    breakpointNames.small,
    css`
      font-size: 0.8rem;
    `
  )}
`;
