import React from "react";
import {
  Section,
  CardContainer,
  Card,
  CardTitle,
  CardDescription,
  Title,
} from "./cardsList.styled";

interface CardData {
  title: string;
  description: string;
}

interface CardsProps {
  title: string;
  content: CardData[];
}

const Cards: React.FC<CardsProps> = (props) => {
  const { title, content } = props;

  return (
    <Section>
      <Title tabIndex={0}>{title}</Title>
      <CardContainer>
        {content.map((card, index) => (
          <Card key={index} tabIndex={0}>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </Card>
        ))}
      </CardContainer>
    </Section>
  );
};

export default Cards;
