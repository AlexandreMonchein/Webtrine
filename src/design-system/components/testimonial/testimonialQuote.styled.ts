import styled, { css } from 'styled-components';
import { bp } from '../../../breakpoint';
import { breakpointNames } from '../../../breakpointDef';

export const TestimonialQuoteContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

export const TestimonialQuoteWrapper = styled.div<{ $currentIndex: number; $totalItems: number }>`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateX(-${props => (props.$currentIndex * 100)}%);
  will-change: transform;
`;

export const TestimonialQuoteSlide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

export const TestimonialQuoteCard = styled.article`
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  padding: 6px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

export const TestimonialQuoteContent = styled.blockquote`
  padding: 0;
  font-size: 1.5rem;
  line-height: 1.4;
  color: #1a1a1a;
  font-weight: 500;
  position: relative;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 1.75rem;
      margin-bottom: 48px;
    `,
  )}

  ${bp.min(
    breakpointNames.large,
    css`
      font-size: 2rem;
    `,
  )}
`;

export const TestimonialQuoteFrom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  ${bp.min(
    breakpointNames.medium,
    css`
      flex-direction: row;
      justify-content: center;
      gap: 24px;
    `,
  )}
`;

export const AvatarContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--blue), #6c757d);
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

  ${bp.min(
    breakpointNames.medium,
    css`
      width: 96px;
      height: 96px;
    `,
  )}
`;

export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--blue);
  color: var(--white);
  font-weight: 600;
  font-size: 1.75rem;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 2rem;
    `,
  )}
`;

export const TestimonialQuoteInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

export const TestimonialQuoteName = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.4;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 1.375rem;
    `,
  )}
`;

export const TestimonialQuotePosition = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #666666;
  line-height: 1.4;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 1.125rem;
    `,
  )}
`;

export const StarRating = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 4px;
`;

export const Star = styled.span<{ $filled: boolean }>`
  color: ${props => props.$filled ? 'var(--nav-hover-color)' : '#e0e0e0'};
  font-size: 1.25rem;
  line-height: 1;
  transition: color 0.3s ease;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 1.375rem;
    `,
  )}
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
  background: ${props =>
    props.$active
      ? 'var(--nav-hover-color)'
      : '#e0e0e0'
  };
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--nav-hover-color);
    transform: scale(1.2);
  }

  &:focus-visible {
    outline: 2px solid var(--nav-hover-color);
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