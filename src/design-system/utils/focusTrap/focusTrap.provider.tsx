import { useCallback, useEffect, useRef, useState } from "react";

import { focusConfig } from "./constant";
import { FocusTrapContext } from "./focusTrap.context";
import { tabKeyListener } from "./listener";
import type { AnchorId, ModalType } from "./type";

/*
 * anchorId -> Id of the element that opened the modal/sideglass -> Where to set the focus after release.
 * wrapperElement -> react ref of the modal/sideglass wrapper element -> Element which is based on to trap the focus.
 * isTrapped -> Boolean to check if the focus is trapped or not.
 *
 * setFocus
 * -> Set the anchorId for release
 * -> Get the wrapper element and set it to the ref.
 * -> Set the focus to the idToFocus.
 * -> Add the keydown listener to trap the focus.
 *
 * releaseFocus
 * -> Remove the keydown listener.
 * -> Set the focus to the anchorId.
 * -> Reset the states.
 *
 * useEffect
 * -> If the modal/sideglass is visible, set the focus.
 * -> If the modal/sideglass is not visible and was trapped, release the focus.
 */

export const FocusTrapProvider = ({ isVisible, type, children }) => {
  const [anchorId, setAnchorId] = useState<AnchorId>(null);
  const wrapperElement = useRef<HTMLElement | null>(null);
  const [isTrapped, setIsTrapped] = useState(false);

  const listener = useCallback(
    (e: KeyboardEvent) => tabKeyListener(e, wrapperElement.current),
    [wrapperElement],
  );

  const resetStates = useCallback(() => {
    setIsTrapped(false);
    setAnchorId(null);
    wrapperElement.current = null;
  }, []);

  const setFocus = useCallback(
    (modalType: ModalType) => {
      if (!modalType) {
        return;
      }

      const focusEntry = focusConfig[modalType];

      if (!focusEntry) {
        return;
      }

      const { wrapperId, idToFocus, anchorId } = focusEntry;

      setAnchorId(anchorId);

      if (wrapperId) {
        const wrapperEl = document.getElementById(wrapperId);

        if (!wrapperEl || !idToFocus) {
          /*
           * and reset states
           * Create reset fn
           */
          return;
        }

        wrapperElement.current = wrapperEl;

        setIsTrapped(true);
        document.getElementById(idToFocus)?.focus();

        // Will directly give the focus to the element on first call
        document.addEventListener("keydown", listener);
      }
    },
    [listener],
  );

  const releaseFocus = useCallback(() => {
    document.removeEventListener("keydown", listener);

    if (anchorId) {
      document.getElementById(anchorId)?.focus();
    }

    resetStates();
  }, [anchorId, listener, resetStates]);

  useEffect(() => {
    if (isVisible) {
      setFocus(type);
    }

    if (!isVisible && isTrapped) {
      releaseFocus();
    }
  }, [isVisible, setFocus, releaseFocus, type, isTrapped]);

  return (
    <FocusTrapContext.Provider
      value={{
        anchorId,
        setFocus,
        releaseFocus,
      }}
    >
      {children}
    </FocusTrapContext.Provider>
  );
};
