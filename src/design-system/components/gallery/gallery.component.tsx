import classNames from "classnames";
import DOMPurify from "dompurify";
import React from "react";

import { getCustomer } from "../../../customer.utils";
import { useFullscreenMode } from "../../utils/useFullscreenMode";
import FullscreenMode from "../fullscreenMode/fullscreenMode.component";
import { Card } from "./card.component";
import styles from "./gallery.module.css";
import type { CardData, GalleryProps } from "./gallery.types";

const Gallery = ({ template }: GalleryProps) => {
  const {
    title,
    description,
    type,
    inventory,
    features: { canFullScreen = false },
  } = template;

  const customer = getCustomer();
  const images = inventory.map((data: CardData) => {
    return `${import.meta.env.BASE_URL}assets/${customer}/${data.imageSrc}.webp`;
  });

  const fullscreenMode = useFullscreenMode(images.length);

  const handleCardClick = (index: number) => {
    if (canFullScreen) {
      fullscreenMode.openFullscreen(index);
    }
  };

  return (
    <>
      <section
        className={classNames(styles.galleryRoot, {
          [styles.galleryRootIsLogo]: type === "logo",
        })}
      >
        {title ? <h1 className={styles.galleryTitle}>{title}</h1> : null}
        {description ? (
          <p
            className={styles.galleryDescription}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        ) : null}
        <div className={styles.mainColumn}>
          <div
            className={classNames(styles.wrapper, {
              [styles.wrapperIsLogo]: type === "logo",
            })}
          >
            {inventory.map((data: CardData, index: number) => (
              <div
                key={data.imageSrc}
                className={classNames(styles.cardWrapper, {
                  [styles.cardWrapperIsLogo]: type === "logo",
                })}
                onClick={() => handleCardClick(index)}
                style={{ cursor: canFullScreen ? "pointer" : "default" }}
              >
                <Card data={data} type={type} />
                <p className={styles.cardDescription}>{data.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
