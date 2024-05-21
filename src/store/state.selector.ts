export const getState = (state) => state;

export const getClient = (state) => state.client;

export const getSocials = (state) => state.socials;

export const getLayout = (state) => state.layout;

export const getMainTemplates = (state) => getLayout(state)?.main?.templates;

export const getSecondTemplates = (state) =>
  getLayout(state)?.second?.templates;

export const getErrorTemplates = (state) => getLayout(state)?.error?.templates;
