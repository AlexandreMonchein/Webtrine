import type { Meta, StoryObj } from '@storybook/react';
import { MapLeaflet } from "./moduleLeafletMap.component";

const meta: Meta<typeof MapLeaflet> = {
  component: MapLeaflet,
  title: "Design System/Components/Map",
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Map Component

Composant de carte interactive utilisant Leaflet avec gestion des marqueurs, informations de contact et horaires d'ouverture. Supporte la géolocalisation, le zoom et la navigation tactile. Idéal pour afficher des localisations d'entreprise, points de vente ou événements.

## Configuration JSON pour intégration

### Utilisation dans un contact étendu :
\`\`\`json
{
  "type": "extendedContact",
  "datas": {
    "map": {
      "type": "map",
      "id": "leafletMap",
      "datas": {
        "bigTitle": "Vous pouvez nous trouver ici",
        "title": "Où nous trouver:",
        "openTimesTitle": "Horaires d'ouverture:",
        "openTimes": [
          {
            "days": "Lun - Ven",
            "hours": "8h - 18h"
          },
          {
            "days": "Sam - Dim",
            "hours": "Fermé"
          }
        ],
        "features": { "isSmall": true },
        "places": [
          {
            "id": 1,
            "address": "6 Rue de Molina, 42000 Saint-Étienne",
            "phone": "04 77 41 59 13",
            "position": [45.466, 4.395]
          }
        ]
      }
    },
    "features": {}
  }
}
\`\`\`

### Utilisation autonome :
\`\`\`json
{
  "type": "map",
  "id": "map-section",
  "datas": {
    "bigTitle": "Notre localisation",
    "title": "Venez nous rendre visite",
    "openTimesTitle": "Nos horaires",
    "openTimes": [
      {
        "days": "Lundi - Vendredi",
        "hours": "9h00 - 18h00"
      },
      {
        "days": "Samedi",
        "hours": "9h00 - 12h00"
      },
      {
        "days": "Dimanche",
        "hours": "Fermé"
      }
    ],
    "places": [
      {
        "id": "bureau-principal",
        "address": "123 Avenue de la République, 75011 Paris",
        "phone": "01 23 45 67 89",
        "position": [48.8566, 2.3522]
      }
    ],
    "features": {
      "isSmall": false,
      "showZoomControls": true,
      "enableGeolocation": true
    }
  }
}
\`\`\`

### Exemple avec plusieurs lieux :
\`\`\`json
{
  "places": [
    {
      "id": "paris",
      "address": "Bureau Paris - 123 Rue de Rivoli, 75001 Paris",
      "phone": "01 23 45 67 89",
      "position": [48.8566, 2.3522]
    },
    {
      "id": "lyon",
      "address": "Bureau Lyon - 456 Place Bellecour, 69002 Lyon",
      "phone": "04 78 90 12 34",
      "position": [45.7640, 4.8357]
    }
  ]
}
\`\`\`

### Coordonnées de référence :
- **Paris** : [48.8566, 2.3522]
- **Lyon** : [45.7640, 4.8357]
- **Marseille** : [43.2965, 5.3698]
- **Saint-Étienne** : [45.466, 4.395]

### Options de configuration :
- **bigTitle** : Titre principal de la section (optionnel)
- **title** : Titre de la localisation (optionnel)
- **openTimesTitle** : Titre de la section horaires (optionnel)
- **openTimes** : Tableau des horaires d'ouverture (optionnel)
- **places** : Tableau des lieux à afficher (obligatoire)
- **features** : Options de configuration (optionnel)
        `
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
