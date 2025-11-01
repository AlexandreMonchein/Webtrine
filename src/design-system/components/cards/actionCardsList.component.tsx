import React from "react";
import {
  Section,
  SectionTitle,
  CardsGrid,
  Card,
  CardImageWrapper,
  CardContent,
  ButtonsWrapper,
  ActionCardButton,
} from "./actionCardsList.styled";
import { ActionCardsListProps } from "./actionCardsList.types";
import { getCustomer } from "../../../customer.utils";

const ActionCardsList: React.FC<ActionCardsListProps> = (props) => {
  const customer = getCustomer();
  const { title, cards } = props;

  return (
    <Section aria-labelledby="action-cards-list-title">
      {title ? (
        <SectionTitle id="action-cards-list-title">{title}</SectionTitle>
      ) : null}

      <CardsGrid>
        {cards.map((card) => (
          <Card key={card.id}>
            <CardImageWrapper>
              {card.imageSrc ? (
                <img
                  src={`${import.meta.env.BASE_URL}assets/${customer}/${card.imageSrc}.webp`}
                  alt={card.title || card.imageSrc}
                />
              ) : null}
              <CardContent>
                {card.title ? <h3 tabIndex={0}>{card.title}</h3> : null}
                <ButtonsWrapper>
                  {card.description ? (
                    <p tabIndex={0}>{card.description}</p>
                  ) : null}
                  {card.buttons
                    ? card.buttons.map((btn, index) => (
                        <ActionCardButton
                          to={{ pathname: "/information" }}
                          state={{ type: btn.type }}
                          key={index}
                          tabIndex={0}
                          type="button"
                        >
                          {btn.label}
                        </ActionCardButton>
                      ))
                    : null}
                </ButtonsWrapper>
              </CardContent>
            </CardImageWrapper>
          </Card>
        ))}
      </CardsGrid>
    </Section>
  );
};

export default ActionCardsList;