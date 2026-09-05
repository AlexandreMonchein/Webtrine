import { useLazyLoad } from "../../../hooks/useLazyLoad";

interface LazyComponentProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
}

export const LazyComponent = ({
  children,
  placeholder = null,
}: LazyComponentProps) => {
  const { elementRef, isVisible } = useLazyLoad({
    threshold: 0,
    rootMargin: "0px",
    triggerOnce: true,
  });
  // Une ancre (#hash) peut cibler n'importe quel bloc : on ne peut pas savoir
  // lequel avant qu'il soit monté, donc on ignore le lazy-load pour tous les
  // blocs de la page plutôt que de rester bloqué en attendant une intersection
  // qui ne peut pas se produire (l'élément est hors écran tant qu'il n'est pas monté).
  const shouldRender = isVisible || window.location.hash.length > 0;

  return (
    <div ref={elementRef} style={{ minHeight: shouldRender ? "auto" : "400px" }}>
      {shouldRender ? children : placeholder}
    </div>
  );
};

export default LazyComponent;
