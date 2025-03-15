import DescriptionComponent from "./description.component";

const meta = {
  component: DescriptionComponent,
};

export default meta;

type Story = Record<string, any>;

export const Default: Story = {
  args: {
    features: { isReversed: false, isContinious: false },
    title: "Une petite présentation s'impose !",
    content: [
      {
        text: "Bonjour et bienvenue !",
      },
      {
        text: "Je m'appelle Alexandre, j'ai 24 ans et je suis développeur web. Ma passion dans ce domaine, c'est de créer des sites esthétiques et faciles à utiliser.",
      },
      {
        text: "C'est cette passion qui m'a poussé à lancer mon propre projet, afin d'exprimer ma créativité et mon amour pour le développement web.",
      },
      {
        text: "C'est ainsi qu'est née Webtrine. Webtrine c'est une solution que j'ai développée pour concevoir des sites vitrines à partir de templates que je crée et améliore continuellement. Ensemble, nous pourrons rapidement mettre en place VOTRE site en utilisant ces templates.",
      },
      {
        text: "Mon objectif est de simplifier la création de votre présence en ligne. J'ai donc conçu une offre unique pour vous permettre d'obtenir facilement et rapidement votre identité web.",
      },
      {
        text: "Le processus est simple : lors d'un premier rendez-vous, nous choisirons ensemble les templates et définirons les aspects graphiques ainsi que les formalités (comme le nom de domaine). Ensuite, vous me fournirez les informations nécessaires pour remplir votre site. En quelques jours seulement, votre site sera opérationnel et en ligne.",
      },
      {
        text: "Avec Webtrine, la création de votre site vitrine n'a jamais été aussi simple.",
      },
      {
        text: "Au plaisir de collaborer avec vous !",
      },
    ],
    image: "me",
  },
};

export const Reversed: Story = {
  args: {
    features: {
      isReversed: true,
      isCentered: false,
    },

    title: "Une petite présentation s'impose !",

    content: [
      {
        text: "Bonjour et bienvenue !",
      },
      {
        text: "Je m'appelle Alexandre, j'ai 24 ans et je suis développeur web. Ma passion dans ce domaine, c'est de créer des sites esthétiques et faciles à utiliser.",
      },
      {
        text: "C'est cette passion qui m'a poussé à lancer mon propre projet, afin d'exprimer ma créativité et mon amour pour le développement web.",
      },
      {
        text: "C'est ainsi qu'est née Webtrine. Webtrine c'est une solution que j'ai développée pour concevoir des sites vitrines à partir de templates que je crée et améliore continuellement. Ensemble, nous pourrons rapidement mettre en place VOTRE site en utilisant ces templates.",
      },
      {
        text: "Mon objectif est de simplifier la création de votre présence en ligne. J'ai donc conçu une offre unique pour vous permettre d'obtenir facilement et rapidement votre identité web.",
      },
      {
        text: "Le processus est simple : lors d'un premier rendez-vous, nous choisirons ensemble les templates et définirons les aspects graphiques ainsi que les formalités (comme le nom de domaine). Ensuite, vous me fournirez les informations nécessaires pour remplir votre site. En quelques jours seulement, votre site sera opérationnel et en ligne.",
      },
      {
        text: "Avec Webtrine, la création de votre site vitrine n'a jamais été aussi simple.",
      },
      {
        text: "Au plaisir de collaborer avec vous !",
      },
    ],

    image: "me",
  },
};

export const Continuous: Story = {
  args: {
    features: {
      isReversed: false,
      isContinious: true,
    },

    title: "Une petite présentation s'impose !",

    content: [
      {
        text: "Bonjour et bienvenue !",
      },
      {
        text: "Je m'appelle Alexandre, j'ai 24 ans et je suis développeur web. Ma passion dans ce domaine, c'est de créer des sites esthétiques et faciles à utiliser.",
      },
      {
        text: "C'est cette passion qui m'a poussé à lancer mon propre projet, afin d'exprimer ma créativité et mon amour pour le développement web.",
      },
      {
        text: "C'est ainsi qu'est née Webtrine. Webtrine c'est une solution que j'ai développée pour concevoir des sites vitrines à partir de templates que je crée et améliore continuellement. Ensemble, nous pourrons rapidement mettre en place VOTRE site en utilisant ces templates.",
      },
      {
        text: "Mon objectif est de simplifier la création de votre présence en ligne. J'ai donc conçu une offre unique pour vous permettre d'obtenir facilement et rapidement votre identité web.",
      },
      {
        text: "Le processus est simple : lors d'un premier rendez-vous, nous choisirons ensemble les templates et définirons les aspects graphiques ainsi que les formalités (comme le nom de domaine). Ensuite, vous me fournirez les informations nécessaires pour remplir votre site. En quelques jours seulement, votre site sera opérationnel et en ligne.",
      },
      {
        text: "Avec Webtrine, la création de votre site vitrine n'a jamais été aussi simple.",
      },
      {
        text: "Au plaisir de collaborer avec vous !",
      },
    ],

    image: "me",
  },
};
