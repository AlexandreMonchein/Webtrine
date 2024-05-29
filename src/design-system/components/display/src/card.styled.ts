import { Link } from "react-router-dom";
import styled from "styled-components";

import { COLORS, WEIGHTS } from "./constants";

export const StyledLink = styled(Link)`
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

export const Info = styled.p`
  color: ${COLORS.gray[700]};
  margin: 0;
`;
