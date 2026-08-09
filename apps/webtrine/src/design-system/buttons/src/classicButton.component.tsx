import { useLayoutEffect, useRef, useState } from "react";

import styles from "./classicButton.module.css";
import { ToggleButtonProps } from "./classicButton.types";

export const ToggleButton = ({
  type,
  displayedText,
  hiddenText,
}: ToggleButtonProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const displayedRef = useRef<HTMLSpanElement>(null);
  const hiddenRef = useRef<HTMLSpanElement>(null);

  const handleClickCallType = () => {
    setIsHidden(!isHidden);
  };

  const handleClickRedirectType = () => {
    window.location.href = "/contact";
  };

  useLayoutEffect(() => {
    if (displayedRef.current && hiddenRef.current) {
      const displayedWidth = displayedRef.current.offsetWidth;
      const hiddenWidth = hiddenRef.current.offsetWidth;
      setButtonWidth(Math.max(displayedWidth, hiddenWidth));
    }
  }, []);

  return (
    <div className={styles.buttonContainer} data-testid="toggleButtonRoot">
      <button
        type="button"
        className={styles.button}
        onClick={
          type === "call" ? handleClickCallType : handleClickRedirectType
        }
      >
        <span
          className={styles.text}
          style={{ width: buttonWidth ? `${buttonWidth}px` : "auto" }}
        >
          {isHidden ? hiddenText : displayedText}
        </span>
      </button>

      <div className={styles.offscreenContentContainer}>
        <span ref={displayedRef}>{displayedText}</span>
        <span ref={hiddenRef}>{hiddenText}</span>
      </div>
    </div>
  );
};

export default ToggleButton;
