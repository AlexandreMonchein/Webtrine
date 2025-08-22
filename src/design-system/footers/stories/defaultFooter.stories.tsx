import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DefaultFooter from '../src/defaultFooter.component';

// Mock store pour Storybook
const mockStore = configureStore({
  reducer: {
    state: (state = {
      client: { name: 'Example' },
      socials: {
        facebook: 'https://facebook.com/example',
        twitter: 'https://twitter.com/example',
        instagram: 'https://instagram.com/example'
      },
      templates: [
        { type: 'legals', datas: { type: 'cgu-cgv' } },
        { type: 'legals', datas: { type: 'mentions-legals' } },
        { type: 'legals', datas: { type: 'confidentialite' } }
      ]
    }) => state
  }
});

// Mock store sans réseaux sociaux
const mockStoreWithoutSocials = configureStore({
  reducer: {
    state: (state = {
      client: { name: 'Example' },
      socials: {},
      templates: [
        { type: 'legals', datas: { type: 'cgu-cgv' } },
        { type: 'legals', datas: { type: 'mentions-legals' } },
        { type: 'legals', datas: { type: 'confidentialite' } }
      ]
    }) => state
  }
});

const meta: Meta<typeof DefaultFooter> = {
  title: 'Design System/Footers/DefaultFooter',
  component: DefaultFooter,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Par défaut (3 colonnes)',
  args: {},
};

export const Complete4Columns: Story = {
  name: 'Complet avec 4 colonnes',
  args: {
    partnerLogos: [
      {
        name: 'google',
        alt: 'Google Partner',
        link: 'https://google.com',
        shape: 'rectangle'
      },
      {
        name: 'microsoft',
        alt: 'Microsoft Partner',
        link: 'https://microsoft.com',
        shape: 'square'
      }
    ],
    sitemapLinks: [
      {
        title: 'Navigation',
        links: [
          { label: 'Accueil', url: '/' },
          { label: 'Services', url: '/services' },
          { label: 'Portfolio', url: '/portfolio' },
          { label: 'Blog', url: '/blog' }
        ]
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Développement Web', url: '/web-dev' },
          { label: 'Applications Mobiles', url: '/mobile-dev' },
          { label: 'Conseil', url: '/consulting' }
        ]
      },
      {
        title: 'Support',
        links: [
          { label: 'Documentation', url: '/docs' },
          { label: 'Support Client', url: '/support' },
          { label: 'Formation', url: '/training' }
        ]
      },
      {
        title: 'Légal',
        links: [
          { label: 'CGU & CGV', url: '/cgu-cgv' },
          { label: 'Mentions légales', url: '/mentions-legals' },
          { label: 'RGPD', url: '/rgpd' },
          { label: 'Cookies', url: '/cookies' }
        ]
      }
    ]
  },
};

export const WithoutLeftSection: Story = {
  name: 'Sans section de gauche (logos partenaires)',
  args: {
    sitemapLinks: [
      {
        title: 'Navigation',
        links: [
          { label: 'Accueil', url: '/' },
          { label: 'Services', url: '/services' },
          { label: 'Portfolio', url: '/portfolio' },
          { label: 'Blog', url: '/blog' }
        ]
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Développement Web', url: '/web-dev' },
          { label: 'Applications Mobiles', url: '/mobile-dev' },
          { label: 'Conseil', url: '/consulting' }
        ]
      },
      {
        title: 'Support',
        links: [
          { label: 'Documentation', url: '/docs' },
          { label: 'Support Client', url: '/support' },
          { label: 'Formation', url: '/training' }
        ]
      },
      {
        title: 'Légal',
        links: [
          { label: 'CGU & CGV', url: '/cgu-cgv' },
          { label: 'Mentions légales', url: '/mentions-legals' },
          { label: 'RGPD', url: '/rgpd' }
        ]
      }
    ]
  },
};

export const OneColumnOnly: Story = {
  name: 'Une seule colonne (impaire)',
  args: {
    partnerLogos: [
      {
        name: 'google',
        alt: 'Google Partner',
        link: 'https://google.com',
        shape: 'rectangle'
      },
      {
        name: 'microsoft',
        alt: 'Microsoft Partner',
        link: 'https://microsoft.com',
        shape: 'square'
      }
    ],
    sitemapLinks: [
      {
        title: 'Navigation principale',
        links: [
          { label: 'Accueil', url: '/' },
          { label: 'À propos', url: '/about' },
          { label: 'Services', url: '/services' },
          { label: 'Portfolio', url: '/portfolio' },
          { label: 'Blog', url: '/blog' },
          { label: 'Contact', url: '/contact' },
          { label: 'CGU & CGV', url: '/cgu-cgv' },
          { label: 'Mentions légales', url: '/mentions-legals' }
        ]
      }
    ]
  },
};

export const ThreeColumnsComplete: Story = {
  name: 'Trois colonnes complètes (impaire)',
  args: {
    partnerLogos: [
      {
        name: 'google',
        alt: 'Google Partner',
        link: 'https://google.com',
        shape: 'rectangle'
      },
      {
        name: 'microsoft',
        alt: 'Microsoft Partner',
        link: 'https://microsoft.com',
        shape: 'square'
      },
      {
        name: 'amazon',
        alt: 'Amazon Partner',
        link: 'https://amazon.com',
        shape: 'rectangle'
      }
    ],
    sitemapLinks: [
      {
        title: 'Navigation',
        links: [
          { label: 'Accueil', url: '/' },
          { label: 'À propos', url: '/about' },
          { label: 'Services', url: '/services' },
          { label: 'Portfolio', url: '/portfolio' },
          { label: 'Contact', url: '/contact' }
        ]
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Développement Web', url: '/web-dev' },
          { label: 'Applications Mobiles', url: '/mobile-dev' },
          { label: 'E-commerce', url: '/ecommerce' },
          { label: 'Conseil', url: '/consulting' },
          { label: 'Maintenance', url: '/maintenance' }
        ]
      },
      {
        title: 'Légal & Support',
        links: [
          { label: 'CGU & CGV', url: '/cgu-cgv' },
          { label: 'Mentions légales', url: '/mentions-legals' },
          { label: 'Confidentialité', url: '/confidentialite' },
          { label: 'Documentation', url: '/docs' },
          { label: 'Support', url: '/support' }
        ]
      }
    ]
  },
};

export const WithoutRightSection: Story = {
  name: 'Sans section de droite (réseaux sociaux)',
  decorators: [
    (Story) => (
      <Provider store={mockStoreWithoutSocials}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
  args: {
    partnerLogos: [
      {
        name: 'google',
        alt: 'Google Partner',
        link: 'https://google.com',
        shape: 'rectangle'
      },
      {
        name: 'microsoft',
        alt: 'Microsoft Partner',
        link: 'https://microsoft.com',
        shape: 'square'
      }
    ],
    sitemapLinks: [
      {
        title: 'Navigation',
        links: [
          { label: 'Accueil', url: '/' },
          { label: 'Services', url: '/services' },
          { label: 'Portfolio', url: '/portfolio' },
          { label: 'Blog', url: '/blog' }
        ]
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Développement Web', url: '/web-dev' },
          { label: 'Applications Mobiles', url: '/mobile-dev' },
          { label: 'Conseil', url: '/consulting' }
        ]
      },
      {
        title: 'Support',
        links: [
          { label: 'Documentation', url: '/docs' },
          { label: 'Support Client', url: '/support' },
          { label: 'Formation', url: '/training' }
        ]
      },
      {
        title: 'Légal',
        links: [
          { label: 'CGU & CGV', url: '/cgu-cgv' },
          { label: 'Mentions légales', url: '/mentions-legals' },
          { label: 'RGPD', url: '/rgpd' }
        ]
      }
    ]
  },
};
