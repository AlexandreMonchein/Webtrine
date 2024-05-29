import {
  Image,
  ImageWrapper,
  Info,
  Name,
  Price,
  StyledLink,
  SubInfos,
  Title,
} from "./card.styled";
import { Wrapper } from "./display.styled";
import { Spacer } from "./spacer.styled";

export function formatPrice(price) {
  return `$${price / 100}`;
}

export function pluralize(name, colors) {
  const num = colors.length;
  return num === 1 ? `1 ${name} Available` : `${num} ${name}s Available`;
}

export const Card = ({
  slug,
  name,
  description,
  imageSrc,
  price,
  extraDatas,
}) => {
  const { sizes, colors } = extraDatas;

  return (
    <StyledLink
      to={{
        pathname: `/display/${slug}`,
      }}
      state={{ slug, name, description, imageSrc, price, extraDatas }}
    >
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Title>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Title>
        <SubInfos>
          <Info>{pluralize("Color", colors)}</Info>
          <Info>{pluralize("Size", sizes)}</Info>
        </SubInfos>
      </Wrapper>
    </StyledLink>
  );
};

export default Card;
