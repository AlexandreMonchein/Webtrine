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
      // Sinon, scroller en haut de la page
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
