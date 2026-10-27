import type { ModalType } from "../design-system/utils/focusTrap/type";
import type { AppProps } from "../types/config.types";
import type { PopUpError, PopUpState, StateAction } from "../types/store.types";

export const SET_CONFIG = "SET_CONFIG";
export const setConfig = ({ config, style }: AppProps): StateAction => {
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
  type: PopUpState["type"];
  message: string;
  error?: PopUpError;
}): StateAction => {
  return {
    type: DISPLAY_POPUP,
    payload: { type, message, error },
  };
};

export const HIDE_POPUP = "HIDE_POPUP";
export const hidePopUp = (): StateAction => {
  return {
    type: HIDE_POPUP,
  };
};

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const toggleModal = ({
  type,
  active,
}: {
  type: ModalType | null;
  active: boolean;
}): StateAction => {
  return {
    type: TOGGLE_MODAL,
    modalType: type,
    active,
  };
};
