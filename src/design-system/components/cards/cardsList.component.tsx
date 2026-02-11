import DOMPurify from "dompurify";
import React, { useMemo } from "react";

import { getCustomer } from "../../../customer.utils";
import { useLoadComponents } from "../../utils/useLoadComponents.hook";
import {
  Card,
  CardContainer,
  CardDescription,
  CardImage,
  CardTitle,
  Description,
  Section,
  Title,
} from "./cardsList.styled";

interface CardData {
  title: string;
  description: [{ text: string }];
  imageSrc?: string; // Image optionnelle
  icon?: string; // Icone optionnelle
}

interface CardsProps {
  title: string;
  description: string;
  content: CardData[];
  features?: {
    displayInline?: boolean; // Active l'affichage côte à côte
  };
}

const Cards: React.FC<CardsProps> = (props) => {
  const { title, description, content, features } = props;
  const { displayInline = false } = features || {};
  const customer = getCustomer();

  // Calculer la logique d'affichage
  const isEvenCount = content.length % 2 === 0;

  // Si une seule carte, forcer l'affichage stack même en mode inline
  const shouldUseStack = !displayInline || content.length === 1;

  // Mémoriser la liste des noms d'icônes pour éviter les re-renders
  const iconNames = useMemo(
    () => content.filter((card) => card.icon).map((card) => card.icon!),
    [content],
  );

  const iconComponents = useLoadComponents(iconNames, {
    returnAsRecord: true,
  }) as Record<string, React.ComponentType<{ size?: number }> | null>;

  return (
    <Section>
      {title ? <Title>{title}</Title> : null}
      {description ? <Description>{description}</Description> : null}
      <CardContainer
        $displayInline={!shouldUseStack}
        $isEvenCount={isEvenCount}
        $cardCount={content.length}
      >
        {content.map((card) => {
          const IconComponent = card.icon ? iconComponents[card.icon] : null;
          return (
            <Card key={card.title}>
              {card.imageSrc && (
                <CardImage
                  src={`${import.meta.env.BASE_URL}assets/${customer}/${card.imageSrc}.webp`}
                  alt={card.title}
                />
              )}
              {IconComponent && <IconComponent size={64} />}
              <CardTitle>{card.title}</CardTitle>
              {card.description.map((desc) => (
                <CardDescription
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(desc.text),
                  }}
                  key={desc.text}
                />
              ))}
            </Card>
          );
        })}
      </CardContainer>
    </Section>
  );
};

export default Cards;
