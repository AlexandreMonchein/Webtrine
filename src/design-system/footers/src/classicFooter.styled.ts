import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";
import { DefaultContent } from "../../navbars/src/classicNavbar.styled";

export const FooterContainer = styled.footer`
  background-color: var(--background-color);
  color: var(--color-primary);
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  z-index: var(--z-index-navbars);
  font-size: var(--navbar-font-size);

  ${bp.max(
    breakpointNames.small,
    css`
      flex-direction: column;
      padding: 24px 16px;
      gap: 16px;
    `
  )}
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const MiddleSection = styled.div`
  text-align: center;
  color: var(--navigation-text-color);

  ${bp.max(
    breakpointNames.small,
    css`
      padding: 0px;
    `
  )}
`;

export const TopSection = styled.div``;

export const BottomSection = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-evenly;
  flex-direction: column;

  ${bp.min(
    breakpointNames.small,
    css`
      flex-direction: row;
    `
  )}
`;

export const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 24px;
  text-decoration: none;
`;

export const Logo = styled.img`
  display: block;
  width: 96px;
`;

export const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
export const SocialLogo = styled.div`
  width: 24px;
  height: 24px;
`;
export const SocialContent = styled(DefaultContent)`
  gap: 12px;
`;

export const SiteRef = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: var(--nav-hover-color);
`;
