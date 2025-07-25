import type { Meta, StoryObj } from '@storybook/react';
import BannerComponent from "./banner.component";

const meta: Meta<typeof BannerComponent> = {
  component: BannerComponent,
  title: 'Design System/Components/Banner',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Composant de bannière hero avec image(s) de fond et texte positionnable. Supporte les carrousels d\'images avec navigation automatique, différentes positions de texte, et boutons d\'action optionnels. Idéal pour les en-têtes de page, sections d\'accueil et call-to-action.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal de la bannière'
    },
    subTitle: {
      control: 'text',
      description: 'Sous-titre optionnel'
    },
    textPosition: {
      control: 'select',
      options: ['center', 'center-left', 'center-right', 'bottom-left', 'bottom-right'],
      description: 'Position du texte sur la bannière'
    },
    images: {
      control: 'object',
      description: 'Tableau d\'images de fond avec nom et copyright optionnel'
    },
    features: {
      control: 'object',
      description: 'Configuration : multi (carrousel), medium (taille), textPositionFeature'
    },
    contact: {
      control: 'object',
      description: 'Boutons d\'action optionnels (redirect, contact, etc.)'
    }
  }
};

export default meta;

type Story = StoryObj<typeof BannerComponent>;

export const Default: Story = {
  name: 'Bannière par défaut',
  args: {
    title: "Webtrine",
    subTitle: "Il n'a jamais été aussi simple de confectionner un site",
    images: [{ name: "accueil_banner_2" }],
    textPosition: "center-right",
    features: { multi: false, medium: true },
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration standard avec texte positionné en centre-droite et une seule image de fond.'
      }
    }
  }
};

export const WithContact: Story = {
  name: 'Avec bouton contact',
  args: {
    title: "Contactez-nous pour plus de renseignements",
    subTitle: "Notre équipe vous accompagne dans votre projet web",
    images: [{ name: "contact_banner_1" }],
    textPosition: "center-left",
    features: { multi: false, medium: true },
    contact: [
      {
        type: "redirect",
        to: "contact",
        displayedText: "Aller au formulaire de contact"
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Bannière avec bouton d\'action intégré pour rediriger vers une page de contact ou autre.'
      }
    }
  }
};

export const MultipleImages: Story = {
  name: 'Carrousel d\'images',
  args: {
    title: "Notre portfolio",
    subTitle: "Découvrez nos réalisations à travers différents projets",
    images: [
      { name: "accueil_banner_1" },
      { name: "accueil_banner_2" },
      { name: "prestation_banner_2" }
    ],
    textPosition: "center",
    features: { multi: true, medium: true },
  },
  parameters: {
    docs: {
      description: {
        story: 'Bannière avec carrousel automatique d\'images (changement toutes les 5 secondes) et sélecteurs manuels.'
      }
    }
  }
};

export const MultipleContactButtons: Story = {
  name: 'Plusieurs boutons d\'action',
  args: {
    title: "Prêt à commencer votre projet ?",
    subTitle: "Contactez-nous ou découvrez nos tarifs",
    images: [{ name: "contact_banner_2" }],
    textPosition: "center",
    features: { multi: false, medium: true },
    contact: [
      {
        type: "redirect",
        to: "contact",
        displayedText: "Nous contacter"
      },
      {
        type: "redirect",
        to: "pricing",
        displayedText: "Voir nos tarifs"
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Bannière avec plusieurs boutons d\'action pour offrir différentes options à l\'utilisateur.'
      }
    }
  }
};
