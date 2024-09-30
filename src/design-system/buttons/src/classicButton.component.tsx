import { useLayoutEffect, useRef, useState } from "react";

import { Button, ButtonContainer, Text } from "./classicButton.styled";

export const ToggleButton = ({ displayedText, hiddenText }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const displayedRef = useRef<HTMLSpanElement>(null);
  const hiddenRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    setIsHidden(!isHidden);
  };

  useLayoutEffect(() => {
    if (displayedRef.current && hiddenRef.current) {
      const displayedWidth = displayedRef.current.offsetWidth;
      const hiddenWidth = hiddenRef.current.offsetWidth;
      setButtonWidth(Math.max(displayedWidth, hiddenWidth));
    }
  }, []);

  return (
    <ButtonContainer>
      <Button onClick={handleClick}>
        <Text style={{ width: buttonWidth ? `${buttonWidth}px` : "auto" }}>
          {isHidden ? hiddenText : displayedText}
        </Text>
      </Button>

      <span
        ref={displayedRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          whiteSpace: "nowrap",
        }}
      >
        {displayedText}
      </span>
      <span
        ref={hiddenRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          whiteSpace: "nowrap",
        }}
      >
        {hiddenText}
      </span>
    </ButtonContainer>
  );
};
