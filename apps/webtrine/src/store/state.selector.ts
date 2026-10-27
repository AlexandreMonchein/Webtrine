import type { ClientSocial } from "../types/config.types";
import type { AppState } from "../types/store.types";

export const getState = (state: AppState) => state;

export const getStyle = (state: AppState) => state.style;

export const getClient = (state: AppState) => state.client;

export const getSocials = (state: AppState) =>
  getClient(state).socials as Record<string, ClientSocial> | undefined;

export const getLayout = (state: AppState) => state?.layout;

export const getLayoutFeatures = (state: AppState) =>
  getLayout(state)?.features;

export const getTemplates = (state: AppState) => getLayout(state)?.templates;

export const isPopUpDisplayed = (state: AppState) => state.popUp;

export const getModalState = (state: AppState) => state.modal;
