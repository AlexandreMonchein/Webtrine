import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";

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

  const componentFiles = import.meta.glob("../../../assets/**/*.component.tsx");

  useEffect(() => {
    const loadComponents = async (content: Content[]) => {
      const loadedComponents: React.ReactNode[] = [];

      for (const [index, data] of Object.entries(content)) {
        try {
          const { imgSrc, text } = data;

          if (imgSrc) {
            const componentPath = `../../../assets/icons/${imgSrc}.component.tsx`;
            const module = componentFiles[componentPath];

            if (module) {
              const resolvedModule = await module();
              // @ts-expect-error TODO: to fix
              const Component = resolvedModule.default;

              loadedComponents.push(
                <FeatureItem key={index} tabIndex={0}>
                  <Component
                    key={`${imgSrc}-${index}`}
                    size={32}
                    aria-hidden="true" // Ensures that the icon is not read by screen readers
                  />
                  <FeatureText
                    id={`feature-text-${index}`}
                    aria-describedby={`feature-text-${index}`}
                  >
                    {text}
                  </FeatureText>
                </FeatureItem>
              );
            }
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
      {title ? (
        <Title id="all-in-one-title" tabIndex={0}>
          {title}
        </Title>
      ) : null}
      {descriptionTop ? (
        <Description
          className="topDesc"
          aria-labelledby="all-in-one-title"
          tabIndex={0}
        >
          {descriptionTop}
        </Description>
      ) : null}
      <FeaturesCard aria-labelledby="all-in-one-title">
        <FeaturesGrid>{components}</FeaturesGrid>
      </FeaturesCard>
      {!_.isEmpty(descriptionBottom)
        ? descriptionBottom.map((content, index) => (
            <Description
              key={index}
              aria-labelledby="all-in-one-title"
              tabIndex={0}
            >
              {content.text}
            </Description>
          ))
        : null}
      <PriceContainer>
        <Price tabIndex={0}>{price}</Price>
        {per ? <Per tabIndex={0}> / {per}</Per> : null}
      </PriceContainer>
      <ActionButton
        to={{ pathname: "/contact" }}
        state={{ plan: { ...datas, title: "All In One" } }}
        aria-label={t("prices.selectPlan")} // Adding an aria-label for the button to improve accessibility
        role="button"
        tabIndex={0} // Make sure the button is focusable by keyboard navigation
      >
        {t("prices.selectPlan")}
      </ActionButton>
      {additionalDescription ? (
        <Description aria-labelledby="all-in-one-title" tabIndex={0}>
          {additionalDescription}
        </Description>
      ) : null}
    </PricesContainer>
  );
};

export default AllInOne;
