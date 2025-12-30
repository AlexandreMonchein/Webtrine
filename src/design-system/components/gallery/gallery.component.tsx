import classNames from "classnames";
import DOMPurify from "dompurify";
import React from "react";

import { getCustomer } from "../../../customer.utils";
import { useFullscreenMode } from "../../utils/useFullscreenMode";
import { CardDescription } from "../cards/cardsList.styled";
import FullscreenMode from "../fullscreenMode/fullscreenMode.component";
import { Card } from "./card.component";
import {
  CardWrapper,
  GalleryDescription,
  GalleryRoot,
  GalleryTitle,
  MainColumn,
  Wrapper,
} from "./gallery.styled";

const Gallery = (datas) => {
  const {
    template: {
      title,
      description,
      type,
      inventory,
      features: { canFullScreen = false },
    },
  } = datas;

  const customer = getCustomer();
  const images = inventory.map((data) => {
    return `${import.meta.env.BASE_URL}assets/${customer}/${data.imageSrc}.webp`;
  });

  const fullscreenMode = useFullscreenMode(images.length);

  const handleCardClick = (index) => {
    if (canFullScreen) {
      fullscreenMode.openFullscreen(index);
    }
  };

  return (
    <>
      <GalleryRoot className={classNames({ isLogo: type === "logo" })}>
        {title ? <GalleryTitle>{title}</GalleryTitle> : null}
        {description ? (
          <GalleryDescription
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        ) : null}
        <MainColumn>
          <Wrapper className={classNames({ isLogo: type === "logo" })}>
            {inventory.map((data, index) => (
              <CardWrapper
                key={data.imageSrc}
                className={classNames({ isLogo: type === "logo" })}
                onClick={() => handleCardClick(index)}
                style={{ cursor: canFullScreen ? "pointer" : "default" }}
              >
                <Card data={data} type={type} />
                <CardDescription>{data.description}</CardDescription>
              </CardWrapper>
            ))}
          </Wrapper>
        </MainColumn>
      </GalleryRoot>
      {canFullScreen && (
        <FullscreenMode
          images={images}
          currentIndex={fullscreenMode.currentIndex ?? 0}
          isOpen={fullscreenMode.isOpen}
          onClose={fullscreenMode.closeFullscreen}
          onNext={fullscreenMode.nextImage}
          onPrev={fullscreenMode.prevImage}
          altTextPrefix="Gallery image"
        />
      )}
    </>
  );
};

export default Gallery;
