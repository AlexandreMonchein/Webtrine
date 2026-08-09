import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Section = styled.section`
  padding: 40px 0px;
  color: var(--theme-color-tertiary);
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;

  /* Gradient gauche */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 120px;
    background: linear-gradient(
      to right,
      var(--theme-color-primary),
      transparent
    );
    pointer-events: none;
    z-index: 2;
  }

  /* Gradient droit */
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 120px;
    background: linear-gradient(
      to left,
      var(--theme-color-primary),
      transparent
    );
    pointer-events: none;
    z-index: 2;
  }
`;

export const ImageList = styled.div<{ $imagecount: number }>`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  padding: 10px 0;
  gap: 48px;
  padding-left: 65px;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }

  ${bp.min(
    breakpointNames.medium,
    css`
      padding-left: 75px;
    `,
  )}

  justify-content: flex-start;

  ${(props) =>
    props.$imagecount < 5 &&
    `
    &::before,
    &::after {
      content: '';
      flex: 1;
    }
  `}
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;

  &:hover,
  &:focus-within {
    transform: scale(1.1);
  }

  &:hover ${Overlay}, &:focus-within ${Overlay} {
    opacity: 1;
  }
`;

export const ConsultButton = styled.button`
  background-color: white;
  color: black;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: lightgray;
  }
`;

export const ImageItem = styled.img`
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  border-radius: 50%;
  object-fit: contain;
`;

export const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  width: 64px;
  height: 64px;
  padding: 0;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(4px);
  display: none;

  &:hover {
    transform: translateY(-50%) scale(1.15);
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 2px solid var(--theme-color-foreground-2);
    outline-offset: 2px;
  }

  &:first-of-type {
    left: 8px;
  }

  &:last-of-type {
    right: 8px;
  }

  ${bp.min(
    breakpointNames.medium,
    css`
      display: flex;
    `,
  )}
`;

export const Title = styled.h2`
  color: var(--theme-color-foreground-1);
  text-align: center;
  padding-bottom: 0px;
`;

export const SubTitle = styled.p`
  text-align: center;
  padding-bottom: 24px;
`;
