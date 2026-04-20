import { useEffect, useRef, useState } from "react";

import styles from "./animatedSection.module.css";

interface AnimatedSectionProps {
  children: React.ReactNode;
  index: number;
  disabled?: boolean;
  animateFirstElement?: boolean;
}

export const AnimatedSection = ({
  children,
  index,
  disabled = false,
  animateFirstElement = false,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Désactiver l'animation pour le premier élément sauf si animateFirstElement est true
  const isFirstElement = index === 0;
  const shouldAnimate = !disabled && (animateFirstElement || !isFirstElement);

  useEffect(() => {
    // Si les animations sont désactivées ou si c'est le premier élément, afficher directement
    if (!shouldAnimate) {
      setIsVisible(true);
      return undefined;
    }

    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Déclencher l'animation seulement une fois quand l'élément devient visible
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0, // Déclencher dès que l'élément est visible
        rootMargin: "0px", // Déclencher un peu avant que l'élément soit complètement visible
      },
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible, shouldAnimate]);

  // Si les animations sont désactivées ou si c'est le premier élément, retourner directement les children
  if (!shouldAnimate) {
    return <>{children}</>;
  }

  return (
    <div
      ref={sectionRef}
      className={`${styles.animatedSection} ${isVisible ? styles.visible : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
