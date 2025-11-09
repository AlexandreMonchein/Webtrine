import type { Meta, StoryObj } from "@storybook/react";

import QAComponent from "./q&a.component";
import { QACategory, QAItem, QAProps } from "./q&a.types";

const meta: Meta<typeof QAComponent> = {
  title: "Design System/Components/Q&A",
  component: QAComponent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Le composant Q&A (Questions-Réponses) offre une interface accordéon interactive pour présenter des questions fréquentes.
Il supporte les catégories avec onglets et permet d'ouvertures multiples ou uniques selon la configuration.

### Fonctionnalités
- Interface accordéon avec animations fluides
- Support des catégories avec navigation par onglets
- Mode mono ou multi-ouverture
- Contenu HTML sécurisé avec DOMPurify
- Accessibilité complète (ARIA, navigation clavier)
- Design responsive et personnalisable

### Exemple d'implémentation JSON
\`\`\`json
{
  "features": {
    "hasCategories": true,
    "allowMultipleOpen": false
  },
  "title": "Questions fréquentes",
  "subtitle": "Trouvez rapidement vos réponses",
  "content": {
    "categories": [
      {
        "id": "general",
        "label": "Général",
        "items": [
          {
            "id": "q1",
            "question": "Comment vous contacter ?",
            "answer": "<p>Par téléphone au <strong>01 23 45 67 89</strong> ou par email.</p>"
          },
          {
            "id": "q2",
            "question": "Quels sont vos horaires ?",
            "answer": "<p>Du lundi au vendredi : <strong>9h-18h</strong><br>Samedi : 10h-16h</p>"
          }
        ]
      },
      {
        "id": "services",
        "label": "Services",
        "items": [
          {
            "id": "q3",
            "question": "Que proposez-vous ?",
            "answer": "<p>Création de sites web et hébergement professionnel.</p>"
          },
          {
            "id": "q4",
            "question": "Combien ça coûte ?",
            "answer": "<p>À partir de <strong>450€ HT</strong> pour un site vitrine complet.</p>"
          }
        ]
      }
    ]
  }
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    features: {
      description: "Configuration des fonctionnalités du composant",
      control: { type: "object" },
    },
    title: {
      description: "Titre principal de la section Q&A",
      control: { type: "text" },
    },
    subtitle: {
      description: "Sous-titre descriptif",
      control: { type: "text" },
    },
    content: {
      description:
        "Contenu des questions-réponses (catégories ou items directs)",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof QAComponent>;

// Data samples
const basicItems: QAItem[] = [
  {
    id: "basic-1",
    question: "Comment prendre rendez-vous ?",
    answer:
      "<p>Vous pouvez prendre rendez-vous par téléphone au <strong>01 23 45 67 89</strong> ou directement en ligne via notre formulaire de contact.</p>",
  },
  {
    id: "basic-2",
    question: "Quels sont vos horaires d'ouverture ?",
    answer:
      "<p>Nous sommes ouverts :</p><ul><li>Du lundi au vendredi : 9h - 18h</li><li>Samedi : 10h - 16h</li><li>Dimanche : Fermé</li></ul>",
  },
  {
    id: "basic-3",
    question: "Acceptez-vous les cartes de crédit ?",
    answer:
      "<p>Oui, nous acceptons toutes les cartes de crédit principales ainsi que les paiements en espèces et par chèque.</p>",
  },
];

const tattooCategories: QACategory[] = [
  {
    id: "general",
    label: "Général",
    items: [
      {
        id: "gen-1",
        question: "Comment prendre rendez-vous pour un tatouage ?",
        answer:
          "<p>Pour prendre rendez-vous, vous pouvez :</p><ul><li>Nous appeler au <strong>01 23 45 67 89</strong></li><li>Passer directement au studio</li><li>Nous envoyer un message via nos réseaux sociaux</li></ul><p>Nous vous conseillons de prévoir votre rendez-vous <em>au moins 2 semaines à l'avance</em>.</p>",
      },
      {
        id: "gen-2",
        question: "Quel est l'âge minimum pour se faire tatouer ?",
        answer:
          "<p>L'âge minimum légal est de <strong>18 ans</strong>. Aucune exception ne peut être faite, même avec une autorisation parentale.</p><p>Une pièce d'identité valide sera demandée avant toute séance.</p>",
      },
      {
        id: "gen-3",
        question: "Combien coûte un tatouage ?",
        answer:
          "<p>Le prix dépend de plusieurs facteurs :</p><ul><li><strong>Taille</strong> : de 80€ pour un petit motif à plusieurs centaines d'euros</li><li><strong>Complexité</strong> : détails, couleurs, style</li><li><strong>Emplacement</strong> : certaines zones sont plus techniques</li><li><strong>Durée</strong> : tarif horaire de 120€/h</li></ul><p>Un devis personnalisé vous sera fourni lors de la consultation.</p>",
      },
    ],
  },
  {
    id: "preparation",
    label: "Préparation",
    items: [
      {
        id: "prep-1",
        question: "Comment bien se préparer avant une séance ?",
        answer:
          "<p>Pour optimiser votre séance :</p><ul><li><strong>Dormez bien</strong> la nuit précédente</li><li><strong>Mangez</strong> avant de venir (évitez d'être à jeun)</li><li><strong>Hydratez-vous</strong> correctement</li><li><strong>Évitez l'alcool</strong> 24h avant</li><li><strong>Portez des vêtements confortables</strong></li></ul>",
      },
      {
        id: "prep-2",
        question: "Puis-je prendre des antidouleurs avant ?",
        answer:
          "<p><strong>Non</strong>, il est déconseillé de prendre des antidouleurs avant une séance :</p><ul><li>L'aspirine fluidifie le sang</li><li>Certains médicaments peuvent affecter la cicatrisation</li><li>Votre tatoueur a besoin de votre ressenti naturel</li></ul><p>Si vous avez des doutes, consultez votre médecin.</p>",
      },
    ],
  },
  {
    id: "aftercare",
    label: "Soins post-tatouage",
    items: [
      {
        id: "after-1",
        question: "Comment entretenir mon tatouage après la séance ?",
        answer:
          "<p>Les soins post-tatouage sont cruciaux :</p><ol><li><strong>Gardez le film protecteur</strong> 2-4 heures</li><li><strong>Nettoyez délicatement</strong> à l'eau tiède et savon neutre</li><li><strong>Séchez en tamponnant</strong> (ne frottez pas)</li><li><strong>Appliquez une crème cicatrisante</strong> 2-3 fois par jour</li><li><strong>Évitez les vêtements serrés</strong> sur la zone</li></ol>",
      },
      {
        id: "after-2",
        question: "Combien de temps dure la cicatrisation ?",
        answer:
          "<p>La cicatrisation se déroule en plusieurs phases :</p><ul><li><strong>3-7 jours</strong> : Formation de croûtes</li><li><strong>1-2 semaines</strong> : Desquamation</li><li><strong>1 mois</strong> : Cicatrisation superficielle complète</li><li><strong>2-3 mois</strong> : Cicatrisation profonde</li></ul><p>Le tatouage peut paraître terne pendant cette période, c'est normal !</p>",
      },
      {
        id: "after-3",
        question: "Que faire si mon tatouage s'infecte ?",
        answer:
          "<p><strong>Signes d'infection :</strong></p><ul><li>Rougeur excessive et chaude</li><li>Gonflement important</li><li>Pus ou écoulement malodorant</li><li>Fièvre</li></ul><p><strong>En cas d'infection :</strong></p><ol><li>Consultez immédiatement un médecin</li><li>Ne touchez pas à la zone infectée</li><li>Continuez les soins d'hygiène</li><li>Contactez votre tatoueur</li></ol>",
      },
    ],
  },
  {
    id: "restrictions",
    label: "Restrictions",
    items: [
      {
        id: "rest-1",
        question: "Quand puis-je reprendre le sport ?",
        answer:
          "<p>La reprise du sport dépend de l'emplacement du tatouage :</p><ul><li><strong>Sport léger</strong> : 48-72 heures</li><li><strong>Musculation/sport intense</strong> : 1-2 semaines</li><li><strong>Sports aquatiques</strong> : 3-4 semaines minimum</li></ul><p>Évitez de faire transpirer excessivement la zone tatouée pendant la cicatrisation.</p>",
      },
      {
        id: "rest-2",
        question: "Puis-je me baigner après un tatouage ?",
        answer:
          "<p><strong>À éviter absolument</strong> pendant la cicatrisation :</p><ul><li>Piscines (chlore irritant)</li><li>Mer (sel et bactéries)</li><li>Bains chauds</li><li>Saunas et hammams</li></ul><p>Les douches rapides sont autorisées, mais évitez de faire tremper le tatouage.</p>",
      },
    ],
  },
];

// Stories
export const Default: Story = {
  args: {
    features: {
      hasCategories: false,
      allowMultipleOpen: false,
    },
    title: "Questions fréquentes",
    subtitle: "Trouvez rapidement les réponses à vos questions",
    content: {
      categories: [],
      items: basicItems,
    },
  },
};

export const WithMultipleOpen: Story = {
  args: {
    features: {
      hasCategories: false,
      allowMultipleOpen: true,
    },
    title: "FAQ - Ouverture multiple",
    subtitle: "Vous pouvez ouvrir plusieurs questions simultanément",
    content: {
      categories: [],
      items: basicItems,
    },
  },
};

export const WithCategories: Story = {
  args: {
    features: {
      hasCategories: true,
      allowMultipleOpen: false,
    },
    title: "FAQ Tatouage",
    subtitle: "Tout ce que vous devez savoir sur le tatouage",
    content: {
      categories: tattooCategories,
      items: [],
    },
  },
};

export const WithCategoriesMultipleOpen: Story = {
  args: {
    features: {
      hasCategories: true,
      allowMultipleOpen: true,
    },
    title: "Guide complet du tatouage",
    subtitle: "Questions-réponses organisées par thématiques",
    content: {
      categories: tattooCategories,
      items: [],
    },
  },
};

export const NoTitle: Story = {
  args: {
    features: {
      hasCategories: false,
      allowMultipleOpen: false,
    },
    content: {
      categories: [],
      items: basicItems.slice(0, 2),
    },
  },
};

export const EmptyState: Story = {
  args: {
    features: {
      hasCategories: false,
      allowMultipleOpen: false,
    },
    title: "FAQ vide",
    subtitle: "Aucune question n'est disponible pour le moment",
    content: {
      categories: [],
      items: [],
    },
  },
};

export const EmptyCategories: Story = {
  args: {
    features: {
      hasCategories: true,
      allowMultipleOpen: false,
    },
    title: "FAQ avec catégories vides",
    content: {
      categories: [
        {
          id: "empty-1",
          label: "Catégorie vide",
          items: [],
        },
        {
          id: "empty-2",
          label: "Autre catégorie vide",
          items: [],
        },
      ],
      items: [],
    },
  },
};

export const SingleQuestion: Story = {
  args: {
    features: {
      hasCategories: false,
      allowMultipleOpen: false,
    },
    title: "Question unique",
    content: {
      categories: [],
      items: [
        {
          id: "single",
          question: "Comment nous contacter ?",
          answer:
            "<p>Vous pouvez nous contacter par :</p><ul><li>Téléphone : <strong>01 23 45 67 89</strong></li><li>Email : <strong>contact@example.com</strong></li><li>En personne dans nos locaux</li></ul>",
        },
      ],
    },
  },
};

export const LongContent: Story = {
  args: {
    features: {
      hasCategories: true,
      allowMultipleOpen: true,
    },
    title: "FAQ avec contenu étendu",
    subtitle: "Démonstration avec du contenu plus long pour tester l'affichage",
    content: {
      categories: [
        {
          id: "long",
          label: "Contenu étendu",
          items: [
            {
              id: "long-1",
              question:
                "Voici une question très longue qui pourrait s'étendre sur plusieurs lignes pour tester l'affichage responsive ?",
              answer: `
                <p>Voici une réponse très détaillée qui contient beaucoup d'informations importantes pour bien comprendre le sujet traité.</p>

                <h4>Sous-section importante</h4>
                <p>Cette réponse contient plusieurs paragraphes avec des <strong>éléments en gras</strong>, des <em>éléments en italique</em>, et même des listes :</p>

                <ul>
                  <li>Premier élément de la liste avec beaucoup de texte qui peut s'étendre sur plusieurs lignes</li>
                  <li>Deuxième élément également assez long pour tester l'affichage</li>
                  <li>Troisième élément qui complète cette démonstration</li>
                </ul>

                <p>Et aussi des listes numérotées :</p>
                <ol>
                  <li>Première étape à suivre</li>
                  <li>Deuxième étape importante</li>
                  <li>Troisième et dernière étape</li>
                </ol>

                <p>Enfin, un dernier paragraphe pour conclure cette réponse détaillée qui permet de tester le comportement du composant avec du contenu volumineux.</p>
              `,
            },
          ],
        },
      ],
      items: [],
    },
  },
};
