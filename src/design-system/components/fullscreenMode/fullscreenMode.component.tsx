import React, { useEffect } from "react";

import {
  CloseButton,
  FullscreenImage,
  FullscreenOverlay,
  ImageContainer,
  ImageCounter,
  NavButton,
} from "./fullscreenMode.styled";

export interface FullscreenModeProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  showCounter?: boolean;
  showNavigation?: boolean;
  altTextPrefix?: string;
}

const FullscreenMode: React.FC<FullscreenModeProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  showCounter = true,
  showNavigation = true,
  altTextPrefix = "Image",
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, onClose, onNext, onPrev]);

  // Prévenir le scroll de la page quand le fullscreen est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || currentIndex === null || !images[currentIndex]) {
    return null;
  }

  return (
    <FullscreenOverlay onClick={onClose}>
      <CloseButton onClick={onClose} aria-label="Fermer la galerie">
        ×
      </CloseButton>

      {showNavigation && images.length > 1 && (
        <>
          <NavButton
            left={true}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Image précédente"
          >
            ‹
          </NavButton>
          <NavButton
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Image suivante"
          >
            ›
          </NavButton>
        </>
      )}

      <ImageContainer onClick={(e) => e.stopPropagation()}>
        <FullscreenImage
          src={images[currentIndex]}
          alt={`${altTextPrefix} ${currentIndex + 1}`}
        />
      </ImageContainer>

      {showCounter && images.length > 1 && (
        <ImageCounter>
          {currentIndex + 1} / {images.length}
        </ImageCounter>
      )}
    </FullscreenOverlay>
  );
};

export default FullscreenMode;
