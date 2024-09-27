import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: inline-block;
`;

export const Button = styled.button`
  cursor: pointer;
  border-radius: 50px;
  border-width: 0px;
  padding: 15px 30px;
  font-size: 16px;
  white-space: nowrap; /* Ensure text stays on one line */
  transition: background-color 0.3s ease;
`;

export const Text = styled.span`
  display: block;
  text-align: center;
  width: 100%;
`;
