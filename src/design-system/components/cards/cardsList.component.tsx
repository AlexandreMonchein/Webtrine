import React from "react";

import { getCustomer } from "../../../customer.utils";
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

  return (
    <Section>
      {title ? <Title>{title}</Title> : null}
      {description ? <Description>{description}</Description> : null}
      <CardContainer
        $displayInline={!shouldUseStack}
        $isEvenCount={isEvenCount}
        $cardCount={content.length}
      >
        {content.map((card) => (
          <Card key={card.title}>
            {card.imageSrc && (
              <CardImage
                src={`${import.meta.env.BASE_URL}assets/${customer}/${card.imageSrc}.webp`}
                alt={card.title}
              />
            )}
            <CardTitle>{card.title}</CardTitle>
            {card.description.map((desc) => (
              <CardDescription key={desc.text}>{desc.text}</CardDescription>
            ))}
          </Card>
        ))}
      </CardContainer>
    </Section>
  );
};

export default Cards;
