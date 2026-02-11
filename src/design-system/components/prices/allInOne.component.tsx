import _ from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useLoadComponents } from "../../utils/useLoadComponents.hook";
import {
  ActionButton,
  Description,
  FeatureItem,
  FeaturesCard,
  FeaturesGrid,
  FeatureText,
  Per,
  Price,
  PriceContainer,
  PricesContainer,
  Title,
} from "./allInOne.styled";

interface Content {
  imgSrc: string;
  text: string;
}

interface AllInOneProps {
  title: string;
  descriptionTop: string;
  descriptionBottom: [{ text: string }];
  price: string;
  per: string;
  buttonText: string;
  additionalDescription?: string;
  content: Content[];
}

const AllInOne = (datas: AllInOneProps) => {
  const { t } = useTranslation();

  const {
    title,
    descriptionTop,
    descriptionBottom,
    price,
    per,
    additionalDescription,
    content,
  } = datas;

  const contentItems = useMemo(
    () =>
      Object.entries(content).map(([index, data]) => ({
        name: data.imgSrc,
        text: data.text,
        index,
      })),
    [content],
  );

  const components = useLoadComponents(contentItems, {
    renderFn: (Component, data) => (
      <FeatureItem key={data.index}>
        <Component size={32} aria-hidden="true" />
        <FeatureText
          id={`feature-text-${data.index}`}
          aria-describedby={`feature-text-${data.index}`}
        >
          {data.text}
        </FeatureText>
      </FeatureItem>
    ),
  }) as React.ReactNode[];

  return (
    <PricesContainer>
      {title ? <Title id="all-in-one-title">{title}</Title> : null}
      {descriptionTop ? (
        <Description className="topDesc" aria-labelledby="all-in-one-title">
          {descriptionTop}
        </Description>
      ) : null}
      <FeaturesCard aria-labelledby="all-in-one-title">
        <FeaturesGrid>{components}</FeaturesGrid>
      </FeaturesCard>
      {descriptionBottom && !_.isEmpty(descriptionBottom)
        ? descriptionBottom.map((content) => (
            <Description key={content.text} aria-labelledby="all-in-one-title">
              {content.text}
            </Description>
          ))
        : null}
      <PriceContainer>
        <Price>{price}</Price>
        {per ? <Per> / {per}</Per> : null}
      </PriceContainer>
      <ActionButton
        to={{ pathname: "/contact" }}
        state={{ plan: { ...datas, title: "All In One" } }}
        aria-label={t("prices.selectPlan")} // Adding an aria-label for the button to improve accessibility
        role="button"
        // Make sure the button is focusable by keyboard navigation
      >
        {t("prices.selectPlan")}
      </ActionButton>
      {additionalDescription ? (
        <Description aria-labelledby="all-in-one-title">
          {additionalDescription}
        </Description>
      ) : null}
    </PricesContainer>
  );
};

export default AllInOne;
