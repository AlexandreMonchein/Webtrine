import type { Meta, StoryObj } from "@storybook/react";
import Cards from "./cardsList.component";

const meta: Meta<typeof Cards> = {
  component: Cards,
  title: "Design System/Components/Cards/CardsList",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Cards List Component

Composant pour afficher une liste de cartes avec titre, description et image optionnelle.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"cards-1": {
  "type": "cardsList",
  "features": {
    "displayInline": true
  },
  "title": "Titre de votre section",
  "description": "Description de votre section",
  "content": [
    {
      "title": "Titre de la première carte",
      "description": [
        {
          "text": "Description détaillée de la première carte. Peut contenir plusieurs phrases pour expliquer le concept ou service."
        }
      ],
      "imageSrc": "nom_de_votre_image"
    },
    {
      "title": "Titre de la deuxième carte",
      "description": [
        {
          "text": "Description de la deuxième carte avec des informations pertinentes pour vos visiteurs."
        }
      ]
    },
    {
      "title": "Titre de la troisième carte",
      "description": [
        {
          "text": "Description de la troisième carte pour compléter votre présentation."
        }
      ],
      "imageSrc": "autre_image"
    }
  ]
}
\`\`\`

### Structure des cartes :
- \`title\` : Titre principal de chaque carte
- \`description\` : Texte descriptif détaillé
- \`imageSrc\` : (Optionnel) Nom de l'image carrée à afficher au-dessus du titre

### Options de \`features\` :
- \`displayInline: true\` : Active l'affichage côte à côte avec logique intelligente
- \`displayInline: false\` ou \`null\` : Affichage en pile (par défaut)

### Logique d'affichage intelligent (mode inline) :
- **1 carte** : Toujours en mode stack (pleine largeur)
- **Nombre pair de cartes** :
  - **Mobile** (< 768px) : 1 colonne
  - **Tablette** (768px - 1239px) : 2 colonnes
  - **Desktop large** (≥ 1240px) : 4 colonnes
- **Nombre impair de cartes** :
  - **Mobile** (< 768px) : 1 colonne
  - **Tablette** (768px - 1239px) : 3 colonnes
  - **Desktop large** (≥ 1240px) : 3 colonnes (maintient la symétrie)

### Images :
- Les images sont automatiquement rendues carrées (aspect-ratio: 1)
- Format attendu : \`.webp\`
- Chemin : \`assets/{customer}/{imageSrc}.webp\`
- Si \`imageSrc\` n'est pas fourni, aucune image n'est affichée

### Cas d'usage typiques :
- **Mode stack** : FAQ, témoignages détaillés, descriptions longues
- **Mode inline** : Services, avantages, processus, équipe avec descriptions courtes
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Titre principal affiché au-dessus des cartes",
    },
    description: {
      control: "text",
      description: "Description affichée au-dessus des cartes",
    },
    content: {
      control: "object",
      description:
        "Tableau d'objets contenant les données des cartes (title, description, imageSrc optionnel)",
    },
    features: {
      control: "object",
      description:
        "Configuration des fonctionnalités : displayInline (true/false) pour l'affichage côte à côte",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Cards>;

export const Default: Story = {
  name: "Par défaut",
  args: {
    title: "Pourquoi avoir un site vitrine ?",
    description:
      "Découvrez les avantages clés d'un site vitrine pour votre entreprise.",
    content: [
      {
        title: "Une vitrine numérique à votre image",
        description: [
          {
            text: "Les réseaux sociaux c'est bien, mais un site web, c'est votre vitrine personnalisée, disponible 24/7. Vous bénéficiez d'une totale liberté de création pour montrer au monde votre entreprise.",
          },
        ],
      },
      {
        title: "Amélioration du référencement",
        description: [
          {
            text: "Je préfère être transparent : un site web ne garantit pas de figurer en première page de Google. Cependant, un SEO bien travaillé et un site bien développé et accessible améliore grandement votre visibilité sur les moteurs de recherche.",
          },
        ],
      },
      {
        title: "Un investissement accessible",
        description: [
          {
            text: "À partir de 450€ HT, un site vitrine représente un investissement abordable pour accroître votre présence en ligne et attirer de nouveaux clients.",
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec 3 cartes en mode stack (affichage par défaut), cas d'usage le plus courant pour les descriptions longues.",
      },
    },
  },
};

export const WithImages: Story = {
  name: "Avec images",
  args: {
    title: "Nos services web",
    content: [
      {
        title: "Développement sur mesure",
        description: [
          {
            text: "Création de sites web personnalisés selon vos besoins spécifiques. Nous utilisons les dernières technologies pour garantir performance et évolutivité.",
          },
        ],
        imageSrc: "square_image",
      },
      {
        title: "Design & UX/UI",
        description: [
          {
            text: "Conception d'interfaces modernes et intuitives. Nos designs sont pensés pour offrir la meilleure expérience utilisateur possible.",
          },
        ],
        imageSrc: "square_image",
      },
      {
        title: "Maintenance & Support",
        description: [
          {
            text: "Accompagnement post-lancement avec maintenance technique, mises à jour de sécurité et support client réactif.",
          },
        ],
        imageSrc: "square_image",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec des images carrées au-dessus de chaque titre. Idéal pour présenter des services avec des visuels explicites.",
      },
    },
  },
};

export const InlineDisplay: Story = {
  name: "Affichage côte à côte",
  args: {
    title: "Nos services",
    features: {
      displayInline: true,
    },
    content: [
      {
        title: "Développement",
        description: [{ text: "Sites web modernes et performants adaptés à vos besoins." }],
        imageSrc: "service_dev",
      },
      {
        title: "Design UX/UI",
        description: [
          { text: "Interfaces intuitives et esthétiques pour vos utilisateurs." },
        ],
        imageSrc: "service_design",
      },
      {
        title: "SEO",
        description: [{ text: "Optimisation pour les moteurs de recherche." }],
        imageSrc: "service_seo",
      },
      {
        title: "Maintenance",
        description: [{ text: "Support technique et mises à jour régulières." }],
        imageSrc: "service_support",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec affichage côte à côte activé (displayInline: true). Responsive : 1 colonne sur mobile, 2 sur tablette, 4 sur desktop.",
      },
    },
  },
};

export const EvenCount: Story = {
  name: "Nombre pair (6 cartes)",
  args: {
    title: "Nos 6 services principaux",
    features: {
      displayInline: true,
    },
    content: [
      {
        title: "Développement web",
        description: [{ text: "Sites sur mesure avec les dernières technologies." }],
        imageSrc: "service_dev",
      },
      {
        title: "Design UX/UI",
        description: [{ text: "Interfaces modernes et intuitives." }],
        imageSrc: "service_design",
      },
      {
        title: "SEO",
        description: [{ text: "Optimisation pour les moteurs de recherche." }],
        imageSrc: "service_seo",
      },
      {
        title: "E-commerce",
        description: [{ text: "Boutiques en ligne performantes." }],
        imageSrc: "service_ecommerce",
      },
      {
        title: "Maintenance",
        description: [{ text: "Support technique continu." }],
        imageSrc: "service_support",
      },
      {
        title: "Formation",
        description: [{ text: "Accompagnement et formation des équipes." }],
        imageSrc: "service_formation",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "6 cartes (nombre pair) : 2 colonnes sur tablette, 4 colonnes sur desktop. Affichage symétrique optimisé.",
      },
    },
  },
};

export const OddCount: Story = {
  name: "Nombre impair (5 cartes)",
  args: {
    title: "Nos 5 expertises clés",
    features: {
      displayInline: true,
    },
    content: [
      {
        title: "Stratégie digitale",
        description: [{ text: "Conseil et accompagnement dans votre transformation." }],
        imageSrc: "expertise_strategy",
      },
      {
        title: "Développement",
        description: [{ text: "Solutions techniques sur mesure et évolutives." }],
        imageSrc: "expertise_dev",
      },
      {
        title: "Design",
        description: [{ text: "Création d'identité visuelle et interfaces." }],
        imageSrc: "expertise_design",
      },
      {
        title: "Marketing digital",
        description: [{ text: "Campagnes et optimisation de la visibilité." }],
        imageSrc: "expertise_marketing",
      },
      {
        title: "Analytics",
        description: [{ text: "Mesure et analyse des performances." }],
        imageSrc: "expertise_analytics",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "5 cartes (nombre impair) : 3 colonnes sur tablette et desktop. Évite les déséquilibres visuels.",
      },
    },
  },
};
