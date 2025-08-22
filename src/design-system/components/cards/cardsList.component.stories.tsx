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

Composant pour afficher une liste de cartes avec titre et description.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"cards-1": {
  "type": "cardsList",
  "features": null,
  "title": "Titre de votre section",
  "content": [
    {
      "title": "Titre de la première carte",
      "description": "Description détaillée de la première carte. Peut contenir plusieurs phrases pour expliquer le concept ou service."
    },
    {
      "title": "Titre de la deuxième carte",
      "description": "Description de la deuxième carte avec des informations pertinentes pour vos visiteurs."
    },
    {
      "title": "Titre de la troisième carte",
      "description": "Description de la troisième carte pour compléter votre présentation."
    }
  ]
}
\`\`\`

### Structure des cartes :
- \`title\` : Titre principal de chaque carte
- \`description\` : Texte descriptif détaillé
- \`features\` : Configuration optionnelle (généralement \`null\`)

### Cas d'usage typiques :
- **Services** : Présentation des prestations
- **Avantages** : Points forts de votre offre
- **Processus** : Étapes d'un workflow
- **FAQ** : Questions fréquentes
- **Témoignages** : Retours clients
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
    content: {
      control: "object",
      description:
        "Tableau d'objets contenant les données des cartes (title, description)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Cards>;

export const Default: Story = {
  name: "Par défaut (3 cartes)",
  args: {
    title: "Pourquoi avoir un site vitrine ?",
    content: [
      {
        title: "Une vitrine numérique à votre image",
        description:
          "Les réseaux sociaux c'est bien, mais un site web, c'est votre vitrine personnalisée, disponible 24/7. Vous bénéficiez d'une totale liberté de création pour montrer au monde votre entreprise.",
      },
      {
        title: "Amélioration du référencement",
        description:
          "Je préfère être transparent : un site web ne garantit pas de figurer en première page de Google. Cependant, un SEO bien travaillé et un site bien développé et accessible améliore grandement votre visibilité sur les moteurs de recherche.",
      },
      {
        title: "Un investissement accessible",
        description:
          "À partir de 450€ HT, un site vitrine représente un investissement abordable pour accroître votre présence en ligne et attirer de nouveaux clients.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec 3 cartes, cas d'usage le plus courant pour présenter des avantages ou des services.",
      },
    },
  },
};

export const TwoCards: Story = {
  name: "Deux cartes",
  args: {
    title: "Nos avantages principaux",
    content: [
      {
        title: "Rapidité de développement",
        description:
          "Grâce à notre système de templates, votre site est prêt en quelques jours seulement.",
      },
      {
        title: "Support continu",
        description:
          "Nous vous accompagnons même après la mise en ligne de votre site.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec 2 cartes pour tester l'affichage en ligne ou en grille selon la configuration CSS.",
      },
    },
  },
};

export const SingleCard: Story = {
  name: "Carte unique",
  args: {
    title: "Notre engagement",
    content: [
      {
        title: "Qualité garantie",
        description:
          "Nous nous engageons à livrer un site web de qualité professionnelle, optimisé pour tous les appareils et respectant les standards d'accessibilité.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec une seule carte pour tester l'affichage minimal du composant.",
      },
    },
  },
};

export const LongContent: Story = {
  name: "Contenu long",
  args: {
    title: "Processus détaillé",
    content: [
      {
        title: "Analyse approfondie de vos besoins",
        description:
          "Nous commençons par une phase d'analyse complète de vos besoins, de votre secteur d'activité et de vos objectifs. Cette étape nous permet de comprendre parfaitement votre projet et de vous proposer la solution la plus adaptée à votre situation.",
      },
      {
        title: "Conception et développement personnalisé",
        description:
          "Ensuite, nous procédons à la conception graphique et au développement de votre site. Chaque élément est pensé pour offrir la meilleure expérience utilisateur possible tout en reflétant l'identité de votre entreprise.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec du contenu long pour tester le comportement responsive et l'affichage de textes étendus.",
      },
    },
  },
};

// Story supplémentaire pour tester les cas limites
export const ManyCards: Story = {
  name: "Nombreuses cartes (5)",
  args: {
    title: "Notre gamme complète de services",
    content: [
      {
        title: "Développement Web",
        description:
          "Sites vitrines, e-commerce et applications web sur mesure.",
      },
      {
        title: "Design UX/UI",
        description: "Conception d'interfaces modernes et intuitives.",
      },
      {
        title: "Référencement SEO",
        description: "Optimisation pour les moteurs de recherche.",
      },
      {
        title: "Hébergement",
        description: "Solutions d'hébergement sécurisées et performantes.",
      },
      {
        title: "Maintenance",
        description: "Support technique et mises à jour régulières.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec 5 cartes pour tester l'affichage en grille avec plus d'éléments.",
      },
    },
  },
};

export const ShortTitles: Story = {
  name: "Titres courts",
  args: {
    title: "Avantages",
    content: [
      {
        title: "Rapide",
        description:
          "Développement et mise en ligne en quelques jours seulement.",
      },
      {
        title: "Moderne",
        description: "Design contemporain et technologies de pointe.",
      },
      {
        title: "Accessible",
        description: "Respect des standards d'accessibilité web.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec des titres courts pour tester l'équilibrage visuel des cartes.",
      },
    },
  },
};
