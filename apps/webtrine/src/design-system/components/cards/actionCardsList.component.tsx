import React from "react";

import { getCustomer } from "../../../customer.utils";
import {
  ActionCardButton,
  ButtonsWrapper,
  Card,
  CardContent,
  CardImageWrapper,
  CardsGrid,
  Section,
  SectionTitle,
} from "./actionCardsList.styled";
import { ActionCardsListProps } from "./actionCardsList.types";

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
                {card.title ? <h3>{card.title}</h3> : null}
                <ButtonsWrapper>
                  {card.description ? <p>{card.description}</p> : null}
                  {card.buttons
                    ? card.buttons.map((btn) => (
                        <ActionCardButton
                          to={{ pathname: btn.route, hash: btn.hash || "" }}
                          state={{ type: btn.type }}
                          key={btn.label}
                          id={btn.id}
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
