import React, { useState, useEffect } from "react";
import { useFullscreenMode } from "../../utils/useFullscreenMode";
import FullscreenMode from "../fullscreenMode/fullscreenMode.component";
import {
  Container,
  InfoSection,
  Title,
  Subtitle,
  InstagramIcon,
  Separator,
  Description,
  Button,
  CarouselWrapper,
  CarouselImage,
  TagLine,
  ImageCounter,
} from "./artistDescription.styled";

interface ArtistDescriptionProps {
  name: string;
  instagram: string;
  tagline: string;
  description: string;
  images: string[];
  interval?: number; // in ms
  instagramUrl?: string;
  contactUrl?: string;
}

const ArtistDescription: React.FC<ArtistDescriptionProps> = ({
  name,
  instagram,
  tagline,
  description,
  images,
  interval = 5000,
  instagramUrl,
  contactUrl = "#contact",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [instagramIcon, setInstagramIcon] = useState<React.ReactNode>(null);

  // Utilisation du hook fullscreen
  const fullscreenMode = useFullscreenMode(images.length);

  const componentFiles = import.meta.glob(
    "../../../assets/**/**/*.component.tsx"
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

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
            key={index}
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
