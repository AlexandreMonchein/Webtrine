import { Link } from "react-router-dom";
import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

export const ErrorGif = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 20px;
`;

export const ErrorText = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export const HomeButton = styled(Link)`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
