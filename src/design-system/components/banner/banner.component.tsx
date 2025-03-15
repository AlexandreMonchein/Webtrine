import { useEffect, useState } from "react";
import classNames from "classnames";

import { getCustomer } from "../../../customer.utils";
import { ToggleButton } from "../../buttons/src/classicButton.component";

import {
  Background,
  BackgroundContainer,
  ContactContainer,
  Content,
  Overlay,
  RedirectLink,
  Selector,
  SelectorsContainer,
  SubTitle,
  TextContainer,
  Title,
} from "./banner.styled";

const Banner = (datas) => {
  const customer = getCustomer();

  const {
    features: { multi, textPositionFeature, medium = false },
    title,
    subTitle,
    images,
    textPosition = "bottom-left", // default position
    contact,
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
    <Content className={classNames(textPosition, { medium: medium })}>
      {contact ? (
        <Overlay>
          <TextContainer
            className={classNames(textPosition, {
              active: textPositionFeature,
              medium: medium,
              isSplit: contact,
            })}
          >
            {title ? <Title tabIndex={0}>{title}</Title> : null}
            {subTitle ? <SubTitle tabIndex={0}>{subTitle}</SubTitle> : null}
          </TextContainer>
          <ContactContainer>
            {contact.map((info) => (
              <ToggleButton key={info.type} {...info} />
            ))}
          </ContactContainer>
        </Overlay>
      ) : (
        <TextContainer
          className={classNames(textPosition, {
            active: textPositionFeature,
            medium: medium,
            isSplit: contact,
          })}
        >
          {title ? <Title tabIndex={0}>{title}</Title> : null}
          {subTitle ? <SubTitle tabIndex={0}>{subTitle}</SubTitle> : null}
        </TextContainer>
      )}
      <BackgroundContainer>
        {images.map((image, index) => {
          const { name, copyright } = image || {};
          const { url, title } = copyright || {};

          return (
            <div key={index}>
              <Background
                key={index}
                alt={`Background ${index + 1}`}
                src={`/assets/${customer}/${name}.jpg`}
                className={classNames({ active: index === currentIndex })}
              />
              {url && title ? (
                <RedirectLink tabIndex={0} key={`link-${index}`} href={url}>
                  {title}
                </RedirectLink>
              ) : null}
            </div>
          );
        })}
      </BackgroundContainer>
      {multi ? (
        <SelectorsContainer>
          {images.map((_, index) => (
            <Selector
              key={`image-${index}`}
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
