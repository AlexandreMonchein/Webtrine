import { createContext } from "react";

import { type FocusTrapContextType } from "./type";

const defaultContext = {
  anchorId: null,
  setFocus: () => {},
  releaseFocus: () => {},
};

export const FocusTrapContext =
  createContext<FocusTrapContextType>(defaultContext);
