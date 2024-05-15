export const getState = (state) => state;

export const getClient = (state) => state.client;

export const getSocials = (state) => state.socials;

export const getLayout = (state) => state.layout;

export const getTemplates = (state) => getLayout(state).templates;
