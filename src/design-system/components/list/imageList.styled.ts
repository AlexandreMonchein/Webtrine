import styled from "styled-components";

export const Section = styled.section`
  padding: 40px 0px;
  color: var(--text-color-secondary);
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const ImageList = styled.div<{ $imagecount: number }>`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  padding: 10px 0;
  gap: 48px;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }

  justify-content: ${(props) =>
    props.$imagecount < 5 ? "center" : "flex-start"};
`;

export const ImageItem = styled.img`
  flex: 0 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 10px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  z-index: 1;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &:first-of-type {
    left: 0;
  }

  &:last-of-type {
    right: 0;
  }
`;
