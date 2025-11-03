import styled from "styled-components";

export const FloatingContainer = styled.div`
  position: fixed;
  right: 20px;
  z-index: 1000;
  top: 50%;
  display: flex;
  transform: translateY(-50%);
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  border: 1px solid black;
`;


export const SocialLogo = styled.div`
  width: 24px;
  height: 24px;
`;
