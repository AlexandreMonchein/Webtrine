import _ from "lodash";
import React, { useEffect, useState } from "react";
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

const componentFiles = import.meta.glob("../../../assets/**/*.component.tsx");

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

  useEffect(() => {
    const loadComponents = async (content: Content[]) => {
      const loadedComponents: React.ReactNode[] = [];

      const contentEntries = Object.entries(content);
      const componentPromises = contentEntries.map(async ([index, data]) => {
        try {
          const { imgSrc, text } = data;

          if (imgSrc) {
            const componentPath = `../../../assets/icons/${imgSrc}.component.tsx`;
            const module = componentFiles[componentPath];

            if (module) {
              const resolvedModule = await module();
              // @ts-expect-error TODO: to fix
              const Component = resolvedModule.default;

              return (
                <FeatureItem key={index}>
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
          return null;
        } catch (error) {
          console.error(`Error loading prices component`, error);
          return null;
        }
      });

      const resolvedComponents = await Promise.all(componentPromises);
      loadedComponents.push(...resolvedComponents.filter(Boolean));

      setComponents(loadedComponents);
    };

    loadComponents(content);
  }, [content]);

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
