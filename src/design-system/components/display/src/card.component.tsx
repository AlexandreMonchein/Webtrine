import { useTranslation } from "react-i18next";

import {
  Image,
  Info,
  Name,
  NewFlag,
  Price,
  SaleFlag,
  SalePrice,
  StyledLink,
  SubInfos,
  Title,
} from "./card.styled";
import { COLORS } from "./constants";
import { Wrapper } from "./display.styled";
import { isNew, pluralize } from "./display.utils";

export const Card = ({ data, shouldRedirect }) => {
  const { t } = useTranslation();
  const {
    slug,
    name,
    description,
    imageSrc,
    price,
    salePrice,
    releaseDate,
    extraDatas,
  } = data;

  const { sizes, colors } = extraDatas || {};

  console.warn(">>> shouldRedirect", data, shouldRedirect);

  const variant = salePrice
    ? "on-sale"
    : isNew(releaseDate)
      ? "newRelease"
      : "default";

  return (
    <Wrapper>
      <StyledLink
        to={{
          pathname: `/display/${slug}`,
        }}
        condition={shouldRedirect}
        state={{
          slug,
          name,
          description,
          imageSrc,
          price: variant === "on-sale" ? salePrice : price,
          extraDatas,
        }}
      >
        <Image alt="" src={imageSrc} />
        {variant === "on-sale" && <SaleFlag>{t("display.sale")}</SaleFlag>}
        {variant === "newRelease" && (
          <NewFlag>{t("display.newRelease")}</NewFlag>
        )}
      </StyledLink>
      <Title>
        <Name>{name}</Name>
        <div>
          <Price
            style={{
              color: variant === "on-sale" ? COLORS.gray[700] : undefined,
              textDecoration:
                variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {price}
          </Price>
          {variant === "on-sale" ? (
            <SalePrice>{salePrice}</SalePrice>
          ) : undefined}
        </div>
      </Title>
      <SubInfos>
        {sizes ? <Info>{pluralize("Size", sizes)}</Info> : null}
        {colors ? <Info>{pluralize("Color", colors)}</Info> : null}
      </SubInfos>
    </Wrapper>
  );
};

export default Card;
