import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { hidePopUp } from "../../../store/state.action";
import { isPopUpDisplayed } from "../../../store/state.selector";
import {
  CloseButton,
  Icon,
  Message,
  PopUpContainer,
  ProgressBar,
} from "./popUp.styled";

// To replace with actual SVG icons
const icons = {
  success: "✅",
  warning: "⚠️",
  error: "❌",
} as const;

type PopUpType = keyof typeof icons;

const PopUp: React.FC = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const { showPopUp, type, message, error } = useSelector(isPopUpDisplayed);

  const handlePopUpClose = useCallback(() => {
    dispatch(hidePopUp());
  }, [dispatch]);

  useEffect(() => {
    if (!showPopUp) {
      setProgress(0);
      return undefined;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [showPopUp]);

  // Close popup when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && showPopUp) {
      handlePopUpClose();
    }
  }, [progress, showPopUp, handlePopUpClose]);

  return showPopUp ? (
    <PopUpContainer type={type}>
      <Icon>{icons[type as PopUpType]}</Icon>
      <Message>
        {message}
        {error && (
          <div>
            <p>
              <strong>Error Code:</strong> {error.code}
            </p>
            <p>
              <strong>Error Message:</strong> {error.message}
            </p>
            <p>
              <strong>Error Stack:</strong> {error.stack}
            </p>
          </div>
        )}
      </Message>
      <CloseButton onClick={handlePopUpClose}>✖️</CloseButton>
      <ProgressBar progress={progress} />
    </PopUpContainer>
  ) : null;
};

export default PopUp;
