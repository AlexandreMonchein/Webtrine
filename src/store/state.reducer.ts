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
    ],
  },
};

export function stateReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
