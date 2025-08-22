import type { Meta, StoryObj } from "@storybook/react";
import ArtistDescription from "./artistDescription.component";

const meta: Meta<typeof ArtistDescription> = {
  title: "Design System/Components/Description/ArtistDescription",
  component: ArtistDescription,
};

export default meta;
type Story = StoryObj<typeof ArtistDescription>;

export const Default: Story = {
  args: {
    name: "DUF",
    instagram: "duftattoo",
    tagline: "MINIMALISTE / CONTEMPORAIN / ÉPURÉ",
    description:
      "Florian est un artiste autodidacte depuis 2012. Il fait ses débuts dans le graffiti et se perfectionne en découvrant le tatouage. Créateur et gérant du studio APT.235, il réalise aujourd'hui des tattoos aux lignes simples et épurées au style reconnaissable. Ses créations sont influencées par l'art contemporain, l'architecture et le design minimaliste, ce qui lui permet de proposer des compositions uniques. Il aime travailler sur des projets personnalisés et collaborer avec ses clients pour traduire leurs idées en tatouages qui traversent le temps. Chaque pièce est conçue avec une attention particulière aux détails, aux proportions et à l’équilibre graphique. Son approche sobre et élégante rend ses œuvres intemporelles et immédiatement reconnaissables.",
    images: [
      "/assets/dipaolo/IMG_4801.webp",
      "/assets/dipaolo/IMG_4818.webp",
      "/assets/dipaolo/IMG_4890.webp",
    ],
    interval: 5000,
  },
};

export const ShortDescription: Story = {
  args: {
    name: "DUF",
    instagram: "duftattoo",
    tagline: "MINIMALISTE / CONTEMPORAIN / ÉPURÉ",
    description:
      "Florian est un artiste autodidacte depuis 2012. Il réalise aujourd'hui des tattoos aux lignes simples et épurées au style reconnaissable.",
    images: [
      "/assets/dipaolo/IMG_4801.webp",
      "/assets/dipaolo/IMG_4818.webp",
      "/assets/dipaolo/IMG_4890.webp",
    ],
    interval: 5000,
  },
};
