import type { Meta, StoryObj } from '@storybook/react';
import NumberedListComponent from "./numberedList.component";

const meta: Meta<typeof NumberedListComponent> = {
  component: NumberedListComponent,
  title: 'Design System/Components/List/NumberedList',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composant pour afficher une liste numérotée avec titres et descriptions. Chaque élément est automatiquement numéroté avec un cercle stylisé. Excellent pour présenter des processus, étapes, instructions ou workflows de manière claire et séquentielle.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal de la liste'
    },
    content: {
      control: 'object',
      description: 'Tableau d\'objets contenant title (titre de l\'étape) et description (explication détaillée)'
    }
  }
};

export default meta;

type Story = StoryObj<typeof NumberedListComponent>;

export const Default: Story = {
  name: 'Liste numérotée standard',
  args: {
    title: "Un processus de création simple et efficace",
    content: [
      {
        title: "Définition du projet & Conseils",
        description: "Dès notre premier contact, nous échangeons pour comprendre votre secteur d'activité et définir le cadre de votre projet."
      },
      {
        title: "Conception graphique UX/UI",
        description: "Deux options s'offrent à vous : soit vous choisissez des templates existants, soit nous travaillerons ensemble sur un design personnalisé."
      },
      {
        title: "Devis détaillé",
        description: "Un devis précis est établi en fonction de vos besoins et des options choisies pour votre projet."
      },
      {
        title: "Développement & Tests",
        description: "Nous développons votre site en suivant les meilleures pratiques et effectuons des tests complets avant la mise en ligne."
      },
      {
        title: "Mise en ligne & Formation",
        description: "Nous mettons votre site en ligne et vous formons à son utilisation pour une autonomie complète."
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple complet avec 5 étapes d\'un processus de création de site web. Chaque étape est numérotée automatiquement avec un design claire et accessible.'
      }
    }
  }
};

export const ShortProcess: Story = {
  name: 'Processus court',
  args: {
    title: "Étapes principales",
    content: [
      {
        title: "Consultation",
        description: "Nous discutons de vos besoins et objectifs pour bien comprendre votre projet."
      },
      {
        title: "Réalisation",
        description: "Nous créons votre site selon vos spécifications et notre expertise technique."
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Version simplifiée avec seulement 2 étapes pour tester l\'affichage minimal du composant.'
      }
    }
  }
};

export const TechnicalSteps: Story = {
  name: 'Étapes techniques',
  args: {
    title: "Processus de développement technique",
    content: [
      {
        title: "Analyse des besoins",
        description: "Étude approfondie des fonctionnalités requises et contraintes techniques du projet."
      },
      {
        title: "Architecture & Setup",
        description: "Définition de l'architecture technique, choix des technologies et mise en place de l'environnement de développement."
      },
      {
        title: "Développement itératif",
        description: "Implémentation des fonctionnalités par sprints avec feedback continu et tests réguliers."
      },
      {
        title: "Optimisation & Déploiement",
        description: "Optimisation des performances, tests de charge et déploiement en production avec monitoring."
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple orienté technique pour démontrer l\'utilisation dans un contexte de développement logiciel.'
      }
    }
  }
};

export const WithoutTitle: Story = {
  name: 'Sans titre principal',
  args: {
    title: "",
    content: [
      {
        title: "Première étape",
        description: "Description de la première action à effectuer."
      },
      {
        title: "Deuxième étape",
        description: "Explication de la suite du processus."
      },
      {
        title: "Finalisation",
        description: "Dernière étape pour compléter le processus."
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Test du composant sans titre principal pour une utilisation plus flexible dans différents contextes.'
      }
    }
  }
};
