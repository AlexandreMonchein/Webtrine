import styled from "styled-components";

// Container for the footer
export const FooterContainer = styled.footer`
  background-color: var(--color-quaternary);
  color: var(--color-primary);
  position: relative;
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
