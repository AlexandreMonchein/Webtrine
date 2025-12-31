import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames, breakpoints } from "../../../breakpointDef";

export const Section = styled.section`
  padding: 40px 120px;

  ${bp.max(
    breakpointNames.medium,
    css`
      padding: 20px 40px;
    `,
  )}

  ${bp.min(
    breakpointNames.wide,
    css`
      padding: 40px 480px;
    `,
  )}
`;

export const TestimonialContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

export const TestimonialWrapper = styled.div<{
  $currentIndex: number;
  $totalItems: number;
}>`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateX(-${(props) => props.$currentIndex * 100}%);
  will-change: transform;
`;

export const TestimonialSlide = styled.div`
  min-width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const TestimonialCard = styled.article`
  background: var(--back-color-3);
  border: 1px solid var(--back-color-3);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  @media ${breakpoints.tablet} {
    padding: 24px;
    margin: 12px;
  }
`;

export const TestimonialHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const AvatarContainer = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--blue, #007bff), #6c757d);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }

    &::before {
      opacity: 0.1;
    }
  }
`;

export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--blue, #007bff);
  color: var(--white, #ffffff);
  font-weight: 600;
  font-size: 1.25rem;
`;

export const TestimonialInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TestimonialName = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color, #1a1a1a);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TestimonialPosition = styled.p`
  margin: 4px 0 0 0;
  font-size: 0.875rem;
  color: #666666;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StarRating = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 4px;
`;

export const Star = styled.span<{ $filled: boolean }>`
  color: ${(props) => (props.$filled ? "var(--gold, #ffc107)" : "#e0e0e0")};
  font-size: 1rem;
  line-height: 1;
  transition: color 0.3s ease;
`;

export const TestimonialContent = styled.blockquote`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  height: 110px;
  color: var(--text-color, #1a1a1a);
  position: relative;

  // Lineclamp
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  padding-block: 0 !important;

  @media ${breakpoints.tablet} {
    font-size: 1.125rem;
  }
`;

export const TestimonialFooter = styled.footer`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  font-size: 0.875rem;
  color: #666666;
  text-align: right;
`;

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;

  @media ${breakpoints.mobile} {
    gap: 8px;
  }
`;

export const NavigationButton = styled.button<{ $disabled?: boolean }>`
  width: 48px;
  height: 48px;
  border: 1px solid #e1e5e9;
  border-radius: 50%;
  background: #ffffff;
  color: var(--text-color, #1a1a1a);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.25rem;

  &:hover:not(:disabled) {
    background: var(--blue, #007bff);
    color: var(--white, #ffffff);
    border-color: var(--blue, #007bff);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--blue, #007bff);
    outline-offset: 2px;
  }

  @media ${breakpoints.mobile} {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

export const PaginationDot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: ${(props) =>
    props.$active ? "var(--blue, #007bff)" : "#e0e0e0"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--blue, #007bff);
    transform: scale(1.2);
  }

  &:focus-visible {
    outline: 2px solid var(--blue, #007bff);
    outline-offset: 2px;
  }
`;

export const AccessibleContent = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
