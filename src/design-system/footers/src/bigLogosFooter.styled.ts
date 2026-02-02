import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const FooterContainer = styled.footer`
  background-color: var(--theme-color-secondary);
  color: var(--theme-color-primary);

  padding: 40px 80px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `,
  )}

  ${bp.min(
    breakpointNames.wide,
    css`
      padding: 40px 240px;
    `,
  )}
`;

export const FooterContent = styled.div`
  max-width: 100%;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  ${bp.min(
    breakpointNames.medium,
    css`
      grid-template-columns: 0fr 1fr 1fr;
      gap: 3rem;

      &.isLogo {
        grid-template-columns: 1fr 1fr 1fr;
      }
    `,
  )}
`;

export const MenuSection = styled.div`
  grid-column: 1;

  ${bp.min(
    breakpointNames.medium,
    css`
      grid-column: 2;
    `,
  )}
`;

export const MenuTitle = styled.h2`
  color: var(--theme-color-primary);
  margin: 0 0 1.5rem 0;
  line-height: 1.3;
`;

export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MenuListItem = styled.li``;

export const MenuLink = styled.a`
  color: var(--theme-color-primary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover,
  &:focus {
    color: var(--theme-color-hover);
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--theme-color-hover);
    outline-offset: 2px;
  }
`;

export const BrandSection = styled.div`
  ${bp.max(
    breakpointNames.medium,
    css`
      grid-column: 1;
    `,
  )}

  ${bp.min(
    breakpointNames.medium,
    css`
      grid-column: 3;
    `,
  )}
`;

export const BrandTitle = styled.h2`
  color: var(--theme-color-primary);
  margin: 0 0 1rem 0;
`;

export const BrandDescription = styled.div`
  color: var(--theme-color-primary);
  margin-bottom: 1rem;
`;

export const AdditionalText = styled.p`
  color: var(--theme-color-primary);
  margin: 0;
`;

export const SocialSection = styled.div`
  margin-top: 2rem;
  gap: 1rem;
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SocialList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const SocialListItem = styled.li``;

export const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: var(--theme-color-primary);
  transition: color 0.2s ease;

  &:hover,
  &:focus {
    color: var(--theme-color-hover);
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--theme-color-hover);
    outline-offset: 2px;
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const LogosSection = styled.div`
  grid-column: 1;
  display: flex;
  justify-content: center;

  ${bp.min(
    breakpointNames.medium,
    css`
      grid-column: 1;
    `,
  )}
`;

export const LogosGrid = styled.div`
  display: grid;
`;

export const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoLink = styled.a`
  display: block;
  transition: opacity 0.2s ease;

  &:hover,
  &:focus {
    opacity: 0.8;
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--theme-color-hover);
    outline-offset: 2px;
  }
`;

export const LogoImage = styled.img`
  max-width: 256px;
  max-height: 256px;
  width: auto;
  height: auto;
  object-fit: contain;
`;

export const SiteRef = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: var(--theme-color-hover);
`;
