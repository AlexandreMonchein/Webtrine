import type { Meta, StoryObj } from '@storybook/react';
import DescriptionComponent from "./description.component";

const meta: Meta<typeof DescriptionComponent> = {
  component: DescriptionComponent,
  title: 'Design System/Components/Description',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composant pour afficher une section de description avec du texte et une image optionnelle. Supporte différents modes d\'affichage : inversé, continu, et avec gestion des images. Idéal pour les sections "À propos", présentation de services ou contenu éditorial.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal de la section (optionnel)'
    },
    features: {
      control: 'object',
      description: 'Configuration du comportement : isReversed (image à droite), isContinuous (affichage continu)'
    },
    content: {
      control: 'object',
      description: 'Tableau d\'objets contenant le texte à afficher. Supporte le HTML (sanitisé avec DOMPurify)'
    },
    image: {
      control: 'object',
      description: 'Configuration de l\'image : name (nom du fichier), alt (texte alternatif), focusable (accessible au clavier)'
    }
  }
};

export default meta;

type Story = StoryObj<typeof DescriptionComponent>;

export const Default: Story = {
  name: 'Configuration par défaut',
  args: {
    type: "description",
    features: { isReversed: false, isContinious: false },
    title: "Une petite présentation s'impose !",
    content: [
      {
        text: "Bonjour et bienvenue !",
      },
      {
        text: "Je m'appelle Alexandre, j'ai 24 ans et je suis développeur web. Ma passion dans ce domaine, c'est de créer des sites esthétiques et faciles à utiliser.",
      },
      {
        text: "C'est cette passion qui m'a poussé à lancer mon propre projet, afin d'exprimer ma créativité et mon amour pour le développement web.",
      },
      {
        text: "C'est ainsi qu'est née Webtrine. Webtrine c'est une solution que j'ai développée pour concevoir des sites vitrines à partir de templates que je crée et améliore continuellement. Ensemble, nous pourrons rapidement mettre en place VOTRE site en utilisant ces templates.",
      },
      {
        text: "Mon objectif est de simplifier la création de votre présence en ligne. J'ai donc conçu une offre unique pour vous permettre d'obtenir facilement et rapidement votre identité web.",
      },
      {
        text: "Le processus est simple : lors d'un premier rendez-vous, nous choisirons ensemble les templates et définirons les aspects graphiques ainsi que les formalités (comme le nom de domaine). Ensuite, vous me fournirez les informations nécessaires pour remplir votre site. En quelques jours seulement, votre site sera opérationnel et en ligne.",
      },
      {
        text: "Avec Webtrine, la création de votre site vitrine n'a jamais été aussi simple.",
      },
      {
        text: "Au plaisir de collaborer avec vous !",
      },
    ],
    image: {
      name: "accueil_image_1",
      alt: "Présentation de l'équipe Webtrine",
      focusable: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration standard avec texte à gauche et image à droite. Idéal pour les sections de présentation ou d\'introduction.'
      }
    }
  }
};

export const Reversed: Story = {
  name: 'Image inversée (à gauche)',
  args: {
    features: {
      isReversed: true,
      isContinious: false,
    },
    title: "Notre approche technique",
    content: [
      {
        text: "Développement moderne et performant",
      },
      {
        text: "Nous utilisons les dernières technologies web pour garantir des sites rapides, sécurisés et évolutifs.",
      },
      {
        text: "Notre stack technique comprend React, TypeScript, et des outils de build modernes pour une expérience développeur optimale.",
      },
      {
        text: "Chaque projet bénéficie d'une architecture pensée pour la scalabilité et la maintenabilité à long terme.",
      }
    ],
    image: {
      name: "description_image_1",
      alt: "Illustration des technologies modernes",
      focusable: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration avec image à gauche et texte à droite (isReversed: true). Permet de varier l\'affichage sur une page.'
      }
    }
  }
};

// Nouvelles stories pour couvrir plus de cas d'usage
export const WithoutImage: Story = {
  name: 'Sans image',
  args: {
    features: {
      isReversed: false,
      isContinious: false,
    },
    title: "Nos valeurs",
    content: [
      {
        text: "Transparence et communication",
      },
      {
        text: "Nous croyons en une relation de confiance basée sur la transparence. Chaque étape de votre projet est communiquée clairement.",
      },
      {
        text: "Qualité et excellence technique",
      },
      {
        text: "Notre engagement pour la qualité se reflète dans chaque ligne de code et chaque pixel de design.",
      },
      {
        text: "Innovation et veille technologique",
      },
      {
        text: "Nous restons à la pointe des technologies pour vous offrir les meilleures solutions du marché.",
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration sans image pour les sections purement textuelles. Le contenu prend toute la largeur disponible.'
      }
    }
  }
};
