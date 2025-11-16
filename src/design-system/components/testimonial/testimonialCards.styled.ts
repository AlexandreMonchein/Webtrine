import styled, { css } from "styled-components";

import { bp } from "../../../breakpoint";
import { breakpointNames } from "../../../breakpointDef";

export const TestimonialCardsContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 24px 0;

  ${bp.min(
    breakpointNames.medium,
    css`
      padding: 32px 0;
    `,
  )}
`;

export const TestimonialCardsWrapper = styled.div<{ $currentIndex: number }>`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateX(-${(props) => props.$currentIndex * 100}%);
  will-change: transform;
`;

export const TestimonialCardsSlide = styled.div`
  min-width: 100%;
  display: flex;
  gap: 16px;
  padding: 0 16px; /* Padding à l'intérieur de chaque slide */
  box-sizing: border-box; /* Important pour le calcul de la largeur */

  /* Responsive gap et padding */
  ${bp.min(
    breakpointNames.medium,
    css`
      gap: 20px;
      padding: 0 24px;
    `,
  )}

  ${bp.min(
    breakpointNames.large,
    css`
      gap: 24px;
    `,
  )}
`;

export const TestimonialCard = styled.div`
  background-color: var(--white);
  color: var(--text-color);
  border-radius: 12px;
  padding: 16px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
  flex: 1; /* Prend la largeur disponible dans le slide */

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.1),
      0 2px 4px rgba(0, 0, 0, 0.15);
  }

  ${bp.min(
    breakpointNames.medium,
    css`
      padding: 18px;
    `,
  )}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
`;

export const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${bp.min(
    breakpointNames.medium,
    css`
      width: 44px;
      height: 44px;
    `,
  )}
`;

export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: var(--white);
  background-color: var(--gold);

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 16px;
    `,
  )}
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: inherit;
  margin-bottom: 2px;
  line-height: 1.2;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 15px;
    `,
  )}
`;

export const UserPosition = styled.div`
  font-size: 12px;
  color: inherit;
  opacity: 0.8;
  line-height: 1.2;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 13px;
    `,
  )}
`;

export const PublicationDate = styled.div`
  font-size: 11px;
  color: inherit;
  opacity: 0.7;
  margin-top: 3px;
  line-height: 1.2;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 12px;
    `,
  )}
`;

export const GoogleBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    svg {
      width: 16px;
      height: 16px;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));

      ${bp.min(
        breakpointNames.medium,
        css`
          width: 18px;
          height: 18px;
        `,
      )}
    }
  }
`;

export const StarsContainer = styled.div`
  display: flex;
  gap: 1px;
  margin-bottom: 8px;

  ${bp.min(
    breakpointNames.medium,
    css`
      gap: 2px;
      margin-bottom: 10px;
    `,
  )}
`;

export const Star = styled.span<{ $filled: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.$filled ? "#fe8403" : "#e0e0e0")};
  line-height: 1;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 16px;
    `,
  )}
`;

export const TestimonialContent = styled.div`
  font-size: 12px;
  line-height: 1.4;
  color: inherit;

  /* Limiter à 3 lignes maximum */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${bp.min(
    breakpointNames.medium,
    css`
      font-size: 13px;
      line-height: 1.4;
    `,
  )}

  ${bp.min(
    breakpointNames.large,
    css`
      font-size: 14px;
    `,
  )}
`;

/* Navigation et pagination */
export const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
  padding: 0 16px;

  ${bp.min(
    breakpointNames.medium,
    css`
      margin-top: 32px;
      padding: 0 24px;
    `,
  )}
`;

export const NavButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${(props) => (props.$disabled ? "#e0e0e0" : "var(--gold)")};
  background-color: ${(props) =>
    props.$disabled ? "#f5f5f5" : "var(--white)"};
  color: ${(props) => (props.$disabled ? "#999" : "var(--gold)")};
  border-radius: 50%;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  font-size: 18px;

  &:hover:not(:disabled) {
    background-color: var(--gold);
    color: var(--white);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PaginationDot = styled.button<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border: none;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? "var(--nav-hover-color)" : "#e0e0e0"};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background-color: var(--nav-hover-color);
    transform: scale(1.2);
  }

  ${bp.min(
    breakpointNames.medium,
    css`
      width: 10px;
      height: 10px;
    `,
  )}
`;
