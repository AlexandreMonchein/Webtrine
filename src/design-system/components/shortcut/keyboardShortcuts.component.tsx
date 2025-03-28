import React, { useState, useEffect } from "react";

const FocusButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Fonction pour obtenir le premier élément focusable dans la première section
  const getFirstFocusableElement = (section) => {
    const focusableElements = [
      "a[href]",
      "button",
      "input",
      "select",
      "textarea",
      '[tabindex]:not([tabindex="-1"])',
    ];

    // Sélectionner tous les éléments focusables dans la section
    const elements = section.querySelectorAll(focusableElements.join(", "));
    return elements[0]; // Retourner le premier élément focusable
  };

  // Fonction pour faire descendre le bouton au focus
  const handleFocus = () => {
    setIsVisible(true);
  };

  // Fonction pour rediriger l'utilisateur vers le premier élément focusable de la première section
  const handleClick = () => {
    const firstSection = document.querySelector("section");
    if (firstSection) {
      const firstFocusableElement = getFirstFocusableElement(firstSection);
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  };

  useEffect(() => {
    const handleBlur = () => {
      setIsVisible(false);
    };

    const button = document.getElementById("focusButton");
    button.addEventListener("blur", handleBlur);

    return () => {
      button.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div>
      <button
        id="focusButton"
        onFocus={handleFocus}
        onClick={handleClick}
        style={{
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: "white",
          color: "black",
          border: "none",
          borderRadius: "5px",
          opacity: isVisible ? 1 : 0,
          transition: "all 0.3s ease",
          zIndex: 1000,
          marginTop: isVisible ? "10px" : "-50px", // Bouton descend au focus
        }}
        aria-label="Aller au contenu"
      >
        <span>Aller au contenu</span>
      </button>
    </div>
  );
};

export default FocusButton;
