import React, { useState, useEffect } from "react";
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
  FullscreenOverlay,
  FullscreenImage,
  CloseButton,
  NavButton,
  TagLine,
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
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [instagramIcon, setInstagramIcon] = useState<React.ReactNode>(null);

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
        console.error('Error loading Instagram icon:', error);
      }
    };

    loadInstagramIcon();
  }, []);

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  const nextImage = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((prev) =>
        prev === images.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  const prevImage = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((prev) =>
        prev === 0 ? images.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  return (
    <Container>
      <CarouselWrapper>
        {images.map((src, index) => (
          <CarouselImage
            key={index}
            src={src}
            alt={`${name} tattoo ${index + 1}`}
            active={index === currentIndex}
            onClick={() => openFullscreen(index)}
          />
        ))}
      </CarouselWrapper>

      <InfoSection>
        <Title>{name}</Title>
        <Separator />
        <Subtitle
          href={instagramUrl || `https://instagram.com/${instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {instagramIcon && (
            <InstagramIcon>
              {instagramIcon}
            </InstagramIcon>
          )}
          @{instagram}
        </Subtitle>
        <TagLine>{tagline}</TagLine>
        <Description>{description}</Description>
        <Button href={contactUrl}>PRENDRE RDV</Button>
      </InfoSection>

      {fullscreenIndex !== null && (
        <FullscreenOverlay>
          <CloseButton onClick={closeFullscreen}>×</CloseButton>
          <NavButton left onClick={prevImage}>
            ‹
          </NavButton>
          <FullscreenImage
            src={images[fullscreenIndex]}
            alt={`fullscreen ${fullscreenIndex + 1}`}
          />
          <NavButton onClick={nextImage}>›</NavButton>
        </FullscreenOverlay>
      )}
    </Container>
  );
};

export default ArtistDescription;
