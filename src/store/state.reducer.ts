export const initialState = {
  client: "webtrine",
  socials: {
    facebook: {
      profileId: 100010455097064,
    },
    instagram: {
      profileId: "alexandre_monschein",
    },
    x: {
      profileId: "Chiormaaa",
    },
    linkedIn: {
      profileId: "alexandre-monschein-34984a161",
    },
  },
  layout: {
    templates: [
      {
        type: "presentation",
        id: "presentationWithBackground",
        datas: {
          title: "Webtrine",
          subTitle: "Il n'as jamais été aussi simple de se faire connaître",
        },
      },
      {
        type: "who-we-are",
        id: "whoWeAre",
        datas: {
          features: { isReversed: false, isCentered: false },
          title: "Qui sommes-nous ?",
          subTitle:
            "Nous vous présentons l’équipe de coaches certifiées qui vous accompagnera tout au long de votre transformation si vous rejoignez le programme de coaching Change ma vie : Mode d’emploi !",
        },
      },
    ],
  },
};

export function stateReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
