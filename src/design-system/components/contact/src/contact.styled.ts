import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

// Container for the contact form
export const ContactSection = styled.section`
  padding: 40px 120px;
  margin: 0 auto;
  background-color: var(--color-primary);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
// Title for the contact section
export const Title = styled.h2`
  font-size: var(--title-font-size);
  color: var(--color-quaternary);
  margin-bottom: 10px;
`;

// Description for the contact section
export const Description = styled.p`
  font-size: var(--text-font-size);
  color: var(--color-quinary);
  margin-bottom: 20px;
`;

export const FormContainer = styled.div`
  width: 70%;

  ${bp.max(
    breakpointNames.medium,
    css`
      width: 100%;
    `
  )};
`;

// Styled form
export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
`;

// Styled input and textarea
export const Input = styled.input`
  padding: 10px;
  font-size: var(--text-font-size);
  border: 1px solid var(--color-quaternary);
  border-radius: 5px;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  font-size: var(--text-font-size);
  border: 1px solid var(--color-quaternary);
  border-radius: 5px;
  resize: vertical;
  min-height: 200px;
`;

// Styled button
export const Button = styled.button`
  padding: 10px;
  font-size: var(--text-font-size);
  color: var(--color-primary);
  background-color: var(--color-tertiary);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken(var(--color-tertiary), 10%);
  }
`;
