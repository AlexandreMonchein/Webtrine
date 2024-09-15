import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import {
  ActionButton,
  Description,
  FeatureImage,
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
  const [components, setComponents] = useState<React.ReactNode[]>([]);
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
  [];
  useEffect(() => {
    const loadComponents = async (content: Content[]) => {
      const loadedComponents: React.ReactNode[] = [];

      for (const [index, data] of Object.entries(content)) {
        try {
          const { imgSrc, text } = data;

          if (imgSrc) {
            const Module = await import(
              `../../../../assets/icons/${imgSrc}.component`
            );

            loadedComponents.push(
              <FeatureItem key={index}>
                <Module.default key={`${imgSrc}-${index}`} size={32} />
                <FeatureText key={`text-${index}`}>{text}</FeatureText>
              </FeatureItem>
            );
          }
        } catch (error) {
          console.error(`Error loading prices component`, error);
        }
      }

      setComponents(loadedComponents);
    };

    loadComponents(content);
  }, [content]);

  return (
    <PricesContainer>
      <Title>{title}</Title>
      {descriptionTop ? <Description>{descriptionTop}</Description> : null}
      <FeaturesCard>
        <FeaturesGrid>{components}</FeaturesGrid>
      </FeaturesCard>
      {!_.isEmpty(descriptionBottom)
        ? descriptionBottom.map((content) => {
            console.warn(">>> content", content);

            return <Description>{content.text}</Description>;
          })
        : null}
      <PriceContainer>
        <Price>{price}</Price>
        {per ? <Per> / {per}</Per> : null}
      </PriceContainer>
      <ActionButton
        to={{ pathname: "/contact" }}
        state={{ plan: { ...datas, title: "All In One" } }}
      >
        {t("prices.selectPlan")}
      </ActionButton>
      {additionalDescription ? (
        <Description>{additionalDescription}</Description>
      ) : null}
    </PricesContainer>
  );
};

export default AllInOne;
