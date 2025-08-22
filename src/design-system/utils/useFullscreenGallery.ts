import { useState, useCallback } from 'react';

export interface FullscreenGalleryState {
  currentIndex: number | null;
  isOpen: boolean;
}

export interface FullscreenGalleryActions {
  openFullscreen: (index: number) => void;
  closeFullscreen: () => void;
  nextImage: () => void;
  prevImage: () => void;
  goToImage: (index: number) => void;
}

export interface UseFullscreenGalleryResult extends FullscreenGalleryActions {
  currentIndex: number | null;
  isOpen: boolean;
}

export const useFullscreenGallery = (totalImages: number): UseFullscreenGalleryResult => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openFullscreen = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const closeFullscreen = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    if (currentIndex !== null && totalImages > 0) {
      setCurrentIndex((prev) =>
        prev === totalImages - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  }, [currentIndex, totalImages]);

  const prevImage = useCallback(() => {
    if (currentIndex !== null && totalImages > 0) {
      setCurrentIndex((prev) =>
        prev === 0 ? totalImages - 1 : (prev ?? 0) - 1
      );
    }
  }, [currentIndex, totalImages]);

  const goToImage = useCallback((index: number) => {
    if (index >= 0 && index < totalImages) {
      setCurrentIndex(index);
    }
  }, [totalImages]);

  return {
    currentIndex,
    isOpen: currentIndex !== null,
    openFullscreen,
    closeFullscreen,
    nextImage,
    prevImage,
    goToImage,
  };
};
