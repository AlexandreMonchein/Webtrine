import styled from "styled-components";

import ConditionalLink from "../../link/src/link.component";

import { COLORS, WEIGHTS } from "./constants";

export const StyledLink = styled(ConditionalLink)`
  text-decoration: none;
  color: inherit;
`;

export const Wrapper = styled.article``;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: 261px;
  object-fit: cover;
  border-radius: 16px 16px 16px 16px;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const SubInfos = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

export const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

export const SalePrice = styled.span`
  padding-left: 5px;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export const Info = styled.p`
  color: ${COLORS.gray[700]};
  margin: 0;
`;

export const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
  border-radius: 2px;
`;

export const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`;
export const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`;
