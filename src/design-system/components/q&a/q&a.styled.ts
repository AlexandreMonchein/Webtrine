import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const Section = styled.section`
  padding: 40px 120px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `
  )}

  ${bp.min(
    breakpointNames.wide,
    css`
      padding: 40px 480px;
    `
  )}
`;

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  ${bp.max(
    breakpointNames.medium,
    css`
      margin-bottom: 24px;
    `
  )}
`;

export const Title = styled.h2`
  color: var(--text-color-secondary);
  margin: 0 0 16px 0;

  ${bp.max(
    breakpointNames.medium,
    css`
      margin-bottom: 12px;
    `
  )}
`;

export const Subtitle = styled.h3`
  color: var(--text-color-secondary);
  margin: 0;
  opacity: 0.8;
`;

export const TabsContainer = styled.div`
  margin-bottom: 32px;
  border-bottom: 1px solid var(--light-grey);

  ${bp.max(
    breakpointNames.medium,
    css`
      margin-bottom: 24px;
    `
  )}
`;

export const TabsList = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      gap: 8px;
    `
  )}
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  padding: 16px 24px;
  color: var(--text-color-secondary);
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;

  background: linear-gradient(var(--link-hover-color), var(--link-hover-color))
    center bottom / 100% 0px no-repeat;
  text-decoration: none;
  transition:
    background 300ms ease-in-out,
    color 300ms ease-in-out;

  &:hover,
  &:focus {
    background: linear-gradient(
        var(--link-hover-color),
        var(--link-hover-color)
      )
      center bottom / 100% 100% no-repeat;
    color: var(--text-color-primary);
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: var(--text-color-secondary);
      border-bottom-color: var(--text-color-secondary);
    `}

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 12px 16px;
    `
  )}
`;

export const TabPanel = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};

  ${({ $isVisible }) =>
    !$isVisible &&
    css`
      visibility: hidden;

      * {
        tabindex: -1;
        pointer-events: none;
      }
    `}
`;

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${bp.max(
    breakpointNames.medium,
    css`
      gap: 12px;
    `
  )}
`;

export const AccordionItem = styled.div`
  border: 1px solid var(--light-grey);
  border-radius: 8px;
  background: var(--white);
  position: relative;

  &:focus-within {
    overflow: visible;
  }
`;

export const AccordionHeader = styled.button<{ $isExpanded: boolean }>`
  width: 100%;
  border: none;
  padding: 20px 24px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  border-radius: 8px;
  position: relative;

  background: linear-gradient(var(--link-hover-color), var(--link-hover-color))
    center bottom / 100% 0px no-repeat;
  transition:
    background 300ms ease-in-out,
    color 300ms ease-in-out;

  &:hover,
  &:focus {
    background: linear-gradient(
        var(--link-hover-color),
        var(--link-hover-color)
      )
      center bottom / 100% 100% no-repeat;

    span {
      color: var(--text-color-primary);
    }
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 16px 20px;
    `
  )}
`;

export const QuestionText = styled.span`
  color: var(--text-color-secondary);
  margin: 0;
  flex: 1;
  padding-right: 16px;
  transition: color 0.2s ease;
`;

export const ChevronIcon = styled.svg<{ $isExpanded: boolean }>`
  width: 24px;
  height: 24px;
  color: var(--text-color-secondary);
  transition:
    transform 0.2s ease,
    color 0.2s ease;
  flex-shrink: 0;

  ${({ $isExpanded }) =>
    $isExpanded &&
    css`
      transform: rotate(180deg);
    `}

  ${bp.max(
    breakpointNames.medium,
    css`
      width: 20px;
      height: 20px;
    `
  )}
`;

export const AccordionContent = styled.div<{
  $isExpanded: boolean;
  $maxHeight: number;
}>`
  overflow: scroll;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: ${({ $isExpanded, $maxHeight }) =>
    $isExpanded ? `${Math.max($maxHeight, 200)}px` : "0px"};
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  transition:
    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;

  &:focus-within {
    overflow: visible;
  }

  ${({ $isExpanded }) =>
    !$isExpanded &&
    css`
      pointer-events: none;

      * {
        tabindex: -1;
      }
    `}
`;

export const AccordionBody = styled.div`
  padding: 24px;
  color: var(--text-color-secondary);
  border-radius: 0 0 8px 8px;
  position: relative;

  p {
    margin: 0 0 16px 0;
  }

  ul,
  ol {
    margin: 0 0 16px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }

  strong {
    color: var(--text-color-secondary);
  }

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 0 20px 16px 20px;
    `
  )}
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-color-secondary);
  opacity: 0.6;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 24px 16px;
    `
  )}
`;
