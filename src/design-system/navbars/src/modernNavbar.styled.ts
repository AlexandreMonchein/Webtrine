import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const NavbarContainer = styled.nav`
  position: relative;
  background: var(--white);
  border-bottom: 1px solid #e5e7eb;
  z-index: 50;
`;

export const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;

  ${bp.min(
    breakpointNames.medium,
    css`
      padding: 0 24px;
    `,
  )}

  ${bp.min(
    breakpointNames.large,
    css`
      padding: 0 32px;
    `,
  )}
`;

export const NavbarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 60;
`;

export const LogoLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const LogoImage = styled.img`
  height: 40px;
  width: auto;
  max-width: 180px;
  object-fit: contain;

  ${bp.min(
    breakpointNames.medium,
    css`
      height: 48px;
    `,
  )}
`;

export const DesktopNavigation = styled.div`
  display: none;

  ${bp.min(
    breakpointNames.large,
    css`
      display: flex;
      align-items: center;
      gap: 8px;
    `,
  )}
`;

export const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const NavLink = styled.a<{ $hasSubItems?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--blue);
    background-color: #f8fafc;
  }

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
  }

  ${(props) =>
    props.$hasSubItems &&
    css`
      &::after {
        content: "";
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid currentColor;
        margin-left: 4px;
        transition: transform 0.3s ease;
      }

      &:hover::after {
        transform: rotate(180deg);
      }
    `}
`;

export const SubMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 280px;
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  padding: 8px;
  z-index: 50;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-10px)"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
`;

export const SubMenuItem = styled.a`
  display: block;
  padding: 12px 16px;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
    color: var(--blue);
  }

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: -2px;
  }
`;

export const SubMenuItemTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
`;

export const SubMenuItemDescription = styled.div`
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
`;

export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 60;

  &:hover {
    background-color: #f8fafc;
  }

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
  }

  ${bp.min(
    breakpointNames.large,
    css`
      display: none;
    `,
  )}
`;

export const HamburgerIcon = styled.div<{ $isOpen: boolean }>`
  position: relative;
  width: 24px;
  height: 18px;

  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--text-color);
    border-radius: 1px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:nth-child(1) {
      top: 0;
      ${(props) =>
        props.$isOpen &&
        css`
          transform: rotate(45deg);
          top: 8px;
        `}
    }

    &:nth-child(2) {
      top: 8px;
      ${(props) =>
        props.$isOpen &&
        css`
          opacity: 0;
        `}
    }

    &:nth-child(3) {
      top: 16px;
      ${(props) =>
        props.$isOpen &&
        css`
          transform: rotate(-45deg);
          top: 8px;
        `}
    }
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  background: var(--white);
  border-bottom: 1px solid #e5e7eb;
  max-height: calc(100vh - 72px);
  overflow-y: auto;
  z-index: 40;
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${bp.min(
    breakpointNames.large,
    css`
      display: none;
    `,
  )}
`;

export const MobileMenuContent = styled.div`
  padding: 24px 16px;
  max-width: 1200px;
  margin: 0 auto;

  ${bp.min(
    breakpointNames.medium,
    css`
      padding: 32px 24px;
    `,
  )}
`;

export const MobileNavItem = styled.div`
  margin-bottom: 8px;
`;

export const MobileNavLink = styled.a<{ $hasSubItems?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
    color: var(--blue);
  }

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: -2px;
  }
`;

export const MobileSubMenu = styled.div<{ $isOpen: boolean }>`
  max-height: ${(props) => (props.$isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #f8fafc;
  border-radius: 0 0 12px 12px;
  margin-top: -12px;
  padding-top: 12px;
`;

export const MobileSubMenuItem = styled.a`
  display: block;
  padding: 12px 24px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--blue);
    background-color: #e2e8f0;
  }

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: -2px;
  }
`;

export const MobileExpandIcon = styled.div<{ $isExpanded: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isExpanded ? "rotate(180deg)" : "rotate(0)")};

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid currentColor;
  }
`;

export const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 30;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;

  ${bp.min(
    breakpointNames.large,
    css`
      display: none;
    `,
  )}
`;
