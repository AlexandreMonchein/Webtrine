import type { AppProps } from "../types/config.types";

export const SET_CONFIG = "SET_CONFIG";
export const setConfig = ({ config, style }: AppProps) => {
  const { client, layout } = config || {};

  return {
    type: SET_CONFIG,
    client,
    style,
    layout,
  };
};

export const DISPLAY_POPUP = "DISPLAY_POPUP";
export const showPopUp = ({
  type,
  message,
  error = undefined,
}: {
  type: string;
  message: string;
  error?: Error;
}) => {
  return {
    type: DISPLAY_POPUP,
    payload: { type, message, error },
  };
};

export const HIDE_POPUP = "HIDE_POPUP";
export const hidePopUp = () => {
  return {
    type: HIDE_POPUP,
  };
};

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const toggleModal = ({
  type,
  active,
}: {
  type: string;
  active: boolean;
}) => {
  return {
    type: TOGGLE_MODAL,
    modalType: type,
    active,
  };
};
