export const getState = (state) => state;

export const getStyle = (state) => state.style;

export const getClient = (state) => state.client;

export const getSocials = (state) => getClient(state).socials;

export const getLayout = (state) => state?.layout;

export const getTemplates = (state) => getLayout(state)?.templates;

export const isPopUpDisplayed = (state) => state.popUp;

export const getModalState = (state) => state.modal;
