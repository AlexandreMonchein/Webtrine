import classNames from "classnames";
import React from "react";
import { useFullscreenMode } from "../../utils/useFullscreenMode";
import FullscreenMode from "../fullscreenMode/fullscreenMode.component";
import { getCustomer } from "../../../customer.utils";

import { Card } from "./card.component";
import {
  CardWrapper,
  GalleryRoot,
  MainColumn,
  Wrapper,
} from "./gallery.styled";

const Gallery = (datas) => {
  const {
    template: { type, inventory, features: { canFullScreen } },

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
