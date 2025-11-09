import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Content = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &.medium {
    height: 70vh;
  }
`;

export const BackgroundContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: var(--z-index-backgrounds);

  &::before {
    content: "";
    background: #000;
    z-index: calc(var(--z-index-backgrounds) + 1);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    opacity: 0.4;
  }
`;

export const Background = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: var(--z-index-backgrounds);

  &.active {
    opacity: 1;
  }
`;

export const RedirectLink = styled.a`
  position: absolute;
  z-index: calc(var(--z-index-backgrounds) + 3);

  padding: 12px;
  bottom: 0;
  text-decoration: none;
  color: var(--text-color-primary);
`;

export const Overlay = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 120px;
  gap: 64px;

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-direction: column;

      padding: 20px 40px;
      gap: 32px;
    `,
  )};

  ${bp.min(
    breakpointNames.wide,
    css`
      gap: 128px;
      padding: 0px 240px;
    `,
  )};
`;

export const TextContainer = styled.div`
  position: absolute;
  width: 40%;
  height: auto;
  display: flex;
  flex-direction: column;

  ${bp.max(
    breakpointNames.medium,
    css`
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      padding: 0 !important;
      text-align: center !important;
    `,
  )};

  &.isSplit {
    top: 0 !important;
    left: 0 !important;
    width: auto !important;
    padding: 0 !important;
  }

  &.medium {
    position: relative;
  }

  &.top-left {
    top: 5vh;
    left: 5vh;
    text-align: start;
  }

  &.center-left {
    top: 30vh;
    left: 5vh;
    text-align: start;

    &.medium {
      top: 0;
      left: 0;
      width: 100%;
      padding-right: 50%;
      padding-left: 5%;
    }
  }

  &.bottom-left {
    bottom: 10vh;
    left: 5vh;
    text-align: start;
  }

  &.center-top {
    top: 5vh;
    left: 50vh;
    text-align: center;
  }

  &.center {
    top: 30vh;
    left: 50vh;
    text-align: center;

    &.medium {
      top: 0;
      left: 0;
      width: 100%;
    }
  }

  &.center-bottom {
    bottom: 10vh;
    left: 50vh;
    text-align: center;
  }

  &.top-right {
    top: 5vh;
    right: 5vh;
    text-align: end;
  }

  &.center-right {
    top: 30vh;
    right: 5vh;
    text-align: end;

    &.medium {
      top: 0;
      left: 0;
      width: 100%;
      padding-left: 50%;
      padding-right: 5%;
    }
  }

  &.bottom-right {
    bottom: 10vh;
    right: 5vh;
    text-align: end;
  }
`;

export const Title = styled.h1`
  z-index: var(--z-index-text);
  color: var(--title-color-1);
  padding: 0px 48px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 0px 24px;
      display: flex;
      justify-content: center;
    `,
  )};
`;

export const SubTitle = styled.h2`
  z-index: var(--z-index-text);
  color: var(--title-color-1);
  padding: 0px 48px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 0px 24px;
      display: flex;
      justify-content: center;
    `,
  )};
`;

export const SelectorsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: var(--z-index-text);
`;

export const Selector = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: var(--color-primary);
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;

  &.active {
    opacity: 1;
  }
`;

export const ContactContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: calc(var(--z-index-backgrounds) + 2);
`;
