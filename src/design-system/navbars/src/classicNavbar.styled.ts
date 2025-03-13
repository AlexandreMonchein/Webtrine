import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const BurgerMenuIcon = styled.button`
  display: none;
  background: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 3;

  div {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    transition: 0.5s;
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      display: flex;
    `
  )};
`;

export const Links = styled.a`
  display: block;
  text-decoration: none;
  cursor: pointer;
  color: var(--navigation-text-color);
  border-bottom: 2px solid transparent;
  padding: 10px 0px;

  &:hover, &:focus-visible {
    color: var(--hover-color);
    border-bottom: 2px solid var(--hover-color);
  }
`;

export const SubCategory = styled.li``;

export const SubCategoryContainer = styled.ul`
  display: none;
  list-style-type: none;
  background-color: var(--color-secondary);
  position: absolute;
  width: 100%;
  z-index: var(--z-index-navbars);

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-direction: column;
      display: contents;
      align-items: flex-start;
      word-break: break-word;
    `
  )};

  ${SubCategory} {
    float: none;
    width: 100%;
    text-align: left;
  }

  ${Links} {
    color: var(--text-color);
    padding: 10px;
    border-bottom: none;

    &:hover, &:focus-visible {
      border-bottom: none;
      color: var(--hover-color);
    }
  }
`;

export const DefaultContent = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline-start: 0px;
`;

export const Content = styled(DefaultContent)`
  gap: 32px;
  padding: 0px 12px 0px 12px;

  ${bp.max(
    breakpointNames.large,
    css`
      gap: 24px;
    `
  )}
`;

export const Sidebar = styled.div`
  height: 110vh;
  width: 320px;
  position: fixed;
  top: 0;
  left: -321px;
  background-color: var(--background-color);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);

  z-index: var(--z-index-navbars);

  ${BurgerMenuIcon} {
    position: absolute;
    left: 10%;
    top: 2%;
  }

  ${bp.min(
    breakpointNames.large,
    css`
      display: none;
    `
  )};

  .deroulant > a::after {
    content: "▼";
    font-size: 15px;
    padding-left: 5px;
  }

  &.open {
    left: 0;
    transition: left 0.5s;
  }

  ${SubCategoryContainer} {
    display: none;
    &.show {
      display: contents;
    }
    &.hide {
      display: none;
    }
  }

  ${SubCategory} {
    padding-left: 5%;
  }

  ${Links} {
    padding: 8px 8px 8px 32px;
    color: white;
    transition: 0.5s;
    text-align: left;

    &:hover, &:focus-visible {
      color: var(--hover-color);
    }
  }

  ${Content} {
    flex-direction: column;
  }
`;

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  position: relative;
  z-index: var(--z-index-navbars);
  font-size: var(--navbar-font-size);
  background-color: var(--background-color);
  color: var(--text-color);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  top: 0;

  &.isFixed {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;

    &.hideOnScroll {
      &.show {
        transition-duration: 0.5s;
        transform: translateY(0);
      }

      &.hide {
        transition-duration: 0.5s;
        transform: translateY(-100%);
      }
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    display: block;
    width: 96px;
  }

  ${bp.max(
    breakpointNames.small,
    css`
      display: none;
    `
  )};

  ${bp.max(
    breakpointNames.medium,
    css`
      position: relative;
    `
  )};
`;

export const MainNavigation = styled.nav`
  width: 100%;
  margin: 0 auto;
  position: sticky;
  top: 0px;

  ${bp.max(
    breakpointNames.medium,
    css`
      display: none;
    `
  )};

  ul li:hover .sous {
    display: block;
    width: 200%;
  }

  .deroulant > a::after {
    content: "▼";
    font-size: 15px;
    padding-left: 5px;
  }
`;

export const Settings = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Category = styled.li`
  float: left;
  text-align: center;
  position: relative;

  ${bp.max(
    breakpointNames.medium,
    css`
      width: 100%;
    `
  )};
`;

export const Languages = styled.div`
  display: flex;
  align-items: center;
`;
