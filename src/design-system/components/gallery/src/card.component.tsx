import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { getCustomer } from "../../../../customer.utils";

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
import { Wrapper } from "./gallery.styled";
import { isNew, pluralize } from "./gallery.utils";

export const Card = ({ data, shouldRedirect, type }) => {
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
  const customer = getCustomer();

  const variant = salePrice
    ? "on-sale"
    : isNew(releaseDate)
      ? "newRelease"
      : "default";

  return (
    <Wrapper className={classNames({ isLogo: type === "logo" })}>
      <StyledLink
        to={{
          pathname: `/gallery/${slug}`,
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
        <Image
          alt={imageSrc}
          src={require(`../../../../assets/${customer}/${imageSrc}.jpg`)}
        />
        {variant === "on-sale" && <SaleFlag>{t("gallery.sale")}</SaleFlag>}
        {variant === "newRelease" && (
          <NewFlag>{t("gallery.newRelease")}</NewFlag>
        )}
      </StyledLink>
      {name ? (
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
      ) : null}
      <SubInfos>
        {sizes ? <Info>{pluralize("Size", sizes)}</Info> : null}
        {colors ? <Info>{pluralize("Color", colors)}</Info> : null}
      </SubInfos>
    </Wrapper>
  );
};

export default Card;
