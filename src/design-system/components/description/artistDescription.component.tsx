import React, { useEffect, useState } from "react";

import { useFullscreenMode } from "../../utils/useFullscreenMode";
import FullscreenMode from "../fullscreenMode/fullscreenMode.component";
import {
  Button,
  CarouselImage,
  CarouselWrapper,
  Container,
  Description,
  ImageCounter,
  InfoSection,
  InstagramIcon,
  Separator,
  Subtitle,
  TagLine,
  Title,
} from "./artistDescription.styled";

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
    <Container>
      <CarouselWrapper>
        {images.map((src, index) => (
          <CarouselImage
            key={src}
            src={src}
            alt={`${name} tattoo ${index + 1}`}
            active={index === currentIndex}
            onClick={() => fullscreenMode.openFullscreen(index)}
          />
        ))}
        <ImageCounter>
          {currentIndex + 1}/{images.length}
        </ImageCounter>
      </CarouselWrapper>

      <InfoSection>
        <Title>{name}</Title>
        <Separator />
        <Subtitle
          href={
            instagramUrl ||
            `https://instagram.com/${instagram.replace("@", "")}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {instagramIcon && <InstagramIcon>{instagramIcon}</InstagramIcon>}@
          {instagram}
        </Subtitle>
        <TagLine>{tagline}</TagLine>
        <Description>{description}</Description>
        <Button href={contactUrl}>PRENDRE RDV</Button>
      </InfoSection>

      <FullscreenMode
        images={images}
        currentIndex={fullscreenMode.currentIndex ?? 0}
        isOpen={fullscreenMode.isOpen}
        onClose={fullscreenMode.closeFullscreen}
        onNext={fullscreenMode.nextImage}
        onPrev={fullscreenMode.prevImage}
        altTextPrefix={name}
      />
    </Container>
  );
};

export default ArtistDescription;
