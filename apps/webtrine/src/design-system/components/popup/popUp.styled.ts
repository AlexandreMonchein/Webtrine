import styled, { css, keyframes } from "styled-components";

type PopUpContainerProps = {
  type: "success" | "warning" | "error";
};

type ProgressBarProps = {
  progress: number;
};

const getColor = (type: "success" | "warning" | "error") => {
  switch (type) {
    case "success":
      return "green";
    case "warning":
      return "orange";
    case "error":
      return "red";
    default:
      return "black";
  }
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const PopUpContainer = styled.div<PopUpContainerProps>`
  display: flex;
  align-items: center;
  background-color: ${({ type }) => getColor(type)};
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 500px;
  z-index: 1000;
  animation:
    ${fadeIn} 0.3s ease-out,
    ${fadeOut} 0.3s ease-out 4.7s;

  ${({ type }) =>
    type === "success" &&
    css`
      background-color: green;
    `}

  ${({ type }) =>
    type === "warning" &&
    css`
      background-color: orange;
    `}

  ${({ type }) =>
    type === "error" &&
    css`
      background-color: red;
    `}
`;

export const Icon = styled.div`
  margin-right: 1rem;
  font-size: 1.5rem;
`;

export const Message = styled.div`
  flex: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  width: ${({ progress }) => progress}%;
  transition: width 0.1s linear;
`;
