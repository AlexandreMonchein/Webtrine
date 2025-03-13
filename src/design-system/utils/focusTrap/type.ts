export type WrapperId = "sidebar" | null;

export type AnchorId = "burgerMenuNavbarIcon" | null;

export type FirstIdToFocus = "burgerMenuSidebarIcon" | null;

export const MODAL_TYPES = {
  SIDE_NAV: "SIDE_NAV",
} as const;

export type ModalType = keyof typeof MODAL_TYPES;

export type FocusEntry = {
  wrapperId: WrapperId;
  idToFocus: FirstIdToFocus;
  anchorId: AnchorId;
};

export type FocusConfig = Record<ModalType, FocusEntry>;

export type FocusTrapContextType = {
  anchorId: AnchorId;
  setFocus: (anchor: ModalType) => void;
  releaseFocus: () => void;
};
