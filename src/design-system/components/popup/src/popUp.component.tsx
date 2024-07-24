import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { hidePopUp } from "../../../../store/state.action";
import { isPopUpDisplayed } from "../../../../store/state.selector";

import {
  CloseButton,
  Icon,
  Message,
  PopUpContainer,
  ProgressBar,
} from "./popUp.styled";

const icons = {
  success: "✅", // You can replace this with an actual SVG import
  warning: "⚠️", // You can replace this with an actual SVG import
  error: "❌", // You can replace this with an actual SVG import
};

const PopUp: React.FC = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const { showPopUp, type, message, error } = useSelector(isPopUpDisplayed);

  console.warn(">>> PopUp", showPopUp, type, message, error);

  const handlePopUpClose = () => {
    dispatch(hidePopUp());
  };

  useEffect(() => {
    if (!showPopUp) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handlePopUpClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showPopUp]);

  return showPopUp ? (
    <PopUpContainer type={type}>
      <Icon>{icons[type]}</Icon>
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
