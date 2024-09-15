export const initialState = {
  popUp: {
    showPopUp: false,
    type: null,
    message: null,
    error: null,
  },
};

export function stateReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CONFIG":
      const {
        config: {
          config: { client, style, layout },
        },
      } = action;

      return { ...state, client, style, layout };

    case "DISPLAY_POPUP":
      const { type, message, error } = action.payload;

      return { ...state, popUp: { showPopUp: true, type, message, error } };

    case "HIDE_POPUP":
      return { ...state, popUp: { showPopUp: false } };

    default:
      return state;
  }
}
