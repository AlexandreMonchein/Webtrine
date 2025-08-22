import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import FullscreenGallery from "./fullscreenGallery.component";
import { useFullscreenGallery } from "../../utils/useFullscreenGallery";

const meta: Meta<typeof FullscreenGallery> = {
  title: "Design System/Components/FullscreenGallery",
  component: FullscreenGallery,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Un composant de galerie fullscreen réutilisable avec navigation au clavier et à la souris. Peut être utilisé avec n'importe quelle collection d'images.",
      },
    },
  },
  argTypes: {
    images: {
      description: "Tableau des URLs d'images à afficher",
    },
    currentIndex: {
      description: "Index de l'image actuellement affichée",
    },
    isOpen: {
      description: "État d'ouverture de la galerie",
    },
    showCounter: {
      description: "Afficher ou non le compteur d'images",
      control: "boolean",
    },
    showNavigation: {
      description: "Afficher ou non les boutons de navigation",
      control: "boolean",
    },
    altTextPrefix: {
      description: "Préfixe pour le texte alternatif des images",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FullscreenGallery>;

// Composant wrapper pour gérer l'état avec le hook
const FullscreenGalleryDemo: React.FC<{
  images: string[];
  showCounter?: boolean;
  showNavigation?: boolean;
  altTextPrefix?: string;
}> = ({ images, showCounter, showNavigation, altTextPrefix }) => {
  const fullscreenGallery = useFullscreenGallery(images.length);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Galerie d'images avec fullscreen</h2>
      <p>Cliquez sur une image pour l'ouvrir en fullscreen :</p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              cursor: "pointer",
              border: "2px solid transparent",
              transition: "border-color 0.2s ease",
            }}
            onClick={() => fullscreenGallery.openFullscreen(index)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#007bff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "transparent";
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
        <p>
          <strong>Navigation :</strong>
        </p>
        <ul>
          <li>Flèches gauche/droite : naviguer entre les images</li>
          <li>Échap : fermer la galerie</li>
          <li>Clic sur l'overlay : fermer la galerie</li>
        </ul>
      </div>

      <FullscreenGallery
        images={images}
        currentIndex={fullscreenGallery.currentIndex ?? 0}
        isOpen={fullscreenGallery.isOpen}
        onClose={fullscreenGallery.closeFullscreen}
        onNext={fullscreenGallery.nextImage}
        onPrev={fullscreenGallery.prevImage}
        showCounter={showCounter}
        showNavigation={showNavigation}
        altTextPrefix={altTextPrefix}
      />
    </div>
  );
};

// Images d'exemple du projet
const sampleImages = [
  "/assets/webtrine/portfolio/tattoo1.webp",
  "/assets/webtrine/portfolio/tattoo2.webp",
  "/assets/webtrine/portfolio/tattoo3.webp",
  "/assets/webtrine/portfolio/tattoo4.webp",
  "/assets/webtrine/portfolio/tattoo5.webp",
];

export const Default: Story = {
  render: (args) => (
    <FullscreenGalleryDemo
      images={sampleImages}
      showCounter={args.showCounter}
      showNavigation={args.showNavigation}
      altTextPrefix={args.altTextPrefix}
    />
  ),
  args: {
    images: sampleImages,
    currentIndex: 0,
    isOpen: false,
    showCounter: true,
    showNavigation: true,
    altTextPrefix: "Portfolio image",
  },
};

export const WithoutCounter: Story = {
  render: (args) => (
    <FullscreenGalleryDemo
      images={sampleImages}
      showCounter={false}
      showNavigation={args.showNavigation}
      altTextPrefix={args.altTextPrefix}
    />
  ),
  args: {
    ...Default.args,
    showCounter: false,
  },
};

export const WithoutNavigation: Story = {
  render: (args) => (
    <FullscreenGalleryDemo
      images={sampleImages}
      showCounter={args.showCounter}
      showNavigation={false}
      altTextPrefix={args.altTextPrefix}
    />
  ),
  args: {
    ...Default.args,
    showNavigation: false,
  },
};

export const SingleImage: Story = {
  render: (args) => (
    <FullscreenGalleryDemo
      images={[sampleImages[0]]}
      showCounter={args.showCounter}
      showNavigation={args.showNavigation}
      altTextPrefix={args.altTextPrefix}
    />
  ),
  args: {
    ...Default.args,
    images: [sampleImages[0]],
  },
};
