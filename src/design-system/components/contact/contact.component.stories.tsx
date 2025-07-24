import type { Meta, StoryObj } from '@storybook/react';
import ContactComponent from "./contact.component";

const meta: Meta<typeof ContactComponent> = {
  component: ContactComponent,
  title: 'Design System/Components/Contact',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composant de formulaire de contact avec validation et traduction i18n. Comprend des champs pour nom, entreprise, sujet et message avec bouton d\'envoi. Utilise le système de traduction pour supporter multiple langues. Idéal pour les pages de contact et demandes de devis.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ContactComponent>;

export const Default: Story = {
  name: 'Formulaire de contact standard',
  parameters: {
    docs: {
      description: {
        story: 'Formulaire de contact par défaut avec tous les champs disponibles : nom (requis), entreprise (optionnel), sujet (requis), et message (requis). Utilise les traductions i18n pour les labels et placeholders.'
      }
    }
  }
};
