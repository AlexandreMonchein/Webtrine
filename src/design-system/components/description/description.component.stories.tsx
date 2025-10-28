import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import DescriptionComponent from "./description.component";

const meta: Meta<typeof DescriptionComponent> = {
  component: DescriptionComponent,
  title: "Design System/Components/Description/TextDescription",
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Description Component

Composant pour afficher une section de description avec du texte, des boutons et une image optionnelle.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"description-1":{
  "type": "description",
  "features": {
    "isReversed": false,
    "isContinuous": false
  },
  "title": "Titre de votre section",
  "content": [
    {
      "text": "Premier paragraphe de contenu. Supporte le HTML basique."
    },
    {
      "text": "Deuxième paragraphe avec <strong>mise en forme</strong> si nécessaire."
    },
    {
      "button": {
        "label": "Nos services",
        "to": "/nos-services"
      }
    }
  ],
  "image": {
    "name": "nom_de_votre_image",
    "alt": "Description alternative de l'image",
    "focusable": false
  }
}
\`\`\`

### Types de contenu supportés :
- **Texte** : \`{ "text": "Votre contenu texte avec HTML" }\`
- **Bouton** : \`{ "button": { "label": "Texte du bouton", "to": "/lien" } }\`

### Options de \`features\` :
- \`isReversed: true\` : Place l'image à droite du texte
- \`isContinuous: true\` : Affichage continu sans espacement supplémentaire

### Structure de l'image :
- \`name\` : Nom du fichier image (sans extension, .webp sera ajouté)
- \`alt\` : Texte alternatif pour l'accessibilité
- \`focusable\` : Si l'image peut recevoir le focus (navigation clavier)
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Titre principal de la section (optionnel)",
    },
    features: {
      control: "object",
      description:
        "Configuration du comportement : isReversed (image à droite), isContinuous (affichage continu)",
    },
    content: {
      control: "object",
      description:
        "Tableau d'objets contenant le texte à afficher ou des boutons. Le texte supporte le HTML (sanitisé avec DOMPurify). Les boutons utilisent React Router Link.",
    },
    image: {
      control: "object",
      description:
        "Configuration de l'image : name (nom du fichier), alt (texte alternatif), focusable (accessible au clavier)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DescriptionComponent>;

export const Default: Story = {
  name: "Configuration par défaut",
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
      name: "square_image",
      alt: "Présentation de l'équipe Webtrine",
      focusable: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuration standard avec texte à gauche et image à droite. Idéal pour les sections de présentation ou d'introduction.",
      },
    },
  },
};

export const Reversed: Story = {
  name: "Image inversée (à gauche)",
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
      },
    ],
    image: {
      name: "square_image",
      alt: "Illustration des technologies modernes",
      focusable: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuration avec image à gauche et texte à droite (isReversed: true). Permet de varier l'affichage sur une page.",
      },
    },
  },
};

// Nouvelles stories pour couvrir plus de cas d'usage
export const WithoutImage: Story = {
  name: "Sans image",
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
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuration sans image pour les sections purement textuelles. Le contenu prend toute la largeur disponible.",
      },
    },
  },
};

export const WithButtons: Story = {
  name: "Avec boutons d'action",
  args: {
    features: {
      isReversed: false,
      isContinious: false,
    },
    title: "Prêt à commencer ?",
    content: [
      {
        text: "Découvrez nos services",
      },
      {
        text: "Nous proposons une gamme complète de solutions pour répondre à tous vos besoins digitaux.",
      },
      {
        button: {
          label: "Voir nos services",
          to: "/services"
        }
      },
      {
        text: "Vous avez un projet en tête ? N'hésitez pas à nous contacter pour en discuter.",
      },
      {
        button: {
          label: "Nous contacter",
          to: "/contact"
        }
      },
    ],
    image: {
      name: "vertical_image",
      alt: "Illustration des services proposés",
      focusable: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec des boutons d'action intégrés dans le contenu. Les boutons utilisent React Router pour la navigation.",
      },
    },
  },
};
