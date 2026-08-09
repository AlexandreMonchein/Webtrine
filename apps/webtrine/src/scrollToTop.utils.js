import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Si un hash est présent, attendre que le DOM soit prêt puis scroller vers l'élément
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
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
