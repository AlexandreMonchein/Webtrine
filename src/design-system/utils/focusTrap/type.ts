export type WrapperId = "sidebar" | "fullscreenGallery" | null;

export type AnchorId = "burgerMenuNavbarIcon" | string | null;

export type FirstIdToFocus =
  | "burgerMenuSidebarIcon"
  | "fullscreenCloseButton"
  | null;

export const MODAL_TYPES = {
  SIDE_NAV: "SIDE_NAV",
  FULLSCREEN_GALLERY: "FULLSCREEN_GALLERY",
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
