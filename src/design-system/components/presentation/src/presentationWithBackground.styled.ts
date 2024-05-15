import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  height: 80vh;
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
  width: 50%;
  height: 50%;
  top: 30%;
  left: 5%;
  overflow-y: hidden;
`;

export const Title = styled.h1`
  position: relative;
  z-index: var(--z-index-text);
  color: var(--color-primary);

  font-size: 300%;
  text-transform: uppercase;
`;

export const SubTitle = styled(Title)``;
