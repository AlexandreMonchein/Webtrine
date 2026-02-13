import classNames from "classnames";
import React, { useEffect, useState } from "react";

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

  // Utilisation du hook fullscreen
  const fullscreenMode = useFullscreenMode(images.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalBetweenImages);

    return () => clearInterval(timer);
  }, [images.length, intervalBetweenImages]);

  useEffect(() => {
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
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.carouselWrapper}>
        {images.map((src, index) => (
          <button
            type="button"
            key={src}
            className={classNames(styles.carouselImageButton, {
              [styles.carouselImageActive]: index === currentIndex,
            })}
            onClick={() => fullscreenMode.openFullscreen(index)}
            aria-label={`Voir l'image ${index + 1} de ${name} en plein écran`}
          >
            <img
              src={src}
              alt={`${name} tattoo ${index + 1}`}
              className={styles.carouselImage}
              draggable={false}
            />
          </button>
        ))}
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
        <a className={styles.button} href={contactUrl}>
          PRENDRE RDV
        </a>
      </div>

      <FullscreenMode
        images={images}
        currentIndex={fullscreenMode.currentIndex ?? 0}
        isOpen={fullscreenMode.isOpen}
        onClose={fullscreenMode.closeFullscreen}
        onNext={fullscreenMode.nextImage}
        onPrev={fullscreenMode.prevImage}
        altTextPrefix={name}
      />
    </section>
  );
};

export default ArtistDescription;
