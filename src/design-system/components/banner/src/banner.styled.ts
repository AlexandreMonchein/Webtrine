import styled from "styled-components";

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
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: var(--z-index-backgrounds);

  &.active {
    opacity: 1;
  }
`;

export const RedirectLink = styled.a`
  position: absolute;
  z-index: calc(var(--z-index-backgrounds) + 100);

  padding: 12px;
  bottom: 0;
  text-decoration: none;
  color: var(--color-primary);
`;

export const TextContainer = styled.div`
  position: absolute;
  width: 40%;
  height: auto;
  display: flex;
  flex-direction: column;

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
      top: 15vh;
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
      top: 15vh;
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
      top: 15vh;
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
  color: white;
  text-transform: uppercase;
  font-size: var(--title-font-size);
  line-height: var(--line-height);
  letter-spacing: 2px;
`;

export const SubTitle = styled.h2`
  z-index: var(--z-index-text);
  color: white;
  text-transform: uppercase;
  font-size: var(--subtitle-font-size);
  line-height: var(--line-height);
  letter-spacing: 2px;
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
