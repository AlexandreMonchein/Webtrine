import styled from "styled-components";
import { SectionTitle } from "../description/description.styled";

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
  border-radius: 50%;
  object-fit: cover;
`;

export const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  z-index: 1;

  &:focus {
    outline: none;
  }

  &:first-of-type {
    left: 0;
  }

  &:last-of-type {
    right: 0;
  }
`;

export const Title = styled(SectionTitle)`
  padding-bottom: 0px;
`;

export const SubTitle = styled.p`
  text-align: center;
  padding-bottom: 24px;
`;
