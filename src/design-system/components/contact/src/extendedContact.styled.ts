import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

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
`;

export const Content = styled.div``;

export const Title = styled.h2`
  font-size: var(--title-font-size);
  color: var(--title-color-2);
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: var(--text-font-size);
  color: var(--text-color);
  margin-bottom: 40px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;

  ${bp.max(
    breakpointNames.large,
    css`
      display: block;
    `
  )};
`;

export const FormDisplay = styled.div`
  display: flex;
  flex-direction: row;

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
  gap: 16px;
  flex: 2;

  ${bp.min(
    breakpointNames.large,
    css`
      padding: 40px 20px;
    `
  )};
`;

export const ClientInfo = styled.div`
  padding: 40px 20px;
  flex: 1;

  p {
    font-size: var(--text-font-size);
    color: var(--text-colo);
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

export const ProductDetails = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;

  ${bp.max(
    breakpointNames.large,
    css`
      margin-bottom: 20px;
    `
  )};
`;

export const ProductInfo = styled.div`
  display: flex;
  margin-bottom: 20px;

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
  }

  ${bp.max(
    breakpointNames.large,
    css`
      flex-direction: column;
      align-items: center;
      margin: 0;

      img {
        margin: 0;
      }
    `
  )};
`;
