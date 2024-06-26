import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";
import { DefaultContent } from "../../navbars/src/classicNavbar.styled";

// Container for the footer
export const FooterContainer = styled.footer`
  background-color: var(--color-quaternary);
  color: var(--color-primary);
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40px 120px;
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
    `
  )}
`;

// Left section for logos
export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

// Middle section for copyright
export const MiddleSection = styled.div`
  text-align: center;
  flex: 1;
  color: var(--navigation-text-color);
`;

// Right section for social media links
export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

// Individual social media icon
export const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 24px;
  text-decoration: none;
`;

// Logos
export const Logo = styled.img`
  width: 50px;
  height: auto;
  &:not(:last-child) {
    margin-right: 10px;
  }
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
