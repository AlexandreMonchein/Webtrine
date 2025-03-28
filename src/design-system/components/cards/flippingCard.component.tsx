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

const FlippingCard = ({ title, images }) => {
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

export default FlippingCard;
