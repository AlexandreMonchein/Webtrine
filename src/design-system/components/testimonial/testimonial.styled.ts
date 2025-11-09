import styled, { css } from 'styled-components';
import { breakpoints } from '../../../breakpointDef';

export const TestimonialContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

export const TestimonialWrapper = styled.div<{ $currentIndex: number; $totalItems: number }>`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateX(-${props => (props.$currentIndex * 100)}%);
  will-change: transform;
`;

export const TestimonialSlide = styled.div`
  min-width: 100%;
  padding: 0 var(--spacing-md, 16px);
  box-sizing: border-box;
`;

export const TestimonialCard = styled.article<{ $variant?: 'default' | 'compact' | 'featured' }>`
  background: var(--color-surface, #ffffff);
  border: 1px solid var(--color-border, #e1e5e9);
  border-radius: var(--border-radius-lg, 12px);
  padding: var(--spacing-lg, 24px);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.15));
    transform: translateY(-2px);
  }

  ${props => props.$variant === 'compact' && css`
    padding: var(--spacing-md, 16px);
  `}

  ${props => props.$variant === 'featured' && css`
    padding: var(--spacing-xl, 32px);
    border: 2px solid var(--color-primary, #007bff);
    box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.2));
  `}

  @media ${breakpoints.tablet} {
    padding: var(--spacing-xl, 32px);
  }
`;

export const TestimonialHeader = styled.header`
  display: flex;
  align-items: center;
  gap: var(--spacing-md, 16px);
  margin-bottom: var(--spacing-md, 16px);
`;

export const AvatarContainer = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-surface-variant, #f5f5f5);

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
    background: linear-gradient(45deg, var(--color-primary, #007bff), var(--color-secondary, #6c757d));
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
  background: var(--color-primary, #007bff);
  color: var(--color-on-primary, #ffffff);
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
  color: var(--color-on-surface, #1a1a1a);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TestimonialPosition = styled.p`
  margin: 4px 0 0 0;
  font-size: 0.875rem;
  color: var(--color-on-surface-variant, #666666);
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
  color: ${props => props.$filled ? 'var(--color-warning, #ffc107)' : 'var(--color-surface-variant, #e0e0e0)'};
  font-size: 1rem;
  line-height: 1;
  transition: color 0.3s ease;
`;

export const TestimonialContent = styled.blockquote`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-on-surface, #1a1a1a);
  flex: 1;
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -8px;
    left: -8px;
    font-size: 3rem;
    color: var(--color-primary, #007bff);
    opacity: 0.3;
    line-height: 1;
    pointer-events: none;
  }

  @media ${breakpoints.tablet} {
    font-size: 1.125rem;
  }
`;

export const TestimonialFooter = styled.footer`
  margin-top: var(--spacing-md, 16px);
  padding-top: var(--spacing-md, 16px);
  border-top: 1px solid var(--color-border-variant, #f0f0f0);
  font-size: 0.875rem;
  color: var(--color-on-surface-variant, #666666);
  text-align: right;
`;

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-md, 16px);
  margin-top: var(--spacing-lg, 24px);

  @media ${breakpoints.mobile} {
    gap: var(--spacing-sm, 8px);
  }
`;

export const NavigationButton = styled.button<{ $disabled?: boolean }>`
  width: 48px;
  height: 48px;
  border: 1px solid var(--color-border, #e1e5e9);
  border-radius: 50%;
  background: var(--color-surface, #ffffff);
  color: var(--color-on-surface, #1a1a1a);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.25rem;

  &:hover:not(:disabled) {
    background: var(--color-primary, #007bff);
    color: var(--color-on-primary, #ffffff);
    border-color: var(--color-primary, #007bff);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary, #007bff);
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
  gap: var(--spacing-sm, 8px);
  margin-top: var(--spacing-md, 16px);
`;

export const PaginationDot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: ${props =>
    props.$active
      ? 'var(--color-primary, #007bff)'
      : 'var(--color-surface-variant, #e0e0e0)'
  };
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-primary, #007bff);
    transform: scale(1.2);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary, #007bff);
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