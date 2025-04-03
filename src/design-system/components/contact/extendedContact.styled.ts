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
    `
  )}

  ${bp.min(
    breakpointNames.wide,
    css`
      padding: 20px 480px;
    `
  )}
`;

export const Spacer = styled.hr`
  margin: 24px 0;
`;

export const Content = styled.div``;

export const Title = styled.h2`
  color: var(--title-color-2);
  margin-bottom: 10px;
`;

export const Description = styled.p`
  color: var(--text-color);
  margin-bottom: 40px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;

export const FormDisplay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;

  ${bp.max(
    breakpointNames.large,
    css`
      flex-direction: column;
    `
  )};
`;

export const ContactForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 2;
`;

export const ClientInfo = styled.div`
  padding: 40px 0px;
  flex: 1;

  p {
    font-size: var(--text-font-size);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  ${bp.max(
    breakpointNames.large,
    css`
      text-align: center;
      padding: 0;
    `
  )};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: var(--label-font-size);
  color: var(--label-color);
`;

export const Hint = styled.div`
  font-size: var(--hint-font-size);
  color: var(--hint-color);
  margin-top: 4px;
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
  color: var(--text-color-primary);
  background-color: var(--button-background-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    filter: brightness(80%);
  }
`;
