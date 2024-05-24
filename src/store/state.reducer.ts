export const initialState = {};

export function stateReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CONFIG":
      const {
        config: {
          config: { client, style, layout },
        },
      } = action;

      return { ...state, client, style, layout };

    default:
      return state;
  }
}
