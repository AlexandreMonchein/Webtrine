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
        type: "banner",
        id: "banner",
        datas: {
          title: "Webtrine",
          subTitle: "Il n'as jamais été aussi simple de se faire connaître",
        },
      },
      {
        type: "description",
        id: "description",
        datas: {
          features: { isReversed: false, isCentered: false },
          title: "Qui sommes-nous ?",
          subTitle:
            "Nous vous présentons l’équipe de coaches certifiées qui vous accompagnera tout au long de votre transformation si vous rejoignez le programme de coaching Change ma vie : Mode d’emploi !",
        },
      },
      {
        type: "showcase",
        id: "showcase",
        datas: {
          features: {},
          content: [
            {
              image: "https://via.placeholder.com/150",
              title: "Item 1",
              description: "This is the description for item 1.",
            },
            {
              image: "https://via.placeholder.com/150",
              title: "Item 2",
              description: "This is the description for item 2.",
            },
            {
              image: "https://via.placeholder.com/150",
              title: "Item 3",
              description: "This is the description for item 3.",
            },
            {
              image: "https://via.placeholder.com/150",
              title: "Item 4",
              description: "This is the description for item 4.",
            },
            {
              image: "https://via.placeholder.com/150",
              title: "Item 5",
              description: "This is the description for item 5.",
            },
            {
              image: "https://via.placeholder.com/150",
              title: "Item 6",
              description: "This is the description for item 6.",
            },
          ],
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
