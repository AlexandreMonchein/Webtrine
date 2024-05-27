import React from "react";
import classNames from "classnames";

import { SectionTitle } from "../../description/src/description.styled";

import {
  Description,
  Item,
  ItemsGrid,
  RoundImage,
  SectionContainer,
  TextContainer,
  Title,
} from "./showcase.styled";

const Showcase = (datas) => {
  const { title, images } = datas;

  const isSingleItem = images.length === 1;
  const isOdd = images.length % 2 !== 0;
  const isEven = images.length % 2 === 0;

  return (
    <SectionContainer>
      {title ? <SectionTitle>{title}</SectionTitle> : null}
      <ItemsGrid className={classNames({ isOdd: isOdd, isEven: isEven })}>
        {images.map((data, index) => (
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

export default Showcase;
