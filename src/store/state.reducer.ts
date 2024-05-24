export const initialState = {};

export function stateReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CONFIG":
      const {
        config: {
          config: { client, layout },
        },
      } = action;

      return { ...state, client, layout };

    default:
      return state;
  }
}
