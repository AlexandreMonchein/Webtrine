import styled from "styled-components";

import { COLORS, WEIGHTS } from "./constants";
import { Spacer } from "./spacer.styled";

export function formatPrice(price) {
  return `$${price / 100}`;
}

export function pluralize(string, num) {
  return num === 1 ? `1 ${string}` : `${num} ${string}s`;
}

export const Card = ({ slug, name, imageSrc, price, numOfColors }) => {
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 16px 16px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;
const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  margin: 0;
`;
