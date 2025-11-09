import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import LegalsComponent from "./legals.component";

interface StoryArgs {
  type?: string;
  templates?: Array<{
    type: string;
    datas: {
      type: string;
      title: string;
      subTitle: string;
      disclaimer: string | null;
      content: Array<{
        title: string;
        texts: string[];
      }>;
    };
  }>;
}

// Create mock templates data
const createMockStore = (templates = []) => {
  return configureStore({
    reducer: {
      layout: (state = { templates }, action) => state,
    },
  });
};

const meta: Meta<StoryArgs> = {
  component: LegalsComponent,
  title: "Design System/Components/Legals",
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const args = context.args as StoryArgs;
      const mockStore = createMockStore(args.templates);
      return (
        <Provider store={mockStore}>
          <Story />
        </Provider>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        component: `
# Legals Component

Composant Legals pour afficher les pages légales (CGV, Mentions légales, Politique de confidentialité) à partir de templates Redux.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
{
  "type": "legals",
  "id": "legals",
  "datas": {
    "type": "cgu-cgv",
    "title": "CGV (Conditions Générales de Vente)",
    "description": "CGV de Webtrine",
    "subTitle": "En vigueur au 01/09/2024",
    "disclaimer": null,
    "content": [
      {
        "title": "Article 1: Objet",
        "texts": [
          "Les présentes Conditions Générales d'Utilisation et de Vente (CGU/CGV) ont pour objet de définir les conditions d'utilisation du site Webtrine et de régir les ventes de prestations de services proposées par Webtrine. En accédant et en utilisant ce site, ainsi qu'en passant commande, vous acceptez pleinement et sans réserve les présentes CGU/CGV."
        ]
      },
      {
        "title": "Article 2: Accès au site",
        "texts": [
          "Le site Webtrine est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les coûts liés à l'accès au site, tels que les frais matériels, logiciels ou d'accès à Internet, sont exclusivement à la charge de l'utilisateur."
        ]
      },
      {
        "title": "Article 3: Prestations et Tarifs",
        "texts": [
          "Les prestations proposées sont celles décrites sur le site au moment de la consultation. Les tarifs sont indiqués en euros toutes taxes comprises. Webtrine se réserve le droit de modifier ses tarifs à tout moment.",
          "Les prestations sont détaillées dans les devis personnalisés envoyés aux clients."
        ]
      }
    ]
  }
}
\`\`\`

### Types de légales disponibles :
- \`"cgu-cgv"\` : Conditions Générales d'Utilisation et de Vente
- \`"mentions-legales"\` : Mentions légales
- \`"politique-confidentialite"\` : Politique de confidentialité
- \`"cookies"\` : Politique des cookies

### Exemple pour Mentions légales :
\`\`\`json
{
  "type": "legals",
  "id": "mentions-legales",
  "datas": {
    "type": "mentions-legales",
    "title": "Mentions légales",
    "description": "Informations légales obligatoires",
    "subTitle": "Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004",
    "disclaimer": "Ces informations sont obligatoires en vertu de la législation française",
    "content": [
      {
        "title": "Éditeur du site",
        "texts": [
          "Nom de l'entreprise : Webtrine",
          "Forme juridique : SARL",
          "Adresse du siège social : [Adresse complète]",
          "Téléphone : [Numéro de téléphone]",
          "Email : contact@webtrine.fr"
        ]
      },
      {
        "title": "Hébergeur",
        "texts": [
          "Nom de l'hébergeur : [Nom de l'hébergeur]",
          "Adresse : [Adresse de l'hébergeur]",
          "Téléphone : [Numéro de l'hébergeur]"
        ]
      }
    ]
  }
}
\`\`\`

### Structure des données :
- **type** : Type de document légal (obligatoire)
- **title** : Titre principal du document (obligatoire)
- **description** : Description courte du document (optionnel)
- **subTitle** : Sous-titre ou date d'entrée en vigueur (optionnel)
- **disclaimer** : Avertissement ou note importante (optionnel)
- **content** : Tableau d'articles avec titre et textes (obligatoire)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const CGV: Story = {
  args: {
    type: "cgu-cgv",
    templates: [
      {
        type: "legals",
        datas: {
          type: "cgu-cgv",
          title: "CGV (Conditions Générales de Vente)",
          subTitle: "En vigueur au 01/09/2024",
          disclaimer: null,
          content: [
            {
              title: "Article 1: Objet",
              texts: [
                "Les présentes Conditions Générales d'Utilisation et de Vente (CGU/CGV) ont pour objet de définir les conditions d'utilisation du site Webtrine.",
                "Elles régissent les relations contractuelles entre Webtrine et ses clients.",
              ],
            },
            {
              title: "Article 2: Accès au site",
              texts: [
                "Le site Webtrine est accessible gratuitement à tout utilisateur disposant d'un accès à Internet.",
                "Les frais d'accès au service en ligne sont à la charge de l'utilisateur.",
              ],
            },
            {
              title: "Article 3: Services proposés",
              texts: [
                "Webtrine propose des services de création de sites web, d'hébergement et de maintenance.",
                "Les prestations sont détaillées dans les devis personnalisés.",
              ],
            },
          ],
        },
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Conditions Générales de Vente avec articles détaillés.",
      },
    },
  },
};

export const MentionsLegales: Story = {
  args: {
    type: "mentions-legals",
    templates: [
      {
        type: "legals",
        datas: {
          type: "mentions-legals",
          title: "Mentions légales",
          subTitle: "En vigueur au 01/09/2024",
          disclaimer:
            "Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004.",
          content: [
            {
              title: "Article 1 - L'éditeur",
              texts: [
                "L'édition et la direction de la publication du Site est assurée par Mr. Alexandre Monschein.",
                "Adresse e-mail : contact@webtrine.fr",
              ],
            },
            {
              title: "Article 2 - L'hébergeur",
              texts: [
                "L'hébergeur du Site est la société OVHcloud.",
                "Adresse : 2 rue Kellermann - 59100 Roubaix - France",
              ],
            },
            {
              title: "Article 3 - Accès au site",
              texts: [
                "Le site est accessible gratuitement en tout lieu à tout utilisateur ayant accès à Internet.",
                "Tous les frais supportés par l'utilisateur pour accéder au service sont à sa charge.",
              ],
            },
          ],
        },
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Mentions légales conformes à la législation française.",
      },
    },
  },
};

export const Confidentialite: Story = {
  args: {
    type: "confidentialite",
    templates: [
      {
        type: "legals",
        datas: {
          type: "confidentialite",
          title: "Politique de confidentialité du site: Webtrine",
          subTitle: "En vigueur au 01/09/2024",
          disclaimer: null,
          content: [
            {
              title: "Article 1 - Collecte des données personnelles",
              texts: [
                "Webtrine s'engage à respecter la vie privée de ses utilisateurs.",
                "Les données personnelles collectées sont limitées au strict nécessaire.",
              ],
            },
            {
              title: "Article 2 - Utilisation des données",
              texts: [
                "Les données collectées sont utilisées uniquement dans le cadre des services proposés.",
                "Aucune donnée n'est transmise à des tiers sans consentement explicite.",
              ],
            },
            {
              title: "Article 3 - Vos droits",
              texts: [
                "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.",
                "Pour exercer ces droits, contactez-nous à : contact@webtrine.fr",
              ],
            },
          ],
        },
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Politique de confidentialité conforme au RGPD.",
      },
    },
  },
};
