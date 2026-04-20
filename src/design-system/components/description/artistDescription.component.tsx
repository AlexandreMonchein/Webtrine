import classNames from "classnames";
import React, { useEffect, useState } from "react";

import { useLazyLoad } from "../../../hooks/useLazyLoad";
import { useFullscreenMode } from "../../utils/useFullscreenMode";
import FullscreenMode from "../fullscreenMode/fullscreenMode.component";
import styles from "./artistDescription.module.css";

interface ArtistDescriptionData {
  name: string;
  instagram: string;
  tagline: string;
  description: string;
  images: string[];
  intervalBetweenImages?: number; // in ms
  instagramUrl?: string;
  contactUrl?: string;
}

const componentFiles = import.meta.glob(
  "../../../assets/**/**/*.component.tsx",
);

const ArtistDescription: React.FC<{ datas: ArtistDescriptionData }> = ({
  datas,
}) => {
  const {
    name,
    instagram,
    tagline,
    description,
    images,
    intervalBetweenImages = 5000,
    instagramUrl,
    contactUrl = "#contact",
  } = datas;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [instagramIcon, setInstagramIcon] = useState<React.ReactNode>(null);

  // ID unique pour le bouton du carousel (pour le retour du focus)
  const carouselButtonId = `carousel-button-${name.toLowerCase().replace(/\s+/g, "-")}`;

  // Utilisation du hook fullscreen
  const fullscreenMode = useFullscreenMode(images.length);

  // Lazy loading du composant
  const { elementRef, isVisible } = useLazyLoad({
    threshold: 0.1,
    rootMargin: "200px",
    triggerOnce: true,
  });

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalBetweenImages);

    return () => clearInterval(timer);
  }, [images.length, intervalBetweenImages, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const loadInstagramIcon = async () => {
      try {
        const componentPath = `../../../assets/icons/instagram.component.tsx`;
        const module = componentFiles[componentPath];

        if (module) {
          const resolvedModule = await module();
          // @ts-expect-error TODO: to fix
          const Component = resolvedModule.default;

          setInstagramIcon(<Component color="black" />);
        }
      } catch (error) {
        console.error("Error loading Instagram icon:", error);
      }
    };

    loadInstagramIcon();
  }, [isVisible]);

  return (
    <section ref={elementRef} className={styles.container}>
      <div className={styles.carouselWrapper}>
        {isVisible &&
          images.map((src, index) => (
            <div
              key={src}
              className={classNames(styles.carouselImageButton, {
                [styles.carouselImageActive]: index === currentIndex,
              })}
              role="img"
              aria-label={`${name} tattoo ${index + 1}`}
            >
              <img
                src={src}
                alt=""
                className={styles.carouselImage}
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        <button
          id={carouselButtonId}
          type="button"
          className={styles.carouselOpenButton}
          onClick={() => {
            fullscreenMode.openFullscreen(currentIndex);
          }}
          aria-label={`Ouvrir la galerie de ${name} (${images.length} images)`}
        >
          <span className={styles.visuallyHidden}>
            Ouvrir la galerie de {name}
          </span>
        </button>
        <div className={styles.imageCounter}>
          {currentIndex + 1}/{images.length}
        </div>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.title}>{name}</h2>
        <hr className={styles.separator} />
        <a
          className={styles.subtitle}
          href={
            instagramUrl ||
            `https://instagram.com/${instagram.replace("@", "")}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {instagramIcon && (
            <div className={styles.instagramIcon}>{instagramIcon}</div>
          )}
          @{instagram}
        </a>
        <p className={styles.tagLine}>{tagline}</p>
        <p className={styles.description}>{description}</p>
        <a
          className={styles.button}
          href={`${contactUrl}${contactUrl.includes("?") ? "&" : "?"}artist=${encodeURIComponent(name)}`}
        >
          PRENDRE RDV
        </a>
      </div>

      {isVisible && (
        <FullscreenMode
          images={images}
          currentIndex={fullscreenMode.currentIndex ?? 0}
          isOpen={fullscreenMode.isOpen}
          onClose={fullscreenMode.closeFullscreen}
          onNext={fullscreenMode.nextImage}
          onPrev={fullscreenMode.prevImage}
          altTextPrefix={name}
          anchorButtonId={carouselButtonId}
        />
      )}
    </section>
  );
};

export default ArtistDescription;
