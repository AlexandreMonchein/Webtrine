import React from "react";
import { useTranslation } from "react-i18next";

import {
  ActionButton,
  CardPrice,
  CardTitle,
  FeatureItem,
  FeaturesList,
  PriceCard,
  PriceCardsContainer,
  PricesContainer,
  SubTitle,
  Title,
} from "./multiplePrices.styled";

interface Plan {
  title: string;
  price: string;
  features: string[];
}

interface MultiplePricesProps {
  title: string;
  subtitle: string;
  plans: Plan[];
}

const MultiplePrices = (datas: MultiplePricesProps) => {
  const { t } = useTranslation();

  const { title, subtitle, plans } = datas;

  return (
    <PricesContainer>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
      <PriceCardsContainer>
        {plans.map((plan, index) => (
          <PriceCard key={index}>
            <CardTitle>{plan.title}</CardTitle>
            <CardPrice>{plan.price}</CardPrice>
            <FeaturesList>
              {plan.features.map((feature, idx) => (
                <FeatureItem key={idx}>{feature}</FeatureItem>
              ))}
            </FeaturesList>
            <ActionButton to={{ pathname: "/contact" }} state={{ plan }}>
              {t("prices.selectPlan")}
            </ActionButton>
          </PriceCard>
        ))}
      </PriceCardsContainer>
    </PricesContainer>
  );
};

export default MultiplePrices;
