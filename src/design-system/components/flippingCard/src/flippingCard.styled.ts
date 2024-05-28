import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

export const Container = styled.section`
  padding: 40px 0px;
  color: var(--text-color-secondary);
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  perspective: 1000px; /* Container perspective for 3D effect */

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-direction: column;
    `
  )}
`;

export const Title = styled.h2`
  line-height: 56px;
  font-size: var(--title-font-size);
  font-family: "Josefin Sans", sans-serif;
  text-align: center;
  font-weight: lighter;
  text-transform: uppercase;
  word-wrap: break-word;
`;

export const Card = styled.div`
  width: 300px;
  height: 400px;
  margin: 20px;
  position: relative;
  transform-style: preserve-3d;
  transition:
    transform 0.6s,
    opacity 0.6s;

  &:hover {
    transform: rotateY(180deg);
    opacity: 1;
  }
`;

export const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
`;

export const CardFront = styled(CardSide)`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CardBack = styled(CardSide)`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardTitle = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  margin: 0;
  font-size: 1.5em;
  color: white;
  background: rgba(
    0,
    0,
    0,
    0.5
  ); /* Optional: Add a background for better readability */
  padding: 10px;
  text-align: center;
`;

export const CardDescription = styled.p`
  font-size: 1em;
  text-align: center;
`;
