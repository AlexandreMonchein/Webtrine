import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export const OffscreenContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
  white-space: nowrap;
  opacity: 0;
  z-index: -1;
  overflow: hidden;
  max-width: 100vw;
`;

export const Button = styled.button`
  cursor: pointer;
  border-radius: 50px;
  border-width: 0px;
  padding: 15px 30px;
  white-space: nowrap;
  transition: background-color 0.3s ease;

  &:hover,
  &:focus {
    opacity: 0.8;
    transition: opacity 0.25s ease-in-out;
  }
`;

export const Text = styled.span`
  display: block;
  text-align: center;
  width: 100%;
`;
