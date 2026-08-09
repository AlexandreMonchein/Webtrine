import type { Meta, StoryObj } from "@storybook/react";

import CalendlyButton from "./calendlyButton.component";

const meta: Meta<typeof CalendlyButton> = {
  title: "Design System/Components/Calendly/Button",
  component: CalendlyButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Le composant Calendly affiche un bouton permettant d'ouvrir une popup de prise de rendez-vous Calendly.

### Intégration dans la navbar

Pour afficher le bouton Calendly dans la navbar, ajoutez la section suivante dans votre configuration :

\`\`\`json
{
  "type": "navbars",
  "id": "classicNavbar",
  "datas": {
    "features": {},
    "content": {
      "calendly": {
        "url": "https://calendly.com/webtrine-pro/premiere-rencontre"
      }
    },
    "categories": []
  }
}
\`\`\`

### Configuration requise

La propriété \`calendly.url\` doit contenir l'URL de votre page Calendly :

\`\`\`json
"calendly": {
  "url": "https://calendly.com/webtrine-pro/premiere-rencontre"
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    url: {
      description: "URL de la page Calendly",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendlyButton>;

export const Default: Story = {
  args: {
    url: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Bouton Calendly avec une URL vide (exemple de démonstration)",
      },
    },
  },
};
