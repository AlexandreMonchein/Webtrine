import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const ContactSection = styled.section`
  padding: 40px 120px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `,
  )}
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: var(--title-color-2);
  margin-bottom: 10px;
`;

export const Description = styled.p`
  color: var(--text-color);
  margin-bottom: 40px;
`;

export const FormContainer = styled.div`
  width: 70%;

  ${bp.max(
    breakpointNames.medium,
    css`
      width: 100%;
    `,
  )};
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: var(--text-font-size);
  border: 1px solid var(--border-colors);
  border-radius: 5px;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  font-size: var(--text-font-size);
  border: 1px solid var(--border-colors);
  border-radius: 5px;
  resize: vertical;
  min-height: 200px;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: var(--text-font-size);
  color: var(--button-text-color);
  background-color: var(--background-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--background-color);
  }
`;
