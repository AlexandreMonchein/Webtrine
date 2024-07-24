export const SET_CONFIG = "SET_CONFIG";
export const setConfig = (config) => {
  return {
    type: SET_CONFIG,
    config,
  };
};

export const DISPLAY_POPUP = "DISPLAY_POPUP";
export const showPopUp = ({ type, message, error = undefined }) => {
  return {
    type: "DISPLAY_POPUP",
    payload: { type, message, error },
  };
};

export const HIDE_POPUP = "HIDE_POPUP";
export const hidePopUp = () => {
  return {
    type: "HIDE_POPUP",
  };
};
