import styled, { css, keyframes } from "styled-components";

// fade animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px; /* force square */
  overflow: hidden;
  border-radius: 12px;
`;

export const CarouselImage = styled.img<{ active: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; /* crop to square nicely */
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      animation: ${fadeIn} 1s ease;
      z-index: 1;
    `}
`;

export const InfoSection = styled.div`
  flex: 1;
  min-width: 280px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0.5rem 0;
`;

export const TagLine = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
`;

export const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  margin-left: 0.5rem;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  margin: 1rem 0;
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 5; /* limit to 5 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Button = styled.button`
  background: black;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #333;
  }
`;

// Fullscreen modal
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
  max-width: 90%;
  max-height: 80%;
  border-radius: 12px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 2rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const NavButton = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? "left: 30px;" : "right: 30px;")}
  transform: translateY(-50%);
  font-size: 3rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
`;
