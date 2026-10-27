import type { ModalType } from "../design-system/utils/focusTrap/type";
import type { ClientConfig, Layout, StyleConfig } from "./config.types";

export interface PopUpError {
  code?: number | string;
  message?: string;
  stack?: string;
}

export interface PopUpState {
  showPopUp: boolean;
  type?: "success" | "warning" | "error" | null;
  message?: string | null;
  error?: PopUpError | null;
}

export interface ModalState {
  type: ModalType | null;
  active: boolean;
}

// État du store une fois la config chargée (client, style et layout sont posés par SET_CONFIG)
export interface AppState {
  client: ClientConfig;
  style: StyleConfig;
  layout: Layout;
  popUp: PopUpState;
  modal: ModalState;
}

type SetConfigAction = {
  type: "SET_CONFIG";
  client: ClientConfig;
  style: StyleConfig;
  layout: Layout;
};

type DisplayPopUpAction = {
  type: "DISPLAY_POPUP";
  payload: {
    type: PopUpState["type"];
    message: string;
    error?: PopUpError;
  };
};

type HidePopUpAction = { type: "HIDE_POPUP" };

type ToggleModalAction = {
  type: "TOGGLE_MODAL";
  modalType: ModalType | null;
  active: boolean;
};

export type StateAction =
  SetConfigAction | DisplayPopUpAction | HidePopUpAction | ToggleModalAction;
