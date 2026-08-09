import React, { useEffect, useState } from "react";

const FocusButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Fonction pour obtenir le premier élément focusable parmi toutes les sections
  const getFirstFocusableElement = (sections: NodeListOf<HTMLElement>) => {
    const focusableElements = [
      "a[href]",
      "button",
      "input",
      "select",
      "textarea",
      '[tabindex]:not([tabindex="-1"])',
    ];

    // Parcourir toutes les sections jusqu'à trouver un élément focusable
    for (const section of sections) {
      const elements = section.querySelectorAll<HTMLElement>(
        focusableElements.join(", "),
      );
      if (elements.length > 0) {
        return elements[0]; // Retourner le premier élément focusable trouvé
      }
    }
    return null; // Aucun élément focusable trouvé dans toutes les sections
  };

  // Fonction pour faire descendre le bouton au focus
  const handleFocus = () => {
    setIsVisible(true);
  };

  // Fonction pour rediriger l'utilisateur vers le premier élément focusable dans n'importe quelle section
  const handleClick = () => {
    const sections = document.querySelectorAll<HTMLElement>("section");
    if (sections.length > 0) {
      const firstFocusableElement = getFirstFocusableElement(sections);
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
    if (button) {
      button.addEventListener("blur", handleBlur);
    }

    return () => {
      if (button) {
        button.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return (
    <div>
      <button
        id="focusButton"
        type="button"
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
