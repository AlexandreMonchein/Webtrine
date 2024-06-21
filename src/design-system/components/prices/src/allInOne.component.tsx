import React from "react";
import { useTranslation } from "react-i18next";

import {
  ActionButton,
  Description,
  FeatureImage,
  FeatureItem,
  FeaturesCard,
  FeaturesGrid,
  FeatureText,
  Price,
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
  descriptionBottom: string;
  price: string;
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
    additionalDescription,
    content,
  } = datas;

  return (
    <PricesContainer>
      <Title>{title}</Title>
      <Description>{descriptionTop}</Description>
      <FeaturesCard>
        <FeaturesGrid>
          {content.map((feature, index) => (
            <FeatureItem key={index}>
              <FeatureImage src={feature.imgSrc} alt={`Feature ${index + 1}`} />
              <FeatureText>{feature.text}</FeatureText>
            </FeatureItem>
          ))}
        </FeaturesGrid>
      </FeaturesCard>
      <Description>{descriptionBottom}</Description>
      <Price>{price}</Price>
      <ActionButton
        to={{ pathname: "/contact" }}
        state={{ plan: { ...datas, title: "All In One" } }}
      >
        {t("prices.selectPlan")}
      </ActionButton>
      <Description>{additionalDescription}</Description>
    </PricesContainer>
  );
};

export default AllInOne;
