import styled from "styled-components";

export const Content = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  left: 0;
`;

export const BackgroundContainer = styled.div`
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: var(--z-index-backgrounds);

  &::before {
    content: "";
    background: #000;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    opacity: 0.6;
  }
`;

export const Background = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  z-index: var(--z-index-backgrounds);
`;

export const TextContainer = styled.div`
  position: absolute;
  width: 40%;
  height: 50%;
  top: 30%;
  left: 5%;
  overflow-y: hidden;
`;

export const Title = styled.h1`
  position: relative;

  z-index: var(--z-index-text);
  color: var(--color-primary);

  text-transform: uppercase;

  font-size: var(--title-font-size);
  line-height: var(--line-height);
  letter-spacing: 2px;
`;

export const SubTitle = styled.h2`
  position: relative;

  z-index: var(--z-index-text);
  color: var(--color-primary);

  text-transform: uppercase;

  font-size: var(--subtitle-font-size);
  line-height: var(--line-height);
  letter-spacing: 2px;
`;
