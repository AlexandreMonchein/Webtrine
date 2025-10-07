import type { Meta, StoryObj } from '@storybook/react';
import DisplayComponent from "./display.component";

const meta: Meta<typeof DisplayComponent> = {
  component: DisplayComponent,
  title: 'Design System/Components/Display',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Display Component

Composant pour afficher une grille de fonctionnalités avec icônes SVG et texte descriptif. Charge dynamiquement les composants d'icônes depuis le dossier assets/icons. Idéal pour présenter des services, avantages ou caractéristiques avec support visuel.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"display-1": {
  "type": "display",
  "features": null,
  "title": "Nos services",
  "content": [
    {
      "name": "websiteCreation",
      "text": "Création de sites web modernes et responsifs"
    },
    {
      "name": "quality",
      "text": "Qualité et excellence dans chaque projet"
    },
    {
      "name": "support",
      "text": "Support technique continu et réactif"
    }
  ]
}
\`\`\`

### Structure des données :
- **title** : Titre principal de la section (obligatoire)
- **content** : Tableau d'éléments à afficher (obligatoire)
  - **name** : Nom de l'icône (correspond au fichier .component.tsx dans assets/icons)
  - **text** : Texte descriptif affiché sous l'icône

### Icônes disponibles :
- \`websiteCreation\` : Création de sites web
- \`quality\` : Qualité et assurance
- \`support\` : Support technique
- \`colorPalette\` : Design graphique
- \`domain\` : Gestion de domaine
- \`euro\` : Tarifs et prix
- \`facebook\` : Réseau social Facebook
- \`instagram\` : Réseau social Instagram
- \`linkedin\` : Réseau social LinkedIn
- \`youtube\` : Plateforme YouTube
- \`discord\` : Plateforme Discord
- \`france\` : Drapeau France
- \`franceColored\` : Drapeau France en couleur

### Exemple avec de nombreux éléments :
\`\`\`json
{
  "type": "display",
  "id": "all-services",
  "datas": {
    "title": "Toutes nos prestations",
    "content": [
      {
        "name": "websiteCreation",
        "text": "Création de sites web"
      },
      {
        "name": "quality",
        "text": "Assurance qualité"
      },
      {
        "name": "support",
        "text": "Support technique"
      },
      {
        "name": "colorPalette",
        "text": "Design graphique"
      },
      {
        "name": "domain",
        "text": "Gestion de domaine"
      },
      {
        "name": "euro",
        "text": "Tarifs compétitifs"
      }
    ]
  }
}
\`\`\`

### Exemple thématique - Réseaux sociaux :
\`\`\`json
{
  "type": "display",
  "id": "social-networks",
  "datas": {
    "title": "Suivez-nous sur nos réseaux",
    "content": [
      {
        "name": "facebook",
        "text": "Retrouvez-nous sur Facebook"
      },
      {
        "name": "instagram",
        "text": "Nos créations sur Instagram"
      },
      {
        "name": "linkedin",
        "text": "Notre actualité professionnelle"
      },
      {
        "name": "youtube",
        "text": "Tutoriels et démonstrations"
      }
    ]
  }
}
\`\`\`

### Notes importantes :
- Les icônes sont chargées depuis \`src/assets/icons/{name}.component.tsx\`
- Assurez-vous que l'icône existe avant de l'utiliser
- Le composant s'adapte automatiquement au nombre d'éléments en grille responsive
- Maximum recommandé : 6-8 éléments pour une lisibilité optimale
- Les icônes sont des composants React SVG optimisés
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal de la section'
    },
    content: {
      control: 'object',
      description: 'Tableau d\'objets contenant name (nom de l\'icône) et text (description). Les icônes sont chargées depuis assets/icons/{name}.component.tsx'
    }
  }
};

export default meta;

type Story = StoryObj<typeof DisplayComponent>;

export const Default: Story = {
  name: 'Affichage par défaut',
  args: {
    title: "Nos services",
    content: [
      {
        name: "websiteCreation",
        text: "Création de sites web modernes et responsifs"
      },
      {
        name: "quality",
        text: "Qualité et excellence dans chaque projet"
      },
      {
        name: "support",
        text: "Support technique continu et réactif"
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration standard avec 3 éléments affichant des icônes et du texte descriptif en grille.'
      }
    }
  }
};

export const ManyItems: Story = {
  name: 'Nombreux éléments',
  args: {
    title: "Toutes nos prestations",
    content: [
      {
        name: "websiteCreation",
        text: "Création de sites web"
      },
      {
        name: "quality",
        text: "Assurance qualité"
      },
      {
        name: "support",
        text: "Support technique"
      },
      {
        name: "colorPalette",
        text: "Design graphique"
      },
      {
        name: "domain",
        text: "Gestion de domaine"
      },
      {
        name: "euro",
        text: "Tarifs compétitifs"
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple avec 6 éléments pour tester l\'affichage en grille avec plus de contenu.'
      }
    }
  }
};

export const SocialNetworks: Story = {
  name: 'Réseaux sociaux',
  args: {
    title: "Suivez-nous sur nos réseaux",
    content: [
      {
        name: "facebook",
        text: "Retrouvez-nous sur Facebook"
      },
      {
        name: "instagram",
        text: "Nos créations sur Instagram"
      },
      {
        name: "linkedin",
        text: "Notre actualité professionnelle"
      },
      {
        name: "youtube",
        text: "Tutoriels et démonstrations"
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple thématique utilisant les icônes de réseaux sociaux disponibles.'
      }
    }
  }
};
