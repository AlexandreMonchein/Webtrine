import { type FocusConfig, MODAL_TYPES } from "./type";

export const focusConfig: Partial<FocusConfig> = {
  [MODAL_TYPES.SIDE_NAV]: {
    anchorId: "burgerMenuNavbarIcon",
    wrapperId: "sidebar",
    idToFocus: "burgerMenuSidebarIcon",
  },
};
