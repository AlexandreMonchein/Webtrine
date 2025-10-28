import styled, { css } from "styled-components";
import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Section = styled.section`
  padding: 40px 120px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `
  )}

  ${bp.min(
    breakpointNames.wide,
    css`
      padding: 40px 480px;
    `
  )}
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: var(--subtitle-font-size);
  color: var(--title-color-1);
  margin-bottom: 40px;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--back-color-1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  position: relative;
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  color: var(--text-color-primary);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  h3 {
    font-size: var(--text-font-size);
    margin-bottom: 12px;
  }

  p {
    font-size: var(--description-font-size);
    margin-bottom: 16px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;

  button {
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    font-size: var(--description-font-size);
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    text-align: center;

    &:hover,
    &:focus {
      background-color: var(--nav-hover-color);
      outline: none;
    }
  }
`;
