import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import MultiplePricesComponent from "./multiplePrices.component";

const meta: Meta<typeof MultiplePricesComponent> = {
  component: MultiplePricesComponent,
  title: "Design System/Components/Prices/MultiplePrices",
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
# Multiple Prices Component

Composant pour afficher plusieurs plans tarifaires avec fonctionnalités détaillées et boutons d'action.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"prices-1": {
  "type": "multiplePrices",
  "title": "Nos offres",
  "subtitle": "Choisissez l'offre qui vous correspond",
  "plans": [
    {
      "title": "Plan Starter",
      "price": "99€",
      "per": "mois",
      "description": "Parfait pour commencer",
      "features": [
        {
          "text": "Fonctionnalité 1",
          "included": true
        },
        {
          "text": "Fonctionnalité 2",
          "included": true
        },
        {
          "text": "Fonctionnalité premium",
          "included": false
        }
      ],
      "cta": {
        "text": "Choisir cette offre",
        "type": "primary"
      }
    },
    {
      "title": "Plan Pro",
      "price": "199€",
      "per": "mois",
      "description": "Pour les professionnels",
      "isHighlighted": true,
      "features": [
        {
          "text": "Toutes les fonctionnalités Starter",
          "included": true
        },
        {
          "text": "Fonctionnalités avancées",
          "included": true
        }
      ],
      "cta": {
        "text": "Choisir cette offre",
        "type": "primary"
      }
    }
  ]
}
\`\`\`

### Options des plans :
- \`isHighlighted: true\` : Met en avant un plan (recommandé)
- \`features[].included\` : \`true\` (inclus) ou \`false\` (non inclus/barré)
- \`cta.type\` : \`"primary"\` ou \`"secondary"\` pour le style du bouton
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Titre principal de la section tarifaire",
    },
    subtitle: {
      control: "text",
      description: "Sous-titre explicatif",
    },
    plans: {
      control: "object",
      description:
        "Tableau des plans avec title (nom), price (tarif), et features (liste des fonctionnalités)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiplePricesComponent>;

export const Default: Story = {
  name: "Plans tarifaires standard",
  args: {
    title: "Nos offres",
    subtitle: "Choisissez le plan qui correspond à vos besoins",
    plans: [
      {
        title: "Essentiel",
        price: "450€ HT",
        features: [
          "Site vitrine 5 pages",
          "Design responsive",
          "Optimisation SEO de base",
          "Hébergement 1 an inclus",
          "Support par email",
        ],
      },
      {
        title: "Professionnel",
        price: "850€ HT",
        features: [
          "Site vitrine 10 pages",
          "Design sur mesure",
          "Optimisation SEO avancée",
          "Hébergement 1 an inclus",
          "Certificat SSL",
          "Support prioritaire",
          "Formation à l'administration",
        ],
      },
      {
        title: "Premium",
        price: "1450€ HT",
        features: [
          "Site vitrine illimité",
          "Design 100% personnalisé",
          "SEO complet + suivi",
          "Hébergement premium 1 an",
          "Certificat SSL",
          "Support téléphonique",
          "Formation complète",
          "Maintenance 3 mois",
          "Analytiques avancées",
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuration standard avec 3 plans tarifaires couvrant différents niveaux de service, du basique au premium.",
      },
    },
  },
};

export const TwoPlans: Story = {
  name: "Deux plans (comparaison simple)",
  args: {
    title: "Nos forfaits",
    subtitle: "Deux options adaptées à votre budget",
    plans: [
      {
        title: "Starter",
        price: "350€ HT",
        features: [
          "Site one-page",
          "Design responsive",
          "Hébergement 6 mois",
          "Support email",
        ],
      },
      {
        title: "Business",
        price: "750€ HT",
        features: [
          "Site multi-pages",
          "Design personnalisé",
          "Hébergement 1 an",
          "SEO optimisé",
          "Support prioritaire",
          "Formation incluse",
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Version simplifiée avec seulement 2 plans pour une comparaison directe et une prise de décision facilitée.",
      },
    },
  },
};

export const SinglePlan: Story = {
  name: "Plan unique",
  args: {
    title: "Offre spéciale",
    subtitle: "Une solution complète à prix exceptionnel",
    plans: [
      {
        title: "Pack Complet",
        price: "990€ HT",
        features: [
          "Site vitrine personnalisé",
          "Jusqu'à 8 pages",
          "Design responsive moderne",
          "Optimisation SEO complète",
          "Hébergement 1 an inclus",
          "Certificat SSL gratuit",
          "Support technique 6 mois",
          "Formation à l'utilisation",
          "3 révisions incluses",
          "Analytics et statistiques",
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Présentation d'un plan unique avec toutes les fonctionnalités détaillées. Idéal pour une offre promotionnelle ou un package all-inclusive.",
      },
    },
  },
};

export const ManyPlans: Story = {
  name: "Plusieurs plans (4 options)",
  args: {
    title: "Toutes nos offres",
    subtitle:
      "Du plan de base au service premium, trouvez votre solution idéale",
    plans: [
      {
        title: "Basic",
        price: "250€ HT",
        features: ["Landing page", "Design standard", "Responsive mobile"],
      },
      {
        title: "Standard",
        price: "450€ HT",
        features: [
          "Site 5 pages",
          "Design personnalisé",
          "SEO de base",
          "Hébergement 1 an",
        ],
      },
      {
        title: "Pro",
        price: "850€ HT",
        features: [
          "Site 10 pages",
          "Design sur mesure",
          "SEO avancé",
          "Hébergement premium",
          "Support prioritaire",
        ],
      },
      {
        title: "Enterprise",
        price: "Sur devis",
        features: [
          "Solution personnalisée",
          "Pages illimitées",
          "SEO expert",
          "Infrastructure dédiée",
          "Support 24/7",
          "Maintenance incluse",
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Gamme complète avec 4 plans pour couvrir tous les besoins, du simple au complexe. Test de l'affichage avec plus d'options.",
      },
    },
  },
};

export const FreemiumModel: Story = {
  name: "Modèle Freemium",
  args: {
    title: "Nos solutions",
    subtitle: "Commencez gratuitement, évoluez selon vos besoins",
    plans: [
      {
        title: "Gratuit",
        price: "0€",
        features: [
          "Sous-domaine webtrine.fr",
          "Template standard",
          "3 pages maximum",
          "Support communauté",
        ],
      },
      {
        title: "Démarrage",
        price: "15€/mois",
        features: [
          "Domaine personnalisé",
          "Templates premium",
          "10 pages",
          "Support email",
          "SSL inclus",
        ],
      },
      {
        title: "Croissance",
        price: "35€/mois",
        features: [
          "Design sur mesure",
          "Pages illimitées",
          "SEO avancé",
          "Support prioritaire",
          "Analytics détaillées",
          "Intégrations tiers",
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modèle de tarification freemium avec plan gratuit et abonnements mensuels. Adapté pour les services SaaS ou plateformes.",
      },
    },
  },
};
