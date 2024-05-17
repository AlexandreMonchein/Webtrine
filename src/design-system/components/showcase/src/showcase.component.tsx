import React from "react";
import classNames from "classnames";

import { SectionTitle } from "../../who-we-are/src/description.styled";

import {
  Description,
  Item,
  ItemsGrid,
  RoundImage,
  SectionContainer,
  TextContainer,
  Title,
} from "./showcase.styled";

export const Showcase = () => {
  const template = {
    title: "Voici l'équipe",
    content: [
      {
        image: "https://via.placeholder.com/150",
        title: "Item 1",
        description: "Enim anim non sit magna Lorem incididunt magna cupidatat. Irure do mollit officia est irure culpa laborum dolor laborum. Consectetur proident exercitation voluptate excepteur Lorem irure anim ut consequat in commodo id eu cupidatat.",
      },
      {
        image: "https://via.placeholder.com/150",
        title: "Item 2",
        description: "Enim anim non sit magna Lorem incididunt magna cupidatat. Irure do mollit officia est irure culpa laborum dolor laborum. Consectetur proident exercitation voluptate excepteur Lorem irure anim ut consequat in commodo id eu cupidatat.",
      },
      {
        image: "https://via.placeholder.com/150",
        title: "Item 3",
        description: "Enim anim non sit magna Lorem incididunt magna cupidatat. Irure do mollit officia est irure culpa laborum dolor laborum. Consectetur proident exercitation voluptate excepteur Lorem irure anim ut consequat in commodo id eu cupidatat.",
      },
      {
        image: "https://via.placeholder.com/150",
        title: "Item 4",
        description: "Enim anim non sit magna Lorem incididunt magna cupidatat. Irure do mollit officia est irure culpa laborum dolor laborum. Consectetur proident exercitation voluptate excepteur Lorem irure anim ut consequat in commodo id eu cupidatat.",
      },
      {
        image: "https://via.placeholder.com/150",
        title: "Item 5",
        description: "Enim anim non sit magna Lorem incididunt magna cupidatat. Irure do mollit officia est irure culpa laborum dolor laborum. Consectetur proident exercitation voluptate excepteur Lorem irure anim ut consequat in commodo id eu cupidatat.",
      },
      // {
      //   image: "https://via.placeholder.com/150",
      //   title: "Item 6",
      //   description: "Enim anim non sit magna Lorem incididunt magna cupidatat. Irure do mollit officia est irure culpa laborum dolor laborum. Consectetur proident exercitation voluptate excepteur Lorem irure anim ut consequat in commodo id eu cupidatat.",
      // },
    ],
  };

  const isSingleItem = template.content.length === 1;
  const isOdd = template.content.length % 2 !== 0;
  const isEven = template.content.length % 2 === 0;

  return (
    <SectionContainer>
      {template.title ? <SectionTitle>{template.title}</SectionTitle> : null}
      <ItemsGrid className={classNames({ isOdd: isOdd, isEven: isEven })}>
        {template.content.map((data, index) => (
          <Item
            key={index}
            className={classNames({
              isSingleItem,
              "first-item": isOdd && index === 0,
              "regular-item": isOdd && index !== 0,
            })}
          >
            <RoundImage
              src={data.image}
              alt={data.title}
              className={classNames({
                isSingleItem,
                "first-item": isOdd && index === 0,
              })}
            />
            <TextContainer
              className={classNames({
                isSingleItem,
                "first-item": isOdd && index === 0,
              })}
            >
              <Title>{data.title}</Title>
              <Description>{data.description}</Description>
            </TextContainer>
          </Item>
        ))}
      </ItemsGrid>
    </SectionContainer>
  );
};