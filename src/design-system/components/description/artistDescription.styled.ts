import styled, { css, keyframes } from "styled-components";

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
  cursor: pointer;
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 2;
`;

export const CarouselImage = styled.img<{ active: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

export const Subtitle = styled.a`
  font-size: 1rem;
  color: #666;
  margin: 0.5rem 0;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

export const InstagramIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Separator = styled.hr`
  width: 50px;
  height: 1px;
  background-color: #333;
  border: none;
  margin: 1rem 0;
`;

export const TagLine = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0.5rem 0;
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
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Button = styled.a`
  background: black;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;

  &:hover {
    background: #333;
  }
`;


