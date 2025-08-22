import type { Meta, StoryObj } from "@storybook/react";
import ContactComponent from "./contact.component";

const meta: Meta<typeof ContactComponent> = {
  component: ContactComponent,
  title: "Design System/Components/Contact",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Contact Component

Composant de formulaire de contact avec validation et traduction i18n.

## Configuration JSON pour intégration

Le composant Contact utilise les informations client du \`config.json\` :

\`\`\`json
{
  "client": {
    "contact": {
      "name": "Nom du contact",
      "phone": "+33123456789",
      "email": "contact@example.com",
      "mailTemplate": "template_id_emailjs"
    }
  }
}
\`\`\`

### Pour une page dédiée contact :
\`\`\`json
{
  "type": "description",
  "id": "multiDescriptions",
  "name": "Contact",
  "datas": {
    "title": "Contact",
    "description": "Nous contacter",
    "content": {
      "contact-1": {
        "type": "extendedContact",
        "datas": {
          "map": {
            "type": "map",
            "id": "leafletMap",
            "datas": {
              "bigTitle": "Vous pouvez nous trouver ici",
              "title": "Ou nous trouver: ",
              "openTimesTitle": "Horaires d'ouverture:",
              "openTimes": [
                {
                  "days": "Lun - Ven",
                  "hours": "8h - 18h"
                }
              ]
            }
          }
        }
      }
    }
  }
}
\`\`\`

### Configuration EmailJS requise :
- \`mailTemplate\` : ID du template EmailJS
- Variables utilisées : \`{{from_name}}\`, \`{{company}}\`, \`{{subject}}\`, \`{{message}}\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ContactComponent>;

export const Default: Story = {
  name: "Formulaire de contact standard",
  parameters: {
    docs: {
      description: {
        story:
          "Formulaire de contact par défaut avec tous les champs disponibles : nom (requis), entreprise (optionnel), sujet (requis), et message (requis). Utilise les traductions i18n pour les labels et placeholders.",
      },
    },
  },
};
