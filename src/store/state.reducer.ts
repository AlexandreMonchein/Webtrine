export const initialState = {
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
};

export function stateReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
