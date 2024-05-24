import React from "react";

import {
  Card,
  CardBack,
  CardContainer,
  CardDescription,
  CardFront,
  CardImage,
  CardTitle,
  Container,
  Title,
} from "./flippingCard.styled";

export const FlippingCard = (template) => {
  const { title, images } = template;

  return (
    <Container>
      {title ? <Title>{title}</Title> : null}
      <CardContainer>
        {images.map((card, index) => (
          <Card key={index}>
            <CardFront>
              <CardImage src={card.image} alt={`Card ${index + 1}`} />
              <CardTitle>{card.title}</CardTitle>
            </CardFront>
            <CardBack>
              <CardDescription>{card.description}</CardDescription>
            </CardBack>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};
