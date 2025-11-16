import styled from "styled-components";

export const FullscreenOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const FullscreenImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  border-radius: 12px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 2.5rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2001;

  &:hover {
    opacity: 0.7;
  }
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  font-size: 3rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2001;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    left: 15px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 2001;
`;
