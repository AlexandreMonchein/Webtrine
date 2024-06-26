import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { getCustomer } from "../../../../customer.utils";

import {
  Background,
  BackgroundContainer,
  Content,
  Selector,
  SelectorsContainer,
  SubTitle,
  TextContainer,
  Title,
} from "./banner.styled";

const Banner = (datas) => {
  const customer = getCustomer();

  const {
    features: { multi, textPositionFeature },
    title,
    subTitle,
    images,
    textPosition = "center-left", // default position
  } = datas;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (multi) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length, multi]);

  const handleSelectorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Content>
      <TextContainer
        className={classNames(textPosition, { active: textPositionFeature })}
      >
        {title ? <Title>{title}</Title> : null}
        {subTitle ? <SubTitle>{subTitle}</SubTitle> : null}
      </TextContainer>
      <BackgroundContainer>
        {multi ? (
          images.map((image, index) => (
            <Background
              key={index}
              alt={`Background ${index + 1}`}
              src={require(
                `../../../../assets/${customer}/presentation/banner/${image}.jpg`
              )}
              className={classNames({ active: index === currentIndex })}
            />
          ))
        ) : (
          <Background
            alt="Background image"
            src={require(
              `../../../../assets/${customer}/presentation/banner/${images[0]}.jpg`
            )}
            className={classNames({ active: true })}
          />
        )}
      </BackgroundContainer>
      {multi ? (
        <SelectorsContainer>
          {images.map((_, index) => (
            <Selector
              key={index}
              className={classNames({ active: index === currentIndex })}
              onClick={() => handleSelectorClick(index)}
            />
          ))}
        </SelectorsContainer>
      ) : null}
    </Content>
  );
};

export default Banner;
