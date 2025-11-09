import { PopupButton } from "react-calendly";
import styled from "styled-components";

export const CalendlyButton = styled(PopupButton)`
  border-radius: 50px;
  padding: 15px 30px;
  white-space: nowrap;
  position: relative;
  transition:
    transform 0.2s ease,
    color 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: scale(1.05);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0%;
    height: 2px;
    background-color: currentColor;
  }

  &:hover::after,
  &:focus-visible::after {
    width: 80%;
  }
`;
