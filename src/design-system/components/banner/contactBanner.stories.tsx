import type { Meta, StoryObj } from "@storybook/react";

import ContactBanner from "./contactBanner.component";
import type { ContactBannerProps } from "./contactBanner.types";

const defaultArgs: ContactBannerProps = {
  datas: {
    title: "NOTRE ESPACE",
    media: {
      type: "image",
      src: "/assets/showcase/banner_1.webp",
      alt: "Image de bannière",
    },
    infoTitle: "INFORMATIONS",
    content: [
      {
        text: "Bienvenue dans notre espace. Nous fournissons des services de qualité avec une approche professionnelle et moderne. Notre équipe est dédiée à vous offrir la meilleure expérience possible.",
      },
      {
        text: "Nous sommes ouverts sur rendez-vous uniquement. Contactez-nous pour plus d'informations sur nos services et disponibilités.",
      },
    ],
  },
};

const meta: Meta<typeof ContactBanner> = {
  title: "Design System/Components/Banner/ContactBanner",
  component: ContactBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ContactBanner>;

export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Par défaut - Bannière avec image
        </h3>
        <ContactBanner {...defaultArgs} />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Avec plusieurs items d'information
        </h3>
        <ContactBanner
          datas={{
            ...defaultArgs.datas,
            title: "NOTRE ADRESSE",
            infoTitle: "DÉTAILS",
            content: [
              { text: "📍 Adresse : 123 Rue Exemple, Ville" },
              { text: "📞 Téléphone : +33 1 23 45 67 89" },
              { text: "📧 Email : contact@exemple.fr" },
              { text: "🕐 Lun-Ven : 10h-19h" },
              { text: "🕐 Sam : 10h-18h" },
              { text: "🕐 Dim : Fermé" },
              { text: "💳 Paiement : Carte, Espèces" },
              { text: "🅿️ Parking : Disponible" },
            ],
          }}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Avec vidéo</h3>
        <ContactBanner
          datas={{
            ...defaultArgs.datas,
            media: {
              type: "video",
              src: "/assets/showcase/big_bunny_landscape_video.mp4",
              extension: "mp4",
            },
          }}
        />
      </div>
    </div>
  ),
};
