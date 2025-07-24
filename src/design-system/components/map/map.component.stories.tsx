import type { Meta, StoryObj } from '@storybook/react';
import { MapLeaflet } from "./moduleLeafletMap.component";

const meta: Meta<typeof MapLeaflet> = {
  component: MapLeaflet,
  title: "Design System/Components/Map",
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composant de carte interactive utilisant Leaflet avec gestion des marqueurs, informations de contact et horaires d\'ouverture. Supporte la géolocalisation, le zoom et la navigation tactile. Idéal pour afficher des localisations d\'entreprise, points de vente ou événements.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    bigTitle: {
      control: 'text',
      description: 'Titre principal de la section'
    },
    title: {
      control: 'text',
      description: 'Titre de la localisation'
    },
    places: {
      control: 'object',
      description: 'Tableau des lieux avec position, adresse, téléphone'
    },
    openTimesTitle: {
      control: 'text',
      description: 'Titre de la section horaires'
    },
    openTimes: {
      control: 'object',
      description: 'Horaires d\'ouverture avec jours et heures'
    }
  }
};

export default meta;

type Story = StoryObj<typeof MapLeaflet>;

export const Default: Story = {
  name: 'Carte par défaut',
  args: {
    bigTitle: "Nous contacter",
    title: "Notre bureau",
    places: [
      {
        id: "webtrine-office",
        position: [48.8566, 2.3522],
        address: "Paris, France",
        phone: "+33 1 23 45 67 89"
      }
    ],
    openTimesTitle: "Horaires d'ouverture",
    openTimes: [
      {
        days: "Lundi - Vendredi",
        hours: "9h00 - 18h00"
      },
      {
        days: "Samedi",
        hours: "10h00 - 16h00"
      },
      {
        days: "Dimanche",
        hours: "Fermé"
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration complète avec localisation, informations de contact et horaires d\'ouverture.'
      }
    }
  }
};

export const SimpleLocation: Story = {
  name: 'Localisation simple',
  args: {
    bigTitle: "Nous trouver",
    title: "Agence Webtrine",
    places: [
      {
        id: "simple-location",
        position: [48.8606, 2.3376],
        address: "Louvre, Paris, France",
        phone: null
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Version simplifiée sans horaires d\'ouverture, seulement la localisation et l\'adresse.'
      }
    }
  }
};

export const MultipleLocations: Story = {
  name: 'Plusieurs localisations',
  args: {
    bigTitle: "Nos bureaux",
    title: "Localisations",
    places: [
      {
        id: "paris-office",
        position: [48.8566, 2.3522],
        address: "Bureau Paris - Champs-Élysées",
        phone: "+33 1 23 45 67 89"
      },
      {
        id: "louvre-office",
        position: [48.8606, 2.3376],
        address: "Bureau Paris - Louvre",
        phone: "+33 1 98 76 54 32"
      }
    ],
    openTimesTitle: "Horaires",
    openTimes: [
      {
        days: "Lun - Ven",
        hours: "9h - 18h"
      },
      {
        days: "Sam",
        hours: "10h - 16h"
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple avec plusieurs localisations affichées sur la même carte.'
      }
    }
  }
};
