import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { FocusTrapProvider } from "../../utils/focusTrap/focusTrap.provider";
import { MODAL_TYPES } from "../../utils/focusTrap/type";
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
  anchorButtonId?: string; // ID of button that opened gallery (for focus return)
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
  anchorButtonId,
}) => {
  // Keep component mounted briefly after close to allow focus trap cleanup
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      return undefined;
    } else if (shouldRender) {
      // Delay unmount to allow FocusTrapProvider to release focus
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 50);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, shouldRender]);

  useEffect(() => {
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

  if (!shouldRender || currentIndex === null || !images[currentIndex]) {
    return null;
  }

  const modalContent = (
    <FocusTrapProvider
      isVisible={isOpen}
      type={MODAL_TYPES.FULLSCREEN_GALLERY}
      customAnchorId={anchorButtonId}
    >
      <FullscreenOverlay
        id="fullscreenGallery"
        onClick={() => {
          onClose();
        }}
      >
        <CloseButton
          id="fullscreenCloseButton"
          onClick={() => {
            onClose();
          }}
          aria-label="Fermer la galerie"
        >
          ×
        </CloseButton>

        {showNavigation && images.length > 1 && (
          <>
            <NavButton
              $left={true}
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
    </FocusTrapProvider>
  );

  // Utiliser un portal pour rendre le modal au niveau du body
  return createPortal(modalContent, document.body);
};

export default FullscreenMode;
