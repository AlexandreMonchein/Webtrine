import React from "react";
import {
  Section,
  CardContainer,
  Card,
  CardTitle,
  CardDescription,
  Title,
  Description,
  CardImage,
} from "./cardsList.styled";
import { getCustomer } from "../../../customer.utils";

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
  const customer = getCustomer();

  // Calculer la logique d'affichage
  const displayInline = features?.displayInline || false;
  const isEvenCount = content.length % 2 === 0;

  // Si une seule carte, forcer l'affichage stack même en mode inline
  const shouldUseStack = !displayInline || content.length === 1;

  return (
    <Section>
      {title ? <Title tabIndex={0}>{title}</Title> : null}
      {description ? <Description tabIndex={0}>{description}</Description> : null}
      <CardContainer
        $displayInline={!shouldUseStack}
        $isEvenCount={isEvenCount}
        $cardCount={content.length}
      >
        {content.map((card, index) => (
          <Card key={index} tabIndex={0}>
            {card.imageSrc && (
              <CardImage
                src={`${import.meta.env.BASE_URL}assets/${customer}/${card.imageSrc}.webp`}
                alt={card.title}
              />
            )}
            <CardTitle>{card.title}</CardTitle>
            {card.description.map((desc, idx) => (
              <CardDescription key={idx}>{desc.text}</CardDescription>
            ))}
          </Card>
        ))}
      </CardContainer>
    </Section>
  );
};

export default Cards;
