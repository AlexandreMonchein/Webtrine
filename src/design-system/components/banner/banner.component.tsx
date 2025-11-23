import classNames from "classnames";
import { useEffect, useState } from "react";

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
    subTitle2,
    images,
    textPosition = "bottom-left", // default position
    contact,
  } = datas;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval;

    if (multi) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }

    return () => clearInterval(interval);
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
            {title ? <Title>{title}</Title> : null}
            {subTitle ? <SubTitle>{subTitle}</SubTitle> : null}
            {subTitle2 ? <SubTitle>{subTitle2}</SubTitle> : null}
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
          {title ? <Title>{title}</Title> : null}
          {subTitle ? <SubTitle>{subTitle}</SubTitle> : null}
          {subTitle2 ? <SubTitle>{subTitle2}</SubTitle> : null}
        </TextContainer>
      )}
      <BackgroundContainer>
        {images.map((image, index) => {
          const { name, copyright } = image || {};
          const { url, title } = copyright || {};

          return (
            <div key={name}>
              <Background
                key={name}
                alt={`Background ${name}`}
                src={`/assets/${customer}/${name}.webp`}
                className={classNames({ active: index === currentIndex })}
              />
              {url && title ? (
                <RedirectLink key={`link-${url}`} href={url}>
                  {title}
                </RedirectLink>
              ) : null}
            </div>
          );
        })}
      </BackgroundContainer>
      {multi ? (
        <SelectorsContainer>
          {images.map((image, index) => (
            <Selector
              key={`image-${image.name}`}
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
