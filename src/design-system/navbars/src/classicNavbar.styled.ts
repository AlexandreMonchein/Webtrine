import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  height: 48px;
  position: relative;
  z-index: var(--z-index-navbars);
  font-size: var(--navbar-font-size);
  background-color: var(--color-quaternary);
  color: var(--color-quinary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

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
    width: 128px;
    height: 64px;
  }

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

export const DefaultContent = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline-start: 0px;
`;

export const Links = styled.a`
  display: block;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  color: var(--navigation-text-color);
  border-bottom: 2px solid transparent;
  padding: 10px 0px;

  &:hover {
    color: var(--hover-color);
    border-bottom: 2px solid var(--hover-border-color);
  }
`;

export const Content = styled(DefaultContent)`
  gap: 24px;

  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;

export const Category = styled.li`
  float: left;
  width: 100px;
  text-align: center;
  position: relative;

  ${bp.max(
    breakpointNames.medium,
    css`
      width: 100%;
    `
  )};
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
    color: var(--color-quinary);
    padding: 10px;
    border-bottom: none;

    &:hover {
      border-bottom: none;
      color: var(--hover-color);
    }
  }
`;

export const Languages = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

export const BurgerMenuIcon = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 3;

  div {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    transition: 0.4s;
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      display: flex;
    `
  )};
`;

export const Sidebar = styled.div`
  height: 100%;
  width: 320px;
  position: fixed;
  top: 0;
  left: -320px;
  background-color: var(--color-quaternary);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);

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

    ${bp.max(
      breakpointNames.medium,
      css`
        height: 110vh;
      `
    )};
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
    transition: 0.3s;
    text-align: left;

    &:hover {
      color: var(--hover-color);
    }
  }

  ${Content} {
    flex-direction: column;
  }
`;
