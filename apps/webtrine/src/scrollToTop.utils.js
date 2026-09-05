import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Le contenu ciblé peut monter de façon asynchrone (import dynamique +
      // lazy-load par IntersectionObserver), donc on réessaie jusqu'à ce que
      // l'élément existe plutôt que de supposer qu'il est prêt après un délai fixe.
      const id = hash.replace("#", "");

      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (!element) return false;
        element.scrollIntoView({ behavior: "smooth" });
        return true;
      };

      if (!scrollToElement()) {
        const observer = new MutationObserver(() => {
          if (scrollToElement()) {
            observer.disconnect();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        setTimeout(() => observer.disconnect(), 5000);
      }
    } else {
      // Scroll vers le haut - utiliser requestAnimationFrame pour s'assurer que le DOM est rendu
      const scrollToTopImmediate = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      // Scroll immédiat
      scrollToTopImmediate();

      // Scroll après le prochain frame pour s'assurer que le contenu est bien rendu
      requestAnimationFrame(() => {
        scrollToTopImmediate();

        // Un dernier check après un court délai
        setTimeout(scrollToTopImmediate, 10);
      });
    }
  }, [pathname, hash]);

  return null;
}
